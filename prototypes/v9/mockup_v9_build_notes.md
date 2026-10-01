# Trickle v9 — Build notes (Phases 3–5)

Artifact: https://claude.ai/artifact/5T3ob4cTpukfmmJts9ayA7 ("Trickle — v9"). Source: `/home/claude/v9/` (ledger.js, ui.js, sound.js, viz.js, app.js, flows.js, rhythm.js, style.css → build.py → trickle-final-v9.html; scratchpad copy too). Validator: validate9.js. No text-message tracking (grep -i sms = 0): linked UPI IDs or manual entry.

## What's new
- **Tile unit engine** (`unitFor`, `tiles`, `tkey`): ladder ₹10–2,500, caps 30 (S / per-category) and 50 (W/L), partial tile in quarter steps, "1 tile = ₹X" key on every tiled card.
- **Home:** glow + words (B&W: brightness), size-dot recent rows with key, subscription mini dot ring, pinned Goal jar + This month (3-month glowing dot matrix) + Repeat buys, Add widget tile.
- **Pay:** adaptive unit on the tiles step (₹50 for chai), repeat line "3rd time at Chai Tapri this week", fly-out, soft tone on overflow, pay + savings chime on done.
- **Money:** Income = Sankey (sources → Budget/Savings → categories, Left in budget, goals; tile-quantised nodes, animated bands, savings last + chime); Budget grids share one unit + key; Savings adds Savings rate, Savings growing, Rainy-day jar with key, Owed outlined tiles.
- **Insights:** 20 widgets in ref-style cards (title, settings icon, key, tap → exact ₹): Money flow, Where it went, Repeat buys ×4, Spend range, This vs last month, When you spend (24-dot ring), Savings growing (visible); Goal jar, This month, Purchase sizes, Month by month, Savings rate, Weekday pattern, Top places, Subscriptions, Owed to you, Goal ETA (in Add widget). Settings sheet: pin/unpin, move earlier/later, hide, look.
- **Repeat buys detail**, 4th check-in card (repeat buys last week), 5-card period story (Spent in tiles, The little things pour + count-up, Sankey, Leftover, You saved + chime), goal detail with contribution sources + ETA dot path.
- **Drawer:** Look (Colour / B&W), Sounds (On/Off), Count as repeat (3×/4×/5×), Reduce motion.
- **B&W:** black ground, grey ramp + pattern per category (solid / 45° / dots / 135°), savings white glow, pace by words + dashed.
- **Motion:** tile pop (spring, 18 ms stagger ≤600 ms), pour, column rise, dot light-up, Sankey node pop + band draw, glow cross-fade, count-up; entrance animations skip on in-place actions; reduced motion → final state.
- **Sound:** WebAudio, lowpass 2.4 kHz + compressor, per-voice peak ≤0.15 (max measured 0.12), tile tick 0.018 throttled, `save` ≤1 per 1.5 s, unlock on first gesture, mute persisted.

## Validation (validate9.js, Chromium 412×860)
node --check OK; all data-a handlers exist; no console errors; no overflow. Numbers on first screen (keys excluded): Home 0, Money 1, Actions 0, Insights 0. All 20 widgets in colour and B&W: every tiled card has a key, max 44 tiles (waffles 100). Sankey: middle nodes in = out, sources ₹9,300 = destinations, 10 bands. Flows with invariant after each (124 checks, all ok): pay with repeat line, overflow from jar, split, log cash, café income → Undo → Sort it, settle (Food 580→880), categorise, 4-card check-in, goal create/reached, move, pin/reorder/hide/add widget, story + fresh start + leftover, drawer (B&W, sounds, repeat 4×, weekly, fast glow), both onboarding paths. Reduced motion: tile and band animations 1 ms. Screenshots reviewed (colour + B&W).

## Deviations / known issues
- Month by month shows 3 months (seed history starts in July), not 6.
- Insights isn't split into section headers; order is user-controlled instead.
- Widget settings have no per-widget unit override or range toggle (Sankey is month only).
- Spend range is dominated by two big days (charger, Pizza Hut split); honest but squashes the other weeks.
- Seed now includes repeat habits (Chai Tapri, Campus Coffee, Metro card), so balances differ slightly from v8.
