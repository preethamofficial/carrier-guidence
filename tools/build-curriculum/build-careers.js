#!/usr/bin/env node
/**
 * Careers builder — run: node tools/build-curriculum/build-careers.js
 * Assembles CodeAtlas_Website/data/careers.json from versioned source modules:
 *   careers-shared.js (foundation modules) + careers-tracks-a..h.js (16 tracks)
 * Order of concatenation defines the track order in the output.
 * The language pipeline (build.js) is untouched — run each independently.
 * Fails on duplicate ids or missing required track fields so bad data never ships.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const OUT = path.join(DIR, '..', '..', 'CodeAtlas_Website', 'data', 'careers.json');
const VERSION = '2.0.0';

const TRACK_FILES = [
  'careers-tracks-a.js',
  'careers-tracks-b.js',
  'careers-tracks-c.js',
  'careers-tracks-d.js',
  'careers-tracks-e.js',
  'careers-tracks-f.js',
  'careers-tracks-g.js',
  'careers-tracks-h.js',
];

function loadArray(file) {
  const full = path.join(DIR, file);
  const m = require(full);
  if (!Array.isArray(m)) throw new Error(file + ' must export an array, got ' + typeof m);
  return m;
}

function main() {
  const sharedModules = loadArray('careers-shared.js');
  const tracks = [];
  for (const f of TRACK_FILES) {
    const arr = loadArray(f);
    for (const t of arr) tracks.push(t);
  }

  // --- integrity checks before writing ---
  const seen = new Set();
  for (const t of tracks) {
    if (!t || typeof t.id !== 'string' || !t.id.trim()) throw new Error('track missing id');
    if (seen.has(t.id)) throw new Error('duplicate track id: ' + t.id);
    seen.add(t.id);
    for (const k of ['name', 'overview', 'levels']) {
      if (t[k] === undefined || t[k] === null) throw new Error(t.id + ' missing ' + k);
    }
    if (!Array.isArray(t.levels) || t.levels.length === 0) throw new Error(t.id + ' levels must be a non-empty array');
  }
  const seenShared = new Set();
  for (const s of sharedModules) {
    if (!s || typeof s.id !== 'string' || !s.id.trim()) throw new Error('shared module missing id');
    if (seenShared.has(s.id)) throw new Error('duplicate shared module id: ' + s.id);
    seenShared.add(s.id);
  }
  // sharedModules references must resolve
  for (const t of tracks) {
    for (const ref of t.sharedModules || []) {
      if (!seenShared.has(ref)) throw new Error(t.id + ' references unknown shared module: ' + ref);
    }
  }
  // lesson ids globally unique across tracks + shared
  const lessonIds = new Set();
  const collect = (lessons, where) => {
    for (const l of lessons || []) {
      if (!l || typeof l.id !== 'string' || !l.id.trim()) throw new Error(where + ' lesson missing id');
      if (lessonIds.has(l.id)) throw new Error('duplicate lesson id: ' + l.id + ' (' + where + ')');
      lessonIds.add(l.id);
    }
  };
  for (const s of sharedModules) collect(s.lessons, 'shared:' + s.id);
  for (const t of tracks) {
    for (const lvl of t.levels || []) {
      for (const m of lvl.modules || []) collect(m.lessons, t.id + '/' + lvl.id + '/' + m.id);
    }
    for (const p of t.projects || []) {
      if (!p || typeof p.id !== 'string' || !p.id.trim()) throw new Error(t.id + ' project missing id');
      if (lessonIds.has('project:' + p.id)) throw new Error('duplicate project id: ' + p.id);
      lessonIds.add('project:' + p.id);
    }
  }

  const out = { version: VERSION, sharedModules, tracks };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  let lessons = 0;
  for (const t of tracks) for (const l of t.levels || []) for (const m of l.modules || []) lessons += (m.lessons || []).length;
  console.log('Built careers v' + VERSION + ': ' + tracks.length + ' tracks, '
    + sharedModules.length + ' shared modules, ' + lessons + ' track lessons -> ' + path.relative(process.cwd(), OUT));
}

main();
