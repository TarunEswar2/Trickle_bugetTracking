# Trickle v12 — Phase 8: Build plan

Date: 2026-10-01 · Board: "Phase 8 — Build plan" section of "Trickle v12 — Decision Board" · Inputs: claude/v12_decisions.md (P1–P7), claude/v12_phase1–7 docs, claude/v11_phase0_brief.md (S1–S13), claude/v11_phase9_execution.md, claude/mockup_v11_build_notes.md, code in /home/claude/v7–v12.

Hard constraints carried: no SMS (linked UPI IDs or manual entry; statement import is a disabled placeholder); simulated data; no red, no debt words, no streaks/badges/counts; Home shows 0 numbers; one decision per screen; dot ladder (crumb pie-wedge <₹100 → dot ₹100 → pill ₹1,000 → block ₹10,000 with hairline gaps); left = solid jar colour, spent = 1.6px outline, savings = green only, income = neutral ink until split, owed = dashed, held subscriptions = dashed inside budget; glow only for time/position; direction A Monochrome glow (Geist + tabular figures), light companion from B, follows phone, B&W optional; wordmark L3 "Trickle".

Prototype target: one bundled HTML file (Android-styled, 412 px phone frame, works at 360–430 px), `#demo` deep link loads the seed, `#fresh` runs onboarding, `#frame=<id>` opens any frame for screenshots/validator.

---

## 1. Final scope

### 1a. Screens (ids are final; validator and board use them)

**Onboarding — Starter month (P5-Q1 B; 4 taps)**
| Id | Screen | Decision |
|---|---|---|
| O-00 | Splash: "Trickle" wordmark, dots trickle in (placeholder motion) | none (auto) |
| O-01 | Link UPI: pick apps to link (GPay / PhonePe / Paytm / BHIM) or "I'll add spends myself" | link or manual |
| O-01m | Manual path: "What comes in each month?" (amount pad + day) | one amount |
| O-02 | Student type: Hostel / Day scholar / Renting / Earning | type |
| O-03 | Your starter month: savings dots dropped in first, then jars + held subscriptions; "Looks right" / "Change one thing" | accept |
| O-04 | Change one thing: pick a line → its single editor (savings share, a jar, a subscription) → back to O-03 | one change |

**Shell (every tab):** floating 5-icon tab pill (Home · Income · Spending · Savings · Insights) + round Pay button beside it; tab header with title, "?" (intro), gear (tab settings). Home header also has bell + avatar.

**Home (H)**
| Id | Screen |
|---|---|
| H-00 | Intro "Your month at a glance" |
| H-01 | Board: widget grid — Pace glow (wide) + up to 5 more; add-widget tile; 0 numbers |
| H-02 | Bell: "Needs you" on top (sort payment, refund match, split it, late income), activity log below (₹ allowed, filter by tab, 90 days); soft dot, no count |
| H-03 | Edit board: pin · hide · reorder (max 6) |
| H-04 | Add a widget (library sheet) |

**Income (I)**
| Id | Screen |
|---|---|
| I-00 | Intro "Where money comes from" |
| I-01 | Income: next money in (glow track) · this split (pills) · sources · where money sits |
| I-02 | Source detail (paydays, usual day) |
| I-03 | Payday detail (where it went, undo split while in window) |
| I-04 | New money sheet (regular): "₹9,000 came in. Split it like last time?" → Split it + Undo |
| I-05 | New money sheet (irregular): "For this month / Keep for later / Friend paying back" |
| I-S1 | Settings: Sources (add/rename/usual day) |
| I-S2 | Settings: Savings share |
| I-S3 | Settings: Split order |
| I-S4 | Settings: Period (week / month / payday) |

**Spending (S)**
| Id | Screen |
|---|---|
| S-00 | Intro "One dot is ₹100" (the one full key) |
| S-01 | Spending: day lanes (today ringed, re-spread) · jars · held subscriptions · owed · repeat buys |
| S-02 | All spends list (filter chips: jar, source UPI/cash, week) |
| S-03 | Jar detail (this month, history ghost) |
| S-04 | Spend detail (change jar, split, source badge UPI/Cash) |
| S-05 | Subscription detail (year cost, keep / cancel reminder) |
| S-06 | Friend detail (owed, Remind → share sheet with UPI link) |
| S-07 | Sort unknown payment (3 guessed jars + remember payee) |
| S-S1 | Settings: Jars (add · rename · remove; jar 4+ patterned) |
| S-S2 | Settings: Jar amount |
| S-S3 | Settings: Move dots between jars |
| S-S4 | Settings: Copy last month |
| S-S5 | Settings: Subscriptions (add 3 taps, price, stop tracking) |
| S-S6 | Settings: Remember payee → jar |
| S-S7 | Settings: Import statement (disabled placeholder, "Choose file") |

