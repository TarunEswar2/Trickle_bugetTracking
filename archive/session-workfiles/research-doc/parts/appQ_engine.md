## Appendix Q. The money engine, as built: state, rules and formulas

Source: `archive/session-workfiles/mockup15/engine.js` and the plan, week and pace logic in `ui_d.js`, `ui_f.js`, `ui_g.js` (v15). This is the part of the product that behaves the same in v14 and v15; only what is shown changed. Written so that a developer can rebuild it without the prototype.

### Q.1 Constants and helpers
| Name | Value or rule | Notes |
|---|---|---|
| `DAY` | 86,400,000 ms | |
| `weeksPer` | 4.3 | Weeks in a month for every conversion (D-2). A real month is 4.33 weeks, so 4.3 under-counts by about 0.7% |
| `startOfWeek(d)` | Monday 00:00 local of the week containing `d` | Weeks run Monday to Sunday (D-1) |
| `r5(x)` | round to the nearest ₹5 | |
| `r5b(x)` | `max(0, round(x/5)*5)` | |
| Display rounding | Whole rupees internally; shown to ₹5 under ₹1,000 and ₹10 above; Indian digit grouping | D-2 |
| `NOW0` | Fri 2 Oct 2026, 17:30 | The prototype's fixed "now"; advanced by the simulator |
| Box value | amount ÷ 100, shown "1 box ≈ ₹N" | D-35 |
| Max categories | 30 | D-18 |

### Q.2 State shape (`S`)
```
S.key, S.p            profile key and profile record (name, mode: 'upi'|'manual', seeds)
S.now                 simulated clock
S.cats[]              {id, name, amt (this week), left, full (full-week amount), order}
S.bufAmt, S.bufLeft, S.bufFull        buffer this week, left, full-week
S.bills[]             {id, name, amt, every, dueDay, nextDue, reserve, paid[], paused}
S.goals[]             {id, name, target, saved, byMonths, state, hist[12], celebrated, reachedOn, doneOn}
S.free                free (unassigned) savings
S.txns[]              {id, t, payee, amt, kind, ref, via, src, week}
S.unsorted[]          ids of unsorted transactions
S.credits[]           {id, t, from, amt} waiting for assignment
S.incomes[]           {id, amt, sav, sp, start, end}
S.moneyIn[]           audit trail of income and one-off money
S.pending[]           week reviews waiting {un, week, touched, touchedAmt, snap, bufAmt, from}
S.memory              payee -> category id (learned)
S.W, S.fixedW, S.flexW    weekly plan total, fixed part, flexible part
S.planSet, S.planFromIncome, S.track, S.noInc, S.noBal    mode flags
S.weekScale, S.weekFrom   first-week scaling and the first day the plan covers
S.touched, S.touchedAmt   savings were used to cover overspend this week
S.flags               {bankDecline, bankSlow, lowBalance, linkLost}
S.asked, S.askedAt    pop-ups answered "no" and when
S.log[], S.toasts[], S.celebrate[]
```
`kind` of a transaction is one of `cat`, `fixed`, `goal`, `unsorted`, `oneoff`. `via` is `trickle` (paid through the app), `manual` (typed in) or `detected` (seen on the link). `src` records where the money came from when a payment overran its category (see the cascade).

### Q.3 Invariants (the ledger)
1. income = savings + budget
2. budget = fixed reserve + categories + buffer
3. savings = goals + free savings
4. every rupee is in exactly one pot (D-3)
5. owed or waiting money sits outside the balance (credits wait in a tray until assigned)
A "Ledger" panel in the side panel checks these live.

