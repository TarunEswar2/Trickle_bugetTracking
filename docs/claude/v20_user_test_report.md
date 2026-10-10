# Trickle: user test report on v19 (10 Oct 2026)

## 1. What was tested
- **Build:** v19, https://claude.ai/artifact/2u9iboEWnGbZtNDUahfKuA (Version 7).
- **People:** 3 users. Tarun ran the sessions.
- **Record:** Tarun's summary of what people said, written after the sessions. There is no per-person record, no task list and no timings. So this report can say *what* was said, but not *how many* of the 3 said it or how long anything took. Treat every finding as qualitative.

## 2. What people said, grouped
| # | Theme | What people said (Tarun's notes) | Screens | Severity |
|---|---|---|---|---|
| T1 | **The money idea is not understood** | "How much money do you get" is misleading. Splitting money into savings and spending is hard to understand. They don't see that the weekly amount comes from the spending part. How long the money lasts is not communicated. | Onboarding, Add money, Plan | **Blocks use.** It is the core of the app. |
| T2 | **The hero card can't be read** | "Left this week ₹735 of ₹735" is unclear; "₹735 of ₹735 left this week" is clearer. The recommended line: "why is this line here", "what is ₹201 by tonight". Amber alone is not enough. Wanted small symbols that don't feel like a warning. | Home | **Blocks use.** It is the first thing people see. |
| T3 | **Everything looks the same** | "All cards look the same." "Why does everything look the same?" "Does this info belong here or there?" "Recommended" on every card. Inside the recommended card everything has the same weight. "Why is this purple, I thought it was a button." | Home, Spending, Plan | **High.** People cannot tell what matters or what is tappable. |
| T4 | **Words** | "What is Unsorted? It should just be Other." "Use language everyone can understand. Why are you riddling people?" "Too much text to read." | Everywhere | **High.** |
| T5 | **Paying doesn't connect to Home** | Hatched lines on the pay screen weren't read as money going out. The bar on the confirm screen didn't look like the Home bar, so people didn't link them. "Why does it say *Added to your week*? I just lost money. Isn't it paid?" | Pay confirm, Pay result | **High.** |
| T6 | **Not visually interesting** | "It looks bad right now." The hero needs more visual content. | All | Medium. Partly a result of T3. |
| T7 | **Add money has an extra option** | "A gift or a friend paid back" isn't needed on Add money. | Add money | Low. |

## 3. Why the same reviews keep coming back
v17 to v19 changed colours, corners, gradients, tab bars and buttons six times in two days. Each restyle came from an opinion (references, Gemini, my own taste), and none of them touched the reasons below. So the same complaints returned.

**R1: The app shows results, never the working.** "₹1,325 a week" appears with no sum behind it. The real sum is ₹9,000 − ₹1,800 saved = ₹7,200 for 38 days = ₹1,325 a week. People cannot trust or explain a number they never saw being made (T1). *Fix:* draw the sum as a picture where the number is made, and again behind "?".

**R2: The hero card asks people to hold four ideas at once.** Those are the week's budget, money left, a pace line and a daily amount. The pace line ("₹306 by tonight") is the hardest of them: it is a forecast of what *should* be left, not something the user owns. A line on a bar reads as a limit or a goal (T2). *Fix:* remove the line. Say pace with one word and a small symbol, and keep one concrete number, "₹202 a day".

**R3: One card style does four different jobs.** Status (hero), information (insights), suggestions (limits) and records (rows) were all the same grey box with the same small caps label. When everything has the same weight, the eye can't rank anything, and people ask where things belong (T3, T6). *Fix:* give each job its own look (section 5).

**R4: Colour means two things.** Mint is the button colour and also the bar colour. Indigo is savings data but looks like a link (T3, "purple looked like a button"). *Fix:* coloured **text** only for things you can tap. Data colours fill shapes (bars, dots), never words.

**R5: The words are the design team's words.** Allowance, Unsorted, Recommended, pace, split, "added to your week" (T4, T5). *Fix:* a plain-words list (section 6), applied everywhere.

**R6: The same thing is drawn differently in different places.** Home, pay confirm and pay result each have their own bar, and the confirm bar adds a hatched pattern that means nothing to anyone (T5). *Fix:* one bar, the same everywhere, labelled "left this week". The money going out shows as a lighter piece marked "−₹120".

**R7: Too many words carry the message.** Most screens explain in sentences what a picture or a single number could show (T4, T6). *Fix:* each screen keeps one hero number and one picture, and sentences become labels.

