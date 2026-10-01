# Phase 7 — Retention & emotional design. Direction A (Monochrome glow) mockups.
import math, html, re
src6 = open('/home/claude/v12/phase6.py').read().split('def dir_vars')[0]
ns = {}; exec(src6, ns)
P = html.escape
dotgrid, jar, glowrow, ic, phone, head, tabbar = (ns[k] for k in ['dotgrid', 'jar', 'glowrow', 'ic', 'phone', 'head', 'tabbar'])
A = ns['DIRS'][0]

def scr(body, active='home', cls=''):
    return f'<div class="ph {cls}"><div class="sb"><span>9:41</span><span>●●● ▮</span></div><div class="scr">{body}</div>{tabbar(active)}</div>'

def card(inner, cls=''): return f'<div class="c6 w {cls}">{inner}</div>'
def savedots(n_solid, n_out, cols=10, r=4.2, lab='Savings dots'):
    return dotgrid([('f', 'sv', 1)] * n_solid + [('o', 'sv', 1)] * n_out, cols=cols, r=r, label=lab)
def fig(inner, cap, sub='', pick=False):
    return f'<figure class="f7{" pk7" if pick else ""}">{inner}<figcaption><b>{cap}</b>{f"<span>{sub}</span>" if sub else ""}</figcaption></figure>'

# ---------- loop map ----------
def loopmap():
    W, H = 760, 490; cx, cy, R = 380, 250, 165
    st = [('Income day', 'Split it · 1 tap', 'glow'), ('Subscription day', 'auto · 0 taps', ''), ('Weekly check-in ×4', 'Sun eve · 1 card', ''),
          ('Month-end', 'leftover → Savings', ''), ('Month story', 'peak-end · Insights', 'glow'), ('Fresh start', 'jars refill', '')]
    o = [f'<circle cx="{cx}" cy="{cy}" r="{R}" class="lm-ring"/>']
    for i, (t, s, g) in enumerate(st):
        a = -math.pi / 2 + i * 2 * math.pi / len(st); x = cx + R * math.cos(a); y = cy + R * math.sin(a)
        o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{9 if g else 7}" class="{"lm-g" if g else "lm-n"}"/>')
        dx = 18 if math.cos(a) > .2 else (-18 if math.cos(a) < -.2 else 0); anc = 'start' if dx > 0 else ('end' if dx < 0 else 'middle')
        dy = -34 if math.sin(a) < -.8 else (28 if math.sin(a) > .8 else 4)
        o.append(f'<text x="{x + dx:.0f}" y="{y + dy:.0f}" text-anchor="{anc}" class="lm-t">{P(t)}</text><text x="{x + dx:.0f}" y="{y + dy + 15:.0f}" text-anchor="{anc}" class="lm-s">{P(s)}</text>')
    # arrows direction ticks
    for i in range(6):
        a = -math.pi / 2 + (i + .5) * 2 * math.pi / 6; x = cx + R * math.cos(a); y = cy + R * math.sin(a); d = math.degrees(a) + 90
        o.append(f'<path d="M-5 -4 L0 0 L-5 4" transform="translate({x:.0f} {y:.0f}) rotate({d:.0f})" class="lm-ar"/>')
    # inner daily loop
    r2 = 62
    o.append(f'<circle cx="{cx}" cy="{cy}" r="{r2}" class="lm-ring2"/>')
    for i, (t) in enumerate(['Pay', 'dots leave', 'Home glow']):
        a = -math.pi / 2 + i * 2 * math.pi / 3; x = cx + r2 * math.cos(a); y = cy + r2 * math.sin(a)
        o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="5" class="lm-n"/><text x="{x:.0f}" y="{y + (-10 if i == 0 else 18):.0f}" text-anchor="middle" class="lm-s2">{t}</text>')
    o.append(f'<text x="{cx}" y="{cy + 4}" text-anchor="middle" class="lm-c">Daily</text>')
    # growth branch
    gx, gy = 640, 70
    o.append(f'<path d="M{cx + 120} {cy - 112} Q{gx - 40} {gy + 40} {gx - 6} {gy + 8}" class="lm-dash"/>')
    o.append(f'<circle cx="{gx}" cy="{gy}" r="9" class="lm-sv"/><text x="{gx - 14}" y="{gy - 16}" text-anchor="middle" class="lm-t">Goal milestones</text><text x="{gx - 14}" y="{gy + 28}" text-anchor="middle" class="lm-s">each 25% · bangle close at 100%</text>')
    o.append(f'<text x="{cx}" y="24" text-anchor="middle" class="lm-h">Monthly spine</text>')
    o.append(f'<text x="22" y="476" class="lm-s">Glow = moments that carry a reward. Green = savings. Every loop asks at most one tap; two ask none.</text>')
    return f'<div class="scroll7"><svg class="lm" viewBox="0 0 {W} {H}" width="{W}" role="img" aria-label="Loop map: daily pay loop inside a monthly spine of income day, subscription day, weekly check-ins, month-end, month story, fresh start, with goal milestones branching off">{"".join(o)}</svg></div>'

