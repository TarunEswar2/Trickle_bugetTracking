# Trickle v8 — Phase 1: Understand + Audit

Source audited: `trickle-final-v7.html` (57 frames + 8 sheets), `#demo` UPI path, 420×880 viewport. Screenshots: `scratchpad/shots8/*.png`, raw counts `audit8.json` (script `audit8.js`: counts digit tokens in HTML + SVG text, in first screen and full scroll; SVG count; tappables; red-coloured elements).
Hard constraint carried forward: **no SMS tracking** — linked UPI or manual entry (+ import).

## 1. What the feedback says (synthesis)
| Signal | What it means | Root cause in v7 |
|---|---|---|
| "Too much information, I don't know what I'm looking at" | No single focal point; the eye has nowhere to land | Home stacks hero + chip + pay row + 4 pinned widgets + small purchases + subs + recent: ~75 numbers, 24 SVGs |
| "Every screen is numbers" | Numeric literacy is demanded before meaning is given | Money tab 103 numbers; Insights 360; Transactions 558 |
| Panic on open → quit | Ostrich effect: bad news on open trains avoidance | Home hero leads with ₹155 "safe today" + red "Carried from Aug −₹240" row |
| Budgeting is tedious | Too many decisions per period | 5-item inbox, assign-income, sweep Auto/Manual, covers, split settling, categorise |
| Savings is the motivator | Goals are buried on tab 4 | Savings hero (64%) is good but not visible from Home |
| Payment should feel like cash | Friction exists but is a spreadsheet | coverSheet: 4 options, 29 numbers, step-line chart at the moment of paying |
| Income split at a glance | The model has 3 pools + "To assign" + sweep rule | onbAllocate: 54 numbers, pie with 9 callouts + 7 sliders |

## 2. Per-frame audit (v7)
"Numbers" = digit tokens visible (first screen / full scroll). Decisions = distinct choices the user is asked to make on that frame.

| Frame | Numbers (1st screen / total) | Charts (SVG) | Decisions | Red / alarm |
|---|---|---|---|---|
| Home | 12 / 75 | 24 | 6 (inbox chip, 3 pay modes, Assign, edit widgets) | red carry row, gauge |
| Money | 24 / 103 | 25 | 4 (period switch, pool tiles, Remind, See all) | ▲ spend deltas |
| Actions | 15 / 15 | 9 | 5 inbox items × 3 (primary / … / Later) = 15 | red "Snacks over" tile |
| Savings | 20 / 47 | 15 | 3 (Auto/Manual, goal tiles, +Goal) | – |
| Insights | 14 / 360 | 84 | many (filters, pins, edit) | 49 red-ish marks |
| Transactions | 34 / 558 | 1 | filter chips, 199 tappables | 63 red-ish marks |
| payAmount | 2 / 5 | 3 | 2 (category, split) | "₹240 over" in red |
| coverSheet | 13 / 29 | 6 | 4 cover sources + change amount | red over-bar |
| payConfirm | 6 / 6 | 2 | 0 | – |
| assignIncome | 11 / 13 | 2 | 3 | – |
| logSpend | 13 / 16 | 3 | 3 | – |
| onbAllocate | 31 / 54 | 10 | 1 split + 7 category sliders | – |
| sweepSplit | 6 / 7 | 2 | 3 | – |
| goalDetail | 13 / 18 | 2 | – | ▼ slip markers |
| overspendResolve | 17 / 37 | 7 | 4 | red deficit |
| categorise | 4 / 5 | 0 | 3 guesses + rule | – |

**Headline:** the four main tabs show **~325 numbers** on a full scroll before Insights (Home 75, Money 103, Actions 15, Savings 47) and **>900** including Insights + Transactions. Home alone has ~6× the target of 1–2.

### Taps to core jobs (v7, from Home)
| Job | Taps | Notes |
|---|---|---|
| Pay someone (under budget) | 4 (Scan → amount → category → Pay) + UPI app | fine |
| Pay (over budget) | 6 (+ cover sheet choice + confirm) | the cover sheet is the heaviest screen in the flow |
| Log cash spend | 4 (Actions → Log spend → keypad → Save) | category picked manually |
| See "am I okay?" | 0 but ambiguous: ₹155 vs ₹1,598 vs ₹1,820 vs gauge | 3 different "left" numbers |
| See savings progress | 1 (Savings tab) | not on Home |
| Handle new income | 2–3 (inbox → Assign by rule) | but asked every time |
| Settle a split | 3–5 | people picker, equal/custom |

## 3. Anxiety triggers
1. Red on Home (carry −₹240), red over-bars in pay/cover/overspend, ▲/▼ deltas coloured as alarms.
2. Deficits framed as debt: "Carried from Aug", "Snacks ₹240 over", "slip +15 days".
3. Dense tables/lists: Transactions (558 numbers), Insights board (84 charts).
4. Badge "5 things need you" — an unread-count that grows, a to-do list about money.
5. Multiple competing "how much left" figures; uncertainty itself is anxiety.
6. Goal slip markers (▼) punish withdrawals from savings.

## 4. Where tedium comes from
- Manual categorising of unknown UPI payees (PAYTM*QR7731).
- Inbox volume: every income, overspend, split, subscription and unknown payee becomes a card.
- Assigning each income by hand ("To assign" exists because assignment is a separate step).
- Leftover sweep decision each month (Auto/Manual).
- Splits: equal/custom, people pickers, settle-later, remind, mark repaid.
- Covers at payment: choose among four money sources.
- Widget curation (pin, edit mode, library) — configuration as a chore.

## 5. Jargon → plain language
| v7 term | Why it hurts | v8 candidate |
|---|---|---|
| To assign | accounting verb, unclear state | "New money" / "Not sorted yet" (ideally invisible: auto-sorted) |
| Pools | system noun | "Spending" and "Savings" (two jars) |
| Transfers / Move money | banking | "Move to savings" / "Take from savings" |
| Sweep / leftover sweep | ops term | "Month-end top-up" ("what's left goes to savings") |
| Cover / let it go over | debt framing | "Use from…" / "Borrow from next month" |
| Carry / carried | debt | "Next month starts a little lighter" |
| Invariant, settle, IOU | internal | "Paid back", "Friends owe you" |
| Budget runway / safe to spend | two metrics for one idea | one ambient pace state |
| Underfunded | accounting | "Needs a top-up" |

## 6. Core jobs (ranked by frequency)
1. **Pay** (daily, several times) — with a gentle, cash-like pause.
2. **Glance: "am I okay?"** (daily) — answered by colour, not a figure.
3. **Get a small win: "my savings grew"** (daily/weekly).
4. **Log a cash spend** (few times a week) — seconds, no categorising decision.
5. **Understand habits: "where do small things go?"** (weekly).
6. **New income arrives** (monthly/irregular) — one glanceable confirm, rule does the split.
7. **Month-end** (monthly) — leftover goes to savings automatically; a short story.
8. Splits, subscriptions, settings (occasional) — hidden depth.

## 7. Emotional arc of a good session
1. **Open → reassurance (0–2 s):** calm glow, no figure, no badge count. "You're on pace."
2. **Recognition (2–5 s):** one positive fact about savings ("Goa trip: 2 weeks closer").
3. **One action (5–30 s):** pay, log, or confirm a single item (at most one prompt surfaced).
4. **Positive end:** confirmation that ends on savings/progress, never on a deficit. Close.
Bad news appears only where it can be acted on: at payment, or on the Budget tab the user chose to open.
