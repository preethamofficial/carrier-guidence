'use strict';
// Store migration & actions tests — run: node --test tests/
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createStore, migrate, STATE_KEY, LEGACY_KEY, LEGACY_NOTE_PREFIX } = require('../CodeAtlas_Website/js/store.js');

/** Minimal in-memory Storage shim (localStorage-compatible enough for the store). */
function memStorage(initial = {}) {
  const m = new Map(Object.entries(initial));
  return {
    get length() { return m.size; },
    key(i) { return [...m.keys()][i] ?? null; },
    getItem(k) { return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(k, String(v)); },
    removeItem(k) { m.delete(k); },
    _dump() { return Object.fromEntries(m); },
  };
}

test('fresh install gets an empty v2 state and persists it', () => {
  const st = memStorage();
  const store = createStore(st);
  store.load();
  assert.equal(store.state.version, 2);
  assert.deepEqual(store.state.completed, []);
  assert.ok(st.getItem(STATE_KEY), 'v2 state persisted');
});

test('legacy v1 progress and notes migrate automatically and legacy keys are preserved', () => {
  const st = memStorage({
    [LEGACY_KEY]: JSON.stringify({ completed: ['python-1', 'python-2', 'sql-3'], bookmarks: ['go-1'] }),
    [LEGACY_NOTE_PREFIX + 'python-1']: 'my note about variables',
    [LEGACY_NOTE_PREFIX + 'python-2']: '   ', // whitespace-only must be ignored
  });
  const store = createStore(st);
  store.load();
  assert.equal(store.isDone('python-1'), true);
  assert.equal(store.isDone('sql-3'), true);
  assert.equal(store.isDone('rust-99'), false);
  assert.equal(store.isBookmarked('go-1'), true);
  assert.equal(store.getNote('python-1'), 'my note about variables');
  assert.equal(store.getNote('python-2'), '');
  // Legacy data untouched — no silent reset possible
  const legacy = JSON.parse(st.getItem(LEGACY_KEY));
  assert.deepEqual(legacy.completed, ['python-1', 'python-2', 'sql-3']);
  assert.equal(st.getItem(LEGACY_NOTE_PREFIX + 'python-1'), 'my note about variables');
});

test('malformed legacy JSON does not crash and yields empty state', () => {
  const st = memStorage({ [LEGACY_KEY]: '{broken json!!' });
  const store = createStore(st);
  store.load();
  assert.deepEqual(store.state.completed, []);
  assert.deepEqual(store.state.bookmarks, []);
});

test('malformed v2 payload recovers from legacy and preserves damaged payload', () => {
  const st = memStorage({
    [STATE_KEY]: 'not-json',
    [LEGACY_KEY]: JSON.stringify({ completed: ['java-1'], bookmarks: [] }),
  });
  const { state, recovered } = migrate(st);
  assert.equal(recovered, true);
  assert.equal(state.completed.some((c) => c.id === 'java-1'), true);
  assert.equal(st.getItem(STATE_KEY + ':broken'), 'not-json', 'damaged payload kept for recovery');
});


test('toggleComplete / toggleBookmark / notes persist across "refresh" (new store on same storage)', () => {
  const st = memStorage();
  const s1 = createStore(st);
  s1.load();
  s1.toggleComplete('python-1');
  s1.toggleComplete('python-1'); // untoggle
  s1.toggleComplete('js-1');
  s1.toggleBookmark('rust-2');
  s1.setNote('rust-2', 'borrow checker notes');
  const s2 = createStore(st); // simulate refresh
  s2.load();
  assert.equal(s2.isDone('python-1'), false);
  assert.equal(s2.isDone('js-1'), true);
  assert.equal(s2.isBookmarked('rust-2'), true);
  assert.equal(s2.getNote('rust-2'), 'borrow checker notes');
});

test('quiz recording, streak and goals work; invalid goals rejected', () => {
  const st = memStorage();
  const store = createStore(st);
  store.load();
  store.recordQuiz('quiz-python-1', 4, 5);
  store.recordQuiz('quiz-python-1', 3, 5);
  const qs = store.quizStats();
  assert.equal(qs.attempts, 2);
  assert.equal(qs.score, 7);
  assert.equal(qs.total, 10);
  assert.equal(qs.pct, 70);
  assert.equal(store.state.streak.current, 1, 'activity starts a streak');
  assert.equal(store.setGoal(45), true);
  assert.equal(store.state.goals.dailyMinutes, 45);
  assert.equal(store.setGoal(1), false, 'goals below 5 minutes rejected');
  assert.equal(store.state.goals.dailyMinutes, 45);
});

test('spaced repetition: low quality resets box, high quality advances intervals', () => {
  const st = memStorage();
  const store = createStore(st);
  store.load();
  store.reviewCard('card-a', 5);
  assert.equal(store.state.flashcards['card-a'].box, 1);
  store.reviewCard('card-a', 5);
  store.reviewCard('card-a', 5);
  assert.equal(store.state.flashcards['card-a'].box, 3);
  store.reviewCard('card-a', 1); // forgot
  assert.equal(store.state.flashcards['card-a'].box, 0);
  assert.ok(store.dueCards().includes('card-a'), 'failed card due today');
});

test('job tracker CRUD persists', () => {
  const st = memStorage();
  const store = createStore(st);
  store.load();
  const job = store.addJob({ company: 'Acme', role: 'QA Intern', url: 'https://example.com/jobs/1', status: 'applied' });
  assert.equal(store.state.jobs.length, 1);
  store.updateJob(job.id, { status: 'interview' });
  assert.equal(store.state.jobs[0].status, 'interview');
  assert.equal(store.deleteJob(job.id), true);
  assert.equal(store.state.jobs.length, 0);
});

test('export / import round-trip; invalid import rejected; api keys never persisted', () => {
  const st = memStorage();
  const store = createStore(st);
  store.load();
  store.toggleComplete('python-1');
  store.setAiProvider('gemini', 'gemini-flash');
  const json = store.exportAll();
  const st2 = memStorage();
  const store2 = createStore(st2);
  store2.load();
  const res = store2.importAll(json);
  assert.equal(res.ok, true);
  assert.equal(store2.isDone('python-1'), true);
  assert.equal(store2.state.aiSettings.provider, 'gemini');
  assert.equal(store2.importAll('{"hello":1}').ok, false);
  assert.equal(store2.importAll('null').ok, false);
  // Simulate a tampered export that tries to smuggle an API key
  const evil = JSON.parse(json);
  evil.state.aiSettings.apiKey = 'sk-secret';
  store2.importAll(JSON.stringify(evil));
  assert.equal(store2.state.aiSettings.apiKey, undefined, 'api keys stripped on import');
  assert.ok(!JSON.stringify(store2.state).includes('sk-secret'));
});

test('legacy enumeration-based note migration works with key() interface', () => {
  const st = memStorage({ [LEGACY_NOTE_PREFIX + 'go-5']: 'channels are pipelines' });
  const { state } = migrate(st);
  assert.equal(state.notes['go-5'], 'channels are pipelines');
});