**Savings (V)**
| Id | Screen |
|---|---|
| V-00 | Intro "Green is only for savings" |
| V-01 | Savings: goal (saved solid / to-go outline) · ETA glow path · growth by month · leftover rolled |
| V-02 | All goals |
| V-03 | Goal detail (contributions, add ₹100/₹500, withdraw) |
| V-04 | Goal complete (bangle close placeholder) |
| V-S1 | New goal (one step per screen: name → amount → by when) |
| V-S2 | Goal order |
| V-S3 | Leftover rule (Savings default / keep for next month) |

**Insights (N)**
| Id | Screen |
|---|---|
| N-00 | Intro "Four cards, more on tap" |
| N-01 | Board: What changed · Category share · Small buys add up · Month story (+ equivalents line inside cards) |
| N-02 | Library (12 views) |
| N-03 | Library view (one at a time; Sankey, calendar, time of day, month by month…) |
| N-04 | Month story (5 cards: Big buy · Little things · Where it went · What changed · You kept ₹X) |
| N-04s | Share poster (dots + month name, ₹ hidden unless toggled) |
| N-05 | Weekly check-in (one card → "Start the new week") |
| N-S1 | Settings: Pin / hide cards |
| N-S2 | Settings: Check-in day & time |

**Pay (P) — from the round button on every tab**
| Id | Screen |
|---|---|
| P-01 | Scan (camera open, simulated viewfinder; chips "Pay UPI ID", "Log cash") |
| P-02 | Pay UPI ID (recent payees + type ID) |
| P-03 | Log cash (amount + jar chip; saves without UPI) |
| P-04 | Amount + guessed jar chip; per-day line only if jar low; repeat line ("3rd chai this week"); "Pay ₹60 with UPI" |
| P-05 | Hourglass drop → UPI hand-off (simulated) → done toast "Paid ₹60 · Food" + Undo |
| P-06 | Empty jar: "Fun has ₹200. Take ₹250 from Food?" (asked once, before UPI) |
| P-06b | All jars used: "Start next month ₹250 lighter" / "Use savings" |
| P-07 | Split at pay (toggle, pick friends, equal split) |

**App-wide settings (G, from Home avatar)**: G-S1 Look (colour/B&W, follow phone/dark/light) · G-S2 Linked UPI IDs (add/remove, manual-only) · G-S3 Notifications (5 channels, caps, quiet hours) · G-S4 Sounds & motion (reduced motion) · G-S5 App lock · G-S6 Data & export.

**Retention & system sheets (R)**
| Id | Screen |
|---|---|
| R-01 | Welcome back (after 10 quiet days): savings first, "N payments sorted for you", "Start from today" |
| R-02 | Month-end: "₹640 is left over." → Move to Savings (default) / Keep for next month |
| R-03 | Refund match: "₹499 back from Amazon. Return it to Fun?" |
| R-04 | Subscription price change |
| R-05 | Late income note ("2 days later than usual…") → Got it / Change the date |
| R-06 | Savings withdraw confirm ("That is what savings are for") |
| R-07 | Notification shade preview (simulated Android, 5 types, own channels) |
| R-08 | Android home-screen widgets preview: W-01 Pace 4×1, W-02 Goal 2×2, W-03 Pay 2×1, W-04 Jar 2×2 (opt-in) |

**Counts:** onboarding 6 (O-00…O-04 + O-01m) · Home 5 · Income 6 + 4 settings · Spending 8 + 7 settings · Savings 5 + 3 settings · Insights 7 + 2 settings · Pay 8 · app-wide 6 · retention/system 8 → **53 main/sheet screens + 22 settings screens = 75 frames** (5 tab intros included). In-place expands (one per glance card) are states, not frames.

