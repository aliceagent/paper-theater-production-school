import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Info, MapPin } from '@phosphor-icons/react'
import './glossary.css'

type GlossaryEntry = {
  name: string
  aliases: string[]
  kind: string
  description: string
  role: string
}

const entries: GlossaryEntry[] = [
  { name: 'Hermes Agent', aliases: ['Hermes Agent', 'Hermes'], kind: 'Agent runtime · local host', description: 'An open agent system that connects a reasoning model to controlled tools, files, memory, skills, messaging, and long-running processes.', role: 'It receives Jonathan’s Telegram messages, gives ChatGPT the relevant context and tools, executes approved work, and returns evidence to the same conversation.' },
  { name: 'ChatGPT', aliases: ['ChatGPT'], kind: 'Hosted reasoning model · paid', description: 'OpenAI’s language model is the reasoning brain inside this Hermes session. It interprets requests, plans actions, reviews evidence, and decides which tool to use next.', role: 'It does not render the film directly. Hermes lets it operate the production tools while keeping credentials and policy boundaries outside the model.' },
  { name: 'Telegram', aliases: ['Telegram'], kind: 'Hosted messaging service', description: 'A messaging platform used here as the complete conversational user interface for the production studio.', role: 'Jonathan sends direction, images, corrections, and approvals from his iPhone; Hermes returns previews, files, progress, and questions through the same thread.' },
  { name: 'iPhone', aliases: ['iPhone'], kind: 'Owned user-interface hardware', description: 'Jonathan’s handheld production console. No terminal, remote desktop, or direct workstation operation is required.', role: 'The phone is used to direct the lesson, listen, watch, compare, correct, and authorize each gate.' },
  { name: 'Owned hardware', aliases: ['owned hardware'], kind: 'Cost and ownership category', description: 'Physical equipment Jonathan already controls, rather than rented cloud compute billed for each use.', role: 'The iPhone, Linux workstation, NVIDIA GPU, and local project storage form the owned physical studio.' },
  { name: 'Local model', aliases: ['local models', 'local model'], kind: 'Model-location category', description: 'An AI model whose weights and inference runtime execute on Jonathan’s own workstation.', role: 'Local image, segmentation, repair, music, transcription, and motion models use the owned GPU or CPU and do not create a per-call provider charge.' },
  { name: 'Local tool', aliases: ['local tools', 'local tool'], kind: 'Software-location category', description: 'Software installed and executed on the owned workstation rather than called through a remote service.', role: 'Python, Pillow, FFmpeg, ffprobe, pypinyin, and validation scripts operate directly on local project files.' },
  { name: 'Hosted service', aliases: ['hosted services', 'hosted service'], kind: 'External service category', description: 'A capability operated on someone else’s infrastructure and reached over the network.', role: 'Telegram, Edge TTS, GitHub, and Vercel provide transport, voice, source hosting, or web deployment.' },
  { name: 'Paid hosted intelligence', aliases: ['paid hosted intelligence'], kind: 'Cost and provider category', description: 'Reasoning or generation performed by a commercial AI provider and potentially billed by subscription, usage, or request.', role: 'OpenAI provides the ChatGPT brain; xAI is selectively used for authorized image and voice candidates.' },
  { name: 'Per-call generation fee', aliases: ['per-call generation fee', 'per-generation cloud charge'], kind: 'Cost model', description: 'A usage charge incurred each time a hosted model generates an image, voice, video, or other result.', role: 'Local models avoid this fee; paid API calls are bounded and used only when their value justifies the spend.' },
  { name: 'Production host', aliases: ['production host'], kind: 'Owned local system', description: 'The Linux workstation on which Hermes and the local production pipeline run.', role: 'It stores project assets, runs models and media tools, verifies outputs, and connects to approved external services.' },
  { name: 'Linux', aliases: ['Linux'], kind: 'Local operating system', description: 'The operating system running on the owned production workstation.', role: 'It hosts Hermes, local models, media tools, project files, caches, validation scripts, and deployment clients.' },
  { name: 'NVIDIA GPU', aliases: ['NVIDIA GPU', 'owned GPU', 'GPU'], kind: 'Owned compute hardware', description: 'A graphics processor designed for highly parallel computation and commonly used to run local generative media models.', role: 'It performs local image and image-to-video inference, avoiding a per-generation cloud charge for those stages.' },
  { name: 'Python', aliases: ['Python'], kind: 'Local software · open source', description: 'A general-purpose programming language widely used for automation, image processing, validation, and AI workflows.', role: 'Custom project scripts create manifests, composite characters, render subtitles, inspect evidence, and coordinate repeatable production steps.' },
  { name: 'Pillow', aliases: ['Pillow'], kind: 'Local software · open source', description: 'A Python imaging library for reading, drawing, transforming, and exporting raster images.', role: 'It builds deterministic graphics, contact sheets, keyframe composites, evidence boards, and web-ready assets.' },
  { name: 'FFmpeg', aliases: ['FFmpeg'], kind: 'Local software · open source', description: 'A command-line media engine for decoding, filtering, encoding, mixing, and packaging audio and video.', role: 'It assembles the film, conforms audio, burns deterministic subtitles, creates excerpts, and produces delivery files.' },
  { name: 'ffprobe', aliases: ['ffprobe'], kind: 'Local software · open source', description: 'The inspection companion to FFmpeg. It reports media streams, codecs, dimensions, frame rates, durations, and metadata.', role: 'Hermes uses it to verify that an output is structurally real and matches the required delivery contract.' },
  { name: 'pypinyin', aliases: ['pypinyin'], kind: 'Local software · open source', description: 'A Python library that converts Chinese characters into Hanyu Pinyin readings.', role: 'It supports deterministic pinyin generation, which is then reviewed for word grouping, neutral tones, and contextual pronunciation.' },
  { name: 'Hanyu Pinyin', aliases: ['Hanyu Pinyin', 'pinyin'], kind: 'Mandarin romanization system', description: 'The standard Latin-letter transcription system for Mandarin pronunciation, including tone marks.', role: 'It appears beneath Chinese subtitles and is reviewed as language content rather than trusted blindly from automation.' },
  { name: 'Whisper', aliases: ['Whisper'], kind: 'Speech-recognition model · local', description: 'A speech-to-text model originally released by OpenAI that can transcribe and detect spoken language.', role: 'It screens generated Mandarin audio, checks that speech exists where expected, and helps identify omissions or obvious pronunciation failures.' },
  { name: 'FLUX', aliases: ['FLUX'], kind: 'Image-generation model · local', description: 'A diffusion-based text-to-image model family used to generate and transform visual assets.', role: 'It supports local image work when the production needs a generated or edited asset without a paid per-image API call.' },
  { name: 'SAM', aliases: ['SAM'], kind: 'Segmentation model · local', description: 'Meta’s Segment Anything Model identifies an object region and produces a pixel mask for extraction.', role: 'It helps isolate approved character artwork from a reference image before deterministic compositing.' },
  { name: 'IOPaint / LaMa', aliases: ['IOPaint/LaMa', 'IOPaint / LaMa', 'LaMa', 'IOPaint'], kind: 'Image-repair tools · local', description: 'IOPaint is an inpainting interface; LaMa is a model that fills selected image regions using surrounding visual context.', role: 'They remove unwanted generated characters, pseudo-text, or defects while preserving the rest of a qualified environment plate.' },
  { name: 'MiniMax-H3', aliases: ['MiniMax-H3-class', 'MiniMax-H3', 'H3 motion'], kind: 'Image-to-video model · local', description: 'A local image-to-video model used to animate approved paper-theater keyframes.', role: 'It generates short silent motion shots on the owned GPU. Final audio is added later from authoritative project files.' },
  { name: 'Image-to-video', aliases: ['image-to-video'], kind: 'Generative-media process', description: 'A model takes a still image as frame zero and synthesizes subsequent frames according to a motion prompt.', role: 'The workflow renders short reviewable shots rather than asking one model to produce an entire film at once.' },
  { name: 'Edge TTS', aliases: ['Edge Xiaoxiao', 'Edge Yunxi', 'Edge TTS'], kind: 'Hosted voice service · free lane', description: 'Microsoft Edge’s neural text-to-speech service, accessible without a per-call production fee in this workflow.', role: 'It supplied the selected Mandarin production voices after matched auditions against paid alternatives.' },
  { name: 'OpenAI', aliases: ['OpenAI'], kind: 'Hosted AI provider · paid', description: 'The company providing the ChatGPT reasoning model used by this Hermes session.', role: 'The hosted model reasons about the project; local and external tools perform the actual media production work.' },
  { name: 'xAI', aliases: ['xAI'], kind: 'Hosted AI provider · paid API', description: 'An external generative-AI provider used selectively for image plates and paid voice auditions.', role: 'Calls are explicitly authorized, logged, checked for valid outputs, and never treated as the whole production platform.' },
  { name: 'API', aliases: ['API calls', 'API call', 'APIs', 'API'], kind: 'Software interface', description: 'An application programming interface lets one program request a service from another program in a structured way.', role: 'Hermes uses approved APIs for selected hosted capabilities while credentials remain in protected configuration.' },
  { name: 'GitHub', aliases: ['GitHub'], kind: 'Hosted source-control service', description: 'A service for storing Git repositories, reviewing changes, and tracking source-code history.', role: 'It stores the instructional website source and gives every published revision an auditable commit history.' },
  { name: 'Vercel', aliases: ['Vercel'], kind: 'Hosted deployment service', description: 'A web platform that builds a source repository and serves the resulting website through a global network.', role: 'A verified GitHub commit triggers the production build and updates the public instructional website.' },
  { name: 'Manifest', aliases: ['manifests', 'manifest'], kind: 'Production record', description: 'A structured file that records authoritative IDs, inputs, outputs, parameters, states, and relationships.', role: 'Manifests make the pipeline resumable and prevent filenames or memory from becoming the only source of truth.' },
  { name: 'Stable ID', aliases: ['stable IDs', 'stable ID'], kind: 'Production identifier', description: 'A permanent identifier that continues to refer to the same logical asset even if its filename or location changes.', role: 'It keeps scripts, approvals, evidence, and downstream dependencies connected reliably.' },
  { name: 'Cache', aliases: ['caches', 'cache'], kind: 'Local working storage', description: 'Reusable intermediate data kept to avoid repeating expensive computation or downloads.', role: 'Hermes can resume interrupted work and reuse qualified results, while hashes prevent stale cache entries from masquerading as current outputs.' },
  { name: 'SHA-256 hash', aliases: ['SHA-256', 'hash-bound', 'hashed', 'hashes', 'hashing', 'hash'], kind: 'Cryptographic fingerprint', description: 'SHA-256 converts a file into a fixed-length fingerprint. Any change to the file produces a different result.', role: 'Approvals and QA records bind to exact bytes, so replacing an asset automatically invalidates evidence for the older version.' },
  { name: 'Credential', aliases: ['credentials', 'credential', 'secrets'], kind: 'Protected access data', description: 'Passwords, tokens, and API keys that authorize access to accounts or paid services.', role: 'Hermes keeps them in protected configuration and never copies them into source code, public files, prompts, or reports.' },
  { name: 'ASR', aliases: ['ASR'], kind: 'Audio QA method', description: 'Automatic speech recognition converts spoken audio back into text for comparison with the intended script.', role: 'It is a useful screening check, but a qualified Mandarin reviewer still judges naturalness and pronunciation.' },
  { name: 'QA', aliases: ['QA evidence', 'QA'], kind: 'Quality-assurance process', description: 'Quality assurance is the systematic process of checking whether an asset satisfies technical, linguistic, visual, and editorial requirements.', role: 'Hermes assembles automatic measurements and review evidence, but passing QA does not replace Jonathan’s contextual approval.' },
  { name: 'Semantic prop', aliases: ['semantic props', 'semantic prop'], kind: 'Scene-contract concept', description: 'An object whose presence, count, or state carries required story or teaching meaning rather than serving as decoration.', role: 'The environment prompt and visual review verify that each scene contains the objects needed to communicate the Mandarin sentence.' },
  { name: 'Identity drift', aliases: ['identity drift'], kind: 'Generative-media failure', description: 'Unwanted changes to a recurring character’s face, body, wardrobe, age impression, or construction style across assets.', role: 'Canonical character cutouts and chronological contact sheets keep Linlin and Xiaowei visually consistent.' },
  { name: 'Temporal sample', aliases: ['temporal samples', 'temporal sample', 'temporal evidence'], kind: 'Motion QA artifact', description: 'Frames sampled at several moments in a clip rather than judging the clip from its first frame or poster alone.', role: 'Start, 25%, 50%, 75%, and end samples expose drift, deformation, frozen action, and poor endpoints.' },
  { name: 'Stream contract', aliases: ['stream contract'], kind: 'Media specification', description: 'The required combination of video and audio streams, codecs, channel layout, dimensions, and timing behavior.', role: 'The animatic and final master are inspected to confirm that every expected stream is present and usable.' },
  { name: 'Prompt', aliases: ['prompt'], kind: 'Generative-model instruction', description: 'Text that describes the content, constraints, style, or motion a generative model should attempt.', role: 'Prompts propose a result; they do not override canonical identity, deterministic text, or human review.' },
  { name: 'Seed', aliases: ['seed attempts', 'seed'], kind: 'Generation parameter', description: 'A numeric starting value that influences the random choices made during generative inference.', role: 'Trying a new seed can vary a result, but the workflow changes methods after repeated failures instead of sampling indefinitely.' },
  { name: 'Deterministic mask repair', aliases: ['deterministic masking'], kind: 'Local repair technique', description: 'A fixed pixel mask chooses exactly which regions come from a generated motion clip and which remain locked to an approved source frame.', role: 'It preserved valid character gestures while preventing required wall icons from moving or falling.' },
  { name: 'Magic bytes', aliases: ['magic bytes'], kind: 'File-integrity check', description: 'A short signature at the start of a file that identifies its real format independently of its filename extension.', role: 'Hermes checks signatures so JPEG data mislabeled as PNG, or other malformed outputs, fail closed.' },
  { name: 'Black-frame check', aliases: ['black frames'], kind: 'Video QA check', description: 'A scan for unintentionally empty or nearly black frames that can appear after failed transitions, missing media, or encoding errors.', role: 'The final timeline is checked for black frames before release review.' },
  { name: 'Freeze interval', aliases: ['freeze intervals'], kind: 'Motion review signal', description: 'A detected run of nearly unchanged frames. It creates a review item rather than automatically proving failure.', role: 'Intentional teaching holds may pass; unexplained frozen motion is reviewed and repaired.' },
  { name: 'Delivery contract', aliases: ['delivery contracts', 'delivery contract'], kind: 'Release specification', description: 'The required file format, dimensions, frame rate, audio properties, loudness, naming, and evidence for a deliverable.', role: 'It defines what a complete master or package must contain before it can be handed off or published.' },
  { name: 'State transition', aliases: ['state transitions', 'state transition'], kind: 'Workflow-control concept', description: 'A recorded move from one production state to another, such as drafted, qualified, awaiting review, approved, or superseded.', role: 'Transitions prevent technical success from being confused with human approval or publication authorization.' },
  { name: 'Frame contract', aliases: ['frame contracts', 'frame contract'], kind: 'Media specification', description: 'The required dimensions, frame rate, frame count, pixel format, and other structural properties for a video asset.', role: 'Automatic checks reject media that does not match the assembly and delivery requirements.' },
  { name: 'Contact sheet', aliases: ['contact sheets', 'contact sheet'], kind: 'Visual QA artifact', description: 'A labeled grid of sampled frames from one image set or video clip.', role: 'It exposes identity drift, motion failures, missing objects, and endpoint defects more efficiently than opening every file individually.' },
  { name: 'Visual verdict', aliases: ['visual verdicts', 'visual verdict'], kind: 'Human or model-assisted QA record', description: 'A structured decision such as PASS, CLEANUP, REGENERATE, or REJECT, tied to visible evidence.', role: 'The verdict records what was inspected, what failed, and which exact file hash the decision applies to.' },
  { name: 'Canonical asset', aliases: ['canonical keyframes', 'canonical keyframe', 'canonical composite', 'canonical'], kind: 'Approved source of truth', description: 'The promoted version that downstream work is allowed to treat as authoritative.', role: 'Only human-approved identity and keyframe assets become canonical; later replacement invalidates dependent motion and assembly work.' },
  { name: 'Deterministic process', aliases: ['deterministic subtitles', 'deterministic composite', 'deterministic code', 'deterministic systems', 'deterministic'], kind: 'Repeatable production method', description: 'A deterministic step produces the same output from the same inputs instead of inventing a new result each run.', role: 'The pipeline uses it for authoritative text, timing, compositing, subtitles, hashes, and narrow repairs.' },
  { name: 'Keyframe', aliases: ['keyframes', 'keyframe'], kind: 'Approved scene image', description: 'A still image that establishes a shot’s composition, characters, props, and semantic meaning before motion generation.', role: 'Motion cannot begin until the relevant keyframe is visually approved and promoted to canonical authority.' },
  { name: 'Static animatic', aliases: ['static audiovisual animatic', 'static animatic', 'animatic'], kind: 'Pre-motion film prototype', description: 'A timed video assembled from still keyframes, final voices, subtitles, music, transitions, and intentional holds.', role: 'It lets Jonathan judge the complete lesson flow before expensive or irreversible motion work is authorized.' },
  { name: 'Level matching', aliases: ['level-matched', 'level-match'], kind: 'Audio comparison method', description: 'Adjusting audition samples to comparable loudness so one is not preferred merely because it plays louder.', role: 'Free and paid voices are compared on the same Mandarin line under matched listening conditions.' },
  { name: 'Decode check', aliases: ['decode reports', 'decode-check', 'decode'], kind: 'Media-integrity test', description: 'Reading an entire media file with a real decoder to prove that it is structurally valid rather than merely present.', role: 'Every important output is decoded before Hermes describes it as a working artifact.' },
  { name: 'HSK', aliases: ['HSK 3', 'HSK'], kind: 'Mandarin proficiency standard', description: 'Hanyu Shuiping Kaoshi is a standardized Chinese-language proficiency framework. HSK 3 represents an early-intermediate learner level.', role: 'Vocabulary, grammar, pacing, subtitles, and explanations are constrained to the intended learner level.' },
  { name: 'True peak', aliases: ['true peak'], kind: 'Audio delivery measurement', description: 'An estimate of the highest signal level between digital samples, expressed in dBTP.', role: 'It helps prevent clipping after encoding or playback conversion.' },
  { name: 'LUFS', aliases: ['LUFS'], kind: 'Audio loudness measurement', description: 'Loudness Units relative to Full Scale estimates perceived program loudness rather than only sample peaks.', role: 'The final mix is checked against a defined integrated-loudness target.' },
]

