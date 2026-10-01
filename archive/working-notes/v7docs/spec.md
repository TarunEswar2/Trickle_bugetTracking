# Trickle v7: Phase 3 Design Spec

Inputs: `v7_phase_plan.md` (includes the user decisions of 24 Sep), `v7_phase1_audit.md`, `v7_phase2_catalogue.md`, `v7_proposal.md`, `v6_phase3_spec.md`, `mockup_v6_build_notes.md`, `trickle-final-v6.html`.
**Hard constraint: no SMS tracking and no notification scraping.** Tracking uses UPI linkage or manual entry. Excel import exists only as a placeholder screen.
"Today" in the prototype is **Thu 24 Sep 2026, 18:30**. Budget period is **monthly** by default, and the seeded user is Nishad.

---

## 0. Key decisions (the Phase 2 open questions are answered here)

1. **Tabs:** Home | Money | Actions | Savings | Insights. Tapping the avatar (top-left, on every tab) opens a side drawer with Settings and the rest. Pay (Scan / Contact / Bank) stays on Home. The Add actions now live inside the **Actions** tab, which has two parts: the To-do inbox and the Add grid. The old centre "+" is gone.
2. **Money model:** To assign → Budget (the Home number) and Savings (goals plus General). **Balance = To assign + Budget + Savings**, and it appears only on Money. Every move is logged as a transfer. **"Owed to you" is never counted in any pool or in the balance.**
3. **Leftover at period end:** nothing moves on its own when Sweep = Manual. The app sends a notification, adds a badge on Actions, and creates a "Sweep ₹X leftover" inbox item. If Sweep = Auto, the leftover moves to the default goal and is logged.
4. **Uncovered overspend ("let it go over"):** the amount is deducted from the **next period's Budget**. It appears as a red "Carried −₹X" line on Home next period and as an inbox item in the current period.
5. **Friend repays a split:** the repayment appears in the list like income, labelled **"Settling split"**. It closes the IOU and returns the money to its source: the Budget category it was spent from, or the goal if the spend was covered from a goal. It never lands in To assign as income.
6. **No goal PIN lock.** Covering from a goal shows a "goal slip" (the ETA moves later by N days).
7. **Income categories:** Allowance, Stipend, Part-time, Freelance, Scholarship, Gift, Refund, Other, plus custom categories the user adds. Repayments are not income; they are split settlements.
8. **Subscriptions are on Home only:** a W40 card, a detail screen and a due-soon chip. Subscriptions due within 3 days also appear in the Actions inbox.
9. **Widgets:** every chart is a widget. Each has a fixed size (S / W / L). Users can pin, hide and drag to reorder. Every widget has a not-enough-data state. The top pinned widgets appear on Home, up to 6 slots under the fixed hero. Per the plan, widget edit mode sits behind the app PIN.
10. **Visual:** MIX. Near-black base, **lime `#C6F432`** for actions, the primary number and "today". Saturated category colours for cards and charts. Pools have their own validated trio (see §5).

---

## 1. Frames

Notation: each frame lists **Layout (top to bottom)**, **Widgets/charts (data)** and **Interactions**. All ₹ figures are seed values at "today". Frame count is in §1.12.

### 1.0 Global chrome
- **Top bar** (56px): avatar (32px circle "N", opens the drawer) · frame title · right slot (context action, for example Edit on Insights).
- **Tab bar** (64px, 5 items): icon + label. The active tab uses a lime icon and a lime 3px top pill. **Actions** shows a badge: a lime pill with the count in black 11/700, 18px min width. It is hidden when the count is 0 and shows "9+" above 9.
- **Toast** at the bottom above the tab bar, with Undo for 5 s on every transfer, resolve or log.
- **Sheets:** a bottom sheet on a surface2 background, radius 24, with a grab handle.

### 1.1 Onboarding (10 frames; v6 had 8)
A step-arc progress indicator (270° arc around the step number) appears on steps 1–7.

