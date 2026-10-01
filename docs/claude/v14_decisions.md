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

### Viz 1 — follow-up from Tarun on the nested rings (C4), 2 Oct
| # | Decision |
|---|---|
| V1-9 | Rings view: each category gets its own colour. No "outer / 2nd / 3rd" tags and no numbers or word-states beside the rings. Tapping a category opens its detail (F3: grid + scale + transactions). |
Moved on to Viz 2 without answering; defaults on my recommendation, change any time: (a) a ring's name appears when you press/tap it (no permanent labels); rings show the biggest few and the rest group as "others", tap opens the full list; (b) rings sit beside the words-only list (V1-3), not replacing it. Rings board not redrawn.

### Viz 2 — Pay / friction (answers 2 Oct; options board not drawn yet)
| # | Decision |
|---|---|
| V2-1 | What crumbles: boxes from the category's own 10x10 grid (same object as Viz 1). |
| V2-2 | When: "crumble away and indicate a ghost of what left, before paying" - the crumble plays on the pay screen before the payment is confirmed, leaving a ghost of what left. (My reading: boxes crumble out of the grid as a preview; can still back out - confirm with Tarun.) |
| V2-3 | Sting: "indicate what left until we move to the next screen" - the ghost of the departed boxes stays visible until the user moves on; no red/shake/sound drama. |
| V2-4 | Crumble = **D, fade in order**: the paid boxes fade out one by one, top first, no pieces (~1.5 s). |
| V2-5 | Ghost = **G2, dashed outline** where the liquid was, kept until the user moves on. |
Defaults on my recommendation, not explicitly answered (change any time): payments under one box crumble at true size; going over carries V1-4 to the pay screen (everything left fades, then amber floor line + words, no red); the ghost updates live as the amount or category changes and snaps back if you back out.
Board: https://claude.ai/artifact/Fsvd6fogygvPdtsrHsqMyN (source archive/session-workfiles/viz2/viz2-pay-friction.html). No inspiration images were needed.

### Viz 3 — Income split (Tarun's structure, 2 Oct; options board drawn)
| # | Decision |
|---|---|
| V3-1 | Income splits into spending and savings. Spending splits into budget and subscriptions. Savings splits into goals. |
| V3-2 | All of it is drawn from the same grid (the 10x10 box grid). |
| V3-3 | Colours: income grey, spending orange, savings green; the budget's categories are different colours (matches V1-9). |
| V3-4 | Layout: **bands from the bottom** (not columns). |
| V3-5 | **Savings at the bottom**, spending on top. |
| V3-6 | Go deeper **level by level**, each step with a slow, smooth delay (my reading: the same grid splits in place, one step at a time). |
| V3-7 | **Biggest five categories coloured, the rest shared as "others".** |
| V3-8 | Labels must be separated and differentiated better: savings and spending were run together in one list. Resolved by V3-9 and V3-10. |
| V3-9 | Labels = **L2, drop-downs after the split**: two collapsed lines, "Savings" and "Spending", each opens into its own list. |
| V3-10 | A **visible gap between the savings band and the spending band inside the grid** (not only in the labels). |
| V3-11 | **App-wide rule:** the scale line ("1 box = ₹120") must carry visual hierarchy so people don't miss it — a prominent chip, not small grey text, on every screen that shows it (Viz 1 gauge, Viz 2 pay screen, Viz 3 income). Applied to the Viz 2 and Viz 3 boards; the Viz 1 board still has the old small line and gets it in the build. |
Viz 3 closed by Tarun ("done viz 3"). Defaults that stand, not explicitly answered: the stepped edge in the split row (spending boxes sit higher than savings boxes beside them); a group with nothing in it (no subscriptions / no goals) is not drawn; budget is light orange and subscriptions hatched orange.
Board (updated): https://claude.ai/artifact/KHq3fHEr8sebrJzRksghMQ (source archive/session-workfiles/viz3/viz3-income-split.html).

### Parked requirement (Tarun, 2 Oct) — Savings tab
In the Savings tab the user must be able to **add goals**, **make a payment toward a goal**, and see **a few completed goals**. Not for now ("this happens later"); belongs with visualisation 4 (savings goal) and the Savings-tab screens. Keep track of it.

## Visualisation queue (one at a time)
1. Budget gauge — DONE
2. Pay / friction: amount crumbling away — DONE
3. Income split (spending vs savings) — DONE (V3-1…V3-11)
4. Savings goal (how much, by when, actually saved) — NEXT; also: add goal, pay into a goal, completed goals (parked requirement above)
5. Unspent → saved
6. Small / repeat purchases
7. Time patterns (e.g. nights)
8. Subscriptions coming up (Fixed group)
9. This week vs last
10. Transaction history
11. Exact amounts on tap (progressive disclosure rules)

## Parked / superseded
- Coin test (V4 vs V1) and name-rows vs families category ideas (claude/v14_stage2b_coins_categories.md) — superseded.
