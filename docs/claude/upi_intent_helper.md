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

## Built in the v16 mockup (V16-32 to V16-34, proposed)
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