# ---------- first week ----------
WEEK = [
 ('Day 0', 'Setup', 'Starter month (4 taps). Savings dots already dropped in: progress starts at more than zero.', 'glow'),
 ('Day 1', 'First pay', 'Hourglass drop. One tip, once: "Spent dots stay as outlines, so you can see the whole month."', ''),
 ('Day 2', 'Return trigger', 'Push at 7:30 pm: "Your first day in dots." Opens a one-card recap.', 'push'),
 ('Day 3', 'First repeat line', 'Only if true: "2nd chai today." No push.', ''),
 ('Day 4–5', 'Silence', 'Nothing is sent. The widget does the reminding.', 'quiet'),
 ('Day 6', 'Subscription heads-up', 'Only if one is due tomorrow. Otherwise silent.', ''),
 ('Day 7', 'First check-in', 'Sunday card ends on savings still intact. Offer: "Add a goal?" (first goal moves here from setup).', 'glow'),
]
def week():
    o = []
    for i, (d, t, s, k) in enumerate(WEEK):
        o.append(f'<li class="wk {k}"><i></i><b>{d}</b><h5>{t}</h5><p>{P(s)}</p></li>')
    return '<ol class="wk7">' + ''.join(o) + '</ol>'

# ---------- lock screen ----------
def note(app_line, title, body, when='now', act=None):
    a = f'<div class="na">{"".join(f"<span>{x}</span>" for x in act)}</div>' if act else ''
    return f'<div class="nt"><div class="nh"><span class="lgm">Trickle</span><span>· {when}</span></div><b>{P(title)}</b><p>{P(body)}</p>{a}</div>'
def lock(notes, label):
    return f'<div class="lk" role="img" aria-label="{P(label)}"><div class="lkt">9:41</div><div class="lkd">Sunday, 4 October</div><div class="nts">{"".join(notes)}</div></div>'

NOTIF = [
 ('A', 'Calm few (recommended)', 'Max 1 a day, 3 a week, nothing 22:00–08:00. Only five types: income split, subscription tomorrow, weekly check-in, month story, one welcome-back. Each one has one action.',
  [note('', '₹9,000 came in', 'Split it like last time? Savings first.', 'now', ['Split it', 'Later']),
   note('', 'Spotify comes out tomorrow', '₹119 is already held in Spending. Nothing to do.', '2h'),
   note('', 'Your week, in one card', 'Savings untouched this week.', 'Sun 7:30 pm')], True),
 ('B', 'Event only', 'No scheduled pushes at all. Notifies only when money moves (income, subscription). Check-in and story wait quietly in the bell. Lowest noise, weakest day-7 and day-30 return.',
  [note('', '₹9,000 came in', 'Split it like last time?', 'now', ['Split it']),
   note('', 'Spotify paid', 'Came out of what was held for it.', 'yesterday')], False),
 ('C', 'Rhythm digest', 'One fixed slot: Sunday 7:30 pm, one digest of the week. Income split still pings live. Predictable, but bundles unrelated news into one long notification.',
  [note('', 'This week with Trickle', 'Food a little lighter than last week · Spotify on Tue · Goa trip 52% there', 'Sun 7:30 pm', ['Open'])], False),
]

# ---------- weekly check-in ----------
def ck_a():
    return scr(head('This week', ()) + card(
        '<div class="ct"><b>Week 2 of October</b><span class="mu">Sun</span></div>'
        f'<p class="lead7">Savings untouched. Food ran a little lighter than last week.</p>'
        f'<div class="lbl7">Food, this week vs last</div>{jar("j1", 400, 900, cols=10, r=4.6)}<div class="ghost7">{dotgrid([("o","gh",1)]*11, cols=10, r=4.6, label="Last week ghost")}</div>'
        '<p class="mu sm">≈ 3 of your chais fewer.</p>') +
        card(f'<div class="ct"><b>Goa trip</b><span class="mu">on track for Dec</span></div>{savedots(13, 11, cols=12, r=4)}') +
        '<div class="cta">Start the new week</div>', 'ins')
def ck_b():
    dots = '<div class="pgd"><i class="on"></i><i></i><i></i></div>'
    return scr(head('Your week', ()) + dots + card(
        '<div class="ct"><b>1 / 3 · What changed</b></div><p class="lead7">Food ran a little lighter.</p>'
        f'{jar("j1", 400, 900, cols=10, r=5)}<p class="mu sm">Next: Little things · Savings</p>', 'tall') +
        '<div class="cta">Next</div>', 'ins')
def ck_c():
    return scr(head('Home', ('bell', 'gear')) + card(
        '<div class="ct"><b>Sunday</b><span class="mu">×</span></div><p class="lead7">A calm week. Savings untouched.</p>'
        f'{glowrow(7, 6, cols=7, r=5, g=6, label="Week, today glows")}<p class="mu sm">Tap for the week</p>', 'soft') +
        '<div class="grid">' + f'<div class="c6 h"><div class="ct"><b>Food</b></div>{jar("j1", 2350, 1650, cols=6, r=4.2)}</div>'
        f'<div class="c6 h"><div class="ct"><b>Goa trip</b></div>{savedots(12, 12, cols=6)}</div></div>', 'home')
CHECK = [('A', 'One card (recommended)', 'One screen: a sentence, the ghost of last week for the jar that changed most, goal ETA, then "Start the new week". 1 tap to finish.', ck_a(), True),
         ('B', 'Three swipes', 'What changed · Little things · Savings. More to see, but three screens is where v9 check-ins were skipped.', ck_b(), False),
         ('C', 'Home card on Sunday', 'No separate screen: a dismissible card sits on top of Home for Sunday only. Lowest effort; easy to miss.', ck_c(), False)]

