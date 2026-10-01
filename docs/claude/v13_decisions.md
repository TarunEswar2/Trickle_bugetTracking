# Trickle v13 — Decisions log

Tarun said "make your own decisions" (1–2 Oct 2026). Every v13 decision below was made by Claude, with the reasoning. All v12 decisions (claude/v12_decisions.md) stand unless a row says otherwise.

Links: prototype https://claude.ai/artifact/7p8hkxT1Bucq76CySm5DEF · design system https://claude.ai/artifact/A5xYpgoLKZwngjH2uV36FT · Figma page "v13 Design System" (node 23:36) in Trickle-Explorations (jaa1XnsKBLGcDLj5hYxpBr), boards 24:2 Identity, 25:2 Tokens/dots/components, 26:2 Onboarding template + screens (template component 26:5).

## Inputs found
| # | Finding | Effect |
|---|---|---|
| IN-1 | The 17-tile Gradients section (15:2) no longer exists in Tarun's Color Scheme frame (9:2). He replaced it with three hero mesh gradients (image 18:154): yellow→green→teal, coral→blue→teal, orange→yellow. | These three became the core of the identity: Grove, Tide, Ember. |
| IN-2 | Tarun added dot-ladder sketches with gradient-filled marks (Rs 50 = half dot, Rs 100 dot, Rs 1000 pill, Rs 10000 block, Rs 20000 two blocks) and an Income (grey) → Spending (red/pink/purple) + Saving (green) split. | Adopted the gradient depth on marks and the ₹50 half-dot in the logo. Kept no-red (v12 P2d-Q1): spending stays jar hues + outline. |

## Identity
| # | Decision | Reasoning |
|---|---|---|
| D13-1 | Green→amber is the brand and pace gradient. Grove (Tarun's yellow→green→teal) = on pace, logo, splash, Home intro, Pay button. Ember (his orange→yellow) = "a bit fast". | Tarun liked v10's green→amber pace transition; his own hero gradients already form that pair. |
| D13-2 | Gradient library of 10 named gradients mapped to moments: Grove (brand/on pace), Ember (a bit fast, onboarding step 2), Tide (Insights intro, night), Payday (Income intro, manual income), Savings Grove (Savings intro), Cool (Spending intro, Link UPI), Goal Reached, Fresh Start (Welcome back), Month Story, B&W. Each has an accent token. | Gives every big moment its own colour while staying inside his palette; accents carry the key phrase and button as in the Zentra reference. |
| D13-3 | Tide's warm corner moved from Tarun's coral (#DE4F45, hue 4°) to his "a bit fast" orange #F68E4F. | Keeps the no-red rule (validator scans h<12 or >348). |
| D13-4 | Gradients appear only as glows behind content, never as fills on data. Exception: marks get a subtle depth gradient (light corner → hue → darker corner) from Tarun's Dot-depth swatches. | Keeps data colour = identity; depth matches his sketches without changing hue meaning. |
| D13-5 | Logo mark: the dot ladder trickling down (pill ₹1,000 → dot ₹100 → half-dot crumb ₹50) in Grove gradient; wordmark "Trickle" Geist Bold −4% kept. App icon: Grove glow squircle + white mark; mono version for themed icons. | v12 P6-Q3 chose the wordmark; the brief allowed adding a mark. Built from the app's own unit so the logo teaches the system. |
| D13-6 | Typography: keep Geist (UI, tabular figures) + Geist Mono (eyebrows, key). Display 32/36 SemiBold −3% for onboarding/intro headlines, Title 24, Lead 20, Body 15, Sub 13.5, Eyebrow mono 11 +8%. | v12 P6 decided Geist; Zentra-style headlines need only a larger size and tighter tracking, not a new face. |
| D13-7 | Ground changes to #121318 (Zentra near-black), card #1B1C22, raised #26272E. | Matches the onboarding reference so glows fade into the same ground in-app. |
| D13-8 | Jar hues re-tuned and validated with the dataviz validator: dark #B8862A #4F8CEB #B9459A #2AA67A on #17181C → PASS all checks (v12 dark set failed: amber too light, savings↔plum ΔE 7.0 deutan). Light #B7791F #2F63C9 #93306B #1F9B84 on #F4F4F2 → PASS (worst ΔE 14.1). | Palette must be computed, not eyeballed. |
| D13-9 | Dark is the look the identity is designed in; appearance still follows the phone (v12 P6-Q2) with Light and B&W available. Light mode keeps the glows at ~55% opacity and darkens accents for contrast; B&W turns glows grey and underlines accent phrases. | v12 decision kept; brief's "dark default" satisfied because the demo/screens are dark-first. |
| D13-10 | Pay button uses the Grove gradient on every tab (ink in B&W). | It is the brand action; green elsewhere still only means savings in data. |

## Screens
| # | Decision | Reasoning |
|---|---|---|
| D13-11 | One template (Zentra style) for onboarding O-00…O-04, all five tab intros and Welcome back R-01: glow top ~half, mark + wordmark, 2-line headline with accent phrase, grey subline, step dots (active = pill), full-width accent button, text link. Interactive content (chips, keypad, options, starter-month cards) sits between subline and dots; on long screens the glow shrinks to 300px ("tall"). | Brief requirement; keeps one decision per screen. |
| D13-12 | Step dots: onboarding 3 steps (Link UPI / type / starter month); intros show tab position 1–5. Tab intro gradients: Home Grove, Income Payday, Spending Cool, Savings Savings Grove, Insights Tide. | Each tab gets its own colour identity. |
| D13-13 | O-02 (student type) keeps the four options as the decision and has no extra button. | Adding "Continue" would add a tap to the 4-tap onboarding (v12 F1). |
| D13-14 | Splash is the template with "Get started" + "See a demo month instead"; tapping anywhere still advances, and it auto-advances after 1.4 s as in v12. | Keeps F1 tap count and splash motion. |
| D13-15 | Home gets a v10-style pace glow behind the header: Grove when Easy/Steady, Ember when Quick. Home still shows no numbers. | v10 look Tarun liked; glow = position in the month, consistent with P2-Q3. |
| D13-16 | v10's shape/coin denomination system is not used. | Rejected by Tarun. |

## Figma
| # | Decision | Reasoning |
|---|---|---|
| D13-17 | New page "v13 Design System"; Tarun's Page 1 frames untouched. 23 new v13/* variables added to "Trickle colours" (Dark/Light/B&W) and 11 paint styles "Trickle v13 / Gradient / …". | Extend, don't overwrite. |
| D13-18 | Screens in Figma are rebuilt natively (not screenshots): 12 template screens + Home dark/light, Spending, Savings. | Image upload to Figma was blocked by the network proxy; native frames are editable anyway. Income and Insights key screens exist only in the prototype. |
