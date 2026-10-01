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
