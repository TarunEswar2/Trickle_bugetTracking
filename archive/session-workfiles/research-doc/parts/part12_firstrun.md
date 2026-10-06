## 12. What will a new user do, and can they understand what they are asked?

Two parts of the feedback point here: "the questions are hard to understand" and "what will a new user do". This part examines the language (H-WORDS) and the first-run sequence (H-ORIENT) using the strings measured in the v15 build (Appendix H).

### 12.1 What the measurement says about the words
Counted from the rendered builds (`archive/session-workfiles/research-doc/copy.js`; tables in Appendix H):
{{COPY_STATS}}

**Finding: length is not the problem.** The project's rule B-10 (a question of about eight words or fewer, one per screen, no jargon) is met everywhere: no title or question in v14 or v15 is longer than eight words, and the average is 2.7 to 3 words. Yet reviewers say the questions are hard to understand. The conclusion is that **B-10 optimised the wrong variable.** Very short questions lose their object and their context ("Until when?", "Which one?", "Paid from?"), and the words they keep are the model's words (plan, income, split, box, pace). The questions are short and still need a mental model the new user has not got.

Terms the user must already understand to read the screens (number of visible strings that contain each):
{{JARGON}}

### 12.2 Question audit: v15 titles and questions, one by one
Rating: **Clear** (can be answered with no context), **Needs context** (depends on a previous screen or an unstated object), **Vague** (several valid readings), **Jargon** (needs a defined term). "Likely reading" is a prediction [C] to be checked in the "what does this mean?" probe (Part 10, Step 3), not data.

