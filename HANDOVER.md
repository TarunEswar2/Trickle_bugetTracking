# Trickle — handover

## v20.1 (10 Oct): weeks stepper (+/−) or calendar instead of the dropdown; plan screen in numbered blocks with one result card; more spacing on Home; plain tips (V20-13…15). Known issue, not fixed (model, pre-existing): right after adding money mid-week, Home can show a tiny amount left (e.g. ₹5 of ₹1,092), because this week only gets its share for the days left minus what was already spent. Needs a decision from Tarun.

## v20 (10 Oct): answers the first recorded 3-person test (of v19). Read `docs/claude/v20_user_test_report.md` first: findings, 7 root causes, what changed, and a 5-task test script with pass rules. Published at https://claude.ai/artifact/4T34qefkun2MSadzJm5nmX. Build in `archive/session-workfiles/mockup20/` (`ui20.js` + last CSS block in `shell.html`); decisions V20-1…12; screenshots in `docs/claude/v20_screens/`. Not redesigned: home-screen widget, goals, settings, insight detail screens. Next: run the 5-task test on v20 with 5 people, one row per person.

## v19.5 (10 Oct): centre + removed, gear top right and two snapped buttons back (V19-17). Hero v19.4 and no category icons kept. The + sheet code (SHEETS.plus19, H.plus19) is still in ui19.js but unused.

## v19.4 (10 Oct): hero rebuilt without repeated numbers or the status pill, 7 day-dots; category icons removed (V19-14…16). Open: whether colour alone says "fast" to students. The home-screen widget still has the pill.

## v19.3 (10 Oct): centre + button in the tab bar (Log expense, Add money, Move money), Settings in the tab bar, category emoji icons (V19-10…13). Tests updated to open the + sheet. Emoji look differs by phone; icon mapping is by name keywords only.

## v19 update (10 Oct): gradients removed at Tarun's request; flat v17 palette back, v19 structure kept (V19-9).

## v19 (10 Oct): style revamp from three references, fork in `archive/session-workfiles/mockup19/` (V19-1…8). New CSS block at the end of `shell.html`, `ui19.js` (tiles, donut), pastel palette in `ui_a.js`/`engine.js`. Tests pass. Not checked: colour contrast of pastel on dark, the other screens beyond Home, Spending, Savings and Add money. Gradient hero may clash with the earlier "remove the gradient" instruction.

## v18 (10 Oct): fork in `archive/session-workfiles/mockup18/` (`python3 build.py`). One split bar, split + duration on one screen with dropdowns, icon tab bar, header gear, floating Log expense default, indigo savings. V18-1…8, research in `docs/claude/v18_research.md`. Tests in mockup18/tests pass (fuzz, panel, tips, scan5). Not yet done: stacked category pill, dismissible chips. Ask Tarun which apps the reviewer expected it to resemble.

## Skill removed (9 Oct): Tarun disliked it, so `.claude/skills/human-interfaces/` and the audit states file are deleted (still in git commit 825d5aa).

## v17.5 (9 Oct): visual language rolled back to v17.2, only glows and shadows removed (Tarun, V17-22). Features of v17.4 kept. The v17.3 restyle is in commit c9a19c5, the softer version in 825d5aa.

## v17.4 (9 Oct, later): Tarun said the colours and corners were too harsh, keep the rest. So v17.3 is back with softer colours and 10 to 12 px corners, plus: savings that need action (Home card, Savings tab card, goal then fund flow, emergency fund suggestion) and "Recommended: set a limit" under category names on Spending. V17-19…21. Code: `mockup17/ui17d.js`. The paragraph below about falling back is superseded.

## FALLBACK (9 Oct): Tarun rejected v17.3 ("nope fall back"). The mockup source is back at v17.2 (commit 1b49268). v17.3 visuals are kept in commit c9a19c5 and can be restored with `git checkout c9a19c5 -- archive/session-workfiles/mockup17`. Ask Tarun what he did not like before trying again. (The human-interfaces skill was removed on 9 Oct at Tarun's request.)

## (rejected) v17.3 (9 Oct): the 30 "looks vibecoded" tells removed; skill `.claude/skills/human-interfaces/` (V17-18)
Flat, no shadows, tight radii, one muted accent, no purple or rainbow, plain wordmark title, Privacy and Terms in Settings. Audit: see the skill. Palette now lives in `engine.js` (SPEND, SAVE, AMBER, PAL16) and the CSS variables at the end of `shell.html`.

