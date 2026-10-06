# Trickle v15: four tabs, one thing per screen

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


## v15.1 (5 Oct 2026, after Tarun's first review)
Tarun's review: the grid needs teaching, Insights should be its own tab with the v14 visuals improved, there is no way to enter a one-off payment, v15 loses
functionality, every screen needs better visual hierarchy, fix logical flaws.

**Tabs are now four:** Home · Spending · Money · Insights. Spending = Categories | History. Money = Money in | Savings. Insights = When | Repeats | Vs last week.

**Teaching the grid** (no manual, three small moments):
1. The caption under the grid names the unit: **`₹796 left`** (large) and a tappable chip **`1 box ≈ ₹16 ⓘ`**. Tap the chip or the grid itself to open "How to read it".
2. "How to read it" shows 100 boxes with 10 dashed ghost boxes: *Each box is about ₹16. Spend ₹160 and the dashed 10 boxes go.* It opens once, by itself, the first time an account you built has a plan or a first spend.
3. At the moment of paying, the confirm screen says **`62 boxes go · 1 box ≈ ₹5`**, so the unit is learned from an action, not a legend.
Plan-less Home says "spent this week" with the same chip, and the sheet reads "Boxes fill as you spend."
What to test: can a new user say what a box is after their first payment, without opening the sheet?

**Insights (v14 visuals, improved):** each view leads with the finding in large type and puts the controls last.
- *When:* "You spend most around **9 pm**", then the hot-hour grid with Day/Week/Month navigation, Times/₹ and tap-a-spot detail. Opens on Week.
- *Repeats:* the most repeated spend as the hero with a box per time, then four more rows; tap for the day-by-day grid.
- *Vs last week:* "₹330 more than last week." then two grids side by side (last faded) and the four categories that changed most, with ↑ ↓ amounts.

**One-off payments and one-off money**
- Pay > For what? has a dashed **One-off** tile (outside your plan). Then: What was it? (Trip, Gift, Repair, Fees, Medical, Event or type) > Paid from? (Outside my plan, or My savings when there are savings). A one-off is recorded in History (violet dot, "one-off"), never counts in "left this week", the week review or Insights, and deleting it gives savings back.
- Money in has **One-off money** (a friend paying you back: save it, put it back in a category, or just note it). It is also on the plan-less Money tab.

**Functionality restored (all of it reachable, none of it on the first screen)**
Balance split after linking UPI (two short skippable screens) · one-off money · one-off payments · edit all weekly limits (Spending > Categories > Edit weekly limits) · incoming UPI credit (Home row) ·
plan-drops warning (Home row) · pay from savings · subscriptions list and add. Still parked: the nested rings, move-money between categories, the old "how much for each" screen.

**Visual hierarchy system (applies to every screen)**
1. One hero per screen: a number, a sentence or the grid, in the display font.
2. Segmented controls are quiet underlined tabs, never white pills, so they do not outshine the content.
3. One primary action per screen (green). Secondary actions are plain text buttons ("Skip", "Not now", "Edit").
4. Controls come after the finding. Meta text (captions, hints) is the only small grey text.
5. Lists are quiet rows with one bold name and one value; a thin gauge replaces words where it can.

**Logic flaws fixed**
- Money in showed a monthly total beside a weekly figure ("₹7,200" under "₹1,325 a week"). It now shows only percentages (Saving 20% · Spending 80%), and says "₹X to spend" without "a week" when an income has no end date.
- An ended income no longer shows stale numbers; it says "Your income ended."
- The plan-drops warning was lost in v15; it is a Home row again.
- A one-off payment cannot distort the week, the review or Insights.
- "Pay from savings" was only offered when there were goals; it now also appears when there is free savings.
- Paid-from question is skipped when there is nothing to choose.
- Settings rows no longer overlap their hints.
- 60-step random-tap run across all seven demo accounts and two fresh accounts: no errors, no NaN, no negative balances.

## Measured (55 core states)
22 words and 8 taps on average (v14: 56 and 12), none taller than a phone (v14: 21). Over 25 words: lists, Insights grids (their cell labels count as words), the calendar, the pay confirm.


## v15.2: first-time tips
A small bottom card appears **once**, the first time something happens, and says what it means in one sentence. Always one button ("Got it"). Only one at a time; none while a flow or sheet is open.
Events (detected as changes in the account): first spend, first payment that needs a category, first incoming credit, first plan, first income, first one-off, first subscription, first goal, first time ahead of pace (amber), first time over the week.
First views: Home grid ("How to read it", with the dashed ghost boxes), Spending, Money, Insights, and the first category you open.
The side panel has "Show every tip again" and "Turn tips on or off" so they can be reviewed without making a new account. Tips are off while measuring density.
What to test: after the first week, can a new user say why a payment disappeared boxes, what amber means and what a one-off is, without ever opening Settings?


## v15.3: from the Architecture & Strategy Document (6 Oct 2026)
Source: Tarun's upload. Decisions V15-21…V15-30 in `v14_decisions.md` (all PROPOSED). Built in `ui15x.js` (loaded before `ui15d.js`).
- **Weekly amount (wallet mode).** Onboarding: link, categories, then "How much can you spend each week?" (presets ₹500/1,000/1,500/2,000 or type; Skip). Home with no amount shows "Set your weekly amount". `makeAllowance(wk)` builds a plan with every category at ₹0 and the whole amount in the buffer (`S.wallet=true`); the existing cascade then charges the wallet. Money tab shows "₹N a week to spend" with "Change amount" and "Add money you get". Making a plan from income also ends in wallet mode.
- **Home.** Hero "₹N left this week", 10×10 gauge in 5 blocks of 20 (gap after every 2 rows), spent marks as faint outlines, chip "1 mark = 1% ≈ ₹N ⓘ", an action row only when something needs doing, one button ("Log expense", or "Scan & pay" in Model B). Amber sentence only when over: "Spending fast this week." / "This week's amount is used up." With no amount: empty outlined gauge.
- **Rollup.** `marksLeft` rounds spending down to whole marks; the amount still waiting is shown in the "How to read it" sheet.
- **Pay confirm in wallet mode** speaks about the week: "3 marks go · 1 mark ≈ ₹10", "₹970 left after this."
- **Copy.** See V15-27. "box" is now "mark" everywhere (`1 mark ≈ ₹N`).
- **Model B (Test B).** Panel group "Home button (Test B)". The scan step is a stand-in.
- **Not done on purpose:** nothing in the document asks for anything that needs SMS; the feasibility of a Trickle-started UPI payment is still unverified (H2). Category limits still exist in the seeded profiles (they are the "legacy" mode); wallet mode hides "Change how much each gets".
- **Measured:** Home states 11 to 23 words; 6 of 7 meet the document's 20-word Tier 1 limit (only "Home · unsorted", 23, does not, because the action row adds a sentence). Whole-app average 22.7 words, 17 of 55 states over 25 (was 18).
