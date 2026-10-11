'use strict';
// Careers tests — run: node --test tests/
// All counts are computed from data/careers.json (never hardcoded).
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const CAR = path.join(ROOT, 'CodeAtlas_Website', 'data', 'careers.json');
const data = JSON.parse(fs.readFileSync(CAR, 'utf8'));

const EXPECTED_TRACKS = [
  'software-engineering', 'frontend-development', 'backend-development',
  'fullstack-development', 'data-analytics', 'ai-ml',
  'ai-app-development', 'cybersecurity', 'cloud-computing',
  'devops', 'testing-qa', 'data-engineering',
  'mobile-development', 'it-support-networking', 'ui-ux-design',
  'business-analysis',
];

const allLessons = [];
for (const t of data.tracks) {
  for (const lvl of t.levels || []) for (const m of lvl.modules || []) {
    for (const l of m.lessons || []) allLessons.push({ ...l, track: t.id, level: lvl.id, module: m.id });
  }
}

test('careers.json parses with 16 required tracks', () => {
  assert.equal(typeof data.version, 'string');
  const ids = data.tracks.map((t) => t.id).sort();
  assert.deepEqual(ids, [...EXPECTED_TRACKS].sort());
});

test('shared foundation modules exist and are referenced (not duplicated)', () => {
  assert.ok(Array.isArray(data.sharedModules) && data.sharedModules.length >= 1);
  const sharedIds = new Set(data.sharedModules.map((s) => s.id));
  const refs = new Set(data.tracks.flatMap((t) => t.sharedModules || []));
  assert.ok(refs.size > 0, 'tracks should reference shared modules');
  for (const r of refs) assert.ok(sharedIds.has(r), `unknown shared ref ${r}`);
});

test('career lesson ids are globally unique (tracks + shared)', () => {
  const ids = [
    ...allLessons.map((l) => l.id),
    ...data.sharedModules.flatMap((s) => (s.lessons || []).map((l) => l.id)),
  ];
  assert.equal(new Set(ids).size, ids.length, 'duplicate career lesson id');
});

test('every track has 4+ levels incl. job prep, projects, interview, checklist, resources', () => {
  for (const t of data.tracks) {
    assert.ok((t.levels || []).length >= 4, `${t.id}: needs 4+ levels`);
    const lvlIds = t.levels.map((l) => l.id);
    assert.ok(lvlIds.includes('Job preparation'), `${t.id}: missing Job preparation level`);
    let n = 0;
    for (const l of t.levels) for (const m of l.modules || []) n += (m.lessons || []).length;
    assert.ok(n >= 4, `${t.id}: needs 4+ lessons`);
    assert.ok((t.projects || []).length >= 1, `${t.id}: needs a project`);
    assert.ok((t.interview || []).length >= 1, `${t.id}: needs interview Q&A`);
    assert.ok((t.checklist || []).length >= 1, `${t.id}: needs checklist`);
    assert.ok((t.resources || []).length >= 1, `${t.id}: needs resources`);
  }
});

test('reviewed/published lessons carry substantive content (no fake completeness)', () => {
  for (const l of allLessons) {
    if (['reviewed', 'published'].includes(l.status)) {
      const prose = (l.intro || []).join(' ').trim().length;
      assert.ok(prose >= 40, `${l.id}: ${l.status} without substantive intro`);
      assert.ok((l.keyPoints || []).length > 0, `${l.id}: ${l.status} without keyPoints`);
      assert.ok((l.practice || []).length > 0, `${l.id}: ${l.status} without practice`);
    }
  }
});

test('career resource URLs are valid http(s)', () => {
  const urls = [];
  for (const t of data.tracks) for (const r of t.resources || []) urls.push([t.id, r.url]);
  for (const s of data.sharedModules) for (const l of s.lessons || []) for (const r of l.resources || []) urls.push([s.id, r.url]);
  for (const l of allLessons) for (const r of l.resources || []) urls.push([l.id, r.url]);
  assert.ok(urls.length > 0, 'expected some resource URLs');
  for (const [where, u] of urls) {
    assert.ok(['http:', 'https:'].includes(new URL(u).protocol), `${where}: bad URL ${u}`);
  }
});

test('careers builder + validator exit 0 on current data', () => {
  const { execFileSync } = require('node:child_process');
  const b = execFileSync(process.execPath, [path.join(ROOT, 'tools', 'build-curriculum', 'build-careers.js')], { encoding: 'utf8' });
  assert.match(b, /16 tracks/);
  const v = execFileSync(process.execPath, [path.join(ROOT, 'tools', 'build-curriculum', 'validate-careers.js')], { encoding: 'utf8' });
  assert.match(v, /0 error\(s\)/);
});
