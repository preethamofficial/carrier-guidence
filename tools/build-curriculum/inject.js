// Appends the extra examples from extras1.js / extras2.js into their builder
// files (as a trailing entry inside basicExamples) then reports the new counts.
const fs = require('fs');
const path = require('path');
const extras = { ...require('./extras1.js'), ...require('./extras2.js') };
const ids = Object.keys(extras);
console.log('Extras to inject: ' + ids.join(', '));

for (const id of ids) {
  const lang = id.split('-')[0];
  const file = path.join(__dirname, lang + '.js');
  let src = fs.readFileSync(file, 'utf8');
  // Render each extra example as source text using the same ex() helper.
  const blocks = extras[id].map(e => {
    const lines = e.lineByLine.map(ln => `[${JSON.stringify(ln.line)}, ${JSON.stringify(ln.explanation)}]`).join(', ');
    return `ex(${JSON.stringify(e.title)}, ${JSON.stringify(e.code)}, [${lines}])`;
  });
  // Anchor: find the lesson by id, then append inside its basicExamples array.
  const anchor = "id: '" + id + "'";
  const at = src.indexOf(anchor);
  if (at < 0) throw new Error('lesson not found: ' + id);
  // Locate the basicExamples opening bracket after the anchor.
  const beAt = src.indexOf('basicExamples: [', at);
  if (beAt < 0) throw new Error(id + ' has no basicExamples array');
  const openAt = beAt + 'basicExamples: ['.length;
  const closeAt = src.indexOf(']', openAt);
  if (closeAt < 0) throw new Error(id + ' basicExamples not closed');
  const inner = src.slice(openAt, closeAt).trim();
  const merged = inner.length ? inner + ',\n' + blocks.join(',\n') + '\n' : '\n' + blocks.join(',\n') + '\n';
  src = src.slice(0, openAt) + merged + src.slice(closeAt);
  fs.writeFileSync(file, src);
  console.log(id + ': +' + blocks.length + ' example(s)');
}

// Verify every builder still loads with 12 lessons and 5+ line-by-line examples.
let fail = 0;
for (const lang of ['python', 'javascript', 'typescript', 'java', 'sql', 'go', 'rust', 'csharp']) {
  const topics = require('./' + lang + '.js');
  topics.forEach((t, i) => {
    const n = t.basicExamples.length + t.guidedExamples.length;
    if (topics.length !== 12 || n < 5) { console.log('PROBLEM', t.id, n); fail++; }
  });
}
console.log(fail === 0 ? 'All 96 lessons now have 5+ line-by-line examples.' : 'problems: ' + fail);
