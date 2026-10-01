# Trickle v6 — Phase 3 Design Spec

Inputs: `v6_phase_plan.md`, `v6_phase1_audit.md`, `v6_phase2_catalogue.md`, `design_brief_v3.md`, `trickle-final-v5.html` (31 frames + 9 sheets).
**Hard constraint: no SMS tracking anywhere.** Tracking = UPI account linkage or manual entry. No SMS permission, copy, lane, fallback or data field.
v3 brief guard: no one-off illustration metaphors — every visual below is a real chart computed from the data model, or a node diagram of real app state (accounts, permissions).

---

## 0. Key decisions

1. **Ref 1 → category share.** Concentric radial arcs, one ring per category, **common angular scale: 0–100% = 0–270° on every ring**, so angle (not arc length) encodes share. Every ring is direct-labelled with its % at the ring start + a callout chip with icon. Rings ordered largest share outermost (outer-ring length bias works *with* the ranking, not against it) and max 6 rings + "Other". Paired with a ranked row list for precise comparison. Primary on **Categories** and **onboarding category step / All-set preview** (same component, empty-state = ghost starter budget).
2. **Ref 2 → month-wise category spending.** Pie (this month, ≤5 slices + Other) with leader-line callouts, and beneath it one **"fill jar" column per category**: 6 stacked month cells (oldest bottom), each cell's fill height = that month's spend ÷ that category's monthly budget (capped 100%, overflow shown as a notch above the cell). % above each jar = this month's share. Primary on **Categories → Monthly** view; one mini jar row on Insights "Money shape".
3. **Ref 4 layout language** used system-wide: callout labels, icon-in-center donuts (goals, subscriptions), small-multiple radial gauges (part-of-day), 24h time-of-day radial (Insights), half-donut (Home safe-to-spend), 24h area strip (accumulation detail).
4. **Chart budget rule:** no form is a *primary* visual on more than 2 screens (see §4 matrix). Supporting micro-marks (bullet bar in a list row, dot row) are components, not primaries.
5. **Accent is no longer green.** v5 accent `#5bb98c` clashed with two category greens. v6 accent = warm ivory `#EDE9DC` (dark text on it), categorical palette drops the green slot entirely (7 slots). Pace state uses the reserved status palette with icon + label.
6. **Sankey source fixed**: flows start at "This month's spend ₹X" (not balance), right-hand labels unclipped (2-line wrap).
7. **Bubble overlap removed**: merchant bubble → ranked horizontal bars (top 6) with tap values.
8. **2-slice donut removed**: fixed vs discretionary → 100% meter bar.
9. **"Typical day" triplet collapsed** (heatmap + range strip + diverging bars answered one question) → one card: calendar heatmap with a range strip under it; diverging bars dropped.
10. **Dot-grid ×3 collapsed**: accumulation now = pictogram purchase rows (Home) and 24h strip (detail); waffle and Insights dot-matrix removed.
11. **CSS bugs**: delete light-era vars (`--line`, `--panel2`, `--ink2`), all `#fff` input backgrounds → `var(--surface2)`; inputs share `.field`.
12. **Onboarding = 8 frames** (adds `onbAllocate`), each with a live visual built from the user's own choices.

---

## 1. Visual system

### 1.1 Palette (dark, surface `#17181a`)
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0d0d0e` | page base |
| `--surface` | `#17181a` | cards / chart surface |
| `--surface2` | `#212226` | nested, inputs, bar tracks |
| `--surface3` | `#2a2b30` | pressed, empty cells |
| `--text` / `--text2` / `--text3` | `#f4f4f3` / `#a9aaad` / `#75767a` | ink; `--text3` = axis/muted |
| `--grid` | `#2a2a28` | hairline gridlines |
| `--accent` | `#EDE9DC` | primary CTA fill, selection, hero numerals; text on accent `#141414` |
| `--ghost` | `rgba(237,233,220,.14)` | empty-state / starter-budget ghost marks |

**Categorical (fixed order, never cycled, color follows category not rank):**
| Slot | Hue | Hex | Default category |
|---|---|---|---|
| s1 | blue | `#3987e5` | Food |
| s2 | orange | `#d95926` | Snacks/Beverages |
| s3 | aqua | `#199e70` | Groceries |
| s4 | yellow | `#c98500` | Transport |
| s5 | magenta | `#d55181` | Necessities |
| s6 | violet | `#9085e9` | Stationery |
| s7 | red | `#e66767` | Buffer |
| other | gray | `#6b6c70` | Other / folded tail (≥8th category) |

