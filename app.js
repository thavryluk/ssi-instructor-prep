"use strict";

const STORAGE_KEYS = {
  selectedAreas: "ssi.selectedAreas",
  selectedSubareas: "ssi.selectedSubareas", // Set of "area:group" strings
  sourceFilter: "ssi.sourceFilter",         // 'all' | 'web' | 'compiled'
  mastered100: "ssi.mastered100",
  mastered50: "ssi.mastered50",
  disputed: "ssi.disputed",
  studyMore: "ssi.studyMore",
  resetMarks: "ssi.resetMarks",
  skipDisputed: "ssi.skipDisputed",
  theme: "ssi.theme",
  log: "ssi.log",
  legacyMastered: "ssi.mastered",
};

const AREA_LABELS = {
  science_of_diving: "Science of Diving",
  divemaster: "Divemaster",
  assistant_instructor: "Assistant Instructor",
  instructor: "Instructor",
};

// Probability that a draw pulls from the 50% pool instead of the active pool
const REVIEW_50_PROBABILITY = 0.1;

const state = {
  questions: [],
  selectedAreas: new Set(),
  selectedSubareas: new Set(), // entries like "science_of_diving:Physics"
  sourceFilter: "all",         // 'all' | 'web' | 'compiled'
  mastered100: new Set(),
  mastered50: new Set(),
  disputed: new Set(),
  studyMore: new Set(),
  resetMarks: {},   // qid → ISO timestamp; log entries before this are excluded from active stats
  skipDisputed: false,
  log: [],
  current: null,
  answered: false,
};

// ───────── Helpers: subarea grouping + source type ─────────

function subareaGroup(q) {
  const s = q?.subarea || "";
  const parts = s.split(/ — | - |:/);
  return (parts[0] || "(uncategorized)").trim();
}

function sourceTypeKey(q) {
  const src = (q?.source || "").toString();
  if (src.startsWith("Personal:")) return "personal";
  if (src.startsWith("mySSI")) return "mssi";
  if (src && src !== "compiled_from_dive_theory" && src !== "seed") return "web";
  return "compiled";
}

// Personal source is gated behind a password.
const PERSONAL_PASSWORD = "jetmouse";
const PERSONAL_HINT = "Kuk za buk";

function isPersonalUnlocked() {
  try { return localStorage.getItem("ssi.personalUnlocked") === "1"; }
  catch { return false; }
}

const SOURCE_KEYS_ALL = ["mssi", "personal", "web", "compiled"];
const SOURCE_KEYS_LOCKED = ["mssi", "web", "compiled"];
function sourceKeysVisible() {
  return isPersonalUnlocked() ? SOURCE_KEYS_ALL : SOURCE_KEYS_LOCKED;
}
const SOURCE_KEYS = SOURCE_KEYS_ALL; // legacy alias for code that doesn't gate
const SOURCE_LABELS = {
  mssi: "mySSI (verbatim)",
  personal: "🔒 Personal",
  web: "Web (other)",
  compiled: "Compiled (theory)",
};

// All subareas grouped by area, sorted, computed once after questions load
let subareaIndex = {}; // { area: [{ group, count }] }
function buildSubareaIndex() {
  subareaIndex = {};
  for (const q of state.questions) {
    if (!subareaIndex[q.area]) subareaIndex[q.area] = new Map();
    const g = subareaGroup(q);
    subareaIndex[q.area].set(g, (subareaIndex[q.area].get(g) || 0) + 1);
  }
  // Convert to sorted arrays
  for (const area of Object.keys(subareaIndex)) {
    subareaIndex[area] = [...subareaIndex[area].entries()]
      .map(([group, count]) => ({ group, count }))
      .sort((a, b) => b.count - a.count);
  }
}

function subareaKey(area, group) { return `${area}:${group}`; }

// Extract clean section label (e.g. "Pretest Part 1", "Lesson 1.1", "AIT Exam Form A") from source string
function mssiSectionLabel(q) {
  const stype = sourceTypeKey(q);
  if (stype === "compiled" || stype === "web") return null;
  const raw = String(q.source || "");
  if (stype === "mssi") {
    const src = raw.replace(/^mySSI:\s*/, "");
    let m;
    if ((m = src.match(/Instructor\s+Pretest\s*[—-]\s*(Part\s*\d+)/i))) return `Pretest ${m[1].replace(/\s+/g, " ").trim()}`;
    if ((m = src.match(/(Lesson\s+[\d.]+)/i))) return m[1].trim();
    return src;
  }
  if (stype === "personal") {
    const src = raw.replace(/^Personal:\s*/, "");
    return src.split(" (")[0].trim();
  }
  return null;
}

let mssiSectionIndex = []; // [{ label, count, personal }] sorted by natural section order
function buildMssiSectionIndex() {
  const counts = new Map();
  const isPersonalSection = new Map();
  for (const q of state.questions) {
    const label = mssiSectionLabel(q);
    if (!label) continue;
    counts.set(label, (counts.get(label) || 0) + 1);
    if (sourceTypeKey(q) === "personal") isPersonalSection.set(label, true);
  }
  mssiSectionIndex = [...counts.entries()]
    .map(([label, count]) => ({ label, count, personal: !!isPersonalSection.get(label) }))
    .sort((a, b) => {
      const sortKey = (s) => {
        const p = s.match(/Pretest Part (\d+)/);
        if (p) return [0, parseInt(p[1])];
        const l = s.match(/Lesson\s+([\d.]+)/);
        if (l) return [1, ...l[1].split(".").map(Number)];
        return [2, s];
      };
      const ka = sortKey(a.label), kb = sortKey(b.label);
      for (let i = 0; i < Math.max(ka.length, kb.length); i++) {
        const va = ka[i] ?? 0, vb = kb[i] ?? 0;
        if (va < vb) return -1;
        if (va > vb) return 1;
      }
      return 0;
    });
}

function visibleMssiSections() {
  const unlocked = isPersonalUnlocked();
  return mssiSectionIndex.filter((s) => unlocked || !s.personal);
}

// ───────── Persistence ─────────

function loadState() {
  const tryParse = (key, fallback) => {
    try { const v = JSON.parse(localStorage.getItem(key) || "null"); return v ?? fallback; }
    catch { return fallback; }
  };
  const areas = tryParse(STORAGE_KEYS.selectedAreas, null);
  if (Array.isArray(areas)) state.selectedAreas = new Set(areas);

  const subs = tryParse(STORAGE_KEYS.selectedSubareas, null);
  if (Array.isArray(subs)) state.selectedSubareas = new Set(subs);

  const srcF = tryParse(STORAGE_KEYS.sourceFilter, null);
  if (srcF === "all" || SOURCE_KEYS.includes(srcF)) state.sourceFilter = srcF;

  let mastered100 = tryParse(STORAGE_KEYS.mastered100, []);
  // Migrate legacy single-mastered list
  const legacy = tryParse(STORAGE_KEYS.legacyMastered, null);
  if (Array.isArray(legacy) && legacy.length && (!Array.isArray(mastered100) || mastered100.length === 0)) {
    mastered100 = legacy;
    localStorage.setItem(STORAGE_KEYS.mastered100, JSON.stringify(mastered100));
    localStorage.removeItem(STORAGE_KEYS.legacyMastered);
  }
  if (Array.isArray(mastered100)) state.mastered100 = new Set(mastered100);

  const mastered50 = tryParse(STORAGE_KEYS.mastered50, []);
  if (Array.isArray(mastered50)) state.mastered50 = new Set(mastered50);

  const disputed = tryParse(STORAGE_KEYS.disputed, []);
  if (Array.isArray(disputed)) state.disputed = new Set(disputed);

  const studyMore = tryParse(STORAGE_KEYS.studyMore, []);
  if (Array.isArray(studyMore)) state.studyMore = new Set(studyMore);

  const resetMarks = tryParse(STORAGE_KEYS.resetMarks, {});
  if (resetMarks && typeof resetMarks === "object" && !Array.isArray(resetMarks)) state.resetMarks = resetMarks;

  state.skipDisputed = tryParse(STORAGE_KEYS.skipDisputed, false) === true;

  const log = tryParse(STORAGE_KEYS.log, []);
  if (Array.isArray(log)) {
    // One-off migration: rename historical "secret-*" qids to "personal-*"
    let migrated = false;
    for (const e of log) {
      if (typeof e.qid === "string" && e.qid.startsWith("secret-")) {
        e.qid = "personal-" + e.qid.slice("secret-".length);
        migrated = true;
      }
    }
    state.log = log;
    if (migrated) localStorage.setItem(STORAGE_KEYS.log, JSON.stringify(state.log));
  }
}

