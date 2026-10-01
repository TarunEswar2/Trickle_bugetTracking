import html, re
E = html.escape
T, G = 9, 2          # tile size, gap
PW = 10 * T + 9 * G  # pill width (10 tiles merged)

def ladder(amt):
    b, r = divmod(amt, 10000); p, r = divmod(r, 1000); t, c = divmod(r, 100)
    return b, p, t, c

def tiles_svg(amt, cls='f', x0=0, y0=0, ghost=0, gcls='o', label=None):
    """Draw amt (solid, class cls) followed by ghost amount (outline class gcls) on the locked ladder.
    Pills on their own rows, tiles in rows of 10, cup = partly filled tile. Returns (svg_inner, w, h)."""
    out = []; y = y0; w = 0
    def row_items(a, c):
        nonlocal y, w
        b, p, t, cu = ladder(a)
        for _ in range(b):
            out.append(f'<rect class="{c}" x="{x0}" y="{y}" width="{PW}" height="{PW//3}" rx="3"/>'); y += PW//3 + G
        for _ in range(p):
            out.append(f'<rect class="{c}" x="{x0}" y="{y}" width="{PW}" height="{T}" rx="2.5"/>'); y += T + G; w = max(w, PW)
        n = t + (1 if cu else 0)
        for i in range(n):
            xx = x0 + (i % 10) * (T + G); yy = y + (i // 10) * (T + G)
            if i < t:
                out.append(f'<rect class="{c}" x="{xx}" y="{yy}" width="{T}" height="{T}" rx="1.5"/>')
            else:
                h = max(1, round(T * cu / 100))
                out.append(f'<rect class="cupo" x="{xx+.5}" y="{yy+.5}" width="{T-1}" height="{T-1}" rx="1.5"/>'
                           f'<rect class="{c}" x="{xx}" y="{yy+T-h}" width="{T}" height="{h}" rx="1"/>')
            w = max(w, (i % 10 + 1) * (T + G))
        if n: y += ((n - 1) // 10 + 1) * (T + G)
    row_items(amt, cls)
    if ghost: row_items(ghost, gcls)
    return ''.join(out), w, y - y0

def svg(inner, w, h, title):
    return f'<svg viewBox="0 0 {w} {h}" width="{w*1.7:.0f}" height="{h*1.7:.0f}" role="img" aria-label="{E(title)}">{inner}</svg>'

def txt(x, y, s, c='lbl', anchor='start'):
    return f'<text class="{c}" x="{x}" y="{y}" text-anchor="{anchor}">{E(s)}</text>'

def fig_simple(amt, title, cls='f', ghost=0, gcls='o', note=None):
    i, w, h = tiles_svg(amt, cls, 0, 0, ghost, gcls)
    return svg(i, max(w, 40), h, title)

def inr(n):
    s = str(n)
    if len(s) > 3: s = s[:-3][::-1]; s = ','.join(s[i:i+2] for i in range(0, len(s), 2))[::-1] + ',' + str(n)[-3:]
    return '₹' + s

# ---------- method graphics (all from the shared sample data)
def m_unit():  # ₹350 meal
    return fig_simple(350, '₹350 meal as 3 tiles and a half cup')
def m_left():
    i, w, h = tiles_svg(2100, 'f', 0, 0, 3900, 'o'); return svg(i, w, h, '₹2,100 left solid, ₹3,900 spent as outlines')
def m_redbad():
    i, w, h = tiles_svg(2100, 'f', 0, 0, 3900, 'bad'); return svg(i, w, h, 'Spent tiles in red (avoid)')
def m_perday():
    # 12 days left, ₹2,100 -> ₹175/day
    out = []; x = 0
    for d in range(12):
        out.append(f'<rect class="f" x="{x}" y="0" width="{T}" height="{T}" rx="1.5"/>')
        h = round(T * .75)
        out.append(f'<rect class="cupo" x="{x+.5}" y="{T+G+.5}" width="{T-1}" height="{T-1}" rx="1.5"/><rect class="f" x="{x}" y="{T+G+T-h}" width="{T}" height="{h}" rx="1"/>')
        out.append(txt(x + T/2, 2*T + G + 9, str(d + 19), 'lbl mid'))
        x += T + 5
    return svg(''.join(out), x, 2*T + G + 11, '₹175 per day for 12 days')
def m_runway():
    out = []; x = 0
    for d in range(7):
        a = 350 if d < 6 else 0
        cls = 'f' if d < 6 else 'o'
        inner, w, h = tiles_svg(a if a else 350, cls, x, 0)
        out.append(inner); out.append(txt(x, 34, ['Thu','Fri','Sat','Sun','Mon','Tue','Wed'][d], 'lbl'))
        x += 4 * (T + G) + 6
    return svg(''.join(out), x, 37, '₹2,100 lasts six ₹350 days')
def m_equiv():
    out = []
    i, w, h = tiles_svg(350, 'f'); out.append(i)
    out.append(txt(w + 6, 8, '≈', 'lbl big'))
    x = w + 20
    for k in range(14):
        xx = x + (k % 7) * (T + G); yy = (k // 7) * (T + G)
        out.append(f'<rect class="cupo" x="{xx+.5}" y="{yy+.5}" width="{T-1}" height="{T-1}" rx="1.5"/><rect class="s" x="{xx}" y="{yy+T-2}" width="{T}" height="2" rx="1"/>')
    return svg(''.join(out), x + 7*(T+G), 2*(T+G), '₹350 ≈ 14 chais of ₹25')
def m_stack():
    out = []; x = 0
    for k in range(4):
        h = round(T * .25 * (k + 1))
        out.append(f'<rect class="cupo" x="{x+.5}" y=".5" width="{T-1}" height="{T-1}" rx="1.5"/><rect class="f" x="{x}" y="{T-h}" width="{T}" height="{h}" rx="1"/>')
        out.append(txt(x + T/2, T + 10, ['Mon','Tue','Wed','Thu'][k], 'lbl mid'))
        x += T + 14
    out.append(txt(x - 4, 8, '=', 'lbl big'))
    out.append(f'<rect class="f" x="{x+8}" y="0" width="{T}" height="{T}" rx="1.5"/>')
    out.append(txt(x + 8 + T/2, T + 10, '₹100', 'lbl mid'))
    return svg(''.join(out), x + 30, T + 12, 'Four ₹25 chais fill one ₹100 tile')
def m_time():
    out = []
    i, w, h = tiles_svg(350, 'f'); out.append(i)
    out.append(txt(w + 6, 8, '=', 'lbl big'))
    # 1 day of food jar ₹300/day : day-cell with fill
    x = w + 20
    out.append(f'<rect class="e" x="{x}" y="0" width="40" height="{T}" rx="2"/><rect class="s" x="{x}" y="0" width="40" height="{T}" rx="2" opacity=".85"/>')
    out.append(f'<rect class="e" x="{x+44}" y="0" width="40" height="{T}" rx="2"/><rect class="s" x="{x+44}" y="0" width="7" height="{T}" rx="2" opacity=".85"/>')
    out.append(txt(x, T + 10, 'day 1', 'lbl')); out.append(txt(x + 44, T + 10, 'day 2', 'lbl'))
    return svg(''.join(out), x + 88, T + 12, '₹350 is 1.2 days of your ₹300/day food money')
def m_income():
    # 9,000 = 3,900 spent, 2,100 left, 3,000 saved
    out = []; y = 0
    parts = [(3000, 's', 'Saved'), (2100, 'f', 'Left'), (3900, 'x', 'Spent')]
    for a, c, lab in parts:
        i, w, h = tiles_svg(a, c, 0, y); out.append(i); out.append(txt(PW + 6, y + 7, f'{lab} {inr(a)}', 'lbl')); y += h + 3
    return svg(''.join(out), PW + 80, y, '₹9,000 income as 9 pills')
def m_goal():
    out = []
    i, w, h = tiles_svg(4160, 's', 0, 0, 3840, 'o'); out.append(i)
    return svg(''.join(out), w, h, 'Goal ₹8,000: ₹4,160 saved, ₹3,840 to go as outlines')
def m_future():
    # pace ₹1,000/month -> ETA ~4 months; months as positions; projected pills dashed
    out = []; x = 0
    for k, mth in enumerate(['Oct', 'Nov', 'Dec', 'Jan', 'Feb']):
        out.append(f'<rect class="{"s" if k==0 else "proj"}" x="{x}" y="0" width="{PW//4}" height="{T}" rx="2.5"/>')
        out.append(txt(x, T + 10, mth, 'lbl')); x += PW//4 + 4
    out.append(f'<circle class="eta" cx="{x-PW//8-4}" cy="{T+20}" r="3"/>')
    out.append(txt(x - PW//8 - 10, T + 22, 'goal', 'lbl', 'end'))
    return svg(''.join(out), x, T + 25, 'Projected pills to reach goal by February')
def m_pay():
    out = []
    i, w, h = tiles_svg(1750, 'f', 0, 0, 350, 'leaving'); out.append(i)
    return svg(''.join(out), w, h, 'Pay ₹350: 3.5 tiles lift out of ₹2,100')
def m_week():
    out = []
    # last week 2,000 ghost, this week 2,600 solid on top; extra 600 hatched
    i, w, h = tiles_svg(2000, 'f', 0, 0, 600, 'more'); out.append(i)
    i2, w2, h2 = tiles_svg(2000, 'o', 0, h + 10); out.append(i2)
    out.append(txt(PW + 6, 7, 'this week', 'lbl')); out.append(txt(PW + 6, h + 17, 'last week', 'lbl'))
    return svg(''.join(out), PW + 60, h + h2 + 10, 'This week ₹2,600 vs last week ₹2,000; extra ₹600 hatched')
def m_freq():
    out = []; x = 0
    over = {2, 5, 8}
    for d in range(10):
        c = 'f' if d in over else 'x'
        out.append(f'<rect class="{c}" x="{x}" y="0" width="{T}" height="{T}" rx="1.5"/>'); x += T + G
    return svg(''.join(out), x, T, '3 of the last 10 days over ₹300')
def m_dots():
    # quantile dotplot of 20 weekly spends
    vals = [1500,1600,1700,1700,1800,1800,1900,1900,1900,2000,2000,2000,2100,2100,2200,2300,2400,2500,2700,3000]
    cols = {}
    out = []
    for v in vals:
        k = cols.get(v, 0); cols[v] = k + 1
        cx = 6 + (v - 1500) / 1500 * 150; cy = 40 - k * 8
        out.append(f'<circle class="{"f" if v!=2600 else "s"}" cx="{cx:.1f}" cy="{cy}" r="3.4"/>')
    cx = 6 + (2600 - 1500) / 1500 * 150
    out.append(f'<line class="rod" x1="{cx:.1f}" x2="{cx:.1f}" y1="10" y2="46"/>')
    out.append(txt(cx + 3, 12, 'this week', 'lbl'))
    out.append(txt(6, 56, '₹1,500', 'lbl mid')); out.append(txt(156, 56, '₹3,000', 'lbl mid'))
    return svg(''.join(out), 175, 58, 'Usual weeks as 20 dots; this week marked')
def m_jars():
    out = []; y = 0
    for lab, left, spent in [('Food', 900, 1600), ('Travel', 700, 800), ('Fun', 500, 1500)]:
        i, w, h = tiles_svg(left, 'f', 50, y, spent, 'o'); out.append(i); out.append(txt(0, y + 7, lab, 'lbl')); y += h + 5
    return svg(''.join(out), 50 + PW, y, 'Three jars, left solid, spent outlined')
def m_glance():
    i, w, h = tiles_svg(2100, 'f')
    return svg(i + txt(PW + 8, 10, 'Steady', 'lbl word'), PW + 60, h, 'Ambient state word next to tiles')
def m_scaled():
    return svg('<rect class="f" x="0" y="34" width="12" height="12" rx="2"/><rect class="f" x="22" y="0" width="46" height="46" rx="5"/>'
               + txt(6, 58, '₹350', 'lbl mid') + txt(45, 58, '₹2,100', 'lbl mid'), 70, 60, 'Enlarged icon (avoid)')
def m_shame():
    return svg(txt(0,10,'Wow. ₹3,900 gone.','lbl word')+txt(0,24,'Again? 🙄','lbl word'),110,28,'Shame copy (avoid)')
def m_ratio():
    out = []; x = 0
    for k in range(3):
        out.append(f'<rect class="{"f" if k==0 else "o"}" x="{x}" y="0" width="54" height="{T}" rx="2.5"/>'); x += 58
    return svg(''.join(out), x, T, 'About one third of the month left')

M = [  # id, name, graphic, sentence, evidence, anxiety, comprehension, fit, sources, verdict
('M1','Leftover-first (left solid, spent as outlines)',m_left,'₹2,100 left of ₹6,000','Strong','Low','High','Native',['Olafsson & Pagel 2018','Heath & Soll 1996','Tversky & Kahneman 1981'],'ADOPT'),
('M2','Pay moment: tiles lift out',m_pay,'Paying ₹350 takes 3½ tiles. ₹1,750 left.','Strong','Low–med','High','Native',['Soman 2001','Knutson et al. 2007','Prelec & Loewenstein 1998'],'ADOPT'),
('M3','Per-day allowance',m_perday,'₹175 a day for the next 12 days','Moderate','Low','High','Good',['YNAB 2016','Monzo 2023','Gigerenzer & Hoffrage 1995'],'ADOPT'),
('M4','Crumbs stack into a tile',m_stack,'Four chais this week made one tile','Moderate','Low','High','Native',['Haroz et al. 2015','Kay et al. 2016','Soman 2001'],'ADOPT'),
('M5','Familiar equivalents (your own units)',m_equiv,'₹350 ≈ 14 of your chais','Strong','Low–med','High','Good',['Barrio et al. 2016','Riederer et al. 2018'],'ADOPT'),
('M6','Goal: saved solid, to-go outlined',m_goal,'₹4,160 saved. ₹3,840 to go.','Strong','Low','High','Native',['Kivetz et al. 2006','Tversky & Kahneman 1981'],'ADOPT'),
('M7','Income as part-to-whole pills',m_income,'₹9,000 in: 3 saved, 2.1 left, 3.9 spent','Strong','Low','High','Native',['Neurath/Kinross 1995','Garcia-Retamero et al. 2010','Park et al. 2018'],'ADOPT'),
('M8','Week vs last week: ghost under solid',m_week,'₹600 more than last week, about two dinners','Moderate','Medium','High','Good',['Garcia-Retamero et al. 2010','Barrio et al. 2016','Lan et al. 2023'],'ADOPT'),
('M9','Runway days',m_runway,'₹2,100 lasts about six days at ₹350 a day','Moderate','Medium','Med','Good',['YNAB 2016','Hershfield et al. 2011'],'LIBRARY'),
('M10','Money as days of a jar',m_time,'₹350 is 1.2 days of food money','Moderate','Medium','Med','OK',['DeVoe & Pfeffer 2007','Whillans et al. 2017'],'LIBRARY'),
('M11','Frequency format',m_freq,'3 of your last 10 days went over ₹300','Strong','Low','High','Good',['Gigerenzer & Hoffrage 1995','Galesic et al. 2009'],'LIBRARY'),
('M12','Usual-week dot range',m_dots,'This week sits inside your usual range','Strong','Low','Med','OK (dots = position)',['Kay et al. 2016'],'LIBRARY'),
('M13','Future-self ETA path',m_future,'At this pace you reach ₹8,000 around February','Moderate','Low','Med','Good (glow allowed: time)',['Hershfield et al. 2011','Kivetz et al. 2006'],'LIBRARY'),
('M14','Jars side by side',m_jars,'Food ₹900 · Travel ₹700 · Fun ₹500 left','Strong','Low','High','Native',['Heath & Soll 1996','Antonides et al. 2011','Thaler 1999'],'LIBRARY'),
('M15','Ratio perspective sentence',m_ratio,'You have about a third of your month left','Strong','Low','High','Good',['Barrio et al. 2016','Riederer et al. 2018'],'LIBRARY'),
('M16','Ambient state word',m_glance,'Steady','Weak–mod','Very low','Med','Good',['Weiser & Brown 1995','Pousman et al. 2007','Li et al. 2010'],'LIBRARY'),
('M17','Single tile tally',m_unit,'₹350 meal','Strong','Low','High','Native',['Haroz et al. 2015','Park et al. 2018'],'BASE'),
('A1','Spent shown in red',m_redbad,'Red ₹3,900 spent','Strong (against)','High','Med','Breaks calm',['Olafsson & Pagel 2018','Karlsson et al. 2009','Kennedy & Hill 2018'],'AVOID'),
('A2','Enlarged icon instead of repeated tiles',m_scaled,'Big square for big money','Strong (against)','Low','Low','Breaks ladder',['Neurath/Kinross 1995','Cleveland & McGill 1984','Kosara 2019'],'AVOID'),
('A3','Roast copy and hours-of-work for non-earners',m_shame,'Wow. ₹3,900 gone. Again?','Moderate (against)','High','Low','Breaks tone',['Cleo (TME 2022)','Olafsson & Pagel 2018','DeVoe & Pfeffer 2007'],'AVOID'),
]

SRC = [  # key, full citation, url, finding, implication, trickle, verified
('Haroz et al. 2015','Haroz, Kosara & Franconeri. ISOTYPE Visualization: Working Memory, Performance, and Engagement with Pictographs. CHI 2015.','https://eagereyes.org/publications/Haroz-CHI-2015','Pictographs that ARE the data cause no performance cost and can help memory and engagement; decorative extra images distract.','Every mark must be money; no decorative coins or mascots inside a chart.','The ₹100 tile is itself the datum, so it earns the Isotype benefit; keep illustrations out of tile areas.',True),
('Park et al. 2018','Park, Drucker, Fernandez & Elmqvist. ATOM: A Grammar for Unit Visualizations. IEEE TVCG 24(12).','https://www.microsoft.com/en-us/research/publication/atom-a-grammar-for-unit-visualizations/','One mark per unit "minimizes the need for the user to consider data abstraction" and matches how novices build with physical tokens.','Unit marks suit lay users; layouts can be recomposed (split, regroup) without changing the unit.','Tiles can regroup across Home/Spending/Income (split by jar, by day) and still be the same tiles.',True),
('Neurath/Kinross 1995','Kinross, R. Archive: International Picture Language (Otto Neurath / Isotype). Eye no. 19, 1995.','https://eyemagazine.com/feature/article/archive-international-picture-language','Isotype rule: "in representing quantities, repeat a unit, don\'t enlarge it"; also "don\'t say more than you know".','Never scale a single icon for size; repeat the unit.','Confirms the ladder: pills and blocks are merged repeats of tiles, never a bigger tile.',True),
('Cleveland & McGill 1984','Cleveland & McGill. Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. JASA 79(387).','http://lenagroeger.s3.amazonaws.com/newschool/ClevelandMcGill.pdf','Accuracy ranking: position on common scale > nonaligned position > length/direction/angle > area > volume/curvature > shading/saturation.','Compare by aligned length/count, not area or colour intensity.','Align pills to a common left edge so comparisons are length on a common scale; never encode amount by colour depth.',True),
('Kosara 2019','Kosara, R. Circular Part-to-Whole Charts Using the Area Visual Cue. EuroVis 2019 (short).','https://media.eagereyes.org/papers/2019/Kosara-EuroVis-2019a.pdf','Most area-based part-to-whole variants did worse than a pie; centred shapes hurt area judgement.','Area alone is a weak cue; anchor parts to a shared edge.','Cup fill reads as a level from a shared floor (not a centred shrinking square) — keep it bottom-anchored.',True),
('Redmond 2019','Redmond, S. Visual Cues in Estimation of Part-to-Whole Comparisons. arXiv:1908.00630.','https://arxiv.org/pdf/1908.00630','Bars with decile markers / scale beat plain bars for part-to-whole; pies have natural anchors at quarters.','Visible reference marks (deciles) aid part-to-whole reading.','A pill is literally ten deciles; the gap after 5 tiles gives a halfway anchor.',True),
('Garcia-Retamero et al. 2010','Garcia-Retamero, Galesic & Gigerenzer. Do Icon Arrays Help Reduce Denominator Neglect? Medical Decision Making 30(6).','https://journals.sagepub.com/doi/10.1177/0272989X10369000','People over-attend numerators; icon arrays showing the whole fix denominator neglect, for young and old.','Always show the whole (budget/income) alongside the part.','Show spent tiles as outlines so ₹2,100 is always seen against ₹6,000.',True),
('Garcia-Retamero & Cokely 2013','Garcia-Retamero & Cokely. Communicating Health Risks With Visual Aids. Current Directions in Psychological Science 22(5).','https://journals.sagepub.com/doi/abs/10.1177/0963721413491570','Well-designed visual aids are "highly effective, transparent, and ethically desirable", most for low-numeracy people.','Visuals are a fairness tool, not decoration.','Tiles help the students who most avoid numbers; never hide them behind a toggle.',True),
('Galesic et al. 2009','Galesic, Garcia-Retamero & Gigerenzer. Using Icon Arrays to Communicate Medical Risks: Overcoming Low Numeracy. Health Psychology 28(2).','https://www.researchgate.net/publication/24205075_Using_Icon_Arrays_to_Communicate_Medical_Risks_Overcoming_Low_Numeracy','(Abstract not opened — pages returned 403/429.) Widely cited for icon arrays improving accuracy for low-numeracy people.','—','Supports M11; cite only alongside the verified 2010 paper.',False),
('Gigerenzer & Hoffrage 1995','Gigerenzer & Hoffrage. How to Improve Bayesian Reasoning Without Instruction: Frequency Formats. Psychological Review 102(4).','https://pages.ucsd.edu/~scoulson/203/GG_How_1995.pdf','Natural frequencies roughly tripled correct reasoning (46–50% vs 16–28%) over probabilities.','Say "3 of 10 days", not "30%".','Insights copy uses counts of days/tiles, never percentages.',True),
('Kay et al. 2016','Kay, Kola, Hullman & Munson. When (ish) is My Bus? CHI 2016.','https://www.mjskay.com/papers/chi_2016_uncertain_bus.pdf','Quantile dotplots (~20 countable dots) beat density plots for lay mobile users; 100+ dots lose the benefit.','Keep counts subitizable; under ~20 marks per glance.','Home cards stay under ~25 marks — pills keep ₹2,100 at 3 marks; a "usual week" range can be 20 dots.',True),
('Barrio et al. 2016','Barrio, Goldstein & Hofman. Improving Comprehension of Numbers in the News. CHI 2016.','https://www.microsoft.com/en-us/research/publication/improving-comprehension-of-numbers-in-the-news/','Perspective sentences (ratios, ranks, unit changes) improved recall, estimation and error detection (n>3,200).','Add one perspective clause to key numbers.','"₹2,100 — about a third of your month" under the Home tiles.',True),
('Riederer et al. 2018','Riederer, Hofman & Goldstein. To Put That in Perspective. CHI 2018.','https://www.dangoldstein.com/papers/Riederer_Hofman_Goldstein_Perspective_Analogies_CHI_2018.pdf','Familiar references beat precise obscure ones; multipliers 1–10 (esp. 1, ½) work best; benefit lasts six weeks.','Use the user\'s most familiar purchase as the unit and keep multipliers small.','Pick equivalents from the student\'s own frequent spends (their chai, their mess meal); prefer "2 dinners" over "0.17 of rent".',True),
('Peters et al. 2006','Peters, Västfjäll, Slovic, Mertz, Mazzocco & Dickert. Numeracy and Decision Making. Psychological Science 17(5).','https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01720.x','Less numerate people are more swayed by framing and irrelevant affect.','Framing choices matter most for the users who need help most.','Neutral, consistent frames (left / to go) protect low-numeracy students from alarm.',True),
('Soman 2001','Soman, D. Effects of Payment Mechanism on Spending Behavior: The Role of Rehearsal and Immediacy of Payments. JCR 27(4).','https://econpapers.repec.org/RePEc:oup:jconrs:v:27:y:2001:i:4:p:460-74','Past payments curb later spending only when the amount is rehearsed and the wealth depletes immediately.','Make the deduction immediate and visible at payment.','Pay moment (M2): tiles lift out of the balance the instant UPI confirms — rehearsal without a number to type.',True),
('Knutson et al. 2007','Knutson, Rick, Wimmer, Prelec & Loewenstein. Neural Predictors of Purchases. Neuron 53(1).','https://www.cmu.edu/dietrich/sds/docs/loewenstein/NeuralPredPuchase.pdf','Excessive prices activated insula; price-period activity predicted purchase beyond self-report.','Price salience at decision time is real and felt.','Show the tiles a spend will take before confirming (ghost tiles), not after.',True),
('Prelec & Loewenstein 1998','Prelec & Loewenstein. The Red and the Black: Mental Accounting of Savings and Debt. Marketing Science 17(1). (Finding read via BehavioralEconomics.com summary.)','https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/pain-of-paying/','Pain of paying acts as self-regulation; less visible depletion (cards) dulls it.','UPI is low-pain; the app can restore gentle visibility.','Tiles leaving = a soft pain-of-paying cue without red.',False),
('Heath & Soll 1996','Heath & Soll. Mental Budgeting and Consumer Decisions. JCR 23(1).','https://econpapers.repec.org/article/oupjconrs/v_3a23_3ay_3a1996_3ai_3a1_3ap_3a40-52.htm','People set category budgets; budgets constrain category-typical purchases (sometimes under-consumption).','Category jars work because people already think this way.','Jars as tile rows (M14); per-jar "left" is the main figure.',True),
('Antonides et al. 2011','Antonides, de Groot & van Raaij. Mental Budgeting and the Management of Household Finance. J. Economic Psychology 32(4).','https://ideas.repec.org/a/eee/joepsy/v32y2011i4p546-555.html','Mental budgeters show better oversight of spending and accounts.','Make budgeting the default mental model.','Supports jars and per-day allowance.',True),
('Thaler 1999','Thaler, R. Mental Accounting Matters. J. Behavioral Decision Making 12(3).','https://www.scienceopen.com/document?vid=c290009e-68a0-476a-b207-0875684e3c6c','(Metadata verified; abstract not available on the page opened.) Foundational account of mental accounts.','—','Background for jars.',False),
('Olafsson & Pagel 2018','Olafsson & Pagel. The Ostrich in Us: Selective Attention to Financial Accounts, Income, Spending, and Liquidity. NBER WP 23945 (VoxEU column).','https://cepr.org/voxeu/columns/ostrich-us-selective-attention-personal-finances','People log in far less when balances are negative; logins jump when the balance turns positive.','Bad-news screens drive avoidance; the app must stay safe to open.','Lead with what is left, not what is gone; no alarm colours on Home.',True),
('Karlsson et al. 2009','Karlsson, Loewenstein & Seppi. The Ostrich Effect: Selective Attention to Information. J. Risk and Uncertainty 38(2).','https://econpapers.repec.org/RePEc:kap:jrisku:v:38:y:2009:i:2:p:95-115','(Not opened; search listing only.) Investors look up portfolios less in down markets.','—','Corroborates Olafsson & Pagel.',False),
('Tversky & Kahneman 1981','Tversky & Kahneman. The Framing of Decisions and the Psychology of Choice. Science 211(4481).','https://eric.ed.gov/?id=EJ241077','Same facts framed differently produce predictable preference shifts.','Frame as remaining/gained, not lost.','"₹2,100 left", "₹3,840 to go" — never "you lost ₹3,900".',True),
('Kivetz et al. 2006','Kivetz, Urminsky & Zheng. The Goal-Gradient Hypothesis Resurrected. J. Marketing Research 43(1).','https://ideas.repec.org/p/feb/natura/00658.html','Effort rises as the goal nears; illusory progress (bonus stamps) speeds completion.','Show proportion remaining shrinking; start goals with visible progress.','Savings goal: outlined to-go tiles disappear; round-ups make first tiles fill fast.',True),
('Hershfield et al. 2011','Hershfield, Goldstein, Sharpe, Fox, Yeykelsis, Carstensen & Bailenson. Increasing Saving Behavior Through Age-Progressed Renderings of the Future Self. JMR 48.','https://www.halhershfield.com/research-blog/increasing-saving-behavior-through-age-progressed-renderings','Seeing an aged future self increased preference for later rewards.','Make the future concrete; students\' horizon is weeks/months, not retirement.','Light version: the goal ETA dot on a month path ("you, in February, with ₹8,000").',True),
('DeVoe & Pfeffer 2007','DeVoe & Pfeffer. When Time Is Money: The Effect of Hourly Payment on the Evaluation of Time. OBHDP 104(1).','https://ideas.repec.org/a/eee/jobhdp/v104y2007i1p1-13.html','(Metadata verified; no abstract on page.) Hourly pay makes people value time in money.','Money-as-time framing is a real lens but cuts both ways.','Students rarely earn hourly; translate to "days of food money" instead of hours of work.',False),
('Whillans et al. 2017','Whillans, Dunn, Smeets, Bekkers & Norton. Buying Time Promotes Happiness. PNAS 114(32).','https://www.hbs.edu/faculty/Pages/item.aspx?num=52953','Spending on time-saving purchases raised happiness more than material ones (n=6,271).','Time is a meaningful unit for value judgements.','Support for days-based framing (M10) in the library, not Home.',True),
('Li et al. 2010','Li, Dey & Forlizzi. A Stage-Based Model of Personal Informatics Systems. CHI 2010.','https://ianli.owlstown.net/publications/17-a-stage-based-model-of-personal-informatics-systems','Preparation → collection → integration → reflection → action; barriers cascade.','UPI auto-collection removes the costliest stages; invest in reflection and action.','Every money view should end in a possible action (move tiles, lower a jar).',True),
('Weiser & Brown 1995','Weiser & Brown. Designing Calm Technology. Xerox PARC.','https://people.csail.mit.edu/rudolph/Teaching/weiser.pdf','"Calm technology engages both the center and the periphery of our attention, and moves back and forth."','Glanceable periphery, detail on demand.','Home = periphery (tiles + one word); tap-to-zoom = centre.',True),
('Pousman et al. 2007','Pousman, Stasko & Mateas. Casual Information Visualization: Depictions of Data in Everyday Life. IEEE TVCG 13(6).','https://dl.acm.org/doi/10.1109/TVCG.2007.70541','(Not opened — 403.) Defines casual infovis for non-experts in everyday contexts.','—','Background for ambient Home.',False),
('Lan et al. 2023','Lan, Wu & Cao. Affective Visualization Design: Leveraging the Emotional Impact of Data. IEEE TVCG (VIS 2023). arXiv 2308.02831.','https://arxiv.org/abs/2308.02831','Review of 109 papers and 61 projects; emotion is a legitimate design target but the field lacks clear definitions.','Design the feeling deliberately; it is part of the encoding.','Pick a single affect per surface: Home calm, Pay neutral, Savings warm.',True),
('Kennedy & Hill 2018','Kennedy & Hill. The Feeling of Numbers: Emotions in Everyday Engagements with Data and Their Visualisation. Sociology 52(4).','http://eprints.whiterose.ac.uk/106567/','Emotions are "vital components of making sense of data" in everyday use.','People feel numbers before they read them.','Red, shaking or alarm motion carries meaning beyond the amount; avoid.',True),
('Boy et al. 2017','Boy, Pandey, Emerson, Satterthwaite, Nov & Bertini. Showing People Behind Data. CHI 2017.','https://nyuscholars.nyu.edu/en/publications/showing-people-behind-data-does-anthropomorphizing-visualizations','Anthropomorphic icons had no more effect on empathy than standard charts.','Character icons do not add emotional power by themselves.','No cute coin characters inside tiles; save personality for copy and motion.',True),
('YNAB 2016','Mecham, J. How Old Is Your Money? YNAB blog, 8 Jan 2016.','https://www.ynab.com/blog/how-old-is-your-money','Age of Money = days a rupee sits before use; higher means "your stress level will drop".','Time-buffer metrics reframe money as calm runway.','Runway days (M9) as an Insights card.',True),
('Monzo 2023','Monzo Community. "Left to spend" missing feature, Sep 2023.','https://community.monzo.com/t/monzo-left-to-spend-missing-feature-old-monzo-design/153058','Users missed "left to spend" and the "set to have £ left over" projection after its removal.','Left-to-spend is a feature people notice when gone.','Leftover-first Home is validated by real use.',True),
('Korostoff (n.d.)','Korostoff, M. Wealth, Shown to Scale (1-pixel-wealth).','https://mkorostoff.github.io/1-pixel-wealth/','Fixed unit ("10 px = $5M") plus relatable comparisons makes huge sums graspable.','A fixed unit and familiar comparisons beat abstract numbers.','Same ₹100 tile everywhere + equivalents.',True),
('Dear Data 2015','Lupi & Posavec. Dear Data (project site).','http://www.dear-data.com/theproject','Hand-drawn weekly personal data as "personal documentary"; slow, humane data.','Personal data can be warm and reflective.','Weekly reflection card tone; tiles as a personal ledger, not a report.',True),
('Fi Money 2026','ValueForStartups. Fi Money Investor Report 2026.','https://valueforstartups.in/fi_money_investor_report','FIT rules automated saving from behaviour; consumer app shut 11 Mar 2026.','Rules-based nudges were a loved Indian pattern.','Rule-triggered tile moves (e.g. round-ups) fit Savings.',True),
('Cleo (TME 2022)','TME.net. Cleo: The Budget Assistant App That \'Roasts\' You. 2022, upd. 2023.','https://tme.net/blog/cleo-budget-assistant-app/','Opt-in "roast mode" shames spending with humour; default is not roast.','Humour works only opt-in.','Avoid shame copy by default.',True),
]

def pill(v): return f'<span class="vd v-{v.lower()}">{v}</span>'
cards = ''.join(f'''<article class="mc{" avoid" if v=="AVOID" else ""}"><header><span class="mid">{k}</span><h4>{E(n)}</h4>{pill(v)}</header><div class="sv">{f()}</div><p class="say">“{E(s)}”</p><dl><div><dt>Evidence</dt><dd>{ev}</dd></div><div><dt>Anxiety</dt><dd>{ax}</dd></div><div><dt>Clarity</dt><dd>{co}</dd></div><div><dt>Tile fit</dt><dd>{E(ft)}</dd></div></dl><p class="cite">{E(" · ".join(src))}</p></article>''' for k,n,f,s,ev,ax,co,ft,src,v in M)
scards = ''.join(f'''<article class="src{"" if ok else " unv"}"><h4><a href="{E(u)}" target="_blank" rel="noopener">{E(k)}</a>{"" if ok else ' <span class="uv">UNVERIFIED</span>'}</h4><p>{E(fd)}</p><p class="tr"><b>Trickle:</b> {E(tr)}</p></article>''' for k,c,u,fd,im,tr,ok in SRC)
TOP = [('Home','M1 leftover-first tiles + M15 ratio line + M3 per-day under it'),('Pay moment','M2 ghost tiles before confirm, tiles lift out after'),('Spending','M4 crumbs stacking + M5 equivalents in spend detail'),('Savings','M6 to-go outlines + M13 ETA path'),('Income','M7 part-to-whole pills'),('Insights','M8 ghost comparison in "What changed"; M11/M12/M9 in library')]
QS = [
('P2c-Q1','What is the big number on Home?',['A · ₹ left (₹2,100), tiles below','B · ₹ per day (₹175)','C · Runway days (6 days)'],'A','Left-to-spend is what people miss when gone (Monzo) and frames as remaining; per-day sits as the second line.'),
('P2c-Q2','How do spent rupees look?',['A · Outlined empty tiles','B · Faded solid tiles','C · Removed entirely'],'A','Outlines keep the whole visible (denominator neglect) without red; removal hides the budget, fading reads as "still mine".'),
('P2c-Q3','Which equivalents unit?',['A · From the student\'s own frequent spends (their chai, their meal)','B · Fixed staples (chai ₹25, thali ₹120)','C · No equivalents'],'A','Familiar references work best (Riederer 2018); fallback to B until two weeks of data exist.'),
('P2c-Q4','"You spent more than last week" — how loud?',['A · Ghost of last week + hatched extra + one perspective sentence','B · Amber status chip','C · Only if asked in Insights'],'A','Shows the gap as countable tiles, no alarm hue; amber invites ostrich avoidance.'),
('P2c-Q5','Money-as-time framing?',['A · Days of a jar ("1.2 days of food money")','B · Hours of work','C · None'],'A','Most students have no hourly wage; days-of-jar keeps the time lens without implying a job. Library only.'),
]
qh = ''.join(f'<div class="q"><span class="qid">{q}</span><h3>{E(t)}</h3><ul>' + ''.join(f'<li class="{"pick" if o.startswith(r+" ") else ""}">{E(o)}</li>' for o in op) + f'</ul><p class="qr"><b>Recommend {r}.</b> {E(w)}</p></div>' for q,t,op,r,w in QS)
nv = sum(1 for s in SRC if s[6]); nu = len(SRC) - nv
CSS = '''
.p2c .mcs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr));gap:12px}
.p2c .mc{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:12px 14px;display:grid;gap:8px;align-content:start;min-width:0}
.p2c .mc.avoid{border-style:dashed}
.p2c .mc header{display:flex;gap:8px;align-items:baseline}.p2c .mc h4{margin:0;font:600 14px var(--f-disp);flex:1}
.p2c .mid{font:500 11px var(--f-mono);color:var(--ink3)}
.p2c .vd{font:600 10px var(--f-mono);letter-spacing:.05em;padding:2px 6px;border-radius:4px;border:1px solid var(--rule);color:var(--ink2)}
.p2c .v-adopt{background:var(--tile);color:var(--card);border-color:var(--tile)} .p2c .v-avoid{color:var(--ink);border-style:dashed}
.p2c .sv{min-height:64px;display:flex;align-items:center;overflow-x:auto}.p2c .sv svg{max-width:100%;height:auto;overflow:visible}
.p2c .say{margin:0;font:500 14px var(--f-disp)}
.p2c dl{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:0}.p2c dl div{min-width:0}
.p2c dt{font:500 10px var(--f-mono);color:var(--ink3);text-transform:uppercase;letter-spacing:.05em}.p2c dd{margin:0;font-size:12px}
.p2c .cite{margin:0;font-size:11px;color:var(--ink3)}
.p2c svg .f{fill:var(--t-f)} .p2c svg .s{fill:var(--t-s)} .p2c svg .x{fill:var(--t-f);opacity:.28}
.p2c svg .o{fill:none;stroke:var(--t-e);stroke-width:1} .p2c svg .cupo{fill:none;stroke:var(--t-e);stroke-width:.8}
.p2c svg .e{fill:none;stroke:var(--t-e)} .p2c svg .bad{fill:#d4372c}
.p2c svg .leaving{fill:var(--t-f);opacity:.35;transform:translateY(-3px)}
.p2c svg .more{fill:url(#p2chatch);stroke:var(--t-f);stroke-width:.8}
.p2c svg .proj{fill:none;stroke:var(--t-s);stroke-dasharray:2 1.5}
.p2c svg .eta{fill:var(--t-s);filter:drop-shadow(0 0 3px var(--t-s))}
.p2c svg .rod{stroke:var(--ink3)}
.p2c svg .lbl{font:500 7px var(--f-mono);fill:var(--ink2)} .p2c svg .lbl.mid{text-anchor:middle;font-size:6px}
.p2c svg .lbl.big{font-size:11px;fill:var(--ink)} .p2c svg .lbl.word{font:600 10px var(--f-disp);fill:var(--ink)}
.p2c .srcs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(280px,100%),1fr));gap:10px}
.p2c .src{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:10px 12px;display:grid;gap:4px;align-content:start;min-width:0}
.p2c .src h4{margin:0;font:600 13px var(--f-disp)} .p2c .src a{color:var(--ink)} .p2c .src p{margin:0;font-size:12.5px;color:var(--ink2)}
.p2c .src .tr{color:var(--ink)} .p2c .src.unv{border-style:dashed} .p2c .uv{font:600 9px var(--f-mono);color:var(--ink3);letter-spacing:.06em}
.p2c .place{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:10px}
.p2c .place div{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:10px 12px}.p2c .place b{display:block;font:600 13px var(--f-disp)}.p2c .place span{font-size:13px;color:var(--ink2)}
@media (prefers-reduced-motion:no-preference){.p2c svg .leaving{animation:p2cl 2.4s ease-in-out infinite}@keyframes p2cl{0%,30%{opacity:1;transform:none}70%,100%{opacity:.25;transform:translateY(-4px)}}}
'''
HATCH = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><pattern id="p2chatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="none"/><line x1="0" y1="0" x2="0" y2="3" stroke="currentColor" style="stroke:var(--t-f)" stroke-width="1.2"/></pattern></defs></svg>'
SEC = f'''<section class="phase p2 p2c" id="p2c" style="margin-top:48px">{HATCH}
  <h2><span>Phase 2c</span> Money visualization research</h2>
  <p class="lede" style="margin:0">How to show money so a student understands it at a glance and is not scared to open the app. {len(SRC)} sources ({nv} verified, {nu} marked unverified), {len(M)} methods drawn with the locked tile ladder on one sample: ₹350 meal, ₹6,000 budget with ₹2,100 left, four ₹25 chais, ₹9,000 income, ₹8,000 goal at 52%, and a week that ran ₹600 over the last.</p>
  <div class="block"><h3>Three rules the research agrees on</h3><ul class="note" style="margin:0;color:var(--ink2);font-size:14px"><li><b>Show the whole, always.</b> Spent tiles stay as outlines, so ₹2,100 is read against ₹6,000 (icon arrays fix denominator neglect).</li><li><b>Lead with what is left, never with red.</b> People stop opening accounts that show bad news (ostrich effect); calm framing keeps them looking.</li><li><b>Translate into their own units.</b> One short perspective line with a familiar thing (their chai, a third of the month) improves recall and estimation.</li></ul></div>
  <div class="block"><h3>Where the top 8 go</h3><div class="place">{"".join(f"<div><b>{E(a)}</b><span>{E(b)}</span></div>" for a,b in TOP)}</div></div>
  <div class="block"><h3>Methods as test graphics</h3><p class="note">Same tiles, same sample data. ADOPT = top 8 for v12. LIBRARY = Insights or later. AVOID = drawn so you can see why. Pay-moment tiles animate (reduced motion shows the still).</p><div class="mcs">{cards}</div></div>
  <div class="block"><h3>Sources</h3><p class="note">Each card: the finding, then what it means for Trickle. Dashed = could not open the source; treat as unverified.</p><div class="srcs">{scards}</div></div>
  <div class="block"><h3>Questions for Tarun</h3><div class="qs">{qh}</div></div>
  <p class="note" style="color:var(--ink3);font-size:12px">Full annotated bibliography: claude/v12_phase2c_money_viz_research.md</p>
</section>'''
src = open('board.html').read()
src = re.sub(r'<style id="p2ccss">.*?</style>', '', src, flags=re.S)
src = re.sub(r'<section class="phase (?:p2 )?p2c" id="p2c".*?</section>', '', src, flags=re.S)
src = src.replace('<section class="later" id="p3">', '<style id="p2ccss">' + CSS + '</style>' + SEC + '<section class="later" id="p3">', 1)
if 'href="#p2c"' not in src:
    src = src.replace('<a href="#p3"', '<a href="#p2c" class="now">2c Money viz</a><a href="#p3"', 1).replace('href="#p2b" class="now"', 'href="#p2b" class=""')
open('board.html', 'w').write(src)

# ---------- markdown
md = [f'# Trickle v12 — Phase 2c: Money visualization research\n\nGoal: money that is easy to digest, low-anxiety, and makes "how much am I spending / losing" obvious — inside the locked tile ladder (crumb cup-fill <₹100 → tile ₹100 → pill ₹1,000 → block ₹10,000; tap zooms one level; one rule everywhere; glow only for time/position).\n\nSources: {len(SRC)} ({nv} verified by opening the page, {nu} UNVERIFIED). Methods: {len(M)}. Board: Phase 2c section.\n',
'## Three convergent rules\n1. Show the whole, always — spent tiles stay as outlines (denominator neglect; Garcia-Retamero 2010).\n2. Lead with what is left; no red, no alarm (ostrich effect; Olafsson & Pagel 2018; framing; Tversky & Kahneman 1981).\n3. Translate into the student\'s own units with one perspective line (Barrio 2016; Riederer 2018).\n',
'## Annotated bibliography\nFormat: citation · URL · finding → design implication → Trickle application.\n']
for k,c,u,fd,im,tr,ok in SRC:
    md.append(f'### {k}{"" if ok else " — UNVERIFIED"}\n{c}  \n{u}\n- Finding: {fd}\n- Implication: {im}\n- Trickle: {tr}\n')
md.append('## Methods catalogue\n| ID | Method | Sample sentence | Evidence | Anxiety risk | Comprehension | Tile fit | Sources | Verdict |\n|---|---|---|---|---|---|---|---|---|')
for k,n,f,s,ev,ax,co,ft,srcs,v in M:
    md.append(f'| {k} | {n} | {s} | {ev} | {ax} | {co} | {ft} | {"; ".join(srcs)} | {v} |')
md.append('\n## Top 8 to adopt in v12\n1. M1 Leftover-first — Home hero, every jar.\n2. M2 Pay moment tiles lift out — Pay confirmation (ghost tiles before confirm).\n3. M3 Per-day allowance — Home second line.\n4. M4 Crumbs stack into a tile — Spending (small-buy habit).\n5. M5 Familiar equivalents from own spends — Spending detail, Insights.\n6. M6 Goal saved/to-go — Savings.\n7. M7 Income part-to-whole pills — Income.\n8. M8 Ghost-of-last-week comparison — Insights "What changed".\n\nLibrary (Insights, not default): M9 runway, M10 days-of-jar, M11 frequency format, M12 usual-week dots, M13 ETA path (glow OK — time), M14 jars side by side, M15 ratio line (also used on Home with M1), M16 ambient word.\n')
md.append('## Avoid\n- A1 Red for spent/over — triggers avoidance (ostrich effect), emotion overrides the number (Kennedy & Hill), and low-numeracy users are most swayed by affect (Peters 2006).\n- A2 Enlarged icon for bigger amounts — breaks Isotype "repeat, don\'t enlarge" and area is poorly judged (Cleveland & McGill; Kosara 2019).\n- A3 Shame/roast copy by default and "hours of work" for non-earners — Cleo keeps roast opt-in; students mostly have no hourly wage, so use days-of-jar instead.\n')
md.append('## Questions for Tarun\n| # | Question | Options | Recommended | Why |\n|---|---|---|---|---|')
for q,t,op,r,w in QS: md.append(f'| {q} | {t} | {" / ".join(op)} | {r} | {w} |')
open('v12_phase2c_money_viz_research.md','w').write('\n'.join(md) + '\n')
print('ok', len(SRC), nv, nu, len(M), len(src)/1e6)
