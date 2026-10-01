# Trickle v11: Phase 5, Money model and budget setting

Locked inputs: ■ = ₹100 (rows of 10 = ₹1,000, 5|5 gap, partial tile below ₹100). Income → Savings + Budget; Budget = Subscriptions (fixed, hatched, auto-deducted on due date) + Categories. One decision per screen, ≤2 numbers on first view, no budget on Home, no red, no badges. Sources: UPI link or manual entry only (no SMS).

## Diverge: 9 budget-setup approaches
| # | Approach | How it feels | Decisions | Time | Risk |
|---|---|---|---|---|---|
| A | Suggested from income (history + defaults) | "Here's a plan, OK?" | 1 (accept) + optional tweaks | ~15 s | may feel imposed if suggestion is off |
| B | 50/30/20-style presets (needs / wants / save) | pick a ratio | 1 of 3 | ~10 s | Western rule; students' "needs" are often paid by family |
| C | Drag tiles between jars | tactile, visual | many (one per tile move) | 60–120 s | fun once, tedious as setup; v7 slider problem in tile form |
| D | One slider (savings ↔ spend) | single control | 1 | ~10 s | categories still need values; hides them |
| E | Copy last month | zero thought | 1 | ~5 s | useless in month 1 |
| F | Student-type templates (hostel, day scholar, PG/renting, working part-time) | "that's me" | 1 of 4 | ~10 s | stereotyping; still needs amounts |
| G | Conversational ("How much comes in? Do you pay rent?") | friendly | 4–6 questions | 45–60 s | slow; each Q is a decision |
| H | Envelope cash count ("How much do you spend on food a week?") per category | precise | 5+ | 60 s+ | v7-style form |
| I | Start with no budget, learn 2 weeks, then suggest | zero setup | 0 now, 1 later | 0 s | no guidance in the hardest first weeks |

## Converge: hybrid A + F + E, with D as the only edit control on the savings step
Scored on (decisions, seconds, taps, honesty of default, month-1 usefulness):
- **A wins the core**: one accept is the fewest decisions and defaults are the strongest lever we have (Madrian & Shea 2001).
- **F feeds A in month 1**: picking "hostel / day scholar / renting / earning" is the one question that changes the default category mix most (rent, mess, travel). It replaces G's 5 questions with 1 tap.
- **E feeds A from month 2**: the suggestion becomes "same as last month, adjusted by what you actually spent". No extra screen.
- **D is kept only for savings**: a single "save more / save less" stepper in whole tiles, because savings is the one number a student cares about deciding.
- **C is kept as an edit mode, not a setup mode**: moving tiles between categories later is direct manipulation, fine for 1–2 tweaks.
- Rejected: B (ratios foreign to students with family-paid needs), G/H (too many decisions), I (no help when it matters; kept as the fallback "Skip for now" which uses defaults silently).

## Final setup flow (4 screens, 4 taps, ~25 s)
| Step | Screen shows | One decision | Default | Numbers on first view |
|---|---|---|---|---|
| S1 | "What comes in each month?" UPI-linked income detected, or number pad | confirm amount | detected ₹9,000 (seed) | 1 |
| S2 | "Which is most like you?" 4 cards: Hostel, Day scholar, Renting, Earning | pick one | Hostel | 0 |
| S3 | "Put this much away first?" savings rows of tiles, stepper −/+ one tile | accept or step | 15% rounded to tile = ₹1,400 (14 ■) | 1 |
| S4 | "Your month" split bar: Savings rows / Subscriptions hatched / categories. Tap Start | Start | suggested | 0 (exact ₹ on tap) |
Subscriptions are pre-filled from UPI AutoPay mandates when linked (Spotify ₹119, Google One ₹130, Coursera ₹399 in seed); otherwise added later. They appear already inside S4 as the hatched block; no separate step.

