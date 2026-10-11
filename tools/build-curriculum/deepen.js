// deepen.js — injects a rich, W3Schools-style "What you will learn" intro into every lesson of the built curriculum. Safe to re-run (idempotent).
const path = require("path");
const fs = require("fs");

const BUILT = path.join(__dirname, "..", "..", "CodeAtlas_Website", "data", "curriculum.json");
const data = JSON.parse(fs.readFileSync(BUILT, "utf8"));

// escape helpers (prose may contain inline <code>)
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (s) => "<code>" + esc(s) + "</code>";
global.esc = esc;
global.code = code;

// per-language, per-topic override builders keyed by topic id

// per-language, per-topic override builders keyed by topic id
const OVERRIDES = {};
try { OVERRIDES.__proto__ = require(path.join(__dirname, "overrides.js")); } catch (e) { /* no overrides */ }

// shared concept builders, loaded from separate files (each kept < ~6000 chars)
const SHARED = {};
["concepts-1.js", "concepts-2.js", "concepts-3.js", "concepts-4.js", "concepts-5.js", "concepts-6.js", "concepts-7.js", "concepts-8a.js", "concepts-8b.js", "concepts-8c.js", "concepts-8d.js", "concepts-8e.js"].forEach((f) => {
  try { Object.assign(SHARED, require(path.join(__dirname, f))); } catch (e) { /* ignore */ }
});

// Match a topic to a concept key. Strategy: a key belongs to a language when
// its prefix (e.g. 'rust', 'go', 'csharp', 'java', 'ts', 's') equals the language
// id, OR the topic title contains a language-specific word (e.g. 'sql').
const KEY_ALIASES = {
  sql: "s",
  javascript: "js",
  typescript: "ts",
  rust: "rust",
  go: "go",
  csharp: "csharp",
  java: "java",
  python: "python",
};

function conceptKey(L, title) {
  const tl = (title || "").toLowerCase();
  // 1) title-based matches
  for (const [alias, lang] of Object.entries(KEY_ALIASES)) {
    if (lang === "js" && /javascript|dom|spread|destructure|iterator|iterators/.test(tl)) return "js";
    if (lang === "ts" && /typescript|tsconfig/i.test(tl)) return "ts";
    if (lang === "s" && /sql/i.test(tl)) return "s";
    if (lang === "rust" && /rust/i.test(tl)) return "rust";
    if (lang === "go" && /go/i.test(tl)) return "go";
    if (lang === "csharp" && /csharp|c#/i.test(tl)) return "csharp";
    if (lang === "java" && /java/i.test(tl)) return "java";
    if (lang === "python" && /python/i.test(tl)) return "python";
  }
  // 2) language-idiom topic titles (e.g. go-4, rust-6) match by language id
  const langId = L.id;
  if (langId === "go" || langId === "rust" || langId === "csharp" || langId === "java") return langId;
  if (langId === "python") return "python";
  return "default";
}

for (const lang of data.languages) {
  for (const topic of lang.topics) {
    const key = conceptKey(lang, topic.title);
    const shared = SHARED[key] || SHARED["__default__"];
    if (!shared) {
      console.error("MISSING concept for", lang.id, topic.id, key);
      console.error("SHARED keys:", Object.keys(SHARED).join(","));
      process.exit(1);
    }
    const override = OVERRIDES[key] && OVERRIDES[key][topic.id] ? OVERRIDES[key][topic.id] : null;
    topic.intro = (override || shared)(lang, topic);
  }
}

fs.writeFileSync(BUILT, JSON.stringify(data, null, 2));
console.log("deepened: " + data.languages.length + " languages, " + data.languages.reduce((a, l) => a + l.topics.length, 0) + " topics.");