### Q.4 Weekly plan formulas
Per bill `b`: `billWeekly(b) = 0` if paused, else `b.amt ÷ N` where N = 1 (weekly), 4.3 (monthly), 13 (every 3 months) or 52 (yearly).
Fixed part: `fixedW = round(Σ billWeekly)`. Flexible part: `flexW = W − fixedW`. Buffer: `bufAmt = flexW − Σ category amounts`.
Per income `i` over its date range: days = number of days from `start` to `end` inclusive (`end` snapped to the Sunday of the chosen week); `perDay(i) = i.sp ÷ days`; weekly share = `perDay × 7`.
Weekly plan from incomes: `planRate = Σ over running incomes (end + 1 day > now) of perDay(i) × 7`; `W = r5b(planRate)`.
First-week scale: for the current week [Monday, Sunday], `num = Σ perDay(i) × (days of i inside this week)`, `den = Σ perDay(i) × 7`, `weekScale = min(1, num ÷ den)`. Category and buffer amounts for this week are `full × weekScale` (min ₹5 if the category is funded) and return to `full` on Monday.
Recompute: when `W` changes, each category's full amount is scaled by `(flexW × 0.85) ÷ Σ old full` (the 15% remainder becomes buffer); `S.flexW = max(Σ, flex)`; `bufFull = flexW − Σ`.
Make a plan from an income in v15: the income's weekly share `wk = max(5, r5b(sp ÷ days × 7))` becomes the weekly total; `balN = round(wk × 4.3)`, `lasts = 4.3`, `sav = 0`; categories share it equally after fixed bills and a buffer of `max(5, r5b(flex × 0.15))`; each category gets `r5b((flex − buffer) ÷ n)`.

### Q.5 The cascade (what happens when a payment is larger than its category), O-23 and D-22
```
cascade(amount, target):
  1. take from the target (category left, bill reserve, goal saved, free, or buffer)
  2. then from the buffer (unless the target was a bill: then buffer after the reserve, never other categories)
  3. then from the other categories, equally: repeatedly give each remaining category an equal share until the amount is covered or all are empty
  4. then from savings: free savings first, then goals in proportion to what each holds (goals other than the target)
  5. anything still unfunded is recorded as `unfunded`
returns {amt, target, buffer, others, savings, unfunded, othersDetail, savingsDetail}
```
An unsorted payment is charged to the buffer until it is sorted (D-11); sorting refunds the buffer and charges the chosen category. If the cascade reaches savings, `S.touched` is set and the week review reports that savings covered the rest.
`previewCascade` runs the same function on a deep copy, so the pay confirm can show the result before it happens.

### Q.6 Paying
`doPay({amt, target, payee, paid})`: runs the cascade; inserts a transaction `{kind: target.type, ref: target.id, via: paid ? 'manual' : 'trickle', src: result}` at the top of `txns`; if savings were used, marks `touched`; checks whether any goal is now reached (celebration once); logs a line.
Track mode (no plan) uses a simpler version: the transaction is recorded against the category with no cascade.
**One-off payment** (v15): `kind: 'oneoff'`, `ref: null`, `src.fromSavings = min(amt, free)` if paid from savings (and `free` is reduced); excluded from `weekSpentAll`, `spentThisWeek`, the week review and Insights; `removeTxn` returns the savings.
**Detected payment:** `detectPayment(payee, amt)` files it under `memory[payee]` if known, otherwise `unsorted` (charged to the buffer). **Merge rule (D-12):** a payment seen twice (through Trickle and through the link) is merged by amount, payee and a 10-minute window (specified; not implemented in the prototype).

### Q.7 Week end
At the first tick into a new Monday (`advanceDays`): `un = Σ category left + bufLeft` is pushed to `pending` with a snapshot of category amounts; amounts reset to `full`; `weekScale = 1`; each bill's reserve is topped up by `billWeekly` (capped at 1.2 × amount).
With a plan, v15 moves the leftover to savings automatically (B-32) and opens the review: `applyPending(..., {to: 'savings'})` splits `un` equally across active goals (the last goal takes the remainder), or into free savings if there are no goals. Without a plan (track mode) the week end is a neutral recap. A plan-less user never sees leftovers.
"To next week" (V5-5) is still in the engine (`weekEnd` with `to: 'next'`): the leftover is split equally across all categories **including the buffer** (D-6) but is no longer offered by default.

