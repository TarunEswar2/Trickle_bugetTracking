/* ===== Trickle v12 — shell, router, events, fx hooks ===== */
var S={scr:'O-00',hist:[],ctx:{},toast:null,zoom:null,exp:null,ob:{apps:['GPay'],type:'Hostel',manual:false,inc:0,day:1,taps:0,t0:0,changes:[]},gearOpen:false};
var TABS=[['H','Home','H-01'],['I','Income','I-01'],['S','Spending','S-01'],['V','Savings','V-01'],['N','Insights','N-01']];
var ICON={
 H:'<path d="M3.5 11 12 4l8.5 7v8.5a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z"/>',
 I:'<path d="M12 3.5v11m-4.5-4.5 4.5 4.5 4.5-4.5M4 19.5h16"/>',
 S:'<circle cx="6" cy="7" r="2"/><circle cx="12" cy="7" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="6" cy="13" r="2"/><circle cx="12" cy="13" r="2"/><path d="M4 19h16"/>',
 V:'<path d="M8 3.5h8M9 3.5v3c-2.4 1-4 3-4 5.5v6.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V12c0-2.5-1.6-4.5-4-5.5v-3"/><circle cx="12" cy="14.5" r="2.4"/>',
 N:'<path d="M4 19.5 9 13l4 3 7-9"/><circle cx="20" cy="7" r="1.2"/>',
 bell:'<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.8l1.7 2.4 2.8-.6.9 2.7 2.7.9-.6 2.8 2.4 1.7-2.4 1.7.6 2.8-2.7.9-.9 2.7-2.8-.6L12 21.2l-1.7-2.4-2.8.6-.9-2.7-2.7-.9.6-2.8L2.8 12l2.4-1.7-.6-2.8 2.7-.9.9-2.7 2.8.6z"/>',
 help:'<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1.1.9-1.1 1.7M12 16.6v.2"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',close:'<path d="M6 6l12 12M18 6 6 18"/>',
 pay:'<path d="M4 8.5V5a1 1 0 0 1 1-1h3.5M15.5 4H19a1 1 0 0 1 1 1v3.5M20 15.5V19a1 1 0 0 1-1 1h-3.5M8.5 20H5a1 1 0 0 1-1-1v-3.5M4 12h16"/>',
 chev:'<path d="M9 5l7 7-7 7"/>',plus:'<path d="M12 5v14M5 12h14"/>',up:'<path d="M6 14l6-6 6 6"/>',down:'<path d="M6 10l6 6 6-6"/>',
 hg:'<path d="M7 3.5h10M7 20.5h10M8 3.5c0 5 8 5 8 8.5s-8 3.5-8 8.5M16 3.5c0 5-8 5-8 8.5s8 3.5 8 8.5"/>'};
function ic(n,cls){return '<svg viewBox="0 0 24 24" aria-hidden="true"'+(cls?' class="'+cls+'"':'')+'>'+ICON[n]+'</svg>';}
function wm(){return '<span class="wm" aria-label="Trickle"><b>Trickle</b></span>';}
function hd(title,o){o=o||{};var t=o.tab;var r='<header class="hd">';
  if(o.back)r+='<button class="ib back" data-a="back" aria-label="Back">'+ic('back')+'</button>';
  r+=o.wm?'<div class="wm" style="flex:1"><b>Trickle</b></div>':'<h1>'+esc(title)+'</h1>';
  if(o.help)r+='<button class="ib" data-go="'+o.help+'" aria-label="About this tab">'+ic('help')+'</button>';
  if(o.bell)r+='<button class="ib" data-go="H-02" aria-label="Bell: needs you and activity'+(L.needs.length?', something needs you':'')+'">'+ic('bell')+(L.needs.length?'<i class="bd"></i>':'')+'</button>';
  if(o.gear)r+='<button class="ib" data-go="'+o.gear+'" aria-label="'+esc(title)+' settings">'+ic('gear')+'</button>';
  if(o.avatar)r+='<button class="ib" data-go="G-S1" aria-label="App settings"><span class="av">'+L.user[0]+'</span></button>';
  if(o.close)r+='<button class="ib" data-a="back" aria-label="Close">'+ic('close')+'</button>';
  return r+'</header>';}
function tabbar(active){return '<nav class="tb" aria-label="Tabs"><div class="pill">'+TABS.map(function(t){return '<button class="tbb" data-tab="'+t[0]+'" aria-label="'+t[1]+'"'+(t[0]===active?' aria-current="page"':'')+'>'+ic(t[0])+'</button>';}).join('')+
  '</div><button class="payb" data-go="P-01" aria-label="Pay: open camera to scan">'+ic('pay')+'</button></nav>';}