| # | Frame | Layout | Visual / data | Interactions |
|---|---|---|---|---|
| 0 | `splash` | wordmark, demo dotted rings, "Get started" in lime | 3 dotted pool rings (To assign / Budget / Savings) filling in, labelled "Sample data" | tap a ring to see its label |
| 1 | `method` | title "How should Trickle track?"; two lanes; footer "Trickle never reads your messages." | UPI lane: UPI apps → linked ID → logged automatically. Manual lane: you pay → Actions › Log spend → logged. Lane thumbnails of Home | tap a lane to select it |
| 1b | `upiSetup` | node diagram phone → IDs → Trickle; ID input; suggestion chips (@oksbi, @ybl) | ACCOUNTS[] | add / remove a node; invalid ID shows an inline error |
| 2 | `period` **(new)** | "Your budget resets…"; 3 option cards: Monthly (1st) · Weekly (Mon) · Match payday (pick a day 1–31); a mini **dashed-future calendar** preview highlighting the period window; a caption: "Daily safe-to-spend is always shown." | period.type, anchor | selecting a card redraws the calendar window |
| 3 | `income` **(new)** | "Where does your money come from?" Income chips (Allowance, Stipend, Part-time, Freelance, Scholarship, Gift, Refund, Other, + Custom); for each selected recurring source: amount, cadence, expected day | **pill blocks** preview sized by amount (source colours) | adding a custom category opens a name + icon field |
| 4 | `onbCategories` | live ghost starter rings + category chips (as in v6) | cats, default weights | as in v6 |
| 5 | `onbAllocate` | hero "Each ₹8,000 allowance"; **split rule**: segmented Budget / Savings slider (default 85 / 15), then per-category sliders inside Budget; the savings share goes to a goal or General; a "To assign" slice absorbs the remainder | pie with callouts: categories plus a Savings slice plus a grey To assign slice | the rule is saved as `rule_income_split` and applies when a recurring income arrives (preview: "₹6,800 → Budget, ₹1,200 → Savings") |
| 6 | `sweepSplit` **(new)** | two toggles: Sweep leftover at period end **Auto / Manual** (default Manual); Splits: default **Equal** or **Custom** shares; "Remind friends after N days" (3) | a small flow diagram: leftover → goal (Auto) or → inbox (Manual) | toggles |
| 7 | `pin` | visual PIN dots (as in v6) | — | mismatch shakes |
| 8 | `permissions` | Notifications (period-end, due-soon, inbox), Contacts, Camera; no SMS row | toggle → miniature Home tile | — |
| 9 | `allSet` | ghost Home: hero safe-to-spend, balance split bar, one inbox chip "1 thing needs you: assign your first income" | computed from the answers | "Open Trickle" |

### 1.2 Home
Layout, top to bottom:
1. Top bar: avatar · "Hi Nishad" · bell icon, which opens Actions.
2. **Hero W01 Safe to spend today** (fixed, not movable): the lime-gradient hero card (FreeDom ref). Big ₹ **₹318** safe today; subline "₹4,140 left in Budget · 6 days left in Sep"; a half gauge of today's spend ₹142 / ₹460. When a carry exists: a red row "Carried from Aug −₹240" with an ▲ icon.
3. **Inbox chip:** "**5 things need you** ›" (a lime outline pill with a count dot), linking to Actions. It is hidden at 0.
4. **Pay row:** 3 tiles, Scan QR · Pay contact · Bank transfer (quarter-circle glyph icons).
5. **Pinned widgets** (up to 6, drag order from the Insights board). Seeded defaults: W26 To assign (S, only when > 0) + W03 Runway (S) · W02 Period pace (W) · W04 Category % cards (L) · W05-lite Recent.
6. **Subscriptions card W40** (always present when ≥1 sub; not movable off Home): next 3 subs with icon rings, each ring showing days left out of the cycle; a "Due soon" amber chip on anything due in ≤3 days (Spotify ₹119, in 3 days); "₹2,048/mo · ₹24,6k/yr" footer. Tap opens `subsList`.
7. **Recent activity:** 5 rows. Each row has a category dot, a UPI/Manual badge and a type glyph: ↓ income is lime, ⇄ transfer is grey, ⅟ split shows a split glyph with "₹240 owed".
8. The "Edit Home widgets" link opens Insights edit mode.

Interactions: tap the hero to see the gauge values; long-press a pinned widget to unpin or move it (goes to edit mode); tap a category card to open `categoryDetail`.

### 1.3 Money
1. Top bar: avatar · "Money" · period switcher (lime pill segmented: This period / Last / 6 mo).
2. **W24 Balance split** (W, fixed first): "Balance ₹9,860"; a 3-segment pool bar: To assign ₹1,820 (amber) · Budget ₹4,140 (blue) · Savings ₹3,900 (aqua), with 2px gaps and direct labels; underneath, the invariant caption "To assign + Budget + Savings".
3. **Pool stat tiles** (fitness-style big coloured cards, 3 across): each card is filled in its pool colour with a large % of the balance (18% / 42% / 40%) and a tap target to the pool detail.
4. **W43 Owed to you** (W, new): "₹1,160 owed to you, not in your balance". A row of avatar pills (Arjun ₹400 · Meera ₹360 · Kabir ₹240 · Riya ₹160), each with an age tag (e.g. "6d"); dashed outline = not in balance. A "Remind" button opens a UPI collect request/share link placeholder. Tap opens `owedList`.
5. W19 Income this period (W) · W21 Payday calendar (W) · W23 In vs out (W) · W28 Money flow Sankey (L) · W30 Transfers log (W) · W27 Balance history (L) · W29 Forecast (W) · W20 Source mix (S) + W25 Pool rings (S) · W22 Expected vs received (W). The order is user-editable; the same pin/hide rules apply.
6. "All transactions ›" link opens `transactions`.

