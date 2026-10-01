# Trickle v8 — Phase 4: Spec (Direction B · Tiles)

Base visual language: concepts artifact direction B (dark ink ground, lime savings, blurred tile glow). Hard constraint: **no text-message tracking** — linked UPI IDs or manual entry (+ statement import placeholder).

## 1. Tile value rules (one visual language)
| Where | 1 tile = | Colour | Notes |
|---|---|---|---|
| Budget / spend grids (Pay, Budget section, category detail, check-in) | ₹100 | category colour; empty = outlined slot | Food 24, Travel 9, Fun 8, Essentials 14 tiles. Remainder under ₹100 = one half-lit tile. |
| This payment (Pay) | ₹100, rounded up | white inset ring, then pops out | Pop sequence 60 ms/tile, capped 1.2 s. |
| Overflow (Pay, Budget) | ₹100 | amber dashed + "Over" word | Never red. |
| Income / split card, savings accumulation (Money, confirm card, period story) | ₹500 | income = bone `#EDE9DC`; to budget = grey `#B8B4A8`; to savings = lime | 9,000 allowance = 18 tiles → 12 budget + 6 savings. |
| Goals | 1% of target (10×10 waffle) | lime; pre-filled head start | Never empty (endowed progress). |
| Small-spend jar (Insights) | one spend under ₹100 | category colour | a count, not ₹. |
| Home glow | none (ambient) | calm green `#4FD18B` on pace, warm amber `#F2A93B` a bit fast | Word always paired: "On pace" / "A bit fast". |

Colour = one meaning: Food `#E8743B`, Travel `#3F8CE6`, Fun `#D55181`, Essentials `#9085E9`, Savings lime `#C6F432`, Over/fast amber `#F2A93B`. No red anywhere. Every colour signal also carries a word or icon.

Numbers only on tap: tapping any tile grid reveals its ₹ value in a small tag for 3 s.

