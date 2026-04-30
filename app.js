"use strict";

// ───────── i18n ─────────

const I18N = {
  en: {
    // Topbar
    "topbar.dashboard": "Dashboard",
    "topbar.browse": "Browse",
    "topbar.settings": "Settings",
    "topbar.log": "Log",
    "topbar.help": "Help",
    "topbar.theme": "Toggle theme (light/dark)",
    "topbar.logout": "Log out",
    "topbar.home_title": "Home",
    "stats.pool": "Pool",
    "stats.total": "Total",
    "stats.active": "active",
    "stats.seen": "seen",
    "stats.acc": "acc",
    "stats.answered": "answered",
    "stats.correct": "correct",
    "stats.wrong": "wrong",
    "stats.mastered": "mastered",

    // Login
    "login.title": "Sign in",
    "login.intro": "Each user has their own progress (drill log, mastered, dashboard). Pick a username — register first time, then log in.",
    "login.username": "Username",
    "login.password": "Password",
    "login.password_placeholder": "anything (or empty)",
    "login.username_placeholder": "e.g. honza",
    "login.signin": "Log in",
    "login.register": "Create account",
    "login.warning": "Soft auth — passwords are stored in plaintext on the server. Don't reuse a real password.",
    "login.err.username_format": "Username must be 2-32 chars: a-z, 0-9, . _ -",
    "login.err.username_taken": "That username is already taken",
    "login.err.no_user": "No such user",
    "login.err.wrong_password": "Wrong password",

    // Setup
    "setup.title": "Choose your areas",
    "setup.intro": "Pick what to drill. You can change anytime in Settings.",
    "setup.start": "Start drilling",
    "setup.include_mastered": "Include questions I marked as mastered (reset)",

    // Areas
    "area.open_water_diver": "Open Water Diver",
    "area.science_of_diving": "Science of Diving",
    "area.diver_stress_rescue": "Diver Stress & Rescue",
    "area.react_right": "React Right (CPR / First Aid)",
    "area.divemaster": "Divemaster / Dive Guide",
    "area.assistant_instructor": "Assistant Instructor",
    "area.instructor": "Instructor",

    // Quiz
    "quiz.dont_know": "I don't know — explain",
    "quiz.study_more": "📚 Study more",
    "quiz.study_more_active": "📚 Study more (click to clear)",
    "quiz.dispute": "⚐ Dispute",
    "quiz.dispute_active": "⚐ Disputed (click to clear)",
    "quiz.know_50": "I know this ~50%",
    "quiz.know_100": "I know this 100%",
    "quiz.next": "Next question →",
    "quiz.correct": "Correct ✓",
    "quiz.wrong_correct_is": "Wrong — correct answer is",
    "quiz.correct_answer": "Correct answer:",
    "quiz.no_explanation": "(No explanation provided.)",
    "quiz.first_time": "First time you see this question",
    "quiz.seen": "Seen",
    "quiz.times": "×",
    "quiz.from_review_pool": "↻ from 50% review pool",
    "quiz.disputed": "⚐ Disputed",
    "quiz.study_flag": "📚 Study more",
    "quiz.source": "Source:",
    "quiz.source_compiled": "compiled from dive theory (agent-authored)",
    "quiz.flag_100": "100%",
    "quiz.flag_50": "~50%",
    "quiz.flag_reset": "↻ reset",
    "quiz.pre_reset_in_total": "pre-reset in Total",
    "quiz.badge_personal": "🔒 Personal",
    "quiz.badge_mssi": "★ mySSI",
    "quiz.badge_web": "● web source",
    "quiz.badge_compiled": "○ compiled (theory)",
    "quiz.compiled_title": "Authored by agent from public SSI standards / dive theory — not a verbatim citation.",

    // Settings
    "settings.title": "Settings",
    "settings.areas": "Areas",
    "settings.areas_intro": "Tap chips to add/remove areas from the drill pool. Empty selection = all areas drilled.",
    "settings.subareas": "Subareas (advanced)",
    "settings.subareas_intro": "Filtered by selected areas. Tap chips to narrow further. Empty selection = all subareas of the visible areas.",
    "settings.personal_section": "🔒 Personal questions",
    "settings.personal_locked": "🔒 Locked. Personal questions are hidden from the pool.",
    "settings.personal_unlocked": "🔓 Unlocked. Personal questions are visible in the pool.",
    "settings.unlock": "Unlock…",
    "settings.lock_again": "Lock again",
    "settings.source_filter": "Source filter",
    "settings.source_filter_intro": "Limit drill to questions from real web sources, agent-compiled-from-theory, or both.",
    "settings.src_all": "All sources",
    "settings.src_mssi": "★ mySSI only",
    "settings.src_personal": "🔒 Personal only",
    "settings.src_web": "● Web (other) only",
    "settings.src_compiled": "○ Compiled only",
    "settings.reset_pool": "Reset pool stats",
    "settings.reset_pool_intro": "Marks all current pool answers as \"reset\" — they stop counting toward Pool stats, Dashboard and weighted picking, but stay in Total. Useful when you want a fresh accuracy reading after a study session.",
    "settings.reset_pool_count": "Currently:",
    "settings.reset_pool_marked": "questions in pool have a reset mark.",
    "settings.btn_reset_pool": "Reset current pool stats",
    "settings.btn_clear_resets": "Clear all reset marks",
    "settings.confidence_pools": "Confidence pools",
    "settings.marked_100": "marked",
    "settings.excluded": "(excluded from drills).",
    "settings.marked_50": "marked",
    "settings.review_only": "(occasional review only).",
    "settings.btn_reset_100": "Reset 100% pool",
    "settings.btn_reset_50": "Reset 50% pool",
    "settings.btn_reset_both": "Reset both",
    "settings.disputed": "Disputed questions",
    "settings.disputed_count": "questions flagged as disputed.",
    "settings.skip_disputed": "Skip disputed questions in drills",
    "settings.btn_clear_disputed": "Clear all dispute flags",
    "settings.study_more": "Study more",
    "settings.study_count": "questions flagged for further review.",
    "settings.btn_clear_study": "Clear all study-more flags",
    "settings.log": "Log",
    "settings.log_count": "answers logged.",
    "settings.btn_export_log": "Export log (JSON)",
    "settings.btn_clear_log": "Clear log",
    "settings.back": "Back to drilling",

    // Dashboard
    "dash.title": "Dashboard",
    "dash.intro": "Progress and accuracy per area. Mastered/disputed counts per confidence level.",
    "dash.view_user": "View user:",
    "dash.refresh": "↻ Refresh users",
    "dash.viewing_your": "(your data)",
    "dash.viewing_loading": "(loading…)",
    "dash.viewing_failed": "(failed to load)",
    "dash.viewing": "(viewing {user})",
    "dash.user_me_suffix": "(me)",
    "dash.col_area": "Area",
    "dash.col_total": "Total",
    "dash.col_mssi": "★ mySSI",
    "dash.col_web": "● Web",
    "dash.col_compiled": "○ Compiled",
    "dash.col_seen": "Seen",
    "dash.col_attempts": "Attempts",
    "dash.col_accuracy": "Accuracy",
    "dash.col_100": "100%",
    "dash.col_50": "~50%",
    "dash.col_study": "📚 Study",
    "dash.col_disputed": "Disputed",
    "dash.row_total": "Total",
    "dash.disputed_section": "Disputed questions",
    "dash.disputed_none": "None.",
    "dash.q_not_found": "(not found in current question set)",
    "dash.help.summary": "What do the columns mean?",
    "dash.help.total": "Number of all questions in the area.",
    "dash.help.sources": "Source breakdown: mySSI Pretest (verbatim), web (Quizlet/PDFs) and compiled (AI-generated from theory). Details in <strong>Help</strong>.",
    "dash.help.seen": "How many unique questions you've seen at least once (after the last pool stats reset).",
    "dash.help.attempts": "Total number of answers (correct/wrong/unknown). Higher than Seen if you've answered some questions multiple times.",
    "dash.help.accuracy": "Accuracy = correct / attempts. Colors: <span style=\"color:#e74c3c\">red</span> &lt;60%, yellow 60–79%, <span style=\"color:#27ae60\">green</span> ≥80%.",
    "dash.help.m100": "Questions you marked \"I know this 100%\" — excluded from drilling until you reset in Settings.",
    "dash.help.m50": "Questions \"I know this ~50%\" — only appear occasionally (10% of pool) for review.",
    "dash.help.study": "Questions marked \"📚 Study more\" — flag for later study. Doesn't affect drill picking.",
    "dash.help.disputed": "Questions you marked as wrong/disputed. In Settings you can check \"Skip disputed questions\".",

    // Browse
    "browse.title": "Browse questions",
    "browse.intro": "Full pool with status. Click any question to expand.",
    "browse.area": "Area:",
    "browse.subarea": "Subarea:",
    "browse.source": "Source:",
    "browse.mssi_section": "mySSI Section:",
    "browse.status": "Status:",
    "browse.search_placeholder": "Search question text or ID…",
    "browse.sort.id": "Sort: ID",
    "browse.sort.seen": "Sort: Last seen",
    "browse.sort.accuracy": "Sort: Accuracy (low → high)",
    "browse.sort.attempts": "Sort: Most attempts",
    "browse.all": "All",
    "browse.count_of": "of",
    "browse.back": "Back to drilling",
    "browse.status.unanswered": "Unanswered",
    "browse.status.answered": "Answered",
    "browse.status.last_correct": "Last correct",
    "browse.status.last_wrong": "Last wrong",
    "browse.status.disputed": "Disputed",
    "browse.status.study": "📚 Study more",
    "browse.src.mssi": "mySSI (verbatim)",
    "browse.src.personal": "🔒 Personal",
    "browse.src.web": "Web (other)",
    "browse.src.compiled": "Compiled (theory)",
    "browse.badge.web": "● web",
    "browse.badge.compiled": "○ compiled",
    "browse.badge.mssi": "★ mySSI",
    "browse.badge.personal": "🔒 personal",
    "browse.badge.unanswered": "unanswered",
    "browse.badge.last_correct": "last: correct",
    "browse.badge.last_wrong": "last: wrong",
    "browse.badge.last_unknown": "last: unknown",
    "browse.badge.100": "100%",
    "browse.badge.50": "~50%",
    "browse.badge.disputed": "⚐ disputed",
    "browse.badge.study": "📚 study",
    "browse.compiled_title": "Authored by agent from public SSI standards / dive theory",
    "browse.accuracy": "accuracy:",
    "browse.last_seen": "last seen:",
    "browse.detail.explanation": "Explanation:",
    "browse.detail.source": "Source:",
    "browse.detail.none": "(none)",
    "browse.detail.btn_unmark_100": "Unmark 100%",
    "browse.detail.btn_mark_100": "Mark 100%",
    "browse.detail.btn_unmark_50": "Unmark ~50%",
    "browse.detail.btn_mark_50": "Mark ~50%",
    "browse.detail.btn_clear_dispute": "Clear dispute",
    "browse.detail.btn_mark_dispute": "Mark disputed",
    "browse.detail.btn_clear_study": "Clear study-more",
    "browse.detail.btn_study": "📚 Study more",
    "browse.detail.btn_drill": "Drill this question",

    // Log
    "log.title": "Answer log",
    "log.intro": "Most recent first. Right/wrong/unknown breakdown per question.",
    "log.total": "Total:",
    "log.correct": "Correct:",
    "log.wrong": "Wrong:",
    "log.unknown": "Unknown:",
    "log.col_time": "Time",
    "log.col_id": "ID",
    "log.col_area": "Area / Subarea",
    "log.col_source": "Source",
    "log.col_question": "Question",
    "log.col_result": "Result",
    "log.click_to_open": "Click to open in Browse",
    "log.question_removed": "(question removed —",
    "log.back": "Back to drilling",
    "log.result.correct": "correct",
    "log.result.wrong": "wrong",
    "log.result.unknown": "unknown",
    "log.result.mastered_100": "→ 100%",
    "log.result.mastered_50": "→ 50%",
    "log.result.disputed": "⚐ disputed",
    "log.result.dispute_clear": "⚐ cleared",
    "log.result.study_more": "📚 study",
    "log.result.study_clear": "📚 study cleared",

    // Empty pool
    "empty.title": "No questions in pool",
    "empty.intro": "Either no areas are selected or you've mastered everything in the selected areas. 🎉",
    "empty.back": "Open settings",

    // Footer
    "footer": "Built for instructor exam prep · Local-only · Data persists in your browser",
    "footer.version": "v {commit} · built {date}",
    "footer.local": "local dev",

    // Home / landing
    "home.title": "SSI Instructor Prep",
    "home.subtitle": "SSI instructor exam prep — 677 questions from mySSI Pretest, official standards and dive-theory compilation. Weighted picking based on your progress.",
    "home.card.drill": "Start drilling",
    "home.card.drill_desc": "Random questions weighted by your answer history. Unseen and previously-wrong questions get higher priority.",
    "home.card.browse": "Browse questions",
    "home.card.browse_desc": "Filter all 677 questions by area, source, status (unanswered, wrong, mastered…) and search the text.",
    "home.card.dashboard": "Dashboard",
    "home.card.dashboard_desc": "Your progress per area: accuracy, attempts, mastered, disputed. You can also view other users' progress (read-only).",
    "home.card.help": "Help",
    "home.card.help_desc": "How the app works, what the stats mean, keyboard shortcuts and button explanations.",
    "home.progress.title": "Your progress",
    "home.progress.summary": "{seen} / {total} seen across all areas · {acc}% overall accuracy · {m100} mastered (100%) · {m50} review (~50%)",
    "home.progress.empty": "No answers yet. Click \"Start drilling\" to begin.",

    // Help
    "help.title": "Help",
    "help.workflow_h": "Workflow",
    "help.workflow_1": "In <strong>Settings</strong>, pick the areas you want to focus on (Science of Diving / Divemaster / AI / Instructor).",
    "help.workflow_2": "Click <strong>Start drilling</strong>. The app picks a random question from the pool, weighted by how well you know it.",
    "help.workflow_3": "Answer A/B/C/D. If you don't know, click <strong>I don't know — explain</strong>. After answering you see the correct answer + explanation.",
    "help.workflow_4": "Mark the question as <strong>100%</strong> (excluded from picking) or <strong>~50%</strong> (occasional review). Over time you stop seeing it and focus on the hard ones.",
    "help.workflow_5": "In <strong>Dashboard</strong> you see accuracy per area and how much remains.",
    "help.stats_h": "Stats — Pool vs Total",
    "help.stats_pool": "<strong>Pool</strong> = just the currently-selected area and its questions. Changes with Settings.",
    "help.stats_total": "<strong>Total</strong> = all your answers across all areas, ever. This is your historical record.",
    "help.stats_acc": "Accuracy colors: <span style=\"color:#e74c3c\">red</span> &lt; 50%, <span style=\"color:#f39c12\">yellow</span> 50–74%, <span style=\"color:#27ae60\">green</span> 75–89%, <strong style=\"color:#27ae60\">90%+</strong> = goal badge.",
    "help.buttons_h": "Question buttons",
    "help.btn_dont_know": "<strong>I don't know — explain</strong> — Don't guess. You see the correct answer + explanation right away. Counts as \"unknown\" (not for or against).",
    "help.btn_know_100": "<strong>I know this 100%</strong> — Question never appears in drill again. Fully mastered. You can reset in Settings.",
    "help.btn_know_50": "<strong>I know this ~50%</strong> — Question leaves the main pool but occasionally (10%) shows for review.",
    "help.btn_study": "<strong>📚 Study more</strong> — Marks question for later study. Doesn't change pool, just a flag.",
    "help.btn_dispute": "<strong>⚐ Dispute</strong> — Mark a question as wrong/disputed (e.g. bad answer key). You can skip them in Settings or view the list.",
    "help.reset_h": "Reset pool stats",
    "help.reset_p": "Sometimes you want a clean accuracy reading — after a long break or starting a \"new round\". <strong>Reset pool stats</strong> in Settings marks all current pool answers as \"reset\". Existing answers stay in <strong>Total</strong> (history) but Pool ignores them. Pool stats restart from zero.",
    "help.sources_h": "Question sources",
    "help.src_mssi": "<strong>★ mySSI</strong> — Verbatim from mySSI Instructor Pretest (Lessons + Pretest Parts). 100% trustworthy.",
    "help.src_personal": "<strong>🔒 Personal</strong> — 200 questions from 4 SSI Pro exam PDFs (AIT-A, AIT-B, ITC-A, ITC-B). Hidden behind password (default <code>jetmouse</code>, hint \"Kuk za buk\"), invisible to random visitors.",
    "help.src_web": "<strong>● Web</strong> — Quizlet, dive shop PDFs, ScubaBoard. Public sources, not 100% verified.",
    "help.src_compiled": "<strong>○ Compiled</strong> — AI agent generated from public SSI standards and dive theory. Useful for coverage but verify yourself.",
    "help.src_filter": "Set the filter in <strong>Settings → Source filter</strong> or in <strong>Browse</strong>.",
    "help.kb_h": "Keyboard shortcuts (quiz screen only)",
    "help.kb.answer": "Pick an answer",
    "help.kb.dontknow": "I don't know — explain",
    "help.kb.next": "Next question (after answering)",
    "help.kb.know100": "I know this 100%",
    "help.kb.know50": "I know this ~50%",
    "help.kb.study": "Study more (toggle)",
    "help.kb.dispute": "Dispute (toggle)",
    "help.dashboard_h": "Shared dashboard",
    "help.dashboard_p": "Each user has their own progress (ID/password, server-side state). The Dashboard has a \"View user\" dropdown — you can look at any other registered user's progress (read-only). Useful for instructors monitoring students.",
    "help.privacy_h": "What's shared, what's private",
    "help.privacy_p": "<strong>Shared (everyone sees in Dashboard):</strong> your answers, mastered, disputed, study-more flags.<br><strong>Private:</strong> password, selected filters, language, theme, Personal unlock state.",
    "help.back": "Back to home",

    // Confirms
    "confirm.reset_100": "Reset {n} questions from the 100% pool?",
    "confirm.reset_50": "Reset {n} questions from the 50% pool?",
    "confirm.reset_both": "Reset both pools — {n} questions back into rotation?",
    "confirm.clear_disputed": "Clear dispute flags from {n} questions?",
    "confirm.clear_study": "Clear study-more flags from {n} questions?",
    "confirm.clear_log": "Clear all {n} log entries? This can't be undone.",
    "confirm.reset_pool_no_data": "No answered questions in current pool to reset.",
    "confirm.reset_pool": "Reset stats for {n} answered questions in current pool? Existing answers will move to TOTAL only — Pool/Dashboard/picking will treat them as unseen.",
    "confirm.reset_pool_done": "Marked {n} questions as reset.",
    "confirm.no_resets": "No reset marks to clear.",
    "confirm.clear_resets": "Clear {n} reset marks? Old answers will be re-counted toward Pool stats.",
    "confirm.logout": "Log out? Your progress is saved on the server — you can log back in anytime.",
    "confirm.unlock_personal": "Hint: \"{hint}\"\n\nEnter password to unlock Personal questions:",
    "confirm.unlocked": "🔓 Unlocked.",
    "confirm.wrong_password": "Wrong password.",
  },
  cs: {
    // Topbar
    "topbar.dashboard": "Přehled",
    "topbar.browse": "Procházet",
    "topbar.settings": "Nastavení",
    "topbar.log": "Záznam",
    "topbar.help": "Nápověda",
    "topbar.theme": "Přepnout vzhled (světlý/tmavý)",
    "topbar.logout": "Odhlásit",
    "topbar.home_title": "Domů",
    "stats.pool": "VÝBĚR",
    "stats.total": "CELKEM",
    "stats.active": "aktivní",
    "stats.seen": "viděno",
    "stats.acc": "úsp.",
    "stats.answered": "odpovězeno",
    "stats.correct": "správně",
    "stats.wrong": "špatně",
    "stats.mastered": "naučené",

    // Login
    "login.title": "Přihlášení",
    "login.intro": "Každý uživatel má vlastní postup (záznam odpovědí, naučené otázky, statistiky). Vyber si jméno — poprvé Vytvoř účet, pak Přihlás se.",
    "login.username": "Jméno",
    "login.password": "Heslo",
    "login.password_placeholder": "cokoliv (může být i prázdné)",
    "login.username_placeholder": "např. honza",
    "login.signin": "Přihlásit se",
    "login.register": "Vytvořit účet",
    "login.warning": "Měkká autentizace — hesla jsou na serveru v plaintextu. Nepoužívej skutečné heslo.",
    "login.err.username_format": "Jméno musí mít 2-32 znaků: a-z, 0-9, . _ -",
    "login.err.username_taken": "Toto jméno je už zabrané",
    "login.err.no_user": "Takový uživatel neexistuje",
    "login.err.wrong_password": "Špatné heslo",

    // Setup
    "setup.title": "Vyber oblasti",
    "setup.intro": "Z čeho chceš zkoušet. Můžeš změnit kdykoliv v Nastavení.",
    "setup.start": "Začít zkoušení",
    "setup.include_mastered": "Zahrnout otázky, které jsem označil jako naučené (reset)",

    // Areas
    "area.open_water_diver": "Open Water Diver",
    "area.science_of_diving": "Věda o potápění",
    "area.diver_stress_rescue": "Diver Stress & Rescue",
    "area.react_right": "React Right (KPR / první pomoc)",
    "area.divemaster": "Divemaster / Dive Guide",
    "area.assistant_instructor": "Asistent instruktora",
    "area.instructor": "Instruktor",

    // Quiz
    "quiz.dont_know": "Nevím — vysvětli",
    "quiz.study_more": "📚 Studovat víc",
    "quiz.dispute": "⚐ Rozporovat",
    "quiz.dispute_active": "⚐ Rozporováno (klik = zrušit)",
    "quiz.know_50": "Znám asi na 50 %",
    "quiz.know_100": "Znám na 100 %",
    "quiz.next": "Další otázka →",
    "quiz.correct": "Správně ✓",
    "quiz.wrong_correct_is": "Špatně — správná odpověď je",
    "quiz.correct_answer": "Správná odpověď:",
    "quiz.no_explanation": "(Žádné vysvětlení.)",
    "quiz.first_time": "Tuto otázku vidíš poprvé",
    "quiz.seen": "Viděno",
    "quiz.times": "×",
    "quiz.from_review_pool": "↻ z 50 % review",
    "quiz.disputed": "⚐ Rozporováno",
    "quiz.study_flag": "📚 Studovat víc",
    "quiz.source": "Zdroj:",
    "quiz.source_compiled": "vytvořeno z teorie potápění (autor: agent)",
    "quiz.flag_100": "100%",
    "quiz.flag_50": "~50%",
    "quiz.flag_reset": "↻ reset",
    "quiz.pre_reset_in_total": "před resetem v Celkem",
    "quiz.study_more_active": "📚 Studovat víc (klik = zrušit)",
    "quiz.badge_personal": "🔒 Osobní",
    "quiz.badge_mssi": "★ mySSI",
    "quiz.badge_web": "● web",
    "quiz.badge_compiled": "○ vytvořené (z teorie)",
    "quiz.compiled_title": "Vytvořeno agentem z veřejných SSI standardů / teorie potápění — není doslovná citace.",

    // Settings
    "settings.title": "Nastavení",
    "settings.areas": "Oblasti",
    "settings.areas_intro": "Kliknutím na chip přidáš/odebereš oblast z drill poolu. Žádný výběr = drilluje všechny oblasti.",
    "settings.subareas": "Podoblasti (pokročilé)",
    "settings.subareas_intro": "Filtrováno podle vybraných oblastí. Kliknutím na chip zúžíš výběr. Žádný výběr = všechny podoblasti viditelných oblastí.",
    "settings.personal_section": "🔒 Osobní otázky",
    "settings.personal_locked": "🔒 Zamčeno. Osobní otázky jsou skryté.",
    "settings.personal_unlocked": "🔓 Odemčeno. Osobní otázky jsou ve výběru.",
    "settings.unlock": "Odemknout…",
    "settings.lock_again": "Znovu zamknout",
    "settings.source_filter": "Filtr zdroje",
    "settings.source_filter_intro": "Omez zkoušení na konkrétní zdroje.",
    "settings.src_all": "Všechny zdroje",
    "settings.src_mssi": "★ Pouze mySSI",
    "settings.src_personal": "🔒 Pouze osobní",
    "settings.src_web": "● Pouze web (ostatní)",
    "settings.src_compiled": "○ Pouze vytvořené (z teorie)",
    "settings.reset_pool": "Resetovat statistiku výběru",
    "settings.reset_pool_intro": "Označí všechny dosavadní odpovědi v aktuálním výběru jako „resetované\" — přestanou se počítat do statistik výběru, do Přehledu a do váženého výběru otázek, ale zůstanou v Celkové statistice. Užitečné, pokud chceš čistou bilanci po další studijní seance.",
    "settings.reset_pool_count": "Aktuálně:",
    "settings.reset_pool_marked": "otázek ve výběru má reset značku.",
    "settings.btn_reset_pool": "Resetovat statistiku aktuálního výběru",
    "settings.btn_clear_resets": "Smazat všechny reset značky",
    "settings.confidence_pools": "Skupiny dle jistoty",
    "settings.marked_100": "označeno",
    "settings.excluded": "(vyřazeno z výběru)",
    "settings.marked_50": "označeno",
    "settings.review_only": "(jen občasný review)",
    "settings.btn_reset_100": "Resetovat 100 % skupinu",
    "settings.btn_reset_50": "Resetovat 50 % skupinu",
    "settings.btn_reset_both": "Resetovat obě",
    "settings.disputed": "Rozporované otázky",
    "settings.disputed_count": "otázek označeno jako rozporované.",
    "settings.skip_disputed": "Přeskočit rozporované otázky ve zkoušení",
    "settings.btn_clear_disputed": "Smazat všechny rozpory",
    "settings.study_more": "Studovat víc",
    "settings.study_count": "otázek označeno k dalšímu prostudování.",
    "settings.btn_clear_study": "Smazat všechny značky studovat víc",
    "settings.log": "Záznam odpovědí",
    "settings.log_count": "odpovědí v záznamu.",
    "settings.btn_export_log": "Export záznamu (JSON)",
    "settings.btn_clear_log": "Smazat záznam",
    "settings.back": "Zpět ke zkoušení",

    // Dashboard
    "dash.title": "Přehled",
    "dash.intro": "Postup a úspěšnost dle oblastí. Počty naučených/rozporovaných dle skupiny jistoty.",
    "dash.view_user": "Zobrazit uživatele:",
    "dash.refresh": "↻ Obnovit uživatele",
    "dash.viewing_your": "(tvoje data)",
    "dash.viewing_loading": "(načítání…)",
    "dash.viewing_failed": "(načtení selhalo)",
    "dash.viewing": "(zobrazuji uživatele",
    "dash.col_area": "Oblast",
    "dash.col_total": "Celkem",
    "dash.col_mssi": "★ mySSI",
    "dash.col_web": "● Web",
    "dash.col_compiled": "○ Vytvořené",
    "dash.col_seen": "Viděno",
    "dash.col_attempts": "Pokusy",
    "dash.col_accuracy": "Úspěšnost",
    "dash.col_100": "100%",
    "dash.col_50": "~50%",
    "dash.col_study": "📚 Studovat",
    "dash.col_disputed": "Rozpory",
    "dash.row_total": "Celkem",
    "dash.disputed_section": "Rozporované otázky",
    "dash.disputed_none": "Žádné.",
    "dash.user_me_suffix": "(já)",
    "dash.q_not_found": "(nenalezeno v aktuální sadě otázek)",
    "dash.help.summary": "Co znamenají sloupce?",
    "dash.help.total": "Počet všech otázek v dané oblasti.",
    "dash.help.sources": "Rozdělení podle zdroje: mySSI Pretest (doslovně), web (Quizlet/PDFs) a compiled (vygenerované AI z teorie). Detail v <strong>Nápověda</strong>.",
    "dash.help.seen": "Kolik unikátních otázek jsi alespoň jednou viděl (po posledním resetu pool stats).",
    "dash.help.attempts": "Celkový počet odpovědí (correct/wrong/unknown). Vyšší než Seen, pokud jsi některé otázky odpovídal víckrát.",
    "dash.help.accuracy": "Úspěšnost = correct / attempts. Barvy: <span style=\"color:#e74c3c\">červená</span> &lt;60%, žlutá 60–79%, <span style=\"color:#27ae60\">zelená</span> ≥80%.",
    "dash.help.m100": "Otázky které jsi označil „Znám na 100 %\" — vyřazené z výběru, dokud je nezrušíš v Nastavení.",
    "dash.help.m50": "Otázky „Znám asi na 50 %\" — chodí ti jen občas (10 % poolu) jako review.",
    "dash.help.study": "Otázky označené „📚 Studovat víc\" — flag k pozdějšímu prostudování. Neovlivňuje výběr.",
    "dash.help.disputed": "Otázky které jsi označil jako sporné/špatné. V Nastavení můžeš zaškrtnout „Přeskočit rozporované\".",

    // Browse
    "browse.title": "Procházet otázky",
    "browse.intro": "Celý fond otázek se stavem. Klikni na otázku pro detail.",
    "browse.area": "Oblast:",
    "browse.subarea": "Podoblast:",
    "browse.source": "Zdroj:",
    "browse.mssi_section": "Sekce mySSI:",
    "browse.status": "Stav:",
    "browse.search_placeholder": "Hledat text otázky nebo ID…",
    "browse.sort.id": "Řadit: ID",
    "browse.sort.seen": "Řadit: Naposledy viděno",
    "browse.sort.accuracy": "Řadit: Úspěšnost (nejhorší první)",
    "browse.sort.attempts": "Řadit: Nejvíc pokusů",
    "browse.all": "Vše",
    "browse.count_of": "z",
    "browse.back": "Zpět ke zkoušení",
    "browse.status.unanswered": "Nezodpovězeno",
    "browse.status.answered": "Zodpovězeno",
    "browse.status.last_correct": "Naposledy správně",
    "browse.status.last_wrong": "Naposledy špatně",
    "browse.status.disputed": "Rozporované",
    "browse.status.study": "📚 Studovat víc",
    "browse.src.mssi": "mySSI (doslovně)",
    "browse.src.personal": "🔒 Osobní",
    "browse.src.web": "Web (ostatní)",
    "browse.src.compiled": "Vytvořené (z teorie)",
    "browse.badge.web": "● web",
    "browse.badge.compiled": "○ vytvořené",
    "browse.badge.mssi": "★ mySSI",
    "browse.badge.personal": "🔒 osobní",
    "browse.badge.unanswered": "nezodpovězeno",
    "browse.badge.last_correct": "naposledy: správně",
    "browse.badge.last_wrong": "naposledy: špatně",
    "browse.badge.last_unknown": "naposledy: nevěděl",
    "browse.badge.100": "100%",
    "browse.badge.50": "~50%",
    "browse.badge.disputed": "⚐ rozporováno",
    "browse.badge.study": "📚 studovat",
    "browse.accuracy": "úspěšnost:",
    "browse.last_seen": "naposledy:",
    "browse.detail.explanation": "Vysvětlení:",
    "browse.detail.source": "Zdroj:",
    "browse.detail.none": "(žádné)",
    "browse.compiled_title": "Vytvořeno agentem z veřejných SSI standardů / teorie potápění",
    "browse.detail.btn_unmark_100": "Zrušit 100%",
    "browse.detail.btn_mark_100": "Označit 100%",
    "browse.detail.btn_unmark_50": "Zrušit ~50%",
    "browse.detail.btn_mark_50": "Označit ~50%",
    "browse.detail.btn_clear_dispute": "Zrušit rozpor",
    "browse.detail.btn_mark_dispute": "Označit rozporované",
    "browse.detail.btn_clear_study": "Zrušit studovat víc",
    "browse.detail.btn_study": "📚 Studovat víc",
    "browse.detail.btn_drill": "Zkoušet tuto otázku",

    // Log
    "log.title": "Záznam odpovědí",
    "log.intro": "Nejnovější nahoře. Rozpis správně/špatně/nevěděl podle otázky.",
    "log.total": "Celkem:",
    "log.correct": "Správně:",
    "log.wrong": "Špatně:",
    "log.unknown": "Nevěděl:",
    "log.col_time": "Čas",
    "log.col_id": "ID",
    "log.col_area": "Oblast / Podoblast",
    "log.col_source": "Zdroj",
    "log.col_question": "Otázka",
    "log.col_result": "Výsledek",
    "log.click_to_open": "Kliknutím otevřít v Procházet",
    "log.question_removed": "(otázka odstraněna —",
    "log.back": "Zpět ke zkoušení",
    "log.result.correct": "správně",
    "log.result.wrong": "špatně",
    "log.result.unknown": "nevěděl",
    "log.result.mastered_100": "→ 100%",
    "log.result.mastered_50": "→ ~50%",
    "log.result.disputed": "⚐ rozporováno",
    "log.result.dispute_clear": "⚐ rozpor zrušen",
    "log.result.study_more": "📚 studovat",
    "log.result.study_clear": "📚 studovat zrušeno",

    // Empty pool
    "empty.title": "Ve výběru nejsou žádné otázky",
    "empty.intro": "Buď nemáš vybrané žádné oblasti, nebo jsi naučil všechno z vybraných oblastí. 🎉",
    "empty.back": "Otevři nastavení",

    // Footer
    "footer": "Postaveno pro přípravu na instruktorské zkoušky · Lokální · Data v tvém prohlížeči",
    "footer.version": "v {commit} · build {date}",
    "footer.local": "lokální dev",

    // Home / landing
    "home.title": "SSI Instructor Prep",
    "home.subtitle": "Příprava na SSI instruktorské zkoušky — 677 otázek z mySSI Pretestu, oficiálních standardů a kompilátu z teorie potápění. Váženě vybírané podle tvého progresu.",
    "home.card.drill": "Začít zkoušení",
    "home.card.drill_desc": "Náhodné otázky s váženým výběrem podle tvojí historie odpovědí. Otázky, které ses ještě neviděl nebo na které jsi odpověděl špatně, mají větší šanci.",
    "home.card.browse": "Procházet otázky",
    "home.card.browse_desc": "Filtrovat všech 677 otázek podle oblasti, zdroje, stavu (nezodpovězené, špatně, naučené…) a hledat v textu.",
    "home.card.dashboard": "Přehled",
    "home.card.dashboard_desc": "Tvůj progres per oblast: úspěšnost, počet pokusů, naučené, rozporované. Můžeš si zobrazit i progres jiných uživatelů (read-only).",
    "home.card.help": "Nápověda",
    "home.card.help_desc": "Jak app funguje, co znamenají statistiky, klávesové zkratky a vysvětlení tlačítek.",
    "home.progress.title": "Tvůj progres",
    "home.progress.summary": "{seen} / {total} viděno napříč oblastmi · {acc}% celková úspěšnost · {m100} naučeno (100%) · {m50} review (~50%)",
    "home.progress.empty": "Zatím žádné odpovědi. Klikni „Začít zkoušení\" a začni.",

    // Help
    "help.title": "Nápověda",
    "help.workflow_h": "Workflow",
    "help.workflow_1": "V <strong>Nastavení</strong> vyber oblasti, na které se chceš zaměřit (Věda o potápění / Divemaster / AI / Instruktor).",
    "help.workflow_2": "Klikni <strong>Začít zkoušení</strong>. App ti dá náhodnou otázku z poolu, váženě podle toho, jak dobře ji znáš.",
    "help.workflow_3": "Odpověz A/B/C/D. Pokud nevíš, klikni <strong>Nevím — vysvětli</strong>. Po odpovědi vidíš správnou odpověď a vysvětlení.",
    "help.workflow_4": "Označ otázku jako <strong>100 %</strong> (vyřazena z výběru) nebo <strong>~50 %</strong> (občasný review). Po čase otázku přestaneš vidět a soustředíš se na ty obtížné.",
    "help.workflow_5": "V <strong>Přehled</strong> vidíš úspěšnost per oblast a kolik ti zbývá.",
    "help.stats_h": "Statistiky — Pool vs Total",
    "help.stats_pool": "<strong>Pool</strong> = jen aktuálně vybraná oblast a její otázky. Mění se podle Nastavení.",
    "help.stats_total": "<strong>Total</strong> = všechny tvoje odpovědi napříč všemi oblastmi, vše co kdy bylo. Tohle je tvůj historický záznam.",
    "help.stats_acc": "Úspěšnost barvy: <span style=\"color:#e74c3c\">červená</span> &lt; 50 %, <span style=\"color:#f39c12\">žlutá</span> 50–74 %, <span style=\"color:#27ae60\">zelená</span> 75–89 %, <strong style=\"color:#27ae60\">90 %+</strong> = goal badge.",
    "help.buttons_h": "Tlačítka u otázek",
    "help.btn_dont_know": "<strong>Nevím — vysvětli</strong> — Nepokoušej se hádat. Hned vidíš správnou odpověď + vysvětlení. Započítá se jako „nevěděl\" (bez tečky za nebo proti).",
    "help.btn_know_100": "<strong>Znám na 100 %</strong> — Otázku už nikdy neuvidíš v drillu. Plně naučená. Můžeš zrušit v Nastavení.",
    "help.btn_know_50": "<strong>Znám asi na 50 %</strong> — Otázka přestane být v hlavním poolu, ale občas (10 %) ti ji ještě dá k review.",
    "help.btn_study": "<strong>📚 Studovat víc</strong> — Označí otázku k pozdějšímu prostudování. Neovlivní pool, jen flag.",
    "help.btn_dispute": "<strong>⚐ Rozporovat</strong> — Označíš otázku jako nesprávnou/spornou (např. špatná answer key). Můžeš ji v Nastavení přeskočit nebo si zobrazit seznam.",
    "help.reset_h": "Reset pool stats",
    "help.reset_p": "Někdy chceš začít s „čistou\" úspěšností — třeba po dlouhé pauze nebo když chceš vidět, jak se ti daří v „novém kole\". <strong>Reset pool stats</strong> v Nastavení označí všechny dosavadní odpovědi v aktuálním výběru jako „resetované\". Stávající odpovědi zůstanou v <strong>Total</strong> (historie), ale Pool je začne ignorovat. Pool stats se počítají od resetu znovu od nuly.",
    "help.sources_h": "Zdroje otázek",
    "help.src_mssi": "<strong>★ mySSI</strong> — Doslovně z mySSI Instructor Pretestu (Lessons + Pretest Parts). 100% spolehlivé.",
    "help.src_personal": "<strong>🔒 Osobní</strong> — 200 otázek z 4 SSI Pro exam PDFs (AIT-A, AIT-B, ITC-A, ITC-B). Skryté heslem (default <code>jetmouse</code>, hint „Kuk za buk\"), nezobrazují se náhodným návštěvníkům.",
    "help.src_web": "<strong>● Web</strong> — Quizlet, dive shop PDFs, ScubaBoard. Veřejné zdroje, ne 100% prověřené.",
    "help.src_compiled": "<strong>○ Vytvořené</strong> — AI agent vytvořil z public SSI standardů a teorie potápění. Užitečné pro coverage, ale check si je sám.",
    "help.src_filter": "Filtr můžeš nastavit v <strong>Nastavení → Filtr zdroje</strong> nebo v <strong>Procházet</strong>.",
    "help.kb_h": "Klávesové zkratky (jen na quiz screen)",
    "help.kb.answer": "Vybrat odpověď",
    "help.kb.dontknow": "Nevím — vysvětli",
    "help.kb.next": "Další otázka (po odpovědi)",
    "help.kb.know100": "Znám na 100 %",
    "help.kb.know50": "Znám asi na 50 %",
    "help.kb.study": "Studovat víc (toggle)",
    "help.kb.dispute": "Rozporovat (toggle)",
    "help.dashboard_h": "Sdílený dashboard",
    "help.dashboard_p": "Každý uživatel má vlastní progres (ID/heslo, server-side state). V <strong>Přehled</strong> je dropdown „Zobrazit uživatele\" — můžeš se podívat na progres jakéhokoliv jiného registrovaného uživatele (read-only). Užitečné pro instruktory dohlížející na studenty.",
    "help.privacy_h": "Co je sdílené, co soukromé",
    "help.privacy_p": "<strong>Sdílené (vidí všichni přes dashboard):</strong> tvoje odpovědi, naučené, rozporované, study-more flagy.<br><strong>Soukromé:</strong> heslo, vybrané filtry, jazyk, téma, Personal unlock state.",
    "help.back": "Zpět na titulku",

    // Confirms
    "confirm.reset_100": "Resetovat {n} otázek z 100 % skupiny zpět do výběru?",
    "confirm.reset_50": "Resetovat {n} otázek z 50 % skupiny zpět do výběru?",
    "confirm.reset_both": "Resetovat obě skupiny — {n} otázek zpět do výběru?",
    "confirm.clear_disputed": "Vyčistit rozpory u {n} otázek?",
    "confirm.clear_study": "Vyčistit značky „studovat víc\" u {n} otázek?",
    "confirm.clear_log": "Smazat všech {n} záznamů? Nelze vrátit zpět.",
    "confirm.reset_pool_no_data": "Žádné zodpovězené otázky ve výběru k resetu.",
    "confirm.reset_pool": "Resetovat statistiku {n} zodpovězených otázek v aktuálním výběru? Stávající odpovědi se přesunou jen do Celkové statistiky — Výběr/Přehled/výběr otázek je budou ignorovat.",
    "confirm.reset_pool_done": "Označeno {n} otázek jako resetovaných.",
    "confirm.no_resets": "Žádné reset značky k smazání.",
    "confirm.clear_resets": "Smazat {n} reset značek? Staré odpovědi se znovu započítají do statistiky výběru.",
    "confirm.logout": "Odhlásit? Postup je uložený na serveru — můžeš se přihlásit kdykoliv zpátky.",
    "confirm.unlock_personal": "Hint: \"{hint}\"\n\nZadej heslo pro odemčení osobních otázek:",
    "confirm.unlocked": "🔓 Odemčeno.",
    "confirm.wrong_password": "Špatné heslo.",
  },
};

