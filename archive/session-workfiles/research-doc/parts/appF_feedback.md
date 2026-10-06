## Appendix F. Feedback ledger: Tarun's requests and reviews in the v14 to v15 sessions

This is the part of the feedback record that exists in writing: the messages Tarun sent while v14 and v15 were being built (2 to 6 Oct), as reconstructed from the conversation record, with what each was, what it was answered with, and whether the answer added or removed content on screen. It is **not** the reviewers' own words; those were never recorded (Part 8.4). Earlier requests (v2 to v13) are in `project_master_synthesis.md` §4. Visualisation decisions V1 to V11 and O-1 to O-28 (2 Oct) were made one at a time with Tarun and are in the decision log.

**Type key.** *Add* = asks for more on screen or a new capability. *Remove* = asks for less, or for something to be optional. *Clarify* = says something is not understandable (a comprehension complaint). *Fix* = a bug or visual defect. *Look* = a visual-style request. *Process* = about the work, not the product. *Evidence* = about the evidence itself.

| # | Message (condensed, close to verbatim) | Type | Answered with | Net effect on screen content |
|---|---|---|---|---|
| 1 | The user should be able to use the app without inputting a budget or a balance; the bare minimum must still track categories. What inputs are there and how can the app still function without them? | Remove | B-1 to B-8: three levels (track, limits, plan); only category tracking required | Less asked at the start |
| 2 | Every question has to be very simple and short; the user can always say no to anything. | Remove / Clarify | B-9, B-10, B-11 (short, skippable questions) | Shorter questions; Skip everywhere |
| 3 | Generate pop-ups as well. | Add | B-12: 11 pop-ups | More surfaces |
| 4 | Even the PIN can be skipped. | Remove | B-13 | Less required |
| 5 | Re-export to Figma. | Process | Full export | None |
| 6 | (Screenshot) I don't need to know what is in the account. I only need to know how much someone will spend in a week while making a plan. | Remove | B-16: balance never asked | Fewer questions |
| 7 | Making a plan and adding income are two different things; onboarding needs neither balance nor income; Home holds "Make a plan" until one is set; Income holds splitting; after a week or a month, ask "here is how you spend, want a plan?" | Add / restructure | B-17 to B-20 | Plan moved out of onboarding; two new offers |
| 8 | Make this a slider. | Clarify | Slider for the saving split | Same content, different control |
| 9 | If I add an income and split it I should also be able to split for categories, and that becomes my plan. | Add | B-21 | More steps |
| 10 | How long should it last needs to be specific: from a few days to 2 years, maybe a calendar. Multiple incomes with different date ranges; the weekly plan made automatically; leftovers go to savings. Now the subscriptions: is this system good? | Add (three requests) | B-22, B-23 | Date ranges, calendar, income list |
| 11 | I need flexibility to type my own subscriptions, duration and due date; recommended ones stay. Let's make the plan snap to weeks so I don't face mid-week issues. Friend money too. Yes, use that system. | Add / Remove | B-24 (snap, simplifies), B-25 to B-28 | Net more |
| 12 | Let's only go by weekly budgeting. Is there a good reason? I need to validate this. Fix flaws and logical gaps. | Process / Evidence | `weekly_budget_validation.md`, B-29 to B-33 | Edge-case rules |
| 13 | (Figma link) Look at this file and update my mockup. If income is added mid-week split it day-wise and add only this week's share. Use these kinds of gradients. Green or amber gradient for on pace or overspending. End of week: show ideal category-wise vs actual. The PIN keypad should be at the bottom. | Look / Add / Fix | B-34 to B-38 | More states, more explanation |
| 14 | If UPI is connected in onboarding, prompt a split of the balance and ask how long it should last. When UPI is linked, incoming money waits in the Income tab to be assigned. There's a rectangle behind Pay. Give me an account with six months of data. | Add / Fix | B-39 to B-42 | More |
| 15 | The colour can also differ; the other screens seem to be from the last iteration, not the new gradient system. Finally go through and fix all logical issues and (message cut off) | Look / Fix | B-43, B-44 | Per-tab colours; logic fixes |
| 16 | It's not evident that the + and − relate to last week. The "you spend most around" insight should be more prominent. I can flip through other months, which is very important, but I can't tell what date, month or day I'm on. How can I assign a category if there are only these seven? I need search and custom categories. | **Clarify** x2, Add | B-45 to B-47 (labels, nav, search) | More text and controls added to explain |
| 17 | Update Figma. | Process | Partial then full export | None |
| 18 | The main problem on the main page: I can't see what 1 tile means, and I don't know how much I have left for the week. Both have to be there and emphasised. For a new user who hasn't set anything up, "Make your plan" has to be emphasised; if no budget is set, show how much is spent. "Make your plan" is the same as new income. Add cross marks for the defaults; I can't tell if they're selected or deselected. | **Clarify** x3 | B-48 to B-50 (a big number, a chip, ×/+ marks) | Three additions to explain the grid and the chips |
| 19 | Why is this interrupting setting a budget? Let this be the end. | Remove | B-51 (move "two quick things" to the end) | Reordered |
| 20 | I should be able to add more categories here if I want. | Add | B-52 | More |
| 21 | Push the update to Figma. | Process | Partial export | None |
| 22 | The constant reviews I'm getting: very hard to follow, too much info in every screen. Where am I going wrong? Audit and make v15 on what you learn. Something about the information architecture isn't working. | **Evidence** (reviewers) | `v15_audit.md`, v15 (V15-1 to V15-12) | Large reduction |
| 23 | How do we make someone understand the grid well? Insights can be its own tab with the v14 visuals improved. There's no way to input a one-off payment. This is great but I'm losing functionality, and every screen needs better visual hierarchy. Fix logical flaws. | **Clarify** (grid), Add x2, Restore, Look, Fix | V15-13 to V15-18 | Net more, in return for hierarchy |
| 24 | What does "2 times of 7" even mean? | **Clarify** | Rewording, row hint | Slightly more text |
| 25 | Add pop-ups the first time anything happens, to make the user understand. | **Clarify** answered with Add | V15-19 (tips) | 14 new tip surfaces |
| 26 | Make it simple: only rupees makes sense, not times, in Insights. | Remove | V15-20 | Less |
| 27 | Another round of thorough research; all decisions and viz data; a comprehensive doc of everything v1 to v15 and why my working is not leading to the outcome. Put it in the main folder. | Process | `RESEARCH.md` | Document |
| 28 | The point that no version was put in front of students is wrong. I know it's not working because every version has been shown to people, and that is how I know the gaps. | Evidence | Part 8.1 rewritten | None |
| 29 | It was mostly design students and most reviews said "too much information, what do I look at, I can't understand". The reviews about losing functionality are mine, my intuition speaking. | Evidence | Part 8.4 rewritten | None |
| 30 | Nothing is really constructive; it's mostly that the questions are hard to understand or "what will a new user do"; the grid is hard to understand. Maybe the viz are wrong. The research doc can be even more comprehensive, about 5000 lines. | Evidence / Clarify | Parts 11 and 12; this appendix; a test harness for the Home picture | Document, plus a test switch |

