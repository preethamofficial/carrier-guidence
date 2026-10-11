/**
 * Shared foundation modules — referenced by many career tracks so the same
 * lesson is not duplicated across tracks. Each lesson either (a) links to an
 * existing language topic via `sharedRefs`, or (b) carries its own content.
 * Status values: outline | draft | reviewed | published.
 */
'use strict';

module.exports = [
  {
    id: 'foundations-tech-career',
    level: 'Foundations',
    title: 'How IT careers actually work',
    estHours: 4,
    lessons: [
      {
        id: 'foundations-tech-career-1',
        title: 'Roles in modern IT teams',
        estMinutes: 35,
        status: 'reviewed',
        objectives: [
          'Name the common entry-level roles in software and IT',
          'Describe how engineers, analysts, QA, IT support and data roles collaborate',
        ],
        intro: [
          'Modern IT teams are built from specialised roles that hand work to each other. A typical product team might include frontend engineers (user interface), backend engineers (servers and data), QA engineers (testing), data analysts (metrics), IT support (access and hardware) and a product manager (decides what to build). Entry-level jobs usually sit inside one of these roles, but you will talk to all of them every week.',
          'Understanding this map helps you choose a first role and explains why nearly every job posting asks for communication skills alongside technical ones: your daily work is translating between roles.',
        ],
        keyPoints: [
          'Entry-level roles include junior developer, QA/test engineer, IT/support engineer, data analyst and DevOps associate.',
          'Work flows in cycles: plan → build → test → release → monitor → fix.',
          'Each role owns a different quality attribute: speed, correctness, cost, security or usability.',
          'Communication is part of the job, not a bonus skill.',
        ],
        practice: [
          'Write three sentences describing what a junior backend engineer does on a normal Tuesday.',
        ],
        resources: [{ title: 'Google — Career Certificates overview', url: 'https://grow.google/certificates/' }],
      },
      {
        id: 'foundations-tech-career-2',
        title: 'Reading job descriptions without panic',
        estMinutes: 30,
        status: 'reviewed',
        objectives: [
          'Decode common job-description phrasing into concrete skills',
          'Separate "required" from "nice-to-have" honestly',
        ],
        intro: [
          'Job descriptions are marketing documents written by several people. "1–3 years experience" on an entry-level role usually means "you should have built a few real projects". "Familiarity with the MERN stack" means MongoDB, Express, React and Node — a checklist you can map to your learning plan.',
          'A practical method: list every technology mentioned, mark each as (a) already used by you in a project, (b) learned but not in a project, (c) untouched. Apply where (a) and (b) are at least a third of the list.',
        ],
        keyPoints: [
          'Translate vague phrases into specific technologies and skills.',
          'Compare your project evidence against the list, not your feelings.',
          'Apply when you match ~1/3 of the list — "requirements" are often wish-lists.',
          'Track every application; rejection rates are high and impersonal for everyone.',
        ],
        practice: [
          'Find one real junior-role description, extract its skill list, and mark each item a/b/c as above.',
        ],
        resources: [{ title: 'LinkedIn — job interview tips', url: 'https://www.linkedin.com/business/talent/blog/job-interview-tips' }],
      },
      {
        id: 'foundations-tech-career-3',
        title: 'Setting up a sustainable study routine',
        estMinutes: 25,
        status: 'reviewed',
        objectives: [
          'Build a realistic weekly study timetable you can keep',
          'Use deliberate practice instead of passive video watching',
        ],
        intro: [
          'Consistency beats intensity. One hour of focused building most days outperforms a nine-hour Sunday cram session, because skills consolidate between sessions. Plan around your real life: pick fixed slots, put them in a calendar, and protect them.',
          'Deliberate practice means: attempt something slightly beyond your comfort zone, struggle productively, then check yourself (run the tests, compare with the official docs, ask for review). Re-watching tutorials feels productive but rarely builds skill on its own.',
        ],
        keyPoints: [
          'Short, frequent sessions beat long, rare ones.',
          'Every session should include building or answering — not only watching.',
          'Track hours so progress is visible on hard weeks.',
          'Rest is part of practice; sleep is when memory consolidates.',
        ],
        practice: [
          'Write a 7-day timetable with at least 5 study blocks, each with a concrete task.',
        ],
        resources: [],
      },
      {
        id: 'foundations-tech-career-4',
        title: 'Your first portfolio: what recruiters actually look at',
        estMinutes: 30,
        status: 'reviewed',
        objectives: [
          'Describe what makes a beginner project worth showing',
          'Plan a README that explains your project clearly',
        ],
        intro: [
          'Recruiters viewing junior portfolios spend under a minute per candidate on first pass. They look for: does it run, is there a README, does the code look organised, was this copied from a tutorial or extended with your own ideas? One well-explained project with a clear README beats five tutorial clones.',
          'A strong README answers: what problem does this solve, how do I run it, what did I learn, what would I add next. Screenshots and a live link (or short demo video) help a lot.',
        ],
        keyPoints: [
          'One explained project beats five unexplained clones.',
          'README must cover: problem, how to run, learnings, next steps.',
          'Show a live demo or demo video when hosting is hard.',
          'Original extensions to tutorials are fine if you explain your changes.',
        ],
        practice: [
          'Take your best project and write the four-section README described above.',
        ],
      },
    ],
  },
  {
    id: 'foundations-programming',
    level: 'Foundations',
    title: 'Programming fundamentals (shared)',
    estHours: 20,
    lessons: [
      {
        id: 'foundations-programming-1',
        title: 'Variables, types and your first programs',
        estMinutes: 40,
        status: 'reviewed',
        objectives: ['Explain what a variable is', 'Write and run a small program that reads input and prints output'],
        sharedRefs: ['python-1', 'javascript-1'],
        intro: [
          'A variable is a named box that holds a value your program can use later. Every value has a type — text (string), whole numbers (integer), decimal numbers (float), true/false (boolean) — and types decide what operations make sense.',
          'The fastest way to learn is to write tiny programs: read a name, print a greeting, add two numbers. The linked Python and JavaScript topics below cover this in depth with runnable examples.',
        ],
        keyPoints: [
          'Variables store values under a name; types define allowed operations.',
          'Input arrives as text unless you convert it explicitly.',
          'Print early and often while learning — it is your window into the program.',
          'Use the linked Python/JavaScript topics for full worked examples.',
        ],
        practice: ['Write a program that asks for two numbers and prints their sum and difference.'],
        resources: [{ title: 'Python — control flow tutorial', url: 'https://docs.python.org/3/tutorial/controlflow.html' }],
      },
      {
        id: 'foundations-programming-2',
        title: 'Conditions and loops',
        estMinutes: 45,
        status: 'reviewed',
        objectives: ['Use if/else to make decisions', 'Repeat work with for and while loops'],
        sharedRefs: ['python-2', 'javascript-2'],
        intro: [
          'Conditions let a program choose between paths; loops let it repeat work without copy-pasting. Together they express almost all procedural logic.',
          'Classic beginner traps: off-by-one errors in loops, using == when you meant =, and infinite while loops whose condition never becomes false.',
        ],
        keyPoints: [
          'if/else chooses a path; boolean expressions drive the choice.',
          'for loops suit a known count; while loops suit a condition.',
          'Test loops with 0, 1 and many items.',
          'Every while loop needs a change that eventually ends it.',
        ],
        practice: ['Print all even numbers from 1 to 20, then all odd numbers from 1 to 20.'],
        resources: [],
      },
      {
        id: 'foundations-programming-3',
        title: 'Functions and clean structure',
        estMinutes: 45,
        status: 'reviewed',
        objectives: ['Extract repeated logic into functions', 'Use parameters and return values correctly'],
        sharedRefs: ['python-3', 'javascript-3'],
        intro: [
          'A function is a named, reusable block of logic with inputs (parameters) and an output (return value). Functions keep programs readable as they grow: each should do one understandable job.',
          'Signs a function needs splitting: longer than a screen, needs comments to explain each step, or two call sites need slightly different versions of it.',
        ],
        keyPoints: [
          'Functions take parameters, do one job, and return a result.',
          'Name functions as actions: calculateTotal, sendEmail, isValid.',
          'Small focused functions are easier to test and reuse.',
          'Avoid functions that secretly change global state.',
        ],
        practice: ['Refactor your sum/difference program into functions calculateSum(a,b) and calculateDifference(a,b).'],
        resources: [{ title: 'MDN — JavaScript functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions' }],
      },
      {
        id: 'foundations-programming-4',
        title: 'Data structures you will use daily',
        estMinutes: 50,
        status: 'reviewed',
        objectives: ['Choose between arrays/lists, objects/maps and sets', 'Perform common add/search/remove operations'],
        sharedRefs: ['python-5', 'javascript-5'],
        intro: [
          'Almost every program organises data in a handful of structures. Arrays (lists) hold ordered items; objects (maps/dictionaries) hold labelled key→value pairs; sets hold unique values with fast membership tests.',
          'Choosing the right structure makes code both faster and clearer: a set for "have I seen this email before?", a map for "look up user by id", a list for "show tasks in order".',
        ],
        keyPoints: [
          'Lists/arrays: ordered, indexed, allow duplicates.',
          'Maps/objects/dicts: key→value lookup.',
          'Sets: uniqueness and fast "contains" checks.',
          'Watch data size: O(n) scans inside big loops get slow.',
        ],
        practice: ['Write a program that reads words and prints each unique word with how many times it appeared.'],
        resources: [],
      },
    ],
  },
  {
    id: 'foundations-web',
    level: 'Foundations',
    title: 'How the web works (shared)',
    estHours: 6,
    lessons: [
      {
        id: 'foundations-web-1',
        title: 'HTTP, requests and responses',
        estMinutes: 35,
        status: 'reviewed',
        objectives: ['Describe what happens when you open a website', 'Identify methods, status codes and headers'],
        intro: [
          'When you visit a URL, your browser sends an HTTP request (method + URL + headers) to a server, which returns a response (status code + headers + body). GET reads data, POST creates it, PUT/PATCH update, DELETE removes.',
          'Status codes group outcomes: 2xx success, 3xx redirect, 4xx your mistake (404 not found, 403 forbidden), 5xx server fault. Debugging web apps is mostly reading these carefully.',
        ],
        keyPoints: [
          'Browsers speak HTTP: request in, response out.',
          'Methods encode intent: GET read, POST create, PUT update, DELETE remove.',
          '2xx success · 4xx client error · 5xx server error.',
          'Headers carry metadata like content-type and authorisation.',
        ],
        practice: ['Open browser dev tools, load any site, and list the requests, methods and status codes you see.'],
        resources: [{ title: 'MDN — HTTP overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' }],
      },
      {
        id: 'foundations-web-2',
        title: 'HTML structure and semantics',
        estMinutes: 40,
        status: 'reviewed',
        objectives: ['Build a valid page skeleton', 'Choose semantic elements over generic divs'],
        intro: [
          'HTML describes structure and meaning, not appearance. Semantic elements (header, nav, main, article, footer) tell browsers and screen readers what each region is for, improving accessibility and search ranking.',
          'Forms are central to real apps: learn input types, labels tied to inputs, and basic validation attributes.',
        ],
        keyPoints: [
          'Semantic HTML aids accessibility and SEO.',
          'Every input should have a matching label.',
          'Headings should nest in order (h1 → h2 → h3).',
          'Validate on the client AND the server.',
        ],
        practice: ['Build a contact-form page using only semantic HTML, with proper labels and required fields.'],
        resources: [{ title: 'MDN — HTML guides', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }],
      },
      {
        id: 'foundations-web-3',
        title: 'CSS layout and responsive design',
        estMinutes: 45,
        status: 'reviewed',
        objectives: ['Use flexbox and grid for layout', 'Make a page usable on phones'],
        intro: [
          'CSS controls presentation. Flexbox lays items in one dimension (a row or column); grid lays them in two (rows and columns). Between them you can build almost any layout without floats or hacks.',
          'Responsive design means your page works from 320px phones to wide desktops: use relative units (%, rem), media queries, and test in dev tools at multiple widths.',
        ],
        keyPoints: [
          'Flexbox for one-dimensional layouts, grid for two-dimensional.',
          'Prefer rem/% over fixed px for anything scalable.',
          'Mobile-first: base styles for small screens, enhance upward.',
          'Test at 320px, 768px and 1280px widths.',
        ],
        practice: ['Rebuild your contact-form page as a responsive card that looks good at 360px and 1280px.'],
        resources: [{ title: 'MDN — CSS layout', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout' }],
      },
    ],
  },
];
