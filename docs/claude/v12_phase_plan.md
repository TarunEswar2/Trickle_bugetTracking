# Trickle v12 — Phase Plan

Why v12: v11 is clear but lost a lot of functionality and insights from v2–v10. Goal: bring back as much useful insight/functionality as possible WITHOUT losing v11's clarity (one decision at a time, low cognitive load, no budget on Home, no red). Explore more tile options. Constraint: UPI linkage or manual entry, no SMS.

Format of every phase: research/diverge → options → a DECISION BOARD (one artifact, updated each phase) showing test graphics of every option rendered with the same sample data + my recommendation → Tarun answers a short set of questions → decisions logged in claude/v12_decisions.md.

## Phase 1 — Recovery audit
Inventory every feature, insight and visual from v2–v11. Mark what v11 dropped, why, and the user value of each.
Decisions: what comes back (must / nice / no), at what depth (glance / explore / detail).
Test graphics: feature matrix (version × feature), thumbnails of each lost insight.

## Phase 2 — Tile exploration
Variants: ₹100 grid rows of 10, dot-matrix glow, tile bars, tile jars, stacked/isometric, tiles merging into blocks, tile + one number, day-tiles, liquid/fill tiles, density levels.
Decisions: tile form, large-amount collapse, key style.
Test graphics: same 6 scenarios (₹25 chai, ₹350 meal, ₹6,000 budget, ₹9,000 income, ₹499 subscription, goal 52%) in every option.

## Phase 3 — Insight & visualization library
Every returning insight in 2–3 tile-compatible forms (Sankey, range, calendar, time of day, repeat buys, month vs month, drift, pace, subscriptions, goal ETA, owed).
Decisions: one form per insight; default vs library.
Test graphics: side-by-side cards.

## Phase 4 — Information architecture & disclosure layers
Tabs, Home, widget board, glance → explore → detail, where each insight lives.
Decisions: tabs, Home, Insights structure, drawer.
Test graphics: tab maps, 3 Home variants, layer diagrams.

## Phase 5 — Core flows
Budget setup/edit, income split, pay + friction, empty jar, subscriptions, splits/owed, repeat buys, goals, manual entry, import.
Decisions: variant per flow. Test graphics: storyboards.

## Phase 6 — Visual identity
Palette (colour default + B&W), type, glow, cards, iconography, logo/splash (static).
Decisions: style direction. Test graphics: style tiles, screen samples.

## Phase 7 — Retention & emotional design
Loops, notifications, first-week journey, anxiety reducers, tone.
Decisions: what ships. Test graphics: loop diagrams, notification mocks, story cards.

## Phase 8 — Build plan
Screen + widget list, reuse map v2–v11, build order, checklist. Decision: scope sign-off.

## Phase 9 — Build v12 (functional, placeholder motion)

## Phase 10 — Validate
Ledger, numbers per screen, tile unit, banned words, no SMS, overflow, B&W, reduced motion, screenshots.

## Phase 11 — Handoff
Design-system update, usability test script.

## Phase 12 — Sounds & animations (dedicated pass)
Diverge: motion language options (calm / tactile / playful), per-moment animations (splash, tile drop/leave, income split, jar fill, goal milestone, month-end story, chart draw-ins, sheet transitions, glow shifts, haptic-style feedback), sound sets (2–3 palettes: soft chimes, wooden/tactile clicks, coin/cash-like), volume/mix rules, mute, silent-mode respect, reduced-motion fallbacks, performance.
Decisions: motion language, which moments animate, sound palette, defaults.
Test graphics: a motion + sound lab page (play each moment in each option side by side).
Then apply the chosen set to v12 and re-run Phase 10 checks.
