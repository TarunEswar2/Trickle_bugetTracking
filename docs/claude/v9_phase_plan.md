# Trickle v9 — Phase plan

Goal: v8 tile identity and UX principles kept; much better data visualisation (adaptive labelled tile units, Sankey, range, best of v7), a small-purchase suite, satisfying motion + soft WebAudio sounds (on by default, mutable), optional black & white mode. Hard constraint: no SMS tracking (UPI linkage or manual entry).

| Phase | Output | Done when |
|---|---|---|
| 1 Audit | `claude/v9_phase1_audit.md` | v8 visuals + v7 verdicts + small-purchase gaps listed (done) |
| 2 Spec | `claude/v9_phase2_spec.md` + "Trickle v9 — Spec" artifact | tile unit rule, 20-widget catalogue, motion, sound, B&W, screen changes, build order (done) |
| 3 Build | `/home/claude/v9/` → trickle-final-v9.html | tile engine, themes, widget chrome, all widgets, small-buys suite, Sankey |
| 4 Motion + sound | same build | all animations + reduced-motion fallbacks; sound engine, events, mute, unlock |
| 5 Validate | `claude/mockup_v9_build_notes.md` | invariant ok after every flow; every tiled card has a key and ≤ cap tiles; numbers budget per screen; colour + B&W screenshots reviewed; reduced motion; gains ≤ 0.15; SMS grep = 0; no console errors / overflow |
