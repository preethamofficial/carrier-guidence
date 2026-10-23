# Changelog

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
