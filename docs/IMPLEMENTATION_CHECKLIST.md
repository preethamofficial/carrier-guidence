# Implementation Checklist (updated as phases complete)

Legend: [ ] todo · [~] in progress · [x] done & tested · [!] blocked/documented

## PHASE A — Audit and baseline
- [x] Inspect all files, schema, localStorage keys, git state → `docs/PROJECT_AUDIT.md`
- [x] Baseline checks: `node --check` 46/46 OK (recorded)
- [x] Feature branch `feat/platform-upgrade` created before changes

## PHASE B — Preserve & validate curriculum
- [ ] `tools/build-curriculum/validate.js` — schema, duplicate IDs, refs, quizzes, URLs
- [ ] Coverage report generator (`docs/CURRICULUM_COVERAGE.md`, dynamic counts)
- [ ] Curriculum tests (node:test) green · fix regressions only

## PHASE C — Frontend design & navigation
- [ ] Design tokens + component CSS (additive files; keep working views)
- [ ] Hash routing + browser history + breadcrumbs for all views
- [ ] Sidebar restructure (new sections), mobile nav, ARIA/keyboard pass
- [ ] Loading / empty / error / offline states
- [ ] Fix baseline bugs: reduced-motion tilt (enhance.js), decodeURIComponent guard (serve-local.js)

## PHASE D — Career catalogue & curriculum
- [ ] `data/careers.json` — 16 tracks, 5 levels, modules/lessons with real content
- [ ] Shared foundations module(s) referenced by tracks (no duplication)
- [ ] Catalogue view (search/filter/compare), career roadmap view, career lesson view
- [ ] Keep 8 language paths untouched and working

## PHASE E — Learning engine
- [ ] `js/store.js` v2 state + migration from `codeatlas-progress-v1` (never destroys old data)
- [ ] Dashboard (continue-learning, per-track progress), analytics view
- [ ] Flashcards + SM-2-lite spaced repetition, review queue, weak-topic detection
- [ ] Study plan (daily goal, streaks, schedule estimate)
- [ ] Export / import personal data; quiz attempt tracking

## PHASE F — Backend & database
- [ ] `server/` zero-native-dep Node server (static + `/api`), `node:sqlite` migrations
- [ ] scrypt password hashing, session tokens (httpOnly cookie), CSRF double-submit
- [ ] Rate limiting, payload caps, safe errors, no secrets in responses
- [ ] Server tests: health, validation, persistence, isolation, rate limit

## PHASE G — Multi-provider AI mentor
- [ ] Provider registry (verify current official APIs before wiring; free-tier facts checked)
- [ ] `/api/ai/*` with timeout, retries, budgets, error classification, model allowlists
- [ ] Mentor UI (explain/tutorial/practice/hints/code review/interview/resume/compare)
- [ ] Built-in fallback mentor (curated from curriculum, labeled honestly) — no key needed

## PHASE H — Accounts & sync
- [ ] Register/login/logout, profile & preferences, cloud sync of v2 state
- [ ] Access control tests (user A ≠ user B), graceful offline behavior

## PHASE I — Projects, interview, resume, jobs
- [ ] `data/projects.json` project lab + tracking (status/GitHub link/notes)
- [ ] `data/interview.json` (aptitude, DSA, SQL, role-specific, HR) with explanations
- [ ] Resume builder + portfolio/GitHub checklists (local only)
- [ ] Job application tracker (validations, real-vs-example distinction)

## PHASE J — Regression, security, accessibility, E2E
- [ ] `npm test` all suites green; pre-existing failures reported separately
- [ ] Keyboard/focus/contrast/reduced-motion spot checks; XSS review of render paths
- [ ] E2E learner flow test (visit → career → lesson → complete → quiz → refresh → dashboard)

## PHASE K — Documentation & deployment
- [ ] Root README (Windows 11 PowerShell steps), docs/SETUP, docs/AI_PROVIDERS, docs/DEPLOYMENT
- [ ] `.env.example` (placeholders), `.gitignore` (db, logs, .env, node_modules)
- [ ] Honest limits documented (free tiers, hosting sleep, no guarantees)
