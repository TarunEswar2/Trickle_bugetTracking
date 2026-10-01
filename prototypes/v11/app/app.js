/* ===== Trickle v11 — screens (25 frames), one decision per screen ===== */
var S={scr:'S-00',tab:'H-01',sheet:null,toast:null,notif:null,look:'color',theme:null,reduced:false,
 ob:{income:9000,manual:false,type:'Hostel',save:1400,taps:0,t0:0,err:''},pay:null,story:0,
 home:['pace','saved','next','week','little'],jar:'Food',showPays:false,mv:{from:null,to:'Food',n:1},sub:{step:0},subOpen:null,
 fromBack:[]};
var R={key:false};var A={};var FX=[];
try{var _l=localStorage.getItem('trickle11look');if(_l)S.look=_l;var _t=localStorage.getItem('trickle11theme');if(_t)S.theme=_t;}catch(e){}

var PAYEES=[{n:'Chai Point',item:'chai',amt:20,cat:'Food',vpa:'chaipoint@ybl'},{n:'Auto',item:'auto',amt:60,cat:'Travel',vpa:'ramesh.auto@okhdfc'},
 {n:'Swiggy',item:'swiggy',amt:350,cat:'Food',vpa:'swiggy@icici'},{n:'Dinner at Anand',item:'dinner',amt:800,cat:'Food',vpa:'anandbhavan@ybl'},
 {n:'PVR tickets',item:'movie',amt:950,cat:'Fun',vpa:'pvr@axl'},{n:'Xerox shop',item:'xerox',amt:40,cat:'Study',vpa:'xeroxcorner@paytm'}];
var FRIENDS=['Rahul','Aditi','Karan'];

/* ---------- icons (2px stroke, 24 grid) ---------- */
var IC={home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
 money:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
 pay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg>',
 ins:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M7 15l3-3 3 2 4-5"/></svg>',
 set:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 8h9M17 8h3M4 16h3M11 16h9"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/></svg>',
 add:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="11" height="11" rx="2"/><path d="M18 14v6M15 17h6"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
 x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 chev:'<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
 gear:'<svg class="gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 8h9M17 8h3M4 16h3M11 16h9"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/></svg>'};
