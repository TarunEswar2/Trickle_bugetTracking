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
