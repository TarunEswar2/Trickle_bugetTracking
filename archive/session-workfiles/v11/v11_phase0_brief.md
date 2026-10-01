# Trickle v11 — Phase 0: Brief and success criteria

Hard constraint: **no SMS tracking.** Transactions come from linked UPI IDs or manual entry (statement import optional). Prototype runs on simulated data.

## Problem
UPI makes paying painless (Prelec & Loewenstein 1998; Raghubir & Srivastava 2008; Dev et al. 2024: 74% of UPI users say they spend more). Students notice too late, especially repeat small buys. Nine prototype rounds (v2–v10) showed a second problem: every attempt to show money *visually* added a new thing to learn (charts, jars, tiles with 3 units, 6 shape denominations). Reviewers said "too much information", "every screen is numbers", and for v10 "shapes are not working". v11 must make budgeting feel easy with one learnable visual unit and very few decisions.

## Users
Indian college students (18–24), UPI-first (GPay/PhonePe/Paytm), allowance from parents (monthly, sometimes late or split), plus irregular part-time/freelance/gift income. Budgets ₹3k–15k/month. Money-anxious, low patience for setup, share splits with friends, keep subscriptions (Spotify, cloud, Prime, courses). Research base: 6 interviews (Tarun, Nishad, Yash, Gautham, Harsh, Vaishak) + survey.

## Jobs to be done
1. When I'm about to pay, help me feel what it costs, like handing over cash. (daily)
2. When I open the app, tell me I'm okay (or a bit fast) without making me read numbers. (daily)
3. When money arrives, split it into savings and budget for me; I just confirm. (monthly / irregular)
4. When I set up, let me set a budget in seconds with sensible defaults. (once, then rarely)
5. Show me the little things I keep buying and what they add up to. (weekly)
6. Let me watch savings grow toward something I want. (weekly)
7. Pay my subscriptions from budget automatically and warn me before they hit. (monthly)

## Money model (confirmed)
Income → **Savings** + **Budget**. Budget = **Subscriptions** (fixed amounts, auto-deducted on due dates) + **Categories** (each with its own budget). Ledger checks: income = savings + budget; budget = subscriptions + Σ categories.

## Core values
1. **Budgeting made easy.** Defaults first; the user corrects instead of building from scratch.
2. **Savings motivates; no guilt.** Every flow ends on savings progress.
3. **Cash-like friction at payment.** The payment visibly leaves a category, in the same tile unit used everywhere.
4. **Repeat and small-buy awareness**, neutral in tone ("4th chai this week"), never moralising.
5. **Low anxiety.** No red deficits, no problem counts, bad news only where it can be acted on.
6. **Retention first**, through usefulness and progress, not streaks or points.

## Non-negotiables
- No SMS, no notification scraping. UPI link or manual.
- One visual unit (the tile) with one meaning that never changes across screens.
- One decision per screen. Smart default pre-selected.
- Home shows no budget number; pace is a word + ambient colour (green / amber, never red).
- Every amount available exactly on tap.
- Ledger invariants hold after every action.
- Colour never the only cue (word or pattern too); reduced-motion and B&W supported.

## Anti-goals
- A new metaphor per screen (road, mountain, conveyor, jars, orbs, shapes).
- Multiple unit systems (₹100 here, ₹500 there, 1% elsewhere, or shape ladders).
- Chart libraries as the product (v5's 17 forms, v7's 44 widgets).
- Inbox/to-do lists about money with badge counts.
- Streaks, badges, leaderboards, debt language ("carried", "over budget", "cover").
- Setup that asks the user to allocate 7 sliders.

## Measurable success criteria (validated in Phase 3 and Phase 11)
| # | Criterion | Target | How measured |
|---|---|---|---|
| S1 | Tile value understood | ≥80% of new users say what one tile is worth within **5 s** | timed tile test |
| S2 | Comparison at a glance | ≥90% pick "which is more" correctly within 3 s | timed tile test |
| S3 | Budget set | first budget done in **≤30 s**, ≤4 taps with defaults | stopwatch in onboarding |
| S4 | Decisions | **1 decision per screen** (max one primary choice group) | per-screen audit |
| S5 | Home | **0 budget numbers** on Home; pace said in words | DOM scan |
| S6 | Numbers on load | **≤2 numbers** visible per screen on first view (keys/captions excluded) | digit-token scan |
| S7 | Units | exactly **1 tile unit** app-wide, stated in one key | code + visual audit |
| S8 | Pay moment | payment's tiles leave the category in ≤1.2 s; ≤3 steps to UPI hand-off | click-through |
| S9 | Income | income sorted with **one** confirm tap + undo | click-through |
| S10 | Return triggers | day 2 (first pace glance + first repeat-buy note), day 7 (weekly check-in: savings added + little things), day 30 (period story "You saved ₹X" + fresh start) all exist | flow checklist |
| S11 | Tone | 0 red on Home/Pay/Savings; 0 debt words | colour + copy grep |
| S12 | Ledger | invariants pass after every flow | validator |
| S13 | 5-second test | per main screen, ≥4/5 testers say what it shows | test script |