# ---------- month story ----------
def st_a():
    pg = '<div class="pgd">' + ''.join(f'<i class="{"on" if i == 4 else ""}"></i>' for i in range(5)) + '</div>'
    return scr(pg + card(
        '<div class="ct"><b>5 / 5 · September</b></div><p class="big7">You kept <span class="num">₹2,640</span></p><p class="mu sm">₹2,000 planned + ₹640 left over</p>'
        f'{savedots(26, 0, cols=10, r=5.2)}<p class="lead7">Goa trip moved 3 weeks closer.</p>', 'tall story') +
        '<div class="row7"><div class="cta ghostb">Share card</div><div class="cta">Start October</div></div>', 'ins')
def st_b():
    return scr(card(
        '<div class="ct"><b>September, in dots</b><span class="mu lgw">Trickle</span></div>'
        f'<div class="lbl7">Kept</div>{savedots(26, 0, cols=13, r=4.4)}'
        f'<div class="lbl7">Spent, by jar</div>{jar("j1", 0, 3700, cols=13, r=4.4)}{jar("j2", 0, 1300, cols=13, r=4.4)}{jar("j3", 0, 1400, cols=13, r=4.4)}'
        '<p class="lead7">Most of it went to Food. Chai: 38 cups.</p>', 'tall story') +
        '<div class="row7"><div class="cta ghostb">Share</div><div class="cta">Done</div></div>', 'ins')
def st_c():
    return scr(head('September', ()) + card(
        '<p class="letter">September was steady. You kept <b>₹2,640</b>, a bit more than August. Food ran heaviest in the last week, mostly evenings. Goa is now <b>64%</b> there.</p>'
        f'{savedots(16, 9, cols=10, r=4.6)}<p class="mu sm">Read more in Insights</p>', 'tall') + '<div class="cta">Start October</div>', 'ins')
STORY = [('A', 'Five cards, ends on savings (recommended)', 'Big buy · Little things · Where it went · What changed · You kept. The last card is always the savings number (peak-end). Share is opt-in and shows dots, never amounts unless switched on.', st_a(), True),
         ('B', 'One poster', 'The whole month on one card, built to share. Strong as a sharing object, but spent dots dominate the image.', st_b(), False),
         ('C', 'Letter', 'A short paragraph plus one visual. Calmest, but text-heavy and nothing to swipe or share.', st_c(), False)]

# ---------- lapse / return ----------
def lp_a():
    return scr(card(
        '<p class="big7">Welcome back.</p><p class="lead7">Your savings are where you left them.</p>'
        f'{savedots(20, 0, cols=10, r=5)}'
        '<p class="mu sm">14 UPI payments came in while you were away. They are sorted by best guess; you can check them any time in the bell.</p>', 'tall') +
        '<div class="cta">Start from today</div><p class="mu sm c7">Re-spread the rest of the month across the days left.</p>', 'home')
def lp_b():
    return scr(head('Catch up', ()) + card(
        '<div class="ct"><b>3 to sort</b><span class="mu">11 already sorted</span></div>'
        '<ul class="rows"><li><i class="d j1"></i>Swiggy · ₹240<span>Food</span></li><li><i class="d j2"></i>Uber · ₹180<span>Travel</span></li><li><i class="d j3"></i>PAYTM*QR7731 · ₹60<span>?</span></li></ul>'
        '<div class="seg2"><span class="on">Food</span><span>Fun</span><span>Other</span></div>', 'tall') + '<div class="cta">Done</div>', 'home')
def lp_c():
    return scr(head('Home', ('bell', 'gear')) +
        '<div class="grid">' + f'<div class="c6 w"><div class="ct"><b>Pace</b><span class="mu">Day 18 of 30</span></div>{glowrow(30, 17)}<p class="wd">Easy from here.</p></div>'
        f'<div class="c6 h"><div class="ct"><b>Food</b></div>{jar("j1", 1500, 2500, cols=6, r=4.2)}</div><div class="c6 h"><div class="ct"><b>Goa trip</b></div>{savedots(13, 11, cols=6)}</div></div>'
        '<p class="mu sm c7">Bell shows a soft dot. No message about the gap.</p>', 'home')
LAPSE = [('A', 'Welcome back + fresh start (recommended)', 'Savings first, a plain count of what was auto-sorted, one button that re-spreads the month from today. No list of missed days, no "you were gone".', lp_a(), True),
         ('B', 'Catch-up sort', 'Opens straight into the unsorted payments. Fast to tidy, but the first thing after a gap is a chore.', lp_b(), False),
         ('C', 'Silent resume', 'Home as if nothing happened; anything unsorted sits in the bell. Zero friction but the month may look wrong with no explanation.', lp_c(), False)]

# ---------- anxiety + celebration ----------
def anx(title, sentence, vis, btns):
    return scr(card(f'<p class="lead7">{P(title)}</p>{vis}<p class="mu sm">{P(sentence)}</p>', 'tall') +
               '<div class="row7">' + ''.join(f'<div class="cta {"ghostb" if i else ""}">{b}</div>' for i, b in enumerate(btns)) + '</div>', 'spend')
