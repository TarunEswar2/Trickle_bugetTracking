# Trickle v14 — Stage 2: Representing money

Artifact: https://claude.ai/artifact/VYX5h82WLtxEyrgFtS2S1s (15 systems × 10 scenarios, colour + B&W toggle, disclosure strips, score matrix, top 4, recommendation, decisions; Stage 2b section added 2 Oct). Explorations only; Tarun decides.

## Problem (Tarun)
"1 dot = ₹100 is easy, but the problem comes with them combining into a line and a box. The biggest problem with not combining is larger amounts become harder to represent." / "₹6,000, ₹600 for food, ₹500 for tea — all these numbers are too much." Colour-coded categories are hard to memorise; progressive disclosure is key; income = spending + savings; unspent = saved.

## Scenarios (6-month seed)
₹25 chai · ₹350 meal · ₹9,000 income (₹2,000 save / ₹7,000 spend) · week ₹1,750, ₹1,050 left · month ₹7,000, ₹2,600 left · Food 2,800 / Travel 1,200 / Fun 1,000 / Study 600 / Subs 548 · ₹45,000 laptop goal · goal ₹14,000, ₹8,110 saved · four ₹25 chais · night spending.

## Systems (one-sentence rule · avg score /5)
- S1 Fixed dots, changing scale of view — "1 dot = ₹100 this week; zoom out and 1 dot = ₹1,000." · 4.3
- S2 ₹100 dots + count label — "past ten we tell you how many." · 3.6
- S3 Days of spending — "one block = one day of your usual ₹200." · 4.0
- S4 One proportional bar — "the filled part is what's left." · 3.9
- S5 Fuel gauge — weekly tank. · 3.4
- S6 Weekly envelopes — 4 envelopes per month. · 3.7
- S7 Relative words — "tap to see the rupees." · 4.1
- S8 Label-first ranked bars — names on bars, no colour key. · 3.9
- S9 Waffle 10×10 (1% each). · 2.8
- S10 Notes & coins (pay moment). · 3.0
- S11 Time strips (hour/calendar). · 3.1
- S12 Own equivalents ("≈ 14 chais"). · 3.4
- S13 Tally bundles of five. · 3.2
- S14 Tens-stacks (v12 combine baseline). · 3.6
- S15 Recommended hybrid. · 4.7

Criteria: learnable in one sentence, glance ≤3s, honest proportion, ₹25→₹45,000, no colour memorising, no big number on Home, friction at pay, awareness patterns, low load. Judgement scores, not user-tested.

Research: Kay 2016 (~20 countable marks); Gigerenzer & Hoffrage 1995 (counts over %); Barrio 2016 / Riederer 2018 (familiar perspective, small multipliers); Olafsson & Pagel 2018 (ostrich effect); Garcia-Retamero 2010 (show the whole); Neurath (repeat, don't enlarge); Cleveland & McGill 1984 (aligned length); Soman 2001 (rehearsal at payment).

## Top 4
1. S1 Fixed dots, changing scale — one shape, never merges, ≤20 marks per view; con: unit must always be written.
2. S7 Relative words — calmest Home, carries patterns; con: no proportion alone, weak pay friction.
3. S8 Label-first ranked bars — no colour key, most accurate comparison; con: shows ₹, tab-level only.
4. S3 Days of spending — uses "₹100–150/day" finding, scales to months; con: needs an agreed "usual day".

## Recommended hybrid (S15)
Home: one sentence in words + this week as 17½ ₹100 dots (filled = left, outline = spent), no ₹ figure. Pay: dots the payment will take turn dashed before confirm; chai = ¼ dot, four fill one. Spending tab: label-first ranked bars; month dots at ₹1,000 with the unit written. Savings/big goals: ₹5,000 dots + a days/months line ("≈ 6 months of saving"). Detail: exact ₹, own equivalents, hour strip for night spending. Dots never merge; large amounts handled by stated unit, not new shapes.

## Decisions for Tarun
- D1 Big amounts: A unit changes by view (S1) · B count label · C merge into tens · D days/months. Suggested A (+D as perspective line).
- D2 Home glance: A words + week dots · B words only · C dots only · D envelope. Suggested A.
- D3 Home timeframe: A week · B month · C today. Suggested A.
- D4 Categories without colour: A name on bar, ranked · B icon + name · C colour + legend. Suggested A or B.
- D5 Perspective unit: A days/months · B own buys · C both by size · D none. Suggested C.
- D6 Under ₹100: A partial dot (cup fill) · B rounded, exact on tap. Suggested A.

## Decided 2 Oct
- D1: The dot is central and consistent app-wide; it acts like a COIN you can physically lose. 1 dot = ₹100 always. Big amounts = small cluster of dots followed by a count label (e.g. "×60"). Needs validation with people. (Supersedes S1's changing unit.)
- D2: Home glance = one sentence + this week's dots, no ₹.
- D3: Home timeframe = this week.
- D4 (OPEN): categories are many (could be 20+) and users create custom ones with custom icons; icons alone won't work at 20; colour memorising doesn't work; representation must stay consistent everywhere. Needs ideation. → explored in claude/v14_stage2b_coins_categories.md.
