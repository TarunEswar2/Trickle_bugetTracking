# Phase 5 — Core flows. Reuses Phase 4 phone/tab/dot helpers.
import re, json
_s4 = open('/home/claude/v12/phase4.py').read()
exec(_s4.split("\nsrc = open('/home/claude/v12/board.html').read()")[0])

def dots(segs, sc=.9, t='Dots'):
    i, w, h = md(segs, 0, 0); return V(i, w, h, t, sc=sc*2.1)
def jar(c, left, spent, sc=.9, name=''):
    return dots([(left, c), (spent, 'o')], sc, f'{name} left solid, spent outlined')
def drop(c, n=3, sc=.9):
    """Hourglass drop: n dots leave the top row and fall into outline slots (animated, static mid-state)."""
    o = ''.join(f'<circle class="{c} hd{k}" cx="{k*(D+G)+R+40:.1f}" cy="{R:.1f}" r="{R}"/>' for k in range(n))
    o += ''.join(f'<circle class="o" cx="{k*(D+G)+R+40:.1f}" cy="{R+34:.1f}" r="{R-.45:.2f}"/>' for k in range(n))
    o += f'<path class="neck" d="M30 {D+4} L{40+n*(D+G)/2:.0f} {D+16} L{50+n*(D+G):.0f} {D+4}"/>'
    return V(o, 60 + n*(D+G), D + 36, 'Dots dropping through the hourglass', sc=sc*2.4)

def scr(*parts): return ''.join(parts)
def h5(t, s=''): return f'<div class="q5"><h5>{P(t)}</h5>{f"<small>{P(s)}</small>" if s else ""}</div>'
def vis(x): return f'<div class="v5">{x}</div>'
def btn(t, sec=''): return f'<span class="btnp">{P(t)}</span>' + (f'<span class="lnk">{P(sec)}</span>' if sec else '')
def chips(*xs, on=0): return '<div class="ch5">' + ''.join(f'<span class="{"on" if i == on else ""}">{P(x)}</span>' for i, x in enumerate(xs)) + '</div>'
def toast(t, u='Undo'): return f'<div class="toast"><span>{P(t)}</span><b>{P(u)}</b></div>'
def keypad(amt, extra=''):
    k = ''.join(f'<span>{x}</span>' for x in '123456789·0⌫')
    return f'<div class="amt">₹{P(amt)}</div>{extra}<div class="kp">{k}</div>'
def rows(*rs): return '<ul class="log">' + ''.join(f'<li><i class="d {c}"></i>{P(a)}<small>{P(b)}</small></li>' for c, a, b in rs) + '</ul>'
def F(cap, taps, body, title='', head='', bar=''):
    return (cap, taps, phone(body, title, head, bar))

# ---------------- data for frames ----------------
FOOD = lambda sc=.85: jar('cF', 860, 1640, sc, 'Food')
FUN = lambda sc=.85: jar('cU', 780, 1220, sc, 'Fun')

# =========== FLOWS ===========
# each: id, num, name, tab, key(bool), variants[(name, rec, taps, decisions, why, frames)], rec_text
FL = []

# 1 Onboarding
v1a = [F('Welcome', 1, scr(vis(dots([(1500, 'in1')], .7)), h5('Money you can see.', 'One dot is ₹100.'), btn('Start')), ''),
       F('Link or manual', 1, scr(h5('How should Trickle see your payments?'), '<div class="opt5 on"><b>Link my UPI</b><small>Payments show up on their own</small></div><div class="opt5"><b>I\'ll add them myself</b><small>Manual only, nothing linked</small></div>', btn('Link UPI')), ''),
       F('Student type', 1, scr(h5('Which is most like you?', 'We start your jars from this.'), chips('Hostel', 'Day scholar', 'Renting', 'Earning'), vis(dots([(2500, 'cF'), (1500, 'cT'), (2000, 'cU')], .55))), ''),
       F('Money in', 1, scr(h5('What comes in each month?', 'We found ₹9,000 from your UPI.'), vis(dots([(9000, 'in1')], .8)), btn('That\'s right', 'Change')), ''),
       F('Savings first', 1, scr(h5('Put this much away first?'), vis(dots([(1400, 'sv'), (7600, 'in1')], .8)), '<div class="pm"><span>−</span><b>₹1,400</b><span>+</span></div>', btn('Save ₹1,400')), ''),
       F('Subscriptions', 1, scr(h5('These come out on their own.', 'Found on your UPI AutoPay.'), rows(('cF', 'Spotify · ₹119', '4th'), ('cT', 'Netflix · ₹199', '22nd')), btn('Keep these', 'Add one')), ''),
       F('Jars, live', 1, scr(h5('Your month', 'Drag dots between jars.'), vis(dots([(2500, 'cF')], .6) + dots([(1500, 'cT')], .6) + dots([(2000, 'cU')], .6)), btn('Start')), '')]
