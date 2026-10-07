# Trickle — working rules for Claude

Trickle is a UPI-based budgeting app for students, designed by Tarun (MDes project).
The project was reset in v14 to a facts-first, one-decision-at-a-time process.

## Read first, in this order
00. `RESEARCH.md` (repo root) — the whole record v1 to v15: research, decisions, data requirements, and why the work has not converged. Read Part 0 and Part 10 first.
0. `HANDOVER.md` — where the last session stopped and the exact next step.
1. `docs/claude/v14_decisions.md` — the authoritative decision log and the visualisation queue.
2. `docs/claude/v14_stage0_facts.md` — approved facts and the 7 principles.
3. `docs/research/brymans_analysis_interviews.md` — primary research (6 interviews).
4. `docs/claude/project_master_synthesis.md` — everything before v14 and why it drifted.

## Hard rules
- **No SMS tracking, anywhere.** Tracking is direct UPI account linkage or manual entry
  (plus an Excel/CSV import placeholder). Never mention or simulate SMS parsing.
- **Tarun makes every decision.** Draw options, ask, log the answer in
  `docs/claude/v14_decisions.md`, then move on. Do not decide on his behalf.
- **One visualisation at a time.** He supplies inspiration images at each step.
- **One visualisation per screen** — the next one is reached by scrolling.
- **Progressive disclosure.** Few numbers up front; exact amounts on tap.
- **Never design for one seed with five fixed categories.** Test every option across a
  pool of students (income ₹3k–25k, 2–20+ custom categories, month 1 vs month 6).
- **The user can always say no** (every question has an easy Skip) and **every question is short and plain** (one per screen, ~8 words, no jargon). Money-model inputs like balance and budget are optional; category tracking is the bare minimum (B-1…B-11).
- No coins/dots as a general money unit. Categories are fuel gauges (10×10 grid,
  liquid fill from the bottom). Squares/circles only for the pay/friction "crumble".

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
