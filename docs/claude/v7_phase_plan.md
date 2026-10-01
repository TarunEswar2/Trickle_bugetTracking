# Trickle v7: Phase Plan (agreed direction)

Constraint: tracking = UPI linkage or manual entry (+ an Excel import placeholder). No SMS and no notification scraping.

## Agreed decisions
- Money model: To assign (inbox) → Budget (spendable; the Home number) and Savings (goals + general). Balance = To assign + Budget + Savings, shown on the Money tab. All moves are logged as transfers.
- Sweeps: an Auto/Manual toggle in Savings. In Manual mode the swept amount is shown so the user can assign it to a goal.
- Every chart is a widget: pin / hide / drag reorder, fixed sizes S / W / L, a not-enough-data state, top pins on Home.

## User decisions (24 Sep 2026, authoritative)
- **Tabs: Home | Money | Actions | Savings | Insights.** Settings and the rest live in a side drawer opened from the avatar (top-left). Pay (Scan / Contact / Bank) stays on Home.
- **Actions tab = To-do inbox + Add.** Every inbox item can be resolved in one tap: income to assign; leftover budget to sweep (a manual sweep nudge; at period end the app sends a notification and badges the tab, and nothing moves automatically); splits to settle; overspend carried to next period; subscriptions due soon; uncategorised spends. Add: Log spend, Add income, Move money, Import Excel (a PLACEHOLDER screen only; format TBD). The tab shows a badge count. Home shows one chip, "N things need you", linking to Actions.
- **Overspend at purchase** (before a UPI payment, and after a manual log): cover from To assign → another category's leftover → a savings goal (showing the goal slip) → let it go over (deducted from next period's budget, shown clearly). No goal PIN lock.
- **Splits:** any payment can be marked Split. The full amount leaves the budget immediately, and "Settle split" appears in the Actions inbox, where the user enters people and shares (or splits equally). Friends' shares become "Owed to you", which is NOT counted in the budget or the balance. When a friend repays via UPI (or manually), the repayment shows like income labelled "Settling split". It closes the IOU and the money returns to where it came from (the budget, or the goal if it was covered from a goal). The Owed-to-you list and visual live on Money.
- **Subscriptions live on Home only** (compact card + detail screen + due-soon chip), and also appear in Actions when due.
- **Income categories:** Allowance, Stipend, Part-time, Freelance, Scholarship, Gift, Refund, Other, plus user-custom categories.
- **Budget period** is chosen at onboarding (monthly / weekly / match payday). Daily safe-to-spend is always shown.
- **Widget PIN:** widget edit mode follows the app PIN.
- **Visual = MIX:** near-black base; lime accent for actions and primary numbers; saturated category colours for cards and charts; big coloured % cards (fitness ref); dotted rings + lime hero card (telecom ref); gradient hero + huge % (FreeDom ref); waffle; pill blocks; quarter-circle glyph tiles; dashed-future calendar; 2×2 insight cards.

## Phase status
- Phase 1 audit: done → `claude/v7_phase1_audit.md`.
- Phase 2 catalogue: done → `claude/v7_phase2_catalogue.md` (board: https://claude.ai/artifact/VSjxJYMYpJhcSQ945aVrsL).
- **Phase 3 spec: done → `claude/v7_phase3_spec.md`** (57 frames + 6 sheets, 44 widgets, data model with split/IOU invariants, seed spec, validated palette). Awaiting the user's answers to the spec's 5 open questions.

## Phase 4: Build v7 on v6
Seed data (incomes, transfers, sweeps, splits, carry, inbox at today). Build: drawer, Home (hero, chip, pay, pins, subs), Money (+ Owed), Actions inbox + resolve flows + Add flows, cover sheet, Savings, Insights board/edit/library, onboarding updates (period, income, split-rule/sweep steps).

## Phase 5: Validate + ship
Invariant check after every flow: to_assign + budget + savings == balance, and owed is never in the balance. Click-through, screenshot QA, publish, notes.
