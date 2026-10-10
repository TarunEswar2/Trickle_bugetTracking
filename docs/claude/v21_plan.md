# v21 plan (10 Oct 2026)

**Input:** Tarun's notes from the second test round, on v20 (https://claude.ai/artifact/4T34qefkun2MSadzJm5nmX, Version 2).
**Stages:** 0 inputs → 1 research → 2 principles → 3 screen specs → 4 build order → 5 checklist → 6 publish and report.
Each stage is done before the next one starts. Stage 5 is checked item by item against stage 0.

## Stage 0. What people said
| # | Note (Tarun's words, shortened) | Screen |
|---|---|---|
| F1 | The layouts can improve. | All |
| F2 | Use the 7 dots for more info. Drop "3 days left": it's Friday, so the 5th dot lights up. Colour each dot green, yellow or amber for how hard that day's spending was. | Home hero |
| F3 | The insights under the hero card are information overload. Put each insight as text in an insights card. | Home |
| F4 | "₹61 a day to last the week" is not that important. Make it lower in the hierarchy. | Home hero |
| F5 | Savings: the layout repeats. "Saved this month" matters more than total saved. That card must not look like the goal cards. Goal cards should be different, maybe with a picture, personal, so they feel like a goal. | Savings |
| F6 | "Log expense" is hard to understand. It can just be scan QR or enter manually, with a pay button. | Bottom buttons, pay flow |
| F7 | "Add money" is unclear. Say "Add to balance". | Bottom buttons, flow |
| F8 | Onboarding: be direct and ask for the bank balance. | Onboarding |
| F9 | Onboarding: start with a simple picture of how the balance splits into saving and spending, and how a weekly amount is made from that. | Onboarding |
| F10 | Tips should point at the part of the screen and explain it in a text bubble. | Tips |
| F11 | Why two green bars at the top? Use some kind of pagination. | Flows |
| F12 | "Start an emergency fund, about 3 months of spending, you can skip…" is jargon. | Savings, Home |
| F13 | **Main critique: it feels AI-generated.** Research how to make it more human. Research how the 7 dots can carry more information. Turn more text into pictures. | All |

