(function(){
var T=6,G=1.5,P=T+G,BW=10*P-G+2,BH=10*P-G,GAP=4;
var SEC=document.getElementById('p2b');
function R(x,y,w,h,k,rx,extra){return '<rect x="'+x.toFixed(2)+'" y="'+y.toFixed(2)+'" width="'+Math.max(w,0).toFixed(2)+'" height="'+Math.max(h,0).toFixed(2)+'" rx="'+rx+'" class="'+k+'"'+(extra||'')+'/>'}
function C(x,y,r,k){return '<circle cx="'+x.toFixed(2)+'" cy="'+y.toFixed(2)+'" r="'+r.toFixed(2)+'" class="'+k+'"/>'}
function L(x1,y1,x2,y2,k){return '<line x1="'+x1.toFixed(2)+'" y1="'+y1.toFixed(2)+'" x2="'+x2.toFixed(2)+'" y2="'+y2.toFixed(2)+'" class="'+k+'"/>'}
function Tx(x,y,s,k){return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" class="'+(k||'lbl')+'">'+s+'</text>'}
function slotX(i){return (i%10)*P+((i%10)>=5?2:0)}
/* crumbs: draw a part-tile of fraction f (0..1) in slot x,y */
var CR={
 dot:function(x,y,f,k){return C(x+T/2,y+T/2,Math.max(.7,T*Math.sqrt(f/Math.PI)),k)},
 cup:function(x,y,f,k){var h=Math.max(.9,T*f);return R(x+.4,y+.4,T-.8,T-.8,'o '+k,1.2)+R(x,y+T-h,T,h,k,f>.85?1.2:.6)},
 quart:function(x,y,f,k){var q=f*4,s=(T-1)/2,o='',i;for(i=0;i<4;i++){var a=Math.min(1,Math.max(0,q-i));if(a<=0)break;var ss=s*Math.sqrt(a),cx=x+(i%2)*(s+1)+s/2,cy=y+T-s/2-Math.floor(i/2)*(s+1);o+=R(cx-ss/2,cy-ss/2,ss,ss,k,.3)}return o},
 ten:function(x,y,f,k){var n=Math.round(f*10),o=R(x+.4,y+.4,T-.8,T-.8,'o '+k,1),i;for(i=0;i<10;i++){o+=C(x+1.5+(i%2)*3,y+T-1-Math.floor(i/2)*1.05,.42,i<n?k:'gh')}return o},
 plate:function(x,y,f,k){return R(x,y+T*.55,T*f,T*.45,k,.5)},
 none:null
};
function tilegrid(n,k,crumb,f){var tot=n+(f>0&&crumb?1:0);if(!tot)return null;var cols=Math.min(10,tot),rows=Math.ceil(tot/10);
 return{w:slotX(cols-1)+T,h:rows*P-G,n:tot,d:function(x,y){var o='',i;for(i=0;i<n;i++)o+=R(x+slotX(i),y+Math.floor(i/10)*P,T,T,k,1.2);if(f>0&&crumb)o+=CR[crumb](x+slotX(n),y+Math.floor(n/10)*P,f,k);return o}}}
function pills(n,k,stud){if(!n)return null;return{w:BW,h:n*P-G,n:n,d:function(x,y){var o='',i,j;for(i=0;i<n;i++){o+=R(x,y+i*P,BW,T,k,T/2)+L(x+5*P-G/2+1,y+i*P+1,x+5*P-G/2+1,y+i*P+T-1,'notch');if(stud)for(j=0;j<10;j++)o+=C(x+slotX(j)+T/2,y+i*P+T/2,1.3,'stud')}return o}}}
function block(k,stud){return{w:BW,h:BH,n:1,d:function(x,y){var o=R(x,y,BW,BH,k,2),i,j;for(i=1;i<10;i++)o+=L(x+1,y+i*P-G/2,x+BW-1,y+i*P-G/2,'bl');o+=L(x+5*P-G/2+1,y+1,x+5*P-G/2+1,y+BH-1,'bl');if(stud)for(i=0;i<10;i++)for(j=0;j<10;j++)o+=C(x+slotX(j)+T/2,y+i*P+T/2,1,'stud');return o}}}
function dec(v){v=Math.round(v);return{B:Math.floor(v/10000),P:Math.floor(v%10000/1000),T:Math.floor(v%1000/100),c:v%100}}
function ctpb(crumb,stud){return function(v,k,o){var d=dec(v),it=[],i;
 if(o.flat){var g=tilegrid(Math.floor(v/100),k,crumb,(v%100)/100);return g?[g]:[]}
 for(i=0;i<d.B;i++)it.push(block(k,stud));var p=pills(d.P,k,stud);if(p)it.push(p);var g2=tilegrid(d.T,k,crumb,d.c/100);if(g2)it.push(g2);return it}}
function rounded(v,k,o){var n=Math.round(v/100);if(!n)return[{w:T,h:T,n:1,d:function(x,y){return R(x+.5,y+.5,T-1,T-1,'zero',1.2)}}];return ctpb(null)(n*100,k,o)}
/* iso cuboid */
var c30=Math.cos(Math.PI/6),s30=.5;
function cub(a,b,c,k){var w=(a+b)*c30,h=(a+b)*s30+c;return{w:w,h:h,n:1,d:function(x,y){var ox=x+b*c30,oy=y+c;function pt(p,q,r){return(ox+(p-q)*c30).toFixed(2)+','+(oy+(p+q)*s30-r).toFixed(2)}function poly(ps,cl){return '<polygon points="'+ps.join(' ')+'" class="'+k+' '+cl+'"/>'}
 return poly([pt(0,b,0),pt(a,b,0),pt(a,b,c),pt(0,b,c)],'sh')+poly([pt(a,0,0),pt(a,b,0),pt(a,b,c),pt(a,0,c)],'mid')+poly([pt(0,0,c),pt(a,0,c),pt(a,b,c),pt(0,b,c)],'tp')}}}
function iso(v,k,o){var u=3.2,d=Math.round(v),it=[],L1=Math.floor(d/100000),i;d%=100000;var B=Math.floor(d/10000),Pp=Math.floor(d%10000/1000),Tt=Math.floor(d%1000/100),c=d%100;
 for(i=0;i<L1;i++)it.push(cub(10*u,10*u,10*u,k));for(i=0;i<B;i++)it.push(cub(10*u,10*u,u,k));for(i=0;i<Pp;i++)it.push(cub(u,u,10*u,k));for(i=0;i<Tt;i++)it.push(cub(u,u,u,k));if(c)it.push(cub(u*Math.cbrt(c/100),u*Math.cbrt(c/100),u*Math.cbrt(c/100),k));return it}
function boxes(v,k,o){var d=dec(v),it=[],i;for(i=0;i<d.B;i++)it.push({w:20,h:17,n:1,d:function(x,y){return R(x,y+2,20,15,k,1.5)+L(x+1,y+7,x+19,y+7,'notch')+L(x+1,y+12,x+19,y+12,'notch')+L(x+7,y+3,x+7,y+16,'notch')+L(x+13,y+3,x+13,y+16,'notch')}});
 for(i=0;i<d.P;i++)it.push({w:12,h:11,n:1,d:function(x,y){return R(x,y+2,12,9,k,1)+R(x-.5,y,13,3,k,.8)+L(x,y+3.2,x+12,y+3.2,'notch')}});
 for(i=0;i<d.T;i++)it.push({w:T,h:T,n:1,d:function(x,y){return R(x,y,T,T,k,1.2)}});if(d.c)it.push({w:T,h:T,n:1,d:function(x,y){return CR.dot(x,y,d.c/100,k)}});return it}
function logsq(v,k,o){var s=Math.max(3,6+14*Math.log10(Math.max(v,10)/100));return[{w:s,h:s,n:1,d:function(x,y){return R(x,y,s,s,k,1.5)}}]}
function cash(v,k,o){var den=[500,200,100,50,20,10],r=Math.round(v),it=[],cnt=0,extra=0;den.forEach(function(dn){var n=Math.floor(r/dn);r-=n*dn;for(var i=0;i<n;i++){if(cnt>=36){extra++;continue}cnt++;(function(dn){it.push(dn>=100?{w:13,h:7,n:1,d:function(x,y){return R(x,y,13,7,k+' dn'+dn,1)+L(x+3.5,y+1.5,x+3.5,y+5.5,'notch')}}:{w:6,h:7,n:1,d:function(x,y){return C(x+3,y+4,dn==50?3:dn==20?2.6:2.2,k+' dn'+dn)}})})(dn)}});
 if(extra)it.push({w:30,h:8,n:extra,d:function(x,y){return Tx(x,y+7,'+'+extra)}});if(r>0&&!it.length)it.push({w:6,h:7,n:1,d:function(x,y){return C(x+3,y+4,1.6,k+' dn10')}});return it}
function lego(v,k,o){return ctpb('plate',1)(v,k,o)}
function abacus(v,k,o){var r=Math.round(v/10),digs=[],lab=['10','100','1k','10k','1L'],i;for(i=0;i<5;i++){digs.push(r%10+(i==4?Math.floor(r/10)*10:0));r=Math.floor(r/10)}var top=4;while(top>0&&!digs[top])top--;var n=top+1;
 return[{w:n*13,h:42,n:digs.slice(0,n).reduce(function(a,b){return a+b},0),d:function(x,y){var s='';for(var j=0;j<n;j++){var di=n-1-j,cx=x+j*13+6;s+=L(cx,y,cx,y+33,'rod');for(var b=0;b<Math.min(digs[di],9);b++)s+=R(cx-4.5,y+30-b*3.3,9,2.8,k,1.4);s+=Tx(cx,y+41,lab[di],'lbl mid')}return s}}]}
function unitword(v,k,o){var d=dec(v),it=[];if(v<1000||o.flat)return ctpb('cup')(v,k,o);
 function cnt(n,mk,w,h){return{w:w+22,h:Math.max(h,8),n:1,d:function(x,y){return mk.d(x,y)+Tx(x+w+3,y+Math.min(h,8)+ (h>8?(h-8)/2:0),'×'+n,'lbl cnt')}}}
 if(d.B){var bb=block(k);bb={w:24,h:24,n:1,d:function(x,y){return R(x,y,24,24,k,2)}};it.push(cnt(d.B,bb,24,24))}
 if(d.P){it.push(cnt(d.P,{d:function(x,y){return R(x,y+1,BW*.6,T,k,T/2)}},BW*.6,8))}
 var g=tilegrid(d.T,k,'cup',d.c/100);if(g)it.push(g);return it}
function zoom(v,k,o){var lv=o.lv||0;if(o.flat)return ctpb('cup')(v,k,o);
 if(lv==1)return ctpb('cup')(v,k,o);
 if(lv==2){var c=Math.round(v)%100,n=Math.round(c/10);return[{w:54,h:30,n:1,d:function(x,y){var s=R(x,y,30,30,'o '+k,3),i;for(i=0;i<10;i++){var cx=x+4+(i%5)*5.5,cy=y+21-Math.floor(i/5)*12;s+=R(cx,cy,4.4,8,i<n?k:'gh',1)}return s+Tx(x+34,y+12,'₹'+c,'lbl')+Tx(x+34,y+22,'zoomed','lbl sm')}}]}
 var d=dec(v),it=[],i;if(v<1000)return ctpb('cup')(v,k,o);
 for(i=0;i<d.B;i++)it.push(block(k));var rem=v%10000,np=Math.floor(rem/1000),fr=(rem%1000)/1000;
 if(np||fr)it.push({w:BW,h:(np+(fr>0?1:0))*P-G,n:np+(fr>0?1:0),d:function(x,y){var s='',j;for(j=0;j<np;j++)s+=R(x,y+j*P,BW,T,k,T/2)+L(x+5*P-G/2+1,y+j*P+1,x+5*P-G/2+1,y+j*P+T-1,'notch');if(fr>0)s+=R(x,y+np*P,BW,T,'o '+k,T/2)+R(x,y+np*P,Math.max(T,BW*fr),T,k,T/2);return s}});return it}
var ctx={};
function adaptive(v,k,o){return (o.ctx==='spend'||k==='x'||o.flat)?ctpb('cup')(v,k,o):rounded(v,k,o)}

var SYS=[
 {id:'R1',name:'Crumb · Tile · Pill · Block',rule:'A square is ₹100; a bar is ten of them, a big square is a hundred; a dot is loose change.',desc:'Greedy base-10 (Dienes blocks). Crumb = a dot whose area is the share of ₹100.',f:ctpb('dot')},
 {id:'R2',name:'Snapping crumbs',rule:'Small change shows as quarter-squares; four quarters snap into a full ₹100 square.',desc:'R1 with the remainder drawn as ₹25 quarters in the tile slot. Built for the accumulate animation.',f:ctpb('quart')},
 {id:'R3',name:'Semantic zoom',rule:'Cards show bars and blocks; tap to see the squares; tap again to see the last square in ₹10s.',desc:'Three levels. Level 0 rounds below ₹1,000 into a part-filled bar. Tap any cell here to zoom.',f:zoom,zoom:1},
 {id:'R4',name:'Cup tile (fill level)',rule:'A ₹100 square fills like a cup; a half-full square is ₹50.',desc:'R1 layout, but the remainder is a tile outline filled from the bottom (height = share of ₹100).',f:ctpb('cup')},
 {id:'R5',name:'Ten-frame tile',rule:'A ₹100 square has ten ₹10 dots; lit dots are what you have.',desc:'Remainder tile is a 2×5 frame of ₹10 dots. Needs a large tile to read.',f:ctpb('ten')},
 {id:'R6',name:'Stacked 3D (Dienes cubes)',rule:'Small cube ₹100, tower ₹1,000, slab ₹10,000, big cube ₹1,00,000.',desc:'Volume-based place value. Fewest marks; volume is badly judged by eye.',f:iso},
 {id:'R7',name:'Rounded + exact on tap',rule:'Each square is ₹100, rounded to the nearest one; tap for the exact amount.',desc:'R1 with no crumbs. ₹10 and ₹25 show an empty dashed square.',f:rounded},
 {id:'R8',name:'Count label hybrid',rule:'Squares up to ₹1,000; above that one bar or block with a ×count.',desc:'Tiles under ₹1,000, then a single symbol + count. Puts a number on the surface.',f:unitword},
 {id:'R9',name:'Container icons',rule:'Square ₹100, box ₹1,000, crate ₹10,000.',desc:'Isotype-style icons in one colour family. Icons are not sized to value.',f:boxes},
 {id:'R10',name:'Log-scaled single tile',rule:'Bigger square, more money (roughly).',desc:'One square sized on a log scale. Fits anything, tells you almost nothing: ₹1,23,000 looks ~3× ₹1,250.',f:logsq},
 {id:'R11',name:'Context-adaptive',rule:'Spending shows change; savings and income round to whole squares.',desc:'Spend screens use R4 (exact cups). Income, savings and goals use R7 (rounded).',f:adaptive},
 {id:'R12',name:'Cash notes',rule:'Draw the notes and coins you would hand over.',desc:'₹500/200/100 notes, ₹50/20/10 coins, greedy. Familiar, but six shapes and hundreds of marks.',f:cash},
 {id:'R13',name:'Lego bricks',rule:'A 1-stud brick is ₹100, a 10-stud brick ₹1,000, a plate ₹10,000.',desc:'R1 with studs; remainder is a thin flat piece. Playful, busier.',f:lego},
 {id:'R14',name:'Abacus place value',rule:'Each rod is a place (₹10 … ₹1L); beads count that digit.',desc:'Digits as beads. Few marks, exact to ₹10, but a bead on one rod is worth 10× the next.',f:abacus}
];
var F=function(a){return '₹'+a.toLocaleString('en-IN')};
var SCN=[
 {t:'₹10',s:[[10,'f']],ctx:'spend'},{t:'₹25 chai',s:[[25,'f']],ctx:'spend'},{t:'₹99',s:[[99,'f']],ctx:'spend'},{t:'₹350 meal',s:[[350,'f']],ctx:'spend'},
 {t:'₹1,250',s:[[1250,'f']],ctx:'spend'},{t:'₹6,350',s:[[6350,'f']],ctx:'spend'},
 {t:'₹9,000 income',sub:'savings ₹1,400 · budget ₹7,600',s:[[1400,'s'],[7600,'f']],ctx:'income'},
 {t:'₹50,000',sub:'savings',wide:1,s:[[50000,'s']],ctx:'save'},{t:'₹1,23,000',sub:'a year of income',wide:1,s:[[123000,'f']],ctx:'income'},
 {t:'Goal ₹8,000 · 52%',sub:'₹4,160 saved',s:[[4160,'s'],[3840,'e']],ctx:'save'},
 {t:'4 × ₹25 chai',sub:'accumulating',anim:[[[25,'f']],[[50,'f']],[[75,'f']],[[100,'f']]],ctx:'spend'},
 {t:'Pay ₹350 from ₹1,500',sub:'the jar breaks',anim:[[[1500,'f']],[[1150,'f'],[350,'x']],[[1150,'f']]],ctx:'spend',flat:1}
];
function render(sys,segs,o){o=o||{};var y=0,out='',W=o.W||236,mw=0,n=0;
 segs.forEach(function(sg,si){var it=sys.f(sg[0],sg[1],o);if(!it.length)return;if(si&&out)y+=6;var x=0,rh=0;
  it.forEach(function(m){if(x>0&&x+m.w>W){x=0;y+=rh+GAP;rh=0}out+=m.d(x+1,y+1);x+=m.w+GAP;rh=Math.max(rh,m.h);mw=Math.max(mw,x);n+=m.n});y+=rh});
 var sc=o.sc||1,w=Math.max(mw,8)+2,h=y+2;
 return{svg:'<svg viewBox="0 0 '+w.toFixed(1)+' '+h.toFixed(1)+'" width="'+(w*sc).toFixed(0)+'" height="'+(h*sc).toFixed(0)+'" role="img" aria-label="'+(o.al||'')+'">'+out+'</svg>',n:n}}
var SC=1.4;
function cell(sys,sc,j){var div=document.createElement('div');div.className='sc rc'+(sc.wide?' wide':'');var lab='<b>'+sc.t+'</b>'+(sc.sub?'<small>'+sc.sub+'</small>':'');
 if(sc.anim){var fr=sc.anim.map(function(f,i){return render(sys,f,{ctx:sc.ctx,flat:sc.flat&&i==1,sc:SC,W:Math.floor(150/SC),al:sc.t})});var mx=Math.max.apply(null,fr.map(function(r){return r.n}));
  div.innerHTML='<div class="sv strip">'+fr.map(function(r,i){return (i?'<span class="arr">→</span>':'')+r.svg}).join('')+'</div>'+lab+'<small class="mk">'+mx+' marks max · <button type="button" class="play">Play</button></small>';
  div.querySelector('.play').onclick=function(){var sv=div.querySelector('.sv'),i=0;sv.classList.add('playing');(function step(){sv.innerHTML='<div class="fr">'+fr[i].svg+'</div>';i++;if(i<fr.length)setTimeout(step,850);else setTimeout(function(){sv.classList.remove('playing');sv.innerHTML=fr.map(function(r,i){return (i?'<span class="arr">→</span>':'')+r.svg}).join('')},1400)})()};return{div:div,n:mx}}
 var lv=0;function draw(){var r=render(sys,sc.s,{ctx:sc.ctx,lv:lv,sc:SC,W:Math.floor((sc.wide?600:280)/SC),al:sc.t});div.innerHTML='<div class="sv">'+r.svg+'</div>'+lab+'<small class="mk">'+r.n+' mark'+(r.n==1?'':'s')+(sys.zoom?' · level '+lv+' (tap)':'')+'</small>';return r.n}
 var n=draw();if(sys.zoom){div.tabIndex=0;div.setAttribute('role','button');div.classList.add('tap');div.onclick=function(){lv=(lv+1)%3;draw()};div.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();div.onclick()}}}return{div:div,n:n}}
function build(){var host=document.getElementById('rsys');host.innerHTML='';var MX={};
 SYS.forEach(function(sys){var a=document.createElement('article');a.className='opt';a.id='o-'+sys.id;
  a.innerHTML='<header><span class="ok">'+sys.id+'</span><h4>'+sys.name+'</h4><span class="tot" data-tot="'+sys.id+'"></span></header><p class="rule">“'+sys.rule+'”</p><p>'+sys.desc+'</p><div class="scs"></div>';
  var g=a.querySelector('.scs'),mx=0,home=0;SCN.forEach(function(sc,j){var c=cell(sys,sc,j);g.appendChild(c.div);mx=Math.max(mx,c.n)});MX[sys.id]=mx;host.appendChild(a)});
 document.querySelectorAll('[data-mx]').forEach(function(td){td.textContent=MX[td.dataset.mx]});window.__MX=MX}
/* playground */
var TOP=[SYS[3],SYS[1],SYS[0]];var amt=6350,busy=0;
function pg(fr){var host=document.getElementById('pgout');host.innerHTML=TOP.map(function(s,i){var r=render(s,fr||[[amt,'f']],{ctx:'spend',sc:1.6,W:170,al:F(amt)});return '<div class="pgc"><div class="pgh"><span class="ok">'+s.id+'</span> '+s.name+'</div><div class="sv">'+r.svg+'</div><small class="mk">'+r.n+' marks</small></div>'}).join('');document.getElementById('pgv').textContent=F(amt)}
function setA(v){amt=Math.max(0,Math.min(500000,Math.round(v)));document.getElementById('pgn').value=amt;document.getElementById('pgs').value=toS(amt);pg()}
function toS(v){return v<=10?0:Math.round(Math.log10(v/10)/4.2*1000)}function fromS(s){return s<=0?10:10*Math.pow(10,s/1000*4.2)}
function move(d){if(busy)return;var to=amt+d;if(to<0)return;busy=1;var frs=d<0?[[[to,'f'],[-d,'x']]]:[[[amt,'f'],[d,'n']]];var i=0;pg(frs[0]);setTimeout(function(){busy=0;setA(to)},1100)}
function init(){build();var n=document.getElementById('pgn'),s=document.getElementById('pgs');n.oninput=function(){setA(+n.value||0)};s.oninput=function(){setA(Math.round(fromS(+s.value)))};
 document.querySelectorAll('[data-mv]').forEach(function(b){b.onclick=function(){move(+b.dataset.mv)}});setA(amt);
 document.querySelectorAll('[data-look2]').forEach(function(b,i,a){b.onclick=function(){a.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});SEC.classList.toggle('bw',b.dataset.look2==='bw')}});
 document.querySelectorAll('[data-sz]').forEach(function(b,i,a){b.onclick=function(){a.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});SC=+b.dataset.sz;build();pg()}})}
init();
})();
