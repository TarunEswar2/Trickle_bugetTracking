# Is weekly-only budgeting justified? (validation memo, 4 Oct 2026)

Asked by Tarun: "lets only go by weekly budgeting, is there a good reason for this, I need to validate this."

## What the evidence actually says
- **Research (6 interviews, `docs/research/brymans_analysis_interviews.md`):** the only weekly signal is how students *check* their balance: "I check it once a week" (quote 8, theme 4 "Weekly balance checking"), and Stage-0 fact 6 ("daily/weekly balance checks"). Nobody was asked how they *plan* money. **There is no direct evidence for a weekly budget period.** It was a design inference.
- **Design history:** weekly was never validated as a budget period. V1-6 chose it ("monthly budgets split into weeks"), D-5 made weekly primary with monthly = weekly x 4.3.

## Reasons that hold up (design logic, not proof)
1. **Feedback loop.** Students' spending is a 7-day rhythm (weekday vs weekend). A month is too long to correct a bad start; a day is too noisy. A week is the shortest period that contains the whole rhythm.
2. **Recovery.** An overspent week resets on Monday. An overspent month stays overspent for up to four weeks, which is the point where people give up on budgets.
3. **Matches the checking habit** found in the interviews.
4. **Small numbers.** Weekly amounts are small and concrete (Rs 300-1,500) for students on Rs 3k-25k a month.

## Reasons against (real, and the system must absorb them)
1. **Income and bills are monthly in people's heads** (allowance, Wi-Fi, hostel fee). Weekly is a conversion layer, and 4.33 weeks per month never divides evenly.
2. **Lumpy spending** (a trip, a festival, a birthday) is punished by a flat weekly cap.
3. **"A month" is not 4 weeks.** Treating it as 4 leaves about 2 days a month uncovered.
4. **Unvalidated.** If students think "my Rs 6,000 for the month", a weekly-only screen may feel foreign.

## Verdict
Keep **weekly as the engine** (what the gauge, reset and week-end work on). Do **not** make it the only language: accept income, subscriptions and ranges in the units people think in, convert, and show the monthly equivalent as a secondary line ("about Rs 4,430 a month"). Ranges snap to whole Monday-Sunday weeks so there are no part-weeks.

## How to validate before building (cheap, 1 hour)
- Show 5 students two Home screens, weekly gauge vs monthly gauge, same data. Ask: "Which tells you what you can spend today?" and "Which would you open on a Wednesday?"
- Ask each: "When you got your last allowance, how did you think about it: per month, per week, until a date?" (tests the date-range input too).
- Pass mark: at least 4 of 5 prefer weekly for "can I spend this today", or accept it after a one-line explanation. If 3+ think in months, make month the display and keep weeks underneath.

## Logical gaps found in the system and fixed in the mockup (B-29 to B-33)
| Gap | Fix |
|---|---|
| "1 month" preset was 4 weeks, so it drifted | Presets are calendar months, snapped to the Sunday of that week |
| Week count was off by one (a plan over N weeks was divided by N+1) | Counted as whole Monday-Sunday weeks from this week |
| When an income's range ended the plan changed silently | Home says "Plan drops to Rs X a week after 8 Nov" within 14 days |
| When every income had ended the plan carried on as if nothing happened | Home says "No income covers this week" with an Add income action |
| Subscriptions could swallow the whole plan | Warning in the plan steps and on Home; categories shrink to fit |
| A subscription due before its set-aside was built up raided the other categories | Shortfall comes from the buffer, then savings, never other categories |
| Leftover money needed three taps at week end | Moves to savings by itself, with a one-line recap |

## Still open (not fixed)
- Income that starts in the future (allowance on the 1st). Rule for now: add an income when the money arrives.
- The first week is not pro-rated when an income is added late in the week.
- Leftover rolling into next week is no longer offered; it is reachable through Move money. Needs a test with students.
