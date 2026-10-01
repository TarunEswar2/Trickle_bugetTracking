
// ===================== SHARED CORE =====================
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function money(n){var neg=n<0;n=Math.abs(Math.round(n));var s=n.toString();var r=s.length>3?s.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+s.slice(-3):s;return (neg?'-':'')+'₹'+r;}
function uid(){return 'id'+Math.random().toString(36).slice(2,9);}
function todayIdx(){return 23;} // day-of-month "today" for all seeded data (Sept 23)
var CAT_DEFS=[
  {id:'food',name:'Food & Dining',icon:'🍔',budget:3500,color:'#f0a63b'},
  {id:'transport',name:'Transport',icon:'🚌',budget:1200,color:'#3b6df0'},
  {id:'shopping',name:'Shopping',icon:'🛍️',budget:2000,color:'#d94ba0'},
  {id:'ent',name:'Entertainment',icon:'🎞️',budget:1000,color:'#8a5cf0'},
  {id:'bills',name:'Bills & Recharge',icon:'🧾',budget:1500,color:'#1f9d63'},
  {id:'other',name:'Other',icon:'✨',budget:800,color:'#9494a0'}
];
var MERCH={food:['Swiggy','Campus Canteen','Zomato','Chai Point','Domino\'s'],transport:['Uber','Ola','Metro Card','Auto'],
  shopping:['Amazon','Myntra','Local Store','Flipkart'],ent:['Netflix','BookMyShow','Spotify','PVR'],
  bills:['Airtel Recharge','Jio Recharge','Electricity','Wifi'],other:['ATM Withdraw','Friend Transfer','Misc']};

function seedData(){
  var cats=CAT_DEFS.map(c=>Object.assign({},c,{spent:0}));
  var txns=[];
  var rng=mulberry32(42);
  for(var d=1;d<=23;d++){
    var n=Math.floor(rng()*3);
    for(var i=0;i<n;i++){
      var c=cats[Math.floor(rng()*cats.length)];
      var amt=Math.round((20+rng()*400));
      var m=MERCH[c.id][Math.floor(rng()*MERCH[c.id].length)];
      txns.push({id:uid(),day:d,cat:c.id,amt:amt,merchant:m,ts:d});
      c.spent+=amt;
    }
  }
  txns.sort((a,b)=>b.day-a.day);
  var goals=[
    {id:'g1',name:'New Laptop',target:45000,saved:18200,icon:'💻',weeklyRate:1500},
    {id:'g2',name:'Goa Trip',target:12000,saved:9400,icon:'✈️',weeklyRate:900},
    {id:'g3',name:'Emergency Fund',target:10000,saved:3100,icon:'🛡️',weeklyRate:400}
  ];
  var subs=[
    {id:'s1',name:'Netflix',amt:199,cycle:'Monthly',next:5,icon:'🎬'},
    {id:'s2',name:'Spotify',amt:119,cycle:'Monthly',next:12,icon:'🎵'},
    {id:'s3',name:'Gym',amt:800,cycle:'Monthly',next:1,icon:'💪'}
  ];
  var accounts=[{id:'a1',bank:'HDFC Bank',masked:'•••• 4821',balance:8340}];
  return {cats:cats,txns:txns,goals:goals,subs:subs,accounts:accounts};
}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}

function totalSpent(D){return D.txns.reduce((s,t)=>s+t.amt,0);}
function catSpent(D,id){return D.txns.filter(t=>t.cat===id).reduce((s,t)=>s+t.amt,0);}
function daysLeftInMonth(){return 30-23;}

// ---- generic nav within a mockup scope ----
function go(mk,frame){
  var root=document.querySelector('.mockup[data-mockup="'+mk+'"]');
  if(!root)return;
  root.querySelectorAll('.frame').forEach(f=>f.classList.remove('active'));
  var target=root.querySelector('.frame[data-frame="'+frame+'"]');
  if(target)target.classList.add('active'); else console.warn('missing frame',mk,frame);
  root.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.tabfor===frame));
  target&&(target.scrollTop=0);
  if(window['onEnter_'+mk])window['onEnter_'+mk](frame);
}
function openSheet(mk,name){
  var root=document.querySelector('.mockup[data-mockup="'+mk+'"]');
  var scrim=root.querySelector('.sheet-scrim[data-sheet="'+name+'"]');
  if(!scrim){console.warn('missing sheet',mk,name);return;}
  scrim.classList.add('active');
  if(window['onSheetOpen_'+mk])window['onSheetOpen_'+mk](name);
}
function closeSheet(mk,name){
  var root=document.querySelector('.mockup[data-mockup="'+mk+'"]');
  var scrim=name?root.querySelector('.sheet-scrim[data-sheet="'+name+'"]'):root.querySelector('.sheet-scrim.active');
  if(scrim)scrim.classList.remove('active');
}

// ---- switcher ----
var EXPLORATIONS=[
  {k:'d',tag:'Envelope',title:'Budget-first envelopes',desc:'Home is your category list. Horizontal fill-bars replace donuts; a single "safe to spend today" number leads.',chart:'Chart: horizontal fill-bars'},
  {k:'e',tag:'Pulse',title:'Comparative & relative',desc:'A circular pace ring compares today to your usual day. Insights swipe one-at-a-time in plain comparative language.',chart:'Chart: pace ring + sparkline strip'},
  {k:'f',tag:'Ledger',title:'Data-dense dashboard',desc:'One long scrollable dashboard with jump chips, a stacked area chart and a calendar heatmap, each with a table toggle.',chart:'Chart: stacked area + calendar heatmap'},
  {k:'g',tag:'Timeline',title:'Chronological stream',desc:'Spending, goals and subscriptions interleave in one scrolling timeline, scrubbed by a month ribbon of daily bars.',chart:'Chart: month ribbon scrubber'},
  {k:'h',tag:'Forecast',title:'Forward-looking',desc:'A projected end-of-month balance with a confidence band leads; categories show burn-down lines with a dotted projection.',chart:'Chart: burn-down line + projection'},
  {k:'i',tag:'Split',title:'Social & shared expense',desc:'Circles track shared costs with a directional "who owes whom" list instead of a chart, plus per-circle totals.',chart:'Viz: directional owe/owed list'}
];
function buildSwitcher(){
  var el=document.getElementById('switcher');
  el.innerHTML='<h1>Trickle — 6 App Concept Explorations</h1>'+
    '<p class="lead">Six structurally distinct clickable prototypes for the same student UPI budgeting app. Pick one to explore; each has its own navigation, information architecture and primary chart type.</p>'+
    '<div class="expl-grid">'+EXPLORATIONS.map(e=>
      '<button class="expl-card" onclick="enterMockup(\''+e.k+'\')"><div class="tag">'+e.tag+'</div><h3>'+esc(e.title)+'</h3><p>'+esc(e.desc)+'</p><div class="chart-tag">'+esc(e.chart)+'</div></button>'
    ).join('')+'</div>';
}
function enterMockup(k){
  document.getElementById('switcher').style.display='none';
  document.querySelectorAll('.mockup').forEach(m=>m.classList.remove('active'));
  var root=document.querySelector('.mockup[data-mockup="'+k+'"]');
  root.classList.add('active');
  go(k,'splash');
}
function exitMockup(){
  document.querySelectorAll('.mockup').forEach(m=>m.classList.remove('active'));
  document.getElementById('switcher').style.display='block';
}
document.addEventListener('DOMContentLoaded',function(){
  buildSwitcher();
  MOCKUPS.forEach(function(m){ m.init(); });
});

// ===================== SHARED ONBOARDING + SHELL =====================
function phoneShell(mk,label,framesHTML,tabsHTML,sheetsHTML,withNav){
  return '<div class="mockup" data-mockup="'+mk+'">'+
    '<div class="stage-head"><b>'+esc(label)+'</b><button class="stage-btn" onclick="exitMockup()">← Explorations</button></div>'+
    '<div class="phone">'+
      '<div class="statusbar"><span>9:41</span><span class="sb-right">●●●</span></div>'+
      '<div class="viewport">'+framesHTML+'</div>'+
      (withNav?'<div class="tabbar">'+tabsHTML+'</div>':'')+
    '</div>'+
  sheetsHTML+
  '</div>';
}
function frame(name,inner,cls){return '<div class="frame'+(cls?(' '+cls):'')+'" data-frame="'+name+'">'+inner+'</div>';}

