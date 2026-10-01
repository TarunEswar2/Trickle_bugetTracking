# Trickle v12 — build notes (Phase 9)

Prototype: https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr · file /home/claude/v12/app/trickle-final-v12.html (copy in scratchpad) · design system: https://claude.ai/artifact/5wmMrG8kYqj3gLe2BGStNj

## Deep links
`#demo` seed (Tarun, hostel, Chennai, Wed 14 Oct 2026, UPI tarun@okaxis) · no hash / `#fresh` onboarding · `#frame=<id>` or `#<id>` any of the 75 frames · `#demo&seed=day1|lapse|monthend|bigincome|emptyjars` scenarios (lapse opens R-01, monthend opens R-02).

## Files (/home/claude/v12/app)
| File | Role |
|---|---|
| store.js | One ledger: months map (Jul–Sep closed, Oct open), derived reads, 30 actions through `act()` (snapshot undo + one bell log entry + checkLedger), 12 invariants, demo seed (mulberry32 history with hand-placed events: Jul lighter ₹250, Aug Fun take-from-Food, Sep late allowance), Starter-month seeds for 4 student types, `A.tick()` day advance (held subs → paid, 0 taps) |
| dots.js | Ladder renderer: crumb wedge (clockwise from 12, area-true) → dot → pill → block (1-unit hairline gap); states solid / out 1.6px / held / owed dashed / ghost / hatch; jar-4 stripe pattern; zoom one level; `key()`; `glowTrack()`; `DENSITY` constant (size follows surface) |
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
- All motion goes through `fx()`; sounds are muted placeholders (one soft tone if turned on in Sounds and motion).
