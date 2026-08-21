import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  Check,
  Checks,
  Brain,
  Cloud,
  Cpu,
  CurrencyDollar,
  DeviceMobile,
  FolderOpen,
  HardDrives,
  LockKey,
  Wrench,
  DownloadSimple,
  FilePdf,
  FilmSlate,
  GithubLogo,
  Headphones,
  List,
  Pause,
  Play,
  ShieldCheck,
  SpeakerHigh,
  TelegramLogo,
  X,
} from '@phosphor-icons/react'
import './App.css'

type AudioSample = {
  label: string
  meta: string
  src: string
  selected?: boolean
}

const lessons = [
  ['system', 'The production system'],
  ['authority', 'Identity and keyframes'],
  ['audio', 'Voice and sound'],
  ['timing', 'Timing and animatics'],
  ['motion', 'Motion and repair'],
  ['qa', 'QA and approval'],
]

const workflow = [
  {
    name: 'Approve the lesson',
    detail: 'Freeze the grammar goal, Mandarin script, learner level, and visible evidence for every sentence.',
    output: 'Script and semantic brief',
  },
  {
    name: 'Build visual authority',
    detail: 'Approve recurring characters once. Generate environments separately, repair narrowly, then composite exact cutouts.',
    output: 'Canonical keyframes',
  },
  {
    name: 'Audition the voices',
    detail: 'Compare free and paid providers on the same line at matched loudness. Decode, transcribe, listen, and select.',
    output: 'Approved voice registry',
  },
  {
    name: 'Measure the real speech',
    detail: 'One complete sentence per file makes timing measurable and repairs narrow. The timeline follows speech, not a round runtime.',
    output: 'Content-derived timeline',
  },
  {
    name: 'Approve the animatic',
    detail: 'Combine final voices, keyframes, subtitles, music, transitions, and quiz holds before spending on motion.',
    output: 'Contextual human gate',
  },
  {
    name: 'Render, review, and repair',
    detail: 'Pilot representative shots, bind every verdict to a hash, pivot after two misses, and assemble only passing assets.',
    output: 'Release candidate',
  },
]

const audioSamples: AudioSample[] = [
  {
    label: 'Linlin - Edge Xiaoxiao',
    meta: 'Free lane, selected at -20% rate',
    src: '/media/LINLIN_FREE_Edge_Xiaoxiao_levelmatched.mp3',
    selected: true,
  },
  {
    label: 'Linlin - xAI Eve',
    meta: 'Paid comparison lane',
    src: '/media/LINLIN_PAID_xAI_Eve_levelmatched.mp3',
  },
  {
    label: 'Xiaowei - Edge Yunxi',
    meta: 'Free lane, selected at -15% rate',
    src: '/media/XIAOWEI_FREE_Edge_Yunxi_levelmatched.mp3',
    selected: true,
  },
  {
    label: 'Xiaowei - xAI Leo',
    meta: 'Paid comparison lane',
    src: '/media/XIAOWEI_PAID_xAI_Leo_levelmatched.mp3',
  },
]

const gates = [
  ['Language', 'A qualified Mandarin reviewer checks grammar, naturalness, HSK level, pinyin, neutral tones, and sandhi.'],
  ['Identity', 'A human approves faces, wardrobe, age impression, warmth, and tactile paper construction.'],
  ['Animatic', 'The complete static film is judged for artwork, voice performance, timing, music, subtitles, and lesson flow.'],
  ['Motion', 'Representative pilots prove the motion language before the full batch consumes GPU time.'],
  ['Release', 'Only an uninterrupted watch of the current hashed master can authorize publication.'],
]