function btn(label,a,o){o=o||{};return '<button class="btn'+(o.primary?' primary':'')+(o.block!==false?' block':'')+(o.cls?' '+o.cls:'')+'" '+(o.go?'data-go="'+o.go+'"':'data-a="'+a+'"')+(o.v!=null?' data-v="'+esc(o.v)+'"':'')+'>'+label+'</button>';}
function li(o){return '<button class="li" '+(o.go?'data-go="'+o.go+'"':'data-a="'+o.a+'"')+(o.v!=null?' data-v="'+esc(o.v)+'"':'')+(o.ctx?' data-ctx="'+esc(JSON.stringify(o.ctx))+'"':'')+'>'+(o.lead||'')+'<span class="t"><b>'+o.t+'</b>'+(o.s?'<small>'+o.s+'</small>':'')+'</span>'+(o.r!=null?'<span class="amt">'+o.r+'</span>':'')+'<span class="chev">'+ic('chev','')+'</span></button>';}
function jsw(j){return '<i class="sw '+jcls(j)+(jpat(j)?' pt':'')+'" aria-hidden="true"></i>';}
function jarSegs(j,o){o=o||{};var m=o.m||cur();var segs=[{amt:left(j,m),c:jcls(j,m),pat:jpat(j,m),st:'solid',name:j+' left'}];if(!o.leftOnly)segs.push({amt:jarSpent(j,m),c:jcls(j,m),st:'out',name:j});return segs;}
function legendLS(c){return '<p class="legend"><span>'+dot1(c||'ink','solid')+' left</span><span>'+dot1(c||'ink','out')+' spent</span></p>';}
function dd(d,m){return d+' '+MON[m==null?L.today.m:m];}
function plural(n,w){return n+' '+w+(n===1?'':'s');}
var WORDN=['no','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
function wn(n){return WORDN[n]||String(n);}
function ord(n){return n+(n%10===1&&n!==11?'st':n%10===2&&n!==12?'nd':n%10===3&&n!==13?'rd':'th');}
function ordw(n){return ['','1st','2nd','3rd'][n]?['zeroth','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth'][n]:ord(n);}

/* ---------- fx: every motion + sound goes through here (Phase 12 swaps this module) ---------- */
var FXLOG=[];
function reduced(){return (L&&L.prefs&&L.prefs.reduced)||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);}
function fx(name,el,o){FXLOG.push(name);if(L&&L.prefs&&L.prefs.sound)tone(name);if(!el)return;if(reduced()){el.classList.add('fx-done');return;}el.classList.add('fx-'+name.replace('.','-'));}
var ACtx=null;function tone(name){try{if(!ACtx){var C=window.AudioContext||window.webkitAudioContext;if(!C)return;ACtx=new C();}var o=ACtx.createOscillator(),g=ACtx.createGain();o.frequency.value=name==='goal.bangle'?784:name==='pay.hourglass'?523:660;
  g.gain.setValueAtTime(0.0001,ACtx.currentTime);g.gain.linearRampToValueAtTime(0.06,ACtx.currentTime+0.01);g.gain.exponentialRampToValueAtTime(0.0001,ACtx.currentTime+0.3);o.connect(g);g.connect(ACtx.destination);o.start();o.stop(ACtx.currentTime+0.35);}catch(e){}}