let currentLang = "en";

// Inline SVG flags for the language toggle. Showing the flag of the OTHER
// language (the one you'll switch to on click) — same as the text label.
const FLAG_CS_SVG = '<svg viewBox="0 0 6 4" aria-hidden="true"><rect width="6" height="2" fill="#fff"/><rect y="2" width="6" height="2" fill="#d7141a"/><polygon points="0,0 3,2 0,4" fill="#11457e"/></svg>';
const FLAG_GB_SVG = '<svg viewBox="0 0 60 30" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2"/><path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10"/><path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6"/></svg>';

function langButtonHTML(lang) {
  // Show the flag + label of the language that clicking will switch TO.
  if (lang === "cs") return `${FLAG_GB_SVG}<span>EN</span>`; // currently CS, click → EN
  return `${FLAG_CS_SVG}<span>CS</span>`; // currently EN, click → CS
}

function getCurrentLang() {
  try { return localStorage.getItem("ssi.language") || "en"; }
  catch { return "en"; }
}

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem("ssi.language", lang); } catch {}
  applyTranslations();
  // Update visible button (flag + label)
  const btn = document.getElementById("btn-lang");
  if (btn) btn.innerHTML = langButtonHTML(lang);
  // Footer version line is rendered via JS (not data-i18n), re-translate it
  if (typeof renderFooterVersion === "function") renderFooterVersion();
  // If app is fully booted, reload questions in chosen language
  if (typeof state !== "undefined" && state.questions && state.questions.length) {
    loadQuestions().then(() => {
      buildSubareaIndex();
      buildMssiSectionIndex();
      refreshStats();
      // Re-render current quiz card if visible
      const quizVisible = !document.querySelector("#quiz-screen").classList.contains("hidden");
      if (quizVisible && state.current) {
        const fresh = state.questions.find((q) => q.id === state.current.id);
        if (fresh) renderQuestion(fresh);
      }
    });
  }
}

