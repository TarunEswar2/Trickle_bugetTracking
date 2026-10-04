# Trickle v14 — Decisions log (Tarun decides everything)

Base: claude/v14_stage0_facts.md (facts + 7 approved principles), research/brymans_analysis_interviews.md.

## Decided
| Date | Decision |
|---|---|
| 2 Oct | 7 principles approved as written. |
| 2 Oct | 5 tabs: Home · Income · Spending · Savings · Insights. |
| 2 Oct | Home timeframe = this week. Home shows one sentence + ONE overall fuel gauge, no ₹. |
| 2 Oct | NO coins/dots as the general money representation (reverses the dot = ₹100 system and the "coin + ×N" idea). |
| 2 Oct | Squares/circles are used ONLY to show loss: at the pay/friction screen the amount being paid crumbles away. |
| 2 Oct | Categories are shown as FUEL GAUGES. Categories are many (20+ possible), user-created, custom icons possible — representation must stay consistent. |
| 2 Oct | Every kind of information gets its own specific representation (no single universal unit). |
| 2 Oct | Stop designing for one seed with 5 fixed categories. Test every idea against a POOL of students based on the six interviewees (Tarun, Nishad, Yash, Gautham, Harsh, Vaishak types), varying income (₹3k–25k), category count (2–20), period, and month 1 vs month 6. |
| 2 Oct | Process: go ONE visualisation / widget at a time. Tarun provides pictures/inspiration at each step. Claude draws options across the student pool; Tarun decides; then next. |
| 2 Oct | **Budget gauge form:** 10×10 grid of rounded boxes that fills from the bottom like liquid. ALWAYS 10×10. Scale always shown ("1 box = ₹X"). |
| 2 Oct | **One visualisation per screen:** never more than one at a time; scroll down for the next. |

### Viz 1 — Budget gauge (DECIDED 2 Oct) — see claude/v14_viz1_budget_gauge.md, board https://claude.ai/artifact/AcKnP1FTzaAuGwsqiXWLgM
| # | Decision |
|---|---|
| V1-1 | The liquid shows money LEFT; it drains as you spend. |
| V1-2 | Scale: budgets are set in ₹100 steps, so 1 box = budget ÷ 100 is always whole rupees and the grid = the whole budget. |
| V1-3 | Many categories: a words-only list of names (with a word like plenty / low / empty, no mini charts) → tap opens that category's grid → swipe to the next. |
| V1-4 | Gone over: empty grid + amber floor line + words ("a little over — taken from next week"); amount on tap; no red. |
| V1-5 | Home gauge: the same 10×10 grid, with NO scale on Home (keeps Home ₹-free); scale appears once you tap in. |
| V1-6 | Home gauge covers this week's share of the budget for everyone (monthly budgets split into weeks; irregular income sets the week when money arrives). |
| V1-7 | Fixed bills (rent, EMI, subscriptions) are a separate "Fixed" group — shown as paid / due soon, not as liquid gauges. Only flexible spending gets grids. |
| V1-8 | No budget set: the app suggests one from 2 weeks of spending; until then the grid's full level = "your usual week". |
Open inside Viz 1: top edge of the liquid (box-by-box vs even level), last week's ghost line — default to recommendation (box-by-box; ghost line on tap) unless Tarun says otherwise.

### Viz 1 — follow-up from Tarun on the nested rings (C4), 2 Oct
| # | Decision |
|---|---|
| V1-9 | Rings view: each category gets its own colour. No "outer / 2nd / 3rd" tags and no numbers or word-states beside the rings. Tapping a category opens its detail (F3: grid + scale + transactions). |
| V1-10 | **The nested rings are the main view of the Spending tab** (Tarun, 2 Oct). Tapping a category opens either a drop-down or a screen with more details (F3: grid, scale chip, transactions). Replaces the earlier default that put the rings beside the words-only list (V1-3) — the rings are now the Spending-tab overview. Drop-down vs full screen not yet chosen. |

| V1-11 | Tapping a ring / category opens a **full screen** (F3: its grid, scale chip, transactions), not a drop-down. |
| V1-12 | The rings are **colour-coded**: each category its own colour, no labels like "outer" or numbers on the rings (V1-9). |
| V1-13 | Inside a category there is a **"show previous week / month / period"** control with a **slider from 1 to 12 periods back**. It shows the category's grid **as it was at the same day of that earlier period** (a like-for-like view). Not the same as the old single "ghost line"; this is the full grid, any of the last 12 periods. |
| V1-14 | Now and previous are shown **side by side**: two 10x10 grids, "Then" and "Now" (option A). The overlay options (ghost, another colour) are dropped. |
| V1-15 | The **previous period's grid is slightly faded** so it reads as "then" and the current one as "now". |
Defaults, not explicitly answered for V1-13: the slider appears after tapping "Compare with earlier weeks/months"; a dashed line on the earlier grid marks where this period is now; periods with no data are dimmed and cannot be picked; a new user (month 1) sees "No earlier weeks yet". "At that day" read as the same day-position within the period (e.g. Thursday of the week, the 17th of the month), not the end of the period.

Defaults, not explicitly answered: rings show the biggest five budgets and the rest as one "Others" ring (matches V3-7), same colours as the Income grid; a name list with swatches sits under the rings; the detail grid's liquid is the category's colour; Fixed bills are one row under the list.

Earlier defaults, now partly superseded by V1-10: (a) a ring's name appears when you press/tap it; rings show the biggest few and the rest group as "others", tap opens the full list. (b) ~~rings beside the words list~~ — rings are now the Spending tab's main view; the words-only list (V1-3) remains the fallback question for 12–18 categories.

