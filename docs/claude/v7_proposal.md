# Trickle v7 — Proposal (income, pools, balance) — DRAFT for approval

Constraint unchanged: tracking = UPI linkage or manual entry (+ Excel/CSV import for manual). No SMS.

## Money model
- Three pools: Unassigned (just arrived) → Budget (spendable, shown on Home) and Savings (per goal + general).
- Balance = Unassigned + Budget + Savings. Shown on its own screen, not on Home.
- Every rupee moves via one "Move money" flow: allocate income, sweep leftover budget to savings, withdraw savings back to budget. All moves are logged as transfers (not spend, not income).
- UPI mode: incoming UPI credits land in Unassigned with a prompt to split. Manual mode: Add sheet has Spend | Income toggle.

## Tabs (5 + centre add button)
1. Home — budget left, safe-to-spend today, days left in period, Unassigned inbox chip, recent activity.
2. Money — Income + Balance: income sources, calendar of expected income, pools breakdown, cash-flow in vs out, balance history.
3. (+) — add Spend / Income / Move / Import.
4. Categories — spend categories (+ income categories as a second segment).
5. Savings — goals, sweeps, savings statistics, subscriptions stay here (or move to Money — open question).
Insights: becomes a section inside Money and Categories, or stays a tab and Settings moves to the avatar. Open question.

## New features and flows
- Income entry: amount, source (Allowance, Stipend, Part-time, Freelance, Scholarship, Gift, Refund, Other), recurring toggle, date.
- Allocation split on arrival: slider or preset rules (e.g. 80/20 budget/savings), per-goal targets.
- Allocation rules: auto-split recurring income by rule.
- Sweep rules: leftover daily or weekly budget moves to a chosen goal (auto or ask).
- Withdraw from savings: friction screen showing goal impact.
- Overspend handling: cover from Unassigned or savings, with a visual of the cost.
- Excel/CSV import: upload → column mapping → preview table → duplicate check → auto-categorise with rules → confirm.
- Recurring income calendar (payday markers, dashed future days).
- Month close summary: in vs out, saved, swept, carried over.

## Visualisations (refs mapped)
- Waffle 10x10 (Bloomberg 67%) → share of income sent to savings vs budget.
- Rounded pill blocks → income source mix (pill size = amount).
- Quarter-circle glyph tiles → icon system for income sources and pools.
- Big coloured % bars (fitness app) → budget used per category.
- Calendar with dashed future days (activity app) → income and payday calendar.
- 2x2 insight cards with half-gauge (twitch) → Money tab insight grid.
- Dotted progress rings + bright hero card (telecom) → pools rings; days left in budget period.
- Soft gradient hero + big % (FreeDom bank) → savings goal hero.
- Daily range bars (candlestick-like, budget open→close per day, no trading language) → budget burn per day. Optional.
- Sankey: income sources → pools → categories/goals.
- Stacked area → balance over time split by pool.
- Diverging bars → in vs out per week.

## 5-phase plan for v7
1. Audit v6 against the new money model; data model spec (income, pools, transfers, rules, import rows).
2. Research: income and envelope flows (YNAB, Goodbudget, Monarch, Jupiter pots, Fi jars), import UX, refs study → catalogue.
3. Design spec: IA, every screen and flow, chart per screen, visual system refresh from refs.
4. Build v7 on v6: seed data with incomes and transfers, all flows working.
5. Validate (click-through, maths check: pools always sum to balance), screenshot QA, publish, notes.
