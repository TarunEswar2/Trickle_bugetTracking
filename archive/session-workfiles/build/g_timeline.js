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
