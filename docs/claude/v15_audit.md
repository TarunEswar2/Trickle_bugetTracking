# Trickle v14 audit: why reviewers say "too much on every screen"

Written 5 Oct 2026. Evidence: `archive/session-workfiles/audit/density.js` run over all 116 screens of the Night mockup
(`v14.json` has the per-screen numbers), the research in `docs/research/brymans_analysis_interviews.md`, and the v14 decision log.

## 1. What the numbers say
Measured per screen: visible words, tappable things, and how many phone-heights the screen scrolls.

| | v14 (116 screens) |
|---|---|
| Average words on a screen | **56** |
| Screens over 25 words | **68 of 116** |
| Screens over 40 words | 39 |
| Average tappable things | **12** |
| Screens taller than one phone | 21 |
| Spending tab | 86 words, 18 taps, **7 phone-heights tall** (about 540 words if you scroll it all) |
| Insights tab | 158 words, 39 taps |
| Income tab | 75 words, 13 taps |
| Add / change a subscription | 80 words, 15 taps |

A new reader can take in about 20 words and one number per glance. Most screens ask for three times that.

## 2. Where it goes wrong (the information architecture)
**1. The tabs are the money model, not the user's questions.** Income, Spending, Savings and Insights are the
nouns of an accounting model. To use them you must already understand the model. The research says students ask
three things: *Am I okay this week? Where did it go? Is anything building up?* Five tabs answer three questions.

**2. We decided "one visualisation per screen" and then built a tab that stacks them.** The rule was applied to each
visualisation, never to the tab. Spending is rings, a category list, habits, a fixed-bill calendar, history and
filters in one 7-screen scroll. Insights is two grids, a calendar, a hot-hour chart and a comparison list. The
"scroll to the next one" rule turned into a dashboard.

**3. The app asks the user to learn about 17 concepts.** Plan, income, split, buffer, reserve, pace, box, week
scale, waiting credits, one-off money, fixed bills, limits, goals, week review, leftover to savings, date range,
subscriptions. The research user does none of this: they use *mental limits* ("up to ₹1,000") and check
a balance. Every concept was added for a real edge case. None was ever removed.

**4. Setup is front-loaded.** Onboarding is up to 12 screens (PIN, link, balance, permissions, categories, plan
questions, subscriptions, split, goals). Making a plan then runs another 5. Principle 4 says zero-effort tracking.
The first-run experience is the opposite of that.

**5. The same fact lives in three places.** "How much is left" is on Home, the Spending rings, Insights and the
week review. Subscriptions appear in onboarding, Spending, Home rows, Income notes and Settings. When one place
changes, the user has to work out which is the real one.

**6. Home became an inbox.** Home can show a sentence, a grid, a left-amount block, a box chip, up to six action
rows (bills, credits, plan changes, unsorted payments, last week) and Pay. Nothing is ranked, so everything shouts.

**7. Edge cases got screens, not fixes.** Mid-week income got a day-split note. A new income got a "this replaces
your weekly amount" card. Short weeks got a scaled-plan note. The better fix was to make the engine do the right
thing silently. Each note makes every other screen heavier.

**8. Explainer text under every title.** "Add your income and split it. That becomes your weekly plan." If a screen
needs a paragraph, the screen is asking the wrong question.

## 3. How it got here (process, not blame)
- Each review comment was reasonable alone ("show what the box means", "show how much is left", "add a search", "let me
  add categories here"). Every one was answered by **adding** something. There was no rule that forced a removal.
- No density budget existed. "Progressive disclosure" was a principle with no number attached.
- Delegated decisions (D-1…D-36, B-9…B-52) were all additive, and I made most of them.
- Principles 3 and 5 were quietly dropped. P3: *Home never leads with a big or bad number.* P5: *mental limits
  over rigid budgets.* Home now leads with "₹607 left of ₹1,072" in large type, and a weekly plan is close to mandatory.
- No user test since v13 (still true). The reviews you are getting are the first real signal.

## 4. What is right and should stay
The 10x10 fuel-gauge grid, friction at the moment of payment, the pace colours, patterns over history, savings as
"what unspent money becomes", no SMS, everything skippable. The problem is not the visual language. It is how much
we ask people to read and hold around it.

## 5. The v15 response
Measured on the core 46 states: 21 words and 6 taps on average (v14: 56 and 12), 0 screens taller than a phone (v14: 21). See `v15_spec.md`: three tabs for three questions, a density budget enforced by a script, onboarding cut to
three screens, planning moved to just-in-time and out of setup, edge cases handled by the engine silently.