v1b = [F('Link or manual', 1, scr(h5('How should Trickle see your payments?'), '<div class="opt5 on"><b>Link my UPI</b></div><div class="opt5"><b>Add them myself</b></div>', btn('Link UPI')), ''),
       F('Student type', 1, scr(h5('Which is most like you?'), chips('Hostel', 'Day scholar', 'Renting', 'Earning'), btn('Next')), ''),
       F('Starter month', 1, scr(h5('Here is a month that fits a hostel student.', '₹9,000 in · ₹1,400 saved · 2 subscriptions · 3 jars'), vis(dots([(1400, 'sv')], .55) + dots([(2500, 'cF'), (1500, 'cT'), (2000, 'cU')], .55)), btn('Looks right', 'Change one thing')), ''),
       F('Done', 0, scr(toast('Your month is set. Change it any time in each tab.', ' ')), 'Hi Tarun', hb('bell', 'av'), tabbar())]
v1c = [F('Link', 1, scr(h5('Link your UPI'), btn('Link UPI')), ''),
       F('Read 30 days', 0, scr(h5('Looking at your last 30 days…'), vis(dots([(5600, 'in2')], .7))), ''),
       F('Suggested', 1, scr(h5('You spend about this. Make it your plan?'), vis(dots([(2400, 'cF'), (1100, 'cT'), (2100, 'cU')], .55)), btn('Use this')), ''),
       F('Savings', 1, scr(h5('Save ₹1,400 first?'), btn('Save ₹1,400')), '')]
FL.append(('f1', 1, 'First run + budget setup', 'Global', True, [
  ('A One question per screen', False, 7, 7, 'Every money layer gets its own screen and the dots build up as you go. Clear, but 7 screens before the app.', v1a),
  ('B Starter month', True, 4, 3, 'Student type picks a full starter month (savings, subscriptions found on AutoPay, jars). One "Looks right" accepts it; "Change one thing" opens only that layer. Manual path skips the link step and asks "What comes in?" instead.', v1b),
  ('C Learn first', False, 3, 2, 'Fewest taps, but needs 30 days of UPI history; does not work for manual-only users or new accounts.', v1c)],
  'B. 4 taps, 3 decisions. The student-type pick does the work the 7 screens of A did; each layer is still editable one tap away (one decision per screen). Manual path: same 4 screens with "What comes in each month?" in place of the link.'))

# 2 Budget edit
v2 = [F('Spending gear', 1, scr(h5('Spending settings'), rows(('cF', 'Jars', 'Food · Travel · Fun'), ('rs', 'Period', 'Monthly'), ('ow', 'Copy last month', ''))), 'Spending', hb('q', 'gear')),
      F('Pick a jar', 1, scr(h5('Food'), vis(FOOD()), btn('Change amount', 'Rename · Remove')), ''),
      F('One amount', 1, scr(h5('How much for Food?', 'The dots come from Fun.'), vis(dots([(2700, 'cF')], .6) + dots([(1800, 'cU')], .6)), '<div class="pm"><span>−</span><b>₹2,700</b><span>+</span></div>', btn('Save')), ''),
      F('Done', 0, scr(toast('Food is ₹2,700. Fun is ₹1,800.')), 'Spending', hb('q', 'gear'), tabbar('Spending'))]
FL.append(('f2', 2, 'Budget edit', 'Spending', False, [('Gear → jar → amount', True, 3, 1, 'Total stays the same: dots come from the jar you pick (default: the one with most left).', v2)],
  'One version. 3 taps. Each screen changes one thing; the total never changes unless you edit Money in.'))

# 3 Income arrival
v3a = [F('Notification', 1, scr(h5('₹9,000 came in.', 'Allowance')), ''),
       F('One confirm', 1, scr(h5('Split it like last time?'), vis(dots([(1400, 'sv'), (600, 'in2'), (7000, 'in1')], .75)), '<p class="cap5">₹1,400 Savings · ₹600 subscriptions · ₹7,000 jars</p>', btn('Split it', 'Change split')), ''),
       F('Undo', 0, scr(vis(dots([(1400, 'sv')], .6) + dots([(2500, 'cF'), (1500, 'cT'), (3000, 'cU')], .55)), toast('Split.')), 'Income', hb('q', 'gear'), tabbar('Income'))]