const aliasMap = new Map<string, GlossaryEntry>()
for (const entry of entries) for (const alias of entry.aliases) aliasMap.set(alias.toLowerCase(), entry)
const aliases = [...aliasMap.keys()].sort((a, b) => b.length - a.length)
const escaped = aliases.map((alias) => alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
const termPattern = new RegExp(`(?<![\\p{L}\\p{N}_])(${escaped.join('|')})(?![\\p{L}\\p{N}_])`, 'giu')

function TechnicalTerm({ entry, children }: { entry: GlossaryEntry; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [position, setPosition] = useState({ left: 0, top: 0, above: false })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const id = useId()

  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const cardWidth = Math.min(360, window.innerWidth - 24)
    const half = cardWidth / 2
    const center = Math.max(half + 12, Math.min(window.innerWidth - half - 12, rect.left + rect.width / 2))
    const above = rect.top > window.innerHeight * 0.55
    setPosition({ left: center, top: above ? rect.top - 10 : rect.bottom + 10, above })
  }

  useEffect(() => {
    if (!open) return
    updatePosition()
    const refresh = () => updatePosition()
    window.addEventListener('resize', refresh)
    window.addEventListener('scroll', refresh, true)
    return () => {
      window.removeEventListener('resize', refresh)
      window.removeEventListener('scroll', refresh, true)
    }
  }, [open])

  useEffect(() => {
    if (!pinned) return
    const close = (event: PointerEvent) => {
      if (!buttonRef.current?.contains(event.target as Node)) {
        setPinned(false)
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [pinned])

  return (
    <span
      className="technical-term-wrap"
      onMouseEnter={() => { updatePosition(); setOpen(true) }}
      onMouseLeave={() => { if (!pinned) setOpen(false) }}
    >
      <button
        ref={buttonRef}
        className="technical-term"
        type="button"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onFocus={() => { updatePosition(); setOpen(true) }}
        onBlur={() => { if (!pinned) setOpen(false) }}
        onClick={() => {
          updatePosition()
          setPinned((value) => {
            setOpen(!value)
            return !value
          })
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setPinned(false)
            setOpen(false)
            buttonRef.current?.blur()
          }
        }}
      >
        {children}
        <Info weight="fill" aria-hidden="true" />
      </button>
      {open && createPortal(
        <div
          id={id}
          className={`term-card ${position.above ? 'term-card-above' : ''}`}
          style={{ left: position.left, top: position.top }}
          role="tooltip"
        >
          <div className="term-card-kicker">{entry.kind}</div>
          <strong>{entry.name}</strong>
          <p>{entry.description}</p>
          <div className="term-role"><MapPin weight="fill" /><span><b>In this production</b>{entry.role}</span></div>
          <small>{pinned ? 'Tap the term or elsewhere to close' : 'Click or tap to keep this card open'}</small>
        </div>,
        document.body,
      )}
    </span>
  )
}

export function GlossaryText({ children }: { children: string }) {
  const parts = children.split(termPattern)
  return <>{parts.map((part, index) => {
    const entry = aliasMap.get(part.toLowerCase())
    return entry ? <TechnicalTerm entry={entry} key={`${part}-${index}`}>{part}</TechnicalTerm> : part
  })}</>
}