function AudioCard({ sample }: { sample: AudioSample }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const player = audioRef.current
    if (!player) return
    if (player.paused) {
      document.querySelectorAll('audio').forEach((audio) => {
        if (audio !== player) audio.pause()
      })
      void player.play()
    } else {
      player.pause()
    }
  }

  return (
    <article className={`audio-card ${sample.selected ? 'is-selected' : ''}`}>
      <button className="audio-button" type="button" onClick={toggle} aria-label={`${playing ? 'Pause' : 'Play'} ${sample.label}`}>
        {playing ? <Pause weight="fill" /> : <Play weight="fill" />}
      </button>
      <div>
        <div className="audio-title-row">
          <h3>{sample.label}</h3>
          {sample.selected && <span className="selected-label"><Check weight="bold" /> Selected</span>}
        </div>
        <p>{sample.meta}</p>
      </div>
      <audio ref={audioRef} src={sample.src} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLesson, setActiveLesson] = useState('system')
  const [comparison, setComparison] = useState<'failed' | 'repaired'>('failed')

  useEffect(() => {
    const nodes = lessons
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveLesson(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -58% 0px', threshold: [0.15, 0.35, 0.6] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>Paper Theater Production School</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#system">Course</a>
          <a href="#remote">iPhone control</a>
          <a href="#tools">Tool stack</a>
          <a href="#examples">Examples</a>
          <a href="#qa">Review gates</a>
          <a className="nav-action" href="/downloads/Paper_Cut_Chinese_Grammar_Video_Production_Manual_v1.3.pdf" download>
            Manual <DownloadSimple />
          </a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <List />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#system" onClick={closeMenu}>Course</a>
            <a href="#remote" onClick={closeMenu}>iPhone control</a>
            <a href="#tools" onClick={closeMenu}>Tool stack</a>
            <a href="#examples" onClick={closeMenu}>Examples</a>
            <a href="#qa" onClick={closeMenu}>Review gates</a>
            <a href="/downloads/Paper_Cut_Chinese_Grammar_Video_Production_Manual_v1.3.pdf" onClick={closeMenu}>Download manual</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy reveal">
            <p className="eyebrow">A complete production course</p>
            <h1>Build Mandarin lessons from paper.</h1>
            <p className="hero-summary">Learn the real workflow through approved assets, playable auditions, motion tests, failures, repairs, and release gates.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#system">Start the course <ArrowDown /></a>
              <a className="button button-secondary" href="#examples">Watch examples <FilmSlate /></a>
            </div>
          </div>
          <div className="hero-media reveal delay-1">
            <video controls preload="metadata" poster="/media/final-film-excerpt-poster.webp">
              <source src="/media/final-film-excerpt.mp4" type="video/mp4" />
            </video>
            <div className="media-caption">
              <span>Approved and published final film</span>
              <span>8 second excerpt</span>
            </div>
          </div>
        </section>

        <section className="remote-section" id="remote">
          <div className="section-heading remote-heading">
            <p className="eyebrow">The phone is the control room</p>
            <h2>Jonathan runs the studio through Telegram.</h2>
            <p>He directs the entire production from an iPhone. Hermes Agent, running ChatGPT on a Linux production host, turns conversation into files, renders, QA evidence, deployments, and review media.</p>
          </div>

          <div className="control-flow" aria-label="Phone operated production architecture">
            <article className="control-node phone-node">
              <DeviceMobile weight="duotone" />
              <div><strong>Jonathan on iPhone</strong><span>Creative direction, corrections, taste, and approval</span></div>
            </article>
            <ArrowRight className="flow-arrow" aria-hidden="true" />
            <article className="control-node telegram-node">
              <TelegramLogo weight="duotone" />
              <div><strong>Telegram</strong><span>The conversational production interface</span></div>
            </article>
            <ArrowRight className="flow-arrow" aria-hidden="true" />
            <article className="control-node hermes-node">
              <Brain weight="duotone" />
              <div><strong>Hermes Agent + ChatGPT</strong><span>Plans, operates tools, tracks state, and reports evidence</span></div>
            </article>
            <ArrowRight className="flow-arrow" aria-hidden="true" />
            <article className="control-node host-node">
              <HardDrives weight="duotone" />
              <div><strong>Production host</strong><span>Models, FFmpeg, files, APIs, GitHub, and Vercel</span></div>
            </article>
          </div>

          <div className="responsibility-split">
            <article>
              <div className="responsibility-icon"><DeviceMobile /></div>
              <h3>What Jonathan does from the phone</h3>
              <ul>
                <li><Checks /> Explains the lesson goal and desired learner experience</li>
                <li><Checks /> Listens to voice and music auditions</li>
                <li><Checks /> Watches animatics, motion pilots, and finished masters</li>
                <li><Checks /> Reports perceptual problems that automation missed</li>
                <li><Checks /> Approves identities, direction, corrections, and publication</li>
              </ul>
            </article>
            <article>
              <div className="responsibility-icon"><HardDrives /></div>
              <h3>What Hermes does on the host</h3>
              <ul>
                <li><Checks /> Converts messages into scripts, manifests, and production plans</li>
                <li><Checks /> Operates image, audio, motion, and deterministic tools</li>
                <li><Checks /> Preserves rejected evidence and resumes interrupted work</li>
                <li><Checks /> Runs decode, hash, visual, timing, and delivery checks</li>
                <li><Checks /> Returns review media and verified artifacts to Telegram</li>
              </ul>
            </article>
          </div>

          <div className="phone-loop-callout">
            <TelegramLogo weight="fill" />
            <p><strong>This is not remote desktop operation.</strong> Jonathan does not sit at the Linux workstation or manually run the production commands. Conversation is the interface. Every important result returns to the same Telegram thread for a human decision.</p>
          </div>
        </section>

        <section className="tools-section" id="tools">
          <div className="section-heading tools-heading">
            <p className="eyebrow">What runs where</p>
            <h2>A hybrid studio: owned hardware, local models, and approved API calls.</h2>
            <p>The pipeline is deliberately split. Heavy repeatable work runs on Jonathan’s own Linux workstation. Hosted services are used where they add leverage, and paid calls are explicit rather than hidden inside the workflow.</p>
          </div>

          <div className="stack-grid">
            <article className="stack-card owned-stack">
              <DeviceMobile weight="duotone" />
              <div><span>Owned hardware</span><h3>The physical studio</h3></div>
              <ul>
                <li>Jonathan’s iPhone for direction and review</li>
                <li>Owned Linux workstation with NVIDIA GPU</li>
                <li>Local project storage, caches, masters, and evidence</li>
                <li>No need for Jonathan to operate the workstation directly</li>
              </ul>
            </article>
            <article className="stack-card local-stack">
              <Cpu weight="duotone" />
              <div><span>Local tools and models</span><h3>No per-call generation fee</h3></div>
              <ul>
                <li>Python, Pillow, FFmpeg, ffprobe, pypinyin, and hashing</li>
                <li>Whisper for transcript and audio screening</li>
                <li>FLUX, SAM, IOPaint/LaMa, and local music tools</li>
                <li>MiniMax-H3-class image-to-video on the owned GPU</li>
              </ul>
            </article>
            <article className="stack-card service-stack">
              <Cloud weight="duotone" />
              <div><span>Hosted services</span><h3>Transport and publication</h3></div>
              <ul>
                <li>Telegram carries every instruction and review result</li>
                <li>Edge TTS provides the selected free voice lane</li>
                <li>GitHub stores and versions the website source</li>
                <li>Vercel builds and serves the instructional website</li>
              </ul>
            </article>
            <article className="stack-card paid-stack">
              <CurrencyDollar weight="duotone" />
              <div><span>Paid hosted intelligence</span><h3>Calls that require authorization</h3></div>
              <ul>
                <li>OpenAI’s ChatGPT provides Hermes Agent’s reasoning brain</li>
                <li>xAI supplies paid image or voice candidates when approved</li>
                <li>Paid calls are logged, bounded, and checked for real outputs</li>
                <li>Secrets stay in protected configuration, never in deliverables</li>
              </ul>
            </article>
          </div>

          <div className="hermes-explainer">
            <div className="hermes-copy">
              <Brain weight="duotone" />
              <h3>ChatGPT is the brain. Hermes is the operating system around it.</h3>
              <p>ChatGPT interprets Jonathan’s request, reasons about the next action, reviews tool results, and decides what should happen next. Hermes Agent gives that reasoning model controlled access to the production environment and keeps the work coherent across a long project.</p>
              <div className="brain-boundary"><LockKey /><span>ChatGPT does not receive raw credentials. Hermes exposes approved tools, applies policy, and returns only the results needed for reasoning.</span></div>
            </div>
            <ol className="hermes-loop">
              <li><span>1</span><div><strong>Telegram gateway receives the message</strong><p>The correct chat and topic are attached to a persistent Hermes session.</p></div></li>
              <li><span>2</span><div><strong>Hermes loads working context</strong><p>Project history, current approvals, skills, memory, and relevant files become available.</p></div></li>
              <li><span>3</span><div><strong>ChatGPT reasons and chooses tools</strong><p>It may inspect files, run code, call a model, delegate an audit, or ask Jonathan only when a real decision is missing.</p></div></li>
              <li><span>4</span><div><strong>Hermes executes on the host</strong><p>Tools operate the filesystem, terminal, browsers, media pipelines, GitHub, Vercel, and explicitly authorized APIs.</p></div></li>
              <li><span>5</span><div><strong>Evidence comes back into the reasoning loop</strong><p>Hashes, decodes, screenshots, contact sheets, transcripts, and errors are reviewed before the next action.</p></div></li>
              <li><span>6</span><div><strong>Jonathan receives a reviewable result</strong><p>Telegram delivers samples, progress, files, blockers, and approval questions directly to the iPhone.</p></div></li>
            </ol>
          </div>

          <div className="management-grid">
            <div><FolderOpen /><strong>Project state</strong><span>Folders, manifests, stable IDs, hashes, caches, selected assets, and superseded versions</span></div>
            <div><Wrench /><strong>Production work</strong><span>Image, speech, music, motion, compositing, subtitles, encoding, packaging, and deployment</span></div>
            <div><Checks /><strong>Quality evidence</strong><span>Decode reports, ASR, frame contracts, contact sheets, visual verdicts, and uninterrupted-review gates</span></div>
            <div><LockKey /><strong>Approval boundaries</strong><span>Hermes may prepare and qualify. Jonathan alone approves taste, major spend, motion direction, and publication.</span></div>
          </div>
        </section>

        <section className="course-intro" id="system">
          <div className="section-heading">
            <p className="eyebrow">The operating model</p>
            <h2>A film is not one generation.</h2>
            <p>Generative tools propose appearance and motion. Deterministic systems establish text, timing, compositing, and authority. Humans approve meaning, taste, and release.</p>
          </div>
          <div className="course-layout">
            <aside className="lesson-index" aria-label="Course lessons">
              <p>Course chapters</p>
              {lessons.map(([id, label]) => (
                <a className={activeLesson === id ? 'active' : ''} href={`#${id}`} key={id}>
                  <span>{label}</span><ArrowRight />
                </a>
              ))}
            </aside>
            <div className="workflow-list">
              {workflow.map((step, index) => (
                <article className="workflow-step" key={step.name}>
                  <div className="step-index">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h3>{step.name}</h3>
                    <p>{step.detail}</p>
                  </div>
                  <span className="step-output">{step.output}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="authority-section" id="authority">
          <div className="section-heading compact">
            <h2>Separate identity from scene invention.</h2>
            <p>Once presenters are approved, image generation should build the world around them, not redraw them in every scene.</p>
          </div>
          <div className="authority-grid">
            <figure className="authority-card authority-main">
              <img src="/media/character-authority.webp" alt="Approved full-body Linlin and Xiaowei character authority" loading="lazy" />
              <figcaption><strong>Character authority</strong><span>Identity is approved once and hash-bound.</span></figcaption>
            </figure>
            <figure className="authority-card">
              <img src="/media/xai-environment.webp" alt="Umbrella and sun paper theater environment generated without Linlin or Xiaowei" loading="lazy" />
              <figcaption><strong>xAI environment plate</strong><span>The scene and semantic props arrive without recurring presenters.</span></figcaption>
            </figure>
            <figure className="authority-card">
              <img src="/media/canonical-composite.webp" alt="The same umbrella and sun environment with exact approved Linlin and Xiaowei cutouts added at the sides" loading="lazy" />
              <figcaption><strong>Deterministic composite</strong><span>The same plate now contains the exact approved presenters.</span></figcaption>
            </figure>
          </div>
          <div className="rule-callout">
            <ShieldCheck weight="duotone" />
            <div><strong>Generated text is never authoritative.</strong><p>Chinese, pinyin, titles, labels, calendar days, and quiz answers are rendered locally after the artwork is approved.</p></div>
          </div>
          <figure className="overview-figure">
            <img src="/media/keyframe-overview.webp" alt="Chronological overview of thirteen canonical paper theater keyframes" loading="lazy" />
            <figcaption>One chronological contact sheet exposes identity drift, missing semantics, count failures, and unsafe subtitle composition before animation begins.</figcaption>
          </figure>
        </section>

        <section className="audio-section" id="audio">
          <div className="audio-copy">
            <div className="section-heading compact">
              <h2>Audition on the same line.</h2>
              <p>Provider comparisons are useful only when text, playback loudness, format, and evaluation conditions match.</p>
            </div>
            <div className="audio-principles">
              <div><span>01</span><p>Use one representative Mandarin line per character.</p></div>
              <div><span>02</span><p>Level-match, decode, transcribe, and listen.</p></div>
              <div><span>03</span><p>Record the chosen voice and exact file hash.</p></div>
            </div>
          </div>
          <div className="audio-lab">
            <div className="audio-lab-header"><Headphones weight="duotone" /><span>Voice audition lab</span></div>
            {audioSamples.map((sample) => <AudioCard key={sample.label} sample={sample} />)}
            <div className="music-sample">
              <div><SpeakerHigh /><span>Selected house direction</span></div>
              <p>Smooth, happy, legato jazz. Melody and harmony create energy, not a repetitive beat.</p>
              <audio controls preload="metadata" src="/media/happy-jazz-sample.mp3" />
            </div>
          </div>
        </section>

        <section className="timing-section" id="timing">
          <div className="section-heading compact">
            <h2>The timeline follows speech.</h2>
            <p>Measure every conformed sentence. Add only short handoffs, scene breaths, transitions, quiz thinking time, and the final learner response hold.</p>
          </div>
          <div className="timing-grid">
            <div className="timing-visual" aria-label="Illustration of a content-derived timeline">
              <div className="timeline-ruler"><span>0s</span><span>4s</span><span>8s</span><span>12s</span></div>
              <div className="timeline-track speech"><span>Sentence A11</span></div>
              <div className="timeline-track handoff"><span>0.8s</span></div>
              <div className="timeline-track speech second"><span>Sentence A12</span></div>
              <div className="timeline-track transition"><span>paper transition</span></div>
            </div>
            <dl className="timing-values">
              <div><dt>Speaker handoff</dt><dd>0.70-0.90 s</dd></div>
              <div><dt>Scene breath</dt><dd>0.80-1.20 s</dd></div>
              <div><dt>Scene transition</dt><dd>0.25-0.50 s</dd></div>
              <div><dt>Quiz thinking hold</dt><dd>2.0-2.5 s</dd></div>
            </dl>
          </div>
          <div className="animatic-stage" id="examples">
            <div className="animatic-copy">
              <h3>Approve the static film before motion.</h3>
              <p>This inexpensive gate combines final voices, real timing, deterministic subtitles, music, transitions, and quiz holds.</p>
              <ul>
                <li><Check /> Full decode and stream contract</li>
                <li><Check /> Every sentence start and end sampled</li>
                <li><Check /> Every transition inspected</li>
                <li><Check /> Complete contextual human review</li>
              </ul>
            </div>
            <video controls preload="metadata" poster="/media/static-animatic-excerpt-poster.webp">
              <source src="/media/static-animatic-excerpt.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section className="motion-section" id="motion">
          <div className="section-heading compact">
            <h2>Motion is a short, reviewable asset.</h2>
            <p>Pilot difficult actions first. Strip native model audio, verify the first frame, inspect five temporal samples, and bind the verdict to the clip hash.</p>
          </div>
          <div className="motion-showcase">
            <figure>
              <video controls muted loop preload="metadata" poster="/media/motion-shot-poster.webp">
                <source src="/media/motion-shot.mp4" type="video/mp4" />
              </video>
              <figcaption><strong>Motion review</strong><span>Paper vehicles move through the city while the presenter and stage remain coherent.</span></figcaption>
            </figure>
            <figure>
              <img src="/media/motion-contact-sheet.webp" alt="Five temporal samples from the same approved moving paper city shot" loading="lazy" />
              <figcaption><strong>Temporal evidence</strong><span>Start, 25%, 50%, 75%, and end frames expose drift that one still cannot show.</span></figcaption>
            </figure>
          </div>
          <div className="repair-lab">
            <div className="repair-copy">
              <h3>When generation fails, change the method.</h3>
              <p>The closing shot moved wall icons that had to remain pinned. After prompt and seed attempts failed, deterministic masking preserved valid character gestures while freezing every guarded background pixel.</p>
              <div className="repair-tabs" role="tablist" aria-label="Failure and repair comparison">
                <button className={comparison === 'failed' ? 'active' : ''} type="button" onClick={() => setComparison('failed')} role="tab" aria-selected={comparison === 'failed'}>Failed generation</button>
                <button className={comparison === 'repaired' ? 'active' : ''} type="button" onClick={() => setComparison('repaired')} role="tab" aria-selected={comparison === 'repaired'}>Deterministic repair</button>
              </div>
            </div>
            <div className="repair-media">
              {comparison === 'failed' ? (
                <video key="failed" controls muted autoPlay preload="metadata" poster="/media/failed-motion-poster.webp">
                  <source src="/media/failed-motion.mp4" type="video/mp4" />
                </video>
              ) : (
                <video key="repaired" controls muted autoPlay preload="metadata" poster="/media/repaired-motion-poster.webp">
                  <source src="/media/repaired-motion.mp4" type="video/mp4" />
                </video>
              )}
              <div className={`verdict ${comparison}`}>
                {comparison === 'failed' ? 'Rejected: pinned icons detach' : 'Approved: background remains stable'}
              </div>
            </div>
          </div>
        </section>

        <section className="qa-section" id="qa">
          <div className="section-heading compact">
            <p className="eyebrow">Fail closed</p>
            <h2>Evidence qualifies. People decide.</h2>
            <p>A green dashboard cannot prove natural Mandarin, an appealing face, a comfortable pace, or permission to publish.</p>
          </div>
          <div className="gate-grid">
            {gates.map(([name, detail], index) => (
              <article className="gate" key={name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="qa-split">
            <div>
              <h3>Automatic evidence</h3>
              <p>Existence, magic bytes, decode, dimensions, frame count, audio format, loudness, hashes, contact-sheet production, black frames, and freeze intervals.</p>
            </div>
            <div>
              <h3>Reviewer judgment</h3>
              <p>Grammar, identity, anatomy, counts, semantics, composition, music taste, pacing, readability, fatigue, and the complete release decision.</p>
            </div>
          </div>
        </section>

        <section className="download-section">
          <div>
            <BookOpenText weight="duotone" />
            <h2>Keep the full field manual.</h2>
            <p>The website teaches through media. The editable manual remains the detailed operating reference for manifests, state transitions, commands, recovery, and delivery contracts.</p>
          </div>
          <div className="download-actions">
            <a className="download-card" href="/downloads/Paper_Cut_Chinese_Grammar_Video_Production_Manual_v1.3.pdf" download>
              <FilePdf weight="duotone" /><span><strong>Download PDF</strong><small>Printable 21-page manual</small></span><DownloadSimple />
            </a>
            <a className="download-card" href="/downloads/Paper_Cut_Chinese_Grammar_Video_Production_Manual_v1.3.docx" download>
              <BookOpenText weight="duotone" /><span><strong>Download DOCX</strong><small>Editable source document</small></span><DownloadSimple />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><strong>Paper Theater Production School</strong></div>
        <p>Built from two real HSK 3 productions. Failed attempts remain part of the lesson.</p>
        <a href="https://github.com/aliceagent/paper-theater-production-school" target="_blank" rel="noreferrer"><GithubLogo /> Source on GitHub</a>
      </footer>
    </div>
  )
}

export default App
