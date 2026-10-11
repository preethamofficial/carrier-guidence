/**
 * CodeAtlas learning store (v2).
 * - Browser: window.CAStore ; Node (tests): module.exports
 * - Migrates `codeatlas-progress-v1` + `codeatlas-note-*` without destroying them.
 * - All data stays in localStorage unless the user exports it.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CAStore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STATE_KEY = 'codeatlas-state-v2';
  const LEGACY_KEY = 'codeatlas-progress-v1';
  const LEGACY_NOTE_PREFIX = 'codeatlas-note-';
  const SCHEMA_VERSION = 2;

  function emptyState() {
    return {
      version: SCHEMA_VERSION,
      completed: [],            // [{ id, at }]
      bookmarks: [],            // [id]
      notes: {},                // topicId -> string
      quizAttempts: [],         // [{ quizId, score, total, at }]
      flashcards: {},           // cardId -> { box, due, history: [] }
      activity: [],             // [{ date:'YYYY-MM-DD', type, ref }]
      goals: { dailyMinutes: 30 },
      streak: { current: 0, best: 0, lastDay: null },
      selectedCareer: null,     // career track id
      selectedLanguage: null,
      projects: {},             // projectId -> { status, github, notes, updatedAt }
      jobs: [],                 // job applications
      aiSettings: { provider: 'builtin', model: null }, // never store API keys here
      migrationNote: null,
    };
  }

  function safeParse(json, fallback) {
    if (typeof json !== 'string') return fallback;
    try { const v = JSON.parse(json); return v == null ? fallback : v; } catch (e) { return fallback; }
  }

  function strArray(v) {
    if (!Array.isArray(v)) return [];
    return v.filter((x) => typeof x === 'string' && x.trim().length > 0 && x.length < 200);
  }

  /** Read legacy v1 state + note keys; return { completed, bookmarks, notes, migratedFrom } */
  function readLegacy(storage) {
    const legacy = safeParse(storage.getItem(LEGACY_KEY), null);
    const completed = strArray(legacy && legacy.completed);
    const bookmarks = strArray(legacy && legacy.bookmarks);
    const notes = {};
    let migratedFrom = [];
    // localStorage enumeration is safe in both browser and test shim
    const keys = [];
    for (let i = 0; i < storage.length; i++) {
      const k = typeof storage.key === 'function' ? storage.key(i) : null;
      if (k && k.startsWith(LEGACY_NOTE_PREFIX)) keys.push(k);
    }
    for (const k of keys) {
      const id = k.slice(LEGACY_NOTE_PREFIX.length);
      const v = storage.getItem(k);
      if (typeof v === 'string' && v.trim()) notes[id] = v;
    }
    if (completed.length || bookmarks.length || Object.keys(notes).length) migratedFrom.push(LEGACY_KEY);
    return { completed, bookmarks, notes, migratedFrom };
  }

  /** Build v2 state from scratch or migrate legacy data. Never writes by itself. */
  function migrate(storage) {
    const existingRaw = storage.getItem(STATE_KEY);
    if (existingRaw) {
      const parsed = safeParse(existingRaw, null);
      if (parsed && parsed.version === SCHEMA_VERSION) return { state: normalize(parsed), fresh: false, migrated: false };
      // Unknown/corrupt v2: rebuild from legacy, keep broken payload for recovery
      const broken = existingRaw;
      const { completed, bookmarks, notes, migratedFrom } = readLegacy(storage);
      const state = emptyState();
      state.completed = completed.map((id) => ({ id, at: null }));
      state.bookmarks = bookmarks;
      state.notes = notes;
      state.migrationNote = 'Existing v2 data could not be read; legacy progress was restored. Damaged payload kept under ' + STATE_KEY + ':broken';
      storage.setItem(STATE_KEY + ':broken', broken);
      return { state, fresh: false, migrated: true, recovered: true };
    }
    // Fresh install → check legacy
    const { completed, bookmarks, notes } = readLegacy(storage);
    const state = emptyState();
    state.completed = completed.map((id) => ({ id, at: null }));
    state.bookmarks = bookmarks;
    state.notes = notes;
    if (completed.length || bookmarks.length || Object.keys(notes).length) {
      state.migrationNote = 'Progress from the previous version was migrated automatically.';
    }
    return { state, fresh: true, migrated: completed.length + bookmarks.length > 0 };
  }

  function normalize(state) {
    const base = emptyState();
    const s = Object.assign(base, state);
    s.version = SCHEMA_VERSION;
    if (!Array.isArray(s.completed)) s.completed = [];
    s.completed = s.completed
      .map((c) => (typeof c === 'string' ? { id: c, at: null } : c))
      .filter((c) => c && typeof c.id === 'string')
      .map((c) => ({ id: c.id, at: typeof c.at === 'string' ? c.at : null }));
    s.bookmarks = strArray(s.bookmarks);
    s.notes = (s.notes && typeof s.notes === 'object') ? s.notes : {};
    s.quizAttempts = Array.isArray(s.quizAttempts) ? s.quizAttempts.filter((q) => q && typeof q.quizId === 'string') : [];
    s.flashcards = (s.flashcards && typeof s.flashcards === 'object') ? s.flashcards : {};
    s.activity = Array.isArray(s.activity) ? s.activity.filter((a) => a && typeof a.date === 'string') : [];
    if (!s.goals || typeof s.goals !== 'object') s.goals = { dailyMinutes: 30 };
    if (typeof s.goals.dailyMinutes !== 'number' || s.goals.dailyMinutes < 5 || s.goals.dailyMinutes > 600) s.goals.dailyMinutes = 30;
    if (!s.streak || typeof s.streak !== 'object') s.streak = { current: 0, best: 0, lastDay: null };
    s.projects = (s.projects && typeof s.projects === 'object') ? s.projects : {};
    s.jobs = Array.isArray(s.jobs) ? s.jobs.filter((j) => j && typeof j.id === 'string') : [];
    if (!s.aiSettings || typeof s.aiSettings !== 'object') s.aiSettings = { provider: 'builtin', model: null };
    if (typeof s.aiSettings.provider !== 'string') s.aiSettings.provider = 'builtin';
    delete s.aiSettings.apiKey; // never persist keys in state
    return s;
  }

  const listeners = [];
  function createStore(storage) {
    let state;
    let migration;
    function load() {
      migration = migrate(storage);
      state = migration.state;
      persist();
      return state;
    }
    function persist() {
      try { storage.setItem(STATE_KEY, JSON.stringify(state)); } catch (e) { /* quota — keep running in-memory */ }
      listeners.forEach((fn) => { try { fn(state); } catch (e) { /* listener error isolated */ } });
    }
    function today() { return new Date().toISOString().slice(0, 10); }

    function logActivity(type, ref) {
      const d = today();
      const last = state.activity[state.activity.length - 1];
      if (last && last.date === d && last.type === type && last.ref === ref) return; // dedupe
      state.activity.push({ date: d, type, ref });
      if (state.activity.length > 4000) state.activity = state.activity.slice(-4000);
    }

    function touchStreak() {
      const d = today();
      const st = state.streak;
      if (st.lastDay === d) return;
      const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      st.current = st.lastDay === yesterday ? st.current + 1 : 1;
      st.lastDay = d;
      st.best = Math.max(st.best || 0, st.current);
    }

    const api = {
      get state() { return state; },
      get migration() { return migration; },
      subscribe(fn) { listeners.push(fn); return () => { const i = listeners.indexOf(fn); if (i >= 0) listeners.splice(i, 1); }; },
      load,

      isDone(id) { return state.completed.some((c) => c.id === id); },
      toggleComplete(id) {
        const i = state.completed.findIndex((c) => c.id === id);
        if (i >= 0) { state.completed.splice(i, 1); logActivity('uncomplete', id); }
        else { state.completed.push({ id, at: new Date().toISOString() }); logActivity('complete', id); touchStreak(); }
        persist(); return api.isDone(id);
      },
      toggleBookmark(id) {
        const i = state.bookmarks.indexOf(id);
        if (i >= 0) state.bookmarks.splice(i, 1); else state.bookmarks.push(id);
        persist(); return state.bookmarks.includes(id);
      },
      isBookmarked(id) { return state.bookmarks.includes(id); },
      getNote(id) { return typeof state.notes[id] === 'string' ? state.notes[id] : ''; },
      setNote(id, text) {
        if (typeof text === 'string' && text.trim()) state.notes[id] = text; else delete state.notes[id];
        persist();
      },
      recordQuiz(quizId, score, total) {
        state.quizAttempts.push({ quizId, score: Math.max(0, score | 0), total: Math.max(1, total | 0), at: new Date().toISOString() });
        if (state.quizAttempts.length > 500) state.quizAttempts = state.quizAttempts.slice(-500);
        logActivity('quiz', quizId); touchStreak(); persist();
      },
      quizStats() {
        const total = state.quizAttempts.reduce((s, q) => s + q.total, 0);
        const score = state.quizAttempts.reduce((s, q) => s + q.score, 0);
        return { attempts: state.quizAttempts.length, score, total, pct: total ? Math.round(score / total * 100) : null };
      },
      // SM-2 lite spaced repetition
      reviewCard(cardId, quality) { // quality 0..5
        const q = Math.min(5, Math.max(0, quality | 0));
        const c = state.flashcards[cardId] || { box: 0, due: today(), history: [] };
        c.history.push({ q, at: new Date().toISOString() });
        if (c.history.length > 30) c.history = c.history.slice(-30);
        if (q < 3) c.box = 0;
        else c.box = (c.box || 0) + 1;
        const intervals = [0, 1, 2, 4, 8, 16]; // days per box
        const days = intervals[Math.min(c.box, intervals.length - 1)];
        c.due = new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);
        state.flashcards[cardId] = c;
        logActivity('review', cardId); touchStreak(); persist();
        return c;
      },
      dueCards() {
        const d = today();
        return Object.keys(state.flashcards).filter((k) => state.flashcards[k].due <= d);
      },
      setGoal(minutes) {
        const n = Number(minutes);
        if (!Number.isFinite(n) || n < 5 || n > 600) return false;
        state.goals.dailyMinutes = n; persist(); return true;
      },
      setCareer(id) { state.selectedCareer = id || null; persist(); },
      setLanguage(id) { state.selectedLanguage = id || null; persist(); },
      setProject(projectId, patch) {
        const cur = state.projects[projectId] || { status: 'idea', github: '', notes: '', updatedAt: null };
        Object.assign(cur, patch, { updatedAt: new Date().toISOString() });
        state.projects[projectId] = cur; logActivity('project', projectId); persist(); return cur;
      },
      addJob(job) {
        const id = 'job-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
        const rec = Object.assign({ id, company: '', role: '', url: '', appliedAt: null, status: 'saved', resumeVersion: '', interviewAt: null, notes: '', followUp: null, outcome: null }, job, { id });
        state.jobs.push(rec); logActivity('job', id); persist(); return rec;
      },
      updateJob(id, patch) {
        const j = state.jobs.find((x) => x.id === id);
        if (!j) return null;
        Object.assign(j, patch); persist(); return j;
      },
      deleteJob(id) {
        const i = state.jobs.findIndex((x) => x.id === id);
        if (i >= 0) { state.jobs.splice(i, 1); persist(); return true; }
        return false;
      },
      setAiProvider(provider, model) {
        state.aiSettings = { provider: provider || 'builtin', model: model || null };
        persist();
      },
      activityByDay(days) {
        const out = {};
        for (let i = 0; i < days; i++) out[new Date(Date.now() - i * 864e5).toISOString().slice(0, 10)] = 0;
        for (const a of state.activity) if (out[a.date] != null) out[a.date]++;
        return out;
      },
      exportAll() {
        return JSON.stringify({ app: 'codeatlas', schema: SCHEMA_VERSION, exportedAt: new Date().toISOString(), state }, null, 2);
      },
      /** Import a previously exported payload. Returns {ok, error}. */
      importAll(json) {
        const parsed = safeParse(json, null);
        if (!parsed || parsed.app !== 'codeatlas' || !parsed.state) return { ok: false, error: 'Not a CodeAtlas export file.' };
        try {
          state = normalize(parsed.state);
          persist();
          return { ok: true };
        } catch (e) { return { ok: false, error: 'Could not read the export: ' + e.message }; }
      },
      resetAll() {
        state = emptyState();
        persist();
      },
    };
    return api;
  }

  return { createStore, emptyState, migrate, normalize, STATE_KEY, LEGACY_KEY, LEGACY_NOTE_PREFIX, SCHEMA_VERSION };
});
