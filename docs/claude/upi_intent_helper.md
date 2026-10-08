# Scan-and-hand-off helper (Model B): feasibility and design, 7 Oct 2026

Idea (Tarun's note, 7 Oct): open Trickle, scan the shop's QR, Trickle opens the user's UPI app with a `upi://pay` link, the user pays there, comes back, and tells Trickle whether it went through. Trickle does not read a bank account. It is a helper. Usable on Android. If the payment fails the user can still correct the record by hand, so information is logged either way.

## What was checked (web search, 7 Oct 2026; abstract-level reading only)
| Claim | Result |
|---|---|
| `upi://pay` links follow an NPCI linking spec with `pa pn am cu tn tr` (and `mc`, a signature for merchants) | Confirmed in a 2017 draft copy of the spec. Later versions not read |
| Android returns a result through `onActivityResult`; plugins exist | Confirmed. The result can be missing; the upi_india plugin has an error for "no response" |
| iOS has no return channel | Confirmed |
| Swiggy and Zomato get confirmation by server webhook or polling from a payment gateway, not from the app | Consistent with Juspay, Razorpay and Curlec docs. They are the payee; Trickle is not |
| No registration is needed to launch an intent | Not confirmed either way. Banks can decline with a generic risk code. Google's own UPI intent integration requires verified merchants |
| Rebuilding the link with Trickle's own `tr` is safe | Not confirmed. Signed merchant QR codes may reject changed fields. Safer to pass the scanned string through unchanged |
| `Status=SUBMITTED` exists | No source found. Treat any unknown status as pending |

## Design decided by Tarun (V16-31)
1. Trickle only helps. It never reads a bank account or messages.
2. Android first. On iOS there is no scan button; the user logs by hand.
3. The user, not the app, says whether the payment went through. The UPI app's answer, if any, is shown as a hint.
4. A payment that failed is still recorded as a record the user can correct.

## First build in the v16 mockup (V16-32 to V16-34), replaced by the no-result flow below
Home (Android, "Scan & pay" mode): Scan & pay, with Log by hand underneath. Scan, optional amount, category (remembered per shop), confirm "Open your UPI app", hand-off screen (simulated), "Did it go through?" with three answers.
| Answer | What Trickle does |
|---|---|
| Yes | Logs the spend, status confirmed |
| Not sure yet | Logs the spend (it counts) with status unconfirmed; Home asks again: "Did ₹40 at Campus Cafe go through?" |
| No | Nothing is taken from the week. The attempt is kept in History, muted and struck through, with "I did pay, add it" and "Delete" |
Source label stored: `upi_intent`, status `confirmed | unconfirmed | failed`.

## Still to find out
- Spike on a real Android phone: GPay, PhonePe, Paytm, BHIM; static, dynamic and personal QR; unchanged against rebuilt link; how often a result comes back; which statuses; taps and seconds against paying directly (Test B).
- Whether students will start payments in Trickle at all (H2).
- Google Play financial-services declaration for an app that starts payments.

## No-result variant (Tarun, 7 Oct; V16-35)
Trickle passes the merchant's `upi://pay` link unchanged to a UPI app, logs the spend at once, and the user removes it if the payment fails. Checked by web search on 7 Oct (abstract level):
- **Works in principle.** UPI apps register to listen for these links and open on a pre-filled pay screen (NPCI linking spec). Launching needs no result callback. On Android 11 and above the manifest needs a `<queries>` entry for the `upi` scheme to see installed UPI apps (a manifest line, not a registration).
- **Unchanged pass-through avoids the main risk.** Reports of intent failures point to altered or malformed links (for example `am=10` instead of `am=10.00`, bad encoding, missing merchant fields). A static QR has no `tr`; the scanning UPI app fills it in, so Trickle need not.
- **Amount.** A static QR has no amount, so Trickle must ask for it to log the spend. Adding `am=75.00` to a static link is ordinary and keeps it unsigned; a dynamic QR already carries its amount. If the user changes the amount inside the UPI app, Trickle's record will differ until edited.
- **Not confirmed.** Whether banks or UPI apps decline intents from an unregistered app (generic risk codes exist); personal-QR behaviour; per-merchant limits (sources conflict: ₹2,000 against ₹40,000 for unverified merchants).
- **Cost of no result.** Failed payments stay in the record until removed. A reasonable guard is a one-tap "Didn't pay? Remove" shown when the user comes back to Trickle (the app coming to the foreground is not a UPI result).

## Built in the mockup (7 Oct, V16-35)
Scan & pay, then: shop QR (name, and amount if the QR has one), category (remembered per shop), "Open your UPI app", simulated UPI app, back to Trickle. The spend is logged when Trickle hands over. Result screen: "Added to your week", the amount, shop and category, what is left of the allowance, a line about savings only if savings paid part of it, and **Didn't pay? Remove**, which deletes the record and returns the money (including any taken from savings). No "Did it go through?" question, no failed or unconfirmed states.

## Home now has one button (V16-36)
Log expense opens the scanner. Scan, amount if the QR has none, category, confirm ("Open UPI app"), simulated UPI app, back to Trickle, result with Remove. By hand is a link on the scanner. Side-panel switch can send Log expense straight to by hand, and a platform switch (iOS has no scanner).
Things the flow needs that are easy to miss: payments with no QR (friends by phone number, cash, other apps) still need the by-hand path; coming back to Trickle is not automatic, so the spend is logged at hand-off and a notification ("Added ₹75. ₹532 left") would give the stats even if the user never returns; each extra Trickle screen before the UPI app costs taps, so the category and the confirm could share one screen.

## Privacy and shop tagging (8 Oct)
**Local-only is possible now.** With no bank reading, no SMS and no account, nothing needs to leave the phone. The strongest, checkable form is an app without the INTERNET permission in its manifest: it then cannot connect to anything. That is only possible if there is no server.
**What a shop-to-tag server would cost.** Even holding only shop and tag pairs, each lookup sends the shop and a time from a known network address, so the server learns where a user pays and when. That is the privacy leak the local-only choice was meant to avoid, and it requires the INTERNET permission.
**Tagging without a server, in order:** (1) the user's own earlier choice for that shop; (2) keywords in the shop name; (3) the merchant code (`mc`) in the QR, mapped to a category in a table shipped inside the app. The mockup does exactly this (`suggestCat` in `ui16d.js`). If none fits, the user picks once.
**If a shared list is still wanted later:** ship it as a static file inside app updates, or download the whole file (not per-shop lookups), so the server never learns which shop was scanned. Contributions from users would reveal visits and would need to be opt-in, delayed, and published only after several users agree.
**Other things local-only needs:** backup and restore (an encrypted export file; decide whether Android's automatic cloud backup is on or off); phone change; delete all data; the PIN lock (exists). Research without analytics also needs a consented way for students to share their diary data (export file or form) for Tests A to C.
**Open check:** how many real merchant QR codes carry `mc`. Android notification permission (for a "Added ₹75, ₹532 left" note) is optional.

## Payments made inside other apps (Zomato, Swiggy, shopping apps), 8 Oct
Those apps build the payment themselves. Searches of the PayU, PhonePe, Paytm, Razorpay and Juspay developer docs (abstract level) show the usual pattern: the app asks Android which apps can handle `upi://pay`, usually against a list of known UPI package names declared in its manifest on Android 11 and above, shows them in its own checkout, and launches the chosen one. Confirmation then comes to the merchant's server, not the app. Trickle is not in that path.
| Option | What it would do | Honest status |
|---|---|---|
| Log by hand, fast | Home-screen widget chips, a notification action, an end-of-day "anything outside Trickle today?" nudge | Works, no permissions beyond the widget. V16-41 |
| Declare Trickle as a handler of `upi://pay` and forward to the real UPI app | Trickle sees the payment link (shop, amount) from any app and logs it, then hands the link on | **Unverified and risky.** Merchants that use package lists would not show Trickle; Paytm's docs say its smart intent shows only payment-ready apps; Trickle would have to relay the result back to the caller or the shop's app may show "cancelled"; if forwarding fails the payment is blocked. No Google Play policy text was found either way. Test only as experiment E1 |
| Read other apps' payment notifications (notification access) | Would log "Paid ₹250 to Zomato" from GPay's own notification | Not SMS, but the same spirit as reading messages: a sensitive special permission, easily seen as intrusive, Play policy unverified. Needs Tarun's explicit decision. Experiment E2, not recommended |
| Account Aggregator or bank reading | | Not available to this project |
Conclusion: do not promise automatic capture of in-app payments. Promise fast logging.
## Home-screen widget (V16-41)
Android app widget. Feasible in general; nothing here was checked against current Android or Flutter documentation. Design: small (what is left, a plus) and medium (what is left with the bar, Scan, three chips, a plus). Privacy: amounts can be hidden; no data leaves the device. iOS widgets later and unverified.
## Subscriptions (V16-42)
Data on each subscription: next payment date, optional `endPlan` (cancel by), `trialUntil`, `validUntil`, `ended`. Weekly set-aside is zero during a trial, after it ends, when paused or cancelled.
