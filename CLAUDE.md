# Trickle — working rules for Claude

Trickle is a UPI-based budgeting app for students, designed by Tarun (MDes project).
The project was reset in v14 to a facts-first, one-decision-at-a-time process.

## Read first, in this order
000. `docs/claude/v16_spec.md` and the v16 sections at the end of `docs/claude/v14_decisions.md` (V16-1…V16-39): the current model and every decision, with who made it and its status.
00. `RESEARCH.md` (repo root) — the whole record v1 to v15: research, decisions, data requirements, and why the work has not converged. Read Part 0 and Part 10 first.
0. `HANDOVER.md` — where the last session stopped and the exact next step.
1. `docs/claude/v14_decisions.md` — the authoritative decision log and the visualisation queue.
2. `docs/claude/v14_stage0_facts.md` — approved facts and the 7 principles.
3. `docs/research/brymans_analysis_interviews.md` — primary research (6 interviews).
4. `docs/claude/project_master_synthesis.md` — everything before v14 and why it drifted.

## Hard rules
- **No SMS tracking, anywhere.** Never mention or simulate SMS parsing. Tracking is manual entry
  and, since v16.3, a **scan-and-hand-off helper** (scan the shop QR in Trickle, pay in your own UPI app, V16-31/35/36).
  Direct UPI account linkage is retired (V17-17, Tarun, 9 Oct): Trickle never reads a bank or UPI account, and nothing is detected; money in is added by the user.
- **All data stays on the device** (V16-37). No analytics, no sync, no server that learns shops or spends.
  Tag shops on the device (V16-39 proposed). A shop-to-tag server was Tarun's idea; the privacy cost is in `docs/claude/upi_intent_helper.md`.
- **Tarun makes every decision.** Draw options, ask, log the answer in
  `docs/claude/v14_decisions.md`, then move on. Do not decide on his behalf.
- **One visualisation at a time.** He supplies inspiration images at each step.
- **One visualisation per screen** — the next one is reached by scrolling.
- **Progressive disclosure.** Few numbers up front; exact amounts on tap.
- **Never design for one seed with five fixed categories.** Test every option across a
  pool of students (income ₹3k–25k, 2–20+ custom categories, month 1 vs month 6).
- **The user can always say no** (every question has an easy Skip) and **every question is short and plain** (one per screen, ~8 words, no jargon). Money-model inputs like balance and budget are optional; category tracking is the bare minimum (B-1…B-11).
- No coins/dots as a general money unit. **The 10×10 grid is retired (V16-17, Tarun).** Home uses an allowance bar
  (green = what is left, tick = even pace); other pictures are in `docs/claude/v16_spec.md` and the design system page.
- **Only cite a study after checking it exists, and say what it does not cover** (RESEARCH.md Part 15).

## Where things are
- `docs/` — export of the claude.ai Project docs (specs, audits, decisions, research).
- `prototypes/v7`–`v13` — clickable HTML prototype sources. v8+ are modular JS assembled
  into one HTML by `build*.py`; `validate1x.js` runs with Playwright. Open the built
  HTML with `#demo` to skip onboarding.
- `archive/` — working files, early explorations, v14 boards, superseded builds.
- `references/inspiration/` — images Tarun supplied as visual references.

