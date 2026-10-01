# Trickle v10 — Build notes (shape money)

Artifact: https://claude.ai/artifact/VNvhCh4BANCLMjwSC5ewkN ("Trickle — v10"). Source: /home/claude/v10/app/ (ledger, ui, glyph, sound, viz, app, flows, rhythm .js + style.css → build.py → trickle-final-v10.html; scratchpad copy too). Validators: validate9.js (v9 flows + invariant) and v10check.js (shape rules). No text-message tracking: linked UPI IDs or manual entry.

## What changed
- **glyph.js:** six-glyph ladder (dot ₹10, square ₹50, triangle ₹100, diamond ₹500, coin ₹1000, star ₹5000) from the concept board; `breakdown` (greedy, ₹10 rounding, <₹5 → hollow dot), `pileSpecs`, `pkey` (pile key + "tap for exact ₹"), `goalPile` (saved filled, rest outlined), logo B, splash, onboarding ladder.
- **ui.js `tg`:** every money grid now draws glyph SVGs (min 14px). Single-shape unit engine: UNITS = ladder, ≤40 per chart, key "▲ = ₹100". Specs without a shape (days, hours, visits, % of income) render as plain dots.
- **Splash (first run, not #demo):** six shapes fall into the jar biggest first with ₹ labels and one note each; "Each shape is an amount."; tap/Skip; auto-continues; reduced motion shows the final frame. Onboarding step 1 teaches the ladder.
- **Home:** logo B mark opens the drawer; recent rows show mixed piles (≤8 glyphs, 14px) with a pile key; goal jar is a shape pile.
- **Pay:** category balance as a mixed pile; paying outlines and flies out the leaving glyphs; if change is needed the big glyph breaks ("A ₹500 diamond breaks into change", new change glyphs burst in). Overspend as dashed warm outlines. Notes per leaving glyph (≤6).
- **Money:** balance as pile + key. Income: green new-money shapes fall and recolour into Budget and Savings jars (notes ≤6); Sankey moved out ("See the full flow in Insights"). Savings: goal piles, rainy-day jar pile ("almost empty" under ₹5). Budget grids stay one shape per chart.
- **Income sheet:** green glyphs move into Budget / goal slots and recolour.
- **Insights:** all money widgets use glyphs; Sankey nodes are shape stacks in the chart unit.
- **Drawer:** logo + wordmark, Sound on / Mute, Colour / B&W (shape unchanged in B&W).

## Validation
node --check OK; all data-a targets exist; v9 flow suite (invariant after each action, colour + B&W, both onboarding paths, reduced motion) no errors; v10check: every glyph grid has a key or tap total, single-shape charts use one shape and ≤40 glyphs, min glyph 14px, invariant + no overflow on every tab/sheet/story card in colour and B&W; splash reduced motion = final frame; grep -i sms = 0. Screenshots reviewed at 1x and 2x.

## Deviations / known issues
- Spend range stays a dot/line chart with a gridline key (not glyphs).
- Income-arrived sheet uses one shape per unit, not a mixed pile, so it can animate slot by slot.
- Partial single-shape glyphs are clipped from the bottom (reads OK for triangle/diamond, weaker for dot).
- Money › Income jars show one month; big months cap at 24 glyphs per jar.
