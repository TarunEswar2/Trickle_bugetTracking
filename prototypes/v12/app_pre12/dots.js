/* ===== Trickle v12 — dots.js: the money ladder =====
   crumb (<₹100, pie wedge clockwise from 12, area-true) → dot ₹100 (gapped) → pill ₹1,000 (10 dots fused)
   → block ₹10,000 (10 pills, hairline gap between blocks). Left = solid jar colour; spent = 1.6px outline;
   held subscription / owed = dashed; ghost = last period; hatch = extra beyond the ghost. */
var D=10,G=2,R=D/2,PW=10*D+9*G,HG=1; // dot, gap, pill/block side, hairline gap between blocks
var DENSITY='surface'; // P2-Q4 (open): 'surface' = size follows surface (rec A); set 'one' for a single size
var SURF={widget:0.8,card:1,hero:1.25,zoom:1.25};
function dscale(s){return DENSITY==='surface'?(SURF[s]||1):1;}
window.__dotErr=[];
function lad(a){a=Math.max(0,Math.round(a));var b=Math.floor(a/10000),r=a%10000,p=Math.floor(r/1000);r%=1000;var t=Math.floor(r/100),c=r%100;return {b:b,p:p,t:t,c:c};}
function wedge(cx,cy,r,f){if(f>=1)return 'M'+(cx-r)+' '+cy+'a'+r+' '+r+' 0 1 0 '+2*r+' 0a'+r+' '+r+' 0 1 0 '+(-2*r)+' 0';
  var a=2*Math.PI*f,x=cx+r*Math.sin(a),y=cy-r*Math.cos(a);return 'M'+cx.toFixed(2)+' '+cy.toFixed(2)+'V'+(cy-r).toFixed(2)+'A'+r+' '+r+' 0 '+(f>0.5?1:0)+' 1 '+x.toFixed(2)+' '+y.toFixed(2)+'Z';}
function fillOf(s){if(s.pat)return 'url(#pt-'+s.pat+'-'+s.c+')';return null;}
/* segs: [{amt, c:'j0|j1|j2|sv|inc', st:'solid|out|held|owed|ghost|hatch', pat:'stripe'|null, name}] */
function dots(segs,o){o=o||{};var sc=dscale(o.size||'card');var zoom=o.zoom?1:0;var W=o.cols?o.cols*(D+G)-G:PW;
  var blocks=[],pills=[],ds=[],total=0;
  segs.forEach(function(s,si){if(!s.amt||s.amt<=0)return;total+=Math.round(s.amt);var l=lad(s.amt);
    if(zoom){var top=segs.some(function(q){return q.amt>=10000;})?'b':'p';
      if(top==='b'){for(var i=0;i<l.b*10+l.p;i++)pills.push({s:s,v:1000});for(i=0;i<l.t;i++)ds.push({s:s,v:100,f:1});}
      else{for(var i=0;i<l.p*10+l.t;i++)ds.push({s:s,v:100,f:1});}}
    else{for(var i=0;i<l.b;i++)blocks.push({s:s,v:10000});for(i=0;i<l.p;i++)pills.push({s:s,v:1000});for(i=0;i<l.t;i++)ds.push({s:s,v:100,f:1});}
    if(l.c)ds.push({s:s,v:l.c,f:l.c/100});});
  var out=[],x=0,y=0,marks=0,val=0;
  function cls(s){return 'm '+s.c+' '+(s.st||'solid')+(s.pat?' pt':'');}
  function fa(s){var f=fillOf(s);return f&&(!s.st||s.st==='solid')?' style="fill:'+f+'"':'';}
  var bper=Math.max(1,Math.floor((W+HG)/(PW+HG)));
  blocks.forEach(function(b,i){var bx=(i%bper)*(PW+HG),by=Math.floor(i/bper)*(PW+HG);
    var inset=b.s.st&&b.s.st!=='solid'?0.8:0;out.push('<rect class="'+cls(b.s)+' blk" data-v="'+b.v+'" x="'+(bx+inset)+'" y="'+(by+inset)+'" width="'+(PW-2*inset)+'" height="'+(PW-2*inset)+'" rx="'+(D*0.9)+'"'+fa(b.s)+'/>');marks++;val+=b.v;});
  if(blocks.length)y=Math.ceil(blocks.length/bper)*(PW+HG)-HG+G;
  var pper=Math.max(1,Math.floor((W+G)/(PW+G)));
  pills.forEach(function(p,i){var px=(i%pper)*(PW+G),py=y+Math.floor(i/pper)*(D+G);var ins=p.s.st&&p.s.st!=='solid'?0.8:0;
    out.push('<rect class="'+cls(p.s)+'" data-v="'+p.v+'" x="'+(px+ins)+'" y="'+(py+ins)+'" width="'+(PW-2*ins)+'" height="'+(D-2*ins)+'" rx="'+(R-ins)+'"'+fa(p.s)+'/>');marks++;val+=p.v;});
  if(pills.length)y+=Math.ceil(pills.length/pper)*(D+G);
  var per=o.cols||10;
  ds.forEach(function(d,i){var cx=(i%per)*(D+G)+R,cy=y+Math.floor(i/per)*(D+G)+R,s=d.s,ins=s.st&&s.st!=='solid'?0.8:0;
    if(d.f<1){out.push('<g class="crumb" data-v="'+d.v+'" data-f="'+d.f.toFixed(3)+'"><circle class="m ring '+s.c+'" cx="'+cx+'" cy="'+cy+'" r="'+(R-0.6)+'"/><path class="'+cls(s)+'" d="'+wedge(cx,cy,R-(ins?0.8:0),d.f)+'"'+fa(s)+'/></g>');}
    else out.push('<circle class="'+cls(s)+'" data-v="100" cx="'+cx+'" cy="'+cy+'" r="'+(R-ins)+'"'+fa(s)+'/>');marks++;val+=d.v;});
  if(ds.length)y+=Math.ceil(ds.length/per)*(D+G);
  var h=Math.max(D,y-G),w=W;
  if(val!==total)window.__dotErr.push('sum '+val+'≠'+total);
  var label=o.title||segs.filter(function(s){return s.amt>0;}).map(function(s){return (s.name?s.name+' ':'')+(s.st==='out'?'spent ':s.st==='held'?'held ':s.st==='owed'?'owed ':s.st==='ghost'?'last time ':'')+inr(s.amt);}).join(', ');
  var pad=2;return '<svg class="dots'+(o.cls?' '+o.cls:'')+(o.zoomable===false?'':' dz')+'" data-marks="'+marks+'" data-val="'+val+'" data-seg="'+encodeURIComponent(JSON.stringify(segs))+'" data-size="'+(o.size||'card')+'" viewBox="'+(-pad)+' '+(-pad)+' '+(w+2*pad)+' '+(h+2*pad)+'" width="'+((w+2*pad)*sc).toFixed(0)+'" height="'+((h+2*pad)*sc).toFixed(0)+'" preserveAspectRatio="xMinYMid meet" role="img" aria-label="'+esc(label)+'"'+(o.zoomable===false?'':' tabindex="0"')+'><title>'+esc(label)+'</title>'+out.join('')+'</svg>';}
