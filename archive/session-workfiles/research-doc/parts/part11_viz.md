## 11. Are the visualisations wrong?

Tarun's reading of the reviews (6 Oct): the feedback is "mostly that the questions are hard to understand, or what will a new user do; the grid is hard to understand. Maybe the visualisations are wrong." This part treats that as a hypothesis and tests it against everything in the record.

### 11.1 What the feedback is, and is not
- The reviews are **symptom reports about comprehension**, not design suggestions: "I can't understand", "what do I look at", "too much". They do not say what to change. That is normal for informal showings, and it means no amount of re-reading them will produce the fix. A **diagnostic test** is needed to locate the cause.
- Three candidate causes fit the symptoms equally well today:
  1. **H-VIZ: the representation is wrong.** The picture (the 10×10 grid and its siblings) cannot be read without learning.
  2. **H-WORDS: the language is wrong.** The questions and labels use ideas the user does not have yet (plan, income, split, box, pace).
  3. **H-ORIENT: the sequence is wrong.** A new user is not told what the app is for or what to do first, so any screen looks like noise.
- These are not exclusive. The evidence below says H-VIZ is plausible, H-WORDS is certain (Part 12), and H-ORIENT is likely (Part 12). The test in 11.6 separates H-VIZ from the other two.

### 11.2 What the visualisations are asked to do
| # | Job | Question the student is answering | Representation used in v14 / v15 |
|---|---|---|---|
| J1 | State of the week | "Am I okay?" | 10×10 grid, lit boxes = money left (Home) |
| J2 | State of one category | "How much of Food is left?" | Same grid, category colour; thin bar in the Spending list (v15) |
| J3 | Compare categories | "Where did it go?" | Nested rings (v14, V1); ranked rows with thin bars (v15) |
| J4 | Effect of a payment | "What does this payment do?" | Dashed ghost boxes where the payment leaves (V2); "N boxes go" (v15) |
| J5 | Split of income | "What is saved and what is spent?" | Two-band grid, savings below, spending above (V3) |
| J6 | Progress to a goal | "How close am I?" | Segmented ring (V4); grid on the goal screen (v15) |
| J7 | When I spend | "At what time or day does it go?" | Hot grid (calendar heatmap) (V7, V6) |
| J8 | This week against last | "Am I spending more?" | Two grids side by side, last faded (V9) |
| J9 | Repeats | "What do I buy again and again?" | Habit list then calendar hot grid (V6) |
| J10 | What is due | "What is coming out?" | Calendar of due dates, list (V8; v15 list only) |
| J11 | What happened | "What did I buy?" | Day-grouped list (V10) |

**Count of visual grammars a student must learn in v14:** the fill grid (liquid, left), the ghost-and-fade (loss at pay), the nested rings, the segmented ring, the band grid (income), the hot grid (intensity of spend), the waffle by goal and month (V4), the due-date calendar. **Eight.** v15 cut this to **five** (fill grid with ghost boxes, band grid, segmented ring, hot grid, thin bars). This follows an explicit Tarun decision on 2 Oct: *"every kind of information gets its own specific representation (no single universal unit)."* That decision is the root of the learning burden: each new job is a new picture to decode. The research the project cites points the other way (fixed unit, repeated, never enlarged; Neurath/Kinross, Haroz 2015; Part 3.1).

### 11.3 Seven structural problems with the picture, found by reading the build
1. **The meaning of "full" flips between screens.**
   - Home and category grids: lit boxes = money **left**, so the grid *empties* as you spend; full is good.
   - Savings and goals: lit = money **saved**, so the grid *fills* as you save; full is good.
   - No-plan Home (track mode): lit boxes = money **spent**, so the grid *fills* as you spend; full is neutral.
   - Insights hot grid: bright = **more spending**; bright is "more", not good or bad.
   - A student who learns "lit = good" on Home meets lit = more spending on Insights, and a Home that changes direction the day they make a plan. (Verified in `ui15.js`: plan Home uses `gridHtml(left share)`; track Home uses `multiGrid(spent parts)`.)
