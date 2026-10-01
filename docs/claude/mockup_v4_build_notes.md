# Trickle v4 — Build Notes (Visualization-First)

Artifact: https://claude.ai/artifact/8JEJ2hnQ34rUvXxNc4yfjr
Base file: `trickle-final-v3.html` → `trickle-final-v4.html` (extended in place, not rewritten)

## Why
User feedback on v3: "push the visual aspect and data visualisation... push everything to be visual." v4 keeps v3's IA (5 tabs), constraints (no SMS tracking — UPI-linked or manual only), and all 8 original insights intact, and pushes visualization density and precision across every data-facing screen.

## Research applied
Looked at sparkline/micro-chart technique, radial/gauge progress, richer calendar heatmaps, small multiples, diverging bars, area-with-projection-band forecasting, and how Copilot Money / Monarch / YNAB-style apps layer visualization without becoming unreadable. Applied via the `dataviz` skill's guidance: fixed categorical hue order (`SERIES` array, unchanged from v3, reused everywhere so a category's color is constant across Home/Categories/Insights), sequential blue ramp for heat intensity, gradient-filled area marks with an explicit stroke, dashed reference/target lines instead of second solid series, and center-stat donuts instead of plain segmented bars where a single ratio is the point.

## Seed-data extension
`seedTransactions()` window extended from 35 days to **68 days** (`for(var d=67; d>=0; d--)`). This makes a real trailing-30-vs-prior-30 comparison possible for the first time, which directly closes the v3 gap noted in `mockup_v3_build_notes.md` (Home's "This Month" stat previously showed an avg-₹/day workaround because there wasn't a full prior month of data).

## Screen-by-screen changes vs v3

**Home**
- "This Month" stat card now shows a real month-over-month % delta (`deltaHtml(monthTot, prevMonthTot)`) instead of the avg-₹/day fallback.
- New "Where Money Goes" card: a compact radial ring (`drawMiniRing`) showing last-30-day category composition, with a legend listing top 4 categories by %. Uses the same category color mapping as everywhere else.

**Categories**
- Each category row now carries a 6-week mini sparkline (`weeklyTrend()` + existing `sparkline()` helper) under the segmented bar, so trend is visible without opening the row.
- Category Detail gets a new gradient-filled area chart (`drawCatArea`) of daily spend over a fixed trailing 21-day window, with a dashed daily-budget reference line — independent of the Today/Week/Month toggle so it never degenerates to a single point.

**Insights** (flagship; kept all 8 original cards, upgraded 3, added 1 new)
- Card 1 (Pace to budget): added a shaded projection band from current pace to projected week-end spend, alongside the existing pace marker.
- Card 2 (Day of week heatmap): added a 5-week weekly-total sparkline strip beneath the heatmap grid.
- Card 8 (Discretionary vs. fixed): upgraded from a plain stacked bar to a donut with a centered "% fixed" stat.
- New card 9 (Month over month): a diverging bar pair (`divergingPair`) comparing the last 30 days to the prior 30 days — a genuinely new insight enabled by the extended seed window, not a swap for anything removed.

**Savings**
- Goal Detail gets a projection area chart (`drawGoalProjection`): solid gradient area for saved-so-far, a dotted forecast line from "today" to the dashed target line, using the existing `goalVelocity()` pace math.
- Savings tab gets a 4-week upcoming-charges timeline strip (`sub-timeline`) bucketing subscription due-dates into weekly bars.

**Settings / payment flow**
- Left close to functional/plain as instructed — no visualization added.

## Validation
- `node --check` on the extracted `<script>` passed clean.
- Every `go(...)` target matched to a `data-frame`, every `openSheet(...)` matched to a `data-sheet` (scripted check, zero mismatches).
- Playwright smoke test (420×900 viewport): onboarding→home, Where Money Goes, Categories→category detail, Insights (scrolled through all 9 cards), Savings→goal detail, Settings. Zero console errors, zero horizontal overflow across all frames.
- Spot-checked computed values against seed data: this-month vs prior-month totals differ meaningfully (~309–320 seeded transactions across 68 days depending on run), discretionary/fixed donut and MoM diverging bars matched the underlying `sum()`/`txnsBetween()` calls.

## Constraint check
No SMS-based tracking anywhere — all new visualizations derive from the existing UPI-linked/manual transaction data model (`TXNS`, `CATS`, `SUBS`, `GOALS`); nothing new was introduced that implies SMS parsing.