### Viz 4 — Savings goals (Tarun, 2 Oct; board published)
References he sent: iOS year-progress waffle (green filled grid, "299d left · 18%"), a segmented half-ring gauge ("74%"), a GitHub-style day heatmap in green glow.
| # | Decision |
|---|---|
| V4-1 | Goals fill **from the bottom like Viz 1**, and each goal shows its **ETA at the bottom**. |
| V4-2 | **No rings** (rings belong to spending). A **half fuel gauge**, with each goal's smaller gauge **stacked below**. The goals are a **collapsible list**. |
| V4-3 | The **first Savings page shows only this fuel-gauge visualisation**. Tapping a goal goes into **statistics**. |
| V4-4 | **Goal completion is pushed as an intro-style celebration screen** wherever the completing action happens: shows **how many days it took** and **how much is saved**. Finished goals go into a **Completed** category. |
| V4-5 | A goal's statistics offer a **day-wise split** option. |
| V4-6 | **Month view uses amber and green boxes**: **amber = deducted from savings**, **green = added to savings**; **the more a box glows, the more was saved** (or taken). |
| V4-7 | **Pay out of savings**: when paying, the user can choose a goal like choosing a category. **Screens and flow are for later**; only the data visualisation is for now. |
| V4-8 | **No visualisation next to any goal** on the Savings page: a goal row is text (name, how far, ETA). |
| V4-9 | The **main savings visualisation is a segmented ring**. With two goals the ring is **split into two sections sized by their amounts**, and each section is **filled in its own shade of green** by how much is saved. |
| V4-10 | **"By day" is removed.** Statistics show **months only**, with a **toggle to move through the months** and see each one. |
| V4-11 | Also show the **most saved months**. **Every visualisation is progressive**: one per screen, the next reached by scrolling. |
| V4-12 | **The day-wise visualisation comes back** (supersedes the "By day removed" part of V4-10). A goal's statistics page runs top to bottom: the **month stepper and all month boxes**, then **below them a day-by-day visualisation for the selected month**, where you **move through the months and every day is shown** (the GitHub-style weeks-by-weekday grid he sent, green added / amber taken out, glowing by amount). |
| V4-13 | **Most saved months are visualised, not written**: the separate "Most saved months" screen and text are gone. The biggest months show it through the glow of their boxes. |
| V4-14 | **Statistics go back to the earlier "By month / By day" toggle** (supersedes the scroll-below layout of V4-12). The **month stepper stays only in By month**. **By day has no month toggle**: the days are shown as **columns (weeks) by weekday**, like his reference, across the last twelve weeks, each day a box. |
| V4-15 | **The month toggle moves from By month to By day** (amends V4-14). **By month** has no stepper: just every month box (biggest months haloed). **By day** has the **month stepper** and shows **that month's days as week columns**. My reading: tapping a month box selects it, and By day then opens on that month. |
| V4-16 | **In By day the days are columns, not rows** (amends V4-14/V4-15): Monday to Sunday run **across the top as seven columns**, the **weeks stack down as rows**, like a calendar. Replaces the weeks-as-columns layout. |
Note: V4-12 puts two visualisations on one scrolling page. Kept to the one-visualisation-per-screen rule by having the day grid sit a scroll below the months (each is alone on screen). Board's "today" is now 28 October 2026 so the current month has days to show.
| V4-17 | **Full segmented ring** for the Savings page (not the half ring). Supersedes the half-gauge form in V4-2 for the main visualisation. |
| V4-18 | Ring sections are **sized by each goal's target amount**. |
| V4-19 | Goal rows keep the **colour dot** that matches their ring section. |
| V4-20 | The **halo stays on the three biggest months** in By month. |
| V4-21 | By month and By day **share the selected month**: the month tapped in By month is the month By day opens on. |
Board: https://claude.ai/artifact/X9aNwLv6pGGZb5sFcxiXEm (source archive/session-workfiles/viz4/viz4-savings-goals.html).
Interpretation to confirm: the top gauge is all savings together, goals stacked below it; "fill from the bottom" on a half gauge means filling up from the arc's lower ends, or a half-height grid (two forms drawn).

### Flows (Tarun, 2 Oct)
| # | Decision |
|---|---|
| F-1 | **"Pay toward a goal" means using the saved money to actually pay for, buy or experience the goal** (e.g. paying for the trip), **not a separate contribution payment.** It is **handled like categories while paying**: on the pay screen the goal is chosen the way a category is. This **merges two parked items** (pay toward a goal + V4-7 pay out of savings) into one flow. Money goes *into* goals through the splits (setup, week-end pop-up, new income), not through a payment flow. |
| F-2 | **"How much" and "What is it for" are merged into one screen.** What it is for is shown in **two tabs, Budget | Savings** (layout C), with **categories and goals drawn as boxes** (tiles). This settles the step-order and chooser-layout questions on the pay flow board. |
| F-3 | **The pay screen handles all overspending and not-enough-money edge cases** (no separate steps or screens for them). Drawn: over a category (buffer, then other categories equally, then savings, per O-23), a goal with too little saved (same order), and a low account balance as a warning; "Where it comes from" opens the split. |
| F-4 | **A final, nice confirmation screen with all the relevant data, shown as a success or a failure.** Drawn: amount, to whom, what for, where it came from, when, UPI reference; success green, failure amber with the reason and "nothing was taken from your budget". |
| F-5 | **The user can move money out of savings to other parts**: to **another savings goal**, to **categories**, to **the buffer**, "etc". A **Move money** flow, separate from paying. My reading, to confirm: it is reached from a goal's screen; "etc" also covers free (unassigned) savings and moving between other pots. |
| F-6 | **The "Where it comes from" breakdown on the pay screen is a visual, not a list of numbers.** Drawn: a strip of 25 boxes coloured by source (the category, the buffer, the other categories, savings in amber); tap a colour for its amount (V11). To confirm: strip form. |
| F-7 | **Show the amount for each source below the visual** (amends F-6: amounts are no longer only on tap). Drawn as name + amount pairs under the strip; a source that gives nothing is left out. This is a deliberate exception to V11's "amounts on tap", because the panel only opens when the user taps "Where it comes from". |

Pay screen flow board (2 Oct): https://claude.ai/artifact/LhuVGnFaj29oBbg3cYoX3u (source `archive/session-workfiles/flow1/pay-flow-1.html`). Board updated for F-2, F-3, F-4. Questions still waiting (eight on the board): what Pay does (hand-off to the UPI app assumed), box layout (2 columns), the goal pay screen look, not-enough-saved handling, when a goal is finished, money left in a finished goal.

Moving money board (2 Oct): https://claude.ai/artifact/H8t1Ep7UbonszCB2kbk4Xn (source `archive/session-workfiles/flow2/moving-money-1.html`). Six questions waiting: where Move money lives, what can be the source, money into a category (this week vs weekly amount), emptying a goal, what the confirmation says about dates, how moves show in the month view.