v3b = [F('Lands', 0, scr(h5('₹9,000 came in and was split.'), vis(dots([(1400, 'sv'), (7600, 'in1')], .75)), toast('Split like last time.')), 'Income', hb('q', 'gear'), tabbar('Income')),
       F('Bell row', 0, scr(rows(('sv', 'Allowance split · ₹1,400 to Savings', 'now'))), 'Activity')]
v3c = [F('Irregular: one question', 1, scr(h5('₹1,500 came in.', 'Café shift · not a regular one'), chips('For this month', 'Keep for later', 'Friend paying back', on=0)), ''),
       F('Shared-out', 1, scr(h5('Add ₹1,500 to this month?', 'Savings share 15% = ₹200'), vis(dots([(200, 'sv'), (1300, 'in1')], .8)), btn('Add it')), ''),
       F('Days re-spread', 0, scr(vis(dots([(1300, 'cF')], .7)), toast('Jars got ₹1,300. Each day has a little more.')), '')]
FL.append(('f3', 3, 'Income arrival + split', 'Income', True, [
  ('A Ask once, split', True, 2, 1, 'Regular income: one sheet, one button, undo toast. Grey dots turn into jar colours as they settle.', v3a),
  ('B Silent auto-split', False, 0, 0, 'Zero taps, but money moving without the student seeing it is the thing v7 testing called confusing. Good as an opt-in setting later.', v3b),
  ('C Irregular income', True, 3, 2, 'For gig/one-off money: first ask what it is for (also catches friends paying back), then show the split. Used when the source is not a known regular one.', v3c)],
  'A for regular sources (2 taps, 1 decision), C for irregular ones (3 taps). B becomes the "Split on its own" setting after 3 months of same-split confirms.'))

# 4 Pay
hgrow = vis(drop('cF', 3)) + '<p class="cap5">3 dots drop out of Food</p>'
v4a = [F('Pay button (any tab)', 1, scr(f'<div class="grid2">{SPB}</div>'), 'Spending', hb('q', 'gear'), tabbar('Spending')),
       F('Scan', 0, scr('<div class="cam"><div class="vf"></div><small>Chai Point · QR found</small></div>', chips('Pay UPI ID', 'Log cash', on=-1)), ''),
       F('Amount + jar', 1, scr(keypad('60', chips('Food', 'Fun', 'Travel') + '<p class="rep">3rd chai this week.</p>'), btn('Pay ₹60')), ''),
       F('Hourglass + UPI', 0, scr(hgrow, h5('Opening your UPI app…'), FOOD(.6)), ''),
       F('Back', 0, scr(toast('Paid ₹60 · Food')), 'Spending', hb('q', 'gear'), tabbar('Spending'))]
v4b = [F('Pay button', 1, scr(f'<div class="grid2">{W_PACE}{W_GOAL}{W_NEXT}</div>'), 'Home', hb('bell', 'av'), tabbar()),
       F('Jar first', 1, scr(h5('Which jar?'), vis(FOOD(.6) + FUN(.6))), ''),
       F('Amount', 1, scr(keypad('60'), btn('Pay ₹60')), ''),
       F('Hourglass', 0, scr(hgrow), '')]
v4c = [F('Pay', 1, scr(f'<div class="grid2">{W_PACE}{W_GOAL}{W_NEXT}</div>'), 'Home', hb('bell', 'av'), tabbar()),
       F('Amount', 1, scr(keypad('60'), btn('Next')), ''),
       F('Check screen', 1, scr(h5('Food can cover this.', '₹860 left · ₹70 a day for 12 days'), vis(drop('cF', 1)), btn('Pay with UPI')), ''),
       F('Done', 0, scr(toast('Paid ₹60 · Food')), '')]
FL.append(('f4', 4, 'Pay: scan → amount → jar → UPI', 'Pay', True, [
  ('A Jar as a chip on the amount screen', True, 2, 1, 'Pay → camera reads QR (0 taps) → amount with the guessed jar already picked and the repeat line → Pay. Dots drop through the hourglass while UPI opens.', v4a),
  ('B Jar first', False, 3, 2, 'Seeing the jar before the amount is calming, but adds a decision every time even when the guess is right (it is for ~8 in 10 payees).', v4b),
  ('C Pause screen', False, 3, 2, 'A moment of friction with the per-day figure (research: a pause helps), but the extra screen on every chai gets skipped fast.', v4c)],
  'A. 2 taps to UPI hand-off from any tab, 1 decision (amount). Jar chip remembers the payee; per-day figure appears only when the jar is low.'))

