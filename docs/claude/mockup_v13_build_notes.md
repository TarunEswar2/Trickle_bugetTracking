# Trickle v13 — mockup build notes

Prototype: https://claude.ai/artifact/7p8hkxT1Bucq76CySm5DEF (open with #demo to skip onboarding; #fresh for onboarding; scenario seeds #seed=lapse, monthend, bigincome, emptyjars, day1 as in v12).
Design system: https://claude.ai/artifact/A5xYpgoLKZwngjH2uV36FT · Decisions: claude/v13_decisions.md

## Source (/home/claude/v13/app)
- Copied from v12: store.js (6-month seed May–Oct 2026, today 14 Oct), dots.js, app.js, motion.js, screens1–3.js, actions.js, style.css.
- New: id13.js (gradient library GRAD, PACE scale, mark(), lockup(), zt() template, zbtn/zlink, homeGlow(), gradient-depth defs GRDEFS injected into PATDEFS), theme13.css (v13 tokens, gradient marks, Home glow, template styles, light/B&W handling, Grove Pay button).
- Changed: screens1.js (O-00…O-04 and the 5 intros rebuilt on zt(); Home gets homeGlow()), screens3.js (R-01 on zt()), app.js (header wordmark carries the mark), motion.js (splash motion targets the template headline).
- Build: python3 build13.py → trickle-final-v13.html (+ t13.html, all.js). Validate: node validate13.js → val13.txt / val13.json, screenshots shots/val13/ (incl. tpl-*.png for every template screen, dark and light).

## Validation (2 Oct 2026)
CHECKS 41/41, FLOWS 24/26 (same two accepted v12 deviations: F4u Pay UPI ID 4 taps, P11-Q1; F11 new goal 4 taps, P11-Q2).
All v12 checks re-run and passing: ledger invariants after every render and 150 random actions, ≤2 numbers per screen (Home 0), dot ladder/crumb/fusing, key once per screen, no red (4 looks × 75 frames), no SMS, no guilt words, themes, B&W patterns, reduced motion, 44px targets, no overflow, P12 motion + sound, 0 console errors.
New v13 checks:
- 12 template screens × dark/light match the Zentra template (glow at top ≥280px, mark + wordmark, ≥30px 2-line headline with accent phrase in a colour ≠ ink, subline, step dots with ≥16px pill, full-width accent button, no button + options together); 7 gradients in use.
- Each tab intro uses its own gradient (grove · payday · cool · savings · tide).
- Home pace glow: Ember for Quick (demo), Grove otherwise.
- Solid marks use gradient-depth fills.

## Known issues
- Home pace glow is mostly visible behind the header; cards cover the rest (by design, like v10).
- Light-mode glows are paler (55%) and accent text is darkened with a CSS filter rather than separate tokens.
- Month story / goal-complete screens keep v12 styling; the Month Story and Goal Reached gradients are defined in the library but not yet applied to those screens.
- Figma: Income and Insights key screens not rebuilt in Figma (prototype only); crumb wedge in the Figma dot-system board is drawn as a half arc.