### 1b. Widgets / insights (in-app)
Default sets (P3-Q1, P4-Q5): 
- **Home (6, no ₹):** Pace glow + word · Jar left · Little things (wedges) · Subscriptions next due (track) · Next money in (track) · Goal progress.
- **Income (4):** Income sources · Next money in · Income split · Where money sits.
- **Spending (5):** Day lanes (pace) · Jar left · Repeat buys · Subscriptions held & next due · Owed to you.
- **Savings (4):** Goal progress · Goal ETA · Savings growth · Leftover rolled.
- **Insights (4 cards + equivalents line):** What changed · Category share · Small buys add up · Month story.
- **Library (12):** Category drift · Top places · Time of day · Weekday pattern · Calendar · Spend range · Big one-offs · Subscription yearly cost · Money flow (dot-ribbon Sankey; two-column fallback) · Savings rate · Money as time (days of a jar) · Month by month.
Total: **31 distinct insights** (19 default-only + 12 library), 23 default placements across tabs.

**Android home-screen widgets (P7-Q5):** Pace 4×1, Goal 2×2, Pay 2×1 at launch; Jar 2×2 opt-in → **4**, all number-free.

### 1c. Flows with tap targets
| # | Flow | Path | Taps (target) |
|---|---|---|---|
| F1 | Onboarding (UPI) | O-00 → O-01 → O-02 → O-03 Looks right | 4 (≤30 s) |
| F1m | Onboarding (manual) | O-01 manual → O-01m → O-02 → O-03 | 4 + typing |
| F2 | Budget edit | gear → jar → amount | 3 |
| F3 | Income regular | push/bell → Split it | 2 (1 decision) |
| F3i | Income irregular | I-05 pick → confirm | 3 |
| F4 | Pay scan | Pay → (scan) → amount → Pay with UPI | 2 from any tab |
| F4u | Pay UPI ID | Pay → UPI ID → payee → amount → Pay | 3 (+typing) |
| F5 | Empty jar / all empty | P-06 / P-06b | +1 (2 total) |
| F6 | Log cash | Pay → Log cash → amount → Save | 3 |
| F7 | Sort unknown payment | bell → item → jar chip | 2 |
| F8 | Subscriptions add / deduct / price / cancel | S-S5 | 3 / 0 / 1 / 1 |
| F9 | Split with friends | at pay (toggle) 3 · from spend detail 4; remind 1 | 3 / 4 |
| F10 | Refund | bell → Return to Fun | 2 |
| F11 | Goal create / add / withdraw / complete | V-S1 / V-03 / R-06 / auto | 2 / 1 / 2 / 0 |
| F12 | Month-end + story | R-02 Move to Savings → N-04 | 1 + 1 |
| F13 | Move dots between jars | jar → Move → amount | 3 |
| F14 | Bell actions | bell → item action | 2 |
| F15 | Weekly check-in | push → card → Start the new week | 1 |
| F16 | Welcome back | open → Start from today | 1 |
| F17 | Edit Home board | Home → Edit → pin/hide/reorder | 2 |
| F18 | Pin an insight | Insights → Library → Pin | 2 |
| F19 | Change look / B&W / reduced motion | avatar → Look → option | 3 |
| F20 | Notification arrives → acts | shade → one action | 1 |
**20 flows (24 counting variants).**

---

## 2. Data model + seed