Categories get their slot at creation time (`cat.slot`) and keep it forever; a user-added category takes the next free slot; beyond 7 → folds into Other in charts (still listed in rows).

**Status (reserved, only for pace/budget state, always with icon + word):** good `#0ca30c` ✓ "On track" · warning `#fab219` ◐ "Near limit" · serious `#ec835a` ▲ "Will exceed" · critical `#d03b3b` ● "Over". Never used for a category.
**Sequential (heatmaps, time radial):** blue ramp `#184f95 → #3987e5 → #86b6ef` (600→250 step), empty = `--surface3`.
**All-pairs forms (scatter/overlap)** cap at 3 hues: s1, s2, s3.

**Validator output** (`validate_palette.js --mode dark --surface "#17181a"`):
```
Palette (dark, surface #17181a, categorical): 7 slots
  [PASS] Lightness band         all 7 inside L 0.48–0.67
  [PASS] Chroma floor           all 7 >= 0.1
  [PASS] CVD separation         worst adjacent #c98500↔#199e70 ΔE 8.4 (protan) · tritan 8.7
  [PASS] Normal-vision floor    worst adjacent #d55181↔#c98500 ΔE 19.3 (normal)
  [PASS] Contrast vs surface    all 7 >= 3:1
  → ALL CHECKS PASS

(--pairs all, first 3 slots)
  [PASS] CVD separation         worst all-pairs #199e70↔#d95926 ΔE 9.4 (deutan)
  [PASS] Normal-vision floor    worst all-pairs #199e70↔#3987e5 ΔE 20.9
  → ALL CHECKS PASS
```
(First attempt `blue,orange,yellow,magenta,violet,red,aqua` FAILED: yellow↔orange adjacent ΔE 4.8 CVD / 10.6 normal — hence the order above.)

### 1.2 Type scale (system sans, one family)
| Role | Size / weight | Use |
|---|---|---|
| Hero | 34/700, proportional figures | balance, safe-to-spend, chart center totals |
| H1 | 22/650 | frame title |
| H2 | 16/600 | card headline (plain-English finding, Fi-style) |
| Body | 14/400 | copy |
| Label | 11/600 uppercase, +0.06em | card kicker, stat label |
| Data | 11/500 tabular-nums | axis ticks, callouts, tooltip values |
| Micro | 9.5/500 | ring % labels, jar % |

### 1.3 Card anatomy (one pattern everywhere)
`Kicker (Label, text3)` → `Headline finding (H2, text)` → `Chart (fixed height 140/180/240)` → `Legend or direct labels` → `Footnote (Data, text3: period + source "UPI + manual")`. Padding 16, radius 16, 1px `--border`, 12px gap. Only the tapped card lifts (`--surface2`). Stat triads use the same kicker/number/delta anatomy with a 28px sparkline under the number.

### 1.4 Callout style (Ref 4)
Leader line 1px `--text3`, elbow at 8px, ends in a chip: 16px category icon in the slot color + name (Data, text2) + value (Data 600, text). Callouts placed on alternating sides, collision-resolved by vertical relaxation (min 18px spacing); if >5, tail folds into "Other". Text never wears series color; the icon carries identity.

### 1.5 Tap / tooltip behaviour
- Every chart mark has a hit target ≥ 32px (invisible wider path/rect).
- **Tap** a mark → it stays full color, siblings dim to 35%, a tooltip chip appears anchored above the mark (surface3, 1px border2, Data text): `Name · ₹value · share% · period`. Tap outside / same mark → dismiss. Line/area: tap-drag scrubs a crosshair with value at the nearest day.
- Tap on a legend item = tap on its series. Double-tap a category ring/slice → navigate to `categoryDetail`.
- Tooltips never cover the tapped mark; flip below when within 40px of card top.
- `prefers-reduced-motion`: no grow-in animation; charts render final state.

### 1.6 Density rules
- Max **2 charts per card**, **1 primary chart per viewport** (412×~720).
- Max 7 series + Other; direct labels only when ≤4 series or radial rings (one % per ring).
- One number per mark max; no value on every point of a line (endpoint + tapped point only).
- Row lists carry **one** micro-chart per row (v5 had three).
- Minimum label size 9.5px; truncate merchant names only with tooltip reveal of full name.