## v17.2 (9 Oct): UPI linking retired (Tarun, V17-17)
No link step in onboarding, no "came in from" credits, no payment detection, no account linking in Settings. Code: `mockup17/ui17c.js` plus panel and test edits. The open question (1) below is closed.

## v17.1 (9 Oct, second round of feedback)
Home: swipeable insight and recommendation cards (tap opens the graph), Log expense plus Add money buttons. Tabs: Home, Spending, Savings (Money tab removed). Spending: compact categories, recent spends, subscriptions, limits. Month insight is a calendar. Time-of-day chart rebuilt. Widget logs a spend or adds money (amount, save %, duration). Decisions V17-9…V17-16, PROPOSED. Code: `mockup17/ui17b.js`. Tests pass; nothing tested with students.

## v17 (8 Oct, after the first user-testing reviews)
Reviews said: information architecture very bad, too many tabs, UX needs work, looks AI generated, sentences too complex (e.g. "even pace" should just be "Recommended"). Response: `archive/session-workfiles/mockup17/` (fork of v16.4; `python3 build.py`): 3 tabs (Home, Spending, Money); Home is one number, one bar, one row; flat plain look (one accent, no glow or gradients); short copy. Decisions V17-1…V17-6, all PROPOSED; "Recommended" label is Tarun's own words. Tests (fuzz, panel, tips) pass; not tested with students. Next: get tester details from Tarun, run a tree test on the new structure before more screen work. v16.4 stays as the build testers saw.

