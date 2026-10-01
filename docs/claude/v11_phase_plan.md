# Trickle v11 — Phase Plan (draft, awaiting "start")

Inputs from Tarun (1 Oct): shapes (v10) don't work → need a very easily learnable tile system where the user knows what each tile is worth at a glance. Budget setting must be easy. Constraint: UPI linkage or manual entry, no SMS.

## Money model (confirmed by Tarun, 1 Oct)
- Income is split into Budget and Savings.
- Budget has categories; each category has its own budget.
- Subscriptions take a fixed chunk of the overall budget and are deducted automatically on their due dates.
- So: Income → Savings + Budget; Budget = Subscriptions (fixed) + Categories (flexible).

## Core UX rule (confirmed)
Fewer decisions. One decision at a time. Every screen shows information with very low cognitive load.

## Phase 0 — Brief and success criteria
Problem, users, core values (easy, savings motivates, cash-like friction, repeat buys, low anxiety, retention), non-negotiables, measurable targets: "a new user can say what one tile is worth within 5 seconds", "setting a budget takes under 30 seconds", "Home shows no budget number", "one decision per screen".

## Phase 1 — Audit (all versions + all research)
v2 → v10 builds and all project docs: strengths, weaknesses, reviewer feedback, reversals and why. Research audit: held up / weak / unverified / contradictions. Output: decision log (keep / drop / never again).

## Phase 2 — Tile system research + candidates
Learnable unit systems (waffle/unit charts, isotypes, coins, progress blocks, GitHub grids, cash denominations, days of spending). 3–4 candidates (e.g. 1 tile = one day of budget; 1 tile = ₹100 always; tiles as % of budget). Score on learnability, honesty, scalability, glance speed.

## Phase 3 — Tile comprehension test
Interactive timed test ("what is this worth / which is more"). Tarun + friends try it; winner chosen on evidence.

## Phase 4 — Visualization research on the tile system
Which charts work as tiles; which need another form; rules for leaving the tile.

## Phase 5 — Money model + budget setting
Implement the confirmed model. Easy setup: suggested split from income, subscriptions pre-filled as fixed chunk, categories auto-suggested; one decision per step. Edge cases in plain language: irregular income, overspend, splits, repayments, a subscription price change.

## Phase 6 — Layouts and visual identity
Tabs, Home, widget grid (ref: monochrome widget dashboard), type, colour + B&W, logo/splash, motion and sound — built around the tile.

## Phase 7 — Loops, retention, anxiety, UX principles
Daily / pay / weekly / period-end loops; anxiety reducers; tone; notifications; first-week journey; day 2 / 7 / 30 return triggers.

## Phase 8 — Content and microcopy
Glossary, labels, empty/error states, nudges.

## Phase 9 — Execution plan
Task list with reasoning from all versions: reuse map, screens, widgets, build order, risks.

## Phase 10 — v11 mockup build
## Phase 11 — Validation
5-second tests, tile comprehension, ledger checks (income = savings + budget; budget = subscriptions + categories), click-through, accessibility, reduced motion.

## Phase 12 — Handoff pack
Design-system page, usability test script, optional Figma frames.

Checkpoints with Tarun after Phases 0, 3, 5, 6 and 9.