## 2. Data model (v7 ledger reused, renamed)
- Pools: `new_money` (v7 to_assign) · `budget:<cat>` · `goal:<id>` (jars; `general` = "Rainy-day jar").
- Txn types: `opening`, `income` (→ new_money), `spend` (← budget:cat; uncategorised = `budget:Unsorted`), `transfer` (src[] → dst[], reasons: `fill`, `save`, `cover`, `sweep`, `move`, `headstart`, `goal_spend`), `settle` (friend repays → returns to the spend's category if same period else new_money then auto-saved).
- **Invariant:** `new_money + Σbudget + Σsavings == balance == Σ flows(opening + income + settle − spend)`; transfers sum src = dst. Checked after every action; written to `#inv[data-ok]`.
- **Owed to you** (IOUs) sit outside the balance until settled.
- Overspend carry: category may go negative; next period's fill adds the fixed amount, so it starts "a little lighter" automatically.
- Period: weekly or monthly (onboarding). Pace = spent/fixed vs elapsed/period. On pace ≤ elapsed+5%; else "a bit fast".
- Income rule: auto-fill each category up to its fixed amount for the current period, rest → top goal. One confirm card + Undo (undo removes the income's transfers; money stays as New money with a one-tap "Sort it").

## 3. Seed (plausible student, fixed "today" Mon 21 Sep 2026 18:30)
- Budget ₹6,000/month: Food 2,400 · Travel 900 · Fun 800 · Essentials 1,400. Allowance ₹9,000 on the 1st (Amma & Appa).
- History Jul, Aug, Sep (≈3 months) of generated UPI + cash spends (JD Canteen, Swiggy, Metro, Rapido, BookMyShow, Chai Tapri, Medical Store…), plus café-shift pay.
- Jars: Goa trip (target ₹8,000, ~₹4,200) + Rainy-day jar (~₹400). Headphones goal reached in July.
- Pending split: Pizza Hut ₹1,200 (Sep 18) — Arjun ₹300, Meera ₹300, Kabir ₹300 owe you. Uncategorised UPI: "Paytm QR payment" ₹85. Subscription: Spotify ₹119 due Thu 24 Sep (+ Coursera, Cloud).
- Actions on load: split to settle, Spotify due, categorise Paytm QR, Monday check-in.

## 4. IA
Tabs: **Home | Money | Actions | Insights**. Avatar (top-left) opens settings drawer. Overlays: Pay, Log spend, Transactions, Txn detail, Goal detail/new/reached, Check-in, Period story, Widget board edit.

## 5. Frames, top to bottom
### Onboarding (one choice per screen, tile-based)
1. **Welcome** — tile field animates into a waffle; "Money as tiles. Spend some, save the rest." · Start.
2. **Tracking** — "How should Trickle see your spends?" Link UPI ID (auto) / I'll add them myself (manual). Footnote: bank statement import later.
3a. **Link UPI** — UPI ID field prefilled `nishad@oksbi`, Link. 3b. **Manual** — "Add a spend in two taps" demo + Import statement (placeholder).
4. **Period** — Weekly / Monthly (glow follows it).
5. **Fixed budget** — tiles grow as you step ₹500 (default 6,000). One number.
6. **Categories** — suggested chips on (Food, Travel, Fun, Essentials) + add; tiles auto-divide.
7. **First goal** — Goa trip / New phone / Rainy day / Own; "We'll start it with a head start."
8. **First savings moment** — allowance tiles split into budget + savings; "₹3,000 went to Goa trip." · Open Trickle.

### Home (≤2 numbers)
Glow (blurred tile field, green/amber) + word chip "On pace"/"A bit fast" · greeting · **Pay** (primary) + **Log cash** (secondary) · Recent spends (3 rows: merchant, category dot, tile glyph; amount on tap) + "All spends" · Subscription compact tile card (next due, word only) · Pinned visuals (default: Goa waffle, Month strip).

### Pay (one decision per step)
1. Amount keypad + payee (scan placeholder / UPI ID). 2. Category (auto-suggested highlighted; one tap). 3. **Tiles** — category's budget grid; this payment's tiles ring then pop out; line: "Food can cover this." or amber "Food can cover ₹350 of this." 4. If over: amber dashed tiles + **one** choice list: Take from next month · Take from Travel (auto-picked richest category) · Take from Rainy-day jar. 5. UPI hand-off (Pay with UPI app, placeholder). 6. Done — savings moment "Goa trip is still 53% full" + optional "Split it".

### Log spend (manual)
Amount → suggested category (one tap) → saved; ends "Your Goa jar is untouched."

### Money (≤3 numbers)
Balance (1 number) · accordion (one open, animated): **Income** (last income as 18 tiles split; history rows; "Add income") · **Budget** (per-category tile grids, tap for value; carry note in words) · **Savings** (goal waffles, Rainy-day jar, Owed to you row + Remind, "New goal", leftover sweep Auto/Manual). New money banner only when unsorted money exists.
Income arriving: confirm card (tiles fly to budget + savings) "Got it" / Undo.

### Actions (≤3 numbers)
Inbox of one-tap cards, each with smart default + "Other" disclosure: Settle split (Mark Arjun paid → repayment returns to Food) · Spotify due (Keep it / Pause reminder) · Categorise (suggested Food, one tap; remembers payee) · Monday check-in · Month-end leftover (Save to Goa / Keep for next month) · Café pay arrived (auto-split). Empty state: calm tile + "Nothing needs you."

### Insights (widget board)
Widgets: Where it went (category waffle), Small spends add up (count tiles), Savings growing (month tile stacks), Time of day (simple bars), Weekday pattern (simple bars), Subscriptions (tile per sub), Owed to you. Each: Pin to Home / Hide; Edit mode reorder ↑↓; hidden list to restore.

### Rhythm
Monday check-in: 3 tile cards (Last week by category · Savings added · One nudge) → ends on savings. Period-end story: 4 cards (Spent in tiles · Small spends · Leftover → Goa · "You saved ₹X") → Start fresh: tiles reset animation, glow calms, next allowance auto-splits.

### Drawer
Tracking (UPI IDs / manual) · Import statement (placeholder) · Budget period · Fixed budget · Categories · Leftover sweep Auto/Manual · Reduce motion · Replay onboarding · Demo controls (pace, café pay arrives, check-in, month end).

### Transactions
List grouped by day with amounts (a detail screen, numbers allowed) + filter chips; detail: amount, category (change), source (UPI ID or Manual), split / owed, covered-by note.

## 6. Numbers-per-screen budget (first view)
| Screen | Budget | Which |
|---|---|---|
| Home | ≤2 | none by default (goal % on tap) |
| Money | ≤3 | balance |
| Actions | ≤3 | amounts only inside cards (friend owe total) |
| Insights | ≤3 | none on first card |
| Pay tiles step | 2 | payment amount, what category covers |
| Goal detail | 2 | saved, target |

## 7. Copy
"New money" (not To assign), jars, "Moved", "A bit fast", "Next month starts a little lighter", never "over budget", never "debt".
Accessibility: 44px targets, word+icon with every colour, animations ≤1.2 s, all disabled under prefers-reduced-motion or the drawer toggle.