## Next up
Viz 1–11, onboarding and the pay / move-money flows are done. Tarun then delegated the rest: **the whole-app blueprint exists** (`archive/session-workfiles/blueprint/blueprint.html`, published; rebuild with `python3 build.py` in that folder). It holds the money model, 69 screens, 23 flows, rules, every decision, and the gaps closed. His own decisions are tagged Tarun; mine are **D-1…D-36 (delegated, open to override)** in `docs/claude/v14_decisions.md`. The grey-mockup stage is skipped. **The design system exists** (Trickle Night, https://claude.ai/artifact/3vrR99iZ8rmzw51MeFRXde, DS-1…DS-10; `archive/session-workfiles/designsystem/`). **The mockup exists** (https://claude.ai/artifact/RuuvM1tyRSEj8fKvQrkLmZ, M-1…M-6, `archive/session-workfiles/mockup/`): live ledger, six profiles, event simulator. Order now: Tarun reviews and overrides → fix the mockup and blueprint together → onboarding in the mockup → build → user tests. When he reviews the blueprint, log overrides as new IDs and update the blueprint.

Design systems: Night (`archive/session-workfiles/designsystem/`) and Instrument (`designsystem2/`, DS2-1…DS2-6, published). Tarun chooses; mockup still wears Night.

Instrument mockup: https://claude.ai/artifact/GMby4zaz4J8ZanziKiLBKM (`archive/session-workfiles/mockup2/`, M2-1). Night mockup stays as the other option.

Decision: Tarun chose Night as the base (M2-3). The Night mockup at https://claude.ai/artifact/F5iDLzVpmpKw8dSwUWkSU9 (new link; the old RuuvM1ty… link still shows the pre-flows version) now has the full flows; Instrument is kept as an alternate.

v15 (5 Oct 2026): audit in `docs/claude/v15_audit.md`, spec in `docs/claude/v15_spec.md`, build in `archive/session-workfiles/mockup15/` (v14 stays in `mockup/`). Reviews said screens carry too much; the cause was the information architecture. v15 = 3 tabs for 3 questions, a density budget (≤25 words, one hero, ≤4 taps per screen) checked by `archive/session-workfiles/audit/density.js`. Delegated (V15-1…V15-12), open to override. **Before adding anything to a screen, remove something or run density.js.**

**Current build (6 Oct): v15** https://claude.ai/artifact/XmxrV3ZoboyDBF52Hvc2GB (source `archive/session-workfiles/mockup15/`). The Night mockup link above is v14. Every build has been shown to people informally (that is how the flaws were found) but no structured, recorded test exists; per `RESEARCH.md` Part 10, harvest the past reviews, then no new features or decisions until the recorded student round is done.

**v15.3 (6 Oct):** changes from Tarun's Architecture & Strategy Document are in the same build (`mockup15/ui15x.js`, decisions V15-21…V15-30, all PROPOSED). Weekly amount instead of category budgets, Tier 1 Home, fixed 100-mark gauge. **Feature freeze until Tests A, B, C are run** (RESEARCH.md Part 13.4). Decision-log entries now need ID | domain | evidence | validation gate | status (PROPOSED until Tarun confirms).

**v16 (7 Oct):** Tarun's spending model is in `archive/session-workfiles/mockup16/` (spec `docs/claude/v16_spec.md`, decisions V16-1…V16-14). Income -> saving + weekly allowance; every spend has a category (a tag, not a pot); limits are optional, per category or shop, after a week or two; nothing is taken from other categories. **Current build is v16** https://claude.ai/artifact/4F7qgfEx3WGPLTJtycosDN; v15.3 stays in `mockup15/` for comparison. Tests A, B, C should run on v16.

**v16.1 (7 Oct, later):** the grid is retired (Tarun's decision); Home uses an allowance bar showing the weekly allowance and what is left; Insights has hour/day/month timing; heads-ups at the user's own busy times; every insight has a "Why this?" sheet with citations checked on 7 Oct (RESEARCH.md Part 15). Only cite a study after checking it exists, and say what it does not cover.

## CURRENT STATE (9 Oct 2026) — read this before the older notes above
- **UI rule (v17.3 visuals returned in v17.4 with softer colours and corners at Tarun's request):** before changing any visuals, read `.claude/skills/human-interfaces/SKILL.md` and run its audit (`archive/session-workfiles/mockup17/tests/antiai_states.js` is the Trickle states file). V17-18.
- **Newest build: v17** (`archive/session-workfiles/mockup17/`, 3 tabs, flat plain look, short copy; V17-1…6 PROPOSED; response to the first user-testing reviews; see HANDOVER.md). v16.4 below is the build testers saw.
- **Build:** v16.4, `archive/session-workfiles/mockup16/` (`python3 build.py` makes `mockup16.html`), published at https://claude.ai/artifact/4F7qgfEx3WGPLTJtycosDN. Tests in `mockup16/tests/` (see its README). v15.3 stays in `mockup15/` for the grid-against-bar comparison (Test A).
- **Design system:** "Trickle Night Calm", https://claude.ai/artifact/Ra1d8t1H3no2RSZ3uxtbn3, source `archive/session-workfiles/designsystem3/index.html`. The older Night and Instrument systems above are history.
- **Model (Tarun):** income splits into saving and a weekly allowance; every spend has a category as a tag; limits optional per category or shop; nothing is taken from other categories; categories are not the centre.
- **Pay flow (Tarun):** Log expense opens a QR scanner; amount only if the QR has none; one combined screen (category chips, bar, notes); Open UPI app; the spend is logged at hand-off; "Didn't pay? Remove" on the result screen. No result is read from the UPI app.
- **Status labels:** decisions are PROPOSED until Tarun confirms; Tarun's own words are CONFIRMED. Every new decision needs ID, domain, evidence, validation gate, status.
- **Open for Tarun:** Shop tagging: his server idea or on-device rules (V16-39)? Make Scan the default Home flow everywhere? Thresholds for heads-ups and limit suggestions (mine).
- **Next:** build and run the UPI spike (`docs/claude/upi_spike_spec.md`); then Tests A, B, C on v16 (RESEARCH.md Part 13.4 and Part 15.6); backup and restore design; Figma is still at the v14 look (push only when Tarun asks).
- **Do not:** claim anything is tested with students; claim UPI behaviour that the spike has not shown; add features before the spike and tests report.
