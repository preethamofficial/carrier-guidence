const fs = require('fs');
const path = require('path');
const TOPUP = Object.assign({}, require('./topup-a.js'), require('./topup-b.js'), require('./topup-c.js'));
const LANGS = ['python', 'javascript', 'typescript', 'java', 'sql', 'go', 'rust', 'csharp'];
let added = 0;
for (const l of LANGS) {
  const file = path.join(__dirname, l + '.js');
  const arr = require(file);
  for (const t of arr) {
    const extra = TOPUP[t.id];
    if (!extra) continue;
    const total = t.basicExamples.length + t.guidedExamples.length;
    if (total >= 5) continue;
    t.guidedExamples.push({ title: extra.title, code: extra.code, lineByLine: extra.lineByLine.map(([line, explanation]) => ({ line, explanation })) });
    added++;
  }
  fs.writeFileSync(file, 'module.exports = ' + JSON.stringify(arr, null, 2) + ';\n');
}
console.log('Topped up ' + added + ' lessons with a 5th example.');