# 5 Empty jar
v5a = [F('At amount', 1, scr(keypad('450'), btn('Pay ₹450')), ''),
       F('One choice', 1, scr(h5('Fun has ₹200.', 'Take ₹250 from Food?'), vis(FUN(.6) + dots([(250, 'cF')], .6)), btn('Take from Food', 'Pick another jar')), ''),
       F('Days re-spread', 0, scr(vis(sv(pace_lanes())), toast('Paid. Food\'s days are a little shorter now.')), 'Spending', hb('q', 'gear'), tabbar('Spending'))]
v5b = [F('Pay as usual', 1, scr(keypad('450'), btn('Pay ₹450')), ''),
       F('After, quietly', 0, scr(vis(sv(pace_lanes())), h5('Fun went ₹250 past.', 'The rest of the month is spread over the other jars.'), btn('OK', 'Choose instead')), '')]
v5c = [F('Whole budget used', 1, scr(h5('Your spending money is used up this month.'), chips('Start next month lighter', 'Use savings', on=0), btn('Start next month ₹250 lighter')), '')]
FL.append(('f5', 5, 'Empty jar', 'Pay', True, [
  ('A Ask once at pay', True, 2, 1, 'Before UPI opens: one sentence, one button using the jar with most left. Remaining days re-spread (P2e-Q5).', v5a),
  ('B Pay first, sort after', False, 1, 1, 'Never blocks the queue at the counter, but the student finds out after the fact.', v5b),
  ('C All jars empty', True, 2, 1, 'Only when nothing is left anywhere: next month lighter is the default, savings is the second chip. No debt words.', v5c)],
  'A + C. 2 taps. Never red, never "over". Food\'s future lanes shrink a little across all days rather than one blank day.'))

# 6 Log cash
v6 = [F('Pay → Log cash', 2, scr('<div class="cam"><div class="vf"></div></div>', chips('Pay UPI ID', 'Log cash', on=1)), ''),
      F('Amount + jar', 1, scr(keypad('40', chips('Food', 'Fun', 'Travel') + '<p class="cap5">Note (optional) · Today</p>'), btn('Add ₹40')), ''),
      F('Done', 0, scr(toast('Added ₹40 · Food · cash')), ''),
      F('Import (soon)', 0, scr(h5('Import from a bank file', 'Coming soon. You will pick a .csv, match columns and check before anything is added.'), '<span class="btnp off">Choose file</span>'), 'Spending settings')]
FL.append(('f6', 6, 'Log cash / manual entry', 'Pay', False, [('Pay → Log cash chip', True, 3, 1, 'Same amount screen as Pay, so there is one thing to learn. Import sits in Spending settings as a placeholder.', v6)], 'One version. 3 taps.'))

# 7 Sort unknown
v7 = [F('Bell: needs you', 1, scr('<div class="act"><b>Sort a payment</b><small>PAYTM*QR7731 · ₹120</small><span class="go">Sort</span></div>'), 'Activity'),
      F('Top 3 guesses', 1, scr(h5('What was ₹120 at PAYTM*QR7731?', 'Tue 9:40 pm'), chips('Food', 'Fun', 'Travel', on=0), '<p class="cap5">✓ Always use Food for this payee</p>'), ''),
      F('Done', 0, scr(toast('Sorted to Food.')), '')]
FL.append(('f7', 7, 'Sort an unknown UPI payment', 'Bell', False, [('Bell → 3 chips', True, 2, 1, 'Tapping a guess sorts it; "remember" is on by default.', v7)], 'One version. 2 taps.'))

# 8 Subscriptions
v8 = [F('Add: name', 1, scr(h5('What\'s it called?'), chips('Spotify', 'Netflix', 'YouTube', 'Other')), 'Income settings'),
      F('Add: amount + day', 2, scr(h5('₹119 on the 4th?', 'Found on your UPI AutoPay'), btn('Yes')), ''),
      F('Day before', 0, scr(h5('Spotify comes out tomorrow.', '₹119 is already set aside.'), btn('Keep it', 'I\'ll cancel')), 'Notification'),
      F('Due day', 0, scr(vis(dots([(119, 'o'), (199, 'in2')], 1)), toast('Spotify paid.', ' ')), ''),
      F('Price change', 1, scr(h5('Spotify now costs ₹139.', 'It was ₹119.'), btn('Take ₹20 from Fun', 'Pick another jar')), '')]
