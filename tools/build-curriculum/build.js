const fs = require("fs");
const path = require("path");
const LANGS = [
  { id: "python", name: "Python", color: "#3776ab", purpose: "AI, automation, backend, data", docs: "https://docs.python.org/3/tutorial/" },
  { id: "javascript", name: "JavaScript", color: "#e8c547", purpose: "Web interfaces, browser apps, Node.js", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
  { id: "typescript", name: "TypeScript", color: "#3178c6", purpose: "Typed JavaScript, scalable apps", docs: "https://www.typescriptlang.org/docs/handbook/intro.html" },
  { id: "java", name: "Java", color: "#e76f51", purpose: "Enterprise systems, backend, Android ecosystem", docs: "https://dev.java/learn/" },
  { id: "sql", name: "SQL", color: "#4f8fbd", purpose: "Databases, analytics, reporting", docs: "https://www.postgresql.org/docs/current/tutorial.html" },
  { id: "go", name: "Go", color: "#00add8", purpose: "Cloud services, APIs, concurrency", docs: "https://go.dev/doc/tutorial/" },
  { id: "rust", name: "Rust", color: "#d97841", purpose: "Systems software, performance, memory safety", docs: "https://doc.rust-lang.org/book/" },
  { id: "csharp", name: "C#", color: "#8b6ac8", purpose: ".NET, APIs, desktop, games", docs: "https://learn.microsoft.com/en-us/dotnet/csharp/" }
];
const PROJECT_TITLES = ["Student marks and grade tracker", "Canteen menu and billing workflow", "Inventory API with validation and tests", "Data report with meaningful edge cases"];
const languages = LANGS.map(meta => {
  const topics = require("./" + meta.id + ".js");
  if (!Array.isArray(topics) || topics.length !== 12) throw new Error(meta.id + " must export 12 lessons, got " + (topics && topics.length));
  const seen = {};
  topics.forEach((t, i) => {
    const want = meta.id + "-" + (i + 1);
    if (t.id !== want) throw new Error(meta.id + " lesson " + (i + 1) + " id " + t.id + ", want " + want);
    if (seen[t.id]) throw new Error("duplicate " + t.id);
    seen[t.id] = 1;
    ["title", "level", "definition", "analogy", "keyPoints", "basicExamples", "guidedExamples", "advancedExamples", "practice", "interview"].forEach(k => {
      if (t[k] === undefined || t[k] === null) throw new Error(t.id + " missing " + k);
    });
    const codeExamples = t.basicExamples.length + t.guidedExamples.length + t.advancedExamples.length;
    if (codeExamples < 5) throw new Error(t.id + " needs 5+ code examples, has " + codeExamples);
    if (t.practice.length < 4 || t.interview.length < 4) throw new Error(t.id + " needs 4+ practice and 4+ interview");
  });
  return { id: meta.id, name: meta.name, color: meta.color, purpose: meta.purpose, docs: meta.docs, topics: topics, projects: PROJECT_TITLES.map(p => meta.name + " mini-project: " + p) };
});
const out = { title: "CodeAtlas", version: "2.0.0", languages: languages };
fs.writeFileSync(path.join(__dirname, "..", "..", "CodeAtlas_Website", "data", "curriculum.json"), JSON.stringify(out, null, 2));
console.log("Built curriculum v2.0.0: " + languages.map(l => l.id + ":" + l.topics.length).join(" "));