Sub-frames:
- `poolDetail(to_assign|budget|savings)`: pool hero number, 30-day line, list of transfers in/out, and actions (Assign / Move / Sweep).
- `owedList`: two sections, **Pending** (IOU rows: friend, share, original spend, date, age dots) and **Settled** (greyed, settle date, returned-to chip "→ Food" / "→ Goa goal"). Total card on top uses an **owed waffle** (10×10; each person has a tone of the text colours, not category hues; dots stay outlined, never filled like money).
- `incomeSources`: a list of sources with cadence, expected next date and an Add custom source button.

### 1.4 Actions (the To-do inbox plus Add)
Layout:
1. Top bar: avatar · "Actions".
2. **Add grid** (2×2 quarter-circle glyph tiles, lime icons): **Log spend** · **Add income** · **Move money** · **Import Excel**.
3. **Inbox header:** "To do · 5" and a "Done (12)" filter chip.
4. **Inbox cards** (sorted by priority, see §3.6). Each card has a type glyph, a one-line title, a subline and **one primary lime button** that resolves it in one tap using the prefilled default. A secondary "…" opens the full flow. Swipe left to snooze until tomorrow.

Seeded inbox at today (5 items):
| # | Type | Title | Primary (one tap) | "…" flow |
|---|---|---|---|---|
| 1 | income_assign | "₹1,500 from Part-time (Café shift) is waiting" | **Assign by rule** (85/15) | `assignIncome` |
| 2 | split_settle | "Split ₹960 at Pizza Hut: who owes you?" | **Split equally (4)** | `settleSplit` |
| 3 | overspend_carry | "Snacks went ₹240 over: carried to Oct" | **Cover from To assign** | `overspendResolve` |
| 4 | sub_due | "Spotify ₹119 due Sat 27 Sep" | **Looks right** (mark expected) | `subDetail` |
| 5 | uncategorised | "₹85 to 'PAYTM*QR7731': pick a category" | top-guess chip **Snacks** | `categorise` |
(A sweep item appears on 1 Oct: "Sweep ₹X leftover from Sep".)

Resolve flows (each ends with a toast + Undo and removes the card; the badge decrements):
- **`assignIncome`**: amount hero; a **rule chip** "85/15 rule"; allocation rows with a live 3-segment pool bar: Budget ₹1,275 · Goals (Goa ₹150, Motorcycle ₹75) · leave in To assign ₹0. Buttons "Assign like last period" and "Fill underfunded". CTA "Assign ₹1,500". Creates `transfer(assign)` txns.
- **`sweepLeftover`**: "Sep leftover ₹620". A goal picker of quarter-circle goal tiles, each showing its new % after the sweep (Goa 64% → 72%). There is also a "Keep in To assign" option. Creates `transfer(sweep, manual)`.
- **`settleSplit`**: original payment card (Pizza Hut ₹960, from Food); people picker (contacts + recent split partners); **Equal / Custom** toggle; share rows (You ₹240, Arjun ₹240, Meera ₹240, Kabir ₹240) with a live check that the shares sum to ₹960 (a red "₹X unassigned" chip otherwise). CTA "Save split": this creates IOUs totalling ₹720 in Owed to you. The budget is unchanged (the full ₹960 already left).
- **`overspendResolve`**: the same sheet as the purchase cover sheet (§1.6) in its after-the-fact form; the default is the first option that has enough money.
- **`subDue`**: sub card, expected amount, "Pay now via UPI" or "Looks right". If paid manually: "Log it".
- **`categorise`**: merchant string, amount/time; category chips with the top-3 guesses first; checkbox "Always use for PAYTM*QR7731" (creates a rule).
- **Add flows:**
  - **`logSpend`**: amount keypad; category chips; note; date/time; source Manual; a **Split toggle** (off by default; when on: "Split with…" people plus Equal/Custom inline, or "Settle later" which creates the inbox item); a live impact bullet (v6). On save, if it overspends, the cover sheet (§1.6) opens.
  - **`addIncome`**: amount; income category chips (8 + custom); from (optional); recurring toggle plus cadence; date. After save: "Assign now" (opens assignIncome) or "Later" (an inbox item is created).
  - **`moveMoney`**: From pool/goal/category → To pool/goal/category (two picker cards and a swap button); amount; a live before/after bar for both ends; the reason is auto-labelled. Moves from Savings show a goal slip line.
  - **`importExcel`** (**PLACEHOLDER**): illustration-free card "Import from Excel: coming soon"; text "We're finalising the file format. You'll upload an .xlsx/.csv from your bank, match columns, preview, and confirm." A disabled "Choose file" button; a "Tell me when it's ready" toggle. No parsing.

### 1.5 Payment flow (UPI)
`scan` / `payContact` / `bankTransfer` → **`payAmount`** (keypad, category chip, **Split toggle** as in logSpend, live bullet) → if the amount exceeds the category's left amount → **`coverSheet`** → `upiHandoff` (placeholder "Opening your UPI app…") → **`payConfirm`** (balance-after bar per pool, "Split ₹960 · ₹720 will be owed to you" line when split, round-up ring offer).

