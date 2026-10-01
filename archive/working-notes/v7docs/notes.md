# Trickle v7: Build notes (Phase 4 + 5)

Artifact: https://claude.ai/artifact/HJDxehfotaDXEwPk9KwNHH ("Trickle — v7"). Source: scratchpad `trickle-final-v7.html` (~276 KB, one file, no libraries; Inter from Google Fonts with a system fallback). Modular sources are in `scratchpad/v7/` (data, ledger, charts, charts2, core, onb, onb2, widgets, home, actions, pay, money, savings, insights, settings, boot); `build.py` concatenates them. `#demo` skips onboarding (UPI path), `#demo-manual` uses the manual path, and `#demo-<frame>` opens a frame directly. The stage header has a "Demo: close Sep" button that runs the period-end sweep.

Tracking is linked UPI or manual entry, and Excel import is a placeholder. `grep -i sms` on the output returns 0.

## Money model and ledger
- Pools: `to_assign`, `budget:<cat>` and `goal:<id>`. Pools are never stored; they are replayed from `TX`. Balance = To assign + Σ Budget + Σ Savings.
- Transaction types: opening, income, spend, transfer (multi-source/multi-destination; reasons assign, sweep, cover, move, withdraw), settle (returns[] to pools) and carry (a marker only: a negative category balance carries forward on its own).
- Every money action runs through `commit()`: snapshot → action → invariant check → toast with 5 s Undo. `commit()` rolls back any action that would leave To assign or a goal below ₹0.
- `checkInvariant()` checks three things: pools sum to balance; balance equals opening + income − spend + settle, computed from flows alone; and every split's shares and every transfer's source and destination totals match. It runs `console.assert` and writes to a hidden `#inv` element (`data-ok`). Owed (open IOUs) is reported separately and never enters a pool.
- Settling an IOU: a goal-covered share returns pro rata to that goal. The rest returns to the spend's category while that period is open, otherwise to To assign (Resolved #1).

## Seed data (deterministic: mulberry32 seed 42 for spends, 99 for shift amounts)
- 1 Apr – 24 Sep 2026, about 500 transactions. Spends come from the v6 generator with a Sep thinning pass. Opening balance ₹6,000.
- Income: Allowance ₹8,000 × 6, split by rule into ₹6,800 across categories plus ₹1,200 to Goa, Motorcycle and General. Part-time × 11 (85/15 rule); the last one (₹1,500, 23 Sep) is unassigned. Gift × 2, Freelance ₹3,000, Scholarship ₹5,000, Refund ₹349.
- Transfers: assigns for every income, 4 June moves from General to Budget, and Headphones funding and withdrawal. Sweeps at the end of Apr and May were Auto (to Goa). Jun–Aug were Manual: 50% assigned the next day, the Aug remainder calibrated. There are 2 calibration moves on 1 Sep that hit the target figures.
- Splits (9): 6 settled groups (11 settling transactions: one after the period closed goes to To assign, and the BookMyShow shares go back to the Goa goal), 2 open groups (Pizza Hut 17 Sep: Arjun ₹400, Meera ₹360, Kabir ₹240; Uber 20 Sep: Riya ₹160) for **₹1,160 owed**, and 1 pending_setup (Pizza Hut ₹960, 22 Sep).
- Covers: 7 at spend time plus 1 goal cover (from To assign, from Food/Transport leftover, and 1 from Goa with a slip). Aug Snacks −₹240 was let go, so Sep carryIn = ₹240. Sep Snacks now sits at −₹240, which creates the "carried to Oct" item.
- Goals: Goa ₹5,120 of ₹8,000 (64%), Motorcycle ₹18,731 of ₹25,000, General ₹760, Headphones reached 20 Jul.
- Today's pools: **To assign ₹1,820 · Budget ₹1,598 · Savings ₹24,611 → Balance ₹28,029.** Owed ₹1,160 sits outside the balance.
- Inbox at today, 5 items: assign ₹1,500 Part-time · Snacks ₹240 over · split ₹960 Pizza Hut · Spotify ₹119 due 27 Sep · PAYTM*QR7731 ₹85 uncategorised. The manual path has 4 (it has no uncategorised UPI item). The Done list has 12 seeded items.

