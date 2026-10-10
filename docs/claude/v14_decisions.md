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

(Restored 6 Oct 2026: the Viz 2 and Viz 3 sections and the parked Savings requirement were deleted by accident in commit 836e0fe when V1-10 was logged. Recovered verbatim from git history.)

### Viz 2 — Pay / friction (answers 2 Oct; options board not drawn yet)
| # | Decision |
|---|---|
| V2-1 | What crumbles: boxes from the category's own 10x10 grid (same object as Viz 1). |
| V2-2 | When: "crumble away and indicate a ghost of what left, before paying" - the crumble plays on the pay screen before the payment is confirmed, leaving a ghost of what left. (My reading: boxes crumble out of the grid as a preview; can still back out - confirm with Tarun.) |
| V2-3 | Sting: "indicate what left until we move to the next screen" - the ghost of the departed boxes stays visible until the user moves on; no red/shake/sound drama. |
| V2-4 | Crumble = **D, fade in order**: the paid boxes fade out one by one, top first, no pieces (~1.5 s). |
| V2-5 | Ghost = **G2, dashed outline** where the liquid was, kept until the user moves on. |
Defaults on my recommendation, not explicitly answered (change any time): payments under one box crumble at true size; going over carries V1-4 to the pay screen (everything left fades, then amber floor line + words, no red); the ghost updates live as the amount or category changes and snaps back if you back out.
Board: https://claude.ai/artifact/Fsvd6fogygvPdtsrHsqMyN (source archive/session-workfiles/viz2/viz2-pay-friction.html). No inspiration images were needed.

### Viz 3 — Income split (Tarun's structure, 2 Oct; options board drawn)
| # | Decision |
|---|---|
| V3-1 | Income splits into spending and savings. Spending splits into budget and subscriptions. Savings splits into goals. |
| V3-2 | All of it is drawn from the same grid (the 10x10 box grid). |
| V3-3 | Colours: income grey, spending orange, savings green; the budget's categories are different colours (matches V1-9). |
| V3-4 | Layout: **bands from the bottom** (not columns). |
| V3-5 | **Savings at the bottom**, spending on top. |
| V3-6 | Go deeper **level by level**, each step with a slow, smooth delay (my reading: the same grid splits in place, one step at a time). |
| V3-7 | **Biggest five categories coloured, the rest shared as "others".** |
| V3-8 | Labels must be separated and differentiated better: savings and spending were run together in one list. Resolved by V3-9 and V3-10. |
| V3-9 | Labels = **L2, drop-downs after the split**: two collapsed lines, "Savings" and "Spending", each opens into its own list. |
| V3-10 | A **visible gap between the savings band and the spending band inside the grid** (not only in the labels). |
| V3-11 | **App-wide rule:** the scale line ("1 box = ₹120") must carry visual hierarchy so people don't miss it — a prominent chip, not small grey text, on every screen that shows it (Viz 1 gauge, Viz 2 pay screen, Viz 3 income). Applied to the Viz 2 and Viz 3 boards; the Viz 1 board still has the old small line and gets it in the build. |
Viz 3 closed by Tarun ("done viz 3"). Defaults that stand, not explicitly answered: the stepped edge in the split row (spending boxes sit higher than savings boxes beside them); a group with nothing in it (no subscriptions / no goals) is not drawn; budget is light orange and subscriptions hatched orange.
Board (updated): https://claude.ai/artifact/KHq3fHEr8sebrJzRksghMQ (source archive/session-workfiles/viz3/viz3-income-split.html).

### Parked requirement (Tarun, 2 Oct) — Savings tab
In the Savings tab the user must be able to **add goals**, **make a payment toward a goal**, and see **a few completed goals**. Not for now ("this happens later"); belongs with visualisation 4 (savings goal) and the Savings-tab screens. Keep track of it.

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

- B-17 (Tarun): **A plan and income are two different things.** A plan is what you spend in a week, split by category. Income is money you get, and it can be split any way into saving and spending. Neither is asked in onboarding: onboarding is only PIN (skippable), how to see spends, two small permissions, and categories. Balance is never asked (B-16).
- B-18 (Tarun): **Home holds "Make a plan" until a plan is set.** Tapping it runs the plan steps (weekly spend, monthly bills, how much for each category). Spends already tracked carry over.
- B-19 (Tarun): **Income tab holds income and the split.** Empty state: "No income added." → "Add income" → "How much came in?" → "How much to save?" (a slider from 0 to 100 percent in steps of 5, rest is spending). The saving part goes to savings. Income is independent of the plan and can be added with or without one.
- B-20 (Tarun): **After about a week of tracking Trickle asks once:** "Here is how you spend. Want to make a plan?" with the top three categories. If the answer is no, it asks again after four weeks.

- B-21 (Tarun): **Income can become the plan.** After the saving/spending slider (B-19), if no plan exists Income offers "Next": "How long should it last?" (a month, 2 months or 3 months), which turns the spending part into a weekly amount. "Make my plan" then continues to monthly bills and how much for each category, and that split becomes the plan. "Just add the income" skips the plan. Once a plan exists, adding income only splits saving and spending. The plan can still be made from Home without any income (B-18).

- B-22 (Tarun): **An income covers a date range.** "How long should it last?" is now "Until when?": quick picks (1 week to 2 years) or any day on a calendar from today up to two years out. The screen shows the weekly amount for that range (a range shorter than a week counts as one week).
- B-23 (Tarun): **Several incomes, one weekly plan.** Each income keeps its own saving/spending split and date range. The weekly plan is the sum of the spending parts of every income that is still running, divided over its own weeks. Adding an income to an existing plan raises the weekly amount and the category amounts scale with it. When an income's range ends, the plan drops by that income's share. Money left over is moved to savings. Open (delegated): whether the leftover moves on its own at week-end or after one tap, as it does now.

- B-24 (Tarun): **The plan snaps to whole weeks (Monday to Sunday).** An income's end date snaps to the Sunday of the week picked, the current week counts as week 1, and the weekly amount is the spending part divided by that whole number of weeks. Quick picks are 1 week, 1 month (4 weeks), 3 months (13), 6 months (26), 1 year (52) and 2 years (104). No part-weeks.
- B-25 (Tarun): **Subscriptions replace "fixed bills", and the user can type their own.** Popular ones stay as one-tap suggestions (Spotify, Netflix, Wi-Fi, Hostel fee, Gym, Prime, YouTube Premium). "Add your own" takes a name, an amount, how often (weekly, monthly, every 3 months, yearly) and the next payment date from a calendar. It is available in the plan steps, in Spending, and in track mode (without a plan a subscription is just listed and reminded).
- B-26 (Tarun, "use that system"): Subscriptions come off the top of the weekly plan before categories. Each one can be changed, paused or removed; a paused or removed subscription gives its weekly share back to the buffer. If subscriptions take more than the plan has, the category amounts shrink to fit.
- B-27 (Tarun, "use that system"): **Repeat payments are spotted.** If the same place charges about the same amount twice, about a month (or a week, 3 months, a year) apart, Trickle asks "Is Netflix a subscription?" once. "Not now" means it is never asked about that place again.
- B-28 (Tarun): **One-off money (a friend paying back, a gift) sits outside income and the plan.** It shows on Home as "₹200 from Rahul, where does it go?" and can be saved, put back into a category (when there is a plan) or just noted. It is also available from the Income tab as "Add one-off money".

- B-29 (delegated, open to override): **Weekly stays the engine, not the only language.** Evidence for weekly is thin (see `docs/claude/weekly_budget_validation.md`): the interviews show weekly *checking*, not weekly *planning*. Inputs are taken in the units people think in (monthly income, monthly or yearly subscriptions, a date range), converted to weeks, and the monthly equivalent is shown beside the weekly amount. A 5-student test is proposed in the memo.
- B-30 (delegated): Quick picks are calendar months, snapped to the Sunday of that week; the number of weeks is counted as whole Monday-Sunday weeks (an off-by-one that divided plans by one week too many is fixed).
- B-31 (delegated): **Plan health is said on Home, before it happens:** "Plan drops to ₹X a week after 8 Nov" (within 14 days), "No income covers this week", "Subscriptions take ₹X of your ₹Y a week". The plan steps warn when subscriptions leave almost nothing for categories.
- B-32 (delegated, supersedes the open part of B-23): **Left-over money moves to savings by itself at week end**, with a one-line recap ("₹1,150 moved to savings"). The three-step week-end pop-up is no longer shown to people with a plan; moving it back is done in Move money. Needs a student test (see memo).
- B-33 (delegated): **A subscription never raids other categories.** If its set-aside is short when it falls due, the order is its set-aside, then the buffer, then savings.

- B-34 (Tarun): **An income added mid-week is split day by day and this week only gets its own days.** The range runs from today to the chosen Sunday; the weekly amount is the spending part divided by the days times 7; the current week gets only the days that are left in it (for example 3 of 7 days, so 43% of a full week). Category amounts and the buffer are scaled for that first week and go back to full from the next Monday. This replaces the "first week is not pro-rated" gap and B-24's "the current week counts as week 1".
- B-35 (Tarun): **The look follows his Figma file (`TrickleMockup`).** Blurred blue, violet and teal colour at the bottom of every onboarding screen (top and bottom on the title), a title with three gradient cells (white, orange, green) over "Trickle" in mint, "STEP n OF 4" captions and four step dots (current dot mint, the rest orange), and his copy on the link cards. "Choose your bank" now lists "Enter UPI ID" and the detected UPI IDs.
- B-36 (Tarun): **Home shows pace.** Green gradient (cells and a green glow at the bottom) when the week is on pace; amber gradient when spending is ahead of an even burn, with the sentence "A bit ahead of pace." Pace compares the share of the week's money spent with the share of the week gone (from the first day the plan covers), with 10 points of slack.
- B-37 (Tarun): **End of week shows the ideal next to the actual.** A review screen gives, per category, a bar with the ideal marked and the spend filled green up to it and amber beyond it, plus a line chart of cumulative spending against an even week (the even line starts on the first covered day). It also says how much was left over and moved to savings.
- B-38 (Tarun): **The PIN keypad sits at the bottom of the screen**, within thumb reach, on setup, confirm and lock. Amount keypads elsewhere are unchanged for now.

