# Trickle v12 — Phase 12 (part 1): Motion & Sound Lab

Lab: https://claude.ai/artifact/Ap3fww8xv5auAqFNtUE2Zf (source /home/claude/v12/p12/lab.html). The v12 app is unchanged; the choices get applied in part 2 through `fx()`.

## Moments (12)
Each has its `fx` hook: splash (`splash.trickle`, L3 wordmark + 5 dots trickling) · pay hourglass drop (₹350 from ₹2,100: a pill unfuses, 3½ dots drop through the neck and leave outlines, ≤1.2 s) · crumbs snap (4 × ₹25 quarter-wedges → one dot, `dots.merge`) · income arrival + split (₹9,000 neutral pills → Savings ₹2,000 first, Subs ₹1,000, Budget ₹6,000, `savings.drop`) · empty-jar question (no shake, no warning colour, `jar.respread`) · goal 25/50/75 milestones + bangle close (`goal.bangle`) · month-end ₹640 → savings + 3 story cards ending "You kept ₹640" (`story.frame`) · chart draw-ins (dot fill, dot-ribbon Sankey, ghost + hatched extra) · tap-zoom block → pills → dots → exact ₹ · Home glow shift (on pace → a bit fast, warms to amber over 1.6 s, never red) · sheet + tab transitions · button press.

## Options
Motion: Calm (cubic-bezier(.4,0,.2,1), 480 ms, stagger 60, emphasis 1.04) / Tactile (spring k320 c26, ζ .73, pre-sampled into CSS linear(); gravity ease-in for drops; press .94) / Playful (spring k190 c11, ζ .40, squash and stretch, press .90).
Sound (WebAudio only): Soft chimes (sine + triangle bells) / Wooden (bandpass noise + short marimba tones) / Coin (inharmonic plinks 1, 2.76, 5.4, 8.9 × f + high-passed paper rustle) / Off.
The full durations table, haptic patterns per language and reduced-motion fallbacks are in the lab specs table.

## Rules
- Each voice peaks at ≤0.15. Master 0.9 → lowpass 5 kHz → compressor (−24 dB, 4:1) → limiter (−3 dB, 20:1).
- Audio unlocks on the first tap.
- Max 1 sound per 300 ms; a higher-priority sound ducks the earlier one to 30%.
- Mute toggle in settings; phone on silent = no sound, haptics still allowed.
- Haptics through `navigator.vibrate` (the Android pattern is in the table).
- Reduced motion: every animation runs at 0 ms (final state), sounds keep playing.
- Performance: only transform, opacity and stroke-dashoffset animate, through WAAPI; no per-frame JS; ≤30 animated marks; ≤4 clones at pay.

## Recommendation
**Motion: Calm base + Tactile where the finger acts** (pay, crumbs, zoom, sheets, press). Playful is rejected because it reads as a game, and the brief says no games, streaks or confetti. **Sound: hybrid.**
- Coin sound only at pay and crumb snap, to re-couple the pain of paying (Prelec & Loewenstein 1998; Raghubir & Srivastava 2008).
- Chimes only for good news (peak-end rule, Phase 7).
- Wooden clicks for UI touches.
- Silent charts, glow and story cards.
Calm because financial anxiety drives avoidance (Olafsson & Pagel 2018; Shapiro & Burchell 2012), and calm tech keeps Home in the periphery (Weiser & Brown 1995).

## Check
Playwright Chromium, AudioContext stubbed, 1200 px dark + 400 px light, all 12 moments played:
- 0 console errors
- no horizontal overflow
- 208 gain nodes created by the sound engine
- 0 running animations under reduced motion
- frames reviewed

## Questions for Tarun
P12-Q1 motion language · P12-Q2 sound palette · P12-Q3 sounds on by default (re-confirm v9) · P12-Q4 haptics default · P12-Q5 which moments animate. Options and recommendations are in claude/v12_decisions.md.