ANX = [
 ('When a jar runs out', anx('Food is used up for this month.', 'The other days get a little shorter. Nothing else changes.', jar("j1", 0, 4000, cols=10, r=4.6) + glowrow(12, 0, cols=12, r=4, g=5, label="Days left"), ['Take from Fun', 'Leave it'])),
 ('When income is late', anx('Allowance usually comes by the 1st.', 'It is 2 days later than usual. Your jars stay as they are until it lands.', glowrow(7, 3, cols=7, r=5, g=7, label="Expected day passed, glow waits"), ['Got it', 'Change the date'])),
 ('When savings are withdrawn', anx('₹1,000 moved out of Goa trip.', 'That is what savings are for. Goa trip is still 35% there.', savedots(21, 10, cols=10, r=4.6) , ['OK', 'Add back later'])),
]
def cel(title, vis, line):
    return f'<div class="cel">{vis}<b>{P(title)}</b><p>{P(line)}</p></div>'
CEL = [cel('Goal reached', '<svg viewBox="0 0 60 60" width="60" height="60" role="img" aria-label="Bangle closes"><circle cx="30" cy="30" r="22" class="bng"/></svg>', 'Bangle closes once, one soft tone. "Goa trip is ready."'),
       cel('Each quarter of a goal', savedots(5, 15, cols=10, r=3.5), 'The row fills in. No push; you see it next time.'),
       cel('Income split', savedots(10, 0, cols=10, r=3.5), 'Savings dots drop in first, then jars fill. "Savings sorted."'),
       cel('A lighter week', jar('j1', 300, 700, cols=10, r=3.5), 'One sentence in the check-in. No score.')]

# ---------- widgets ----------
def wg(inner, cls, label): return f'<div class="wg {cls}" role="img" aria-label="{P(label)}">{inner}</div>'
WIDGETS = [
 ('Pace 4×1', wg(f'<span class="wt">Trickle</span>{glowrow(30, 11, cols=30, r=2.6, g=2.8)}<span class="ww">Calm pace</span>', 'w41', 'Pace glow widget'), 'Glow of the month, today lit, one word. No numbers. Updates after each pay.'),
 ('Goal 2×2', wg(f'<span class="wt">Goa trip</span>{savedots(12, 12, cols=6, r=5.2)}<span class="ww">Dec</span>', 'w22', 'Goal widget'), 'Saved solid, to-go outlined. Tap opens Savings.'),
 ('Pay 2×1', wg(f'<span class="wt">Pay</span><span class="wp">{ic("scan", 22)}</span><span class="ww">Log cash</span>', 'w21', 'Pay widget'), 'One tap to scan: puts the pay moment (friction) before the UPI app.'),
 ('Jar 2×2', wg(f'<span class="wt">Food</span>{jar("j1", 2350, 1650, cols=6, r=5.2)}', 'w22', 'Food jar widget'), 'Optional. The one widget with a budget look; off by default, user adds it.'),
]
def hs():
    w = WIDGETS
    return (f'<div class="hs" role="img" aria-label="Android home screen with Trickle widgets"><div class="hst">9:41</div>{w[0][1]}<div class="hsr">{w[1][1]}{w[2][1]}</div>'
            '<div class="apps">' + ''.join('<i></i>' for _ in range(8)) + '</div></div>')

# ---------- text tables ----------
LOOPS = [
 ('Daily glance', 'Habit; home-screen widget', 'Open Home (or just look at widget)', 'Pace glow word, savings dots', '0', 'No numbers on Home (P2c-Q1)'),
 ('Pay moment', 'Every UPI pay / Log cash', 'Amount + guessed jar chip', 'Hourglass drop; per-day line only if jar low; repeat line', '2', 'Friction is the point (Soman 2003)'),
 ('Income day', 'UPI credit', '"Split it"', 'Savings dots drop in first', '1', 'Push allowed'),
 ('Subscription day', 'Due date', 'none', '"Paid from what was held"', '0', 'Heads-up push only the day before'),
 ('Weekly check-in', 'Sunday 7:30 pm', 'Read one card', 'Fresh start + savings intact', '1', 'Skipped 2 weeks in a row → stop pushing it'),
 ('Month-end + story', 'Last day / income day', 'Leftover → Savings (default)', '"You kept ₹X" last card', '1–2', 'Peak-end; share opt-in'),
 ('Goal milestones', '25 / 50 / 75 / 100%', 'none', 'Row fills; bangle close at 100%', '0', 'No push except 100%'),
 ('Repeat-buy awareness', '2nd+ same payee within the window', 'none', 'Neutral line at pay ("3rd chai this week")', '0', 'Never a push'),
 ('Friend pays back', 'Matching UPI credit', 'none (ask once if unsure)', 'Dashed dots fill', '0–1', 'Log item in bell'),
]
NTYPES = [
 ('Income came in', 'Split it like last time?', 'yes, live', 'Split it / Later'),
 ('Subscription tomorrow', 'Spotify comes out tomorrow. It is already held.', 'day before, 10:00', '—'),
 ('Weekly check-in', 'Your week, in one card.', 'Sun 19:30', 'Open'),
 ('Month story', 'September is ready. You kept ₹2,640.', 'income day or 1st, 19:30', 'Open'),
 ('Goal reached', 'Goa trip is ready.', 'live (in quiet hours: next morning)', 'Open'),
 ('Welcome back (once)', 'Your savings are where you left them.', 'after 10 quiet days, then never again for 30 days', 'Open'),
]
NEVER = ['"You overspent" or any jar-empty push', 'Remaining-budget numbers in a notification', 'Streaks, "don\'t break your…", points, badges, app-icon counts',
         'Multiple pushes in one day (income beats everything)', 'Anything between 22:00 and 08:00', 'Guilt copy: "you were gone", "you missed", "only ₹X left"']