/* ---------- router ---------- */
function go(id,ctx,noHist){if(!FR[id]){console.warn('no frame '+id);return;}if(!noHist&&S.scr&&S.scr!==id)S.hist.push({scr:S.scr,ctx:S.ctx});S.scr=id;S.ctx=ctx||{};if(!Object.keys(S.ctx).length&&FR[id].dctx)S.ctx=clone(FR[id].dctx);S.exp=null;S.zoom=null;render();}
function back(){var h=S.hist.pop();if(!h){var t=FR[S.scr]&&FR[S.scr].tab;go(t?tabRoot(t):'H-01',{},true);return;}S.scr=h.scr;S.ctx=h.ctx;S.exp=null;render();}
function tabRoot(t){return TABS.filter(function(x){return x[0]===t;})[0][2];}
function toTab(t){var root=tabRoot(t);S.hist=[];if(!L.seen[t]){L.seen[t]=1;go(t+'-00',{},true);return;}go(root,{},true);}
function toast(text,undoable){S.toast={text:text,undo:!!undoable,id:Date.now()};if(L)setTimeout(function(){if(S.toast&&!document.querySelector('.toast'))render();},0);var id=S.toast.id;setTimeout(function(){if(S.toast&&S.toast.id===id){S.toast=null;render();}},5200);}
function render(){var f=FR[S.scr];if(f&&S.ctx&&!Object.keys(S.ctx).length&&f.dctx)S.ctx=clone(f.dctx);var ph=document.getElementById('app');if(!f){ph.innerHTML='<p>Missing frame '+esc(S.scr)+'</p>';return;}
  var html='';
  if(f.kind==='sheet'){var bf=FR[f.base];html=shellWrap(bf,bf.r(true))+'<div class="shade" data-a="shadeclose"><section class="sheet" role="dialog" aria-modal="true" aria-label="'+esc(f.title||'')+'" data-frame="'+S.scr+'"><div class="grab" aria-hidden="true"></div>'+f.r()+'</section></div>';}
  else html=shellWrap(f,f.r());
  if(S.toast)html+='<div class="toast" role="status"><span>'+esc(S.toast.text)+'</span>'+(S.toast.undo?'<button data-a="undo">Undo</button>':'')+'</div>';
  ph.innerHTML=html+PATDEFS;ph.dataset.frame=S.scr;
  applyLook();
  var sc=ph.querySelector('.scr');if(sc&&S.keepScroll!=null){sc.scrollTop=S.keepScroll;S.keepScroll=null;}
  if(f.after)f.after();
  if(window.__afterRender)window.__afterRender();}
function shellWrap(f,body){if(f.kind==='ob'||f.kind==='full'||f.kind==='intro')return body;return body+tabbar(f.tab);}
function applyLook(){var ph=document.getElementById('app');if(!L)return;var p=L.prefs;ph.classList.toggle('bw',p.look==='bw');if(p.mode==='system')ph.removeAttribute('data-mode');else ph.setAttribute('data-mode',p.mode);ph.classList.toggle('reduced',!!p.reduced);}

/* ---------- events ---------- */
document.addEventListener('click',function(e){var t=e.target.closest('[data-go],[data-a],[data-tab],svg.dz');if(!t)return;
  if(t.matches('svg.dz')){zoomViz(t);return;}
  if(t.dataset.a==='shadeclose'&&e.target!==t)return;
  e.preventDefault();var ctx=t.dataset.ctx?JSON.parse(t.dataset.ctx):{};
  if(t.dataset.tab){toTab(t.dataset.tab);return;}
  if(t.dataset.go){go(t.dataset.go,ctx);return;}
  var a=t.dataset.a;if(ACT[a])ACT[a](t,t.dataset.v,ctx);else console.warn('no action '+a);});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches('svg.dz')){e.preventDefault();zoomViz(e.target);}if(e.key==='Escape'&&FR[S.scr]&&FR[S.scr].kind==='sheet')back();});
function zoomViz(svg){var segs=JSON.parse(decodeURIComponent(svg.dataset.seg));var nx=svg.nextElementSibling;
  if(nx&&nx.classList.contains('zoomed')){nx.remove();svg.style.display='';return;}
  var tot=segs.map(function(s){return (s.name||'')+' '+inr(s.amt);}).join(' · ');
  var z=document.createElement('div');z.className='zoomed';z.innerHTML=dots(segs,{zoom:1,size:'zoom',zoomable:false,cls:'zv'})+'<p class="zoomcap">'+esc(tot)+' <button class="link" data-a="unzoom">Back</button></p>';
  svg.style.display='none';svg.after(z);fx('dots.merge',z);}

/* boot */
function boot(){var h=location.hash.replace('#','');var seed=null,frame=null;
  h.split('&').forEach(function(p){var kv=p.split('=');if(kv[0]==='seed')seed=kv[1];if(kv[0]==='frame')frame=kv[1];if(FR[kv[0]])frame=kv[0];});
  if(h==='fresh'||(!h&&!frame)){S.scr='O-00';L=null;render();return;}
  seedDemo({seed:seed});['H','I','S','V','N'].forEach(function(t){L.seen[t]=1;});
  if(seed==='lapse')frame=frame||'R-01';if(seed==='monthend')frame=frame||'R-02';
  S.scr=frame||'H-01';render();}
function relDay(d){var t=L.today.d;return d===t?'Today':d===t-1?'Yesterday':d>t-7?DOW[new Date(L.today.y,L.today.m,d).getDay()]:'Earlier this month';}
