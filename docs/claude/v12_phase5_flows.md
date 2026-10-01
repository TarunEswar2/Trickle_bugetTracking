# Trickle v12 — Phase 5: Core flows

Date: 2026-10-01 · Board: Trickle v12 — Decision Board, Phase 5 section (storyboards, flow picker, tap/decision counts) · Script: /home/claude/v12/phase5.py

Built on Phase 4 decisions: widget-grid Home (no numbers), round Pay button beside the tab bar (Scan 1 tap, UPI ID / Log cash 2 taps), hybrid depth, gear per tab + avatar. Money model: Money in → Savings + Spending money; Spending money = Subscriptions (come out on their own on due dates) + jars. Rules: one decision per screen, no red, no debt words, dot system locked (dot ₹100, pill ₹1,000, block ₹10,000, pie-wedge cup fill; left solid in jar colour, spent outlined, savings green, income grey until split; owed = dashed). Motions: hourglass drop at pay, bangle close at goal complete.

Tap counts start from wherever the student is; 'auto' frames need no tap.

## Flows

### 1. First run + budget setup
- A One question per screen — 7 taps, 7 decisions
- **B Starter month (recommended)** — 4 taps, 3 decisions
- C Learn first — 3 taps, 2 decisions
- Recommendation: B. 4 taps, 3 decisions. The student-type pick does the work the 7 screens of A did; each layer is still editable one tap away (one decision per screen). Manual path: same 4 screens with "What comes in each month?" in place of the link.

### 2. Budget edit
- **Gear → jar → amount (recommended)** — 3 taps, 1 decisions
- Recommendation: One version. 3 taps. Each screen changes one thing; the total never changes unless you edit Money in.

### 3. Income arrival + split
- **A Ask once, split (recommended)** — 2 taps, 1 decisions
- B Silent auto-split — 0 taps, 0 decisions
- **C Irregular income (recommended)** — 3 taps, 2 decisions
- Recommendation: A for regular sources (2 taps, 1 decision), C for irregular ones (3 taps). B becomes the "Split on its own" setting after 3 months of same-split confirms.

### 4. Pay: scan → amount → jar → UPI
- **A Jar as a chip on the amount screen (recommended)** — 2 taps, 1 decisions
- B Jar first — 3 taps, 2 decisions
- C Pause screen — 3 taps, 2 decisions
- Recommendation: A. 2 taps to UPI hand-off from any tab, 1 decision (amount). Jar chip remembers the payee; per-day figure appears only when the jar is low.

### 5. Empty jar
- **A Ask once at pay (recommended)** — 2 taps, 1 decisions
- B Pay first, sort after — 1 taps, 1 decisions
- **C All jars empty (recommended)** — 2 taps, 1 decisions
- Recommendation: A + C. 2 taps. Never red, never "over". Food's future lanes shrink a little across all days rather than one blank day.

### 6. Log cash / manual entry
- **Pay → Log cash chip (recommended)** — 3 taps, 1 decisions
- Recommendation: One version. 3 taps.

### 7. Sort an unknown UPI payment
- **Bell → 3 chips (recommended)** — 2 taps, 1 decisions
- Recommendation: One version. 2 taps.

### 8. Subscriptions
- **Add · auto-deduct · price · cancel (recommended)** — 3 taps, 1 decisions
- Recommendation: One version. Add 3 taps; deduct 0; price change 1; cancel reminder 1.

### 9. Split with friends + owed back
- **A Toggle at pay (recommended)** — 3 taps, 2 decisions
- **B From spend detail (recommended)** — 4 taps, 2 decisions
- C Split later via bell — 3 taps, 2 decisions
- Recommendation: A at pay (3 taps) and B from the spend (4 taps) share one screen. Remind = share sheet with UPI link; paying back returns dots to the jar.

### 10. Refund
- **Match to the original spend (recommended)** — 2 taps, 1 decisions
- Recommendation: One version. 2 taps.

### 11. Savings goal
- **Create · add · reached · withdraw (recommended)** — 2 taps, 1 decisions
- Recommendation: One version. Create 2, add 1, withdraw 2 taps.

### 12. Month-end
- **A Choice, then story (recommended)** — 2 taps, 1 decisions
- B Auto-sweep — 0 taps, 0 decisions
- C Story first — 3 taps, 1 decisions
- Recommendation: A. 1 tap to save leftover, 1 to open the story. Default button is Savings; leftover kept rolls into next month's jars.

### 13. Move money between jars
- **From the jar (recommended)** — 3 taps, 1 decisions
- Recommendation: One version. 3 taps.

### 14. Bell actions
- **Needs-you on top (recommended)** — 2 taps, 1 decisions
- Recommendation: One version. 2 taps per item.

## Key copy (v11 tone kept)
- Pay: "Pay ₹60" · repeat line "3rd chai this week." · toast "Paid ₹60 · Food" + Undo
- Empty jar: "Fun has ₹200. Take ₹250 from Food?" → "Take from Food" / "Pick another jar"; after: "Food's days are a little shorter now." (re-spread, P2e-Q5)
- All empty: "Your spending money is used up this month." → "Start next month ₹250 lighter" / "Use savings"
- Income: "₹9,000 came in. Split it like last time?" → "Split it"; irregular: "For this month / Keep for later / Friend paying back"
- Month-end: "₹640 is left over." → "Move to Savings" / "Keep for next month"
- Import: placeholder in Spending settings, disabled "Choose file"

## Questions for Tarun (P5-Q1..Q5)
1. Onboarding: A 7 one-question screens / B starter month from student type (rec) / C learn from 30 days
2. Income: A ask once + undo, one question for irregular (rec) / B silent auto-split / C always ask
3. Jar at pay: A guessed jar chip on amount screen (rec, 2 taps) / B jar first / C pause screen
4. Empty jar timing: A ask once before UPI opens (rec) / B pay first, sort after
5. Month-end: A one choice then story in Insights (rec) / B auto-sweep / C story first