function saveAreas()      { localStorage.setItem(STORAGE_KEYS.selectedAreas, JSON.stringify([...state.selectedAreas])); scheduleStateSync(); }
function saveSubareas()   { localStorage.setItem(STORAGE_KEYS.selectedSubareas, JSON.stringify([...state.selectedSubareas])); scheduleStateSync(); }
function saveSourceFilter(){ localStorage.setItem(STORAGE_KEYS.sourceFilter, JSON.stringify(state.sourceFilter)); scheduleStateSync(); }
function saveMastered100(){ localStorage.setItem(STORAGE_KEYS.mastered100,   JSON.stringify([...state.mastered100])); scheduleStateSync(); }
function saveMastered50() { localStorage.setItem(STORAGE_KEYS.mastered50,    JSON.stringify([...state.mastered50])); scheduleStateSync(); }
function saveDisputed()   { localStorage.setItem(STORAGE_KEYS.disputed,      JSON.stringify([...state.disputed])); scheduleStateSync(); }
function saveStudyMore()  { localStorage.setItem(STORAGE_KEYS.studyMore,     JSON.stringify([...state.studyMore])); scheduleStateSync(); }
function saveResetMarks() { localStorage.setItem(STORAGE_KEYS.resetMarks,    JSON.stringify(state.resetMarks)); scheduleStateSync(); }

// True if a log entry should count toward active (pool/dashboard/picking) stats.
// False means the entry is "before reset" for that question — only counts in TOTAL.
function isActiveEntry(e) {
  const cutoff = state.resetMarks[e.qid];
  if (!cutoff) return true;
  return e.ts > cutoff;
}
function saveSkipDisputed(){ localStorage.setItem(STORAGE_KEYS.skipDisputed, JSON.stringify(state.skipDisputed)); scheduleStateSync(); }
function saveLog()        { localStorage.setItem(STORAGE_KEYS.log,           JSON.stringify(state.log)); scheduleStateSync(); }

// ───────── User management + cross-device state sync ─────────

const SYNC_KEYS = [
  "ssi.selectedAreas", "ssi.selectedSubareas", "ssi.sourceFilter",
  "ssi.mastered100", "ssi.mastered50", "ssi.disputed", "ssi.studyMore",
  "ssi.resetMarks", "ssi.skipDisputed",
  "ssi.log",
  "ssi.theme", "ssi.personalUnlocked",
];

const CURRENT_USER_KEY = "ssi.currentUser";

function getCurrentUser() {
  try { return localStorage.getItem(CURRENT_USER_KEY); }
  catch { return null; }
}

function setCurrentUser(name) {
  if (name) localStorage.setItem(CURRENT_USER_KEY, name);
  else localStorage.removeItem(CURRENT_USER_KEY);
}

let _syncAvailable = null;        // null = unknown, true/false after first probe
let _syncTimer = null;

function syncEndpoint(user) {
  // Cloud (Netlify): /api/state?user=X
  // Local fallback (serve.py): /state (no user namespacing — single user mode)
  if (user) return `/api/state?user=${encodeURIComponent(user)}`;
  return "/state";
}

async function loadStateForCurrentUser() {
  const user = getCurrentUser();
  // Try cloud (with user) first if logged in, else local /state
  try {
    const url = syncEndpoint(user);
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) { _syncAvailable = false; return false; }
    const data = await r.json();
    _syncAvailable = true;
    if (data && typeof data === "object") {
      // Clear synced keys first so previous user's data doesn't bleed in
      for (const k of SYNC_KEYS) {
        if (!Object.prototype.hasOwnProperty.call(data, k)) {
          try { localStorage.removeItem(k); } catch {}
        }
      }
      for (const k of Object.keys(data)) {
        const v = data[k];
        if (v == null) continue;
        try { localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v)); }
        catch {}
      }
    }
    return true;
  } catch {
    _syncAvailable = false;
    return false;
  }
}

function scheduleStateSync() {
  if (_syncAvailable === false) return;
  if (_syncTimer) clearTimeout(_syncTimer);
  _syncTimer = setTimeout(pushStateToServer, 800);
}

async function pushStateToServer() {
  if (_syncAvailable === false) return;
  const payload = {};
  for (const k of SYNC_KEYS) {
    const v = localStorage.getItem(k);
    if (v != null) payload[k] = v;
  }
  const user = getCurrentUser();
  try {
    const r = await fetch(syncEndpoint(user), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) _syncAvailable = false;
    else _syncAvailable = true;
  } catch {
    _syncAvailable = false;
  }
}

