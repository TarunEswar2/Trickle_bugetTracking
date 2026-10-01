# Trickle v7 — Phase Plan (agreed direction)

Constraint: tracking = UPI linkage or manual entry (+ Excel/CSV import). No SMS, and no notification scraping.

## Agreed decisions
- Money model: To assign (inbox) → Budget (spendable, the Home number) and Savings (goals + general). Balance = To assign + Budget + Savings, shown on the Money tab.
- All moves go through one Move money flow and are logged as transfers.
- Sweeps: Auto/Manual toggle. Manual leaves the swept amount in To assign (labelled "saved from budget", savings-only), and the user picks a goal.
- Overspend options: To assign → other category leftover → savings goal (shows goal slip) → let it go over. Shown before a UPI payment, and after a manual log.
- Tabs: Home | Money | Add | Savings | Insights. Settings in a side drawer opened from the avatar.
- Pay stays on Home. Add sheet = Log spend, Add income, Move money, Import Excel.
- Every chart is a widget: pin/hide/reorder, fixed sizes (S / W / L), not-enough-data state, top pins on Home.

## New decisions (24 Sep 2026)
- **Subscriptions live on Home only**: a compact card (next 3, due-soon chip) plus a subscription detail screen. They do not appear on Money or Savings.
- **Widgets use PIN**: widget edit mode and pinned widgets follow the app PIN (widget content is PIN-protected).
- **Budget period is chosen at onboarding**: monthly / weekly / match payday. Daily safe-to-spend is shown in every mode.
- **Visual direction = MIX**: near-black base + lime accent for actions and primary numbers; saturated category colours for cards and charts (big coloured % cards like the fitness ref).

## Phase status
- Phase 1 audit: done → `claude/v7_phase1_audit.md` (63 items: 29 keep / 19 merge / 15 drop).
- Phase 2 research + catalogue: done → `claude/v7_phase2_catalogue.md` (42 widgets, 9 refs mapped, 6 open questions). Board: https://claude.ai/artifact/VSjxJYMYpJhcSQ945aVrsL

## Phase 3 — Spec
Every screen and flow, widget catalogue with sizes and default order, data model (income, pools, transfers, rules, import rows, period config), visual system refresh. Checkpoint with the user, including answers to the open questions.

## Phase 4 — Build v7 on v6
Seed data with incomes, transfers and sweeps. Build: drawer, Home (incl. subs card), Money, Add sheet + flows, Savings, Insights widget board, onboarding updates (period picker + income + split rule step).

## Phase 5 — Validate + ship
Invariant check: pools always sum to the balance after every flow. Click-through, screenshot QA, publish, notes.
