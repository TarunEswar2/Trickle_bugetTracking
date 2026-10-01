# Trickle v7 — Phase 1 Audit: every insight and chart, v2 → v6

Constraint: tracking = UPI linkage or manual entry (+ Excel/CSV import). **No SMS.** One finding below: the explorations build (D–I onboarding) shows "Auto-detect payments from GPay, PhonePe, Paytm" and "Notification access". That comes close to SMS/notification scraping. v7 must not carry that copy forward.

Sources audited (scratchpad): `trickle-v2.html`, `trickle-dark-a/b/c.html`, `build/trickle-explorations-2.html` + `build/{core,d_envelope,e_pulse,f_ledger,g_timeline,h_forecast,i_split}.js`, `trickle-visual-redesign.html`, `trickle-final-v3.html`, `-v4`, `-v5`, `-v6`. Project docs used: v6 phase 1 audit, v6 catalogue, v6 build notes, v5 viz plan, design brief v3.

## 1. Headline numbers
- **11 builds** and **9 lineages**: v2 → dark A/B/C (reskins of v2 with the same insight set; only tokens differ: A `#0e0f0e`/mint `#a8e6a1`, B and C are variants), explorations D–I (6 concepts: Envelope, Pulse, Ledger, Timeline, Forecast, Split), visual redesign (metaphor charts), v3, v4, v5, v6.
- **63 distinct insights/charts** inventoried (table below). Verdicts: **Keep 29 · Merge 19 · Drop 15**.
- Charts per build: v2 8 text-insight cards + 1 donut + dots. Dark A/B/C: same 8. Explorations: ~14 (fill-bars, pace ring + sparkline, burn-down + projection, stacked area + heatmap, month ribbon scrubber, owe/owed list, weeks-under-budget, this vs last week, compared-to-usual). Visual redesign: 12 (speedometer, clock, coin stack, funnel, iceberg, mountain, road, staircase, sub conveyor belt, treemap, bubbles, isotype). v3 +2 (fixed-vs-chosen, next-up sub). v4 +3 (daily trend vs budget, contribution pace, MoM compare). v5 16 insight cards. v6 ~45 charts on 32 frames (the most complete; v7 carries it forward).
- **Income, balance, pools, transfers, sweeps and import are almost entirely missing.** Balance was one number in every version. The only income-shaped visual ever built was the v6 onboarding allocation pie (allowance → categories + "Unassigned").

## 2. Master table

Tabs: **H** Home · **M** Money · **S** Savings · **I** Insights widget board · **D** drawer (settings) · **F** flow (sheet/sub-screen). Versions: 2 = v2 + dark A/B/C, X = explorations D–I, R = visual redesign.