function t(key, fallback) {
  const dict = I18N[currentLang] || I18N.en;
  if (dict[key] != null) return dict[key];
  // Fallback to EN dictionary if missing in current language
  if (currentLang !== "en" && I18N.en[key] != null) return I18N.en[key];
  return fallback != null ? fallback : key;
}

function tFmt(key, params) {
  let s = t(key);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.replace(new RegExp("\\{" + k + "\\}", "g"), String(v));
    }
  }
  return s;
}

function applyTranslations() {
  // Text content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key, el.textContent);
  });
  // Attributes — format: data-i18n-attr="placeholder:login.username_placeholder"
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const spec = el.dataset.i18nAttr;
    const colonIdx = spec.indexOf(":");
    if (colonIdx === -1) return;
    const attr = spec.slice(0, colonIdx);
    const key = spec.slice(colonIdx + 1);
    el.setAttribute(attr, t(key));
  });
  // HTML content (for entries with inner spans etc.)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    el.innerHTML = t(key, el.innerHTML);
  });
}

function initLang() {
  currentLang = getCurrentLang();
  applyTranslations();
  const btn = document.getElementById("btn-lang");
  if (btn) {
    btn.innerHTML = langButtonHTML(currentLang);
    btn.addEventListener("click", () => setLang(currentLang === "cs" ? "en" : "cs"));
  }
}

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

