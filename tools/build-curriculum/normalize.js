// Normalizes every builder file to a clean 4/4/4 level progression:
// lessons 1-4 Beginner, 5-8 Intermediate, 9-12 Advanced.
const fs = require('fs');
const path = require('path');
const CANON = ['Beginner', 'Intermediate', 'Advanced'];
const levelFor = i => CANON[Math.min(2, Math.floor(i / 4))];

for (const id of ['python', 'javascript', 'typescript', 'java', 'sql', 'go', 'rust', 'csharp']) {
  const file = path.join(__dirname, id + '.js');
  let src = fs.readFileSync(file, 'utf8');
  const before = src;
  let n = 0;
  src = src.replace(/level:\s*'(Beginner|Intermediate|Advanced)'/g, () => {
    const v = "level: '" + levelFor(n) + "'";
    n++;
    return v;
  });
  // require the rewritten source to confirm it still parses and has 12 lessons
  const Module = require('module');
  const m = new Module(id, null);
  m.filename = file;
  m.paths = Module._nodeModulePaths(path.dirname(file));
  m._compile(src, file);
  const topics = m.exports;
  if (!Array.isArray(topics) || topics.length !== 12) throw new Error(id + ' rewrite produced ' + (topics && topics.length) + ' lessons');
  if (src !== before) {
    fs.writeFileSync(file, src);
    console.log(id + ': normalized ' + n + ' levels');
  } else {
    console.log(id + ': already correct (' + n + ' levels)');
  }
}
console.log('Done. Re-run build.js to regenerate curriculum.json.');
