/**
 * Career tracks part F: remaining 10 tracks (AI applications, cybersecurity,
 * cloud, devops, QA, data engineering, mobile, IT support, UI/UX, business
 * analysis). Full authored metadata; lesson statuses honestly 'outline' —
 * the coverage report shows these tracks as outline until content is written.
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
  id: 'ai-app-development',
  name: 'AI Application Development & Automation',
  emoji: '🤖', color: '#06b6d4',
  tagline: 'Build practical products on top of AI models and automation.',
  overview: ['This track sits between raw ML engineering and product development: building applications that call existing AI models (including large language models), add retrieval from your own data, and automate workflows with reliable guardrails. It needs strong software engineering more than maths.', 'Demand grew with accessible LLM APIs. Entry is realistic for developers who already write APIs and want to add AI features responsibly — with evaluation, cost control and safety in mind.'],
  responsibilities: ['Integrate AI model APIs into products', 'Build retrieval/augmentation pipelines', 'Design prompt and evaluation harnesses', 'Add guardrails, logging and cost controls', 'Automate business workflows end to end'],
  prerequisites: ['Solid backend or full-stack skills', 'Comfort with HTTP APIs and JSON', 'Understanding of data privacy basics'],
  skills: { technical: ['LLM API integration', 'Retrieval-augmented generation (RAG)', 'Evaluation and prompt engineering', 'Vector databases basics', 'Workflow automation'], tools: ['Python or Node', 'Model provider APIs', 'Vector store', 'Observability tools', 'Git'], soft: ['Scoping AI features honestly', 'Explaining model limits to users', 'Safety and ethics awareness'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 420,
  levels: mkLevels('aia',
    ['AI-powered features from API to product', [['Calling a model API safely', ['Integrate a chat model behind your own API', 'Handle timeouts, retries and errors']], ['Prompting as engineering', ['Write system prompts with clear constraints', 'Version and test prompts']]]],
    ['Retrieval and grounding', [['RAG pipelines', ['Chunk, embed and retrieve domain documents', 'Ground answers and cite sources']]]],
    ['Reliable AI systems', [['Evaluation harnesses', ['Build regression sets for AI features', 'Measure quality, cost and latency']]]],
    ['AI product interviews', [['Explaining an AI project end to end', ['Describe architecture, evals and guardrails', 'Discuss failure modes you handled']]]]),
  projects: [{ id: 'aia-proj-1', title: 'Document Q&A assistant over your own notes', difficulty: 'beginner', description: 'Upload text/PDF notes; ask questions; get grounded answers with sources.', steps: ['Chunk + embed documents', 'Retrieve top-k passages', 'Prompt model with context', 'Show sources; add feedback loop'] }],
  interview: [
    { q: 'How do you prevent a chatbot from inventing facts?', a: 'Ground it with retrieval over trusted documents, require citations, restrict answers to retrieved context, and measure hallucination rate on a fixed test set.' },
    { q: 'How do you control cost for an LLM feature?', a: 'Cap input/output tokens, cache repeated prompts, use smaller models for simple subtasks, and monitor spend per request with alerts.' },
  ],
  checklist: ['One AI feature shipped end to end', 'Evaluation set and harness built', 'Understands RAG trade-offs', 'Cost and safety guardrails in place', 'Can explain failure modes honestly'],
  resources: [{ title: 'OpenAI API docs', url: 'https://platform.openai.com/docs' }, { title: 'LangChain docs', url: 'https://python.langchain.com/docs/introduction/' }],
}));

tracks.push(track({
  id: 'cybersecurity',
  name: 'Cybersecurity',
  emoji: '🛡️', color: '#ef4444',
  tagline: 'Defend systems, find weaknesses, respond to incidents.',
  overview: ['Cybersecurity protects the confidentiality, integrity and availability of systems and data. Roles range from defensive (security operations, monitoring, hardening) to offensive (penetration testing) to governance (risk, compliance).', 'Entry often comes via IT support or networking roles plus self-study and labs; certifications (Security+, CySA+) help open doors. Expect continuous learning. This platform teaches defensive fundamentals and does not teach attacking systems you do not own.'],
  responsibilities: ['Monitor and triage security alerts', 'Harden systems and configurations', 'Run vulnerability scans and track remediation', 'Respond to incidents and document them', 'Educate users on safe practices'],
  prerequisites: ['Networking fundamentals (TCP/IP, DNS, HTTP)', 'Comfort with Linux command line', 'Systems or IT support experience helps'],
  skills: { technical: ['Network security fundamentals', 'Linux/Windows hardening', 'Vulnerability management', 'Logging and SIEM basics', 'Scripting (Python/Bash)'], tools: ['Linux CLI', 'Wireshark (your own traffic)', 'Nmap (authorised targets only)', 'A SIEM (e.g. Elastic)', 'Password managers and MFA'], soft: ['Clear incident reporting', 'Scepticism without paranoia', 'Ethics and legal awareness'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 500,
  levels: mkLevels('cy',
    ['Security foundations', [['CIA triad and threat modelling', ['Identify assets, threats and mitigations', 'Apply the CIA triad to real scenarios']], ['Safe hands-on labs', ['Set up an isolated practice lab', 'Practise hardening a local VM']]]],
    ['Defensive operations', [['Log analysis and alert triage', ['Read auth and access logs', 'Prioritise alerts by severity']]]],
    ['Offensive awareness', [['Vulnerability assessment', ['Scan and report on systems you own/authorised', 'Write actionable remediation steps']]]],
    ['Security interviews', [['Thinking like a defender in interviews', ['Structure incident-response answers', 'Explain a vulnerability you fixed']]]]),
  projects: [{ id: 'cy-proj-1', title: 'Home lab hardening project', difficulty: 'beginner', description: 'Build an isolated VM lab, apply a hardening checklist, and document before/after.', steps: ['Snapshot a vulnerable VM', 'Apply CIS-style hardening', 'Verify with scans on your lab', 'Write a remediation report'] }],
  interview: [
    { q: 'Explain the difference between authentication and authorisation.', a: 'Authentication verifies who you are; authorisation decides what that identity may do. They are separate layers and both must be enforced.' },
    { q: 'What is the first step in incident response?', a: 'Preparation, then detection and analysis: confirm the alert is real, scope it, and preserve evidence before containment.' },
    { q: 'How does MFA resist password theft?', a: 'A stolen password alone is insufficient; the attacker also needs the second factor (phone app, hardware key), much harder to phish at scale.' },
  ],
  checklist: ['Networking fundamentals solid', 'Isolated lab built and used regularly', 'One hardening project documented', 'Logs and SIEM basics understood', 'Ethics and legal boundaries clear'],
  resources: [{ title: 'OWASP — web security top ten', url: 'https://owasp.org/www-project-top-ten/' }, { title: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' }],
}));


tracks.push(track({
  id: 'cloud-computing',
  name: 'Cloud Computing',
  emoji: '☁️', color: '#0ea5e9',
  tagline: 'Run reliable systems on rented infrastructure — smartly.',
  overview: ['Cloud computing means running workloads on someone else’s computers, metered by usage. Cloud engineers design how applications use compute, storage and networking in the cloud, keeping them available and cost-effective. It underpins nearly every modern software team.', 'A practical entry: pick one provider (AWS, Azure or GCP), get hands-on with free tiers, and automate with infrastructure-as-code. Certifications help pass résumé screens; projects prove you can actually build.'],
  responsibilities: ['Provision and manage cloud resources', 'Design for high availability and recovery', 'Monitor performance and cost', 'Automate infrastructure with code', 'Support developers with environments and pipelines'],
  prerequisites: ['Networking basics (IP, DNS, HTTP)', 'Linux command line', 'Some scripting (Bash or Python)'],
  skills: { technical: ['Compute, storage and networking primitives', 'IAM and security basics', 'Infrastructure as code', 'Monitoring and alerting', 'Cost management'], tools: ['One cloud console + CLI', 'Terraform or provider IaC', 'Docker basics', 'Git', 'Monitoring dashboards'], soft: ['Cost awareness as an engineering value', 'Writing runbooks', 'Communicating outages clearly'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 450,
  levels: mkLevels('cl',
    ['Cloud fundamentals', [['How the cloud actually works', ['Explain regions, AZs and shared responsibility', 'Compare IaaS/PaaS/SaaS']], ['Your first VM and storage', ['Launch a VM and object storage bucket', 'Apply least-privilege access']]]],
    ['Designing for reliability', [['High availability patterns', ['Design across availability zones', 'Plan backups and recovery drills']]]],
    ['Infrastructure as code', [['Terraform fundamentals', ['Write, plan and apply infrastructure', 'Manage state safely']]]],
    ['Cloud interviews', [['Architecting for interviews', ['Structure a cloud design answer', 'Discuss cost alongside reliability']]]]),
  projects: [{ id: 'cl-proj-1', title: 'Static site + API on cloud with CI/CD', difficulty: 'beginner', description: 'Host a static site and a small API on your chosen cloud, deployed via CI.', steps: ['Provision with IaC', 'Deploy static assets', 'Deploy API with managed runtime', 'Add monitoring and cost alerts'] }],
  interview: [
    { q: 'What is the shared responsibility model?', a: 'The provider secures the cloud infrastructure; you secure what you put in it — configs, data, access controls. Misunderstanding this causes most cloud breaches.' },
    { q: 'Difference between scalability and elasticity?', a: 'Scalability is handling growth; elasticity is automatic scaling up AND down with demand to control cost.' },
    { q: 'What is high availability?', a: 'Designing so the system keeps working when components fail, usually by removing single points of failure and running across multiple zones.' },
  ],
  checklist: ['One cloud provider used hands-on', 'IaC project committed to Git', 'Monitoring and cost alerts configured', 'Backups tested with a restore drill', 'One associate-level certification studied for'],
  resources: [{ title: 'AWS free tier', url: 'https://aws.amazon.com/free/' }, { title: 'Terraform docs', url: 'https://developer.hashicorp.com/terraform/docs' }],
}));


tracks.push(track({
  id: 'devops',
  name: 'DevOps & Platform Engineering',
  emoji: '🔁', color: '#64748b',
  tagline: 'Automate the path from code to production, safely.',
  overview: ['DevOps joins development and operations: building the pipelines, environments and tooling that let teams ship software quickly and reliably. Platform engineering extends this into internal products that other developers self-serve.', 'The field rewards breadth: scripting, Linux, networking, cloud and developer empathy. An entry path is through backend, IT support or QA roles while picking up CI/CD, containers and infrastructure-as-code on the side.'],
  responsibilities: ['Build and maintain CI/CD pipelines', 'Manage containerised workloads', 'Automate infrastructure', 'Improve reliability with monitoring and on-call practices', 'Support developer experience'],
  prerequisites: ['Strong scripting (Bash/Python)', 'Linux and networking comfort', 'Some backend or systems experience'],
  skills: { technical: ['CI/CD systems', 'Containers and Kubernetes basics', 'Infrastructure as code', 'Observability (metrics, logs, traces)', 'Incident response'], tools: ['GitHub Actions or GitLab CI', 'Docker + Kubernetes', 'Terraform', 'Prometheus/Grafana', 'Shell scripting'], soft: ['Blameless post-mortem facilitation', 'Documentation as a product', 'Empathy for developers'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 520,
  levels: mkLevels('dv',
    ['Delivery fundamentals', [['CI/CD from first principles', ['Build a pipeline that tests and deploys automatically', 'Understand gates and rollbacks']], ['Containers basics', ['Containerise an app with Docker', 'Explain images vs containers']]]],
    ['Orchestration', [['Kubernetes essentials', ['Deploy and scale with Kubernetes', 'Debug a failing pod']]]],
    ['Reliability engineering', [['SLOs and observability', ['Define service level objectives', 'Build a useful dashboard and alerts']]]],
    ['DevOps interviews', [['Explaining a delivery improvement', ['Quantify a pipeline improvement you made', 'Discuss failure and rollback honestly']]]]),
  projects: [{ id: 'dv-proj-1', title: 'Full CI/CD pipeline for a web app', difficulty: 'intermediate', description: 'Pipeline: lint, test, build container, deploy to a cloud VM with rollback.', steps: ['Containerise the app', 'CI: lint + test on push', 'CD: deploy with health checks', 'Add rollback and notifications'] }],
  interview: [
    { q: 'What is infrastructure as code and why does it matter?', a: 'Defining infrastructure in version-controlled files instead of clicking in a console: reproducible, reviewable, diffable environments.' },
    { q: 'Blue-green vs canary deployments?', a: 'Blue-green switches all traffic to a new environment at once (fast rollback, needs double capacity); canary shifts traffic gradually (safer, slower).' },
    { q: 'What makes a good alert?', a: 'It is actionable, tied to a user-facing problem, has a documented response, and fires rarely enough that people still pay attention.' },
  ],
  checklist: ['CI/CD pipeline built end to end', 'Docker and one orchestrator used hands-on', 'IaC for a real environment', 'Monitoring and alerting with clear runbooks', 'One blameless post-mortem written'],
  resources: [{ title: 'GitHub Actions docs', url: 'https://docs.github.com/en/actions' }, { title: 'Kubernetes docs', url: 'https://kubernetes.io/docs/home/' }],
}));

module.exports = tracks;