const AREA_LABELS_EN = {
  open_water_diver: "Open Water Diver",
  science_of_diving: "Science of Diving",
  diver_stress_rescue: "Diver Stress & Rescue",
  react_right: "React Right",
  divemaster: "Divemaster / Dive Guide",
  assistant_instructor: "Assistant Instructor",
  instructor: "Instructor",
};

// Proxy that translates on access AND iterates correctly via Object.keys/entries.
// Target = AREA_LABELS_EN, so own keys/has work; get + getOwnPropertyDescriptor
// route through t() so iteration sees translated values.
const AREA_LABELS = new Proxy(AREA_LABELS_EN, {
  get(target, key) {
    if (typeof key !== "string" || !(key in target)) return target[key];
    return t("area." + key, target[key]);
  },
  getOwnPropertyDescriptor(target, key) {
    if (!(key in target)) return undefined;
    return {
      enumerable: true,
      configurable: true,
      writable: false,
      value: t("area." + key, target[key]),
    };
  },
});

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

// Storage/filter keys ALWAYS use English (canonical) so filter selection
// migrates across language switches. Display helpers below translate for UI.
function subareaGroup(q) {
  const s = q?.subarea || "";
  const parts = s.split(/ — | - |:/);
  return (parts[0] || "(uncategorized)").trim();
}