| # | Item | Versions | Question | Verdict + why | v7 home |
|---|---|---|---|---|---|
| 1 | Budget pace (text "Ahead of pace — ₹x of ₹y") | 2,3,4 | Am I on track this week? | **Merge** into #2 | — |
| 2 | Pace bullet w/ elapsed tick + projection | 5,6 (R speedometer, X pace ring) | Same | **Keep**, the core budget chart | H (pinned) / I |
| 3 | Safe-to-spend half-donut gauge | X (Pulse), 6 | How much today? | **Keep**; now works for any period (daily safe-to-spend in both modes) | H hero |
| 4 | Today/Week/Month tiles + sparkline | 2–6 | Totals + delta | **Keep** as a W widget | H / I |
| 5 | Streak dots (days under budget) | X "weeks under budget", 6 | Am I consistent? | **Keep** | I |
| 6 | Day-of-week heaviest (text) | 2,3,4 | Heavy weekday? | **Merge** → #7 | — |
| 7 | Calendar heatmap + range strip | X, 5, 6 | Typical day? Which days run hot? | **Keep** (one card for the heatmap and the range strip) | I |
| 8 | Diverging days vs median | 5 | Hot/quiet days | **Merge** → #7 (answers the same question 3 times) | — |
| 9 | Category trend / biggest mover (text) | 2–4 | What changed? | **Merge** → #10 | — |
| 10 | Dumbbell same-days last month vs this | 4 (MoM), 6 | Month vs month | **Keep** | I |
| 11 | Small purchases (dot-matrix / pictogram) | 2–6 | Which repeat buys add up? | **Keep** pictogram rows | I (+ H option) |
| 12 | Waffle small-ticket share | 5 | Share of small buys | **Drop** (duplicates #11); the waffle form moves to savings rate (ref 1) | — |
| 13 | Accumulation detail (24h strip + annualised bullet) | 6 | Habit cost/yr | **Keep** | F (detail) |
| 14 | Biggest contributor (text) | 2–4 | Top category | **Merge** → #15 | — |
| 15 | Concentric radial arcs (share) | 6 (user ref 1 of v6) | % per category | **Merge** with #16 into the category % card family | I / M |
| 16 | Donut categories | 2–5 | Share | **Drop** (replaced by #15 and the new bold % cards) | — |
| 17 | Ranked category rows w/ bullet | 5,6; X fill-bars | Near/over budget? | **Keep**, restyled as bold coloured % cards (fitness ref) | H (top 3) / M |
| 18 | Pie + fill jars month-wise | 6 | Month by month per category | **Keep** | I |
| 19 | Category area + budget dashline | 4,5,6 | Daily trend vs budget | **Keep** | F (category detail) |
| 20 | Treemap merchants in category | R, 6 | Who makes up category | **Keep** | F (category detail) |
| 21 | Treemap share of spend | R | Share | **Drop** (radial/% cards cover it) | — |
| 22 | Sankey-lite spend → cats | R "where it flows", 5, 6 | Where money flows | **Merge**; v7 finally has a true source: income → pools → categories/goals | M |
| 23 | Funnel / iceberg "visible vs hidden" | R | Hidden spend | **Drop**, metaphor chart (v3 critique) | — |
| 24 | Mountain goal climb | R | Goal progress | **Drop**, metaphor | — |
| 25 | Road / coin stack daily | R | Daily spend | **Drop**, metaphor; #26 covers it | — |
| 26 | 6-month columns w/ budget line | 5,6; X 4-week trend | Total trend | **Keep**; add an income line as a second chart, never a dual axis | I |
| 27 | Stacked area cats over time | X (Ledger) | Mix over time | **Drop**, too imprecise at 412px; #18 covers it | — |
| 28 | Month ribbon scrubber | X | Pick a month | **Keep as control** (period picker), not a widget | M header |
| 29 | Burn-down line + projection | X (Forecast), R pace-through-month | Will I run out? | **Merge** → new "budget runway" widget (W11) | H/I |
| 30 | Projected end-of-month balance | X (Forecast) | Where will I end? | **Keep**, now real: balance forecast from pools + expected income | M |
| 31 | 24h radial clock | R, 5, 6 | When do I spend? | **Keep** | I |
| 32 | Part-of-day gauges ×4 | 5,6 | Morning/evening split | **Merge** into #31 as a toggle | — |
| 33 | Histogram txn size | 5,6 | Small or big buys? | **Keep** | I |
| 34 | Scatter amount × hour | 5 | Pattern | **Drop**, weak; #31 covers it | — |
| 35 | Bubble merchants | R, 5 | Who gets money | **Drop** (overlap bug) → #36 | — |
| 36 | Ranked merchant bars | 6 | Top merchants | **Keep** | I |
| 37 | Radar mix shape | 5,6 | Mix changed? | **Drop**, hard to read and duplicates #10 | — |
| 38 | Fixed vs discretionary meter | 3 ("committed, not chosen"), 5, 6 | Fixed share | **Keep**; ties to Monarch fixed/flex | I |
| 39 | Subs text "₹x leaves on autopay" | 2–4 | Sub total | **Merge** → #40 | — |
| 40 | Subs donut + next-due list | 5,6 | Sub share | **Merge** into the Home subs card + detail screen | H card + F |
| 41 | Subs calendar w/ dots | 5,6 (R conveyor belt) | When subs hit | **Keep** in the subs detail screen | F |
| 42 | Sub 12-cell pictogram + price step-line | 6 | Yearly cost, price change | **Keep** | F (sub detail) |
| 43 | "Next up: X in N days" | 3,4 | Next due | **Keep** as the Home due-soon chip | H |
| 44 | Goal % funded (text) | 2–4 | Goal status | **Merge** → #45 | — |
| 45 | Goal ring icon-centre + ETA | 6 (R staircase) | How close? | **Keep** + FreeDom big % hero | S |
| 46 | Goal step-line + projection | 4,5,6 | Hit by date? | **Keep** | F (goal detail) |
| 47 | Round-up vs manual stacked area | 6 | What added the money? | **Merge** into a contribution-source bar (round-up / sweep / manual / income rule) | F |
| 48 | Goal create weekly-pace columns | 6 | Needed pace | **Keep** | F |
| 49 | Friction 3-seg bullet + dots | 2–6 | What does this payment do? | **Keep**; add the overspend-cover options row | F (pay) |
| 50 | Manual entry live bullet | 6 | Same, for manual | **Keep** | F |
| 51 | Txn detail merchant range + 24h tick | 6 | Is this usual? | **Keep** | F |
| 52 | Transactions 30-day strip | 6 | Filtered history shape | **Keep**; add in/out toggle | M (activity) |
| 53 | Pay-anyone micro bars | 6 | Last paid | **Keep** | F |
| 54 | Owe/owed list, circles (Split) | X | Who owes whom | **Drop** for v7 scope; repayments land in To assign (see open Q) | — |
| 55 | Envelopes fill-bars (Envelope concept) | X | Envelope left | **Merge** → #17 | — |
| 56 | Linkage diagram + UPI/manual 100% bar | 6 | What's connected | **Keep** | D |
| 57 | Alerts threshold bullet | 6 | When a nudge fires | **Keep** | D |
| 58 | Visual PIN dots | 6 | — | **Keep** (widget PIN and app PIN) | F / D |
| 59 | Onboarding rings, method lanes, allocation pie | 6 | Setup | **Keep**; add period picker + income + split rule step | F (onboarding) |
| 60 | Savings round-up ring on confirm | 6 | Round-up | **Keep** | F |
| 61 | "Compared to usual" (% of usual day) | X | Normal day? | **Merge** → #7 | — |
| 62 | Cleo-style story recap | research v6 | Week recap | **Drop** for now | — |
| 63 | Notification access / auto-detect copy | X | — | **Drop**; breaks the no-SMS/scrape constraint | — |

## 3. Gaps (nothing built before v7)
- **Income:** no income entity, sources, recurring schedule, payday calendar or income-vs-spend chart. Needed: source mix, payday calendar (dashed future days), in-vs-out per period, income reliability (expected vs received).
- **Balance:** only a single number (v6 = ₹3,152 derived). Needed: balance = To assign + Budget + Savings, a pools ring/stacked bar, balance history (stacked area by pool), projected end-of-period.
- **Pools:** no To-assign inbox, no assign flow, no "saved from budget" sub-balance.
- **Transfers:** nothing is logged. Needed: a transfer log (type: assign / sweep / withdraw / cover / goal-move), a Sankey income → pools → uses, and a monthly transfer summary.
- **Sweeps:** only a round-up offer at payment time. Needed: auto/manual sweep rule, a leftover-to-sweep counter, a sweep history strip, a manual "pick a goal" queue.
- **Overspend cover:** the friction sheet warns but gives no way to cover. Needed: the 4-option cover sheet (To assign → other category leftover → goal, with goal slip → let it go over), a cover history, and a "covered from goal" slip on the goal.
- **Import:** none. Needed: file → column map → preview → dedupe (UPI ref / date+amount+merchant) → auto-categorise → confirm, plus an import-batch log with undo.
- **Budget period:** v6 hard-wired day/week/month views. v7 has one onboarding-chosen period (monthly / weekly / match payday) and daily safe-to-spend in every mode.
- **Widgets:** no pin/hide/reorder, no fixed sizes, no not-enough-data state anywhere.

## 4. Carry-over decisions (top)
- Keep: pace bullet, safe-to-spend gauge, streak dots, heatmap+range, dumbbell, pictogram repeats, pie+jars, 24h radial, histogram, merchant bars, fixed/flex meter, goal ring/step-line, friction bullet, linkage diagram.
- Drop: every metaphor chart (iceberg, mountain, road, coin stack, conveyor), radar, bubbles, scatter, 2-slice donut, category donut, stacked area of categories, small-ticket waffle, split/owe-list, notification-access copy.
- Restyle: category rows become bold saturated % cards. Lime is reserved for actions and primary numbers. Category colours are used only for identity.