---

## 2. Onboarding reimagined (8 frames)

Progress indicator on every step: a 270° **step arc** around the step number (fills 1/5 … 5/5), replaces 4 dots.

| # | Frame | Visual | Data | Tap behaviour |
|---|---|---|---|---|
| 0 | `splash` | Animated preview of the product's core chart: demo concentric radial arcs (7 slots) sweeping in from 0°, labelled "Sample data". Wordmark centered in the rings. | Static demo shares (28/18/14/12/10/10/8%). | Tap a ring → shows its demo label. "Get started". |
| 1 | `method` | **Two-lane flow diagram.** UPI lane: `Your UPI apps → linked UPI ID(s) → Trickle logs automatically`. Manual lane: `You pay (any mode) → tap + in Trickle → logged`. Each lane ends in a mini "what Home shows" thumbnail (UPI: pay tiles + auto list; Manual: Enter Transaction button). A footer row: "Neither lane reads your messages." No third lane. | tracking choice | Tap a lane = select it (lane lights in accent, other dims). |
| 1b | `upiSetup` | **Linkage node diagram**: phone node → one node per added UPI ID (bank initial badge, e.g. "S" for @oksbi) → Trickle node; edge draws in when ID is added, status dot "linked". Input stays below. | `ACCOUNTS[]` with `handle`, `bank` | Tap node → remove/rename. |
| 2 | `onbCategories` | **Live radial starter budget** (the Categories hero component, ghost mode): each chip added grows a new ring at a default student share; removing a chip retracts the ring and re-normalises. Center: "7 categories". Recommended chips below; search field `.field` (dark, bug fixed). | chosen cats, default weights (Food 28, Snacks 12, Groceries 16, Transport 12, Necessities 14, Stationery 6, Buffer 12, others 6) | Tap ring → name + default share. |
| 3 | `onbAllocate` **(new)** | **Allowance → allocation.** Hero input "Monthly allowance ₹8,000". Below: **pie with callouts** (Ref 2 top half, preview of the Monthly view) — slice per category; each category row has a slider (₹ step 50); moving a slider re-sizes the slice live and the "Unassigned ₹X" gray slice absorbs the difference (YNAB "give every rupee a job"). | allowance, cat.monthly | Tap slice → focuses that row's slider. |
| 4 | `pin` | **Visual PIN**: two rows of 4 dots; row 1 fills per digit, row 2 fills below; on match both rows snap into alignment and turn accent; mismatch = row 2 shakes + clears. Custom keypad (no system keyboard). | pin digits | — |
| 5 | `permissions` | **Permission → feature diagram**: left column 3 toggles (Notifications, Contacts, Camera); right column a miniature Home with the tile each unlocks (budget nudges banner / Pay Anyone / Scan QR); a connector line lights when toggled on, tile greys out when off. No SMS row, ever. | perms{} | Tap toggle or tile. |
| 6 | `allSet` | **Preview dashboard**: their real categories rendered as the radial arcs with the allocated budgets (ghost), a half-donut "Safe to spend today ₹X" computed from allowance ÷ days in month, and an account linkage mini-diagram. Caption: "This fills in as you spend." | allowance, allocation, accounts, tracking | Tap ring → shows budget. "Open Trickle". |

---

## 3. Every frame — charts, data, tap

`P` = primary visual, `S` = secondary. Periods default to current month unless noted.