FL.append(('f8', 8, 'Subscriptions', 'Income', False, [('Add · auto-deduct · price · cancel', True, 3, 1, 'Add in 3 taps (AutoPay prefill); due day needs 0 taps; reminder the day before has Keep / I\'ll cancel.', v8)], 'One version. Add 3 taps; deduct 0; price change 1; cancel reminder 1.'))

# 9 Split
v9a = [F('Amount screen', 1, scr(keypad('960', chips('Food', 'Fun') + '<p class="cap5">Split with friends?  ○</p>'), ''), ''),
       F('Who', 2, scr(h5('Split ₹960 with'), chips('Arjun', 'Meera', 'Rahul', on=0), '<p class="cap5">Equal · ₹240 each</p>', btn('Pay ₹960')), ''),
       F('Owed', 0, scr(vis(dots([(240, 'cF'), (720, 'ow')], 1)), toast('Arjun, Meera and Rahul owe you ₹720.')), ''),
       F('Remind', 1, scr(h5('Friends owe you'), rows(('ow', 'Arjun · ₹240', 'Remind'), ('ow', 'Meera · ₹240', 'Remind')), '<p class="cap5">Opens share: "Hey, ₹240 for dinner · UPI link"</p>'), 'Spending'),
       F('Paid back', 0, scr(vis(dots([(480, 'cF')], 1)), toast('Arjun paid ₹240 back to Food.', ' ')), '')]
v9b = [F('Spend detail', 2, scr(h5('Dinner · ₹960'), btn('Split this')), 'Spending'),
       F('Who', 2, scr(chips('Arjun', 'Meera', 'Rahul'), btn('Save split')), ''),
       F('Owed', 0, scr(toast('₹720 owed to you.')), '')]
v9c = [F('Bell later', 1, scr('<div class="act"><b>Split dinner?</b><small>₹960 · you marked it Split later</small><span class="go">Split</span></div>'), 'Activity'),
       F('Who', 2, scr(chips('Arjun', 'Meera', 'Rahul'), btn('Save split')), '')]
FL.append(('f9', 9, 'Split with friends + owed back', 'Pay / Spending', True, [
  ('A Toggle at pay', True, 3, 2, 'Split switch on the amount screen, then friends. Owed money shows as dashed dots in the jar until it comes back.', v9a),
  ('B From spend detail', True, 4, 2, 'For bills split after the meal. Same "who" screen.', v9b),
  ('C Split later via bell', False, 3, 2, 'Pending reminder; useful, but one more item in the bell.', v9c)],
  'A at pay (3 taps) and B from the spend (4 taps) share one screen. Remind = share sheet with UPI link; paying back returns dots to the jar.'))

# 10 Refund
v10 = [F('UPI credit', 0, scr(h5('₹450 came back from PVR.'), chips('Refund', 'Friend paying back', 'Money in', on=0)), 'Notification'),
       F('Matched', 1, scr(h5('Put it back in Fun?', 'Matches your ₹450 at PVR on Sat'), vis(dots([(450, 'cU')], 1)), btn('Put back in Fun')), ''),
       F('Done', 0, scr(toast('Fun has ₹450 back.')), '')]
FL.append(('f10', 10, 'Refund', 'Bell', False, [('Match to the original spend', True, 2, 1, 'Refund chip is preselected when an earlier payment to the same payee matches.', v10)], 'One version. 2 taps.'))

# 11 Savings goal
def bng(f):
    i, w, h = bangle([(int(8000*f), 'sv'), (8000 - int(8000*f), 'o')]); return V(i, w, h, 'Goal bangle', sc=.8)
v11 = [F('Create', 2, scr(h5('What are you saving for?'), chips('Goa trip', 'Phone', 'Course'), '<div class="amt">₹8,000</div>', btn('Make goal')), 'Savings'),
       F('Add', 1, scr(vis(bng(.52)), chips('+₹100', '+₹500', 'Other'), '<p class="cap5">On track for December</p>'), 'Goa trip'),
       F('Reached', 0, scr(vis(bng(1)), h5('Goa trip is full!', 'The bangle closes.')), ''),
       F('Withdraw', 2, scr(h5('Take ₹500 from Goa trip?', 'Goa moves to about mid-Dec.'), btn('Take ₹500')), '')]
FL.append(('f11', 11, 'Savings goal', 'Savings', False, [('Create · add · reached · withdraw', True, 2, 1, 'Quick-add chips; reaching it plays the bangle close (one "!"); withdrawing shows the new ETA, no PIN, no guilt.', v11)], 'One version. Create 2, add 1, withdraw 2 taps.'))