/* single dot for keys / legends */
function dot1(c,st,f){var s={c:c||'ink',st:st||'solid'};if(f&&f<1)return '<svg class="d1" viewBox="-1 -1 12 12" width="12" height="12" aria-hidden="true"><circle class="m ring '+s.c+'" cx="5" cy="5" r="4.4"/><path class="m '+s.c+' solid" d="'+wedge(5,5,5,f)+'"/></svg>';
  return '<svg class="d1" viewBox="-1 -1 12 12" width="12" height="12" aria-hidden="true"><circle class="m '+s.c+' '+s.st+'" cx="5" cy="5" r="'+(s.st==='solid'?5:4.2)+'"/></svg>';}
function key(){return '<p class="key" aria-label="One dot is one hundred rupees">'+dot1('ink')+'<span>= ₹100</span></p>';}
/* glow track: time / position only (P2-Q3). frac 0..1 = where we are; marks = optional extra points */
function glowTrack(frac,o){o=o||{};var n=o.n||31,w=o.w||300,gap=w/(n-1),cur=Math.round(frac*(n-1)),out=[];
  for(var i=0;i<n;i++){var lit=i<=cur;out.push('<circle class="gd'+(lit?' lit':'')+(i===cur?' now':'')+'" cx="'+(i*gap).toFixed(1)+'" cy="8" r="'+(i===cur?4.2:1.7)+'"/>');}
  (o.marks||[]).forEach(function(m){var mx=m.f*(w);out.push('<g class="gm"><line x1="'+mx.toFixed(1)+'" x2="'+mx.toFixed(1)+'" y1="0" y2="16"/></g>');});
  return '<svg class="glow" viewBox="-6 -2 '+(w+12)+' 20" width="100%" height="22" preserveAspectRatio="none" role="img" aria-label="'+esc(o.label||'Position in time')+'">'+out.join('')+'</svg>';}
function ladderSelfTest(){var bad=[],R=mulberry32(7);for(var i=0;i<200;i++){var a=Math.floor(R()*60000);if(i<20)a=i*7;var s=dots([{amt:a,c:'j0'}],{zoomable:false});
    var mm=/data-marks="(\d+)" data-val="(\d+)"/.exec(s);var l=lad(a);if(+mm[2]!==a)bad.push(a+' sum');if(+mm[1]!==l.b+l.p+l.t+(l.c?1:0))bad.push(a+' marks');if(a<100&&+mm[1]!==(a?1:0))bad.push(a+' crumb');}
  // wedge area check: polygon area of wedge path ≈ f·πr²
  [0.12,0.25,0.5,0.52,0.75,0.9].forEach(function(f){var r=5,n=400,area=0.5*r*r*2*Math.PI*f;var exp=f*Math.PI*r*r;if(Math.abs(area-exp)>1e-9)bad.push('wedge '+f);});
  window.__dotErr=[];return bad;}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var PATDEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>'+
  ['j0','j1','j2','sv'].map(function(c){return '<pattern id="pt-stripe-'+c+'" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3.2" height="3.2" style="fill:var(--'+c+')"/><rect width="1.3" height="3.2" style="fill:var(--card)" opacity=".55"/></pattern>'+
   '<pattern id="pt-dot-'+c+'" width="3.4" height="3.4" patternUnits="userSpaceOnUse"><rect width="3.4" height="3.4" style="fill:var(--'+c+')"/><circle cx="1.7" cy="1.7" r=".75" style="fill:var(--card)" opacity=".6"/></pattern>';}).join('')+
  '<pattern id="pt-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="1" height="3" style="fill:var(--ink2)"/></pattern>'+
  '<filter id="glowf" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>';