### Home & accumulation
| Frame | Charts | Exact data | Tap |
|---|---|---|---|
| `home` | **P: half-donut "Safe to spend today"** (Ref 4): arc = today's spend vs today's safe amount; center hero ₹left. Safe = (Σ monthly budgets − month spend) ÷ days left. Status icon+word under it. | txns month, cat budgets, date | Tap arc → spent/safe values. |
| | S: stat triad Today/Week/Month + 7-pt sparkline each | daily totals last 7 d / 7 wk / 6 mo | Tap tile → Insights section. |
| | S: **Streak dots** row (last 14 days, filled = under daily budget) | daily totals vs Σ daily budgets | Tap dot → date + ₹. |
| | S: Accumulation card → **pictogram rows**: top 3 repeat merchants this week, one icon per purchase, row end = ₹ total | merchant, count, amt (week) | Tap row → accumulationDetail. |
| | S: **Sankey-lite** "Where this month went": source "This month ₹X" → 5 categories + Other → top merchant each | month txns | Tap flow → value, share. |
| | S: Subs due strip: next 3 due as dated chips with days-left ring (tiny icon donut) | subs next due | Tap → subDetail. |
| | S: Recent txns 5 rows, category-slot dot + source badge (UPI/Manual) | txns | Tap → transactionDetail. |
| `accumulation` | **P: ranked pictogram** (isotype): every repeat merchant (≥3 buys/30d), one glyph per purchase, glyph color = category slot, row total ₹ + "₹/yr at this pace" | merchant counts 30 d | Tap glyph → date/time/₹ of that purchase. |
| `accumulationDetail` | **P: 24h area strip** (Ref 4 12h/24h strip) of purchases at this merchant by hour (+ dots per purchase above it); **S: tally → annualised bar** (this month count × avg × 12 vs category monthly budget ×12) | merchant txns 6 mo, ts→hour | Tap dot → purchase; tap bar → ₹/yr. |

### Transactions / detail / manual
| Frame | Charts | Data | Tap |
|---|---|---|---|
| `transactions` | **P: day-strip column sparkline** above the list = daily totals of the *filtered* set (last 30 d), updates with search/category filter; columns tinted by selected category slot or neutral | filtered txns by day | Tap column → scrolls list to that day. |
| `transactionDetail` | **P: merchant range strip**: min–median–max of this merchant (6 mo) with this txn as marker; **S: 24h clock tick** — a small ring with this txn's hour marked among the merchant's usual hours; **S: category budget bullet** showing this txn's share of the month's category budget | merchant history, cat budget | Tap marker → "₹X is N% above your usual here". |
| `manualEntry` | **P: live budget-impact bullet** (same component as friction sheet): spent / this entry / left + pace tick, updates as amount & category typed; account/source chip "Manual" | cat spend, amt input | Tap segments for values. |

### Payment flow (UPI)
| Frame | Charts | Data | Tap |
|---|---|---|---|
| `scan` | Scan box (functional); quick category pill shows slot color | — | — |
| `payAnyone` | Per-contact **micro bar** of last 30 d paid (one hue, text3 scale) | contact payee totals | Tap → pay. |
| `bankTransfer` | S: linked-account chip with account's 30-d outflow micro bar | txns by account | — |
| `payAmount` | Live **bullet preview** as amount is typed (compact version of friction bar) | cat spend | — |
| `frictionSheet` | **P: 3-segment bullet** spent-before / this payment / left, with budget end tick and **elapsed-time pace tick**; label "Spent before this: ₹X" (ambiguity fixed). **S: purchase-count dot row** today + this week in this category (filled = purchases, outlined = this one). Status icon+word. | cat spend day/week, pending amt, elapsed % | Tap segment → ₹. |
| `payConfirm` | Balance-after **delta bar** (before → after) + round-up peek ring for the top goal | balance, amt, goal | Tap ring → savingsSheet. Bug: `--ink2` → `--text2`. |
| `savingsSheet` | Per-goal **icon ring** (small) with round-up amount as a ghost extension | goals | Tap ring = choose goal. |

### Categories
| Frame | Charts | Data | Tap |
|---|---|---|---|
| `categories` (Share view, default) | **P: concentric radial arcs (Ref 1)** — rings by share, common 270° scale, % label at the ring start (12 o’clock, left of the arc, like Ref 1 — avoids collisions on short arcs), icon callout chips, center = total ₹ + period. **Row list**: name, ₹, one **bullet bar** vs budget with status icon (seg-bar and sparkline removed). Period switch Day/Week/Month + **Share / Monthly** toggle. | txns period, cat budgets | Tap ring → tooltip; double-tap → categoryDetail. |
| `categories` (Monthly view) | **P: pie with callouts + fill jars (Ref 2)**. Pie: this month shares ≤5+Other. Jars: 6 columns per category (Apr–Sep), fill = spend ÷ monthly budget, % label on top = this month share, notch if over. | 6 mo txns by cat×month, monthly budgets | Tap jar cell → "Jul · Food ₹5,420 of ₹6,600 (82%)". |
| `categoryDetail` | **P: area + budget dashline** (21 days, keep); **S: merchant treemap** inside category (≤6 tiles, one hue at tone steps of the category slot); stat triad | cat daily totals, merchant split | Crosshair scrub; tap tile → merchant filter. |
| `budgetSheet` | **Live allocation 100% bar** of all categories' monthly budgets; the edited category's segment grows/shrinks as you type; inputs `.field` (white bg bug fixed) | cat budgets | Tap segment → switch category. |
| `editCatsSheet` | Chips carry slot swatch; adding shows which slot it takes | cats | — |
| `periodSheet` | Text options (light touch: each option shows its ₹ total) | — | — |
| `quickCatSheet` | Chips with slot swatch | — | — |

