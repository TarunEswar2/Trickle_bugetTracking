# Trickle v10 — Shape System (concept)

Source board: /home/claude/v10/shape-system.html (published artifact "Trickle v10 — Shape System"). Built prototype: "Trickle — v10" (see mockup_v10_build_notes.md).

## Core
- Shape = how much. Colour = what (category / Budget bone / Savings lime / New money green). Same everywhere.
- Ladder: ₹10 dot · ₹50 square · ₹100 triangle · ₹500 diamond · ₹1000 circle (coin: ring + centre) · ₹5000 star.

## Glyph construction
- 24-unit square cell; fill + same-colour 2-unit round-join stroke rounds all corners and equalises edge weight.
- Optical sizing: dot small (r4.6) on purpose; triangle lowered ~1 unit; diamond runs near cell edge; star 5-point, inner/outer 4.7/10, centre dropped 0.6.
- ₹1000 circle drawn as coin (ring 2.8 + centre dot) so it never reads as a large ₹10 dot.
- Each glyph has a different silhouette class (points, ring, 4-corner, 3-corner, flat, blob).
- B&W: shape unchanged; categories by 4 brightness steps + text label.

## Rules
1. Amounts (balance, payment, goal, income): greedy mixed breakdown, sorted star → dot, tap shows exact ₹.
2. Comparison charts: one glyph per chart, unit picked so biggest bar ≤ 40 glyphs, key "▲ = ₹100".
3. Partial amounts: visuals round to nearest ₹10. Exact ₹ in text/tap.
4. Max counts: mixed pile ≤ 24 glyphs; list rows ≤ 8 glyphs.
5. Non-money (days, counts, streaks): plain neutral dots.
6. Payments that need change break the larger glyph (₹1,500 − ₹350: diamond breaks, ▲■ stays, ▲▲▲■ leaves).
7. Income: green new-money shapes fall and recolour into Budget / Savings jars. Sankey moves to Insights.
8. Goal: saved glyphs filled, remainder as outlined glyphs.

## Logo options
- A Falling trail: star, diamond, dot descend diagonally into open jar outline.
- B Filled jar: solid lime jar, shapes knocked out, dot dripping in; best app icon.
- C Jar as letter: lowercase "t" whose hooked stem is the jar, star in the mouth; monogram.

## Sound
Soft sine per denomination, pentatonic, bigger = lower: star C4 262 · coin E4 330 · diamond G4 392 · triangle A4 440 · square C5 523 · dot E5 659. Unlocks on first tap.

## Resolved (final decisions, 30 Sep 2026)
- Ladder fixed at 6: ₹10 dot · ₹50 square · ₹100 triangle · ₹500 diamond · ₹1000 coin-circle · ₹5000 star. No ₹20 step. Shape = amount, colour = what. Min glyph size 14px in lists.
- Amounts: mixed denominations, greedy, sorted big→small, rounded to ₹10 in visuals, exact ₹ on tap; "breaking change" animation when paying needs a bigger glyph split.
- Comparison charts: one shape per chart with key ("▲ = ₹100"), ≤ ~40 glyphs.
- Shapes replace square tiles everywhere money is shown; non-money visuals (days, times, counts) use plain dots.
- Nearly empty (<₹5): empty outline + "almost empty" text.
- Money › Income: shape piles flowing into Budget and Savings jars (animated); no Sankey there. Sankey lives in Insights with shape-stack nodes.
- Logo: B (filled lime jar with shape cutouts) as app icon and mark in header/drawer. Splash uses A's falling-trail motion: six shapes fall into the jar with ₹ labels and one soft note each; first run teaches "each shape is an amount"; tap to skip; reduced motion shows the final state.
- Sounds: per-denomination soft notes on shape drops, capped at ~6 notes per animation; existing chimes kept; mute in drawer.
- Kept from v9: glow pace, no budget on Home, repeat buys (pinned, number on tap), 20 widgets, B&W mode (shape still = amount), one choice at a time, ledger invariant.