- B-39 (Tarun): **When UPI is linked in onboarding, Trickle can read the balance, so it offers to split it.** Right after approval: "₹6,500 is in your account. How much of it do you want to save?" (slider), then "How long should it last?" (quick picks or calendar, ending on a Sunday). Both have "Not now". Saying yes makes that balance the first income and the setup continues into categories, subscriptions and the category split, so the user ends onboarding with a plan. Without UPI nothing about money is asked (B-16/B-17 still hold).
- B-40 (Tarun): **Money that arrives on a linked UPI waits in the Income tab until it is assigned.** A card "₹200 from Rahul. Came in on your UPI. Tell Trickle what it is." sits at the top of Income and a dot shows on the tab. Tapping it asks "What is this?": Income (split and optional plan), One-off money (outside the plan) or Not mine. Home no longer carries these.
- B-41: Fixed: a dark rectangle behind the Pay button (the old fade behind the sticky button) is removed.
- B-42: **A six-month demo account exists** ("Meera", first button in the side panel): 26 weeks of spends, three incomes with different date ranges (two ended or running out, one just started), four subscriptions including a yearly one, three goals, a running plan, a waiting ₹200 credit and two payments to sort.

- B-43 (Tarun): **Each tab has its own blurred colour, from the Figma gradient system.** Home is green or amber by pace (blue until there is a plan), Income blue, Spending rose, Savings teal, Insights violet (its heat cells are violet too). Pay, Add income, One-off money and Move money also get the blurred colour behind them. Cell gradients stay the white, orange and green family from the title.
- B-44 (delegated): **Logic fixes from an audit** (a scripted run of 60 random actions on every profile and on three fresh accounts, checking totals, negative amounts and NaN on every tab; nothing else broke):
  1. The Income tab now lists every income with its dates, status (running, ended), progress and weekly share. Tapping one shows it and allows **changing the end date** or **removing** it; the plan follows.
  2. "+ Add money" on Income no longer opens the old single-income flow that disagreed with the new model; it asks Income or One-off money.
  3. Editing category amounts (Budget screen, Fit to my real weeks, a limit) now also updates the full-week amount, so a new week no longer snaps back to the old numbers.
  4. If the plan was typed by hand and a first income is added, the screen says "This replaces your weekly amount" before it happens.
  5. A subscription that would take more than 60% of the weekly plan says so in the form.
  6. The first-week scaling resets cleanly at every week change; Back from "Two quick things" returns to the UPI split screens.

- B-45 (Tarun): **"This week vs last" says what is being compared.** It states the same days in both weeks ("Monday to Fri"), the sentence now names the amount ("₹180 more than last week at this point"), and each category line reads "last week, then this week, then the difference" with an arrow and words ("↑ ₹75 more", "↓ ₹25 less"). Amber for more, green for less (no red).
- B-46 (Tarun): **"When you spend" leads with its finding and always says which day, week or month it shows.** A large card gives the answer ("Today, you spend most around 12 pm", "Tue afternoon", "the 6th"). Under the Day, Week and Month buttons there is a title with the exact period and arrows to flip back through earlier days, weeks and months (stopping at the first month with data). The month view is a real calendar with weekday letters; future days are dim.
- B-47 (Tarun): **Categories can be searched and created anywhere one is chosen.** Sorting a payment, changing a payment's category, Add a spend and Pay all show a search box, the categories you have, ideas from the library, and "+ Create 'Gaming'". A new category starts at ₹0 and uses the buffer until it is given an amount (D-18); the limit is 30.
- B-48 (Tarun): **Home always shows what a box means and how much is left.** With a plan: big "Left this week" with "of ₹W" and "1 box ≈ ₹N" beside it. With no plan: "Spent this week" in big type and the box chip says what it counts.
- B-49 (Tarun): **"Make your plan" is the same as adding income.** On Home it is the main button until a plan exists. It opens the income flow (amount, how much to save, until when) and the weekly plan comes from that. The older separate plan questionnaire is no longer reached from Home or pop-ups.
- B-50 (Tarun): **Chosen categories in onboarding show a ×, unchosen show a +,** so selected and not selected are obvious.
- B-51 (Tarun): **Bill reminders and fingerprint ("Two quick things") come last in onboarding,** after the budget questions, so nothing interrupts setting up categories and a plan. Order: PIN, how to see spends, categories, plan questions, then those two, then All set.
- B-52 (Tarun): **Categories can be added or removed on the "How much for each?" screen too,** not only on the category step. A dashed "+ Add a category" opens the same search-or-create field; each row has a × to remove it.

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

## v15 (5 Oct 2026): information-architecture reset, all delegated and open to override
Triggered by repeated reviews saying screens are hard to follow with too much information. Audit: `v15_audit.md`. Spec and measured result: `v15_spec.md`. Build: `archive/session-workfiles/mockup15/`.
- V15-1 (delegated): **Density budget.** At most 25 words, one hero, 3 ₹ values, 4 taps per screen, never taller than a phone (History aside). Checked by `archive/session-workfiles/audit/density.js`. Anything added must remove something.
- V15-2 (delegated): **Three tabs for three questions.** Home (am I okay), Spending (where did it go), Money (what comes in, what is saved). Replaces the 5 tabs; open to override.
- V15-3 (delegated): **Insights becomes Patterns** inside Spending: three findings, one per screen (when you spend, what repeats, this week vs last).
- V15-4 (delegated): **Spending is three one-screen views** (Categories, History, Patterns), not one long scroll. Rings dropped; each category row has a thin gauge.
- V15-5 (delegated): **Home holds one thing.** Sentence, the grid, one caption (`₹607 left · box ≈ ₹11`), Pay, and at most one ranked "next thing" row.
- V15-6 (delegated): **Onboarding is two questions** (how to see spends, what you spend on). PIN, plan, subscriptions, goals, balance split are asked when they matter.
- V15-7 (delegated): **Making a plan is adding income** and ends there; the plan is built silently (equal split, rest is buffer).
- V15-8 (delegated): **Pay is three screens** (how much, for what, confirm). Payee, budget/savings switch and "I already paid" leave the main path.
- V15-9 (delegated): **Subscriptions are three screens** (which, how much and how often, when).
- V15-10 (delegated): **Week review is two screens** (what happened; by category on request).
- V15-11 (delegated): **Engine notes removed from screens** (mid-week split, weekly scale, replace-weekly-amount). The engine behaves the same; the explaining text is gone.
- V15-12 (delegated): **Parked, not deleted:** one-off money, move money, the incoming-credit explainer, nested rings, hot-hour calendar, month navigation.
- V15-13 (Tarun asked, Claude designed): **Insights is its own tab again** (4 tabs). Three views: When, Repeats, Vs last week; finding first, controls last. Spending keeps Categories and History.
- V15-14 (delegated): **The grid is taught three ways:** a tappable `1 box ≈ ₹N ⓘ` chip with "₹N left" beside it, a one-time "How to read it" sheet with dashed ghost boxes, and "N boxes go" on the pay confirm.
- V15-15 (Tarun asked, Claude designed): **One-off payments** are a tile in Pay > For what?, then What was it?, then Paid from? (outside the plan or savings). They never count in the week, the review or Insights.
- V15-16 (delegated): **One-off money is reachable** from Money in, plus the balance split after UPI link, edit all limits, plan-drops row.
- V15-17 (delegated): **Visual hierarchy system:** one hero, quiet underline tabs, one primary action, text-style secondary actions, controls after the finding.
- V15-18 (delegated): **Logic fixes** listed in `v15_spec.md` (monthly vs weekly figures, ended incomes, one-offs excluded from the week, pay from free savings).
- V15-19 (Tarun asked, Claude designed): **First-time tips.** One short card the first time each thing happens (first spend, unsorted payment, credit, plan, income, one-off, subscription, goal, amber, over) or each area is first opened (grid, Spending, Money, Insights, a category). Once each, one at a time, never during a flow. Panel can reset or turn them off.
- V15-20 (Tarun): **Insights is rupees only.** No Times/₹ toggle, no "N times" anywhere. Hot grids, the hero and Repeats all show amounts.


## v15.3 (6 Oct 2026): changes from the "Architecture & Strategy Document" (Tarun's upload)
New format, as that document asks: **ID | Target domain | Evidence source | Validation gate | Status.** Status is **PROPOSED** (made by Claude or a collaborator, open to override) until Tarun signs it off (**CONFIRMED**). Tarun's own decisions are CONFIRMED. Every earlier delegated entry (D-1…D-36, V15-1…V15-18) is treated as PROPOSED from now on. Evidence tags: [P] primary interviews, [S-U] cited by the document, not yet verified by us, [M] measured in the build.

| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V15-21 | Onboarding, Home | **Weekly amount first.** One extra skippable question ("How much can you spend each week?") and "Set your weekly amount" on Home. The weekly amount is one wallet; categories no longer carry limits in this mode, they classify spends after the fact. Income-based planning stays under Money. | [P] 4 of 6 interviewees have no budget; [S-U] Heath & Soll 1996, Thaler 1999 | Test C diary: share who set an amount on day 1 and still use it on day 7 | PROPOSED |
| V15-22 | Home (Tier 1) | **Home shows one number, one gauge, one button.** Removed: date line, the "On pace" sentence, the plan-health row. Kept: hero "₹N left this week", gauge, chip "1 mark = 1% ≈ ₹N", action row only when something needs doing, button. | Reviews "too much / what do I look at" [P-informal]; [M] density.js | Test A (5-second test) and density.js ≤25 words | PROPOSED |
| V15-23 | Gauge | **Fixed unit:** 100 marks always equal 100% of this week's amount, drawn in 5 blocks of 20; rupees only as a subtitle. | [S-U] Kay et al. 2016, Cleveland & McGill 1984 | Test A | PROPOSED |
| V15-24 | Gauge | **Spent marks stay as faint outlines** (ghosts) instead of going dark, so the whole week stays visible. | [S-U] Soman 2001 (rehearsal, depletion) | Test A | PROPOSED |
| V15-25 | Gauge | **One direction:** the Home gauge only empties. With no weekly amount it shows an empty outlined gauge and the sentence "Nothing logged yet", not a grid that fills with spend. Savings still fill (it is something being built). | [M] direction flip found in Part 11.3 | Test A | PROPOSED |
| V15-26 | Gauge | **Small spends roll up quietly:** spending is rounded down to whole marks, so spends under 1% wait in a buffer (shown on tap) until they add up to one mark. | [S-U] document 2.1 | P.6 probe: does it feel like cheating or like calm? | PROPOSED |
| V15-27 | Copy | **Plain words:** "marks" not boxes, "Log expense" not Pay/Add a spend, "weekly amount" not plan, "Last week" not Vs last week, "How many days should this money last?" not Until when?, "Not part of your week" not outside your plan, "spending fast" not pace. | [M] 32 of 40 questions depend on unstated context (Part 12.2) | Copy lint, then the "what does this mean?" probe | PROPOSED |
| V15-28 | Pay | **Model B switch:** panel option "Scan & pay (Model B)" changes the Home button and adds a simulated QR-scan step before "How much?". Nothing is scanned. Default stays "Log expense". | [S-U] Soman 2001, Prelec & Loewenstein 1998; H2 is unverified | Feasibility spike (can Trickle start a UPI payment?) and Test B (taps and seconds vs GPay) | PROPOSED |
| V15-29 | Process | **Two-stage decisions:** Claude's entries stay PROPOSED until Tarun confirms; every new entry carries the five columns above. | The document, root cause 5 and 6 | Review of this log before each build | PROPOSED |
| V15-30 | Process | **Freeze.** After v15.3 no new screens or features until Tests A, B and C are done (document, Part 4). The one-in-one-out rule applies to Tier 1. | Same; RESEARCH.md Part 10 | Tarun | PROPOSED |


## v16 (7 Oct 2026): one weekly allowance, categories as tags, limits only where needed
Tarun's message of 7 Oct states the spending model. His instructions are CONFIRMED (tag Tarun); everything I chose to carry them out is PROPOSED. This lifts the feature freeze V15-30 (Tarun's call). V16-1 replaces the "type a weekly amount" path of V15-21: the allowance is always worked out from money in.

| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V16-1 | Money model | **Income splits into saving and spending, and a weekly allowance is calculated** from the spending part and the number of days it has to last. Nothing else sets the allowance. | Tarun, 7 Oct | Test C diary: do students understand where the allowance came from? | CONFIRMED (Tarun) |
| V16-2 | Tracking | **Every transaction is tracked with a category.** Weekly statistic: which category took the most. Insights are shown too. | Tarun, 7 Oct | Test A and P.6: can a student say what the statistic is telling them? | CONFIRMED (Tarun) |
| V16-3 | Limits | **A limit is optional and comes later.** After a week or two, if one category has a lot of money spent, a limit can be set on that category only. If one category or one shop has too many visits, a limit can be set on it. | Tarun, 7 Oct | P.8 diary: share who set a limit and still had it a week later | CONFIRMED (Tarun) |
| V16-4 | Money model | **No pools per category. Nothing is taken from other categories.** Spending always comes from the one allowance. The category step of the cascade is deleted. | Tarun, 7 Oct | Fuzz and ledger checks (done) | CONFIRMED (Tarun) |
| V16-5 | Product | **Categories are not the main part of the app.** They are tags and a statistic. Onboarding no longer asks for them (six defaults). | Tarun, 7 Oct; RESEARCH.md Part 13.5 | First-run task in P.6 | CONFIRMED (Tarun) |
| V16-6 | Limits | **When a limit is suggested:** at least 7 days of spends; a category is at least 35% of the last 7 days and at least ₹100 and 20% of the allowance; or a shop was visited 4 or more times in 14 days. "Not now" is remembered. | Thresholds are my guess | P.8: did the suggestion feel right or naggy? | PROPOSED |
| V16-7 | Limits | **Two kinds:** an amount a week, or a number of times a week, on a category or a shop. A limit is a nudge: it shows on Home when reached, on the pay confirm before the payment, on Spending and in the week review. It never moves or blocks money. | The "no guilt" principle | P.6 probe after hitting a limit (O4 calmness) | PROPOSED |
| V16-8 | Onboarding | **Two questions:** how to see spends; how much money you get (Skip allowed). Then three short steps: how much money, how much to save, how many days it should last, with the weekly allowance shown as it forms. The linked-UPI route uses the same two last steps. | RESEARCH.md Part 12 (first run) | Time to the first "I see" in P.6 | PROPOSED |
| V16-9 | Visuals | **One picture per job.** Home: gauge of 100 marks (marks leave with a flash). Where it went: one stacked bar. Rhythm: seven weekday bars (tap one). Repeats: a 14-day tick strip per shop. Trend: running total this week against last, with the allowance line. One category: 8 weekly bars. Money in: a two-part split bar. Grids are no longer used for splits, categories or comparisons. | RESEARCH.md Part 11 (eight grammars was too many) | Test A for the gauge; P.5 second test for the rest | PROPOSED |
| V16-10 | Insights | Tabs renamed **Rhythm, Repeats, Trend**. Rupees only (V15-20 holds). | V15-20 | Copy probe | PROPOSED |
| V16-11 | Money model | **Overspending** still falls to savings once the week is used up (D-22), now without the other-categories step. The week review says so. | D-22 | P.6 probe | PROPOSED |
| V16-12 | Week review | **One screen:** verdict, "₹X of ₹Y", a stacked bar by category, "Food took the most", and a line if a limit was passed. | V16-2 | Test A style 5-second read | PROPOSED |
| V16-13 | History | Every spend shows its category; each day shows its total. | V16-2 | None needed | PROPOSED |
| V16-14 | Process | Tests A, B and C now run on v16, not v15. v15.3 stays published as the comparison. | RESEARCH.md Part 10 | Tarun | PROPOSED |


## v16.1 (7 Oct 2026, later): timing insights, awareness, a bar instead of the grid
Tarun's instructions are CONFIRMED; how I carried them out is PROPOSED. V16-17 retires the 100-mark grid (so V15-23, V15-24, V15-25, V15-26 and the gauge in V16-9 no longer apply; the rollup of V15-26 has no meaning for a continuous bar).

| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V16-15 | Insights | **Show when spending happens:** the hour (time of day) with the highest spending, the day of the week, and which part of the month (days 1–10, 11–20, 21–end). | Tarun, 7 Oct | P.6: can a student say when they spend most? | CONFIRMED (Tarun) |
| V16-16 | Insights | **Insights must be research-backed.** Each has a "Why this?" sheet that names the studies, says how strong the evidence is (Strong, Good, Indirect, Design reasoning, Untested) and what the studies do not cover. | Tarun, 7 Oct; RESEARCH.md Part 15 | Citations checked by web search on 7 Oct (list in Part 15) | CONFIRMED (Tarun); wording PROPOSED |
| V16-17 | Visuals | **The grid is retired** (Home, pay confirm, goals, everywhere). Home uses one allowance bar that drains: green is what is left, a white tick marks where an even pace would be, the bar turns amber when ahead of it. On the pay confirm the amount that leaves is hatched. Goals use the same bar, filling. | Tarun, 7 Oct ("the grid is still not intuitive"); RESEARCH.md Part 11.8 | Test A against the v15.3 grid; 5-second read | CONFIRMED (Tarun); design PROPOSED |
| V16-18 | Home | **Home shows the weekly allowance and what is left together:** "₹607 left, of your ₹1,072 weekly allowance", and "About ₹202 a day for 3 days". | Tarun, 7 Oct | Test A | CONFIRMED (Tarun) |
| V16-19 | Information design | **Relevant information is grouped.** Home: money state (number, allowance, bar, daily guide), then at most one heads-up, then at most one action row, then the button. Insights "When" holds hour, day and month together behind one chip row. Spending: statistic, one bar, list. Low-priority rows (limit suggestion, guess, allowance notes) are hidden while a heads-up is showing. | Tarun, 7 Oct | density.js | CONFIRMED (Tarun); rules PROPOSED |
| V16-20 | Awareness | **Heads-up at the user's own busy times.** One calm card on Home (and a line on the pay confirm) when: the current time is inside, or an hour before, the user's busiest 2-hour band; or today is their busiest weekday; or the current part of the month is their busiest. Needs 8 spends in 4 weeks (hour, day) or about 3 weeks (month). Thresholds: hour band at least 20% of spending (an even spread would be about 8%); weekday at least 1.25 times the average; month part at least 1.2 times the others. "Stop heads-ups" is always one tap away; Insights shows the switch. | Tarun, 7 Oct ("today is when you spend the most, be more aware"); thresholds are my guess | P.8 diary: did it feel useful or naggy? | CONFIRMED (Tarun); thresholds PROPOSED |
| V16-21 | Awareness | **Weekly guess check.** From Wednesday, if there are 3 spends this week, a low-priority row offers "Guess this week's spending": a slider, then the real number, with neutral wording. Guesses are stored (this is the O1 measure of the research plan). | RESEARCH.md Part 13.1 (O1); not an established intervention | Test C; the sheet says it is untested | PROPOSED |
| V16-22 | Awareness | **Daily guide:** "About ₹N a day for D days" under the bar (what is left divided by the days left, today included). | [P] interviewees think in ₹100 to 150 a day (RESEARCH.md Part 2) | Test A: can a student say if they can afford ₹150 today? | PROPOSED |
| V16-23 | Process | **Evidence rules:** none of the cited studies is about students and money, and the app says so; a citation is used only after its existence was checked. Cleveland & McGill (1984) and Olafsson & Pagel (2018) were not re-checked and are marked so. | RESEARCH.md Part 15.2 | Review before any claim goes in a report | PROPOSED |


