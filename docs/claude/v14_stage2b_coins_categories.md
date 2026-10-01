# Trickle v14 — Stage 2b: Coins and categories (2 Oct 2026)

Board: Stage 2b section of https://claude.ai/artifact/VYX5h82WLtxEyrgFtS2S1s (#stage2b). Test page: https://claude.ai/artifact/XhwCsGXhr8A3s1mXc2H4xC ("Trickle v14 — Coin test"). Explorations only; Tarun decides. Builds on D1–D3 decided 2 Oct (coin = ₹100 always, count label for big amounts; Home = sentence + week coins, no ₹; this week).

## Part A — Coin + count variants (same Stage 2 scenarios)
Legend: filled = still yours, outline = spent, dashed = not saved yet, ochre = savings, orange dashed = leaving with this payment.
- V1 One coin ×N (past 10) — smallest; ×6 and ×450 look the same. Avg 4.4
- V2 Handful of 5 ×N (past 10) — "many coins" at once; no proportion. 4.6
- V3 Row of 10 × rows (past 20) — reintroduces the line; "2.6 rows" awkward. 3.2
- V4 Draw up to 20, then handful of 5 ×N — whole week (17½) always drawn; Kay 2016 ~20 limit. 5.0
- V5 Coin with count badge — reads as a notification. 3.8
- V6 Handful + ₹ wording — puts ₹ on Home (breaks D2). 3.8
- V7 Handful ×N, ₹ underneath — good for tabs/detail. 4.0
- V8 Coin pile (side view) — tactile but overlap = merge in disguise. 3.0
Studies: payment take-out (₹350 = 3½ coins lift out orange-dashed before confirm, become outlines after; Soman 2001); rendering (flat / rim / rim+shine × cup / wedge partial; suggested rim, no shine; wedge = "piece of a coin", cup = filling over four chais); week (drawn) vs month ×70 vs goal ×140 (same coin, word changes; switch to count signals "big").
Criteria (judgement, not tested): learn in one sentence, glance accuracy, ₹25→₹45,000, never merges, fits Home without ₹.
**Top 2:** V4 (week fully countable, handful + count past 20, Neurath repeat-don't-enlarge) and V1 (minimal, pure count; Gigerenzer & Hoffrage). Test asks whether the handful helps beyond the count.

## Part B — Categories at 5 / 12 / 20 (custom: Gym, Bike EMI, Gifts, Hostel mess…)
- B1 Name-first ranked rows — name is identity, coins beside it.
- B2 Monogram coin — collides (Gi/Gy).
- B3 Own emoji + name — anchor, name still does the work.
- B4 Top 4 + Others — glance layer; full list on tap.
- B5 Families Needs / Wants / Fixed — 3 groups at any count.
- B6 Colour for this week's top 3 only — rank accent, not identity.
- B7 Category as coin row — too long past ₹3,000.
- B8 Search + sort — full-list tool, not a glance.
- B9 Auto-grouped from UPI merchants — setup aid.
**Top 2:** B1 (+B3 emoji optional, +B4 on Home) — custom names as clear as defaults, aligned ranking (Cleveland & McGill); B5 families — learnable at 20, matches Harsh/Nishad, Fixed carries "subscription in 2 days". Con: placing custom categories in families.

## Part C — Coin test page
13 timed questions: 9 coin (₹225, ₹3,500, which-is-more ×2, week left ₹1,050, payment ₹350, goal ₹14,000, laptop ₹45,000, month left ₹2,600), randomised per question between A = V4 and B = V1; 4 category questions at 20 categories (most spent, find Gym, find Bike EMI, Snacks vs Gifts), randomised B1 ranked vs B5 families. Opens with "Every coin is ₹100." Records correctness + ms; summary by variant (correct, median time) + copyable text; results kept in that browser (localStorage) with "Copy all testers"; "Next person" resets. Rendering: rim, cup fill.

## Decisions for Tarun
- E1 Big amounts: A V4 · B V1 · C V7 (tabs). Suggested: test A vs B; C in tabs either way.
- E2 Rendering: A rim+cup · B rim+wedge · C flat+cup. Suggested A or B.
- E3 Category identity: A name-first ranked (+emoji, top 4 on Home) · B families · C families on Home + name rows inside. Suggested: test A vs B; C likely end state.
- E4 Colour for categories: A none · B top 3 only. Suggested A.
- E5 Placing custom categories in families: A user picks · B suggested from merchant, user confirms. Suggested B.