# 12 Month-end
v12a = [F('Last day', 1, scr(h5('₹640 is left over.'), vis(dots([(640, 'in1')], 1)), btn('Move to Savings', 'Keep for next month')), 'Notification'),
        F('Moved', 0, scr(vis(dots([(640, 'sv')], 1)), toast('₹640 to Savings.')), ''),
        F('Month story', 1, scr(h5('September', 'You spent less on Fun than August. Chai: 22 times, about 1 dinner out.'), vis(sv(share_waffle()))), 'Insights')]
v12b = [F('Auto', 0, scr(toast('₹640 left over went to Savings.')), 'Home', hb('bell', 'av'), tabbar()),
        F('Story later', 1, scr(h5('September story')), 'Insights')]
v12c = [F('Story first', 1, scr(h5('Your September', '1 of 3'), vis(sv(share_waffle()))), ''),
        F('Story 2', 1, scr(h5('Little things', '2 of 3 · 22 chais'), vis(wedges(22, 11, .9))), ''),
        F('Choice last', 1, scr(h5('₹640 left over.'), btn('Move to Savings', 'Keep for next month')), '')]
FL.append(('f12', 12, 'Month-end', 'Bell / Insights', True, [
  ('A Choice, then story', True, 2, 1, 'One decision on the notification; the month story waits in Insights as a pinned card.', v12a),
  ('B Auto-sweep', False, 0, 0, 'Fastest, but the student never sees the win.', v12b),
  ('C Story first', False, 3, 1, 'Nice ritual, but three screens before the one action; drop-off risk.', v12c)],
  'A. 1 tap to save leftover, 1 to open the story. Default button is Savings; leftover kept rolls into next month\'s jars.'))

# 13 Move money
v13 = [F('Jar detail', 1, scr(vis(FOOD(.7)), btn('Move dots')), 'Food'),
       F('From → to', 2, scr(h5('Move from Fun to Food'), vis(FUN(.55) + FOOD(.55)), '<div class="pm"><span>−</span><b>₹300</b><span>+</span></div>', btn('Move ₹300')), ''),
       F('Done', 0, scr(toast('Moved ₹300. Total is the same.')), '')]
FL.append(('f13', 13, 'Move money between jars', 'Spending', False, [('From the jar', True, 3, 1, 'Dots slide across; total stays the same.', v13)], 'One version. 3 taps.'))

# 14 Bell
FL.append(('f14', 14, 'Bell actions', 'Home', False, [('Needs-you on top', True, 2, 1, 'Each needs-you row acts in place: Sort, Decide, Remind, Split. Done rows drop into activity.', [F('Bell', 1, scr(bell_screen()[bell_screen().find('<div class="bl">'):bell_screen().rfind('</div></div>')]), 'Activity'), F('Act', 1, scr(h5('Netflix renews Friday'), btn('Keep it', 'I\'ll cancel')), '')])], 'One version. 2 taps per item.'))

# ---------------- render ----------------
def frame(cap, taps, ph, i):
    t = f'<span class="tp">{taps} tap{"s" if taps != 1 else ""}</span>' if taps else '<span class="tp z">auto</span>'
    return f'<figure class="fr"><div class="pv">{ph}</div><figcaption><b>{i}. {P(cap)}</b>{t}</figcaption></figure>'
def flow_html(f):
    fid, n, name, tab, key, vars_, rec = f
    vh = ''
    for vn, r, taps, dec, why, frames in vars_:
        fr = ''.join(frame(c, t, ph, i + 1) for i, (c, t, ph) in enumerate(frames))
        vh += (f'<div class="var{" rk" if r else ""}"><header><h4>{P(vn)}</h4>{"<span class=ok>recommended</span>" if r else ""}'
               f'<span class="tot">{taps} taps · {dec} decision{"s" if dec != 1 else ""}</span></header><p>{P(why)}</p><div class="row">{fr}</div></div>')
    return (f'<article class="flow" id="{fid}" data-key="{1 if key else 0}"><h3><span>Flow {n}</span>{P(name)} <small>{P(tab)}</small></h3>'
            f'<p class="recl"><b>Recommend:</b> {P(rec)}</p>{vh}</article>')

def sum_row(f):
    fid, n, name, tab, key, vars_, rec = f
    r = next(v for v in vars_ if v[1])
    return f'<tr><td>{n}</td><th scope="row"><a href="#{fid}">{P(name)}</a></th><td>{len(vars_)}</td><td>{P(r[0])}</td><td class="num">{r[2]}</td><td class="num">{r[3]}</td></tr>'