## v16.2 (7 Oct 2026, later still): calmer visual system, savings as a story
Tarun: "work on visuals and the design system to make it very soothing, very satisfying, very welcoming; clearly readable; very modern and sleek and professional; improve the savings visuals." His direction is CONFIRMED; my choices are PROPOSED. System page: https://claude.ai/artifact (published as "Trickle Night Calm"), source `archive/session-workfiles/designsystem3/index.html`.

| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V16-24 | Visual system | **Night, calmer.** Neon green and orange replaced by mint #5FE3B8 (money you have), peach #F4A261 (spending), amber #EDB458 (careful), violet (suggestions). Glow lowered. All text colours at least 6:1 on the ground; smallest text 12px; body 16px. | Tarun, 7 Oct; contrast measured | Contrast table on the system page | CONFIRMED (Tarun); values PROPOSED |
| V16-25 | Type | **Plus Jakarta Sans** for numbers and headlines, Figtree for reading, tabular digits. Replaces Bricolage Grotesque. | Tarun: modern, sleek, professional | 5-second read on Home | PROPOSED |
| V16-26 | Surfaces | Glass cards and rows (white 4–6% fill, 1px line), radii 12/18/24/30, blurred tab bar, one soft shadow for cards only. | same | none | PROPOSED |
| V16-27 | Motion | Screens settle in (first nine blocks rise and fade, 45ms apart), the big number counts, the bar drains after a payment; one easing curve; off with reduced-motion. | Tarun: satisfying | none | PROPOSED |
| V16-28 | Welcome | A greeting on Home ("Good evening") and a line on the first screen ("A calmer way to see your money."). | Tarun: welcoming | none | PROPOSED |
| V16-29 | Savings | **Savings is a story.** Hero total with "up ₹320 this month"; a 12-month area line that ends at today's total; each goal is a card with its own colour, a bar with quarter notches, "₹10,500 of ₹30,000" and "Ready Feb 2028". The segmented ring is retired. Goal screen adds "₹19,500 to go, about ₹1,160 a month keeps you on track" and 12 bars of monthly additions. | Tarun; ring was unreadable (his screenshot) | Test A style read: "how close is the laptop?" | CONFIRMED (Tarun); design PROPOSED |
| V16-30 | Colour | Goals get their own hues (sky, violet, mint, sand, rose) so two goals can be told apart. | V16-29 | none | PROPOSED |


## v16.3 (7 Oct 2026, later): Trickle as a scan-and-hand-off helper
Tarun: usable on Android; if the payment fails on the wallet the user can update the record by hand, so information is still logged; open Trickle, scan the QR, pay on the wallet, it either fails or passes, Trickle passes it manually; Trickle is not reading a bank account and is just a helper. Details and checks: `docs/claude/upi_intent_helper.md`.

| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V16-31 | Tracking | **Trickle is a helper, not a reader.** Open Trickle, scan the shop QR, pay in your own UPI app, come back, say whether it went through. Trickle never reads a bank account. Android first; iOS logs by hand. A failed payment is still recorded and can be corrected by hand. | Tarun, 7 Oct; feasibility checks in `upi_intent_helper.md` | Real-phone spike, then Test B | CONFIRMED (Tarun) |
| V16-32 | Tracking | **(Superseded by V16-35 in the mockup.)** **Three states, set by the user.** Yes goes through: logged, confirmed. Not sure yet: logged and counted, "unconfirmed", Home asks again. No: not counted, kept in History as "Did not go through" with "I did pay, add it" and "Delete". | Same; the UPI app's own answer is unreliable | P.8 diary: how often "not sure"? | PROPOSED |
| V16-33 | Home | On Android in "Scan & pay" mode Home shows **Scan & pay** with **Log by hand** under it. On iOS only Log expense. The mode is a switch in the side panel, default off. | Same | Test B | PROPOSED |
| V16-34 | Tracking | **Scanned QR fills what it can:** the shop name (category remembered for that shop) and the amount if the QR has one. | UPI link spec | Spike | PROPOSED |

**Open question for Tarun:** the hard rule in `CLAUDE.md` says tracking is "direct UPI account linkage or manual entry". The helper model replaces linkage. Should "Link UPI" in onboarding, the "payments seen on your link" detection and the linked-balance split be retired in favour of Scan & pay plus Log by hand? Until he answers, both exist in the mockup.


| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V16-35 | Tracking | **No result from the UPI app is needed.** Trickle passes the merchant's link unchanged to the user's UPI app. It logs the spend and, if the payment fails, the user removes it in Trickle. This replaces the "Did it go through?" question of V16-32 once built (the mockup still has the question). | Tarun, 7 Oct; checks in `upi_intent_helper.md` section "No-result variant" | Real-phone spike: how many failed payments stay in the record? | CONFIRMED (Tarun) |

**Built 7 Oct (V16-35):** the mockup now follows the no-result flow. Scan, optional amount, category, "Open your UPI app", a simulated UPI app, back to Trickle. The spend is logged at the hand-off. The result screen says "Added to your week", shows what is left of the allowance, and offers "Didn't pay? Remove", which puts the money back. "Where it came from" now appears only when savings paid part of it ("₹293 came from your savings"). By-hand logging just adds the spend and never says "Paid"; the simulated bank outcomes (decline, slow, low balance) were removed from the side panel. V16-33 stands (Scan & pay with Log by hand; iOS without scan).

