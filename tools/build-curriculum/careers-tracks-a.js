/**
 * Career tracks part 1: Software Engineering, Frontend, Backend, Full-Stack.
 * Levels beyond Foundations carry their own modules; lessons with only
 * objectives + status 'outline' are honest scaffolding, not filler prose.
 */
'use strict';

module.exports = [
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    emoji: '⚙️',
    color: '#635bff',
    tagline: 'Design, build and maintain software systems end to end.',
    overview: [
      'Software engineering is the broad discipline of designing, building, testing and maintaining software. A software engineer works across the full stack of concerns — modelling data, writing code, writing tests, reviewing other people’s code and keeping systems running in production.',
      'For beginners it is the safest generalist entry point: the fundamentals (a language, version control, testing, teamwork) transfer to every specialisation, so you can start here and narrow later toward frontend, backend, data or DevOps without restarting.',
    ],
    responsibilities: [
      'Translate requirements into small, testable units of work',
      'Write, review and refactor code with clear structure',
      'Write and maintain automated tests',
      'Debug production issues and improve reliability',
      'Collaborate through version control, code review and estimation',
      'Document decisions so future changes are safe',
    ],
    prerequisites: [
      'Comfortable using a computer filesystem and terminal basics',
      'One programming language at beginner level (Python or JavaScript recommended)',
      'Willingness to read documentation regularly',
    ],
    skills: {
      technical: ['Data structures & algorithms basics', 'Object-oriented & functional styles', 'Testing (unit/integration)', 'SQL & relational modelling', 'HTTP & REST APIs'],
      tools: ['Git & GitHub', 'A code editor (VS Code)', 'Debugger & browser dev tools', 'Issue tracker', 'CI basics'],
      soft: ['Written communication', 'Breaking work into small steps', 'Giving/receiving code review', 'Estimating honestly'],
    },
    sharedModules: ['foundations-tech-career', 'foundations-programming'],
    estHours: 520,
    levels: [
      {
        id: 'Beginner', title: 'Beginner', modules: [
          {
            id: 'se-basics', title: 'Code that other people can read', lessons: [
              {
                id: 'se-basics-1', title: 'Readable code: naming, formatting, small functions', estMinutes: 45, status: 'reviewed',
                objectives: ['Apply consistent naming rules', 'Split long functions into single-purpose ones'],
                intro: ['Readable code is a professional skill, not a taste preference. Most maintenance time is spent reading, so optimise for the reader: descriptive names (isEmailValid, not chk), one level of indentation per block, functions under roughly 30 lines that do one job.', 'Adopt a formatter (Black for Python, Prettier for JS) and let it remove style debates entirely.'],
                keyPoints: ['Name things by what they mean, not how they are stored.', 'Functions should read like a paragraph: one idea.', 'Automate formatting instead of arguing about it.', 'Comments explain why, not what.'],
                practice: ['Take any 40-line function you have written and split it into named steps without changing behaviour.'],
              },
              {
                id: 'se-basics-2', title: 'Version control with Git: branch, commit, merge', estMinutes: 55, status: 'reviewed',
                objectives: ['Create branches and merge cleanly', 'Write useful commit messages', 'Recover from common mistakes'],
                intro: ['Git tracks snapshots of your project. The everyday loop is: create a branch, make small commits with clear messages, open a pull request, address review, merge. Commit early so nothing is lost, and write messages as sentences describing the change ("Fix off-by-one in pagination") rather than "update".', 'Learn git status, git diff, git log, git branch, git merge and how to undo with git restore before anything fancier.'],
                keyPoints: ['One logical change per commit.', 'Commit messages describe the change, not the file.', 'Pull requests are for review, not backup.', 'git status is your best friend when lost.'],
                practice: ['Make a repo, commit a file across three branches, merge them, and deliberately create then resolve a conflict.'],
                resources: [{ title: 'Git official docs — branching', url: 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging' }],
              },
              {
                id: 'se-basics-3', title: 'Reading stack traces and debugging systematically', estMinutes: 50, status: 'reviewed',
                objectives: ['Read a stack trace to find the fault line', 'Use the scientific method when debugging'],
                intro: ['A stack trace lists the chain of function calls that led to an error — read it looking for the first lines mentioning your own files. Reproduce the bug reliably, form one hypothesis, change one variable, observe. Random fixing wastes hours.', 'Print debugging works; breakpoints in a real debugger work better because you can inspect live values without editing code.'],
                keyPoints: ['Find your own code in the stack trace first.', 'Reproduce bugs on demand before fixing.', 'Change one thing at a time.', 'Fix the root cause, not the symptom.'],
                practice: ['Write a program with a deliberate off-by-one bug, run it, and use the stack trace to locate and fix it.'],
              },
            ],
          },
          {
            id: 'se-testing', title: 'Testing mindset', lessons: [
              {
                id: 'se-testing-1', title: 'Unit tests and the AAA pattern', estMinutes: 50, status: 'reviewed',
                objectives: ['Write unit tests using Arrange–Act–Assert', 'Cover edge cases, not just happy paths'],
                intro: ['A unit test checks one small piece of code in isolation. Structure tests as Arrange (set up data), Act (call the function), Assert (check the result). Test edge cases deliberately: empty input, zero, negative numbers, very long strings — that is where bugs live.', 'Aim for tests that fail for the right reason: if your test passes when the function is broken, the test is worthless.'],
                keyPoints: ['One behaviour per test, named after the behaviour.', 'Test edge cases first; they catch more bugs.', 'Tests that cannot fail are decoration.', 'Keep tests independent so one failure does not cascade.'],
                practice: ['Write 5 tests for a function that validates a password, including at least 3 edge cases.'],
                resources: [{ title: 'Python — unittest docs', url: 'https://docs.python.org/3/library/unittest.html' }],
              },
              {
                id: 'se-testing-2', title: 'Test-driven development: does it fit you?', estMinutes: 45, status: 'draft',
                objectives: ['Describe the red–green–refactor cycle', 'Decide when TDD helps and when it slows you down'],
                intro: ['Test-driven development means writing a failing test before the code that passes it: red (test fails), green (minimal code to pass), refactor (clean up). It produces well-tested code and clear design feedback, but can feel slow on exploratory work.', 'Even if you do not practice strict TDD, writing tests right after a feature works well. Choose per task, not by ideology.'],
                keyPoints: ['TDD cycle: failing test → minimal pass → refactor.', 'Good for well-specified logic; awkward for UI exploration.', 'Always write tests eventually — timing is the choice.'],
                practice: ['Implement a roman-numeral converter using strict red–green–refactor for 3 functions.'],
              },
            ],
          },
        ],
      },
      {
        id: 'Intermediate', title: 'Intermediate', modules: [
          {
            id: 'se-systems', title: 'Building reliable services', lessons: [
              {
                id: 'se-systems-1', title: 'Designing REST APIs that age well', estMinutes: 60, status: 'draft',
                objectives: ['Model resources and endpoints consistently', 'Version APIs and handle errors uniformly'],
                intro: ['A REST API exposes resources (nouns) with standard verbs: GET /orders, POST /orders, GET /orders/:id. Consistency matters more than cleverness — the same pagination, error and naming conventions everywhere. Plan for change: version the API and never break existing clients silently.', 'Return proper status codes and a uniform error body so clients can react programmatically.'],
                keyPoints: ['Resources are nouns; HTTP methods are verbs.', 'Uniform errors, pagination and auth across endpoints.', 'Version from day one; breaking changes need a new version.', 'Validate input at the boundary.'],
                practice: ['Design (on paper) the endpoints for a task-tracker API including pagination and error shapes.'],
              },
              {
                id: 'se-systems-2', title: 'Databases: schema design and safe migrations', estMinutes: 65, status: 'draft',
                objectives: ['Normalise tables to avoid duplicate data', 'Write reversible, safe migrations'],
                intro: ['Relational databases keep data consistent with schemas, keys and constraints. Model entities and relationships properly (one customer, many orders) and let the database enforce rules with foreign keys and unique constraints rather than trusting application code alone.', 'Migrations are versioned schema changes; write them so they can run on live data and, where possible, be reversed.'],
                keyPoints: ['Foreign keys and constraints beat application-only checks.', 'One fact stored in one place (normalisation).', 'Migrations are code: review and test them.', 'Index the columns you filter and sort by.'],
                practice: ['Design a schema for a library system (members, books, loans) in SQL and write the CREATE statements.'],
                resources: [{ title: 'PostgreSQL — tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html' }],
              },
            ],
          },
        ],
      },
      {
        id: 'Advanced', title: 'Advanced', modules: [
          {
            id: 'se-scale', title: 'Scale and architecture', lessons: [
              {
                id: 'se-scale-1', title: 'Performance: measure before optimising', estMinutes: 55, status: 'outline',
                objectives: ['Profile code to find real bottlenecks', 'Apply complexity reasoning to hot paths'],
                intro: ['Performance work starts with measurement, not intuition. Profile to find which function consumes time, optimise that, then measure again — the bottleneck usually moves somewhere surprising. Reason about complexity to avoid accidental quadratic loops over large data.'],
                keyPoints: ['Profile first; optimise second; re-measure always.', 'Nested loops over large inputs are the usual suspects.', 'Caching adds complexity — add it only after measurement.'],
                practice: ['Take an O(n²) function, rewrite it with a hash map, and benchmark both on 100k items.'],
              },
            ],
          },
        ],
      },
      {
        id: 'Job preparation', title: 'Job preparation', modules: [
          {
            id: 'se-jobprep', title: 'Interviewing for software engineering', lessons: [
              {
                id: 'se-jobprep-1', title: 'How coding interviews are actually run', estMinutes: 45, status: 'reviewed',
                objectives: ['Explain your thinking while coding', 'Handle the "what would you improve" follow-up'],
                intro: ['Most coding interviews are collaborative problem-solving: you think out loud, write code, test it, then discuss trade-offs. Interviewers grade communication as heavily as correctness — an incomplete solution explained clearly often beats a silent complete one.', 'Always narrate: restate the problem, state assumptions, describe your approach before typing, then test with an example.'],
                keyPoints: ['Restate, plan, then code — never type silently.', 'Talk through edge cases and complexity.', 'The follow-up tests depth: discuss trade-offs honestly.', 'Practice on a plain editor, not only a full IDE.'],
                practice: ['Record yourself solving a two-sum style problem out loud in 15 minutes.'],
              },
              {
                id: 'se-jobprep-2', title: 'Portfolio and GitHub hygiene for applications', estMinutes: 40, status: 'reviewed',
                objectives: ['Curate a profile that shows your best work', 'Write project READMEs that sell your thinking'],
                intro: ['Recruiters check your GitHub: pinned repositories should be your best 3–6 projects, each with a clear README, screenshots and recent commits. Hide abandoned tutorial clones. Contribution graphs matter far less than the quality of a few pinned projects.'],
                keyPoints: ['Pin your best 3–6 repos; hide the rest.', 'README: problem, stack, how to run, screenshots, learnings.', 'Recent, incremental commits show real workflow.', 'A short demo video in the README helps a lot.'],
                practice: ['Pin your three best projects and rewrite their READMEs using the four-section structure.'],
              },
            ],
          },
        ],
      },
    ],
    projects: [
      { id: 'se-proj-1', title: 'Personal expense tracker (CLI or web)', difficulty: 'beginner', description: 'Track daily expenses, categorise them, and report monthly totals.', steps: ['Model Expense records', 'Add/edit/delete commands', 'Aggregate by month and category', 'Persist to a file or SQLite'] },
      { id: 'se-proj-2', title: 'URL shortener service', difficulty: 'intermediate', description: 'Shorten long URLs, redirect, and show click counts.', steps: ['Design the schema and API', 'Implement shorten + redirect', 'Add click tracking', 'Handle collisions and validation'] },
    ],
    interview: [
      { q: 'What is the difference between an array and a linked list?', a: 'Arrays store items contiguously with O(1) index access but costly mid-insertion; linked lists store nodes with pointers, giving cheap insertion once at a node but O(n) access.' },
      { q: 'What does "idempotent" mean for an API?', a: 'An operation is idempotent if repeating it has the same effect as doing it once — PUT to set a value is idempotent; POST that creates a new record is not.' },
      { q: 'How do you decide a function is too long?', a: 'When it has multiple reasons to change, needs comments per section, or testing one part requires running all of it — split by responsibility, not line count.' },
    ],
    checklist: [
      'One language used confidently in at least two projects',
      'Git workflow with branches and pull requests understood',
      'Unit tests written for your own code, not only course code',
      'One REST API built and documented',
      'Resume reviewed by a human; GitHub profile curated',
      'Can solve easy algorithm problems while talking through them',
    ],
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
      { title: 'Python documentation', url: 'https://docs.python.org/3/' },
    ],
    status: 'reviewed',
  },
];
