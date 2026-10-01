# Trickle v11: Build notes (Phase 10)

Artifact: https://claude.ai/artifact/4UpBjSSpxPXQiTjT9e7wGc ("Trickle — v11"). Add `#demo` to skip setup (loads Tarun, hostel, ₹9,000, 12 September). Source is in /home/claude/v11/app/: store.js, tiles.js, sound.js, app.js and style.css, bundled by build.py into trickle-final-v11.html (a copy is in the scratchpad).

## Build order followed (Phase 9)
1. **Store and ledger** (store.js): one store and one set of reads (`left`, `catsTotal`, `savingsTotal` and so on), so screens never compute their own totals. It covers the Phase 5 setup (A+F+E hybrid, type mixes, rounded to tiles, remainder to Other), income split with undo, pay and undo, move tiles, starting lighter, using savings, splits and pay-backs, subscriptions (due, price change, add, stop tracking), goals, and month close (left over → savings, or kept if the setting is on). `checkLedger()` implements checks 1–8 and also runs after every render. The seed reproduces Food 3,100 / Travel 1,000 / Study 700 / Fun 1,400 / Other 752, subscriptions 648 and savings 1,400.
2. **tiles.js v2**: mode F only, with `UNIT=100` defined once. It draws rows of 10 with a 5|5 gap, a partial tile filled from the bottom, 10×10 squares above 100 tiles, and four states (fill, outlined, hatched, dashed). It has drop and leave animations, B&W pattern definitions, and legend swatches.
3. **Shell and tokens**: dark first, with light and B&W. The widget grid uses S, W and L sizes. The pill tab bar is Home · Money · Pay · Insights, and settings sits in a header button. Screens pad 120 px at the bottom so the tab bar never clips content.
4. **Setup S-00 to S-04**: the splash drops tiles into a two-row jar and shows the tile-and-drip logo (v10 timing). S-01 has the detected UPI amount or a manual pad, S-02 picks a type, S-03 has the savings stepper, and S-04 shows the split bar with a legend. With defaults that is 4 taps.
5. **Home H-01**: pace glow with a word, Saved this month, Next to come out, This week, Little things, plus Add a card (library: Goal rows, Month so far, Where it went, Friends owe you, Spend range). It shows 0 numbers, and exact ₹ appear on tap.
6. **Pay P-01 to P-06**: pick who → jar (preselected) → "Pay ₹X with UPI" → tiles leave and the UPI hand-off appears → done, with the repeat line, split and undo. P-05 handles an empty jar ("Take from …") and the case where all spending money is used up (start lighter or use savings). P-06 is the split.
7. **Money M-01 to M-06**: overview with a split bar and one number, jar detail, subscriptions (with a 3-step add and stop tracking), savings and goal rows, move tiles, and friends owe you.
8. **Sheets N-01 and N-02**: money in ("Split it", Undo for 8 s, plus the unknown-credit question) and price change.
9. **Insights I-01 to I-03 and N-03**: week against last week, month-so-far calendar (not in tile units, no key), where it went, little things, the 5-card story ending "You saved ₹X" → Start a fresh month, a flow-of-tiles view, and the weekly check-in.
10. **Sound and motion**: the v9 WebAudio engine (2.4 kHz lowpass, compressor, peak ≤0.15), plus a thud and a swish (tile ticks capped at 10). Honours `prefers-reduced-motion` and the Less motion setting.
11. **Settings X-01**: Look (Colour / B&W), Theme, Sounds, Less motion, Keep left over, linked UPI (tarun@okaxis), the privacy line, **Try a moment** (10 simulated notifications from Phase 7), and Start setup again.
12. **Validation**: see v11_phase11_validation.md.

## Deviations
- Home "Little things" shows "Chai this week" as the subtitle. "Chai ×4 ≈ 1 tile" appears on tap, so Home keeps 0 numbers.
- Price change takes the difference from the jar with the most tiles left, as the Phase 5 rule says. The Phase 8 example says "Other"; the seed gives Food.
- The pace glow is neutral (Phase 6), not green or amber (Phase 0).
- Story amounts are computed rather than hardcoded (the seed gives ₹5,682 at day 12, not ₹2,150).
- M-05 uses From/To chips with a tile stepper instead of drag. Drag is not built.
- The notification caps (≤1 a day, quiet hours) are stated in the UI but not enforced by a clock.
- UPI hand-off, AutoPay detection and incoming credits are simulated.