PRINC = [
 ('Savings shows up first', 'Every loop that ends, ends on savings: income split, check-in, month story.', 'Thaler & Benartzi 2004; Kahneman et al. 1993 (peak-end)'),
 ('One tap per loop, two loops need none', 'Retention comes from removing effort, not adding prompts.', 'Fogg 2009 B=MAP'),
 ('Bad news only where it can be acted on', 'Jar empty appears at the pay moment, never on open or as a push.', 'Karlsson, Loewenstein & Seppi 2009 (ostrich effect)'),
 ('Fresh starts are built in', 'Sunday and the 1st reset the frame; returning after a gap is a fresh start too.', 'Dai, Milkman & Riis 2014'),
 ('Progress starts above zero', 'Setup drops savings dots in before the first spend.', 'Nunes & Drèze 2006 (endowed progress)'),
 ('No streaks, scores or badges', 'Missed days are invisible, so there is nothing to break.', 'Polivy & Herman 1985 (what-the-hell effect); v8 research §14'),
 ('Few, predictable notifications', '≤1/day, ≤3/week, quiet 22:00–08:00, a channel per type the user can mute.', 'Android notification guidelines; Pielot et al. 2014; Wohllebe et al. 2021'),
 ('Every notification has one useful action', 'If it has no action and no news, it is not sent.', 'Android notification guidelines'),
 ('Feel the payment', 'Dots leave at pay; the widget puts Pay before the UPI app.', 'Prelec & Loewenstein 1998; Soman 2003'),
 ('Name the habit, never judge it', 'Repeat buys as counts in the user\'s own units ("3rd chai"), no adjectives.', 'Soman 2001; P2c-Q3'),
 ('Explain the unexpected calmly', 'Late income, withdrawals and empty jars each get a sentence that says what happens next.', 'Shapiro & Burchell 2012 (financial anxiety)'),
 ('Calm celebration', 'One motion, one soft tone, once. No confetti.', 'Weiser & Brown 1996 (calm technology)'),
 ('Sharing is opt-in and shows dots, not ₹', 'Month story card can be shared; amounts hidden unless switched on.', 'Wrapped-style recap sharing; privacy line (Phase 1 #133)'),
 ('Ambient beats alerting', 'The widget and Home glow carry the daily loop instead of pushes.', 'Weiser & Brown 1996; Ambient Orb (v8 research §12)'),
]
QS = [
 ('P7-Q1', 'Notifications', ['A Calm few: ≤1/day, ≤3/week, 5 types', 'B Event only (money moves)', 'C One Sunday digest'], 0, 'A. Keeps day-7 and day-30 triggers without noise; each push has one action.'),
 ('P7-Q2', 'Weekly check-in', ['A One card + "Start the new week"', 'B Three swipes', 'C Sunday card on Home'], 0, 'A. One screen, ends on savings; three-swipe check-ins were skipped in v9.'),
 ('P7-Q3', 'Month story', ['A Five cards ending on "You kept ₹X"', 'B One poster', 'C Letter'], 0, 'A, with B\'s poster as the share card (dots only, ₹ hidden by default).'),
 ('P7-Q4', 'Coming back after a gap', ['A Welcome back + "Start from today"', 'B Catch-up sort first', 'C Silent resume'], 0, 'A. Savings first, auto-sorted payments counted not listed, month re-spread from today.'),
 ('P7-Q5', 'Home-screen widgets at launch', ['A Pace 4×1 + Goal 2×2 + Pay 2×1 (Jar optional)', 'B Pace only', 'C No widgets in v12'], 0, 'A. The widget is the daily loop without a push; Pay widget adds friction before the UPI app.'),
]

def table(head_, rows, cls='t7'):
    h = ''.join(f'<th scope="col">{P(x)}</th>' for x in head_)
    b = ''.join('<tr>' + f'<th scope="row">{P(r[0])}</th>' + ''.join(f'<td>{P(c)}</td>' for c in r[1:]) + '</tr>' for r in rows)
    return f'<div class="scroll"><table class="{cls}"><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table></div>'
def variants(lst):
    return '<div class="vr7">' + ''.join(f'<div class="v7{" pk7" if pk else ""}"><div class="vh7"><span class="ok">{k}</span><b>{P(n)}</b></div><p>{P(d)}</p><div class="d6 d6A">{ph}</div></div>' for k, n, d, ph, pk in lst) + '</div>'
def notifs():
    return '<div class="vr7">' + ''.join(f'<div class="v7{" pk7" if pk else ""}"><div class="vh7"><span class="ok">{k}</span><b>{P(n)}</b></div><p>{P(d)}</p>{lock(ns_, n)}</div>' for k, n, d, ns_, pk in NOTIF) + '</div>'
def questions():
    return ''.join(f'<div class="q"><span class="qid">{k}</span><h3>{P(t)}</h3><ul>' + ''.join(f'<li class="{"pick" if i == r else ""}">{P(o)}</li>' for i, o in enumerate(opts)) + f'</ul><p class="qr"><b>Recommended:</b> {P(why)}</p></div>' for k, t, opts, r, why in QS)

