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

### Viz 4 — Savings goals (Tarun, 2 Oct; options board in progress)
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

### Parked for the flow stage (after the visualisation queue; Tarun confirmed "we will work on the flow later")
- Savings tab: add a goal, make a payment toward a goal, show completed goals (V4-4).
- Pay from savings by choosing a goal like a category (V4-7).
- Celebration screen triggers: wherever a goal is completed (pay screen, income arriving, manual top-up).

### Viz 5 — Unspent → saved (Tarun, 2 Oct; options board in progress)
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

## Visualisation queue (one at a time)
1. Budget gauge — DONE
2. Pay / friction: amount crumbling away — DONE
3. Income split (spending vs savings) — DONE (V3-1…V3-11)
4. Savings goal (how much, by when, actually saved) — DONE (V4-1…V4-21); also: add goal, pay into a goal, completed goals (parked requirement above)
5. Unspent → saved — DONE (V5-1…V5-10)
6. Small / repeat purchases — NEXT
7. Time patterns (e.g. nights)
8. Subscriptions coming up (Fixed group)
9. This week vs last
10. Transaction history
11. Exact amounts on tap (progressive disclosure rules)

## Parked / superseded
- Coin test (V4 vs V1) and name-rows vs families category ideas (claude/v14_stage2b_coins_categories.md) — superseded.
