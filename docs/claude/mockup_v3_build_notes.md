# Trickle Mockup v3 — Build Notes

**Artifact:** https://claude.ai/artifact/L9VJo936ykgGhfuzaA5BUw ("Trickle — Final Redesign")
**Source file:** `trickle-final-v3.html`, built on the functional base of `trickle-v2.html` (same data model: `TXNS`/`CATS`/`GOALS`/`SUBS`/`ACCOUNTS`, `esc()`, `money()`, date helpers, `go(name)` nav, `openSheet()`/`closeSheet()` overlays, `renderAll()`).

## What changed vs. trickle-v2

- **Visual system**: full dark-theme rewrite (`--ink`/`--surface`/`--surface2`/`--surface3` layering, single accent `#5bb98c`, muted non-alarming deltas — no red flashing anywhere). All colors defined as CSS custom properties.
- **Categorical palette**: the dataviz-skill validated 8-hue dark categorical order (`#3987e5, #d95926, #199e70, #c98500, #d55181, #2fae2f, #9085e9, #e66767`), assigned by fixed category index (never re-cycled) and reused for the donut, category dots, segmented bars, and transaction-row dots.
- **IA unchanged**: still 5 tabs (Home / Categories / Savings / Insights / Settings), no merges or splits, per the brief.
- **New Home surface**: a "Subscriptions Due" card (due-sorted, badge on soonest, monthly total) added beside the existing accumulation card, per the brief's flagged addition.
- **No SMS tracking anywhere** — confirmed by grep; the app is UPI-linkage or manual entry only, matching the non-negotiable constraint.

## The 5 reusable components (each used on 2+ screens)

1. **Stat-card triad** (label + big number + small delta) — Home hero (Today/This Week/This Month), Category detail (Spent/Budget/Left), Subscriptions-due stat card in Insights, Savings subscription summary.
2. **Segmented/stacked bar** — Category rows (spend-relative-to-max bar), the Insights discretionary-vs-fixed split, and the existing friction-sheet bar (restyled, not rebuilt).
3. **Dot-matrix grid** — Home accumulation card (repeat-purchase count) and the Insights accumulation-spotlight card.
4. **GitHub-style heatmap calendar** — Insights "day of the week" card, replacing the old 7-bar chart; 5-week, Monday-first grid with a sequential blue ramp and a low→high legend.
5. **Pill w/ %change + sparkline** — `pctPill()` used in Category rows and the Insights category-drift card; `sparkline()` helper included for trend-at-a-glance use (wired for future goal/category trend cards).

## The 8 insights (visual form as specified in the brief)

1. Pace-to-budget forecast → burn-down bar with a pace marker (vertical tick at "steady pace" position) + projected week-end total.
2. Category drift vs. prior period → pill with %change.
3. Small-purchase accumulation → dot-matrix grid, one dot per purchase instance.
4. Day/time spending pattern → heatmap calendar (replaced the old bar chart).
5. Subscriptions due → due-sorted list + monthly/yearly/next-due stat triad.
6. Biggest single-transaction outlier → stat card (merchant, category, amount, rest-of-day context).
7. Savings goal velocity → progress bar + computed projected-completion-date text (`goalVelocity()`, using each goal's contribution history to derive a daily rate).
8. Discretionary vs. fixed/recurring split → two-segment stacked bar (fixed = subscription categories + Necessities/Groceries/Rent).

All values are computed live from the seeded 35-day transaction store — nothing is hardcoded.

## Explicitly excluded (per brief)

No candlestick charts, no long/short-style charts, no holders/whale framing, no peer/benchmark insight, no trading jargon ("portfolio," "holders," "position" do not appear), no flashing/urgent deltas.

## Screens left close to trickle-v2's simpler treatment

Payment flow (scan / pay-anyone / bank-transfer / amount / confirm), Settings, and onboarding — restyled to the dark theme but structurally unchanged, per the brief's guidance that the redesign focus is Home/Categories/Insights/Savings.

## Validation

- `node --check` on the extracted `<script>` block: passes.
- Every `go(...)` target has a matching `data-frame`; every `openSheet(...)` target has a matching `data-sheet` (32 frames, 8 sheets, no mismatches).
- Playwright smoke test: splash → onboarding (UPI path and manual path both tested) → home (subscriptions-due card and dot-matrix both render with real data) → categories (7 segmented bars, 7 pills) → insights (all 8 cards render, 1 heatmap, 1 dot-matrix) → savings (goal velocity text confirmed, e.g. "At ₹458/day, about 33 days to go — around 26 Oct.") → settings → full payment flow (scan → amount → friction sheet → confirmed). No console/page errors, no horizontal overflow (documentElement.scrollWidth === window.innerWidth).

## Known deviations / notes

- Home's "This Month" stat originally had a month-over-month delta, but the 35-day seed depth makes a prior-month comparison unreliable (too little prior data) — replaced with an honest "avg ₹X/day" context line instead of a misleading percentage.
- The category segmented bar is spend-relative-to-the-largest-category (a proportional bar), not a spent/budget/remaining three-segment bar — the latter is preserved as-is on Category Detail's existing progress bar and the friction sheet, which already carried that exact framing in trickle-v2.