// Auth API calls
async function apiAuth(action, username, password) {
  const r = await fetch(`/api/auth?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  let data = {};
  try { data = await r.json(); } catch {}
  if (!r.ok) throw new Error(data.error || `HTTP ${r.status}`);
  return data;
}

async function apiListUsers() {
  try {
    const r = await fetch("/api/users", { cache: "no-store" });
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data.users) ? data.users : [];
  } catch { return []; }
}

async function apiGetStateForUser(user) {
  try {
    const r = await fetch(`/api/state?user=${encodeURIComponent(user)}`, { cache: "no-store" });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

// True if running on a deploy with /api endpoints (Netlify); false on local-only
let _hasCloudApi = null;
async function hasCloudApi() {
  if (_hasCloudApi !== null) return _hasCloudApi;
  try {
    const r = await fetch("/api/users", { method: "GET", cache: "no-store" });
    _hasCloudApi = r.ok;
  } catch { _hasCloudApi = false; }
  return _hasCloudApi;
}

// ───────── Questions loading ─────────

async function loadQuestions() {
  for (const path of ["data/questions.json", "data/questions.seed.json"]) {
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) continue;
      const data = await res.json();
      if (data && Array.isArray(data.questions) && data.questions.length) {
        state.questions = data.questions;
        return path;
      }
    } catch (e) { /* try next */ }
  }
  throw new Error("No questions file found.");
}

// ───────── Pool management ─────────

function isAreaSelected(q) { return state.selectedAreas.has(q.area); }
function isExcludedByDispute(q) { return state.skipDisputed && state.disputed.has(q.id); }

function passesSubareaFilter(q) {
  // Are any subareas selected for THIS question's area?
  const areaPrefix = q.area + ":";
  let anyForArea = false;
  for (const s of state.selectedSubareas) {
    if (s.startsWith(areaPrefix)) { anyForArea = true; break; }
  }
  if (!anyForArea) return true; // no narrowing for this area
  return state.selectedSubareas.has(subareaKey(q.area, subareaGroup(q)));
}

function passesSourceFilter(q) {
  // Hard gate: when locked, personal questions are excluded from drill pool entirely
  if (sourceTypeKey(q) === "personal" && !isPersonalUnlocked()) return false;
  if (state.sourceFilter === "all") return true;
  return state.sourceFilter === sourceTypeKey(q);
}

function passesAllDrillFilters(q) {
  return isAreaSelected(q)
    && passesSubareaFilter(q)
    && passesSourceFilter(q)
    && !isExcludedByDispute(q);
}

// Active pool: in scope, not mastered at any level
function activePool() {
  return state.questions.filter(
    (q) => passesAllDrillFilters(q) && !state.mastered100.has(q.id) && !state.mastered50.has(q.id)
  );
}

// 50% review pool: in scope, marked 50%, not 100%
function review50Pool() {
  return state.questions.filter(
    (q) => passesAllDrillFilters(q) && state.mastered50.has(q.id) && !state.mastered100.has(q.id)
  );
}

// Weight scheme (favours unseen / wrong over already-correct):
// - Never answered → 6.0 (heavy coverage boost)
// - Answered, 0 correct (wrong/unknown only) → 1.0
// - Answered, ≥1 correct → 0.3 / correct_count^1.3
//     1 correct → 0.30
//     2 correct → 0.12
//     3 correct → 0.07
//     5 correct → 0.03
// - Recently wrong/unknown (last 50 attempts) → ×2 multiplier
// - Floor 0.02 so heavily-mastered questions still surface very rarely
function questionWeight(qid, stats, recentlyWrong) {
  const s = stats.get(qid);
  let w;
  if (!s || s.attempts === 0) {
    w = 6.0;
  } else if (s.correct === 0) {
    w = 1.0;
  } else {
    w = 0.3 / Math.pow(s.correct, 1.3);
  }
  if (recentlyWrong.has(qid)) w *= 2.0;
  return Math.max(0.02, w);
}

function buildPickStats() {
  const stats = new Map(); // qid → { correct, attempts, lastResult, lastTs }
  for (const e of state.log) {
    if (e.result !== "correct" && e.result !== "wrong" && e.result !== "unknown") continue;
    if (!isActiveEntry(e)) continue;
    let s = stats.get(e.qid);
    if (!s) { s = { correct: 0, attempts: 0, lastResult: null, lastTs: null }; stats.set(e.qid, s); }
    s.attempts++;
    if (e.result === "correct") s.correct++;
    if (!s.lastTs || e.ts > s.lastTs) { s.lastTs = e.ts; s.lastResult = e.result; }
  }
  const recentlyWrong = new Set(
    state.log
      .filter((e) => (e.result === "wrong" || e.result === "unknown") && isActiveEntry(e))
      .slice(-50)
      .map((e) => e.qid)
  );
  return { stats, recentlyWrong };
}

function weightedPick(pool, stats, recentlyWrong) {
  if (pool.length === 0) return null;
  let total = 0;
  const weights = pool.map((q) => {
    const w = questionWeight(q.id, stats, recentlyWrong);
    total += w;
    return w;
  });
  if (total <= 0) return pool[Math.floor(Math.random() * pool.length)];
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

// Track last N picked question IDs to prevent immediate repeats
const RECENT_PICK_LOOKBACK = 3;
let recentlyPicked = [];

function pickRandom() {
  const review = review50Pool();
  const active = activePool();

  // Decide which pool to pull from
  let sourcePool;
  if (active.length === 0 && review.length === 0) return null;
  if (active.length === 0) sourcePool = review;
  else if (review.length === 0) sourcePool = active;
  else sourcePool = (Math.random() < REVIEW_50_PROBABILITY) ? review : active;

  // Exclude very recently picked questions IF the pool has enough alternatives
  const recentSet = new Set(recentlyPicked.slice(-RECENT_PICK_LOOKBACK));
  let filtered = sourcePool;
  if (sourcePool.length > RECENT_PICK_LOOKBACK + 1) {
    filtered = sourcePool.filter((q) => !recentSet.has(q.id));
    if (filtered.length === 0) filtered = sourcePool; // fallback (shouldn't happen)
  }

  const { stats, recentlyWrong } = buildPickStats();
  const picked = weightedPick(filtered, stats, recentlyWrong);
  if (picked) {
    recentlyPicked.push(picked.id);
    if (recentlyPicked.length > 20) recentlyPicked = recentlyPicked.slice(-20);
  }
  return picked;
}

// ───────── DOM helpers ─────────

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function show(screenId) {
  $$(".screen").forEach((s) => s.classList.add("hidden"));
  $(`#${screenId}`).classList.remove("hidden");
}

function refreshStats() {
  const poolCount = activePool().length + review50Pool().length;

  // Questions in current drill scope (area + subarea + source filter, ignore mastered/disputed)
  const inScopeIds = new Set();
  for (const q of state.questions) {
    if (isAreaSelected(q) && passesSubareaFilter(q) && passesSourceFilter(q)) {
      inScopeIds.add(q.id);
    }
  }
  const inScopeTotal = inScopeIds.size;

  // Pool stats: seen + accuracy within drill scope
  const ATTEMPT_RESULTS = new Set(["correct", "wrong", "unknown"]);
  const seenInScope = new Set();
  let poolAttempts = 0, poolCorrect = 0, poolWrong = 0;
  let totalAttempts = 0, totalCorrect = 0, totalWrong = 0;
  for (const e of state.log) {
    if (!ATTEMPT_RESULTS.has(e.result)) continue;
    totalAttempts++;
    if (e.result === "correct") totalCorrect++;
    else totalWrong++; // wrong + unknown both count as "not correct"
    // Pool stats only count entries AFTER reset (active entries)
    if (inScopeIds.has(e.qid) && isActiveEntry(e)) {
      poolAttempts++;
      if (e.result === "correct") poolCorrect++;
      else poolWrong++;
      seenInScope.add(e.qid);
    }
  }

  function applyAccClass(el, pct) {
    el.classList.remove("acc-low", "acc-mid", "acc-high", "acc-goal");
    if (pct === null) return;
    if (pct >= 90) el.classList.add("acc-goal");
    else if (pct >= 75) el.classList.add("acc-high");
    else if (pct >= 50) el.classList.add("acc-mid");
    else el.classList.add("acc-low");
  }

  const poolPct = poolAttempts > 0 ? Math.round((poolCorrect / poolAttempts) * 100) : null;
  const totalPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : null;

  $("#stat-pool").textContent = poolCount;
  $("#stat-pool-seen").textContent = `${seenInScope.size}/${inScopeTotal}`;
  $("#stat-pool-correct").textContent = poolCorrect;
  $("#stat-pool-wrong").textContent = poolWrong;
  const poolAccEl = $("#stat-pool-acc");
  poolAccEl.textContent = poolPct === null ? "—" : `${poolPct}%`;
  applyAccClass(poolAccEl, poolPct);

  $("#stat-answered").textContent = totalAttempts;
  $("#stat-correct").textContent = totalCorrect;
  $("#stat-wrong").textContent = totalWrong;
  const totalAccEl = $("#stat-total-acc");
  totalAccEl.textContent = totalPct === null ? "—" : `${totalPct}%`;
  applyAccClass(totalAccEl, totalPct);

  $("#stat-mastered").textContent = state.mastered100.size + state.mastered50.size;
}

// ───────── Question rendering ─────────

function renderQuestion(q) {
  state.current = q;
  state.answered = false;
  $("#q-area").textContent = AREA_LABELS[q.area] || q.area;
  $("#q-subarea").textContent = q.subarea || "";
  const srcEl = $("#q-source");
  const k = sourceTypeKey(q);
  if (k === "personal") {
    srcEl.textContent = "🔒 Personal";
    srcEl.className = "badge badge-personal";
    srcEl.title = q.source;
  } else if (k === "mssi") {
    srcEl.textContent = "★ mySSI";
    srcEl.className = "badge badge-mssi";
    srcEl.title = q.source;
  } else if (k === "web") {
    srcEl.textContent = "● web source";
    srcEl.className = "badge badge-web";
    srcEl.title = q.source;
  } else {
    srcEl.textContent = "○ compiled (theory)";
    srcEl.className = "badge badge-compiled";
    srcEl.title = "Authored by agent from public SSI standards / dive theory — not a verbatim citation.";
  }
  $("#q-id").textContent = q.id;
  $("#q-text").textContent = q.question;
  renderQuestionStatsLine(q);

  const opts = $("#q-options");
  opts.innerHTML = "";
  for (const letter of ["a", "b", "c", "d"]) {
    if (!q.options[letter]) continue;
    const btn = document.createElement("button");
    btn.className = "option";
    btn.dataset.letter = letter;
    btn.innerHTML = `<span class="letter">${letter.toUpperCase()}</span><span class="text"></span>`;
    btn.querySelector(".text").textContent = q.options[letter];
    btn.addEventListener("click", () => onAnswer(letter));
    opts.appendChild(btn);
  }

  const fb = $("#q-feedback");
  fb.classList.add("hidden");
  fb.innerHTML = "";
  fb.className = "feedback hidden";

  $("#btn-next").classList.add("hidden");
  $("#btn-know-100").classList.remove("hidden");
  $("#btn-know-50").classList.remove("hidden");
  $("#btn-dont-know").classList.remove("hidden");

  // Flags row (disputed indicator + 50% indicator if pulled from review pool)
  renderFlagsRow();
  // Sync dispute button visual state
  const disputeBtn = $("#btn-dispute");
  disputeBtn.classList.toggle("active", state.disputed.has(q.id));
  disputeBtn.textContent = state.disputed.has(q.id) ? "⚐ Disputed (click to clear)" : "⚐ Dispute";
  // Sync study-more button visual state
  syncStudyButton(q);
}

function renderQuestionStatsLine(q) {
  const el = $("#q-stats");
  if (!el) return;
  const ATTEMPT = new Set(["correct", "wrong", "unknown"]);
  let seen = 0, correct = 0, wrong = 0, unknown = 0, lastTs = null, lastResult = null;
  let totalSeen = 0, totalCorrect = 0; // including pre-reset entries
  for (const e of state.log) {
    if (e.qid !== q.id) continue;
    if (!ATTEMPT.has(e.result)) continue;
    totalSeen++;
    if (e.result === "correct") totalCorrect++;
    if (!isActiveEntry(e)) continue;
    seen++;
    if (e.result === "correct") correct++;
    else if (e.result === "wrong") wrong++;
    else if (e.result === "unknown") unknown++;
    if (!lastTs || e.ts > lastTs) { lastTs = e.ts; lastResult = e.result; }
  }
  const flags = [];
  if (state.mastered100.has(q.id)) flags.push(`<span class="qs-flag flag-100">100%</span>`);
  if (state.mastered50.has(q.id)) flags.push(`<span class="qs-flag flag-50">~50%</span>`);
  if (state.studyMore.has(q.id)) flags.push(`<span class="qs-flag flag-study">📚 study</span>`);
  if (state.disputed.has(q.id)) flags.push(`<span class="qs-flag flag-disputed">⚐ disputed</span>`);
  if (state.resetMarks[q.id]) flags.push(`<span class="qs-flag flag-reset">↻ reset</span>`);

  const parts = [];
  if (seen === 0 && totalSeen === 0) {
    parts.push(`<span class="muted">First time you see this question</span>`);
  } else {
    const acc = seen ? Math.round((correct / seen) * 100) : null;
    let line = `Seen ${seen}× — `;
    line += `<span class="ok">✓${correct}</span> · `;
    line += `<span class="bad">✗${wrong}</span>`;
    if (unknown) line += ` · <span class="warn">? ${unknown}</span>`;
    if (acc !== null) line += ` · <strong>${acc}%</strong>`;
    if (totalSeen > seen) line += ` <span class="muted">(+${totalSeen - seen} pre-reset in Total)</span>`;
    parts.push(line);
  }
  if (flags.length) parts.push(flags.join(" "));
  el.innerHTML = parts.join(" · ");
}

function syncStudyButton(q) {
  const sBtn = $("#btn-study-more");
  const on = state.studyMore.has(q.id);
  sBtn.classList.toggle("active", on);
  sBtn.textContent = on ? "📚 Study more (click to clear)" : "📚 Study more";
}

function renderFlagsRow() {
  const q = state.current;
  const flags = $("#q-flags");
  if (!q) { flags.innerHTML = ""; return; }
  const parts = [];
  if (state.mastered50.has(q.id)) parts.push(`<span>↻ from 50% review pool</span>`);
  if (state.disputed.has(q.id)) parts.push(`<span class="flag-disputed">⚐ Disputed</span>`);
  if (state.studyMore.has(q.id)) parts.push(`<span class="flag-study">📚 Study more</span>`);
  const k = sourceTypeKey(q);
  const srcLabel = k === "compiled"
    ? `<span>Source: compiled from dive theory (agent-authored)</span>`
    : `<span>Source: ${escapeHtml(q.source)}</span>`;
  parts.push(srcLabel);
  flags.innerHTML = parts.join(" · ");
}

function disableOptions() { $$(".option").forEach((b) => (b.disabled = true)); }

function markOptions(chosen) {
  const correct = state.current.correct;
  $$(".option").forEach((b) => {
    const l = b.dataset.letter;
    if (l === correct) b.classList.add("correct");
    else if (l === chosen) b.classList.add("wrong");
    else b.classList.add("dimmed");
  });
}

function showFeedback(kind, html) {
  const fb = $("#q-feedback");
  fb.className = `feedback ${kind}`;
  fb.innerHTML = html;
  fb.classList.remove("hidden");
}

function logAnswer(qid, area, result, chosen) {
  state.log.push({
    ts: new Date().toISOString(),
    qid, area, result,
    chosen: chosen ?? null,
  });
  if (state.log.length > 5000) state.log = state.log.slice(-5000);
  saveLog();
}

// ───────── Answer handlers ─────────

function onAnswer(letter) {
  if (state.answered) return;
  state.answered = true;
  const q = state.current;
  const isCorrect = letter === q.correct;
  disableOptions();
  markOptions(letter);

  const correctText = q.options[q.correct];
  const correctLabel = `${q.correct.toUpperCase()}. ${correctText}`;
  const explanation = q.explanation || "(No explanation provided.)";
  showFeedback(
    isCorrect ? "correct" : "wrong",
    `<strong>${isCorrect ? "Correct ✓" : `Wrong — correct answer is ${correctLabel}`}</strong>${explanation}`
  );

  logAnswer(q.id, q.area, isCorrect ? "correct" : "wrong", letter);
  $("#btn-next").classList.remove("hidden");
  refreshStats();
}

function onDontKnow() {
  if (state.answered) return;
  state.answered = true;
  const q = state.current;
  disableOptions();
  $$(".option").forEach((b) => {
    if (b.dataset.letter === q.correct) b.classList.add("correct");
    else b.classList.add("dimmed");
  });
  const correctText = q.options[q.correct];
  showFeedback(
    "unknown",
    `<strong>Correct answer: ${q.correct.toUpperCase()}. ${correctText}</strong>${q.explanation || "(No explanation provided.)"}`
  );
  logAnswer(q.id, q.area, "unknown", null);
  $("#btn-next").classList.remove("hidden");
  refreshStats();
}

function onKnow100() {
  const q = state.current;
  if (!q) return;
  state.mastered50.delete(q.id); // promote out of 50% if there
  state.mastered100.add(q.id);
  saveMastered50();
  saveMastered100();
  logAnswer(q.id, q.area, "mastered_100", null);
  refreshStats();
  next();
}

function onKnow50() {
  const q = state.current;
  if (!q) return;
  if (state.mastered100.has(q.id)) state.mastered100.delete(q.id);
  state.mastered50.add(q.id);
  saveMastered100();
  saveMastered50();
  logAnswer(q.id, q.area, "mastered_50", null);
  refreshStats();
  next();
}

function onStudyMore() {
  const q = state.current;
  if (!q) return;
  if (state.studyMore.has(q.id)) {
    state.studyMore.delete(q.id);
    logAnswer(q.id, q.area, "study_clear", null);
  } else {
    state.studyMore.add(q.id);
    logAnswer(q.id, q.area, "study_more", null);
  }
  saveStudyMore();
  syncStudyButton(q);
  renderFlagsRow();
  refreshStats();
}

function onDispute() {
  const q = state.current;
  if (!q) return;
  if (state.disputed.has(q.id)) {
    state.disputed.delete(q.id);
    logAnswer(q.id, q.area, "dispute_clear", null);
  } else {
    state.disputed.add(q.id);
    logAnswer(q.id, q.area, "disputed", null);
  }
  saveDisputed();
  refreshStats();
  next(); // always advance after dispute
}

function next() {
  const q = pickRandom();
  if (!q) {
    show("empty-screen");
    return;
  }
  show("quiz-screen");
  renderQuestion(q);
}

// ───────── Setup screen ─────────

function initSetup() {
  $$('input[name="area"]').forEach((cb) => {
    cb.checked = state.selectedAreas.size === 0 ? true : state.selectedAreas.has(cb.value);
  });
  $("#setup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const checked = [...$$('input[name="area"]:checked')].map((cb) => cb.value);
    state.selectedAreas = new Set(checked);
    saveAreas();
    if ($("#setup-include-mastered").checked) {
      state.mastered100 = new Set();
      state.mastered50 = new Set();
      saveMastered100();
      saveMastered50();
    }
    refreshStats();
    next();
  });
}