2. **The unit differs on every grid.** 100 boxes always equal 100% of whatever the grid shows (the week, a category, a goal), so "1 box ≈ ₹16" on Home, "₹5" on Food, "₹300" on a laptop goal. This is the v9 failure (the key must be re-read on every card), now behind a chip. It is a *percent* gauge dressed as a *rupee* gauge.
3. **100 marks.** Kay et al. (2016) found about 20 countable dots work for lay users; the stage-2 analysis scored the 10×10 waffle last of 15 (2.8 of 5). A fill level is read like a progress bar (perceived by edge position, not by counting), so the 100-mark objection may not apply, but this is an untested assumption.
4. **Colour carries too many meanings.** Green means "on pace" on Home, "savings" in Money, "added" in goals and "less than last week" in Insights. Amber means "ahead of pace", "over", "taken from savings" and the unsorted marker. Orange means "spending" in Money and "category" in the ring slots. The design system says colour never carries meaning alone (D-33), yet the same hue is reused across jobs.
5. **Which direction is bad?** Home shows green when the grid has plenty left and amber when it is nearly empty, but also shows *more boxes lit* as "better". A drained grid is "worse" while amber means "careful", and the sentence under it ("On pace.") must disambiguate. The sentence is doing the real work.
6. **The grid carries no information a number does not.** On Home the grid says the same thing as "₹796 left" (which was added back at Tarun's request). If a reader needs the number to confirm the grid, the grid is decoration, not instrument.
7. **The most distinctive use of the grid is the loss at payment (V2), not the state on Home.** The project's first decision on 2 Oct was: *"squares and circles are used ONLY to show loss, at the pay screen."* The same day the Viz 1 board made the 10×10 grid the general budget gauge. These two decisions pull in opposite directions (Part 9).

### 11.4 Evidence that supports the grid, so the verdict is fair
- Icon arrays and unit charts help low-numeracy readers (Garcia-Retamero & Cokely 2013; Haroz 2015) when the unit is **fixed and known**.
- A fill level is a position-along-a-scale encoding, among the most accurate ones (Cleveland & McGill 1984).
- The pay-moment ghost (J4) is a genuinely good fit for Soman's "rehearsal and immediate depletion" (2001).
- Reviewers were design students who may have *liked* the look; the complaint is comprehension, not taste, and there are no recorded comments praising the meaning.
- The grid is the product's most recognisable visual and Tarun's decision (V1). Changing it has a cost in identity and in the eleven visualisation boards (V1 to V11).

### 11.5 Candidate alternatives for the Home job (J1)
All draw the **same state** (₹796 left of ₹1,626 on Friday of a week). The first four are built behind the side-panel switch "Home picture (for 5-second tests)" in the v15 mockup.
| Option | What the student sees | What they must learn | Honest proportion | Uses the "₹100 to 150 a day" finding [P] | Pay-moment friction | My expectation [C] |
|---|---|---|---|---|---|---|
| **Grid** (current) | 100 boxes, lit = left, pace colour, "₹796 left", chip | box = 1% (or ₹16), lit = left, colour = pace | Yes | No | Strong (ghost boxes) | Reads slowly for new users |
| **Bar** | One rounded bar filled by the share left, "₹796 left" | Left to right = used to left | Yes | No | Weak | Fast; identical to a progress bar everyone knows; loses the identity |
| **Days** | "Lasts all week" or "Lasts until Thursday" with seven day tiles for the days the money covers at the planned daily rate | One tile = one day | Indirect | **Yes** (money as days of usual spending) | Medium ("this uses a day") | Likely the easiest for "can I spend this today?"; needs a stable "usual day" |
| **Words** | "About half the week is left." plus "₹796 left" | Nothing | No | No | Weak | Calmest; matches principle 3; cannot carry patterns |
| **Number first** | "₹796 left. About ₹114 a day." | Nothing | No | Yes | Weak | Fastest; conflicts with "no big number on Home" (V11-3), which was a hypothesis about the ostrich effect, not a finding about students |
| Dots ₹100 (v12) | Dots, pills, blocks | combining rules | Yes | No | Strong | Retired for combining problems |
| Ranked bars per category (S8) | Names on bars, no colour key | Nothing | Yes | No | n/a | Good for J3 |

Stage-2's own scoring (judgement, not users; `v14_stage2_representation.md`): Fixed dots 4.3, Relative words 4.1, Days of spending 4.0, Label-first ranked bars 3.9, Proportional bar 3.9, Fuel gauge 3.4, **Waffle 10×10 2.8**. The three highest-scoring simple options (words, days, bar) are the ones Tarun did not choose.

### 11.6 A decisive test (uses what is already built)
**Question:** does the picture, on its own, let a first-time student say how much is left and whether it will last?
**Design:** 5 participants, mostly non-design students (Part 10). Each sees **five** Home screens for 5 seconds each, one per variant, in a rotated order, each with a different state (so no memory of the answer) drawn from a set of five states (plenty, half, low, empty, plan not started). Nothing is explained beforehand.
After each screen ask: (1) "What is this telling you?" (free text); (2) "About how much is left: a lot, half, a little, none?"; (3) "Could you buy lunch for ₹150 today?"; (4) confidence 1 to 5. Record time to first answer.
**Scoring:** correct on (2) and (3); free-text coded as *state understood*, *wrong*, *asks what a box is* (a comprehension question).
**Decision rule (a starting line):** a variant "reads" if at least 4 of 5 answer (2) correctly and none asks what the shapes mean. If the grid fails and one of Days, Bar or Words passes, the Home gauge changes and the grid is kept for the pay moment (J4) and the category screens only. If all fail, the cause is not the picture (H-WORDS or H-ORIENT, Part 12).
**Second test:** a 5-second test of the **Insights hot grid** with the hero sentence covered and then uncovered.

### 11.7 A way to simplify without discarding the grid
1. **One direction everywhere:** lit = money left in anything that drains; a *bar or ring that fills* only where something is being built (savings), always green, never reused for spend.
2. **One unit per screen, said in a sentence:** "100 boxes = your week" first, "each box ≈ ₹16" second; ₹ only on tap (this is how it is drawn, but it is explained as rupees).
3. **At most three grammars:** state (bar or grid), time (hot grid), and building (ring).
4. **Colour contract:** green = money you have (left, saved); amber = careful or over; orange is not used for state; one hue per category with names always shown.
5. **The grid's strongest job is the payment:** keep ghost boxes at pay and on the category screen; test whether Home needs it at all.

### 11.8 Verdict
**Probably partly wrong, and the wrong part is its breadth, not its form.** Evidence: reviewers cannot read it (the strongest datum); the direction flips between screens; the unit is different on every grid; the project's own analysis ranked it last; and a number was needed beside it. Evidence against: the form has support in the literature when used with a fixed unit, and nobody has yet tried the simplest fix (teach it as 100% and keep one direction). **Confidence: moderate.** The five-second test in 11.6 would move this to high in either direction within a week.
