/**
 * Career tracks part C: Backend Development.
 * Compact-but-real: genuine authored content, honest draft/reviewed statuses.
 */
'use strict';

function track(t) { return Object.assign({ sharedModules: ['foundations-tech-career'], status: 'draft' }, t); }

module.exports = [
  track({
    id: 'backend-development',
    name: 'Backend Development',
    emoji: '🗄️',
    color: '#3776ab',
    tagline: 'Servers, APIs, databases — the machinery behind the screen.',
    overview: [
      'Backend development powers everything the browser asks for: APIs, business logic, data storage, authentication and integrations. Backend engineers design endpoints, model data, keep systems fast and secure, and make sure the app still works when a thousand users arrive at once.',
      'A practical entry path: pick one language (Python, JavaScript/Node, Go or Java), learn HTTP and SQL deeply, build a few CRUD APIs with authentication, then add testing and deployment.',
    ],
    responsibilities: ['Design and implement APIs', 'Model and query databases efficiently', 'Implement authentication and authorisation', 'Handle errors, logging and monitoring', 'Optimise slow queries and endpoints'],
    prerequisites: ['Beginner programming (Python or JavaScript)', 'Comfort with the terminal', 'Basic SQL (see the SQL language path)'],
    skills: { technical: ['HTTP & REST/GraphQL', 'SQL & one database', 'Authentication (sessions, JWT, OAuth)', 'Caching & async basics', 'Testing & profiling'], tools: ['Git', 'Postman/curl', 'Docker basics', 'A cloud (any free tier)', 'Log viewers'], soft: ['Breaking requirements into endpoints', 'Writing API docs', 'On-call debugging discipline'] },
    sharedModules: ['foundations-tech-career', 'foundations-programming', 'foundations-web'],
    estHours: 500,
    levels: [
      {
        id: 'Beginner', title: 'Beginner', modules: [
          {
            id: 'be-basics', title: 'Your first API', lessons: [
              {
                id: 'be-basics-1', title: 'Request to response: what a server actually does', estMinutes: 45, status: 'reviewed',
                objectives: ['Trace a request through routing, handler and response', 'Return JSON with correct status codes'],
                intro: ['A web server listens on a port, matches each incoming request to a route, runs a handler function, and returns a response — usually JSON. The handler reads the request (path, query, body, headers), does work (query the database, compute), and returns a status code plus body.', 'Status codes are part of your API contract: 200 for success, 201 for created, 400 for bad input, 401/403 for auth problems, 404 for missing, 500 for your bug.'],
                keyPoints: ['Route → handler → response is the core loop.', 'Return meaningful status codes, not always 200.', 'JSON is the default data format for web APIs.', 'Validate input at the boundary; never trust the client.'],
                practice: ['Build an API with one GET endpoint that returns a hard-coded list of users as JSON.'],
                resources: [{ title: 'MDN — An overview of HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' }],
              },
              {
                id: 'be-basics-2', title: 'CRUD APIs with a real database', estMinutes: 60, status: 'reviewed',
                objectives: ['Implement create/read/update/delete endpoints', 'Map HTTP verbs and status codes to CRUD correctly'],
                intro: ['CRUD (Create, Read, Update, Delete) maps neatly onto HTTP: POST creates (201), GET reads (200), PUT/PATCH updates (200), DELETE removes (204). Pair each with a database table and you have the backbone of most apps.', 'Always validate the body before writing to the database, use parameterised queries to prevent SQL injection, and return 404 for resources that do not exist rather than an empty success.'],
                keyPoints: ['POST 201 · GET 200 · DELETE 204 is a sane convention.', 'Parameterised queries prevent SQL injection.', 'Validate every field before it reaches the database.', 'Return 404 for missing resources.'],
                practice: ['Build a notes API (create, list, get one, update, delete) backed by SQLite or Postgres.'],
                resources: [{ title: 'PostgreSQL — tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html' }],
              },
              {
                id: 'be-basics-3', title: 'Authentication without rolling your own crypto', estMinutes: 55, status: 'draft',
                objectives: ['Explain password hashing and why plain text is unacceptable', 'Implement session or token login safely'],
                intro: ['Store passwords only as hashes made with a slow, salted algorithm (bcrypt, scrypt, argon2) — never plain text, never fast hashes like bare SHA-256. On login, hash the attempt and compare.', 'Choose sessions (server-side state in a cookie) or tokens (JWT or opaque tokens returned by a login endpoint). Sessions are simpler to revoke; make cookies HttpOnly and Secure.'],
                keyPoints: ['Hash with bcrypt/scrypt/argon2 + per-user salt.', 'Use established libraries; never invent crypto.', 'HttpOnly, Secure cookies for session tokens.', 'Rate-limit login endpoints against brute force.'],
                practice: ['Add signup/login with hashed passwords to your notes API, and protect two endpoints.'],
              },
            ],
          },
        ],
      },
      {
        id: 'Intermediate', title: 'Intermediate', modules: [
          {
            id: 'be-scale', title: 'Performance and reliability', lessons: [
              {
                id: 'be-scale-1', title: 'Indexes, N+1 queries and caching basics', estMinutes: 55, status: 'draft',
                objectives: ['Spot and fix N+1 query patterns', 'Add indexes for hot query paths'],
                intro: ['The most common backend performance bug is the N+1 query: loading a list, then making one extra query per row. Fix it with JOINs or batch loading. The second most common is missing indexes — check EXPLAIN before assuming a query is "just slow".', 'Caching (in-memory or Redis) helps read-heavy endpoints, but adds staleness bugs: cache deliberately, with explicit expiry.'],
                keyPoints: ['N+1 queries: one list query + one per item — fix with JOINs.', 'Index columns used in WHERE, JOIN and ORDER BY.', 'Measure with EXPLAIN, not guesses.', 'Caching trades staleness for speed — be explicit.'],
                practice: ['Take a slow list endpoint, log its queries, and reduce the query count to a constant.'],
              },
            ],
          },
        ],
      },
      {
        id: 'Advanced', title: 'Advanced', modules: [
          {
            id: 'be-arch', title: 'Distributed thinking', lessons: [
              {
                id: 'be-arch-1', title: 'Message queues, idempotency and eventual consistency', estMinutes: 60, status: 'outline',
                objectives: ['Describe when a queue beats a direct call', 'Design idempotent consumers'],
                intro: ['Queues decouple producers from consumers so slow or flaky work (emails, image processing) cannot take down the request path. The catch: messages can arrive twice or out of order, so consumers must be idempotent — applying the same message twice has the same effect as once.'],
                keyPoints: ['Queues absorb bursts and isolate failures.', 'At-least-once delivery means idempotent consumers.', 'Use idempotency keys for unsafe operations.', 'Eventual consistency is a product decision, not only a technical one.'],
                practice: ['Design an email-sending flow with a queue, retries and deduplication — on paper.'],
              },
            ],
          },
        ],
      },
      {
        id: 'Job preparation', title: 'Job preparation', modules: [
          {
            id: 'be-jobprep', title: 'Backend interview patterns', lessons: [
              {
                id: 'be-jobprep-1', title: 'System design for juniors and SQL interviews', estMinutes: 50, status: 'reviewed',
                objectives: ['Structure a small system-design answer', 'Write complex SQL under time pressure'],
                intro: ['Junior system design questions are deliberately small ("design a URL shortener"): clarify requirements, propose the data model, sketch the API, note one bottleneck and how you would scale it. Depth on one design beats shallow talk of five technologies.', 'SQL interviews test joins, aggregation and window functions. Practice SELECT with GROUP BY, HAVING and simple window functions until writing them is mechanical.'],
                keyPoints: ['Clarify → data model → API → bottleneck → scale.', 'Practice joins, GROUP BY, HAVING, window functions.', 'Explain trade-offs out loud; interviewers want reasoning.', 'Ask clarifying questions — it is scored positively.'],
                practice: ['Time yourself designing a URL shortener in 15 minutes, speaking aloud.'],
              },
            ],
          },
        ],
      },
    ],
    projects: [
      { id: 'be-proj-1', title: 'Task management API', difficulty: 'beginner', description: 'REST API for projects and tasks with user auth, filtering and pagination.', steps: ['Schema: users, projects, tasks', 'CRUD endpoints with validation', 'Signup/login with hashed passwords', 'Filters, pagination and tests'] },
      { id: 'be-proj-2', title: 'Rate-limited URL shortener API', difficulty: 'intermediate', description: 'Shorten URLs, redirect with click counting, rate-limit by API key.', steps: ['Collision-safe short codes', 'Redirect handler with counters', 'API keys and rate limiting', 'Load-test with a simple script'] },
    ],
    interview: [
      { q: 'What is the N+1 query problem?', a: 'Loading a list of items and then issuing one separate query per item inside a loop. Fix by joining or batch-loading so the total query count is constant.' },
      { q: 'Sessions vs JWT — when would you pick each?', a: 'Sessions are simple to revoke (delete server state) and fit monoliths; JWTs are stateless and fit distributed services but need rotation and careful revocation design.' },
      { q: 'How do you prevent SQL injection?', a: 'Use parameterised queries / prepared statements from your driver or ORM; never concatenate user input into SQL strings.' },
    ],
    checklist: ['One CRUD API with auth, deployed somewhere', 'SQL: joins, aggregation, indexes understood', 'Password hashing done with a real library', 'Tests covering happy path and error cases', 'Can explain one design trade-off from your own project'],
    resources: [{ title: 'MDN — HTTP overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' }, { title: 'PostgreSQL docs', url: 'https://www.postgresql.org/docs/' }],
    status: 'reviewed',
  }),
];