## START HERE (8 Oct 2026, v16.4 notes)
**Where it stands.** v16.4 mockup (https://claude.ai/artifact/4F7qgfEx3WGPLTJtycosDN, source `archive/session-workfiles/mockup16/`): one weekly allowance worked out from money in; every spend tagged with a category; optional limits per category or shop; allowance bar instead of the grid; timing insights (hour, weekday, part of month) each with a "Why this?" evidence sheet; heads-ups at the user's own busy times; savings as a growth story; the calmer design system (https://claude.ai/artifact/Ra1d8t1H3no2RSZ3uxtbn3); and the scan-and-hand-off pay flow with data kept on the device.
**Nothing has been tested with students and nothing about UPI has been tried on a phone.** The UPI claims in the docs come from web searches read at abstract level; the spike will replace them with measurements.
**Read in this order:** `CLAUDE.md` (CURRENT STATE at the end), `docs/claude/v16_spec.md`, the v16 sections at the end of `docs/claude/v14_decisions.md`, `docs/claude/upi_intent_helper.md`, `docs/claude/upi_spike_spec.md`, then `RESEARCH.md` Parts 0, 10, 13, 15.
**8 Oct, later:** Tarun reports the spike works for merchants (numbers not yet recorded: write `docs/claude/upi_spike_report.md`). New: payments inside Zomato-type apps cannot be captured automatically (V16-40, `upi_intent_helper.md`), a quick-log widget preview (V16-41) and subscriptions with an end (V16-42) are in the mockup for his review.
**Next step:** record the spike results; then (`docs/claude/upi_spike_spec.md`: Kotlin app, five screens, about 80 small real payments on 2 phones, report in `docs/claude/upi_spike_report.md`).
**Open questions for Tarun:** (1) retire "Link UPI", payment detection and the linked-balance split now that the helper replaces linkage? (2) shop tagging: his server idea or on-device rules, V16-39; (3) thresholds for heads-ups and limit suggestions (mine, `RESEARCH.md` 15.4); (4) whether Scan stays the only Home flow.
**Then:** Tests A (bar against grid), B (taps and seconds against paying directly), C (7-day diary) per `RESEARCH.md` 13.4 and 15.6; backup and restore for a local-only app; Figma update only on his word.
**Mockup tooling:** `python3 build.py` in `mockup16/`; tests and density in `mockup16/tests/README.md`; the side panel has profiles, time travel, the awareness events, and the Scan and platform switches.
**Habits that worked:** log every decision with status and evidence; check a citation before using it; say what is unverified; run density.js and the tests before publishing.

(Older notes follow. Where they disagree with this block, this block wins.)


Written 2 Oct 2026 at the end of the Cowork session that produced v3–v13 and started v14.
Read this top to bottom, then the four docs under "Read next". After that you can pick up
at "The exact next step".

## What Trickle is
A budgeting app for students, by Tarun (MDes project; first UX/app project, strong visual
design and coding background). Money comes in over UPI. The two facts everything rests on:

- Income splits into spending and savings.
- If you don't spend, you save more.

Tracking is **UPI account linkage or manual entry** (plus an Excel/CSV import placeholder).
There is **no SMS tracking of any kind** — this mistake was made repeatedly and Tarun
corrected it sharply. Never mention, simulate or imply SMS reading.

## Where the project stands
Versions v3 → v13 were built as clickable HTML prototypes. After v13 Tarun said the project
"has swayed far from the intended" and reset it. **v14 is a restart from facts**, not a
continuation of v13. Treat v3–v13 as a library of ideas and code, not as the design.

Why it drifted (from `docs/claude/project_master_synthesis.md`): no real user tests were
ever run; direction was taken from visual references; scope swung between versions; the
money unit changed five times; and in v13 Claude made all the decisions.

v14 so far:

| Stage | Status |
|---|---|
| Stage 0 — facts and 7 principles | Approved (`docs/claude/v14_stage0_facts.md`) |
| Tabs | Decided: Home · Income · Spending · Savings · Insights |
| Stage 2 — money representation, one visualisation at a time | In progress |
| Visualisation 1 — budget gauge | Decided (V1-1 … V1-8 in the decisions log) |
| Visualisation 2 — pay / friction | Decided (V2-1 … V2-5): paid boxes fade out in order, dashed-outline ghost |
| Visualisation 3 — income split | Decided (V3-1 … V3-11): one grid, bands, savings at the bottom, gap, drop-down labels, scale chip |
| Visualisation 4 — savings goals | Decided (V4-1 … V4-21): full segmented ring split by goal, text rows, By month / By day, celebration |
| Visualisation 5 — unspent → saved | Decided (V5-1 … V5-10): weekly Home pop-up, amber → green, goals or next week's budget, top-filled overspent weeks |
| Visualisation 6 — repeat purchases | Decided (V6-1, V6-2, V6-4, V6-5): habit list with ×counts, calendar hotspots by day / week / month, Times / ₹ |
| Visualisation 7 — time patterns | Decided (V7-1, V7-2, X-1): all spending by time of day in Insights, hotspot grids, plain sentence |
| Visualisation 8 — fixed bills coming up | Decided (V8-1…V8-4): Fixed calendar in Spending, glow = status, list with amounts |
| Visualisation 9 — this week vs last | Decided (V9-1…V9-3): Insights, two grids side by side with last week faded, by category on tap |
| Visualisation 10 — transaction history | Decided (V10-1…V10-3): day-grouped list, filter chips, name/amount/time rows |
| Visualisation 11 — exact amounts on tap | Decided (V11-1 … V11-3); board published, 5 defaults unconfirmed |
| Onboarding | Done (O-1…O-28) |
| Flows (pay, move money; the rest delegated) | Done; whole-app blueprint published |
| Visualisation → mockup → identity → v14 build → user tests | Next |

## How Tarun wants to work (this matters more than anything else here)
- **He makes every decision; every flow runs through him.** Draw options, explain the
  trade-off in plain words, recommend one, ask. Do not decide for him and do not build ahead.
- **One visualisation / widget at a time.** He sends pictures or inspiration first. Then
  options are drawn, he chooses, the choice is logged, and only then the next one starts.
- **Draw every option across a pool of students**, never one seed with five fixed
  categories ("this is making the project so tunnel-visioned"). Pool: the six interviewee
  types (Tarun, Nishad, Yash, Gautham, Harsh, Vaishak), income ₹3k–25k, 2–20+ user-made
  categories, weekly vs monthly money, month 1 vs month 6.
- **One visualisation per screen.** The user never sees two at once; the next is reached
  by scrolling.
- **Progressive disclosure.** Few numbers up front, exact amounts on tap. His words:
  "okay i can spend 6000, 600 for food, 500 for tea, all these numbers are too much".
- **Log every decision** in `docs/claude/v14_decisions.md` as soon as it is made.
- He writes fast and informally; read for intent. He engages best with the full
  complexity of the problem, not a stripped-down MVP.

## Decisions already made (do not reopen unless he does)
Full table: `docs/claude/v14_decisions.md`. In short:

- Home shows **this week**: one sentence plus ONE overall gauge, no ₹ and no big number
  ("₹200 left, you're doing badly" makes people close the app).
- **No coins or dots as a general money unit.** The "1 dot = ₹100" system is dead: it
  breaks when dots combine into lines and boxes, and without combining, big amounts
  can't be shown.
- Squares/circles are used **only to show loss** — at the pay/friction moment the amount
  being paid crumbles away.
- Categories are **fuel gauges**. Every kind of information gets its own representation.
- **Budget gauge (Viz 1):** always a 10×10 grid of rounded boxes, filled from the bottom
  like liquid. The liquid is money LEFT and drains as you spend. Budgets are set in ₹100
  steps so 1 box = budget ÷ 100 in whole rupees; the scale ("1 box = ₹X") is always shown,
  except on Home. Many categories → words-only list (plenty / low / empty) → tap opens that
  grid → swipe to the next. Gone over → empty grid, amber floor line, words, amount on tap,
  **no red**. Home gauge covers this week's share of the budget for everyone. Fixed bills
  (rent, EMI, subscriptions) are a separate "Fixed" group shown as paid / due soon, not
  gauges. No budget set → the app suggests one after 2 weeks; until then full = "your usual
  week".
- Two Viz 1 details were left on my recommendation, not explicitly chosen by him:
  box-by-box top edge, and last week's ghost line on tap. Confirm if they come up.

## Tried and rejected (do not bring back)
- SMS tracking / simulated SMS.
- v10 shape system (square ₹50, triangle ₹100, circle ₹1000, star ₹5000): "the shapes are
  not working for me".
- One circle = ₹100 throughout the app (v12/v13).
- Colour-coded categories: too hard to memorise once there are many.
- Coins, and the "coin + ×N" cluster idea.
- Time-based friction (pauses, countdowns). Friction comes from seeing the budget and a
  chunk leaving it.
- Games/streak gamification for retention. Savings is the motivator; reduce anxiety.
- Guilt, scolding, red warnings.
- Sankey on the Income screen (it may live in Insights).
- v11's stripped-down scope: "lost a lot of functionality".

Things he liked and may want to reuse: the tile visual identity, v10's aesthetic and its
green→amber transition, v7's range of data visualisations, sounds/motion from the v12 lab,
his own gradients in Figma.

## The exact next step
**The whole-app blueprint is published** (https://claude.ai/artifact/RVjueXaXCsmCKyF6UUEErj; source `archive/session-workfiles/blueprint/`, rebuild with `python3 build.py`). Tarun delegated the rest of the design: logic gaps and all remaining flows were closed as **D-1…D-36** (delegated, open to override) in the decisions log. Pay (F-1…F-7), move money (F-5) and onboarding (O-1…O-28) are his. Grey mockups are skipped. **Mockup published** (https://claude.ai/artifact/RuuvM1tyRSEj8fKvQrkLmZ, M-1…M-6; engine in `archive/session-workfiles/mockup/engine.js`, screens in `ui_*.js`, simulator in `panel.js`; `python3 build.py`). **Design system published** (Trickle Night, https://claude.ai/artifact/3vrR99iZ8rmzw51MeFRXde, DS-1…DS-10: tokens, gradients, components, motion, research refs; note cat/2 is now #CDB6FF). **Next: the visualisation stage** (compose each tab; see the blueprint's Next tab), then mockup, build, user tests. Expect him to review the blueprint and override some D-decisions: log each override as a new ID and update the blueprint data files (`data_screens.js`, `data_flows.js`, `data_model.js`).

After the queue (Tarun's v14 order): onboarding (`docs/claude/build_plan.md`, `docs/claude/screens_to_design.md`), grey wireframes per tab with one visualisation per screen, the flows (parked list below), identity, the v14 build, then real user tests (never run).

Carry-overs: V3-11 scale chip on every grid screen (the Viz 1 board still has the old small line); X-1 plain sentence under hotspots; parked flows: add a goal, pay toward a goal, pay from savings, celebration triggers, weekly pop-up timing, Home heads-up for fixed bills, a category row opening its look-back from the week-vs-last list, editing a transaction's category. Unanswered points are logged as defaults in the decisions file.

## Read next
1. `docs/claude/v14_decisions.md` — decision log and queue (authoritative).
2. `docs/claude/v14_stage0_facts.md` — facts, evidence per interviewee, the 7 principles.
3. `docs/claude/v14_viz1_budget_gauge.md` — how Viz 1 was reasoned; the template for the rest.
4. `docs/research/brymans_analysis_interviews.md` — the primary research.

Background when needed: `docs/claude/project_master_synthesis.md` (all earlier docs in one),
`docs/claude/secondary_research_report.md`, `docs/claude/v12_phase2c_money_viz_research.md`
(research on representing money: icon arrays, counts over percentages, ~20 countable marks,
equivalents, calm notifications).

## Where things are in this repo
| Path | Contents |
|---|---|
| `CLAUDE.md` | Short standing rules |
| `docs/claude/`, `docs/research/` | All 77 project docs |
| `archive/session-workfiles/viz1/budget-gauge.html` | The Viz 1 options board — use as the pattern for the Viz 2 board |
| `archive/session-workfiles/s2/` | v14 stage 2 boards and their generator scripts (`gen.py`, `gen2b.py`); coin test is superseded |
| `prototypes/v8`–`v13` | Prototype sources. `ledger.js`/`store.js`, `app.js`, `flows.js`/`screens*.js`, `motion.js`, `style.css`, assembled into one HTML by `build*.py` |
| `prototypes/v13/app/trickle-final-v13.html` | Latest full prototype (open with `#demo` to skip onboarding) |
| `archive/session-workfiles/trickle-final-v3…v12.html` | Earlier built prototypes |
| `references/inspiration/` | Images Tarun supplied. For Viz 1: `3ba011a7-image.png` (activity rings), `011d5f75-image.png` (waffle grids filled from the bottom) |

Prototype notes: seeds via `#demo&seed=lapse|monthend|bigincome|emptyjars|day1`; ledger
invariants are income = savings + budget, budget = subscriptions + categories, owed money
sits outside the balance; `validate12.js` / `validate13.js` run under Playwright and
include a check that the word "sms" appears nowhere.

Not in the repo unless Tarun added them: prototype screenshots and the v12 extras (older
board backups, halftone images). They were too large to hand over and are not needed.

## Links outside the repo
Published boards and prototypes (claude.ai artifacts, Tarun's account):

- v14 Viz 1 budget gauge board: https://claude.ai/artifact/AcKnP1FTzaAuGwsqiXWLgM
- v14 Stage 2 board: https://claude.ai/artifact/VYX5h82WLtxEyrgFtS2S1s
- Project synthesis: https://claude.ai/artifact/3JArW3g7QAZh8fnXE3Z4eT
- v13 prototype: https://claude.ai/artifact/7p8hkxT1Bucq76CySm5DEF
- v13 identity & design system: https://claude.ai/artifact/A5xYpgoLKZwngjH2uV36FT
- v12 prototype: https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr
- v12 decision board: https://claude.ai/artifact/7pWwnVcSLcG1RYB9WuwcYD
- v12 motion & sound lab: https://claude.ai/artifact/Ap3fww8xv5auAqFNtUE2Zf

Figma: Trickle-Explorations (file key `jaa1XnsKBLGcDLj5hYxpBr`) — Tarun's colour scheme,
gradients and sketches, plus a "v13 Design System" page. Lo-fi files: Lofi Budget App
(`ojbHyNY17bS8irUeSXTe4V`), Lofi-Budget-tracking-app-All-features (`lUbpu5hZhUqaud4xEwbthv`).

The same docs also live in the claude.ai Project "Student_Budget_Management". From now on
this repo is where new decisions are logged; the Project copy will go stale unless updated.

## Open points to keep in mind
- Whether a third-party app can actually read UPI transactions was never re-examined.
  It is assumed, with manual entry as the fallback.
- Split payments are only a placeholder (settling a split returns money to where it came from).
- The halftone gradient tiles Tarun asked for in Figma were never built.
- No user has tested any version. His own conversations with students are the only
  outside input since the six interviews.

## Update: Instrument design system
Second system "Trickle Instrument" built and published (`archive/session-workfiles/designsystem2/`, decisions DS2-1…DS2-6). Next: Tarun picks Night or Instrument; if Instrument, re-theme the mockup tokens (`mockup/`).

## Update: Instrument mockup
Mockup re-skinned in Instrument (`mockup2/`, build with `python3 build.py`). Not yet restyled one by one: sub-screens (category detail, settings, week-end, move flows) get the system through shared CSS only; check them in review.

## Update: full-flow mockup
Instrument mockup (`mockup2/`, `ui_d.js`) now has onboarding, lock, settings sub-screens, import and re-fit (M2-2). Open gaps: first-week proration, DETECT/LOOKBACK polish. Next: Tarun reviews; apply overrides to mockup and blueprint.

## Update: Night is the base (M2-3)
Night mockup (`mockup/`) now includes `ui_d.js`: onboarding, lock, settings sub-screens, import, re-fit. Open gaps: first-week proration. Next: Tarun reviews; apply overrides to mockup and blueprint.

## Update: Figma export
All Night-mockup screens are in Figma as editable layers, grouped by flow (86 frames, 13 sections): https://www.figma.com/design/b9MRkClYToyPjpMcDaPbeT . Tooling in `archive/session-workfiles/figma-export/`. Not yet componentised or auto-laid-out.

## Latest (bare-minimum mode)
Tarun's feedback: budget and balance must be optional; category tracking is the minimum; every question short; every step skippable (even the PIN). Logged as B-1…B-15 in `docs/claude/v14_decisions.md`. Built in the Night mockup (`archive/session-workfiles/mockup/`: `ui_d.js` onboarding rewrite, `ui_e.js` skippable pop-ups, `ui_f.js` track mode). Next: Tarun reviews; then update the blueprint (`archive/session-workfiles/blueprint/`) and re-export the changed screens to Figma.
Figma (https://www.figma.com/design/b9MRkClYToyPjpMcDaPbeT) was re-exported for B-9…B-15: new 01 Onboarding, 14 Pop-ups, 15 Track mode; other sections unchanged. Blueprint not yet updated.

## Latest (v15, 5 Oct 2026)
Reviews kept saying the app is hard to follow with too much on every screen. I audited all 116 v14 screens (avg 56 words, 12 taps, 21 taller than a phone,
Spending 7 phone-heights) and traced it to the information architecture: tabs mirrored the money model, every tab stacked visualisations, ~17 concepts were
exposed, onboarding ran up to 12 screens, and every review added something and nothing was ever removed.
v15 (fork in `archive/session-workfiles/mockup15/`, v14 untouched): three tabs for three questions, a density budget, onboarding of two questions,
plan = add income, Pay in three screens. Core 46 states average 21 words and 6 taps. Read `docs/claude/v15_audit.md` and `v15_spec.md`.
Next: Tarun reviews v15 and the four departures listed in the spec; student test of v15 vs v14 (nothing is tested yet); then Figma export of v15 if accepted.

## Latest (6 Oct 2026): RESEARCH.md
Tarun asked for a comprehensive record from v1 to v15 and a diagnosis of why the work is not reaching the desired outcome. It is `RESEARCH.md` at the repo root (12,000 words): primary and secondary research, a new search round, every version with scope and size, the decision register, the visualisation register, data requirements, research-to-feature traceability, the diagnosis, contradictions, and a three-week research plan.
Headline: no measurable outcome and no recorded test in 14 builds (informal showings did happen, mostly to design students, and said "too much information, what do I look at, I can't understand"; "lost functionality" is Tarun's own intuition, not a reviewer's; none of it was captured); the product drifted from awareness to budgeting (4 of 6 participants have no budget); every review was answered by adding; the build size is a sawtooth; the evidence is 6 interviews including the researcher. Also recovered the V2 and V3 sections that had been deleted from the decision log by accident (commit 836e0fe).
Next step: Tarun accepts or edits the outcome ladder (RESEARCH.md 1.3), v15 is frozen as the test build, then the feasibility spike and the five-student rounds (Part 10).

## Latest (6 Oct, later): RESEARCH.md expanded to about 5,400 lines
Tarun said the reviews are mostly *not constructive*: the questions are hard to understand, "what will a new user do", the grid is hard to understand, and maybe the visualisations are wrong. `RESEARCH.md` now has Part 11 (are the visualisations wrong: seven structural problems with the grid, alternatives, a decisive 5-second test) and Part 12 (a 40-row audit of the app's questions and the first-run sequence), plus appendices: feedback ledger, screen and copy inventories, build notes v2 to v13, the full interview coding, the v12 recovery audit, representation research, the secondary report, all decision logs, the master synthesis, research protocols, the engine spec, an inventory of the build, the git timeline, and ledgers of hypotheses and open questions.
The file is generated: edit `archive/session-workfiles/research-doc/main_new.md` and `parts/`, then run `python3 compose.py` there.
The v15 mockup has a side-panel switch "Home picture" (Grid, Bar, Days, Words) for 5-second tests.

## Latest (6 Oct 2026, later): v15.3 from the Architecture & Strategy Document
Tarun uploaded the document and asked for v15 to follow it. Applied in `archive/session-workfiles/mockup15/ui15x.js`: a weekly amount (wallet mode) instead of category budgets, a Tier 1 Home (hero number, gauge of 100 marks in 5 blocks of 20, one button), ghosted spent marks, a rollup for spends under 1%, plain wording (marks, Log expense, weekly amount), a Model B "Scan & pay" switch in the side panel. Decisions V15-21…V15-30 in `docs/claude/v14_decisions.md` are **PROPOSED**; Tarun confirms or overrides. RESEARCH.md has a new Part 13 (what the document says, how it fits the record, what was built, tests). **Feature freeze (V15-30):** next is Tests A, B, C (RESEARCH.md Part 13.4, Appendix P), not new screens. Open: whether Trickle can start a UPI payment (H2) is still unverified.

## Latest (7 Oct 2026): v16
Tarun set the spending model: income splits into saving and spending, a weekly allowance is worked out, every spend carries a category, the weekly statistic says which category took the most, and limits (per category or per shop, amount or times) are optional and come after a week or two. No pools, nothing is taken from other categories, categories are not the centre of the app. Built as **v16** in `archive/session-workfiles/mockup16/` (spec `docs/claude/v16_spec.md`, decisions V16-1…V16-14). New charts: gauge with leaving marks, stacked bar, weekday bars, shop tick strips, cumulative trend lines, 8-week bars, split bar. The feature freeze is lifted; Tests A, B and C should now be run on v16. Open: thresholds for limit suggestions (my guess), whether students understand where the allowance comes from, and whether Trickle can start a UPI payment (H2).

## Latest (7 Oct 2026, later): v16.1
Added timing insights (hour, weekday, part of the month), heads-ups at the user's own busy times, a daily guide, a weekly guess check, and a "Why this?" sheet on every insight with checked citations (RESEARCH.md Part 15). The 100-mark grid is retired in favour of an allowance bar that shows the allowance and what is left together (V16-17). Decisions V16-15…V16-23. Nothing is tested with students. Test A should compare this bar with the v15.3 grid. Open: the thresholds for "busy" (mine), and Cleveland & McGill and Olafsson & Pagel were not re-checked.

## Latest (7 Oct 2026, last): v16.2
Calmer visual system (mint, peach, amber, violet; Plus Jakarta Sans and Figtree; glass surfaces; settle, count and drain motion), a greeting on Home, and a savings redesign (12-month growth line, goal cards with notches, goal screen with monthly bars). Design system page "Trickle Night Calm" in `archive/session-workfiles/designsystem3/`. Decisions V16-24…V16-30. Figma is still at the v14 look; push it only on Tarun's word.

## Latest (7 Oct 2026, v16.3)
Scan-and-hand-off helper built in the mockup (V16-31…34): scan, pay in your own UPI app, say whether it went through; failed and unconfirmed states; Android only. Feasibility notes with what was and was not verified in `docs/claude/upi_intent_helper.md`. **Open question for Tarun:** retire "Link UPI" and payment detection in favour of this? **Next:** the real-phone spike.

## Latest (8 Oct 2026, v16.4)
Local-only data (V16-37, Tarun). Seamless scan flow (V16-38): amount only if the QR has none, then one combined screen with suggested category, the bar and notes, then UPI. On-device tagging chain (V16-39, **Tarun to choose**: his shop-and-tag server against local rules; reasoning in `docs/claude/upi_intent_helper.md`). Next: the real-phone spike, including how many QR codes carry `mc`; backup and restore design.
