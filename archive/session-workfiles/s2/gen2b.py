import html, math, itertools
E = html.escape
_id = itertools.count(1)

def T(x, y, s, size=11, anchor="start", cls="t", weight=400):
    return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" class="{cls}" font-weight="{weight}">{E(s)}</text>'
def svg(body, w, h, label=""):
    return f'<svg viewBox="0 0 {w} {h}" width="100%" style="max-width:{w*1.25:.0f}px" role="img" aria-label="{E(label)}">{body}</svg>'

FILL = {"left": "var(--left)", "save": "var(--save)"}
def coin(cx, cy, r, frac=1, style="left", render="rim", partial="cup"):
    """One coin. style: left|save|spent|ghost|out. frac<1 = partial coin."""
    o = ""
    stroke = "var(--out)" if style == "out" else "var(--ink3)"
    da = ' stroke-dasharray="2 2"' if style in ("ghost", "out") else ""
    o += f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{stroke}" stroke-width="1.3"{da}/>'
    if style in FILL and frac > 0:
        col = FILL[style]
        if frac >= 0.999:
            o += f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{col}"/>'
        elif partial == "wedge":
            a = 2 * math.pi * frac
            x2 = cx + r * math.sin(a); y2 = cy - r * math.cos(a)
            large = 1 if frac > 0.5 else 0
            o += f'<path d="M{cx} {cy} L{cx} {cy-r} A{r} {r} 0 {large} 1 {x2:.2f} {y2:.2f} Z" fill="{col}"/>'
        else:
            cid = f"k{next(_id)}"
            top = cy + r - 2 * r * frac
            o += f'<clipPath id="{cid}"><rect x="{cx-r}" y="{top:.2f}" width="{2*r}" height="{2*r*frac:.2f}"/></clipPath><circle cx="{cx}" cy="{cy}" r="{r}" fill="{col}" clip-path="url(#{cid})"/>'
        if render in ("rim", "shine") and frac >= 0.999:
            o += f'<circle cx="{cx}" cy="{cy}" r="{r*0.7:.2f}" fill="none" stroke="var(--rim)" stroke-width="1"/>'
        if render == "shine" and frac >= 0.999:
            o += f'<path d="M{cx-r*0.55:.2f} {cy-r*0.15:.2f} A{r*0.6:.2f} {r*0.6:.2f} 0 0 1 {cx-r*0.1:.2f} {cy-r*0.6:.2f}" fill="none" stroke="var(--shine)" stroke-width="1.6" stroke-linecap="round"/>'
    return o

def fmt(n):
    whole = int(n); f = round(n - whole, 2)
    if f == 0: return f"{whole}"
    if abs(f - 0.5) < .01: return f"{whole}½" if whole else "½"
    if abs(f - 0.25) < .01: return f"{whole}¼" if whole else "¼"
    if abs(f - 0.75) < .01: return f"{whole}¾" if whole else "¾"
    return f"{round(n)}"
def rupees(n): return "₹" + f"{round(n*100):,}"

