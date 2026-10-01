# Trickle v5 — Build Notes

## What v5 is
v5 extends v4's approved app (same 5-tab IA — Home / Categories / Savings /
Insights / Settings — same data model, same UPI-linked-or-manual constraint,
no SMS tracking anywhere) with a much larger, curated library of chart forms
and insights. It is one cohesive app, not an explorations file. Full artifact:
"Trickle — v5 (Visualization Library)".

## Process
1. Read v4 in full plus the design brief / build notes for continuity.
2. Wrote `claude/v5_visualization_plan.md` first — for every candidate chart
   type from the reference sheets (Information Is Beautiful poster, dark
   chart-type grid, etc.), judged fit/no-fit against Trickle's actual data
   (transactions, categories, budgets, goals, subscriptions), and for every
   fit, named the specific screen/insight and the seeded field driving it.
3. Built screen by screen, checking each before moving on: new SVG chart
   functions first, then wired into Categories, Home, Savings, and the
   Insights feed.
4. Validated: extracted `<script>` and ran `node --check` (passes), verified
   every `go(...)` target has a matching `data-frame` and every
   `openSheet(...)` a matching `data-sheet` (all resolve), and ran a
   Playwright smoke test through onboarding (manual path) → Home → Categories
   → category detail → Insights (scrolled through all 16 cards) → Savings →
   goal detail → Settings. Zero console errors, no horizontal overflow.
   Screenshots confirm each new chart renders with real computed values.

## What's new vs. v4, screen by screen
- **Home:** "Where Money Goes" card now shows a **sankey-lite flow diagram**
  (balance → top 4 categories by 30-day spend → "Saved") instead of the
  compact radial ring, giving a real money-flow read. Everything else on
  Home (stat triad, dot-matrix accumulation, subscriptions-due list, recent
  transactions) is unchanged.
- **Categories:** each category row now carries a **bullet graph** (spend vs.
  budget for the active period) directly under the existing segmented bar,
  in addition to the kept sparkline — a precise, compact budget-vs-actual
  read per row without a chart-per-category detail screen.
- **Category detail:** unchanged (area chart + budget dashline).
- **Insights:** grew from v4's 9 cards to **16 cards**. The 9 v4 cards are
  kept as-is (pace-to-budget, day/time heatmap, category drift, accumulation,
  subscriptions due, biggest outlier, savings velocity, discretionary/fixed
  donut, month-over-month). Seven new cards were added: transaction-size
  **histogram**, spending-shape **radar chart** (this week vs. 4-week
  average), small-purchase **waffle/pictogram** spotlight, top-merchant
  **bubble chart**, 30-day **range indicator** (min/median/max + today),
  14-day **diverging bar-per-day** chart, and an amount-vs-hour-of-day
  **scatter plot**.
- **Savings:** each goal card now also shows a **bullet graph** (saved vs.
  target) beside the existing rounded progress bar. The subscriptions
  "upcoming charges" strip was upgraded from 4 week-buckets to a proper
  **date-axis timeline** with exact due dates plotted on a 30-day axis.
- **Settings:** untouched, as directed.

## Seed data
No extension was required. v4's existing 68-day transaction history, 8-ish
category set, goals and subscriptions were rich enough to drive every new
form with genuine computed values (30-day histogram buckets, 4-week radar
average, top-6 merchant totals, 30-day min/median/max, 14-day diverging
deltas, hour-of-day scatter, sankey-lite category/savings split).

## Full list of distinct visual forms used, and where
1. Donut (with center stat) — Categories tab spend donut; Insights
   discretionary/fixed-split card.
2. Segmented/stacked bar — Categories tab per-row budget track.
3. **Bullet graph** *(new)* — Categories tab per-row (budget vs. actual);
   Savings per-goal (saved vs. target).
4. Dot-matrix grid — Home accumulation card; Insights accumulation card.
5. Calendar heatmap — Insights day/time pattern card.
6. Sparkline — Categories tab per-row trend; Insights weekly-total strip.
7. Area chart + dashed budget line — Category detail; Savings goal
   projection.
8. Diverging bar pair — Insights month-over-month card.
9. **Histogram** *(new)* — Insights transaction-size card.
10. **Radar/spider chart** *(new)* — Insights spending-shape card.
11. **Waffle/pictogram row** *(new)* — Insights small-purchase spotlight.
12. **Bubble chart (proportional area)** *(new)* — Insights top-merchants
    card.
13. **Range indicator (min/median/max)** *(new)* — Insights daily-range
    card.
14. **Diverging bar-per-day** *(new)* — Insights above/below-typical card.
15. **Sankey-lite flow diagram** *(new)* — Home "Where Money Goes" card.
16. **Date-axis timeline** *(new)* — Savings subscriptions card.
17. **Scatter plot** *(new)* — Insights "when you spend" card.

17 distinct forms, roughly 2.5x v4's count, each backing a specific,
computed insight (see `claude/v5_visualization_plan.md` for the full
fit/no-fit reasoning, including 15+ chart types explicitly excluded with
their reasons).

## Validation results
- `node --check` on the extracted `<script>` block: **pass**.
- Every `go('...')` target resolves to a `data-frame`; every
  `openSheet('...')` target resolves to a `data-sheet`: **pass** (checked
  programmatically).
- Playwright smoke test (manual-tracking onboarding path → Home →
  Categories → category detail → Insights, scrolled through all cards →
  Savings → goal detail → Settings): **zero console errors, no
  pageerrors, no horizontal overflow**.
- Spot-checked computed values against seed data (e.g. category
  spend-vs-budget bullet graphs, histogram bucket counts, sankey category/
  saved totals) — all sane and consistent with the existing 68-day seed.

## Artifact
Published as "Trickle — v5 (Visualization Library)" via the Artifact tool.
