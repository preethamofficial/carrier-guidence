const path = require('path');
const d = require(path.join(__dirname, '..', '..', 'CodeAtlas_Website', 'data', 'curriculum.json'));
for (const l of d.languages) {
  console.log('== ' + l.name + ' ==');
  l.topics.forEach((t, i) => console.log('  ' + (i + 1) + ' [' + t.level + '] ' + t.title));
}