### Q.8 Subscriptions
Added by the user or proposed when the same payee charges about the same amount twice, about a period apart (D-8, B-27). `reserve` starts at `3 × billWeekly`. When due: UPI mode pays by cascade from the reserve and logs a `fixed` transaction; manual mode raises `dueNow` and asks. Paused bills have `billWeekly = 0` and their share goes back to the buffer (B-26). If subscriptions exceed 60% of the plan, the form and Home say so (B-31, B-44).
Next due: weekly +7 days; every 3 months +3 calendar months; yearly +1 year; monthly the next `dueDay`.

### Q.9 Goals
`needed per month = ceil(target ÷ byMonths ÷ 10) × 10` (D-20). ETA is the average of the last three months' actual pace, else planned pace. States: Active → Reached (saved ≥ target; celebration once; offer "Mark done" or "Keep going") → Done (saved returns to free savings). Paying from a goal is spending its money (F-1). Moving money between goals, free savings, the buffer and categories is `moveMoney` (limited to what the source holds).

### Q.10 Pace (Home colour and sentence)
`ideal = (now − from) ÷ (end of week − from)` clamped to [0, 1], where `from = weekFrom` (first day the plan covers) or Monday; `spent = 1 − left ÷ total`; **over** if `left ≤ 0`, or `touched`, or `spent > ideal + 0.10`.
Green gradient and "On pace." when not over; amber and "A bit ahead of pace." when over; "Gone over a little." when the week's money is empty or savings were touched.
**Known weakness:** the ideal is linear in time, so it ignores weekends, bills and the fact that students spend unevenly (Nishad, Yash); a Monday-morning purchase can show amber. Pace has not been validated against how students think about "too fast".

### Q.11 Plan-health messages (Home next-thing row)
| Condition | Message |
|---|---|
| An income's range ends within 14 days | "Plan drops to ₹X a week after D Mon" |
| All incomes ended | "No income covers this week" with "Add income" |
| Subscriptions ≥ 50% of the weekly plan | "Subscriptions take ₹X of your ₹Y a week" |
| Priority order of the Home row | Link lost; last week ready; credit waiting; payments to sort; bill due; plan-health; make your plan |

### Q.12 Onboarding to state
Two questions (how to see spends; categories). The outcome is `S` with `track = true`, six default categories (or the chosen ones) at ₹0, no buffer, no bills, no goals, `planSet = false`. "Make your plan" adds an income and runs the plan builder (Q.4), carrying every spend, income, goal, memory and unsorted payment over (spends in categories the user dropped become unsorted).

### Q.13 Tips and asks
`TS` records which of 14 tips have been shown (once per page load). Pop-up asks (`ASKS`): link, add, pin, notif, sort, limit, plan, income, planoffer, goal, recap, weekmoved, subfound, import. "No" is remembered (`askedAt`) so it is not asked again straight away; a plan offer repeats after four weeks.

### Q.14 Known rule gaps (from the memo, the audit and the code)
1. Incomes that start in the future are not supported ("add it when the money arrives").
2. Week-to-month conversion uses 4.3, so a "monthly equivalent" is about 0.7% low.
3. The 10-minute merge window for duplicate payments is specified and not coded.
4. Pace is linear in time (Q.10).
5. The 15% buffer on a new plan is a default, not derived from anything.
6. Over-covering by savings has no cap or confirmation; a large one-off from savings is allowed when savings exist.
7. A category's weekly amount may be ₹0 (new category), so it records spend but cannot overspend.
8. Leftover rolling into next week is reachable only through Move money.
9. No partial-week handling for plans that end mid-week (they snap to Sunday, so none are needed).
10. Time zones are the device's; there is no travel or daylight-saving logic.