| # | Screen | Text | What it assumes | Likely misreading | Rating | Direction for a fix |
|---|---|---|---|---|---|---|
| 1 | Onboarding 1 | "How should we see your spends?" with *Link UPI / I'll add them / Skip* | That "see" means "track", that "we" is Trickle, that linking is safe | "See" is vague; "Link UPI" sounds like linking the UPI app, not a bank account; no hint of what is read or by whom | Vague | "How does Trickle find your payments?" with "Read them from my bank (read only)" and "I'll type them in" |
| 2 | Onboarding bank | "Choose your bank" | That the next step is bank access | Lists UPI IDs and bank names together | Needs context | One line saying what is read and that money cannot be moved |
| 3 | Onboarding verify | "Approve in your UPI app" | That the consent happens in a UPI app | In an aggregator flow the consent is in the aggregator, not GPay | Vague, possibly wrong | Depends on the feasibility spike (Part 10, Step 1) |
| 4 | Onboarding categories | "What do you spend on?" chips with × on chosen and + on others | That a category is a bucket of spending; that × on a chosen chip means "selected" | × reads as "remove", so the selected state looks like a delete control | Needs context | Check-marks for chosen, plain chips otherwise, one line "These are your buckets" |
| 5 | Home | "On pace." / "A bit ahead of pace." | "Pace" of what | Pace of walking? of spending? against what | Jargon | "You're spending steadily." / "Spending a bit fast this week." |
| 6 | Home, no plan | "A fresh week." over an empty grid | That an empty grid is "fresh" | A broken or empty screen | Needs context | A sentence that says what the grid will show and one action ("Add your first spend") |
| 7 | Home | "₹796 left" and chip "1 box ≈ ₹16 ⓘ" | Left of *what* (this week's money), box meaning | "Left in my account" | Needs context | "₹796 left this week" |
| 8 | Home | "Make your plan" | That a plan is a weekly allowance built from income | A fitness plan; a money plan for the month | Jargon | "Set a weekly amount" or "Add your money" |
| 9 | Home | "Gone over a little." | That over means over the week's amount | Over the bank balance | Needs context | "You've spent this week's amount." |
| 10 | Home row | "2 payments need a category" | Category is a bucket | Fine after step 4 | Clear | Keep |
| 11 | Pay | "How much?" | The amount | Fine | Clear | Keep |
| 12 | Pay | "For what?" with a dashed "One-off / outside your plan" tile | That plan and "one-off" are defined | "Outside your plan" means nothing without the plan | Jargon | "Not part of your week" |
| 13 | Pay confirm | "₹182 over." then a sentence | Over the category | Over my balance | Needs context | "₹182 more than Food has left." |
| 14 | Pay confirm | "62 boxes go · 1 box ≈ ₹5" | The box concept | "Which boxes" | Needs context | "That takes 62 of Food's 100 boxes" |
| 15 | One-off | "What was it?" | That the previous tile was "One-off" | A repeat of "For what?" | Needs context | "What's this one-off for?" |
| 16 | One-off | "Paid from?" | A source of funds | My bank? my UPI app? | Vague | "Take it from your savings?" |
| 17 | Plan 1 | "How much came in?" | An income | Fine for allowance; unclear for one-off | Clear | Keep |
| 18 | Plan 2 | "How much to save?" (the explanatory subtitle was removed in v15) | Save *of what*; that the rest is for spending | A savings goal | Needs context | "How much of the ₹9,000 do you want to keep?" |
| 19 | Plan 3 | "Until when?" | That this is how long the money has to last | Until when what? | Vague | "How long does this money have to last?" |
| 20 | UPI split | "How long should it last?" | The money | Fine | Clear | Keep |
| 21 | Money | "Money in." / "Add it, split it." | "Split" | Divide with a friend | Jargon | "Add money you get. Choose how much to keep." |
| 22 | Money | "₹900 a week to spend." with bands "Saving 14% / Spending 86%" | That the weekly figure and the percent describe different things | Contradictory numbers | Needs context | One figure and one caption |
| 23 | Money | "₹23,600 saved." with a ring | What is counted | Total in my bank | Needs context | "₹23,600 set aside" + "in goals" / "not in a goal" |
| 24 | Spending | "low left" / "some left" per category | A weekly limit exists | "Low left" is unusual English | Needs context | "Nearly used up" / "Plenty left" |
| 25 | Spending | "Edit weekly limits" | That limits exist | I never set limits | Jargon | "Change how much each gets" |
| 26 | Insights | tabs "When · Repeats · Vs last week" | "Vs" | Versus what | Jargon | "This week and last week" |
| 27 | Insights | "You spend most on Tue afternoon" over a grid whose rows have no labels (v15 added a caption) | Rows are times | Rows are categories | Needs context | Label rows morning to night |
| 28 | Insights | "Most goes out on the 2nd" | "The 2nd" of the month | A second | Vague | "Your biggest day this month was the 2nd" |
| 29 | Insights | "The spend that repeats most: Maggi Point, ₹215 in 30 days" | Repeat = same place | Fine after the label | Clear | Keep |
| 30 | Insights | "₹330 more than last week." with "Same days of the week." | The two weeks are compared up to the same weekday | Whole last week | Clear | Keep |
| 31 | Week review | "You stayed on pace. ₹184 moved to savings." | That unspent money is moved automatically | "Why did my money move" | Needs context | "₹184 was unspent, so it went to savings." (first time only) |
| 32 | Week review | "By category" then "Plan and actual" | That the white line is the plan | A chart of what? | Needs context | "What you planned and what you spent" |
| 33 | Subscription | "Which one?" | Which subscription | Which what? | Vague | "Which subscription?" |
| 34 | Subscription | "How much?" with Weekly, Monthly, Every 3 months, Yearly | The amount per payment | The total | Needs context | "How much each time?" |
| 35 | Subscription | "When is it due?" | The next payment | Fine | Clear | Keep |
| 36 | Pop-up | "Make a plan?" | Same as 8 | Same as 8 | Jargon | As 8 |
| 37 | Pop-up | "Lock Trickle with a PIN?" | PIN | Fine | Clear | Keep |
| 38 | Tip | "Amber means ahead of pace." | Pace | Same as 5 | Jargon | "Amber means you're spending fast." |
| 39 | Tip | "Income is split." | Split | Same as 21 | Jargon | "Part is kept, the rest is for spending." |
| 40 | Tip | "That is one spend." | Why it is said | Condescending | Needs context | "Added. It took 12 boxes." |

**Tally of the 40 rows:** 8 clear, 17 need context, 6 are vague or possibly wrong, 9 use jargon. **32 of 40 (80%)** depend on something the screen does not say. This is the quantified version of "the questions are hard to understand".

### 12.3 Principles for the questions (a proposal to replace B-10's length rule)
B-10 stays as a **ceiling** (no long questions) and gains four **floors**:
1. **Name the object.** A question must say what it is about: "How long does this money have to last?", not "Until when?".
2. **Say why in one line** when the answer changes something the user cannot see: "This sets your weekly amount."
3. **Show an example answer** for any number (placeholder values or presets with meaning: "A month", "Until next allowance").
4. **No model words without a sentence.** Plan, income, split, buffer, reserve, pace, box, limit, one-off need either a replacement or a one-line definition the first time they appear.
5. **A question may not depend on the previous screen** to make sense (a screen is shown on its own in a notification, a deep link, or after a back button).
Each floor can be checked automatically in part (a lint over the copy table; the jargon table above is the start of it).

### 12.4 The first-run sequence, as built, step by step
| # | Screen | What the user sees | What a new user probably does | Problem |
|---|---|---|---|---|
| 1 | Title | Three-cell logo, "Spend calm. See where your money goes. No guilt." | Reads one line | No statement of what the app *does* in the user's terms (it shows, it does not tell) |
| 2 | Q1 | "How should we see your spends?" | Taps "I'll add them" (the lower-friction choice) or Skip | Unclear choice (12.2 #1), and the UPI route is unverified |
| 3 | Q2 | "What do you spend on?" six chips already chosen | Taps Next | Does not know why categories matter |
| 4 | Home | "A fresh week." an empty dark grid, a green "Make your plan" card, an "Add a spend" button | Looks at the grid; may try tapping it; taps "Add a spend" or "Make your plan" | **There is nothing to read yet**, and the strongest element on screen (Make your plan) asks for the thing the research says students do not do (plan) |
| 5 | Add a spend | "How much?" keypad | Types a number | Fine |
| 6 | For what? | A grid of categories and a dashed One-off tile | Picks a category | "One-off" appears before they have a plan |
| 7 | Confirm and tip | "That is one spend." sheet, then "How to read it" sheet | Closes two sheets in a row | Two explanations back to back; neither is a result |
| 8 | Home | A grid with a few coloured boxes and "₹120 so far" | ? | The value arrives after **three screens of setup and two of explanation** |

**The first-run goal is unstated.** The research suggests the first useful thing is *awareness*: "here is what you spent". A new user gets that only after typing a payment, by hand.

### 12.5 Alternatives for the first sixty seconds [C], each a hypothesis
| Idea | What it does | Needs | Risk |
|---|---|---|---|
| **A. Instant look-back** | After linking, show the last 7 to 30 days: "Last week you spent ₹X. Most on Food. Chai 5 times." | A working data route (Account Aggregator or import) | Depends on feasibility; real merchant names may be cryptic |
| **B. Guided first spend** | Home's only element is "Add your first spend" with an example ("A chai, ₹20"); the grid appears after | Nothing new | Feels like a chore; no result |
| **C. See an example week** | A button "See how it looks" opens a seeded week with the explanations as a short guided tour, then returns to empty | Existing profiles | Another explanation, but with a *result* in front of it |
| **D. Remembered spends** | "Add the last three things you bought" with chips for common items | Defaults | Memory-dependent, but fast and gives an immediate non-empty grid |
| **E. Import first** | Offer a statement import before anything else | CSV import (placeholder only today) | Heavy for students |
| **F. Say what it is for** | Title becomes "See what each payment does to your week." | Copy | Does not change behaviour on its own |
Test A to D as first-click and think-aloud tasks (Part 10, Step 3, task 1). The most informative single measure: **time from install to the first moment the user says "oh, I see"**.

### 12.6 What this part adds to the diagnosis
H-WORDS is confirmed by measurement: four in five core questions depend on unstated context. H-ORIENT is likely: the first useful output arrives late and the loudest element on the empty Home asks for a plan. H-VIZ is plausible (Part 11). A fix that touches only the picture would leave two of the three causes in place; the plan in Part 10 tests all three.
