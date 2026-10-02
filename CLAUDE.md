# Trickle — working rules for Claude

Trickle is a UPI-based budgeting app for students, designed by Tarun (MDes project).
The project was reset in v14 to a facts-first, one-decision-at-a-time process.

## Read first, in this order
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
Visualisation 5: unspent → saved (principle 6: what you don't spend becomes savings). Viz 1–4 are decided.
