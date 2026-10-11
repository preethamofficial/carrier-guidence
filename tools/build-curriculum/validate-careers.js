#!/usr/bin/env node
/** Careers validator (used by validate.js). Standalone: node tools/build-curriculum/validate-careers.js */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CAREERS = path.join(ROOT, 'CodeAtlas_Website', 'data', 'careers.json');
const STATUSES = ['outline', 'draft', 'reviewed', 'published'];
const LEVEL_IDS = ['Foundations', 'Beginner', 'Intermediate', 'Advanced', 'Job preparation'];

const isStr = (v) => typeof v === 'string' && v.trim().length > 0;
const validUrl = (u) => {
  if (!isStr(u)) return false;
  try { const p = new URL(u); return p.protocol === 'https:' || p.protocol === 'http:'; }
  catch { return false; }
};

function checkLesson(l, where, lessonIds, err) {
  if (!l || typeof l !== 'object') { err(`${where}: lesson must be an object`); return; }
  if (!isStr(l.id)) err(`${where}: lesson missing id`);
  else if (lessonIds.has(l.id)) err(`duplicate career lesson id: ${l.id}`);
  else lessonIds.add(l.id);
  if (!isStr(l.title)) err(`${where} "${l.id ?? '?'}": missing title`);
  if (!Number.isFinite(l.estMinutes) || l.estMinutes <= 0) err(`${where} "${l.id ?? '?'}": estMinutes must be positive`);
  if (!STATUSES.includes(l.status)) err(`${where} "${l.id ?? '?'}": bad status ${JSON.stringify(l.status)}`);
  if (!Array.isArray(l.objectives) || l.objectives.length === 0) err(`${where} "${l.id ?? '?'}": objectives empty`);
  if (Array.isArray(l.resources)) l.resources.forEach((r, i) => {
    if (!r || !isStr(r.title)) err(`${where} "${l.id}".resources[${i}]: missing title`);
    if (!validUrl(r.url)) err(`${where} "${l.id}".resources[${i}]: bad URL ${r.url}`);
  });
  if (['reviewed', 'published'].includes(l.status)) {
    const prose = Array.isArray(l.intro) ? l.intro.join(' ').trim().length : 0;
    if (prose < 40) err(`${where} "${l.id}": ${l.status} needs substantive intro`);
    if (!Array.isArray(l.keyPoints) || !l.keyPoints.length) err(`${where} "${l.id}": ${l.status} needs keyPoints`);
    if (!Array.isArray(l.practice) || !l.practice.length) err(`${where} "${l.id}": ${l.status} needs practice`);
  }
}