function logo(sz){sz=sz||28;return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2" width="14" height="14" rx="3.5" fill="currentColor"/><rect x="9.5" y="18" width="5" height="5" rx="1.5" fill="currentColor" opacity=".55"/><rect x="9.5" y="20.5" width="5" height="2.5" rx="1" fill="currentColor"/></svg>';}

/* ---------- helpers ---------- */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function cf(c){return S.look==='bw'?'url(#bw-'+c+')':'var(--c-'+c+')';}
function sav(){return 'var(--sav)';}
function key(){if(R.key)return '';R.key=true;return '<span class="key"><i>■</i> = ₹100</span>';}
/* tile visual: tappable for the exact ₹ (progressive disclosure) */
function tv(segs,opt,exact){opt=opt||{};return '<div class="tv" role="button" tabindex="0" data-a="exact" data-v="'+esc(exact||'')+'" aria-label="'+esc(exact||'')+'">'+tilesSVG(segs,opt)+'</div>';}
function jarSegs(c,extra){var k=L.cats[c],lf=left(c),sp=Math.max(0,k.budget+k.moveIn-k.moveOut+k.back-lf);return [{amt:lf,fill:cf(c)},{amt:sp,kind:'out'}].concat(extra||[]);}
function lgItem(fill,name,kind){return '<span>'+swatch(fill,kind)+esc(name)+'</span>';}
function ord(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}
function btn(label,a,v,cls,extra){return '<button class="btn '+(cls||'')+'" data-a="'+a+'"'+(v!=null?' data-v="'+esc(v)+'"':'')+(extra||'')+'>'+label+'</button>';}
function head(title,opt){opt=opt||{};return '<div class="head">'+(opt.back?'<button class="cbtn" data-a="back" aria-label="Back">'+IC.back+'</button>':'')+
 '<h1 style="flex:1'+(opt.back?';font-size:26px':'')+'">'+title+'</h1><div class="btns">'+(opt.right||'')+'</div></div>';}
function toast(msg,undo,ms){S.toast={msg:msg,undo:undo};clearTimeout(S._tt);S._tt=setTimeout(function(){S.toast=null;render();},ms||3200);}
function isMain(){return ['H-01','M-01','I-01'].indexOf(S.scr)>=0||/^(M|I)-0/.test(S.scr)||S.scr==='X-01';}
function tabOn(){return ['H-01','M-01','M-02','M-03','M-04','M-05','M-06','I-01','I-03','X-01'].indexOf(S.scr)>=0;}

/* ---------- S-00 splash (v10 timing, tile + drip mark; tiles drop into a 2-row jar) ---------- */
function splash(){var s=16,g=4,g5=10,o='';for(var i=0;i<20;i++){var r=1-Math.floor(i/10),c=i%10,x=24+c*(s+g)+(c>=5?g5:0),y=62+r*(s+g);
  o+='<rect class="sp-t" style="animation-delay:'+(i*45)+'ms" x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" rx="3" fill="var(--fg)"/>';}
 return '<button class="splash" data-a="splashgo" aria-label="Trickle. Money you can see. Tap to start.">'+
  '<svg class="jar" viewBox="0 0 250 110" aria-hidden="true"><path d="M14 30 v62 a8 8 0 0 0 8 8 h206 a8 8 0 0 0 8 -8 v-62" fill="none" stroke="var(--muted)" stroke-width="3" stroke-linecap="round"/>'+o+'</svg>'+
  '<div class="row sp-in" style="animation-delay:.95s">'+logo(40)+'<span class="wm">Trickle</span></div><p class="tag sp-in" style="animation-delay:1.15s">Money you can see.</p></button>';}
A.splashgo=function(){clearTimeout(S._spt);S.scr='S-01';S.ob.t0=performance.now();S.ob.taps=0;render();};

/* ---------- Setup S-01..S-04 (4 screens, 4 taps with defaults) ---------- */
function dots(n){var o='<div class="dots" aria-label="Step '+n+' of 4">';for(var i=1;i<=4;i++)o+='<i class="'+(i<=n?'on':'')+'"></i>';return o+'</div>';}
function S01(){var ob=S.ob;
 if(ob.manual)return '<div class="setup">'+dots(1)+'<h1>What comes in each month?</h1><p class="muted">Type it in. You can link UPI later in settings.</p>'+
  '<label class="sr" for="inc">Money in each month</label><input id="inc" class="pad" inputmode="numeric" placeholder="₹" value="'+(ob.typed||'')+'" data-in="typed" autocomplete="off">'+
  (ob.err?'<p class="err" role="status">'+ob.err+'</p>':'')+'<div class="foot">'+btn("That's right",'s1ok',null,'pri')+'</div></div>';
 R.key=false;return '<div class="setup">'+dots(1)+'<h1>What comes in each month?</h1><p class="muted">We found ₹9,000 from your linked UPI.</p>'+
  '<div class="card"><div class="row between"><span class="eyebrow">Money in</span>'+key()+'</div>'+tv([{amt:ob.income,fill:sav(),drop:true}],{size:15},fmt(ob.income)+' a month')+'</div>'+
  '<div class="foot">'+btn("That's right",'s1ok',null,'pri')+'<button class="link" data-a="s1change">Change</button></div></div>';}
A.s1change=function(){S.ob.manual=true;S.ob.taps++;render();var i=document.getElementById('inc');if(i)i.focus();};
A.s1ok=function(){var ob=S.ob;if(ob.manual){var v=parseInt(String(ob.typed||'').replace(/[^\d]/g,''),10)||0;if(v<=0){ob.err='Type an amount above ₹0.';render();return;}ob.income=v;ob.err='';ob.save=Math.min(v,r100(v*.15));}
 ob.taps++;play('tap');S.scr='S-02';render();};
var TYPES=[['Hostel','Mess, trips home'],['Day scholar','Travel every day'],['Renting','Rent comes out on its own'],['Earning','Part-time or freelance']];
function S02(){return '<div class="setup">'+dots(2)+'<h1>Which is most like you?</h1><p class="muted">We\'ll start your jars from this.</p><div class="types">'+
 TYPES.map(function(t){return '<button class="type" data-a="s2" data-v="'+t[0]+'" aria-pressed="'+(S.ob.type===t[0])+'"><b>'+t[0]+'</b><small>'+t[1]+'</small></button>';}).join('')+'</div></div>';}
A.s2=function(v){S.ob.type=v;S.ob.taps++;play('tap');S.scr='S-03';render();};
function S03(){R.key=false;var ob=S.ob;return '<div class="setup">'+dots(3)+'<h1>Put this much away first?</h1><p class="muted">Savings come out before anything else.</p>'+
 '<div class="card"><div class="row between"><span class="eyebrow">Savings</span>'+key()+'</div>'+tv([{amt:ob.save,fill:sav()}],{size:16,fullRow:true},fmt(ob.save)+' to savings')+'</div>'+
 '<div class="stepper"><button class="cbtn" data-a="s3step" data-v="-1" aria-label="One tile less">−</button><button class="cbtn" data-a="s3step" data-v="1" aria-label="One tile more">+</button></div>'+
 '<div class="foot">'+btn('Save '+fmt(ob.save),'s3ok',null,'pri')+'</div></div>';}
A.s3step=function(v){var ob=S.ob;ob.save=Math.max(0,Math.min(ob.income-1000,ob.save+100*(+v)));play('tile');render();};
A.s3ok=function(){S.ob.taps++;play('save');S.scr='S-04';render();};
function obSubs(){return S.ob.manual?[]:[{name:'Spotify',amt:119,due:18},{name:'Google One',amt:130,due:5},{name:'Coursera',amt:399,due:24}];}
function S04(){R.key=false;var ob=S.ob,subs=obSubs(),st=subs.reduce(function(a,s){return a+s.amt;},0),plan=planCats(ob.income-ob.save-st,ob.type,0);
 var segs=[{amt:ob.save,fill:sav()},{amt:st,kind:'hatch'}].concat(CATS.map(function(c){return {amt:plan[c],fill:cf(c)};}));
 var ex='Savings '+fmt(ob.save)+(st?' · Subscriptions '+fmt(st):'')+' · '+CATS.map(function(c){return c+' '+fmt(plan[c]);}).join(' · ');
 return '<div class="setup">'+dots(4)+'<h1>Your month</h1><div class="card"><div class="row between"><span class="eyebrow">Money in</span>'+key()+'</div>'+tv(segs,{size:14},ex)+
 '<div class="lg">'+lgItem(sav(),'Savings')+(st?lgItem('','Set aside for subscriptions','hatch'):'')+CATS.map(function(c){return lgItem(cf(c),c);}).join('')+'</div></div>'+
 '<p class="muted">Tap the tiles for exact amounts. You can move tiles between jars any time.</p>'+
 '<div class="foot">'+btn('Start','s4ok',null,'pri')+'<button class="link" data-a="s4ok" data-v="skip">Skip for now</button></div></div>';}
A.s4ok=function(){var ob=S.ob;ob.taps++;ob.ms=Math.round(performance.now()-ob.t0);window.__ob={taps:ob.taps,ms:ob.ms,manual:ob.manual};
 setupMonth({income:ob.income,type:ob.type,save:ob.save,day:1,bank:0,subs:obSubs()});L.goals=[];
 if(!ob.manual){L.subs.forEach(function(s){if(s.due<1)s.state='spent';});}
 S.scr='H-01';play('save');FX.push('dropHome');render();};

/* ---------- H-01 Home: widget grid, no budget numbers ---------- */
var LIB={goal:['Goal rows','L'],month:['Month so far','W'],where:['Where it went','L'],owed:['Friends owe you','S'],range:['Spend range','W']};
function card(id){var c='',n;
 if(id==='pace'){var w=paceWord(),gi=w==='Calm'?.6:w==='Steady'?.4:.2;
  return '<div class="card W glow" style="--gi:'+gi+'" data-a="exact" data-v="'+esc('Spending money left: '+fmt(leftAll())+' of '+fmt(catsTotal()))+'" role="button" tabindex="0">'+IC.gear+'<span class="eyebrow">How it\'s going</span><div class="word">'+w+'</div></div>';}
 if(id==='saved')return '<div class="card S" data-a="go" data-v="M-04" role="button" tabindex="0">'+IC.gear+key()+tilesSVG([{amt:L.savingsSplit,fill:sav(),drop:FX.indexOf('dropHome')>=0}],{size:11})+'<div class="ttl"><b>Saved this month</b></div></div>';
 if(id==='next'){var nx=L.subs.filter(function(s){return s.state==='reserved';}).sort(function(a,b){return a.due-b.due;})[0];
  if(!nx)return '<div class="card S" data-a="go" data-v="M-03" role="button" tabindex="0">'+IC.gear+'<div class="ttl"><b>Next to come out</b><span>Nothing left this month</span></div></div>';
  return '<div class="card S" data-a="go" data-v="M-03" role="button" tabindex="0">'+IC.gear+tilesSVG([{amt:nx.amt,kind:'hatch'}],{size:14})+'<div class="ttl"><b>Next to come out</b><span>'+nx.name+' · '+cap(dueWord(nx.due))+'</span></div></div>';}
 if(id==='week'){var a=weekSpend(0),b=weekSpend(1);
  if(!L.pays.filter(function(p){return p.item!=='start';}).length)return '<div class="card W">'+IC.gear+'<p>Your tiles are all here. Pay with UPI and watch them go.</p><div class="ttl"><b>This week</b></div></div>';
  return '<div class="card W" data-a="exact" data-v="'+esc('This week '+fmt(a)+' · Last week '+fmt(b))+'" role="button" tabindex="0">'+IC.gear+
  '<div class="row"><span class="muted" style="width:74px;font-size:13px">This week</span>'+tilesSVG([{amt:a,fill:'var(--tile)'}],{size:10})+'</div>'+
  '<div class="row"><span class="muted" style="width:74px;font-size:13px">Last week</span>'+tilesSVG([{amt:b,kind:'out'}],{size:10})+'</div><div class="ttl"><b>This week</b></div></div>';}
 if(id==='little'){var ch=L.pays.filter(function(p){return p.item==='chai'&&p.day>L.day-7;});
  if(!ch.length)return '<div class="card W">'+IC.gear+'<p class="muted">Small repeat buys show up here.</p><div class="ttl"><b>Little things</b></div></div>';
  var tot=ch.reduce(function(s,p){return s+p.amt;},0);
  return '<div class="card W" data-a="exact" data-v="'+esc('Chai ×'+ch.length+' ≈ '+Math.max(1,Math.round(tot/100))+' tile · '+fmt(tot))+'" role="button" tabindex="0">'+IC.gear+
  tilesSVG(ch.map(function(p){return {amt:p.amt,fill:cf('Food')};}),{size:20})+'<div class="ttl"><b>Little things</b><span>Chai this week</span></div></div>';}
 if(id==='goal'){var g=L.goals[0];if(!g)return '<div class="card L" data-a="go" data-v="M-04" role="button" tabindex="0"><div class="ttl"><b>What are you saving for?</b></div></div>';
  return '<div class="card L" data-a="go" data-v="M-04" role="button" tabindex="0">'+IC.gear+key()+tilesSVG([{amt:g.saved,fill:sav()},{amt:g.target-g.saved,kind:'out'}],{size:11})+'<div class="ttl"><b>'+esc(g.name)+'</b><span>Goal rows</span></div></div>';}
 if(id==='month')return '<div class="card W" data-a="go" data-v="I-01" role="button" tabindex="0">'+calendar()+'<div class="ttl"><b>Month so far</b><span>Brighter = more spent that day</span></div></div>';
 if(id==='where')return '<div class="card L" data-a="go" data-v="I-01" role="button" tabindex="0">'+whereRows()+'<div class="ttl"><b>Where it went</b></div></div>';
 if(id==='owed')return '<div class="card S" data-a="go" data-v="M-06" role="button" tabindex="0">'+(owedOpen()?tilesSVG([{amt:owedOpen(),kind:'dash',fill:'var(--fg)'}],{size:12}):'')+'<div class="ttl"><b>Friends owe you</b></div></div>';
 if(id==='range')return '<div class="card W" data-a="go" data-v="I-01" role="button" tabindex="0">'+rangeTiles()+'<div class="ttl"><b>Spend range</b><span>Solid is likely, outlined is possible</span></div></div>';
 return '';}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
function H01(){R.key=false;return head('Hi Tarun',{right:'<button class="cbtn" data-a="sheet" data-v="add" aria-label="Add a card">'+IC.add+'</button><button class="cbtn" data-a="go" data-v="X-01" aria-label="Settings">'+IC.set+'</button>'})+
 '<div class="grid">'+S.home.map(card).join('')+(S.home.length<7?'<button class="card add" data-a="sheet" data-v="add">'+IC.add.replace('<svg','<svg width="28" height="28"')+'<b style="font:600 15px var(--display)">Add a card</b></button>':'')+'</div>';}
function addSheet(){var free=Object.keys(LIB).filter(function(k){return S.home.indexOf(k)<0;});
 return '<h2>Add a card</h2><p class="muted">Home holds up to six cards.</p><div class="list">'+(free.length?free.map(function(k){return '<button class="li" data-a="addcard" data-v="'+k+'"><span class="grow"><b>'+LIB[k][0]+'</b></span>'+IC.chev+'</button>';}).join(''):'<p style="padding:16px" class="muted">All cards are on Home.</p>')+'</div>';}
A.addcard=function(k){if(S.home.length>=6)S.home.shift();S.home.push(k);S.sheet=null;play('tap');render();};

/* ---------- Pay P-01..P-06 ---------- */
function P01(){var p=S.pay||{};return head('Pay',{back:true})+'<div class="stack"><h2>Who\'s it for?</h2><div class="list">'+
 PAYEES.map(function(x,i){return '<button class="li" data-a="payee" data-v="'+i+'"><span class="grow"><b>'+x.n+'</b><small>'+x.vpa+'</small></span>'+IC.chev+'</button>';}).join('')+
 '<button class="li" data-a="payee" data-v="manual"><span class="grow"><b>Someone else</b><small>Paid in cash or another way</small></span>'+IC.chev+'</button></div>'+
 (p.manual?'<div class="card"><label for="amt" class="eyebrow">How much?</label><input id="amt" class="pad" inputmode="numeric" placeholder="₹" data-in="amt" value="'+(p.typed||'')+'" autocomplete="off">'+
  (p.err?'<p class="err" role="status">'+p.err+'</p>':'')+btn('Next','manualNext',null,'pri')+'</div>':'')+'</div>';}
A.payee=function(v){if(v==='manual'){S.pay={manual:true,typed:'',step:1};render();var i=document.getElementById('amt');if(i)i.focus();return;}
 var x=PAYEES[+v];S.pay={payee:x.n,item:x.item,amt:x.amt,cat:x.cat,vpa:x.vpa,upi:true,step:1};play('tap');S.scr='P-02';render();};
A.manualNext=function(){var p=S.pay,v=parseInt(String(p.typed||'').replace(/[^\d]/g,''),10)||0;if(v<=0){p.err='Type an amount above ₹0.';render();return;}
 S.pay={payee:'Cash',item:'cash',amt:v,cat:'Food',upi:false,step:1};S.scr='P-02';render();};
function P02(){R.key=false;var p=S.pay;return head('Which jar?',{back:true})+'<div class="stack"><p class="muted">'+esc(p.payee)+(p.upi?' · '+p.vpa:'')+'</p>'+
 '<div class="hero-num">'+fmt(p.amt)+'</div><div class="chips" role="group" aria-label="Jar">'+CATS.map(function(c){return '<button class="chip" data-a="pcat" data-v="'+c+'" aria-pressed="'+(p.cat===c)+'">'+swatch(cf(c))+c+'</button>';}).join('')+'</div>'+
 '<div class="card"><div class="row between"><span class="eyebrow">'+p.cat+'</span>'+key()+'</div>'+tv(jarSegs(p.cat),{size:13},p.cat+': '+fmt(left(p.cat))+' left')+
 '<p class="muted" style="font-size:13px">'+(canPay(p.cat,p.amt)?'These tiles leave '+p.cat+' when you pay.':p.cat+' is empty for this one.')+'</p></div>'+
 btn(p.upi?'Pay '+fmt(p.amt)+' with UPI':'Add '+fmt(p.amt),'payGo',null,'pri')+'</div>';}
A.pcat=function(c){S.pay.cat=c;play('toggle');render();};
A.payGo=function(){var p=S.pay;if(!canPay(p.cat,p.amt)){var short=p.amt-left(p.cat),take=Math.ceil(short/100)*100,src=mostLeft(p.cat);
  S.sheet={id:'P-05',take:take,src:src,whole:left(src)<take,short:short};render();return;}doPay();};
function doPay(){var p=S.pay,before=left(p.cat);var rec=pay({payee:p.payee,item:p.item,amt:p.amt,cat:p.cat,upi:p.upi,vpa:p.vpa});p.id=rec.id;p.before=before;
 S.sheet=null;S.scr='P-03';p.t0=performance.now();render();
 var n=Math.ceil(p.amt/100);tileTicks(n,40);setTimeout(function(){play('pay');},Math.min(700,n*45)+150);
 clearTimeout(S._pt);S._pt=setTimeout(function(){if(S.scr==='P-03'){S.scr='P-04';render();}},isReduced()?400:1900);}
function P03(){R.key=false;var p=S.pay,lf=left(p.cat),k=L.cats[p.cat],rm=isReduced();
 var spentPrev=Math.max(0,k.budget+k.moveIn-k.moveOut+k.back-p.before);
 /* tiles of this payment leave the jar (≤1.2 s), the rest stays */
 var segs=[{amt:lf,fill:cf(p.cat)},rm?{amt:p.amt,kind:'out'}:{amt:p.amt,fill:cf(p.cat),leave:true},{amt:spentPrev,kind:'out'}];
 return '<div class="stack" style="padding-top:40px"><span class="eyebrow">'+p.cat+'</span><div class="card">'+key()+tilesSVG(segs,{size:15,leaveFrom:Math.ceil(lf/100)})+'</div>'+
 '<div class="handoff" role="status">'+(p.upi?'<div class="spin" aria-hidden="true"></div><div><b>Opening your UPI app</b><small class="muted" style="display:block">tarun@okaxis to '+esc(p.vpa)+'</small></div>':'<div><b>Adding it</b></div>')+'</div></div>';}
function P04(){R.key=false;var p=S.pay,rc=p.upi?repeatCount(p.payee,L.day):0;var split=p.amt>=300&&!p.splitDone&&p.upi&&p.cat!=='Travel';
 return '<div class="stack" style="padding-top:40px"><h1>Paid '+fmt(p.amt)+' · '+p.cat+'</h1>'+(rc>=3?'<p class="muted">'+cap(ord(rc))+' '+esc(p.item)+' this week.</p>':'')+
 '<div class="card"><div class="row between"><span class="eyebrow">'+p.cat+'</span>'+key()+'</div>'+tv(jarSegs(p.cat),{size:13},p.cat+': '+fmt(left(p.cat))+' left')+'</div>'+
 (split?'<h2>Split with friends?</h2><div class="row">'+btn('Split','sheet','P-06','wide')+btn('Just me','payDone',null,'pri')+'</div>':btn('Done','payDone',null,'pri'))+
 '<div style="text-align:center"><button class="link" data-a="payUndo">Undo</button></div></div>';}
A.payDone=function(){S.scr='H-01';S.pay=null;render();};
A.payUndo=function(){undoPay(S.pay.id);S.pay=null;S.scr='H-01';toast('Payment removed. The tiles are back.');render();};
function P05(){var sh=S.sheet,p=S.pay;
 if(sh.whole)return '<h2>Your spending money is used up this month.</h2><p class="muted">Next month can start '+fmt(sh.take)+' lighter, or use savings.</p>'+
  btn('Start next month lighter','overLight',null,'pri')+'<div style="text-align:center"><button class="link" data-a="overSave">Use savings</button></div>';
 if(sh.pick)return '<h2>Pick another jar</h2><div class="list">'+CATS.filter(function(c){return c!==p.cat&&left(c)>=sh.take;}).map(function(c){return '<button class="li" data-a="overTake" data-v="'+c+'">'+swatch(cf(c))+'<span class="grow"><b>Take from '+c+'</b></span>'+IC.chev+'</button>';}).join('')+'</div>';
 return '<h2>'+p.cat+' is empty.</h2><p class="muted">Take '+fmt(sh.take)+' from '+sh.src+'?</p>'+btn('Take from '+sh.src,'overTake',sh.src,'pri')+'<div style="text-align:center"><button class="link" data-a="overPick">Pick another jar</button></div>';}
A.overTake=function(src){moveTiles(src,S.pay.cat,S.sheet.take);play('pour');doPay();};
A.overPick=function(){S.sheet.pick=true;render();};
A.overLight=function(){startLighter(S.pay.cat,S.sheet.take);doPay();};
A.overSave=function(){var t=S.sheet.take,u=Math.min(t,Math.max(0,savingsTotal()-goalSaved()));if(u)useSavings(S.pay.cat,u);if(t-u>0)startLighter(S.pay.cat,t-u);doPay();};
function P06(){var p=S.pay,sel=S.sheet.sel||(S.sheet.sel=FRIENDS.slice(0,1)),n=sel.length+1;
 return '<h2>Split with friends?</h2><p class="muted">Their share sits outside your spending money until they pay you back.</p><div class="chips" role="group" aria-label="Friends">'+FRIENDS.map(function(f){return '<button class="chip" data-a="splitF" data-v="'+f+'" aria-pressed="'+(sel.indexOf(f)>=0)+'">'+f+'</button>';}).join('')+'</div>'+
 btn('Split '+fmt(p.amt)+' '+(n===2?'two':n===3?'three':'four')+' ways','splitGo',null,'pri',sel.length?'':' disabled');}
A.splitF=function(f){var s=S.sheet.sel,i=s.indexOf(f);if(i>=0)s.splice(i,1);else s.push(f);render();};
A.splitGo=function(){splitPay(S.pay.id,S.sheet.sel);S.pay.splitDone=true;S.sheet=null;play('tap');toast('Split. Friends owe you their share.');S.scr='P-04';render();};

/* ---------- Money M-01..M-06 ---------- */
function M01(){R.key=false;var segs=[{amt:L.savingsSplit,fill:sav()},{amt:subsTotal(),kind:'hatch'}].concat(CATS.map(function(c){return {amt:L.cats[c].budget,fill:cf(c)};}));
 if(!L.incomes.length)return head('Money')+'<div class="card"><p>Your money comes in soon. When it does, it splits into savings and spending money.</p></div>';
 return head('Money')+'<div class="stack"><div class="card"><div class="row between"><span class="eyebrow">Money in</span>'+key()+'</div><div class="hero-num">'+fmt(incomeIn())+'</div>'+
 tv(segs,{size:13},'Savings '+fmt(L.savingsSplit)+' · Subscriptions '+fmt(subsTotal())+' · Jars '+fmt(catsTotal()))+
 '<div class="lg">'+lgItem(sav(),'Savings')+lgItem('','Subscriptions','hatch')+lgItem('var(--tile)','Jars')+'</div></div>'+
 '<div class="list"><button class="li" data-a="go" data-v="M-04"><span class="grow"><b>Savings</b><small>Goals and what you\'ve put away</small></span>'+IC.chev+'</button>'+
 '<button class="li" data-a="go" data-v="M-03"><span class="grow"><b>Subscriptions</b><small>Comes out on its own</small></span>'+IC.chev+'</button></div>'+
 '<span class="eyebrow">Jars</span><div class="list">'+CATS.map(function(c){return '<button class="jarrow" data-a="jar" data-v="'+c+'"><span class="row between" style="width:100%"><b>'+c+'</b>'+IC.chev+'</span>'+tilesSVG(jarSegs(c),{size:9})+'</button>';}).join('')+'</div>'+
 '<div class="list"><button class="li" data-a="go" data-v="M-05"><span class="grow"><b>Move tiles</b><small>Between jars. The total stays the same.</small></span>'+IC.chev+'</button>'+
 '<button class="li" data-a="go" data-v="M-06"><span class="grow"><b>Friends owe you</b></span>'+IC.chev+'</button></div></div>';}
A.jar=function(c){S.jar=c;S.showPays=false;go('M-02');};
function M02(){R.key=false;var c=S.jar,ps=L.pays.filter(function(p){return p.cat===c;}).slice().reverse();
 return head(c,{back:true})+'<div class="stack"><div class="card"><div class="row between"><span class="hero-num">'+fmt(left(c))+' left</span>'+key()+'</div>'+tv(jarSegs(c),{size:16,fullRow:true},c+': '+fmt(left(c))+' left of '+fmt(L.cats[c].budget+L.cats[c].moveIn-L.cats[c].moveOut))+
 '<div class="lg">'+lgItem(cf(c),'Left')+lgItem('','Spent','out')+'</div></div>'+
 (S.showPays?'<div class="list">'+(ps.length?ps.map(function(p){return '<div class="li"><span class="grow"><b>'+esc(p.payee)+'</b><small>'+ord(p.day)+' '+monthName().slice(0,3)+(p.split?' · split':'')+'</small></span><span class="num">'+fmt(p.amt)+'</span></div>';}).join(''):'<p class="li muted">No payments yet.</p>')+'</div>':
 '<button class="btn wide" data-a="showPays">See payments</button>')+btn('Move tiles','go','M-05','pri')+'</div>';}
A.showPays=function(){S.showPays=true;render();};
function M03(){R.key=false;var subs=L.subs.slice().sort(function(a,b){return a.due-b.due;});
 return head('Subscriptions',{back:true})+'<div class="stack"><p class="muted">These come out on their own. The tiles are set aside first.</p>'+
 (subs.length?'<div class="list">'+subs.map(function(s,i){return '<button class="jarrow" data-a="subOpen" data-v="'+s.id+'"><span class="row between" style="width:100%"><b>'+esc(s.name)+'</b><span class="muted" style="font-size:13px">'+(s.state==='spent'?'Paid':'Set aside · '+cap(dueWord(s.due)))+'</span></span>'+
  (i===0?key():'')+tilesSVG([{amt:s.amt,kind:s.state==='spent'?'out':'hatch'}],{size:13})+'</button>';}).join('')+'</div>':'<div class="card"><p>No subscriptions yet.</p></div>')+
 btn('Add a subscription','subAdd',null,'pri')+'</div>';}
A.subOpen=function(id){var s=L.subs.find(function(x){return x.id===id;});S.sheet={id:'sub',sid:id};render();};
function subSheet(){var s=L.subs.find(function(x){return x.id===S.sheet.sid;});if(!s)return '';
 return '<h2>'+esc(s.name)+'</h2><p class="hero-num">'+fmt(s.amt)+'</p><p class="muted">'+(s.state==='spent'?'Paid this month.':'Comes out '+dueWord(s.due)+'. It\'s already set aside.')+'</p>'+
 (s.state==='reserved'?btn('Stop tracking','subStop',s.id,'wide'):'')+btn('Done','closeSheet',null,'pri');}
A.subStop=function(id){if(stopSub(id)){toast('Stopped. The tiles went back to Other.');}S.sheet=null;render();};
A.subAdd=function(){S.sheet={id:'subadd',step:0,name:'',amt:'',due:''};render();};
function subAddSheet(){var sh=S.sheet,q=[["What's it called?",'name','text','Netflix'],['How much?','amt','numeric','₹'],['Which day does it come out?','due','numeric','Day of the month']][sh.step];
 return '<h2>'+q[0]+'</h2><label class="sr" for="sa">'+q[0]+'</label><input id="sa" class="pad" inputmode="'+q[2]+'" placeholder="'+q[3]+'" data-in="sheet.'+q[1]+'" value="'+esc(sh[q[1]]||'')+'" autocomplete="off">'+(sh.err?'<p class="err">'+sh.err+'</p>':'')+btn(sh.step<2?'Next':'Add it','subAddNext',null,'pri');}
A.subAddNext=function(){var sh=S.sheet;sh.err='';if(sh.step===0&&!String(sh.name).trim()){sh.err='Type a name.';render();return;}
 if(sh.step===1){var a=parseInt(String(sh.amt).replace(/[^\d]/g,''),10)||0;if(a<=0){sh.err='Type an amount above ₹0.';render();return;}sh.amtN=a;}
 if(sh.step===2){var d=parseInt(sh.due,10)||0;if(d<1||d>31){sh.err='Type a day from 1 to 31.';render();return;}if(sh.amtN>left(mostLeft())){sh.err='Move some tiles first. No jar has this much left.';render();return;}
  var r=addSub(String(sh.name).trim(),sh.amtN,Math.min(d,30));S.sheet=null;toast(r.sub.name+' added. Set aside from '+r.from+'.');render();return;}
 sh.step++;render();var i=document.getElementById('sa');if(i)i.focus();};
function M04(){R.key=false;var g=L.goals[0],free=savingsTotal()-goalSaved();
 var h=head('Savings',{back:true})+'<div class="stack"><div class="card"><div class="row between"><span class="eyebrow">All your savings</span>'+key()+'</div><div class="hero-num">'+fmt(savingsTotal())+'</div>'+
  tv([{amt:savingsTotal(),fill:sav()}],{size:savingsTotal()>6000?8:11},'Savings '+fmt(savingsTotal())+' · this month '+fmt(L.savingsSplit))+'</div>';
 if(!g)return h+'<div class="card"><h2>What are you saving for?</h2>'+btn('Add a goal','goalNew',null,'pri')+'</div></div>';
 var step=Math.min(free,700);
 return h+'<div class="card"><div class="row between"><b style="font:600 18px var(--display)">'+esc(g.name)+'</b><span class="muted" style="font-size:13px">Each row is a tenth of the way</span></div>'+
 tv([{amt:g.saved,fill:sav()},{amt:g.target-g.saved,kind:'out'}],{size:15,fullRow:true},esc(g.name)+': '+fmt(g.saved)+' of '+fmt(g.target))+'</div>'+
 (step>=100?btn('Put '+Math.floor(step/100)+' tiles toward '+esc(g.name),'goalAdd',Math.floor(step/100)*100,'pri'):'<p class="muted">New savings will show up here.</p>')+'</div>';}
A.goalNew=function(){L.goals=[{id:'g1',name:'Goa trip',target:8000,saved:0}];render();};
A.goalAdd=function(v){var g=L.goals[0],r=goalAdd(g.id,+v);FX.push('goal');
 if(r.row){play('goal');toast('Row '+r.row+' done. '+g.name+' is '+(r.row*10)+'% there!',null,4000);S.milestone=r.row;}else{play('save');toast('Moved '+fmt(r.amt)+' to '+g.name+'.');}render();};
function M05(){var m=S.mv;if(!m.from||m.from===m.to)m.from=mostLeft(m.to);var n=Math.min(m.n,Math.floor(left(m.from)/100));
 R.key=false;return head('Move tiles',{back:true})+'<div class="stack"><p class="muted">Drag tiles from one jar to another. The total stays the same.</p>'+
 '<span class="eyebrow">From</span><div class="chips" role="group" aria-label="From">'+CATS.map(function(c){return '<button class="chip" data-a="mvFrom" data-v="'+c+'" aria-pressed="'+(m.from===c)+'">'+swatch(cf(c))+c+'</button>';}).join('')+'</div>'+
 '<span class="eyebrow">To</span><div class="chips" role="group" aria-label="To">'+CATS.map(function(c){return '<button class="chip" data-a="mvTo" data-v="'+c+'" aria-pressed="'+(m.to===c)+'">'+swatch(cf(c))+c+'</button>';}).join('')+'</div>'+
 '<div class="card">'+key()+'<div class="row" style="flex-wrap:wrap">'+tilesSVG([{amt:n*100,fill:cf(m.from)}],{size:16})+'</div><div class="stepper"><button class="cbtn" data-a="mvN" data-v="-1" aria-label="One tile less">−</button><button class="cbtn" data-a="mvN" data-v="1" aria-label="One tile more">+</button></div></div>'+
 btn('Move '+n+' tile'+(n===1?'':'s')+' to '+m.to,'mvGo',null,'pri',n>0?'':' disabled')+'</div>';}
A.mvFrom=function(c){S.mv.from=c;if(S.mv.to===c)S.mv.to=CATS.find(function(x){return x!==c;});render();};
A.mvTo=function(c){S.mv.to=c;if(S.mv.from===c)S.mv.from=null;render();};
A.mvN=function(v){S.mv.n=Math.max(1,S.mv.n+(+v));play('tile');render();};
A.mvGo=function(){var m=S.mv,n=Math.min(m.n,Math.floor(left(m.from)/100));var a=moveTiles(m.from,m.to,n*100);play('pour');toast('Moved '+fmt(a)+' from '+m.from+' to '+m.to+'.');S.mv.n=1;render();};
function M06(){R.key=false;var open=L.owed.filter(function(o){return o.back<o.amt;});
 return head('Friends owe you',{back:true})+'<div class="stack">'+(open.length?'<p class="muted">Dashed tiles sit outside your spending money. When a friend pays you back on UPI, they go back to the jar they came from.</p><div class="list">'+
  open.map(function(o){return '<div class="jarrow"><span class="row between" style="width:100%"><b>'+esc(o.friend)+'</b><span class="muted" style="font-size:13px">'+o.cat+'</span></span>'+key()+tv([{amt:o.amt-o.back,kind:'dash',fill:cf(o.cat)}],{size:13},o.friend+' owes you '+fmt(o.amt-o.back))+
  '<button class="btn" data-a="payBack" data-v="'+o.id+'">'+esc(o.friend)+' paid me back</button></div>';}).join('')+'</div>':'<div class="card"><p>Nobody owes you anything. Nice.</p></div>')+'</div>';}
A.payBack=function(id){var o=L.owed.find(function(x){return x.id===id;});var a=payBack(id);play('pour');FX.push('drop');toast(o.friend+' paid you back. '+fmt(a)+' went back to '+o.cat+'.');render();};

/* ---------- Insights I-01..I-03 ---------- */
function calendar(){var max=1,d=[];for(var i=1;i<=L.monthLen;i++){var v=L.pays.filter(function(p){return p.day===i&&p.item!=='start';}).reduce(function(s,p){return s+p.amt;},0);d.push(v);max=Math.max(max,v);}
 return '<div class="cal" aria-label="Month so far: brighter dots are days with more spent">'+d.map(function(v,i){var on=i+1<=L.day;return '<i style="opacity:'+(on?(v?0.25+0.75*v/max:0.12):0.05)+'"></i>';}).join('')+'</div>';}
function whereRows(){return CATS.map(function(c){var sp=L.cats[c].spent-L.cats[c].back;return '<div class="row"><span style="width:52px;font-size:13px" class="muted">'+c+'</span>'+tilesSVG([{amt:Math.max(0,sp),fill:cf(c)}],{size:9})+'</div>';}).join('');}
function rangeTiles(){var d=Math.max(1,L.day),rate=spentAll()/d,rest=L.monthLen-L.day,likely=Math.round(rate*rest*0.9),poss=Math.round(rate*rest*0.35);
 return tilesSVG([{amt:likely,fill:'var(--tile)'},{amt:poss,kind:'out'}],{size:9});}
function I01(){R.key=false;var a=weekSpend(0),b=weekSpend(1),any=L.pays.some(function(p){return p.item!=='start';});
 return head('Insights')+'<div class="stack">'+(!any?'<div class="card"><p>Come back Sunday for your first week in tiles.</p></div>':
 '<div class="card"><div class="row between"><b style="font:600 16px var(--display)">This week</b>'+key()+'</div>'+
  '<div class="row"><span class="muted" style="width:74px;font-size:13px">This week</span>'+tv([{amt:a,fill:'var(--tile)'}],{size:11},'This week '+fmt(a))+'</div>'+
  '<div class="row"><span class="muted" style="width:74px;font-size:13px">Last week</span>'+tv([{amt:b,kind:'out'}],{size:11},'Last week '+fmt(b))+'</div></div>'+
 '<div class="card"><b style="font:600 16px var(--display)">Month so far</b>'+calendar()+'<span class="muted" style="font-size:13px">Brighter = more spent that day</span></div>'+
 '<div class="card" data-a="exact" data-v="'+esc(CATS.map(function(c){return c+' '+fmt(L.cats[c].spent-L.cats[c].back);}).join(' · '))+'" role="button" tabindex="0"><b style="font:600 16px var(--display)">Where it went</b>'+whereRows()+'</div>'+
 '<div class="card" data-a="exact" data-v="'+esc(littleText())+'" role="button" tabindex="0"><b style="font:600 16px var(--display)">Little things</b>'+littleStrip()+'<span class="muted" style="font-size:13px">Small buys you repeat</span></div>')+
 '<div class="list"><button class="li" data-a="storyGo"><span class="grow"><b>Your month in tiles</b><small>Five short cards</small></span>'+IC.chev+'</button>'+
 '<button class="li" data-a="go" data-v="I-03"><span class="grow"><b>Flow of tiles</b><small>Where money in went</small></span>'+IC.chev+'</button>'+
 '<button class="li" data-a="sheet" data-v="N-03"><span class="grow"><b>Weekly check-in</b><small>Sunday evening</small></span>'+IC.chev+'</button></div></div>';}
function littleGroups(){var g={};L.pays.forEach(function(p){if(p.amt<150&&p.day>L.day-7&&p.item!=='start'){(g[p.item]=g[p.item]||[]).push(p);}});return Object.keys(g).filter(function(k){return g[k].length>=2;}).map(function(k){return {item:k,ps:g[k]};});}
function littleText(){return littleGroups().map(function(x){var t=x.ps.reduce(function(s,p){return s+p.amt;},0);return cap(x.item)+' ×'+x.ps.length+' · '+fmt(t);}).join(' · ')||'Nothing repeated yet';}
function littleStrip(){return littleGroups().map(function(x){return '<div class="row"><span class="muted" style="width:74px;font-size:13px">'+cap(x.item)+'</span>'+tilesSVG(x.ps.map(function(p){return {amt:p.amt,fill:cf(p.cat)};}),{size:13})+'</div>';}).join('')||'<p class="muted">Nothing repeated yet.</p>';}
A.storyGo=function(){S.story=0;go('I-02');};
function projectedSaved(){return L.savingsSplit+(L.keepLeftover?0:leftAll());}
function I02(){R.key=false;var i=S.story,sv=projectedSaved(),big=CATS.slice().sort(function(a,b){return (L.cats[b].spent)-(L.cats[a].spent);})[0];
 var cards=[['Your month in tiles','<p class="muted">Money in, split before you spent a rupee.</p><div class="card">'+key()+tilesSVG([{amt:L.savingsSplit,fill:sav()},{amt:subsTotal(),kind:'hatch'},{amt:catsTotal(),fill:'var(--tile)'}],{size:13})+'<div class="lg">'+lgItem(sav(),'Savings')+lgItem('','Subscriptions','hatch')+lgItem('var(--tile)','Jars')+'</div></div>'],
  ['The little things','<p class="muted">Small buys you made more than once.</p><div class="card">'+key()+littleStrip()+'</div>'],
  ['Where it went','<p class="muted">Most went to '+big+'.</p><div class="card">'+key()+whereRows()+'</div>'],
  ['Left over','<p class="muted">'+(L.keepLeftover?'These tiles stay in next month.':'These tiles go to savings when the month ends.')+'</p><div class="card">'+key()+tilesSVG(CATS.map(function(c){return {amt:left(c),fill:cf(c)};}),{size:12})+'</div>'],
  ['You saved '+fmt(sv),'<p class="muted">A fresh month starts next.</p><div class="card">'+key()+tilesSVG([{amt:sv,fill:sav(),drop:true}],{size:13})+'</div>']];
 var c=cards[i];return '<div class="story"><div class="bars" aria-label="Card '+(i+1)+' of 5">'+cards.map(function(_,k){return '<i class="'+(k<=i?'on':'')+'"></i>';}).join('')+'</div>'+
 '<div class="row between"><span class="eyebrow">'+monthName()+'</span><button class="cbtn" data-a="go" data-v="I-01" aria-label="Close">'+IC.x+'</button></div>'+
 '<div class="big">'+c[0]+'</div>'+c[1]+'<div style="margin-top:auto" class="stack">'+(i<4?btn('Next','storyNext',null,'pri'):btn('Start a fresh month','monthEnd',null,'pri'))+(i>0?'<button class="link" data-a="storyPrev">Back</button>':'')+'</div></div>';}
A.storyNext=function(){S.story=Math.min(4,S.story+1);if(S.story===4)play('save');render();};
A.storyPrev=function(){S.story=Math.max(0,S.story-1);render();};
A.monthEnd=function(){var rec=closeMonth();S.lastClose=rec;play('save');S.scr='H-01';toast('A fresh month. '+rec.month+' ended with '+fmt(rec.saved)+' saved.',null,4500);
 setTimeout(function(){notify('income');},900);render();};
function I03(){R.key=false;/* flow of tiles: money in -> savings / subscriptions / jars, each a tile stack */
 var inc=incomeIn();if(!inc)return head('Flow of tiles',{back:true})+'<div class="card"><p>Nothing has come in yet.</p></div>';
 var parts=[['Savings',L.savingsSplit,sav(),'fill'],['Subscriptions',subsTotal(),'','hatch']].concat(CATS.map(function(c){return [c,L.cats[c].budget,cf(c),'fill'];}));
 var y=0,rows=parts.map(function(p){var n=Math.ceil(p[1]/100),h=Math.max(1,Math.ceil(n/10))*(9+2+3);var o={p:p,y:y,h:h};y+=h+14;return o;}),H=y;
 var src=Math.ceil(inc/100),srcH=Math.ceil(src/10)*14;
 var bands='';var sy=0;rows.forEach(function(r){var share=srcH*r.p[1]/inc;bands+='<path d="M 62 '+(sy+share/2)+' C 110 '+(sy+share/2)+', 110 '+(r.y+r.h/2)+', 150 '+(r.y+r.h/2)+'" stroke="'+(r.p[3]==='hatch'?'var(--hatch)':r.p[2])+'" stroke-width="'+Math.max(2,share)+'" fill="none" opacity=".28"/>';sy+=share;});
 return head('Flow of tiles',{back:true})+'<div class="stack"><p class="muted">Every tile of money in, and where it went first.</p><div class="card">'+key()+
 '<div style="display:grid;grid-template-columns:auto 1fr;gap:0;align-items:start"><div>'+tilesSVG([{amt:inc,fill:'var(--fg)'}],{size:9,perRow:1,cls:'flowsrc'}).replace('<svg','<svg style="width:60px"')+'</div>'+
 '<div style="position:relative;min-width:0"><svg viewBox="0 0 150 '+H+'" style="position:absolute;left:-60px;top:0;width:150px;height:'+H+'px;pointer-events:none" aria-hidden="true">'+bands+'</svg>'+
 rows.map(function(r){return '<div class="row" style="height:'+r.h+'px;margin-bottom:14px;padding-left:90px;gap:8px;position:relative">'+tilesSVG([{amt:r.p[1],fill:r.p[2],kind:r.p[3]}],{size:9})+'<span class="muted" style="font-size:12px;white-space:nowrap">'+r.p[0]+'</span></div>';}).join('')+'</div></div></div></div>';}

/* ---------- Sheets N-01..N-03 ---------- */
function N01(){var sh=S.sheet;R.key=false;
 if(sh.ask)return '<h2>'+fmt(sh.amt)+' came in.</h2><p class="muted">Is this money for your month, or a friend paying you back?</p>'+btn('For my month','incFor',null,'pri')+btn('Friend paying back','incFriend',null,'wide');
 var save=L.incomes.length?r100(sh.amt*L.lastSaveRatio):r100(sh.amt*L.lastSaveRatio);
 return '<h2>'+fmt(sh.amt)+' came in.</h2><p class="muted">Split it like last time?</p><div class="card" style="background:var(--card2)">'+key()+tilesSVG([{amt:save,fill:sav()},{amt:sh.amt-save,fill:'var(--tile)'}],{size:12})+
 '<div class="lg">'+lgItem(sav(),'Savings first')+lgItem('var(--tile)','Spending money')+'</div></div>'+btn('Split it','incSplit',null,'pri');}
A.incSplit=function(){var sh=S.sheet,rec=L.incomes.length?receiveIncome(sh.amt,sh.src||'Freelance'):receiveMonthIncome(sh.amt);S.sheet=null;play('income');setTimeout(function(){play('save');},450);
 S.lastInc=rec.id;FX.push('dropHome');toast('Split. ',{a:'incUndo',label:'Undo'},8000);S.scr='H-01';render();};
A.incUndo=function(){var ok=undoIncome(S.lastInc);S.toast=null;toast(ok?'Undone. The money is waiting to be split.':'Some of it is already spent, so it stays split.');render();};
A.incFor=function(){S.sheet.ask=false;render();};
A.incFriend=function(){var o=L.owed.find(function(x){return x.back<x.amt;});S.sheet=null;if(o){var a=payBack(o.id);toast(o.friend+' paid you back. '+fmt(a)+' went back to '+o.cat+'.');}else toast('Nobody owes you anything. Nice.');play('pour');render();};
function N02(){var s=L.subs.find(function(x){return x.name==='Spotify';})||L.subs[0];var d=139-s.amt,src=mostLeft();S.sheet.src=src;S.sheet.sid=s.id;
 return '<h2>'+s.name+' now costs '+fmt(139)+' (was '+fmt(s.amt)+').</h2><p class="muted">The difference comes from the jar with the most tiles left.</p>'+btn('Take '+fmt(d)+' from '+src,'priceOk',null,'pri')+'<div style="text-align:center"><button class="link" data-a="subStop" data-v="'+s.id+'">Stop tracking</button></div>';}
A.priceOk=function(){subPriceChange(S.sheet.sid,139,S.sheet.src);S.sheet=null;play('tap');toast('Spotify now takes '+fmt(139)+'.');render();};
function N03(){R.key=false;var a=weekSpend(0),b=weekSpend(1),d=Math.round((b-a)/100);
 var sub=d>0?'Last week you spent '+d+' tile'+(d===1?'':'s')+' less than the week before.':d<0?'Last week you spent '+(-d)+' tile'+(d===-1?'':'s')+' more than the week before.':'Last week looked like the week before.';
 return '<span class="eyebrow">Weekly check-in</span><h2>A fresh week.</h2><p class="muted">'+sub+'</p><div class="card" style="background:var(--card2)">'+key()+
 '<div class="row"><span class="muted" style="width:74px;font-size:13px">Last week</span>'+tilesSVG([{amt:a,fill:'var(--tile)'}],{size:10})+'</div>'+
 '<div class="row"><span class="muted" style="width:74px;font-size:13px">Week before</span>'+tilesSVG([{amt:b,kind:'out'}],{size:10})+'</div></div>'+
 '<div class="card" style="background:var(--card2)"><b>Your savings are all still there.</b>'+tilesSVG([{amt:L.savingsSplit,fill:sav()}],{size:10})+'</div>'+btn('Start the week','closeSheet',null,'pri');}

/* ---------- X-01 Settings (+ simulated moments) ---------- */
function sw(label,a,on,sub){return '<div class="sw-row"><span><b>'+label+'</b>'+(sub?'<small class="muted" style="display:block;font-size:12.5px">'+sub+'</small>':'')+'</span><button class="switch" data-a="'+a+'" aria-pressed="'+on+'" aria-label="'+label+'"></button></div>';}
var MOMENTS=[['income','Money comes in'],['credit','A friend sends money'],['subTomorrow','The day before Spotify'],['subDay','Spotify\'s day'],['price','Spotify price goes up'],['back','Rahul pays you back'],['day2','Day two note'],['week','Sunday evening'],['story','Last day of the month'],['lapsed','Away for five days']];
function X01(){var th=S.theme||curTheme();return head('Settings',{back:true})+'<div class="stack">'+
 '<div class="set"><span class="eyebrow">Look</span><div class="seg" role="group" aria-label="Look"><button data-a="look" data-v="color" aria-pressed="'+(S.look==='color')+'">Colour</button><button data-a="look" data-v="bw" aria-pressed="'+(S.look==='bw')+'">Black &amp; white</button></div></div>'+
 '<div class="set"><span class="eyebrow">Theme</span><div class="seg" role="group" aria-label="Theme"><button data-a="theme" data-v="dark" aria-pressed="'+(th==='dark')+'">Dark</button><button data-a="theme" data-v="light" aria-pressed="'+(th==='light')+'">Light</button></div></div>'+
 '<div class="list">'+sw('Sounds','sndT',SND.on,'Soft, and quiet when your phone is on silent')+sw('Less motion','rmT',S.reduced)+sw('Keep left over in next month','keepT',L.keepLeftover,'Off: left over goes to savings')+'</div>'+
 '<div class="list"><div class="li"><span class="grow"><b>Linked UPI IDs</b><small>tarun@okaxis</small></span></div><div class="li"><span class="grow"><small>Your money data stays on this phone. We never read your messages.</small></span></div></div>'+
 '<span class="eyebrow">Try a moment</span><p class="muted" style="font-size:13px">These show how Trickle reaches you. At most one note a day, none at night.</p><div class="list">'+
 MOMENTS.map(function(m){return '<button class="li" data-a="moment" data-v="'+m[0]+'"><span class="grow"><b>'+m[1]+'</b></span>'+IC.chev+'</button>';}).join('')+'</div>'+
 btn('Start setup again','restart',null,'wide')+'</div>';}
function curTheme(){return S.theme||(window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');}
A.look=function(v){S.look=v;try{localStorage.setItem('trickle11look',v);}catch(e){}play('toggle');render();};
A.theme=function(v){S.theme=v;try{localStorage.setItem('trickle11theme',v);}catch(e){}play('toggle');render();};
A.sndT=function(){SND.on=!SND.on;try{localStorage.setItem('trickle11snd',SND.on?'1':'0');}catch(e){}if(SND.on){sndUnlock();setTimeout(function(){play('toggle');},30);}render();};
A.rmT=function(){S.reduced=!S.reduced;render();};
A.keepT=function(){L.keepLeftover=!L.keepLeftover;render();};
A.restart=function(){S.ob={income:9000,manual:false,type:'Hostel',save:1400,taps:0,t0:0,err:''};S.home=['pace','saved','next','week','little'];S.scr='S-00';render();};

/* simulated notifications (Phase 7: ≤1 a day, quiet 22:00–08:00, no badges) */
var NOTES={income:function(){var a=L.incomes.length?1500:9000;return [fmt(a)+' came in.','Split it like last time?',function(){S.sheet={id:'N-01',amt:a,src:a===9000?'Pocket money from home':'Freelance'};}];},
 credit:function(){return [fmt(200)+' came in from Rahul.','Tap to sort it',function(){S.sheet={id:'N-01',amt:200,ask:true};}];},
 subTomorrow:function(){var s=L.subs.find(function(x){return x.name==='Spotify';});return [s?'Spotify comes out tomorrow. '+fmt(s.amt)+' is already set aside.':'No subscriptions set aside.','',function(){go('M-03');}];},
 subDay:function(){return ['Spotify paid.','It came out of the tiles set aside.',function(){var s=L.subs.find(function(x){return x.name==='Spotify';});if(s){L.day=Math.max(L.day,s.due);subDue(s.id);play('thud');}go('M-03');}];},
 price:function(){return ['Spotify costs more now.','Tap to see',function(){S.sheet={id:'N-02'};}];},
 back:function(){return ['Rahul paid you back.','Tap to see where it went',function(){var o=L.owed.find(function(x){return x.back<x.amt;});if(o){payBack(o.id);play('pour');}go('M-06');}];},
 day2:function(){return ['Day one in tiles: you saved them all. See how it went.','',function(){go('H-01');}];},
 week:function(){return ['A fresh week.','Your Sunday check-in is ready',function(){S.sheet={id:'N-03'};}];},
 story:function(){return ['Your '+monthName()+' story is ready.','',function(){S.story=0;go('I-02');}];},
 lapsed:function(){return ['Your savings are right where you left them.','',function(){go('H-01');}];}};
function notify(k){var n=NOTES[k]();S.notif={k:k,t:n[0],s:n[1],fn:n[2]};play('soft');clearTimeout(S._nt);S._nt=setTimeout(function(){S.notif=null;render();},7000);render();}
A.moment=function(k){S.scr='H-01';notify(k);};
A.notif=function(){var n=S.notif;S.notif=null;clearTimeout(S._nt);n.fn();render();};

/* ---------- generic actions ---------- */
function go(scr){if(scr!==S.scr)S.fromBack.push(S.scr);S.scr=scr;S.sheet=null;render();var sc=document.querySelector('.scr');if(sc)sc.scrollTop=0;}
A.go=function(v){play('tap');go(v);};
A.tab=function(v){S.fromBack=[];if(v==='P-01'){S.pay=null;}go(v);};
A.back=function(){var p=S.fromBack.pop()||'H-01';if(/^P-0/.test(S.scr))p=S.fromBack.filter(function(x){return !/^P-0/.test(x);}).pop()||'H-01';S.scr=p;S.sheet=null;render();};
A.sheet=function(v){S.sheet={id:v};render();};
A.closeSheet=function(){S.sheet=null;render();};
A.exact=function(v){if(v){toast(v);play('tap');render();}};
A.toastA=function(){var u=S.toast&&S.toast.undo;if(u)A[u.a]();};

/* ---------- render ---------- */
var FR={'S-01':S01,'S-02':S02,'S-03':S03,'S-04':S04,'H-01':H01,'P-01':P01,'P-02':P02,'P-03':P03,'P-04':P04,'M-01':M01,'M-02':M02,'M-03':M03,'M-04':M04,'M-05':M05,'M-06':M06,'I-01':I01,'I-02':I02,'I-03':I03,'X-01':X01};
var SH={'P-05':P05,'P-06':P06,'N-01':N01,'N-02':N02,'N-03':N03,add:addSheet,sub:subSheet,subadd:subAddSheet};
function render(){var root=document.documentElement;root.setAttribute('data-look',S.look);if(S.theme)root.setAttribute('data-theme',S.theme);else root.removeAttribute('data-theme');
 var app=document.getElementById('app');app.classList.toggle('reduced',!!S.reduced);R.key=false;
 if(S.scr==='S-00'){app.innerHTML=DEFS+splash();app.setAttribute('data-frame','S-00');clearTimeout(S._spt);S._spt=setTimeout(function(){if(S.scr==='S-00')A.splashgo();},isReduced()?1200:2400);return;}
 var t=tabOn(),body=FR[S.scr]();
 var h=DEFS+'<div class="scr'+(t?'':' noTab')+'" data-frame="'+S.scr+'">'+body+'</div>';
 if(t)h+='<nav class="tabbar" aria-label="Main"><button class="tab" data-a="tab" data-v="H-01" aria-current="'+(S.scr==='H-01'?'page':'false')+'">'+IC.home+'Home</button>'+
  '<button class="tab" data-a="tab" data-v="M-01" aria-current="'+(/^M-/.test(S.scr)?'page':'false')+'">'+IC.money+'Money</button>'+
  '<button class="tab pay" data-a="tab" data-v="P-01" aria-label="Pay">'+IC.pay+'Pay</button>'+
  '<button class="tab" data-a="tab" data-v="I-01" aria-current="'+(/^I-/.test(S.scr)?'page':'false')+'">'+IC.ins+'Insights</button></nav>';
 if(S.sheet&&SH[S.sheet.id]){R.key=false;h+='<div class="scrim" data-a="closeSheet"><div class="sheet" role="dialog" aria-modal="true" data-frame="'+S.sheet.id+'" data-stop="1"><div class="grab"></div>'+SH[S.sheet.id]()+'</div></div>';}
 if(S.toast)h+='<div class="toast'+(t?'':' noTab')+'" role="status"><span>'+esc(S.toast.msg)+'</span>'+(S.toast.undo?'<button class="link" data-a="toastA">'+S.toast.undo.label+'</button>':'')+'</div>';
 if(S.notif)h+='<button class="notif" data-a="notif"><span class="ic" style="color:var(--bg)">'+logo(22)+'</span><span><small>Trickle · now</small><b>'+esc(S.notif.t)+'</b>'+(S.notif.s?'<small>'+esc(S.notif.s)+'</small>':'')+'</span></button>';
 var sc=document.querySelector('.scr'),st=sc&&sc.getAttribute('data-frame')===S.scr?sc.scrollTop:0;
 app.innerHTML=h;app.setAttribute('data-frame',S.sheet?S.sheet.id:S.scr);var ns=document.querySelector('.scr');if(ns)ns.scrollTop=st;
 FX=[];if(window.__afterRender)window.__afterRender();}
document.addEventListener('click',function(e){var el=e.target.closest('[data-a]');if(!el)return;
 if(el.classList.contains('scrim')&&e.target!==el)return; /* taps inside the sheet don't close it */
 var a=el.getAttribute('data-a');if(A[a]){e.stopPropagation();A[a](el.getAttribute('data-v'),el);}});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.getAttribute&&e.target.getAttribute('role')==='button'){e.preventDefault();e.target.click();}});
document.addEventListener('input',function(e){var k=e.target.getAttribute('data-in');if(!k)return;var v=e.target.value;
 if(k==='typed')S.ob.typed=v;else if(k==='amt')S.pay.typed=v;else if(k.indexOf('sheet.')===0)S.sheet[k.slice(6)]=v;});
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.getAttribute&&e.target.getAttribute('data-in')){var k=e.target.getAttribute('data-in');if(k==='typed')A.s1ok();else if(k==='amt')A.manualNext();else A.subAddNext();}});
A.skip=function(){seedDemo();S.scr='H-01';render();};
