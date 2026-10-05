# Trickle v15: three questions, three tabs, one thing per screen

Written 5 Oct 2026. Built as a fork: `archive/session-workfiles/mockup15/` (v14 is untouched in `mockup/`). Everything here is
**delegated and open to override** (V15-1…V15-12 in `v14_decisions.md`). v15 supersedes the 5-tab decision only if Tarun accepts it.

## The rule that was missing: a density budget
Every screen, measured by `archive/session-workfiles/audit/density.js`:
- at most **25 words** (calendars and keypads excluded), one question or one sentence
- at most **one hero** (a number or a visual), at most 3 ₹ values in total
- at most **4 tappable things** besides the tab bar, keypad and calendar
- never taller than one phone, except the History list
- a new thing may only be added if something else is removed. Same fact, one place.

## Information architecture
| Tab | Question | What it holds |
|---|---|---|
| **Home** | Am I okay this week? | One sentence, the week's grid, one caption line (`₹607 left · box ≈ ₹11`), Pay. At most **one** "next thing" row, ranked: refresh link, last week ready, money came in, payments to sort, subscription due, make your plan. |
| **Spending** | Where did it go? | Segmented: *Categories* (a list with a thin gauge each), *History* (day groups), *Patterns* (one finding per screen, "Next ›"). Subscriptions are a row at the end of Categories. A category opens to one gauge, one sentence, one action. |
| **Money** | What comes in, what is saved? | Segmented: *Money in* (the split grid and "Add income"; the list of incomes is one tap away) and *Savings* (saved so far, the ring, goals). |
| Settings | | A gear on Home. |

What happened to the old tabs: Income and Savings became the two halves of **Money**. Insights became **Patterns** inside Spending
(3 findings, one at a time: when you spend, what repeats, this week vs last). The 7-screen Spending scroll became three one-screen views.

## Flows (one question per screen, always skippable)
- **Onboarding is 2 questions:** how should we see your spends (Link UPI / I'll add them), what do you spend on. Then Home.
- **Everything else is asked when it matters** with the existing pop-ups: PIN after the third spend, plan after a week of tracking, subscriptions when a repeat payment looks like one, goals from the Money tab.
- **Making a plan is adding income:** how much came in, how much to save, until when (presets; "Pick a date" opens the calendar). Done. The plan is
  made silently: categories share the weekly amount equally, the rest is a buffer. Adjust a category any time.
- **Pay is three screens:** how much, for what, confirm. Payee, the budget/savings switch and "I already paid" are gone from the main path.
- **Subscriptions are three screens:** which one, how much (with how often), when.
- **Week review is two screens:** what happened (one grid, one sentence), then "By category" if you want it.

## Engine: edge cases are handled, not explained
Mid-week day split, weekly scale, subscription reserve, leftover to savings and the cascade stay in the engine unchanged. v15 shows none of the
explaining notes ("this replaces your weekly amount", "this week only 3 days are left"). The result is the same, the screen is lighter.

## Parked, not deleted (code still in the build, no way to reach it)
One-off money, the "what is this" sheet for incoming credits (the Home row opens it), the "how much for each" screen at plan time, the balance split in UPI onboarding
(moves to the Money tab when UPI is linked), the nested rings, the hot-hour calendar and the month navigation in Insights, the move-money flow.

## Where v15 deliberately departs from Tarun's recent requests (decide)
1. **Home shows "₹607 left" in one small line, not a big block.** You asked for the box meaning and the amount left to be emphasised. Principle 3 says Home never leads with a big number. v15 keeps both, as one caption under the grid.
2. **Make your plan is the one emphasised thing on a plan-less Home** (as asked), and is the only coloured row.
3. **The UPI balance split is no longer in onboarding.**
4. **The rings and the Insights calendar are gone** until a test shows people miss them.

## Measured result
| | v14 | v15 |
|---|---|---|
| Average words per screen | 56 | **21** |
| Screens over 25 words | 68 of 116 | **8 of 46** (7-row lists, the calendar, the pay confirm) |
| Average tappable things | 12 | **6** |
| Taller than one phone | 21 | **0** |
| Onboarding screens | up to 12 | **2** |
| Tabs | 5 | **3** |
v15's set is the core 46 states, not all 116. Parked screens are counted as zero because they are not reachable.

## What a test should check (nothing here has been tested with students yet)
1. Can a new user find "where did my money go" without being told? (Spending, Patterns)
2. Do they know what a box is without the caption? (Home)
3. Do three tabs feel too few, or do Money's two halves confuse? (Money in / Savings)
4. Does a plan-less Home still feel useful for a week? (spent so far and Make your plan)
