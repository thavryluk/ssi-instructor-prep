# SSI Instructor Prep

Static webapp pro přípravu na SSI dive instructor zkoušky. Plně lokální, single-page, vanilla HTML/CSS/JS + Python build skripty pro question bank.

**Vlastník:** Tomáš Havryluk (SSI instruktor na Maltě, kandidát na Assistant Instructor Trainer / Instructor Trainer / Master Instructor)
**Vytvořeno:** 2026-04-25, kolektivně s Claude

---

## Quick start na novém stroji

```bash
cd "C:/Dropbox/Claude Sync/Personal/SSI Instructor Prep"
python serve.py
# Otevři http://localhost:8765
```

(Dvojklik na `index.html` z file:// taky funguje, ale **bez state syncu** — fallback na localStorage only.)

**State sync přes Dropbox:** `serve.py` exposuje `/state` endpoint a app autoload/autosave to `state/state.json` v adresáři aplikace. Soubor je v Dropboxu → syncuje na všechny stroje. Server-wins při každém boot (overwrites lokální localStorage čerstvými daty z disku).

Co se syncuje: drill log, mastered 100%/50%, disputed, study more, reset marks, vybrané filtry, theme, personal unlock state. Vše ze `SYNC_KEYS` v `app.js`.

---

## Co aplikace umí

### Drill mode
Weighted spaced-repetition-lite picker. Pro každou otázku:
- A/B/C/D possible (true/false má 2)
- **I don't know — explain** → ukáže správnou + vysvětlení
- **I know this 100%** → natrvalo ven z poolu (M)
- **I know this ~50%** → ven z hlavního poolu, občasný review (N, ~10 % draws)
- **📚 Study more** → flag, neposune dál (S)
- **⚐ Dispute** → flag + posune dál (D)
- Klávesy: A/B/C/D pro odpověď, Enter = Next, ? = don't know

### Picking algoritmus (`pickRandom` v app.js)
1. 90 % draws z **active pool**, 10 % z **review50** poolu
2. Per-question weight:
   - **Nikdy neviděná: 6.0**
   - 0 správně (jen wrong/unknown): 1.0
   - 1× správně: 0.30
   - 2× správně: 0.12
   - 3× správně: 0.07
   - 5× správně: 0.03
   - Recently wrong/unknown (posledních 50): ×2 boost
   - Floor: 0.02
3. Anti-repeat: posledních 3 picknutých vyloučeno (pokud pool > 4)
4. **100 % mastered: úplně vyloučeno** (never appears)
5. 50 % mastered: jen v review pool

### Topbar stats
- **POOL**: active · seen/total · ✓correct · ✗wrong · accuracy% (v aktuálním drill scope)
- **TOTAL**: answered · ✓correct · ✗wrong · accuracy% · mastered (across whole bank)
- Accuracy barva: <50 % red, 50-74 % yellow, 75-89 % green, **≥90 % goal-badge** (jasně vidíš překročení cíle)

### Screens
- **Drill** (default) — quiz screen
- **Dashboard** — per-area: Total / mySSI / Web / Compiled / Seen / Attempts / Accuracy / 100% / ~50% / Study / Disputed
- **Browse** — full pool s filtry: area chips, subarea chips, source chips, mySSI/Personal section chips, status chips, search, sort. Klik na otázku = expand s options + explanation + actions (mark/unmark, drill this question)
- **Settings** — areas, subareas, source filter, Personal lock, confidence pools reset, study/dispute clear, log export/clear, **Reset pool stats**
- **Log** — chronological list s ID, area/subarea, source badge, klikatelný řádek → otevře v Browse expanded

### Reset pool stats
- Označí všechny zodpovězené otázky v aktuálním scope timestampem
- Pool/Dashboard/picking ignorují entries před reset (treat as unseen → weight 6.0)
- **TOTAL stats zachovány** (historický záznam)
- Per-question, ne global. Lze "Clear all reset marks" pro návrat staré historie do Pool stats.

### Themes
Dark (default) ↔ Light toggle 🌙/☀️ v topbaru. Persistence v `ssi.theme`. Pre-applied v `<head>` (žádný flash).

---

## Question bank

### Counts (k 2026-04-26)
- Science of Diving: **120**
- Divemaster: **50**
- Assistant Instructor: **50**
- Instructor: **457** (z toho 200 Personal exam questions)
- **Total: 677**

### Source kategorie (4-way)

| Badge | Source | Count | Notes |
|---|---|---|---|
| ★ mySSI | mySSI verbatim (Pretest Parts 1-9 + Lesson 1.1 Reviews) | ~100 | User-confirmed answers |
| 🔒 Personal | 4 SSI Pro exam PDFs (AIT-A, AIT-B, ITC-A, ITC-B; 50 Q each) | 200 | Locked behind password |
| ● Web | Quizlet, dive shop PDFs, ScubaBoard, etc. | ~64 | URL v source field |
| ○ Compiled | Agent-authored z public SSI standards + dive theory | ~313 | source = `compiled_from_dive_theory` |

### Personal lock (soft gate)
- **Password:** `jetmouse`
- **Hint:** `Kuk za buk`
- Hardcoded v `app.js` jako `PERSONAL_PASSWORD` / `PERSONAL_HINT`
- Storage: `ssi.personalUnlocked = "1"` v localStorage
- Když locked: Personal vyloučeno z drill pool, Browse, source filtru, section chipů
- **POZOR:** soft gate, ne pravá ochrana — JSON je dostupný přes Network tab. Účel: zabránit náhodným návštěvníkům & SSI crawlerům.

---

## File map

```
SSI Instructor Prep/
├── index.html          # Single-page app
├── styles.css          # Dark + light theme via CSS vars
├── app.js              # All logic (~1500 řádků)
├── PROJECT.md          # ← TENTO SOUBOR
├── .claude/launch.json # Preview server config (referenced from parent)
├── data/
│   ├── questions.json           # ASSEMBLED bank — needitovat ručně
│   ├── questions.seed.json      # Original 8-q seed (fallback)
│   ├── assemble.py              # Merge všech part files → questions.json
│   ├── build_personal.py        # Generator pro personal_*.json
│   ├── sod_part1-3.json         # Science of Diving (agent-scraped)
│   ├── dm_part1-2.json          # Divemaster
│   ├── ai_part1-2.json          # Assistant Instructor
│   ├── inst_part1-7.json        # Instructor
│   ├── mssi_inst_part1-9.json   # mySSI Pretest (verbatim, user-confirmed)
│   ├── mssi_inst_lessons.json   # mySSI Lesson Reviews
│   └── personal_*.json          # 🔒 Personal exam questions (4 files)
└── logs/                # (placeholder, currently unused)
```

### Pipeline pro úpravu otázek

```bash
# 1. Edit příslušný JSON (např. mssi_inst_part6.json) nebo build_personal.py
# 2. Re-run assemble (a personal pokud editoval Python script):
cd data
python build_personal.py   # jen pokud měnil personal data
python assemble.py
# 3. Reload preview (window.location.reload() nebo F5)
```

`assemble.py` vytváří `questions.json` z glob `*_part*.json + mssi_inst_lessons*.json + personal_*.json`. Validuje schema, ID uniqueness, options keys ({a,b,c,d} nebo {a,b}).

---

## Per-question schema

```json
{
  "id": "unique-id",                    // např. "sod-0001", "mssi-inst-082", "personal-itc-a-029"
  "area": "science_of_diving|divemaster|assistant_instructor|instructor",
  "subarea": "Topic — Subtopic",        // em-dash splits into top-level group
  "question": "Question text?",
  "options": { "a": "...", "b": "...", "c": "...", "d": "..." },  // nebo {a,b} pro true/false
  "correct": "a|b|c|d",
  "explanation": "...",                  // ⚠️ NEEDS VERIFICATION prefix flagne v Browse
  "source": "..."                        // "mySSI: ...", "Personal: ...", URL, "compiled_from_dive_theory", "seed"
}
```

`sourceTypeKey()` derive z source: `Personal:` → personal, `mySSI` → mssi, URL/jiný neprázdný → web, `compiled_from_dive_theory`/`seed` → compiled.

---

## Storage keys (localStorage)

```
ssi.selectedAreas        # Array<string>
ssi.selectedSubareas     # Array<"area:group">
ssi.sourceFilter         # "all" | "mssi" | "personal" | "web" | "compiled"
ssi.mastered100          # Array<qid>
ssi.mastered50           # Array<qid>
ssi.disputed             # Array<qid>
ssi.studyMore            # Array<qid>
ssi.resetMarks           # Object<qid, ISO timestamp>
ssi.skipDisputed         # boolean
ssi.log                  # Array<{ts, qid, area, result, chosen?}> capped at 5000
ssi.personalUnlocked     # "1" | absent
ssi.theme                # "light" | absent (default dark)
```

Migration v `loadState`: `ssi.mastered` (legacy) → `ssi.mastered100`. Log entries `secret-*` qid → `personal-*`.

---

## Známé caveaty

- **Personal master answer key** byl extrahován vizuálně z PDF answer sheet image — většina je správně, ale ~5-10 otázek může mít chybu v key reading. User opravuje za chodu, opravy v `OVERRIDES` dict v `build_personal.py`.
- Některé otázky jsou v exam form A i B s různým pořadím možností; build_personal.py overrides řeší nesoulad.
- Pretest Part 2 Q022 (Group D + 2:45 SI) — **STÁLE FLAGGED ⚠️ NEEDS VERIFICATION**, jediný zbývající nepotvrzený.
- Výše ID `mssi-inst-022` má dlouhou explanation s ⚠️ varováním.

---

## Deployment — Netlify (functions + blobs for multi-user)

**Setup once:**
```bash
cd "C:/Dropbox/Claude Sync/Personal/SSI Instructor Prep"
npm install                      # installs @netlify/blobs
npm install -g netlify-cli       # one-time
netlify login                    # opens browser
netlify init                     # link to a Netlify site
```

**Deploy:**
```bash
python data/assemble.py
mkdir -p dist/data
cp index.html styles.css app.js dist/
cp data/questions.json dist/data/
netlify deploy --prod
```

Netlify Functions (`netlify/functions/`):
- `auth.js` — POST /api/auth?action=register|login (plaintext password, soft auth)
- `state.js` — GET/POST /api/state?user=X (per-user state JSON)
- `users.js` — GET /api/users (list usernames for dashboard switcher)

**Storage:** Netlify Blobs (key-value). Each user → 1 blob. Free tier: 125k invocations/month + 1 GB. Enough for ~50 active users.

**Local dev:** `netlify dev` runs functions locally on :8888. Or `python serve.py` for legacy single-user mode (no auth).

**Frontend behavior:**
- On boot, probes `/api/users`. If 200 → cloud mode (require login). If 404 → local mode (single-user, no login).
- Login screen registers/logs in, stores `ssi.currentUser` in localStorage.
- Every state change → debounce push to `/api/state?user=<currentUser>`.
- Dashboard has user dropdown — fetches any user's state via `/api/state?user=X` (read-only view).

## Pending / TODO

- [ ] Ověřit zbývající `mssi-inst-022` (Group D + 2:45 SI → ?)
- [ ] Pokračovat s mySSI Lesson Reviews (zatím jen Lesson 1.1)
- [ ] Pokračovat s mySSI Pretest pokud SSI vydá další Parts
- [ ] Veřejný deploy: rozhodnout strategii (build script s public/private flag), Cloudflare Pages
- [ ] Před public deploy: vyřešit ToS pro Personal a mySSI (compliance)

---

## Konvence pro další session

- Když user pošle otázku z mySSI:
  1. Přidat do `mssi_inst_part<N>.json` nebo `mssi_inst_lessons.json`
  2. ID: pokračovat sekvenčně `mssi-inst-NNN`
  3. Source: `"mySSI: Instructor Pretest — Part X ..."` nebo `"mySSI: Lesson X.Y Review"`
  4. assemble.py + reload
- Když user opraví odpověď:
  - mySSI questions: edit přímo JSON
  - Personal questions: přidat do `OVERRIDES` v build_personal.py + remove ⚠️ z explanation
- Když user pošle PDF s exam questions: navrhnout, kam to schovat (Personal je default, se passwordem)

---

## Repo v Dropboxu

`C:/Dropbox/Claude Sync/Personal/SSI Instructor Prep/` — celé je v Dropboxu, tj. syncuje přes všechny stroje. Index v `Claude Sync/PROJECTS.md`.

**localStorage state je per-machine.** Pokud chceš drill historii přenést, exportuj log z Settings → "Export log (JSON)" a importuj manuálně (zatím není import button, lze přes DevTools console: `localStorage.setItem("ssi.log", JSON.stringify(importedLog))`).

---

## Pro Claude v další session

**User nebude nic spouštět ručně — spusť app sám.** Workflow:

1. Otevři tenhle soubor jako první (právě ho čteš)
2. Spusť app přes preview tool:
   ```
   preview_start("ssi-prep")
   ```
   (config je v `C:/Dropbox/Claude Sync/.claude/launch.json`, používá `serve.py` s state syncem na portu 8765)
3. Tím se otevře v preview panelu a user hned vidí svůj synced progress (state.json se načte z disku)
4. Pokud user změnil otázky offline (přidal mySSI nebo opravil odpověď), nejdřív `python data/assemble.py` — ale tohle dělej jen na explicitní user request

**Pokud user nahlásí bug nebo požádá o feature:**
- Edit zdrojáků (app.js / styles.css / index.html) → file watcher není, takže reload preview přes `preview_eval("window.location.reload()")`
- Pro úpravy questions: edit příslušný JSON nebo build_personal.py → `python data/assemble.py` → reload

**Pokud user pošle novou mySSI/lesson otázku:**
- Append do `data/mssi_inst_part<N>.json` nebo `data/mssi_inst_lessons.json`
- `python data/assemble.py` + reload
- ID musí být unikátní (assemble.py validuje)

**Pokud user opraví Personal answer:**
- Přidat override do `data/build_personal.py` `OVERRIDES` dict
- `python data/build_personal.py` + `python data/assemble.py` + reload

Vlastní memory pointer (`C:/Users/Administrator/.claude/projects/.../memory/`) → `dropbox_sync_pointer.md` ukazuje na `Claude Sync/PROJECTS.md`. Tam je odkaz na tento PROJECT.md.
