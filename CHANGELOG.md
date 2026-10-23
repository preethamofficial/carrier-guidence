# Changelog

## 2026-10-23 — Daily employer job feed expansion

- Expanded the configured public job-board source list from 15 to 49 employers, adding official career-page URLs for direct verification.
- Scheduled the collector for 10:00 AM India Standard Time (04:30 UTC), with actual refresh time shown in IST.
- Added direct employer careers links to each matching job card and loaded the directory from the shared company source data.
- Changed successful board refreshes to remove postings no longer advertised by that source; temporarily unavailable boards retain last-known records with a visible warning.
- Added scraper regression tests for stale-job removal, failed-board fallback and source URL coverage; the scheduled workflow runs them before publishing.


## 2026-10-23 — Documentation and release hygiene

- Rewrote `CodeAtlas_Website/README.md` to describe the current pages, local setup, validation commands, data handling and the actual status of optional services.
- Added a root MIT `LICENSE` and `CONTRIBUTING.md` with setup, test, security and pull-request guidance.
- Verified the career feedback and mentor-request tables and user-scoped RLS policies are present in `supabase/schema.sql`; these forms still require the owner to configure Supabase before use.
- Closed PR #11 as superseded because its older branch overlaps with the Career Growth Planner already present on `main`; left a comment explaining the decision.
- GitHub Actions passed for the website README refresh. Follow-up checks for the new license and contribution guide were still running at the time of this update.


## 2026-10-23 — Graduate career journey foundation

- Added a 30-question weighted career assessment with 12 role profiles spanning technical, analytical, design, business, writing and people-centred work.
- Added a standalone deterministic scoring engine and automated checks for assessment data, role coverage, score bounds, ranking and navigation.
- Added graduate onboarding for degree stream, graduation year, coding experience, goal, study time and target timeline.
- Added My Path, a local step tracker connecting career choice, learning plans, lessons, projects, resume preparation, interview practice and job search.
- Added a three-template resume builder with local saving, live preview and browser print-to-PDF.
- Linked the new pages from the main learning map and Career Studio; advanced the PWA cache and added the new assets to the offline shell.
- Updated repository documentation to reflect the known public Render URL and distinguish implemented static features from integrations that still need configuration.

### Known gaps after this change

- Supabase authentication, cross-device sync, row-level-security setup and account deletion/export flows are not configured.
- The server-side AI counsellor, live legally sourced job API/feed, source freshness UI, mentor/contact backend, and end-to-end browser tests still need implementation.
- The new pages and tests were committed, but a full test run and live desktop/mobile browser QA have not been independently executed in this environment.
