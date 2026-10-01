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
