# Trickle v6 — Phase 2 Research & Visualization Catalogue

Constraint: tracking = UPI linkage or manual entry. No SMS, anywhere. (Note: Jupiter and CRED Money both link accounts via India's **Account Aggregator** framework, not SMS — a useful precedent for the "UPI linkage" story.)

## 1. Competitive research — how others visualize

| App | Spending viz | Onboarding / visual notes | Take for Trickle |
|---|---|---|---|
| **Copilot Money** | Categories tab leads with *month spend vs total budget* comparison; per-category bars colour-coded by **pace** (green on track → yellow/orange on pace to exceed → red over); outlined bars for *expected recurring* spend; tap segments to drill in; swipeable time periods; semantic colours (green income, red-orange spend, yellow pending). [help.copilot.money](https://help.copilot.money/en/articles/9504513-categories-tab-overview), [Crosley design guide](https://blakecrosley.com/guides/design/copilot-money) | Charts *are* the interface, summary cards first. | Pace-state on every budget bar; "expected recurring" as outlined/ghost segment (subs); tap-to-drill. |
| **Monarch** | Reports offer **Sankey** (income → categories → groups), trend bars (stacked ↔ grouped toggle), pie/donut share, ranked horizontal **breakdown** bars, **treemap**. [Monarch Reports help](https://help.monarch.com/hc/en-us/articles/21846787088916-Using-Reports), [Monarch Sankey](https://www.monarch.com/visualize-your-cash-flow-like-never-before) | — | Same question, multiple forms is fine *if* the user toggles; stacked↔grouped toggle for month-wise. Sankey needs a true *source* (Trickle has no income → source must be "this month's spend" or allowance). |
| **YNAB** | Spending Breakdown shows categories by **spending %**; Reflect: Spending, Income vs Expense, Net Worth, **Age of Money**. [YNAB Spending Breakdown](https://support.ynab.com/en_us/spending-breakdown-H1H7YxmD0), [Reflect](https://support.ynab.com/en_us/reflect-in-ynab-B1GJsrWkj) | Assign-every-rupee model = allocation visual during setup. | Onboarding "give every rupee a job" allocation with live share chart; a single signature metric (Trickle analogue: *days of budget left*). |
| **Cleo** | Card modules (balance, category cards), in-app **stories** sequential narratives, chat tone modes. [Cleo case study (izzoul)](https://www.izzoul.com/product-design/cleo-ai), [FinanceBuzz](https://financebuzz.com/cleo-review) | Full-screen illustrated onboarding "super type" screens; linear narrative. | Story-style weekly recap; onboarding as a narrative sequence that ends in *their own* chart — but no one-off illustrations (v3 critique). |
| **Rocket Money** | Top categories breakdown; bills/subscriptions in **Upcoming view with a calendar on top** + date-sorted list, plus full calendar view. [Rocket help](https://help.rocketmoney.com/en/articles/3117398-where-can-i-view-my-subscriptions-and-bills), [spending insights](https://www.rocketmoney.com/feature/spending-insights) | — | Month calendar with due-dots for subscriptions (beats v5's axis timeline when dates cluster). |
| **Jupiter** | Spend categorisation "top categories in 1 place", budgets with pre-overspend alerts, Financial Wellness Report summary card; AA-linked. [jupiter.money/money](https://jupiter.money/money/) | — | Monthly "report card" summary (stat tiles + one hero chart). |
| **Fi Money** | Auto-categorisation, **Smart Statements "in plain English"**, Ask Fi assistant. [App Store](https://apps.apple.com/us/app/-/id1531564767) | — | Every chart gets a plain-English headline (v5 already does this in `ic-head`; keep). |
| **CRED Money** | Spend patterns across bank accounts, search by merchant category, recurring-payment reminders; AA framework. [Inc42](https://inc42.com/buzz/kunal-shah-led-cred-unveils-new-offering-to-help-customers-manage-bank-accounts-track-expenses/), [Business Standard](https://www.business-standard.com/finance/news/cred-launches-product-to-track-expenses-view-total-bank-account-balances-124072400997_1.html) | — | Per-account split (needs `txn.account`), recurring reminders. |

**Form-selection references.** FT Visual Vocabulary (9 jobs: deviation, correlation, ranking, distribution, change-over-time, magnitude, part-to-whole, spatial, flow — [FT chart-doctor](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)); Data Viz Catalogue part-to-whole list = donut, marimekko, parallel sets, pie, sankey, stacked bar ([catalogue](https://datavizcatalogue.com/search/proportions.html)); Data Viz Catalogue warns radial bars mislead because **outer bars look longer for the same value** — straight bars compare better ([radial bar](https://datavizcatalogue.com/methods/radial_bar_chart.html)); Information is Beautiful Awards "Types of Data Visualization" sheet (user ref).

**Dataviz-skill heuristic applied** (job → form, color last): single values → stat tile/hero; ratio vs limit → meter/bullet; part-to-whole ≤6 → stacked bar or donut; trend → line/area; above/below baseline → diverging bar; categories 7–8 is the palette ceiling → fold the tail into "Other"; all-pairs forms (bubble/scatter) cap at 3 hues; no dual axes; hover/tap on every chart; legend for ≥2 series.

### Implication for the two user-assigned mappings
- **Ref 1 radial arcs → category spending %**: approved, with guards from the research: outer rings look longer for the same value, so **encode share as sweep angle on one common 270° scale (not arc length), direct-label every ring with its % at the arc end** (like the ref's 25/35/50 callouts) so the number is read, and order rings by share so ranking stays readable. Cap at 6 rings + "Other". Center = icon/total (Ref 4 icon-center). Pair with the ranked row list below for precise comparison.
- **Ref 2 pie + fill columns → month-wise category spending**: pie (this month share, ≤5 slices + Other, callout labels with category icons) on top; beneath, **one "fill jar" column per category** made of stacked month cells (e.g. 6 months), each cell's fill = that month's spend vs that category's monthly budget; % label on top = this month's share. Requires 6-month seed.

---

## 2. Catalogue — 36 pairings (budget question → form → fields → screen)

| # | Budget question | Chart form | Data fields | Screen |
|---|---|---|---|---|
| 1 | **What % of my spend goes to each category?** *(user mapping, Ref 1)* | Concentric radial arcs, direct % labels, icon/total center | txn.amt, txn.cat, ts (period) | Categories hero; mini on Home |
| 2 | **How did each category's spend move month by month?** *(user mapping, Ref 2)* | Pie w/ callouts (this month) + per-category stacked "fill jar" columns (6 months) | amt, cat, ts→month, cat.budget | Categories "Monthly" view + Insights |
| 3 | Am I on pace for this week's budget? | Bullet/pace bar w/ elapsed-time tick + projection ghost (Copilot pace colours) | amt, ts, cat.weekly | Home hero card, Insights |
| 4 | How much can I safely spend today? | Hero number + half-donut gauge (Ref 4 half-donut) | budget left, days left | Home |
| 5 | Which categories are near/over budget? | Ranked bullet list (one per row, no seg-bar duplicate) | spend, budget per cat | Categories rows |
| 6 | Where does this month's money flow? | Sankey-lite: month spend → categories → top merchants | amt, cat, merchant | Home "Where money goes" (fix source) |
| 7 | When in the day do I spend? | 24-h radial clock (Ref 4 time-of-day) | ts→hour, amt | Insights; txn detail marker |
| 8 | Morning/midday/afternoon/evening split | Small-multiple radial gauges ×4 (Ref 4 ticks) | ts→part-of-day | Insights |
| 9 | Which weekday is heaviest? | Calendar heatmap (keep) | ts→date, amt | Insights |
| 10 | Is today a normal day? | Range strip min–median–max + today dot (keep, merge with #9 card) | daily totals | Insights |
| 11 | Which small repeat buys add up? | Pictogram/isotype row per merchant (one icon = one purchase) | merchant, count | Home accumulation card |
| 12 | What would this habit cost a year? | Stacked tally → annualised bar | count×avg×52 | Accumulation detail |
| 13 | When do I buy at this merchant? | Dot strip on 24-h axis + weekday dots | ts per merchant | Accumulation detail |
| 14 | Are most purchases small or big? | Histogram (keep) + tap values | amt buckets | Insights |
| 15 | Who gets most of my money? | Ranked horizontal bars (replaces overlapping bubble) or packed circles w/ collision layout | merchant totals | Insights |
| 16 | Has my category mix shape changed? | Radar (fix normalisation) or slope/dumbbell per cat | share this wk vs 4-wk avg | Insights |
| 17 | Which recent days ran hot/quiet? | Diverging bars vs median (keep) | daily totals | Insights |
| 18 | Fixed vs discretionary? | Meter/100% stacked bar (replace 2-slice donut) | fixed set, amt | Insights |
| 19 | Month vs last month per category? | Dumbbell (before→after) | cat spend m-1, m | Insights / Categories |
| 20 | 6-month total trend | Column chart w/ budget line | monthly totals | Insights |
| 21 | Category daily trend vs budget | Area + budget dashline (keep) | daily per cat | Category detail |
| 22 | Which merchants make up a category? | Treemap / 100% bar inside category | merchant within cat | Category detail |
| 23 | How big is this txn vs usual here? | Range strip: merchant min–typical–max + this txn marker | merchant history | Transaction detail |
| 24 | What does this payment do to my budget? | Friction 3-segment bullet + budget tick + pace tick + purchase-count dots | cat spend, pending amt | Friction sheet, manual entry live preview |
| 25 | How many times today/this week in this category? | Dot row (filled = purchases) | count per cat | Friction sheet |
| 26 | What does my filtered history look like? | Day-strip column sparkline above list | filtered txns by day | Transactions |
| 27 | UPI vs manual share / per account | Thin 100% bar + linkage node diagram | source, account | Settings, Home account sheet |
| 28 | When do subscriptions hit? | Month calendar w/ due dots (Rocket) | sub.day, amt | Savings |
| 29 | Subs share of monthly spend | Icon-center donut (≤ 5 subs + other) | sub.amt | Savings, sub detail |
| 30 | What does a sub cost over a year? | 12-cell pictogram strip (one per charge) | sub.amt, cycle | Sub detail |
| 31 | How close is my goal? | Radial progress ring w/ icon center (replaces bar+bullet dup) | saved, target | Savings goal cards |
| 32 | Will I hit the goal by the date? | Cumulative step-line of real contributions + projection + target-date marker | hist[], byDate | Goal detail |
| 33 | What pace do I need for a new goal? | Live stepped bar: ₹/week needed as target/date change | target, byDate | Goal create |
| 34 | How much did round-ups add? | Stacked area of round-up vs manual contributions | hist.type | Goal detail |
| 35 | How many days under budget in a row? | Streak dots (GitHub-style row) | daily vs budget | Home / Insights |
| 36 | When will a nudge fire? | Bullet preview with threshold tick at alertThreshold | cat budget, threshold | Alerts settings |

---

## 3. Fit / no-fit — every chart type in the references

### Ref 3 — dark chart-type library (60 types)
| Type | Verdict | Budget question / reason |
|---|---|---|
| Arc diagram | No | No many-to-many relations. |
| Area graph | **Fit** | #21 category daily trend, #34. |
| Bar chart | **Fit** | #15 ranked merchants, #20 monthly totals. |
| Box & whisker | Fit (simplified) | As range strip #10/#23; full box too technical. |
| Brainstorm | No | Not data. |
| Bubble chart | Weak | v5 overlap bug; replace with ranked bars or packed circles with collision (#15). |
| Bubble map | No | No geography. |
| Bullet graph | **Fit** | #3, #5, #24, #36. |
| Calendar | **Fit** | #28 sub due calendar; #9 heatmap. |
| Candlestick | No | Trading-only. |
| Chord diagram | No | No flows between peers. |
| Choropleth | No | No geography. |
| Circle packing | Maybe | Merchants inside categories (#22 alt). |
| Connection map | No | Geography. |
| Density plot | No | Histogram reads better for students. |
| Donut | **Fit** | #29 icon-center; not for 2 slices. |
| Dot map | No | Geography. |
| Dot matrix | **Fit** | #25, #35, #11 variant. |
| Error bars | No | No uncertainty data. |
| Flow chart | **Fit (onboarding)** | Tracking-method diagram, permissions → features. |
| Flow map | No | Geography. |
| Gantt | No | No tasks — sub cycles better as calendar. |
| Heat map | **Fit** | #9; hour × weekday grid option. |
| Histogram | **Fit** | #14. |
| Illustration diagram | No | v3 critique: no one-off illustrations. |
| Kagi | No | Trading. |
| Line graph | **Fit** | #32 goal step-line, 6-month trend. |
| Marimekko | Maybe-no | Cat × month area matrix too dense at 412px; #2 covers it. |
| Multiset bar | **Fit** | Month vs last month grouped (Monarch toggle). |
| Network diagram | No | — |
| Nightingale rose | Maybe | 12-month seasonal per category; area misread risk → only if labelled. |
| Non-ribbon chord | No | — |
| OHLC | No | — |
| Parallel coordinates | No | Too abstract. |
| Parallel sets | Maybe | Source (UPI/manual) → category flows; Sankey covers it. |
| Pictogram | **Fit** | #11, #30. |
| Pie | **Fit (≤5 + callouts)** | #2 this-month share. |
| Point & figure | No | — |
| Population pyramid | Reinterpreted | Weekday vs weekend per category mirrored bars. |
| Proportional area | Maybe | Merchant totals squares, alt to bubble. |
| Radar | **Fit (fixed)** | #16. |
| Radial bar | **Fit (user ask)** | #1 with direct labels. |
| Radial column | **Fit** | #7 24-h clock. |
| Sankey | **Fit** | #6. |
| Scatter | Fit | amount × hour (keep, add hover) — or fold into #7. |
| Span chart | Maybe | Merchant price range min–max (#23 form). |
| Spiral | No | Illegible at card size. |
| Stacked area | Fit | #34. |
| Stacked bar | **Fit** | #2 fill jars, #18, #27. |
| Stem & leaf | No | — |
| Stream graph | Maybe-no | 6-month category stream — pretty, imprecise. |
| Sunburst | Maybe | Category → merchant two-ring (#22 alt). |
| Tally chart | **Fit** | #12 habit counts. |
| Timeline | **Fit** | Goal contributions, sub history. |
| Timetable | No | — |
| Tree diagram | No | — |
| Treemap | **Fit** | #22, onboarding starter-budget builder. |
| Venn | No | — |
| Violin | No | Unfamiliar. |
| Word cloud | No | No text corpus. |

### Ref 4 — "Music in Your Life" layout language
| Element | Verdict | Use |
|---|---|---|
| Callout labels with leader lines + boxes | **Fit** | Pie #2, radial arcs #1 % tags. |
| Icon-in-center donut | **Fit** | #29, #31 goal ring, category detail. |
| Small-multiple radial gauges (morning/midday/afternoon/evening) | **Fit** | #8. |
| Time-of-day concentric radial | **Fit** | #7. |
| 12h / 24h area strips | **Fit** | Hour-of-day area under #7 / accumulation detail #13. |
| Half-donut average vs total | **Fit** | #4 safe-to-spend gauge; avg day vs today. |
| Concentric arcs "YEARS" (= Ref 1) | **Fit** | #1. |
| Pie + fill columns (= Ref 2) | **Fit** | #2. |
| Sunburst/rose segmented ring "ALL" | Maybe | Category × merchant ring. |
| Dotted world map | No | No geography. |
| Isotype people row + bar | **Fit** | #11 pictogram purchases. |
| Mountain "peaks" chart | No | Triangle area distorts. |
| Arc-to-bar "devices" chart | No | Decorative. |

### Earlier refs
- **How to Think Visually (Anna Vital)**: take concentric diagram, speedometer (→ half-donut #4), staircase (goal step-line), isotype, timeline, decision tree (onboarding method choice). Reject allegories/analogies (iceberg, mountain, machine) per v3 critique.
- **Crypto dark dashboard**: take KPI triad with deltas, waffle-grid allocation (onboarding starter budget alt), transactions heatmap, dense dark card anatomy, tooltip style.
- **IIB "Types of Data Visualization"**: nested bubbles/polar grid/sunburst are the radial family → consistent with #1; treemap, sankey confirmed.
- **Glassy tiles / minimal icon set**: visual language for category icons (geometric, one accent), not charts.

---

## 4. Onboarding visual ideas (research-backed)
1. **Splash**: sample coins trickle into a ring — the ring is the real #1 radial chart with demo data.
2. **Method choice as flow chart**: two lanes, UPI (bank app → UPI ID → Trickle, auto) vs Manual (you → tap → Trickle); each lane ends in a mini preview of what Home will show. Explicitly no SMS lane.
3. **UPI linkage node diagram**: phone → each added UPI ID → Trickle; edges animate to "linked"; bank initial badges (precedent: Jupiter/CRED AA linking).
4. **Category picker builds a live starter budget** (YNAB "give every rupee a job"): each chip added grows a treemap/radial arc with a default student allocation; drag/slider rebalances; total allowance shown as hero.
5. **Budget allocation slider with live pie** (Monarch pie / Copilot budget vs spend).
6. **Visual PIN**: 4 dots filling, second row aligns + turns accent on match.
7. **Permissions as feature diagram**: each toggle lights the Home tile it enables.
8. **All-set = preview dashboard**: their categories rendered in #1 + pace bar #3 with ghost data, labelled "this fills in as you spend".
9. Progress: step arc around the step counter instead of 4 dots.

## 5. Visual-system notes for Phase 3
- One categorical order `--s1..s8`, 7 max + "Other" folded; re-run `validate_palette.js --mode dark` against `#17181a`; move accent off green collision (s3/s6) or drop one green series.
- Reserve status colours (on-track / near / over) for pace, never for categories (Copilot pattern, dataviz rule).
- Every chart: tap reveals exact values; legend when ≥2 series; direct labels ≤4.