**`coverSheet` (overspend cover)**. Title: "₹210 over Snacks. Cover it from:". Four option rows in fixed order, each showing what it does:
1. **To assign** (₹1,820 available): "To assign ₹1,820 → ₹1,610".
2. **Another category's leftover**: a picker of categories that have leftover, ordered by leftover; each with a mini bar (Groceries ₹540 left → ₹330).
3. **A savings goal**: a goal picker. Shows the **goal slip**: "Goa 64% → 61% · ETA 12 Dec → 19 Dec (+7 days)" on a mini step-line with the ghost of the old projection. No PIN.
4. **Let it go over**: red text "Oct budget starts ₹210 lower" with a preview of next period's budget bar with a red notch.
The first option with enough money is preselected. CTA "Cover & pay ₹450" (manual flow: "Cover & save"). With a split on, the cover amount is still the full payment amount; when friends repay, the money returns to the covering source pro-rata (§3.5).

### 1.6 Savings
1. Top bar: avatar · "Savings" · "+ Goal".
2. **W33 Goal hero** (L, lime gradient): top goal "Goa trip". Giant **64%**, "₹5,120 of ₹8,000 · ETA 12 Dec".
3. **Sweep control card**: "Leftover sweep" with an **Auto / Manual** segmented toggle. Auto → "goes to: Goa ›". Manual → "Swept this period: ₹0 · Assign to a goal ›" (W37 appears when > 0 with a pick-goal button).
4. W34 Goal tiles (W): quarter-circle glyph tiles for each goal (Goa 64%, Motorcycle 38%, General ₹760, Headphones ✓).
5. W32 Savings rate (S, waffle 10×10, "19%") + W38 Contribution sources (S).
6. W36 Sweeps this period (W) · W35 Goal ETA (W) · W39 Withdrawals & slips (W).

Sub-frames:
- **`goalCreate`**: 3 fields (name + icon, target, by date) + weekly-pace stepped columns (v6); an optional "auto-contribute from income rule %".
- **`goalDetail`**: hero %, cumulative step-line with contributions coloured by type (income rule / sweep / round-up / manual) and **slip markers** (red ▼ where a cover withdrew money); stats; "Move money in/out".
- **`goalReached`**: completed ring with contribution ticks; CTAs "Move to Budget" / "Keep in Savings" / "New goal".

### 1.7 Subscriptions (reached from Home only)
- **`subsList`**: W41: a month calendar with due dots sized by ₹, a 12-cell yearly pictogram per sub, a list.
- **`subDetail`**: 12-cell pictogram, price step-line (Spotify ₹99 → ₹119), paid-from category, "Pay now", "Pause reminders".
- **`subAdd`**: name, amount, cycle, anchor date, category; live 12-cell preview.

### 1.8 Transactions
- **`transactions`**: search; filter chips (All · Spend · Income · Transfers · Splits · Settling · UPI · Manual); a 30-day column strip (spend down / income up, diverging around a zero baseline); list grouped by day.
- **`transactionDetail`**: by type.
  - Spend: merchant range strip, 24h tick, category bullet (v6), and a **split block** (people chips, paid/pending status per person).
  - Income: source, what it was assigned to (transfer links).
  - Transfer: from → to, reason (assign / sweep / cover / move / withdraw / carry).
  - Settling split: from whom, the IOU it closed, "returned to Food" chip.
  - Actions: Recategorise · Mark as split · Delete.

### 1.9 Insights widget board
1. Top bar: avatar · "Insights" · **Edit**.
2. Filter chips: All · Spending · Time · Habits · Money · Savings.
3. The **W42 2×2 insight grid** (L) is first by default, followed by the enabled widgets in a 2-column grid (S = 1 cell, W = 2×1, L = 2×2). Each widget has a kicker, a finding headline, the chart and a footnote.
4. A **pin icon** (outline, or filled lime when pinned) at the top-right of every widget.

- **`insightsEdit`** (PIN prompt first): widgets jiggle (reduced-motion: dashed outline); drag handle ⋮⋮; "−" hides; the pin toggle; a Home preview strip at the top shows the first 6 pinned in order (the "On Home" section). Done saves.
- **`widgetLibrary`**: a list of hidden and available widgets, grouped by tab, each with a size badge (S/W/L) and a thumbnail; "Add" puts it back at the end.
- **Not-enough-data state** (all widgets): the chart ghost at `--ghost`, and a caption such as "Shows after 7 days of spending · 3 so far" with a progress ring.
- `categoryDetail` and `accumulationDetail` remain from v6 as detail screens.

### 1.10 Side drawer and settings
The **drawer** (slides from the left, 84% width): profile (name, UPI IDs), then rows: **Budget & period** · **Categories** · **Income sources** · **Rules** (income split, sweep, auto-categorise) · **Linked accounts** · **Splits & reminders** · **Alerts** · **PIN & security** · **Permissions** · **Import (soon)** · Help · Log out. Footer: "No SMS. Ever."

