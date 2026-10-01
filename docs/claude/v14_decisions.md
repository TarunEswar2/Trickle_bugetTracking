# Trickle v14 — Decisions log (Tarun decides everything)

Base: claude/v14_stage0_facts.md (facts + 7 approved principles), research/brymans_analysis_interviews.md.

## Decided
| Date | Decision |
|---|---|
| 2 Oct | 7 principles approved as written. |
| 2 Oct | 5 tabs: Home · Income · Spending · Savings · Insights. |
| 2 Oct | Home timeframe = this week. Home shows one sentence + ONE overall fuel gauge, no ₹. |
| 2 Oct | NO coins/dots as the general money representation (reverses the dot = ₹100 system and the "coin + ×N" idea). |
| 2 Oct | Squares/circles are used ONLY to show loss: at the pay/friction screen the amount being paid crumbles away. |
| 2 Oct | Categories are shown as FUEL GAUGES. Categories are many (20+ possible), user-created, custom icons possible — representation must stay consistent. |
| 2 Oct | Every kind of information gets its own specific representation (no single universal unit). |
| 2 Oct | Stop designing for one seed with 5 fixed categories. Test every idea against a POOL of students based on the six interviewees (Tarun, Nishad, Yash, Gautham, Harsh, Vaishak types), varying income (₹3k–25k), category count (2–20), period, and month 1 vs month 6. |
| 2 Oct | Process: go ONE visualisation / widget at a time. Tarun provides pictures/inspiration at each step. Claude draws options across the student pool; Tarun decides; then next. |
| 2 Oct | **Budget gauge form:** 10×10 grid of rounded boxes that fills from the bottom like liquid. ALWAYS 10×10. Scale always shown ("1 box = ₹X"). |
| 2 Oct | **One visualisation per screen:** never more than one at a time; scroll down for the next. |

### Viz 1 — Budget gauge (DECIDED 2 Oct) — see claude/v14_viz1_budget_gauge.md, board https://claude.ai/artifact/AcKnP1FTzaAuGwsqiXWLgM
| # | Decision |
|---|---|
| V1-1 | The liquid shows money LEFT; it drains as you spend. |
| V1-2 | Scale: budgets are set in ₹100 steps, so 1 box = budget ÷ 100 is always whole rupees and the grid = the whole budget. |
| V1-3 | Many categories: a words-only list of names (with a word like plenty / low / empty, no mini charts) → tap opens that category's grid → swipe to the next. |
| V1-4 | Gone over: empty grid + amber floor line + words ("a little over — taken from next week"); amount on tap; no red. |
| V1-5 | Home gauge: the same 10×10 grid, with NO scale on Home (keeps Home ₹-free); scale appears once you tap in. |
| V1-6 | Home gauge covers this week's share of the budget for everyone (monthly budgets split into weeks; irregular income sets the week when money arrives). |
| V1-7 | Fixed bills (rent, EMI, subscriptions) are a separate "Fixed" group — shown as paid / due soon, not as liquid gauges. Only flexible spending gets grids. |
| V1-8 | No budget set: the app suggests one from 2 weeks of spending; until then the grid's full level = "your usual week". |
Open inside Viz 1: top edge of the liquid (box-by-box vs even level), last week's ghost line — default to recommendation (box-by-box; ghost line on tap) unless Tarun says otherwise.

## Visualisation queue (one at a time)
1. Budget gauge — DONE
2. Pay / friction: amount crumbling away — NEXT (waiting for Tarun's inspiration)
3. Income split (spending vs savings)
4. Savings goal (how much, by when, actually saved)
5. Unspent → saved
6. Small / repeat purchases
7. Time patterns (e.g. nights)
8. Subscriptions coming up (Fixed group)
9. This week vs last
10. Transaction history
11. Exact amounts on tap (progressive disclosure rules)

## Parked / superseded
- Coin test (V4 vs V1) and name-rows vs families category ideas (claude/v14_stage2b_coins_categories.md) — superseded.