function validateCareers(errors, warnings) {
  const err = (m) => errors.push(m);
  const warn = (m) => warnings.push(m);
  let cd;
  try { cd = JSON.parse(fs.readFileSync(CAREERS, 'utf8')); }
  catch (e) { err(`careers.json unreadable/invalid: ${e.message}`); return null; }
  if (!isStr(cd.version)) err('careers.version missing');
  if (!Array.isArray(cd.sharedModules) || !cd.sharedModules.length) err('careers.sharedModules must be non-empty');
  if (!Array.isArray(cd.tracks) || !cd.tracks.length) { err('careers.tracks must be non-empty'); return null; }
  const sharedIds = new Set(), lessonIds = new Set(), projectIds = new Set(), trackIds = new Set();
  for (const sm of cd.sharedModules || []) {
    const w = `shared "${sm.id ?? '?'}"`;
    if (!isStr(sm.id)) err(`${w}: missing id`);
    else if (sharedIds.has(sm.id)) err(`duplicate shared module id: ${sm.id}`);
    else sharedIds.add(sm.id);
    if (!isStr(sm.title)) err(`${w}: missing title`);
    if (!Array.isArray(sm.lessons) || !sm.lessons.length) err(`${w}: lessons empty`);
    else sm.lessons.forEach((l) => checkLesson(l, w, lessonIds, err));
  }
  for (const t of cd.tracks) {
    const w = `track "${t.id ?? '?'}"`;
    if (!isStr(t.id)) err(`${w}: missing id`);
    else if (trackIds.has(t.id)) err(`duplicate track id: ${t.id}`);
    else trackIds.add(t.id);
    const req = ['name', 'tagline', 'overview', 'responsibilities', 'prerequisites', 'skills', 'estHours', 'levels', 'projects', 'interview', 'checklist', 'resources'];
    for (const k of req) { if (t[k] === undefined || t[k] === null) err(`${w}: missing ${k}`); }
    if (typeof t.estHours !== 'number' || t.estHours <= 0) err(`${w}: estHours must be positive`);
    for (const ref of t.sharedModules || []) {
      if (!sharedIds.has(ref)) err(`${w}: unknown shared module ref: ${ref}`);
    }
    if (!Array.isArray(t.levels) || !t.levels.length) { err(`${w}: levels empty`); continue; }
    const lvlIds = new Set();
    for (const lvl of t.levels) {
      if (!isStr(lvl.id)) err(`${w}: level missing id`);
      else {
        if (lvlIds.has(lvl.id)) err(`${w}: duplicate level id: ${lvl.id}`);
        lvlIds.add(lvl.id);
        if (!LEVEL_IDS.includes(lvl.id)) warn(`${w}: unexpected level id "${lvl.id}"`);
      }
      if (!Array.isArray(lvl.modules) || !lvl.modules.length) { err(`${w}/${lvl.id ?? '?'}: modules empty`); continue; }
      const modIds = new Set();
      for (const m of lvl.modules) {
        if (!isStr(m.id)) err(`${w}/${lvl.id}: module missing id`);
        else if (modIds.has(m.id)) err(`${w}/${lvl.id}: duplicate module id: ${m.id}`);
        else modIds.add(m.id);
        if (!isStr(m.title)) err(`${w} module "${m.id ?? '?'}": missing title`);
        if (!Array.isArray(m.lessons) || !m.lessons.length) err(`${w} module "${m.id ?? '?'}": lessons empty`);
        else m.lessons.forEach((l) => checkLesson(l, `${w}/${lvl.id}/${m.id}`, lessonIds, err));
      }
    }
    for (const [i, p] of (t.projects || []).entries()) {
      const pw = `${w}.projects[${i}]`;
      if (!p || typeof p !== 'object') { err(`${pw}: must be an object`); continue; }
      if (!isStr(p.id)) err(`${pw}: missing id`);
      else if (projectIds.has(p.id)) err(`duplicate project id: ${p.id}`);
      else projectIds.add(p.id);
      for (const k of ['title', 'difficulty', 'description', 'steps']) {
        const v = p[k];
        const empty = v == null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length);
        if (empty) err(`${pw}: missing ${k}`);
      }
    }
    for (const [i, q] of (t.interview || []).entries()) {
      if (!q || !isStr(q.q)) err(`${w}.interview[${i}]: missing q`);
      if (!q || !isStr(q.a)) err(`${w}.interview[${i}]: missing a`);
    }
    if (!Array.isArray(t.checklist) || !t.checklist.length) err(`${w}: checklist empty`);
    if (!Array.isArray(t.resources) || !t.resources.length) err(`${w}: resources empty`);
    else t.resources.forEach((r, i) => {
      if (!r || !isStr(r.title)) err(`${w}.resources[${i}]: missing title`);
      if (!validUrl(r.url)) err(`${w}.resources[${i}]: bad URL ${r.url}`);
    });
  }
  return cd;
}

function careerStats(cd) {
  if (!cd) return {};
  let lessons = 0, projects = 0; const byStatus = {};
  for (const t of cd.tracks || []) {
    projects += (t.projects || []).length;
    for (const l of t.levels || []) for (const m of l.modules || []) for (const ls of m.lessons || []) {
      lessons++;
      byStatus[ls.status] = (byStatus[ls.status] || 0) + 1;
    }
  }
  return { tracks: (cd.tracks || []).length, shared: (cd.sharedModules || []).length, lessons, projects, byStatus };
}

if (require.main === module) {
  const errors = [], warnings = [];
  const cd = validateCareers(errors, warnings);
  console.log('— Careers validation —');
  if (cd) console.log(`version: ${cd.version} | stats: ${JSON.stringify(careerStats(cd))}`);
  for (const x of warnings) console.log(`WARN  ${x}`);
  for (const x of errors) console.log(`ERROR ${x}`);
  console.log(`${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(errors.length ? 1 : 0);
}

module.exports = { validateCareers, careerStats };