Settings screens: `settingsPeriod` (the period cards from onboarding; changing the period takes effect at the next boundary, with a warning), `settingsCategories` (the v6 budget sheet + edit), `settingsIncome` (= incomeSources), `settingsRules` (rule list; builder: trigger [income arrives / period ends / each spend] + action [₹ or %] + destination), `settingsAccounts` (linkage diagram + UPI/manual bar), `settingsSplits` (default equal/custom, reminder days), `alerts` (threshold bullet), `pinChange`, `permissionsSettings`.

### 1.11 Sheets
quickCat, periodSwitch, peoplePicker, goalPicker, poolPicker, snooze.

### 1.12 Frame count
Onboarding 10 · Home 1 · Money 4 (money, poolDetail, owedList, incomeSources) · Actions 11 (actions, assignIncome, sweepLeftover, settleSplit, overspendResolve, subDue, categorise, logSpend, addIncome, moveMoney, importExcel) · Pay 7 (scan, payContact, bankTransfer, payAmount, coverSheet, upiHandoff, payConfirm) · Savings 4 · Subs 3 · Transactions 2 · Insights 5 (board, edit, library, categoryDetail, accumulationDetail) · Drawer + settings 10 (drawer + 9) = **57 frames**, plus 6 sheets.

---

## 2. Widget catalogue (final: 44 widgets)
Sizes: S = 1 cell, W = 2×1, L = 2×2. Tab: H Home, M Money, S Savings, I Insights. "Pin#" is the default Home pin order; F = fixed (not movable).

