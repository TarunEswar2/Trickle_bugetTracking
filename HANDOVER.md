# Trickle — handover

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
| Onboarding, per-tab screens, identity, v14 build, user tests | Not started |

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
**The visualisation queue (Viz 1–11) is complete.** Tarun said he will come back for **flows** — start with the parked flows listed below, one decision at a time. Viz 11 board: https://claude.ai/artifact/RsXokgbfEjVoyKyb3pX7Zc; its five "still to confirm" points are logged as defaults, unanswered.

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
