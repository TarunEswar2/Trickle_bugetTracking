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
