# CodeAtlas Platform Upgrade — Project Audit (Phase A)

Date: 2026-10-09
Baseline: commit `232b168` (main); upgrade work branch: `feat/platform-upgrade`
Environment: Windows 11, PowerShell 5.1 (no `&&`), Node.js v24.15.0, npm 11.12.1, Git 2.53

## 1. Repository structure (actual filesystem)

```
carrier-guidence/
├── README.md                        (1 line: "# carrier-guidence")
├── serve-local.js                   (1.3 KB — static file server, port 8000)
├── CodeAtlas_Website/
│   ├── index.html                   (2.6 KB — app shell: sidebar, topbar, #view)
│   ├── app.js                       (22.9 KB, 145 lines — entire frontend logic)
│   ├── styles.css                   (18.5 KB — design tokens + components + dark theme)
│   ├── enhance.js                   (3.8 KB — hero typing, badges, reveal anim, tilt)
│   ├── enhance.css                  (2.6 KB — hero gradient, glyphs, reduced-motion)
│   ├── OFFICIAL_RESOURCES.json      (8 languages → official doc URLs)
│   ├── README.md                    (project description, run instructions)
│   └── data/
│       ├── curriculum.json          (1.02 MB — v2.0.0, 8 languages × 12 topics)
│       └── curriculum.backup-v1-13.json (471 KB — older v1.13 snapshot)
└── tools/build-curriculum/          (46 files — lesson sources & build scripts)
    ├── build.js, common.js          (assembler + shared helpers)
    ├── python.js … csharp.js        (8 per-language sources, 85–103 KB each)
    ├── concepts-1…8e.js             (deepen.js concept helper modules)
    ├── deepen.js                    (injects `intro` paragraphs into topics)
    ├── inject/normalize/repair/swap/topup/extras scripts  ⚠ potentially destructive
    └── tmp/                         (5 leftover debug scripts)
```

No `package.json`, no tests, no `.gitignore`, no `.env`, no backend anywhere.

## 2. Runtime & git baseline

- Git: clean, `main` == `origin/main` (`232b168`). Upgrade branch `feat/platform-upgrade` created before any changes.
- `node --check` passes on all 46 JS files. **Baseline: 0 syntax failures.**
- `serve-local.js`: plain `node:http` static server rooted at `CodeAtlas_Website/`, `PORT` env override, traversal guard `filePath.startsWith(ROOT)`.

## 3. Frontend architecture (app.js — classic script, no modules)

- Single global-scope script; `enhance.js` reads globals `currentLanguage` / `#view` — load order matters (`app.js` before `enhance.js`).
- Navigation: in-page functions `showHome / showAllLanguages / showLanguage(langId) / showLesson(langId, topicId) / showSearch()`; no hash routing, no browser history.
- Rendering: `view.innerHTML` templates; `enhance.js` decorates via `MutationObserver` on `#view`.
- `showLanguage` renders an SVG mind map (`mindMap()`), legend, topic cards, project list.
- Lesson view: intro → definition → analogy → key points → basic/guided/advanced examples → practice reveal-cards → interview reveal-cards → per-topic notes → prev/next.
- Search: substring match over title/definition/analogy/language/example titles; `/` focuses, `Escape` clears.
- Clipboard copy per code card; toasts; theme toggle.

## 4. Curriculum schema (validated from data, not from README)

Top level: `{ title, version: "2.0.0", languages: [ …8 ] }`

Language: `{ id, name, color, purpose, docs, topics[12], projects[2] }`

Topic: `{ id, title, level, definition, analogy, keyPoints[6], basicExamples[2], guidedExamples[2], advancedExamples[3], practice[6], interview[6], intro[5–6 paragraphs] }`

- Example: `{ title, code, lineByLine: [{ line, explanation }] }`
- Practice: `{ question, hint, answer }` — Interview: `{ question, answer }`

**Dynamic counts (computed from curriculum.json): 96 topics · 672 code examples · 384 practice questions · 384 interview questions · 96/96 topics with intro · levels: 32 Beginner / 32 Intermediate / 32 Advanced.**

⚠ Pre-existing documentation disagreements (recorded, not silently "fixed"): `CodeAtlas_Website/README.md` says "11 topic groups per language (88 total)"; actual data has **12 per language (96)**. All future counts must be computed from data.

## 5. localStorage keys (migration contract)

| Key | Format |
|---|---|
| `codeatlas-progress-v1` | `{ completed: string[], bookmarks: string[] }` (topic IDs like `python-1`) |
| `codeatlas-theme` | `'dark' \| 'light'` |
| `codeatlas-note-<topicId>` | plain string |

## 6. Known bugs recorded at baseline (pre-existing — do not attribute to the upgrade)

1. `enhance.js` card-tilt sets inline `transform` on mousemove — **not disabled by `prefers-reduced-motion`**.
2. `serve-local.js` calls `decodeURIComponent` un-guarded — malformed `%` sequences can throw inside the handler.
3. No browser history / back-button support.
4. No loading / empty / error states except one init-failure message.
5. Per-topic note keys scattered; no export mechanism.
6. Theme toggle lacks `aria-pressed`.
7. **No code has ever been executed by an automated test** (true at baseline).

## 7. Tools pipeline

- Per-language source modules export topic arrays → `build.js` assembles `curriculum.json`; `deepen.js` + `concepts-*.js` inject `intro` text (already run; 96/96).
- ⚠ `repair.js`, `inject.js`, `swap.js`, `normalize.js`, `topup*.js`, `extras*.js` mutate `curriculum.json` in place — never run without inspection; versioned backup exists.

## 8. Environment constraints confirmed

- `node:sqlite` (built into Node 24) initializes successfully → backend possible with **zero native npm dependencies** (no node-gyp/VS Build Tools needed).
- PowerShell 5.1: documented commands must avoid `&&`.

## 9. Gap summary versus target platform

No career tracks (only 8 language paths), no assessment, no quiz engine, no flashcards/spaced repetition, no study planning, no structured projects lab, no interview hub, no resume/job tools, no analytics, no backend/accounts/sync, no AI mentor, no tests, no package.json, no validation tooling, no hash routing/history, no accessibility pass.