QS5 = [
 ('P5-Q1', 'Onboarding', ['A: one question per screen (7)', 'B: starter month from student type (4)', 'C: learn from 30 days of UPI (3)'], 'B', 'Fewest decisions that still works for manual-only users; every layer is one tap from its tab settings later.'),
 ('P5-Q2', 'Income split', ['A: ask once + undo for regular, one question for irregular', 'B: silent auto-split', 'C: always ask what it is for'], 'A', 'One confirm keeps the student aware of the split; auto-split can be offered after 3 same confirms.'),
 ('P5-Q3', 'Jar at pay', ['A: guessed jar as a chip on the amount screen (2 taps)', 'B: jar first (3)', 'C: a pause screen with per-day figure (3)'], 'A', 'Guess is right most of the time; per-day line appears only when the jar is low (P2c-Q1).'),
 ('P5-Q4', 'Empty jar timing', ['A: ask once before UPI opens', 'B: pay first, sort after'], 'A', 'Student decides with the facts in front of them; one button; days re-spread after.'),
 ('P5-Q5', 'Month-end leftover', ['A: one choice, then story in Insights', 'B: auto-sweep to Savings', 'C: story first, choice last'], 'A', 'The win is seen and chosen; story stays available without blocking.'),
]
qh5 = ''.join('<div class="q"><span class="qid">' + q + '</span><h3>' + P(t) + '</h3><ul>' + ''.join(_li(o, r) for o in ops) + '</ul><p class="qr"><b>Recommend ' + r + '.</b> ' + P(w) + '</p></div>' for q, t, ops, r, w in QS5)

picker = '<div class="filters" id="p5f"><button type="button" data-f="all" aria-pressed="true">All 14</button><button type="button" data-f="key" aria-pressed="false">Key 6 (with variants)</button>' + ''.join(
    f'<button type="button" data-f="{f[0]}" aria-pressed="false">{f[1]} {P(f[2].split(":")[0].split(" +")[0])}</button>' for f in FL) + '</div>'

CSS5 = r'''
.p5 .flow{display:grid;gap:12px;padding-top:8px;border-top:1px solid var(--rule);min-width:0}
.p5 .flow>h3{font-size:20px;display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.p5 .flow>h3 span{font:500 12px var(--f-mono);color:var(--tile);letter-spacing:.06em;text-transform:uppercase}
.p5 .flow>h3 small{font:400 12px var(--f-mono);color:var(--ink3)}
.p5 .recl{margin:0;font-size:14px;max-width:80ch}
.p5 .var{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:12px 14px;display:grid;gap:8px;min-width:0}
.p5 .var.rk{border:2px solid var(--tile)}
.p5 .var header{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}.p5 .var h4{margin:0;font:700 16px var(--f-disp)}
.p5 .var>p{margin:0;font-size:13px;color:var(--ink2);max-width:80ch}
.p5 .fr{flex:0 0 auto;width:236px;border:0;background:none}
.p5 .fr .pv{padding:0;background:none}
.p5 .fr figcaption{padding:6px 2px 0;display:flex;justify-content:space-between;gap:8px}
.p5 .tp{font:500 11px var(--f-mono);background:var(--tile-soft);color:var(--tile);padding:1px 6px;border-radius:4px;white-space:nowrap;align-self:start}
.p5 .tp.z{background:var(--mute);color:var(--ink3)}
.p5 .scr{height:440px}
.p5 .q5 h5{margin:4px 0 0;font:600 18px/1.2 var(--f-disp);color:#f2f3f1}.p5 .q5 small{display:block;margin-top:4px;font-size:11px;color:#a2a7a3;line-height:1.35}
.p5 .v5{background:#1b1d1c;border-radius:16px;padding:10px;display:flex;flex-direction:column;gap:6px;align-items:flex-start;overflow:hidden}.p5 .v5 svg{max-width:100%;height:auto}
.p5 .ph .btnp{display:block}.p5 .lnk{text-align:center;font-size:11px;color:#a2a7a3}
.p5 .btnp.off{opacity:.4}
.p5 .ch5{display:flex;flex-wrap:wrap;gap:5px}.p5 .ch5 span{border:1px solid #3a3e3b;border-radius:999px;padding:6px 10px;font:500 11px var(--f-body);color:#d8dbd8}
.p5 .ch5 span.on{background:#f2f3f1;color:#0c0d0c;border-color:#f2f3f1}
.p5 .toast{margin-top:auto;margin-bottom:56px;background:#f2f3f1;color:#0c0d0c;border-radius:14px;padding:9px 12px;display:flex;justify-content:space-between;gap:8px;font:500 11.5px var(--f-body)}
.p5 .amt{font:600 38px var(--f-disp);text-align:center;color:#f2f3f1;font-variant-numeric:tabular-nums}
.p5 .kp{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:auto}.p5 .kp span{text-align:center;padding:7px 0;font:500 15px var(--f-body);color:#d8dbd8}
.p5 .rep{margin:0;font-size:11px;color:#d8dbd8;text-align:center}
.p5 .cap5{margin:0;font-size:10.5px;color:#a2a7a3}
.p5 .pm{display:flex;justify-content:center;gap:18px;align-items:center;color:#f2f3f1}.p5 .pm span{width:30px;height:30px;border-radius:50%;background:#1f2120;display:grid;place-items:center}.p5 .pm b{font:600 20px var(--f-disp)}
.p5 .opt5{border:1px solid #3a3e3b;border-radius:14px;padding:9px 11px;color:#f2f3f1}.p5 .opt5.on{border-color:#f2f3f1}.p5 .opt5 b{font:600 12.5px var(--f-body);display:block}.p5 .opt5 small{font-size:10px;color:#9a9f9b}
.p5 svg .neck{fill:none;stroke:#3a3e3b;stroke-width:1}
@media (prefers-reduced-motion:no-preference){
 .p5 svg .hd0,.p5 svg .hd1,.p5 svg .hd2{animation:p5drop 2.4s ease-in infinite}
 .p5 svg .hd1{animation-delay:.25s}.p5 svg .hd2{animation-delay:.5s}}
@keyframes p5drop{0%,20%{transform:translateY(0)}60%,100%{transform:translateY(34px)}}
.p5 .sum td.num{font-family:var(--f-mono);text-align:right}.p5 .sum a{color:var(--ink)}
'''
JS5 = r'''<script>(function(){var b=document.querySelectorAll('#p5f button'),fl=document.querySelectorAll('#p5 .flow');
b.forEach(function(x){x.addEventListener('click',function(){var f=x.dataset.f;b.forEach(function(y){y.setAttribute('aria-pressed',y===x?'true':'false')});
fl.forEach(function(a){a.hidden=!(f==='all'||(f==='key'&&a.dataset.key==='1')||a.id===f)});});});})();</script>'''

