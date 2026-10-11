'use strict';
// Curriculum tests — run: node --test tests/
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const CUR = path.join(ROOT, 'CodeAtlas_Website', 'data', 'curriculum.json');
const RES = path.join(ROOT, 'CodeAtlas_Website', 'OFFICIAL_RESOURCES.json');

const data = JSON.parse(fs.readFileSync(CUR, 'utf8'));
const allTopics = data.languages.flatMap((l) => l.topics.map((t) => ({ ...t, lang: l })));

test('curriculum.json parses and has required root shape', () => {
  assert.equal(typeof data.title, 'string');
  assert.equal(typeof data.version, 'string');
  assert.ok(Array.isArray(data.languages) && data.languages.length >= 8, 'at least the original 8 languages');
});

test('all eight original language paths are preserved', () => {
  const ids = data.languages.map((l) => l.id).sort();
  assert.deepEqual(ids, ['csharp', 'go', 'java', 'javascript', 'python', 'rust', 'sql', 'typescript']);
});

test('language ids are unique', () => {
  const ids = data.languages.map((l) => l.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate language id');
});

test('topic ids are globally unique', () => {
  const ids = allTopics.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate topic id found');
});

test('topic count matches 8 languages x 12 topics (computed, not hardcoded blindly)', () => {
  assert.equal(allTopics.length, data.languages.length * 12, 'every language has exactly 12 topics');
});

test('every topic has required fields with real content', () => {
  for (const t of allTopics) {
    assert.ok(t.id && t.title, `${t.id}: id/title`);
    assert.ok(['Beginner', 'Intermediate', 'Advanced'].includes(t.level), `${t.id}: bad level`);
    assert.ok(t.definition.trim().length > 40, `${t.id}: definition too short`);
    assert.ok(Array.isArray(t.keyPoints) && t.keyPoints.length >= 4, `${t.id}: needs >=4 key points`);
    assert.ok(Array.isArray(t.intro) && t.intro.length > 0, `${t.id}: intro missing`);
  }
});

test('code example structure is valid (title + code + lineByLine where present)', () => {
  for (const t of allTopics) {
    for (const g of ['basicExamples', 'guidedExamples', 'advancedExamples']) {
      assert.ok(Array.isArray(t[g]) && t[g].length > 0, `${t.id}.${g} empty`);
      for (const ex of t[g]) {
        assert.ok(typeof ex.title === 'string' && ex.title.trim(), `${t.id}.${g}: title missing`);
        assert.ok(typeof ex.code === 'string' && ex.code.trim(), `${t.id}.${g}: code missing`);
        if (ex.lineByLine) {
          for (const l of ex.lineByLine) {
            assert.ok(l.line && l.explanation, `${t.id}.${g}: lineByLine entry incomplete`);
          }
        }
      }
    }
  }
});

test('quiz-style practice/interview questions are complete and non-duplicate', () => {
  for (const t of allTopics) {
    for (const g of ['practice', 'interview']) {
      assert.ok(Array.isArray(t[g]) && t[g].length > 0, `${t.id}.${g} empty`);
      const seen = new Set();
      for (const q of t[g]) {
        assert.ok(q.question && q.question.trim().length > 5, `${t.id}.${g}: empty question`);
        assert.ok(q.answer && q.answer.trim().length > 5, `${t.id}.${g}: empty answer`);
        const norm = q.question.trim().toLowerCase();
        assert.ok(!seen.has(norm), `${t.id}.${g}: duplicate question "${norm}"`);
        seen.add(norm);
      }
    }
  }
});

test('no javascript:/data:/vbscript: URL schemes in href-like or code fields', () => {
  // Only inspect fields that could carry URLs or executable code — prose may
  // legitimately contain phrases like "the data: invalid deposits".
  const bad = /^\s*(?:javascript|data|vbscript)\s*:/i;
  const URL_KEYS = new Set(['docs', 'url', 'href', 'link', 'src']);
  const walk = (node, where, key) => {
    if (typeof node === 'string') {
      const k = String(key || '').toLowerCase();
      const isUrlish = URL_KEYS.has(k) || k.endsWith('url') || k.endsWith('href');
      const isCode = k === 'code' || k.endsWith('snippet');
      if (isUrlish || isCode) {
        assert.ok(!bad.test(node), `unsafe URL scheme at ${where}: ${node.slice(0, 80)}`);
      }
    } else if (Array.isArray(node)) {
      node.forEach((n, i) => walk(n, `${where}[${i}]`, key));
    } else if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) walk(v, `${where}.${k}`, k);
    }
  };
  walk(data, 'root', '');
  // Docs links specifically must never be dangerous schemes
  for (const l of data.languages) assert.ok(!bad.test(l.docs), `${l.id}.docs unsafe`);
});

test('all lesson docs links are valid https URLs', () => {
  for (const l of data.languages) {
    const u = new URL(l.docs);
    assert.equal(u.protocol, 'https:', `${l.id} docs must be https`);
  }
});

test('OFFICIAL_RESOURCES.json parses with https URLs', () => {
  const res = JSON.parse(fs.readFileSync(RES, 'utf8'));
  for (const [k, v] of Object.entries(res)) {
    assert.equal(new URL(v).protocol, 'https:', `${k} must be https`);
  }
});

test('validator script exits 0 on current curriculum', () => {
  const { execFileSync } = require('node:child_process');
  const out = execFileSync(process.execPath, [path.join(ROOT, 'tools', 'build-curriculum', 'validate.js')], { encoding: 'utf8' });
  assert.match(out, /0 error\(s\)/);
});
