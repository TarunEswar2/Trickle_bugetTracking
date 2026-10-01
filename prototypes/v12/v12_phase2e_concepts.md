# Trickle v12 — Phase 2e: Dot system + concept deep-dive

Board: Phase 2e section (concept switcher: 6 concepts × 15 states, colour + B&W). Builds on claude/v12_phase2d_sketch_concepts.md and claude/v12_phase2c_money_viz_research.md.

## Decisions applied (Tarun, after 2d)
- Red = spent, green = left in his sketch: meaning kept, no red. Spent = outlined dots, left = solid.
- Circles are the ₹100 unit, small gap (2px at dot 10px) so they are countable. Ladder: crumb <₹100 → dot ₹100 → pill ₹1,000 (row of 10 fuses) → block ₹10,000. Blocks keep a hairline gap.
- Cup fill inside a circle must read by area.

## Cup fill inside a circle (area-true)
- **A · Pie wedge (rec.)**: Area = share exactly. Quarters read as a clock: ₹25 = quarter past.
- **B · Concentric core**: A small disc grows from the centre; radius √share, so area is exact.
- **C · Area-true level**: Keeps the cup: liquid height solved so the AREA is the share. ₹25 sits at 0.30 height, not 0.25.
- **2d · Height fill (old)**: For contrast: a quarter-height fill is only 20% of the area.

Recommended: A, pie wedge. Used in every concept on the board.

## The 15 states (same for every concept)
| # | State | Sentence | Research |
|---|---|---|---|
| S1 | Income arrives + split | ₹9,000 came in: ₹6,000 to this month, ₹499 held for subscriptions, ₹2,501 to savings. | M7 part-to-whole; mental accounting (Thaler 1999; Heath & Soll 1996). |
| S2 | Category budgets | ₹2,100 of ₹6,000 left. Food has the most left; Other is nearly done. | M1 leftover-first + M14 jars side by side; whole stays visible (Garcia-Retamero 2010). |
| S3 | Subscriptions auto-deducted | ₹493 held for three subscriptions. Spotify is paid; the other two leave on their dates. | Earmarking (Soman & Cheema 2011): held money is dashed, never counted as left. |
| S4 | Pay ₹350 (animated) | Three and a half dots lift out and stay as outlines. ₹1,750 left. | M2 pay moment (Soman 2001; Prelec & Loewenstein 1998). |
| S5 | Four ₹25 chais | Each chai fills a quarter wedge; the fourth completes one ₹100 dot. | M4 crumbs stack into a tile; frequency format (Gigerenzer & Hoffrage 1995). |
| S6 | Big one-off ₹2,400 | ₹2,400 left at once: about 7 of your usual dinners. | M5 own-unit equivalents (Barrio 2016; Riederer 2018). Marked once, no alarm. |
| S7 | Overspend / empty jar | Fun is empty. The extra ₹250 came from Food; Food has ₹550 left. | No red (ostrich effect, Olafsson & Pagel 2018). Extra is hatched, outside the jar. |
| S8 | Split + owed back | You paid ₹1,200. Your share is ₹300; ₹900 is coming back from three friends. | Owed is dashed green: drawn, not spendable until it arrives. |
| S9 | Refund | ₹350 came back. Outlines refill; Food has ₹1,150 left again. | Reverse of the pay motion. Same rule, no new symbol. |
| S10 | Goal ₹8,000 at 52% | ₹4,160 saved for the phone. ₹3,840 to go. | M6 goal: saved solid, to-go outlined (Kivetz 2006). |
| S11 | Month-end leftover → savings | ₹400 was left on the 30th. It moved into savings. | Leftover becomes progress, not a reset (goal gradient). |
| S12 | This week vs last week | You spent ₹600 more than last week, mostly Friday food. | M8 ghost + hatched extra + one sentence (locked, P2c-Q4). |
| S13 | Category comparison | Food took the most: ₹2,200 of ₹3,900 spent. | Aligned rows on a common baseline read best (Cleveland & McGill 1984). |
| S14 | Day view | Thursday was the big day. Wednesday you spent nothing. | Position over time; glow ring only marks today (P2-Q3). |
| S15 | Tap-zoom + scale | ₹25 → ₹350 → ₹6,600 → ₹1,23,000, same rules. Tap a figure to zoom one level. | P2b-Q3 zoom one level; repeat, never enlarge (A2). |

## Concepts

### Merging Dots (Tarun's)
- Rule: A dot is ₹100. Ten dots in a row fuse into a pill (₹1,000); ten pills into a block (₹10,000). Blocks keep a hairline gap. Less than ₹100 fills a dot like a clock wedge.
- Good: His own form; the purest isotype (repeat the unit, never enlarge it). Works for every kind of money.
- Risk: Long rows for mid amounts (₹6,000–9,000 = 6–9 pills). Needs one more idea for "today".

