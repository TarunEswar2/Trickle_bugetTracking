# Trickle v6 — Phase 1 Audit & Data Inventory

Source audited: `trickle-final-v5.html` (3,247 lines, read in full), `claude/v5_visualization_plan.md`, `claude/mockup_v5_build_notes.md`.
Constraint re-affirmed: tracking = UPI account linkage or manual entry only. **No SMS reading anywhere** (v5 is clean on this; keep it so — no "SMS" permission, copy, or fallback).

Legend: **TXT** = text-only / form-only element · **VIZ** = real computed chart · **DUP** = form repeats elsewhere · **BUG** = defect found in code.

---

## 1. Screen-by-screen audit (all 34 frames + 9 sheets)

### Onboarding (7 frames) — 0 charts in total. Weakest area of the app.
| Frame | What's there | Text-only / weakness | Visual opportunity (for Phase 3) |
|---|---|---|---|
| `splash` | Wordmark "Trickle" + "Swipe up" button | TXT. No sense of what the app does. | Animated "trickle" of real sample coins into a category ring = a preview of the product's core visual. |
| `method` (Step 1) | Two field-buttons: Connect UPI / Manual Tracking + privacy hint | TXT. The single most consequential choice is two grey boxes. No comparison of what each path gives you. | Side-by-side **mini flow diagram** per path (UPI app → Trickle auto-log vs. you → tap → Trickle); a "what you'll see" comparison row. |
| `upiSetup` | Input + Add, chip list of IDs, Continue | TXT. Chips carry no bank identity, no status. | **Linkage diagram**: phone node → N UPI IDs nodes → Trickle, each edge "linked" state; bank initial badges. |
| `onbCategories` (Step 2) | Chosen chips, typed add, recommended chips + search | TXT. **BUG**: `#rec-search` styled `background:#fff` and `var(--line)` (undefined) — white input in dark theme. Choosing categories has no consequence shown. | Live **radial/treemap starter budget** that grows a slice as each category is added; typical-student default split as ghost. |
| `pin` (Step 3) | Two password fields | TXT. Plain form; no feedback per digit. | 4-dot PIN pad with fill dots (visual PIN), match state as two dot rows aligning. |
| `permissions` (Step 4) | 3 toggles (Notifications, Contacts, Camera) | TXT. Why-each explained in prose only. | **Permission → feature diagram**: each toggle lights up the Home tile/feature it unlocks (Camera → Scan QR, Contacts → Pay Anyone, Notifs → budget nudges). |
| `allSet` | Sentence + account chips + category chips | TXT. Ends on a list, not a payoff. | **Preview dashboard**: their chosen categories rendered as the actual radial-arc chart with starter budgets, empty-state ghost data. |
| Step dots | 4 dots | Only progress cue; not tied to content. | Progress as a filling arc around the step number. |