CSS7 = r'''
.p7{--g7:#ffffff;--bg7:#0b0b0c;--sf7:#18181a;--sf72:#222225;--ink7:#f4f4f5;--mu7:#9a9aa0;--ln7:#2c2c30;--sv7:#22a385}
.p7 .d6{--bg:#0b0b0c;--sf:#18181a;--sf2:#222225;--ink:#f4f4f5;--mu:#9a9aa0;--ln:#2c2c30;--glow:#fff;--j1:#ad7c26;--j2:#5a8ae6;--j3:#b9407f;--sv:#22a385;--fd:'Geist',system-ui,sans-serif;--ft:'Geist',system-ui,sans-serif;--fn:'Geist',system-ui,sans-serif;--rad:24px;--bd:1px solid rgba(255,255,255,.07);--sh:none;--cardbg:linear-gradient(180deg,#1d1d20,#151517);--sw:1.75;--cap:round}
.p7 .d6 .o{stroke-width:1.6}.p7 .d6 .o.gh{stroke:#55555c;stroke-dasharray:2 2}.p7 .ghost7{margin-top:-4px}
.p7 .scroll7{overflow-x:auto;background:#0b0b0c;border-radius:12px;padding:8px}
.lm{display:block;max-width:none;font-family:'Geist',system-ui,sans-serif}
.lm-ring{fill:none;stroke:#3a3a40;stroke-width:1.5}.lm-ring2{fill:none;stroke:#2c2c30;stroke-width:1.2;stroke-dasharray:3 4}
.lm-n{fill:#9a9aa0}.lm-g{fill:#fff;filter:drop-shadow(0 0 6px #fff)}.lm-sv{fill:#22a385}.lm-ar{fill:none;stroke:#6b6b72;stroke-width:1.5}
.lm-t{fill:#f4f4f5;font-size:14px;font-weight:600}.lm-s{fill:#9a9aa0;font-size:12px}.lm-s2{fill:#c8c8cc;font-size:11px}.lm-c{fill:#9a9aa0;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.lm-h{fill:#9a9aa0;font-size:11px;letter-spacing:.1em;text-transform:uppercase}.lm-dash{fill:none;stroke:#22a385;stroke-width:1.4;stroke-dasharray:4 4}
.wk7{list-style:none;margin:0;padding:16px;display:grid;grid-template-columns:repeat(7,minmax(130px,1fr));gap:10px;background:#0b0b0c;border-radius:12px;color:#f4f4f5;font-family:'Geist',system-ui,sans-serif;overflow-x:auto}
@media (max-width:760px){.wk7{grid-template-columns:1fr}}
.wk{display:grid;gap:4px;align-content:start;border-top:1px solid #2c2c30;padding-top:10px;position:relative;min-width:0}
.wk i{width:10px;height:10px;border-radius:50%;background:#55555c}.wk.glow i{background:#fff;box-shadow:0 0 8px #fff}.wk.push i{background:none;border:1.6px solid #fff}.wk.quiet i{background:none;border:1.6px dashed #55555c}
.wk b{font:500 11px 'Geist Mono',monospace;color:#9a9aa0}.wk h5{margin:0;font-size:14px}.wk p{margin:0;font-size:12px;color:#c8c8cc}
.vr7{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
.v7{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:12px;display:grid;gap:8px;align-content:start;justify-items:start;min-width:0}
.v7.pk7{border:2px solid var(--tile)}.vh7{display:flex;gap:8px;align-items:center}.vh7 b{font:700 15px var(--f-disp)}.v7>p{margin:0;font-size:12.5px;color:var(--ink2)}
.p7 .lead7{margin:0;font-size:12.5px;font-weight:600;line-height:1.35}.p7 .big7{margin:0;font-size:19px;font-weight:700;line-height:1.2}
.p7 .lbl7{font:500 9.5px 'Geist Mono',monospace;color:var(--mu);text-transform:uppercase;letter-spacing:.06em}
.p7 .c6.tall{gap:9px;padding:14px 12px}.p7 .c6.story{min-height:300px;align-content:center}.p7 .c6.soft{border:1px solid rgba(255,255,255,.18)}
.p7 .pgd{display:flex;gap:4px;justify-content:center}.p7 .pgd i{width:18px;height:3px;border-radius:2px;background:#3a3a40}.p7 .pgd i.on{background:#fff}
.p7 .row7{display:flex;gap:6px}.p7 .row7 .cta{flex:1}.p7 .cta.ghostb{background:var(--sf2);color:var(--ink)}
.p7 .letter{margin:0;font-size:12px;line-height:1.5}.p7 .c7{text-align:center}.p7 .lgw{font-weight:700;letter-spacing:-.02em;color:var(--ink)}
.p7 .rows i.d{flex:none}.p7 .ct .mu{font-size:10px;white-space:nowrap}
.lk{width:236px;height:430px;border-radius:30px;border:5px solid #050505;background:radial-gradient(120% 60% at 50% 0%,#2a2a30,#0b0b0c 70%);color:#f4f4f5;font-family:'Geist',system-ui,sans-serif;padding:18px 10px;display:flex;flex-direction:column;gap:2px}
.lkt{font-size:46px;font-weight:300;text-align:center;letter-spacing:-.02em}.lkd{text-align:center;font-size:11px;color:#c8c8cc;margin-bottom:14px}
.nts{display:grid;gap:6px}.nt{background:rgba(40,40,44,.92);border-radius:16px;padding:9px 11px;display:grid;gap:2px}
.nh{display:flex;gap:4px;font-size:10px;color:#9a9aa0}.lgm{color:#f4f4f5;font-weight:700;letter-spacing:-.01em}
.nt b{font-size:12px}.nt p{margin:0;font-size:11px;color:#c8c8cc}.na{display:flex;gap:12px;margin-top:4px}.na span{font-size:11px;font-weight:600;color:#fff}
.cels{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
.cel{background:#0b0b0c;color:#f4f4f5;border-radius:14px;padding:14px;display:grid;gap:6px;justify-items:start;font-family:'Geist',system-ui,sans-serif}
.cel b{font-size:13px}.cel p{margin:0;font-size:11.5px;color:#9a9aa0}.cel .f.sv{fill:#22a385}.cel .o.sv{fill:none;stroke:#22a385;stroke-width:1.6}.cel .f.j1{fill:#ad7c26}.cel .o.j1{fill:none;stroke:#ad7c26;stroke-width:1.6}
.bng{fill:none;stroke:#22a385;stroke-width:6;filter:drop-shadow(0 0 4px #22a385)}
.wrow7{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:16px;align-items:start}@media (max-width:760px){.wrow7{grid-template-columns:1fr}}
.hs{width:280px;max-width:100%;border-radius:30px;border:5px solid #050505;background:linear-gradient(160deg,#3b3f4a,#1b1d22 60%,#2a2320);padding:14px 12px;display:grid;gap:10px;font-family:'Geist',system-ui,sans-serif}
.hst{color:#fff;font-size:12px}.hsr{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.wg{background:rgba(11,11,12,.86);border-radius:22px;padding:12px;display:grid;gap:6px;color:#f4f4f5;align-content:start;justify-items:start}
.wg .wt{font-size:11px;font-weight:600}.wg .ww{font-size:11px;color:#c8c8cc}.wg .wp{width:44px;height:44px;border-radius:50%;background:#f4f4f5;display:grid;place-items:center}.wg .wp .i6{fill:none;stroke:#0b0b0c;stroke-width:1.75;stroke-linecap:round}
.wg .gr .gp{fill:#9a9aa0;opacity:.75}.wg .gr .gf{fill:#9a9aa0;opacity:.28}.wg .gr .gl{fill:#fff;filter:drop-shadow(0 0 3px #fff)}.wg svg{max-width:100%;height:auto}
.wg .f.sv{fill:#22a385}.wg .o.sv{fill:none;stroke:#22a385;stroke-width:1.6}.wg .f.j1,.wg .j1.f path{fill:#ad7c26}.wg .o.j1{fill:none;stroke:#ad7c26;stroke-width:1.6}.wg .f{stroke:rgba(255,255,255,.22);stroke-width:.8}
.apps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;padding:6px 8px}.apps i{aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.18)}
.wl{display:grid;gap:8px;margin:0;padding:0;list-style:none}.wl li{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:9px 12px;font-size:13px}.wl b{display:block}
.t7{font-size:13px}.t7 th,.t7 td{padding:8px 10px;border-top:1px solid var(--rule);text-align:left;vertical-align:top}.t7 thead th{font:500 11px var(--f-mono);color:var(--ink3)}.t7 th[scope=row]{font-weight:600;white-space:nowrap}
.pr7{counter-reset:p;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:8px}
.pr7 li{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:10px 12px;display:grid;gap:2px;font-size:13px}.pr7 li b{font-weight:600}.pr7 li small{color:var(--ink3);font-size:11.5px}.pr7 li span{color:var(--ink2)}
.nv{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none}.nv li{font-size:12.5px;padding:4px 10px;border:1px dashed var(--ink3);border-radius:999px;color:var(--ink2)}
.anxr{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
'''

