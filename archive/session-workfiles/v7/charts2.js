/* ===== v7 chart primitives (all SVG from live ledger data; every mark has data-t) ===== */
var POOLC={ta:'#c98500',b:'#3987e5',s:'#199e70'};
function poolSegs(p){return [{label:'To assign',val:Math.max(0,p.ta),color:POOLC.ta,g:'↓'},{label:'Budget',val:Math.max(0,p.budget),color:POOLC.b,g:'◐'},{label:'Savings',val:Math.max(0,p.savings),color:POOLC.s,g:'▲'}];}
/* 3-segment pool bar, 2px gaps, direct labels under */
function poolBar(segs,o){o=o||{};var W=o.w||348,H=o.h||20,tot=segs.reduce(function(a,b){return a+b.val;},0)||1,x=0,s=svgOpen(W,H);
 segs.forEach(function(sg,i){var w=sg.val/tot*W,g=gid();if(w<=0)return;var ww=Math.max(1,w-(i<segs.length-1?2:0));
  s+='<rect x="'+P(x)+'" y="0" width="'+P(ww)+'" height="'+H+'" rx="4" fill="'+sg.color+'" data-g="'+g+'"'+T(sg.label+' · '+money(sg.val)+' · '+Math.round(sg.val/tot*100)+'%')+'/>';x+=w;});
 var lab=o.labels?'<div style="display:grid;grid-template-columns:repeat('+segs.length+',1fr);gap:6px;margin-top:6px">'+segs.map(function(sg,i){return '<div style="min-width:0;text-align:'+(i===0?'left':i===segs.length-1?'right':'center')+'"><div style="font-size:10.5px;color:var(--text2);white-space:nowrap"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:'+sg.color+';margin-right:4px"></span>'+(sg.g?sg.g+' ':'')+esc(sg.label)+'</div><div style="font-size:12px;font-weight:650" class="num">'+money(sg.val)+'</div></div>';}).join('')+'</div>':'';
 return '<div class="chart">'+s+'</svg></div>'+lab;}
/* dotted ring: n dots, filled fraction */
function dottedRing(f,o){o=o||{};var S2=o.s||120,n=o.n||60,r=S2/2-6,c=S2/2,s=svgOpen(S2,S2),on=Math.round(Math.max(0,Math.min(1,f))*n),g=gid();
 for(var i=0;i<n;i++){var p=pol(c,c,r,i*360/n);s+='<circle cx="'+P(p[0])+'" cy="'+P(p[1])+'" r="'+(o.dr||2.4)+'" fill="'+(i<on?(o.color||'var(--lime)'):'var(--surface3)')+'"/>';}
 s+='<circle cx="'+c+'" cy="'+c+'" r="'+(r+6)+'" fill="transparent" data-g="'+g+'"'+T(o.tip||Math.round(f*100)+'%')+'/>';
 if(o.center)s+='<text x="'+c+'" y="'+(c+(o.center2?2:6))+'" text-anchor="middle" font-size="'+(o.cfs||22)+'" font-weight="800" fill="var(--text)" pointer-events="none">'+esc(o.center)+'</text>';
 if(o.center2)s+='<text x="'+c+'" y="'+(c+17)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)" pointer-events="none">'+esc(o.center2)+'</text>';
 return '<div class="chart" style="width:'+S2+'px;flex:none">'+s+'</svg></div>';}
/* 10x10 waffle; cells: [{n,color,label,outline}] */
function waffle(cells,o){o=o||{};var d=o.d||6,gp=o.gap||3,W=10*(d+gp),s=svgOpen(W,W),k=0;
 cells.forEach(function(c){var g=gid();for(var i=0;i<c.n&&k<100;i++,k++){var x=(k%10)*(d+gp)+d/2,y=Math.floor(k/10)*(d+gp)+d/2;s+='<circle cx="'+P(x)+'" cy="'+P(y)+'" r="'+d/2+'" '+(c.outline?'fill="none" stroke="'+c.color+'" stroke-width="1.2" stroke-dasharray="1.5 1"':'fill="'+c.color+'"')+' data-g="'+g+'"'+T(c.label)+'/>';}});
 for(;k<100;k++){var x=(k%10)*(d+gp)+d/2,y=Math.floor(k/10)*(d+gp)+d/2;s+='<circle cx="'+P(x)+'" cy="'+P(y)+'" r="'+d/2+'" fill="var(--surface3)"/>';}
 return '<div class="chart" style="width:'+W+'px">'+s+'</svg></div>';}