| ID | Name | Size | Tab | Default | Data | Not-enough-data |
|---|---|---|---|---|---|---|
| W01 | Safe to spend today (hero) | W | H | F (hero) | budget.left, daysLeft, today.spent, carry | never |
| W26 | To assign | S | H | Pin 1 (only when > 0) | pools.to_assign | hidden at ₹0 |
| W03 | Budget runway (dotted ring, lime) | S | H | Pin 2 | budget.left, 7-day avg | ≥3 spend days |
| W02 | Period pace bullet | W | H | Pin 3 | period spent/budget/elapsed | ≥2 days of the period |
| W04 | Category % cards (bold coloured) | L | H | Pin 4 | cat spent/budget incl. carry | 1 category with spend |
| W05 | Recent / Today · Period · Last | W | I | Pin 5 | totals by day | 1 txn |
| W40 | Subscriptions due | W | H | F (Home only) | subs next due | 1 sub |
| W41 | Subs calendar + yearly | L | H→subsList | screen | subs[] | 1 sub |
| W06 | Under-budget streak | W | I | shown | daily vs allowance | 3 days |
| W07 | Spend calendar (dashed future) | L | I | shown | daily totals | 7 days |
| W08 | This vs last period (dumbbell) | L | I | shown | cat p-1, p | 1 closed period |
| W09 | Category share (pill blocks) | S | I | shown | cat spend | 5 txns |
| W10 | Month by month (pie + jars) | L | I | shown | cat × month | 2 months |
| W11 | Daily range bars | W | I | shown | txns by day | 7 days |
| W12 | Repeat buys (pictogram) | W | I | shown | merchant counts | a merchant with ≥3 buys |
| W13 | When I spend (24h radial) | S | I | shown | txn hour | 15 txns |
| W14 | Peak hour | S | I | hidden | hour histogram | 15 txns |
| W15 | Purchase sizes | W | I | hidden | amt buckets | 20 txns |
| W16 | Top merchants | W | I | shown | merchant totals | 3 merchants |
| W17 | Fixed vs flexible | S | I | shown | subs vs rest | 1 sub |
| W18 | 6-period trend | W | I | shown | period totals | 2 periods |
| W31 | Overspend covers | S | I | shown | covers[] by source | 1 cover |
| W42 | Insight 2×2 | L | I | shown, first | deltas | each tile has its own rule |
| W24 | Balance split | W | M | F first | pools | never |
| W43 | **Owed to you** (new) | W | M | shown #2 | ious pending | hidden if none pending; empty state "Split a payment to see it here" |
| W44 | **Splits settled vs pending** (new; stacked bar per month, settled solid / pending dashed) | W | M | hidden | ious by month | 2 splits |
| W19 | Income this period | W | M | shown | incomes by source | 1 income |
| W21 | Payday calendar | W | M | shown | recurring incomes | 1 recurring |
| W23 | In vs out | W | M | shown | incomes vs spend per week (spend excludes friends' shares once settled) | 2 weeks |
| W28 | Money flow Sankey (sources → pools → cats/goals; a "Settling split" node returns to cats) | L | M | shown | income, transfers, spend | 1 income + 5 txns |
| W30 | Transfers log | W | M | shown | transfers[] | 1 transfer |
| W27 | Balance history (stacked 3 pools) | L | M | hidden | daily pool snapshots | 14 days |
| W29 | End-of-period forecast | W | M | shown | balance, avg, expected income | 7 days |
| W20 | Income source mix | S | M | shown | income 3 mo | 2 sources |
| W25 | Pool rings (dotted) | S | M | shown | pools vs targets | never |
| W22 | Expected vs received | W | M | hidden | expected, received | 1 closed recurring |
| W33 | Goal hero | L | S | F first | top goal | 1 goal |
| W34 | Goal tiles | W | S | shown | goals[] | 1 goal |
| W32 | Savings rate waffle | S | S | shown | saved ÷ income | 1 income |
| W38 | Contribution sources | S | S | shown | contributions by type | 3 contributions |
| W37 | Swept, waiting for a goal | S | S | auto | savedFromBudget | hidden at 0 or when Auto |
| W36 | Sweeps this period | W | S | shown | sweeps[] | 1 sweep |
| W35 | Goal ETA | W | S | shown | contributions | 3 contributions |
| W39 | Withdrawals & slips | W | S | shown | withdraw/cover transfers | 1 withdrawal |

**Count by tab:** Home 7 (W01, W26, W03, W02, W04, W40, W41) · Money 13 · Savings 8 · Insights 16 (including W05) = **44**. Any widget except the F ones can be pinned to Home. Home shows the first 6 pins plus the fixed W01 and W40.

---

## 3. Data model

```ts
Txn = { id, ts, amt /* >0 paise-free ₹ */, type: 'spend'|'income'|'transfer'|'settle',
  source: 'UPI'|'Manual'|'Import', account: string|null,     // null iff Manual
  // spend
  merchant?, cat?, payeeType?: 'merchant'|'contact'|'bank', subId?,
  coveredBy?: CoverRef[],        // [{from:'to_assign'|'cat:<id>'|'goal:<id>'|'carry', amt}]
  split?: { status:'pending_setup'|'open'|'settled', mode:'equal'|'custom',
            shares:[{person, amt, iouId?}], myShare },
  // income
  incomeCat?, from?, recurringId?,
  // transfer
  from?: PoolRef, to?: PoolRef, reason?: 'assign'|'sweep'|'move'|'cover'|'withdraw'|'carry'|'split_return', auto?: boolean,
  // settle
  iouId?, returnedTo?: PoolRef }
PoolRef = 'to_assign' | 'budget:<catId>' | 'goal:<goalId>' | 'general'
Pools   = { to_assign, budget: {[catId]: allotted}, savings: {[goalId|'general']: saved} }  // derived from txns
Goal    = { id, name, icon, target, byDate, createdTs, isDefaultSweep, reachedTs? }
Sub     = { id, name, icon, amt, cycle, anchor, cat, priceHistory[], remind }
IOU     = { id, person, amt, spendTxnId, returnTo: PoolRef /*pro-rata of the cover*/, createdTs, settledTs?, settleTxnId? }
Rule    = { id, trigger:'income'|'period_end'|'spend'|'merchant', match?, action:{kind:'split'|'move'|'roundup'|'categorise', pct?, amt?, dest?, cat?} }
Period  = { type:'monthly'|'weekly'|'payday', anchor, current:{start,end}, carryIn /*≥0, deducted*/ }
InboxItem = { id, kind, refId, createdTs, priority, snoozedUntil?, resolvedTs?, resolution? }
```

### 3.1 Invariants (checked after every flow in Phase 5)
- `balance == to_assign + Σbudget_left + Σsavings`, where `budget_left = Σallotted − Σspend (net of settle returns) − carryIn`.
- `balance == opening + Σincome − Σspend + Σsettle` (transfers net to zero).
- **Owed never enters a pool or the balance**: `Σ open IOU.amt` is shown separately; it only enters the balance through a `settle` txn.
- Each split's shares sum to the spend amount; myShare ≥ 0.

### 3.2 Money effects by type
- **income**: +to_assign (or split immediately by a matching rule, which logs `assign` transfers).
- **spend**: −budget:cat. Overspend is covered through `cover` transfers (from to_assign / another cat / goal) or, under "let it go", `carry` sets next `Period.carryIn += amt`.
- **transfer**: moves between PoolRefs; the sum is unchanged.
- **settle**: +amt to `IOU.returnTo`. If the cover came from a goal, the goal gets its share back; if the cat's period has closed, the money goes to the **current** period's same category. It closes the IOU.

### 3.3 Periods
Monthly: 1st–last day. Weekly: Mon–Sun. Payday: anchor day to the day before the next anchor. `safe_today = max(0, budget_left − spent_today_excluded) ÷ daysLeft_incl_today`. At the boundary: leftover = budget_left. If Sweep = Auto, it goes to the default goal as `sweep, auto:true`. If Manual, a notification plus inbox item `sweep` (the money stays in Budget, then moves to to_assign as "saved from budget" when the new period starts; savings-only).

### 3.4 Inbox generation rules
| kind | Created when | Auto-resolves when | Priority |
|---|---|---|---|
| income_assign | income with to_assign > 0 not covered by a rule | to_assign from that income = 0 | 1 |
| overspend_carry | a "let it go" cover, or a period closes with a cat < 0 | covered or the next period starts (then it becomes an info row) | 2 |
| split_settle | a spend marked Split with status pending_setup | shares saved | 3 |
| sweep | period end, Manual, leftover > 0 | the swept amount is assigned to a goal or kept | 3 |
| sub_due | a sub due in ≤3 days | charge txn seen, or "Looks right" | 4 |
| uncategorised | UPI spend with no rule match | category set | 5 |
Badge = count of unresolved, unsnoozed items. Home chip = the same count.

---

## 4. Seed data (Phase 4)
- Window 1 Apr – 24 Sep 2026, mulberry32 seed 42, period monthly. Opening balance ₹6,000 (in to_assign on 1 Apr, assigned the same day).
- **Income (≈ 26 items):** Allowance ₹8,000 on the 1st, 6× (rule 85/15 → Budget ₹6,800 / Savings ₹1,200 split Goa/Motorcycle/General); Part-time café shifts irregular ₹600–1,500, 11×, the last one (₹1,500, 23 Sep) **unassigned**; Gift 2× (birthday ₹2,000 on 14 Jun; Raksha Bandhan ₹1,000 on 9 Aug); Freelance ₹3,000 (Jul, logo job); Refund ₹349 (Aug, Zepto); Scholarship ₹5,000 (Jul, one-off, 60% to Motorcycle).
- **Spends:** the v6 generator (≈455 txns, merchant hour profiles, monthly shapes).
- **Transfers:** assigns for every income; 4 manual moves (Savings → Budget in Jun); **sweeps:** Apr–Aug month ends, Apr/May Auto (to Goa), Jun–Aug Manual assigned the next day; Sep pending (after today).
- **Splits (9):** 6 settled (Settling split txns 1–9 days later, 1 returned to the Goa goal because that spend was covered from Goa), 2 open IOU groups (Pizza Hut 17 Sep: Arjun ₹400 etc.; cab 20 Sep: Riya ₹160), with **Owed ₹1,160 total**, plus **1 pending_setup** (Pizza Hut ₹960 on 22 Sep, which drives the inbox).
- **Carried overspend:** Aug Snacks −₹240 let go, so Sep carryIn = ₹240 (shown on Home). A Sep Snacks overspend of ₹240 creates the current "carried to Oct" item.
- **Covers:** 5 (2 from to_assign, 2 from categories, 1 from Goa with a slip).
- **Goals:** Goa ₹8,000 by 15 Dec (64%); Motorcycle ₹25,000 by 31 Mar 2027 (38%); General; Headphones reached 20 Jul.
- **Subs:** Spotify ₹119 (due 27 Sep), Coursera ₹399 (14th), Cloud ₹130 (22nd), Prime ₹1,499 yearly (8 Nov), Gym ₹1,800 quarterly (1 Oct, which also shows in the inbox window after 28 Sep).
- **Today's pools:** To assign ₹1,820 · Budget ₹4,140 · Savings ₹3,900 → Balance ₹9,860; Owed ₹1,160 (outside).
- **Inbox at today:** 5 items (§1.4). One uncategorised UPI (PAYTM*QR7731 ₹85).

---

## 5. Visual system

### 5.1 Tokens (dark only; light is out of scope for the prototype)
| Token | Hex | Role |
|---|---|---|
| `--base` | `#0B0B0C` | page |
| `--surface` | `#141414` | cards (validator surface) |
| `--surface2` | `#1D1E20` | nested, inputs, sheets |
| `--surface3` | `#27282B` | tracks, empty cells |
| `--text` / `--text2` / `--text3` | `#F4F4F2` / `#A9AAAD` / `#74757A` | ink |
| `--lime` | **`#C6F432`** | primary CTA, hero number, today, active tab, badge; text on lime `#0B0B0C` |
| `--lime-grad` | `linear-gradient(135deg,#C6F432 0%,#8FD14F 55%,#2E6B3A 100%)` | hero cards (W01, W33) |
| `--ghost` | `rgba(198,244,50,.12)` | not-enough-data ghost |
Lime is never a data series (L 0.90 fails the chart lightness band); it marks action or "today" only.

### 5.2 Category colours (categorical, fixed slots, validated)
s1 Food `#3987e5` · s2 Snacks `#d95926` · s3 Groceries `#199e70` · s4 Transport `#c98500` · s5 Necessities `#d55181` · s6 Stationery `#9085e9` · s7 Buffer `#e66767` · other `#6b6c70`.
The bold % cards fill at 100% saturation with dark text `#0B0B0C` for the %, where contrast is ≥4.5 for all slots except s6/s1 (use white text there).
```
node validate_palette.js "#3987e5,#d95926,#199e70,#c98500,#d55181,#9085e9,#e66767" --mode dark --surface "#141414"
Palette (dark, surface #141414, categorical): 7 slots
  [PASS] Lightness band         all 7 inside L 0.48–0.67
  [PASS] Chroma floor           all 7 >= 0.1
  [PASS] CVD separation         worst adjacent #c98500↔#199e70 ΔE 8.4 (protan) · tritan 8.7
  [PASS] Normal-vision floor    worst adjacent #d55181↔#c98500 ΔE 19.3 (normal)
  [PASS] Contrast vs surface    all 7 >= 3:1
  → ALL CHECKS PASS
```

### 5.3 Pool colours (3-series, all-pairs validated)
To assign `#c98500` amber · Budget `#3987e5` blue · Savings `#199e70` aqua. Owed = **dashed outline in `--text2`**, never filled (it isn't money you hold).
First attempt: lime/blue/violet FAILED (lime L 0.903 outside the band; blue↔violet ΔE 1.9 protan).
```
node validate_palette.js "#c98500,#3987e5,#199e70" --mode dark --surface "#141414" --pairs all
  [PASS] Lightness band         all 3 inside L 0.48–0.67
  [PASS] Chroma floor           all 3 >= 0.1
  [PASS] CVD separation         worst all-pairs #199e70↔#c98500 ΔE 8.4 (protan) · tritan 4.0
  [PASS] Normal-vision floor    worst all-pairs #199e70↔#c98500 ΔE 19.8 (normal)
  [PASS] Contrast vs surface    all 3 >= 3:1
```
Pools always carry direct labels plus glyphs (a secondary encoding). Pool hues overlap category hues, so they never appear on the same chart as categories, except in the Sankey, where nodes are labelled.
Income sources use one sequential ramp (lime-free greens are avoided): the ranked `#86b6ef → #3987e5 → #184f95` blue steps with labels.
**Status** (reserved, with icon + word): good `#0ca30c` ✓, warning `#fab219` ◐, serious `#ec835a` ▲, critical `#d03b3b` ●. Carry and over always use critical + ▲/● + words.

### 5.4 Type
Inter / system sans. Mega 56/800 −0.03em (the hero %, FreeDom ref) · Hero 36/700 · H1 22/650 · H2 16/600 · Body 14/400 · Label 11/600 caps +0.06em · Data 11/500 tabular · Micro 9.5/500.

### 5.5 Card anatomy and grid
- Grid: 412px frame, 16px gutters, 2 columns of 182px with a 16px gap. **S = 182×182**, **W = 380×182**, **L = 380×380**. The hero is W with auto height.
- Card: radius 20, padding 16, `--surface`, 1px `#222`. Order: kicker → headline finding → chart → footnote. A pin icon at the top-right on the board.
- Bold % card (fitness ref): full category fill; the top-left icon in a quarter-circle glyph; name; a giant % at the bottom-right (Mega 44); the fill width = used % over a darker 30% tint track.
- Dotted rings (telecom ref): 60 dots, filled = progress; the lime hero variant for runway.
- Waffle: 10×10, 6px dots, 3px gap.
- Calendars: past = solid cells, **future = dashed outline**, today = lime ring.
- Inbox card: `--surface` card, 40px glyph tile in the type colour (income amber, split text2 dashed, overspend critical, sub violet s6, uncategorised grey), title 14/600, subline 12 text2, a lime pill button (36px high) on the right.
- **Badge:** lime pill, black 11/700 text, min 18×18, 2px `--base` ring, top-right of the tab icon (−4, −6).
- Motion: 200 ms ease-out; reduced-motion removes jiggle and grow-ins.

---

## 6. Open questions for the user
1. **Split repayment when the original period has closed:** should the returned money go to the same category in the *current* period (as specced), or to To assign?
2. **Home pin limit:** is 6 pinned widgets (plus the fixed hero and Subscriptions card) right, or should Home show fewer (4) to keep it short?
3. **Manual sweep ignored:** if the user never resolves the "Sweep ₹X" item, should it stay in To assign as "saved from budget" indefinitely, or expire back into Budget after the next period ends?
4. **Friend reminders:** should "Remind" on Owed to you send a UPI collect request (needs a PSP integration) or just share a message/link with the amount?
5. **Widget PIN:** should entering edit mode require the PIN every time, or only once per app unlock?

## 7. Resolved (user answers, 24 Sep; these override anything above)
1. **Split repaid after its period closed → the money goes to To assign.** It does not go back to the category in the current period. While the period is still open, it returns to the category it was spent from. A share covered from a goal always returns to that goal, pro rata. (This replaces §0.5 and §3.2 "settle" for closed periods.)
2. **Home shows 4 pinned widgets**, plus the fixed budget hero (W01) and the Subscriptions card (W40). The first 4 visible pins are shown in pin order. W26 counts only when To assign > 0; when it is hidden, the next pin moves up. (This replaces "up to 6" in §0.9, §1.2 and §2.)
3. **An unresolved manual sweep stays in To assign as "saved from budget" indefinitely.** It re-nudges each period and never moves on its own. "Keep in To assign" is a valid way to resolve it.
4. **"Remind" on Owed to you opens a share sheet with a message containing the amount and a UPI pay link** (simulated in the prototype). No UPI collect request is sent, so no PSP integration is needed.
5. **Widget "pin" means pinning widgets to Home only; no PIN code is involved.** Widget edit mode opens directly. The app PIN protects app launch only. (This replaces the PIN prompt in §0.9 and §1.9.)