### Parked for the flow stage (after the visualisation queue; Tarun confirmed "we will work on the flow later")
- Savings tab: add a goal (done, O-14), show completed goals (V4-4).
- ~~Make a payment toward a goal~~ and ~~pay from savings by choosing a goal like a category (V4-7)~~ are one flow: **spend a goal's money to pay for it, chosen like a category (F-1)**. Screens still to draw.
- Celebration screen triggers: wherever a goal is completed (pay screen, income arriving, manual top-up).

### Viz 5 — Unspent → saved (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V5-1 | It happens **at the end of every week**, as a **pop-up screen on Home**. |
| V5-2 | The pop-up **shows a grid with red boxes that turn green** (the unspent money moving into savings). |
| V5-3 | He can **choose which goals the money goes into**. |
| V5-4 | It then **shows the updated savings ring** (the full segmented ring, V4-17). |
| V5-5 | Add **"Move it to next week's budget"** next to the savings option (this is the skip). |
| V5-6 | **Split equally into all categories.** My reading: when money goes to **next week's budget** it is split equally across **all budget categories**; when it goes to **savings** it is split equally across the goals picked. To confirm. |
| V5-7 | **Amber, not red**, for the unspent boxes (removes the red exception; the no-red rule stands). |
| V5-8 | **Show how much was left, in rupees, in step 1 itself** (overrides the earlier default of no ₹ on step 1); the scale chip comes with it. |
| V5-9 | A week with **nothing left or overspent** shows **boxes filled from the top, not the bottom**, with an **alert: "Let's do better this week"** and a **reminder of the savings goals**. |
| V5-10 | **The overspend amount is shown in emphasis**: large, bold amber ("₹300 over") under the grid, with "taken from next week" below it; on a week with nothing left the same slot reads "Nothing left". |
Board: https://claude.ai/artifact/N3Lg6rmjweszAX6owzt5Eu (source archive/session-workfiles/viz5/viz5-weekly-savings.html).
Viz 5 closed by Tarun ("done next"). The defaults below stand as drawn: default selection is all goals; boxes filled from the top = how far over (a week with exactly nothing left has no boxes from the top, just the alert); the alert's goal reminder is text rows with ETAs (no visualisation next to goals, V4-8); the next-week result is a plain list of categories and amounts.

### Viz 6 — Small / repeat purchases (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V6-1 | What counts: **the same place or kind, 3 or more times in 30 days, any amount** (the v9 definition). |
| V6-2 | It is **a view inside the Spending tab**, reached by scrolling (one visualisation per screen). |
| V6-3 | ~~The unit is a box that fills with each repeat.~~ **WITHDRAWN 2 Oct**: Tarun: "this is not working at all". |
| V6-4 | Repeat purchases must communicate **how much and how many times, per day, per week and per month**, using **calendar hotspots** (glowing calendar cells, the style of the savings By-day grid). |
Board: https://claude.ai/artifact/AbKgJ6jeARMKgeGMdtLGox (source archive/session-workfiles/viz6/viz6-repeat-purchases.html).
| V6-5 | **The habit list is the starting screen** of the repeats view: each habit with its **repeat count (x22, x12, x7…)**, **ordered by most repeats**. **No "All repeats"** entry. Tapping a habit opens its hotspot calendar. |
Viz 6 closed by Tarun ("done"). The defaults below stand as drawn: three scales on a habit's calendar, Day (hours of a typical day), Week (weekday by time of day), Month (the last 30 days), opening on Month; a Times / ₹ switch for the glow; spending-orange glow; numbers on tap; fewer than 3 repeats shows an empty state.

### Viz 7 — Time patterns (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V7-1 | It shows **all spending by time of day** (one hotspot view of everything, by hour and weekday), so "you spend more at night" shows across all categories, not one habit. |
| V7-2 | It lives in the **Insights tab**. |
Board: https://claude.ai/artifact/FdbjxsRYHqwkQ5hgxcCBzV (source archive/session-workfiles/viz7/viz7-when-you-spend.html).
Viz 7 closed by Tarun ("done with viz 7"). The defaults below stand as drawn: the same hotspot grids as Viz 6 (Day = hours of a typical day, Week = weekday by time of day, Month = the last 30 days) with a Times / ₹ switch and spending-orange glow; opens on Day; a calm sentence in words at the top ("A fair bit happens after 9 pm"), no scolding; a new user with few days gets a "fills in as you go" note.

### Cross-cutting (Tarun, 2 Oct) — plain-language sentence under hotspots
| # | Decision |
|---|---|
| X-1 | **Viz 6 and Viz 7 each carry a plain sentence** saying **the time of day, the day of the week, and which part of the month the user tends to spend more**, "just in case the user finds the visualisation hard to understand". It follows the scale on screen (Day, Week, Month) and the Times / ₹ switch. |
Drawn as: Day, "You spend most around 4 to 6 pm, and again around 10 pm."; Week, "You spend most on weekdays, in the afternoon."; Month, "You spend most in the middle of the month, around the 7th to 13th." Computed from the data. In Viz 6 the subject is the habit.

### Viz 8 — Subscriptions coming up (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V8-1 | It lives in the **Spending tab, in the Fixed group** (V1-7: rent, EMI, subscriptions as paid / due soon), a scroll below the rings and repeats. |
| V8-2 | It is **a calendar of what is due**: days with a payment due glow, so "in 2 days" is a spot you can see (same hotspot-calendar language as repeats). |
| V8-3 | **When, not how much, until you tap**: the glance says which bill and when; the amount is one tap in. |
| V8-4 | **The list under the calendar shows the amount too**: each row is the bill, its amount and when ("Coursera ₹999 in 2 days"). Amends V8-3: the calendar spots still carry no amount; the list does. |
Board: https://claude.ai/artifact/4Py7ojfodqGQ6hcaLd42fZ (source archive/session-workfiles/viz8/viz8-fixed-bills.html).
Viz 8 closed by Tarun ("next"). The defaults below stand as drawn: the calendar runs from the start of this week for six weeks; glow shows status (due soon, later), not amount; past dues show as paid ticks; a plain sentence under the heading says what is next (X-1); the bills as text rows under the calendar with name, amount and "in N days" (V8-4); no Home heads-up (not chosen).

