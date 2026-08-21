# Paper Theater Production School

A media-rich instructional website for producing polished paper-cut Mandarin grammar films.

The course is built from two real HSK 3 productions and demonstrates:

- how Jonathan directs the complete studio from an iPhone through Telegram;
- how Hermes Agent running ChatGPT converts conversation into production work on a Linux host;
- what runs on owned hardware, what runs locally, which services are hosted, and which calls are paid;
- lesson and semantic-scene planning;
- character authority and xAI environment generation;
- deterministic character compositing and subtitle rendering;
- free-versus-paid Mandarin voice auditions;
- content-derived timing and static animatic approval;
- image-to-video pilots, hash-bound QA, failure evidence, and deterministic repair;
- human approval gates for language, identity, motion, editorial quality, and publication.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npx -y @google/design.md lint DESIGN.md
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
npm run qa
BASE_URL=https://paper-theater-production-school.vercel.app npm run qa
```

The QA runner uses the installed Chromium binary at `/snap/bin/chromium`. Change `executablePath` in `scripts/qa.mjs` when running elsewhere. `BASE_URL` can target any deployed environment; it defaults to the local preview server.

## Design system

`DESIGN.md` is the visual source of truth. The production interface uses:

- React 19 and TypeScript;
- Vite 8;
- native responsive CSS with light and dark tokens;
- Phosphor icons;
- curated, compressed WebP, MP3, and H.264 teaching media.

## Media status

The approved and published `又……又……` film supplies the final-film and motion examples. The `我还以为……，没想到……` project supplies the character, environment, keyframe, audition, and static-animatic examples. Its motion stage remains unauthorized.

No credentials, API keys, or private connection data are included.

`MEDIA_MAP.md` records the source and teaching purpose of every published image, poster, audio sample, and video excerpt. Visuals must prove their adjacent claim rather than serve as decoration.

## Licensing

Site source code is MIT licensed. Embedded production media and downloadable manual remain copyright Jonathan Caras unless separately licensed.
