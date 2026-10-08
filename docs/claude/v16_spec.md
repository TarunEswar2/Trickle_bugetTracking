# v16 spec (7 Oct 2026)

Build: `archive/session-workfiles/mockup16/` (`python3 build.py`, output `mockup16.html`). v15.3 stays in `mockup15/` for comparison. Decisions V16-1…V16-14 in `v14_decisions.md` (V16-1 to V16-5 are Tarun's words, the rest are PROPOSED).

## The model
1. Money in is split: some is saved, the rest is for spending.
2. The spending part is spread over the days it has to last. That gives a **weekly allowance** (Monday to Sunday; the first week only gets the days that are left).
3. Every spend comes out of that one allowance. There are no pots per category and nothing is taken from other categories.
4. Every spend carries a category (a tag). The weekly statistic is which category took the most. Insights are built from the same data.
5. After a week or two, a **limit** can be set on one category (an amount a week, or a number of times) or on one shop (times or an amount). A limit is a nudge; it never moves or blocks money.
6. If the allowance runs out, savings cover the rest (D-22 kept) and the week review says so.

Engine changes (`engine.js`): every state is a wallet (`S.wallet`, category `amt/left` are 0, the whole flexible part sits in the buffer); `S.limits` and `S.limNo` added; the other-categories step of the cascade is deleted; `recomputePlan` no longer gives categories a floor of ₹5 in wallet mode; the obfinish route recomputes the allowance from incomes.

## Screens
| Tab / flow | What it shows | Picture |
|---|---|---|
| Home | "₹N left · 3 days to go", the gauge, chip "1 mark = 1% ≈ ₹N", one row only if something needs doing (link, last week, money waiting, payments to sort, bill, limit reached, allowance changing, add money, limit suggestion), one button | Gauge of 100 marks in 5 blocks of 20; marks that go flash and fade; the number counts to its new value |
| Spending · Categories | "Food took the most.", ₹ and share, period (this week, last week, 30 days), a limit suggestion card when there is one, ranked rows with a limit bar where a limit exists, Limits, Subscriptions | One stacked bar, one segment per category |
| Spending · History | Day groups with day totals; each spend shows its category | none |
| One category | This week's ₹ and share, its limit or "Set a limit", the shops in it | 8 weekly bars with an average line |
| Money · Money in | "₹N a week to spend", save and spend split, money in list, one-off money | Two-part split bar |
| Money · Savings | unchanged from v15 | Segmented ring |
| Insights · Rhythm | "Tuesdays are your biggest day", "Mostly in the evening", 4 weeks or this week, tap a day | Seven weekday bars |
| Insights · Repeats | the shop visited most, up to four shops, tap one to set a limit | 14-day tick strip per shop |
| Insights · Trend | "₹330 more than last week", same days, running total | Smooth cumulative lines with the allowance line |
| Week review | verdict, "₹X of ₹Y", the category that took the most, a line if a limit was passed | Stacked bar |
| Pay | How much, For what (shop chips if known), confirm: "N marks go", ₹ left after, a note if a limit would be passed | Gauge with the marks that go |
| Limit sheet | kind (₹ or times a week), number, "A limit is a nudge. Nothing is taken away." | none |
| Add money | How much money you get, how much will you save, how many days it should last (allowance card updates) | Split bar, allowance card |
| Onboarding | link or by hand, how much money you get (Skip), then the add-money steps | none |

## Charts: rules used
- One picture per screen and one job per picture; the finding is written above the picture.
- The Home gauge only empties. Savings use a ring that fills. Everything else is a bar or a line, which are read by length and position.
- One colour per category, the same everywhere (eight hues, repeated after eight). Amber means "a limit is reached or the week is used up". Green is "left" on the gauge and "this week" on the trend. Orange is "spend" on bars.
- Rupees only. Percent is used for share and for the 1% mark.

## Measured (density.js, 55 core states, phone size)
Average 25.8 words per screen (v15.3: 22.7); 23 of 55 over 25 words (v15.3: 17); none taller than the phone. Home states: 10 to 27 words. The heavy ones are Spending categories (50 with a suggestion card and five rows), Plan until when (47), Pick a date (89). These are Tier 2 screens; Home and Insights are within about 25. Random-tap fuzz tests (60 and 90 taps over 7 profiles plus fresh and track-only accounts), side-panel event sweep over four profiles, and the first-time tips test all pass.

## Not built, on purpose
- Limits per category stay a nudge; there is no hard stop.
- No hand-typed weekly amount (V16-1). A student with no income can add money for one week.
- No category management screen (rename, merge, delete). Categories come from the six defaults, the pay flow ("+ Other") and detected payments.
- Savings screen is unchanged.
- Figma is still at the v14 look.


## v16.1 (7 Oct 2026, later)
Decisions V16-15…V16-23. Code: `mockup16/ui16b.js`; the grid code is no longer reached (a random-tap run over 80 steps and 7 profiles never showed one).

- **Allowance bar** (`battery()`): one rounded bar, full = the weekly allowance, green = what is left, white tick = where an even pace would be, amber when ahead of it. The fill drains with an animation when a payment is made. Home reads "₹607 left", "of your ₹1,072 weekly allowance", "About ₹202 a day for 3 days". The pay confirm shows the same bar with the part that leaves hatched, "Left now" and "Left after".
- **Insights · When**: chips Time of day, Day, Month. Time of day: 12 two-hour bars (6 am to 6 am) over 4 weeks, peak highlighted, tap a bar for its amount. Day: 7 weekday bars, average of 4 weeks. Month: 3 bars, average spend per day in days 1–10, 11–20, 21–end over up to 90 days. Each ends with "Why this?" and the Heads-ups switch.
- **Heads-up**: `awareness()`; card on Home, line on the pay confirm; muted by "Stop heads-ups".
- **Guess check**: sheet with a slider, then the reveal; stored in `S.guesses`.
- **"Why this?"**: `SHEETS.why`, text in `EVID`, sources in `SRC` (nine papers; see RESEARCH.md Part 15.2).
- **Panel**: group "Awareness (v16.1)" to jump to 15 minutes before the busiest hour, to Thursday 3 pm, to make today the busiest day, to turn heads-ups on. The Home-picture test group is gone (the grid is gone).
- **Measured**: density 26.7 words per core screen; Home 23 words in normal states, 31 to 35 when a heads-up and an action row both show; Insights When 33. Fuzz, tips and side-panel sweeps pass.


## v16.2 (7 Oct 2026, later still): visual system and savings
Decisions V16-24…V16-30. Code: `mockup16/ui16c.js` (savings, goal, welcome, motion), the v16.2 block at the end of `shell.html` (tokens and components), palette constants swapped in `engine.js`, `ui_core.js` and the other files. The design system page is `designsystem3/index.html`.
- Savings: hero total, 12-month area line from the goal histories (ends at today's total; hidden if there is no history), "in goals / free" line, goal cards with notched bars, goal screen with monthly bars.
- Greeting on Home; welcome line on the first screen; settle-in, count-up and drain motion.
- Measured: density 29.3 words per core screen (v16.1: 27.0; v15.3: 22.7), 27 of 55 over 25, none taller than the phone. The rise comes from the richer Savings and Goal screens and the greeting. Fuzz, tips and side-panel sweeps pass.


## v16.3 (7 Oct 2026, later): scan-and-hand-off helper
Decisions V16-31…V16-34; `mockup16/ui16d.js`; note in `docs/claude/upi_intent_helper.md`. Switch in the side panel group "Scan & pay helper (Test B)": Home button mode and platform (Android, iOS). Statuses `confirmed`, `unconfirmed` on transactions; `S.failedTx` holds attempts that did not go through (never counted). History shows both. Home asks about an unconfirmed payment first.

**Update, 7 Oct (V16-35):** the scan flow no longer asks "Did it go through?". The spend is logged at the hand-off and can be removed from the result screen. `S.failedTx`, the unconfirmed state and their History rows are gone. The result screen of every logged spend is new: check ring, "Added", amount, shop and category, left this week with the bar, a savings line only when savings were used.


## v16.5 (8 Oct 2026): widget, subscriptions with an end
Decisions V16-40…V16-42; `mockup16/ui16e.js`. Side panel group "Widget and subscriptions": show the simulated Android home screen (medium and small widgets, chips log with Undo, Hide amounts, Scan, plus); add a trial ending in 2 days; set a cancel-by date for tomorrow. Subscriptions: new step "Does it end?" when adding; detail sheet with the dates and "I have cancelled it"; list with monthly and yearly totals and a Cancelled section; Home reminds within 3 days. Seeds: Yash's Netflix has a cancel-by date in 3 days, Tarun's Spotify is valid for 120 days. Fixed: the allowance refilled when a subscription or income changed (`walletSpent` in `ui_f.js`).

**Update, 8 Oct (V16-43):** the widget in the mockup is self-contained: resting state with chips and + Add, adding state with presets, keypad, category chips and Log. No Scan, no opening the app; the side-panel preview has a button to leave the simulated home screen.
