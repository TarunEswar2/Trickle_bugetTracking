## Appendix P. Research protocols and materials for the next round

Everything needed to run Part 10 without further preparation. Written 6 Oct 2026 [C]; edit freely. All pass marks are starting lines, not findings.

### P.0 Plan at a glance
| Step | What | Who | Time | Output |
|---|---|---|---|---|
| 0 | Accept outcome ladder O1 to O6; freeze v15 | Tarun | 1 day | Signed-off ladder |
| 0b | Harvest past reviews into the review sheet (P.9) | Tarun | 1 hour | Dataset of past feedback |
| 1 | Feasibility spike: how spends get in | Tarun, Claude | 2 to 3 days | One page, go or no-go per route |
| 2 | 5-second tests (Home picture, grid at pay, Insights hero) | 5 students | 1 week | Scored sheets |
| 3 | Recorded task tests, 3 rounds, fix between | 5 students per round | 2 weeks | Findings and a fix list per round |
| 4 | One-week diary (manual tracking) | 5 students | 1 week, parallel | Estimates vs ledger |
| 5 | Interview round 2 | 6 to 8 new people | 1 week | Transcripts and coding in repo |

### P.1 Who to recruit
- **Target:** students in India, 18 to 24, who pay by UPI at least five times a week. Income may be allowance, parents, part-time or stipend.
- **Mix for 5 participants:** at least 3 who do **not** study design; at least 1 who has never used a budgeting app; at least 1 who uses a single UPI app; at least 1 whose money comes mainly from parents; at least 1 who earns.
- **Exclude:** anyone who has seen a Trickle build before; anyone who works in finance or product.
- **Do not use** classmates from Tarun's studio for rounds 2 and 3 (they have seen earlier builds and are design-literate). They are useful for the harvest (Step 0b) and for pilot sessions.
- **Where:** other departments, hostel mess, campus clubs, a sibling's college, an online student group. Offer a small thank-you (₹200 to 300 or equivalent) so participation is not limited to friends.

### P.2 Screener (ask before booking)
1. Which UPI apps do you use? (Record; accept GPay, PhonePe, Paytm, CRED, others.)
2. About how many UPI payments do you make in a week? (0 to 4 / 5 to 10 / more than 10) Need "5 or more".
3. What do you study? (Record. Quota: at least 3 of 5 non-design.)
4. Where does most of your money come from? (Allowance / parents when asked / part-time / stipend / other.)
5. Have you ever used an app to track spending or budget? Which? What happened? (Record; no wrong answer.)
6. Are you comfortable being recorded (screen and voice) for 30 to 40 minutes? (Need "yes"; otherwise take notes only.)
7. Have you seen an app called Trickle before? (Need "no".)

### P.3 Consent and ethics (read aloud; also give in writing)
- "I am testing an app idea, not testing you. There are no wrong answers. If something is confusing, that is the app's problem and it helps me to hear it."
- "I will record your voice and the screen. Recordings are only used by me and the team to learn, are stored on a private drive, and are deleted after the project is written up. Your name will not appear anywhere."
- "No real bank or money details will be asked. The app uses made-up data."
- "You can stop any time, or skip any question, without giving a reason."
- Ask them to say "I agree" on the recording. Keep a name-free ID (P1 to P5).
- Do not collect phone numbers beyond booking. Delete booking details after the session.

