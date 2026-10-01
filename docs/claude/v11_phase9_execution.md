# Trickle v11: Phase 9, Execution plan

## Screens (25 frames)
Setup: S-00 splash · S-01 money in · S-02 student type · S-03 savings · S-04 your month.
Home: H-01. Pay: P-01 amount/UPI · P-02 jar · P-03 tiles leave · P-04 done · P-05 jar empty · P-06 split.
Money: M-01 overview · M-02 jar detail · M-03 subscriptions · M-04 savings goals · M-05 move tiles · M-06 friends owe you.
Insights: I-01 board · I-02 month story · I-03 flow of tiles.
Sheets: N-01 income split · N-02 price change · N-03 weekly check-in. Settings: X-01.

## Widgets (from Phase 4 catalogue)
Home default: Pace glow (W) · Saved this month (S) · Next to come out (S) · This week (W) · Little things (W). Library: Goal rows (L), Month so far calendar (W, leaves tile), Where it went (L), Friends owe you (S), Spend range (W), Flow of tiles (L, Insights only).

## Reuse map
| From | Reuse | Change |
|---|---|---|
| v7 | ledger.js store, invariant validator, splits/IOU, subscriptions data | new invariants 1–8; remove To assign/pools |
| v8 | one-choice sheets, auto-split + undo, glow pace, goal waffle, story, check-in | new copy; ₹100 tiles only |
| v9 | sound.js (WebAudio), widget card chrome + settings sheet, B&W patterns, repeat buys, seed | drop adaptive unit (unitFor) → fixed 100 |
| v10 | splash motion timing, logo craft | tile+drip mark instead of shapes |
| v11 P2–4 | tiles.js renderer mode F, catalogue rules | add hatched/dashed/outlined states |

## Build order
1. Store + invariants + seed (Tarun, hostel, ₹9,000). 2. tiles.js v2 (states, animation, key). 3. Card/grid/tab shell + tokens (dark/light/B&W). 4. Setup S-00–S-04. 5. Home H-01. 6. Pay P-01–P-06. 7. Money M-01–M-06. 8. Income/subscription sheets N-01/N-02. 9. Insights + story + check-in. 10. Sound + motion + reduced motion. 11. Settings. 12. Validator run + screenshots.

## Validation checklist → success criteria
| Check | Criterion |
|---|---|
| New user states tile value ≤5 s (test page + 5 people) | S1 |
| Setup ≤30 s, ≤4 taps (scripted click count) | S2 |
| Home first view: 0 budget numbers, ≤2 numbers total | S3 |
| Every screen one primary decision (audit each frame) | S4 |
| Ledger invariants after every flow (≥100 checks) | trust |
| No "red", no banned words (grep copy list) | tone |
| No SMS strings (grep -i sms = only privacy line) | constraint |
| Key "■ = ₹100" on first tile visual per screen | legibility |
| Palette validator PASS dark; light relief via labels | a11y |
| Reduced motion, B&W, 412 px no overflow, no console errors | quality |

## Risks
- ₹100 tiles too many for large incomes (₹50k+): group 10×10 squares; test with 2 users.
- Suggested budget wrong for non-hostel users → month-2 copy-last-month corrects; S2 types limited.
- UPI AutoPay detection is a prototype assumption; manual add must be equally fast.
- Colour vs B&W default split taste → keep the toggle in Settings, not setup (one-decision rule).
- Phase 3 is simulated; switch rule to D if real test fails.
- Sound annoyance → throttle, mute respects silent switch.
