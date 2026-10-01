# Secondary Research Report: Student Spending/Budgeting App

## 1. Executive Summary

- **Manual tracking is the single biggest failure mode of budgeting apps.** Multiple sources (churn analyses, product retrospectives) cite roughly two-thirds of new users abandoning a budgeting app within the first 30 days, almost always because logging every transaction by hand is tedious — this directly validates the project's automatic SMS-parsing approach as the core differentiator. [SpendTrak — Why People Quit Budgeting Apps](https://spendtrak.app/blog/why-people-quit-budgeting-apps), [Strategia-X — Why Budgeting Apps Fail](https://www.strategia-x.com/blog/2026-04-12-why-budgeting-apps-fail-30-days-fintech-ux-data/), [Beaverise — Why Budgeting Apps Don't Work](https://beaverise.com/blog/why-budgeting-apps-dont-work)
- **"Pain of paying" is real and cashless/UPI payments numb it.** Behavioral-economics research (Prelec & Loewenstein's original theory, plus newer neuroeconomic work) shows that frictionless, cashless payment methods reduce the psychological discomfort of spending, which is exactly why small UPI purchases go unnoticed until later — strong academic backing for the app's "awareness comes late" thesis. See Section 7 for the actual peer-reviewed papers.
- **Guilt/shame framing in financial nudges backfires** and drives disengagement — UX and behavioral-finance writeups consistently recommend neutral, observational, non-judgmental copy over "you overspent" scolding, validating the project's explicit rejection of guilt-based alerts. [NN/G — Tone of Voice Dimensions](https://www.nngroup.com/articles/tone-of-voice-dimensions/), [Eleven Space — Designing for Financial Behavior](https://www.elevenspace.co/blog/designing-for-financial-behavior-ux-that-builds-better-money-habits)
- **No major consumer app appears to ship a dedicated "small-purchase accumulation" rollup view** ("Coffee: ₹40 today, ₹240 this week") — searches turned up only generic "latte factor" *personal-finance advice content*, not a shipped UX pattern, and (per Section 7) no genuine academic literature treats "latte factor" as a formal construct either. This confirms the feature is genuinely under-served and a real differentiation opportunity, but also means there's little prior art to borrow from — treat it as a from-scratch design problem grounded in pain-of-paying mechanics instead. [Receiptix — Latte Factor blog](https://receiptix.io/blog/2024/12/16/small-purchases-big-impact-understanding-the-latte-factor), [Becoming Minimalist — The Latte Factor](https://www.becomingminimalist.com/latte-factor/)
- **SMS/sensitive-permission requests should be just-in-time and explained, never front-loaded at first launch** — this is now backed by real usable-security research (Wijesekera et al. 2015, Bonné et al. 2017 — see Section 7), not just design guidance: users' comfort with a permission request depends heavily on the *context* in which it's asked, not just which permission it is. [NN/G — 3 Design Considerations for Mobile Permission Requests](https://www.nngroup.com/articles/permission-requests/), [Android Developers — Request runtime permissions](https://developer.android.com/training/permissions/requesting)
- **Mint's 2023 shutdown is a useful cautionary case study** — not for build strategy, but for what users valued/mourned (free automatic aggregation, category auto-tagging, simple dashboards) and what they complained about even while using it (ads, no envelope budgeting, feeling "abandoned" after the Credit Karma acquisition). Good competitive-positioning ammunition. [CNBC — Mint shutting down](https://www.cnbc.com/2023/11/07/budgeting-app-mint-is-shutting-down-users-are-disappointed.html), [LogRocket — Why is Mint shutting down](https://blog.logrocket.com/product-management/why-is-the-mint-app-shutting-down/)
- **India-specific auto-tracking competitors (Jupiter, Money View, INDmoney) already do SMS/account-aggregator-based auto-tracking**, so this isn't technically novel in the Indian market — differentiation has to come from the small-purchase/accumulation lens, non-guilt tone, and local-first privacy stance, not from automatic tracking alone. [Jupiter — Best Expense Tracker Apps in India](https://jupiter.money/blog/best-expense-tracker-app/), [Money View — Best PFM Apps in India](https://moneyview.in/insights/best-personal-finance-management-apps-in-india)
- **Local-first/no-mandatory-cloud-sync is a genuine trust differentiator**, not just a technical choice — India-focused fintech UX writeups repeatedly flag data-privacy anxiety as a trust barrier, and a reported case of a budgeting app "selling user stress data" underscores why participants' distrust of cloud sync is well-founded, not paranoid. [Bishopstrow — Budgeting app selling user stress data](https://www.bishopstrow.com/17-165286-a-popular-budgeting-app-was-quietly-selling-user-stress-data-to-third-parties-trending/)
- **A genuine academic finding worth building the design brief around** — a peer-reviewed evaluation of commercial budgeting apps (BCS HCI 2023, Section 7) found they're much stronger at *tracking* spend than at actually supporting *budgeting* decisions or behavior change. This is precisely the gap the app's accumulation view + pre-spending awareness features are designed to close — cite this paper directly in the design rationale.

---

## 2. Spending Habits & Psychology Research

### Pain of Paying / Spending Awareness
- **Pain of paying (Prelec & Loewenstein)**: psychological discomfort felt at the moment of spending, acting as a natural brake on consumption. Cashless/abstracted payment methods (cards, UPI, tap-to-pay) measurably reduce this discomfort, increasing spending and reducing memory/salience of the transaction afterward — the core mechanism behind "spending is easy, tracking is difficult." See Section 7 for the primary source.
- **Consumer Reports**: lay-audience summary of how payment method changes how much people spend. [Consumer Reports](https://www.consumerreports.org/shopping-retail/how-you-pay-can-affect-how-much-you-spend/)
- **Cashless transactions and purchase pain**: directly relevant to UPI-first contexts. [Illinois Extension](https://extension.illinois.edu/blogs/finding-financial-balance/2023-10-11-do-you-experience-purchase-pain-cashless-transactions)
- **BNPL & digital temptation**: connects frictionless digital payment to financial stress in young people — supporting context for the payment/realization gap being a recognized phenomenon. [APA Monitor](https://www.apa.org/monitor/2026/04-05/financially-stressed-digitally-tempted)

### Why Manual Tracking / Budgeting Apps Fail
- **~67% of budgeting-app users quit within 30 days** (cited stat, source-quality caveat in Section 6) — friction of manual logging, not lack of desire to budget, given as the cause. [Strategia-X](https://www.strategia-x.com/blog/2026-04-12-why-budgeting-apps-fail-30-days-fintech-ux-data/), [SpendTrak](https://spendtrak.app/blog/why-people-quit-budgeting-apps)
- Peer-reviewed confirmation (not just blog claims): the BCS HCI 2023 paper (Section 7) empirically shows commercial budgeting apps support tracking far better than budgeting/behavior change — a more defensible academic version of the same point.
- Manual tracking increasingly framed as obsolete industry-wide in favor of automatic bank/SMS-linked tracking — meaning SMS-parsing is table stakes, and differentiation must come from what's done with the data. [BudgetSmart](https://budgetsmart.io/blog/automated-budget-tracking-apps), [Finny](https://getfinny.app/blog/manual-expense-tracking-dead-2026)
- Counter-perspective (minority pattern): some people deliberately prefer manual/paper tracking because the friction itself forces reflection. [FFBKC](https://www.ffbkc.com/blogs/managing-money/ditch-the-app-budget-by-hand/)

### Guilt-Based Alerts vs. Gentle Nudges
- NN/G's tone-of-voice framework is directly applicable to non-punitive spend alerts — recommendation for financial/sensitive topics is serious, respectful, matter-of-fact. [NN/G — Tone of Voice](https://www.nngroup.com/articles/tone-of-voice-dimensions/)
- **PocketGuard's "In My Pocket" alerting** — positively framed (what's safe to spend, not what was overspent) — is one of the closer existing examples of non-punitive spend-awareness messaging. [PocketGuard — Alerts](https://pocketguard.com/alerts/)
- Academic field-experiment work on overspending-message framing exists — see Lee (SSRN) in Section 7.

---

## 3. Competitor App Landscape

| App | What it does | Automatic tracking approach | Documented problems / complaints | Link |
|---|---|---|---|---|
| **Jupiter (India)** | Neobank + money-manager combining UPI/cards, budgeting, expense tracking | Reads UPI/bank SMS and linked-account transactions automatically; auto-categorizes | Full neobank onboarding (KYC, account opening) is heavier than a pure tracker | [Jupiter blog](https://jupiter.money/blog/best-expense-tracker-app/), [Money Manager](https://jupiter.money/money/), [Play Store](https://play.google.com/store/apps/details?id=money.jupiter&hl=en_IN) |
| **Money View (India)** | Expense tracker + lending/PFM app | SMS-based automatic transaction capture, India-focused | Accurate SMS parsing, but pushes loan products aggressively inside the tracking experience | [Money View](https://moneyview.in/insights/best-personal-finance-management-apps-in-india) |
| **INDmoney (India)** | "Super app": expense tracking, investments, net worth | Account-aggregator + SMS/bank-linked auto-tracking | Complexity/feature bloat, customer-support issues (per reviews) | [MouthShut reviews](https://www.mouthshut.com/product-reviews/indmoney-reviews-926025315), [TechCrunch](https://techcrunch.com/2022/01/17/indmoney-super-app-finance-funding) |
| **Walnut / Fold (India)** | Early Indian SMS-based auto-expense tracker (later pivoted to lending) | One of the first apps to popularize SMS-parsing auto-tracking in India | Limited current documentation; useful as early prior-art that SMS parsing is proven in India | [CB Insights](https://www.cbinsights.com/investor/walnut) |
| **Mint (discontinued Jan 2024)** | Free US budgeting app: auto-aggregated accounts, auto-categorization, dashboards | Bank-API aggregation (not SMS — not relevant to India) | Ads, miscategorization needing manual correction, no true envelope budgeting, users felt "abandoned" after Credit Karma acquisition | [CNBC](https://www.cnbc.com/2023/11/07/budgeting-app-mint-is-shutting-down-users-are-disappointed.html), [LogRocket](https://blog.logrocket.com/product-management/why-is-the-mint-app-shutting-down/) |
| **YNAB** | Zero-based/envelope budgeting | Bank-sync (supported regions) + strong manual-entry culture | Steep learning curve, ~$99/yr subscription — a real barrier for students | [Ramsey comparison](https://www.ramseysolutions.com/budgeting/budgeting-apps-comparison), [NerdWallet](https://www.nerdwallet.com/finance/learn/best-budget-apps) |
| **PocketGuard** | "In My Pocket" — safe-to-spend after bills/goals/savings | Bank-linked auto-tracking + bill detection | Sync/categorization errors, premium subscription cost; good non-punitive reference for framing | [App Store reviews](https://apps.apple.com/us/app/pocketguard-budget-planner-app/id949414211?see-all=reviews), [Alerts](https://pocketguard.com/alerts/) |
| **Goodbudget** | Digital envelope budgeting (manual, classic cash-envelope method) | Fully manual — no bank/SMS linking | Dated, confusing interface for fund allocation; dedicated redesign case study exists | [Redesign case study](https://medium.com/@ayushnandanwar13/revamping-a-budgeting-app-goodbudget-a-ux-ui-case-study-eaf0ef928222) |
| **Rocket Money (formerly Truebill)** | Bill/subscription tracking + budgeting, known for subscription cancellation | Bank-linked scanning to auto-detect recurring charges | Missed/misidentified subscriptions requiring manual confirmation; best prior art for subscription-detection UX | [Managing subscriptions](https://help.rocketmoney.com/en/articles/2185531-managing-your-bills-and-subscriptions), [Missing subscriptions](https://help.rocketmoney.com/en/articles/934383-missing-subscriptions) |
| **Unnamed app — data-selling incident** | N/A (cautionary case) | N/A | Reported quietly selling user "stress data" to third parties — concrete justification for local-first, no-mandatory-cloud-sync | [Bishopstrow](https://www.bishopstrow.com/17-165286-a-popular-budgeting-app-was-quietly-selling-user-stress-data-to-third-parties-trending/) |

### "Latte Factor" / Small-Purchase Accumulation — Prior Art Gap
Confirmed genuine white space both in shipped products and in academic literature (Section 7) — no peer-reviewed treatment of "latte factor" as a formal construct exists. Design this feature from pain-of-paying/mental-accounting theory, not from a competitor benchmark.
- [Receiptix — Small Purchases, Big Impact](https://receiptix.io/blog/2024/12/16/small-purchases-big-impact-understanding-the-latte-factor)
- [Splitty — The Latte Factor Is Wrong](https://splittyapp.com/learn/latte-factor-is-wrong/) (caution: keep the feature informational, not moralizing)

---

## 4. Onboarding UX Research

### Permission-Request UX (Critical for READ_SMS)
- **NN/G's 3 core recommendations**: explain why before the OS dialog, time the request contextually (right before the feature that needs it), make declining graceful with a fallback. [NN/G — Mobile Permission Requests](https://www.nngroup.com/articles/permission-requests/)
- Android's own guidance: request runtime permissions in context, ask only for what's needed, provide rationale. [Android Developers — Requesting permissions](https://developer.android.com/training/permissions/requesting), [Best practices](https://developer.android.com/training/permissions/usage-notes)
- **Now backed by real usable-security research** — see Wijesekera et al. 2015 and Bonné et al. 2017 in Section 7, both from top security venues, showing empirically that context (not just which permission) drives whether users trust and grant a request. This is the strongest evidence base in the whole report for the READ_SMS onboarding design.

### General Fintech Onboarding / Trust-Building
- High drop-off in finance-app signup flows (one source cites 68% never finishing signup) — argues for lightweight onboarding. [Design Your Way](https://www.designyourway.net/blog/finance-app-design/)
- Trust-building patterns (transparent data-use messaging, progressive disclosure). [Eleken](https://www.eleken.co/blog-posts/modern-fintech-design-guide)

---

## 5. Feature-by-Feature UX Implementation Research

**Automatic Transaction Categorization UI** — Draw on Jupiter/Money View/INDmoney (auto-categorize from SMS text, one-tap re-categorization) and Mint's legacy pattern (design for easy correction — miscategorization was Mint's most common complaint). [LogRocket](https://blog.logrocket.com/product-management/why-is-the-mint-app-shutting-down/)

**Daily/Weekly Overview & Category Breakdown Visualizations** — Donut/pie for category share, bar for daily/weekly trend; simplicity over dense data-viz. [Phenomenon Studio](https://phenomenonstudio.com/article/fintech-design-breakdown-the-most-common-design-patterns/). Case studies: [Vivian Lim](https://medium.com/@vivianlimsq/ux-case-study-budgeting-mobile-app-for-beginners-a6d2e920986b), [Tubik Studio](https://blog.tubikstudio.com/case-study-home-budget-app-ui-for-finance/)

**Small-Purchase Accumulation / Rollup View** — No existing shipped or academic pattern (Sections 3, 7). Frame as neutral pattern-recognition ("Coffee — ₹240 this week across 6 purchases"), grounded in pain-of-paying/mental-accounting theory.

**Pre-Payment / Point-of-Sale Friction Screens** — Friction should be informational, not blocking. [Digia — In-App Nudges](https://www.digia.tech/post/in-app-nudges/), [ACM — Design Friction and Digital Nudging](https://dl.acm.org/doi/fullHtml/10.1145/3591156.3591183). **Implementation constraint**: UPI payments happen inside third-party apps (GPay, PhonePe, etc.), so a true pre-payment interstitial may not be technically possible — likely needs to be a widget/notification-based nudge instead.

**Non-Punitive Alert/Notification Copy** — PocketGuard's "safe to spend" framing is the best reference. [PocketGuard Alerts](https://pocketguard.com/alerts/). Academic grounding: Lee's SSRN fintech-nudges paper (Section 7) on overspending-message framing.

**Fund/Envelope-Budgeting Allocation UI** — Goodbudget is the closest direct analog; its UX redesign case study is a useful "what not to do" reference. [Redesign case study](https://medium.com/@ayushnandanwar13/revamping-a-budgeting-app-goodbudget-a-ux-ui-case-study-eaf0ef928222)

**Savings Goals with Progress Tracking** — Chase savings-goals redesign case study. [Casey Duong](https://medium.com/@ckduong14/ux-ui-case-study-chase-saving-goals-9287827fc90c). Academic grounding for goal/progress-bar motivation: the gamification papers in Section 7 (self-determination theory).

**Subscription/Recurring-Payment Detection UI** — Rocket Money: auto-detect, then require lightweight human confirmation to avoid false positives. [Managing subscriptions](https://help.rocketmoney.com/en/articles/2185531-managing-your-bills-and-subscriptions)

**Lightweight Behavioral-Insight Surfacing (Rule-Based, Not ML)** — Insights should read as simple, factual observations rather than predictions or judgments — consistent with the nudge-framing literature in Section 7.

---

## 6. Note on Source Quality (Web/Blog Sources)

This is a fast-moving, SEO-heavy content space — many "budgeting-app" blog posts (SpendTrak, Strategia-X, BudgetSmart, Finny, etc.) are marketing-adjacent content rather than peer-reviewed research, and specific statistics they cite (e.g. "67% quit in 30 days," "68% never finish signup") could not be independently verified against a primary source — treat these as directionally useful, citable-with-caveats claims rather than hard facts. Section 7 below is the peer-reviewed literature that should anchor any formal design-rationale or thesis writing; the rest of this document is supporting/competitive context.

---

## 7. Academic Literature Review (Peer-Reviewed / Verifiable Sources Only)

Found via Google Scholar, SSRN, PubMed, ACM Digital Library, ScienceDirect, USENIX, and university repositories. Fabricated or unverifiable citations are excluded — where a topic had no solid peer-reviewed hit, that gap is stated honestly rather than padded.

### 7.1 Pain of Paying — Foundational & Follow-up

**Prelec, D., & Loewenstein, G. (1998). "The Red and the Black: Mental Accounting of Savings and Debt." *Marketing Science*, 17(1), 4–28.**
Finding: introduces "pain of paying" — payment decoupled in time/form from consumption (e.g. credit) reduces the aversive experience of spending, increasing consumption. This is the foundational citation for the app's entire "awareness comes late" thesis.
- Open access PDF: https://www.researchgate.net/publication/227358519_The_Red_and_the_Black_Mental_Accounting_of_Savings_and_Debt
- Publisher (paywalled): https://pubsonline.informs.org/doi/10.1287/mksc.17.1.4

**Soman, D. (2003). "The Effect of Payment Transparency on Consumption: Quasi-Experiments from the Field." *Marketing Letters*, 14(3), 173–183.**
Finding: less "transparent" payment methods (e.g. pre-paid cards, checks vs. cash) reduce the salience of the outflow, leading to greater subsequent spending — directly analogous to UPI.
- Open access PDF (author's own site): https://www-2.rotman.utoronto.ca/facbios/file/transparency.pdf
- Publisher (paywalled): https://link.springer.com/article/10.1023/A:1027444717586

**Raghubir, P., & Srivastava, J. (2008). "Monopoly Money: The Effect of Payment Coupling and Form on Spending Behavior." *Journal of Experimental Psychology: Applied*, 14(3), 213–225.**
Finding: non-cash payment forms increase spending because they create a weaker mental representation of money value — relevant to why UPI purchases feel "less real."
- Open access PDF: https://www.apa.org/pubs/journals/releases/xap143213.pdf

### 7.2 Mobile Payments / UPI / Cashless Effect

**Digital Payments and Overspending: A Study of Payment Biases and Spending Behaviour Using Mental Accounting Perspective. *International Journal of Finance & Economics* (Wiley, 2025).**
Finding: digital payment biases (mental accounting) associate with higher overspending propensity.
- Paywalled: https://onlinelibrary.wiley.com/doi/10.1002/ijfe.70053

**Does mobile payment use lead to overspending? The moderating role of financial knowledge. *Computers in Human Behavior* (Elsevier, 2022).**
Finding: mobile payment use associates with overspending, but the effect is weaker among users with higher financial literacy — implies an in-app financial-literacy or awareness nudge could offset the cashless effect.
- Paywalled: https://www.sciencedirect.com/science/article/abs/pii/S0747563222001418

**Less cash, more splash? A meta-analysis on the cashless effect. (2024, meta-analysis synthesizing many prior studies.)**
Finding: confirms a robust, if modest, cashless-payment spending increase across the literature — good for citing an overall effect size rather than one study.
- Paywalled: https://www.sciencedirect.com/science/article/pii/S0022435924000216
- Plain-language summary: https://cashessentials.org/publication/less-cash-more-splash-a-meta-analysis-on-the-cashless-effect/

**"From Cash to Cashless: UPI's Impact on Spending Behavior among Indian Users." *Extended Abstracts, CHI Conference on Human Factors in Computing Systems (CHI EA '24)*, ACM.**
Finding: HCI-venue empirical study of UPI adoption's effect on spending behavior among Indian users — the single most directly on-topic academic paper found (India + UPI + spending, from a top-tier HCI venue).
- ACM Digital Library: https://dl.acm.org/doi/full/10.1145/3613905.3651050

### 7.3 Budgeting App Effectiveness (HCI)

**Evaluating Budgeting Apps: Limited Support for Budgeting Compared to Tracking. *Proceedings of the 36th International BCS Human-Computer Interaction Conference (BCS HCI 2023)*.**
Finding: a systematic empirical evaluation of commercial budgeting apps found they are much stronger at expense *tracking* than at actually supporting *budgeting* decisions or behavior change — this is the strongest single citation for the whole project's core thesis (that tracking apps exist but don't close the awareness gap).
- Publisher (BCS eWiC, likely open access): https://dl.acm.org/doi/10.14236/ewic/BCSHCI2023.1
- ResearchGate mirror: https://www.researchgate.net/publication/377242109_Evaluating_Budgeting_Apps_Limited_Support_for_Budgeting_Compared_to_Tracking

Honest gap: no CHI/CSCW mainline paper specifically isolating budgeting-app churn/attrition rates was found with high confidence — the widely-cited "67% quit in 30 days" figure (Section 1/6) remains an unverified blog statistic, not an academic finding.

### 7.4 Nudges / Framing in Fintech

**Lee, S. K. "Fintech Nudges: Overspending Messages and Personal Finance Management." (NYU Stern Fubon Center doctoral research / SSRN working paper.)**
Finding: field-experiment-style study of push notifications nudging users about overspending in a personal finance app, examining message-framing effects on subsequent spending — directly relevant to designing this app's alert copy.
- Open access (SSRN): https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3390777

**Bitrián, P., Buil, I., & Catalán, S. (2021). "Making finance fun: the gamification of personal financial management apps." *International Journal of Bank Marketing*.**
Finding: applies self-determination theory to explain how gamification elements (points, goals, progress) in finance apps affect engagement and intrinsic motivation — relevant to the savings-goals and progress-tracking feature design.
- Open access PDF: https://selfdeterminationtheory.org/wp-content/uploads/2024/03/2021_BitrianBuilCatalan_IJBM.pdf

**Can gamification improve financial behavior? The moderating role of app expertise.**
Finding: gamification's effect on actual financial behavior change is moderated by users' prior app expertise — a caution against over-gamifying goals/progress features for less tech-savvy users.
- https://www.researchgate.net/publication/331415336_Can_gamification_improve_financial_behavior_The_moderating_role_of_app_expertise

Honest gap: "latte factor" (Section 3) has no genuine peer-reviewed treatment — it's a popular-finance term (David Bach), not an academic construct. Cite the pain-of-paying / cashless-effect literature above instead when grounding the accumulation-view feature academically.

### 7.5 Android Permission-Request UX (Usable Security/Privacy)

**Wijesekera, P., Baokar, A., Hosseini, A., Egelman, S., Wagner, D., & Beznosov, K. (2015). "Android Permissions Remystified: A Field Study on Contextual Integrity." *USENIX Security Symposium 2015*.**
Finding: users' comfort with a permission request depends heavily on the *context* (when/why the app asks), not just which permission is requested — the strongest evidence base for asking READ_SMS access contextually, at the point of setup, with a clear reason, rather than upfront.
- Open access: https://www.usenix.org/system/files/conference/usenixsecurity15/sec15-paper-wijesekera.pdf
- Also on arXiv: https://arxiv.org/abs/1504.03747

**Bonné, B., et al. (2017). "Exploring Decision Making with Android's Runtime Permission Dialogs Using In-Context Surveys." *SOUPS 2017 (USENIX Symposium on Usable Privacy and Security)*.**
Finding: in-context surveys at the moment of a runtime permission dialog reveal that trust in the app and perceived necessity drive allow/deny decisions — directly informs how to word and time the SMS-read rationale screen.
- Open access: https://www.usenix.org/system/files/conference/soups2017/soups2017-bonne.pdf

**Prange, S., et al. "Understanding Users' Awareness and Control of Privacy..." *SOUPS 2024*.**
Finding: recent (2024) study on user awareness/control of app privacy and permissions — a good up-to-date citation alongside the 2015/2017 papers above.
- Open access: https://www.usenix.org/system/files/soups2024-prange.pdf

### 7.6 Summary Table — Confidence & Access

| Paper | Access | Use for |
|---|---|---|
| Prelec & Loewenstein 1998 | Open (mirror) | Core thesis grounding |
| Soman 2003 | Open (author PDF) | UPI/payment-transparency grounding |
| Raghubir & Srivastava 2008 | Open (APA PDF) | Cashless spending mechanism |
| Wijesekera et al. 2015 (USENIX) | Open | READ_SMS permission UX |
| Bonné et al. 2017 (SOUPS) | Open | Permission dialog wording/timing |
| Prange et al. 2024 (SOUPS) | Open | Up-to-date permission-UX citation |
| Bitrián et al. 2021 | Open | Savings-goals gamification |
| Lee (SSRN, NYU Stern) | Open | Alert/nudge message framing |
| BCS HCI 2023 (budgeting apps) | Likely open | Core thesis — tracking vs. budgeting gap |
| CHI EA '24 (UPI spending, India) | Paywalled (ACM DL) | India/UPI-specific spending behavior |
| Computers in Human Behavior 2022 | Paywalled | Mobile payment + financial literacy |
| Cashless-effect meta-analysis 2024 | Paywalled (summary open) | Overall effect-size citation |

**Genuine gaps** (searched but not found in peer-reviewed literature): budgeting-app churn/attrition rate studies, "latte factor" as an academic construct, and CHI-caliber papers isolating envelope-budgeting or goal-progress-bar UI effectiveness specifically. Where the report cites numbers for these (e.g. "67% quit within 30 days"), that remains a blog-sourced claim, not an academic one — flag this explicitly if used in formal thesis writing.
