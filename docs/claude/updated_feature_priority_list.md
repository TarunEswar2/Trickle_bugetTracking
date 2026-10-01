# Student Spending App — Updated Feature Priority List

*Revised from the original interview synthesis, with evidence strength noted per feature and one gap (Vaishak's missing back-half coding) folded in.*

## Core Features (Very High priority)

These are the only features corroborated across nearly all six interviews (Tarun, Nishad, Yash, Gautham, Harsh, Vaishak) — the strongest possible evidence bar.

1. **Automatic Transaction Tracking**
   Manual tracking was described as tedious, repetitive, and easy to abandon by nearly every participant. Removes the single biggest reason people stop tracking.

2. **Daily and Weekly Spending Overview**
   Every participant's "surprise" moment (checking balance and going "what happened, how did I spend this much") happened *after* the fact. A running overview moves awareness earlier without requiring effort.

3. **Category-wise Spending**
   Participants consistently wanted to know *where* money went, not just how much — Harsh, Gautham, and survey respondents specifically asked for this.

4. **Small-Purchase Accumulation**
   Strongest and most distinctive finding in the whole study — evidenced independently by Tarun (coffee), Nishad (cigarettes/confectionery), Yash (quick-commerce add-ons), Harsh (food), and Vaishak (food). Individually small, collectively significant. This is the feature least likely to exist in a generic budgeting app — a genuine differentiator.

## High-priority Supporting Features

Good evidence, but resting on fewer participants or more inference than the core four.

5. **Pre-spending Awareness** *(strengthened — see note below)*
   The single most important feature conceptually — it's the fix for "awareness comes late" — but was the vaguest in scope. Newly incorporated: Vaishak explicitly asked for "an app to remind me before I'm paying" and to "see your balance before payment" with "some friction before paying." This gives the feature a concrete shape it didn't have before: a lightweight check *at the moment of payment*, showing remaining category budget / weekly spend / goal impact, not a separate awareness screen.

6. **Gentle Spending Alerts**
   Supported, but must stay non-blocking — Vaishak and Yash both explicitly rejected guilt-based or restrictive framing; alerts should inform, not scold.

7. **Purpose-based Funds** *(evidence caveat)*
   Only strongly evidenced by Nishad (three separate accounts by purpose) and loosely by Vaishak (buffer concept). Reasonable feature, but weaker cross-participant support than the core four — flag this honestly if asked how many people described it.

8. **Savings Goals** *(evidence caveat)*
   Conceptually well-supported (Yash's motorcycle goal, the "human nudge" framing) but sourced from essentially one participant telling a vivid story. Worth keeping — goal framing clearly outperforms restriction framing — but don't overstate how many people asked for it.

## Secondary Features (Medium priority)

9. **Subscription and Recurring-payment Detection**
   Airtight but single-sourced: Nishad's ₹3,000/month Coursera autopay he didn't notice for three months. Correctly Medium — vivid and real, but only one interview surfaced it.

10. **Spending Behaviour Insights**
    Participants wanted simple pattern observations (e.g., "food spending up this week") rather than raw transaction history. Moderate, general support.

## Core Design Direction

Spending is easy → tracking is difficult → awareness comes late.

The app's job is not to tell students to spend less. It's to close the gap between the moment of payment and the moment of realization:

**Automatic tracking → Spending visibility → Accumulation → Purpose → Decision**

## Open Item

Vaishak's transcript was only partially coded in the original analysis (~11 statements captured; his later remarks on monthly category allocation, pre-payment confirmation friction, and privacy concerns about cloud-based tracking apps weren't coded). The pre-payment friction point has been folded into Feature 5 above; the privacy concern (preference for local-only data, distrust of cloud apps) is not yet reflected anywhere in the feature list and may be worth a follow-up note on data handling/storage approach.
