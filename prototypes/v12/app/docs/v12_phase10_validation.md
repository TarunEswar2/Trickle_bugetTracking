# Trickle v12 — Phase 10: Validation

Date: 2026-10-01 · Prototype: https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr (`#demo` = Tarun's seeded month, today Wed 14 Oct; no hash or `#fresh` = onboarding)
Validator: /home/claude/v12/app/validate12.js (Playwright, /opt/pw-browsers/chromium, 412×860 + 360 px) → val12.json, val12.txt, shots/val/*.png (75 dark frames, 75 light frames, B&W light samples, live flow shots).

**Result: 29/29 checks PASS · 24/26 flows PASS** (2 flows exceed plan tap targets; see Deviations).

## Checks (verbatim validator output)
```
PASS node --check on bundled JS — all.js parses
PASS No SMS anywhere (grep -i sms) — matches: 0
PASS No debt/guilt words in UI + notification strings — 0 matches for over/overspent/deficit/debt/missed/streak/you were gone/only ₹X left
PASS Ladder: 200 amounts, Σ mark value = amount, marks = blocks+pills+dots+crumb, <₹100 = one wedge — 200/200 amounts exact
PASS Crumb wedge is area-true and starts at 12 o’clock — 60 random crumbs, max area error 0.53%, all start at top
PASS 10 dots fuse to a pill; blocks keep a hairline gap; dots keep a gap — pill=true, block gap 1px, dot gap 2px (viewBox units)
PASS All 75 frames registered — 75 frames
PASS Home first view has 0 numbers — H-01 tokens: []
PASS ≤2 numbers on first view elsewhere (exempt: S-00, H-02, S-02, N-04s, R-07, G-S6, S-S5, V-03, I-02) — all 65 non-exempt frames ≤2 distinct tokens
PASS Key "● = ₹100" exactly once on every screen with dots — every screen with dots has one key (poster, widgets, pay drop, Look swatch carry none by design; O-03 has one)
PASS Marks per card ≤ 30 — max 30 marks in any card
PASS No red hues (h<12 or >348, s>45%) in any frame, 4 looks — 0 red pixels-styles across 300 frame renders
PASS Tap targets ≥ 44×44 px — all buttons, links, toggles and zoomable dots
PASS Every nav target and action exists — all data-go frames and data-a handlers resolve
PASS One primary action per screen — max one .primary per frame/sheet
PASS Green only on savings; income in neutral ink — every green mark sits in a savings visual; "came in" visuals carry no jar or savings hue
PASS Glow used only for time / position — all glow tracks are pace, today, due, next money, ETA, hour or calendar
PASS B&W mode renders every frame with patterns, light + dark — 75 frames × B&W light/dark; blue jar becomes stripes, plum dots
PASS No horizontal overflow at 412 and 360 px — 0 of 375 renders overflow
PASS Starter month: change one thing → back to O-03 — Fun +₹100 → 1100, back on O-03, invariants PASS
PASS Undo restores the exact pre-action ledger — snapshot diff = 0 after income split undo
PASS 150 random actions: ledger invariants hold after each — 150 actions across 22 screens; 0 invariant breaks
PASS Ledger checked after every render/action (≥150 checks) — 152 checkLedger() runs in this page; flow-level errors: none
PASS Seed + scenario switches pass all 12 invariants — day1:ok lapse:ok monthend:ok bigincome:ok emptyjars:ok null:ok
PASS Notifications: ≤1/day, ≤3/week, none 22–08, 5 types with own channels — 30 simulated days → 9 sent; max/day 1, max/week 3, in quiet hours 0; types sent: income, story, checkin, welcome, subTomorrow; channels 5
PASS Return triggers exist: weekly check-in, month story, welcome back — N-05, N-04 (+ R-02 month-end), R-01 with #seed=lapse
PASS Big amounts stay readable (#seed=bigincome) — ₹45,000 earner, ₹1,50,000 goal: 15 blocks drawn, max 24 marks per card
PASS Reduced motion: no running animations; sounds off by default — P-05 running animations 0, splash 0; sounds default muted (placeholders)   [superseded by the Phase 12 re-run below]
PASS No console errors — 0 errors across all pages
```

## Flows (taps measured / plan target)
```
PASS F1 Onboarding (UPI) taps 3/4 splash auto-advances; lands H-00 (Home intro); 1607 ms scripted incl. 1.4 s splash; savings 2000, 4 jars, 3 held subs
PASS F1m Onboarding (manual, no UPI) taps 4/4 typed ₹12,000; manual-only, 0 UPI IDs, 0 subs; empty amount shows "Type an amount above ₹0."
PASS F2 Budget edit taps 3/3 Food → 3700 (+₹100 stepper, taken from the jar with most left)
PASS F3 Income regular (notification → Split it) taps 1/2 1 tap from shade; savings +₹2,000 first; toast with Undo; Undo restores exact ledger: true
PASS F3i Income irregular (Friend paying back) taps 3/3 owed ₹600 → 300; income unchanged (10500) — payback is not income
PASS F4 Pay by scan (from Savings tab) taps 2/2 scan simulated; hourglass ~1.1 s; back on V-01; toast "Paid ₹20 · Food"
FAIL F4u Pay UPI ID (recent payee) taps 4/3 Pay → UPI ID → payee → (type ₹60) → Pay; plan listed 3, counting the final Pay it is 4
PASS F5 Empty jar: take from another jar taps 2/2 asked once on P-06 before UPI; ₹229 moved in, Fun paid to zero, days re-spread
PASS F5b All jars used: start next month lighter taps 2/2 sheet P-06b; next month lighter by ₹250
PASS F6 Log cash taps 3/3 saved ₹80 cash to Food without UPI
PASS F7 Sort unknown payment (bell) taps 2/2 sorted to Travel (Fun too low → "didn’t fit" toast, nothing changes), payee remembered, needs-you item removed
PASS F14 Bell action taps 2/2 same path as F7/F10: bell → inline action
PASS F8 Subscriptions add / deduct / price / cancel taps 2/3 add 2 taps (Netflix held); Google One held→paid on due day with 0 taps; price 1 tap → ₹349; stop 1 tap → stopped
PASS F9 Split at pay taps 3/3 two friends picked (second pick counted as same step); owed ₹600 → 1200, outside balance
PASS F9s Split from spend detail + remind taps 4/4 split 4 taps; remind 1 tap → message with UPI link (pa=tarun@okaxis)
PASS F10 Refund back to Fun taps 2/2 Fun back ₹499; outline refilled
FAIL F11 Goal create / add / withdraw / complete taps 4/2 create 4 taps (name → amount → date, one per screen; plan target 2 not met), add 1, withdraw 2, complete opens V-04 automatically
PASS F12 Month-end → story taps 1/1 R-02 shown on 31 Oct; Move to Savings (₹2201) → lands on N-04 month story
PASS F13 Move dots between jars taps 3/3 Food → Travel ₹100
PASS F15 Weekly check-in (from notification) taps 1/1 one action on the notification starts the new week
PASS F15b Weekly check-in (in app card) taps 1/1 one card, one button
PASS F16 Welcome back taps 1/1 14 quiet days → R-01 (savings first, auto-sorted count) → Start from today
PASS F17 Edit Home board taps 2/2 Home gear → Hide
PASS F18 Pin an insight taps 2/2 Library → Pin money flow
PASS F19 Change look / B&W taps 2/3 avatar → B&W (true); Light (light)
PASS F20 Notification → one action taps 1/1 each of 5 notification types has one action button
```

## Exemptions used by the number scan
S-00 (the full ladder key), H-02 bell log, S-02 All spends, N-04s share poster (amounts toggle), R-07 notification shade mock, G-S6 CSV preview, S-S5 subscription price list, V-03 contribution list, I-02 payday list. Keypad digits and the "● = ₹100" key are not counted. Pay amount and its button count as one distinct token.

## Fixes made after looking at screenshots
- Cards collapsed inside the scroll column (flex shrink) → `.scr>*{flex-shrink:0}`.
- Spending jar card had 45 marks → one card per jar in a 2×2 grid (max now 30 in any card).
- Jar detail "Recent" list showed dates + amounts (7 tokens) → relative day words + mini outlined dots.
- Withdraw sheet had three ₹ chips → −/+ ₹100 stepper.
- Key missing on five sheets with dots → added.
- Small-buys equivalent read "twelve dozen" → "four dozen of your chais".
- Goal top-ups could fail when the fullest jar was short → draw across jars.
- Android widget glow collapsed by an icon rule → selector narrowed.

## Not measurable by script (Phase 11 usability test)
S1 (one dot = ₹100 in 5 s), S2 (which is more in 3 s), S13 (5-second tests) — script in the design-system artifact.

## Deviations
- **F4u Pay UPI ID: 4 taps vs plan 3.** Pay → Pay UPI ID → payee → (type) → Pay with UPI. The plan's 3 seems to omit the final Pay; F4 (scan) counts it. Option: show the four most recent payees as chips under the viewfinder (would make it 3).
- **F11 Goal create: 4 taps vs plan 2.** V-S1 is "one step per screen: name → amount → by when" (3 decisions + entry). Both can't hold; kept one decision per screen. Add/withdraw/complete meet targets (1/2/0).
- R-02 month-end goes straight to the month story after the choice (1 tap total instead of 1 + 1).
- Notification simulation sent 9 in 30 days (caps and quiet hours hold).

## Phase 12 re-run — motion + sound applied (2026-10-01)
Same validator, extended (section 8): AudioContext stubbed in every page (fake nodes record gain peaks), `navigator.vibrate` stubbed, all 12 moments played at 412 px dark, mid + end screenshots in shots/p12/, then a page with `prefers-reduced-motion: reduce`.

**Result: 37/37 checks PASS (29 prior + 8 Phase 12) · 24/26 flows PASS** (same two accepted tap deviations, P11-Q1/Q2). 0 console errors.

```
PASS Reduced motion: no running animations — P-05 running animations 0, splash 0
PASS P12: all 12 moments animate and finish (no stuck states) — running at end: 0 in every moment; mid-moment running anims splash 7, pay 8, crumbs 4, income 10, emptyjar 2, goal 3, monthend 4, storykept 1, charts 18, zoom 38, glow 2, sheet 2, press 1
PASS P12: hybrid sounds fire at the right moments; charts + glow silent — coin at pay + snap; chimes for arrive/split/milestone/complete/sweep/kept; wooden for ask/zoom/sheets/press; charts/glow silent true
PASS P12: every voice peaks ≤0.15; AudioContext stubbed, 0 console errors — peak 0.050; 46 stub nodes; 7 vibrate calls; 80 WAAPI animations
PASS P12: ledger invariants hold after all moments — checkLedger after pay ₹350, income split sheet, goal close, month-end sweep
PASS P12: max 1 sound per 300 ms (higher priority ducks) — played | dropped | dropped | dropped | dropped | dropped | played (ducked previous) | played
PASS P12: mute, phone-on-silent and haptics-off are respected — {"mute":"muted","silent":"phone on silent","hapOff":null,"vib":0}
PASS P12: settings — Sounds, Haptics, silent demo, Motion follows phone with override — 3 switches + Follow phone/Reduce/Full; override Reduce → 0 new anims, 0 running
PASS P12: reduced motion = 0 running animations (sounds keep playing); Full override animates — running per moment 0/0/0/0/0; anims before override 7; sounds played 2; Full override running 7
PASS No console errors — 0 errors across all pages
```

Per-moment log (running animations mid → end; sounds/haptics fired):
- splash 7 → 0 · chimes (locked until first tap, then played) · pay 8 → 0 · coin `leave` + vibrate [8,60,8,60,14]
- crumbs 4 → 0 · coin `snap` + [4,30,4,30,4,30,18] · income 10 → 0 · `sheetUp` → chimes `arrive` (ducks) → `split`
- empty jar 2 → 0 · wooden `ask` + [6], no shake, no warning colour · goal 3 → 0 · chimes milestone ×3 → `complete` + [20,80,20]
- month-end 4 → 0 · chimes `sweep` + [10]; last story card chimes `kept` · charts 18 → 0, silent · zoom ≤30 marks → 0, wooden `zoom` + [8]
- glow 2 → 0, silent (once per app open) · sheet up/down (clone slides out, 240 ms) · press .94 spring, wooden click + [8]

Looked at: shots/p12/*_mid.png and *_end.png (splash, pay, home crumb snap, income sheet, empty-jar sheet, goal ring mid-fill, story card, charts, zoom, glow, sheet closing, settings G-S4, reduced end state).

### Fixes made during the re-run
- Moments re-fired on same-screen re-renders (goal milestones played twice) → element moments are skipped when the screen + context did not change.
- A toast re-rendered the whole screen and cut the crumb snap and bangle short → toasts are now appended/removed without a re-render.
- Closing a sheet redrew the base tab's charts → chart draw-ins only on real navigation, not on sheet close.
- Sheet clone lost its styling → clone keeps classes but drops ids, data-actions, roles and pointer events (inert).

### Notes / known limits
- Phone silent mode cannot be read from a web page: the prototype has a "Phone on silent (demo)" switch; the Android build should read the ringer mode.
- Glow shift stays monochrome (Direction A); the lab's "warms to amber" is not used because v12 glow carries time/position only.
- Zoom on the Spending tab can briefly overlap the tab's own draw-in (38 running animations for ~0.5 s); each moment alone stays ≤30 marks.
- Stub gain peaks are per page load; recipes clamp every voice to ≤0.15 in `env()`.
