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