### Insights (grouped into 4 sections, 11 cards; was 16 flat)
| Section | Card | Form | Data |
|---|---|---|---|
| **Money shape** | Budget pace | Bullet w/ elapsed tick + projection ghost | month spend, Σ budget, day-of-month |
| | Month vs last month | **Dumbbell** per category | cat spend m-1 vs m |
| | Fixed vs discretionary | 100% **meter bar** (replaces 2-slice donut) | subs + Necessities vs rest |
| | 6-month trend | Columns w/ budget line | monthly totals |
| **Time** | When in the day | **24h radial clock** (Ref 4, radial columns, sequential blue) | ts→hour, amt, 6 mo |
| | Part of day | **Small-multiple radial gauges ×4** (Morning/Midday/Evening/Night share of spend, icon center) | ts→part-of-day |
| | Calendar | **Heatmap** (5 wk) with **range strip** min–median–max + today dot under it (merged typical-day card) | daily totals |
| **Habits** | Top merchants | **Ranked horizontal bars** top 6 (replaces bubble) | merchant totals month |
| | Purchase sizes | **Histogram** with tap counts | amt buckets |
| | Mix shift | **Radar** (fixed: share ÷ max share, not /(1/N)), this week vs 4-wk avg, 2 series s1/s2 | cat shares |
| **Commitments** | Subscriptions | **Month calendar** with due dots (sized by ₹) | sub.nextDue, amt |