### Store (one store; screens never compute their own totals — v11 rule)
```
Ledger {
  today: {y:2026, m:9 /*Oct*/, d:14},  period:'month', type:'Hostel', upiIds:[{app,id,linked}], manualOnly:false
  months: { 'YYYY-MM': Month }              // ≥4: Jul, Aug, Sep 2026 closed; Oct open
  goals: [{id,name,target,saved,by,contribs:[{ts,amt,src}] ,reachedTs}]
  savingsBank                               // savings not in a goal ("General")
  payees: {name: {jar, kind:'shop'|'person', count}}   // remember payee
  owed:  [{id,friend,spendId,amt,back,remindedTs}]     // OUTSIDE balance
  notif: {caps:{day:1,week:3}, quiet:[22,8], channels:{income,subTomorrow,checkin,story,welcome,goal}, sent:[]}
  prefs: {look:'colour'|'bw', mode:'system'|'dark'|'light', reduced:false, sound:true, checkin:{dow:0,time:'19:30'}, leftoverRule:'savings', home:[widget ids ≤6], insightsPins:[]}
  log: [{ts, tab, kind, text, amt?, undo?}]            // bell activity (90 days)
  needs: [{id, kind:'sort'|'refund'|'split'|'late', ref}]
}
Month { incomes:[{id,src,kind:'regular'|'irregular',amt,day,intent}], savingsSplit, budget,
  subs:[{id,name,amt,due,state:'held'|'paid'|'stopped'}],
  jars:{name:{budget, moveIn, moveOut, spent, back, colour, pattern?}},
  spends:[{id,day,hour,payee,amt,jar,src:'upi'|'cash',split?:{friends,share},refundOf?}],
  moves:[...], leftover:{amt, to:'savings'|'next'}, lighter, fromSavings }
```
Derived reads (ported from v11 store.js): `left(jar)`, `jarsTotal`, `subsTotal`, `subsHeld`, `spentAll`, `leftAll`, `savingsTotal`, `goalSaved`, `owedOpen`, `paceWord`, `daySpread(jar)` (re-spread remaining days, P2e-Q5), `repeatCount(payee,7d)`, `weekSpend(offset)`, `equivalent(amt)` (user's own frequent buy), `ghost(jar, prevPeriod)`.

### Seed — "Tarun, hostel, Chennai", today Wed 14 Oct 2026 (4 months)
- **Income:** Allowance (regular) ₹9,000 on the 1st, split 1 tap: Savings ₹2,000 → Goa; Budget ₹7,000. Freelance design gig (irregular) ₹1,500 on 9 Oct → "Keep for later" → Savings General. Sep allowance arrived on the 3rd (late-income note exists in history).
- **Budget ₹7,000 = Subscriptions ₹548 + Jars ₹6,452:** Spotify ₹119 (due 5th, paid), Google One ₹130 (due 15th → "tomorrow" heads-up), Prime ₹299 (due 22nd, held). Jars: Food ₹3,600 (amber) · Travel ₹1,200 (blue) · Fun ₹1,000 (plum) · **Study ₹652 (4th jar: amber + stripe pattern, name always shown; exercises pill + cup-fill crumb ₹52)**.
- **October spends (to 14th, ≈₹3,350):** Ramu Tea Stall chai ₹20 ×11 (repeat buys; "3rd chai this week"), Mess snacks, Swiggy ×3 (₹180–₹340), Rapido ×4 (₹45–₹120), metro card recharge ₹300, Xerox ₹40 ×3 (Study), stationery ₹212, movie ₹480 (Fun), Amazon earphones ₹499 (Fun) **refunded 12 Oct** (refund match pending in bell), one cash spend logged (auto-rickshaw ₹80), one unknown UPI "PAYTM*QR7731 ₹150" (needs sort).
- **Splits/owed:** Dinner at Saravana Bhavan ₹1,200 paid by Tarun on 10 Oct, split 4 → owed ₹900 (Arjun ₹300, Meera ₹300, Kiran ₹300); Kiran paid back ₹300 on 12 Oct (dots return to Food). Owed open ₹600 — dashed, outside balance.
- **Goal:** Goa trip ₹8,000, by Jan 2027; saved ₹5,240 (monthly ₹1,000 from each ₹2,000 savings split Jul–Oct + Aug leftover ₹600 + Sep leftover ₹640) → ETA path in glow; 25/50% milestones passed. Second goal "New phone" ₹15,000 (blocks + pills demo) saved ₹4,000 (other ₹1,000 of each split). General savings ₹1,500 (Oct gig). Savings total ₹10,740.
- **History (Jul, Aug, Sep closed):** each with same jars ± small changes, 35–60 spends/month generated by seeded RNG (mulberry32, from v9 ledger.js), leftover rule outcomes (Jul ₹0, Aug ₹600, Sep ₹640 → Savings), Fun overspend in Aug (re-spread + "Take from Food" event), a "start lighter ₹250" in Jul, month stories for Aug and Sep ("You kept ₹2,640"), weekly check-ins logged. Enough for: What changed (week vs last + month ghost), month by month (3 past + current), Sankey, calendar, time of day, spend range, ghost comparisons.
- **Scenario switches (for validator/board):** `#seed=day1` (empty state after onboarding), `#seed=lapse` (14 quiet days → R-01), `#seed=monthend` (31 Oct → R-02 + story), `#seed=bigincome` (₹45,000 earner → blocks), `#seed=emptyjars`.

### Ledger invariants (checked after every action, every render, in the validator)
1. Per month: Σ incomes assigned = savingsSplit + budget (+ irregular kept for later goes to savings, + "friend paying back" goes to owed, not income).
2. budget = subsTotal + Σ jar budgets (moves net to 0 across jars).
3. left(jar) = budget + moveIn − moveOut − spent + back; jars may reach 0 but never below (empty-jar flow forces a take/lighter/savings choice before pay).
4. Held subscriptions ≤ budget − Σ jar budgets; a sub moves held → paid on due day with 0 taps.
5. savingsTotal = Σ goal saved + General; withdrawals logged; never negative.
6. Owed is outside the balance: balance = opening + Σ incomes − Σ spends (Tarun's full share paid) + Σ owed paid back; owed open never counts as money he has.
7. Refund: amount ≤ original spend; returns to the original jar (`back`).
8. Split: own share + Σ friend shares = spend amount; paying back increases `back` of that jar.
9. Month close: leftover = leftAll; moved to savings or carried as next month's jar top-up; "lighter" reduces next month's jar budgets by exactly that amount.
10. Undo restores the exact pre-action ledger (snapshot diff = 0).
11. Every action writes one bell log entry; needs-you item is removed when acted.
12. Rendering: number of marks per card ≤ 30 after ladder resolution; Σ rendered dot value = amount to the rupee (crumb wedge area = remainder/100).

---

## 3. Reuse map
| From | Module / idea | Use in v12 | Change |
|---|---|---|---|
| v7 (scratchpad v7/ledger.js, money.js, actions.js) | splits + IOU model, subscriptions data, refund matching | owed/splits, refunds | owed outside balance kept; drop "To assign" pools |
| v8 (ledger.js, flows.js, rhythm.js, ui.js) | one-choice sheets, auto-split + undo, glow pace, story, check-in rhythm | I-04/I-05, R-02, N-04/N-05 | v12 copy; dots, not tiles |
| v9 (sound.js, ledger.js seed, viz.js, widget chrome, B&W patterns) | WebAudio voices + throttle + reduced-motion guard, mulberry32 multi-month seed generator, widget card + settings sheet, stripe/dot patterns, repeat buys | sound placeholders, seed history, H-03/H-04, jar 4+ pattern, B&W mode | sounds remain placeholders until Phase 12; unit fixed at ₹100 |
| v10 | splash timing | O-00 | L3 wordmark replaces logo shapes |
| v11 app/store.js | single store + derived reads + checkLedger, setup mixes per student type, income split + undo, pay/undo, move, lighter, use savings, month close | core store | add months map, multi UPI IDs, cash source, payees memory, refunds, bell log, 4th jar, notifications state |
| v11 app/validate11.js | Playwright frame scanner: digit-token scan, key count, primary-action count, red-hue scan, 44 px targets, overflow, banned words, nav targets, ledger runs | v12 validator `validate12.js` | new frame list (75), Home 0-token rule, mark-count rule, dot-ladder rule, bell exempt, light/dark/B&W passes |
| v11 build.py / bundling | concat JS/CSS → single HTML | build12.py | same |
| v12 phase2e.py / phase6.py / p2b.js | dot ladder geometry (D, G, PW), pie-wedge cup fill clockwise from 12, pill/block hairline gaps, day lanes, glow rows, direction A tokens, icons, tab bar + Pay | **dots.js** (rewrite of tiles.js in JS) + tokens.css | port Python SVG generators to JS; add states (solid, outline 1.6px, dashed held, dashed owed, ghost, hatched extra) |
| v12 phase3.py / phase7.py | insight renderers (waffle, Sankey, ghost, lanes), notification + widget mocks, story/check-in cards | insight library, R-07, R-08, N-04/N-05 | data-bound instead of static |
| **Rewritten** | tiles.js (square tiles, 10×10 squares) | replaced by dots.js | dot ladder everywhere (P2d-Q2/Q3); tab shell rebuilt for 5 tabs + round Pay; bell is new; tab intros new; onboarding is new (Starter month) |

---

## 4. Build order (14 steps, one checkpoint screenshot each)
| # | Step | Output | Checkpoint screenshot |
|---|---|---|---|
| 1 | Store v12 + invariants + 4-month seed + scenario switches | store.js, seed.js, `checkLedger()` 12 rules | console table: invariants PASS on all 4 months |
| 2 | dots.js ladder renderer (crumb wedge, dot, pill, block, states, key, B&W patterns) | dots.js + test page | ladder sheet: ₹52 / ₹652 / ₹3,600 / ₹15,000 in each state, colour + B&W |
| 3 | Tokens + shell: direction A dark/light, B&W, 5-tab pill + round Pay, header (?, gear, bell, avatar), push/expand navigation, `#frame=` router | tokens.css, shell.js | empty tab shells, dark + light |
| 4 | Onboarding O-00…O-04 (UPI + manual) | onb.js | O-03 Starter month |
| 5 | Home H-01 widget grid (6 defaults, 0 numbers) + H-03/H-04 edit + intros (all 5) | home.js, intro.js | H-01 dark/light |
| 6 | Pay P-01…P-07 incl. empty-jar, split at pay, hourglass placeholder, undo | pay.js | P-04 amount + jar chip; P-05 mid-drop |
| 7 | Spending S-01 day lanes + jars + held + owed + repeat; expands | spend.js | S-01 |
| 8 | Spending deep: S-02 list, S-03…S-07, settings S-S1…S-S7 | spend2.js | S-02 list + S-07 sort |
| 9 | Income I-01…I-05 + settings | income.js | I-04 split sheet |
| 10 | Savings V-01…V-04 + settings (bangle placeholder) | save.js | V-01 Goa |
| 11 | Insights N-01 board + library 12 + N-04 story + share poster + N-05 check-in | insights.js | N-01 + N-03 Sankey |
| 12 | Bell H-02 + all R sheets (welcome back, month-end, refund, price, late income, withdraw) | bell.js, sheets.js | H-02 needs-you + log |
| 13 | App-wide settings G-S1…G-S6 + notification shade R-07 + Android widgets R-08 | settings.js, android.js | R-08 widget preview |
| 14 | Sound/motion placeholders + reduced motion + polish, bundle, validate12.js full run, publish | build12.py, validate12.js | contact sheet of all 75 frames (colour, B&W, light) |

---

## 5. Validation checklist (validate12.js, Playwright /opt/pw-browsers/chromium, 412×860 + 360 px)
| Check | How | Maps to |
|---|---|---|
| Home first view has 0 digit tokens (₹ or numerals) | DOM text scan H-01, all widget combos | S5, P2c-Q1 |
| ≤2 numbers on first view elsewhere; bell log, list S-02, story share toggle exempt | digit-token scan per frame | S6 |
| One unit: key "● = ₹100" appears exactly once per screen with dots; full key only in S-00 intro | count `.key` | S7, P2-Q5 |
| Dot ladder: <₹100 → wedge only; 10 dots fuse to pill; 10 pills → block with hairline gap; Σ mark value = amount | renderer unit tests over 200 amounts | P2b, P2d-Q3, inv 12 |
| Marks per card ≤ 30 (target ~20) | count SVG marks per `.card` | P4-Q1, Kay 2016 |
| Wedge is area-true, clockwise from 12 | geometry test | P2e-Q1 |
| Colours: savings green only on savings elements; income neutral ink; jar 4+ patterned with name | class/colour audit | P2e-Q2, P3-D1, P3-Q5 |
| No red (hue <12°/>348°, sat>45%) anywhere | computed-style scan, all frames | S11 |
| No debt/guilt words (over, overspent, deficit, debt, missed, you were gone, only ₹X left, streak) | copy grep (UI + notification strings) | S11, P7 |
| One primary action / one decision group per screen | `.primary` count, chip-group count | S4 |
| Tap counts per flow F1–F20 ≤ target | scripted click-through counters | S3, S8, S9, P5 |
| Onboarding ≤30 s, 4 taps (UPI path) | stopwatch in script | S3 |
| Pay: dots leave ≤1.2 s; ≤3 steps to UPI hand-off | timing + steps | S8 |
| Income: one confirm + undo restores ledger | click-through + snapshot diff | S9, inv 10 |
| Return triggers exist: day 2 recap, day 7 check-in, day 30 story, welcome back | scenario seeds | S10, P7 |
| Notifications: ≤1/day, ≤3/week, none 22–08, 5 types, each one action, own channel | simulate 30 days of events | P7-Q1 |
| Ledger invariants after every action (target ≥150 checks) | `checkLedger()` hook | S12 |
| Glow used only on time/position views | class audit | P2-Q3, P3-Q2 |
| B&W mode + light + dark render every frame; no overflow at 360/412 px | 3 × 75 screenshots | P6-Q2 |
| Reduced motion: no animation > 0 ms, sounds respect setting | emulate media | a11y |
| Tap targets ≥ 44×44 px | bounding boxes | a11y |
| No SMS: `grep -i sms` = only the privacy line | source grep | constraint |
| All nav targets exist; no console errors | router audit | quality |
| 5-second test script + tile/dot value test page (≥4/5 testers) | manual, Phase 11 | S1, S2, S13 |

---

## 6. Phase 12 hooks (placeholders now, swapped later)
All motion/sound goes through `fx(name, el, opts)` so Phase 12 replaces one module. Each hook has a reduced-motion fallback (instant state change) and a sound slot (silent by default).
| Hook | Where | Placeholder now |
|---|---|---|
| `splash.trickle` | O-00 | dots fade in, 600 ms |
| `savings.drop` | O-03, I-04 | green dots appear first, 300 ms stagger |
| `pay.hourglass` | P-05 | dots fade to outline, 900 ms |
| `pay.undo` | toast | outlines refill |
| `dots.merge` (10 → pill, crumbs → dot) | any re-render | crossfade 200 ms |
| `jar.respread` | S-01 day lanes after empty-jar take | lanes width tween 400 ms |
| `goal.bangle` | V-04 | ring stroke-dash close, 1 s; one soft tone slot |
| `owed.fill` | friend pays back | dashed → solid |
| `week.fresh` | N-05 Start the new week | card slide |
| `story.frame` | N-04 | swipe |
| `glow.pulse` | Pace, Next money in | static glow (no pulse) |
| `bell.dot` | H-01 header | static soft dot |
| `refund.return` | R-03 | outline refills in jar |
Sounds: v9 sound.js voices wired to hook names, muted by default until Phase 12.

---

## 7. Risks + mitigations
| Risk | Mitigation |
|---|---|
| Scope is large (75 frames, 31 insights, 20 flows) → build drifts or quality drops | 14 checkpointed steps; validator runs from step 1; library views share 4 renderers (dots, lanes, glow, ghost) |
| Dot ladder unreadable at large amounts (₹45k earner, ₹15k phone goal) | `#seed=bigincome` in validator; block hairline gap + ≤30-mark rule; tap-to-zoom one level (P2b-Q3) |
| Cup-fill wedge too small to read at dot size (≈10 px) | min wedge 1/8 visible; zoom shows exact; test in B&W |
| ≤2 numbers rule clashes with pay amount, story, bell | explicit exemptions list (bell log, S-02 list, pay amount pad counts as 1) |
| Home 0 numbers + widget library: a user pins a ₹ widget | Home library only offers no-₹ forms of each insight |
| Notification simulation can't prove real Android behaviour | R-07 is a mock; channel/caps rules unit-tested; real build later |
| UPI linking + AutoPay detection are simulated | manual path (O-01m, Log cash) must pass the same tap targets |
| 4th jar pattern + B&W patterns compete (stripe used twice) | B&W uses separate pattern set; jar names always shown |
| History seed feels fake (insights empty or noisy) | seeded RNG with hand-placed story events (Aug Fun overspend, Sep late income, refunds) |
| Playwright fonts blocked (Geist via Google Fonts) | system fallback in validator; layout tolerances; ENV_ERR filter from v11 |
| Bundle size (SVG-heavy) | render on demand per frame; no pre-rendered images |
| P2-Q4 (density) still open | build "size follows surface" (rec A) behind one constant so either answer is a 1-line change |

## Question for Tarun
**P8-Q1 Sign-off:** Is this scope OK to build (75 frames, 31 insights + 4 Android widgets, 20 flows, 14 steps)? Anything to cut or add?