def row(x, y, n, style, r=7, gap=17, cols=10, render="rim", partial="cup"):
    """Draw n coins (n may be fractional) left to right, wrapping. Returns body, end_x, end_y."""
    o = ""; i = 0; rem = n
    while rem > 1e-9:
        f = min(1, rem)
        cx = x + r + (i % cols) * gap; cy = y + r + (i // cols) * gap
        o += coin(cx, cy, r, f, style, render, partial); rem -= f; i += 1
    rows = max(1, (i - 1) // cols + 1)
    return o, x + min(i, cols) * gap, y + rows * gap

# ---------- coin variants ----------
# each variant: T = max coins drawn one by one; cluster = how a big amount is drawn; lab = label style
VARIANTS = [
 ("V1", "One coin ×N", "“Past ten coins, one coin and a count.”", dict(T=10, cl="one", lab="x")),
 ("V2", "Handful of 5 ×N", "“Past ten, a handful of coins and the count.”", dict(T=10, cl="five", lab="x")),
 ("V3", "Row of 10 × rows", "“Past twenty, one row of ten and how many rows.”", dict(T=20, cl="ten", lab="rows")),
 ("V4", "Draw up to 20, then handful ×N", "“Up to 20 coins you see every one; past that, a handful and the count.”", dict(T=20, cl="five", lab="x")),
 ("V5", "Coin with count badge", "“A coin with a number on it is that many coins.”", dict(T=10, cl="badge", lab="none")),
 ("V6", "Handful + ₹ wording", "“Past ten, a few coins and the rupee amount.”", dict(T=10, cl="three", lab="rs")),
 ("V7", "Handful ×N, ₹ underneath", "“The count is coins; the small line is rupees.”", dict(T=20, cl="five", lab="both")),
 ("V8", "Coin pile (side view)", "“A pile of coins, with how many are in it.”", dict(T=10, cl="pile", lab="x")),
]

def cluster(x, y, n, style, cl, lab, r=7, word="", render="rim"):
    """Draw the big-amount form. Returns body, height."""
    o = ""; cy = y + r
    if cl == "one":
        o += coin(x + r, cy, r, 1, style, render); ex = x + 2 * r + 6
    elif cl == "three":
        b, ex, _ = row(x, y, 3, style, r, 2 * r + 2, render=render); o += b; ex += 4
    elif cl == "five":
        b, ex, _ = row(x, y, 5, style, r, 2 * r + 2, render=render); o += b; ex += 4
    elif cl == "ten":
        b, ex, _ = row(x, y, 10, style, r, 2 * r + 2, render=render); o += b; ex += 4
    elif cl == "badge":
        o += coin(x + r + 2, cy + 2, r + 2, 1, style, render)
        t = fmt(n); bw = 7 * len(t) + 8
        o += f'<rect x="{x+2*r-2}" y="{y-6}" width="{bw}" height="14" rx="7" fill="var(--ink)"/>' + T(x + 2 * r - 2 + bw / 2, y + 5, t, 10, "middle", "tbadge", 700)
        ex = x + 2 * r + bw + 4
        if word: o += T(ex, cy + 6, word, 11, cls="t2")
        return o, 2 * r + 8
    elif cl == "pile":
        k = min(8, max(2, int(n // 10) + 2))
        dsh = ' stroke-dasharray="2 2"' if style == "ghost" else ""
        for j in range(k):
            yy = y + 2 * r + 4 - j * 3
            o += f'<ellipse cx="{x+r+3}" cy="{yy}" rx="{r+3}" ry="{r*0.45:.1f}" fill="{FILL.get(style,"var(--card)")}" stroke="var(--ink3)" stroke-width="1"{dsh}/>'
        ex = x + 2 * r + 12
    if lab == "x": o += T(ex, cy + 5, f"×{fmt(n)}", 14, weight=700); ex2 = ex + 10 * len(fmt(n)) + 22
    elif lab == "rows": o += T(ex, cy + 5, f"× {fmt(n/10) if (n/10)%1 in (0,.5) else round(n/10,1)} rows", 13, weight=700); ex2 = ex + 70
    elif lab == "rs": o += T(ex, cy + 5, rupees(n), 14, weight=700); ex2 = ex + 9 * len(rupees(n)) + 4
    elif lab == "both":
        o += T(ex, cy + 2, f"×{fmt(n)}", 14, weight=700) + T(ex, cy + 14, f"= {rupees(n)}", 9.5, cls="t2"); ex2 = ex + 10 * len(fmt(n)) + 22
    else: ex2 = ex
    if word: o += T(ex2, cy + 5, word, 11, cls="t2")
    return o, 2 * r + (10 if cl == "pile" else 4)

def show(segs, v, w=300, render="rim", partial="cup", r=7):
    """segs: [(coins, style, word)]. Draw together if total ≤ T else one line per segment."""
    P = v[3]; tot = sum(s[0] for s in segs)
    o = ""; y = 8
    if tot <= P["T"] + 1e-9:
        x = 8
        cols = 10
        i0 = 0
        # sequential with wrap
        for n, st, word in segs:
            rem = n
            while rem > 1e-9:
                f = min(1, rem); cx = x + r + (i0 % cols) * (2 * r + 4); cy = y + r + (i0 // cols) * (2 * r + 4)
                o += coin(cx, cy, r, f, st, render, partial); rem -= f; i0 += 1
        rows = (i0 - 1) // cols + 1
        y += rows * (2 * r + 4) + 4
        words = " · ".join(f"{fmt(n)} {wd}".strip() for n, st, wd in segs if wd) or f"{fmt(tot)} coins"
        o += T(8, y + 8, words, 11, cls="t2"); y += 14
    else:
        for n, st, word in segs:
            if n <= P["T"] and P["T"] >= 20 and n < 1e9:
                b, ex, ey = row(8, y, n, st, r, 2 * r + 4, render=render, partial=partial); o += b
                o += T(ex + 4, y + r + 5, f"{fmt(n)} {word}", 11, cls="t2"); y = ey + 6
            else:
                b, h = cluster(8, y, n, st, P["cl"], P["lab"], r, word, render); o += b; y += h + 10
    return o, y + 2

SCEN = [
 ("chai", "₹25 chai", [(0.25, "left", "coin")]),
 ("meal", "₹350 meal", [(3.5, "left", "coins")]),
 ("income", "₹9,000 in → ₹2,000 save / ₹7,000 spend", [(20, "save", "to save"), (70, "left", "to spend")]),
 ("week", "Week ₹1,750, ₹1,050 left", [(7, "spent", "spent"), (10.5, "left", "left")]),
 ("month", "Month ₹7,000, ₹2,600 left", [(26, "left", "left"), (44, "spent", "spent")]),
 ("goal", "Goal ₹14,000, ₹8,110 saved", [(81.1, "save", "saved"), (58.9, "ghost", "to go")]),
 ("laptop", "₹45,000 laptop goal", [(450, "ghost", "to save")]),
 ("accum", "Four ₹25 chais", None),
]

def scen_svg(key, segs, v, render="rim", partial="cup"):
    if key == "accum":
        o = ""
        for i in range(4):
            o += coin(18 + i * 34, 18, 9, 0.25 * (i + 1), "left", render, partial) + T(18 + i * 34, 42, f"{i+1}×", 10, "middle", "t2")
        o += T(150, 22, "one coin fills", 11, cls="t2")
        return svg(o, 300, 50, "four chais fill one coin")
    b, h = show(segs, v, render=render, partial=partial)
    return svg(b, 300, h, key)

def pay_strip(v):
    """₹350 taking 3½ coins out of the week (10½ left → 7 left)."""
    def frame(segs, cap):
        b, h = show(segs, v)
        return f'<figure class="sc"><figcaption>{E(cap)}</figcaption>{svg(b,300,h,cap)}</figure>'
    return ('<div class="grid g3">' +
        frame([(7, "spent", "spent"), (10.5, "left", "left")], "1 · Before: 10½ coins left") +
        frame([(7, "spent", ""), (7, "left", "stay"), (3.5, "out", "leave")], "2 · Confirm ₹350: 3½ coins lift out") +
        frame([(10.5, "spent", "spent"), (7, "left", "left")], "3 · After: 7 coins left") + '</div>')

SCORES = {  # learn, glance, scale, never-merges, home-fit
 "V1": (5,3,5,5,4), "V2": (5,4,5,5,4), "V3": (4,3,3,3,3), "V4": (5,5,5,5,5),
 "V5": (3,3,5,5,3), "V6": (4,4,5,5,1), "V7": (4,4,5,5,2), "V8": (3,2,4,3,3)}
NOTES = {
 "V1": "Smallest mark; but ×60 and ×6 look the same size, so the picture stops showing proportion past ten.",
 "V2": "The handful says “a lot of coins” at once; still no proportion between ×26 and ×44.",
 "V3": "Re-introduces the “line” Tarun wants to avoid; “2.6 rows” is awkward.",
 "V4": "Keeps a whole week (17½) fully drawn and countable (Kay 2016, ~20 marks); past 20 the handful + count takes over. Five is at the edge of instant counting.",
 "V5": "Compact, but a badge reads as a notification count, not money.",
 "V6": "Clear but puts a ₹ figure on the glance, which D2 rules out for Home.",
 "V7": "Good for tabs and detail: count leads, rupees underneath for people who think in ₹.",
 "V8": "Most coin-like and tactile, but overlapping coins are a merge in disguise and are hard to count.",
}

def part_a():
    o = ['<section class="s2b" id="s2b-a"><h3 class="h3b">Part A · The coin and its count</h3>',
         '<p>D1 makes the dot a coin: 1 coin = ₹100 everywhere, never merged. Eight ways to show amounts past what you can count, on the same scenarios as Stage 2. Filled = still yours, outline = spent, dashed = not saved yet, ochre = savings, orange dashed = leaving with this payment.</p>']
    for v in VARIANTS:
        vid, name, rule, P = v
        o.append(f'<article class="var" id="{vid}"><header><span class="id">{vid}</span><h4>{E(name)}</h4><p class="rule">{E(rule)}</p></header><div class="grid">')
        for key, cap, segs in SCEN:
            o.append(f'<figure class="sc"><figcaption>{E(cap)}</figcaption>{scen_svg(key, segs, v)}</figure>')
        o.append(f'</div><p class="note">{E(NOTES[vid])}</p></article>')
    # payment strip using V4
    v4 = VARIANTS[3]
    o.append('<article class="var" id="Vpay"><header><span class="id">STUDY</span><h4>A payment takes coins out</h4><p class="rule">“Before you confirm, the coins this payment takes lift out of your week.”</p></header>')
    o.append(pay_strip(v4))
    o.append('<p class="note">₹350 is 3½ coins. On the pay screen those coins turn orange-dashed and slide out of the row before the confirm button; after paying they become outlines. This is the friction moment from Stage 0 (Soman 2001: rehearsing the cost at payment), without a ₹ figure.</p></article>')
    # rendering study
    o.append('<article class="var" id="Vrender"><header><span class="id">STUDY</span><h4>Coin rendering and partial coins</h4><p class="rule">Flat, rim, or rim + shine; a part-coin as a cup fill or a cut wedge (like a quarter of a coin).</p></header><div class="grid g3">')
    for rd, rdn in (("flat", "Flat"), ("rim", "Rim (coin edge)"), ("shine", "Rim + shine")):
        for pt, ptn in (("cup", "cup fill"), ("wedge", "wedge")):
            b = "".join(coin(16 + i * 26, 18, 10, f, "left", rd, pt) for i, f in enumerate([1, 1, .75, .5, .25]))
            b += coin(16 + 5 * 26, 18, 10, 1, "save", rd, pt) + coin(16 + 6 * 26, 18, 10, 1, "spent", rd, pt) + coin(16 + 7 * 26, 18, 10, 1, "ghost", rd, pt) + coin(16 + 8 * 26, 18, 10, 1, "out", rd, pt)
            o.append(f'<figure class="sc"><figcaption>{rdn} · {ptn}</figcaption>{svg(b, 300, 36, rdn)}</figure>')
    o.append('</div><p class="note">Suggested: rim, no shine. The inner ring makes a dot read as a coin at 14px and survives black &amp; white (try the toggle above); shine adds noise at small sizes. For part-coins the wedge reads as “a piece of a coin” and matches a quarter; the cup fill reads better as filling up over four chais. Both are in the test.</p></article>')
    # timeframes
    o.append('<article class="var" id="Vtime"><header><span class="id">STUDY</span><h4>Week, month and goal with the same coin</h4><p class="rule">Same coin, same ₹100; the frame and the word change, never the unit.</p></header><div class="grid g3">')
    for cap, segs in (("This week · 17½ coins", [(7, "spent", "spent"), (10.5, "left", "left")]),
                      ("This month · ×70", [(26, "left", "left"), (44, "spent", "spent")]),
                      ("Laptop goal · ×140 (₹14,000)", [(81.1, "save", "saved"), (58.9, "ghost", "to go")])):
        b, h = show(segs, v4)
        o.append(f'<figure class="sc"><figcaption>{E(cap)}</figcaption>{svg(b,300,h,cap)}</figure>')
    o.append('</div><p class="note">A week is drawn coin by coin (it fits under 20). A month and a goal switch to the handful + count. The switch itself tells you “this is a big amount” without a new shape. Savings stay ochre everywhere, so a goal never looks like spending.</p></article>')
    # score table
    o.append('<h4 class="h4t">Scores (judgement, 1–5, not user-tested)</h4><div class="tbl"><table class="t2b"><thead><tr><th>Variant</th><th>Learn in one sentence</th><th>Glance accuracy</th><th>₹25 → ₹45,000</th><th>Never merges</th><th>Fits Home (no ₹)</th><th>Avg</th></tr></thead><tbody>')
    for v in VARIANTS:
        s = SCORES[v[0]]; avg = sum(s) / 5
        hl = ' class="hl"' if v[0] in ("V4", "V1") else ""
        o.append(f'<tr{hl}><th>{v[0]} {E(v[1])}</th>' + "".join(f'<td class="s{x}">{x}</td>' for x in s) + f'<td class="tot">{avg:.1f}</td></tr>')
    o.append('</tbody></table></div>')
    o.append('''<div class="top4 two"><article><h3>1 · V4 Draw up to 20, then handful ×N</h3><ul><li>A whole week (17½ coins) is always fully drawn, so Home never shows a count, only coins.</li><li>20 is the countable limit from Kay et al. 2016; 5 sits at the edge of instant counting (Kaufman 1949).</li><li>Past 20 the handful says “many coins” and ×N gives the exact count in the same unit (Neurath: repeat, don’t enlarge).</li><li>Con: between 21 and ~60 the picture does not show proportion; the count carries it.</li></ul></article><article><h3>2 · V1 One coin ×N</h3><ul><li>Smallest and calmest; works inside list rows and category lines.</li><li>Pure count format, which people read well (Gigerenzer &amp; Hoffrage 1995).</li><li>Con: ×11 and ×450 look identical at a glance; it relies fully on reading the number.</li><li>Test question: does the handful in V4 actually help, or is the count doing all the work?</li></ul></article></div>''')
    o.append('</section>')
    return "\n".join(o)

# ---------- Part B: categories ----------
CATS = [  # name, emoji, month ₹, family
 ("Hostel mess", "🍛", 2000, "Fixed"), ("Food", "🍔", 2800, "Needs"), ("Bike EMI", "🏍️", 1500, "Fixed"),
 ("Travel", "🚌", 1200, "Needs"), ("Fun", "🎳", 1000, "Wants"), ("Clothes", "👕", 800, "Wants"),
 ("Outings", "🎉", 700, "Wants"), ("Quick-commerce", "🛵", 650, "Wants"), ("Study", "📚", 600, "Needs"),
 ("Subs", "📺", 548, "Fixed"), ("Gym", "🏋️", 500, "Fixed"), ("Movies", "🎬", 450, "Wants"),
 ("Snacks", "🍪", 420, "Wants"), ("Gifts", "🎁", 350, "Wants"), ("Chai", "☕", 300, "Wants"),
 ("Phone", "📱", 299, "Fixed"), ("Laundry", "🧺", 200, "Needs"), ("Haircut", "💈", 150, "Needs"),
 ("Stationery", "✏️", 120, "Needs"), ("Printouts", "🖨️", 90, "Needs")]
SET5 = ["Food", "Travel", "Fun", "Study", "Subs"]
SET12 = SET5 + ["Gym", "Bike EMI", "Gifts", "Snacks", "Chai", "Clothes", "Hostel mess"]
SET20 = [c[0] for c in CATS]
CD = {c[0]: c for c in CATS}
MERCH = {"Food": "Swiggy, Zomato, canteen", "Quick-commerce": "Blinkit, Zepto", "Travel": "Uber, Rapido, IRCTC",
         "Subs": "Spotify, Netflix", "Gym": "Cult.fit", "Movies": "BookMyShow", "Phone": "Jio", "Bike EMI": "Bajaj Finance",
         "Hostel mess": "Hostel office", "Clothes": "Myntra", "Study": "Amazon books", "Chai": "Tea stall (UPI)",
         "Snacks": "Campus store", "Gifts": "Amazon, FNP", "Fun": "Smaaash", "Outings": "Split with friends",
         "Laundry": "Dhobi (UPI)", "Haircut": "Salon", "Stationery": "Xerox shop", "Printouts": "Xerox shop"}

def coins_inline(amt, r=5, T=20):
    n = amt / 100
    if n <= T:
        b, ex, ey = row(0, 1, n, "left", r, 2 * r + 2, cols=20)
        return f'<svg class="ci" viewBox="0 0 {ex+2} {2*r+3}" width="{ex+2}" height="{2*r+3}" aria-hidden="true">{b}</svg>'
    b, _, _ = row(0, 1, 5, "left", r, 2 * r + 2)
    w = 5 * (2 * r + 2)
    return f'<svg class="ci" viewBox="0 0 {w} {2*r+3}" width="{w}" height="{2*r+3}" aria-hidden="true">{b}</svg><b class="cx">×{fmt(n)}</b>'

def ranked(names): return sorted(names, key=lambda n: -CD[n][2])
def li(n, lead=""):
    return f'<li>{lead}<span class="nm">{E(n)}</span><span class="cv">{coins_inline(CD[n][2])}</span></li>'

def idea_name_first(names): return '<ul class="cl">' + "".join(li(n) for n in ranked(names)) + "</ul>"
def idea_monogram(names):
    def mg(n):
        m = "".join(w[0] for w in n.replace("-", " ").split())[:2].upper() if " " in n or "-" in n else n[:2]
        return f'<span class="mono">{E(m)}</span>'
    return '<ul class="cl">' + "".join(li(n, mg(n)) for n in ranked(names)) + "</ul>"
def idea_emoji(names): return '<ul class="cl">' + "".join(li(n, f'<span class="emo">{CD[n][1]}</span>') for n in ranked(names)) + "</ul>"
def idea_top4(names):
    r = ranked(names); top = r[:4]; rest = r[4:]
    o = '<ul class="cl">' + "".join(li(n) for n in top)
    if rest:
        o += f'<li class="oth"><span class="nm">Others · {len(rest)}</span><span class="cv">{coins_inline(sum(CD[n][2] for n in rest))}</span></li>'
    o += "</ul>"
    if rest: o += f'<p class="tapnote">Tap Others → {E(", ".join(rest[:4]))}{"…" if len(rest)>4 else ""}</p>'
    return o
def idea_family(names):
    o = ""
    fams = {}
    for n in names: fams.setdefault(CD[n][3], []).append(n)
    for f in sorted(fams, key=lambda f: -sum(CD[n][2] for n in fams[f])):
        tot = sum(CD[n][2] for n in fams[f])
        o += f'<details class="fam" open><summary><span class="nm">{f}</span><span class="cv">{coins_inline(tot)}</span></summary><ul class="cl sub">' + "".join(li(n) for n in ranked(fams[f])) + "</ul></details>"
    return o
def idea_dyncolour(names):
    r = ranked(names)
    o = '<ul class="cl">'
    for i, n in enumerate(r):
        sw = f'<span class="sw" style="background:var(--c{i+1})"></span>' if i < 3 else '<span class="sw nil"></span>'
        o += li(n, sw)
    return o + '</ul><p class="tapnote">Only this week’s top 3 get a colour; it changes when the ranking changes, so nobody has to memorise it.</p>'
def idea_coinrow(names):
    o = '<div class="crow">'
    for n in ranked(names):
        o += f'<div><span class="nm sm">{E(n)}</span>{coins_inline(CD[n][2], r=4, T=30)}</div>'
    return o + "</div>"
def idea_search(names):
    return ('<div class="fakesearch">🔍 Search categories</div><div class="chips"><span class="on">Biggest</span><span>A–Z</span><span>Recent</span><span>Mine</span></div>'
            + '<ul class="cl">' + "".join(li(n) for n in ranked(names)[:6]) + f'</ul><p class="tapnote">{len(names)} categories · scroll for more</p>')
def idea_merchant(names):
    o = '<ul class="cl">'
    for n in ranked(names):
        o += f'<li><span class="nm">{E(n)}<small>{E(MERCH.get(n,""))}</small></span><span class="cv">{coins_inline(CD[n][2])}</span></li>'
    return o + "</ul>"

IDEAS = [
 ("B1", "Name-first ranked rows", "The word is the identity; biggest at the top; coins beside it.", idea_name_first, (5,5,4,5)),
 ("B2", "Monogram coin", "Two letters in a badge stand in for an icon.", idea_monogram, (3,4,3,3)),
 ("B3", "Your own emoji + name", "The emoji you picked, then the name; the name still does the work.", idea_emoji, (4,5,5,4)),
 ("B4", "Top 4 + Others", "Glance shows the four biggest; everything else folds into Others.", idea_top4, (5,5,5,4)),
 ("B5", "Families: Needs / Wants / Fixed", "Three groups you can learn once; categories live inside them.", idea_family, (5,4,5,4)),
 ("B6", "Colour for the top 3 only", "Colour marks rank this week, not identity, so there is nothing to memorise.", idea_dyncolour, (4,4,4,3)),
 ("B7", "Category as a coin row", "Each category is a labelled line of its own coins.", idea_coinrow, (3,5,4,4)),
 ("B8", "Search + sort", "Find by typing, order by size, A–Z or recent.", idea_search, (5,3,5,5)),
 ("B9", "Auto-grouped from merchants", "Trickle groups UPI merchants; the merchant names explain the category.", idea_merchant, (4,4,3,4)),
]
def part_b():
    o = ['<section class="s2b" id="s2b-b"><h3 class="h3b">Part B · Categories when there are 20 of them</h3>',
         '<p>D4 is open. People create their own categories (“Gym”, “Bike EMI”, “Gifts”) with their own icons, so a fixed icon set or colour key cannot carry identity at 20. Nine ideas, each shown with 5, 12 and 20 categories (one month). Switch the count:</p>',
         '<div class="seg" role="group" aria-label="Number of categories"><button type="button" data-n="5">5</button><button type="button" data-n="12" aria-pressed="true">12</button><button type="button" data-n="20">20</button></div>',
         '<div class="ideas" data-show="12">']
    for iid, name, rule, fn, sc in IDEAS:
        o.append(f'<article class="idea"><header><span class="id">{iid}</span><h4>{E(name)}</h4><p class="sub">{E(rule)}</p></header>')
        for k, s in (("5", SET5), ("12", SET12), ("20", SET20)):
            o.append(f'<div class="phone n{k}">{fn(s)}</div>')
        o.append(f'<p class="scorel">Scales {sc[0]} · Consistent with coins {sc[1]} · Learnable {sc[2]} · Custom-friendly {sc[3]}</p></article>')
    o.append('</div>')
    o.append('''<div class="top4 two"><article><h3>1 · B1 Name-first ranked rows (+ B3 emoji, + B4 on Home)</h3><ul><li>The name is what the user typed, so a custom “Bike EMI” is as clear as “Food”; no key to learn.</li><li>Ranked by size, rows aligned on one edge: aligned length is the most accurate comparison (Cleveland &amp; McGill 1984).</li><li>The user’s own emoji can sit before the name as a quick anchor, never instead of it.</li><li>On Home, only the top 4 + Others (B4); the full list on tap. Coins look the same in every row.</li></ul></article><article><h3>2 · B5 Families: Needs / Wants / Fixed</h3><ul><li>Three groups stay learnable at any count; 20 categories become 3 lines at a glance.</li><li>Matches how students already talk (Harsh: knowing where he wants to spend; Nishad: purpose accounts) and income = spending + savings.</li><li>Fixed (EMI, Subs, Phone, Gym) can carry the “takes money in 2 days” reminder.</li><li>Con: someone has to place each custom category; ambiguous ones (Chai: Need or Want?) need a default.</li></ul></article></div>''')
    o.append('<p class="note">Not recommended as the identity: monograms (B2) collide (“Gi” Gifts vs “Gy” Gym), dynamic colour (B6) is a nice accent but not an identity, coin rows (B7) get too long past ₹3,000, and search (B8) belongs on the full list, not the glance. Merchant grouping (B9) is a setup aid: it proposes categories from UPI merchants so people rarely make them by hand.</p></section>')
    return "\n".join(o)

def decisions():
    return '''<section class="s2b" id="s2b-d"><h3 class="h3b">Decisions for Tarun (Stage 2b)</h3>
<div class="q"><h3>E1 · How does a big amount look?</h3><ol type="A"><li>V4: draw up to 20 coins, then a handful of 5 + ×N</li><li>V1: one coin + ×N past 10</li><li>V7: handful ×N with ₹ underneath (tabs only)</li></ol><p>Suggested: run the coin test, then pick A or B; use C in tabs and detail either way.</p></div>
<div class="q"><h3>E2 · Coin rendering and part-coins</h3><ol type="A"><li>Rim, cup fill</li><li>Rim, wedge</li><li>Flat, cup fill</li></ol><p>Suggested: A or B (the test page uses rim + cup fill; add wedge if you want to compare).</p></div>
<div class="q"><h3>E3 · Category identity</h3><ol type="A"><li>Name-first ranked rows, own emoji optional, top 4 + Others on Home</li><li>Families (Needs / Wants / Fixed) with categories inside</li><li>Both: families on Home, name-first rows inside each family</li></ol><p>Suggested: test A vs B; C is the likely end state if families test well.</p></div>
<div class="q"><h3>E4 · Should colour carry anything for categories?</h3><ol type="A"><li>No colour at all</li><li>Colour only for this week’s top 3</li></ol><p>Suggested: A until the test shows a need.</p></div>
<div class="q"><h3>E5 · Who places a custom category in a family?</h3><ol type="A"><li>User picks on creation</li><li>Trickle suggests from the merchant, user confirms</li></ol><p>Suggested: B (matches “take it from my GPay”).</p></div>
</section>'''

CSS = '''<style>
:root{--out:#c2562f;--rim:rgba(255,255,255,.55);--shine:rgba(255,255,255,.8);--c1:#2f7d6d;--c2:#c58a2c;--c3:#6f63b5}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--out:#e88a63;--rim:rgba(0,0,0,.35);--shine:rgba(255,255,255,.55);--c1:#5bb8a4;--c2:#e0aa52;--c3:#9d92e0}}
:root[data-theme="dark"]{--out:#e88a63;--rim:rgba(0,0,0,.35);--shine:rgba(255,255,255,.55);--c1:#5bb8a4;--c2:#e0aa52;--c3:#9d92e0}
body.bw{--out:var(--ink);--c1:var(--ink);--c2:var(--ink2);--c3:var(--ink3)}
.tbadge{fill:var(--bg);font-family:var(--fb)}
.stage2b{margin-top:64px;padding-top:24px;border-top:3px solid var(--ink)}
.h3b{font-size:22px;margin-top:40px}
.var{margin-top:28px;padding-top:10px;border-top:1px solid var(--line)}
.var h4,.idea h4{font-family:var(--fd);font-size:18px;margin:0}
.var header{display:grid;gap:2px}
.note{font-size:14px;color:var(--ink2);margin:8px 0 0}
.g3{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
.h4t{font-family:var(--fd);font-size:18px;margin:28px 0 8px}
table.t2b{min-width:640px}
.top4.two{margin-top:18px}
.seg{display:inline-flex;gap:0;border:1px solid var(--line);border-radius:8px;overflow:hidden;margin:6px 0 4px}
.seg button{border:none;border-radius:0;padding:6px 16px;font-family:var(--fm)}
.seg button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.ideas{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;margin-top:10px}
.idea{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:12px;min-width:0;display:flex;flex-direction:column;gap:8px}
.idea header{display:grid;gap:2px}
.ideas .phone{display:none;font-size:13px}
.ideas[data-show="5"] .n5,.ideas[data-show="12"] .n12,.ideas[data-show="20"] .n20{display:block}
.cl{list-style:none;margin:0;padding:0;display:grid;gap:3px}
.cl li{display:grid;grid-template-columns:auto minmax(0,7.5em) 1fr;align-items:center;gap:6px;min-height:18px}
.cl li>.nm:first-child{grid-column:1/3}
.nm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600}
.nm small{display:block;font-weight:400;color:var(--ink3);font-size:11px;overflow:hidden;text-overflow:ellipsis}
.cv{display:flex;align-items:center;gap:4px;min-width:0}
.ci{flex:none;max-width:100%}
.cx{font-size:12px;font-variant-numeric:tabular-nums}
.mono{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;border:1.2px solid var(--ink3);font:600 9px var(--fm)}
.emo{width:20px;text-align:center}
.sw{width:10px;height:10px;border-radius:50%;display:inline-block}.sw.nil{border:1px dashed var(--line)}
.oth .nm{color:var(--ink2)}
.tapnote{margin:4px 0 0;font-size:12px;color:var(--ink3)}
.fam{border-top:1px solid var(--line);padding-block:4px}
.fam summary{display:flex;gap:8px;align-items:center;cursor:pointer;font-family:var(--fd)}
.fam summary .nm{width:7em}
.cl.sub{padding-left:14px;margin-top:3px}
.crow{display:grid;gap:4px}.crow .sm{font-size:11px;font-weight:600;display:block}
.fakesearch{border:1px solid var(--line);border-radius:6px;padding:5px 8px;color:var(--ink3);font-size:13px}
.chips{display:flex;gap:4px;flex-wrap:wrap;margin:6px 0;font-size:11px}.chips span{border:1px solid var(--line);border-radius:10px;padding:1px 8px}.chips .on{background:var(--ink);color:var(--bg)}
.scorel{font-size:12px;color:var(--ink2);font-family:var(--fm);margin:auto 0 0}
.testlink{background:var(--hl);border-radius:8px;padding:12px 14px;max-width:820px}
</style>'''

JS = '''<script>
(function(){var g=document.querySelector('.seg'),box=document.querySelector('.ideas');if(!g)return;g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;box.dataset.show=b.dataset.n;g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});});})();
</script>'''

def section(test_url):
    return (CSS + '<div class="stage2b" id="stage2b"><p class="id">STAGE 2B · 2 OCT 2026</p><h2 style="margin-top:4px">Coins and categories</h2>'
            '<p class="lede">Decided on 2 Oct: the dot is a coin (1 coin = ₹100, everywhere), Home is one sentence + this week’s coins with no ₹, and the timeframe is this week. Open: big amounts, and categories at 20+.</p>'
            f'<p class="testlink"><b>Run it with people:</b> the coin test page randomises the top 2 coin variants and the top 2 category ideas, times each answer and gives a summary to paste back. <a href="{test_url}">Open the Trickle v14 coin test</a>.</p>'
            + part_a() + part_b() + decisions() + '</div>' + JS)

if __name__ == "__main__":
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else "#"
    src = open("trickle_v14_stage2.html").read()
    snippet = section(url)
    marker = "</div>\n<script>"
    i = src.rfind(marker); assert i > 0
    out = src[:i] + snippet + src[i:]
    out = out.replace('<a href="#decide">Decisions</a>', '<a href="#decide">Decisions</a> <a href="#stage2b"><b>Stage 2b</b></a>', 1)
    open("trickle_v14_stage2b.html", "w").write(out)
    print(len(out))
