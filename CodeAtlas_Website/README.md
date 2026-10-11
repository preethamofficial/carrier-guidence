# CodeAtlas Website — starter project

CodeAtlas is a static, responsive learning website that turns eight programming languages into interactive topic maps and lesson pages.

## Included
- Python, JavaScript, TypeScript, Java, SQL, Go, Rust, and C#
- 11 topic groups per language (88 total): the original 10 plus one new Advanced topic per language
- Topic definitions and unique everyday Indian analogies
- 4 code patterns per topic, split into basic/guided and advanced sections
- Line-by-line notes for the first two examples in every topic
- Revealable practice and interview answers
- Code-copy buttons, topic search, completion tracking, bookmarks, notes, dark mode
- Links to official learning resources
- v1.1: animated hero, language badges, scroll progress, card tilt (`enhance.js`/`enhance.css`; respects reduced-motion)

## Content status
All 80 original topics (8 languages) now have specific key points, a worked practice answer and a real interview answer (v1.4). v1.12: every basic and guided example now has line-by-line notes (guided notes are rendered on the lesson page), the 80 placeholder advanced patterns are replaced with real, runnable-style examples, and all practice hints are specific to their question. v1.13: each of the 8 Advanced topics (the 11th per language) now has 6 key points, 6 practice questions, 6 interview questions and 5 advanced patterns at an advanced level. Remaining: no code has been executed by an automated test yet.
- Responsive desktop/mobile UI

## Run locally

Because the app fetches `data/curriculum.json`, serve the folder over HTTP instead of opening `index.html` as a `file://` URL.

### Option A: Python
```bash
cd CodeAtlas_Website
python -m http.server 8000
```
Open http://localhost:8000

### Option B: Node.js
```bash
npx serve .
```

## Deploy as a static site
Upload this folder to a GitHub repository and enable GitHub Pages, or deploy it to Netlify, Vercel, or another static hosting provider. No backend or API key is required for this starter.

## Content and accuracy notes
- Official documentation links are included per language. The curriculum is an educational starting point, not a replacement for the language specifications or full official references.
- Examples are illustrative learning patterns. A few examples intentionally show design prompts or abbreviated snippets; adapt and test them in the correct language/runtime before using them in production.
- SQL syntax differs between PostgreSQL, MySQL, SQL Server and SQLite; examples are primarily PostgreSQL-oriented unless noted.
- Progress, bookmarks and personal notes are stored in the browser's localStorage. They do not sync across devices and are not a login/account system.
- Code is displayed and can be copied, but this starter does not execute code in the browser. To run arbitrary code safely, add an isolated sandbox or external execution service with strict resource and security limits.

## Suggested next production steps
1. Review every code example with the target compiler/runtime and add automated checks.
2. Expand the generated answer notes into fully worked solutions for every practice challenge.
3. Add a secure backend if you need user accounts, synced progress, analytics, or admin editing.
4. Add a real code runner only with sandbox isolation, execution limits and abuse protections.
5. Add citations/official references at the individual lesson level and review content for each language version.
