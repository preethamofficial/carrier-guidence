# CodeAtlas — Free Programming & IT Career Learning Hub

CodeAtlas is a free, browser-based learning hub with an interactive programming map with 24 language and engineering learning tracks, 52-week foundation course, 22 IT specialisation paths, local learning dashboard, resume-to-job matcher, Career Studio practice tools, and a searchable company job-board directory.

## Run locally on Windows

From PowerShell:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
```

Open http://localhost:8000 and keep the terminal running. Use a local server rather than opening HTML with `file://`, because the curriculum is loaded as JSON.

## What is included

- **Programming map:** Python, JavaScript, TypeScript, Java, SQL, Go, Rust and C#; 128 topic lessons across these eight language paths, with topic-specific concept breakdowns, prerequisites, worked examples, edge cases, debugging, production guidance, practice and interview preparation.
- **Additional languages:** C, C++, PHP, Kotlin, Swift and Bash; each path now includes 16 topics, including missing subjects such as C preprocessor/macro safety, C++ move semantics, PHP REST APIs, Kotlin Flow, Swift ARC and Bash JSON automation. All existing language paths now expose a topic-specific study guide with prerequisites, concept breakdowns, worked examples, failure modes, edge cases, debugging checklists, real-world applications, production/security considerations, exercises, interview preparation and official documentation links. Snippets that depend on project setup or surrounding declarations are labeled as illustrative; always run them in the appropriate toolchain.
- **52-week curriculum:** foundations, programming, algorithms, web, APIs, databases, tests, Linux, containers, deployment, data/ML/security foundations and job readiness.
- **22 IT specialisations:** paths include frontend, backend, full-stack, mobile, data, AI/ML, GenAI, RAG, DevOps, .NET/C#, MLOps, SRE, QA automation, cybersecurity, Salesforce and blockchain. Each has staged modules and a capstone.
- **41 Career Roadmaps:** separate beginner-to-advanced learning paths for 41 roles across software engineering, AI/ML/data, cybersecurity, cloud/operations, QA/blockchain and product/business. Each path includes 12 ordered topics across four stages, guided explanations, step-by-step practice, common mistakes, portfolio milestones, official references, local completion tracking and JSON progress export.
- **Career Launchpad:** existing role roadmaps, resource links, job-application tracker and planning tools.
- **Career Command Center:** advanced offline-first workspace for a target-role skills matrix with evidence notes, goals and definitions of done, weekly sprint planning against a time budget, portfolio project tracking, application pipeline, weekly retrospectives, and JSON backup/restore. It uses browser storage and transparent self-assessment; it does not call paid APIs or predict hiring outcomes.
- **Career Studio:** directional career-fit quiz, local knowledge checks with explanations, role-specific interview question practice, on-device interview notes, editable cover-letter draft generator, official labour-market research links, a 30-day action plan and a personalized Career Growth Planner for eight role families. The planner compares self-declared demonstrated skills with a role checklist, creates a 30-day milestone plan, saves progress in local storage and exports a text copy; it is not an ATS score or hiring prediction.
- **Resume vs job match:** local weighted heuristic alignment score, matched terms, potential gaps and exportable suggestions. It is not an employer ATS and does not predict hiring.\n- **Job Board Directory:** searchable company career pages and job-search resources with original links.\n- **Recent Jobs feed:** source-labeled listings with search, location/source filters, and a recent-date filter. It starts empty until a successful scheduled scrape runs; posting date and freshness are not guaranteed.
- **Dashboard:** course progress, weekly target, check-ins/streak, focus timer, task list, journal and JSON backup/restore.
- **PWA/offline shell:** manifest and best-effort cache of core pages after a successful visit. External links still require internet.
- **Privacy-first defaults:** progress, quiz results, interview notes and planner state use this browser's local storage. There are no accounts or cloud sync in this static build.

## Useful pages

- Main learning map: http://localhost:8000/
- Dashboard: http://localhost:8000/dashboard.html
- Career Studio: http://localhost:8000/career-studio.html
- Career Command Center: http://localhost:8000/career-command-center.html
- Career Launchpad: http://localhost:8000/career.html
- Resume match: http://localhost:8000/resume-review.html
- IT specialisations: http://localhost:8000/specializations.html
- One-year course: http://localhost:8000/year-course.html
- Deep language lessons: http://localhost:8000/language-library.html\n- Job Board Directory: http://localhost:8000/job-boards.html\n- Recent Jobs feed: http://localhost:8000/jobs.html

## Validation

```powershell
node --check career-studio.js
npm test
python -m json.tool data/curriculum.json
python -m json.tool data/year-curriculum.json
```

The automated static test checks JSON, page viewport metadata, local references, the service-worker cache list, the core and additional language lesson catalogs, and the new jobs and company-directory pages. The GitHub Actions workflow also checks JavaScript syntax. These checks do not replace manual browser testing: test desktop/mobile layouts, keyboard-only navigation, local storage, downloads, offline behavior and browser-console errors before release.

## Job data collection and automation\n\nThe feed queries configured public Greenhouse, Lever, and Ashby board identifiers daily at 9:00 AM India Standard Time (03:30 UTC). When the scrape and validation succeed, GitHub Actions automatically commits changed job data to `main`; the workflow can also be run manually. The collector stores available job descriptions as plain text (up to 12,000 characters) and the website shows a preview with expandable full details. Missing descriptions or posting dates are marked honestly. First-seen time is not the same as employer posting date. The schedule is a target time; GitHub may delay scheduled workflows, and only configured boards are covered. Verify each listing on the employer's official careers page.\n\n## Security, accuracy and limitations