total_taps = sum(next(v for v in f[5] if v[1])[2] for f in FL)
SEC5 = f'''<section class="phase p3 p4 p5" id="p5" style="margin-top:48px">
  <h2><span>Phase 5</span> Core flows</h2>
  <p class="lede" style="margin:0">14 flows as storyboards on the decided structure (widget Home, Pay beside the tab bar, hybrid depth, gear per tab). The 6 key flows have 2–3 variants each. Money model: Money in → Savings + Spending money; Spending money = Subscriptions (come out on their own) + jars. One decision per screen, no red, no debt words. Tap counts start from wherever the student is.</p>
  <div class="block"><h3>Recommended path per flow</h3><div class="tbl"><table class="sum"><thead><tr><th>#</th><th>Flow</th><th>Variants</th><th>Recommended</th><th>Taps</th><th>Decisions</th></tr></thead><tbody>{''.join(sum_row(f) for f in FL)}</tbody></table></div></div>
  <div class="block"><h3>Storyboards</h3>{picker}{''.join(flow_html(f) for f in FL)}</div>
  <div class="block"><h3>Questions for Tarun</h3><div class="qs">{qh5}</div></div>
  <p class="note" style="color:var(--ink3);font-size:12px">Notes: claude/v12_phase5_flows.md</p>
</section>{JS5}'''

src = open('/home/claude/v12/board.html').read()
src = re.sub(r'<style id="p5css">.*?</style>', '', src, flags=re.S)
src = re.sub(r'<section class="phase p3 p4 p5" id="p5".*?</section><script>\(function\(\)\{var b=document.querySelectorAll\(\'#p5f.*?</script>', '', src, flags=re.S)
src = re.sub(r'<section class="later" id="p5">.*?</section>', '', src, flags=re.S)
src = src.replace('<section class="later" id="p6">', '<style id="p5css">' + CSS5 + '</style>' + SEC5 + '<section class="later" id="p6">', 1)
src = src.replace('<a href="#p4" class="now">', '<a href="#p4" class="">').replace('<a href="#p5" class="">', '<a href="#p5" class="now">')
open('/home/claude/v12/board.html', 'w').write(src)
json.dump([(f[1], f[2], [(v[0], v[1], v[2], v[3]) for v in f[5]], f[6]) for f in FL], open('/home/claude/v12/p5_meta.json', 'w'), ensure_ascii=False)
print('ok', total_taps, len(src))
