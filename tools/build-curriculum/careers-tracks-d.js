/**
 * Career tracks part D: Full-Stack.
 * Data-driven: full authored metadata; lesson levels carry real content for
 * Beginner and honest 'outline' scaffolds above that.
 */
'use strict';

function outlineLesson(id, title, objectives, minutes) {
  return { id, title, estMinutes: minutes || 45, status: 'outline', objectives, intro: [], keyPoints: [], practice: [], resources: [] };
}

function track(t) { return Object.assign({ sharedModules: ['foundations-tech-career'], status: 'draft' }, t); }

module.exports = [
  track({
    id: 'fullstack-development',
    name: 'Full-Stack Development',
    emoji: '🔁',
    color: '#13c29a',
    tagline: 'Own a feature from database table to rendered pixel.',
    overview: [
      'Full-stack developers work across both the frontend and backend of an application: designing the data model and API, then building the interface that uses them. In small teams and startups this breadth is essential; in larger organisations full-stack roles still exist but tend to lean toward one side.',
      'The learning path combines the frontend and backend tracks. The advantage is understanding the whole request cycle; the risk is depthlessness — mitigate it by going deep on one side first, whichever you enjoy more.',
    ],
    responsibilities: ['Build features across API and UI layers', 'Design data models that fit the product', 'Wire authentication end to end', 'Write tests on both sides of the stack', 'Deploy and monitor the whole application'],
    prerequisites: ['Beginner JavaScript or Python', 'HTML/CSS and JS DOM basics', 'Willingness to work in both browser and server tooling'],
    skills: { technical: ['One frontend framework', 'One backend framework', 'SQL data modelling', 'Auth end-to-end', 'Deployment pipelines'], tools: ['Git', 'Node/npm', 'A database', 'Docker basics', 'Hosting platform'], soft: ['Switching context productively', 'Explaining full flows to non-engineers', 'Owning a feature end to end'] },
    sharedModules: ['foundations-tech-career', 'foundations-programming', 'foundations-web'],
    estHours: 600,
    levels: [
      { id: 'Beginner', title: 'Beginner', modules: [{ id: 'fs-basics', title: 'Connect the two halves', lessons: [{
        id: 'fs-basics-1', title: 'Thinking in full request cycles', estMinutes: 45, status: 'reviewed',
        objectives: ['Trace a full-stack request from click to database and back', 'Identify where each layer’s responsibility ends'],
        intro: ['A full-stack feature is one continuous cycle: the UI captures intent, the frontend validates and sends an HTTP request, the backend authorises, validates and queries the database, then serialises a response the UI renders. Being able to narrate this cycle for your own project is the single best interview story you can have.', 'Practise drawing the cycle for any feature you build: boxes for UI, API, DB, with the data moving between them labelled.'],
        keyPoints: ['Trace: UI event → request → handler → DB → response → render.', 'Each layer validates again — never trust the layer before you.', 'Auth checks belong at the API, not only the UI.', 'Draw the cycle; diagrams expose missing steps.'],
        practice: ['Pick one feature in your project and write out its full request cycle in 6 steps.'],
      }] }] },
      { id: 'Intermediate', title: 'Intermediate', modules: [{ id: 'fs-auth', title: 'Full-stack auth done properly', lessons: [outlineLesson('fs-auth-1', 'Sessions vs tokens across the stack', ['Compare session-cookie and token auth flows', 'Explain CSRF and XSS defences'], 55)] }] },
      { id: 'Advanced', title: 'Advanced', modules: [{ id: 'fs-scale', title: 'End-to-end performance', lessons: [outlineLesson('fs-scale-1', 'Profiling a slow feature across layers', ['Measure frontend and backend latency separately', 'Identify the dominant cost'], 60)] }] },
      { id: 'Job preparation', title: 'Job preparation', modules: [{ id: 'fs-jobprep', title: 'Full-stack interview stories', lessons: [outlineLesson('fs-jobprep-1', 'STAR stories from your own projects', ['Structure project stories using Situation-Task-Action-Result', 'Quantify outcomes honestly'], 40)] }] },
    ],
    projects: [
      { id: 'fs-proj-1', title: 'Blogging platform with auth', difficulty: 'beginner', description: 'Users sign up, write posts, edit and delete their own; the public sees all posts.', steps: ['Schema: users, posts', 'Auth API + hashed passwords', 'Post CRUD API', 'UI: list, detail, editor'] },
      { id: 'fs-proj-2', title: 'Expense sharing app (Splitwise-lite)', difficulty: 'intermediate', description: 'Groups, expenses, per-member balances and settlement suggestions.', steps: ['Model groups/members/expenses', 'Balance calculation logic with tests', 'API + UI', 'Export balances as CSV'] },
    ],
    interview: [
      { q: 'Walk me through what happens when a user submits a login form.', a: 'The browser POSTs credentials; the server rate-limits, validates format, looks up the user, compares the password hash, then creates a session (Set-Cookie) or returns a token; the client includes it in subsequent requests; the server authorises each request against it.' },
      { q: 'Where should validation live?', a: 'In the UI for feedback, and always again in the API — the UI can be bypassed with curl, so the server is the authority.' },
      { q: 'How do you keep frontend and backend types in sync?', a: 'Shared type definitions (TypeScript types or an OpenAPI schema) generated from one source of truth, plus contract tests on critical endpoints.' },
    ],
    checklist: ['One deployed full-stack app with auth', 'Can trace and explain every request cycle in your project', 'SQL modelling understood, not only ORM magic', 'Frontend and backend tests both exist', 'Comfortable debugging across layers with logs'],
    resources: [{ title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' }, { title: 'Node.js docs', url: 'https://nodejs.org/docs/latest/api/' }],
    status: 'reviewed',
  }),
];