Every card: tap mark → tooltip; header tap → relevant screen. Scatter (#16) dropped (folded into 24h radial).

### Savings
| Frame | Charts | Data | Tap |
|---|---|---|---|
| `savings` | Goals: **icon-in-center progress ring** per goal (Ref 4; replaces bar+bullet dup) + ETA line. Subs: **icon-center donut** of subs share of monthly recurring (≤5+Other) + next-due list. | goals saved/target; subs amt/cycle normalised to monthly | Tap ring/slice → detail. |
| `goalCreate` | **Live pace stepped bar**: ₹/week needed as target and date change; stepped bars for each remaining week | target, byDate | — |
| `goalDetail` | **P: cumulative step-line** of real dated contributions + dashed projection at current velocity + target-date marker; contribution dots coloured by type (round-up s1 / manual s2); **S: stacked area** round-up vs manual | goal.hist[] | Scrub → cumulative on date; tap dot → contribution. |
| `goalReached` | Completed ring with contribution tick marks around it (each tick = a contribution, spacing = date) | goal.hist | Tap tick → contribution. |
| `subDetail` | **P: 12-cell pictogram** (one cell per charge in the next 12 months; quarterly/yearly show sparse cells) + yearly total; **S: price history step line** if price changed; share-of-month meter | sub.cycle, amt, priceHistory | Tap cell → charge date. |
| `subAdd` | Cycle selector (monthly/quarterly/yearly) drives a live 12-cell pictogram preview | form | — |

### Settings (light touch)
| Frame | Visual | Data |
|---|---|---|
| `settings` | **Linkage node diagram** (accounts → Trickle, same component as upiSetup) + thin **100% bar UPI vs manual** txn share (last 30 d) | accounts, txn.source/account |
| `trackingSheet` | Two-lane mini diagram (same as onboarding method) | tracking |
| `accountSheet` | Per-account micro bar of 30-d spend | txn.account |
| `alerts` | **Bullet preview** with threshold tick at chosen % on the biggest category; text "You'd be nudged at ₹X" | alertThreshold, cat budget |
| `pinChange` | Visual PIN dots (same component) | — |
| `permissionsSettings` | Permission → feature diagram (same component as onboarding) | perms |

---

## 4. Primary-form matrix (≤2 screens each)
| Form | Primary on |
|---|---|
| Concentric radial arcs | Categories (Share), onboarding category step (+ ghost reuse in All-set preview/splash demo — same component, onboarding only) |
| Pie + callouts / fill jars | Categories (Monthly), onbAllocate |
| Half-donut | Home, (All-set preview) |
| Bullet w/ pace tick | Friction sheet, manualEntry |
| Icon-center ring/donut | Savings, goalReached |
| Pictogram | Accumulation, subDetail |
| Node/flow diagram | method, upiSetup (Settings reuse = secondary) |
| Area / step-line | categoryDetail, goalDetail |
| 24h radial / strip | Insights, accumulationDetail |
| Range strip | transactionDetail |
| Day-strip columns | transactions |
| Visual PIN dots | pin (pinChange reuse) |

## 5. Audit issues → fixes
| Issue | Fix |
|---|---|
| 2-slice donut (#8) | 100% meter bar |
| Dot-grid ×3 | pictogram (accum) only; waffle & insights dot-matrix removed |
| "Typical day" ×3 | single heatmap + range strip card; diverging bars removed |
| Bubble overlap | ranked bars |
| Sankey from balance | source = month spend |
| Green clash | accent → ivory; green slot dropped; validated 7 slots |
| `--line/--panel2/--ink2` | removed; mapped to `--border/--surface2/--text2` |
| White inputs | all `.field` on `--surface2` |
| Row over-encoding | one bullet per row |
| Radar normalisation | share ÷ max share |
| No tooltips | §1.5 on every chart |

---

## 6. Seed data spec (Phase 4)
- **Window**: 183 days (≈ 1 Apr – 30 Sep 2026), deterministic PRNG (seed 42) so screenshots are stable.
- **Transaction** `{id, merchant, cat, amt, ts, source:'UPI'|'Manual', account:'nishad@oksbi'|'nishad@ybl'|null, payeeType:'merchant'|'contact'|'bank', note?}`. `account` null iff Manual. UPI 82% (split 70/30 across 2 accounts), Manual 18%.
- **Hour-of-day**: sample from merchant-specific profiles, not uniform 8–21: Campus Coffee peaks 8–10 & 16–17; JD Canteen 12–14 & 20–22; RV Shop 17–23 (late snacks); Metro 8–9 & 18–19; Zepto 19–23; BigBasket weekends 10–13. Night (22–01) ≈ 7% of txns so the 24h radial has a real tail.
- **Monthly shape** (for fill jars): allowance ₹8,000/mo; exam month (May) Stationery ×2.5; June vacation −40% Food, +Transport; Aug Groceries +20%; at least one category over budget in 2 of 6 months.
- **Contacts**: 6–10 P2P payments/mo (cab share, mess secretary, friends), payeeType 'contact', cat Buffer/Transport.
- **Categories**: `{name, slot, icon, daily, weekly, monthly}`; monthly = allocation from onboarding default.
- **Goals**: `{id, name, icon, target, createdTs, byDate, hist:[{amt, ts, type:'roundup'|'manual'}]}` — Motorcycle ₹25,000 by 2027-03-31, created 2026-04-05, 14 contributions (weekly round-ups ₹20–90 + 4 manual ₹1,000–2,000); Goa ₹8,000 by 2026-12-15, created 2026-06-01, 8 contributions; one completed goal "Headphones" ₹3,500 reached 2026-07-20 (drives goalReached).
- **Subscriptions**: `{id, name, icon, amt, cycle:'monthly'|'quarterly'|'yearly', startTs, anchorDay, cat, priceHistory:[{ts,amt}]}` — Coursera ₹2,500 monthly day 14; Spotify ₹119 monthly day 3 (price ₹99→₹119 on 2026-07-03); Cloud ₹130 monthly day 22; Amazon Prime ₹1,499 yearly anchor 2026-11-08; Gym ₹1,800 quarterly anchor day 1 (Jul/Oct). Each charge also emitted as a txn on its date.
- **Balance**: derived = opening ₹6,000 + monthly allowance credits (not charted as income) − spend − contributions.
- **Alerts**: `alertThreshold` 80%.
- No SMS-derived field anywhere.
