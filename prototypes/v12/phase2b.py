import re,html
E=html.escape
W=dict(L=20,H=15,M=15,C=15,Mo=10,Co=15,F=10)
S={'R1':(5,5,4,3,4,5,4,'One sentence, area honest at every level; the ₹10 dot is a near-invisible speck.'),
'R2':(4,5,4,4,5,5,4,'Quarters make change countable and give the best accumulate animation; ₹10 still a sliver.'),
'R3':(4,4,5,4,4,4,5,'Calmest cards (≤13 marks) and exactness on demand; level 0 hides the ₹100 tile above ₹1,000.'),
'R4':(5,5,4,5,5,5,4,'"A cup of ₹100" reads instantly, remainder legible as a level, fill/drain is natural motion.'),
'R5':(3,4,4,3,3,5,3,'Exact to ₹10, but the frame needs a 16px+ tile; at card size it is noise.'),
'R6':(3,2,5,2,4,3,4,'Fewest marks and fun to build, but volume is misjudged ~3×; breaks "1 tile = ₹100" visually.'),
'R7':(5,4,4,1,3,4,4,'Simplest, but ₹10, ₹25 vanish and ₹99 rounds up: chai spends disappear from the picture.'),
'R8':(4,2,5,4,2,3,5,'Compact, but ×count is a number on Home and the icon no longer has area.'),
'R9':(4,1,4,2,3,3,4,'Friendly icons, but a crate looks ~3× a box, not 10×. Isotype rule broken.'),
'R10':(2,1,5,1,2,1,5,'Always fits, never honest: ₹1,23,000 looks ~3× ₹1,250. Kept as the warning case.'),
'R11':(3,4,4,4,4,4,4,'Sensible per surface, but two rules to learn and the same ₹ looks different on two tabs.'),
'R12':(4,2,1,4,3,1,1,'Instantly familiar, but six shapes and 246 notes for ₹1,23,000.'),
'R13':(4,5,3,3,4,5,3,'R1 with play value; studs double the visual noise on blocks.'),
'R14':(2,1,4,3,3,1,4,'Exact and compact, but a bead is worth 10× its neighbour: place value, not area.')}
def tot(k): s=S[k]; return sum(a*b for a,b in zip(s[:7],W.values()))/100
NM={}
js=open('p2b.js').read()
for m in re.finditer(r"\{id:'(R\d+)',name:'([^']+)'",js): NM[m[1]]=m[2]
order=sorted(S,key=lambda k:-tot(k))
rows=''.join(f'<tr{" class=top3" if k in ("R4","R2","R1") else ""}><th scope="row"><span class="ok">{k}</span> {E(NM[k])}</th>'+''.join(f'<td class="n">{v}</td>' for v in S[k][:7])+f'<td class="n" data-mx="{k}"></td><td class="n"><b>{tot(k):.2f}</b></td><td class="why">{E(S[k][7])}</td></tr>' for k in order)
QS=[('P2b-Q1','Which resolution system should v12 use?',['A · Cup tiles (R4) + snapping motion (R2) + tap to zoom (R3)','B · Crumb dots (R1), greedy, no zoom','C · Zoom-first (R3): cards show bars and blocks only','D · Rounded (R7): whole tiles, exact on tap'],'A','One sentence ("a square is ₹100, it fills like a cup"), area-honest at every level, and both animations come for free.'),
('P2b-Q2','How exact are amounts below ₹100?',['A · Exact cup fill (₹10 = a thin floor line)','B · ₹25 quarters (₹10 rounds up to one quarter)','C · No crumbs; exact ₹ only on tap'],'A','Chai-sized spends are the habit Trickle exists for; they must stay visible.'),
('P2b-Q3','What does tapping a tile visual do?',['A · Zooms one level: block → tiles → ₹10s','B · Shows the exact ₹ in a tooltip','C · Nothing (opens detail screen)'],'A','Zoom keeps the tile language when you want detail; the ₹ figure sits in the zoomed view.'),
('P2b-Q4','Should Savings and Income round to whole tiles while Spending stays exact (R11)?',['A · No: one rule everywhere','B · Yes: savings/income round, spending exact'],'A','Two rules cost learnability; at ≥₹1,000 the cup remainder is already small next to the bars.')]
qh=''.join(f'<div class="q"><span class="qid">{q}</span><h3>{E(t)}</h3><ul>'+''.join(f'<li class="{"pick" if o.startswith(r+" ") else ""}">{E(o)}</li>' for o in op)+f'</ul><p class="qr"><b>Recommend {r}.</b> {E(w)}</p></div>' for q,t,op,r,w in QS)
CSS='''
.p2b .rule{font:600 14px var(--f-disp);color:var(--ink);margin:0}
.p2b .scs{grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr))}
.p2b .sv{align-items:flex-start}
.p2b .rc.wide{grid-column:span 2}@media (max-width:700px){.p2b .rc.wide{grid-column:auto}}
.p2b .sv.strip{align-items:center;gap:4px}.p2b .arr{color:var(--ink3);font-size:12px}
.p2b .mk{font:500 11px var(--f-mono)!important}
.p2b .rc.tap{cursor:zoom-in;border-radius:8px}.p2b .rc.tap:hover .sv{outline:1px dashed var(--ink3)}
.p2b .play{font:500 11px var(--f-mono);border:1px solid var(--rule);background:var(--card);color:var(--ink);border-radius:4px;padding:0 6px;cursor:pointer}
.p2b svg .m,.p2b svg rect.f,.p2b svg .f{fill:var(--t-f)} .p2b svg .s{fill:var(--t-s)}
.p2b svg .x{fill:var(--t-f);opacity:.28} .p2b svg .n{fill:var(--t-s)}
.p2b svg .e{fill:none;stroke:var(--t-e);stroke-width:1}
.p2b svg .o{fill:none!important;stroke:var(--t-e);stroke-width:.8}
.p2b svg .gh{fill:var(--t-e);opacity:.6} .p2b svg .zero{fill:none;stroke:var(--t-e);stroke-dasharray:1.5 1}
.p2b svg .bl{stroke:var(--card);stroke-width:.6;opacity:.55} .p2b svg .notch{stroke:var(--card);stroke-width:1.2}
.p2b svg .stud{fill:#fff;opacity:.35} .p2b svg .rod{stroke:var(--ink3);stroke-width:1}
.p2b svg .lbl{font:500 7px var(--f-mono);fill:var(--ink2)} .p2b svg .lbl.mid{text-anchor:middle;font-size:6px} .p2b svg .lbl.sm{font-size:6px;fill:var(--ink3)} .p2b svg .cnt{font-size:9px;fill:var(--ink)}
.p2b svg .sh{filter:brightness(.72)} .p2b svg .tp{filter:brightness(1.22)}
.p2b svg .dn500{opacity:1}.p2b svg .dn200{opacity:.75}.p2b svg .dn100{opacity:.55}.p2b svg .dn50{opacity:1}.p2b svg .dn20{opacity:.75}.p2b svg .dn10{opacity:.55}
.p2b.bw{--t-f:var(--ink);--t-s:var(--ink2);--t-e:var(--ink3)}
.p2b .sm3{overflow-x:auto;background:var(--card);border:1px solid var(--rule);border-radius:10px}
.p2b .sm3 td,.p2b .sm3 th{padding:6px 8px;border-top:1px solid var(--rule);text-align:left;vertical-align:top}
.p2b .sm3 thead th{font:500 11px var(--f-mono);color:var(--ink3);border-top:0}
.p2b .sm3 td.n{text-align:center;font-variant-numeric:tabular-nums;font-family:var(--f-mono);font-size:12px}
.p2b .sm3 th[scope=row]{white-space:nowrap;font-weight:500}
.p2b .sm3 tr.top3{background:var(--tile-soft)}
.p2b .sm3 .why{color:var(--ink2);min-width:240px;font-size:12px}
.p2b .top3c{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
.p2b .t3{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:14px 16px;display:grid;gap:6px;align-content:start}
.p2b .t3.win{border:2px solid var(--tile)} .p2b .t3 h4{margin:0;font:700 16px var(--f-disp)} .p2b .t3 ul{margin:0;padding-left:18px;font-size:13px} .p2b .t3 p{margin:0;font-size:13px;color:var(--ink2)}
.p2b .pg{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:16px;display:grid;gap:12px}
.p2b .pgctl{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.p2b .pgctl input[type=range]{flex:1;min-width:180px;accent-color:var(--tile)}
.p2b .pgctl input[type=number]{width:110px;font:500 14px var(--f-mono);padding:5px 8px;border:1px solid var(--rule);border-radius:6px;background:var(--paper);color:var(--ink)}
.p2b #pgv{font:700 26px var(--f-disp);font-variant-numeric:tabular-nums;min-width:120px}
.p2b .pgb{display:flex;gap:6px;flex-wrap:wrap}
.p2b .pgb button{font:500 12px var(--f-body);border:1px solid var(--rule);background:var(--paper);color:var(--ink);border-radius:999px;padding:6px 12px;cursor:pointer}
.p2b #pgout{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px}
.p2b .pgc{display:grid;gap:4px;align-content:start}.p2b .pgh{font-size:13px;font-weight:600}
.p2b .pgc .sv{min-height:120px;overflow:auto}
.p2b .sv svg{max-width:100%;height:auto}
@media (prefers-reduced-motion:no-preference){.p2b .sv svg{animation:p2bin .35s ease}@keyframes p2bin{from{opacity:.4;transform:scale(.97)}to{opacity:1;transform:none}}}
'''
SEC=f'''<section class="phase p2 p2b" id="p2b" style="margin-top:48px">
  <h2><span>Phase 2b</span> Tile resolution</h2>
  <p class="lede" style="margin:0">1 tile = ₹100 stays true everywhere, but ₹50,000 cannot be 500 tiles and ₹10 cannot vanish. Below: 14 resolution systems, each drawn for the same 12 amounts (two of them animated). Mark counts are computed from the drawing. Nothing is decided yet; this is the menu.</p>
  <div class="block"><h3>Phase 2 answers carried in</h3><ul class="note" style="margin:0;color:var(--ink2);font-size:14px"><li>Dot-matrix glow only on time and position views.</li><li>Key once per screen, plus a line in each tab's intro.</li><li>Large amounts: pills, then ₹10,000 blocks.</li><li>Tile = ₹100, the same everywhere.</li><li>Resolution is still open. Tarun likes crumb → tile → pill → block (R1), but wants to see alternatives first.</li></ul></div>
  <div class="block"><h3>Try it</h3><p class="note">Type or slide any amount and see it in the top 3 systems side by side. Pay and receive show the leaving/arriving part, then the settled result.</p>
   <div class="pg"><div class="pgctl"><span id="pgv">₹6,350</span><input type="range" id="pgs" min="0" max="1000" aria-label="Amount (log scale)"><input type="number" id="pgn" min="0" max="500000" aria-label="Amount in rupees"></div>
   <div class="pgb"><button type="button" data-mv="-25">Pay ₹25 chai</button><button type="button" data-mv="-350">Pay ₹350</button><button type="button" data-mv="-1500">Pay ₹1,500</button><button type="button" data-mv="1000">Receive ₹1,000</button><button type="button" data-mv="9000">Receive ₹9,000</button></div>
   <div id="pgout"></div></div></div>
  <div class="block"><h3>14 systems × 12 amounts</h3>
   <div class="keyrow"><div class="seg" role="group" aria-label="Look"><button type="button" data-look2="c" aria-pressed="true">Colour</button><button type="button" data-look2="bw" aria-pressed="false">B&amp;W</button></div>
   <div class="seg" role="group" aria-label="Size"><button type="button" data-sz="1.4" aria-pressed="true">Board</button><button type="button" data-sz="2.3" aria-pressed="false">Home airy (14px tile)</button></div>
   <span><i style="background:var(--t-f)"></i>budget / spend</span><span><i style="background:var(--t-s)"></i>savings</span><span><i style="border:1.5px solid var(--t-e)"></i>still to fill</span><span><i style="background:var(--t-f);opacity:.3"></i>leaving</span></div>
   <div class="opts" id="rsys"></div></div>
  <div class="block"><h3>Score matrix</h3><p class="note">1–5 each. Weights: Learn 20 · Honest (area ∝ ₹) 15 · Marks 15 · Crumb clarity 15 · Motion 10 · Consistency with ₹100 15 · Home fit (≤30 marks) 10. "Max marks" is counted live from the drawings above.</p>
   <div class="sm3"><table><thead><tr><th>System</th><th>Learn</th><th>Honest</th><th>Marks</th><th>Crumb</th><th>Motion</th><th>₹100</th><th>Fit</th><th>Max marks</th><th>Score</th><th>Why</th></tr></thead><tbody>{rows}</tbody></table></div></div>
  <div class="block"><h3>Top 3</h3><div class="top3c">
   <div class="t3 win"><span class="ok">R4 · {tot("R4"):.2f}</span><h4>Cup tile</h4><ul><li>+ "A square is ₹100; it fills like a cup." One sentence.</li><li>+ Remainder reads as a level (½ full = ₹50), even at 6px.</li><li>+ Pay drains the cup, income fills it; bars crack into cups.</li><li>− ₹10 is only a thin floor line.</li><li>− ₹6,350 = 10 marks, ₹1,23,000 = 18: fine on Home, dense in lists.</li></ul></div>
   <div class="t3"><span class="ok">R1 · {tot("R1"):.2f}</span><h4>Crumb · Tile · Pill · Block</h4><ul><li>+ The one Tarun likes; pure base-10, area-honest.</li><li>+ The crumb dot is visibly "not a tile".</li><li>− An area-true ₹10 dot is about 1px; ₹25 and ₹50 are hard to tell apart.</li><li>− A dot growing into a square is a weaker animation than a cup filling.</li></ul></div>
   <div class="t3"><span class="ok">R2 · {tot("R2"):.2f}</span><h4>Snapping crumbs</h4><ul><li>+ Change is countable: ₹25 quarters, four make a tile.</li><li>+ Best accumulate story: 4 chais visibly snap into ₹100.</li><li>− ₹10 and ₹99 get odd partial quarters.</li><li>− A second sub-unit (₹25) to learn.</li></ul></div>
  </div>
  <p class="note"><b>Recommendation (hybrid):</b> use <b>R4 cup tiles</b> on the R1 crumb → tile → pill → block ladder as the single static rule. Add <b>R2's snap</b> as motion: when cups add up to ₹100 they merge into a solid tile, and when 10 tiles fill a row they fuse into a pill. Add <b>R3's tap to zoom</b> (scored 4.25, 4th) as an interaction layer, not a static form, as the way to get exact amounts (block → tiles → ₹10s). This keeps one rule everywhere and needs no numbers on cards. Rejected: R10 log (dishonest), R12 cash (246 marks), R14 abacus and R9 icons (marks not sized to value).</p></div>
  <div class="block" id="q2b"><h3>Questions for Tarun</h3><div class="qs">{qh}</div></div>
</section>'''
src=open('board.html').read()
src=re.sub(r'<style id="p2bcss">.*?</style>','',src,flags=re.S)
src=re.sub(r'<section class="phase p2 p2b" id="p2b".*?</section>','',src,flags=re.S)
src=re.sub(r'<script id="p2bjs">.*?</script>','',src,flags=re.S)
src=src.replace('<section class="phase p2" id="p2"','<style id="p2bcss">'+CSS+'</style><section class="phase p2" id="p2"',1)
src=src.replace('<section class="later" id="p3">',SEC+'<section class="later" id="p3">',1)
if 'href="#p2b"' not in src: src=src.replace('<a href="#p3"','<a href="#p2b" class="now">2b Resolution</a><a href="#p3"',1).replace('href="#p2" class="now"','href="#p2" class=""')
src=src+'<script id="p2bjs">'+js+'</script>'
open('board.html','w').write(src)
import json; json.dump({'S':S,'NM':NM,'tot':{k:tot(k) for k in S},'QS':QS},open('p2b_data.json','w'),ensure_ascii=False)
print([(k,round(tot(k),2)) for k in order])
