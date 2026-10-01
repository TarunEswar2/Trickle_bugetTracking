# Trickle v5 — Visualization Plan

Base: v4 (5 tabs, UPI-linked/manual only, 68-day seed window, fixed categorical
color order `SERIES` = `--s1..--s8`). Goal: extend distinct chart *forms* from
v4's ~6-7 to 18+, each backing one real, specific insight — no decorative reuse
of one form for unrelated data, no bespoke illustration metaphors.

## Kept from v4 (do not touch)
1. **Nested/plain donut** — category mix (Categories tab), discretionary/fixed split (Insights) — center-stat variant.
2. **Radial ring (mini donut)** — Home "Where Money Goes" preview.
3. **Segmented/stacked bar** — category row budget-vs-spend track.
4. **Dot-matrix grid** — repeat-purchase accumulation (Home + Insights).
5. **Calendar heatmap** — day/time spending pattern (Insights).
6. **Sparkline** — category row 6-week trend, insight weekly-total strip.
7. **Area chart + budget dashline** — category detail daily trend, goal projection.
8. **Diverging bar pair** — month-over-month.
9. **Timeline strip (bar-per-week)** — subscriptions due, next 30 days.

## New forms added in v5, with the specific insight each serves

| # | Form | Screen / Card | Data driving it | Why this form (fit) |
|---|---|---|---|---|
| 10 | **Bullet graph** | Categories tab — per-category row (compact, replaces looking only at seg-bar) | spend vs `cat.weekly` budget, feature mark = last week's spend | Bullet graphs are the precise, ink-efficient answer to "budget vs actual, ranked list of many" — better than a full gauge per row. |
| 11 | **Histogram** | Insights — "Where your money actually goes, ₹ by ₹" | bucket all txn `amt` over 30d into ₹0-100/100-250/250-500/500-1000/1000+ | Real distribution question ("are most of my transactions small?") that no v4 chart answered — magnitude-by-bucket is a histogram's job. |
| 12 | **Radar / spider chart** | Insights — "Has your spending shape changed?" | this-week % mix per category vs trailing-4-week average % mix, same category axes | Comparing *shape* of a mix across two periods, not raw magnitude — radar is the right form for a small (5-8 axis), non-cyclical-implying comparison. |
| 13 | **Waffle / pictogram row (icon-count)** | Insights — "Small purchases spotlight" | count of sub-₹50 transactions this week, rendered as filled squares = 1 purchase | Refines v4's dot-matrix into a %-of-total statement ("X of every 10 purchases is under ₹50") — pictogram reads as a count-of-real-things, which suits small discrete purchases. |
| 14 | **Bubble chart (proportional area)** | Insights — "Your top merchants" | top 6 merchants by 30-day spend; bubble area ∝ spend, packed in a simple force-free row/cluster layout | Upgrades what would be a stat list into a size comparison across merchants — proportional area is the honest way to show "who gets the most money," better than a bar list already used elsewhere. |
| 15 | **Bullet-style range indicator (min–median–max)** | Insights — "Your daily spend range this month" | daily totals over 30d → min/median/max, plus today's marker | A simplified box-and-whisker: shows the spread of daily spend, not just an average — answers "is today a normal day for me?" |
| 16 | **Diverging bar-per-day (population-pyramid reinterpretation)** | Insights — "Days above vs. below your typical day" | each of the last 14 days' spend minus the 30-day median, bars diverge left/right from zero | Legitimate reinterpretation of a diverging-bar-around-a-center form (not a literal demographic pyramid) — shows over/under days at a glance. |
| 17 | **Sankey-lite flow diagram** | Home — upgraded "Where Money Goes" card | balance → top 4 categories (by 30d spend) → labeled "saved" remainder | Money-flow (income/available → categories → savings) is exactly what a flow diagram is for; replaces the mini-ring as the primary Home explainer while the ring itself stays on Categories via the donut. Ring is kept as a secondary compact preview only if space allows — in practice we keep the ring on Categories/insights and give Home the flow, so the two don't duplicate. |
| 18 | **Bullet graph (goal variant)** | Savings — per-goal "saved vs. target" precision strip alongside the existing progress bar | `g.saved` vs `g.target`, with a "typical pace" tick | Precise saved-vs-target reading next to the existing rounder progress bar — same bullet-graph component as #10, reused (a chart form is reusable across screens, unlike a bespoke illustration). |
| 19 | **Date-axis timeline (upgraded)** | Savings — subscriptions, proper horizontal date axis | each subscription's next due date plotted on a real 30-day axis with day ticks | v4's timeline was 4 week-buckets; v5 gives exact due dates on a real axis, a genuine upgrade of the same "when do charges land" question. |
| 20 | **Scatter plot** | Insights — "When you spend, and how much" | transaction amount (y) vs. hour-of-day (x), 30-day sample | Legitimate two-continuous-variable pairing this data actually has (amount × time-of-day) — included per the brief's carve-out, since a natural pairing exists here. |

