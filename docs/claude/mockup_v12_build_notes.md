# Trickle v12 — build notes (Phase 9)

Prototype: https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr · file /home/claude/v12/app/trickle-final-v12.html (copy in scratchpad) · design system: https://claude.ai/artifact/5wmMrG8kYqj3gLe2BGStNj

## Deep links
`#demo` seed (Tarun, hostel, Chennai, Wed 14 Oct 2026, UPI tarun@okaxis) · no hash / `#fresh` onboarding · `#frame=<id>` or `#<id>` any of the 75 frames · `#demo&seed=day1|lapse|monthend|bigincome|emptyjars` scenarios (lapse opens R-01, monthend opens R-02).

## Files (/home/claude/v12/app)
| File | Role |
|---|---|
| store.js | One ledger: months map (May–Sep closed, Oct open), derived reads, 30 actions through `act()` (snapshot undo + one bell log entry + checkLedger), 12 invariants, demo seed (6-month mulberry32(42) history, see below), Starter-month seeds for 4 student types, `A.tick()` day advance (held subs → paid, 0 taps) |
| dots.js | Ladder renderer: crumb wedge (clockwise from 12, area-true) → dot → pill → block (1-unit hairline gap); states solid / out 1.6px / held / owed dashed / ghost / hatch; jar-4 stripe pattern; zoom one level; `key()`; `glowTrack()`; `DENSITY` constant (size follows surface) |
| motion.js | Phase 12: `MS` engine behind `fx()` — WAAPI moments, hybrid WebAudio sound, haptics, screen/sheet transitions, press feedback, `reduced()` |
| app.js | Shell: header (?, gear, bell soft dot, avatar), floating 5-icon pill + round Pay, router (`go/back/toTab`, tab intros on first visit), sheets over base frames, toasts with Undo, `fx(name,el)` motion/sound hook with reduced-motion fallback |
| screens1–3.js | 75 frames (onboarding 6, Home 5, Income 10, Spending 15, Savings 8, Insights 9, Pay 8, app-wide 6, retention/system 8) |
| actions.js | UI handlers, `notifSim(days)` (≤1/day, ≤3/week, quiet 22–08) |
| style.css | Direction A tokens dark + light companion, `data-mode` override, `.bw` patterns, reduced motion |
| build12.py | Bundles to trickle-final-v12.html + t12.html (validator copy) + all.js |
| validate12.js | Phase 10 validator; shot.js + sheet.py for contact sheets |

## Per tab
- **Home** — widget grid: Pace (word + glow), Jar left, Little things, Subscriptions next due, Next money in, Goal; add tile; 0 numbers. Bell: needs-you (sort with 3 jar chips, refund, split it) above a 90-day log with tab filters. Edit board (reorder/hide, max 6) + widget library of number-free forms.
- **Income** — next money in (glow), this split (green savings first, ink budget), sources, where money sits (jars + held dashed, savings, owed dashed outside). Demo chips trigger I-04 (one confirm + Undo) and I-05 (irregular: for this month / keep for later / friend paying back). Settings: sources, savings share, split order, period.
- **Spending** — "₹X a day for the rest of October", day lanes (today ringed with glow, future re-spread), one card per jar (expand in place: exact ₹ + per day), held subscriptions, owed, repeat buys. All spends with filters; jar detail with ghost of last month + hatched extra; spend detail (change jar, split); subscription year cost; friend remind with UPI pay link; sort sheet. Settings S-S1…S-S7 (import is a disabled placeholder).
- **Savings** — goal (saved solid / to go outline), ETA glow, growth by month, leftover rolled; all goals + general; add ₹100/₹500, withdraw sheet; bangle close on completion (auto V-04). New goal 3 steps, goal order, leftover rule.
- **Insights** — What changed (ghost + hatch), Category share, Small buys add up (own-chai equivalent), Month story; library of 12 views (dot-ribbon Sankey with two-column fallback, glow calendar and time of day, drift, weekday, range, big one-offs, subscription year cost, savings rate, money as time, month by month); 5-card story + share poster (amounts hidden by default); weekly check-in.
- **Pay** — round button on every tab → camera (tap frame to simulate scan), Pay UPI ID, Log cash; amount screen with guessed jar chip, repeat line, per-day line only when the jar runs low, split toggle; empty jar asks once before UPI (take from a jar / start lighter / use savings); hourglass placeholder then toast + Undo back on the tab you came from.

## Notes
- No SMS string anywhere in the bundle (grep = 0). Manual-only onboarding links no UPI IDs.
- Geist loads from Google Fonts; the validator sandbox blocks it, so screenshots show the system fallback.
- All motion goes through `fx()` → motion.js (see Motion + sound below).