SRC = [('Android Developers — Notifications design guidelines', 'https://developer.android.com/design/ui/mobile/guides/home-screen/notifications'),
       ('Wohllebe et al. 2021 — Effect of push notification frequency on app user behaviour (retail)', 'https://www.researchgate.net/publication/351932011_Mobile_apps_in_retail_Effect_of_push_notification_frequency_on_app_user_behavior'),
       ('Pielot, Church & de Oliveira 2014 — An in-situ study of mobile phone notifications (MobileHCI)', 'https://dl.acm.org/doi/10.1145/2628363.2628364'),
       ('Dai, Milkman & Riis 2014 — The fresh start effect (Management Science)', 'https://doi.org/10.1287/mnsc.2014.1901'),
       ('Lee — Fintech nudges: overspending messages (SSRN)', 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3390777'),
       ('Bitrián, Buil & Catalán 2021 — Gamification of personal finance apps', 'https://selfdeterminationtheory.org/wp-content/uploads/2024/03/2021_BitrianBuilCatalan_IJBM.pdf'),
       ('Spotify Wrapped as a shareable recap (NoGood case study)', 'https://nogood.io/blog/spotify-wrapped-marketing-strategy/')]

anx_html = '<div class="anxr">' + ''.join(f'<div class="v7"><div class="vh7"><b>{P(t)}</b></div><div class="d6 d6A">{ph}</div></div>' for t, ph in ANX) + '</div>'
wid_list = '<ul class="wl">' + ''.join(f'<li><b>{P(n)}</b>{P(d)}</li>' for n, _, d in WIDGETS) + '</ul>'

SEC7 = f'''<section class="phase p7" id="p7" style="margin-top:48px">
<h2><span>Phase 7</span> Retention &amp; emotional design</h2>
<p class="lede" style="margin:0">How Trickle brings a student back without guilt, games or noise. All mockups in direction A (Monochrome glow, Geist), same hostel-student data as Phase 6. Values held: savings motivates; friction at pay; repeat-buy awareness; low anxiety; no red, no debt words, no badges or counts; no streaks; Home shows no numbers; the bell holds actions and the log.</p>
<div class="dec1"><h3>Logged from Phase 6 (Tarun, 1 Oct)</h3><ul><li>Direction A Monochrome glow (Geist / Geist Mono) + C's 1.6px spent outlines + B's palette for light mode.</li><li>Appearance follows the phone; B&amp;W optional. Logo: L3 "Trickle" wordmark. Dots: flat + hairline highlight. ₹ numerals: text face, tabular figures.</li></ul></div>
<div class="block"><h3>Loop map</h3><p class="note">A daily pay loop inside a monthly spine. Each loop asks for one tap at most; subscription day and goal milestones ask for none.</p>{loopmap()}
{table(['Loop', 'Trigger', 'Action', 'Reward', 'Taps', 'Guardrail'], LOOPS)}</div>
<div class="block"><h3>First week, day 0 to 7</h3><p class="note">Filled glow = reward moment, ring = the one push of the week, dashed = deliberate silence. Return triggers: day 2 (first-day recap), day 7 (first check-in), day 30 (month story).</p>{week()}</div>
<div class="block"><h3>Notification strategy, three variants</h3><p class="note">Lock-screen mockups, same week. Wording never carries a remaining-budget number.</p>{notifs()}
{table(['Type (each its own Android channel)', 'Example', 'When', 'Action'], NTYPES)}
<h3 style="font-size:15px">Never sent</h3><ul class="nv">{"".join(f"<li>{P(x)}</li>" for x in NEVER)}</ul></div>
<div class="block"><h3>Weekly check-in, three formats</h3>{variants(CHECK)}</div>
<div class="block"><h3>Month-end story, three formats</h3>{variants(STORY)}</div>
<div class="block"><h3>Coming back after two weeks</h3><p class="note">UPI kept recording while the student was away; nothing says they were gone.</p>{variants(LAPSE)}</div>
<div class="block"><h3>Anxiety reducers</h3><p class="note">Each says what happens next in one sentence, then offers one calm choice.</p>{anx_html}</div>
<div class="block"><h3>Celebration, calm</h3><p class="note">One motion, one soft tone, once. Motion and sound are finalised in Phase 12.</p><div class="cels">{"".join(CEL)}</div></div>
<div class="block"><h3>Android home-screen widgets</h3><p class="note">The widget is the daily glance without a push. Same rule as Home: no numbers.</p><div class="wrow7">{hs()}{wid_list}</div></div>
<div class="block"><h3>Sharing and personalisation</h3><ul class="wl"><li><b>Share card (opt-in)</b>From the last month-story card: dots and the month name only. "Show amounts" is off by default. No friend list, no leaderboard.</li><li><b>Your own units</b>Equivalents use the student's frequent buys ("≈ 3 of your chais").</li><li><b>Your own rhythm</b>Check-in day and time, quiet hours and each notification type are editable in app settings; weekly or payday period follows Income settings.</li><li><b>Widget choice</b>Pace, Goal and Pay by default; Jar widget opt-in.</li></ul></div>
<div class="block"><h3>14 principles</h3><ol class="pr7">{"".join(f"<li><b>{i+1}. {P(t)}</b><span>{P(d)}</span><small>{P(s)}</small></li>" for i, (t, d, s) in enumerate(PRINC))}</ol>
<p class="note">Sources (new this phase): {" · ".join(f'<a href="{u}" target="_blank" rel="noopener">{P(n)}</a>' for n, u in SRC)}. Others carried from v8 research and v11 Phase 7.</p></div>
<div class="recbox"><div class="pri"><h4>Recommendation</h4><ul><li>Notifications A: ≤1/day, ≤3/week, quiet 22:00–08:00, five types, one action each.</li><li>Check-in A: one card ending "Start the new week".</li><li>Month story A: five cards ending on "You kept ₹X"; B's poster as the opt-in share card.</li><li>Return A: "Welcome back", savings first, start from today.</li><li>Widgets: Pace 4×1, Goal 2×2, Pay 2×1; Jar opt-in.</li></ul></div>
<div><h4>Watch</h4><ul><li>Fewer pushes means the widget has to earn its place; test whether students add it.</li><li>"₹2,640" on the story card is the one big number; it stays in Insights, never on Home.</li><li>Late income copy must never guess why.</li></ul></div></div>
<div class="block"><h3>Questions for Tarun</h3><div class="qs">{questions()}</div></div>
</section>'''

src = open('/home/claude/v12/board_pre7.html').read()
old = re.search(r'<section class="later" id="p7">.*?</section>', src).group(0)
src = src.replace(old, '<style id="p7css">' + CSS7 + '</style>' + SEC7, 1)
src = src.replace('<a href="#p6" class="now">', '<a href="#p6" class="">').replace('<a href="#p7" class="">', '<a href="#p7" class="now">')
open('/home/claude/v12/board.html', 'w').write(src)
print('ok', len(src))
