# Trickle v11: Phase 12, Handoff

- Prototype: https://claude.ai/artifact/4UpBjSSpxPXQiTjT9e7wGc (use `#demo` to skip setup)
- Design system and test script: https://claude.ai/artifact/5UZ2eUCztvZT81UrRfRDVZ
- Tile test (Phase 3): https://claude.ai/artifact/GqCAwwW9LBbtFJ2jkeSZph

## What the design system page holds
Tile spec (■ = ₹100, 5|5 rows, partial tile, 10×10 squares, four states), palette (colour dark and light, B&W patterns, validator results), type scale (Bricolage Grotesque, Figtree, JetBrains Mono), components (tile bar, split bar, pace glow, widget sizes S/W/L, sheet, tab bar), the motion and sound table with reduced-motion fallbacks, and 7 copy rules including the banned list.

## Usability test (5 students, 25 min each)
11 tasks mapped to S1–S13: tile test (S1/S2), setup with stopwatch (S3), one-question-per-screen probe (S4), 5-second Home test (S5/S6/S13), pay ₹60 (S8), empty jar (S4/S11), money in and undo (S9), split and pay-back (S12), 5-second tests on Money, Insights and jar detail (S7/S13), check-in and story (S10), B&W identification (a11y). Switch rule: if F scores below 90% on "which is more", or its median time is above 3 s, retest against D.

## Next
1. Run the 5-student test and the tile test with real people. S1, S2 and S13 are the only criteria still unmeasured.
2. Try drag-to-move tiles (M-05) and a lock-screen widget.
3. Test large incomes (₹50k+) with 10×10 squares on two users.
4. Real UPI hand-off (intent URL) and AutoPay mandate reading remain prototype assumptions.