// Translation table for the 14 top-level subarea groups. Right side of the
// em-dash (subtopic) stays in English — translating all 454 unique subareas
// would bloat without much UX gain.
const SUBAREA_GROUPS_CS = {
  "AI Standards": "Standardy AI",
  "AIT": "AIT",
  "DM Role": "Role DM",
  "DM Standards": "Standardy DM",
  "Decompression Theory": "Teorie dekomprese",
  "Dive Guide Exam": "Dive Guide zkouška",
  "Environment": "Prostředí",
  "Equipment": "Vybavení",
  "ITC": "ITC",
  "Methodology": "Metodika",
  "OWD Exam": "OWD zkouška",
  "Physics": "Fyzika",
  "Physics & Chemistry": "Fyzika a chemie",
  "Physiology": "Fyziologie",
  "Professional Standards": "Profesní standardy",
  "Programs": "Programy",
  "React Right Exam": "React Right zkouška",
  "S&R Exam": "Stress & Rescue zkouška",
  "SoD Exam": "SoD zkouška",
  "Standards": "Standardy",
  "(uncategorized)": "(bez kategorie)",
};

function subareaGroupDisplay(group) {
  if (currentLang === "cs" && SUBAREA_GROUPS_CS[group]) return SUBAREA_GROUPS_CS[group];
  return group;
}

