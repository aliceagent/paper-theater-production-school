import puppeteer from 'puppeteer-core'
import fs from 'node:fs/promises'

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:4173'

const browser = await puppeteer.launch({
  executablePath: '/snap/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
})
const errors = []
const failed = []
const page = await browser.newPage()
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
page.on('requestfailed', (req) => {
  const error = req.failure()?.errorText ?? 'unknown'
  if (!(error === 'net::ERR_ABORTED' && req.resourceType() === 'media')) failed.push(`${req.url()} :: ${error}`)
})
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto(baseUrl, { waitUntil: 'networkidle0' })
await new Promise((resolve) => setTimeout(resolve, 1000))
const report = { sections: {}, errors, failed, mobile: {}, interactions: {} }
for (const id of ['remote', 'tools', 'system', 'authority', 'audio', 'timing', 'motion', 'qa']) {
  const el = await page.$(`#${id}`)
  if (!el) throw new Error(`Missing section ${id}`)
  await el.evaluate((node) => node.scrollIntoView({ block: 'start' }))
  await new Promise((resolve) => setTimeout(resolve, 250))
  const box = await el.boundingBox()
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  report.sections[id] = { box, horizontalOverflow: overflow }
  await page.screenshot({ path: `qa/section-${id}.png` })
}
for (const [name, selector] of [['remote-flow', '.control-flow'], ['responsibilities', '.responsibility-split'], ['tool-stack', '.stack-grid'], ['hermes-loop', '.hermes-explainer'], ['authority-images', '.authority-grid'], ['motion-evidence', '.motion-showcase'], ['repair-comparison', '.repair-lab']]) {
  const el = await page.$(selector)
  await el?.screenshot({ path: `qa/component-${name}.png` })
}
await page.evaluate(() => document.querySelector('#motion')?.scrollIntoView())
await page.click('.repair-tabs button:nth-child(2)')
report.interactions.repairVerdict = await page.$eval('.verdict', (el) => el.textContent?.trim())
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await page.goto(baseUrl, { waitUntil: 'networkidle0' })
await new Promise((resolve) => setTimeout(resolve, 900))
report.mobile.horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
await page.click('.menu-button')
report.mobile.menuVisible = await page.$eval('.mobile-nav', (el) => getComputedStyle(el).display !== 'none')
report.mobile.primaryCtaFits = await page.$eval('.button-primary', (el) => el.scrollWidth <= el.clientWidth && el.getBoundingClientRect().height < 70)
await page.screenshot({ path: 'qa/mobile-menu.png' })
await page.click('.menu-button')
for (const id of ['remote', 'tools', 'authority', 'motion']) {
  const el = await page.$(`#${id}`)
  await el?.evaluate((node) => node.scrollIntoView({ block: 'start' }))
  await new Promise((resolve) => setTimeout(resolve, 200))
  await page.screenshot({ path: `qa/mobile-${id}.png` })
}
for (const [name, selector] of [['remote-flow', '.control-flow'], ['tool-stack', '.stack-grid'], ['authority-images', '.authority-grid'], ['motion-evidence', '.motion-showcase']]) {
  const el = await page.$(selector)
  await el?.screenshot({ path: `qa/mobile-component-${name}.png` })
}
report.media = await page.evaluate(() => Array.from(document.querySelectorAll('video source, audio')).map((el) => ({ src: el.getAttribute('src'), ready: el.closest('video')?.readyState ?? el.readyState ?? null })))
await fs.writeFile('qa/report.json', JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify(report, null, 2))
await browser.close()
if (errors.length || failed.length || Object.values(report.sections).some((value) => value.horizontalOverflow > 0) || report.mobile.horizontalOverflow > 0 || !report.mobile.menuVisible || !report.mobile.primaryCtaFits) process.exit(1)