### Viz 9 — This week vs last (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V9-1 | It lives in the **Insights tab**. |
| V9-2 | It compares **all spending first, then by category on tap**; a category's own then-and-now is its look-back (V1-13..V1-15, already decided). |
| V9-3 | The form is **two grids side by side, last week faded** (the same form as the category look-back, V1-14/V1-15). |
Board: https://claude.ai/artifact/7HMcsvp68aqLTVr33y37sG (source archive/session-workfiles/viz9/viz9-week-vs-last.html).
Viz 9 closed by Tarun ("next"). The defaults below stand as drawn: the weeks are compared **at the same point** (e.g. Monday to Thursday); each grid shows money left (V1-1); a plain sentence says more, less or the same, in words, no red (X-1); the by-category list shows the change in rupees on the tap layer, biggest change first, amber for more and green for less (not good or bad, just direction); a student in his first week has no last week and sees only this week with a note.

### Viz 10 — Transaction history (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V10-1 | The history is **a list grouped by day** (Today, Yesterday, Mon 27 Oct…). |
| V10-2 | You find a purchase with **filter chips: category and a day range**. |
| V10-3 | Each row says **name, amount, time** (with a category colour dot). Everything else is one tap in. |
Board: https://claude.ai/artifact/8LxmrXkdZfEGbp9H6uE8kZ (source archive/session-workfiles/viz10/viz10-history.html).
Viz 10 closed by Tarun ("okay next"). The defaults below stand as drawn: it is the last screen of the Spending tab (Tarun's Spending tab: budget setting, how much spent, transaction history); a day header carries the day's total; ranges are Today, 7 days, 30 days, All; category chips use the ring colours; tapping a row opens a detail (category, when, how it was paid, and the habit it belongs to); an empty filter says so calmly; editing a transaction is a later flow.

### Viz 11 — Exact amounts on tap (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V11-1 | The deliverable is **both a rules table and one standard tap pattern**. |
| V11-2 | A tap on a spot, box or day reveals its exact amount as **a line under the picture** (the pattern used on every board so far). |
| V11-3 | **Home shows no ₹ at all.** (The end-of-week pop-up is his own exception, V5-8/V5-10.) |
Not chosen by Tarun, listed in the table as what the drawn boards do (to confirm): no numbers on the marks of grids and rings (the scale chip is the only figure); the Savings page shows no amounts until a goal is opened; over / nothing-left is words first.
Three kinds of tap outcome, as drawn: a spot, box or day gives **a line under the picture**; a category, habit, goal or purchase opens **its own full screen**; the weekly pop-up is **a pop-up on Home**.
Board: https://claude.ai/artifact/RsXokgbfEjVoyKyb3pX7Zc (source `archive/session-workfiles/viz11/viz11-amounts-on-tap.html`). Still to confirm on the board: marks rule, Savings page amounts, over/nothing-left words first, rows that carry amounts, where the rules live.

## Onboarding — DONE (Tarun, 2 Oct; final board: https://claude.ai/artifact/16Z1Z4yx1VDWk3AT7rYP6j, source `archive/session-workfiles/onb1/onboarding-1.html`)
Board: https://claude.ai/artifact/16Z1Z4yx1VDWk3AT7rYP6j (source `archive/session-workfiles/onb1/onboarding-1.html`).
| # | Decision |
|---|---|
| O-1 | Order: **title screen → PIN setting → UPI linkage and manual tracking → app permissions → budget setting.** |
| O-2 | Budget step opens with **whatever balance the account has; the user first splits it into savings and budget.** |
| O-3 | Two ways to set the budget: **"I have no particular budget in mind"**, or **choose categories and assign each an individual budget.** |
| O-4 | People may not know how much to spend, so the input is **how much they are comfortable spending every week, per category.** |
| O-5 | **A list of 50 categories** to pick from; **a recommended set is already chosen**; the user can **create their own.** |
| O-6 | The weekly amount per category is set with **a slider that can be adjusted** (not typed, not fixed). |
| O-7 | **If a budget is already set, the categories are limited to that much**, and **each time something is assigned it is coloured and shown in the grid** (the same 10x10 grid as everywhere else). |
| O-8 | **Choosing how to set the budget (old 5b) comes before splitting the balance (old 5a).** |
| O-9 | If **"no budget in mind"** is chosen, the flow **focuses on savings and goals**. |
| O-10 | **Step 6 is savings and goals setting, with the same grid visualisation.** |
| O-11 | **Set PIN asks for reconfirmation** (enter it twice). |
| O-12 | **Setting a goal also asks by when it should happen.** Having no particular goal is fine (goals are optional). My reading: the date is optional too ("No date"); to confirm. |
| O-13 | **The balance split has no 10% / 20% / 30% quick stops** (and no other presets): the slider alone. |
| O-14 | **Add a goal must be in a much more intuitive and easily reachable spot** (not a small top-right link). Drawn: at the bottom beside Finish, and a large card when there are no goals; the exact spot is on the board for confirmation. |
| O-15 | **When a new income arrives it follows the same split-balance process** (split, weekly sliders, goals). Drawn starting from last time's choices; the Home prompt carries no ₹ (V11-3). |
| O-16 | **There is always a buffer category** in the weekly budget. Drawn: grey, pinned, it is whatever is not given to the other categories (starts at about 10%); whether it has its own slider is a question on the board. |
| O-17 | **The spending (budget) is split in one of three ways: already-set amounts/percentages (preset), split equally, or manual** — in manual the user uses sliders or **directly edits the money** (types the amount). |
| O-18 | **Preset is not available during onboarding** (amends O-17): setup offers Equal and Manual only. Drawn: Preset appears after setup, as the user's own last split, first used when new income arrives. |
| O-19 | **If manual tracking is chosen, just ask for the balance** (one question). |
| O-20 | **Subscriptions are tracked automatically through UPI, or entered by hand if manual.** They are shown **in the budget handling screen** (drawn as "Fixed bills", taken off the week first). |
| O-21 | **If "no budget in mind" is chosen, ask a few questions** (such as how much they would like to spend in a week) **and create the budget for them in onboarding** (help set the budget). |
| O-22 | **Do not show "2 months late" or anything like it in onboarding.** Goals just show **how much must be saved a month (or week) to reach the goal.** |
| O-23 | **Overspending flow:** take it from the **buffer**; if the buffer is used up, **remove equally from the other categories**; if those are also used up, **remove it from savings.** |
| O-24 | **Do not show all 50 categories.** Recommended shows **food, travel and other basic needs**; the rest are **found by search**; if search finds nothing, **create a new one for the user.** |
| O-25 | **"Sort out anything that I didn't handle":** delegated to Claude. Defaults drawn on board 3 and marked to confirm: change-the-amount link on the balance, "Is this income?" on a new credit (UPI) and an Add-income action (manual), forgot PIN through the phone's own lock, first week prorated by days left, tap a box for its category name, a calm "goals need more than you set aside" screen, bank-pick / link-failed / notifications-declined screens, an "All set" screen, and savings in the no-budget path = what is left after the weekly budget. |
| O-26 | **New income is never auto-detected.** No "Is it income?" prompt (replaces that part of O-25 and O-15's Home prompt). **The user adds money by hand where it belongs**, e.g. a friend paying back ₹200 goes into the right place, not into income. Drawn: Income tab → Add money → "Where does it belong?" (new income / back into a category / the buffer; my reading, to confirm); new income then follows the same split (O-15). |
| O-27 | **Search sits below the six basic categories, and "+ Add your own" category sits beside it.** (A search with no match still offers to create it, O-24.) |
| O-28 | **"Everything else is fine":** the nine defaults drawn for O-25 are confirmed as drawn (six basics; Change link on balance; added money goes to new income / a category / the buffer; forgot PIN via the phone's lock; prorated first week; "goals need more" screen; savings in no-budget = what is left; overspending shrinks goals proportionally; colours). The earlier unanswered drafts (title screen, 4-digit PIN, notifications + fingerprint only, savings slider starts at 0, Equal as the default split) stand as drawn. **Onboarding is done.** |
Drawn as first drafts, NOT decided (superseded by board 3's nine confirm-questions, O-25): title screen content; 4-digit PIN with an amber mismatch line; link/manual as two equal cards with Excel/CSV import as a small placeholder line; permissions = notifications + fingerprint/face only (no SMS, per hard rule); savings split as a slider only, starting share 0; weekly sliders cap at what is left (nothing-left line, no auto-take from others); unassigned boxes are 'spare'; step 6 savings are monthly so each goal shows an ETA, and compares it with the chosen date (in time, or amber 'N months late'), goals skippable; 'no budget' path = savings split, step 6, tracks four weeks then offers a weekly budget; recommended eight (Canteen & mess, Chai & coffee, Snacks, Bus & metro, Auto & cab, Mobile recharge, Outings, Stationery); (going-over wording dropped: sliders now stop at the budget, O-7). The 50 names are a draft list (8 groups); fixed bills/subscriptions live in the Fixed group (V8), not the list.

## Delegated phase — "figure out the entire app" (Tarun, 2 Oct)
Tarun's instruction: fix logic gaps, complete all other flows, figure out the whole app, skip the grey-mockup stage, arrange data, screens and flows into one tabbed artifact; then visualisation, then mockup; do not ask or wait for decisions, keep him updated. **Everything below is Claude's decision under that delegation (status: delegated, open to override).** Source: the Blueprint artifact https://claude.ai/artifact/RVjueXaXCsmCKyF6UUEErj (`archive/session-workfiles/blueprint/blueprint.html`).
| # | Decision (delegated) |
|---|---|
| D-1 | A week runs **Monday to Sunday**, local time; weekly amounts reset Monday 00:00. |
| D-2 | **Weeks per month = 4.3** for conversions. Internally money is whole rupees; amounts shown round to ₹5 under ₹1,000 and ₹10 above; Indian digit grouping (₹1,50,000). |
| D-3 | **Pots invariant:** income = budget + savings; budget = fixed reserve + categories + buffer; savings = goals + free savings. Every rupee is in exactly one pot. |
| D-4 | **How long the money lasts** is asked on the split screen (1 week, 2 weeks, a month (default), until next allowance). Weekly budget = budget part ÷ weeks it lasts. With several incomes, the weekly budget is the sum of each income's weekly share until it runs out. |
| D-5 | **Reconciles V1-6:** weekly budget is primary; monthly figures are weekly × 4.3. **Reconciles V1-8:** everyone has a budget from onboarding; after 4 weeks Trickle offers "Re-fit from your weeks" in budget handling. |
| D-6 | **Week-end:** unspent = categories' remainders + buffer's remainder (not the fixed reserve). Choices (V5): savings (goals equally by default; free savings if no goals) or next week's budget (equally across all categories **including the buffer**). Missed weeks queue newest first; "Do this for earlier weeks too" applies one choice. |
| D-7 | **Fixed reserve** (reconciles V1-7 with O-20): each week one 4.3rd of the monthly bills is set aside; paying a bill drains the reserve; unspent reserve stays reserved and is never part of week-end unspent. Irregular bills (3-monthly, yearly) reserve amount ÷ weeks in the period. A shortfall follows the O-23 cascade and says so. |
| D-8 | UPI-detected repeating payments (same merchant, similar amount, about a month apart, twice) are **proposed** as fixed bills with a quiet card; Ignore is remembered. |
| D-9 | **Home heads-up for a fixed bill:** one words-only line under the sentence when a bill is due within 2 days ("Spotify is due tomorrow"); no ₹ (V11-3); tap opens the Fixed calendar. |
| D-10 | **What "Pay" does:** Trickle's pay screen → opens the user's UPI app with amount and payee filled → on return Trickle looks for the payment on the account link. Found = success. Not found in 60 s = third state "Waiting for your bank" with "Check again" and "It did not go through". Manual mode asks "Did it go through?". |
| D-11 | **Payments made outside Trickle** (UPI linked) arrive as Detected; category guessed from merchant memory, else Unsorted. Unsorted payments are charged to the buffer until sorted. Home shows a words-only line ("2 payments need a category") opening the Sort tray. |
| D-12 | A payment seen twice (Trickle Pay + detection) is merged by amount + payee + a 10-minute window. |
| D-13 | **Credits are never auto-income** (O-26): detected credits wait passively in an "Unsorted money in" tray in the Income tab, no prompt, no Home line. |
| D-14 | **Editing a transaction:** category, amount, note, time; delete for manual entries; "Not mine" hides a detected one (restorable). Edits in a past week change that week's history only and never re-open week-end decisions. |
| D-15 | **Manual mode** weekly check at week end: "Does your balance still look right?"; a difference becomes an Unsorted "unlogged spends" entry charged to the buffer. |
| D-16 | **Split payments are out of scope** for v1: a friend's repayment is handled by Add money → back into a category (O-26). |
| D-17 | **Budget edit mid-week:** the weekly total stays; sliders redistribute inside it (Equal / Manual / Preset / From my weeks). A category's slider cannot go below what it has already spent. Raising the total = Move money from savings or Add money. |
| D-18 | **Categories:** adding mid-week starts at ₹0 and is funded from the buffer; deleting returns its remainder to the buffer and asks to move its history to another category or keep it archived; merging sums history and amounts; max 30 active categories. |
| D-19 | **Add money destinations:** new income (split), back into a category, the buffer, free savings. New income offers "Remind me monthly" → a gentle reminder "Did your allowance come?" (no ₹). |
| D-20 | **Goals:** name, target, optional date, saved. Needed-per-month = target ÷ months left (up to ₹10). ETA = average of the last 3 months' actual pace, else the planned pace. Free savings is a pot shown as "Not given to a goal". |
| D-21 | **Goal states:** Active → Reached (saved ≥ target; celebration fires once, offers "Mark done" or "Keep going") → Done/Completed. Paying from a goal then "Yes, done" also completes it (celebration once if not already played). Leftover on completion returns to free savings. Deleting a goal returns its money to free savings after a confirm. |
| D-22 | **Overspending that reaches savings** takes free savings first, then goals in proportion to what each holds (O-28). |
| D-23 | **Celebration triggers:** the pay confirmation, the week-end pop-up, add money / new income, a move, or a manual top-up, shown on the next screen open, never mid-flow. |
| D-24 | **Category look-back from week-vs-last:** tapping a category row opens its detail with compare preset to 1 period back. |
| D-25 | **Linking:** unlink stops detection and keeps history; switching to manual asks for the balance; relinking offers to import the last 30 days as Unsorted. Settings → Account & linking. |
| D-26 | **Excel/CSV import** (placeholder, no SMS): pick file → map date / amount / name columns → preview → import as Unsorted. |
| D-27 | **PIN:** 4 digits; 5 wrong tries → 30 s wait, doubling; biometric optional; forgot PIN resets through the phone's lock, data stays; auto-lock after 1 minute in background; hidden in the app switcher. |
| D-28 | **Notifications:** week-end wrap-up (Sunday 8 pm, changeable), bill heads-up (a day before), a monthly allowance reminder, at most one other a day; quiet hours 10 pm to 8 am; **never any ₹ in a notification**; gentle tone. |
| D-29 | **Settings** lives behind a gear on Home: Account & linking, PIN & lock, Notifications, Budget, Categories, Data (import, export, delete), About & privacy. |
| D-30 | **Pay entry:** a Pay button on Home and in Spending; manual users get "Add a spend" on the same merged screen with "I already paid". |
| D-31 | **Privacy:** data stays on the phone (local-first); export as CSV; delete everything in Settings → Data. Notifications and the app switcher hide amounts. |
| D-32 | **First-run states:** Home "Your week starts now" with a full grid; rings full; History "Nothing yet"; Insights "fills in as you go" (V7, V9 defaults); Repeats needs 3 repeats. |
| D-33 | **Accessibility:** colour never carries meaning alone (names accompany every colour); 44-pt touch targets; reduced motion respected; every box has a screen-reader label; amounts read in words. |
| D-34 | **Savings rows and the Insights tab:** Insights holds "When you spend" and "This week vs last" only for now (V7, V9); a Sankey stays parked (HANDOVER). |
| D-35 | **Scale rounding** (reconciles V1-2 with sliders in ₹5 steps): category amounts move in ₹5 steps; 1 box = amount ÷ 100, shown as "1 box = ₹X", rounded to the nearest rupee with "≈" when not whole. A goal's grid is its target ÷ 100. |
| D-36 | **The Home grid covers the week's flexible money** (all categories plus the buffer, money left). Fixed bills are not in it. No scale on Home. |

## Design system (Tarun, 2 Oct)
Tarun's request: "nice gradients and colors … research well, collect refs, make a design system", with two reference images (a purple goals app with gradient ground and gradient rings; his Figma colour sheet). Built as the **Trickle Night** design system: https://claude.ai/artifact/3vrR99iZ8rmzw51MeFRXde (source `archive/session-workfiles/designsystem/`, rebuild with `python3 build.py`; reference images in `references/inspiration/ds/`). Research sources are listed in its References tab.
| # | Decision (delegated unless noted) |
|---|---|
| DS-1 | **Dark-first system called Trickle Night**; Day (light) theme from the v12 Figma tokens is a later mapping. Tarun asked for it; the contents are delegated. |
| DS-2 | **Ground:** a near-black blue (#05070B base) with two faint blooms (plum top-left, teal top-right), like his purple reference; four surface levels (#05070B, #0B0E14, #12161E, #1A1F29), hairline #262C37. Never pure black. |
| DS-3 | **Ink:** #F5F7FA / #A3ABB8 / #6E7685 (muted is non-text only). All text pairs pass AA; computed live on the Colour tab. |
| DS-4 | **Meaning colours kept** and given depth gradients (highlight → shade, made in OKLCH): spend #F08A3C, save #62DCB4, amber #E3A43F, buffer #9AA4B0, fixed #8D7A66, income #C9CDD6; goals greens #62DCB4 / #3FAE8C / #9BE8CF. **No red** (his sheet's "sketch red" is retired). |
| DS-5 | **Category colour change:** cat/2 moves from #B48CFF to **#CDB6FF** (under deuteranopia the old violet was almost identical to the blue, distance 0.8 → 12.4). Other four unchanged (#5AA9FF, #FF7EB6, #F2D65B, #4FD1E6; rest #F6B27C). |
| DS-6 | **Three kinds of gradient:** liquid (box fills), glow (hotspot halos), mesh (a few big moments). Mesh recipe = his Figma squircle tile (base sweep, four blooms, bottom fade, haze) + grain. Eight named meshes (Savings Grove, Goal Reached, Payday, Ember, Dusk, Night Glow, Fresh Start, Month Story). One mesh per screen at most; never behind data; never behind small text without a scrim. |
| DS-7 | **Type:** Bricolage Grotesque (display) + Figtree (body), tabular numerals, Indian digit grouping; scale 48/34/22/16/14/12.5. |
| DS-8 | **Depth by light:** lighter with height, a thin top highlight, soft dark shadows; no hard offsets (the CRED NeoPOP look is rejected as it fights the soft grid). Radius: chip 10, tile 14, card 18, sheet 28, button 16. |
| DS-9 | **Components and data visuals specified** (buttons, segmented, chips, box tiles, list rows, banner, amount field, keypad, slider, switch, tab bar, scale chip, confirmation records; fuel grid, nested rings with glowing caps, segmented ring, hotspots, month boxes, source strip, income split). |
| DS-10 | **Motion tokens:** 120 / 200 / 320 / 600 / 1300 ms; crumble 18 ms per box; celebration once; reduced motion shows the finished state; no shake or pulse on warnings. |

## Mockup (Tarun, 2 Oct)
Tarun's request: "mockup now, along with a way to switch profiles and simulate different events". Built as a clickable high-fidelity prototype: https://claude.ai/artifact/RuuvM1tyRSEj8fKvQrkLmZ (source `archive/session-workfiles/mockup/`, rebuild with `python3 build.py`). Visualisation was folded into the mockup (composition decided while building). Decisions below are delegated.
| # | Decision (delegated) |
|---|---|
| M-1 | **One engine, no painted numbers:** every figure on screen comes from a live ledger (pots, the O-23 cascade, week-end, fixed reserve, goals, moves). A Ledger panel shows the pots and a balance check. |
| M-2 | **Six profiles** from the student pool (Vaishak manual and 2 categories; Gautham week 1 with no history; Tarun; Yash; Nishad 12 categories and big bills; Harsh 18 categories and 3 goals), each with seeded history. Switching resets that profile. |
| M-3 | **Simulator events:** time (+1 day, +3 days, Sunday 8 pm week-end, new week); payments seen on the link (known and unknown places); spends (small, over budget, all the way to savings, use up the week); credits (income-sized, friend's ₹200); bills (due tomorrow, due now); goals (reaches target, +₹500); switches (bank declines, bank slow, low account balance, link lost). |
| M-4 | **Covered screens:** Home, Spending (rings, repeats, fixed bills, history, category detail with compare, habit calendar, transaction detail and re-file, budget handling, sort tray), Income (split grid in three levels, add money, unsorted credits), Savings (ring, goal statistics by month and by day, add goal, edit, move money, free savings), Insights (when you spend, this week vs last), Pay (merged screen, crumble pay screen with all over-budget cases, hand-off, waiting, confirmation, failure, "Is it done?"), week-end pop-up, goal celebration, settings. |
| M-5 | **Left out of this pass:** onboarding (has its own board), PIN and lock, import wizard, notifications screens; settings rows other than account and linking are stubs. |
| M-6 | **Category colours follow size:** the five biggest categories take the five category colours in size order; the rest share peach. |

## Design system B — Instrument (delegated, open to override)
Second visual direction from Tarun's hardware-instrument moodboard. Published beside Night (DS-1…DS-10); Tarun picks. Source: `archive/session-workfiles/designsystem2/`.
- DS2-1: One flat colour field per tab: Home carbon #0E0E10, Spending signal #FF6A1A, Income bone #E9E5DC, Savings moss #2F9D5A, Insights mustard #FFC20A. No gradients or meshes.
- DS2-2: Data sits on black LCD panels; amounts in Barlow Condensed, labels Space Mono, body Inter Tight.
- DS2-3: Own 5x7 bitmap dot-matrix font for short words and numbers only (CALM, DONE, amount on Pay). Never a money unit; money stays the 10x10 cell grid.
- DS2-4: Moodboard vermilion retuned to orange (hue 23) to honour the no-red rule. Warnings are amber LED on black only. Ink on colour is always #0E0E10 (white on signal fails contrast).
- DS2-5: Controls are keys (2px press) and dials with detent ticks; savings is a segmented dial by goal; goal reached uses a dot grille.
- DS2-6: Motion mechanical and quiet (cell 45ms stagger, dial tick 25ms); reduced motion jumps to end state.

- M2-1: Instrument mockup built from the Night mockup (same engine, profiles, events, flows). Only the skin changed: colour field per tab, LCD panels for grids/dials, dial-tick rings, dot-matrix status word on Home and amount on Pay, keys, moss goal-reached screen. Source `archive/session-workfiles/mockup2/`. Delegated, open to override.

- M2-2: Full-flow mockup. The Instrument mockup now opens on onboarding (title, PIN set and confirm, UPI link with soft failure or manual balance, permissions, category path with split slider, or the no-budget three questions, categories with search and create, equal or manual share with fixed bills and buffer, goals with dates, all set) and builds a live ledger from the answers. Added PIN lock screen, Settings sub-screens (notifications, PIN and lock, data: import placeholder, export, delete) and a re-fit-to-real-weeks sheet. Known gap: first week is not prorated. Delegated, open to override.

- M2-3: Tarun chose the first design system (Night) to build on. The full flows (onboarding, lock, settings sub-screens, import, re-fit, flicker and scroll fixes) were ported into the Night mockup (`archive/session-workfiles/mockup/`, published at https://claude.ai/artifact/F5iDLzVpmpKw8dSwUWkSU9). Instrument stays as an alternate (`designsystem2/`, `mockup2/`).

## Bare-minimum mode (user feedback: no budget or balance required) — delegated, open to override
- B-1: **Only category tracking is required.** Balance and budget are optional and can be added at any moment. The product is a ledger of spends by category first; budgeting and balance layer on top.
- B-2: **Required inputs: none beyond a way to see spends** — UPI link, or manual add. PIN, permissions, bank, balance, budget, split, bills, goals, categories-with-amounts are all skippable ("Skip, I'll start tracking").
- B-3: **Categories seed from defaults** (six basics, editable). Unsorted payments sit in an "Unsorted" tray; the user sorts them with one tap. Custom categories can be created in the moment of sorting.
- B-4: **No budget → no gauges that "run out".** Each category shows what was spent this week/month as a 10×10 grid scaled to its own recent average (week 1: scaled to the biggest category). No "left", no overspend, no cascade, no buffer, no week-end pop-up pressure; the week-end card becomes a neutral recap ("You spent ₹X, mostly on Food").
- B-5: **No balance → no balance anywhere**, no low-balance warning, no "weeks left". Home shows the spend total and the top categories only.
- B-6: **Soft prompts, never gates.** After ~1 week of data Trickle offers "Set a limit for Food? You usually spend about ₹X" (per category, optional, one tap to accept the suggestion). Balance is offered once when the user taps "how long will my money last". Each category can have a limit on its own; the full budget (pots, buffer, savings) appears only when the user turns it on in Settings.
- B-7: **Three levels the user can sit at:** 1 Track (spends by category), 2 Limits (some categories have limits, gauges drain for those only), 3 Full plan (income, budget, savings, goals, cascade as in the blueprint). Moving up never loses history.
- B-8: Engine: `S.mode` = track | limits | plan; `S.bal` and `S.income` may be null; cascade runs only for categories with `amt`; a category with no `amt` records spend but never overspends.
- B-9: **The user can always say no.** Every question, prompt and setup step has a visible "Not now" / "Skip" that is as easy to tap as the main answer. Skipping never blocks, nags or locks a feature; the app uses a sensible default and asks again only when the answer would help (and never twice in a row). Applies to onboarding, in-app prompts, permissions, PIN, balance, budget, goals, bills.
- B-10: **Every question is short and plain.** One question per screen, asked the way a friend would: at most ~8 words, no jargon (no "budget method", "pots", "cascade"), a one-line hint at most. Answers are big taps, not forms. Example: not "How would you like Trickle to track your money?" but **"How should we see your spends?"** with **"Link UPI"** / **"I'll add them"** / **"Skip"**. Other rewrites: "Set your account balance" becomes "How much is in your account?" (skip: "Not now"); "Choose a budget method" becomes "Want weekly limits?" ("Yes" / "Not now"); "Allocate weekly amounts to categories" becomes "How much a week for Food?"; "Enable notifications" becomes "Remind you about bills?".
- B-11: Copy review: every existing onboarding and prompt string is rewritten to B-10 and checked for a Skip before the mockup, blueprint and Figma are updated.

- B-12: **Pop-up set built in the Night mockup** (`ui_e.js`, one bottom card each, one question, big yes, equally easy no): Link UPI? · Add a spend? · Payments need a place · Set a limit for [Category]? (suggests last week's average) · How much is in your account? (four quick amounts) · Want a full plan? · Saving for something? · Remind you about bills? · Lock with a PIN? · Bring in older spends? · Last-week recap (no budget, no "no" button, just OK). All in the Simulate panel under "Pop-ups (always skippable)". Answers are remembered so a "no" is not asked again straight away.

- B-13: **Built in the Night mockup (onboarding + track mode).** Onboarding is rewritten to B-10 and every step is skippable, including the PIN: Title (Get started / **Just start tracking**) → PIN? (Skip) → How should we see your spends? (Link UPI / I'll add them / Skip) → How much is in your account? (Not now) → Two quick things (reminders, fingerprint) → What do you spend on? (Skip, use the basics) → Want weekly limits? (Yes / Not now) → [with a balance: How much to save? → How much for each? → Saving for something? (Skip)] [without a balance: About how much a week? → Any monthly bills? → How much for each?] → All set. "Just start tracking" goes straight to the end with defaults.
- B-14: **Track mode in the app** (`ui_f.js`): Home shows one grid of this week's spends by category, scaled to last week (or the week so far, min ₹100), headline "Mostly Food.", and at most two soft nudges that vanish after a "no". Spending lists categories with this week's amount; a category screen shows this week, last week and an optional limit (set or remove any time). Pay becomes "How much? / For what?" with no cascade. Income and Savings show an invite ("No plan yet." / "Saving for something?") instead of numbers. Week-end becomes a one-line recap with only OK. Lock is off until a PIN is added (Settings, or the PIN pop-up).
- B-15: **Moving up keeps history.** "Want a full plan?" re-opens the budget steps (balance, save, share-out, goals), each skippable, and carries over all spends and the remembered places; spends in categories the user dropped become unsorted. A limit-only user without a balance never sees income or a balance.

- B-16 (Tarun): **Trickle never asks for the account balance.** The only money number it asks for, and only when the user chooses "Yes, set limits", is how much they spend in a week ("About how much do you spend in a week?", quick amounts or Other). Removed: the balance step, the "How much to save?" step, the balance pop-up and the "How long will my money last?" nudge. Goals and savings are added later, in the app, never in setup. This supersedes the balance parts of B-5, B-6, B-13 and B-15.

## Visualisation queue (one at a time)

1. Budget gauge — DONE
2. Pay / friction: amount crumbling away — DONE
3. Income split (spending vs savings) — DONE (V3-1…V3-11)
4. Savings goal (how much, by when, actually saved) — DONE (V4-1…V4-21); also: add goal, pay into a goal, completed goals (parked requirement above)
5. Unspent → saved — DONE (V5-1…V5-10)
6. Small / repeat purchases — DONE (V6-1, V6-2, V6-4, V6-5; V6-3 withdrawn)
7. Time patterns (e.g. nights) — DONE (V7-1, V7-2, X-1)
8. Subscriptions coming up (Fixed group) — DONE (V8-1…V8-4)
9. This week vs last — DONE (V9-1…V9-3)
10. Transaction history — DONE (V10-1…V10-3)
11. Exact amounts on tap (progressive disclosure rules) — DONE (V11-1…V11-3; the 5 'still to confirm' points stand as the board's defaults, unanswered)

## Parked / superseded
- Coin test (V4 vs V1) and name-rows vs families category ideas (claude/v14_stage2b_coins_categories.md) — superseded.