// ───────── Settings screen ─────────

function renderSettings() {
  const wrap = $("#settings-areas");
  wrap.innerHTML = "";
  Object.entries(AREA_LABELS).forEach(([key, label]) => {
    const row = document.createElement("label");
    row.className = "check";
    row.innerHTML = `<input type="checkbox" value="${key}" ${state.selectedAreas.has(key) ? "checked" : ""} /> ${label}`;
    row.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) state.selectedAreas.add(key);
      else state.selectedAreas.delete(key);
      saveAreas();
      refreshStats();
    });
    wrap.appendChild(row);
  });

  // Subareas, grouped by area
  const subWrap = $("#settings-subareas");
  subWrap.innerHTML = "";
  for (const [areaKey, areaLabel] of Object.entries(AREA_LABELS)) {
    const groups = subareaIndex[areaKey] || [];
    if (!groups.length) continue;
    const grp = document.createElement("div");
    grp.className = "subarea-group";
    grp.innerHTML = `<div class="area-label">${areaLabel}</div>`;
    for (const { group, count } of groups) {
      const k = subareaKey(areaKey, group);
      const row = document.createElement("label");
      row.className = "check";
      row.innerHTML = `<input type="checkbox" data-key="${k}" ${state.selectedSubareas.has(k) ? "checked" : ""} /> ${escapeHtml(group)} <span class="muted" style="margin-left:.4rem">${count}</span>`;
      row.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) state.selectedSubareas.add(k);
        else state.selectedSubareas.delete(k);
        saveSubareas();
        refreshStats();
      });
      grp.appendChild(row);
    }
    subWrap.appendChild(grp);
  }

  // Source filter chips
  $$("#settings-source .source-filter").forEach((b) => {
    b.classList.toggle("active", b.dataset.src === state.sourceFilter);
    if (b.dataset.src === "web") b.classList.add("source-web");
    if (b.dataset.src === "compiled") b.classList.add("source-compiled");
  });
  // Show/hide Personal source filter button based on lock state
  const personalBtn = $("#settings-src-personal");
  if (personalBtn) personalBtn.style.display = isPersonalUnlocked() ? "" : "none";
  // Render lock status + button
  const statusEl = $("#personal-status");
  const toggleBtn = $("#btn-personal-toggle");
  if (statusEl && toggleBtn) {
    if (isPersonalUnlocked()) {
      statusEl.textContent = "🔓 Unlocked. Personal questions are visible in the pool.";
      toggleBtn.textContent = "Lock again";
    } else {
      statusEl.textContent = "🔒 Locked. Personal questions are hidden from the pool.";
      toggleBtn.textContent = "Unlock…";
    }
  }

  // Reset pool count: how many in-pool questions currently have a reset mark
  let resetInPool = 0;
  for (const q of state.questions) {
    if (passesAllDrillFilters(q) && state.resetMarks[q.id]) resetInPool++;
  }
  const resetCountEl = $("#reset-count");
  if (resetCountEl) resetCountEl.textContent = resetInPool;

  $("#settings-mastered100-count").textContent = state.mastered100.size;
  $("#settings-mastered50-count").textContent = state.mastered50.size;
  $("#settings-disputed-count").textContent = state.disputed.size;
  $("#settings-study-count").textContent = state.studyMore.size;
  $("#settings-log-count").textContent = state.log.length;
  $("#settings-skip-disputed").checked = state.skipDisputed;
}

