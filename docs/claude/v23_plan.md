# v23 plan (11 Oct 2026): v21's look, with what v22 learned

**Inputs**
1. Tarun's notes on v21 Savings (11 Oct):
   - "New goal" needs more visual hierarchy.
   - Scan & pay and Add to balance don't belong on Savings; snap "New goal" there instead.
   - The goal icon should come from a savings category.
   - Keep the name field empty.
2. Tarun: "check v22 and integrate the learnings into v21 to make v23. I want v23 to be more like v21."
3. **v22:** https://claude.ai/artifact/XNxSEidDvxz62LeZ2cN16K (11 Oct, built in another session).
   - Its source and its spec files (`v22/specs/…`) are not in this repo. I read the published page.
   - Everything in v22 is marked PROPOSED.

**Stages:** 1 list what v22 changed → 2 choose what to carry over (and why not the rest) → 3 build in `mockup23/` (fork of `mockup21/`) → 4 check across profiles and tests → 5 log, publish, report.

## Stage 1–2. What v22 changed, and what v23 does with it
| v22 change | v23 | Why |
|---|---|---|
| "Paper & ink" look: cream paper, serif (Young Serif), handwriting font (Kalam), ink buttons | **Not taken** | Tarun asked for v23 to look like v21 |
| Home shows the **balance** ("Balance ₹X · + Add") | **Taken** | Onboarding now asks for the bank balance, and the button says "Add to balance". Showing the balance closes that loop. It replaces the unclear "Pocket money & income · Not added yet" row |
| Onboarding is 4 screens, one question each: picture → balance → "Save some first?" → "How long should it last?" | **Taken, in v21's look** | Meets the hard rule "one question per screen". v21 had the split and the duration on one screen. Add to balance uses the same 3 steps |
| "Save some first?" has quick chips: None / 10% / 20% / 30% | **Taken** | People can answer without dragging; "None" makes saying no easy (hard rule) |
| How-long screen lists each week with dates and amount; a first week of 1–2 days folds into the next | **Taken** (the list of weeks) | Shows where the money goes week by week, instead of describing it in a sentence |
| Enter amount is one screen: amount, "Where? (optional)", "For what?", "Add ₹X spend", "For cash, or a payment already made." | **Taken** | v22's review found "Save ₹X" read as saving. "Add ₹X spend" is clearer for cash |
| After a manual spend: a toast "₹120 spent on Food · Undo" instead of a result screen | **Taken for manual entry only** | The scan flow keeps Tarun's confirmed result screen ("Paid ₹120 · Didn't pay? Remove") |
| Scan flow: dark camera screen, amount and category on one screen, hand-off overlay, Home toast | **Not taken** | Tarun confirmed the v16 pay flow, and v21's scan screens were not criticised |
| Day "cups" that fill to a day's share, with a chevron when over | **Not taken** | v21's green / yellow / amber dots were Tarun's own idea (V21-2) |
| One insight sentence on Home with the key words highlighted; the rest under "All insights" | **Partly**: tiles stay; the big words stay | Tarun asked for insights as text in the cards (F3); v21 does that |
| Limit ideas moved off Home into All insights → Ideas | **Not taken** | Tarun asked for recommended limit cards on Home (V17-34) |
| Savings: "Saved this month" plus a day strip; a positive like-for-like line ("₹X more than September at this point", only from day 15 and only when better) | **Line taken**; v21 month bars kept | Encourages without scolding; the bars already show the trend |
| Goal tiles with a drawing that fills as you save; "placeholder · Tarun to draw" | **Not taken** (v21 cards kept) | Tarun's notes are about v21's cards; the drawings were placeholders |
| Add-goal sheet: empty name with "e.g. New phone", quick chips, "How much is it? Skip if you're not sure" | **Taken**, plus Tarun's savings category for the icon | Tarun: keep the name field empty; icon from a category |
| Tips: one plain sentence each; tapping the real thing ends the tip | **Taken** | Fewer words; learning by doing |
| Blocks are never cut by the bottom buttons (a card that would be cut starts below them) | **Taken** | Tarun has flagged cut-off cards before |
| Greeting with the time of day ("Friday evening, Tarun.") | **Taken** as "Good evening, Tarun" | Small human touch (F13) |
| Settings as a full screen with ruled rows; Spending grouped by day | **Not taken** | Not raised; keeps the scope small |

## Stage 3. Build list
1. Savings: the bottom bar shows one "＋ New goal" button (no Scan & pay or Add to balance there). The dashed button in the list is removed.
2. Add-goal sheet: an empty name field ("e.g. New phone"), a row of savings categories (Phone, Laptop, Trip, Emergencies, Bike, Course, Gift, Concert, Other) that sets the icon, and "How much is it? Skip if you're not sure". The icon follows the category; without one it follows the name.
3. Savings hero: the like-for-like line when it is better.
4. Home: a balance row ("Balance ₹X" and "+ Add"), and a time-of-day greeting.
5. Add to balance and onboarding: three steps (How much → Keep some aside? with chips → How long? with the stepper, week list and result). "Step n of 3".
6. Enter manually: one screen and a toast with Undo.
7. Tips: shorter text; a tap on the highlighted thing ends the tip.
8. Keep blocks whole above the bottom buttons.

## Stage 4. Checklist (11 Oct; screenshots in `docs/claude/v23_screens/`; tests fuzz, panel, tips, scan5 pass)
| Item | Done? | Note |
|---|---|---|
| 1 New goal snapped on Savings, no Scan & pay / Add to balance there | Done (7) | Dashed list button removed |
| 2 Savings category sets the icon; name field empty | Done (8, 9) | 9 kinds; the name still decides the icon if no kind is picked |
| 3 Like-for-like savings line | Done | Shows only from the 15th and only when better, so the 2 Oct profiles do not show it |
| 4 Balance row and greeting | Done (1, 2) | Balance = profile balance + money added − spends since; onboarding answer becomes the balance |
| 5 Add to balance / onboarding in 3 steps | Done (3, 4) | Chips None / 10 / 20 / 30%; week list with dates; a 1–2 day first week folds into the next |
| 6 Enter manually on one screen, toast with Undo | Done (5, 6) | Scan path unchanged (Tarun's result screen kept) |
| 7 Tips shorter; tap the thing to end | Done | Some older tips (e.g. "Amber means…") keep their text |
| 8 Blocks kept whole above the buttons | **Dropped** | Tried; it left large empty gaps on Home and Savings, which looked broken |
