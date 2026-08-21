import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  Check,
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
              <span>18 second excerpt</span>
            </div>
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
              <img src="/media/xai-environment.webp" alt="Paper theater restaurant environment generated without recurring presenters" loading="lazy" />
              <figcaption><strong>Environment plate</strong><span>xAI proposes the location and exact semantic props.</span></figcaption>
            </figure>
            <figure className="authority-card">
              <img src="/media/canonical-composite.webp" alt="Canonical restaurant keyframe with approved presenters composited into the environment" loading="lazy" />
              <figcaption><strong>Canonical composite</strong><span>Exact presenter cutouts return through deterministic code.</span></figcaption>
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
            <video controls muted loop preload="metadata" poster="/media/motion-shot-poster.webp">
              <source src="/media/motion-shot.mp4" type="video/mp4" />
            </video>
            <img src="/media/motion-contact-sheet.webp" alt="Five temporal samples from an approved motion shot" loading="lazy" />
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