function initSettings() {
  $("#btn-settings").addEventListener("click", () => { renderSettings(); show("settings-screen"); });
  $("#btn-back-from-settings").addEventListener("click", () => next());
  $("#btn-reset-100").addEventListener("click", () => {
    if (!confirm(`Reset ${state.mastered100.size} questions from the 100% pool?`)) return;
    state.mastered100 = new Set(); saveMastered100(); renderSettings(); refreshStats();
  });
  $("#btn-reset-50").addEventListener("click", () => {
    if (!confirm(`Reset ${state.mastered50.size} questions from the 50% pool?`)) return;
    state.mastered50 = new Set(); saveMastered50(); renderSettings(); refreshStats();
  });
  $("#btn-reset-all-confidence").addEventListener("click", () => {
    const total = state.mastered100.size + state.mastered50.size;
    if (!confirm(`Reset both pools — ${total} questions back into rotation?`)) return;
    state.mastered100 = new Set(); state.mastered50 = new Set();
    saveMastered100(); saveMastered50(); renderSettings(); refreshStats();
  });
  $("#btn-clear-disputed").addEventListener("click", () => {
    if (!confirm(`Clear dispute flags from ${state.disputed.size} questions?`)) return;
    state.disputed = new Set(); saveDisputed(); renderSettings(); refreshStats();
  });
  $("#btn-clear-study").addEventListener("click", () => {
    if (!confirm(`Clear study-more flags from ${state.studyMore.size} questions?`)) return;
    state.studyMore = new Set(); saveStudyMore(); renderSettings(); refreshStats();
  });
  $("#settings-skip-disputed").addEventListener("change", (e) => {
    state.skipDisputed = e.target.checked; saveSkipDisputed(); refreshStats();
  });
  $$("#settings-source .source-filter").forEach((b) => {
    b.addEventListener("click", () => {
      state.sourceFilter = b.dataset.src;
      saveSourceFilter();
      $$("#settings-source .source-filter").forEach((x) => x.classList.toggle("active", x.dataset.src === state.sourceFilter));
      refreshStats();
    });
  });
  $("#btn-reset-pool").addEventListener("click", () => {
    const inPoolIds = state.questions.filter(passesAllDrillFilters).map((q) => q.id);
    const ATTEMPT = new Set(["correct", "wrong", "unknown"]);
    const seenIds = new Set(state.log.filter((e) => ATTEMPT.has(e.result) && inPoolIds.includes(e.qid)).map((e) => e.qid));
    if (!seenIds.size) {
      alert("No answered questions in current pool to reset.");
      return;
    }
    if (!confirm(`Reset stats for ${seenIds.size} answered questions in current pool? Existing answers will move to TOTAL only — Pool/Dashboard/picking will treat them as unseen.`)) return;
    const now = new Date().toISOString();
    seenIds.forEach((qid) => { state.resetMarks[qid] = now; });
    saveResetMarks();
    renderSettings();
    refreshStats();
    alert(`Marked ${seenIds.size} questions as reset.`);
  });
  $("#btn-clear-resets").addEventListener("click", () => {
    const n = Object.keys(state.resetMarks).length;
    if (!n) { alert("No reset marks to clear."); return; }
    if (!confirm(`Clear ${n} reset marks? Old answers will be re-counted toward Pool stats.`)) return;
    state.resetMarks = {};
    saveResetMarks();
    renderSettings();
    refreshStats();
  });
  $("#btn-personal-toggle").addEventListener("click", () => {
    if (isPersonalUnlocked()) {
      // Lock again
      localStorage.removeItem("ssi.personalUnlocked"); scheduleStateSync();
      // Clear personal sourcefilter if it was set to it
      if (state.sourceFilter === "personal") {
        state.sourceFilter = "all";
        saveSourceFilter();
      }
      browseFilters.sources.delete("personal");
      [...browseFilters.mssiSections].forEach((label) => {
        const sect = mssiSectionIndex.find((s) => s.label === label);
        if (sect && sect.personal) browseFilters.mssiSections.delete(label);
      });
      renderSettings();
      refreshStats();
    } else {
      const ans = prompt(`Hint: "${PERSONAL_HINT}"\n\nEnter password to unlock Personal questions:`);
      if (ans === null) return; // cancelled
      if (ans === PERSONAL_PASSWORD) {
        localStorage.setItem("ssi.personalUnlocked", "1"); scheduleStateSync();
        renderSettings();
        refreshStats();
        alert("🔓 Unlocked.");
      } else {
        alert("Wrong password.");
      }
    }
  });
  $("#btn-clear-log").addEventListener("click", () => {
    if (!confirm(`Clear all ${state.log.length} log entries? This can't be undone.`)) return;
    state.log = []; saveLog(); renderSettings(); refreshStats();
  });
  $("#btn-export-log").addEventListener("click", () => {
    const blob = new Blob(
      [JSON.stringify({ exported_at: new Date().toISOString(), log: state.log }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ssi-log-${new Date().toISOString().slice(0,19).replace(/[:T]/g, "-")}.json`;
    document.body.appendChild(a);
    a.click(); a.remove();
    URL.revokeObjectURL(url);
  });
}

// ───────── Log screen ─────────

function resultLabel(result) {
  switch (result) {
    case "correct": return "correct";
    case "wrong": return "wrong";
    case "unknown": return "unknown";
    case "mastered_100": return "→ 100%";
    case "mastered_50": return "→ 50%";
    case "disputed": return "⚐ disputed";
    case "dispute_clear": return "⚐ cleared";
    default: return result;
  }
}

function renderLog() {
  const tbody = $("#log-tbody");
  tbody.innerHTML = "";
  const recent = [...state.log].reverse().slice(0, 500);
  for (const e of recent) {
    const q = state.questions.find((x) => x.id === e.qid);
    const tr = document.createElement("tr");
    const time = new Date(e.ts).toLocaleString();
    const area = AREA_LABELS[e.area] || e.area;
    const subarea = q?.subarea || "—";
    const qText = q ? q.question : `(question removed — ${e.qid})`;
    const stype = q ? sourceTypeKey(q) : null;
    const sourceBadge = q ? (
      stype === "personal" ? `<span class="badge badge-personal">🔒 personal</span>` :
      stype === "mssi" ? `<span class="badge badge-mssi">★ mySSI</span>` :
      stype === "web" ? `<span class="badge badge-web">● web</span>` :
      `<span class="badge badge-compiled">○ compiled</span>`
    ) : "";
    const resultClass = `result-${e.result.replace(/_/g, "-")}`;
    const resultText = resultLabel(e.result) + (e.chosen ? ` (${e.chosen.toUpperCase()})` : "");
    tr.dataset.qid = e.qid;
    tr.classList.add("log-row");
    tr.innerHTML = `
      <td class="log-time">${time}</td>
      <td class="log-qid"><code>${e.qid}</code></td>
      <td class="log-area">${area}<br><span class="muted" style="font-size:.78rem">${escapeHtml(subarea)}</span></td>
      <td class="log-source">${sourceBadge}</td>
      <td class="log-text">${escapeHtml(qText)}</td>
      <td class="${resultClass}">${resultText}</td>`;
    if (q) {
      tr.title = "Click to open in Browse";
      tr.addEventListener("click", () => {
        browseFilters.expandedId = q.id;
        renderBrowse();
        show("browse-screen");
        // scroll to expanded item
        setTimeout(() => {
          const el = document.querySelector(".browse-item.expanded");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      });
    }
    tbody.appendChild(tr);
  }
  const counts = state.log.reduce((acc, e) => { acc[e.result] = (acc[e.result] || 0) + 1; return acc; }, {});
  $("#log-total").textContent = state.log.length;
  $("#log-correct").textContent = counts.correct || 0;
  $("#log-wrong").textContent = counts.wrong || 0;
  $("#log-unknown").textContent = counts.unknown || 0;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function initLog() {
  $("#btn-log").addEventListener("click", () => { renderLog(); show("log-screen"); });
  $("#btn-back-from-log").addEventListener("click", () => next());
}

// ───────── Dashboard ─────────

function computeAreaStats(viewState) {
  // viewState defaults to current user's state; can be passed for "view as other user"
  const v = viewState || {
    log: state.log,
    mastered100: state.mastered100,
    mastered50: state.mastered50,
    disputed: state.disputed,
    studyMore: state.studyMore,
    resetMarks: state.resetMarks,
  };
  // Result types that count as actual answer attempts (not bookkeeping)
  const ATTEMPT_RESULTS = new Set(["correct", "wrong", "unknown"]);
  const stats = {};
  for (const key of Object.keys(AREA_LABELS)) {
    stats[key] = { total: 0, mssi: 0, web: 0, seen: new Set(), attempts: 0, correct: 0, m100: 0, m50: 0, study: 0, disputed: 0 };
  }
  for (const q of state.questions) {
    if (!stats[q.area]) continue;
    stats[q.area].total++;
    const stype = sourceTypeKey(q);
    if (stype === "mssi") stats[q.area].mssi++;
    else if (stype === "web") stats[q.area].web++;
    if (v.mastered100.has(q.id)) stats[q.area].m100++;
    if (v.mastered50.has(q.id)) stats[q.area].m50++;
    if (v.studyMore.has(q.id)) stats[q.area].study++;
    if (v.disputed.has(q.id)) stats[q.area].disputed++;
  }
  // isActiveEntry uses state.resetMarks; for foreign user, build local check
  const isActive = viewState
    ? (e) => { const c = v.resetMarks[e.qid]; return !c || e.ts > c; }
    : isActiveEntry;
  for (const e of v.log) {
    if (!stats[e.area]) continue;
    if (!ATTEMPT_RESULTS.has(e.result)) continue;
    if (!isActive(e)) continue;
    stats[e.area].attempts++;
    if (e.result === "correct") stats[e.area].correct++;
    stats[e.area].seen.add(e.qid);
  }
  return stats;
}

function renderDashboard(viewState) {
  const stats = computeAreaStats(viewState);
  const v = viewState || {
    mastered100: state.mastered100, mastered50: state.mastered50, disputed: state.disputed,
  };
  const tbody = $("#dash-tbody");
  tbody.innerHTML = "";
  let totals = { total: 0, mssi: 0, web: 0, seen: new Set(), attempts: 0, correct: 0, m100: 0, m50: 0, study: 0, disputed: 0 };
  for (const [key, label] of Object.entries(AREA_LABELS)) {
    const s = stats[key];
    const acc = s.attempts ? Math.round((s.correct / s.attempts) * 100) : null;
    const accClass = acc === null ? "" : acc >= 80 ? "good" : acc < 60 ? "bad" : "";
    const accText = acc === null ? "—" : `${acc}%`;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="area-name">${label}</td>
      <td class="num">${s.total}</td>
      <td class="num good">${s.mssi}</td>
      <td class="num">${s.web}</td>
      <td class="num muted">${s.total - s.mssi - s.web}</td>
      <td class="num">${s.seen.size} <span class="muted">/ ${s.total}</span></td>
      <td class="num">${s.attempts}</td>
      <td class="num ${accClass}">${accText}</td>
      <td class="num">${s.m100}</td>
      <td class="num">${s.m50}</td>
      <td class="num">${s.study}</td>
      <td class="num">${s.disputed}</td>
    `;
    tbody.appendChild(tr);
    totals.total += s.total;
    totals.mssi += s.mssi;
    totals.web += s.web;
    totals.study += s.study;
    totals.attempts += s.attempts;
    totals.correct += s.correct;
    totals.m100 += s.m100;
    totals.m50 += s.m50;
    totals.disputed += s.disputed;
    s.seen.forEach((id) => totals.seen.add(id));
  }
  const tAcc = totals.attempts ? Math.round((totals.correct / totals.attempts) * 100) : null;
  const tAccClass = tAcc === null ? "" : tAcc >= 80 ? "good" : tAcc < 60 ? "bad" : "";
  const tAccText = tAcc === null ? "—" : `${tAcc}%`;
  const tfoot = $("#dash-tfoot");
  tfoot.innerHTML = `
    <tr>
      <td>Total</td>
      <td class="num">${totals.total}</td>
      <td class="num good">${totals.mssi}</td>
      <td class="num">${totals.web}</td>
      <td class="num muted">${totals.total - totals.mssi - totals.web}</td>
      <td class="num">${totals.seen.size} <span class="muted">/ ${totals.total}</span></td>
      <td class="num">${totals.attempts}</td>
      <td class="num ${tAccClass}">${tAccText}</td>
      <td class="num">${totals.m100}</td>
      <td class="num">${totals.m50}</td>
      <td class="num">${totals.study}</td>
      <td class="num">${totals.disputed}</td>
    </tr>`;

  // Disputed list (for the viewed user)
  const dlist = $("#dash-disputed-list");
  if (v.disputed.size === 0) {
    dlist.innerHTML = `<p class="muted">None.</p>`;
  } else {
    const rows = [...v.disputed].map((id) => {
      const q = state.questions.find((x) => x.id === id);
      if (!q) return `<li>${id} <span class="muted">(not found in current question set)</span></li>`;
      return `<li><strong>${q.id}</strong> — <span class="muted">${AREA_LABELS[q.area] || q.area}</span><br>${escapeHtml(q.question)}</li>`;
    });
    dlist.innerHTML = `<ul>${rows.join("")}</ul>`;
  }
}

// Build a "viewState" object from a foreign user's raw state JSON (server payload)
function viewStateFromPayload(payload) {
  if (!payload || typeof payload !== "object") return null;
  const get = (k) => { try { const v = payload[k]; if (v == null) return null; return JSON.parse(v); } catch { return null; } };
  return {
    log: get("ssi.log") || [],
    mastered100: new Set(get("ssi.mastered100") || []),
    mastered50: new Set(get("ssi.mastered50") || []),
    disputed: new Set(get("ssi.disputed") || []),
    studyMore: new Set(get("ssi.studyMore") || []),
    resetMarks: get("ssi.resetMarks") || {},
  };
}

async function refreshDashUserList() {
  const sel = $("#dash-user-select");
  if (!sel) return;
  const users = await apiListUsers();
  const me = getCurrentUser() || "";
  sel.innerHTML = "";
  // Always include "me" at top
  if (me) {
    const opt = document.createElement("option");
    opt.value = me; opt.textContent = `${me} (me)`;
    sel.appendChild(opt);
  }
  for (const u of users) {
    if (u === me) continue;
    const opt = document.createElement("option");
    opt.value = u; opt.textContent = u;
    sel.appendChild(opt);
  }
}

async function loadDashboardForSelectedUser() {
  const sel = $("#dash-user-select");
  const user = sel ? sel.value : null;
  const me = getCurrentUser();
  const viewing = $("#dash-viewing-as");
  if (!user || user === me) {
    if (viewing) viewing.textContent = "(your data)";
    renderDashboard();
    return;
  }
  if (viewing) viewing.textContent = "(loading…)";
  const payload = await apiGetStateForUser(user);
  const vs = viewStateFromPayload(payload);
  if (!vs) {
    if (viewing) viewing.textContent = "(failed to load)";
    return;
  }
  if (viewing) viewing.textContent = `(viewing ${user})`;
  renderDashboard(vs);
}

function initDashboard() {
  $("#btn-dashboard").addEventListener("click", async () => {
    await refreshDashUserList();
    await loadDashboardForSelectedUser();
    show("dashboard-screen");
  });
  $("#btn-back-from-dashboard").addEventListener("click", () => next());
  $("#dash-user-select").addEventListener("change", () => loadDashboardForSelectedUser());
  $("#btn-dash-refresh").addEventListener("click", async () => {
    await refreshDashUserList();
    await loadDashboardForSelectedUser();
  });
}

// ───────── Browse screen ─────────

const browseFilters = {
  areas: new Set(),     // empty = all
  subareas: new Set(),  // empty = all (entries: "area:group")
  sources: new Set(),   // empty = all (entries: "mssi" | "web" | "compiled")
  mssiSections: new Set(), // empty = all (entries: section labels e.g. "Pretest Part 1")
  statuses: new Set(),  // empty = all
  search: "",
  sort: "id",
  expandedId: null,
};

const STATUS_CHIPS = [
  { key: "unanswered", label: "Unanswered", cls: "" },
  { key: "answered",   label: "Answered",   cls: "" },
  { key: "correct",    label: "Last correct", cls: "status-correct" },
  { key: "wrong",      label: "Last wrong",   cls: "status-wrong" },
  { key: "100",        label: "100%",       cls: "status-100" },
  { key: "50",         label: "~50%",       cls: "status-50" },
  { key: "disputed",   label: "Disputed",   cls: "status-disputed" },
  { key: "study",      label: "📚 Study more", cls: "status-study" },
];

function buildQuestionStats() {
  // Per-question stats from log (post-reset only — matches drill weighting + dashboard)
  const stats = new Map();
  for (const e of state.log) {
    if (!["correct", "wrong", "unknown"].includes(e.result)) continue;
    if (!isActiveEntry(e)) continue;
    let s = stats.get(e.qid);
    if (!s) { s = { attempts: 0, correct: 0, lastTs: null, lastResult: null }; stats.set(e.qid, s); }
    s.attempts++;
    if (e.result === "correct") s.correct++;
    if (!s.lastTs || e.ts > s.lastTs) { s.lastTs = e.ts; s.lastResult = e.result; }
  }
  return stats;
}

function questionMatchesFilters(q, qstat) {
  const f = browseFilters;
  // Hard gate: when locked, personal questions hidden from Browse too
  if (sourceTypeKey(q) === "personal" && !isPersonalUnlocked()) return false;
  if (f.areas.size && !f.areas.has(q.area)) return false;
  if (f.subareas.size && !f.subareas.has(subareaKey(q.area, subareaGroup(q)))) return false;
  if (f.sources.size && !f.sources.has(sourceTypeKey(q))) return false;
  if (f.mssiSections.size) {
    const label = mssiSectionLabel(q);
    if (!label || !f.mssiSections.has(label)) return false;
  }
  if (f.search) {
    const needle = f.search.toLowerCase();
    if (!q.question.toLowerCase().includes(needle) && !q.id.toLowerCase().includes(needle)) return false;
  }
  if (f.statuses.size === 0) return true;
  // Statuses are OR-combined
  for (const s of f.statuses) {
    if (s === "unanswered" && !qstat) return true;
    if (s === "answered" && qstat) return true;
    if (s === "correct" && qstat?.lastResult === "correct") return true;
    if (s === "wrong" && (qstat?.lastResult === "wrong" || qstat?.lastResult === "unknown")) return true;
    if (s === "100" && state.mastered100.has(q.id)) return true;
    if (s === "50" && state.mastered50.has(q.id)) return true;
    if (s === "disputed" && state.disputed.has(q.id)) return true;
    if (s === "study" && state.studyMore.has(q.id)) return true;
  }
  return false;
}

function renderBrowse() {
  // Render area chips
  const areaWrap = $("#browse-areas");
  areaWrap.innerHTML = "";
  const allAreaChip = chipEl("all-areas", "All", browseFilters.areas.size === 0, () => {
    browseFilters.areas.clear(); renderBrowse();
  });
  areaWrap.appendChild(allAreaChip);
  for (const [key, label] of Object.entries(AREA_LABELS)) {
    areaWrap.appendChild(chipEl(`area-${key}`, label, browseFilters.areas.has(key), () => {
      if (browseFilters.areas.has(key)) browseFilters.areas.delete(key);
      else browseFilters.areas.add(key);
      renderBrowse();
    }));
  }
  // Subarea chips (limited to currently selected areas if any; else all)
  const subWrap = $("#browse-subareas");
  subWrap.innerHTML = "";
  subWrap.appendChild(chipEl("all-subareas", "All", browseFilters.subareas.size === 0, () => {
    browseFilters.subareas.clear(); renderBrowse();
  }));
  const showAreas = browseFilters.areas.size ? [...browseFilters.areas] : Object.keys(AREA_LABELS);
  for (const areaKey of showAreas) {
    const groups = subareaIndex[areaKey] || [];
    for (const { group, count } of groups) {
      const k = subareaKey(areaKey, group);
      const chip = chipEl(`sub-${k}`, `${group} (${count})`, browseFilters.subareas.has(k), () => {
        if (browseFilters.subareas.has(k)) browseFilters.subareas.delete(k);
        else browseFilters.subareas.add(k);
        renderBrowse();
      });
      subWrap.appendChild(chip);
    }
  }

  // Source chips
  const srcWrap = $("#browse-sources");
  srcWrap.innerHTML = "";
  srcWrap.appendChild(chipEl("all-src", "All", browseFilters.sources.size === 0, () => {
    browseFilters.sources.clear(); renderBrowse();
  }));
  for (const k of sourceKeysVisible()) {
    const chip = chipEl(`src-${k}`, SOURCE_LABELS[k], browseFilters.sources.has(k), () => {
      if (browseFilters.sources.has(k)) browseFilters.sources.delete(k);
      else browseFilters.sources.add(k);
      renderBrowse();
    });
    chip.classList.add("src-" + k);
    srcWrap.appendChild(chip);
  }

  // mySSI/Personal Section chips — shown if "all sources" or "mssi"/"personal" is included
  const mssiGrp = $("#browse-mssi-section-group");
  const showMssiSection = browseFilters.sources.size === 0 || browseFilters.sources.has("mssi") || browseFilters.sources.has("personal");
  if (showMssiSection && mssiSectionIndex.length) {
    mssiGrp.style.display = "";
    const mssiWrap = $("#browse-mssi-sections");
    mssiWrap.innerHTML = "";
    mssiWrap.appendChild(chipEl("all-mssi-section", "All", browseFilters.mssiSections.size === 0, () => {
      browseFilters.mssiSections.clear(); renderBrowse();
    }));
    for (const { label, count, personal } of visibleMssiSections()) {
      const chip = chipEl(`mssisec-${label}`, `${label} (${count})`, browseFilters.mssiSections.has(label), () => {
        if (browseFilters.mssiSections.has(label)) browseFilters.mssiSections.delete(label);
        else browseFilters.mssiSections.add(label);
        renderBrowse();
      });
      chip.classList.add(personal ? "src-personal" : "src-mssi");
      mssiWrap.appendChild(chip);
    }
  } else {
    mssiGrp.style.display = "none";
  }

  // Status chips
  const stWrap = $("#browse-statuses");
  stWrap.innerHTML = "";
  stWrap.appendChild(chipEl("all-status", "All", browseFilters.statuses.size === 0, () => {
    browseFilters.statuses.clear(); renderBrowse();
  }));
  for (const c of STATUS_CHIPS) {
    const chip = chipEl(`st-${c.key}`, c.label, browseFilters.statuses.has(c.key), () => {
      if (browseFilters.statuses.has(c.key)) browseFilters.statuses.delete(c.key);
      else browseFilters.statuses.add(c.key);
      renderBrowse();
    });
    if (c.cls) chip.classList.add(c.cls);
    stWrap.appendChild(chip);
  }

  // Build filtered + sorted list
  const qstats = buildQuestionStats();
  let items = state.questions
    .map((q) => ({ q, s: qstats.get(q.id) }))
    .filter(({ q, s }) => questionMatchesFilters(q, s));

  const sortKey = browseFilters.sort;
  items.sort((A, B) => {
    if (sortKey === "id") return A.q.id.localeCompare(B.q.id);
    if (sortKey === "seen") return (B.s?.lastTs || "").localeCompare(A.s?.lastTs || "");
    if (sortKey === "accuracy") {
      const accA = A.s?.attempts ? A.s.correct / A.s.attempts : 1.1; // unanswered → bottom
      const accB = B.s?.attempts ? B.s.correct / B.s.attempts : 1.1;
      return accA - accB;
    }
    if (sortKey === "attempts") return (B.s?.attempts || 0) - (A.s?.attempts || 0);
    return 0;
  });

  $("#browse-count").textContent = `${items.length} of ${state.questions.length}`;

  const list = $("#browse-list");
  list.innerHTML = "";
  for (const { q, s } of items) {
    list.appendChild(browseItemEl(q, s));
  }
}

function chipEl(id, label, active, onClick) {
  const b = document.createElement("button");
  b.className = "chip" + (active ? " active" : "");
  b.dataset.id = id;
  b.textContent = label;
  b.addEventListener("click", onClick);
  return b;
}

function browseItemEl(q, s) {
  const wrap = document.createElement("div");
  wrap.className = "browse-item" + (browseFilters.expandedId === q.id ? " expanded" : "");

  const badges = [];
  const stype = sourceTypeKey(q);
  if (stype === "personal") badges.push(`<span class="badge badge-personal" title="${escapeHtml(q.source)}">🔒 personal</span>`);
  else if (stype === "mssi") badges.push(`<span class="badge badge-mssi" title="${escapeHtml(q.source)}">★ mySSI</span>`);
  else if (stype === "web") badges.push(`<span class="badge badge-web" title="${escapeHtml(q.source)}">● web</span>`);
  else badges.push(`<span class="badge badge-compiled" title="Authored by agent from public SSI standards / dive theory">○ compiled</span>`);
  if (state.mastered100.has(q.id)) badges.push(`<span class="badge badge-100">100%</span>`);
  if (state.mastered50.has(q.id)) badges.push(`<span class="badge badge-50">~50%</span>`);
  if (state.disputed.has(q.id)) badges.push(`<span class="badge badge-disputed">⚐ disputed</span>`);
  if (state.studyMore.has(q.id)) badges.push(`<span class="badge badge-study">📚 study</span>`);
  if (s) {
    if (s.lastResult === "correct") badges.push(`<span class="badge badge-correct">last: correct</span>`);
    else if (s.lastResult === "wrong") badges.push(`<span class="badge badge-wrong">last: wrong</span>`);
    else if (s.lastResult === "unknown") badges.push(`<span class="badge badge-wrong">last: unknown</span>`);
  } else {
    badges.push(`<span class="badge badge-unanswered">unanswered</span>`);
  }
  const acc = s?.attempts ? `${Math.round((s.correct / s.attempts) * 100)}% (${s.correct}/${s.attempts})` : "—";

  wrap.innerHTML = `
    <div class="head">
      <span class="qid">${q.id}</span>
      <span class="area">${AREA_LABELS[q.area] || q.area}</span>
      <span class="muted" style="font-size:.78rem">· ${escapeHtml(q.subarea || "")}</span>
    </div>
    <div class="qtext">${escapeHtml(q.question)}</div>
    <div class="meta">
      ${badges.join(" ")}
      <span>· accuracy: ${acc}</span>
      ${s?.lastTs ? `<span>· last seen: ${new Date(s.lastTs).toLocaleString()}</span>` : ""}
    </div>
  `;

  if (browseFilters.expandedId === q.id) {
    const detail = document.createElement("div");
    detail.className = "browse-detail";
    const opts = ["a","b","c","d"]
      .filter(l => q.options[l])
      .map(l => `<div class="opt ${l === q.correct ? "correct" : ""}"><span class="letter-inline">${l.toUpperCase()}.</span>${escapeHtml(q.options[l])}</div>`)
      .join("");
    detail.innerHTML = `
      ${opts}
      <div class="explanation"><strong>Explanation:</strong> ${escapeHtml(q.explanation || "(none)")}</div>
      <div class="muted" style="font-size:.82rem;margin-top:.5rem"><strong>Source:</strong> ${escapeHtml(q.source || "(none)")}</div>
      <div class="actions-row">
        <button data-act="toggle-100">${state.mastered100.has(q.id) ? "Unmark 100%" : "Mark 100%"}</button>
        <button data-act="toggle-50">${state.mastered50.has(q.id) ? "Unmark ~50%" : "Mark ~50%"}</button>
        <button data-act="toggle-dispute">${state.disputed.has(q.id) ? "Clear dispute" : "Mark disputed"}</button>
        <button data-act="toggle-study">${state.studyMore.has(q.id) ? "Clear study-more" : "📚 Study more"}</button>
        <button data-act="drill" class="primary">Drill this question</button>
      </div>
    `;
    detail.querySelectorAll("button[data-act]").forEach(btn => {
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const act = btn.dataset.act;
        if (act === "toggle-100") {
          if (state.mastered100.has(q.id)) state.mastered100.delete(q.id);
          else { state.mastered100.add(q.id); state.mastered50.delete(q.id); }
          saveMastered100(); saveMastered50();
        } else if (act === "toggle-50") {
          if (state.mastered50.has(q.id)) state.mastered50.delete(q.id);
          else { state.mastered50.add(q.id); state.mastered100.delete(q.id); }
          saveMastered100(); saveMastered50();
        } else if (act === "toggle-dispute") {
          if (state.disputed.has(q.id)) state.disputed.delete(q.id);
          else state.disputed.add(q.id);
          saveDisputed();
        } else if (act === "toggle-study") {
          if (state.studyMore.has(q.id)) state.studyMore.delete(q.id);
          else state.studyMore.add(q.id);
          saveStudyMore();
        } else if (act === "drill") {
          show("quiz-screen");
          renderQuestion(q);
          return;
        }
        refreshStats();
        renderBrowse();
      });
    });
    wrap.appendChild(detail);
  }

  wrap.addEventListener("click", () => {
    browseFilters.expandedId = browseFilters.expandedId === q.id ? null : q.id;
    renderBrowse();
  });

  return wrap;
}

function initBrowse() {
  $("#btn-browse").addEventListener("click", () => { renderBrowse(); show("browse-screen"); });
  $("#btn-back-from-browse").addEventListener("click", () => next());
  $("#browse-search").addEventListener("input", (e) => {
    browseFilters.search = e.target.value.trim();
    renderBrowse();
  });
  $("#browse-sort").addEventListener("change", (e) => {
    browseFilters.sort = e.target.value;
    renderBrowse();
  });
}

// ───────── Quiz wiring ─────────

// ───────── Theme toggle ─────────

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  const btn = document.getElementById("btn-theme");
  if (btn) btn.textContent = theme === "light" ? "☀️" : "🌙";
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  applyTheme(saved === "light" ? "light" : "dark");
  $("#btn-theme").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEYS.theme, next);
    scheduleStateSync();
  });
}