An honest caveat: R1 might not be only a presentation problem. Splitting money and then dividing it by weeks may simply be a hard idea for some students. If people still fail T1 after v20, the next step is a model decision for Tarun (for example, saving switched off by default), not another redesign.

## 4. What v20 changes, finding by finding
| Finding | v20 change |
|---|---|
| T1 "How much money do you get" | Onboarding: "How much money do you have now?" Add money: "How much money came in?" |
| T1 split, weekly amount, duration | The plan screen draws the sum: **₹7,200 to spend ÷ 38 days = ₹1,325 a week**, with a strip of weeks up to the end date and each week's amount. Labels say "Keep aside" and "To spend". |
| T2 "of ₹735" | "₹607" big, then "of ₹1,072 left this week" on the line under it. |
| T2 recommended line, "₹201 by tonight" | The line is removed. The bar shows money left only. |
| T2 amber not enough, needs symbols | A small status chip with a speed-dial symbol whose needle moves (calm, not a warning sign): "On track", "A bit fast", "All spent". The card gets a faint tint of the same colour. |
| T3 cards look the same | Hero is lighter and larger. Suggestions have one section title, a coloured icon, a title and one button. Insights are open picture tiles with an outline, no filled box. Rows are plain. |
| T3 "Recommended" on every card | One section title, "Suggestions". Each card is titled with its subject ("Food"). |
| T3 purple looked like a button | Coloured text is used only for tappable things. Save and Spend labels are plain text with a coloured dot. |
| T4 Unsorted | "Other" everywhere it shows. |
| T4 too much text | Plan, pay, hero and help sheet are cut to labels. The help sheet becomes a picture. |
| T5 hatched lines, bar doesn't match | One shared bar. The confirm screen shows "₹607 → ₹487 left this week" with the same bar as Home, and the money going out is a lighter piece labelled "−₹120". |
| T5 "Added to your week" | Hand-off: "Pay ₹120 in your UPI app". Result: "Paid ₹120", then the same card as Home showing what is left. "Didn't pay? Remove" stays. |
| T6 not interesting | Comes from the role looks (R3), bigger numbers, the sum picture, the status symbol and fewer words. No new colours or effects. |
| T7 gift / friend option | Removed from Add money. |

## 5. One look per job (rule for every screen)
| Job | Look | Example |
|---|---|---|
| Status (the one answer) | Largest card, lighter surface, status tint, one big number | Home hero |
| Do something | Mint: a filled button for the main action, mint text on a dark button for small ones (Tarun asked for less green on small buttons in v17). Mint text always means you can tap it | Log expense; Set a limit |
| Suggestion | One section title, a card with an icon, a title, one line and one button, plus × | "Food · ₹195 this week" |
| Information | Open tile: outline, no fill, a picture first, one line | Time of day, Day, Month |
| Records | Plain rows, no box per row | Past transactions, categories |

## 6. Plain words
| Was | Now |
|---|---|
| How much money do you get? | How much money do you have now? / How much money came in? |
| Split / Save · 20% | Keep aside |
| Weekly allowance | To spend each week |
| Recommended ₹306 by tonight | (removed) |
| Recommended (on each card) | Suggestions (once, as a section title) |
| Unsorted / Needs a category | Other |
| Added to your week | Paid |
| That is 59% of today's ₹202 | (removed; the bar and "−₹120" show it) |

## 7. Not fixed, and risks
- **Nothing is tested.** v20 answers what the three people said; it has not been shown to anyone.
- The model itself (keep aside, then a weekly amount) may still be hard to grasp (see R1).
- The home-screen widget and the older screens (goals, settings, insights detail) were not redesigned. They pick up the colour rule only where they share code.
- Without the pace line, someone who wants to know "am I ahead today?" has the per-day amount and the chip, but no exact marker.

## 8. Next test, so the same reviews don't return
Run the same 5 tasks with every person, and write each answer down **per person** (a row per person, a column per task).
| Task (say this) | Pass if they… |
|---|---|
| 1. "You just got ₹9,000 pocket money. Set it up." | …say, unprompted, how much they get each week and until when. |
| 2. (Home) "How much can you spend today?" | …read the per-day number (₹202). |
| 3. "Is your week going okay?" | …read the chip correctly in each of the three states (switch the profile between tasks). |
| 4. "Pay ₹120 at the medical shop." Then ask: "What happened to your money?" | …say it's paid and how much is left this week. |
| 5. "Where would you see what you spend most on?" | …go to Spending without help. |

Note for each task: pass or fail, the seconds it took, and the first thing they said. With 5 people instead of 3 the counts start to mean something. Keep the quotes.
