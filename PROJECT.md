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

### Counts (k 2026-04-30)
- Open Water Diver: **100** (Personal exam Form A+B)
- Science of Diving: **382** (120 compiled + 200 Personal exam Form A+B + 62 mssi-sod Reviews Lesson 1.1-2.3)
- Diver Stress & Rescue: **50** (Personal exam Form A+B, 25 q each — PDF Q26-50 missing)
- React Right: **100** (Personal exam Form A+B)
- Divemaster: **150** (50 compiled + 100 Personal Dive Guide exam Form A+B)
- Assistant Instructor: **50**
- Instructor: **753** (z toho 200 Personal ITC/AIT exam questions, 403 mssi-inst Reviews + Pretest)
- **Total: 1585 (EN: 1585, CS: 1585 — full parity ✓)**

### Source kategorie (4-way)

| Badge | Source | Count | Notes |
|---|---|---|---|
| ★ mySSI | mySSI verbatim — ITC Pretest Parts 1-9 + ITC Lesson 1.1-10.5 Reviews + SoD Lesson 1.1-2.3 Reviews (`mssi-inst-NNN`, `mssi-sod-NNN`) | ~465 | User-confirmed answers, all CS-translated |
| 🔒 Personal | 14 SSI exam PDFs: 4 Pro (AIT-A, AIT-B, ITC-A, ITC-B; 50 Q each) + 10 program (OWD A+B 50q, SoD A+B 100q, Dive Guide A+B 50q, Stress & Rescue A+B 25q, React Right A+B 50q) | 750 | Locked behind password `jetmouse` |
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

## STAV K 2026-04-26 (po dlouhé session) — DEPLOYED + bilingual

### Live deployment
- 🌐 **Production:** https://ssi-prep-thavryluk.netlify.app
- 📦 **GitHub repo (PUBLIC):** https://github.com/thavryluk/ssi-instructor-prep
- 🛠 **Netlify dashboard:** https://app.netlify.com/projects/ssi-prep-thavryluk
- **Auto-deploy pipeline:** každý `git push origin main` → webhook → build na Netlify Linux → live za ~1-2 min
- **Repo je PUBLIC** — Netlify free tier omezuje na 1 contributor v private. Personal heslo `jetmouse` je v app.js a tedy public, ale to bylo už předtím (deployed app.js byl vždy stažitelný). Před skutečně serioznějším public použitím promyslet ToS / lepší auth.

### Co bylo přidáno (8 commitů této session)
1. **i18n framework** — EN + CS dictionary (~200 klíčů), `t()` / `tFmt()` / `applyTranslations()`, language toggle v topbaru s SVG vlajkami (UK + CZ)
2. **Czech překlad všech 677 otázek** — `data/questions.cs.json` (450KB). Reprodukční pipeline: `data/translate_split.py` + 5 paralelních agentů + `data/translate_assemble.py` (validuje strukturu)
3. **Subarea translations** — `SUBAREA_GROUPS_CS` mapping pro 14 top-level skupin; storage keys zůstávají v EN (cross-lang filter persistence)
4. **Login error mapping** — `LOGIN_ERROR_MAP` překládá známé EN errory z `auth.js` na CS klíče
5. **Cross-platform Netlify build** — `data/build.py` (Python místo unix mkdir/cp)
6. **Login form fix** — labely měly `<label data-i18n="..."><input/></label>` strukturu, takže `applyTranslations()` mazal input z DOM (`textContent` wipe). Fix: text obalit `<span>`
7. **Home landing screen** — hero + 4 nav karty + mini progress per area + summary. Brand v topbaru je clickable → home.
8. **Help screen** — 8 sekcí: workflow, Pool vs Total, tlačítka u otázek, Reset pool stats, 4 zdroje otázek, klávesové zkratky, sdílený dashboard, privacy. Topbar tab "Nápověda".
9. **SVG vlajky u CS/EN buttonu** (Union Jack + tricolor inline)

### Build-time auto-versioning
`data/build.py` při každém buildu zapíše `dist/version.json` s aktuálním commit hashem (z `git rev-parse --short HEAD`, fallback na Netlify `COMMIT_REF`/`HEAD` env vars) a ISO timestampem. App při bootu fetchne `/version.json` (cache: no-store) a vykreslí ` · v <commit> · built <date>` ve footeru. Lokální dev (`serve.py` bez `version.json`) → fallback `· local dev` / `· lokální dev`. Re-renderuje se při změně jazyka.

Endpoint: `GET /version.json` na produkci vrací `{ "commit": "abc1234", "built_at": "2026-04-26T22:03:31+00:00" }`. Užitečné taky pro debugging: ověř, že nasazená verze je ta očekávaná.

### AKTIVNÍ TODO (po session 2026-04-26/27)
- [ ] **BUG: V Help screenu se zobrazují HTML tagy jako text** (`<strong>`, `<span style=...>`). Položky v `#help-screen` používají `data-i18n` (které volá `textContent` a escapuje HTML), ale i18n stringy obsahují `<strong>` markup. Fix: změnit `data-i18n="help.foo"` → `data-i18n-html="help.foo"` na ~20 položkách v `index.html`. Stejná oprava pro `dash.help.sources`, `dash.help.accuracy` (už používají `data-i18n-html` u `<dd>`, takže OK).
- [ ] Ověřit zbývající `mssi-inst-022` (Group D + 2:45 SI → ?)
- [ ] Pokračovat s mySSI Lesson Reviews (zatím jen Lesson 1.1)
- [ ] Pokračovat s mySSI Pretest pokud SSI vydá další Parts
- [ ] Při přidání nové otázky přeložit i do `data/questions.cs.json` (zatím není auto pipeline pro inkrementální překlad — full re-translation je `translate_split.py + agenti + translate_assemble.py`)