function initQuiz() {
  $("#btn-next").addEventListener("click", () => next());
  $("#btn-know-100").addEventListener("click", () => onKnow100());
  $("#btn-know-50").addEventListener("click", () => onKnow50());
  $("#btn-dont-know").addEventListener("click", () => onDontKnow());
  $("#btn-dispute").addEventListener("click", () => onDispute());
  $("#btn-study-more").addEventListener("click", () => onStudyMore());
  $("#btn-empty-back").addEventListener("click", () => show("setup-screen"));

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    const quizVisible = !$("#quiz-screen").classList.contains("hidden");
    if (!quizVisible) return;
    const k = e.key.toLowerCase();
    if (!state.answered && ["a", "b", "c", "d"].includes(k)) onAnswer(k);
    else if (e.key === "Enter" && state.answered) next();
    else if (e.key === "?" || e.key === "/") { if (!state.answered) onDontKnow(); }
    else if (k === "m" && !state.answered) onKnow100();
    else if (k === "n" && !state.answered) onKnow50(); // "near"
    else if (k === "d") onDispute();
    else if (k === "s") onStudyMore();
  });
}

// ───────── Login screen ─────────

function showLoginError(msg) {
  const el = $("#login-error");
  if (el) el.textContent = msg || "";
}

function initLogin() {
  const form = $("#login-form");
  if (!form) return;
  $("#btn-register").addEventListener("click", async () => {
    const username = $("#login-username").value.trim().toLowerCase();
    const password = $("#login-password").value;
    showLoginError("");
    try {
      await apiAuth("register", username, password);
      await onLoginSuccess(username);
    } catch (e) { showLoginError(e.message); }
  });
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const username = $("#login-username").value.trim().toLowerCase();
    const password = $("#login-password").value;
    showLoginError("");
    try {
      await apiAuth("login", username, password);
      await onLoginSuccess(username);
    } catch (e) { showLoginError(e.message); }
  });
}

