/**
 * Career tracks part G: QA, data engineering, mobile, IT support, UI/UX,
 * business analysis. Same compact builder as part F.
 */
'use strict';

function o(id, title, objectives, minutes) {
  return { id, title, estMinutes: minutes || 45, status: 'outline', objectives, intro: [], keyPoints: [], practice: [], resources: [] };
}
function mkLevels(prefix, beginner, inter, adv, job) {
  return [
    { id: 'Beginner', title: 'Beginner', modules: [{ id: prefix + '-beg', title: beginner[0], lessons: beginner[1].map((t, i) => o(prefix + '-beg-' + (i + 1), t[0], t[1])) }] },
    { id: 'Intermediate', title: 'Intermediate', modules: [{ id: prefix + '-inter', title: inter[0], lessons: inter[1].map((t, i) => o(prefix + '-inter-' + (i + 1), t[0], t[1])) }] },
    { id: 'Advanced', title: 'Advanced', modules: [{ id: prefix + '-adv', title: adv[0], lessons: adv[1].map((t, i) => o(prefix + '-adv-' + (i + 1), t[0], t[1])) }] },
    { id: 'Job preparation', title: 'Job preparation', modules: [{ id: prefix + '-job', title: job[0], lessons: job[1].map((t, i) => o(prefix + '-job-' + (i + 1), t[0], t[1])) }] },
  ];
}
function track(t) { return Object.assign({ sharedModules: ['foundations-tech-career'], status: 'outline' }, t); }

const tracks = [];