- Career quiz recommendations are directional reflections, not validated psychometric assessments.
- Knowledge-check scores are practice feedback, not professional certification.
- Resume alignment is a local keyword/heuristic score, not a recruiter-calibrated ATS prediction.
- Career Studio's interview questions are a practice bank; no live AI feedback or speech evaluation is performed.
- Cover letters are template-based drafts; review each statement and do not invent experience.
- Labour-market section links to primary sources and intentionally avoids invented live salary/trend figures. Check the geography and publication date of any data.
- Browser-local data does not sync across devices and may be cleared by browser settings. Avoid entering sensitive personal data in notes.
- No cloud authentication, hosted database, server-side AI inference or secure code execution sandbox is included.
- Never expose API keys in browser JavaScript. Any future AI integration should use a server-side API, secret environment variables, rate limits, input/output limits, privacy controls, abuse monitoring and provider-term review.

## SEO and hosting

The main page and Career Studio include descriptions and Open Graph metadata. A final `sitemap.xml`, canonical URLs, and production robots directives should be generated only after the actual public deployment URL and hosting base path are chosen. Do not publish a sitemap with a guessed domain. See `DESIGN.md` and `SEO_DEPLOYMENT.md`.

## Main files

- `index.html`, `app.js`, `styles.css`, `topic-additions-a.js`, `topic-additions-b.js`, `comprehensive-lessons.js`: expanded learning map, curated missing topics and topic-specific study guides.
- `dashboard.html`, `dashboard.js`, `dashboard.css`: learning dashboard.
- `career-studio.html`, `career-studio.js`, `career-studio.css`: Career Studio practice tools.
- `career-command-center.html`, `career-command-center.js`, `career-command-center.css`: advanced local career planning workspace.
- `career.html`, `career.js`, `career.css`: Career Launchpad.
- `resume-review.html`, `resume-review.js`, `resume-review.css`: resume matcher.
- `year-course.html`, `year-course.js`, `data/year-curriculum.json`: 52-week course.
- `language-library.html`, `language-library.js`, `extra-deep-lessons.js`, `comprehensive-lessons.js`: additional language pages connected to the expanded curriculum, including HTML, CSS, React, Node.js, Dart/Flutter, Git/GitHub, Linux/Shell, REST APIs, Docker/DevOps, and Data Structures & Algorithms. The combined runtime curriculum has 24 tracks and 344 topics: the original 14 language paths expanded to 16 topics each, plus 10 new tracks with 12 topics each.
- `specializations.html`, `specializations.js`: specialisation paths.
- `manifest.webmanifest`, `service-worker.js`, `pwa.js`: PWA shell.
- `tests/static-check.mjs`, `.github/workflows/static-check.yml`: static validation and CI.


## Web Development Roadmap

The main learning map includes an interactive end-to-end Web Development Roadmap. Search for **web development**, **web dev**, **full stack roadmap**, or **frontend roadmap**, or use the home-page button. The roadmap has four phases and 26 expandable topics across web foundations, frontend programming, backend/data, and production readiness. Every topic now opens its own advanced mind map with four topic-specific branches, at least 12 concepts, a mastery checklist, and official documentation links. Each topic also includes learning objectives, a representative code pattern, a practical challenge, and a link into the relevant lesson. The topic map catalogue is `web-development-topic-maps.js`; the roadmap renderer is `web-development-roadmap.js`; both are styled in `styles.css` and cached for offline use. Runtime tests verify all 26 maps, branch depth, reference links, search routing and related lesson links.


## Advanced Career Skills Atlas

The home page includes **Explore AI, DevOps, Cybersecurity & More** in addition to the Web Development Roadmap. The new `career-skills-roadmaps.js` module contains seven additional paths with 56 topic modules:

- **AI & Generative AI Engineering:** Python for AI, ML, transformers, LLM APIs, RAG, agents, evaluation/LLMOps, AI safety and serving.
- **DevOps, Cloud & Platform Engineering:** Linux, Git, Docker, CI/CD, cloud architecture, IaC/GitOps, Kubernetes/platform engineering, SRE and FinOps.
- **Cybersecurity & Defensive Security:** threat modelling, networking, OWASP, IAM, cloud/container security, SOC/SIEM, incident response, secure SDLC and AI security.
- **Linux, Networking & Systems:** shell/filesystem, processes/permissions, DNS/TCP/IP, storage/backups, scripting, service troubleshooting, SSH hardening, containers and VMs.
- **AI Tools, Automation & Productivity:** prompt design, source-based research, AI coding assistants, documents/spreadsheets, workflow automation, knowledge systems, multimodal workflows, privacy and governance.
- **Data Engineering, Analytics & MLOps:** SQL/data modelling, Python analytics, pipelines, warehouses/lakehouses, quality/governance, analytics engineering, experiment tracking, model serving and monitoring.
- **Tools & Professional Workflow:** Git/GitHub, VS Code, API clients, database workbenches, terminal/CLI, AI utilization, office/data reporting tools, documentation and secure collaboration.

Each module includes a topic-specific 12-concept mind map and the shared comprehensive study guide: detailed concept explanations, a mental model, real-world context, code walkthrough, common mistakes, edge cases, production guidance, a guided lab and a self-check. Official references and completion checks remain available. Search for a track name or click the new home-page button to open it. The service-worker cache is versioned to v16 so returning visitors receive the expanded lesson engine and styles. Trend choices were informed by primary-source materials including GitHub Octoverse, the CNCF cloud-native report, the Linux Foundation tech talent report, and the DSCI India cybersecurity skilling landscape; this is a curated learning curriculum, not a guarantee of hiring outcomes.