function onboardingFrames(mk,homeFrame){
  var F='';
  F+=frame('splash','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">'+
    '<div style="width:72px;height:72px;border-radius:20px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800">T</div>'+
    '<div style="font-size:26px;font-weight:800;letter-spacing:-.4px">Trickle</div>'+
    '<p class="hint" style="text-align:center;max-width:220px">Money sense for students, without the spreadsheet.</p>'+
    '<button class="btn solid" style="width:200px;margin-top:18px" onclick="go(\''+mk+'\',\'method\')">Get started</button>'+
    '</div>');
  F+=frame('method','<h1 class="screen-title">How do you want to track spending?</h1><p class="step-label">Step 1 of 5</p>'+
    '<div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
      '<button class="panel" style="text-align:left;border:2px solid var(--accent)" onclick="go(\''+mk+'\',\'upi\')"><b>Link my UPI apps</b><p class="hint">Auto-detect payments from GPay, PhonePe, Paytm.</p></button>'+
      '<button class="panel" style="text-align:left" onclick="go(\''+mk+'\',\'cats\')"><b>Enter transactions manually</b><p class="hint">Log spends yourself, no linking needed.</p></button>'+
    '</div>');
  F+=frame('upi','<h1 class="screen-title">Link your UPI</h1><p class="step-label">Step 2 of 5</p>'+
    '<div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
      '<div class="panel" style="display:flex;align-items:center;gap:12px"><div class="cat-icon">🏦</div><div><b>HDFC Bank</b><div class="rl-sub" style="font-size:11px;color:var(--ink2)">•••• 4821 &mdash; detected</div></div></div>'+
      '<button class="btn solid" onclick="go(\''+mk+'\',\'cats\')">Connect &amp; continue</button>'+
      '<p class="micro" style="text-align:center">Read-only access. We never move your money.</p>'+
    '</div>');
  F+=frame('cats','<h1 class="screen-title">Pick your categories</h1><p class="step-label">Step 3 of 5</p>'+
    '<div class="pad chip-wrap">'+CAT_DEFS.map(c=>'<span class="pill on">'+c.icon+' '+esc(c.name)+'</span>').join('')+'</div>'+
    '<div class="pad" style="margin-top:20px"><button class="btn solid" onclick="go(\''+mk+'\',\'pin\')">Continue</button></div>');
  F+=frame('pin','<h1 class="screen-title">Set a 4-digit PIN</h1><p class="step-label">Step 4 of 5</p>'+
    '<div class="pad" style="display:flex;justify-content:center;gap:10px;margin:20px 0">'+
      [0,1,2,3].map(()=>'<div style="width:44px;height:54px;border-radius:12px;background:var(--panel);display:flex;align-items:center;justify-content:center;font-size:20px">●</div>').join('')+
    '</div><div class="pad"><button class="btn solid" onclick="go(\''+mk+'\',\'perm\')">Confirm PIN</button></div>');
  F+=frame('perm','<h1 class="screen-title">One last thing</h1><p class="step-label">Step 5 of 5</p>'+
    '<div class="pad"><div class="panel-lite"><b>Notification access</b><p class="hint">Lets Trickle read UPI payment alerts to auto-log spends.</p></div>'+
    '<div style="height:14px"></div><button class="btn solid" onclick="go(\''+mk+'\',\'allset\')">Allow &amp; continue</button>'+
    '<button class="btn ghost" style="margin-top:10px" onclick="go(\''+mk+'\',\'allset\')">Not now</button></div>');
  F+=frame('allset','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">'+
    '<div style="width:64px;height:64px;border-radius:50%;background:var(--good);color:#fff;display:flex;align-items:center;justify-content:center;font-size:30px">✓</div>'+
    '<div style="font-size:22px;font-weight:800">You\'re all set</div>'+
    '<p class="hint" style="text-align:center;max-width:220px">Your dashboard is ready.</p>'+
    '<button class="btn solid" style="width:200px;margin-top:16px" onclick="enter'+mk.toUpperCase()+'()">Enter Trickle</button>'+
    '</div>');
  return F;
}

var MOCKUPS=[]; // populated by each exploration file: MOCKUPS.push({k:'d',init:function(){...}})
function donePill(mk,dest){return '<button class="exit-pill" style="position:static;background:none;border:none;padding:0" onclick="go(\''+mk+'\',\''+dest+'\')">←</button>';}