tracks.push(track({
  id: 'testing-qa',
  name: 'Software Testing & QA Automation',
  emoji: '🧪', color: '#84cc16',
  tagline: 'Prove software works — and keep proving it automatically.',
  overview: ['QA engineers protect users by finding defects before release and building automation that catches regressions forever. Modern QA blends manual exploratory testing with coded automation, and increasingly shifts left into design and requirements reviews.', 'It is one of the most accessible software entries: strong analytical thinking plus one scripting language and a test framework can qualify you for junior roles, especially with domain curiosity.'],
  responsibilities: ['Design test plans from requirements', 'Perform exploratory testing', 'Build and maintain automated test suites', 'Report defects clearly', 'Champion quality in releases'],
  prerequisites: ['Comfort with one programming language', 'Analytical, detail-oriented mindset', 'Clear written communication'],
  skills: { technical: ['Test design techniques', 'UI automation (Playwright/Selenium)', 'API testing (Postman/code)', 'SQL for data checks', 'CI integration'], tools: ['Playwright or Cypress', 'Postman or REST-assured', 'Git', 'A test management tool', 'Bug trackers'], soft: ['Writing reproducible bug reports', 'Risk-based thinking', 'Advocating for quality politely'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 360,
  levels: mkLevels('qa',
    ['Testing foundations', [['Test design that finds real bugs', ['Apply boundary and equivalence partitioning', 'Write clear, reproducible bug reports']], ['Your first automated test', ['Write a UI test with Playwright', 'Run it in CI']]]],
    ['Automation at scale', [['Flake-free suites', ['Diagnose and fix flaky tests', 'Structure suites for speed']]]],
    ['Quality engineering', [['Testing strategy and risk', ['Design a risk-based test strategy', 'Shift quality left into requirements']]]],
    ['QA interviews', [['Demonstrating testing thinking live', ['Explore an unfamiliar app and narrate findings', 'Structure a test plan on the spot']]]]),
  projects: [{ id: 'qa-proj-1', title: 'Automated test suite for a public website', difficulty: 'beginner', description: 'Write 20 Playwright tests covering a real site’s critical journeys; run in CI.', steps: ['Map critical user journeys', 'Write stable selectors and tests', 'Add reporting and CI run', 'Triage and fix flakes'] }],
  interview: [
    { q: 'What is exploratory testing?', a: 'Simultaneous learning, design and execution of tests without a fixed script — testers use domain knowledge and curiosity to find issues scripted tests miss.' },
    { q: 'How do you handle a flaky test?', a: 'Quarantine it so it blocks no one, reproduce the root cause (timing, data, order dependence), fix properly, and track flake rate as a metric.' },
    { q: 'What belongs in a good bug report?', a: 'Clear title, environment/version, exact steps to reproduce, expected vs actual, severity, and evidence (logs/screenshots).' },
  ],
  checklist: ['Test design techniques applied to real apps', 'UI automation suite in CI', 'API testing with code', 'Bug reports a developer can act on immediately', 'One testing portfolio write-up'],
  resources: [{ title: 'Playwright docs', url: 'https://playwright.dev/' }, { title: 'Ministry of Testing', url: 'https://www.ministryoftesting.com/' }],
}));

tracks.push(track({
  id: 'data-engineering',
  name: 'Database Development & Data Engineering',
  emoji: '🏗️', color: '#a855f7',
  tagline: 'Design the pipelines and stores that make analytics possible.',
  overview: ['Data engineers build and maintain the systems that collect, store, transform and serve data: warehouses, pipelines, orchestration and quality checks. Analysts and ML engineers are your customers; reliability and correctness are your product.', 'A realistic entry comes from backend or analytics backgrounds: strong SQL plus Python, then batch/stream processing tools (dbt, Airflow, Spark) and warehouse platforms (Snowflake, BigQuery, Redshift).'],
  responsibilities: ['Design data models for analytics', 'Build and schedule data pipelines', 'Ensure data quality and lineage', 'Optimise storage and query performance', 'Govern access and privacy'],
  prerequisites: ['Strong SQL', 'Python programming', 'Backend or analytics experience helps'],
  skills: { technical: ['SQL advanced (modelling, performance)', 'Orchestration (Airflow/Dagster)', 'Transformation (dbt)', 'Batch and streaming concepts', 'Warehouse platforms'], tools: ['Python', 'dbt', 'Airflow', 'A cloud warehouse', 'Git'], soft: ['Data contracts with stakeholders', 'Writing clear runbooks', 'Thinking in SLAs'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 480,
  levels: mkLevels('de',
    ['Data modelling foundations', [['Dimensional modelling basics', ['Design star schemas', 'Choose keys and grain deliberately']], ['Pipeline anatomy', ['Build an ELT pipeline with tests', 'Schedule and monitor it']]]],
    ['Modern data stack', [['dbt and transformation', ['Model layered transformations in dbt', 'Add data tests and documentation']]]],
    ['Scale and streaming', [['Streaming fundamentals', ['Describe event streams vs batches', 'Design idempotent stream processing']]]],
    ['Data engineering interviews', [['SQL and modelling interviews', ['Solve complex SQL under time pressure', 'Defend a modelling choice']]]]),
  projects: [{ id: 'de-proj-1', title: 'Analytics pipeline from raw data to dashboard', difficulty: 'intermediate', description: 'Ingest raw CSVs/APIs, transform with dbt, expose clean tables to a BI tool.', steps: ['Extract and land raw data', 'Model in dbt with tests', 'Schedule with Airflow', 'Document lineage'] }],
  interview: [
    { q: 'Star schema vs snowflake schema?', a: 'Star schema keeps dimension tables denormalised for simple, fast queries; snowflake normalises dimensions to save space at the cost of more joins.' },
    { q: 'What is idempotency in pipelines?', a: 'Re-running a pipeline produces the same result — achieved by deterministic transformations and upserts keyed on stable identifiers.' },
    { q: 'How do you ensure data quality?', a: 'Tests on rows, ranges and relationships (e.g. dbt tests), freshness checks, anomaly detection, and clear ownership when data breaks.' },
  ],
  checklist: ['SQL advanced modelling comfortable', 'One orchestrated pipeline in a production-like setup', 'Transformation layer with tests (dbt or similar)', 'Data quality checks automated', 'Can explain lineage of any table you own'],
  resources: [{ title: 'dbt docs', url: 'https://docs.getdbt.com/' }, { title: 'Apache Airflow docs', url: 'https://airflow.apache.org/docs/' }],
}));


tracks.push(track({
  id: 'mobile-development',
  name: 'Mobile App Development',
  emoji: '📱', color: '#f97316',
  tagline: 'Ship apps people carry in their pockets.',
  overview: ['Mobile developers build applications for phones and tablets, either natively (Swift/Kotlin) or cross-platform (Flutter, React Native). Mobile work blends UI craft with platform constraints: battery, screen sizes, offline states and strict app-store review.', 'Entry paths differ: native requires learning a platform’s language and tooling; cross-platform lets web developers move faster with existing JavaScript skills. Both need real published (or well-tested) projects to show.'],
  responsibilities: ['Build responsive mobile interfaces', 'Integrate with backend APIs', 'Handle offline and background states', 'Meet platform performance expectations', 'Navigate app-store release processes'],
  prerequisites: ['Programming fundamentals', 'Either Swift/Kotlin basics or JavaScript for cross-platform', 'Patience with device-specific quirks'],
  skills: { technical: ['Platform UI frameworks', 'State management', 'Local storage and offline sync', 'Push notifications basics', 'App store distribution'], tools: ['Xcode or Android Studio', 'Flutter or React Native', 'Git', 'A backend API', 'Device emulators + real devices'], soft: ['Design collaboration', 'Writing store listings', 'Prioritising battery/performance trade-offs'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 470,
  levels: mkLevels('mob',
    ['Mobile foundations', [['Platform choice and first app', ['Compare native vs cross-platform honestly', 'Build and run a starter app on a device']], ['UI and navigation', ['Implement common navigation patterns', 'Handle screen sizes and orientation']]]],
    ['Data and state', [['Offline-first thinking', ['Cache data locally and sync', 'Handle conflict resolution basics']]]],
    ['Performance and release', [['Profiling and store release', ['Profile jank and memory', 'Prepare icons, listings and release builds']]]],
    ['Mobile interviews', [['Demo-driven interviews', ['Record a crisp app walkthrough', 'Explain one architecture decision']]]]),
  projects: [{ id: 'mob-proj-1', title: 'Habit tracker app with offline support', difficulty: 'beginner', description: 'Daily habit check-ins stored locally, charts of streaks, works fully offline.', steps: ['Data model + local storage', 'Check-in UI with streak logic', 'Charts screen', 'Test on two screen sizes'] }],
  interview: [
    { q: 'Native vs cross-platform — when which?', a: 'Native for maximum platform fidelity/performance; cross-platform (Flutter/RN) for speed and shared code across iOS/Android, with some trade-offs in deep platform integration.' },
    { q: 'How do you handle app state?', a: 'With a predictable pattern (provider, bloc, Redux-like store) separating UI state from business logic, so screens are testable and debuggable.' },
    { q: 'What causes app store rejections?', a: 'Crashes on review, broken links, misleading metadata, privacy violations (missing permission explanations), and policy non-compliance around payments or content.' },
  ],
  checklist: ['One app run on a real device', 'Offline/local storage handled deliberately', 'State management pattern applied', 'Performance profiled and improved once', 'Store-ready assets prepared'],
  resources: [{ title: 'Flutter docs', url: 'https://docs.flutter.dev/' }, { title: 'React Native docs', url: 'https://reactnative.dev/docs/getting-started' }],
}));


tracks.push(track({
  id: 'it-support-networking',
  name: 'IT Support & Networking',
  emoji: '🖧', color: '#14b8a6',
  tagline: 'Keep people and systems connected and working.',
  overview: ['IT support and networking professionals are the backbone of every organisation: they resolve user issues, manage hardware and accounts, and keep networks running. It is the most common on-ramp into a tech career, with clear progression into sysadmin, security or cloud roles.', 'Core skills are troubleshooting method, networking fundamentals (TCP/IP, DNS, DHCP), ticketing discipline and communication under pressure. Certifications like CompTIA A+ and Network+ are recognised entry credentials.'],
  responsibilities: ['Resolve user tickets promptly and clearly', 'Manage accounts, devices and permissions', 'Monitor and troubleshoot networks', 'Document fixes and known issues', 'Onboard and offboard users securely'],
  prerequisites: ['Strong troubleshooting temperament', 'Willingness to learn command line', 'Clear, patient communication'],
  skills: { technical: ['TCP/IP, DNS, DHCP, VPN', 'Windows/macOS/Linux admin basics', 'Ticketing systems', 'Scripting for repetitive tasks', 'Security hygiene'], tools: ['Active Directory basics', 'Ticketing (Jira/ServiceNow)', 'Network diagnostics (ping, traceroute)', 'Remote support tools', 'PowerShell or Bash'], soft: ['Explaining tech to non-technical users', 'Prioritising under pressure', 'Writing documentation people read'] },
  sharedModules: ['foundations-tech-career'],
  estHours: 300,
  levels: mkLevels('it',
    ['Support fundamentals', [['Structured troubleshooting', ['Apply a repeatable diagnostic method', 'Write clear ticket updates']], ['Networking basics', ['Explain IP, DNS and DHCP flow', 'Diagnose common connectivity issues']]]],
    ['Systems administration', [['User and device management', ['Manage accounts and permissions safely', 'Automate with PowerShell/Bash']]]],
    ['Growth into ops', [['From support to sysadmin/cloud', ['Script away repetitive tickets', 'Build a home lab for practice']]]],
    ['Support interviews', [['Scenario-based interviews', ['Talk through a live triage out loud', 'Show empathy and structure together']]]]),
  projects: [{ id: 'it-proj-1', title: 'Home network setup and documentation', difficulty: 'beginner', description: 'Configure a segmented home network; document topology, addressing and troubleshooting steps.', steps: ['Map current network', 'Segment guest/IoT networks', 'Document IP scheme and rules', 'Write a troubleshooting runbook'] }],
  interview: [
    { q: 'User says "the internet is down" — first steps?', a: 'Confirm scope (one user or many), check physical links and IP config, test name resolution vs connectivity, then escalate with findings if it is network-wide.' },
    { q: 'What is DNS and what fails when it breaks?', a: 'The system translating domain names to IP addresses; when it fails, sites "stop working" by name even though raw IP connectivity may still work.' },
    { q: 'How do you prioritise a full ticket queue?', a: 'By impact and urgency: many users blocked > one user blocked > individual annoyance; communicate ETAs so nobody is surprised.' },
  ],
  checklist: ['Networking fundamentals solid (TCP/IP, DNS, DHCP)', 'One OS administered comfortably', 'Scripting a repetitive task automated', 'Documentation written for a real fix', 'A+ or Network+ studied (optional but helpful)'],
  resources: [{ title: 'CompTIA IT certifications', url: 'https://www.comptia.org/en-us/it-certifications/' }, { title: 'Cloudflare Learning — what is DNS', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/' }],
}));


tracks.push(track({
  id: 'ui-ux-design',
  name: 'UI/UX & Product Design',
  emoji: '✏️', color: '#ec4899',
  tagline: 'Design products that are usable, useful and desirable.',
  overview: ['Product designers own how a product looks, feels and flows: research, information architecture, interaction design, visual design and prototyping. UX is the structure and usability; UI is the visual layer; real products need both.', 'A portfolio of end-to-end case studies matters far more than degrees: show the problem, your research, iterations with rationale, and the shipped outcome. Designers who can also implement (HTML/CSS, basic front-end) collaborate better with engineers.'],
  responsibilities: ['Run user research and synthesize findings', 'Design flows, wireframes and prototypes', 'Build and maintain design systems', 'Usability-test and iterate', 'Collaborate daily with engineering and product'],
  prerequisites: ['Visual fundamentals (hierarchy, spacing, type)', 'Empathy and curiosity about users', 'Tools: Figma or similar'],
  skills: { technical: ['Interaction design', 'Information architecture', 'Visual design systems', 'Prototyping', 'Usability testing'], tools: ['Figma', 'Prototyping tools', 'Analytics tools', 'Design systems', 'Basic HTML/CSS'], soft: ['Empathetic interviews', 'Defending design decisions with evidence', 'Receiving critique gracefully'] },
  sharedModules: ['foundations-tech-career', 'foundations-web'],
  estHours: 400,
  levels: mkLevels('ux',
    ['Design foundations', [['Visual hierarchy and layout', ['Apply hierarchy, spacing and type systematically', 'Critique a screen using principles']], ['Research basics', ['Run a short user interview', 'Synthesize findings into insights']]]],
    ['Interaction design', [['Flows and prototypes', ['Map a task flow end to end', 'Prototype and usability-test it']]]],
    ['Design systems', [['Components and tokens', ['Build a small component library', 'Document usage rules']]]],
    ['Design interviews', [['Portfolio case studies', ['Structure a case study: problem→research→design→outcome', 'Present and defend decisions']]]]),
  projects: [{ id: 'ux-proj-1', title: 'Redesign a confusing flow you use daily', difficulty: 'beginner', description: 'Pick a real pain point; research, redesign, prototype and usability-test it.', steps: ['Identify and scope the problem', 'Interview 3–5 users', 'Redesign with rationale', 'Usability-test and iterate'] }],
  interview: [
    { q: 'Walk me through a case study.', a: 'Problem and constraints → research insights → design decisions and alternatives considered → validation results → shipped outcome and learnings.' },
    { q: 'How do you handle disagreement with an engineer?', a: 'Understand the constraint first, then iterate on the design within it; use data or a quick test to break ties instead of authority.' },
    { q: 'What makes a good design system?', a: 'Consistent tokens and components, clear documentation, contribution rules, and adoption support — a product, not a static file.' },
  ],
  checklist: ['3+ end-to-end case studies', 'Usability testing done and shown', 'Figma proficiency with components/tokens', 'One design system contributed to', 'Basic HTML/CSS literacy'],
  resources: [{ title: 'Nielsen Norman Group — articles', url: 'https://www.nngroup.com/articles/' }, { title: 'Figma help center', url: 'https://help.figma.com/' }],
}));


tracks.push(track({
  id: 'business-analysis',
  name: 'Business Analysis & Product Operations',
  emoji: '📈', color: '#eab308',
  tagline: 'Bridge between what the business needs and what gets built.',
  overview: ['Business analysts translate business goals into requirements engineers can build, and keep stakeholders aligned. Product operations supports the product org itself: process, data, tooling and rituals that help product teams move faster.', 'This is a strong path for communicators who like structure and problem framing more than coding — though technical literacy dramatically increases effectiveness. Domain expertise (finance, healthcare, retail) compounds over time.'],
  responsibilities: ['Elicit and document requirements', 'Map and improve processes', 'Analyse data to support decisions', 'Facilitate alignment across teams', 'Support product operations and reporting'],
  prerequisites: ['Excellent written and verbal communication', 'Comfort with spreadsheets and basic analysis', 'Domain curiosity'],
  skills: { technical: ['Requirements elicitation and documentation', 'Process mapping (BPMN basics)', 'SQL/spreadsheet analysis', 'Product metrics', 'Tooling (Jira, Confluence)'], tools: ['Jira/Confluence', 'SQL', 'Spreadsheets', 'Diagramming tools', 'BI dashboards'], soft: ['Active listening', 'Facilitation', 'Saying no with alternatives', 'Stakeholder management'] },
  sharedModules: ['foundations-tech-career'],
  estHours: 320,
  levels: mkLevels('ba',
    ['Analysis foundations', [['Requirements that engineers trust', ['Elicit real needs vs stated wants', 'Write testable requirement statements']], ['Process mapping', ['Map an "as-is" process', 'Identify bottlenecks and waste']]]],
    ['Data-informed analysis', [['Metrics and reporting', ['Define a metric tree for a product', 'Build a small dashboard']]]],
    ['Product operations', [['Running the product engine', ['Improve a ritual (e.g. planning) with data', 'Design a reporting cadence']]]],
    ['BA interviews', [['Case and competency interviews', ['Structure a business case answer', 'Demonstrate stakeholder scenarios']]]]),
  projects: [{ id: 'ba-proj-1', title: 'Requirements pack for a small app', difficulty: 'beginner', description: 'Take a vague idea; produce vision, user stories, acceptance criteria and a process map.', steps: ['Stakeholder interviews', 'Process map as-is/to-be', 'User stories with acceptance criteria', 'Prioritised backlog with rationale'] }],
  interview: [
    { q: 'How do you handle conflicting stakeholder priorities?', a: 'Surface the conflict with data on goals/impact, facilitate a trade-off discussion against agreed criteria, and document the decision with rationale.' },
    { q: 'What makes a good user story?', a: 'A clear user/value framing plus testable acceptance criteria — "As a X, I want Y so that Z" with conditions of satisfaction everyone can verify.' },
    { q: 'How do you know requirements are complete?', a: 'They are testable, unambiguous to developers, cover edge cases and errors, and have sign-off from the people accountable for the outcome.' },
  ],
  checklist: ['One complete requirements pack written', 'Process mapping applied to a real process', 'SQL/spreadsheet analysis demonstrated', 'Facilitation experience (even meetups)', 'Domain knowledge developed deliberately'],
  resources: [{ title: 'IIBA — business analysis resources', url: 'https://www.iiba.org/' }, { title: 'Atlassian — user story guide', url: 'https://www.atlassian.com/agile/project-management/user-stories' }],
}));

module.exports = tracks;