async function onLoginSuccess(username) {
  setCurrentUser(username);
  // Pull this user's state from cloud, refresh, transition to setup
  await loadStateForCurrentUser();
  loadState();
  buildSubareaIndex();
  buildMssiSectionIndex();
  refreshUserPill();
  refreshStats();
  if (state.selectedAreas.size > 0) next();
  else show("setup-screen");
}

function refreshUserPill() {
  const pill = $("#user-pill");
  const nameEl = $("#user-name");
  const user = getCurrentUser();
  if (pill && nameEl) {
    if (user) {
      pill.classList.remove("hidden");
      nameEl.textContent = user;
    } else {
      pill.classList.add("hidden");
    }
  }
}

function initLogout() {
  const btn = $("#btn-logout");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    if (!confirm("Log out? Your progress is saved on the server — you can log back in anytime.")) return;
    // Push final state, then clear local
    await pushStateToServer();
    setCurrentUser(null);
    // Clear synced localStorage keys
    for (const k of SYNC_KEYS) { try { localStorage.removeItem(k); } catch {} }
    // Reset in-memory state
    state.log = [];
    state.mastered100 = new Set();
    state.mastered50 = new Set();
    state.disputed = new Set();
    state.studyMore = new Set();
    state.resetMarks = {};
    state.selectedAreas = new Set();
    state.selectedSubareas = new Set();
    state.sourceFilter = "all";
    refreshUserPill();
    show("login-screen");
  });
}

