# Trickle v6 — 5-Phase Plan

Goal: every screen (including onboarding) is visual-first. Base features stay: UPI linkage or manual entry only (no SMS, ever), Home (tracking method, small-purchase accumulation, transaction history), Categories (spend + budget edit), Savings (goals + subscriptions + due dates), Insights, Settings. v6 builds on v5 (trickle-final-v5.html), not from scratch.

## User-assigned reference mappings
- Ref 1 (concentric radial arcs, "YEARS" chart) → category spending % (nested radial bars, one arc per category, arc length = share of spend).
- Ref 2 (pie with callouts + stacked column "fill jars" beneath) → month-wise category spending (pie for this month, filled column per category showing month-by-month fill).
- Ref 3 (dark chart-type library) → form catalogue to mine.
- Ref 4 ("Music in Your Life" infographic) → layout language: callout labels, icon-in-center donuts, small-multiple radial gauges, time-of-day radial, 12h/24h area strips, half-donut average vs total.

## Phase 1 — Audit and inventory
- Screen-by-screen audit of v5: list every remaining text-only element, every chart, where charts repeat, what's weak.
- Onboarding audit: currently plain forms (method, UPI, categories, PIN, permissions, all set) — list what each step could show visually.
- Data inventory: every field the data model holds (amount, merchant, category, timestamp, day, hour, method UPI/manual, account, goal, contributions, subscription cycle/due date, budget) and every derived metric possible (shares, trends, pace, frequency, recurrence, ranges, streaks, projections).
- Output: audit doc.

## Phase 2 — Research
- Web research: budgeting visualizations in Copilot, Monarch, YNAB, Cleo, Rocket Money, Fi, Jupiter, CRED; infographic/dataviz references (Information is Beautiful, Data Viz Catalogue, FT Visual Vocabulary).
- Onboarding patterns that use visuals (live preview of budget as you pick categories, animated allocation, visual PIN, permission explainers as diagrams).
- For every chart type in Ref 3 + Ref 4: fit / no-fit for budget data, the budget question it answers, data fields driving it.
- Output: a visualization catalogue (target 30+ candidate budget-question × chart pairings), dataviz-skill checked.

## Phase 3 — Design spec
- Assign visuals per screen so every page is visual-filled, including onboarding, transactions, transaction detail, manual entry, payment flow (friction sheet visual), savings, subscriptions, settings (light touches e.g. account/linkage status diagram).
- Apply the reference mappings above explicitly.
- Onboarding reimagined: e.g. tracking-method choice as a diagram, category picker that builds a live radial/treemap of starter budget, budget allocation slider with live pie, permissions as a simple flow diagram, "All set" screen as a preview dashboard of what they'll see.
- Visual system: one palette with fixed category hue order (validated with dataviz validator), infographic-style callouts, icon-in-center donuts, consistent card anatomy; rules to keep density legible.
- Output: design spec doc, reviewed against v3 brief critique (no one-off illustration metaphors; real computed charts only).

## Phase 4 — Build
- Extend v5 data seed if needed (e.g. 3+ months for month-wise charts, hour-of-day, contributions history).
- Build order: onboarding → Home → Categories (+detail) → Insights → Savings (+goal/sub detail) → transactions/payment/manual entry → settings.
- Every chart real SVG computed from data; tap reveals exact values.

## Phase 5 — Validate and ship
- node --check, go()/openSheet() target audit, Playwright click-through of every screen and both onboarding paths, screenshots, overflow/console checks, spot-check computed values.
- Visual QA pass against references; fix collisions/overlaps (e.g. v5 bubble overlap).
- Publish artifact "Trickle — v6"; write build notes to project.