## 6-month seed (applied 2026-10-01)
`#demo` now carries May–Oct 2026 (was Jul–Oct), fixed RNG mulberry32(42). Every month: ₹9,000 allowance split ₹2,000 savings (₹1,000 Goa + ₹1,000 phone) / ₹7,000 budget; Spotify ₹119, Google One ₹130, Prime Video ₹179 → ₹299 from August (price change; Study jar absorbs the difference); daily Ramu chai (~55% of days) plus generated spends from student places; leftover rolled to Goa at month-end.
- **May** — calm mess-canteen month, daytime hours; Amma birthday gift ₹2,000 (kept for later); Book Palace ₹540; kept ₹820.
- **Jun** — exams: late-night Swiggy; Travel ran long → ₹300 taken from Fun, Study topped up ₹200 from Food; semester textbooks ₹780; freelance ₹2,500; kept ₹50.
- **Jul** — weekend PVR heavy; Saravana Bhavan ₹1,600 split 4 ways, all paid back; concert ₹650; birthday treat ₹250 started Aug lighter; kept ₹0.
- **Aug** — weekend metro; Food → Fun ₹250; Zomato ₹840 split with 2 (repaid); Decathlon refund ₹899 to savings; kept ₹600.
- **Sep** — early-morning chai month; bus to Madurai ₹620; freelance ₹1,800; allowance late (3rd); kept ₹640.
- **Oct** — unchanged open month (owed, refund pending, unsorted QR).
Goa target raised to ₹14,000 (now ₹8,110); phone ₹6,000/15,000; general savings ₹8,699. Savings "Growth by month" now renders as one card per 3 months so each card stays ≤30 marks. Ledger invariants hold for all months and all 5 scenario seeds; validate12.js 37/37 checks (flows 24/26: F4u and F11 are tap-count targets, unrelated to the seed).

## Motion + sound (Phase 12, applied 2026-10-01)
Decisions P12-Q1…Q5 (claude/v12_decisions.md); specs from claude/v12_phase12_motion_sound.md; ported from the lab's "Recommended" pane.

**Engine (motion.js).** The rendered DOM is always the final state; WAAPI animations run *from* a start state (`fill:'backwards'`), so a skipped, cancelled or reduced animation can never leave a stuck state. Only transform, opacity, stroke-dashoffset (and fill-opacity on the pay outline) animate; ≤30 marks per moment; no per-frame JS. Calm = cubic-bezier(.4,0,.2,1) 480 ms, enter (.2,.8,.2,1), stagger 60. Tactile = spring k320 c26 pre-sampled into CSS `linear()` (fallback overshoot bezier), gravity ease-in (.55,0,1,.45) for drops, press .94.

| Moment | Hook | Motion | Sound (hybrid) | Haptic |
|---|---|---|---|---|
| Splash | `splash.trickle` | wordmark 500 ms, 5 dots trickle 520 ms, stagger 120 (calm) | chimes (after first tap) | — |
| Pay | `pay.hourglass` (P-05) | up to 4 marks drop 620 ms gravity + landing squash, then turn to 1.6px outlines | coin `leave` | [8,60,8,60,14] |
| Crumb snap | `crumbs.snap` (Home after a non-₹100 pay) | ≤4 crumbs spring-snap (tactile) | coin `snap` | [4,30,4,30,4,30,18] |
| Income + split | `savings.drop` (I-04, O-03), `income.split` | savings marks fade-rise first, jars 480 ms later (calm) | chimes `arrive` → `split` | [10] |
| Empty-jar question | P-06 / P-06b sheet, `jar.respread` | card rises 320 ms calm; no shake, no warning colour | wooden `ask`, `drop` | [6] |
| Goal milestones + bangle | `goal.bangle` (V-04), `goal.add` | ring fills 480 ms per 25% step, close 900 ms + 1.04 halo | chimes milestone ×n, `complete` | [8], [20,80,20] |
| Month-end → story | `monthend.sweep`, `story.frame` | kept dots glide in on card 1; cards fade-rise 420 ms | chimes `sweep`; last card `kept` | [10] |
| Chart draw-ins | Insights, Spending, Savings, Income on navigation | first chart's marks fill (stagger 18), others fade 700 ms | silent | — |
| Tap-zoom | `dots.merge` | zoomed marks spring in, stagger 14, ≤30 | wooden `zoom` | [8] |
| Home glow shift | H-01 once per app open | "now" glow glides + cross-fades 1.6 s ease-in-out (mono) | silent | — |
| Sheets / tabs / push | render() | sheet springs up (calm for P-06, R-02); closes as an inert clone 240 ms gravity; tab fade 200 ms; push slide 16 px | wooden `sheetUp`/`sheetDown`/`tab` | [6] on sheet |
| Button press | pointerdown on buttons, chips, list rows, tabs, Pay | .94 spring back | wooden `press` | [8] |

**Sound rules.** WebAudio only: master 0.9 → lowpass 5 kHz → compressor (−24 dB, 4:1) → limiter (−3 dB, 20:1); each voice ≤0.15; unlocks on the first tap/key; max 1 sound per 300 ms — a higher-priority sound ducks the earlier one to 30%, an equal/lower one is dropped. On by default.

**Settings (G-S4 Sounds and motion, from avatar → app settings).** Sounds on/off · Haptics on/off · Phone on silent (demo; real build reads ringer mode — no sound, haptics allowed) · Motion: Follow phone (default) / Reduce / Full. Prefs: `sound:true, haptics:true, silent:false, motion:'system'`.

**Reduced motion.** `reduced()` = override or `prefers-reduced-motion`; no animation is created at all (final states shown), sounds still play, CSS animations/transitions off.

**Test hooks.** `MS.log` (sound/haptic results), `MS.snd(evt)`, `MS.anims`, `MS.running()`.