// ───────── Boot ─────────

async function boot() {
  const cloud = await hasCloudApi();
  if (cloud) {
    // Cloud mode: must be logged in
    const user = getCurrentUser();
    if (!user) {
      // Show login first; load questions in parallel
      try { const path = await loadQuestions(); buildSubareaIndex(); buildMssiSectionIndex(); console.log("Loaded", path); }
      catch (e) { console.error("Question load failed", e); }
      initSetup(); initSettings(); initLog(); initDashboard(); initBrowse(); initQuiz(); initTheme(); initLogin(); initLogout();
      refreshUserPill();
      show("login-screen");
      return;
    }
    // Logged in — load that user's state
    await loadStateForCurrentUser();
  } else {
    // Local mode (no cloud API): legacy single-user serve.py /state
    await loadStateForCurrentUser();
  }
  loadState();
  try {
    const path = await loadQuestions();
    buildSubareaIndex();
    buildMssiSectionIndex();
    console.log("Loaded questions from", path, "—", state.questions.length, "questions");
  } catch (e) {
    document.body.innerHTML = `<div style="padding:2rem;font-family:sans-serif">
      <h1>Failed to load questions</h1>
      <p>${e.message}</p>
      <p>Make sure <code>data/questions.json</code> or <code>data/questions.seed.json</code> exists and is valid JSON.</p>
    </div>`;
    return;
  }
  initSetup();
  initSettings();
  initLog();
  initDashboard();
  initBrowse();
  initQuiz();
  initTheme();
  initLogin();
  initLogout();
  refreshUserPill();

  refreshStats();
  if (state.selectedAreas.size > 0) next();
  else show("setup-screen");
}

boot();