### Home (1 frame + 2 sub-frames)
| Element | Status |
|---|---|
| Balance + eye toggle | TXT (fine as hero number). |
| Stat triad Today/Week/Month + ▲▼% | Stat tiles (OK per dataviz "is it a chart?"), but no sparklines — deltas are numbers only. |
| Pay tiles (Scan / Pay Anyone / Bank) or Manual "Enter Transaction" | TXT/icon. Fine functionally. |
| "Small Purchases Adding Up" | VIZ dot-matrix (DUP with Insights #4 and conceptually with waffle #12) + 3 TXT trend rows. |
| "Where Money Goes" | VIZ sankey-lite. Weakness: source node is unlabeled grey bar; "balance → categories" is conceptually wrong (30-day spend isn't carved from current balance); labels truncated to 11 chars. |
| "Subscriptions Due" | TXT list with due badges. Duplicates Savings + Insights #5 content. |
| "Transaction History" | TXT 5 rows. |
| **Missing**: no category-share visual at all on Home; no budget-pace visual. |
| `accumulation` | TXT — list of cards (merchant, total, count, avg). No chart on the dedicated screen for the app's signature feature. |
| `accumulationDetail` | TXT — 3 number rows + purchase list. Ideal for time-of-day strip / count dots, has none. |

### Transactions & detail & manual entry
| Frame | Status |
|---|---|
| `transactions` | TXT list, search, category filter pills, day headers. **BUG**: header uses `var(--line)` (undefined). No visual summary of the filtered set (e.g. day-strip of the result). |
| `transactionDetail` | TXT: amount, merchant, date, source, recategorise chips. No context: how this txn compares to merchant average / category budget / time of day. |
| `manualEntry` | TXT form: amount, merchant, category chips. No live preview of the budget impact (the friction-bar logic exists but is only used for UPI payments). |

### Payment flow (UPI)
| Frame / sheet | Status |
|---|---|
| `scan` | Scan-box graphic + quick category pill. Fine. |
| `payAnyone` | TXT contact list. Could show last-paid amount per contact as tiny bars. |
| `bankTransfer` | TXT form. |
| `payAmount` | TXT input + category chips. No preview until "Check". |
| `frictionSheet` | VIZ simple 3-segment bar (spent / this / left) + TXT day/week counts + note. Best "decision moment" in app, but: counts are text ("Day : 2"), no pace context, bar has no budget tick, label says "Total Spent" incl. this payment (ambiguous). |
| `payConfirm` | Check mark + TXT line + savings peek. **BUG**: `var(--ink2)` undefined (twice). |
| `savingsSheet` | Round-up offer; per-goal progress bar (DUP). |

### Categories
| Frame | Status |
|---|---|
| `categories` | VIZ donut w/ center total + legend; each row: amount, %pill, seg-bar, bullet graph, sparkline. **Over-encoded rows**: seg-bar and bullet graph both encode amount (seg-bar = vs max category, bullet = vs budget) — 3 mini-charts per row is noisy. Donut is the generic form; user wants radial arcs (Ref 1) here. Period switch day/week/month only; **no month-wise view**. |
| `categoryDetail` | VIZ stat triad + progress bar + 21-day area w/ budget dashline + TXT txn list. Area uses daily budget vs daily totals (spiky, OK). No merchant split, no hour-of-day. |
| `budgetSheet` | TXT two inputs daily/weekly. **BUG**: `background:#fff`, `var(--panel2)` / `var(--line)` undefined. No visual of allocation across categories while editing. |
| `editCatsSheet` | TXT chips. |
| `periodSheet` | TXT options. |

### Insights (16 cards)
All VIZ except #3 (drift, pill only) and #5 (subs, stat triad + text) and #6 (outlier, hero stat). Weaknesses:
- **Long undifferentiated scroll**: 16 equal-weight cards, no grouping (Money shape / Time / Habits / Commitments).
- **Repeats**: dot-matrix (#4) ≈ waffle (#12) ≈ Home accumulation; range indicator (#14) and diverging days (#15) and heatmap (#2) all answer "was today/this day typical"; donut used twice (Categories + #8 2-slice donut — a 2-slice donut is a dataviz anti-pattern → should be meter/stat).
- Radar (#11): shares normalised oddly (`/(1/N)*0.9` clipped at 1 → many spokes saturate); dead loop in code. Labels truncated to 7 chars.
- Bubble (#13): **BUG / known overlap** — fixed hard-coded positions, radius up to 52px, bubbles at 60,42 and 52,104 collide; 6 bubbles × categorical hue violates "all-pairs forms cap at 3 hues".
- Scatter (#16): single hue, no hover; y-axis unlabeled.
- No card is month-wise per category (user's Ref 2 ask). No hour-of-day radial (Ref 4). Histogram bars unlabeled on hover.
- No hover/tap tooltips anywhere (dataviz step 5 unmet).

### Savings
| Frame | Status |
|---|---|
| `savings` | Goals: progress bar + bullet graph (**DUP encoding**: two bars for saved/target on one card). Subs: stat triad + date-axis timeline + TXT list. Timeline labels collide when due dates are close (stagger only 3 levels). |
| `goalCreate` | TXT form. No preview of required pace (target ÷ weeks). |
| `goalDetail` | VIZ hero + bar + projection area (straight line from 0 to saved — fakes history; only 2 seeded contributions) + TXT contributions list. |
| `goalReached` | Icon + text. Could show the contribution timeline as a completed arc. |
| `subDetail` | TXT rows (cycle, next due, category, yearly). No visual of 12-month cost or share of monthly spend. |
| `subAdd` | TXT form. Cycle hard-coded Monthly. |

### Settings (5 frames + tracking/account sheets)
| Frame | Status |
|---|---|
| `settings` | TXT list rows with values. Candidate light touches: linkage status diagram (accounts → Trickle), txn count split UPI vs manual as a thin bar. |
| `alerts` | Threshold pills + toggles + text preview. A bullet-graph preview at the chosen threshold would show exactly when a nudge fires. |
| `pinChange` | TXT form. |
| `permissionsSettings` | TXT toggles (same diagram idea as onboarding). |
| `accountSheet`, `trackingSheet` | TXT chips / options. |

### Cross-cutting findings
1. **~60% of frames (21/34) contain zero charts**; every onboarding step, every form, every detail except category/goal detail.
2. **Repeated forms**: donut ×2 (one is a 2-slice anti-pattern), dot-matrix/waffle ×3, plain progress bar ×4 (goal card, goal detail, savings sheet, insights #7), bullet ×2 stacked on progress bars, "typical day" question answered ×3.
3. **No interaction layer**: no tooltips/tap-to-reveal on any chart.
4. **Palette**: 8-hue categorical `--s1..s8` is fixed-order (good) but never re-validated for dark surface `#17181a`; accent `#5bb98c` and `--s3/#199e70`, `--s6/#2fae2f` are three greens — accent collides with category hues.
5. **CSS token bugs** from light-theme era: `--line`, `--panel2`, `--ink2`, `#fff` backgrounds (rec-search, budget inputs).
6. Dead code: `drawMiniRing`, `heatmapWeeks`, `radar` empty loop, `segBar` track var.
7. Seed limits: only 68 days (≈2 months) → month-wise charts need **≥3–6 months**; goals have 2 contributions; subs lack cycle/start date; txns lack `account`.

---

## 2. Data inventory

### 2.1 Raw fields currently in the model
| Entity | Field | Type / example | Notes |
|---|---|---|---|
| **Transaction** (`TXNS`) | `id` | int | |
| | `merchant` | "RV Shop" | 12 seeded merchants + contacts/QR/bank payees |
| | `cat` | "Snacks/Beverages" | FK to category name |
| | `amt` | ₹ int | |
| | `ts` | epoch ms | 8:00–21:59 seeded; gives date, weekday, hour, minute |
| | `source` | 'UPI' \| 'Manual' | 85/15 seed split |
| **Category** (`CATS`) | `name`, `daily`, `weekly` | budget ₹ | monthly derived as daily×30 |
| **Goal** (`GOALS`) | `id,name,target,saved,by,hist[{amt,ts}]` | `by` is free text ("March") |
| **Subscription** (`SUBS`) | `id,name,amt,day,cat,note` | monthly only |
| **Account** (`ACCOUNTS`) | UPI ID strings | not linked to txns |
| **State** | `balance`, `tracking`, `pin`, `perms{}`, `alertThreshold`, `period` | balance is a single number |
| **Merchant profile** (`MERCHANTS`) | `min,max,perWeek,cat` | seed-only; usable as "typical price" |
| **Constants** | `DEFAULT_CATS`, `RECOMMENDED`, `CONTACTS` | onboarding pools |

### 2.2 Fields to add in Phase 4 (still UPI/manual only)
- `txn.account` (which UPI ID) → per-account split, linkage diagram.
- `txn.payeeType` (merchant QR / contact / bank) → P2P vs merchant share.
- Seed window **≥ 180 days** → 6 months for month-wise category fill columns.
- `goal.createdTs`, `goal.byDate` (real date), ≥ 6–10 contributions.
- `sub.cycle` (monthly/quarterly/yearly), `sub.startTs`, `sub.priceHistory`.
- `cat.icon` (for icon-in-center donuts / callouts, Ref 4).
- Optional `txn.note`. **Never** an SMS-derived field.

### 2.3 Derivable metrics
| Family | Metrics (field basis) |
|---|---|
| **Totals** | spend today/week/month/custom; per category; per merchant; per account; per source (UPI vs manual); per payee type |
| **Shares** | category % of period; merchant % of category; fixed vs discretionary %; small-ticket (<₹50/₹100) % of count and of value; UPI vs manual %; weekday vs weekend % |
| **Budget** | spent/budget ratio per cat; remaining; over-by; % of period elapsed vs % of budget used (**pace**); projected end-of-period spend; days-of-budget-left at current rate; safe-to-spend per day |
| **Trends** | week-over-week, month-over-month per cat; 6-week / 6-month series; rolling 7-day average; category drift (biggest mover) |
| **Time patterns** | hour-of-day distribution (24 bins), part-of-day (morning/midday/afternoon/evening/night), weekday profile, day-of-month profile, calendar intensity |
| **Frequency / habits** | purchases per merchant per week; repeat-buy streaks; avg gap between visits; first/last seen; "habit cost" annualised (count × avg × 52) |
| **Distribution** | txn size histogram; min/median/max/IQR per day; per-merchant price range vs typical; outliers (> p95) |
| **Recurrence** | subscription monthly/yearly total; next-due countdown; commitments in next 7/30 days; subs share of monthly spend; price changes |
| **Savings** | goal % funded; contribution velocity ₹/day; ETA vs `by`; required pace to hit `by`; round-up totals; saved vs spent ratio |
| **Streaks** | days under daily budget in a row; no-spend days; weeks on pace |
| **Projections** | end-of-month spend per cat; goal ETA; subs yearly cost |
| **Payment-moment** | this payment as % of cat budget; count of same-cat purchases today/week; balance after; vs typical amount at this merchant |
