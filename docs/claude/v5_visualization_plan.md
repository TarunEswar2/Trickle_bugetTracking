# Trickle v5 — Visualization Plan

Base: v4 (5 tabs, UPI-linked/manual only, 68-day seed window, fixed categorical
color order `SERIES` = `--s1..--s8`). Goal: extend distinct chart *forms* from
v4's ~6-7 to 18+, each backing one real, specific insight — no decorative reuse
of one form for unrelated data, no bespoke illustration metaphors.

## Kept from v4 (do not touch)
1. **Nested/plain donut** — category mix (Categories tab), discretionary/fixed split (Insights) — center-stat variant.
2. **Radial ring (mini donut)** — used for the category donut center-stat family; the Home mini-ring specifically is retired in v5 (see #17).
3. **Segmented/stacked bar** — category row budget-vs-spend track.
4. **Dot-matrix grid** — repeat-purchase accumulation (Home + Insights).
5. **Calendar heatmap** — day/time spending pattern (Insights).
6. **Sparkline** — category row 6-week trend, insight weekly-total strip.
7. **Area chart + budget dashline** — category detail daily trend, goal projection.
8. **Diverging bar pair** — month-over-month.
9. **Timeline strip** — upgraded to a real date axis in v5 (see #19).

## New forms added in v5, with the specific insight each serves

| # | Form | Screen / Card | Data driving it | Why this form (fit) |
|---|---|---|---|---|
| 10 | **Bullet graph** | Categories tab — per-category row (compact, alongside the seg-bar) | spend vs `cat.weekly`/`cat.daily` budget for the active period | Bullet graphs are the precise, ink-efficient answer to "budget vs actual, ranked list of many" — better than a full gauge per row. |
| 11 | **Histogram** | Insights — "Transaction sizes" | bucket all txn `amt` over 30d into ₹0-100/100-250/250-500/500-1000/1000+ | Real distribution question ("are most of my transactions small?") that no v4 chart answered — magnitude-by-bucket is a histogram's job. |
| 12 | **Radar / spider chart** | Insights — "Has your spending shape changed?" | this-week % mix per category vs trailing-4-week average % mix, same category axes | Comparing *shape* of a mix across two periods, not raw magnitude — radar is the right form for a small (5-7 axis), non-cyclical comparison. |
| 13 | **Waffle / pictogram row** | Insights — "Small purchases spotlight" | count of sub-₹50 transactions this week, one filled square per purchase | Refines v4's dot-matrix into a %-of-total statement ("X% of purchases are under ₹50") — a pictogram reads as a count of real things, which suits small discrete purchases. |
| 14 | **Bubble chart (proportional area)** | Insights — "Top merchants" | top 6 merchants by 30-day spend; bubble area ∝ spend | Upgrades a stat list into a size comparison across merchants — proportional area is the honest way to show "who gets the most money." |
| 15 | **Range indicator (min–median–max)** | Insights — "Daily spend range" | daily totals over 30d → min/median/max, plus today's marker | A simplified box-and-whisker: shows the spread of daily spend, not just an average — answers "is today a normal day for me?" |
| 16 | **Diverging bar-per-day** | Insights — "Above vs. below typical" | each of the last 14 days' spend minus the 30-day median, bars diverge left/right from zero | Legitimate reinterpretation of a diverging-bar-around-a-center form (not a literal demographic pyramid) — shows over/under days at a glance. |
| 17 | **Sankey-lite flow diagram** | Home — "Where Money Goes" card | balance → top 4 categories (30d spend) → "Saved" remainder | Money-flow (available → categories → savings) is exactly what a flow diagram is for; replaces the mini-ring as Home's primary explainer (the donut stays as the category-mix chart on Categories, so the two don't duplicate). |
| 18 | **Bullet graph (goal variant)** | Savings — per-goal "saved vs. target" strip alongside the existing progress bar | `g.saved` vs `g.target` | Same reusable bullet-graph component as #10, giving a precise reading next to the rounder progress bar. |
| 19 | **Date-axis timeline** | Savings — subscriptions | each subscription's next due date plotted on a real 30-day axis | Upgrades v4's 4-week-bucket strip to exact due dates on a real axis — a genuine upgrade of the same "when do charges land" question. |
| 20 | **Scatter plot** | Insights — "When you spend" | transaction amount (y) vs. hour-of-day (x), 30-day sample | A legitimate two-continuous-variable pairing this data actually has (amount × time of day). |

Total distinct visual forms across the app: **~18** (9 kept, some upgraded in place, + 9-11 new depending on how the two bullet-graph placements and the donut/ring family are counted). This meets the 15-20 target while keeping every form tied to a real seeded-data field — no filler forms.

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
- **Marimekko / mosaic** — considered for category × week, but a 2D area-encoded matrix added more visual complexity than insight versus the radar (#12) and diverging-day-bars (#16), which answer the same "did my pattern change" question more legibly at card size; left out to avoid clutter.
- **Spiral plot** — considered for day-of-month cyclical spend; reads poorly at small mobile card size and the calendar heatmap (kept) already covers the cyclical/day-of-week read better; left out.
- **Kagi chart, stem-and-leaf, tally chart, full multi-level sankey, sunburst, circle packing, parallel coordinates, span chart** — considered from the reference sheets; none has a clean single-purpose fit beyond what the donut/nested-donut, histogram, and sankey-lite already cover for this data's shape (mostly one categorical dimension × time) — adding them would be decorative variety rather than genuine insight.

## Screen-by-screen placement summary
- **Home:** stat triad, dot-matrix (kept), **sankey-lite flow** (new, replaces the mini-ring as the primary "Where Money Goes" visual), subscriptions-due list (kept), recent transactions (kept).
- **Categories:** donut + legend (kept), per-row seg-bar + **bullet graph** (new) + sparkline (kept).
- **Category detail:** area chart + budget dashline (kept, unchanged).
- **Insights (grows from 9 to 16 cards):** pace-to-budget, day/time heatmap, category drift, accumulation dot-matrix, subscriptions due, biggest outlier, savings velocity, discretionary/fixed donut, month-over-month diverging bars (all kept) + **histogram, radar, waffle/pictogram spotlight, bubble merchants, range indicator, diverging-day-bars, scatter** (7 new cards).
- **Savings:** goal progress bar + area projection (kept) + **bullet-graph saved-vs-target** (new); subscriptions gain an **upgraded date-axis timeline** (new); sub list (kept).
- **Settings:** unchanged, functional only.

## Seed-data notes
No seed-data extension was needed — v4's existing 68-day transaction window,
8-category set, goals and subscriptions were sufficient to drive all 11 new
forms (histogram buckets, radar's 4-week average, bubble merchant totals,
30-day min/median/max range, 14-day diverging bars, hour-of-day scatter, and
the sankey-lite flow) with real computed values, no synthetic filler.