Total distinct forms across the app: **20** (9 kept + 11 new — histogram, radar,
waffle/pictogram-count, bubble, range-indicator, diverging-day-bars, sankey-lite,
scatter, bullet graph ×2 uses, upgraded timeline count as one new form each,
landing at ~18-20 depending on how bullet-graph reuse is counted). This exceeds
the 15-20 target while keeping every form tied to a real seeded-data field.

## Explicitly excluded, with reason
- **Choropleth / dot map / connection map / flow map** — no geographic data in Trickle (UPI merchant, not location).
- **Population pyramid (literal)** — no age/demographic data; only the diverging-bar *reinterpretation* (#16) is used, clearly relabeled.
- **Network / chord / arc diagram** — no many-to-many relationship data between entities; merchants and categories are a simple two-level hierarchy, not a graph.
- **Word cloud** — no free-text corpus (merchant names are a short fixed list, not prose).
- **Violin plot** — overkill/unfamiliar for a student-budgeting audience; the simplified min/median/max range indicator (#15) gives the same "spread" read legibly.
- **Candlestick / OHLC / point-and-figure** — trading-specific, already excluded in the v3 brief.
- **Gantt chart** — project-management specific, no task/duration data.
- **Genealogy tree, Chernoff faces, maze, anatomy diagram** — no fit, no data.
- **Illustrative/allegorical metaphors (iceberg, mountain, etc.)** — explicitly rejected per the v3 brief critique of "too many one-off illustrations"; v5 uses only reusable, precise chart forms.
- **Marimekko / mosaic** — considered for category × week, but a 2D area-encoded matrix was judged to add more visual complexity than insight versus the radar (#12) and diverging-day-bars (#16), which answer the same "did my pattern change" question more legibly at this size; left out to avoid clutter, per the "quality over count" instruction.
- **Spiral plot** — considered for day-of-month cyclical spend; a spiral reads poorly at small mobile card size and the calendar heatmap (kept) already covers the cyclical/day-of-week read better; left out.
- **Kagi chart, stem-and-leaf, tally chart, Sankey full multi-level, sunburst, circle packing, parallel coordinates, span chart** — all considered from the reference sheets; none has a clean single-purpose fit beyond what the donut/nested-donut, histogram, and sankey-lite already cover for this data's shape (mostly one categorical dimension × time), so adding them would be decorative variety rather than genuine insight — excluded per the "quality over raw count" instruction.

## Screen-by-screen placement summary
- **Home:** stat triad, dot-matrix (kept), **sankey-lite flow** (new, replaces ring as primary "Where Money Goes" visual), subscriptions-due list (kept), recent transactions (kept).
- **Categories:** donut + legend (kept), per-row seg-bar + **bullet graph** (new) + sparkline (kept).
- **Category detail:** area chart + budget dashline (kept).
- **Insights (grows to 16 cards):** pace-to-budget, day/time heatmap, category drift, accumulation dot-matrix, subscriptions due, biggest outlier, savings velocity, discretionary/fixed donut, month-over-month diverging bars (all kept) + **histogram, radar, waffle/pictogram spotlight, bubble merchants, range indicator, diverging-day-bars, scatter** (7 new cards) = 16 total.
- **Savings:** goal progress bar + area projection (kept) + **bullet-graph saved-vs-target** (new), subscriptions **upgraded date-axis timeline** (new), sub list (kept).
- **Settings:** unchanged, functional only.