| V16-36 | Home, Pay | **Log expense opens a QR scanner first** (a simulation in the mockup). Then the amount (only if the QR has none), then the friction screens (category, then a confirm with the bar, "left after", how much of today's share it is, heads-up and limit notes), then **Open UPI app**, the user's UPI app, back to Trickle, and the result screen with the stats. "No QR? Add by hand" is a link on the scanner. On iOS Log expense goes straight to by hand. Replaces the separate "Scan & pay" and "Log by hand" buttons of V16-33. | Tarun, 7 Oct | Test B (taps and seconds against paying directly) | CONFIRMED (Tarun) |

## v16.4 (8 Oct 2026): local-only data, a seamless scan flow, how shops get tagged
| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V16-37 | Privacy | **All data stays on the device.** Nothing about spends, shops or money is sent anywhere. Aim: no account, no sync, no analytics. | Tarun, 8 Oct | Manifest check at build: no INTERNET permission if no server is used | CONFIRMED (Tarun) |
| V16-38 | Pay flow | **The paying flow must be as seamless as possible, and friction screens appear dynamically after the scan.** Built as: a scan goes to at most two screens before UPI. The amount screen appears only if the QR has no amount. Then one combined screen: category chips (suggested one preselected), the bar with what leaves, left after, today's share, and heads-up or limit notes only when they apply. One tap on "Open UPI app". A known shop with a fixed amount is one screen. | Tarun, 8 Oct | Test B: taps and seconds against paying directly | CONFIRMED (Tarun); screen rules PROPOSED |
| V16-39 | Tagging | **Tag a shop without asking the user.** Tarun suggested a server holding shop and tag pairs. Proposed instead, in this order, all on the device: what the user picked for this shop before; words in the shop name; the merchant code (`mc`) in the QR mapped to a category. If none fits the user picks once and it is remembered. A server is not needed for this, and a lookup server would learn which shops each user visits (see `upi_intent_helper.md`). | Tarun's idea; privacy reasoning; how many real QR codes carry `mc` is not yet known | Spike: share of scanned QRs that tag themselves | OPEN: Tarun to choose |

## v16.5 (8 Oct 2026): apps that make their own payment, a quick-log widget, subscriptions with an end
Tarun reports (8 Oct) that the hand-off spike works for merchants. The numbers are not yet in the repo (`docs/claude/upi_spike_report.md` is still to be written). Tarun's three ideas below are built in the mockup for review.

| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V16-40 | Capture | **Payments made inside other apps (Zomato, Swiggy, shopping apps) are not captured automatically.** Trickle is not in their payment path, they pick the UPI app themselves, and the options for catching them are risky or unverified (see `upi_intent_helper.md`). They are logged by hand, as fast as possible (V16-41). Two experiments are listed in the spike spec but nothing depends on them. | Tarun's question, 8 Oct; searches of PayU, PhonePe, Paytm, Razorpay and Juspay docs | Spike experiments E1 and E2 | OPEN: Tarun to confirm; E2 (reading notifications) needs his yes or no |
| V16-41 | Quick log | **A home-screen widget for fast logging.** Shows what is left of the allowance, a Scan button, up to three one-tap chips for the user's own repeat spends (shop and usual amount), and a plus for anything else. A chip logs at once with an Undo. A "Hide amounts" switch protects the screen from onlookers. | Tarun, 8 Oct | Test B variant: seconds to log a repeat spend | PROPOSED (Tarun's idea; mockup preview built) |
| V16-42 | Subscriptions | **A subscription can have an end.** When adding or editing: keeps going; **I plan to cancel** (a cancel-by date, with a reminder); **free trial** (an end date, nothing set aside until then, first payment on that date); **fixed term** (valid until a date, payments stop after it). The detail view shows the next payment, valid-until and cancel-by dates; **I have cancelled it** moves it to a Cancelled list with "about ₹X a month back". The list shows the monthly and yearly total. Home reminds within 3 days of a date. Trickle only reminds; the user cancels in the other app or in UPI autopay. | Tarun, 8 Oct | P.8 diary: did a reminder cause a cancellation? | PROPOSED (Tarun's idea; built for review) |
Bug fixed with this change: adding or editing a subscription (or income) reset this week's spending, because the allowance refilled. The allowance now keeps what this week's spends took out.

| V16-43 | Widget | **The widget never opens Trickle.** It shows the amount left and its reduction as you log, lets you assign a category in one tap, enter an amount (presets ₹10, 20, 50, 100 and a keypad) and log it, with an Undo. A tap on a repeat-spend chip logs it at once. Scan is not in the widget (it needs the camera, so it lives in the app). Replaces the Scan, plus and "tap to open" parts of V16-41. | Tarun, 8 Oct | Test B variant: seconds to log a repeat spend and a new one from the home screen | CONFIRMED (Tarun); layout PROPOSED |

## v17 (8 Oct 2026): the first reviews after user testing
Tarun, 8 Oct, verbatim: "the reviews I got from user testing are the information architecture [is] very bad; there are too many tabs; work on the UX more; the interface looks very AI generated; the sentences are too complex, like even pace can just be recommended." Number of testers, who they were, which build they saw, and what they were asked to do were not stated (to ask). v16 stays as the build they saw; v17 (`archive/session-workfiles/mockup17/`) is the response. All of the changes below are PROPOSED until Tarun confirms; "Recommended" for the tick label is his example.

| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V17-1 | Information architecture | **Three tabs: Home, Spending, Money.** Each tab is a short list that opens detail screens one level down. No tabs inside tabs. | Reviews: "information architecture very bad", "too many tabs" | Tree test (RESEARCH.md Part 16.4): at least 80% find each of 12 items | PROPOSED |
| V17-2 | Information architecture | **Where things live.** Home: what is left, one row, Log expense. Spending: where it went this week, then **Patterns** (busiest time, most visited, this week and last; the old Insights tab) and **Records** (all spends, limits). Money: money in, savings, subscriptions, one-off money. | Same | Same | PROPOSED |
| V17-3 | Look | **Flat and plain.** No gradients, glow, glass, blur, blobs or entrance animation; one typeface (Public Sans); one accent; flat bars and rows instead of cards with shadows. | Review: "looks very AI generated"; my own list of what read as generated in v16 (RESEARCH.md Part 16.3) | 5-second look test with the question "Who made this?" is not scientific; ask "does it feel like a real app?" and compare v16 and v17 | PROPOSED |
| V17-4 | Copy | **Short and plain.** One idea per sentence, 8 words or fewer, no coined terms. The tick on the bar says **Recommended** (Tarun's example). Heads-ups are one plain row, not a card. | Review: "sentences are too complex" | Copy lint (words per sentence, banned words) and the "what does this mean?" probe | Tarun's example CONFIRMED; rules PROPOSED |
| V17-5 | UX | **Fewer things per screen.** Home shows at most one row. Patterns that lack data say what is needed, not an empty chart. | Review: "work on the UX more" (no detail given) | Ask the testers which screens | PROPOSED |
| V17-6 | Process | **Test the structure before adding anything.** Tree test, first-click test and the 5-second test on v17, with the same testers if possible. No new features until then. | RESEARCH.md Part 10 | Tarun | PROPOSED |

### V17-7, V17-8 (8 Oct, from Tarun's review of v17)
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-7 | Overspend colour | Tarun: "no color indicator for overspending". Home now has three states: green on track, yellow below the Recommended line, red nothing left or savings used. Limits turn yellow when near and red when reached. The number and a plain sentence say the same thing (colour is never the only signal). | Five-second test: can a student say whether they are over? Check colour-blind legibility. | PROPOSED |
| V17-8 | Wording: "Money in" | Tarun: "hard to understand". Renamed to "Pocket money & income" (hub, title) and "Income" (tab, flows). | Tree test: where would you add your pocket money? | PROPOSED |

### V17-9 to V17-16 (9 Oct, from the second round of user feedback). All PROPOSED until Tarun confirms.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-9 | Insights on Home | Feedback: insights as swipeable cards on Home, tap shows the graph; every recommendation and insight on Home. Cards: urgent item, limit suggestion, heads-up, time of day, day, month, repeats, this week vs last. Spending no longer has a Patterns section. | First-click test: where would you look to see when you spend most? | PROPOSED |
| V17-10 | Limit suggestion | Feedback: "set limit for category must be a recommendation on home page". Now a Home card ("Limit for Food?") that opens the limit sheet. Thresholds are still mine (RESEARCH.md 15.4). | Do testers accept or dismiss it? | PROPOSED |
| V17-11 | Spending tab | Categories compressed to the top 4 (all on tap); Recent spends shown on the tab; Subscriptions and Limits are rows here. | Tree test: where do you cancel a subscription? | PROPOSED |
| V17-12 | Tabs | Money tab removed. Tabs are Home, Spending, Savings. Subscriptions moved to Spending; one-off money is no longer a row (a link inside Add money); income is a row inside Savings. | Tree test on 12 items | PROPOSED |
| V17-13 | Add money | A button next to Log expense on Home. Opens the income flow: amount, how much to save, for how long (or just add it). | Taps to add money vs v16 | PROPOSED |
| V17-14 | Widget | Two actions: Spend (amount, category) and Money (amount, save %, duration). Never opens the app. Adding a running income can replace the weekly amount; the widget says so first. | Widget walkthrough with 3 testers | PROPOSED |
| V17-15 | Month insight | Calendar of the month, days shaded by spend, tap a day for its spends, month back and forward. Replaces the days 1-10 / 11-20 / 21-end bars. | 5-second test: which day did you spend most? | PROPOSED |
| V17-16 | Chart fix | Time-of-day and weekday charts rebuilt: a baseline, an average line, labels aligned to the bars, a "Try this" line. Category screen says "3 visits", not "3×". | Can testers read the busiest hour? | PROPOSED |

### V17-17 (9 Oct, Tarun's own words, CONFIRMED): UPI account linking is retired
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-17 | Tracking source | Tarun: "remove the 200 came in from Rahul, how will Trickle even know anything about transactions if I'm not going to link it with UPI anymore, update onboarding also". This closes the open question about "Link UPI" (V16-31/35). Trickle now learns about spends only from what the user does: scan a shop QR and hand off, or add by hand. Removed from the mockup: the "Link UPI" onboarding step and bank/verify screens, credit detection ("came in from Rahul"), simulated payments seen on a link, linked-balance split, link-lost state, and "Account & linking" in Settings (now "How spends are added"). Onboarding is: title, optional PIN, "How much money do you get?", done. Side effect: money that others send you is never seen; the user adds it with Add money. | Onboarding walkthrough: does a new user reach Home in under a minute without a link step? | CONFIRMED (Tarun) |

### V17-18 (9 Oct): remove the 30 "looks vibecoded" tells; make a reusable skill. Source: a reel Tarun shared (not research). PROPOSED.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-18 | Visual identity | Tarun asked that all 30 tells be followed and a skill be made for future apps. Done in the app: no gradients, shadows, blur, animation or glow; radii 6 to 8 px; one muted green accent plus a warm terracotta for spending; state colours amber and red used with words; categories are tints of one slate hue; no purple; no logo cells (plain wordmark); no em dashes or emoji in the app; Privacy and Terms added in Settings (Terms is a labelled draft). Skill: `.claude/skills/human-interfaces/` (SKILL.md plus `scripts/audit.js`). Automated scan of 66 states: no tells found. Not checked by the script: icon use (the app uses words), three-card layouts, fake content (none), skeleton loaders (not applicable, no loading), and whether it looks human to a person. | Show testers v17.3 next to v16.4 and ask "who made this, a person or a program?" (one open question, no leading) | PARTLY ADOPTED. Tarun, 9 Oct: "the colours and corners were too harsh, keep the rest". The tells stay removed; corners are now 10 to 12 px and the palette is softer (sage green, dusty terracotta, soft amber and coral). The skill stays. |

### V17-19 to V17-21 (9 Oct, from Tarun). PROPOSED.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-19 | Visual softening | Tarun: "the colours and corners were too harsh, keep the rest". Radii 10 to 12 px; softer palette. The skill's rule 19 and 29 now say so. | Show next to v17.2 and ask which is easier to look at. | PROPOSED |
| V17-20 | Savings that need action | Tarun: nudge a new user to create a goal; say how the saved money gets into a goal, or suggest an emergency fund if there is none; newly saved money that is not in a goal is the only savings figure Home shows, because it needs action. Home shows a first card ("₹1,000 is saved. Give it a job."); Savings tab shows a "Needs a job" card; adding a goal immediately offers to put the free money in; with no goal the suggestion is an emergency fund of about 3 months of spending (13 weeks of the weekly amount). The 3 months is my number. | Do new testers create a goal within a week? | PROPOSED |
| V17-21 | Limit hint on Spending | Tarun: show "set a limit" on the Spending list, with "Recommended" under the category name. Rows now say "Recommended: set a limit" under the name (tap opens the limit sheet) for categories that meet the suggestion rule, and for the top category when it has 25% or more of the week and no limit. Hidden after "Not now". 25% is mine. | Does tapping it set a limit? | PROPOSED |

### V17-22 (9 Oct, Tarun): roll back the visual language, remove only glows and shadows. PROPOSED (his words, so the instruction is CONFIRMED).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-22 | Visual language | Tarun: "roll back the visual language, just remove glows and shadows". The look is v17.2 again (original colours, gradients, corners, title screen). The only visual change is that glows and shadows are removed. Kept: all features from v17.4 (savings that need action, "Recommended: set a limit", Privacy and Terms in Settings). This overrides V17-18 and V17-19 for visuals. The human-interfaces skill stays as a reference, and its audit will now report gradients, colours and radii that Tarun chose to keep. | None needed for the instruction. | CONFIRMED (Tarun) |

### V17-23 (9 Oct, Tarun): remove the human-interfaces skill. CONFIRMED.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-23 | Tooling | Tarun: "remove the skill, it's bad, I don't like it". Deleted `.claude/skills/human-interfaces/` and `mockup17/tests/antiai_states.js`. V17-18 no longer has a skill behind it. Recoverable from git commit 825d5aa if wanted. | None | CONFIRMED (Tarun) |

### V17-24 (9 Oct, Tarun): a goal needs no amount and no date. CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-24 | Goals | Tarun: "the goal doesn't need to have a set limit like emergency fund, even duration is optional". The Add a goal sheet now has "No set amount" (default for Emergency fund) or "Set an amount"; the date is optional ("No date" is the default). A goal with no amount shows what is saved, no bar and no percent, and never counts as reached. The emergency fund suggestion of about 3 months of spending is shown as a hint, not set for the user. Money can still be added and moved. | Do testers create an emergency fund without being asked for an amount? | CONFIRMED (Tarun) |

### V17-25 to V17-27 (9 Oct, from Tarun). CONFIRMED (his instructions); wording of the nudge is mine.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-25 | Goal name and target | Tarun: "the goal needs an editable name" and "let me edit the target later". The Add a goal sheet has a name field (the chips fill it in); the Edit sheet changes name, amount (or none) and date, and still has Mark done and Delete. A goal needs a name. | Can a tester rename a goal and set its amount later? | CONFIRMED (Tarun) |
| V17-26 | Custom categories on the pay screen | Tarun: "what happened to custom categories in payment". They were lost when the scan flow replaced the old pay flow. The pay screen now has "+ New" (or "More or new" with many categories), which opens a search where a new name can be created and is selected at once. | Can a tester pay to a category they just created without leaving the screen? | CONFIRMED (Tarun) |
| V17-27 | First nudge to add an amount | Tarun: nudge a new user to add an amount; they should understand that the money they have can be split into spending and saving, and they choose how long it lasts. Home for a user with no money added shows "Add the money you have. Split it into spending and saving. Then choose how long it should last." with an Add money button; the first question repeats this in one line. The three steps already existed (amount, save share, how long). | Five-second test: can a tester say what Add money will do? | PROPOSED |

### V17-28 to V17-30 (9 Oct, from Tarun)
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-28 | Move money | Tarun: the button must say "Move money"; moving to categories no longer makes sense; savings can be moved to spend with a timeline (this week, or pick a date) or to another goal. The goal button is "Move money". The flow offers "Spend" (this week, or spread to a date, with a calendar) or "Another goal". Moving to spend this week adds the amount to this week's allowance. Spreading to a date releases an equal share each week until that date; the rest waits and the Savings tab says so. Equal weekly shares are my choice. | Do testers understand "Spread to a date"? | CONFIRMED (Tarun) for the flow; the weekly-share rule is PROPOSED |
| V17-29 | Goal reached | Tarun: once a target is reached, nudge "buy your item or increase the goal target". Home shows a first card ("Phone: you saved ₹5,000. Buy your item, or raise the goal."); the goal screen says so and offers "I bought it" and "Raise the goal". | Do testers choose one of the two? | CONFIRMED (Tarun) |
| V17-30 | Set a target on a goal | Tarun's note "show set a limit on goal edit": I read this as the goal's target (he called it a limit before). A goal with no amount shows a "Set a target (optional)" row that opens Edit with the amount ready. Tarun, 10 Oct: "yes the target I meant". | None | CONFIRMED (Tarun) |

### V17-31 (10 Oct, Tarun): type the save and spend amounts. CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-31 | Split input | Tarun: "I should be able to tap and manually input the number" on "How much will you save?". The save and spend amounts (underlined) open a keypad; the slider and percentage follow. An amount above the total is capped to the total. The exact typed number is kept (the slider alone still rounds to ₹10). | Can a tester enter exactly ₹3,700? | CONFIRMED (Tarun) |

### V17-32 (10 Oct, Tarun): Home layout. CONFIRMED (his words); the one-tap defaults are mine.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-32 | Home layout and limits | Tarun: move Log expense lower; in the space below the insight cards show the recommended limit cards and quick limits. Log expense and Add money are pinned just above the tab bar. Limit recommendations left the card carousel and now sit under it as cards with "Set <limit>" (one tap) and "Change", then "Quick limits" chips (a category and a suggested weekly amount, one tap to set). The suggested amounts come from the last 14 days (existing rule, mine). | Do testers set a limit from Home without opening Spending? | CONFIRMED (Tarun) for the layout; amounts PROPOSED |

### V17-33 (10 Oct, Tarun): quick save/spend slider in the widget. CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-33 | Widget | Tarun: "add a quick slider for saving and spending" in the widget. The widget's Add money replaces the 0/10/20/30/50% chips with a two-colour bar and a slider (0 to 100%, steps of 5) showing "Save 60% ₹3,000 · Spend ₹2,000" live. | Can a tester split ₹5,000 in the widget in under 10 seconds? | CONFIRMED (Tarun) |

### V17-34 (10 Oct, Tarun): limit cards on Home replace quick limits. CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-34 | Home limits | Tarun: "instead of quick limits literally just have cards with a title Recommended, Food: set a limit, with the monthly and weekly spend and the percentage". The quick-limit chips are gone. Each card says "Recommended / Food: set a limit" and shows this week's and this month's (30 days) spend with the share of all spending, then "Set a limit" (opens the limit sheet) and "Not now". Up to 3 categories, the ones the suggestion rule flags first, then by spend; a shop with many visits gets a card with a one-tap limit. | Does the share make people choose a limit? | CONFIRMED (Tarun) |

### V17-35 (10 Oct, Tarun): limit cards swipe. CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-35 | Home limits | Tarun: "instead of a scrollable field make it card type swipes". The Recommended limit cards on Home are now a second swipeable row with dots, like the insight cards, so Home no longer scrolls down through a stack of cards. Up to 4 category cards plus one shop card. | Do testers find the next card by swiping? | CONFIRMED (Tarun) |

### V17-36 to V17-38 (10 Oct, Tarun). CONFIRMED (his words); counts and wording are mine.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-36 | Limit cards: visits and close | Tarun: show the visit (times) limit as well, 2 to 3 recommendations at most, and a close so a recommendation can be removed. Home now shows at most 3 limit cards, alternating a spending card (category) and a visits card (a place visited 3 or more times in 30 days, with this week, this month and the share of your spends). Each card has a × that removes it; removing does not bring in a replacement. | Do testers use the × instead of ignoring? | CONFIRMED (Tarun) |
| V17-37 | Goal reached card | Tarun (draft): "show the goal reached card on home bigger". A reached goal is a large full-width card above the insights: name, amount, a full bar, "I bought it" and "Raise the goal". | Do testers choose one of the two? | CONFIRMED (Tarun) |
| V17-38 | "I bought it" | Marks the goal done and the money is treated as spent on the item (it does not return to free savings, unlike "Mark done"). Tarun, 10 Oct: "yes, bought goals should leave a spend record". The record shows in Recent and History as "Bought" with the goal name and amount, and does not count toward the week's allowance. | None | CONFIRMED (Tarun) |

### V17-39, V17-40 (10 Oct, Tarun). CONFIRMED (his words); the sizes are mine.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-39 | Spacing between blocks | Tarun: improve the spacing between two different blocks of information, like the past transactions and the category-wise spending, throughout the app. Section headings now have 30 to 34 px above and 10 px below (were 14 to 22 and 6 to 8); Recent has a divider line and 38 px above it; cards on Home are 26 px apart. | Does a tester see the blocks as separate? | CONFIRMED (Tarun) |
| V17-40 | One main button | Tarun: Log expense is the main button but another button is the same colour, so it is hard to tell what to do. Only one filled green button per screen. Buttons inside cards ("Set a limit", "I bought it") are now a dark fill with green text and a thin line; Log expense stays filled green. | First-click: which button do testers tap to log a spend? | CONFIRMED (Tarun) |

### V17-41, V17-42 (10 Oct, Tarun). CONFIRMED (his words); the exact greys are mine.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-41 | Main buttons on the nav bar | Tarun: make Log expense and Add money snap to the lower navigation bar, just above it. On Home they are a fixed bar on top of the tab bar, always visible, with a thin line above. Content scrolls behind it and the page has room at the bottom so nothing is hidden. | First-click on Home | CONFIRMED (Tarun) |
| V17-42 | Visual hierarchy with three greys | Tarun: cards a lighter grey so they group together; past transactions a different grey so it is clear they are different data; the graphs too; "make visual hierarchy better". Three surfaces: lighter grey for things to act on (insight, limit, savings and goal cards); a dark neutral grey for records (Recent, History); a blue-grey for graphs and category totals (charts, calendar, the category list on Spending). Greys: #272E37, #171C21, #1A2430. | Do testers say which blocks are "mine to act on" versus "history"? | CONFIRMED (Tarun) |

### V17-43, V17-44 (10 Oct, Tarun). CONFIRMED (his words); wording is mine.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-43 | Home hero widget | Tarun: make the top of Home the hero widget with more emphasis and a better design; he understands "₹184 of ₹704"; asked what "recommended" means, that the end of the bar be read as the full budget, and for the days line to be plain. The top of Home is one raised card: "Left this week", the amount at 68 px with "of ₹704", a status line (On track / Spending a bit fast / Nothing left this week), a bar with ₹0 at the left and "₹704 = full budget" at the right, the tick labelled with its amount ("Recommended ₹348", the amount to have left by today), then two facts: "3 days to go this week" and "₹61 a day to stay within budget". The border turns amber or red with the state. The ? sheet explains the three parts in plain words. | Five-second test: what does the line mean? | CONFIRMED (Tarun) |
| V17-44 | Savings and goal cards | Tarun (draft): make the savings and goal cards use the same lighter grey. Goal rows and the savings cards use the lighter grey of other cards. | Visual check | CONFIRMED (Tarun) |

### V17-45 to V17-51 (10 Oct, Tarun). CONFIRMED (his words); wording is mine.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-45 | Piggy banks | Tarun: saved money that is not in a goal should be "put in a piggy bank"; saving categories are like piggy banks, easy to understand. User-facing words: a goal is a piggy bank ("Add a piggy bank", "Which piggy bank?", "Piggy bank full"). The emergency fund is the first piggy bank suggested. | Do testers understand "piggy bank" without help? | CONFIRMED (Tarun) |
| V17-46 | Savings picture | Tarun: "what is the saving graph even showing, maybe do something with the piggy bank analogy". The months line chart is replaced by a piggy bank that fills to how full your piggy banks are (against their targets, or against an emergency fund when none has a target). Each piggy bank row has a small piggy that fills the same way. | Can testers say what the piggy shows? | CONFIRMED (Tarun) |
| V17-47 | Hero card | Tarun: the hero card needs better visuals; "Left this week" at the top is misleading; show "this week" and today's date; show the busy-time heads-up in the hero. The hero says "This week · Sat, 10 Oct", the amount, "left of ₹1,072", the bar, the facts, and a Heads-up row ("4–6 pm is when you spend most. ₹607 left for 2 days.") that opens the graph. The heads-up no longer repeats as a card. | Five-second test on the hero | CONFIRMED (Tarun) |
| V17-48 | Heads-up wording | Tarun asked what "about ₹36 a day left" means. The heads-up now says how much is left for how many days: "₹607 left for 2 days." | None | CONFIRMED (Tarun) |
| V17-49 | Calendar day list | Tarun: in the calendar view, list that day's spending with its category. Tapping a day shows each spend as a row with its category and time. | None | CONFIRMED (Tarun) |
| V17-50 | Way into insights | Tarun: the insight cards need a navigation icon so he can go straight to the insights tab from home. A heading "Insights" with an "All insights ›" button opens one Insights screen (when, repeats, trend). It is a screen, not a fourth tab (V17-1 keeps three tabs). | Do testers find all insights from Home? | CONFIRMED (Tarun) for the entry; the choice not to add a tab is mine |
| V17-51 | Title | Tarun: title it "Past transactions". The Recent block and the history screen are called Past transactions. | None | CONFIRMED (Tarun) |

### V17-52, V17-53 (10 Oct, Tarun) and what the hero card borrows from other apps
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-52 | Hero card, second pass | Tarun: do not write "full budget"; "this week" at the top is unnecessary; "On track" is a great indicator but needs a better place (look at other apps); research and make the card as good as possible. Now: today's date sits above the card next to Settings; the card opens with a status pill (green On track, amber Spending fast, red Budget used) on the left and the ? on the right; then the amount, "left of ₹1,072 this week", a bar labelled ₹0 and ₹1,072 only, the recommended marker with its amount, "2 days to go" and "₹304 a day to stay within budget", and the heads-up row. Research notes (web search, 10 Oct; descriptions of apps, not usability studies): Monzo shows "left to spend" as the headline; Copilot Money compares a dotted ideal pace line with actual spending and shows "Free to Spend"; PocketGuard's Pace labels on track / slower / moving too fast; Spending Pulse uses four labels (Safe, Close to limit, At the limit, Overspent); SpotFunds and Margin lead with a "safe to spend today" figure. None of these sources tests wording or placement, so the choices here are untested. | Five-second test on the card; compare "On track" pill against no pill | CONFIRMED (Tarun) for the changes; design choices PROPOSED |
| V17-53 | Savings total | Tarun: instead of "3 piggy banks" just show the total saved money. The piggy panel shows "Total saved ₹3,000" with the piggy filling; the duplicate big number above it is gone. | None | CONFIRMED (Tarun) |

### V17-54 (10 Oct, Tarun): no gradient on the hero, no piggy picture. CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-54 | Hero and savings visuals | Tarun: remove the gradient (on the hero card); remove the piggy bank main viz; "don't show piggy banks, it's an analogy that is used". The hero card is a flat grey. The piggy drawings (big one and the small ones on each row) are gone; "piggy bank" stays as the word for a goal. Savings shows a plain "Total saved ₹3,000, up ₹340 this month" card. Supersedes the picture part of V17-46; the wording of V17-45 stays. | None | CONFIRMED (Tarun) |

### V17-55, V17-56 (10 Oct, Tarun)
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-55 | Name for a savings goal | Tarun: "piggy banks sound a little childish, make it savings but something easy to understand". Replaces "piggy bank" (V17-45) with "savings pot" everywhere in the app ("Add a savings pot", "Put it in a savings pot", "Savings pot full"). "Pot" is my choice; Monzo uses it for savings; the plain alternative is "savings goal", but an emergency fund has no goal amount. Tarun decides. | Ask three testers what "savings pot" means before they see an explanation | PROPOSED (word) |
| V17-56 | Heads-up timing | Tarun: why does it say 4 to 6 pm at 3 pm, and on Friday it has to say Friday is when you spend a lot. The hour heads-up now says when it is ahead ("In about 1 hour, 8–10 pm is when you spend most.") and plain when it is now. The day heads-up shows all day on your biggest day ("Tuesdays are your biggest day."), at the same time as the hour one. Up to two lines in the hero, with "₹607 left for 6 days." on the last. | Does a tester act on it? | CONFIRMED (Tarun) |

### V17-57, V17-58 (10 Oct, Tarun). CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-57 | Word for a savings target | Tarun (draft): "make savings pot just savings goal". Resolves V17-55: the word is "savings goal" everywhere ("Add a savings goal", "Put it in a savings goal"). | None | CONFIRMED (Tarun) |
| V17-58 | Pocket money and income on Home | Tarun: move pocket money and income to Home, it does not make sense in Savings; on Savings just show saved this month. A "Pocket money & income" row sits at the bottom of Home content (it opens the list of incomes, back goes to Home). Savings shows "Saved this month ₹340" as the main figure with "₹3,000 saved in total" in small type (my reading of "just show saved this month"; he may want the total gone). | Where would a tester look to change their pocket money? | CONFIRMED (Tarun) for the move; the small total line is PROPOSED |

### V17-59, V17-60 (10 Oct, Tarun). CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-59 | Savings top card | Tarun: "show total saving and below it saved this month" (replaces the "just saved this month" reading in V17-58). The card shows "Total saved ₹23,600" and, below a divider, "Saved this month ₹3,020". | None | CONFIRMED (Tarun) |
| V17-60 | Home-screen widget | Tarun: the widget shows the hero card, smaller, with a quick Add money and Log expense. The widget is a compact hero: status pill, amount and "left of", a bar with the pace marker, "3 days to go · ₹202 a day", then two buttons: Log expense (opens the in-widget amount and category keypad) and Add money (amount, save slider, how long). The quick place chips of V16-41 are no longer on the widget. It still never opens Trickle. | Walk three testers through logging a spend from the widget | CONFIRMED (Tarun) |

### V17-61, V17-62 (10 Oct, Tarun). CONFIRMED (his words).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-61 | Widget: place chips and Other | Tarun (draft): add the place chips back under the buttons. Tarun: the categories are not enough, the widget will mostly be used for e-commerce and food delivery, so it needs an Other that brings a list or lets you type. The widget shows two quick place chips under Log expense and Add money. In Log expense, "What for" shows the top 5 categories and "Other ›": a box to type a name (Zomato, Amazon, Rent) with matching categories below it, and "+ Use “Zomato”" creates it and selects it. | Can a tester log a Zomato order from the widget in under 15 seconds? | CONFIRMED (Tarun) |
| V17-62 | "Recommended ... by end of day" | Tarun: "recommended 228 by EOD". The marker on the bar is the amount to have left at the end of today, labelled "Recommended ₹306 by end of day". The label is placed so it never leaves the card. The ? sheet says the same. | Five-second test | CONFIRMED (Tarun) |

### V17-63 (10 Oct, Tarun): the main buttons snap to the navigation on every tab. CONFIRMED (his words); scope is my reading.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-63 | Log expense and Add money placement | Tarun: "again put the CTA below, snapped to navigation". Home already had them flush on the tab bar (checked at 390x844, 430x760 and desktop). The bar now also shows on Spending and Savings, so the main actions are on all three tabs. Hidden on detail screens, flows and sheets. | First-click on each tab | CONFIRMED (Tarun) for the placement; "all three tabs" is my reading |

### V17-64 (10 Oct, Tarun): the biggest review was "not familiar" and "things repeat everywhere, a waste of space". PROPOSED responses; Tarun chooses.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V17-64 | Repetition and familiarity | Review quoted by Tarun, 10 Oct. Audit of the mockup (Fri 2 Oct state, 844 px phone): the two full-width buttons plus the tab bar take 161 px, 19% of the screen, and the same two buttons repeat on all three tabs; the hero heads-up and the Time of day and Day insight cards said the same thing; "Recommended: set a limit" appears on Home and on Spending; the savings total appeared in the Savings card and again in a line under it; "needs a savings goal" appears on Home and Savings. Changes now: insight cards the heads-up already covers are hidden; the repeated savings line is removed. Option added behind a switch in the side panel ("Bottom actions"): one floating Log expense button, with Add money moved into the hero card, which cuts the bottom chrome to the tab bar alone (84 px, 10%). The default stays the two full-width buttons because Tarun asked for them twice. "Not familiar" is not yet understood: which apps did the reviewer expect it to resemble? Research note (web search, inconclusive on placement): Google Pay India used a labelled floating scan button in a 2021 critique; PhonePe's help page puts the QR icon at the top. | Ask the reviewer what they compared it to; first-click test on bar against floating button | PROPOSED |

### V18-1…V18-8 (10 Oct): v18 visual and structure pass. Research and caveats: `docs/claude/v18_research.md`.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V18-1 | Make v18 (fork of v17 in `mockup18/`) | Tarun, 10 Oct | none | CONFIRMED (Tarun) |
| V18-2 | One split bar instead of slider + preview bar | Tarun, 10 Oct | Test B | CONFIRMED (Tarun) |
| V18-3 | Split and duration on one screen with dropdowns | Tarun, 10 Oct | Test B | CONFIRMED (Tarun) |
| V18-4 | Floating Log expense is the default; bar kept as option in panel | Gemini critique + my chrome audit (V17-64); no student evidence | Layout test | PROPOSED |
| V18-5 | Icon + label tab bar, settings gear in header | Common pattern in teardowns; not tested | Test A | PROPOSED |
| V18-6 | Indigo for savings, mint only for actions/good state | Gemini critique; my choice | Colour review with Tarun | PROPOSED |
| V18-7 | Manrope font, tonal borders, micro share bars on categories | My choice | Tarun review | PROPOSED |
| V18-8 | Stacked pill for categories, dismissible chips | Not built | Tarun decides | PROPOSED |

### V19-1…V19-8 (10 Oct): v19 style revamp from Tarun's three reference images (`archive/session-workfiles/mockup19/`, fork of v18). Structure unchanged except where noted.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V19-1 | Revamp the app style from the three references | Tarun, 10 Oct | none | CONFIRMED (Tarun) |
| V19-2 | Home hero is a softer, lighter pastel gradient with solid near-black text (changed after Tarun said it was not readable).| Reference 1; my reading of it. Gradients were rejected in v17 ("remove the gradient"), so this may be overridden | Tarun review | PROPOSED |
| V19-3 | Log expense and Add money are two equal buttons snapped just above the floating tab bar on all three tabs, aligned to the content edges (Tarun, 10 Oct: "snap them and align them properly"). The tiles were dropped | Tarun, 10 Oct | Layout test | CONFIRMED (Tarun) |
| V19-4 | Tab bar is a floating pill with circle icons, active tab a lime circle with its label | Reference 2 | Test A | PROPOSED |
| V19-5 | Spending uses a pastel pill-segment donut with a two-column legend instead of the stacked bar | Reference 3 | Test A | PROPOSED |
| V19-6 | Accent is soft lime (#D5F26E); category colours are a pastel set; spend colour is peach, savings lavender | References 1 and 2 | Colour review with Tarun; contrast not yet checked | PROPOSED |
| V19-7 | Near-black cards with 20 to 28 px corners, week/month scope as a segmented pill | References 1 and 2 | Tarun review | PROPOSED |
| V19-8 | Not done: blue highlight card (reference 2), pastel columns for the time-of-day chart, greeting line | Time | Tarun decides | PROPOSED |

### V19-9 (10 Oct, Tarun): the gradients are dropped, v17 flat language comes back, kept modern.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V19-9 | Remove the pastel gradient hero and the gradients inside it; back to v17 flat colours (mint accent, orange spend, indigo savings, v17 category palette) with the v19 structure kept (floating icon tab bar, snapped buttons, donut, segmented scope, 20 to 24 px corners) | Tarun, 10 Oct: "the white gradient and other gradient inside is not working, fall back to v17 language just make it modern and good looking" | Tarun review | CONFIRMED (Tarun) for the direction; the exact look is mine, PROPOSED. Supersedes V19-2 and V19-6 |

### V19-10…V19-13 (10 Oct): changes from Tarun's Gemini screenshots (FAB, category icons, hero, insights). Gemini's advice is one model's opinion; no usability evidence.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V19-10 | Replace the two snapped buttons with one centre + button in the tab bar; it opens a sheet with Log expense, Add money, Move money. Supersedes V19-3 | Tarun, 10 Oct ("use these to improve"); Gemini: FAB is the usual pattern in finance apps (not verified by me) | Layout test, Test A | CONFIRMED (Tarun) for the direction; exact layout mine, PROPOSED |
| V19-11 | Tab bar is Home, Spending, +, Savings, Settings; the header gear is removed (no repeat) | Gemini: settings in header or as a 5th item. Tarun's earlier "too many tabs" review: Settings is not a content tab | Test A | PROPOSED |
| V19-12 | Categories show an emoji icon in a tinted circle (list rows and past transactions) instead of coloured dots; icon chosen from the category name, with a default | Gemini: icons beat dots for scanning (no study checked) | Test A | PROPOSED |
| V19-13 | Not adopted: Gemini's 4 to 5 content tabs (Transactions, Goals, Budgets, Profile) because Tarun's v17 review said too many tabs; hero (already big number, bar, days left, per-day); donut and header (done in v19); insight banners as small dismissible chips (Home keeps the swipe cards Tarun asked for) | Tarun's earlier reviews | Tarun decides | PROPOSED |

### V19-14…V19-16 (10 Oct): hero card without repeated information. Research is thin; see caveat.
Research (web search, 10 Oct): Monzo's community thread on a budgeting widget (left to spend, days remaining, bar, green/yellow/red; the thread notes it repeats the Summary dial) and the Wiz help page (a marker in the bar for how far through the period you are) and PocketGuard's "Pace" help page (is spending at the right speed). A dashboard review argues for one dominant answer with supporting detail. None of these covers week-dot indicators or tests whether days left plus bar plus pace is redundant, and none is usability evidence for students.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V19-14 | Remove the category emoji icons; coloured dots are back | Tarun, 10 Oct ("i dont like the new icons on categories"). Supersedes V19-12 | none | CONFIRMED (Tarun) |
| V19-15 | Hero shows the budget once ("of ₹1,072" beside the big number); the ₹0 and end-of-bar labels are removed. Days left are 7 dots with the days left lit, plus a short label. Tarun's idea | Tarun, 10 Oct ("704 twice", "7 dot and 3 lit") | Test A | CONFIRMED (Tarun) for both asks; layout mine, PROPOSED |
| V19-16 | The On track / Spending fast pill is removed. Pace is carried by the bar colour and the tick; when not on track the word is added to the tick label ("Spending fast · ₹306 by tonight") | Tarun: the pill and the bar "show the same thing". Wiz and PocketGuard put pace in the bar (above, not tested) | Test A: do students read the colour without a word? | PROPOSED |

### V19-17 (10 Oct, Tarun): the centre + is dropped; the earlier layout is back.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V19-17 | Remove the centre + button and the Settings tab-bar item. Settings is the gear at the top right again; Log expense and Add money are two buttons snapped above the tab bar. Supersedes V19-10 and V19-11 | Tarun, 10 Oct: "the centre button is not working, the earlier one with settings on top right and two buttons is better" | none | CONFIRMED (Tarun) |

### V19-18 (10 Oct, Tarun): split bar styled from his reference image.
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V19-18 | The save/spend split uses a thin rounded bar with a white shield-shaped handle, instead of the thick bar with a tall line handle. Colours stay save = indigo, spend = orange | Tarun's 60 px reference image, 10 Oct ("use this slider bar for splitting spend and saving"). The image is tiny, so the handle shape is my reading of it | Test B | CONFIRMED (Tarun) for the style; exact shape mine |

### V20-1…V20-12 (10 Oct): v20, from the 3-person test of v19. Report, root causes and next test: `docs/claude/v20_user_test_report.md`. Build: `archive/session-workfiles/mockup20/` (ui20.js plus a CSS block at the end of shell.html).
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V20-1 | Make v20 with a test report first | Tarun, 10 Oct | none | CONFIRMED (Tarun) |
| V20-2 | Hero reads "₹607 / of ₹1,072 left this week" | Tester quote ("₹735 of ₹735 left this week is more understandable") | Test task 2 | CONFIRMED (tester's words via Tarun); layout mine |
| V20-3 | Pace line and "₹X by tonight" removed from the bar; the bar shows money left only | Testers asked what the line and "₹201 by tonight" meant (R2) | Task 3 | PROPOSED |
| V20-4 | Pace as a chip with a small speed-dial symbol and a word (On track / A bit fast / All spent); hero gets a faint tint of that colour. Reverses V19-16 (pill removed) because the bar no longer carries pace | Tarun: "amber is not enough, minimal symbols, not a warning" | Task 3 | PROPOSED |
| V20-5 | One bar component for "left this week" on Home, pay confirm, pay result and the help sheet; the payment is a lighter piece labelled "−₹120"; no hatching | Testers did not read hatching as money going out and did not link the confirm bar to Home (R6) | Task 4 | PROPOSED |
| V20-6 | Pay copy: hand-off "Pay ₹120 in your UPI app"; result "Paid ₹120" (by hand: "Spent"); confirm asks "What was it for?"; the "59% of today's" line is removed | Tester: "why does it say added to your week, isn't it paid" | Task 4 | PROPOSED |
| V20-7 | Plan screen draws the sum: ₹ to spend ÷ days = ₹ each week, plus a strip of weeks up to the end date; labels "Keep some aside?", "Keep aside", "To spend", "How long should ₹X last?" | Testers did not understand the split, the weekly amount or the duration (R1) | Task 1 | PROPOSED |
| V20-8 | Questions: onboarding "How much money do you have now?", Add money "How much money came in?"; the gift / friend-paid-back button is removed from Add money | Tarun's notes from the test | Task 1 | CONFIRMED (Tarun) for removing the gift option; wording PROPOSED |
| V20-9 | One look per job: status = tinted hero; suggestion = solid card with icon, title, one line, button under one "Suggestions" title; information = outlined picture tile under "Insights"; records = plain rows. "Recommended" no longer on each card; savings and other nudges move to Suggestions | Testers: "everything looks the same", "recommended on every card" (R3) | Ask "which of these can you tap / which is advice" | PROPOSED |
| V20-10 | Coloured text only on things you can tap; data colours fill shapes only (goal %, Save/Spend labels, the purple heads-up banner on pay confirm are now plain) | Tester: "why is this purple, I thought it was a button" (R4) | Same question | PROPOSED |
| V20-11 | "Unsorted" and "Needs a category" read "Other"; "Recommended: set a limit" in Spending rows reads "Set a limit" | Tester: "what is unsorted, it just has to be other" | none | CONFIRMED (Tarun's notes) |
| V20-12 | The help sheet ("?") is a picture: ₹ left ÷ days = ₹ a day, the bar, and the three states | "Too much text to read" | Task 3 | PROPOSED |

### V20-13…V20-15 (10 Oct, Tarun, after seeing v20)
| ID | Domain | Evidence | Validation gate | Status |
|---|---|---|---|---|
| V20-13 | How long the money lasts is set in weeks with − and + (each + adds a week to the strip), or on a calendar ("Pick a date on a calendar"); the dropdown is gone. Default 5 weeks | Tarun: "this can just be a calendar or pressing a plus to add a week" | Test task 1 | CONFIRMED (Tarun); default 5 weeks is mine |
| V20-14 | Plan screen in two numbered blocks (1 Keep some aside? 2 How long?) and one result card ("₹1,120 every week", with "₹7,200 ÷ 45 days" above it); the three equal tiles are gone | Tarun: "more distinction, more spacing, more hierarchy, more visually interesting" | Task 1 | PROPOSED |
| V20-15 | Home: more space between sections (40 px), larger section titles, insight tiles narrower, suggestion cards wider with a bigger icon; tips rewritten in plain words ("Some kept aside. The rest is to spend.") | Same request; "riddling" from the test | Tarun review | PROPOSED |
