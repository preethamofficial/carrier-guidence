#!/usr/bin/env node
/**
 * Curriculum coverage report — run: node tools/build-curriculum/coverage.js
 * Writes docs/CURRICULUM_COVERAGE.md with dynamic counts from curriculum.json.
 * Also prints the summary to stdout. Never hardcodes totals.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CURRICULUM = path.join(ROOT, 'CodeAtlas_Website', 'data', 'curriculum.json');
const OUT = path.join(ROOT, 'docs', 'CURRICULUM_COVERAGE.md');

const REQUIRED_TOPIC_FIELDS = ['id', 'title', 'level', 'definition', 'analogy', 'keyPoints', 'basicExamples', 'guidedExamples', 'advancedExamples', 'practice', 'interview', 'intro'];

function hasSubstantive(t) {
  // A topic is "substantive" when it has real prose + real examples + real questions.
  const prose = typeof t.definition === 'string' && t.definition.trim().length > 40;
  const code = ['basicExamples', 'guidedExamples', 'advancedExamples']
    .every((g) => Array.isArray(t[g]) && t[g].length > 0 && t[g].every((e) => typeof e?.code === 'string' && e.code.trim().length > 0));
  const qs = Array.isArray(t.practice) && t.practice.length > 0 && Array.isArray(t.interview) && t.interview.length > 0;
  return prose && code && qs;
}

const data = JSON.parse(fs.readFileSync(CURRICULUM, 'utf8'));

const rows = [];
let totals = { topics: 0, substantive: 0, missingFields: 0, practice: 0, interview: 0, examples: 0, intro: 0 };

for (const lang of data.languages) {
  const r = { name: lang.name, id: lang.id, topics: 0, substantive: 0, missing: [], practice: 0, interview: 0, examples: 0, intro: 0 };
  for (const t of lang.topics) {
    r.topics++;
    if (hasSubstantive(t)) r.substantive++;
    for (const f of REQUIRED_TOPIC_FIELDS) {
      const v = t[f];
      const empty = v == null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && v.length === 0);
      if (empty) r.missing.push(`${t.id}:${f}`);
    }
    r.practice += t.practice?.length || 0;
    r.interview += t.interview?.length || 0;
    r.examples += (t.basicExamples?.length || 0) + (t.guidedExamples?.length || 0) + (t.advancedExamples?.length || 0);
    if (Array.isArray(t.intro) && t.intro.length) r.intro++;
  }
  rows.push(r);
  totals.topics += r.topics;
  totals.substantive += r.substantive;
  totals.practice += r.practice;
  totals.interview += r.interview;
  totals.examples += r.examples;
  totals.intro += r.intro;
  totals.missingFields += r.missing.length;
}

const lines = [];
lines.push('# Curriculum Coverage Report');
lines.push('');
lines.push(`Generated: ${new Date().toISOString()} · source: \`CodeAtlas_Website/data/curriculum.json\` (version ${data.version})`);
lines.push('All counts below are computed from the data file — do not edit manually; re-run `node tools/build-curriculum/coverage.js`.');
lines.push('');
lines.push('## Totals');
lines.push('');
lines.push(`- Languages: **${data.languages.length}**`);
lines.push(`- Topics: **${totals.topics}**`);
lines.push(`- Topics with substantive content (prose + examples + questions): **${totals.substantive}**`);
lines.push(`- Topics with intro paragraphs: **${totals.intro} / ${totals.topics}**`);
lines.push(`- Code examples: **${totals.examples}**`);
lines.push(`- Practice questions: **${totals.practice}**`);
lines.push(`- Interview questions: **${totals.interview}**`);
lines.push(`- Missing required field instances: **${totals.missingFields}**`);
lines.push('');
lines.push('## Per language');
lines.push('');
lines.push('| Language | Topics | Substantive | Intro | Examples | Practice | Interview | Missing fields |');
lines.push('|---|---|---|---|---|---|---|---|');
for (const r of rows) {
  lines.push(`| ${r.name} | ${r.topics} | ${r.substantive} | ${r.intro} | ${r.examples} | ${r.practice} | ${r.interview} | ${r.missing.length ? r.missing.join(', ') : '—'} |`);
}
lines.push('');
lines.push('## Status legend');
lines.push('');
lines.push('Statuses apply to *career tracks* (see `data/careers.json`): `outline` → `draft` → `reviewed` → `published`. A track is only `published` when every required section exists and passes validation. Language topics use the substantive-content metric above.');
lines.push('');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join('\n'));
console.log(`Coverage written to docs/CURRICULUM_COVERAGE.md — topics ${totals.topics}, substantive ${totals.substantive}, missing fields ${totals.missingFields}`);
