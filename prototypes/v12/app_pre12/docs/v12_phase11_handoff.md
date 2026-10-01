# Trickle v12 — Phase 11: Handoff

- Prototype: https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr — open with `#demo` to skip onboarding (Tarun, 14 Oct)
- Design system + test script: https://claude.ai/artifact/5wmMrG8kYqj3gLe2BGStNj
- Validation: claude/v12_phase10_validation.md (29/29 checks, 24/26 flows) · Build notes: claude/mockup_v12_build_notes.md

## What the design system page holds
Dot ladder spec with live specimens (₹52 / ₹652 / ₹3,600 / ₹15,000), geometry (D 10, G 2, pill 118×10, block 118×118, 1-unit hairline), seven states, ladder rules (order, ≤30 marks, zoom one level, key once per screen, DENSITY constant); palettes dark / light / B&W with dataviz validator results (dark CVD 7.6 Fun↔Savings handled by names + separate savings cards; light all PASS); type (Geist, tabular figures, Geist Mono eyebrows, L3 wordmark); components (tab pill + Pay, header, card, sheet, chip, glow track, day lanes, bangle, toast); widget sizes (Home grid, library, Android 4×1 / 2×2 / 2×1 / Jar 2×2 opt-in); 7 copy rules incl. banned list; the 5-channel notification set.

## Usability test (5 students, 25 min)
11 tasks mapped to S1–S13: T1 dot value + which-is-more (S1/S2), T2–T3 setup UPI and manual (S3), T4 Home 5-second (S5/S6/S13), T5 pay a chai (S8), T6 empty jar (S4/S11), T7 split + undo (S9), T8 split and pay back (S12), T9 5-second tests on Spending/Savings/Insights (S7/S13), T10 check-in + story (S10), T11 B&W jar identification (a11y). Switch rule: if T1 comparison <90% or median >3 s, test rows of five before changing the ladder.

## Known issues
- F4u (4 vs 3 taps) and F11 create (4 vs 2) exceed plan targets — see Phase 10 deviations.
- Notifications, UPI linking, hand-off and AutoPay are simulated; I-04/I-05 are triggered by demo chips (or the shade mock).
- Dark palette Fun↔Savings is in the CVD floor band; relies on names and position.
- P2-Q4 density still open; built as "size follows surface" behind `DENSITY`.
- Day lanes at widget size draw ₹100-ish days as one dot + slice; may read sparse.

## Next: Phase 12 (sounds & animations)
Swap the `fx()` placeholders (splash.trickle, savings.drop, pay.hourglass, pay.undo, dots.merge, jar.respread, goal.bangle, owed.fill, week.fresh, story.frame, glow.pulse, bell.dot, refund.return) and wire sound voices; keep reduced-motion fallbacks.