Default category mix (share of spendable after subs), by type:
| Type | Food | Travel | Study | Fun | Other |
|---|---|---|---|---|---|
| Hostel | 45% | 15% | 10% | 20% | 10% |
| Day scholar | 30% | 30% | 10% | 20% | 10% |
| Renting | 40% (rent handled as a subscription) | 15% | 10% | 20% | 15% |
| Earning | 35% | 20% | 10% | 25% | 10% |
Rounded to whole tiles; remainder goes to Other so the ledger closes exactly.

Seed (Tarun, hostel): income ₹9,000 → Savings ₹1,400 → Budget ₹7,600 = Subs ₹648 + Categories ₹6,952 → Food ₹3,100, Travel ₹1,000, Study ₹700, Fun ₹1,400, Other ₹752.

## Money events
**Income arrival (auto-split).** UPI credit ≥ ₹500 from a known source or tagged "income" → sheet: "₹9,000 came in. Split like last time?" tiles animate into Savings then Budget. One button **Split it**; toast "Split. Undo" for 8 s. Unknown credits (a friend paying back) ask one question: "Is this money for your month, or a friend paying you back?"
**Subscriptions.** Add: name → amount → due day (3 screens, one field each; UPI AutoPay prefills all three). Each sits as a hatched reserved block; on due date the block turns to an outlined (spent) tile row with a soft tick. Price change: detected when the AutoPay debit differs → "Spotify now costs ₹139 (was ₹119). Take the ₹20 from Other?" one button, default the category with the most tiles left. Cancel: "Stop tracking" frees the tiles back to Other.
**Category budgets.** Auto-suggested (above). Edit mode: long-press a category row → tiles become draggable; drag tiles onto another category; total never changes (budget is conserved). Stepper fallback for accessibility (−1 tile here / +1 tile there).
**Paying (UPI or manual).** Pick category (one tap, most-likely preselected by payee), tiles leave. Manual: amount pad → category → done.
**Overspend (category runs out).** One choice, plain words: "Food is empty. Take ₹200 from Fun?" Button: **Take from Fun** (source = category with most tiles left). Secondary text link "Pick another". No debt words, no red, no negative numbers. If the whole budget is empty: "Your month's spending money is used up. Use ₹200 from savings?" default **Not now**; the payment still records and the category shows a dashed "borrowed from next month" tile only in Money detail, phrased "next month starts ₹200 lighter".
**Splits / owed.** Pay ₹800 dinner, "Split with friends?" → pick friends → your share leaves Food; friends' share becomes dashed tiles under "Friends owe you", outside the budget. When a friend pays back via UPI, dashed tiles fill and return to where they came from (Food).
**Repayments (you owe).** Recorded as a one-off in a category when paid; no running debt ledger shown on Home.
**Irregular income** (freelance, stipend, pocket money in parts). Each credit asks one question with a default: "Add to this month" (split by the same ratio). Month plan uses "expected" income; if less arrives by day 10, one nudge: "Less came in this month. Shrink Fun and Other to fit?" one button.
**Period end.** Leftover tiles fall into Savings by default (no choice screen; "Keep it in next month instead" in settings). Story ends with "You saved ₹X".

## Ledger invariants (validator checks after every action)
1. income_received = savings_added + budget_total (per period).
2. budget_total = Σ subscriptions_reserved + Σ category_budget.
3. category_left = category_budget + moved_in − moved_out − spent (≥ 0; overspend is always a move first).
4. Σ moves across categories = 0.
5. subscription tile: reserved until due, spent after; never both.
6. owed_to_you is outside budget_total; repayment returns to origin category.
7. period_close: savings_added += Σ category_left; next period starts at zero carry except explicit "starts lighter".
8. Every amount is a multiple of ₹1 and its tile render = amount/100 (partial fills bottom).
All UI numbers read from one store; no screen computes its own totals.

Targets: setup ≤30 s, ≤4 taps, one decision per screen; overspend resolved in 1 tap.