// Translate the group prefix of a full "Group — Subtopic" subarea string.
function subareaDisplay(s) {
  if (!s) return "";
  if (currentLang !== "cs") return s;
  // Match the same delimiter set as subareaGroup()
  const m = s.match(/^([^—\-:]+?)( — | - |:)(.*)$/);
  if (!m) return SUBAREA_GROUPS_CS[s.trim()] || s;
  const group = m[1].trim();
  const cs = SUBAREA_GROUPS_CS[group];
  if (!cs) return s;
  return `${cs}${m[2]}${m[3]}`;
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
function sourceLabel(k) {
  return t("browse.src." + k);
}

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
  // If language=cs, prefer questions.cs.json (translated bank); fall back to English on error.
  const paths = currentLang === "cs"
    ? ["data/questions.cs.json", "data/questions.json", "data/questions.seed.json"]
    : ["data/questions.json", "data/questions.seed.json"];
  for (const path of paths) {
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
  $("#q-subarea").textContent = subareaDisplay(q.subarea || "");
  const srcEl = $("#q-source");
  const k = sourceTypeKey(q);
  if (k === "personal") {
    srcEl.textContent = t("quiz.badge_personal");
    srcEl.className = "badge badge-personal";
    srcEl.title = q.source;
  } else if (k === "mssi") {
    srcEl.textContent = t("quiz.badge_mssi");
    srcEl.className = "badge badge-mssi";
    srcEl.title = q.source;
  } else if (k === "web") {
    srcEl.textContent = t("quiz.badge_web");
    srcEl.className = "badge badge-web";
    srcEl.title = q.source;
  } else {
    srcEl.textContent = t("quiz.badge_compiled");
    srcEl.className = "badge badge-compiled";
    srcEl.title = t("quiz.compiled_title");
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
  disputeBtn.textContent = state.disputed.has(q.id) ? t("quiz.dispute_active") : t("quiz.dispute");
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
  if (state.mastered100.has(q.id)) flags.push(`<span class="qs-flag flag-100">${t("quiz.flag_100")}</span>`);
  if (state.mastered50.has(q.id)) flags.push(`<span class="qs-flag flag-50">${t("quiz.flag_50")}</span>`);
  if (state.studyMore.has(q.id)) flags.push(`<span class="qs-flag flag-study">${t("quiz.study_flag")}</span>`);
  if (state.disputed.has(q.id)) flags.push(`<span class="qs-flag flag-disputed">${t("quiz.disputed")}</span>`);
  if (state.resetMarks[q.id]) flags.push(`<span class="qs-flag flag-reset">${t("quiz.flag_reset")}</span>`);

  const parts = [];
  if (seen === 0 && totalSeen === 0) {
    parts.push(`<span class="muted">${t("quiz.first_time")}</span>`);
  } else {
    const acc = seen ? Math.round((correct / seen) * 100) : null;
    let line = `${t("quiz.seen")} ${seen}${t("quiz.times")} — `;
    line += `<span class="ok">✓${correct}</span> · `;
    line += `<span class="bad">✗${wrong}</span>`;
    if (unknown) line += ` · <span class="warn">? ${unknown}</span>`;
    if (acc !== null) line += ` · <strong>${acc}%</strong>`;
    if (totalSeen > seen) line += ` <span class="muted">(+${totalSeen - seen} ${t("quiz.pre_reset_in_total")})</span>`;
    parts.push(line);
  }
  if (flags.length) parts.push(flags.join(" "));
  el.innerHTML = parts.join(" · ");
}

function syncStudyButton(q) {
  const sBtn = $("#btn-study-more");
  const on = state.studyMore.has(q.id);
  sBtn.classList.toggle("active", on);
  sBtn.textContent = on ? t("quiz.study_more_active") : t("quiz.study_more");
}

function renderFlagsRow() {
  const q = state.current;
  const flags = $("#q-flags");
  if (!q) { flags.innerHTML = ""; return; }
  const parts = [];
  if (state.mastered50.has(q.id)) parts.push(`<span>${t("quiz.from_review_pool")}</span>`);
  if (state.disputed.has(q.id)) parts.push(`<span class="flag-disputed">${t("quiz.disputed")}</span>`);
  if (state.studyMore.has(q.id)) parts.push(`<span class="flag-study">${t("quiz.study_flag")}</span>`);
  const k = sourceTypeKey(q);
  const srcLabel = k === "compiled"
    ? `<span>${t("quiz.source")} ${t("quiz.source_compiled")}</span>`
    : `<span>${t("quiz.source")} ${escapeHtml(q.source)}</span>`;
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
  const explanation = q.explanation || t("quiz.no_explanation");
  showFeedback(
    isCorrect ? "correct" : "wrong",
    `<strong>${isCorrect ? t("quiz.correct") : `${t("quiz.wrong_correct_is")} ${correctLabel}`}</strong>${explanation}`
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
    `<strong>${t("quiz.correct_answer")} ${q.correct.toUpperCase()}. ${correctText}</strong>${q.explanation || t("quiz.no_explanation")}`
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
  // Area chips (with "All" reset chip, like Browse)
  const areaWrap = $("#settings-areas");
  areaWrap.innerHTML = "";
  areaWrap.appendChild(chipEl("settings-all-areas", t("browse.all"), state.selectedAreas.size === 0, () => {
    state.selectedAreas.clear();
    state.selectedSubareas.clear(); // wider area selection invalidates narrower subarea picks
    saveAreas();
    saveSubareas();
    refreshStats();
    renderSettings();
  }));
  for (const [key, label] of Object.entries(AREA_LABELS)) {
    const count = (subareaIndex[key] || []).reduce((sum, g) => sum + g.count, 0);
    const chipLabel = count ? `${label} (${count})` : label;
    areaWrap.appendChild(chipEl(`settings-area-${key}`, chipLabel, state.selectedAreas.has(key), () => {
      if (state.selectedAreas.has(key)) state.selectedAreas.delete(key);
      else state.selectedAreas.add(key);
      saveAreas();
      refreshStats();
      renderSettings();
    }));
  }

  // Subarea chips — filtered by selected areas (or all if none), like Browse
  const subWrap = $("#settings-subareas");
  subWrap.innerHTML = "";
  subWrap.appendChild(chipEl("settings-all-subareas", t("browse.all"), state.selectedSubareas.size === 0, () => {
    state.selectedSubareas.clear();
    saveSubareas();
    refreshStats();
    renderSettings();
  }));
  const showAreas = state.selectedAreas.size ? [...state.selectedAreas] : Object.keys(AREA_LABELS);
  for (const areaKey of showAreas) {
    const groups = subareaIndex[areaKey] || [];
    for (const { group, count } of groups) {
      const k = subareaKey(areaKey, group);
      subWrap.appendChild(chipEl(`settings-sub-${k}`, `${subareaGroupDisplay(group)} (${count})`, state.selectedSubareas.has(k), () => {
        if (state.selectedSubareas.has(k)) state.selectedSubareas.delete(k);
        else state.selectedSubareas.add(k);
        saveSubareas();
        refreshStats();
        renderSettings();
      }));
    }
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
      statusEl.textContent = t("settings.personal_unlocked");
      toggleBtn.textContent = t("settings.lock_again");
    } else {
      statusEl.textContent = t("settings.personal_locked");
      toggleBtn.textContent = t("settings.unlock");
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
    if (!confirm(tFmt("confirm.reset_100", { n: state.mastered100.size }))) return;
    state.mastered100 = new Set(); saveMastered100(); renderSettings(); refreshStats();
  });
  $("#btn-reset-50").addEventListener("click", () => {
    if (!confirm(tFmt("confirm.reset_50", { n: state.mastered50.size }))) return;
    state.mastered50 = new Set(); saveMastered50(); renderSettings(); refreshStats();
  });
  $("#btn-reset-all-confidence").addEventListener("click", () => {
    const total = state.mastered100.size + state.mastered50.size;
    if (!confirm(tFmt("confirm.reset_both", { n: total }))) return;
    state.mastered100 = new Set(); state.mastered50 = new Set();
    saveMastered100(); saveMastered50(); renderSettings(); refreshStats();
  });
  $("#btn-clear-disputed").addEventListener("click", () => {
    if (!confirm(tFmt("confirm.clear_disputed", { n: state.disputed.size }))) return;
    state.disputed = new Set(); saveDisputed(); renderSettings(); refreshStats();
  });
  $("#btn-clear-study").addEventListener("click", () => {
    if (!confirm(tFmt("confirm.clear_study", { n: state.studyMore.size }))) return;
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
      alert(t("confirm.reset_pool_no_data"));
      return;
    }
    if (!confirm(tFmt("confirm.reset_pool", { n: seenIds.size }))) return;
    const now = new Date().toISOString();
    seenIds.forEach((qid) => { state.resetMarks[qid] = now; });
    saveResetMarks();
    renderSettings();
    refreshStats();
    alert(tFmt("confirm.reset_pool_done", { n: seenIds.size }));
  });
  $("#btn-clear-resets").addEventListener("click", () => {
    const n = Object.keys(state.resetMarks).length;
    if (!n) { alert(t("confirm.no_resets")); return; }
    if (!confirm(tFmt("confirm.clear_resets", { n }))) return;
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
      const ans = prompt(tFmt("confirm.unlock_personal", { hint: PERSONAL_HINT }));
      if (ans === null) return; // cancelled
      if (ans === PERSONAL_PASSWORD) {
        localStorage.setItem("ssi.personalUnlocked", "1"); scheduleStateSync();
        renderSettings();
        refreshStats();
        alert(t("confirm.unlocked"));
      } else {
        alert(t("confirm.wrong_password"));
      }
    }
  });
  $("#btn-clear-log").addEventListener("click", () => {
    if (!confirm(tFmt("confirm.clear_log", { n: state.log.length }))) return;
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
    case "correct": return t("log.result.correct");
    case "wrong": return t("log.result.wrong");
    case "unknown": return t("log.result.unknown");
    case "mastered_100": return t("log.result.mastered_100");
    case "mastered_50": return t("log.result.mastered_50");
    case "disputed": return t("log.result.disputed");
    case "dispute_clear": return t("log.result.dispute_clear");
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
    const qText = q ? q.question : `${t("log.question_removed")} ${e.qid})`;
    const stype = q ? sourceTypeKey(q) : null;
    const sourceBadge = q ? (
      stype === "personal" ? `<span class="badge badge-personal">${t("browse.badge.personal")}</span>` :
      stype === "mssi" ? `<span class="badge badge-mssi">${t("browse.badge.mssi")}</span>` :
      stype === "web" ? `<span class="badge badge-web">${t("browse.badge.web")}</span>` :
      `<span class="badge badge-compiled">${t("browse.badge.compiled")}</span>`
    ) : "";
    const resultClass = `result-${e.result.replace(/_/g, "-")}`;
    const resultText = resultLabel(e.result) + (e.chosen ? ` (${e.chosen.toUpperCase()})` : "");
    tr.dataset.qid = e.qid;
    tr.classList.add("log-row");
    tr.innerHTML = `
      <td class="log-time">${time}</td>
      <td class="log-qid"><code>${e.qid}</code></td>
      <td class="log-area">${area}<br><span class="muted" style="font-size:.78rem">${escapeHtml(subareaDisplay(subarea))}</span></td>
      <td class="log-source">${sourceBadge}</td>
      <td class="log-text">${escapeHtml(qText)}</td>
      <td class="${resultClass}">${resultText}</td>`;
    if (q) {
      tr.title = t("log.click_to_open");
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
      <td>${t("dash.row_total")}</td>
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
    dlist.innerHTML = `<p class="muted">${t("dash.disputed_none")}</p>`;
  } else {
    const rows = [...v.disputed].map((id) => {
      const q = state.questions.find((x) => x.id === id);
      if (!q) return `<li>${id} <span class="muted">${t("dash.q_not_found")}</span></li>`;
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
    opt.value = me; opt.textContent = `${me} ${t("dash.user_me_suffix")}`;
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
    if (viewing) viewing.textContent = t("dash.viewing_your");
    renderDashboard();
    return;
  }
  if (viewing) viewing.textContent = t("dash.viewing_loading");
  const payload = await apiGetStateForUser(user);
  const vs = viewStateFromPayload(payload);
  if (!vs) {
    if (viewing) viewing.textContent = t("dash.viewing_failed");
    return;
  }
  if (viewing) viewing.textContent = tFmt("dash.viewing", { user });
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

function getStatusChips() {
  return [
    { key: "unanswered", label: t("browse.status.unanswered"), cls: "" },
    { key: "answered",   label: t("browse.status.answered"),   cls: "" },
    { key: "correct",    label: t("browse.status.last_correct"), cls: "status-correct" },
    { key: "wrong",      label: t("browse.status.last_wrong"),   cls: "status-wrong" },
    { key: "100",        label: "100%",       cls: "status-100" },
    { key: "50",         label: "~50%",       cls: "status-50" },
    { key: "disputed",   label: t("browse.status.disputed"),   cls: "status-disputed" },
    { key: "study",      label: t("browse.status.study"),      cls: "status-study" },
  ];
}

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
  const allAreaChip = chipEl("all-areas", t("browse.all"), browseFilters.areas.size === 0, () => {
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
  subWrap.appendChild(chipEl("all-subareas", t("browse.all"), browseFilters.subareas.size === 0, () => {
    browseFilters.subareas.clear(); renderBrowse();
  }));
  const showAreas = browseFilters.areas.size ? [...browseFilters.areas] : Object.keys(AREA_LABELS);
  for (const areaKey of showAreas) {
    const groups = subareaIndex[areaKey] || [];
    for (const { group, count } of groups) {
      const k = subareaKey(areaKey, group);
      const chip = chipEl(`sub-${k}`, `${subareaGroupDisplay(group)} (${count})`, browseFilters.subareas.has(k), () => {
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
  srcWrap.appendChild(chipEl("all-src", t("browse.all"), browseFilters.sources.size === 0, () => {
    browseFilters.sources.clear(); renderBrowse();
  }));
  for (const k of sourceKeysVisible()) {
    const chip = chipEl(`src-${k}`, sourceLabel(k), browseFilters.sources.has(k), () => {
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
    mssiWrap.appendChild(chipEl("all-mssi-section", t("browse.all"), browseFilters.mssiSections.size === 0, () => {
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
  stWrap.appendChild(chipEl("all-status", t("browse.all"), browseFilters.statuses.size === 0, () => {
    browseFilters.statuses.clear(); renderBrowse();
  }));
  for (const c of getStatusChips()) {
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

  $("#browse-count").textContent = `${items.length} ${t("browse.count_of")} ${state.questions.length}`;

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
  if (stype === "personal") badges.push(`<span class="badge badge-personal" title="${escapeHtml(q.source)}">${t("browse.badge.personal")}</span>`);
  else if (stype === "mssi") badges.push(`<span class="badge badge-mssi" title="${escapeHtml(q.source)}">${t("browse.badge.mssi")}</span>`);
  else if (stype === "web") badges.push(`<span class="badge badge-web" title="${escapeHtml(q.source)}">${t("browse.badge.web")}</span>`);
  else badges.push(`<span class="badge badge-compiled" title="${t("browse.compiled_title")}">${t("browse.badge.compiled")}</span>`);
  if (state.mastered100.has(q.id)) badges.push(`<span class="badge badge-100">${t("browse.badge.100")}</span>`);
  if (state.mastered50.has(q.id)) badges.push(`<span class="badge badge-50">${t("browse.badge.50")}</span>`);
  if (state.disputed.has(q.id)) badges.push(`<span class="badge badge-disputed">${t("browse.badge.disputed")}</span>`);
  if (state.studyMore.has(q.id)) badges.push(`<span class="badge badge-study">${t("browse.badge.study")}</span>`);
  if (s) {
    if (s.lastResult === "correct") badges.push(`<span class="badge badge-correct">${t("browse.badge.last_correct")}</span>`);
    else if (s.lastResult === "wrong") badges.push(`<span class="badge badge-wrong">${t("browse.badge.last_wrong")}</span>`);
    else if (s.lastResult === "unknown") badges.push(`<span class="badge badge-wrong">${t("browse.badge.last_unknown")}</span>`);
  } else {
    badges.push(`<span class="badge badge-unanswered">${t("browse.badge.unanswered")}</span>`);
  }
  const acc = s?.attempts ? `${Math.round((s.correct / s.attempts) * 100)}% (${s.correct}/${s.attempts})` : "—";

  wrap.innerHTML = `
    <div class="head">
      <span class="qid">${q.id}</span>
      <span class="area">${AREA_LABELS[q.area] || q.area}</span>
      <span class="muted" style="font-size:.78rem">· ${escapeHtml(subareaDisplay(q.subarea || ""))}</span>
    </div>
    <div class="qtext">${escapeHtml(q.question)}</div>
    <div class="meta">
      ${badges.join(" ")}
      <span>· ${t("browse.accuracy")} ${acc}</span>
      ${s?.lastTs ? `<span>· ${t("browse.last_seen")} ${new Date(s.lastTs).toLocaleString()}</span>` : ""}
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
      <div class="explanation"><strong>${t("browse.detail.explanation")}</strong> ${escapeHtml(q.explanation || t("browse.detail.none"))}</div>
      <div class="muted" style="font-size:.82rem;margin-top:.5rem"><strong>${t("browse.detail.source")}</strong> ${escapeHtml(q.source || t("browse.detail.none"))}</div>
      <div class="actions-row">
        <button data-act="toggle-100">${state.mastered100.has(q.id) ? t("browse.detail.btn_unmark_100") : t("browse.detail.btn_mark_100")}</button>
        <button data-act="toggle-50">${state.mastered50.has(q.id) ? t("browse.detail.btn_unmark_50") : t("browse.detail.btn_mark_50")}</button>
        <button data-act="toggle-dispute">${state.disputed.has(q.id) ? t("browse.detail.btn_clear_dispute") : t("browse.detail.btn_mark_dispute")}</button>
        <button data-act="toggle-study">${state.studyMore.has(q.id) ? t("browse.detail.btn_clear_study") : t("browse.detail.btn_study")}</button>
        <button data-act="drill" class="primary">${t("browse.detail.btn_drill")}</button>
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

// Map known server-side EN error messages to i18n keys for client-side translation.
const LOGIN_ERROR_MAP = {
  "username must be 2-32 chars, a-z 0-9 . _ -": "login.err.username_format",
  "username already taken": "login.err.username_taken",
  "no such user": "login.err.no_user",
  "wrong password": "login.err.wrong_password",
};

function translateLoginError(msg) {
  if (!msg) return "";
  const key = LOGIN_ERROR_MAP[msg.toLowerCase().trim()];
  return key ? t(key) : msg;
}

function showLoginError(msg) {
  const el = $("#login-error");
  if (el) el.textContent = translateLoginError(msg);
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
  // Pull this user's state from cloud, refresh, transition to home
  await loadStateForCurrentUser();
  loadState();
  buildSubareaIndex();
  buildMssiSectionIndex();
  refreshUserPill();
  renderFooterVersion();
  refreshStats();
  renderHome();
  show("home-screen");
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
    if (!confirm(t("confirm.logout"))) return;
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
  renderFooterVersion();
    show("login-screen");
  });
}

// ───────── Footer version (commit + build date from /version.json) ─────────

async function renderFooterVersion() {
  const el = $("#footer-version");
  if (!el) return;
  try {
    const res = await fetch("/version.json", { cache: "no-store" });
    if (!res.ok) throw new Error("no version.json");
    const v = await res.json();
    const date = (v.built_at || "").replace("T", " ").replace(/:\d\d\+.*$/, "").replace(/Z$/, " UTC");
    el.textContent = tFmt("footer.version", { commit: v.commit || "?", date });
  } catch {
    // Local dev (serve.py) doesn't expose version.json — show a friendly marker
    el.textContent = t("footer.local");
  }
}

// ───────── Home / Help ─────────

function initHome() {
  const brand = $("#btn-home");
  if (brand) {
    brand.addEventListener("click", () => { renderHome(); show("home-screen"); });
  }
  // Wire up the 4 navigation cards
  document.querySelectorAll(".home-card").forEach((card) => {
    card.addEventListener("click", () => {
      const dest = card.dataset.go;
      if (dest === "drill") {
        // Same logic as initial boot path
        if (state.selectedAreas.size > 0) next();
        else show("setup-screen");
      } else if (dest === "browse") {
        renderBrowse(); show("browse-screen");
      } else if (dest === "dashboard") {
        // Mirror what btn-dashboard does
        $("#btn-dashboard").click();
      } else if (dest === "help") {
        show("help-screen");
      }
    });
  });
}

function renderHome() {
  // Mini progress section: per-area bars + summary line
  const section = $("#home-progress-section");
  const bars = $("#home-progress-bars");
  const summary = $("#home-progress-summary");
  if (!section || !bars) return;

  const stats = computeAreaStats();
  let totalSeen = 0, totalQ = 0, totalAttempts = 0, totalCorrect = 0, totalM100 = 0, totalM50 = 0;
  for (const s of Object.values(stats)) {
    totalSeen += s.seen.size;
    totalQ += s.total;
    totalAttempts += s.attempts;
    totalCorrect += s.correct;
    totalM100 += s.m100;
    totalM50 += s.m50;
  }
  if (totalAttempts === 0) {
    section.classList.remove("hidden");
    bars.innerHTML = "";
    summary.textContent = t("home.progress.empty");
    return;
  }
  section.classList.remove("hidden");

  bars.innerHTML = "";
  for (const [key, label] of Object.entries(AREA_LABELS)) {
    const s = stats[key];
    if (!s || !s.total) continue;
    const masteredPct = Math.round((s.m100 / s.total) * 100);
    const accPct = s.attempts ? Math.round((s.correct / s.attempts) * 100) : null;
    const accClass = accPct === null ? "muted" : accPct >= 80 ? "good" : accPct < 60 ? "bad" : "";
    const accText = accPct === null ? "—" : `${accPct}%`;
    const row = document.createElement("div");
    row.className = "home-progress-bar";
    row.innerHTML = `
      <div class="hp-label">${escapeHtml(label)}</div>
      <div class="bar"><div class="fill" style="width:${masteredPct}%"></div></div>
      <div class="hp-meta"><strong>${s.m100}</strong>/${s.total} · <span class="${accClass}">${accText}</span></div>
    `;
    bars.appendChild(row);
  }

  const overallAcc = totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  summary.textContent = tFmt("home.progress.summary", {
    seen: totalSeen, total: totalQ, acc: overallAcc, m100: totalM100, m50: totalM50,
  });
}

function initHelp() {
  const btn = $("#btn-help");
  if (btn) btn.addEventListener("click", () => show("help-screen"));
  const back = $("#btn-back-from-help");
  if (back) back.addEventListener("click", () => { renderHome(); show("home-screen"); });
}

// ───────── Boot ─────────

async function boot() {
  initLang(); // apply translations to static HTML before anything else
  const cloud = await hasCloudApi();
  if (cloud) {
    // Cloud mode: must be logged in
    const user = getCurrentUser();
    if (!user) {
      // Show login first; load questions in parallel
      try { const path = await loadQuestions(); buildSubareaIndex(); buildMssiSectionIndex(); console.log("Loaded", path); }
      catch (e) { console.error("Question load failed", e); }
      initSetup(); initSettings(); initLog(); initDashboard(); initBrowse(); initQuiz(); initTheme(); initLogin(); initLogout(); initHome(); initHelp();
      refreshUserPill();
  renderFooterVersion();
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
  initHome();
  initHelp();
  refreshUserPill();
  renderFooterVersion();

  refreshStats();
  // Always land on home — discoverable nav. User clicks "Start drilling" card to enter quiz.
  renderHome();
  show("home-screen");
}

boot();