### HOTOVÉ TODO (z 2026-04-27)
- [x] Logout ikonka — nahrazena inline SVG door+arrow (univerzálně rendrovatelné, žádná font závislost)
- [x] Dashboard explanations — sbalený `<details class="dash-help">` panel nad tabulkou s vysvětlením 9 sloupců
- [x] Footer s verzí + datem buildu — auto z `data/build.py` přes `version.json` endpoint (viz výše)

### Git workflow
```bash
cd "C:/Dropbox/Claude Sync/Personal/SSI Instructor Prep"
git status              # co se změnilo
git diff                # konkrétní změny
git add <soubor>        # nebo git add .
git commit -m "popis"   # author už nakonfigurovaný (Tomas Havryluk <thavryluk@gmail.com>)
git push                # → GitHub → Netlify auto-build → live za 1-2 min
```

User je teď přihlášený `gh` (token v keyring) i `netlify` (přes npx, token cached). Na novém stroji budou potřeba `gh auth login` + `netlify login` znovu (tokeny per-machine).

### Známé caveaty deployu
- **netlify-cli musí být přes `npx netlify-cli ...`** (na Administrator's machine globální install netlify není v PATH user shellu — divnost s OneDrive/AppData redirection)
- **Build běží na Netlify Linux**, lokální `netlify deploy --build` na Windows funguje díky `data/build.py` (cross-platform)
- **Co-Authored-By trailer** v commitech je teď OK (repo je public). Pokud user přepne zpět na private, trailer vyhazuje "single contributor" error → buď upgrade Pro, nebo bez trailerů.

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

**1. Nejdřív přečti tenhle soubor** (zkráceně: live je `https://ssi-prep-thavryluk.netlify.app`, GitHub `thavryluk/ssi-instructor-prep`, auto-deploy přes git push).

**2. Lokální preview pro testování změn:**
```
preview_start("ssi-prep")
```
(config v `C:/Dropbox/Claude Sync/.claude/launch.json`, používá `serve.py` na :8765 — local single-user mode bez login screenu, protože nemá `/api/users` endpoint)

Reload po editu: `preview_eval("window.location.reload()")` — pak verifikace přes `preview_snapshot` / `preview_eval` / `preview_screenshot`.

### Pokud user chce nasadit změny na produkci (typický workflow):
```bash
cd "C:/Dropbox/Claude Sync/Personal/SSI Instructor Prep"
# edit files
git add -A
git commit -m "..."  # bez Co-Authored-By trailer NEBYL by vyhodil error, ale repo je public takže OK
git push             # → Netlify webhook → Linux build → live za 1-2 min
```
Verifikace deploye: `curl -s "https://ssi-prep-thavryluk.netlify.app/app.js?v=$(date +%s)" | grep ...` (cache-bust query, jinak hraje WebFetch tool vlastní cache).

### Pokud user pošle novou mySSI/lesson otázku
1. Append do `data/mssi_inst_part<N>.json` nebo `data/mssi_inst_lessons.json`
2. `python data/assemble.py` (přepíše `questions.json`)
3. **Pozor:** překlad do CS pak nezahrne novou otázku automaticky. Buď přeložit ručně do `data/questions.cs.json` (najít správné místo), nebo re-spawn překladového agenta na ten chunk.
4. `git push` → live.

### Pokud user opraví Personal answer
- Override do `data/build_personal.py` `OVERRIDES` dict → `python data/build_personal.py && python data/assemble.py` → push.

### Re-translation pipeline (bulk)
```bash
PYTHONIOENCODING=utf-8 python data/translate_split.py 5
# → spawn 5 agentů (general-purpose) s glossary v promptu, každý dostane 1 chunk
# Agenti zapíší do data/cs/translated/chunk_N.json
PYTHONIOENCODING=utf-8 python data/translate_assemble.py
# → vyrobí data/questions.cs.json + validuje
git push
```
Glossary diving termínů (BC vesta, automatika, dekomprese/DCI, bezpečnostní zastávka, NDL, atd.) viz prompty v historii — **ZACHOVAT KONZISTENCI** napříč chunky.

### Externí přihlášení na novém stroji
Aby se dalo pushovat z nového počítače:
```bash
gh auth login           # browser flow, vybrat HTTPS + login with browser
npx netlify-cli login   # browser flow (volitelné, jen pro CLI deploy — běžně netřeba, push stačí)
```
Pro git commit identity (jednorázově per repo na novém stroji):
```bash
git config user.email "thavryluk@gmail.com"
git config user.name "Tomas Havryluk"
```

Vlastní memory pointer (`C:/Users/Administrator/.claude/projects/.../memory/`) → `dropbox_sync_pointer.md` ukazuje na `Claude Sync/PROJECTS.md`. Tam je odkaz na tento PROJECT.md.