### F.1 Tally (my count)
- **Requests that added** something visible or a capability: 20 (rows 3, 7, 9, 10, 11, 13, 14, 16, 18, 20, 23, 25 and sub-requests).
- **Requests that removed** or made something optional: 8 (rows 1, 2, 4, 6, 11 in part, 19, 22, 26).
- **Comprehension complaints raised by Tarun himself about the build** (rows 16, 18, 23, 24, 25, 30): **6 messages containing 9 separate complaints**, and **every one was answered by adding something** (a label, a chip, a number, a sheet, a tip). None was answered by removing the thing that was unclear.

### F.2 What the ledger shows
1. **Tarun's own use of the product reproduces the reviewers' problem.** He could not tell what a tile meant, whether chips were selected, what "+" and "−" referred to, what "2 times of 7" counted, or what date range he was looking at. That is the same class of complaint as "what do I look at, I can't understand", from the person who designed it, which is strong evidence that the problem is real and not about the reviewers.
2. **"Explain by adding" is the response pattern.** A comprehension problem was met with more text, more chips, more tips. Each addition made the next screen heavier and moved the project back towards "too much information".
3. **Requests that removed content were the ones that reduced the first-run load** (rows 1, 2, 4, 6, 19). Those were the most successful changes by the reviewers' own measure.
4. **No row asks "who is this for".** There is no message about a specific student, a task, or a moment of use.
5. **Intuition requests ("I'm losing functionality") arrive immediately after a reduction** (row 23 follows row 22) and the response was to restore much of it the same day.
