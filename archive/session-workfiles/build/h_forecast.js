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