/* month calendar: days [{d,ts,v,future,today,tip,dot}] */
function monthCal(m,valFn,o){o=o||{};var W=o.w||348,first=new Date(2026,m,1),off=(first.getDay()+6)%7,nd=new Date(2026,m+1,0).getDate(),cw=W/7,ch=o.ch||34,rows=Math.ceil((off+nd)/7),H=16+rows*ch,s=svgOpen(W,H),mx=o.max||1;
 ['M','T','W','T','F','S','S'].forEach(function(l,i){s+='<text x="'+P(i*cw+cw/2)+'" y="10" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+l+'</text>';});
 for(var d=1;d<=nd;d++){var k=off+d-1,x=(k%7)*cw+2,y=16+Math.floor(k/7)*ch+2,ts=new Date(2026,m,d).getTime(),fut=ts>TODAY,tod=ts===TODAY,r=valFn(ts,d),g=gid();
  if(fut)s+='<rect x="'+P(x)+'" y="'+y+'" width="'+P(cw-4)+'" height="'+(ch-4)+'" rx="6" fill="none" stroke="var(--border2)" stroke-dasharray="3 3" data-g="'+g+'"/>';
  else s+='<rect x="'+P(x)+'" y="'+y+'" width="'+P(cw-4)+'" height="'+(ch-4)+'" rx="6" fill="'+(r.fill||seqColor(r.v/mx))+'" data-g="'+g+'"/>';
  if(tod)s+='<rect x="'+P(x-1)+'" y="'+(y-1)+'" width="'+P(cw-2)+'" height="'+(ch-2)+'" rx="7" fill="none" stroke="var(--lime)" stroke-width="2"/>';
  s+='<text x="'+P(x+5)+'" y="'+(y+11)+'" font-size="9.5" fill="'+(fut?'var(--text3)':'var(--text)')+'" pointer-events="none">'+d+'</text>';
  if(r.dot)s+='<circle cx="'+P(x+cw/2-2)+'" cy="'+(y+ch-11)+'" r="'+P(r.dotR||4)+'" fill="'+r.dot+'" pointer-events="none"/>';
  s+='<rect x="'+P(x)+'" y="'+y+'" width="'+P(cw-4)+'" height="'+(ch-4)+'" fill="transparent" data-g="'+g+'"'+T(r.tip||fmtD(ts))+'/>';}
 return '<div class="chart">'+s+'</svg></div>';}
/* stacked area (3 pools over time) */
function stackedArea(series,xl,o){o=o||{};var W=o.w||348,H=o.h||170,pl=34,pr=6,pt=8,pb=18,n=xl.length,tot=[];for(var i=0;i<n;i++)tot.push(series.reduce(function(a,s){return a+Math.max(0,s.vals[i]);},0));
 var mx=Math.max.apply(null,tot)*1.08||1,X=function(i){return pl+i/(n-1)*(W-pl-pr);},Y=function(v){return pt+(1-v/mx)*(H-pt-pb);},s=svgOpen(W,H,'data-scrub="'+(o.id||gid())+'"'),base=new Array(n).fill(0);
 [0,.5,1].forEach(function(k){var v=mx/1.08*k,y=Y(v);s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+P(y)+'" y2="'+P(y)+'" stroke="var(--grid)"/><text x="'+(pl-4)+'" y="'+P(y+3)+'" text-anchor="end" font-size="9.5" fill="var(--text3)">'+kfmt(v)+'</text>';});
 series.forEach(function(se){var top=base.map(function(b,i){return b+Math.max(0,se.vals[i]);}),d='M'+top.map(function(v,i){return P(X(i))+' '+P(Y(v));}).join('L')+'L'+base.map(function(v,i){return i;}).reverse().map(function(i){return P(X(i))+' '+P(Y(base[i]));}).join('L')+'Z';
  s+='<path d="'+d+'" fill="'+se.color+'" fill-opacity=".85" stroke="var(--surface)" stroke-width="1.5"/>';base=top;});
 [0,Math.floor((n-1)/2),n-1].forEach(function(i){s+='<text x="'+P(X(i))+'" y="'+(H-4)+'" text-anchor="'+(i===0?'start':i===n-1?'end':'middle')+'" font-size="9.5" fill="var(--text3)">'+esc(xl[i])+'</text>';});
 var id=gid();s=s.replace(/data-scrub="[^"]*"/,'data-scrub="'+id+'"');
 s+='<line class="sg" x1="0" x2="0" y1="'+pt+'" y2="'+(H-pb)+'" stroke="var(--text2)" style="display:none"/><circle class="sd" r="4" fill="var(--lime)" stroke="var(--surface)" stroke-width="2" style="display:none"/><rect class="sh" x="'+pl+'" y="'+pt+'" width="'+(W-pl-pr)+'" height="'+(H-pt-pb)+'" fill="transparent" style="cursor:crosshair"/>';
 SCRUB[id]={n:n,X:X,Y:Y,W:W,pl:pl,pr:pr,val:function(i){return tot[i];},txt:function(i){return '<b>'+esc(xl[i])+'</b> · Balance '+money(tot[i])+'<br>'+series.map(function(se){return esc(se.label)+' '+money(se.vals[i]);}).join(' · ');}};
 return '<div class="chart" style="touch-action:pan-y">'+s+'</svg></div>';}
/* diverging columns around zero (up = income, down = spend) */
function divCols(rows,o){o=o||{};var W=o.w||348,H=o.h||130,n=rows.length,bw=W/n,mx=Math.max.apply(null,rows.map(function(r){return Math.max(r.up,r.down);}))||1,mid=H/2-4,sc=(H/2-12)/mx,s=svgOpen(W,H);
 s+='<line x1="0" x2="'+W+'" y1="'+mid+'" y2="'+mid+'" stroke="var(--text3)"/>';
 rows.forEach(function(r,i){var x=i*bw+1,w=Math.max(1,bw-2),g=gid();
  if(r.up>0)s+='<rect x="'+P(x)+'" y="'+P(mid-1-r.up*sc)+'" width="'+P(w)+'" height="'+P(r.up*sc)+'" rx="'+Math.min(3,w/2)+'" fill="'+(o.upC||POOLC.ta)+'" data-g="'+g+'"/>';
  if(r.down>0)s+='<rect x="'+P(x)+'" y="'+P(mid+1)+'" width="'+P(w)+'" height="'+P(r.down*sc)+'" rx="'+Math.min(3,w/2)+'" fill="'+(o.downC||POOLC.b)+'" data-g="'+g+'"/>';
  s+='<rect x="'+P(i*bw)+'" y="0" width="'+P(bw)+'" height="'+H+'" fill="transparent" data-g="'+g+'"'+T(r.l+' · in '+money(r.up)+' · out '+money(r.down)+' · net '+(r.up-r.down>=0?'+':'')+money(r.up-r.down))+(r.onclick?' onclick="'+r.onclick+'"':'')+'/>';
  if(r.xl)s+='<text x="'+P(x+w/2)+'" y="'+(H-1)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+esc(r.xl)+'</text>';});
 return '<div class="chart">'+s+'</svg></div>';}
/* pill blocks: horizontal stack of rounded pills sized by value */
function pillBlocks(items,o){o=o||{};var W=o.w||348,H=o.h||28,tot=items.reduce(function(a,b){return a+b.val;},0)||1,x=0,s=svgOpen(W,H+(o.lab?16:0));
 items.forEach(function(it){var w=it.val/tot*W,g=gid();if(w<1)return;s+='<rect x="'+P(x)+'" y="0" width="'+P(Math.max(2,w-3))+'" height="'+H+'" rx="'+Math.min(H/2,w/2)+'" fill="'+it.color+'" data-g="'+g+'"'+T(it.name+' · '+money(it.val)+' · '+Math.round(it.val/tot*100)+'%')+'/>';
  if(o.lab&&w>40)s+='<text x="'+P(x+4)+'" y="'+(H+12)+'" font-size="9.5" fill="var(--text2)" data-g="'+g+'">'+esc(trunc(it.name,Math.floor(w/6)))+'</text>';x+=w;});
 return '<div class="chart">'+s+'</svg></div>';}
/* dumbbell rows: [{name,a,b,color}] */
function dumbbell(rows,o){o=o||{};var W=o.w||348,rh=26,pl=86,H=rows.length*rh+18,mx=Math.max.apply(null,rows.map(function(r){return Math.max(r.a,r.b);}))*1.05||1,X=function(v){return pl+v/mx*(W-pl-10);},s=svgOpen(W,H);
 rows.forEach(function(r,i){var y=10+i*rh+rh/2,g=gid();s+='<text x="0" y="'+(y+3)+'" font-size="11" fill="var(--text2)">'+esc(trunc(r.name,13))+'</text><line x1="'+P(X(Math.min(r.a,r.b)))+'" x2="'+P(X(Math.max(r.a,r.b)))+'" y1="'+y+'" y2="'+y+'" stroke="var(--text3)" stroke-width="2"/>'
  +'<circle cx="'+P(X(r.a))+'" cy="'+y+'" r="5" fill="none" stroke="'+r.color+'" stroke-width="2" data-g="'+g+'"/><circle cx="'+P(X(r.b))+'" cy="'+y+'" r="5.5" fill="'+r.color+'" stroke="var(--surface)" stroke-width="2" data-g="'+g+'"/>'
  +'<rect x="'+pl+'" y="'+(y-rh/2)+'" width="'+(W-pl)+'" height="'+rh+'" fill="transparent" data-g="'+g+'"'+T(r.name+' · '+(o.la||'Aug')+' '+money(r.a)+' → '+(o.lb||'Sep')+' '+money(r.b)+' · '+(r.b>=r.a?'+':'−')+money(Math.abs(r.b-r.a)))+'/>';});
 s+='<text x="'+pl+'" y="'+(H-2)+'" font-size="9.5" fill="var(--text3)">○ '+(o.la||'Aug 1–24')+'   ● '+(o.lb||'Sep 1–24')+'</text>';
 return '<div class="chart">'+s+'</svg></div>';}
/* hbar ranked */
function hbars(rows,o){o=o||{};var W=o.w||348,rh=22,pl=o.pl||104,H=rows.length*rh,mx=Math.max.apply(null,rows.map(function(r){return r.v;}))||1,s=svgOpen(W,H);
 rows.forEach(function(r,i){var y=i*rh,w=r.v/mx*(W-pl-56),g=gid();s+='<text x="0" y="'+(y+14)+'" font-size="11" fill="var(--text2)">'+esc(trunc(r.n,16))+'</text><rect x="'+pl+'" y="'+(y+5)+'" width="'+P(Math.max(2,w))+'" height="12" rx="4" fill="'+(r.c||'var(--s1)')+'" data-g="'+g+'"/><text x="'+P(pl+w+6)+'" y="'+(y+15)+'" font-size="10.5" fill="var(--text)" data-g="'+g+'">'+(r.lab||money(r.v))+'</text><rect x="0" y="'+y+'" width="'+W+'" height="'+rh+'" fill="transparent" data-g="'+g+'"'+T(r.tip||r.n+' · '+money(r.v))+'/>';});
 return '<div class="chart">'+s+'</svg></div>';}
/* simple donut (ranked sequential) */
function donut(items,o){o=o||{};var S2=o.s||110,c=S2/2,r1=S2/2-4,r0=r1-(o.sw||16),tot=items.reduce(function(a,b){return a+b.val;},0)||1,a=0,s=svgOpen(S2,S2);
 items.forEach(function(it){var a1=a+360*it.val/tot,g=gid();if(it.val>0)s+='<path d="'+wedge(c,c,r0,r1,a+.8,a1-.8)+'" fill="'+it.color+'" data-g="'+g+'"'+T(it.name+' · '+money(it.val)+' · '+Math.round(it.val/tot*100)+'%')+'/>';a=a1;});
 if(o.center)s+='<text x="'+c+'" y="'+(c+5)+'" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">'+esc(o.center)+'</text>';
 return '<div class="chart" style="width:'+S2+'px;flex:none">'+s+'</svg></div>';}
/* Sankey: cols of nodes [{id,label,val,color}], links [{s,t,v}] */
function sankey(cols,links,o){o=o||{};var W=o.w||348,H=o.h||300,nw=8,gap=8,cx=cols.map(function(c,i){return i*(W-nw-(o.pr||86))/(cols.length-1);}),pos={},s=svgOpen(W,H,'class="sankey"');
 var tot=Math.max.apply(null,cols.map(function(c){return c.reduce(function(a,n){return a+n.val;},0);})),sc=(H-gap*8)/tot;
 cols.forEach(function(c,ci){var y=0;c.forEach(function(n){var h=Math.max(2,n.val*sc);pos[n.id]={x:cx[ci],y:y,h:h,oy:y,iy:y,n:n};y+=h+gap;});});
 links.forEach(function(l){var a=pos[l.s],b=pos[l.t];if(!a||!b||l.v<=0)return;var h=l.v*sc,y0=a.oy+h/2,y1=b.iy+h/2,x0=a.x+nw,x1=b.x,mx=(x0+x1)/2,g=gid();a.oy+=h;b.iy+=h;
  s+='<path d="M'+P(x0)+' '+P(y0)+'C'+P(mx)+' '+P(y0)+','+P(mx)+' '+P(y1)+','+P(x1)+' '+P(y1)+'" stroke="'+(l.dash?'var(--text2)':a.n.color)+'" stroke-opacity="'+(l.dash?.7:.35)+'" stroke-width="'+P(Math.max(1,h))+'" fill="none" '+(l.dash?'stroke-dasharray="4 3"':'')+' data-g="'+g+'"'+T(a.n.label+' → '+b.n.label+' · '+money(l.v))+'/>';});
 Object.keys(pos).forEach(function(k){var p=pos[k],g=gid(),last=p.x>W/2;s+='<rect x="'+P(p.x)+'" y="'+P(p.y)+'" width="'+nw+'" height="'+P(p.h)+'" rx="2" fill="'+p.n.color+'" data-g="'+g+'"'+T(p.n.label+' · '+money(p.n.val))+'/>';
  if(p.h>=9||o.allLabels)s+='<text x="'+P(last?p.x+nw+4:p.x+nw+4)+'" y="'+P(p.y+Math.min(p.h/2+4,p.h+8))+'" font-size="9.5" fill="var(--text)">'+esc(p.n.label)+' <tspan fill="var(--text3)">'+kfmt(p.n.val)+'</tspan></text>';});
 return '<div class="chart">'+s+'</svg></div>';}
/* 12-cell pictogram (subs) */
function pict12(s2,o){o=o||{};var W=o.w||300,cw=W/12,s=svgOpen(W,34);for(var i=0;i<12;i++){var m=new Date(2026,i,1).getTime(),c=subCharges(s2,m,new Date(2026,i+1,1).getTime()-1),g=gid(),fut=m>TODAY;
  s+='<rect x="'+P(i*cw+1)+'" y="4" width="'+P(cw-3)+'" height="16" rx="4" '+(c.length?(fut?'fill="none" stroke="var(--s6)" stroke-dasharray="3 2"':'fill="var(--s6)"'):'fill="var(--surface3)"')+' data-g="'+g+'"'+T(MON[i]+' · '+(c.length?money(priceAt(s2,c[0]))+(fut?' expected':' paid'):'no charge'))+'/><text x="'+P(i*cw+cw/2)+'" y="32" text-anchor="middle" font-size="8.5" fill="var(--text3)">'+MON[i][0]+'</text>';}
 return '<div class="chart">'+s+'</svg></div>';}
