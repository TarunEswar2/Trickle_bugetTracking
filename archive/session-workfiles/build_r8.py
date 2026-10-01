import html
bars=[("Home",75,12),("Money",103,24),("Savings",47,20),("Actions",15,15),("Cover sheet",29,13),("Onb. allocate",54,31),("Insights",360,14),("Transactions",558,34)]
mx=560
rows=""
for i,(n,t,v) in enumerate(bars):
    y=i*34+10
    wt=t/mx*420; wv=v/mx*420
    rows+=f'<text x="120" y="{y+15}" text-anchor="end" class="lab">{n}</text><rect x="130" y="{y}" width="{wt:.1f}" height="22" rx="3" class="bt"/><rect x="130" y="{y}" width="{max(wv,2):.1f}" height="22" rx="3" class="bv"/><text x="{130+wt+6:.1f}" y="{y+15}" class="val">{t}</text>'
tgt=130+2/mx*420
chart=f'<svg viewBox="0 0 600 {len(bars)*34+30}" role="img" aria-label="Numbers per v7 screen">{rows}<line x1="{tgt:.1f}" x2="{tgt:.1f}" y1="4" y2="{len(bars)*34+10}" class="tg"/><text x="{tgt+4:.1f}" y="{len(bars)*34+24}" class="lab">v8 target: 1–2 on Home</text></svg>'
P=[("Ostrich effect","Investors log in less after markets fall.","Sicherman, Loewenstein, Seppi & Utkus 2016, RFS; Karlsson, Loewenstein & Seppi 2009","Home never opens on a figure that can be bad. Pace is a colour.","Home"),
("Pain of paying","Cash hurts, cards and UPI hurt less; 74% of surveyed UPI users say they spend more.","Prelec & Loewenstein 1998; Raghubir & Srivastava 2008; Dev et al. 2024","One pause at payment: amount as a share of the week, plus goal time.","Pay"),
("Commitment devices","People choose to bind themselves; locked savings raised saving.","Ashraf, Karlan & Yin 2006, QJE","Opt-in pause over ₹X or when pace is amber. Skippable, never a block.","Pay"),
("Mental accounting","Money is kept in labelled jars; labels change spending.","Thaler 1985, 1999","Two jars only: Spending and Savings. Goals live inside Savings.","Budget, Savings"),
("Defaults and automation","Auto-enrolment and Save More Tomorrow lifted savings 3.5% → 13.6%.","Madrian & Shea 2001; Thaler & Benartzi 2004, JPE","Budget fixed; everything above it flows to savings by rule. One confirm card.","Income"),
("Goal-gradient and endowed progress","Effort speeds up near a goal; a pre-stamped card completed 34% vs 19%.","Kivetz, Urminsky & Zheng 2006; Nunes & Drèze 2006","Goal bars never start empty; finer steps in the last 10%.","Savings, Home"),
("Fresh-start effect","Goal pursuit spikes after new weeks and months.","Dai, Milkman & Riis 2014, Mgmt Sci","Each week starts clean. Monday and the 1st are check-in moments.","Weekly, month-end"),
("Fogg Behavior Model","Behaviour = motivation × ability × prompt; simplicity beats motivation.","Fogg 2009","Pay in 1 tap; cash log = amount, done. Prompts ride on existing moments.","Home, Log"),
("Peak-end rule","Memory of an experience is set by its peak and end.","Kahneman et al. 1993, Psych Sci","Every flow ends on savings progress, never on what's left.","Confirm screens"),
("Progressive disclosure","Working memory is small; show the few key things first.","Sweller 1988; Nielsen, NN/g 2006","Numbers only after a tap. Insights: 3 cards a week.","All"),
("Financial anxiety","Anxiety drives avoidance of money information.","Shapiro & Burchell 2012; Archuleta et al. 2013","One pace state, not three 'left' numbers. No problem counts.","Home, Budget"),
("Calm technology","Good tech informs from the periphery.","Weiser & Brown 1996","Home glow: green or amber, slow change, one caption line.","Home"),
("Colour and emotion","Red triggers avoidance and hurts performance.","Elliot et al. 2007; Mehta & Zhu 2009, Science","No red on Home, pay pause, or Savings. Amber for 'a bit fast'.","Palette"),
("No streaks","Broken streaks can trigger 'what-the-hell' quitting.","Polivy & Herman; streak-anxiety critiques","No streaks, points, badges. Missed days leave no trace.","All")]
cards="".join(f'<article class="card"><h3>{a}</h3><p>{b}</p><p class="src">{c}</p><p class="rule"><span>Rule</span>{d}</p><p class="scr">{e}</p></article>' for a,b,c,d,e in P)
R=["Home shows no money figures by default; at most the top goal %.","Never red on Home, the pay pause, or Savings. Green = on pace, amber = a bit fast.","Numbers appear only after a tap, at payment, or on the Budget tab.","The budget number appears in two places: the pay pause and the Budget tab.","Every flow ends on savings progress.","Two jars: Spending (fixed) and Savings (the rest, automatic).","Income is split by rule and confirmed with one card, with undo. No 'To assign'.","At most one prompt on Home. No badge counts.","Insights shows 3 cards a week; the library sits behind More.","Categories are guessed; people correct, never choose from scratch.","No streaks, points, badges, or leaderboards.","Plain words: To assign → New money · Pools → Spending/Savings · Sweep → Month-end top-up · Cover → Use from… · Carried → Next month starts lighter · Settle → Paid back"]
rules="".join(f"<li>{r}</li>" for r in R)
Q=["Pace period: should the Home glow track the week or the month?","Where do balance and income live: Budget, Savings, or a small view in the drawer?","When the budget is empty, should the pause offer 'Take from savings', or only 'Borrow from next week'?","Pay pause strength: always, only over a threshold (e.g. ₹200), or only when pace is amber?","Irregular income (part-time, gifts): all to savings, or top up the budget first?","Splits: keep the full feature behind Actions, or reduce to 'Friends owe you' + Remind?"]
qs="".join(f"<li>{q}</li>" for q in Q)
loop='''<svg viewBox="0 0 640 300" role="img" aria-label="Retention loop">
<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" class="arw"/></marker></defs>
<path d="M170,70 L250,70" class="ln" marker-end="url(#ar)"/><path d="M400,70 L470,70" class="ln" marker-end="url(#ar)"/>
<path d="M550,110 L550,180" class="ln" marker-end="url(#ar)"/><path d="M470,225 L400,225" class="ln" marker-end="url(#ar)"/>
<path d="M250,225 L170,225" class="ln" marker-end="url(#ar)"/><path d="M90,185 L90,115" class="ln" marker-end="url(#ar)"/>
<g class="nd"><rect x="10" y="30" width="160" height="80" rx="12"/><text x="90" y="60" class="nt">Daily glance</text><text x="90" y="80" class="ns">calm glow · 1 goal</text><text x="90" y="96" class="ns">0 figures</text></g>
<g class="nd"><rect x="250" y="30" width="150" height="80" rx="12"/><text x="325" y="60" class="nt">Pay moment</text><text x="325" y="80" class="ns">pause · share of week</text><text x="325" y="96" class="ns">1 number, by design</text></g>
<g class="nd sv"><rect x="470" y="30" width="160" height="80" rx="12"/><text x="550" y="60" class="nt">Auto-save runs</text><text x="550" y="80" class="ns">income + leftover</text><text x="550" y="96" class="ns">1 confirm card</text></g>
<g class="nd"><rect x="470" y="185" width="160" height="80" rx="12"/><text x="550" y="215" class="nt">Weekly check-in</text><text x="550" y="235" class="ns">Monday · 3 cards</text><text x="550" y="251" class="ns">small things added up</text></g>
<g class="nd"><rect x="250" y="185" width="150" height="80" rx="12"/><text x="325" y="215" class="nt">Month-end story</text><text x="325" y="235" class="ns">1st · fresh start</text><text x="325" y="251" class="ns">ends on "you saved"</text></g>
<g class="nd sv"><rect x="10" y="185" width="160" height="80" rx="12"/><text x="90" y="215" class="nt">Savings visibly grew</text><text x="90" y="235" class="ns">the reward</text><text x="90" y="251" class="ns">no points, no streaks</text></g>
</svg>'''
page=f'''<title>Trickle v8 Research</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Figtree:wght@400;600&display=swap">
<style>
/* Layout: single reading column, calm glow header echoing the v8 Home idea */
:root{{--bg:#f3f6f2;--surf:#ffffff;--fg:#1d2621;--mut:#5c6b62;--line:#d6ded8;--calm:#3f9a6b;--amber:#d6912a;--calmbg:#dcefe3;
--disp:"Fraunces",Georgia,serif;--body:"Figtree",system-ui,sans-serif}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#111714;--surf:#19211c;--fg:#e6ede8;--mut:#9aaaa0;--line:#2c3831;--calm:#5cc28c;--amber:#e8a948;--calmbg:#1d3326;color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:#111714;--surf:#19211c;--fg:#e6ede8;--mut:#9aaaa0;--line:#2c3831;--calm:#5cc28c;--amber:#e8a948;--calmbg:#1d3326;color-scheme:dark}}
body{{background:var(--bg);color:var(--fg);font-family:var(--body);font-size:16px;line-height:1.55;padding:0 16px 64px}}
.wrap{{max-width:980px;margin:0 auto}}
header{{padding-block:48px 28px;background:radial-gradient(120% 90% at 20% 0%,var(--calmbg),transparent 70%)}}
h1,h2,h3{{font-family:var(--disp);font-weight:600;text-wrap:balance;margin:0}}
h1{{font-size:clamp(2rem,5vw,3rem)}} h2{{font-size:1.6rem;margin-top:48px}} h3{{font-size:1.1rem}}
.eyebrow{{text-transform:uppercase;letter-spacing:.1em;font-size:.75rem;color:var(--calm);font-weight:600}}
.lede{{max-width:62ch;color:var(--mut)}}
.panel{{background:var(--surf);border:1px solid var(--line);border-radius:14px;padding:20px;margin-top:16px;overflow-x:auto}}
svg{{width:100%;height:auto;display:block}}
.lab{{fill:var(--mut);font-size:12px;font-family:var(--body)}} .val{{fill:var(--fg);font-size:12px;font-variant-numeric:tabular-nums}}
.bt{{fill:var(--line)}} .bv{{fill:var(--amber)}} .tg{{stroke:var(--calm);stroke-width:2;stroke-dasharray:4 3}}
.key{{display:flex;gap:18px;flex-wrap:wrap;font-size:.85rem;color:var(--mut);margin-top:8px}}
.key i{{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:6px;vertical-align:-1px}}
.stats{{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:16px}}
.stat{{border-top:2px solid var(--line);padding-top:8px}} .stat b{{font-family:var(--disp);font-size:1.6rem;display:block}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;margin-top:16px}}
.card{{background:var(--surf);border:1px solid var(--line);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:6px;min-width:0}}
.card p{{margin:0}} .src{{font-size:.8rem;color:var(--mut);font-style:italic}}
.rule{{background:var(--calmbg);border-radius:8px;padding:8px 10px;font-size:.92rem}} .rule span{{font-weight:600;color:var(--calm);margin-right:6px}}
.scr{{font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--mut);margin-top:auto}}
.ln{{stroke:var(--mut);stroke-width:2;fill:none}} .arw{{fill:var(--mut)}}
.nd rect{{fill:var(--surf);stroke:var(--line);stroke-width:1.5}} .nd.sv rect{{fill:var(--calmbg);stroke:var(--calm)}}
.nt{{fill:var(--fg);font:600 15px var(--body);text-anchor:middle}} .ns{{fill:var(--mut);font:12px var(--body);text-anchor:middle}}
ol{{padding-left:1.4em;max-width:70ch}} ol li{{margin:8px 0}}
</style>
<div class="wrap">
<header><div class="eyebrow">Phase 1 audit · Phase 2 research</div><h1>Trickle v8 Research</h1>
<p class="lede">Reviews said "too much information, I don't know what I'm looking at." v8 moves Trickle from a ledger you audit to a companion you glance at: calm on open, one action, end on savings. No SMS tracking, no games.</p></header>
<h2>Every v7 screen is numbers</h2>
<div class="stats"><div class="stat"><b>75</b>numbers on Home (full scroll)</div><div class="stat"><b>~325</b>across Home, Money, Actions, Savings</div><div class="stat"><b>24</b>charts on Home alone</div><div class="stat"><b>3</b>different "left" figures competing</div></div>
<div class="panel">{chart}<div class="key"><span><i style="background:var(--line)"></i>full scroll</span><span><i style="background:var(--amber)"></i>first screen</span></div></div>
<p class="lede">Anxiety triggers: a red "Carried from Aug −₹240" row on Home, a growing "5 things need you" badge, red over-bars at payment. Tedium: an inbox for every income, split, and unknown payee; manual assigning; monthly sweep choices. Jargon: To assign, pools, sweep, cover, carry.</p>
<h2>Psychology, with the rule it gives us</h2><div class="grid">{cards}</div>
<h2>Retention loop, no games</h2><div class="panel">{loop}</div>
<h2>Design rules for v8</h2><ol>{rules}</ol>
<h2>Open questions</h2><ol>{qs}</ol>
</div>'''
open('trickle-v8-research.html','w').write(page)
