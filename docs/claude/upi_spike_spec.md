# UPI hand-off spike: build specification

Status: PROPOSED (Claude, 8 Oct 2026). Tarun decides stack, testers and dates.
Background: `docs/claude/upi_intent_helper.md`, decisions V16-31 to V16-39 in `docs/claude/v14_decisions.md`.

## 1. Purpose
Find out, on real Android phones with small real payments, whether Trickle can scan a shop QR, hand the link to a UPI app **unchanged** (or with only an amount added), and have the payment go through. Trickle reads no result and no bank data. This spike settles feasibility (hypotheses H2 and H3 in `RESEARCH.md` Appendix T). It does not test whether students like the flow (that is Test B).

Tarun reported on 8 Oct that the hand-off works for merchants. Record the measured results here and in the report so the claim is backed.

## 2. Questions the spike must answer
| # | Question | Why it matters |
|---|---|---|
| Q1 | Does an unchanged scanned link open each UPI app on a pre-filled pay screen (payee, and amount if present)? | The core of the flow |
| Q2 | For a static QR (no amount), does adding `am=75.00` to the link work, and does it stay editable in the UPI app? | Trickle must know the amount to log it |
| Q3 | Do payments complete, and with what error text when they do not? Is the result the same as scanning the same QR inside the UPI app? | Risk that banks or apps decline an intent from an unregistered app |
| Q4 | How do shop, dynamic and personal (P2P) QR codes differ? | Personal QRs may behave differently |
| Q5 | Which fields do real QR codes carry: `pa pn am cu tn tr mc mam sign url`? What share has `mc`? | Decides on-device tagging by merchant code (V16-39) |
| Q6 | What does Android show when several UPI apps handle the link? Can a chosen app be remembered? | Flow speed |
| Q7 | Extra seconds and taps against scanning inside the UPI app | Test B baseline |
| Q8 | How often does the tester come back to Trickle by themselves? | Decides on a hand-off notification |
| Q9 | Diagnostic only: what does a result callback return, if anything? (Trickle will not depend on it.) | Confirms "no result needed" |