// ===================== D: ENVELOPE =====================
(function(){
var mk='d', D;
function enterD(){ D=seedData(); go(mk,'env'); renderD(); }
window.enterD=enterD;

function fillPct(c){return Math.min(100,Math.round(catSpent(D,c.id)/c.budget*100));}
function envRow(c,positive){
  var spent=catSpent(D,c.id), pct=fillPct(c), room=c.budget-spent;
  var warn = pct>=80 && pct<100;
  var over = pct>=100;
  var chip='';
  if(over) chip='<span class="pill" style="background:var(--bad);color:#fff;border-color:var(--bad);font-size:10px">Over by '+money(spent-c.budget)+'</span>';
  else if(warn) chip='<span class="pill" style="background:#fdf0dc;color:#a9660b;border-color:#f0d6a8;font-size:10px">'+Math.max(0,30-todayIdx())+' days left, '+money(room)+' room</span>';
  return '<button class="panel" style="text-align:left;width:100%;margin-bottom:10px;display:block" onclick="dEnvDetail(\''+c.id+'\')">'+
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'+
      '<div class="cat-icon">'+c.icon+'</div>'+
      '<div style="flex:1"><b>'+esc(c.name)+'</b><div class="rl-sub">'+money(spent)+' of '+money(c.budget)+'</div></div>'+
      '<div style="font-weight:700">'+pct+'%</div>'+
    '</div>'+
    '<div style="height:10px;border-radius:6px;background:var(--panel3);overflow:hidden">'+
      '<div style="height:100%;width:'+pct+'%;background:'+(over?'var(--bad)':positive?'var(--good)':'var(--accent)')+'"></div>'+
    '</div>'+
    (chip?('<div style="margin-top:8px">'+chip+'</div>'):'')+
  '</button>';
}
function renderD(){
  if(!D)return;
  var totalBudget=D.cats.reduce((s,c)=>s+c.budget,0);
  var totalSpentV=totalSpent(D);
  var safe=Math.max(0,Math.round((totalBudget-totalSpentV)/daysLeftInMonth()));
  document.getElementById('d-safe').textContent=money(safe);
  document.getElementById('d-env-list').innerHTML=D.cats.map(c=>envRow(c,false)).join('');
  document.getElementById('d-save-list').innerHTML=D.goals.map(g=>{
    var pct=Math.min(100,Math.round(g.saved/g.target*100));
    return '<div class="panel" style="margin-bottom:10px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div class="cat-icon">'+g.icon+'</div><div style="flex:1"><b>'+esc(g.name)+'</b><div class="rl-sub">'+money(g.saved)+' of '+money(g.target)+'</div></div><div style="font-weight:700">'+pct+'%</div></div><div style="height:10px;border-radius:6px;background:var(--panel3);overflow:hidden"><div style="height:100%;width:'+pct+'%;background:var(--good)"></div></div></div>';
  }).join('')+D.subs.map(s=>'<div class="row-link"><div class="cat-icon">'+s.icon+'</div><div class="rl-main">'+esc(s.name)+'<div class="rl-sub">'+s.cycle+' · renews day '+s.next+'</div></div><div class="rl-val">'+money(s.amt)+'</div></div>').join('');
  document.getElementById('d-txn-list').innerHTML=D.txns.slice(0,15).map(t=>{
    var c=D.cats.find(c=>c.id===t.cat);
    return '<div class="row-link" style="cursor:default"><div class="cat-icon">'+c.icon+'</div><div class="rl-main">'+esc(t.merchant)+'<div class="rl-sub">Day '+t.day+' · '+esc(c.name)+'</div></div><div class="rl-val">-'+money(t.amt)+'</div></div>';
  }).join('');
}
window.dEnvDetail=function(id){
  var c=D.cats.find(x=>x.id===id);
  var spent=catSpent(D,id),pct=fillPct(c);
  document.getElementById('d-detail-body').innerHTML='<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><div class="cat-icon" style="width:48px;height:48px;font-size:22px">'+c.icon+'</div><div><div style="font-size:19px;font-weight:800">'+esc(c.name)+'</div><div class="rl-sub">'+money(spent)+' spent of '+money(c.budget)+' budget</div></div></div>'+
   '<div style="height:14px;border-radius:8px;background:var(--panel3);overflow:hidden;margin-bottom:14px"><div style="height:100%;width:'+pct+'%;background:'+(pct>=100?'var(--bad)':'var(--accent)')+'"></div></div>'+
   D.txns.filter(t=>t.cat===id).slice(0,8).map(t=>'<div class="row-link" style="cursor:default"><div class="rl-main">'+esc(t.merchant)+'<div class="rl-sub">Day '+t.day+'</div></div><div class="rl-val">-'+money(t.amt)+'</div></div>').join('');
  openSheet(mk,'env-detail');
};
window.dPayAmount=0;
window.dSetAmount=function(v){window.dPayAmount=v;document.getElementById('d-amt-display').textContent=money(v);};
window.dConfirmPay=function(){
  var cat=document.getElementById('d-pay-cat').value||'other';
  var amt=window.dPayAmount||150;
  var c=D.cats.find(x=>x.id===cat);
  D.txns.unshift({id:uid(),day:23,cat:cat,amt:amt,merchant:'New Payment',ts:23});
  c.spent+=amt;
  renderD();
  go(mk,'spend-success');
};

function initD(){
  var tabs=[['env','Envelopes'],['spend','Spend'],['save','Save'],['you','You']]
    .map(t=>'<button class="tab" data-tabfor="'+t[0]+'" onclick="go(\''+mk+'\',\''+t[0]+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg><span>'+t[1]+'</span></button>').join('');
  var F=onboardingFrames(mk,'env');
  F+=frame('env','<div class="topbar notop"><h2>Envelopes</h2></div>'+
    '<div class="pad"><div class="panel" style="background:var(--dark);color:#fff;text-align:center;margin-bottom:16px"><div style="font-size:12px;opacity:.8">Safe to spend today</div><div id="d-safe" style="font-size:32px;font-weight:800">₹0</div></div>'+
    '<div id="d-env-list"></div></div>');
  F+=frame('spend','<div class="topbar notop"><h2>Spend</h2></div><div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
    '<button class="panel" style="text-align:left" onclick="go(\'d\',\'spend-amount\')"><b>📷 Scan &amp; Pay</b><p class="hint">Scan a UPI QR code</p></button>'+
    '<button class="panel" style="text-align:left" onclick="go(\'d\',\'spend-amount\')"><b>👤 Pay Anyone</b><p class="hint">Send to a UPI ID or contact</p></button>'+
    '<button class="panel" style="text-align:left" onclick="go(\'d\',\'spend-amount\')"><b>🏦 Bank Transfer</b><p class="hint">NEFT / IMPS</p></button></div>');
  F+=frame('spend-amount','<div class="topbar"><button class="chev-back" onclick="go(\'d\',\'spend\')">←</button><h2>Enter amount</h2></div>'+
    '<div class="pad"><div id="d-amt-display" style="font-size:40px;font-weight:800;text-align:center;margin:24px 0">₹0</div>'+
    '<div class="chip-wrap" style="justify-content:center;margin-bottom:16px">'+[50,100,200,500].map(v=>'<button class="pill" onclick="dSetAmount('+v+')">'+money(v)+'</button>').join('')+'</div>'+
    '<label class="hint">Envelope</label><select id="d-pay-cat" class="field" style="margin:8px 0 16px">'+D_catOpts()+'</select>'+
    '<button class="btn solid" onclick="go(\'d\',\'spend-confirm\')">Continue</button></div>');
  F+=frame('spend-confirm','<div class="topbar"><button class="chev-back" onclick="go(\'d\',\'spend-amount\')">←</button><h2>Confirm</h2></div>'+
    '<div class="pad"><div class="panel-lite" style="margin-bottom:14px"><div id="d-confirm-amt" style="font-size:26px;font-weight:800"></div><p class="hint">To: Merchant</p></div>'+
    '<div class="panel" style="margin-bottom:16px"><div class="sec-title">Savings round-up peek</div><p class="hint">Rounding up adds ~₹5 to your Goa Trip goal.</p></div>'+
    '<button class="btn solid" onclick="dConfirmPay()">Pay now</button></div>');
  F+=frame('spend-success','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">'+
    '<div style="width:60px;height:60px;border-radius:50%;background:var(--good);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px">✓</div>'+
    '<div style="font-size:20px;font-weight:800">Payment sent</div><button class="btn solid" style="width:200px;margin-top:10px" onclick="go(\'d\',\'env\')">Back to Envelopes</button></div>');
  F+=frame('save','<div class="topbar notop"><h2>Save</h2></div><div class="pad"><div id="d-save-list"></div>'+
    '<button class="btn ghost" onclick="alert(\'Goal creation flow (shared pattern) — see other explorations for full add-goal UI.\')">+ New goal</button></div>');
  F+=frame('you','<div class="topbar notop"><h2>You</h2></div><div class="pad">'+
    '<div class="row-link"><div class="rl-main">Profile</div></div><div class="row-link"><div class="rl-main">Notifications &amp; alerts</div></div>'+
    '<div class="row-link"><div class="rl-main">Change PIN</div></div><div class="row-link"><div class="rl-main">Linked accounts</div></div>'+
    '<div class="hr"></div><div class="sec-title" style="margin-top:14px">Recent activity</div><div id="d-txn-list"></div></div>');
  var sheets='<div class="sheet-scrim" data-sheet="env-detail"><div class="sheet"><div class="handle"></div><div id="d-detail-body"></div><button class="btn ghost" style="margin-top:14px" onclick="closeSheet(\'d\')">Close</button></div></div>';
  document.body.insertAdjacentHTML('beforeend', phoneShell(mk,'D · Envelope',F,tabs,sheets,true));
}
function D_catOpts(){return CAT_DEFS.map(c=>'<option value="'+c.id+'">'+c.icon+' '+esc(c.name)+'</option>').join('');}
window.onEnter_d=function(fr){ if(fr==='spend-confirm')document.getElementById('d-confirm-amt').textContent=money(window.dPayAmount||150); };
MOCKUPS.push({k:'d',init:initD});
})();

// ===================== E: PULSE =====================
(function(){
var mk='e', D;
function enterE(){ D=seedData(); go(mk,'home'); renderE(); }
window.enterE=enterE;

function paceRingSVG(pct){
  var r=54,c=2*Math.PI*r,off=c*(1-Math.min(1,pct/100));
  var color = pct<=100?'#3b6df0':'#d94848';
  return '<svg width="140" height="140" viewBox="0 0 140 140" class="tiny-svg">'+
    '<circle cx="70" cy="70" r="'+r+'" fill="none" stroke="var(--panel)" stroke-width="12"/>'+
    '<circle cx="70" cy="70" r="'+r+'" fill="none" stroke="'+color+'" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+c+'" stroke-dashoffset="'+off+'" transform="rotate(-90 70 70)"/>'+
    '<text x="70" y="66" text-anchor="middle" font-size="26" font-weight="800" fill="var(--ink)">'+pct+'%</text>'+
    '<text x="70" y="86" text-anchor="middle" font-size="10" fill="var(--ink2)">of usual day</text>'+
  '</svg>';
}
function sparkline(vals,w,h,color){
  var max=Math.max(1,...vals);
  var pts=vals.map((v,i)=>(i/(vals.length-1)*w)+','+(h-(v/max*h))).join(' ');
  return '<svg width="'+w+'" height="'+h+'" class="tiny-svg"><polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="2"/></svg>';
}
function weeklySeries(D,cat){
  var wk=[0,0,0,0];
  D.txns.filter(t=>t.cat===cat).forEach(t=>{var w=Math.min(3,Math.floor((t.day-1)/7));wk[w]+=t.amt;});
  return wk;
}
function renderE(){
  if(!D)return;
  var todaySpend=D.txns.filter(t=>t.day===23).reduce((s,t)=>s+t.amt,0);
  var avgDay=Math.round(totalSpent(D)/23);
  var pct=avgDay?Math.round(todaySpend/avgDay*100):0;
  document.getElementById('e-ring').innerHTML=paceRingSVG(pct);
  document.getElementById('e-txn-list').innerHTML=D.txns.slice(0,8).map(t=>{
    var c=D.cats.find(c=>c.id===t.cat);
    return '<div class="row-link" style="cursor:default"><div class="cat-icon">'+c.icon+'</div><div class="rl-main">'+esc(t.merchant)+'<div class="rl-sub">Day '+t.day+'</div></div><div class="rl-val">-'+money(t.amt)+'</div></div>';
  }).join('');
  var top4=D.cats.slice(0,4);
  document.getElementById('e-spark-strip').innerHTML=top4.map(c=>'<div style="text-align:center"><div class="rl-sub" style="margin-bottom:4px">'+c.icon+' '+esc(c.name.split(' ')[0])+'</div>'+sparkline(weeklySeries(D,c.id),70,32,c.color)+'</div>').join('');
  var thisWk=D.cats.reduce((s,c)=>s+weeklySeries(D,c.id)[3],0);
  var lastWk=D.cats.reduce((s,c)=>s+weeklySeries(D,c.id)[2],0);
  var maxWk=Math.max(thisWk,lastWk,1);
  document.getElementById('e-compare-bars').innerHTML=
    '<div style="display:flex;align-items:flex-end;gap:16px;height:90px;justify-content:center">'+
    '<div style="text-align:center"><div style="width:40px;height:'+Math.round(lastWk/maxWk*80)+'px;background:var(--ink3);border-radius:6px 6px 0 0;margin:0 auto"></div><div class="rl-sub" style="margin-top:4px">Last wk</div><b>'+money(lastWk)+'</b></div>'+
    '<div style="text-align:center"><div style="width:40px;height:'+Math.round(thisWk/maxWk*80)+'px;background:var(--accent);border-radius:6px 6px 0 0;margin:0 auto"></div><div class="rl-sub" style="margin-top:4px">This wk</div><b>'+money(thisWk)+'</b></div>'+
    '</div>';
  document.getElementById('e-cat-bars').innerHTML=D.cats.map(c=>{
    var s=catSpent(D,c.id),pct2=Math.min(100,Math.round(s/c.budget*100));
    return '<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>'+c.icon+' '+esc(c.name)+'</span><span>'+money(s)+'</span></div><div style="height:6px;border-radius:4px;background:var(--panel3)"><div style="height:100%;width:'+pct2+'%;background:'+c.color+';border-radius:4px"></div></div></div>';
  }).join('');
  document.getElementById('e-streak').innerHTML='<div style="display:flex;gap:8px;justify-content:center">'+
    [1,1,1,0,1,1,1].map(v=>'<div style="width:22px;height:22px;border-radius:50%;background:'+(v?'var(--good)':'var(--panel)')+';border:1px solid var(--line)"></div>').join('')+'</div>';
  document.getElementById('e-goal-list').innerHTML=D.goals.map(g=>{
    var pct3=Math.min(100,Math.round(g.saved/g.target*100));
    return '<div class="panel" style="margin-bottom:10px"><b>'+g.icon+' '+esc(g.name)+'</b><div class="rl-sub" style="margin:4px 0">'+money(g.saved)+' of '+money(g.target)+' · '+pct3+'%</div><div style="height:8px;border-radius:5px;background:var(--panel3)"><div style="height:100%;width:'+pct3+'%;background:var(--good);border-radius:5px"></div></div></div>';
  }).join('')+D.subs.map(s=>'<div class="row-link"><div class="cat-icon">'+s.icon+'</div><div class="rl-main">'+esc(s.name)+'<div class="rl-sub">'+s.cycle+'</div></div><div class="rl-val">'+money(s.amt)+'</div></div>').join('');
}
window.eGoto=function(i){
  var track=document.getElementById('e-carousel-track');
  track.scrollTo({left:i*272,behavior:'smooth'});
  document.querySelectorAll('.e-dot').forEach((d,idx)=>d.classList.toggle('on',idx===i));
};
window.ePayAmount=0;
window.eSetAmount=function(v){window.ePayAmount=v;document.getElementById('e-amt-display').textContent=money(v);};
window.eConfirmPay=function(){
  var cat=document.getElementById('e-pay-cat').value||'other';
  var amt=window.ePayAmount||150;
  var c=D.cats.find(x=>x.id===cat);
  D.txns.unshift({id:uid(),day:23,cat:cat,amt:amt,merchant:'New Payment',ts:23});
  c.spent+=amt; renderE(); go(mk,'pay-success');
};
function initE(){
  var tabs=[['home','Home'],['insights','Insights'],['save','Save'],['settings','Settings']]
    .map(t=>'<button class="tab" data-tabfor="'+t[0]+'" onclick="go(\''+mk+'\',\''+t[0]+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg><span>'+t[1]+'</span></button>').join('');
  var F=onboardingFrames(mk,'home');
  F+=frame('home','<div class="topbar notop"><h2>Trickle</h2></div><div class="pad" style="display:flex;flex-direction:column;align-items:center">'+
    '<div id="e-ring" style="margin:8px 0 16px"></div>'+
    '<button class="btn solid" style="max-width:200px" onclick="go(\'e\',\'pay\')">New payment</button>'+
    '<div style="width:100%;margin-top:18px"><div class="sec-title">Recent</div><div id="e-txn-list"></div></div></div>');
  F+=frame('pay','<div class="topbar"><button class="chev-back" onclick="go(\'e\',\'home\')">←</button><h2>Pay</h2></div><div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
    '<button class="panel" style="text-align:left" onclick="go(\'e\',\'pay-amount\')"><b>📷 Scan &amp; Pay</b></button>'+
    '<button class="panel" style="text-align:left" onclick="go(\'e\',\'pay-amount\')"><b>👤 Pay Anyone</b></button></div>');
  F+=frame('pay-amount','<div class="topbar"><button class="chev-back" onclick="go(\'e\',\'pay\')">←</button><h2>Amount</h2></div><div class="pad">'+
    '<div id="e-amt-display" style="font-size:40px;font-weight:800;text-align:center;margin:24px 0">₹0</div>'+
    '<div class="chip-wrap" style="justify-content:center;margin-bottom:16px">'+[50,100,200,500].map(v=>'<button class="pill" onclick="eSetAmount('+v+')">'+money(v)+'</button>').join('')+'</div>'+
    '<select id="e-pay-cat" class="field" style="margin-bottom:16px">'+D_catOptsE()+'</select>'+
    '<button class="btn solid" onclick="eConfirmPay()">Pay now</button></div>');
  F+=frame('pay-success','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">'+
    '<div style="width:60px;height:60px;border-radius:50%;background:var(--good);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px">✓</div>'+
    '<div style="font-size:20px;font-weight:800">Payment sent</div><button class="btn solid" style="width:200px" onclick="go(\'e\',\'home\')">Done</button></div>');
  F+=frame('insights','<div class="topbar notop"><h2>Insights</h2></div>'+
    '<div id="e-carousel-track" style="display:flex;overflow-x:auto;gap:16px;padding:0 20px;scroll-snap-type:x mandatory">'+
      '<div class="panel" style="min-width:240px;scroll-snap-align:start"><div class="sec-title">Compared to usual</div><div style="text-align:center">'+paceRingSVG(68)+'</div><p class="hint" style="text-align:center">You\'re spending less than a typical day.</p></div>'+
      '<div class="panel" style="min-width:240px;scroll-snap-align:start"><div class="sec-title">This week vs last week</div><div id="e-compare-bars"></div></div>'+
      '<div class="panel" style="min-width:240px;scroll-snap-align:start"><div class="sec-title">4-week trend, top categories</div><div id="e-spark-strip" style="display:flex;gap:10px;justify-content:space-between"></div></div>'+
      '<div class="panel" style="min-width:240px;scroll-snap-align:start"><div class="sec-title">Category breakdown</div><div id="e-cat-bars"></div></div>'+
    '</div><div class="dots" id="e-dots">'+[0,1,2,3].map(i=>'<i class="e-dot'+(i===0?' on':'')+'" onclick="eGoto('+i+')" style="cursor:pointer"></i>').join('')+'</div>');
  F+=frame('save','<div class="topbar notop"><h2>Save</h2></div><div class="pad">'+
    '<div class="sec-title">Weeks under budget</div><div id="e-streak" style="margin-bottom:18px"></div>'+
    '<div id="e-goal-list"></div><button class="btn ghost" onclick="alert(\'Add-goal flow — amount, name, target date.\')">+ New goal</button></div>');
  F+=frame('settings','<div class="topbar notop"><h2>Settings</h2></div><div class="pad">'+
    '<div class="row-link"><div class="rl-main">Profile</div></div><div class="row-link"><div class="rl-main">Notifications &amp; alerts</div></div>'+
    '<div class="row-link"><div class="rl-main">Change PIN</div></div><div class="row-link"><div class="rl-main">Permissions</div></div></div>');
  document.body.insertAdjacentHTML('beforeend', phoneShell(mk,'E · Pulse',F,tabs,'',true));
}
function D_catOptsE(){return CAT_DEFS.map(c=>'<option value="'+c.id+'">'+c.icon+' '+esc(c.name)+'</option>').join('');}
window.onEnter_e=function(){};
MOCKUPS.push({k:'e',init:initE});
})();

// ===================== F: LEDGER =====================
(function(){
var mk='f', D, tableMode=false;
function enterF(){ D=seedData(); go(mk,'dash'); renderF(); }
window.enterF=enterF;

function stackedArea(){
  var w=350,h=120,days=23;
  var cats=D.cats;
  var series=cats.map(c=>{var arr=new Array(days+1).fill(0);D.txns.filter(t=>t.cat===c.id).forEach(t=>{for(var d=t.day;d<=days;d++)arr[d]+=t.amt;});return arr;});
  var maxTotal=0;
  for(var d=1;d<=days;d++){var s=0;series.forEach(arr=>s+=arr[d]);if(s>maxTotal)maxTotal=s;}
  maxTotal=maxTotal||1;
  var paths='';
  var cum=new Array(days+1).fill(0);
  cats.forEach((c,ci)=>{
    var top=cum.map((v,d)=>v+series[ci][d]);
    var pts='';
    for(var d=1;d<=days;d++){var x=(d-1)/(days-1)*w; var y=h-(top[d]/maxTotal*h); pts+=x+','+y+' ';}
    var pts2='';
    for(var d=days;d>=1;d--){var x=(d-1)/(days-1)*w; var y=h-(cum[d]/maxTotal*h); pts2+=x+','+y+' ';}
    paths+='<polygon points="'+pts+pts2+'" fill="'+c.color+'" opacity="0.85"/>';
    cum=top;
  });
  return '<svg width="100%" viewBox="0 0 '+w+' '+h+'" class="tiny-svg">'+paths+'</svg>';
}
function calHeatmap(){
  var cells='';
  for(var d=1;d<=30;d++){
    var spend=D.txns.filter(t=>t.day===d).reduce((s,t)=>s+t.amt,0);
    var alpha=Math.min(1,spend/500);
    var future=d>23;
    cells+='<div title="Day '+d+': '+money(spend)+'" style="aspect-ratio:1;border-radius:4px;background:'+(future?'var(--panel3)':'rgba(59,109,240,'+(0.12+alpha*0.8)+')')+';font-size:8px;display:flex;align-items:flex-end;justify-content:flex-end;padding:2px;color:var(--ink2)">'+d+'</div>';
  }
  return '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">'+cells+'</div>';
}
function renderF(){
  if(!D)return;
  document.getElementById('f-total').textContent=money(totalSpent(D));
  document.getElementById('f-budget').textContent=money(D.cats.reduce((s,c)=>s+c.budget,0));
  document.getElementById('f-txncount').textContent=D.txns.length;
  document.getElementById('f-chart-area').innerHTML = tableMode ?
    '<table style="width:100%;font-size:11px;border-collapse:collapse">'+D.cats.map(c=>'<tr><td style="padding:4px 0">'+c.icon+' '+esc(c.name)+'</td><td style="text-align:right">'+money(catSpent(D,c.id))+'</td></tr>').join('')+'</table>'
    : stackedArea();
  document.getElementById('f-cat-list').innerHTML=D.cats.map(c=>{
    var s=catSpent(D,c.id),pct=Math.min(100,Math.round(s/c.budget*100));
    return '<div class="row-link" style="cursor:default"><div class="cat-icon">'+c.icon+'</div><div class="rl-main">'+esc(c.name)+'<div class="rl-sub">'+pct+'% of '+money(c.budget)+'</div></div><div class="rl-val">'+money(s)+'</div></div>';
  }).join('');
  document.getElementById('f-heat').innerHTML=calHeatmap();
  document.getElementById('f-save-summary').innerHTML=D.goals.map(g=>{var pct=Math.round(g.saved/g.target*100);return '<div class="row-link" style="cursor:default"><div class="cat-icon">'+g.icon+'</div><div class="rl-main">'+esc(g.name)+'<div class="rl-sub">'+pct+'% funded</div></div><div class="rl-val">'+money(g.saved)+'</div></div>';}).join('');
}
window.fToggleTable=function(){tableMode=!tableMode;renderF();};
window.fScrollTo=function(id){document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});};
window.fPayAmount=0;
window.fSetAmount=function(v){window.fPayAmount=v;document.getElementById('f-amt-display').textContent=money(v);};
window.fConfirmPay=function(){
  var cat=document.getElementById('f-pay-cat').value||'other';
  var amt=window.fPayAmount||150;
  var c=D.cats.find(x=>x.id===cat);
  D.txns.unshift({id:uid(),day:23,cat:cat,amt:amt,merchant:'New Payment',ts:23});
  c.spent+=amt; renderF(); go(mk,'pay-success');
};
function initF(){
  var tabs=[['dash','Dashboard'],['pay','Pay'],['settings','Settings']]
    .map(t=>'<button class="tab" data-tabfor="'+t[0]+'" onclick="go(\''+mk+'\',\''+t[0]+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg><span>'+t[1]+'</span></button>').join('');
  var F=onboardingFrames(mk,'dash');
  F+=frame('dash','<div class="topbar notop"><h2>Dashboard</h2></div>'+
    '<div class="pad" style="position:sticky;top:0;background:var(--bg);z-index:5;padding-bottom:8px"><div class="chip-wrap">'+
      ['Overview','Categories','Insights','Savings'].map((s,i)=>'<button class="pill" onclick="fScrollTo(\'f-sec-'+i+'\')">'+s+'</button>').join('')+'</div></div>'+
    '<div class="pad">'+
      '<div id="f-sec-0" class="panel" style="margin:12px 0"><div class="sec-title">Overview</div>'+
        '<div style="display:flex;gap:14px"><div><div class="rl-sub">Spent</div><b id="f-total" style="font-size:18px"></b></div><div><div class="rl-sub">Budget</div><b id="f-budget" style="font-size:18px"></b></div><div><div class="rl-sub">Transactions</div><b id="f-txncount" style="font-size:18px"></b></div></div></div>'+
      '<div class="panel" style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><div class="sec-title" style="margin:0">Spend by category over time</div><button class="btn-sm" onclick="fToggleTable()">Toggle table</button></div><div id="f-chart-area"></div></div>'+
      '<div id="f-sec-1" class="panel" style="margin-bottom:14px"><div class="sec-title">Categories</div><div id="f-cat-list"></div></div>'+
      '<div id="f-sec-2" class="panel" style="margin-bottom:14px"><div class="sec-title">Daily spend heatmap</div><div id="f-heat"></div></div>'+
      '<div id="f-sec-3" class="panel" style="margin-bottom:14px"><div class="sec-title">Savings</div><div id="f-save-summary"></div></div>'+
    '</div>');
  F+=frame('pay','<div class="topbar"><button class="chev-back" onclick="go(\'f\',\'dash\')">←</button><h2>Pay</h2></div><div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
    '<button class="panel" style="text-align:left" onclick="go(\'f\',\'pay-amount\')"><b>📷 Scan &amp; Pay</b></button>'+
    '<button class="panel" style="text-align:left" onclick="go(\'f\',\'pay-amount\')"><b>👤 Pay Anyone</b></button></div>');
  F+=frame('pay-amount','<div class="topbar"><button class="chev-back" onclick="go(\'f\',\'pay\')">←</button><h2>Amount</h2></div><div class="pad">'+
    '<div id="f-amt-display" style="font-size:40px;font-weight:800;text-align:center;margin:24px 0">₹0</div>'+
    '<div class="chip-wrap" style="justify-content:center;margin-bottom:16px">'+[50,100,200,500].map(v=>'<button class="pill" onclick="fSetAmount('+v+')">'+money(v)+'</button>').join('')+'</div>'+
    '<select id="f-pay-cat" class="field" style="margin-bottom:16px">'+D_catOptsF()+'</select>'+
    '<button class="btn solid" onclick="fConfirmPay()">Pay now</button></div>');
  F+=frame('pay-success','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">'+
    '<div style="width:60px;height:60px;border-radius:50%;background:var(--good);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px">✓</div>'+
    '<div style="font-size:20px;font-weight:800">Payment sent</div><button class="btn solid" style="width:200px" onclick="go(\'f\',\'dash\')">Done</button></div>');
  F+=frame('settings','<div class="topbar notop"><h2>Settings</h2></div><div class="pad">'+
    '<div class="row-link"><div class="rl-main">Profile</div></div><div class="row-link"><div class="rl-main">Notifications &amp; alerts</div></div>'+
    '<div class="row-link"><div class="rl-main">Change PIN</div></div><div class="row-link"><div class="rl-main">Permissions</div></div></div>');
  document.body.insertAdjacentHTML('beforeend', phoneShell(mk,'F · Ledger',F,tabs,'',true));
}
function D_catOptsF(){return CAT_DEFS.map(c=>'<option value="'+c.id+'">'+c.icon+' '+esc(c.name)+'</option>').join('');}
window.onEnter_f=function(){};
MOCKUPS.push({k:'f',init:initF});
})();

// ===================== G: TIMELINE =====================
(function(){
var mk='g', D, filterCat=null, scrubDay=23;
function enterG(){ D=seedData(); go(mk,'tl'); renderG(); }
window.enterG=enterG;

function ribbon(){
  var bars='';
  var maxSpend=Math.max(1,...Array.from({length:23},(_,i)=>D.txns.filter(t=>t.day===i+1).reduce((s,t)=>s+t.amt,0)));
  for(var d=23;d>=1;d--){
    var spend=D.txns.filter(t=>t.day===d).reduce((s,t)=>s+t.amt,0);
    var h=Math.max(4,Math.round(spend/maxSpend*36));
    bars+='<div onclick="gScrub('+d+')" title="Day '+d+': '+money(spend)+'" style="width:6px;height:36px;display:flex;align-items:flex-end;cursor:pointer;flex:none">'+
      '<div style="width:100%;height:'+h+'px;border-radius:2px;background:'+(d===scrubDay?'var(--accent)':'var(--ink3)')+'"></div></div>';
  }
  return bars;
}
window.gScrub=function(d){scrubDay=d;renderG();document.getElementById('tl-day-'+d)&&document.getElementById('tl-day-'+d).scrollIntoView({behavior:'smooth',block:'start'});};
window.gFilter=function(cat){filterCat=(filterCat===cat)?null:cat;renderG();};
function renderG(){
  if(!D)return;
  document.getElementById('g-ribbon').innerHTML=ribbon();
  document.getElementById('g-filters').innerHTML=D.cats.map(c=>'<button class="pill'+(filterCat===c.id?' on':'')+'" onclick="gFilter(\''+c.id+'\')">'+c.icon+' '+esc(c.name.split(' ')[0])+'</button>').join('');
  var byDay={};
  D.txns.forEach(t=>{if(filterCat&&t.cat!==filterCat)return;(byDay[t.day]=byDay[t.day]||[]).push({type:'txn',t:t});});
  D.goals.forEach(g=>{ if(!filterCat){ var gd=23-Math.floor(g.saved/g.weeklyRate); if(gd>0&&gd<=23) (byDay[gd]=byDay[gd]||[]).push({type:'goal',g:g}); } });
  D.subs.forEach(s=>{ if(!filterCat){ var sd=s.next<=23?s.next:null; if(sd) (byDay[sd]=byDay[sd]||[]).push({type:'sub',s:s}); } });
  var days=Object.keys(byDay).map(Number).sort((a,b)=>b-a);
  document.getElementById('g-stream').innerHTML=days.map(d=>{
    var items=byDay[d].map(it=>{
      if(it.type==='txn'){var c=D.cats.find(c=>c.id===it.t.cat);return '<div class="row-link" style="cursor:default"><div class="cat-icon">'+c.icon+'</div><div class="rl-main">'+esc(it.t.merchant)+'<div class="rl-sub">'+esc(c.name)+'</div></div><div class="rl-val">-'+money(it.t.amt)+'</div></div>';}
      if(it.type==='goal')return '<div class="row-link" style="cursor:default;background:var(--panel2);border-radius:10px"><div class="cat-icon">'+it.g.icon+'</div><div class="rl-main">Milestone: '+money(it.g.saved)+' saved toward '+esc(it.g.name)+'</div></div>';
      return '<div class="row-link" style="cursor:default"><div class="cat-icon">'+it.s.icon+'</div><div class="rl-main">'+esc(it.s.name)+' renewed<div class="rl-sub">Subscription</div></div><div class="rl-val">-'+money(it.s.amt)+'</div></div>';
    }).join('');
    return '<div id="tl-day-'+d+'" style="margin-bottom:8px"><div class="sec-title" style="padding:0 4px">Day '+d+(d===23?' · Today':'')+'</div>'+items+'</div>';
  }).join('');
  document.getElementById('g-save-list').innerHTML=D.goals.map(g=>{var pct=Math.round(g.saved/g.target*100);return '<div class="panel" style="margin-bottom:10px"><b>'+g.icon+' '+esc(g.name)+'</b><div class="rl-sub">'+money(g.saved)+' of '+money(g.target)+'</div><div style="height:8px;border-radius:5px;background:var(--panel3);margin-top:6px"><div style="height:100%;width:'+pct+'%;background:var(--good);border-radius:5px"></div></div></div>';}).join('')+
    D.subs.map(s=>'<div class="row-link"><div class="cat-icon">'+s.icon+'</div><div class="rl-main">'+esc(s.name)+'<div class="rl-sub">'+s.cycle+'</div></div><div class="rl-val">'+money(s.amt)+'</div></div>').join('');
}
window.gPayAmount=0;
window.gSetAmount=function(v){window.gPayAmount=v;document.getElementById('g-amt-display').textContent=money(v);};
window.gConfirmPay=function(){
  var cat=document.getElementById('g-pay-cat').value||'other';
  var amt=window.gPayAmount||150;
  var c=D.cats.find(x=>x.id===cat);
  D.txns.unshift({id:uid(),day:23,cat:cat,amt:amt,merchant:'New Payment',ts:23});
  c.spent+=amt; renderG(); go(mk,'pay-success');
};
function initG(){
  var tabs=[['tl','Timeline'],['pay','Pay'],['settings','Settings']]
    .map(t=>'<button class="tab" data-tabfor="'+t[0]+'" onclick="go(\''+mk+'\',\''+t[0]+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg><span>'+t[1]+'</span></button>').join('');
  var F=onboardingFrames(mk,'tl');
  F+=frame('tl','<div class="topbar notop"><h2>Timeline</h2><div class="spacer"></div><button class="chev-back" style="width:32px;height:32px" onclick="go(\'g\',\'save\')">💰</button></div>'+
    '<div class="pad" style="overflow-x:auto;display:flex;gap:0;padding-top:6px" id="g-ribbon-wrap"><div id="g-ribbon" style="display:flex;gap:4px"></div></div>'+
    '<div class="pad chip-wrap" id="g-filters" style="margin:10px 0"></div>'+
    '<div class="pad" id="g-stream"></div>');
  F+=frame('pay','<div class="topbar"><button class="chev-back" onclick="go(\'g\',\'tl\')">←</button><h2>Pay</h2></div><div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
    '<button class="panel" style="text-align:left" onclick="go(\'g\',\'pay-amount\')"><b>📷 Scan &amp; Pay</b></button>'+
    '<button class="panel" style="text-align:left" onclick="go(\'g\',\'pay-amount\')"><b>👤 Pay Anyone</b></button></div>');
  F+=frame('pay-amount','<div class="topbar"><button class="chev-back" onclick="go(\'g\',\'pay\')">←</button><h2>Amount</h2></div><div class="pad">'+
    '<div id="g-amt-display" style="font-size:40px;font-weight:800;text-align:center;margin:24px 0">₹0</div>'+
    '<div class="chip-wrap" style="justify-content:center;margin-bottom:16px">'+[50,100,200,500].map(v=>'<button class="pill" onclick="gSetAmount('+v+')">'+money(v)+'</button>').join('')+'</div>'+
    '<select id="g-pay-cat" class="field" style="margin-bottom:16px">'+D_catOptsG()+'</select>'+
    '<button class="btn solid" onclick="gConfirmPay()">Pay now</button></div>');
  F+=frame('pay-success','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">'+
    '<div style="width:60px;height:60px;border-radius:50%;background:var(--good);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px">✓</div>'+
    '<div style="font-size:20px;font-weight:800">Payment sent</div><button class="btn solid" style="width:200px" onclick="go(\'g\',\'tl\')">Back to timeline</button></div>');
  F+=frame('save','<div class="topbar"><button class="chev-back" onclick="go(\'g\',\'tl\')">←</button><h2>Save</h2></div><div class="pad"><div id="g-save-list"></div>'+
    '<button class="btn ghost" onclick="alert(\'Add-goal flow.\')">+ New goal</button></div>');
  F+=frame('settings','<div class="topbar notop"><h2>Settings</h2></div><div class="pad">'+
    '<div class="row-link"><div class="rl-main">Profile</div></div><div class="row-link"><div class="rl-main">Notifications &amp; alerts</div></div>'+
    '<div class="row-link"><div class="rl-main">Change PIN</div></div><div class="row-link"><div class="rl-main">Permissions</div></div></div>');
  document.body.insertAdjacentHTML('beforeend', phoneShell(mk,'G · Timeline',F,tabs,'',true));
}
function D_catOptsG(){return CAT_DEFS.map(c=>'<option value="'+c.id+'">'+c.icon+' '+esc(c.name)+'</option>').join('');}
window.onEnter_g=function(){};
MOCKUPS.push({k:'g',init:initG});
})();

// ===================== H: FORECAST =====================
(function(){
var mk='h', D;
function enterH(){ D=seedData(); go(mk,'fc'); renderH(); }
window.enterH=enterH;

function projectedBalance(){
  var bal=D.accounts[0].balance;
  var spentSoFar=totalSpent(D);
  var dailyRate=spentSoFar/23;
  var projSpend=dailyRate*30;
  var proj=Math.round(bal+spentSoFar-projSpend); // simplistic
  var band=Math.round(proj*0.12);
  return {proj:Math.max(0,bal-Math.round(projSpend-spentSoFar)),lo:0,hi:0,dailyRate:dailyRate};
}
function burnDown(c){
  var w=300,h=90,days=30;
  var remaining=c.budget;
  var pts='';
  for(var d=0;d<=23;d++){
    var spentByD=D.txns.filter(t=>t.cat===c.id&&t.day<=d).reduce((s,t)=>s+t.amt,0);
    var rem=Math.max(0,c.budget-spentByD);
    var x=d/(days)*w, y=h-(rem/c.budget*h);
    pts+=x+','+y+' ';
  }
  // projection dotted from day23 to day30 based on current burn rate
  var spent23=catSpent(D,c.id);
  var rate=spent23/23;
  var projPts='';
  for(var d=23;d<=30;d++){
    var rem=Math.max(0,c.budget-spent23-rate*(d-23));
    var x=d/days*w,y=h-(rem/c.budget*h);
    projPts+=x+','+y+' ';
  }
  return '<svg width="100%" viewBox="0 0 '+w+' '+h+'" class="tiny-svg">'+
    '<line x1="'+(23/days*w)+'" y1="0" x2="'+(23/days*w)+'" y2="'+h+'" stroke="var(--line)" stroke-dasharray="2,2"/>'+
    '<polyline points="'+pts+'" fill="none" stroke="'+c.color+'" stroke-width="2.5"/>'+
    '<polyline points="'+projPts+'" fill="none" stroke="'+c.color+'" stroke-width="2" stroke-dasharray="4,3"/>'+
  '</svg>';
}
function renderH(){
  if(!D)return;
  var p=projectedBalance();
  document.getElementById('h-proj').textContent=money(p.proj);
  document.getElementById('h-band').textContent='Range '+money(Math.round(p.proj*0.88))+' – '+money(Math.round(p.proj*1.12));
  var over = p.dailyRate*30 > D.cats.reduce((s,c)=>s+c.budget,0);
  document.getElementById('h-insights').innerHTML=
    '<div class="panel-lite" style="margin-bottom:10px">'+(over?'At this pace you\'ll be '+money(Math.round(p.dailyRate*30-D.cats.reduce((s,c)=>s+c.budget,0)))+' over budget by the 30th.':'At this pace you\'ll stay within budget through the 30th.')+'</div>'+
    '<div class="panel-lite" style="margin-bottom:10px">Netflix subscription renews in 4 days — already factored into your projection.</div>'+
    '<div class="panel-lite">Food spend is trending '+(catSpent(D,'food')/23>150?'above':'below')+' its usual daily pace this week.</div>';
  document.getElementById('h-cat-list').innerHTML=D.cats.map(c=>{
    var spent=catSpent(D,c.id);
    return '<div class="panel" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b>'+c.icon+' '+esc(c.name)+'</b><span class="rl-sub">'+money(c.budget-spent)+' left</span></div>'+burnDown(c)+'</div>';
  }).join('');
  document.getElementById('h-save-list').innerHTML=D.goals.map(g=>{
    var pct=Math.round(g.saved/g.target*100);
    var weeksLeft=Math.ceil((g.target-g.saved)/g.weeklyRate);
    var d=new Date(2026,10,23+weeksLeft*7-30); // rough
    var completion='wk '+weeksLeft+' from now';
    return '<div class="panel" style="margin-bottom:10px"><b>'+g.icon+' '+esc(g.name)+'</b><div class="rl-sub">'+money(g.saved)+' of '+money(g.target)+' · '+pct+'% · on track: '+completion+'</div><div style="height:8px;border-radius:5px;background:var(--panel3);margin-top:6px"><div style="height:100%;width:'+pct+'%;background:var(--good);border-radius:5px"></div></div></div>';
  }).join('')+D.subs.map(s=>'<div class="row-link"><div class="cat-icon">'+s.icon+'</div><div class="rl-main">'+esc(s.name)+'<div class="rl-sub">renews day '+s.next+'</div></div><div class="rl-val">'+money(s.amt)+'</div></div>').join('');
}
window.hEditBudget=function(id){
  var c=D.cats.find(x=>x.id===id);
  document.getElementById('h-budget-body').innerHTML='<div class="sec-title">'+c.icon+' '+esc(c.name)+'</div>'+
    '<input class="field" id="h-budget-input" type="number" value="'+c.budget+'" style="margin:10px 0">'+
    '<button class="btn solid" onclick="hSaveBudget(\''+id+'\')">Save budget</button>';
  document.getElementById('h-budget-body').dataset.cat=id;
  openSheet(mk,'budget');
};
window.hSaveBudget=function(id){
  var v=parseInt(document.getElementById('h-budget-input').value,10)||1000;
  D.cats.find(c=>c.id===id).budget=v;
  closeSheet(mk); renderH();
};
window.hPayAmount=0;
window.hSetAmount=function(v){window.hPayAmount=v;document.getElementById('h-amt-display').textContent=money(v);};
window.hConfirmPay=function(){
  var cat=document.getElementById('h-pay-cat').value||'other';
  var amt=window.hPayAmount||150;
  var c=D.cats.find(x=>x.id===cat);
  D.txns.unshift({id:uid(),day:23,cat:cat,amt:amt,merchant:'New Payment',ts:23});
  c.spent+=amt; renderH(); go(mk,'pay-success');
};
function initH(){
  var tabs=[['fc','Forecast'],['cats','Categories'],['save','Save'],['settings','Settings']]
    .map(t=>'<button class="tab" data-tabfor="'+t[0]+'" onclick="go(\''+mk+'\',\''+t[0]+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg><span>'+t[1]+'</span></button>').join('');
  var F=onboardingFrames(mk,'fc');
  F+=frame('fc','<div class="topbar notop"><h2>Forecast</h2></div><div class="pad">'+
    '<div class="panel" style="background:var(--dark);color:#fff;text-align:center;margin-bottom:8px"><div style="font-size:12px;opacity:.8">Projected end-of-month balance</div><div id="h-proj" style="font-size:30px;font-weight:800"></div><div id="h-band" style="font-size:11px;opacity:.75;margin-top:4px"></div></div>'+
    '<button class="btn solid" style="margin-bottom:16px" onclick="go(\'h\',\'pay\')">New payment</button>'+
    '<div class="sec-title">Predictive insights</div><div id="h-insights"></div></div>');
  F+=frame('pay','<div class="topbar"><button class="chev-back" onclick="go(\'h\',\'fc\')">←</button><h2>Pay</h2></div><div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
    '<button class="panel" style="text-align:left" onclick="go(\'h\',\'pay-amount\')"><b>📷 Scan &amp; Pay</b></button>'+
    '<button class="panel" style="text-align:left" onclick="go(\'h\',\'pay-amount\')"><b>👤 Pay Anyone</b></button></div>');
  F+=frame('pay-amount','<div class="topbar"><button class="chev-back" onclick="go(\'h\',\'pay\')">←</button><h2>Amount</h2></div><div class="pad">'+
    '<div id="h-amt-display" style="font-size:40px;font-weight:800;text-align:center;margin:24px 0">₹0</div>'+
    '<div class="chip-wrap" style="justify-content:center;margin-bottom:16px">'+[50,100,200,500].map(v=>'<button class="pill" onclick="hSetAmount('+v+')">'+money(v)+'</button>').join('')+'</div>'+
    '<select id="h-pay-cat" class="field" style="margin-bottom:16px">'+D_catOptsH()+'</select>'+
    '<button class="btn solid" onclick="hConfirmPay()">Pay now</button></div>');
  F+=frame('pay-success','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">'+
    '<div style="width:60px;height:60px;border-radius:50%;background:var(--good);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px">✓</div>'+
    '<div style="font-size:20px;font-weight:800">Payment sent</div><button class="btn solid" style="width:200px" onclick="go(\'h\',\'fc\')">Done</button></div>');
  F+=frame('cats','<div class="topbar notop"><h2>Categories</h2></div><div class="pad"><p class="hint" style="margin-bottom:10px">Burn-down: remaining budget trending to zero. Dotted = projected.</p><div id="h-cat-list"></div></div>');
  F+=frame('save','<div class="topbar notop"><h2>Save</h2></div><div class="pad"><div id="h-save-list"></div>'+
    '<button class="btn ghost" onclick="alert(\'Add-goal flow.\')">+ New goal</button></div>');
  F+=frame('settings','<div class="topbar notop"><h2>Settings</h2></div><div class="pad">'+
    '<div class="row-link"><div class="rl-main">Profile</div></div><div class="row-link"><div class="rl-main">Notifications &amp; alerts</div></div>'+
    '<div class="row-link"><div class="rl-main">Change PIN</div></div><div class="row-link"><div class="rl-main">Permissions</div></div></div>');
  var sheets='<div class="sheet-scrim" data-sheet="budget"><div class="sheet"><div class="handle"></div><div id="h-budget-body"></div></div></div>';
  document.body.insertAdjacentHTML('beforeend', phoneShell(mk,'H · Forecast',F,tabs,sheets,true));
  // wire tap-to-edit on category burn-downs after render via delegation
  document.querySelector('.mockup[data-mockup="h"]').addEventListener('click',function(e){
    var panel=e.target.closest('#h-cat-list .panel');
    if(panel){var idx=[...panel.parentNode.children].indexOf(panel); window.hEditBudget(D.cats[idx].id);}
  });
}
function D_catOptsH(){return CAT_DEFS.map(c=>'<option value="'+c.id+'">'+c.icon+' '+esc(c.name)+'</option>').join('');}
window.onEnter_h=function(){};
MOCKUPS.push({k:'h',init:initH});
})();

// ===================== I: SPLIT =====================
(function(){
var mk='i', D, homeView='me', curCircle=null, selMembers=[];
function seedCircles(){
  return [
    {id:'c1',name:'Hostel Room 12',members:['You','Rahul','Priya','Aman'],expenses:[
      {id:'e1',desc:'Groceries',amt:1200,paidBy:'You',split:['You','Rahul','Priya','Aman']},
      {id:'e2',desc:'Wifi bill',amt:800,paidBy:'Priya',split:['You','Rahul','Priya','Aman']},
      {id:'e3',desc:'Cleaning supplies',amt:400,paidBy:'Rahul',split:['You','Rahul','Priya','Aman']}
    ]},
    {id:'c2',name:'Goa Trip',members:['You','Sneha','Priya'],expenses:[
      {id:'e4',desc:'Hotel',amt:6000,paidBy:'You',split:['You','Sneha','Priya']},
      {id:'e5',desc:'Cab',amt:1500,paidBy:'Sneha',split:['You','Sneha','Priya']}
    ]}
  ];
}
function enterI(){ D=seedData(); D.circles=seedCircles(); go(mk,'home'); renderI(); }
window.enterI=enterI;

function netBalances(){
  // net across all circles: positive = others owe You
  var net={};
  D.circles.forEach(c=>c.expenses.forEach(e=>{
    var share=e.amt/e.split.length;
    e.split.forEach(m=>{
      if(m==='You'&&e.paidBy==='You')return;
      if(e.paidBy==='You'&&m!=='You'){net[m]=(net[m]||0)+share;}
      else if(m==='You'&&e.paidBy!=='You'){net[e.paidBy]=(net[e.paidBy]||0)-share;}
    });
  }));
  return net;
}
function circleTotal(c){return c.expenses.reduce((s,e)=>s+e.amt,0);}
function renderI(){
  if(!D)return;
  document.getElementById('i-toggle-me').classList.toggle('on',homeView==='me');
  document.getElementById('i-toggle-circ').classList.toggle('on',homeView==='circles');
  document.getElementById('i-view-me').style.display=homeView==='me'?'block':'none';
  document.getElementById('i-view-circles').style.display=homeView==='circles'?'block':'none';
  document.getElementById('i-cat-list').innerHTML=D.cats.map(c=>{var s=catSpent(D,c.id);return '<div class="row-link" style="cursor:default"><div class="cat-icon">'+c.icon+'</div><div class="rl-main">'+esc(c.name)+'</div><div class="rl-val">'+money(s)+'</div></div>';}).join('');
  document.getElementById('i-txn-list').innerHTML=D.txns.slice(0,6).map(t=>{var c=D.cats.find(c=>c.id===t.cat);return '<div class="row-link" style="cursor:default"><div class="cat-icon">'+c.icon+'</div><div class="rl-main">'+esc(t.merchant)+'</div><div class="rl-val">-'+money(t.amt)+'</div></div>';}).join('');
  var net=netBalances();
  document.getElementById('i-net-list').innerHTML=Object.keys(net).map(m=>{
    var v=net[m];
    if(Math.abs(v)<1)return '';
    return v>0?'<div class="row-link" style="cursor:default"><span style="color:var(--good);font-size:18px;margin-right:8px">↑</span><div class="rl-main">'+esc(m)+' owes you</div><div class="rl-val" style="color:var(--good)">'+money(v)+'</div></div>'
      :'<div class="row-link" style="cursor:default"><span style="color:var(--bad);font-size:18px;margin-right:8px">↓</span><div class="rl-main">You owe '+esc(m)+'</div><div class="rl-val" style="color:var(--bad)">'+money(-v)+'</div></div>';
  }).join('');
  var maxT=Math.max(...D.circles.map(circleTotal),1);
  document.getElementById('i-circle-bars').innerHTML=D.circles.map(c=>'<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><span>'+esc(c.name)+'</span><span>'+money(circleTotal(c))+'</span></div><div style="height:10px;border-radius:6px;background:var(--panel3)"><div style="height:100%;width:'+Math.round(circleTotal(c)/maxT*100)+'%;background:var(--accent);border-radius:6px"></div></div></div>').join('');
  document.getElementById('i-circle-list').innerHTML=D.circles.map(c=>'<button class="row-link" onclick="iOpenCircle(\''+c.id+'\')"><div class="cat-icon">👥</div><div class="rl-main">'+esc(c.name)+'<div class="rl-sub">'+c.members.length+' members · '+money(circleTotal(c))+' total</div></div><div class="rl-val">›</div></button>').join('');
  document.getElementById('i-save-list').innerHTML=D.goals.map(g=>{var pct=Math.round(g.saved/g.target*100);return '<div class="panel" style="margin-bottom:10px"><b>'+g.icon+' '+esc(g.name)+'</b><div class="rl-sub">'+money(g.saved)+' of '+money(g.target)+'</div><div style="height:8px;border-radius:5px;background:var(--panel3);margin-top:6px"><div style="height:100%;width:'+pct+'%;background:var(--good);border-radius:5px"></div></div></div>';}).join('')+
    D.subs.map(s=>'<div class="row-link"><div class="cat-icon">'+s.icon+'</div><div class="rl-main">'+esc(s.name)+'</div><div class="rl-val">'+money(s.amt)+'</div></div>').join('');
}
window.iSetView=function(v){homeView=v;renderI();};
window.iOpenCircle=function(id){
  curCircle=D.circles.find(c=>c.id===id);
  var net={};
  curCircle.expenses.forEach(e=>{var share=e.amt/e.split.length;e.split.forEach(m=>{if(m===e.paidBy)return;net[m]=net[m]||{};net[m][e.paidBy]=(net[m][e.paidBy]||0)+share;});});
  document.getElementById('i-circle-title').textContent=curCircle.name;
  document.getElementById('i-circle-members').innerHTML=curCircle.members.map(m=>'<span class="pill">'+esc(m)+'</span>').join('');
  document.getElementById('i-circle-expenses').innerHTML=curCircle.expenses.map(e=>'<div class="row-link" style="cursor:default"><div class="rl-main">'+esc(e.desc)+'<div class="rl-sub">Paid by '+esc(e.paidBy)+' · split '+e.split.length+' ways</div></div><div class="rl-val">'+money(e.amt)+'</div></div>').join('');
  var lines=[];
  Object.keys(net).forEach(debtor=>Object.keys(net[debtor]).forEach(cred=>{
    var v=net[debtor][cred]; if(v<1)return;
    if(debtor==='You')lines.push('<div class="row-link" style="cursor:default"><span style="color:var(--bad);margin-right:6px">↓</span>You owe '+esc(cred)+' <span style="margin-left:auto;color:var(--bad)">'+money(v)+'</span></div>');
    else if(cred==='You')lines.push('<div class="row-link" style="cursor:default"><span style="color:var(--good);margin-right:6px">↑</span>'+esc(debtor)+' owes you <span style="margin-left:auto;color:var(--good)">'+money(v)+'</span></div>');
  }));
  document.getElementById('i-circle-net').innerHTML=lines.join('')||'<p class="hint">All settled up.</p>';
  go(mk,'circle-detail');
};
window.iToggleMember=function(m){
  var i=selMembers.indexOf(m);
  if(i>=0)selMembers.splice(i,1); else selMembers.push(m);
  document.querySelectorAll('.i-member-pill').forEach(p=>p.classList.toggle('on',selMembers.includes(p.dataset.m)));
};
window.iOpenAddExpense=function(){
  selMembers=curCircle.members.slice();
  document.getElementById('i-add-members').innerHTML=curCircle.members.map(m=>'<button class="pill on i-member-pill" data-m="'+esc(m)+'" onclick="iToggleMember(\''+esc(m)+'\')">'+esc(m)+'</button>').join('');
  go(mk,'add-expense');
};
window.iSaveExpense=function(){
  var amt=parseInt(document.getElementById('i-exp-amt').value,10)||0;
  var desc=document.getElementById('i-exp-desc').value||'Shared expense';
  if(!amt||!selMembers.length){alert('Enter an amount and pick at least one member.');return;}
  curCircle.expenses.unshift({id:uid(),desc:desc,amt:amt,paidBy:'You',split:selMembers.slice()});
  renderI(); iOpenCircle(curCircle.id);
};
window.iPayAmount=0;
window.iSetAmount=function(v){window.iPayAmount=v;document.getElementById('i-amt-display').textContent=money(v);};
window.iConfirmPay=function(){
  var cat=document.getElementById('i-pay-cat').value||'other';
  var amt=window.iPayAmount||150;
  var c=D.cats.find(x=>x.id===cat);
  D.txns.unshift({id:uid(),day:23,cat:cat,amt:amt,merchant:'New Payment',ts:23});
  c.spent+=amt; renderI(); go(mk,'pay-success');
};
function initI(){
  var tabs=[['home','Home'],['circles','Circles'],['save','Save'],['settings','Settings']]
    .map(t=>'<button class="tab" data-tabfor="'+t[0]+'" onclick="go(\''+mk+'\',\''+t[0]+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg><span>'+t[1]+'</span></button>').join('');
  var F=onboardingFrames(mk,'home');
  F+=frame('home','<div class="topbar notop"><h2>Trickle</h2></div><div class="pad">'+
    '<div style="display:flex;gap:8px;margin-bottom:14px"><button class="pill on" id="i-toggle-me" onclick="iSetView(\'me\')">Me</button><button class="pill" id="i-toggle-circ" onclick="iSetView(\'circles\')">Circles</button></div>'+
    '<div id="i-view-me"><button class="btn solid" style="margin-bottom:14px" onclick="go(\'i\',\'pay\')">New payment</button><div class="sec-title">Categories</div><div id="i-cat-list" style="margin-bottom:14px"></div><div class="sec-title">Recent</div><div id="i-txn-list"></div></div>'+
    '<div id="i-view-circles"><div class="sec-title">Who owes whom</div><div id="i-net-list" style="margin-bottom:14px"></div><div class="sec-title">Spend by circle</div><div id="i-circle-bars"></div></div>'+
    '</div>');
  F+=frame('circles','<div class="topbar notop"><h2>Circles</h2></div><div class="pad"><div id="i-circle-list"></div>'+
    '<button class="btn ghost" onclick="alert(\'Create-circle flow — name + add members.\')">+ New circle</button></div>');
  F+=frame('circle-detail','<div class="topbar"><button class="chev-back" onclick="go(\'i\',\'circles\')">←</button><h2 id="i-circle-title"></h2></div><div class="pad">'+
    '<div class="chip-wrap" id="i-circle-members" style="margin-bottom:14px"></div>'+
    '<div class="sec-title">Net balances</div><div id="i-circle-net" style="margin-bottom:14px"></div>'+
    '<div class="sec-title">Shared expenses</div><div id="i-circle-expenses" style="margin-bottom:14px"></div>'+
    '<button class="btn solid" onclick="iOpenAddExpense()">+ Add shared expense</button></div>');
  F+=frame('add-expense','<div class="topbar"><button class="chev-back" onclick="go(\'i\',\'circle-detail\')">←</button><h2>Add expense</h2></div><div class="pad">'+
    '<label class="hint">Description</label><input class="field" id="i-exp-desc" placeholder="e.g. Dinner" style="margin:8px 0 14px">'+
    '<label class="hint">Amount</label><input class="field" id="i-exp-amt" type="number" placeholder="0" style="margin:8px 0 14px">'+
    '<label class="hint">Split among</label><div class="chip-wrap" id="i-add-members" style="margin:8px 0 18px"></div>'+
    '<button class="btn solid" onclick="iSaveExpense()">Save expense</button></div>');
  F+=frame('pay','<div class="topbar"><button class="chev-back" onclick="go(\'i\',\'home\')">←</button><h2>Pay</h2></div><div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
    '<button class="panel" style="text-align:left" onclick="go(\'i\',\'pay-amount\')"><b>📷 Scan &amp; Pay</b></button>'+
    '<button class="panel" style="text-align:left" onclick="go(\'i\',\'pay-amount\')"><b>👤 Pay Anyone</b></button></div>');
  F+=frame('pay-amount','<div class="topbar"><button class="chev-back" onclick="go(\'i\',\'pay\')">←</button><h2>Amount</h2></div><div class="pad">'+
    '<div id="i-amt-display" style="font-size:40px;font-weight:800;text-align:center;margin:24px 0">₹0</div>'+
    '<div class="chip-wrap" style="justify-content:center;margin-bottom:16px">'+[50,100,200,500].map(v=>'<button class="pill" onclick="iSetAmount('+v+')">'+money(v)+'</button>').join('')+'</div>'+
    '<select id="i-pay-cat" class="field" style="margin-bottom:16px">'+D_catOptsI()+'</select>'+
    '<button class="btn solid" onclick="iConfirmPay()">Pay now</button></div>');
  F+=frame('pay-success','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">'+
    '<div style="width:60px;height:60px;border-radius:50%;background:var(--good);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px">✓</div>'+
    '<div style="font-size:20px;font-weight:800">Payment sent</div><button class="btn solid" style="width:200px" onclick="go(\'i\',\'home\')">Done</button></div>');
  F+=frame('save','<div class="topbar notop"><h2>Save</h2></div><div class="pad"><div id="i-save-list"></div>'+
    '<button class="btn ghost" onclick="alert(\'Add-goal flow.\')">+ New goal</button></div>');
  F+=frame('settings','<div class="topbar notop"><h2>Settings</h2></div><div class="pad">'+
    '<div class="row-link"><div class="rl-main">Profile</div></div><div class="row-link"><div class="rl-main">Notifications &amp; alerts</div></div>'+
    '<div class="row-link"><div class="rl-main">Change PIN</div></div><div class="row-link"><div class="rl-main">Permissions</div></div></div>');
  document.body.insertAdjacentHTML('beforeend', phoneShell(mk,'I · Split',F,tabs,'',true));
}
function D_catOptsI(){return CAT_DEFS.map(c=>'<option value="'+c.id+'">'+c.icon+' '+esc(c.name)+'</option>').join('');}
window.onEnter_i=function(){};
MOCKUPS.push({k:'i',init:initI});
})();