## Stage 1. Research (10 Oct, web search). What it says and what it doesn't
1. **Why interfaces look AI-made.** Several design-tool blogs give the same diagnosis: generated UIs drift to the average. That means default type, one accent, grids of near-identical cards and a centred hero with three cards. Their fixes are to commit to a named direction, keep a defined visual system, make deliberate content and layout choices, and do a subtraction pass. ([SaaSUI](https://www.saasui.design/blog/saas-ui-looks-ai-generated), [SuperDesign](https://superdesign.dev/blog/why-ai-design-looks-generic), [VP0](https://vp0.com/blogs/make-ai-app-look-professional), [Converge](https://enter.converge.ai/page/en-US/blog/ai-design-sameness))
   *Doesn't cover:* these are vendors selling fixes. It is opinion, not user research, and nothing is specific to money apps or students.
2. **Tips that point at the screen (coach marks).** Guidance from design systems and vendors says: one point per mark, 3 to 4 marks at most, always skippable, shown in context when the feature first appears, and learning by doing beats reading. A good interface needs few marks; marks can't rescue a bad one. ([Productboard](https://design.productboard.com/latest/foundations/content/content-patterns/coachmarks-3ohOXqoO-3ohOXqoO), [Chameleon](https://chameleon.io/patterns/coachmarks), [Adobe Spectrum](https://spectrum.adobe.com/page/coach-mark), [Flowmapp](https://www.flowmapp.com/blog/qa/coach-marks), [J. Duke](https://jmduke.com/posts/app-smells-coach-marks-and-onboarding.html))
   *Doesn't cover:* no controlled study. The sources disagree on tour length.
3. **Pictures on savings goals.** Lab experiments found that age-progressed pictures of one's *future self* raised how much people chose to save: about 33% more to retirement in hypothetical tasks (Hershfield et al., Journal of Marketing Research), and own-face beat someone else's face. ([Decision Lab](https://thedecisionlab.com/intervention/pictures-of-your-future-self-can-increase-savings), [MAPS evidence hub](https://evidence-hub.maps.org.uk/en/research-library/insight/increasing-saving-with-future-self-computer-aged-photos), [Purdue dissertation](https://docs.lib.purdue.edu/dissertations/AAI3591183))
   *Doesn't cover:* pictures of the *thing* you're saving for (a phone, a concert), real app behaviour, or students in India. It supports "make the goal feel close and personal" only as a hypothesis.
4. **Dots per day coloured by spending.** Expense apps such as Flow and Onespend use a GitHub-style grid where colour shows how much was spent that day. Heatmap guidance says to use a few colour buckets rather than a smooth gradient, and to show the exact value on tap. ([Flow](https://buymeacoffee.com/sadespresso/flow-new-analytics), [Onespend](https://apps.apple.com/bb/app/onespend-expense-tracker/id6756717388), [Holistics](https://docs.holistics.io/docs/charts/dynamic-content-blocks/gallery/calendar-heatmap))
   *Doesn't cover:* whether it changes spending, or how colour-blind users read green against amber.

## Stage 2. Principles for v21 (from stage 0 and 1)
- **P1 Picture first, words second.** If a sentence states a quantity, a time or a comparison, draw it and keep at most a 3-word label (F13).
- **P2 One answer per card, and a different look per job** (status, action, suggestion, information, record). Kept from v20 (F1).
- **P3 Speak like a friend.** Say "you", use the name, use everyday words (balance, pay, emergencies). No rules of thumb such as "3 months of spending", and no labels in capitals (F12, F13).
- **P4 Personal.** The user's name on Home. Each goal has its own picture and colour (F5, F13).
- **P5 Colour has three meanings only:** green/yellow/amber for how a day went; mint for things you can tap; data colours fill shapes and never words. Every colour also has a shape or label, for colour-blind users.
- **P6 Few tips, pointing at the real thing:** at most 3 per screen, skippable, numbered 1/3 (F10).
- **P7 Say where you are in a flow:** "Step 1 of 2" with dots, not two loose bars (F11).

## Stage 3. Screen specs
**Home hero (F2, F3, F4)**
- Chip with dial symbol and word (On track / A bit fast / All spent), and "?".
- Big ₹ left, then "of ₹X left this week". The bar stays.
- **Week dots:** M T W T F S S under 7 dots.
  - Past days are coloured by that day's spend against an even day (week ÷ 7): green up to 0.8×, yellow up to 1.2×, amber above. A day with no spend is green.
  - Today is a larger dot with a white ring, coloured by today's spend so far. Future days are grey rings.
  - Tap a dot: one line shows "Wed · ₹240 spent".
- "₹61 a day to last the week" becomes one small grey line under the dots.
- The heads-up rows are removed from the hero.

**Home insights (F3, P1).** Every insight is a tile led by a big short phrase, with a small explanation and the mini chart: "8–10 pm" / "when you spend most"; "Fridays" / "your biggest day"; "Cafe Coffee" / "4 visits this month"; "₹120 more" / "than last week". The heads-ups join the tiles, first, marked "Now".

**Bottom buttons (F6, F7):** "Scan & pay" (QR symbol, primary) and "Add to balance".

**Scan (F6):** the viewfinder, a big "Enter manually" button under it, and "Scan (simulated)" for the mockup. On the confirm screen the button says "Pay ₹120" (it opens the UPI app).

**Add to balance (F7):** title "Add to balance", question "How much are you adding?". The plan screen is unchanged.

**Onboarding (F8, F9, P1)**
- 1. **Picture screen:** an example balance ₹10,000 splits into Savings ₹2,000 and Spending ₹8,000. Spending splits into weeks, giving "≈ ₹1,860 every week". Three rows joined by lines, with short labels and a gentle animation. Buttons: Get started / Just start tracking.
- 2. "What's your bank balance?" with "Trickle never sees your bank. You type it."
- 3. The plan screen, as in v20.

**Pagination (F11, P7):** "Step 1 of 2". Done steps are small dots, the current step is a mint pill, and future steps are grey dots.

**Tips (F10, P6):** each tip dims the screen, cuts a hole around the real element, and shows a speech bubble pointing at it. The bubble has a short title, one line, "1/3" and "Got it". The engine stays the same (the same tip queue); only the drawing changes. Targets: hero bar, week dots, donut, plan result.

**Savings (F5, F12, P4)**
- **Hero:** "Saved this month" as the big number, with bars for the last few months and this month highlighted, and "₹1,800 in total" as a small line. It sits on its own tinted surface.
- **Money not in a goal:** "₹1,000 isn't in a goal yet", with two choices, "For emergencies" and "Something I want".
- **Goal cards:** a picture tile (an illustration picked from the goal name: concert = music, trip = plane, phone, laptop, bike, course = book, emergencies = umbrella, else a star), the goal's own colour, the name, "₹1,800 of ₹5,000", a bar and "Ready Aug 2027". No goal amount: "₹1,800 so far".

**Words (F12, P3):** "Emergency fund" becomes "Emergencies" where it is copy. The add-goal sheet line becomes "It just grows. Add to it when you can." All "3 months of spending" lines are removed.

## Stage 4. Build order
1. Fork `mockup20` → `mockup21`, add `ui21.js` and a CSS block.
2. Week dots and hero.
3. Insight tiles.
4. Bottom buttons, scan screen, pay button.
5. Add to balance copy.
6. Onboarding picture and the balance question.
7. Pagination.
8. Savings hero and goal cards, plus copy.
9. Coach marks.
10. Copy pass (capital labels, jargon).
11. Tests: fuzz, panel, tips, scan5; screenshots of every changed screen across profiles V (₹3k, 2 categories), T, N (₹25k, 12 categories), H (18 categories, 3 goals), G (week 1, nothing tracked).

## Stage 5. Checklist (checked 10 Oct on screenshots in `docs/claude/v21_screens/`, profiles V, T, N, H, G; tests fuzz, panel, tips, scan5 pass)
| # | Done? | Where | Still open |
|---|---|---|---|
| F1 layouts | Partly | Home, Savings, onboarding, pay | Spending tab, goal detail and settings were not re-laid out |
| F2 seven dots | Done | Home hero (3, 4) | Thresholds 0.8× / 1.2× are mine. Days before the person started are grey rings. Colour only (a colour-blind reader needs the tap line) |
| F3 insights overload | Done | Hero has no heads-up rows; tiles lead with the words (5); "Now" badge marks the live one | — |
| F4 "₹61 a day" lower | Done | Small grey line under the dots | — |
| F5 savings | Done | "Saved this month" hero with month bars, total small (9); goal cards with a picture and their own colour (10) | Pictures are drawn symbols picked from the goal name, not photos |
| F6 scan or enter, pay button | Done | "Scan & pay" button; scan screen "Enter manually"; confirm "Pay ₹120" (8) | — |
| F7 add to balance | Done | Button and flow title (7) | — |
| F8 ask bank balance | Done | Onboarding step (2) | — |
| F9 picture first | Done | First onboarding screen, animated rows (1) | Uses example numbers, not theirs |
| F10 tips point at things | Done | Speech bubble with a cut-out (6) | Only 4 tips have targets; others show a centred bubble |
| F11 pagination | Done | "Step 1 of 2" with dots, current one longer (7) | — |
| F12 jargon | Done | Savings nudge, suggestion card, add-goal sheet | The goal is still stored as "Emergency fund"; it shows as "Emergencies" |
| F13 feels AI-made | Partly | No capital labels, name greeting, words-first tiles, goal pictures, fewer sentences | Not tested. Fonts, colours and the dark theme are unchanged; the research says a committed visual direction matters, which is Tarun's call |

## Open for Tarun (not decided by me)
- **The tiny week right after adding money midweek.** ₹9,000 added on Friday gave "₹5 of ₹1,092 left". Should the current week get a full week's money?
- Day-colour thresholds (0.8× and 1.2× of an even day) are my numbers.
- Goal pictures are drawn illustrations; a real app could let people pick a photo. Which one?
