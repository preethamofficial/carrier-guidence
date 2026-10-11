#!/usr/bin/env node
/**
 * Curriculum validator — run: node tools/build-curriculum/validate.js
 * Exits non-zero when any ERROR is found. Warnings never fail the build.
 * All counts are computed from data (never hardcoded).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CURRICULUM = path.join(ROOT, 'CodeAtlas_Website', 'data', 'curriculum.json');
const RESOURCES = path.join(ROOT, 'CodeAtlas_Website', 'OFFICIAL_RESOURCES.json');

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const validUrl = (u) => {
  if (!isNonEmptyString(u)) return false;
  try {
    const parsed = new URL(u);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch { return false; }
};

function validate() {
  let raw;
  try {
    raw = fs.readFileSync(CURRICULUM, 'utf8');
  } catch (e) {
    err(`curriculum.json unreadable: ${e.message}`);
    return null;
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    err(`curriculum.json is not valid JSON: ${e.message}`);
    return null;
  }

  if (!isNonEmptyString(data.title)) err('root.title missing');
  if (!isNonEmptyString(data.version)) err('root.version missing');
  if (!Array.isArray(data.languages) || data.languages.length === 0) {
    err('root.languages must be a non-empty array');
    return data;
  }

  const langIds = new Set();
  const topicIds = new Set();

  for (const lang of data.languages) {
    const where = `language "${lang.id ?? '?'}"`;
    if (!isNonEmptyString(lang.id)) err(`${where}: missing id`);
    else if (langIds.has(lang.id)) err(`duplicate language id: ${lang.id}`);
    else langIds.add(lang.id);

    if (!isNonEmptyString(lang.name)) err(`${where}: missing name`);
    if (!isNonEmptyString(lang.color)) warn(`${where}: missing color`);
    if (!isNonEmptyString(lang.purpose)) warn(`${where}: missing purpose`);
    if (!validUrl(lang.docs)) err(`${where}: docs URL invalid or non-http(s): ${lang.docs}`);
    if (!Array.isArray(lang.topics) || lang.topics.length === 0) {
      err(`${where}: topics must be a non-empty array`);
      continue;
    }
    if (!Array.isArray(lang.projects)) warn(`${where}: projects array missing`);

    lang.topics.forEach((t, i) => {
      const tw = `${where} topic[${i}] "${t.id ?? '?'}"`;
      if (!isNonEmptyString(t.id)) err(`${tw}: missing id`);
      else if (topicIds.has(t.id)) err(`duplicate topic id: ${t.id}`);
      else topicIds.add(t.id);

      if (!isNonEmptyString(t.title)) err(`${tw}: missing title`);
      if (!['Beginner', 'Intermediate', 'Advanced'].includes(t.level)) {
        err(`${tw}: level must be Beginner|Intermediate|Advanced (got ${JSON.stringify(t.level)})`);
      }
      if (!isNonEmptyString(t.definition)) err(`${tw}: missing definition`);
      if (!isNonEmptyString(t.analogy)) warn(`${tw}: missing analogy`);
      if (!Array.isArray(t.keyPoints) || t.keyPoints.length === 0) err(`${tw}: keyPoints empty`);
      else t.keyPoints.forEach((kp, j) => { if (!isNonEmptyString(kp)) err(`${tw}: keyPoints[${j}] empty`); });
      if (!Array.isArray(t.intro) || t.intro.length === 0) warn(`${tw}: intro missing`);


      for (const group of ['basicExamples', 'guidedExamples', 'advancedExamples']) {
        const arr = t[group];
        if (!Array.isArray(arr) || arr.length === 0) { err(`${tw}: ${group} empty`); continue; }
        arr.forEach((ex, j) => {
          const ew = `${tw}.${group}[${j}]`;
          if (!ex || typeof ex !== 'object') { err(`${ew}: must be an object`); return; }
          if (!isNonEmptyString(ex.title)) err(`${ew}: missing title`);
          if (!isNonEmptyString(ex.code)) err(`${ew}: missing code`);
          if (ex.lineByLine != null) {
            if (!Array.isArray(ex.lineByLine)) err(`${ew}: lineByLine must be an array`);
            else ex.lineByLine.forEach((l, k) => {
              if (!l || !isNonEmptyString(l.line) || !isNonEmptyString(l.explanation)) {
                err(`${ew}.lineByLine[${k}]: needs line + explanation`);
              }
            });
          }
        });
      }

      for (const group of ['practice', 'interview']) {
        const arr = t[group];
        if (!Array.isArray(arr) || arr.length === 0) { err(`${tw}: ${group} empty`); continue; }
        const seenQ = new Set();
        arr.forEach((q, j) => {
          const qw = `${tw}.${group}[${j}]`;
          if (!q || typeof q !== 'object') { err(`${qw}: must be an object`); return; }
          if (!isNonEmptyString(q.question)) err(`${qw}: missing question`);
          else {
            const norm = q.question.trim().toLowerCase();
            if (seenQ.has(norm)) warn(`${qw}: duplicate question text`);
            seenQ.add(norm);
          }
          if (!isNonEmptyString(q.answer)) err(`${qw}: missing answer`);
          if (group === 'practice' && !isNonEmptyString(q.hint)) warn(`${qw}: missing hint`);
        });
      }
    });
  }

  try {
    const res = JSON.parse(fs.readFileSync(RESOURCES, 'utf8'));
    for (const [k, v] of Object.entries(res)) {
      if (!validUrl(v)) err(`OFFICIAL_RESOURCES[${k}] invalid URL: ${v}`);
    }
  } catch (e) {
    warn(`OFFICIAL_RESOURCES.json not parseable: ${e.message}`);
  }

  return data;
}

function stats(data) {
  if (!data || !Array.isArray(data.languages)) return {};
  let topics = 0, examples = 0, practice = 0, interview = 0, withIntro = 0;
  const levels = {};
  for (const l of data.languages) {
    for (const t of l.topics || []) {
      topics++;
      examples += (t.basicExamples?.length || 0) + (t.guidedExamples?.length || 0) + (t.advancedExamples?.length || 0);
      practice += t.practice?.length || 0;
      interview += t.interview?.length || 0;
      if (Array.isArray(t.intro) && t.intro.length) withIntro++;
      levels[t.level] = (levels[t.level] || 0) + 1;
    }
  }
  return { languages: data.languages.length, topics, examples, practice, interview, withIntro, levels };
}

const data = validate();
const s = stats(data);
console.log('— Curriculum validation —');
if (data) console.log(`version: ${data.version} | stats: ${JSON.stringify(s)}`);
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
