/* ===== Trickle v8 — UI helpers ===== */
var IC={
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 money:'<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16 15h2"/>',
 inbox:'<path d="M4 13l2.5-7h11L20 13v6H4z"/><path d="M4 13h5l1 2h4l1-2h5"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
 scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
 cash:'<rect x="3" y="7" width="18" height="11" rx="2"/><circle cx="12" cy="12.5" r="2.5"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',chev:'<path d="M6 9l6 6 6-6"/>',next:'<path d="M9 5l7 7-7 7"/>',
 food:'<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2 6 0 8v10"/>',bus:'<rect x="5" y="4" width="14" height="13" rx="3"/><path d="M5 11h14M8 20v-3M16 20v-3"/>',
 star:'<path d="M12 4l2.4 5 5.6.6-4.2 3.8 1.2 5.5L12 16l-5 2.9 1.2-5.5L4 9.6 9.6 9z"/>',bag:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
 book:'<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
 jar:'<path d="M8 3h8M7 6h10v2a4 4 0 0 1 1 3v7a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-7a4 4 0 0 1 1-3z"/>',head:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
 check:'<path d="M5 12l5 5 9-10"/>',plus:'<path d="M12 5v14M5 12h14"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 11a3 3 0 1 0 0-6M21 20a6 6 0 0 0-4-5.6"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',music:'<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
 up:'<path d="M6 15l6-6 6 6"/>',down:'<path d="M6 9l6 6 6-6"/>',pin:'<path d="M9 4h6l-1 6 3 3H7l3-3zM12 13v7"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 sort:'<path d="M4 7h10M4 12h7M4 17h4M17 5v14M14 16l3 3 3-3"/>',leaf:'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l7-7"/>',upload:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
 link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',pen:'<path d="M4 20l4-1 11-11-3-3L5 16z"/>',
 cal:'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',spark:'<path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',moon:'<path d="M20 14a8 8 0 1 1-10-10 7 7 0 0 0 10 10z"/>',
 sliders:'<path d="M7 4v6M7 14v6M17 4v2M17 10v10"/><circle cx="7" cy="12" r="2"/><circle cx="17" cy="8" r="2"/>',addw:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/><path d="M16.5 4v7M13 7.5h7"/>',sound:'<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9a4 4 0 0 1 0 6"/>',contrast:'<circle cx="12" cy="12" r="8"/><path d="M12 4v16a8 8 0 0 0 0-16z" fill="currentColor"/>',move:'<path d="M4 8h13l-3-3M20 16H7l3 3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'};
function ic(n,s){return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"'+(s?' style="width:'+s+'px;height:'+s+'px"':'')+'>'+(IC[n]||IC.spark)+'</svg>';}
function fmt(n){n=Math.round(n);return (n<0?'−':'')+'₹'+Math.abs(n).toLocaleString('en-IN');}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function catIc(c){return (CAT_DEF[c]&&CAT_DEF[c].i)||'sort';}
/* tiles: specs = array of {c:color, cls:'', k:'k1', p:partial 0..1, d:delay} ; empty slot if no c. cols=0 → wrap */
function tg(specs,cols,size,gap,extra){var g=(gap==null?Math.max(2,Math.round(size*.25)):gap),h='<div class="tg'+(cols?'':' wrap')+(extra&&extra.center?' center':'')+(extra&&extra.cls?' '+extra.cls:'')+'" style="'+(cols?'--c:'+cols+';':'')+'--s:'+size+'px;--g:'+g+'px"'+(extra&&extra.attr?' '+extra.attr:'')+'>';
 specs.forEach(function(s,i){var st='--i:'+i+';',cl=s.cls||'';if(s.c){st+='--tc:'+s.c+';';if(s.p!=null&&s.p<1){cl+=' pt';st+='--p:'+s.p+';';}else{st+='background-color:'+s.c+';';cl+=' f';}if(s.c==='var(--save)')cl+=' sv';}if(s.k)cl+=' '+s.k;if(s.d!=null)st+='--d:'+s.d+'ms;animation-delay:'+s.d+'ms;';h+='<i class="'+cl.trim()+'" style="'+st+'"'+(s.v?' data-a="reveal" data-v="'+s.v+'"':'')+'></i>';});return h+'</div>';}
function rep(n,spec){var a=[];for(var i=0;i<n;i++)a.push(Object.assign({},spec));return a;}
/* ---- v9 tile unit engine ---- */
var UNITS=[10,50,100,250,500,1000,2500];
function tcount(v,u){if(!(v>0))return 0;var f=Math.floor(v/u+1e-9),r=v/u-f;return f+(r>=.1?1:0);}
function unitFor(vals,cap){vals=vals.filter(function(v){return v>0;});for(var i=0;i<UNITS.length;i++){var u=UNITS[i],n=0;vals.forEach(function(v){n+=tcount(v,u);});if(n<=cap)return u;}return 2500;}
function quarter(r){var q=Math.round(r*4)/4;return q<.25?.25:q;}
/* value → tile specs (full tiles + one partial tile) */
function tiles(v,u,spec){spec=spec||{};if(!(v>0))return [];var f=Math.floor(v/u+1e-9),r=v/u-f,a=rep(f,spec);if(r>=.1){var q=quarter(r);if(q>=1)a.push(Object.assign({},spec));else a.push(Object.assign({},spec,{p:q}));}return a;}
function ukey(u){return '1 tile = '+fmt(u);}
function tkey(txt,sw){return '<span class="tkey"><i class="'+(sw||'')+'"></i>'+txt+'</span>';}
function ct(c){return {c:catColor(c),k:catK(c)};}
/* a category's budget grid in unit u */
function budgetUnit(p){p=p||POOLS();return unitFor([Math.max.apply(null,CATS.map(function(c){return Math.max(FIXED[c],fundedThisMonth(c));}))],30);}
function catSpecs(c,p,u){p=p||POOLS();u=u||budgetUnit(p);var left=Math.round(p.b[c]||0),fund=Math.max(FIXED[c],fundedThisMonth(c),left),T=Math.max(1,tcount(fund,u));
 var a=tiles(Math.max(0,left),u,ct(c)).slice(0,T);a=a.concat(rep(Math.max(0,T-a.length),{}));
 var over=left<0?tcount(-left,u):0;return {specs:a,left:left,over:over,T:T,u:u};}
function colsFor(n){return n<=10?n:n<=24?6:n<=40?8:10;}
function waffle(g,size,extra){var p=POOLS(),s=Math.max(0,p.g[g.id]||0),pct=g.target?Math.min(100,Math.floor(s/g.target*100)):0;
 var a=[];for(var i=0;i<100;i++)a.push(i<pct?{c:'var(--save)'}:{});if(extra&&extra.highlight){for(var j=Math.max(0,pct-extra.highlight);j<pct;j++)a[j].cls='pop';}
 return tg(a,10,size,Math.max(2,Math.round(size*.22)),{attr:(extra&&extra.noReveal?'':'data-a="reveal" ')+' data-v="'+fmt(s)+' of '+fmt(g.target)+'" role="img" aria-label="'+esc(g.name)+' '+pct+' percent full"'});}
function goalPct(g){var s=POOLS().g[g.id]||0;return g.target?Math.min(100,Math.floor(s/g.target*100)):0;}
function goalWords(g){var p=goalPct(g);return p>=100?'full':p>=75?'almost there':p>=50?'over half full':p>=25?'a quarter full':'on its way';}
function relDay(ts){var d0=new Date(NOW);d0.setHours(0,0,0,0);var diff=Math.floor((d0.getTime()-new Date(ts).setHours(0,0,0,0))/DAY);if(diff===0)return 'Today';if(diff===1)return 'Yesterday';if(diff<7&&diff>0)return DOWS[new Date(ts).getDay()];return new Date(ts).getDate()+' '+MON[new Date(ts).getMonth()];}
function timeStr(ts){var d=new Date(ts),h=d.getHours(),m=d.getMinutes();return (h%12||12)+':'+(m<10?'0':'')+m+(h<12?' am':' pm');}
function glowHTML(){var pc=pace(),col=glowCol(pc.state),o=[.9,.5,.75,.35,.8,.55,.4,.85,.6,.95,.45,.7,.3,.65,.5,.8,.4,.6,.2,.4,.3,.5,.25,.35],h='';
 o.forEach(function(x){h+='<i style="opacity:'+x+'"></i>';});return '<div class="glow'+(S.fresh?' reset':'')+'" id="glow" style="--gc:'+col+'" aria-hidden="true">'+h+'</div>';}
function glowCol(st){if(S.look==='bw')return st==='ok'?'rgba(255,255,255,.46)':'rgba(255,255,255,.16)';return st==='ok'?'rgba(79,209,139,.55)':'rgba(242,169,59,.6)';}
function paceChip(){var pc=pace();return pc.state==='ok'?'<span class="pill calm">'+ic('leaf',15)+'On pace</span>':'<span class="pill warm">'+ic('spark',15)+'A bit fast</span>';}
function periodWord(){return PERIOD==='week'?'week':'month';}
function nextPeriodWord(){if(PERIOD==='week')return 'Next week';return MONL[(new Date(NOW).getMonth()+1)%12];}
function thisPeriodName(){return PERIOD==='week'?'This week':MONL[new Date(NOW).getMonth()];}

function relWord(ts){var r=relDay(ts);return /\d/.test(r)?'Earlier':r;}
var SHEETS={};
var A={};