### Day lanes (N2)
- Rule: The same dots stood upright. For spending money, each lane is one day's share; today's lane empties as you pay.
- Good: Answers "can I afford this today?" without a number (per-day allowance, M3). Upright pills keep the ladder.
- Risk: Income, goals and subscriptions are not daily; for them lanes are just upright pills. Daily shares can feel like a diet.

### Glass columns (N3)
- Rule: A glass holds ten ₹100 dots (₹1,000). Dots stack from the bottom; a full glass fuses into one column. ₹10,000 is a jug.
- Good: Level is read at a glance and the dots inside keep the count (fixes 2d's "no discrete count"). Drain/fill is a natural pay motion.
- Risk: Glass outlines add ink; 9+ glasses get wide. "Level" implies liquid, which suits spending more than savings.

### Bangles (N4)
- Rule: Ten ₹100 beads close a bangle (₹1,000). A closed bangle fuses into a solid ring. ₹10,000 is a kada with ten bangles' worth of area.
- Good: Closing the ring is a strong "done" signal: good for goals and the four-chai moment (goal gradient, Kivetz 2006).
- Risk: Rings use 2–3× the space of rows and are harder to compare side by side (no common baseline). The kada is big.

### Hourglass (N5)
- Rule: What is left sits in the top bulb as dots; every pay drops through the neck and piles in the lower bulb as outlines.
- Good: One picture holds left and spent with no subtraction; the drop is the pay animation. Strong Home hero.
- Risk: One jar per glass; categories need several small glasses. Savings "fill up" reads reversed.

### Ticket strip (N1)
- Rule: A ticket is a ₹100 dot on a stub. Ten tickets make a perforated strip (₹1,000); ten strips bind into a booklet (₹10,000). Paying tears tickets off.
- Good: Tearing is a felt metaphor for the pain of paying (Prelec & Loewenstein 1998); perforations keep the count visible.
- Risk: Stock outlines add ink; strips read like a long bar. Tearing can feel like loss, raising anxiety slightly.

Concept-specific forms: Day lanes draws S4 pay, S5 chais, S7 overspend, S12 week and S14 day as day lanes (a day's share stood upright, today ringed); other states use upright pills. Hourglass draws S2 as four small glasses and S10 reversed (saved piles below).

## Comparison
| Concept | Learn | Research | Anxiety | Scale | Locked-rule fit | Best tab | Note |
|---|---|---|---|---|---|---|---|
| Merging Dots | 5/5 | 5/5 | Low | 5/5 | Full (every locked rule) | Home, Income, Savings | Base unit everywhere; his form. |
| Day lanes | 4/5 | 5/5 | Med (diet feeling) | 2/5 | Full if used as a view of the same dots | Spending | Per-day allowance M3 without a number; P2c-Q1 puts per-day in Spending. |
| Glass columns | 5/5 | 4/5 | Low | 3/5 | Partial (container ink; ladder kept) | Spending (jars) | Dots inside fix 2d's count problem; good jar metaphor. |
| Bangles | 3/5 | 3/5 | Low | 2/5 | Partial (no common baseline) | Savings (goal ring) | Closing ring = goal gradient; poor for comparing. |
| Hourglass | 4/5 | 3/5 | Med | 2/5 | Weak (one jar per picture; goals reversed) | Home hero (optional) | Left + spent in one picture; pay = drop. |
| Ticket strip | 4/5 | 4/5 | Med (tearing) | 3/5 | Partial (stub ink; booklet is new shape) | Spending (pay moment only) | Tear is a strong pay-moment motion. |

## Recommendation
Merging Dots as the base unit on every tab; Spending gets Day lanes (today/this week) beside Merging Dots rows for jars; borrow the Hourglass drop as the pay motion and the Bangle close as the completion motion. Park Glass columns and Ticket strip.

## Questions for Tarun
| # | Question | Options | Recommended | Why |
|---|---|---|---|---|
| P2e-Q1 | Which cup fill inside a dot? | A · Pie wedge (clock) / B · Concentric core / C · Area-true liquid level | A | Exact area, and ₹25 steps read as clock quarters, which teaches the four-chai moment. |
| P2e-Q2 | Colour for "left": keep blue, or your green? | A · Blue left, green saved (now) / B · Green left, a second hue for saved / C · One ink colour; saved marked by a ring | A | Green is already "saved"; solid vs outline carries left vs spent, so hue is free for kind. |
| P2e-Q3 | Adopt the combination? | A · Merging Dots base + Day lanes in Spending / B · Merging Dots everywhere only / C · Another mix | A | Day lanes answer "can I afford this today?" without a number on Home. |
| P2e-Q4 | Which motions to borrow? | A · Hourglass drop (pay) + Bangle close (complete) / B · Ticket tear (pay) / C · Plain lift-out (2d) | A | Drop keeps the outline left behind; tearing reads as loss. |
| P2e-Q5 | Day lanes overspend: borrow from tomorrow's lane? | A · Yes, tomorrow's lane shortens / B · No, show hatched extra only / C · Re-spread across all days | C | Re-spreading is gentler than a short tomorrow; less "diet" feeling. |
