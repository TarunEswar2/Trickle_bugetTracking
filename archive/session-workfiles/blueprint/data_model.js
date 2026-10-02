const ENTITIES=[
{n:"Link",f:"mode (UPI | manual), bank, status (ok | needs refresh | none), linkedAt, lastSeen",note:"Manual mode stores a typed balance instead of a bank balance."},
{n:"Income",f:"id, label ('Allowance'), amount, arrivedOn, lastsWeeks (1, 2, 4.3 or custom), splitSavings, splitBudget, remindMonthly",note:"Created by the user (never auto-detected, O-26). Each income has a weekly share = budget ÷ lastsWeeks."},
{n:"Week",f:"startsMon, endsSun, weeklyBudget (flexible), fixedReserveAdded, status (open | closed), weekEndChoice (savings | nextWeek), movedTo",note:"Monday to Sunday (D-1). Closed by the week-end pop-up."},
{n:"Category",f:"id, name, colour (top five coloured, rest peach), weeklyAmount, spentThisWeek, archived, order",note:"From the library of 50 or user-made. Max 30 active (D-18). Remaining = weeklyAmount − spent (can reach 0, then the cascade)."},
{n:"Buffer",f:"weeklyAmount (what is left of the flexible budget after categories), spentThisWeek",note:"Always present, cannot be removed (O-16). First to pay for overspending."},
{n:"FixedBill",f:"id, name, amount, every (month | 3 months | year), nextDue, source (UPI | manual), reserveBalance",note:"Reserve fills weekly (amount ÷ weeks in period) and drains when paid (D-7)."},
{n:"Transaction",f:"id, amount, payee, categoryId | goalId | fixedBillId | unsorted, when, via (trickle | detected | manual | import), upiRef, note, hidden, fromBreakdown {category, buffer, others, savings}",note:"Unsorted ones are charged to the buffer until sorted (D-11)."},
{n:"Goal",f:"id, name, target, byDate (optional), saved, state (active | reached | done), createdOn, reachedOn, plannedPerMonth",note:"Needed per month = target ÷ months left, rounded up to ₹10 (D-20)."},
{n:"FreeSavings",f:"amount",note:"Savings not given to any goal. Receives week-end money when there are no goals, completion leftovers and deleted goals' money."},
{n:"Move",f:"id, from (pot), to (pot), amount, when",note:"Reassigns money between pots; nothing leaves the account (F-5)."},
{n:"Habit (derived)",f:"key (merchant or kind), count30, times by hour/weekday/day",note:"Same place or kind, 3 or more times in 30 days (V6-1). Not stored; computed."},
{n:"Settings",f:"pin (hash), biometric, autoLockSec, notif {weekEnd, billHeadsUp, allowance}, quietHours, weekEndTime",note:"Local only (D-31)."}
];
const MODEL_RULES=[
{t:"Pots and the invariant (D-3)",b:"income = budget + savings. budget = fixed reserve + categories + buffer. savings = goals + free savings. Every rupee is in exactly one pot; no pot can go below zero. Moves and the cascade only transfer between pots."},
{t:"Weekly budget (D-4, D-5)",b:"Each income i gives a weekly share budget_i ÷ lastsWeeks_i until it runs out. Weekly budget W = sum of active shares. W_fixed = fixed bills' weekly reserve; W_flex = W − W_fixed is shared by categories and the buffer. Monthly figures are weekly × 4.3."},
{t:"The grid scale (D-35)",b:"Every grid is 10×10. 1 box = amount ÷ 100, shown as '1 box = ₹X' and rounded to the nearest rupee with '≈' when not whole. Category amounts move in ₹5 steps. A goal's grid is its target ÷ 100."},
{t:"Home gauge (D-36)",b:"The one grid on Home covers W_flex: all categories plus the buffer, money left. Fixed bills are not in it. No scale on Home."},
{t:"The cascade (O-23, D-22)",b:"Overage = payment − category remaining. Take from the buffer first; then the other categories equally (never below spent); then free savings; then goals in proportion to their saved amount. If still short (rare), the rest is recorded as unfunded and shown in words."},
{t:"Week-end (D-6)",b:"unspent = (sum of category remainders) + buffer remainder. Savings: split equally across the chosen goals (all by default); none → free savings. Next week: add equally to all categories and the buffer. The fixed reserve is excluded and stays reserved."},
{t:"Fixed reserve (D-7)",b:"Each week add monthly_total ÷ 4.3 (3-monthly ÷ 13, yearly ÷ 52) to the reserve. A bill payment drains its reserve. Reserve short at payment: cascade and say so."},
{t:"Goals (D-20, D-21)",b:"neededPerMonth = ceil10(target ÷ monthsLeft). ETA = remaining ÷ average of the last three months' actual additions (else the planned pace). Reached when saved ≥ target; Done when the user says so (or pays from it and says yes). Celebration once."},
{t:"Unsorted (D-11)",b:"Until sorted, an Unsorted payment is charged to the buffer. Sorting moves the charge to the chosen category (and the cascade is recomputed)."},
{t:"Past weeks (D-14)",b:"Edits to a closed week change that week's history and the look-back, never current budgets and never week-end decisions."},
{t:"Rounding and format (D-2)",b:"Whole rupees internally. Display rounds to ₹5 under ₹1,000 and ₹10 above, except the confirmation record, which is exact. Indian digit grouping (₹1,50,000)."}
];
const GAPS=[
["Time","No definition of a week, or of how weekly and monthly relate.","Monday to Sunday; 4.3 weeks a month; weekly is primary (D-1, D-2, D-5).","Do students think in weeks? Test."],
["Time","V1-6 said monthly budgets split into weeks; onboarding made weekly the input.","Weekly primary; the monthly figure is derived (D-5).","—"],
["Income","The split assumed one income a month; irregular and several incomes unsolved.","'How long should this last?' on every split; weekly shares add up (D-4).","Does the question feel natural?"],
["Income","Mid-month income arrives while the old money is still running.","New share added to W; nothing is reset (D-4).","—"],
["Income","A credit that is not income (a friend's ₹200).","Credits never auto-treated (O-26); Add money → back into a category; the tray waits quietly (D-13, D-19).","Does the tray get forgotten?"],
["Fixed bills","V1-7 (fixed group, not gauges) conflicts with O-20 (fixed bills come off the week).","A separate reserve, not a gauge: filled weekly, drained on payment (D-7).","Is the reserve understood?"],
["Fixed bills","Irregular bills (3-monthly, yearly) do not fit a weekly reserve.","Reserve amount ÷ weeks in the period (D-7).","—"],
["Fixed bills","No heads-up on Home (parked), and V11-3 forbids ₹ on Home.","One words-only line when due within 2 days (D-9).","—"],
["Payments","'Pay' undefined: does Trickle move money?","Trickle's pay screen opens the user's UPI app; success is confirmed on the link (D-10).","Can the app really read UPI payments? Test first."],
["Payments","Payments made in other apps would escape the budget.","Detected, categorised from memory or Unsorted, charged to the buffer meanwhile (D-11).","Does 'sort later' work?"],
["Payments","The same payment could be counted twice.","Matched on amount, payee, 10 minutes (D-12).","—"],
["Payments","No slow-payment state.","'Waiting for your bank' after 60 s (D-10).","—"],
["Payments","Pay screen versus manual tracking.","Same merged screen, 'I already paid' (D-30).","—"],
["Budget","V1-2 required ₹100 steps; sliders move in ₹5.","1 box = amount ÷ 100, shown as ≈ when not whole (D-35).","Is '≈' readable?"],
["Budget","Editing the budget mid-week could go below what is spent.","Slider minimum = spent so far (D-17).","—"],
["Budget","V1-8 (suggest a budget after 2 weeks) clashes with the guided onboarding.","Everyone has a budget at start; offer 'Re-fit from your weeks' after 4 weeks (D-5).","—"],
["Budget","Category lifecycle (add, delete, merge) undefined.","Funded from the buffer; delete returns the remainder; history moved or archived; max 30 (D-18).","—"],
["Week-end","Timing and missed weeks undefined; fixed reserve and buffer unspent unclear.","Sunday 8 pm or next open; queue newest first; reserve excluded; buffer included (D-6).","Is a Sunday pop-up annoying?"],
["Week-end","Manual users' balances drift.","Weekly balance check; the difference is 'unlogged spends' (D-15).","—"],
["Goals","Savings per month versus week; ETA with irregular additions.","Goals are monthly; ETA uses a 3-month average (D-20).","—"],
["Goals","Reached versus done, and celebration triggers unclear.","Two states; one celebration; trigger list; never mid-flow (D-21, D-23).","—"],
["Goals","Leftover and deleted-goal money has no home.","Free savings pot (D-20, D-21).","—"],
["Goals","Overspending into savings would silently hurt goals.","Free savings first, then proportionally, and the goal screen says so (D-22).","Does it feel fair?"],
["Edits","Editing or deleting transactions undefined.","Edit rules, 'Not mine', past weeks are history only (D-14).","—"],
["Edits","Split payments (placeholder) would need a whole feature.","Out of scope; use Add money → back into a category (D-16).","Do students split often? Ask."],
["Security","PIN recovery with no account.","Reset with the phone's lock; data stays (D-27).","—"],
["Notifications","Amounts on a lock screen are private.","Never any ₹ in a notification (D-28).","—"],
["Privacy","Where data lives.","On the phone; CSV export; delete everything (D-31).","—"],
["Empty states","Nothing defined for a new user.","Words for every screen (D-32).","—"],
["Access","Colour carries too much meaning (many categories, one peach).","Names accompany every colour; tap a box to name it; screen-reader labels (D-33).","Test with colour-blind users."]
];
const AMOUNT_RULES=[
["Home","One sentence and the week's grid. No ₹ and no scale.","Opening the week shows the scale chip.","Any ₹ figure, big numbers.","V11-3"],
["Week-end pop-up","Grid, rupees left, scale chip. Over: amount large in amber.","Goal choice shows each share.","Red.","V5-8, V5-10"],
["Income","Split grid, names in drop-downs, scale chip.","Each part's amount.","Numbers on boxes.","V3-9, V3-11"],
["Spending rings","Colour-coded rings, name list.","A category opens its screen.","Numbers on rings.","V1-9"],
["Category detail","Grid, scale chip, words.","Exact left and budget.","Red.","V1-4"],
["Pay screen","Amount, grid with ghost, one line in words.","Where it comes from (amounts under the strip).","Red, shake, timers.","V2-3, F-7"],
["Fixed bills","Calendar, sentence, list with amounts.","A day gives its bills.","Amounts in the glow.","V8-4"],
["History","Rows: name, time, amount; day totals.","The purchase's own screen.","Notes on rows.","V10-3"],
["Savings page","Ring, goal rows (name, how far, ETA).","A goal's statistics.","Amounts on the ring.","V4-8"],
["Confirmation records","Exact amounts (pay, move).","—","—","F-4, F-5"],
["Notifications","Words only.","—","Any ₹.","D-28"]
];
const FORMS=[
["Fuel grid (10×10, liquid from the bottom)","Home gauge, category detail, budget handling, goals in setup","V1"],
["Nested rings","Spending overview","V1-10"],
["Segmented ring","Savings overview (sections by target, shades by saved)","V4-17"],
["Income-split grid","Income tab","V3"],
["Hotspot calendar","Repeats, When you spend, Fixed bills, goal By day","V6-4, V8-2"],
["Two grids side by side, earlier one faded","Category compare, this week vs last","V1-14, V9-3"],
["Crumble and ghost","Pay screen","V2"],
["25-box strip","Pay screen 'Where it comes from'","F-6"],
["Amber and green boxes","Goal By month; week-end pop-up","V4-6, V5"],
["Box tiles (dot, name, word)","What-for chooser, move, sort tray, edit","F-2"]
];
const NEXT={
stages:[["Done","Facts, principles, 11 visualisations, onboarding, pay, move money; whole-app blueprint (this file)."],["Next: visualisation","Design the composition of each tab (what is on each screen and in what order), and any visual forms still missing."],["Then: mockup","High-fidelity screens from the blueprint, one tab at a time, in Figma and clickable HTML."],["Then: build","The v14 build from the blueprint (React Native, local-first)."],["Then: user tests","Never run. Six interviewees plus new students against the blueprint's open questions."]],
viz:["Home composition (sentence, grid, optional lines, Pay button, gear)","Income tab composition (grid, Add money, money-in list)","Spending tab scroll order and spacing (rings → repeats → fixed → history)","Savings tab composition (ring, rows, Completed, free savings, Add a goal)","Insights composition and what else belongs there","Settings (a calm list, plus the data and link screens)","Lock screen, empty states, banners","Motion: crumble, week-end amber→green, celebration, ring fill","Identity: logo, colour tokens, type, icons for categories"],
tests:["Do students understand a weekly budget when they get money monthly?","Can people read the 10×10 grid and the '1 box = ₹X' chip without help?","Does 'sort later' work for payments made in other apps, or do they pile up?","Is the buffer understood as 'spare money', and is the overspend cascade felt as fair?","Does the week-end pop-up on Sunday help, or annoy?","Can a student set up in under four minutes?","Is Add money by hand something they will keep doing, or forget?","Does the 25-box strip make 'where it comes from' clear?","Can a real app read UPI payments at all? (assumed, never checked)"]
};
const REFEXTRA={"SPD-1":["V1-3","V1-7"],"ONB-9":["V1-2","O-4","D-35"],"HOME-1":["D-36","C-3"],"ONB-7":["D-2"],"SAV-1":["V4-2"],"SAV-2":["V4-7","V4-11","V4-13"],"SPD-5":["V11-1","V11-2"],"SYS-4":["D-33","D-34"],"INS-1":["D-34"],"PAY-6":["D-16"],"ONB-12":["O-25"],"PAY-1":["V4-7"]};
Object.keys(REFEXTRA).forEach(k=>{const s=SCREENS.find(x=>x.id===k);if(s)s.r=[...new Set([...(s.r||[]),...REFEXTRA[k]])]});