### P.4 Interview guide, round 2 (45 to 60 minutes; for Step 5, also used as the Day 0 and Day 7 conversations)
Open, then follow the participant. Probe with "tell me about the last time".
**A. Warm-up (5 min)**
1. What do you spend money on in a normal week?
2. Where does your money come from, and how often?
3. Who else pays for things for you?
**B. The moment of paying (10 min)** [the research's centre]
4. Tell me about the last thing you paid for with UPI. Where were you? What happened before and after?
5. Do you look at anything before you pay? What?
6. When did you last feel "that was more than I meant to spend"? What was it? When did you notice?
7. What would have changed what you did, if anything?
**C. Knowing where it went (10 min)**
8. How do you know how much you have left? How often do you check?
9. Right now, without looking: how much did you spend this week? (Record the guess, then check against their app if they agree.)
10. Which spends do you think add up without you noticing?
**D. Planning (10 min)** [the thing never asked]
11. Do you set a limit, a budget, or an amount for yourself? In your head, on paper, or in an app? Per day, week, month, or "until something"?
12. When your allowance or pay arrives, what do you do in the first hour? The first day?
13. Do you save? How do you decide how much? Do you have something you are saving for?
14. What happens in the last week before money arrives?
**E. Tools tried (5 min)**
15. Have you used any app or sheet to track money? Which? What did you like? Why did you stop?
16. What would make you open an app like this every day? What would make you delete it?
**F. Trust and data (5 min)**
17. Would you give an app access to read your bank transactions? Under what conditions? What would stop you?
18. Would you pay inside a different app if it showed you something before you paid? What would it have to show?
**G. Close (3 min)**
19. If you could change one thing about how you handle money, what would it be?
20. Is there anything I should have asked?
**Notes for the interviewer:** do not explain Trickle in this round; do not mention budgeting before section D; ask about the last time, not about habits in general; write down their words, not summaries.

### P.5 Five-second tests (Step 2)
**Materials:** the v15 mockup `mockup15.html#demo`, profile Yash; the side-panel switch "Home picture" (Grid, Bar, Days, Words); `window.TIPS=false` in the console before the session; a screen recorder.
**Set-up per screen:** put the app on the Home tab, load the state, show it for 5 seconds, hide it (cover the phone or press Lock).
**Test A: Home picture (five variants, rotated per participant)**
1. "What is this telling you?" (free text, record).
2. "About how much of the week's money is left: a lot, about half, a little, none?"
3. "Could you buy lunch for ₹150 today?"
4. "How sure are you? 1 to 5."
5. Observer notes: first thing looked at, time to first answer, any "what is…" question.
**States to use (one per variant, rotated):** plenty left (80%), about half, low (20%), empty, no plan yet.
**Scoring per variant:** correct on Q2 and Q3 = 1; confidence; count of "what is…" questions.
**Test B: Grid at the moment of paying**
1. Show the Pay confirm screen. "What will happen when you tap Pay?"
2. "What do the dashed boxes mean?" (Do not pre-teach.)
3. "Is that a lot or a little for this category?"
**Test C: Insights hero**
1. Show Insights, "When", with the hero sentence covered: "What does this picture tell you?"
2. Uncover: "Does the sentence match what you saw?"
3. Show "Vs last week": "Am I spending more or less than last week?"
**Pass marks:** variant reads if at least 4 of 5 are correct on Q2 and Q3 and none asks what the shapes mean. Test B passes if 4 of 5 state that money will leave the category, without being told.

### P.6 Task test script (Step 3; 30 to 40 minutes; think aloud; screen and voice recorded)
**Set-up:** `mockup15.html` (not `#demo` for tasks 1 and 7), tips ON, fresh account for tasks 1 to 3, profile Yash for tasks 4 to 8. Start recording. Read: "I'd like you to talk through what you're thinking as you go. I can't answer questions about the app until the end, but I'll note them."
**Tasks** (read one at a time; do not use the app's words in the task)
| # | Task | Success | Probes (after the task) |
|---|---|---|---|
| 1 | "You've just installed this app. Set it up the way you'd like, then tell me what you think it's for." | Reaches Home; states the purpose in their own words | "What do you think happened to your data?" "What was the second question asking you?" |
| 2 | "You just bought a chai for ₹20. Add it." | Spend recorded in ≤ 4 taps and ≤ 20 s | "What did the app show you afterwards?" |
| 3 | "You want to know how you're doing this week. Tell me." | States left/over correctly | "Point to where you got that." "What is a box?" |
| 4 | "Find out where most of last week's money went." | Names the top category from Spending or Insights | "What does this picture show?" |
| 5 | "You paid ₹4,000 for a laptop repair. It's a one-time thing. Record it." | One-off recorded outside the week | "What happened to your week?" |
| 6 | "You get ₹9,000 a month from home. Use it to set up a weekly amount." | Plan made, weekly figure stated | "How is the weekly figure worked out?" "What would you change?" |
| 7 | "Netflix charges ₹199 every month. Make sure the app knows." | Subscription added | "When will it take the money?" |
| 8 | "Imagine you've spent more than planned this week. What would the app do? Show me." | Finds the over-state or explains it | "How does that make you feel?" |
**For every screen with a number or a word, ask once:** "What does this mean to you?" This is the probe that would have caught "2 times of 7".
**Observation sheet columns:** task, success (yes / partial / no), time, taps, errors (wrong tap), hesitation (>5 s), quote, severity.
**Severity:** 0 not a problem; 1 cosmetic; 2 slows them; 3 blocks or misleads; 4 causes a wrong decision.
**After the tasks:** the 10-item usability scale (P.7), then 4 questions: "What was clearest?" "What was most confusing?" "Would you use it next week? Why?" "What is missing?"
**Rounds:** run 5 participants per round; fix the severity 3 and 4 items; run the next round with 5 new participants. Stop when a round has no new severity 3 or 4 issue, or after three rounds.

### P.7 Usability scale (SUS), scoring
Ask each statement on a 1 (strongly disagree) to 5 (strongly agree) scale.
1. I think that I would like to use this app frequently.
2. I found the app unnecessarily complex.
3. I thought the app was easy to use.
4. I think that I would need the support of a technical person to be able to use this app.
5. I found the various functions in this app were well integrated.
6. I thought there was too much inconsistency in this app.
7. I would imagine that most people would learn to use this app very quickly.
8. I found the app very cumbersome to use.
9. I felt very confident using the app.
10. I needed to learn a lot of things before I could get going with this app.
**Scoring:** odd items: score − 1; even items: 5 − score; sum all ten; multiply by 2.5 to get 0 to 100. A score near 68 is average for software; anything under 50 is poor. With five participants the score is directional only.

### P.8 One-week diary (Step 4)
**Aim:** test whether tracking survives a week, what people estimate vs what happens (O1), and in what units they think about money.
**Day 0 (30 min):** consent; the interview guide sections A to D; take their guess for "a normal week's spending"; install the v15 build on their phone (or a private link); show only how to add a spend.
**Days 1 to 6:** each day, one message at an agreed time: "Anything to add from today? One thing that surprised you?" Keep nudges to one a day. They may add spends by hand at any time.
**Data captured:** spends logged, time of day, what they skipped logging and why; the daily surprise.
**Day 7 (30 min):**
1. "How much do you think you spent this week? Which was your biggest category?" (before opening the app)
2. Open the app; compare. Record the gap (O1).
3. "Did you ever want to make a plan? What would you have wanted it to be?" (units: day, week, month, until a date)
4. "What did you stop doing? What did you keep doing?"
5. "Would you carry on? What would make you?"
**Outputs:** per participant: entries logged, days with ≥ 1 entry, estimate vs ledger, surprises, quotes, whether they made a plan and in what unit.

### P.9 Review sheet (Step 0b and every future showing)
| Date | Build | Who (first name or ID, role, studies) | What they were doing | Screen | Their words | Type: too much / what do I look at / can't understand / liked / wanted X | Tarun's own note (kept separate) |
|---|---|---|---|---|---|---|---|
(One row per comment. "Tarun's own note" is where "lost functionality" and similar intuitions go, so they are never mistaken for reviewer evidence.)

### P.10 Analysis plan
- **Per session:** within 24 hours, write 5 bullets: what was clear, what was confusing, quotes, surprises, severity 3 and 4 issues.
- **Coding:** tag each observation with a screen, a task, and a cause: *picture*, *words*, *orientation*, *data*, *missing feature*. Count by cause across participants. This directly separates H-VIZ, H-WORDS and H-ORIENT (Part 11 and 12).
- **Affinity map** after five sessions: group by cause, then by screen.
- **Decision rules:** a problem seen by 3 of 5 is fixed before the next round; 1 of 5 is logged; 2 of 5 is judged by severity. A variant passes the five-second test at ≥ 4 of 5.
- **Reporting template (one page per round):** what we tested; who (counts, mix); five findings with quotes; what we change; what we will retest; what we are unsure about.

### P.11 Instrumentation for test builds (a small build task, not product features)
Events to log to the device only, exportable at the end of a session: screen shown (id, time), tap target (data-a), time between a screen being shown and the first tap, flow started and completed (pay, plan, subscription, one-off), step skipped, tip shown and dismissed, the Home picture variant, the first spend time (install to first spend).
Do not log amounts or names beyond what the participant types in the session.

### P.12 Pilot and logistics checklist
1. Pilot the script with one design classmate; fix wording.
2. Test recording, screen sharing, and that the build loads on a phone and a laptop.
3. Reset the app between participants (`#demo` for profile tasks; refresh for a new account).
4. Have printed copies of the tasks, the consent text, the SUS and the observation sheet.
5. Book sessions 45 minutes apart; leave 15 minutes between for notes.
6. After each round: write the one-page report within two days and change only what it says.

### P.13 Ethics and safety notes
- Students and money: never ask for real balances or account numbers. If a participant volunteers financial distress, stop and offer campus support resources; do not probe.
- Do not present the app as financial advice.
- Do not leave participants feeling judged about spending; avoid any question that implies waste.
- Keep recordings private; delete on schedule.