## Screens (57 frames + 8 sheets)
- **Onboarding (11):** splash (3 dotted pool rings), method (2 lanes), upiSetup, period (3 cards + calendar window), income (chips + custom + pill-block mix), categories, allocate (85/15 split slider, pie with callouts incl. Savings and To assign, per-category sliders), sweepSplit (Auto/Manual flow diagram, Equal/Custom, reminder days), PIN, permissions, allSet (ghost hero, pool bar, "1 thing needs you" chip).
- **Home:** lime hero (safe today, half gauge, red "Carried from Aug −₹240" row) · "N things need you" chip · Pay row · **4 pinned widgets** (default W26, W03, W02, W04; W05 fills the slot when W26 hides) · Small purchases · Subscriptions card W40 → subsList, subDetail, subAdd · Recent activity (category dot, UPI/Manual badge, ↓ ⇄ ⅟ glyphs).
- **Money:** W24 balance split + 3 bold pool % tiles → poolDetail · W43 Owed to you (dashed person pills, Remind share sheet) → owedList (outlined waffle, pending with Mark repaid, settled with "→ returned to" chips) · W19, W21, W23, W28 Sankey (settling link dashed), W30, W29, W20, W25 · incomeSources · transactions (filter chips, diverging 30-day strip) · transactionDetail (spend, income, transfer and settle variants).
- **Actions:** Add grid (Log spend, Add income, Move money, Import Excel placeholder) · inbox cards with a one-tap lime primary, a "…" full flow and "Later" (snooze sheet) · live tab badge and Home chip · Done list. Flows: assignIncome (rule chip, "like last period", "fill underfunded first", live pool bar), settleSplit (people + "Someone else" picker, Equal/Custom, live sum check), overspendResolve, sweepLeftover (goal tiles with before → after %, or keep in To assign), subDue, categorise (top 3 guesses + always-rule), logSpend (keypad, Split toggle with Equal/Custom/Settle later, live impact bullet), addIncome (8 categories + custom, recurring, then Assign now or Later), moveMoney (pool picker, swap, before/after bars, goal slip).
- **Pay:** scan / payContact / bankTransfer → payAmount (Split toggle) → coverSheet (To assign → other category → goal with slip step-line → let it go over, with a next-period notch bar; the first option with enough money is preselected) → upiHandoff → payConfirm (pool bar after, split owed line, round-up ring).
- **Savings:** Goa lime hero (64%), sweep Auto/Manual card (goalPicker when Auto), W34 goal tiles, W32 waffle, W38, W37 (only when saved-from-budget > 0), W36, W35, W39 · goalCreate, goalDetail (step-line with contributions coloured by type and ▼ slip markers), goalReached.
- **Insights:** filter chips; every non-fixed widget from all tabs; pin icon on each; edit mode (jiggle, ⋮⋮ drag, ↑ ↓, − hide, "On Home" preview strip); widget library (grouped by tab, size badge, Add/Hide); not-enough-data state (ghost block + progress ring + caption).
- **Drawer + settings:** profile, 10 rows, Help, Log out · settingsPeriod, Categories, Income, Rules (list + builder + split slider), Accounts (linkage diagram + UPI/manual bar), Splits, Alerts (threshold bullet), PIN change, Permissions.

## Widgets (44)
W01 · W26 · W03 · W02 · W04 · W05 · W40 · W41 · W06 · W07 · W08 · W09 · W10 · W11 · W12 · W13 · W14 · W15 · W16 · W17 · W18 · W31 · W42 · W24 · W43 · W44 · W19 · W21 · W23 · W28 · W30 · W27 · W29 · W20 · W25 · W22 · W33 · W34 · W32 · W38 · W37 · W36 · W35 · W39. All charts are SVG built from ledger data, and tapping a mark shows its exact value; line and area charts scrub. W14, W15, W44, W27 and W22 are hidden by default (they are in the library).

## Deviations (with reasons)
- **Pool totals differ from the spec's ₹9,860.** The spec's own goal figures (Goa 64% of ₹8,000 plus Motorcycle 38% of ₹25,000) already add up to more than its Savings total of ₹3,900. I kept To assign ₹1,820, Goa 64%, General ₹760, carry ₹240 and Owed ₹1,160 exactly, and let Budget and Savings come out of the replayed ledger. Motorcycle ends at 75%.
- Safe to spend today is ₹155 (the spec shows ₹318). It is derived: (Budget left + spent today) ÷ 7 days incl. today − spent today.
- Covers: 8, where the spec says 5, because the generator's over-budget months each need one. The mix still includes To assign, category and goal sources.
- The Money period switcher is an inline segmented control, not a separate sheet, and the charts stay on their own time ranges. There is no periodSwitch sheet; peoplePicker, goalPicker, poolPicker, snooze, quickCat, assignNow and remind are present.
- A spend cover covers only the new overage. An existing carried negative stays until the inbox item is resolved.
- Seeded history always uses the 7 starter categories. Categories added in onboarding get ₹0 budgets.
- Period choice (weekly/payday) is saved and previewed, but the seeded prototype runs on monthly periods.

## Validation
- `node --check` passes. Nav audit: 57 frames; every `go()` and `openSheet()` target exists.
- Playwright (Chromium 1194) click-through, 0 console errors (the only failures were blocked Google Font requests offline): UPI onboarding (invalid ID error, suggestion chip, Match payday, custom income, Auto sweep, PIN mismatch then match), manual onboarding (all transactions Manual, account null), UPI payment ₹450 Snacks → cover from To assign → handoff → confirm, manual ₹300 Food spend with a 3-way split → cover sheet → saved (owed +₹200), settle the pending split with Custom (gap chip shown, then 4 × ₹240, owed +₹720), Mark repaid (balance +₹400, returned to Food), Remind sheet, assign income with Fill underfunded, one-tap overspend cover, sub Looks right, categorise with always-rule, period close + sweep to a goal, move money (an overdraw is blocked), withdraw from a goal (slip line), add income → Later, Undo, pinning W13 → shown on Home, edit mode reorder/hide/library add.
- **The invariant held after every one of the 20+ checked actions** (`ok:true`). Owed stayed separate and changed only through splits and settles.
- No horizontal overflow on any frame or sheet (the filter chip rows scroll inside their own containers). Every frame was screenshotted and reviewed. Fixed after review: pool-bar labels colliding (moved to a legend row), the badge showing 4 instead of 5 (due-date day comparison), W37 empty state on the board, the fill-jar budgets for past months, the edit-mode Hide button colliding with the pin, and To assign going negative when assigning income after covers had used it (now capped, plus a guard in `commit`).

## Known issues
- Allocation pie callouts crowd on the left with 7 categories + Savings + To assign.
- Sankey labels on the left column sit over the flows, and very thin category nodes lose their labels (the tooltip still has them).
- The slip step-line on the cover sheet is subtle when the pace is low.
- The transaction detail's impact bullet shows the category's current state, not the state at the time of that purchase.
- The "Move ↑/↓" buttons reorder the board. The Home pin order changes only when both swapped widgets are pinned.
- Opening the Money tab with the "Last" or "6 mo" period doesn't re-scope every widget.
