# Trickle v11: Phase 11, Validation

Prototype: https://claude.ai/artifact/4UpBjSSpxPXQiTjT9e7wGc · Validator: /home/claude/v11/app/validate11.js (Playwright, 412×860). Result: **44 PASS / 0 FAIL** after fixes. `node --check` on the bundled JS passes.

## Checklist
| Result | Check | Criterion | Evidence |
|---|---|---|---|
| PASS | Setup UPI path: taps with defaults | S3 | taps=4, scripted time 465 ms, lands on H-01; splash present=true |
| PASS | Setup default plan matches Phase 5 seed | S3/S12 | Food..Other=3100/1000/700/1400/752, savings 1400, subs 648 |
| PASS | Home empty state copy on day 1 | copy | fresh setup shows the Phase 8 empty-state line |
| PASS | Setup manual path (no UPI link) | S3 | income 12000, savings 1800, subs 0, jars 3600/2000/1000/2600/1000, taps 5 (+typing) |
| PASS | Zero amount error copy | copy | shown: "Type an amount above ₹0." |
| PASS | All 25 frames render | S4 | 25 frames: H-01 I-01 I-02 I-03 M-01 M-02 M-03 M-04 M-05 M-06 N-01 N-02 N-03 P-01 P-02 P-03 P-04 P-05 P-06 S-00 S-01 S-02 S-03 S-04 X-01 |
| PASS | Every nav target exists | quality | targets H-01, I-01, I-03, M-01, M-03, M-04, M-05, M-06, P-01, X-01; missing: none |
| PASS | Home: 0 numbers on first view (0 budget numbers) | S5/S6 | Home tokens: [] |
| PASS | Other screens: ≤2 numbers on first view | S6 | per frame: H-01=0 P-01=0 P-02=2 P-03=0 P-04=1 M-01=1 M-02=1 M-03=0 M-04=2 M-05=1 M-06=0 I-01=0 I-02=0 I-03=0 X-01=0 S-01=1 S-02=0 S-03=1 S-04=0 P-05=1 P-06=1 N-01=1 N-02=3 N-03=1 S-00=0 / over 2: N-02 [₹139,₹119,₹20] |
| PASS | Key "■ = ₹100" once on every screen with tiles | S7 | missing/duplicate: none |
| PASS | One glyph per visual (no size ladders) | S7 | visuals with mixed tile sizes: none |
| PASS | No red hues on any screen (colour scan) | S11 | 0 red elements across all frames (hue <12° or >348°, sat>45%) |
| PASS | Tap targets ≥44 px | a11y | all visible buttons/inputs ≥44×44 |
| PASS | No horizontal overflow at 412 px | quality | overflowing: none |
| PASS | Tab bar never clipped; content clears it | quality | clipped: none |
| PASS | One primary action per screen | S4 | frames with >1 primary: none |
| PASS | Banned words: none in visible copy | S11 | hits: 0 |
| PASS | Banned words: none anywhere in the built file | S11 | hits in source: 0 |
| PASS | grep -i sms = 0 | constraint | matches: 0 |
| PASS | No exclamation marks except one savings milestone | copy | visible "!" on load: 0 |
| PASS | Pay: ≤3 steps to UPI hand-off | S8 | 3 taps (Pay tab → Auto → Pay ₹60 with UPI); hand-off: "Opening your UPI app tarun@okaxis to ramesh.auto@okhdfc" |
| PASS | Pay: tiles leave the jar in ≤1.2 s | S8 | 1 leaving tile(s), last finishes at 200 ms |
| PASS | Pay: done screen + ledger | S12 | Paid ₹60 · Travel; Travel left 580→520 |
| PASS | Pay undo restores tiles | S12 | Travel left back to 580 |
| PASS | Repeat-buy line at pay (neutral) | S10 | P-04 shows: "5th chai this week." |
| PASS | Empty jar: one choice, 1 tap resolves | S4/S12 | sheet: "Fun is empty. /  / Take ₹200 from Food? /  / Take from Food / Pick another jar"; Fun left 800→50, Food 1600 |
| PASS | Whole budget used up: start next month lighter | S11/S12 | sheet: "Your spending money is used up this month."; next month lighter by ₹100 |
| PASS | Income: one confirm tap + undo | S9 | notif→sheet "₹1,500 came in. "; savings 1400→1600; toast "Split. Undo"; undo → 1 income |
| PASS | Unknown credit asks one question | S4 | owed now ₹0, Food got ₹155 back |
| PASS | Subscription: note day before, auto-deduct on due day | S10/S12 | note "Spotify comes out tomorrow. ₹119 is already set aside."; Spotify state → spent (hatched → outlined) |
| PASS | Subscription price change: one tap | S4/S12 | "Spotify now costs ₹139 (was ₹119)." → Spotify ₹139, spending money still ₹7600 |
| PASS | Add subscription in 3 one-field steps | S4/S12 | subs: Spotify,Google One,Coursera,Netflix |
| PASS | Split + repayment returns tiles to Food | S12 | after split owed ₹687 (3 friends incl. Rahul's earlier ₹155); after pay-backs owed ₹0, Food got ₹687 back; empty state "true" |
| PASS | Goal milestone (row fills, one "!") | S10 | ₹4160→₹4860; toast "Row 6 done. Goa trip is 60% there!" |
| PASS | Move tiles keeps the total | S12 | jars total/left before 6952/4282, after 6952/4282/1 |
| PASS | Return triggers day 2 / 7 / 30 exist | S10 | check-in: "A fresh week. "; notes day2, lapsed, story simulated |
| PASS | Month end: left over → savings, fresh start | S10/S12 | story "You saved ₹5,682"; savings 5400→9682; October starts with 0 income; next income ₹9000 → savings ₹1400, jars 3100/1000/700/1400/752 |
| PASS | Ledger checks 1–8 pass after every action | S12 | 152 fuzz checks + 18 flow checks + a check on every render; errors: none |
| PASS | Tile unit fixed at ₹100 (code + render) | S7 | UNIT=100 defined 1×, no adaptive unit; Food jar renders 31 tiles for ceil(left/100)+ceil(spent/100)=31 |
| PASS | Reduced motion: final states, no animation | quality | splash animation=none; pay shows 0 leaving tiles (spent drawn outlined), P-04 after ≈400 ms |
| PASS | B&W mode: patterns replace hues | quality | 34 patterned tiles on Insights, no --c-* fills, 0 red |
| PASS | Light theme renders, no red | quality | light Home + Money screenshots |
| PASS | Sound: soft WebAudio, mute works, peak ≤0.15 | quality | recipes tap,toggle,tile,pour,pay,save,income,goal,soft,thud,swish,flow; muted play()→false; peak cap 0.15; lowpass 2.4 kHz + compressor |
| PASS | No console errors | quality | 0 app errors (Google Fonts blocked by sandbox proxy, ignored) |

## Fixed during validation
- Ledger check 2 failed at the start of a new month, before any money had arrived (subscriptions are listed but nothing is set aside yet). Check 2 now applies once money has come in.
- The fuzz run found that undoing an income could leave goals bigger than savings. Undo now refuses in that case ("Some of it is already spent, so it stays split."). "Use savings" now only uses savings that no goal has claimed, and any shortfall starts next month lighter.
- A source comment contained a banned word ("assign"). It was reworded.
- From the screenshots: the month calendar dots were oversized (now 15 columns), the "Add a card" tile sat alone in its row (now full width), the little-things tiles were too small to read (now 20 px), and the weekly comparison compared an empty week (now this week against last week).

## Notes
- S1, S2 and S13 need people. See the 5-student script in the Design System artifact. The Phase 3 simulation predicts a 1.6 s read time for F.
- S6 exception: N-02 shows 3 numbers ("Spotify now costs ₹139 (was ₹119)." / "Take ₹20 from …"), because Phase 8 prescribes that copy.
- Timing: the scripted setup took about 0.5 s over 4 taps. A human needs about 15–25 s, which still has to be confirmed with a stopwatch.
- Console: 0 app errors. Google Fonts is blocked by the sandbox proxy only, so screenshots use fallback fonts.
- Colour scan counts a colour as red at hue <12° or >348° with saturation >45%. Travel (#d95926, about 17°) is the nearest hue and is orange.
