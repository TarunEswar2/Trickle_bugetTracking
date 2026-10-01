/* ===== chart components: every function returns SVG/HTML computed from data.
   Marks carry data-t (tooltip text) + data-g (group for dimming siblings). ===== */
var ICONS={
 food:'M4 11h16a8 8 0 01-16 0zM8 7.5c0-1 1-1.2 1-2.5M12 7.5c0-1 1-1.2 1-2.5M16 7.5c0-1 1-1.2 1-2.5',
 cup:'M5 8h11v6a5 5 0 01-5 5h-1a5 5 0 01-5-5zM16 10h2a2 2 0 010 4h-2M8 3v2.5M11 3v2.5',
 bag:'M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2',
 bus:'M6 4h12a1 1 0 011 1v11H5V5a1 1 0 011-1zM5 11h14M8 16v3M16 16v3',
 plus:'M9 4h6v5h5v6h-5v5H9v-5H4V9h5z',
 pen:'M4 20l4-1 11-11-3-3L5 16zM14 7l3 3',
 shield:'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z',
 other:'M6 12h.5M12 12h.5M18 12h.5',
 tag:'M3 12V4h8l10 10-8 8zM7.5 7.5h.01',
 bike:'M3 17a3 3 0 106 0 3 3 0 00-6 0zM15 17a3 3 0 106 0 3 3 0 00-6 0zM6 17l4-7h5l3 7M10 10L8.5 7H6.5M14 7h2.5',
 sun:'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5',
 head:'M4 16v-4a8 8 0 0116 0v4M4 15h3v5H4zM17 15h3v5h-3z',
 book:'M4 5a2 2 0 012-2h13v15H6a2 2 0 00-2 2zM4 20V5M19 18v3H6',
 music:'M9 18V5l11-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM20 16a3 3 0 11-6 0 3 3 0 016 0z',
 cloud:'M7 18h10a4 4 0 000-8 6 6 0 00-11.5 1.5A3.5 3.5 0 007 18z',
 box:'M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8',
 gym:'M3 10v4M6 7.5v9M18 7.5v9M21 10v4M6 12h12',
 phone:'M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2',
 bell:'M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 20a2 2 0 004 0',
 user:'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1-4 4-6 8-6s7 2 8 6',
 cam:'M4 8h4l2-2h4l2 2h4v11H4zM12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z',
 qr:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18h2',
 bankI:'M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18',
 drop:'M12 3c3 4.5 6 7.5 6 11a6 6 0 01-12 0c0-3.5 3-6.5 6-11z',
 edit:'M12 5v14M5 12h14',
 rise:'M3 18h18M6 18a6 6 0 0112 0M12 5v3M4.5 10l1.8 1.3M19.5 10l-1.8 1.3',
 moon:'M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z',
 dusk:'M3 18h18M6 18a6 6 0 0112 0M12 12V5M9 9l3 3 3-3',
 check:'M5 12.5l4.5 4.5L19 7.5',
 lock:'M5 11h14v10H5zM8 11V8a4 4 0 018 0v3',
 search:'M11 17a6 6 0 100-12 6 6 0 000 12zM20 20l-4.5-4.5',
 gear:'M12 15a3 3 0 100-6 3 3 0 000 6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
 home:'M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',
 pie:'M12 3v9h9A9 9 0 1112 3zM15 3.5A8.5 8.5 0 0120.5 9H15z',
 spark:'M3 17l5-6 4 3 5-8 4 5',
 piggy:'M5 11a7 6 0 0114 0v4l-2 1v3h-3v-2h-4v2H7v-3a6 6 0 01-2-5zM3 10l2 1M15 9h.01'
};
function icon(n,s,c,sw){s=s||16;return '<svg class="ico" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="'+(c||'currentColor')+'" stroke-width="'+(sw||1.8)+'" stroke-linecap="round" stroke-linejoin="round"><path d="'+(ICONS[n]||ICONS.other)+'"/></svg>';}
function iconG(n,x,y,s,c,extra){var k=s/24;return '<g '+(extra||'')+' transform="translate('+(x-s/2).toFixed(1)+','+(y-s/2).toFixed(1)+') scale('+k.toFixed(3)+')" fill="none" stroke="'+c+'" stroke-width="'+(1.6/k).toFixed(2)+'" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"><path d="'+(ICONS[n]||ICONS.other)+'"/></g>';}
function money(n){n=Math.round(+n||0);return (n<0?'−':'')+RUPEE+Math.abs(n).toLocaleString('en-IN');}
function kfmt(n){n=Math.round(n);return n>=1000?RUPEE+(n/1000).toFixed(n>=10000?0:1).replace('.0','')+'k':RUPEE+n;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function pct(a,b){return b?Math.round(a/b*100):0;}
var _gid=0;function gid(){return 'g'+(++_gid);}
function T(s){return ' data-t="'+esc(s)+'"';}
function P(a,d){return a.toFixed(d==null?1:d);}
/* polar: 0deg = 12 o'clock, clockwise */
function pol(cx,cy,r,deg){var a=(deg-90)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
function arc(cx,cy,r,a0,a1){if(a1-a0>=359.99)a1=a0+359.99;var p0=pol(cx,cy,r,a0),p1=pol(cx,cy,r,a1);return 'M'+P(p0[0])+' '+P(p0[1])+'A'+r+' '+r+' 0 '+(a1-a0>180?1:0)+' 1 '+P(p1[0])+' '+P(p1[1]);}
function wedge(cx,cy,r0,r1,a0,a1){if(a1-a0>=359.99)a1=a0+359.99;var p0=pol(cx,cy,r1,a0),p1=pol(cx,cy,r1,a1),p2=pol(cx,cy,r0,a1),p3=pol(cx,cy,r0,a0),L=a1-a0>180?1:0;
 return 'M'+P(p0[0])+' '+P(p0[1])+'A'+r1+' '+r1+' 0 '+L+' 1 '+P(p1[0])+' '+P(p1[1])+(r0>0?'L'+P(p2[0])+' '+P(p2[1])+'A'+r0+' '+r0+' 0 '+L+' 0 '+P(p3[0])+' '+P(p3[1]):'L'+cx+' '+cy)+'Z';}
function svgOpen(w,h,extra){return '<svg width="100%" viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px" '+(extra||'')+'>';}
function statusOf(ratio,paceRatio){ /* ratio = spent/budget, pace = projected/budget */
 if(ratio>1)return 'critical'; if(paceRatio!=null&&paceRatio>1.02)return 'serious'; if(ratio>.8)return 'warning'; return 'good';}
function statusTag(k,word){var s=STATUS[k];return '<span class="status"><i style="color:'+s.c+'">'+s.i+'</i>'+(word||s.w)+'</span>';}
function trunc(s,n){return s.length>n?s.slice(0,n-1)+'…':s;}

/* ---------- 1. Concentric radial arcs (Ref 1): common scale 0-100% = 0-270deg ---------- */
function radialArcs(items,o){
 o=o||{};var W=o.w||320,H=o.h||(o.w||320),cx=W/2,cy=H/2,R0=o.r||Math.min(W,H)/2-8,sw=o.sw||10,gap=o.gap||4;
 var tot=items.reduce(function(a,b){return a+b.val;},0);
 var list=items.slice().sort(function(a,b){return b.val-a.val;});
 if(list.length>7){var rest=list.slice(6);list=list.slice(0,6);list.push({name:'Other',val:rest.reduce(function(a,b){return a+b.val;},0),color:SLOT.other,icon:'other',tipX:rest.map(function(r){return r.name;}).join(', ')});}
 var s=svgOpen(W,H,'class="rings"');
 list.forEach(function(it,i){
  var r=R0-i*(sw+gap),sh=tot?it.val/tot:0,a1=270*sh,g=gid();
  s+='<path d="'+arc(cx,cy,r,0,270)+'" stroke="'+(o.ghost?'var(--ghost)':'var(--surface2)')+'" stroke-width="'+sw+'" fill="none" stroke-linecap="round" opacity="'+(o.ghost?.5:1)+'"/>';
  var tip=it.tip||(it.name+' · '+(o.fmt?o.fmt(it):money(it.val))+' · '+Math.round(sh*100)+'% · '+(o.period||'this month'));
  if(a1>.5)s+='<path class="grow" d="'+arc(cx,cy,r,0,Math.max(a1,1))+'" stroke="'+(o.ghost?it.color:it.color)+'" stroke-opacity="'+(o.ghost?.55:1)+'" stroke-width="'+sw+'" fill="none" stroke-linecap="round" data-g="'+g+'"/>';
  s+='<path d="'+arc(cx,cy,r,0,Math.max(a1,8))+'" stroke="transparent" stroke-width="'+Math.max(sw+gap,14)+'" fill="none" data-g="'+g+'"'+T(tip)+(it.dbl?' data-dbl="'+esc(it.dbl)+'"':'')+'/>';
  /* label at ring start (12 o'clock, left of arc): icon + % + name */
  var avail=(cx-6)-(cx-r*.92), lab=Math.round(sh*100)+'%', nm=o.noNames?'':it.name.split('/')[0];if(nm.length>Math.floor((r-40)/5.6))nm='';
  s+='<text x="'+(cx-8)+'" y="'+(cy-r+3.5)+'" text-anchor="end" font-size="9.5" fill="var(--text2)" data-g="'+g+'"><tspan fill="var(--text)" font-weight="600">'+lab+'</tspan>'+(nm?' '+esc(nm):'')+'</text>';
  var tw=(lab.length+(nm?nm.length+1:0))*5.3;
  s+=iconG(it.icon,cx-8-tw-8,cy-r,10,it.color,'data-g="'+g+'"');
 });
 if(o.center)s+='<text x="'+cx+'" y="'+(cy+(o.center2?-2:5))+'" text-anchor="middle" font-size="'+(o.cfs||18)+'" font-weight="700" fill="var(--text)">'+esc(o.center)+'</text>';
 if(o.center2)s+='<text x="'+cx+'" y="'+(cy+13)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+esc(o.center2)+'</text>';
 return '<div class="chart">'+s+'</svg></div>';}

/* ---------- 2. Pie with leader-line callouts (Ref 2) ---------- */
function pieCallouts(items,o){
 o=o||{};var W=o.w||348,H=o.h||200,cx=W/2,cy=H/2,r=o.r||64;
 var tot=items.reduce(function(a,b){return a+b.val;},0)||1,list=items.filter(function(x){return x.val>0||x.keep;});
 var main=list.filter(function(x){return !x.fixed;}).sort(function(a,b){return b.val-a.val;}),fixed=list.filter(function(x){return x.fixed;});
 var ms=o.maxSlices||5;if(main.length>ms+1){var rest=main.slice(ms);main=main.slice(0,ms).concat([{name:'Other',val:rest.reduce(function(a,b){return a+b.val;},0),color:SLOT.other,icon:'other'}]);}
 list=main.concat(fixed);
 var s=svgOpen(W,H),a=0,labs=[];
 list.forEach(function(it,i){var sh=it.val/tot,a1=a+360*sh,g=gid(),mid=(a+a1)/2;
  if(sh>0){s+='<path d="'+wedge(cx,cy,o.inner||0,r,a,a1)+'" fill="'+it.color+'" stroke="var(--surface)" stroke-width="2" data-g="'+g+'"'+T(it.tip||(it.name+' · '+money(it.val)+' · '+Math.round(sh*100)+'%'+(o.period?' · '+o.period:'')))+(it.onclick?' onclick="'+it.onclick+'"':'')+(it.dbl?' data-dbl="'+esc(it.dbl)+'"':'')+(it.attr||'')+'/>';
   labs.push({it:it,g:g,mid:mid,sh:sh});}
  a=a1;});
 /* callouts: side by mid angle, vertical relaxation min 28px */
 var L=[],Rr=[];labs.forEach(function(l){var p=pol(cx,cy,r+2,l.mid);l.px=p[0];l.py=p[1];l.y=pol(cx,cy,r+14,l.mid)[1];(l.mid<180?Rr:L).push(l);});
 [L,Rr].forEach(function(side){side.sort(function(a,b){return a.y-b.y;});
  for(var k=0;k<30;k++){for(var i=1;i<side.length;i++){var d=side[i].y-side[i-1].y;if(d<28){var m=(28-d)/2;side[i].y+=m;side[i-1].y-=m;}}
   side.forEach(function(l){l.y=Math.max(14,Math.min(H-16,l.y));});}});
 labs.forEach(function(l){var right=l.mid<180,ex=right?cx+r+18:cx-r-18,tx=right?ex+6:ex-6,anc=right?'start':'end';
  var e=pol(cx,cy,r+8,l.mid);
  s+='<path d="M'+P(l.px)+' '+P(l.py)+'L'+P(e[0])+' '+P(e[1])+'L'+P(ex)+' '+P(l.y)+'" stroke="var(--text3)" fill="none" stroke-width="1" data-g="'+l.g+'"/>';
  var ix=right?tx+6:tx-6;
  s+=iconG(l.it.icon,ix,l.y-5,11,l.it.color,'data-g="'+l.g+'"');
  var nx=right?tx+15:tx-15;
  s+='<text x="'+nx+'" y="'+(l.y-1)+'" text-anchor="'+anc+'" font-size="11" fill="var(--text2)" data-g="'+l.g+'">'+esc(trunc(l.it.name.split('/')[0],Math.floor(((right?W-nx:nx))/6.3)))+'</text>';
  s+='<text x="'+nx+'" y="'+(l.y+12)+'" text-anchor="'+anc+'" font-size="11" font-weight="600" fill="var(--text)" data-g="'+l.g+'">'+(o.valFmt?o.valFmt(l.it):money(l.it.val))+' · '+Math.round(l.sh*100)+'%</text>';});
 if(o.center)s+='<text x="'+cx+'" y="'+(cy+5)+'" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">'+esc(o.center)+'</text>';
 return '<div class="chart">'+s+'</svg></div>';}

/* ---------- 3. Fill jars: per category, 6 month cells, fill = spend / budget ---------- */
function fillJars(cols,months,o){
 o=o||{};var notch='',n=cols.length,W=o.w||348,ax=30,cw=Math.min(36,(W-ax)/n-8),step=(W-ax)/n,ch=17,g2=3,top=24,H=top+months.length*(ch+g2)+30;
 var s=svgOpen(W,H);
 months.forEach(function(m,j){var y=top+(months.length-1-j)*(ch+g2);s+='<text x="0" y="'+(y+12)+'" font-size="9.5" fill="var(--text3)">'+m+'</text>';});
 cols.forEach(function(c,i){var x=ax+i*step+(step-cw)/2;
  s+='<text x="'+(x+cw/2)+'" y="12" text-anchor="middle" font-size="9.5" font-weight="600" fill="var(--text)">'+c.share+'%</text>';
  c.cells.forEach(function(v,j){var y=top+(months.length-1-j)*(ch+g2),f=Math.min(1,v.budget?v.spent/v.budget:0),g=gid(),fh=f*ch;
   s+='<rect x="'+P(x)+'" y="'+y+'" width="'+P(cw)+'" height="'+ch+'" rx="3" fill="var(--surface3)" data-g="'+g+'"/>';
   if(fh>0)s+='<rect x="'+P(x)+'" y="'+P(y+ch-fh)+'" width="'+P(cw)+'" height="'+P(fh)+'" rx="3" fill="'+c.color+'" data-g="'+g+'"/>';
   if(v.spent>v.budget)notch+='<path d="M'+P(x+cw/2-6)+' '+(y+3)+'l6 -7 6 7z" fill="var(--critical)" stroke="var(--surface)" stroke-width="1.5" data-g="'+g+'" pointer-events="none"/>';
   s+='<rect x="'+P(x-(step-cw)/2+1)+'" y="'+(y-1)+'" width="'+P(step-2)+'" height="'+(ch+g2)+'" fill="transparent" data-g="'+g+'"'+T(months[j]+' · '+c.name+' '+money(v.spent)+' of '+money(v.budget)+' ('+pct(v.spent,v.budget)+'%)'+(v.spent>v.budget?' ▲ over':''))+'/>';});
  s+=iconG(c.icon,x+cw/2,H-14,13,c.color);});
 s+=notch;
 return '<div class="chart">'+s+'</svg></div>';}

/* ---------- 4. Half-donut (Ref 4) ---------- */
function halfDonut(val,max,o){
 o=o||{};var W=o.w||240,r=o.r||96,sw=o.sw||16,cx=W/2,cy=r+sw/2+6,H=cy+sw/2+16;
 var f=max>0?Math.min(1,val/max):1,col=o.color||'var(--accent)',g=gid();
 var s=svgOpen(W,H);
 s+='<path d="'+arc(cx,cy,r,-90,90)+'" stroke="'+(o.ghost?'var(--ghost)':'var(--surface2)')+'" stroke-width="'+sw+'" fill="none" stroke-linecap="round"/>';
 if(f>0)s+='<path class="grow" d="'+arc(cx,cy,r,-90,-90+180*Math.max(f,.01))+'" stroke="'+col+'" stroke-width="'+sw+'" fill="none" stroke-linecap="round" data-g="'+g+'"/>';
 s+='<path d="'+arc(cx,cy,r,-90,90)+'" stroke="transparent" stroke-width="'+(sw+14)+'" fill="none" data-g="'+g+'"'+T(o.tip||'')+'/>';
 if(o.hero)s+='<text x="'+cx+'" y="'+(cy-22)+'" text-anchor="middle" font-size="'+(o.hfs||30)+'" font-weight="700" fill="var(--text)">'+esc(o.hero)+'</text>';
 if(o.sub)s+='<text x="'+cx+'" y="'+(cy-4)+'" text-anchor="middle" font-size="11" fill="var(--text3)">'+esc(o.sub)+'</text>';
 s+='<text x="'+(cx-r)+'" y="'+(cy+sw/2+13)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+(o.l0||'₹0')+'</text><text x="'+(cx+r)+'" y="'+(cy+sw/2+13)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+esc(o.l1||'')+'</text>';
 return '<div class="chart">'+s+'</svg></div>';}

/* ---------- small helpers ---------- */
function sparkline(vals,o){o=o||{};var w=o.w||80,h=o.h||28;if(!vals.length)return '';var mx=Math.max.apply(null,vals)||1,mn=0;
 var st=vals.length>1?(w-4)/(vals.length-1):0;var pts=vals.map(function(v,i){return [2+i*st,h-3-(v-mn)/(mx-mn||1)*(h-6)];});
 var s='<svg width="100%" height="'+h+'" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none" style="display:block"><polyline points="'+pts.map(function(p){return P(p[0])+','+P(p[1]);}).join(' ')+'" fill="none" stroke="'+(o.color||'var(--text2)')+'" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';
 var l=pts[pts.length-1];s+='<circle cx="'+P(l[0])+'" cy="'+P(l[1])+'" r="2.4" fill="var(--accent)"/></svg>';return s;}
/* bullet: segments [{val,color,label}], budget, pace tick (0..1 of budget), threshold tick */
function bullet(segs,budget,o){
 o=o||{};var W=o.w||348,H=o.h||30,bh=o.bh||14,y=(H-bh)/2,tot=segs.reduce(function(a,b){return a+b.val;},0),max=Math.max(budget,tot)*1.0||1;
 var s=svgOpen(W,H+(o.axis?14:0)),x=0;
 s+='<rect x="0" y="'+y+'" width="'+W+'" height="'+bh+'" rx="4" fill="var(--surface2)"/>';
 segs.forEach(function(sg,i){if(sg.val<=0)return;var w=sg.val/max*W,g=gid();
  s+='<rect x="'+P(x+(i?1:0))+'" y="'+y+'" width="'+P(Math.max(1,w-(i?1:0)))+'" height="'+bh+'" rx="'+(i===0||i===segs.length-1?4:1)+'" fill="'+sg.color+'" '+(sg.pattern?'fill-opacity=".55" stroke="'+sg.color+'" stroke-dasharray="3 2"':'')+' data-g="'+g+'"/>';
  s+='<rect x="'+P(x)+'" y="0" width="'+P(Math.max(w,16))+'" height="'+H+'" fill="transparent" data-g="'+g+'"'+T(sg.label+' · '+money(sg.val)+(budget?' · '+pct(sg.val,budget)+'% of budget':''))+'/>';x+=w;});
 if(budget&&budget<max){var bx=budget/max*W;s+='<rect x="'+P(bx-1)+'" y="1" width="2" height="'+(H-2)+'" fill="var(--text)"/>';}
 else if(budget){s+='<rect x="'+(W-2)+'" y="1" width="2" height="'+(H-2)+'" fill="var(--text)"/>';}
 if(o.pace!=null){var px=Math.min(1,o.pace)*budget/max*W;s+='<path d="M'+P(px)+' '+(y-5)+'v'+(bh+10)+'" stroke="var(--text2)" stroke-width="1.5" stroke-dasharray="2 2"/><rect x="'+P(px-8)+'" y="0" width="16" height="'+H+'" fill="transparent"'+T('Pace · '+Math.round(o.pace*100)+'% of the period elapsed · even pace = '+money(o.pace*budget))+'/>';}
 if(o.thresh!=null){var tx=o.thresh*budget/max*W;s+='<path d="M'+P(tx)+' '+(y-4)+'v'+(bh+8)+'" stroke="var(--warning)" stroke-width="2"/><rect x="'+P(tx-8)+'" y="0" width="16" height="'+H+'" fill="transparent"'+T('Nudge at '+Math.round(o.thresh*100)+'% · '+money(o.thresh*budget))+'/>';}
 if(o.axis){s+='<text x="0" y="'+(H+11)+'" font-size="9.5" fill="var(--text3)">₹0</text><text x="'+(budget<max?budget/max*W:W)+'" y="'+(H+11)+'" text-anchor="'+(budget<max?'middle':'end')+'" font-size="9.5" fill="var(--text3)">Budget '+money(budget)+'</text>';}
 return '<div class="chart">'+s+'</svg></div>';}
/* 100% stacked bar */
function hundredBar(segs,o){o=o||{};var W=o.w||348,H=o.h||16,tot=segs.reduce(function(a,b){return a+b.val;},0)||1,x=0,s=svgOpen(W,H);
 segs.forEach(function(sg,i){var w=sg.val/tot*W,g=gid();if(w<=0)return;
  s+='<rect x="'+P(x)+'" y="0" width="'+P(Math.max(1,w-2))+'" height="'+H+'" rx="3" fill="'+sg.color+'" '+(sg.hi===false?'fill-opacity=".35"':'')+' data-g="'+g+'"'+T(sg.label+' · '+(sg.fmt||money(sg.val))+' · '+Math.round(sg.val/tot*100)+'%')+(sg.onclick?' onclick="'+sg.onclick+'"':'')+'/>';x+=w;});
 return '<div class="chart">'+s+'</svg></div>';}
function microBar(v,max,o){o=o||{};var W=o.w||80,f=max?Math.min(1,v/max):0;return '<div class="chart" style="width:'+W+'px"><svg width="'+W+'" height="8" viewBox="0 0 '+W+' 8"><rect width="'+W+'" height="8" rx="3" fill="var(--surface2)"/><rect width="'+P(Math.max(2,f*W))+'" height="8" rx="3" fill="'+(o.color||'var(--text3)')+'" data-g="m"'+T(o.tip||money(v))+'/></svg></div>';}
/* tiny donut ring with icon centre */
function iconRing(f,o){o=o||{};var S=o.s||44,sw=o.sw||4,r=(S-sw)/2-1,c=S/2,g=gid();f=Math.max(0,Math.min(1,f));
 var s='<svg width="'+S+'" height="'+S+'" viewBox="0 0 '+S+' '+S+'" style="display:block;overflow:visible"><circle cx="'+c+'" cy="'+c+'" r="'+r+'" stroke="var(--surface3)" stroke-width="'+sw+'" fill="none"/>';
 if(o.ghostF)s+='<path d="'+arc(c,c,r,f*360,Math.min(360,(f+o.ghostF)*360))+'" stroke="'+(o.color||'var(--accent)')+'" stroke-opacity=".4" stroke-dasharray="2 2" stroke-width="'+sw+'" fill="none"/>';
 if(f>0)s+='<path d="'+arc(c,c,r,0,Math.max(4,f*360))+'" stroke="'+(o.color||'var(--accent)')+'" stroke-width="'+sw+'" fill="none" stroke-linecap="round" data-g="'+g+'"/>';
 s+='<circle cx="'+c+'" cy="'+c+'" r="'+(r+sw)+'" fill="transparent" data-g="'+g+'"'+(o.tip?T(o.tip):'')+'/>';
 if(o.ticks)o.ticks.forEach(function(t){var a=pol(c,c,r+sw/2+3,t.a),b=pol(c,c,r+sw/2+9,t.a),gg=gid();s+='<path d="M'+P(a[0])+' '+P(a[1])+'L'+P(b[0])+' '+P(b[1])+'" stroke="'+t.color+'" stroke-width="2" stroke-linecap="round" data-g="'+gg+'"/><circle cx="'+P(b[0])+'" cy="'+P(b[1])+'" r="8" fill="transparent" data-g="'+gg+'"'+T(t.tip)+'/>';});
 s+=iconG(o.icon||'drop',c,c,o.is||S*.42,o.icolor||'var(--text)')+'</svg>';
 return '<div class="chart" style="width:'+S+'px;flex:none">'+s+'</div>';}
/* scrubbable line/area: series [{vals,color,area,dash,label}], xlabels[] */
var SCRUB={};
function lineChart(series,xl,o){
 o=o||{};var W=o.w||348,H=o.h||150,pl=o.pl||34,pr=o.pr||10,pt=10,pb=20,id=gid();
 var all=[];series.forEach(function(s){s.vals.forEach(function(v){if(v!=null)all.push(v);});});if(o.ref!=null)all.push(o.ref);
 var mx=o.max||Math.max.apply(null,all)*1.1||1,n=o.n||xl.length;
 function X(i){return pl+(n>1?i/(n-1):0)*(W-pl-pr);}function Y(v){return pt+(1-v/mx)*(H-pt-pb);}
 var s=svgOpen(W,H,'data-scrub="'+id+'"');
 [0,.5,1].forEach(function(k){var y=Y(mx*k/1.1*1);s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+P(y)+'" y2="'+P(y)+'" stroke="var(--grid)"/><text x="'+(pl-5)+'" y="'+P(y+3)+'" text-anchor="end" font-size="9.5" fill="var(--text3)">'+kfmt(mx*k/1.1)+'</text>';});
 (o.xticks||[0,Math.floor((xl.length-1)/2),xl.length-1]).forEach(function(i){s+='<text x="'+P(X(i))+'" y="'+(H-5)+'" text-anchor="'+(i===0?'start':i===xl.length-1?'end':'middle')+'" font-size="9.5" fill="var(--text3)">'+esc(xl[i])+'</text>';});
 series.forEach(function(se){var pts=[];se.vals.forEach(function(v,i){if(v!=null)pts.push([X(se.off?i+se.off:i),Y(v)]);});if(!pts.length)return;
  var d=se.step?pts.map(function(p,i){return (i?'H'+P(p[0])+'V':'M'+P(p[0])+' ')+P(p[1]);}).join(''):'M'+pts.map(function(p){return P(p[0])+' '+P(p[1]);}).join('L');
  if(se.area)s+='<path d="'+d+'V'+P(Y(se.base||0))+'H'+P(pts[0][0])+'Z" fill="'+se.color+'" fill-opacity="'+(se.ao||.18)+'"/>';
  s+='<path d="'+d+'" fill="none" stroke="'+se.color+'" stroke-width="2" '+(se.dash?'stroke-dasharray="4 3"':'')+' stroke-linejoin="round"/>';
  if(se.endDot){var l=pts[pts.length-1];s+='<circle cx="'+P(l[0])+'" cy="'+P(l[1])+'" r="4" fill="'+se.color+'" stroke="var(--surface)" stroke-width="2"/>';}});
 if(o.ref!=null){s+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+P(Y(o.ref))+'" y2="'+P(Y(o.ref))+'" stroke="var(--text2)" stroke-dasharray="4 3"/><text x="'+(W-pr)+'" y="'+P(Y(o.ref)-4)+'" text-anchor="end" font-size="9.5" fill="var(--text2)">'+esc(o.refLabel||'')+'</text>';}
 if(o.marks)o.marks.forEach(function(m){var g=gid();s+='<circle cx="'+P(X(m.i))+'" cy="'+P(Y(m.v))+'" r="4.5" fill="'+m.color+'" stroke="var(--surface)" stroke-width="2" data-g="'+g+'"/><circle cx="'+P(X(m.i))+'" cy="'+P(Y(m.v))+'" r="11" fill="transparent" data-g="'+g+'"'+T(m.tip)+'/>';});
 if(o.vline!=null){var vx=X(o.vline);s+='<line x1="'+P(vx)+'" x2="'+P(vx)+'" y1="'+pt+'" y2="'+(H-pb)+'" stroke="var(--text3)" stroke-dasharray="2 3"/><text x="'+P(vx-3)+'" y="'+(pt+8)+'" text-anchor="end" font-size="9.5" fill="var(--text2)">'+esc(o.vlabel||'')+'</text>';}
 s+='<line class="sg" x1="0" x2="0" y1="'+pt+'" y2="'+(H-pb)+'" stroke="var(--text2)" stroke-width="1" style="display:none"/><circle class="sd" r="4" fill="var(--accent)" stroke="var(--surface)" stroke-width="2" style="display:none"/>';
 s+='<rect class="sh" x="'+pl+'" y="'+pt+'" width="'+(W-pl-pr)+'" height="'+(H-pt-pb)+'" fill="transparent" style="cursor:crosshair"/>';
 SCRUB[id]={n:n,X:X,Y:Y,W:W,pl:pl,pr:pr,txt:o.scrubText,val:o.scrubVal};
 return '<div class="chart" style="touch-action:pan-y">'+s+'</svg></div>';}
/* columns (with optional ref line) */
function columns(vals,o){o=o||{};var W=o.w||348,H=o.h||120,pb=o.pb==null?16:o.pb,pt=o.pt||12,n=vals.length,gap=o.gap||2,bw=(W-(o.pl||0))/n,mx=o.max||Math.max.apply(null,vals.map(function(v){return v.v;}).concat([o.ref||0]))*1.08||1;
 var s=svgOpen(W,H);
 if(o.grid)s+='<line x1="'+(o.pl||0)+'" x2="'+W+'" y1="'+(H-pb)+'" y2="'+(H-pb)+'" stroke="var(--grid)"/>';
 vals.forEach(function(v,i){var h=v.v/mx*(H-pb-pt),x=(o.pl||0)+i*bw+gap/2,g=gid(),w=bw-gap;
  if(h>0)s+='<path d="M'+P(x)+' '+(H-pb)+'V'+P(H-pb-h+Math.min(3,h))+'q0 -3 3 -3H'+P(x+w-3)+'q3 0 3 3V'+(H-pb)+'Z" fill="'+(v.color||o.color||'var(--s1)')+'" '+(v.fo?'fill-opacity="'+v.fo+'"':'')+' data-g="'+g+'"/>';
  s+='<rect x="'+P(x-gap/2)+'" y="0" width="'+P(bw)+'" height="'+H+'" fill="transparent" data-g="'+g+'"'+(v.tip?T(v.tip):'')+(v.onclick?' onclick="'+v.onclick+'"':'')+'/>';
  if(v.l)s+='<text x="'+P(x+w/2)+'" y="'+(H-4)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+esc(v.l)+'</text>';
  if(v.top)s+='<text x="'+P(x+w/2)+'" y="'+P(H-pb-h-4)+'" text-anchor="middle" font-size="9.5" fill="var(--text2)">'+esc(v.top)+'</text>';});
 if(o.ref){var y=H-pb-o.ref/mx*(H-pb-pt);s+='<line x1="'+(o.pl||0)+'" x2="'+W+'" y1="'+P(y)+'" y2="'+P(y)+'" stroke="var(--text2)" stroke-dasharray="4 3"/><text x="'+W+'" y="'+P(y-4)+'" text-anchor="end" font-size="9.5" fill="var(--text2)">'+esc(o.refLabel||'')+'</text>';}
 return '<div class="chart">'+s+'</svg></div>';}
/* horizontal range strip min-median-max with marker */
function rangeStrip(min,med,max,mark,o){o=o||{};var W=o.w||348,H=40,pl=8,pr=8,sc=function(v){return pl+(max>min?(v-min)/(max-min):.5)*(W-pl-pr);};
 var s=svgOpen(W,H);s+='<rect x="'+pl+'" y="14" width="'+(W-pl-pr)+'" height="8" rx="4" fill="var(--surface3)"/>';
 var q1=o.q1!=null?o.q1:(min+med)/2,q3=o.q3!=null?o.q3:(med+max)/2;
 s+='<rect x="'+P(sc(q1))+'" y="14" width="'+P(sc(q3)-sc(q1))+'" height="8" rx="4" fill="var(--q1)" data-g="iqr"'+T('Middle half of '+(o.what||'values')+' · '+money(q1)+'–'+money(q3))+'/>';
 s+='<rect x="'+P(sc(med)-1)+'" y="10" width="2" height="16" fill="var(--text)" data-g="med"'+T('Median · '+money(med))+'/>';
 if(mark!=null){var mx=sc(Math.max(min,Math.min(max,mark)));s+='<circle cx="'+P(mx)+'" cy="18" r="6" fill="var(--accent)" stroke="var(--surface)" stroke-width="2" data-g="mk"/><circle cx="'+P(mx)+'" cy="18" r="14" fill="transparent" data-g="mk"'+T(o.markTip||money(mark))+'/>';}
 s+='<text x="'+pl+'" y="38" font-size="9.5" fill="var(--text3)">'+money(min)+'</text><text x="'+P(sc(med))+'" y="38" text-anchor="middle" font-size="9.5" fill="var(--text2)">median '+money(med)+'</text><text x="'+(W-pr)+'" y="38" text-anchor="end" font-size="9.5" fill="var(--text3)">'+money(max)+'</text>';
 return '<div class="chart">'+s+'</svg></div>';}
/* sequential blue */
function seqColor(f){if(f<=0)return 'var(--surface3)';var st=['#184f95','#1f5fb0','#2a70cc','#3987e5','#5d9deb','#86b6ef'];return st[Math.min(5,Math.floor(f*5.999))];}
/* 24h radial columns */
function radial24(hours,o){o=o||{};var W=o.w||300,cx=W/2,cy=W/2,r0=o.r0||46,r1=W/2-24,mx=Math.max.apply(null,hours.map(function(h){return h.v;}))||1;var s=svgOpen(W,W);
 [.5,1].forEach(function(k){s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+P(r0+(r1-r0)*k)+'" fill="none" stroke="var(--grid)"/>';});
 hours.forEach(function(h,i){var a0=i*15+1,a1=(i+1)*15-1,rr=r0+Math.max(.02,h.v/mx)*(r1-r0),g=gid();
  s+='<path d="'+wedge(cx,cy,r0,rr,a0,a1)+'" fill="'+seqColor(h.v/mx)+'" data-g="'+g+'"/><path d="'+wedge(cx,cy,r0,r1+6,a0-1,a1+1)+'" fill="transparent" data-g="'+g+'"'+T(h.tip)+'/>';});
 [0,6,12,18].forEach(function(hh){var p=pol(cx,cy,r1+13,hh*15);s+='<text x="'+P(p[0])+'" y="'+P(p[1]+3)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+(hh===0?'12am':hh===12?'12pm':hh>12?(hh-12)+'pm':hh+'am')+'</text>';});
 if(o.center)s+='<text x="'+cx+'" y="'+(cy-2)+'" text-anchor="middle" font-size="15" font-weight="700" fill="var(--text)">'+esc(o.center)+'</text><text x="'+cx+'" y="'+(cy+12)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+esc(o.center2||'')+'</text>';
 return '<div class="chart">'+s+'</svg></div>';}
function tipAttr(t){return T(t);}
Object.assign(ICONS,{
 inbox:'M4 13l2-8h12l2 8v6H4zM4 13h5l1 2h4l1-2h5',
 swap:'M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7',
 split:'M12 21V12M12 12L5 4M12 12l7-8M5 4v4M5 4h4M19 4v4M19 4h-4',
 down:'M12 4v14M6 12l6 6 6-6',
 pin:'M9 3h6l-1 6 3 3v2H7v-2l3-3zM12 14v7',
 menu:'M4 7h16M4 12h16M4 17h16',
 file:'M6 3h8l4 4v14H6zM14 3v4h4M9 13l3 4 3-4M9 17l3-4 3 4',
 share:'M12 3v12M7 8l5-5 5 5M5 13v7h14v-7',
 cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
 wallet:'M4 7h15v12H4zM4 7l12-3v3M15 13h.01',
 flag:'M5 21V4h11l-2 4 2 4H5',
 coin:'M12 20a8 8 0 100-16 8 8 0 000 16zM9.5 9h5M9.5 12h5M12 9c2 0 2 3 0 3l3 3.5',
 grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
 x:'M6 6l12 12M18 6L6 18',
 up:'M12 20V6M6 12l6-6 6 6',
 help:'M12 21a9 9 0 100-18 9 9 0 000 18zM9.5 9a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01',
 out:'M10 4H5v16h5M14 8l4 4-4 4M18 12H9',
 rule:'M4 6h10M4 12h16M4 18h7M17 4v4M13 16l2 2 4-4'
});