## 3. Scope
In: Android only, one or two phones, 3 to 4 UPI apps, real payments of ₹1 to ₹10 (up to ₹100 where a shop's price needs it), data kept on the phone, results exported by the tester.
Out: iOS, any server, bank or SMS reading, categories and budgets, the Trickle UI beyond what the spike needs, Play Store policy (check separately).

## 4. Safety and ethics
- Pay only with your own money, to payees who know they are being paid: the team's own accounts, friends who agreed, or small real purchases in shops (a tea).
- Never test against someone else's QR code without their consent. Never try to alter a payee or amount to someone else's detriment.
- Never record UPI PINs, account numbers or bank messages. Do not screenshot the UPI app's full receipt; note the outcome in words.
- Delete the log after the report is written, or keep it on the team's own phones only.

## 5. Stack (Tarun to choose)
Recommendation: **a small native Android app in Kotlin** for the spike, because it removes plugin risk. Flutter plugins for UPI exist (`upi_india`, `upi_pay`) but the sources found describe them as thin, and I did not check their maintenance. The final app can still be Flutter.
Components (to confirm on the phone, not verified in this session):
- Camera and barcode decoding: CameraX with ML Kit barcode scanning using the bundled model, so scanning works offline.
- Launching: `Intent.ACTION_VIEW` with the `upi://pay?...` URI, `startActivity`, with `Intent.createChooser` (mode A) or a fixed package (mode B).
- Diagnostic mode C: `startActivityForResult` or an `ActivityResultLauncher`, only to log what comes back.
- Storage: a local file or SQLite. No network code. Release build with **no INTERNET permission** (check the merged manifest).
Manifest additions (Android 11 and above need this to see UPI apps):
```xml
<queries>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="upi" android:host="pay" />
  </intent>
</queries>
<uses-permission android:name="android.permission.CAMERA" />
```
Package names to try in mode B (from memory, confirm with `adb shell pm list packages` on each phone): Google Pay `com.google.android.apps.nbu.paisa.user`, PhonePe `com.phonepe.app`, Paytm `net.one97.paytm`, BHIM `in.org.npci.upiapp`.

## 6. App behaviour (five screens)
1. **Scan**: camera preview; on a QR that starts with `upi://pay`, keep the **raw string** and go to Review. Anything else: "That is not a UPI QR."
2. **Review**:
   - table of parsed fields (`pa pn am cu tn tr mc mam sign url` and any others), each shown or "absent";
   - amount: shown if `am` present; otherwise a number field (decimal, 2 places);
   - **Link mode** switch: *Unchanged* (send the raw string) or *With amount* (raw string plus `am=75.00`, percent-encoded, only if `am` was absent);
   - **Launch mode**: A chooser, B fixed app (list of installed UPI apps found through the `<queries>` block), C result diagnostic;
   - button **Open UPI app**.
3. **Handed off**: Trickle writes the attempt to the log at the moment of launch and shows "Opened. Come back when you are done." No result is read (except in mode C, logged silently).
4. **Back in Trickle** (when the app returns to the foreground): ask the tester four things, each one tap: *Pay screen pre-filled?* (yes, no, partly) · *Payment went through?* (yes, no, did not try) · *Error text, if any* (free text) · *Seconds from tapping Open to the UPI app's pay screen* (optional; or recorded by a timer).
5. **Log and export**: list of attempts with the answers; button to export as CSV through the system share sheet (a file the tester sends to the team; nothing is uploaded by the app).

## 7. What each attempt records
`id, time, phone model, Android version, UPI app (package), launch mode, link mode, QR type (tester: static merchant / dynamic merchant / personal), raw link length, fields present (flags for pa pn am cu tn tr mc mam sign url), amount used, prefilled (yes/no/partly), paid (yes/no/not tried), error text, seconds to pay screen, seconds scan to success (tester timer), came back unprompted (yes/no, from the foreground event), result string if mode C`.
The raw link itself is **not** stored by default (it contains the payee's UPI ID). A tester switch can store a hashed payee ID so repeat shops can be counted.

## 8. Test matrix
| Dimension | Values |
|---|---|
| UPI apps | Google Pay, PhonePe, Paytm, BHIM, plus any other installed |
| QR type | static shop QR, dynamic shop QR (shown on a shop's device or printed bill), personal QR (a friend's) |
| `mc` present | record, do not choose |
| Link mode | unchanged, with amount (static QRs only) |
| Launch mode | chooser, fixed app, result diagnostic (a few attempts) |
| Amount | ₹1, ₹10, and one at the shop's real price |
Plan: at least **5 attempts per app and QR type** with the unchanged link, 3 with amount added, and **5 baseline attempts per app** scanning the same QR directly inside the UPI app (for time and success comparison). About 80 attempts, mostly ₹1 to ₹10. At least two phones from different makers, and one on Android 13 or later.
Also record, once: first-run chooser behaviour (Q6) and, with the phone's notification permission, a "Added ₹N" notification at hand-off to see whether testers come back sooner (Q8).

## 9. Measures and thresholds (a starting line, Tarun to set)
| Measure | Good enough | Stop and redesign |
|---|---|---|
| Pay screen pre-filled, unchanged link, top two apps | at least 95% | below 80% |
| Payments that complete, same attempts | within 5 points of the baseline | more than 20% fail where the baseline works |
| Extra time against paying inside the UPI app | 6 seconds or less | more than 12 seconds |
| QR codes carrying `mc` | report only | if under 30%, tagging by merchant code is not enough on its own |
| Adding `am` to a static QR | works in all four apps | fails in one or more: report which |
| Failures | each failure gets a cause note (app, QR type, error text) | |
If a pattern fails (for example an app declines intents from Trickle), the fallback is documented, not hidden: for example "copy the payee and amount to the clipboard and open the app", or "by hand only for that app".

## 10. Deliverables
1. The spike app (source in `archive/session-workfiles/upi-spike/`, a signed debug build is enough).
2. The exported CSVs, merged.
3. A report in `docs/claude/upi_spike_report.md`: matrix of results (apps by QR types), field census, timing comparison, list of failures with causes, answers to Q1 to Q9, and a recommendation on each open decision (retire "Link UPI", tagging by merchant code, hand-off notification, what to do on apps that fail).
4. Update to `RESEARCH.md` Appendix T: H2 and H3 marked with the outcome.

## 10b. Optional experiments (only if Tarun agrees; V16-40)
- **E1, Trickle as a `upi://pay` handler.** A build flag that declares an intent filter for the `upi` scheme and `pay` host and forwards the link unchanged to a chosen UPI app, relaying any result. Questions: does Trickle appear in the checkout of Zomato, Swiggy, Amazon, Blinkit or a ticketing app? Does the payment still complete? Does the shop's app show success? Use your own accounts and small orders. Do not publish this build. Expect many apps not to list it.
- **E2, notification access.** Not recommended. Only on Tarun's explicit yes: what do GPay, PhonePe and Paytm notifications contain, and how reliably could a spend be parsed? Local only. Privacy and Play policy review needed before any real use.

## 11. Effort
About one day to build the five screens and one to two days of testing, including real small purchases. Estimates, not measurements.

## 12. Assumptions to check during the spike (not verified so far)
- That UPI apps accept an intent from an app that is not a registered merchant or UPI app.
- That altering nothing but adding `am` to a static link is accepted, and the decimal format matters.
- Whether signed or dynamic links must stay byte for byte unchanged.
- Behaviour of personal QR links.
- Unverified merchant limits (sources conflict between ₹2,000 and ₹40,000).
- That `mc` is present on real shop QRs often enough.
- Play Store financial-services declaration for an app that starts payments.
