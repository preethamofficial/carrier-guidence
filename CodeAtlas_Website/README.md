# CodeAtlas — Career Guidance & Learning Platform

**Live site:** https://codeatlas-career-guidance.onrender.com/  
**Repository:** https://github.com/preethamofficial/carrier-guidence

CodeAtlas is a free, static-first career exploration and programming-learning website. It provides structured learning paths and tools to help learners compare career directions, plan study, practise interviews and prepare job applications.

> **Deployment note:** The Render URL is configured in the repository. A successful GitHub commit or configured URL does not by itself prove that the latest deployment is healthy. Verify the live site after each release.

## Current features

- Interactive programming learning map, language lessons and technology roadmaps.
- 52-week foundation course, specialisation paths and role-specific roadmaps.
- 30-question career-fit assessment with weighted relative matches, explanations and career comparison across 12 roles.
- Graduate onboarding and a guided **My Path** workflow connecting career exploration, learning, projects, resume preparation, interview practice and applications.
- Lesson comprehension checkpoints; answers and completion state are saved in the current browser.
- Career Studio interview practice, timed rounds, self-rating, notes and cover-letter draft support.
- Resume builder with three layouts, live preview, local saving and browser Print → Save as PDF.
- Resume-to-job-description comparison using local heuristic matching.
- Searchable company career-page directory and a job feed populated from configured public job-board sources; always verify each vacancy on the employer's website.
- Career methodology/source register and a feedback/mentor-request form that requires configured Supabase and a signed-in account.
- PWA manifest and best-effort offline shell.
- Optional Supabase authentication/cloud-sync scaffold; it is **not active by default**.

## Try it

- [Home / learning map](https://codeatlas-career-guidance.onrender.com/)
- [Graduate onboarding](https://codeatlas-career-guidance.onrender.com/onboarding.html)
- [Career assessment](https://codeatlas-career-guidance.onrender.com/assessment.html)
- [My Path](https://codeatlas-career-guidance.onrender.com/my-path.html)
- [Career Studio](https://codeatlas-career-guidance.onrender.com/career-studio.html)
- [Resume builder](https://codeatlas-career-guidance.onrender.com/resume-builder.html)
- [Recent jobs](https://codeatlas-career-guidance.onrender.com/jobs.html)
- [Career methodology and sources](https://codeatlas-career-guidance.onrender.com/career-methodology.html)
- [Privacy information](https://codeatlas-career-guidance.onrender.com/privacy.html)

## Run locally

Requirements: Node.js 18+ for the test suite and Python 3 for a simple static server.

```powershell
cd CodeAtlas_Website
python -m http.server 8000
```

Open http://localhost:8000. Do not open the page through `file://`; some pages load JSON files using `fetch()`.

## Validate changes

```powershell
cd CodeAtlas_Website
npm test
node --check assessment.js
node --check assessment-engine.js
node --check onboarding.js
node --check my-path.js
node --check resume-builder.js
node --check career-studio.js
python -m json.tool data/assessment.json
python -m json.tool data/curriculum.json
python -m json.tool data/year-curriculum.json
```

CI runs static checks on pushes and pull requests. Passing automated checks is not a substitute for manual browser testing. Before release, test desktop and mobile layouts, keyboard navigation, form validation, storage/export behavior, links, browser console/network errors and offline fallback.


## Automated job feed

- The configured collector checks 49 employer boards through public Greenhouse, Lever and Ashby job-posting endpoints, plus links to each employer's official careers page.
- GitHub Actions is scheduled daily at **10:00 AM India Standard Time (04:30 UTC)**. Scheduled workflows can be delayed by GitHub; the page displays the actual last refresh timestamp in IST.
- New listings are published to the static feed after validation and the resulting commit triggers the configured static-site deployment. The feed is not real-time; changes normally appear after the daily run and deployment.
- Listings are sourced from public employer job boards and link back to the original posting. When a board responds successfully, roles no longer returned by that board are removed. If a board fails to respond, its last-known listings are temporarily retained and the page reports the failed-source count.
- Coverage is limited to the configured boards. A company may change its ATS/provider, some identifiers may fail, and no collector can guarantee that a vacancy remains open after the source was checked. Verify each role on the employer's official page before applying.

## Data, privacy and limitations

- **Guest mode is local-first.** Profile information, assessment results, progress, notes and resume content remain in the current browser unless optional cloud sync is configured. They do not automatically sync across devices. Clearing browser data may erase them; export or save important work.
- **Assessment scores are relative guidance**, not validated psychometrics or a probability of employment. Timelines are planning estimates, not guarantees.
- **Interview practice is a practice tool**, not a live AI interviewer or speech evaluator. Review and personalise any generated/template-based resume or cover-letter content.
- **Resume matching is heuristic**, not an employer ATS and not a hiring prediction.
- **Job data is source-limited.** The collector only covers configured public boards. Posting dates can be missing or differ from first-seen/update timestamps. Verify the original employer listing before applying; no salary or hiring outcome is guaranteed.
- **Cloud accounts/sync are not ready for public use until configured.** The owner must set the Supabase project URL and public anon key, apply `supabase/schema.sql`, configure authentication/redirect URLs and deploy the account-deletion Edge Function. Never expose a Supabase service-role key in browser code.
- **Feedback and mentor requests** also depend on Supabase configuration and an authenticated user. A form on the page does not imply a mentor is available.
- **No live AI counsellor or hosted code-execution sandbox is included.** Any future AI integration should keep provider secrets server-side and apply rate limits, privacy safeguards, input limits and cost controls.

## Deployment and project status

Render static hosting is described in `../render.yaml`. The SEO checklist is in `SEO_DEPLOYMENT.md`; optional cloud setup instructions are in `../SUPABASE_SETUP.md`. After merging changes, confirm the Render deployment completed, open the live pages directly, and check the current GitHub Actions run.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for local checks and the pull-request workflow. Please report broken links, inaccurate content, accessibility issues or data-source problems with the page URL and reproducible steps. Do not include passwords, tokens or other private information in an issue or feedback message.
