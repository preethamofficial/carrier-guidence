// Repairs the builder files (a stray ex() object was injected inside an
// example's lineByLine array), appends the pending extra examples, then
// rewrites every builder as clean, safely-escaped JS.
const fs = require('fs');
const path = require('path');
const extras = { ...require('./extras1.js'), ...require('./extras2.js') };
const LANGS = ['python', 'javascript', 'typescript', 'java', 'sql', 'go', 'rust', 'csharp'];
const q = s => JSON.stringify(String(s)); // safe quoting for any content
const arr = (items, fn) => '[' + items.map(fn).join(', ') + ']';
let moved = 0;

for (const lang of LANGS) {
  const topics = require('./' + lang + '.js');
  topics.forEach(t => {
    for (const key of ['basicExamples', 'guidedExamples']) {
      const strays = [];
      t[key].forEach(e => {
        if (!Array.isArray(e.lineByLine)) return;
        const good = [];
        e.lineByLine.forEach(entry => {
          if (entry && typeof entry.line === 'string' && typeof entry.explanation === 'string') good.push(entry);
          else if (entry && entry.title && entry.code) { strays.push(entry); moved++; }
        });
        e.lineByLine = good;
      });
      t[key].push(...strays);
    }
    (extras[t.id] || []).forEach(e => t.basicExamples.push(e));
  });
  fs.writeFileSync(path.join(__dirname, lang + '.js'), serialize(lang, topics));
}
console.log('Recovered ' + moved + ' misplaced examples and rebuilt all builders.');

function serialize(lang, topics) {
  const blocks = topics.map(t => `{
id: ${q(t.id)}, title: ${q(t.title)}, level: ${q(t.level)},
definition: ${q(t.definition)},
analogy: ${q(t.analogy)},
keyPoints: ${arr(t.keyPoints, q)},
basicExamples: ${arr(t.basicExamples, exSrc)},
guidedExamples: ${arr(t.guidedExamples, exSrc)},
advancedExamples: ${arr(t.advancedExamples, e => `adv(${q(e.title)}, ${q(e.code)}, ${q(e.note || '')})`)},
practice: ${arr(t.practice, p => `pq(${q(p.question)}, ${q(p.hint || '')}, ${q(p.answer)})`)},
interview: ${arr(t.interview, i => `iq(${q(i.question)}, ${q(i.answer)})`)}
}`).join(',\n');
  return `const { ex, adv, pq, iq } = require('./common.js');

// ${lang}: 12 fresher-first lessons (Beginner 1-4, Intermediate 5-8, Advanced 9-12).
module.exports = [
${blocks}
];
`;
}
function exSrc(e) {
  const lines = (e.lineByLine || []).map(l => `[${q(l.line)}, ${q(l.explanation)}]`).join(', ');
  return `ex(${q(e.title)}, ${q(e.code)}, [${lines}])`;
}
