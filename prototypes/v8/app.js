/* ===== Trickle v8 — app ===== */
var WIDGETS={goal:'Goal waffle',strip:'Month so far',where:'Where it went',small:'Small spends add up',saved:'Savings growing',tod:'Time of day',week:'Weekday pattern',subs:'Subscriptions',owed:'Owed to you'};
var S={onb:1,od:{track:null,period:'month',budget:6000,cats:['Food','Travel','Fun','Essentials'],goal:'Goa trip'},tab:'home',open:'savings',sheet:null,drawer:false,reduced:false,
 order:['goal','strip','where','small','saved','tod','week','subs','owed'],pins:['goal','strip'],hidden:[],edit:false,done:{},checkinDone:false,rules:{},fresh:false,lastIncome:null};
try{var sv=JSON.parse(localStorage.getItem('trickle8')||'null');if(sv&&sv.order){S.order=sv.order;S.pins=sv.pins;S.hidden=sv.hidden;}}catch(e){}
function persist(){try{localStorage.setItem('trickle8',JSON.stringify({order:S.order,pins:S.pins,hidden:S.hidden}));}catch(e){}}
var $=function(s){return document.querySelector(s);};
var A={};
function render(){
 var app=$('#app');app.classList.toggle('rm',S.reduced);var k=(S.sheet?S.sheet.k:'')+'|'+S.drawer;app.classList.toggle('still',k===S._lastOv);S._lastOv=k;
 if(S.onb){app.innerHTML='<div class="viewport" id="vp">'+onbScreen()+'</div>'+ovHTML();afterRender();return;}
 var body={home:homeScr,money:moneyScr,actions:actionsScr,insights:insightsScr}[S.tab]();
 var nAct=actionItems().length;
 app.innerHTML='<div class="viewport" id="vp"><div class="scr" data-screen="'+S.tab+'">'+body+'</div></div>'+
  '<nav class="tabs" aria-label="Main">'+[['home','Home','home'],['money','Money','money'],['actions','Actions','inbox'],['insights','Insights','grid']].map(function(t){return '<button data-a="tab" data-x="'+t[0]+'"'+(S.tab===t[0]?' aria-current="page"':'')+'>'+ic(t[2])+t[1]+(t[0]==='actions'&&nAct?'<span class="dot" aria-label="has items"></span>':'')+'</button>';}).join('')+'</nav>'+ovHTML();
 afterRender();}
function ovHTML(){var h='';if(S.sheet)h+=SHEETS[S.sheet.k]();if(S.drawer)h+='<div class="scrim" data-a="drawer" data-x="0"></div>'+drawerHTML();if(S.toast)h+='<div class="toast" role="status"><span class="t">'+S.toast.t+'</span>'+(S.toast.undo?'<button class="link" data-a="'+S.toast.undo+'">Undo</button>':'')+'</div>';return h;}
function afterRender(){if(S.after){var f=S.after;S.after=null;requestAnimationFrame(function(){requestAnimationFrame(f);});}checkInvariant(S.tab+(S.sheet?':'+S.sheet.k:''));}
function toast(t,undo,ms){S.toast={t:t,undo:undo};clearTimeout(S._tt);S._tt=setTimeout(function(){S.toast=null;render();},ms||4200);}
document.addEventListener('click',function(e){var el=e.target.closest('[data-a]');if(!el)return;var f=A[el.getAttribute('data-a')];if(f){e.preventDefault();f(el.getAttribute('data-x'),el);}});
A.tab=function(x){S.tab=x;S.sheet=null;S.edit=false;render();$('#vp').scrollTop=0;};
A.drawer=function(x){S.drawer=x==='1';render();};
A.close=function(){S.sheet=null;render();};
A.reveal=function(x,el){var v=el.getAttribute('data-v');if(!v)return;var old=el.parentNode.querySelector('.tagv');if(old){old.remove();return;}var t=document.createElement('span');t.className='tagv';t.textContent=v;el.insertAdjacentElement('afterend',t);setTimeout(function(){t.remove();},3000);};
A.open=function(x){S.open=S.open===x?null:x;var accs=document.querySelectorAll('.acc');accs.forEach(function(a){a.setAttribute('data-open',a.getAttribute('data-id')===S.open?'1':'0');a.querySelector('button').setAttribute('aria-expanded',a.getAttribute('data-id')===S.open);});};
function sheet(k,d){S.sheet=Object.assign({k:k},d||{});render();}

/* ================= HOME ================= */
function homeScr(){
 var pc=pace(),recent=TX.filter(function(t){return t.type==='spend'&&t.ts<=NOW;}).slice(-3).reverse();
 var h=glowHTML()+
 '<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><div style="flex:1"><div class="hello">'+greet()+', Tarun</div></div>'+paceChip()+'</div>'+
 '<div style="padding:34px 0 6px"><h1>'+(pc.state==='ok'?'You’re moving at a calm pace this '+periodWord()+'.':'This '+periodWord()+' is moving a little fast.')+'</h1><p class="muted" style="margin-top:8px">'+(pc.state==='ok'?'Nothing needs you right now.':'Small spends slow it down fastest.')+'</p></div>'+
 (TRACK==='manual'?'<div class="row2"><button class="btn" data-a="pay" data-x="log">'+ic('plus')+'Add a spend</button><button class="btn sec" data-a="pay" data-x="upi">'+ic('scan')+'Pay</button></div>':'<div class="row2"><button class="btn" data-a="pay" data-x="upi">'+ic('scan')+'Pay</button><button class="btn sec" data-a="pay" data-x="log">'+ic('cash')+'Log cash</button></div>')+
 '<section class="card" aria-label="Recent spends"><div class="hd"><span class="lbl">Recent</span><button class="link" data-a="txlist">All spends</button></div><div>'+recent.map(txRowTiles).join('')+'</div></section>'+
 subsCard()+
 '<div class="pinrow">'+S.pins.filter(function(w){return S.hidden.indexOf(w)<0;}).map(function(w){return widget(w,'home');}).join('')+'</div>'+
 '<button class="link" data-a="tab" data-x="insights" style="align-self:center">Pin more visuals</button>';
 return h;}
function greet(){var h=new Date(NOW).getHours();return h<12?'Good morning':h<17?'Good afternoon':'Good evening';}
function txRowTiles(t){var n=Math.min(12,Math.ceil(t.amt/TILE)),c=catColor(t.cat);
 return '<button class="tx" data-a="txd" data-x="'+t.id+'"><span class="ico" style="color:'+c+'">'+ic(catIc(t.cat),20)+'</span><span class="m"><b>'+esc(t.merchant)+'</b><small>'+(t.cat==='Unsorted'?'Needs a category':t.cat)+' · '+relWord(t.ts)+'</small></span>'+tg(rep(n,{c:c}),Math.min(n,6),8,2)+'</button>';}
function subsCard(){var nx=nextSub();if(!nx)return '';var n=SUBS.length;
 return '<button class="card tap" data-a="subs" style="flex-direction:row;align-items:center;gap:12px">'+tg(SUBS.map(function(s){return {c:catColor(s.cat),cls:s===nx.s?'':'h'};}),n,14,4)+'<span style="flex:1"><b>'+nx.s.name+'</b> renews '+nx.when+'</span>'+ic('bell',18)+'</button>';}
function nextSub(){var best=null;SUBS.forEach(function(s){var d=new Date(NOW),due=new Date(d.getFullYear(),d.getMonth(),s.day,9).getTime();if(due<NOW-DAY/2)due=new Date(d.getFullYear(),d.getMonth()+1,s.day,9).getTime();if(!best||due<best.due)best={s:s,due:due};});if(!best)return null;var days=Math.round((best.due-new Date(NOW).setHours(0,0,0,0))/DAY);best.when=days<=0?'today':days===1?'tomorrow':days<7?'on '+DOWS[new Date(best.due).getDay()]:'later this month';return best;}

/* ================= WIDGETS ================= */
function widget(w,where){var home=where==='home',p=POOLS(),g=topGoal(),body='',wide=false,cap='';
 if(w==='goal'){body=waffle(g,home?11:13,home?{noReveal:1}:null);cap=esc(g.name)+' is '+goalWords(g);return card(w,body,cap,false,home,'data-a="goal" data-x="'+g.id+'"');}
 if(w==='strip'){var ps=periodStart(),pe=periodEnd(),n=Math.round((pe-ps)/DAY),el=Math.ceil((NOW-ps)/DAY),col=pace().state==='ok'?'var(--calm)':'var(--warm)';
  var a=[];for(var i=0;i<n;i++)a.push(i<el?{c:col}:{});body=tg(a,n>10?6:7,home?15:17,4,{attr:'data-a="reveal" data-v="Day '+el+' of '+n+'"'});var pn=PERIOD==='week'?'the week':thisPeriodName();cap=(el/n>.6?'Most of '+pn+' behind you, ':'Early in '+pn+', ')+(pace().state==='ok'?'on pace':'a little fast');}
 if(w==='where'){wide=true;var a2=[];CATS.forEach(function(c){var n2=Math.round(spentMonth(c)/TILE);a2=a2.concat(rep(n2,{c:catColor(c)}));});body=tg(a2.slice(0,120),home?15:15,12,3)+legend(CATS);cap='Each tile is ₹100 spent this '+'month';}
 if(w==='small'){var sm=TX.filter(function(t){return t.type==='spend'&&inMonth(t,NOW)&&t.amt<100;});wide=!home;body=tg(sm.map(function(t){return {c:catColor(t.cat)};}),home?8:12,home?9:12,3,{attr:'data-a="reveal" data-v="'+sm.length+' spends, '+fmt(sm.reduce(function(a,t){return a+t.amt;},0))+'"'});cap='Every tile is one spend under ₹100';}
 if(w==='saved'){wide=true;var ms=[6,7,8];body='<div style="display:flex;gap:18px;align-items:flex-end">'+ms.map(function(m){var s=savedIn(m);return '<div style="text-align:center">'+tg(rep(Math.round(s/BIG),{c:'var(--save)'}),3,14,4,{attr:'data-a="reveal" data-v="'+fmt(s)+'"'})+'<div class="faint" style="font-size:12px;margin-top:4px">'+MON[m]+'</div></div>';}).join('')+'</div>';cap='Each lime tile is ₹500 you kept';}
 if(w==='tod'){wide=true;var b=[0,0,0,0];TX.forEach(function(t){if(t.type==='spend'&&inMonth(t,NOW)){var h=new Date(t.ts).getHours();b[h<11?0:h<16?1:h<21?2:3]+=t.amt;}});body=bars(b,['Morning','Afternoon','Evening','Night']);cap='When your money moves';}
 if(w==='week'){wide=true;var d=[0,0,0,0,0,0,0];TX.forEach(function(t){if(t.type==='spend'&&t.ts>NOW-60*DAY)d[(new Date(t.ts).getDay()+6)%7]+=t.amt;});body=bars(d,['M','T','W','T','F','S','S']);cap='Weekends are the busy days';}
 if(w==='subs'){body=tg(SUBS.map(function(s){return {c:catColor(s.cat)};}),SUBS.length,18,5,{attr:'data-a="reveal" data-v="'+fmt(SUBS.reduce(function(a,s){return a+s.amt;},0))+' a month"'});cap=SUBS.map(function(s){return s.name;}).join(', ');}
 if(w==='owed'){var o=IOUS.filter(function(i){return !i.settledTs;});body=o.length?'<div style="display:flex;gap:6px">'+o.map(function(i){return '<span class="avatar" style="width:34px;height:34px;font-size:13px">'+i.person[0]+'</span>';}).join('')+'</div>':'<p class="muted">Everyone has paid you back.</p>';cap=o.length?o.map(function(i){return i.person;}).join(', ')+' owe you':'All square';}
 return card(w,body,cap,wide,home);}
function card(w,body,cap,wide,home,attr){var ctl=home?'':'<div class="hd"><span class="lbl">'+WIDGETS[w]+'</span>'+(S.edit?'<span style="display:flex;gap:4px"><button class="iconbtn" data-a="wmove" data-x="'+w+':-1" aria-label="Move up">'+ic('up',18)+'</button><button class="iconbtn" data-a="wmove" data-x="'+w+':1" aria-label="Move down">'+ic('down',18)+'</button><button class="chip" data-a="whide" data-x="'+w+'">Hide</button></span>':'<button class="chip" data-a="wpin" data-x="'+w+'" aria-pressed="'+(S.pins.indexOf(w)>=0)+'">'+ic('pin',16)+(S.pins.indexOf(w)>=0?'Pinned':'Pin to Home')+'</button>')+'</div>';
 return '<section class="card'+(wide&&home?' wide':'')+'" data-w="'+w+'"'+(attr&&home?' '+attr+' role="button" tabindex="0" style="cursor:pointer"':'')+'>'+ctl+'<div'+(attr&&!home?' '+attr+' style="cursor:pointer"':'')+'>'+body+'</div><p class="muted" style="font-size:13px">'+cap+'</p></section>';}
function legend(cs){return '<div class="chips" style="gap:12px;margin-top:10px;font-size:12.5px">'+cs.map(function(c){return '<span style="display:inline-flex;align-items:center;gap:6px"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'</span>';}).join('')+'</div>';}
function bars(v,l){var m=Math.max.apply(null,v)||1,mi=v.indexOf(Math.max.apply(null,v));return '<div class="bars" role="img" aria-label="'+l.join(', ')+'">'+v.map(function(x,i){return '<div><span style="height:'+Math.max(4,Math.round(x/m*70))+'px;background:'+(i===mi?'var(--text2)':'var(--surface3)')+'" data-a="reveal" data-v="'+fmt(x)+'"></span><small>'+l[i]+'</small></div>';}).join('')+'</div>';}
function savedIn(m){var s=0;TX.forEach(function(t){if(t.type==='transfer'&&new Date(t.ts).getMonth()===m&&(t.reason==='save'||t.reason==='sweep'))s+=t.amt;});return s;}
A.wpin=function(w){var i=S.pins.indexOf(w);if(i>=0)S.pins.splice(i,1);else S.pins.push(w);persist();toast(i>=0?WIDGETS[w]+' removed from Home':WIDGETS[w]+' pinned to Home');render();};
A.whide=function(w){S.hidden.push(w);var i=S.pins.indexOf(w);if(i>=0)S.pins.splice(i,1);persist();render();};
A.wshow=function(w){S.hidden.splice(S.hidden.indexOf(w),1);persist();render();};
A.wmove=function(x){var p=x.split(':'),i=S.order.indexOf(p[0]),j=i+(+p[1]);if(j<0||j>=S.order.length)return;S.order.splice(i,1);S.order.splice(j,0,p[0]);persist();render();};
A.wedit=function(){S.edit=!S.edit;render();};

/* ================= INSIGHTS ================= */
function insightsScr(){var vis=S.order.filter(function(w){return S.hidden.indexOf(w)<0;});
 return '<div class="hd"><h2>Your habits, in tiles</h2><button class="chip" data-a="wedit" aria-pressed="'+S.edit+'">'+(S.edit?'Done':'Edit')+'</button></div><p class="muted">Tap any tiles to see the amount. Pin the ones you want on Home.</p>'+
  vis.map(function(w){return widget(w,'board');}).join('')+
  (S.hidden.length?'<section class="card"><span class="lbl">Hidden</span><div class="chips">'+S.hidden.map(function(w){return '<button class="chip" data-a="wshow" data-x="'+w+'">'+ic('eye',16)+WIDGETS[w]+'</button>';}).join('')+'</div></section>':'')+
  '<button class="btn sec" data-a="story">'+ic('cal')+'See '+thisPeriodName()+'’s story</button>';}

/* ================= MONEY ================= */
function moneyScr(){var p=POOLS(),g=topGoal();
 var inc=TX.filter(function(t){return t.type==='income';}),last=inc[inc.length-1];
 var h='<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><h2 style="flex:1">Money</h2></div>'+
 '<section class="card"><span class="lbl">In your account</span><div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><span style="font-family:var(--display);font-size:34px" data-testid="balance">'+fmt(p.balance)+'</span></div><p class="muted" style="font-size:13px">Budget, jars and any new money together. Money friends owe you joins once they pay.</p></section>';
 if(p.nm>0.5)h+='<section class="card" style="border-color:var(--accent)"><div class="hd"><span><b>New money</b> is waiting</span>'+tg(rep(Math.max(1,Math.round(p.nm/BIG)),{c:'var(--bone)'}),6,12,3)+'</div><button class="btn sm" data-a="sortnew">Sort it: budget first, rest to '+esc(g.name)+'</button></section>';
 h+=acc('income','Income',last?esc(last.merchant)+' landed '+(relDay(last.ts)==='Today'?'today':'this '+periodWord()):'Nothing yet',tg(rep(3,{c:'var(--bone)'}),3,10,3),incomeBody(last))+
  acc('budget','Budget',paceWordLong(),tg(CATS.map(function(c){return {c:catColor(c)};}),4,10,3),budgetBody(p))+
  acc('savings','Savings',esc(g.name)+' is '+goalWords(g),tg(rep(3,{c:'var(--save)'}),3,10,3),savingsBody(p));
 return h;}
function paceWordLong(){return pace().state==='ok'?'On pace for '+thisPeriodName():'A bit fast this '+periodWord();}
function acc(id,t,sub,glyph,body){var o=S.open===id;return '<section class="acc" data-id="'+id+'" data-open="'+(o?1:0)+'"><button data-a="open" data-x="'+id+'" aria-expanded="'+o+'">'+glyph+'<span class="t"><b>'+t+'</b><small>'+sub+'</small></span><span class="chev">'+ic('chev')+'</span></button><div class="body"><div><div class="inner">'+body+'</div></div></div></section>';}
function incomeBody(last){var h='';if(last&&!TX.some(function(t){return t.incomeId===last.id;})){h+='<p class="muted">'+esc(last.merchant)+' is not sorted yet. It waits as new money above.</p>';last=null;}if(last){var tr=TX.filter(function(t){return t.incomeId===last.id;}),fill=0,save=0;tr.forEach(function(t){if(t.reason==='fill')fill+=t.amt;else save+=t.amt;});
  h+='<div class="split3"><div>'+tg(rep(Math.round(fill/BIG),{c:'var(--fillg)'}),6,14,4,{attr:'data-a="reveal" data-v="'+fmt(fill)+' to budget"'})+'<div class="lab">Budget</div></div><div>'+tg(rep(Math.round(save/BIG),{c:'var(--save)'}),3,14,4,{attr:'data-a="reveal" data-v="'+fmt(save)+' saved"'})+'<div class="lab">Savings</div></div></div><p class="muted" style="font-size:13px">Your rule: budget fills first, the rest goes to '+esc(topGoal().name)+'. Each tile is ₹500.</p>';}
 h+='<div>'+TX.filter(function(t){return t.type==='income'||t.type==='settle';}).slice(-4).reverse().map(function(t){return '<button class="tx" data-a="txd" data-x="'+t.id+'"><span class="ico" style="color:var(--save)">'+ic('plus',18)+'</span><span class="m"><b>'+esc(t.merchant)+'</b><small>'+relDay(t.ts)+'</small></span><span class="amt in">+'+fmt(t.amt)+'</span></button>';}).join('')+'</div><button class="btn sec" data-a="addincome">'+ic('plus')+'Add income</button>';return h;}
function budgetBody(p){var h='';CATS.forEach(function(c){var cs=catSpecs(c,p),st=cs.left<0?'<span class="pill warm">'+ic('spark',14)+'Over, '+nextPeriodWord()+' starts lighter</span>':'';
  h+='<div><div class="hd"><span style="display:flex;align-items:center;gap:8px"><span class="cdot" style="background:'+catColor(c)+'"></span><b>'+c+'</b></span>'+st+'</div>'+tg(cs.specs.concat(rep(cs.over,{cls:'ov'})),12,15,4,{attr:'data-a="reveal" data-v="'+(cs.left>=0?fmt(cs.left)+' left':fmt(-cs.left)+' over')+'"'})+'</div>';});
 if((p.b.Unsorted||0)<-.5)h+='<p class="muted" style="font-size:13px">One spend still needs a category. It’s in Actions.</p>';
 return h+'<p class="faint" style="font-size:12.5px">Each tile is ₹100. Tap a row to see what’s left.</p><button class="btn sec" data-a="move">'+ic('move')+'Move between categories</button>';}
function savingsBody(p){var h='';GOALS.filter(function(g){return !g.general&&!g.reachedTs;}).forEach(function(g){h+='<button class="card tap" data-a="goal" data-x="'+g.id+'" style="flex-direction:row;align-items:center;gap:14px">'+waffle(g,7,{noReveal:1})+'<span style="flex:1"><b>'+esc(g.name)+'</b><br><span class="muted" style="font-size:13px">'+goalWords(g)+'</span></span></button>';});
 var gen=goalById('general'),gv=p.g.general||0;h+='<div><div class="hd"><b>Rainy-day jar</b><span class="faint" style="font-size:12.5px">₹100 tiles</span></div>'+tg(rep(Math.floor(gv/TILE),{c:'var(--save)'}),10,12,3,{attr:'data-a="reveal" data-v="'+fmt(gv)+'"'})+'</div>';
 var o=IOUS.filter(function(i){return !i.settledTs;});
 h+='<div><div class="hd"><b>Owed to you</b><span class="faint" style="font-size:12.5px">not in your balance yet</span></div>'+(o.length?'<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'+o.map(function(i){return '<span class="avatar" style="width:36px;height:36px;font-size:13px" title="'+i.person+'">'+i.person[0]+'</span>';}).join('')+'<button class="chip" data-a="remind">'+ic('bell',16)+'Remind share</button><button class="chip" data-a="settle">'+ic('check',16)+'Paid back</button></div>':'<p class="muted">Everyone has paid you back.</p>')+'</div>';
 var done=GOALS.filter(function(g){return g.reachedTs;});if(done.length)h+='<p class="muted" style="font-size:13px">'+ic('check',16)+' Reached: '+done.map(function(g){return esc(g.name);}).join(', ')+'</p>';
 h+='<div class="hd"><span><b>Leftover at '+periodWord()+' end</b><br><span class="muted" style="font-size:12.5px">'+(SWEEP==='auto'?'Goes to '+esc(topGoal().name)+' by itself':'We ask you first')+'</span></span><div class="seg" role="group" aria-label="Leftover"><button data-a="sweep" data-x="auto" aria-pressed="'+(SWEEP==='auto')+'">Auto</button><button data-a="sweep" data-x="manual" aria-pressed="'+(SWEEP==='manual')+'">Ask me</button></div></div>';
 return h+'<button class="btn sec" data-a="goalnew">'+ic('plus')+'New goal</button>';}
A.sweep=function(x){SWEEP=x;render();};
A.remind=function(){var o=IOUS.filter(function(i){return !i.settledTs;});var msg='Hey! Your share for Pizza Hut is ₹300. UPI: '+UPI_IDS[0];try{navigator.clipboard.writeText(msg).catch(function(){});}catch(e){}toast('Reminder copied for '+o.map(function(i){return i.person;}).join(', ')+'. Paste it in your chat.');render();};
A.sortnew=function(){var p=POOLS();var inc={id:nid('x'),ts:NOW,amt:Math.round(p.nm)};var r=autoSplitFromNM(inc.amt);S.lastIncome=null;toast(fmt(r.save)+' went to '+esc(r.goal.name));S.tab='money';S.open='savings';render();};
function autoSplitFromNM(amt){var fake={id:'nm'+(++SEQ),ts:NOW,amt:amt};return autoSplit(fake);}

/* ================= ACTIONS ================= */
function actionItems(){var it=[],o=IOUS.filter(function(i){return !i.settledTs;});
 if(o.length)it.push('split');
 var un=TX.filter(function(t){return t.type==='spend'&&t.cat==='Unsorted';});if(un.length)it.push('cat');
 var ns=nextSub();if(ns&&!S.done['sub'+ns.s.id+new Date(NOW).getMonth()]&&(ns.due-NOW)<4*DAY)it.push('sub');
 if(new Date(NOW).getDay()===1&&!S.checkinDone)it.push('checkin');
 if(S.pendingLeft)it.push('left');
 return it;}
function actionsScr(){var it=actionItems();
 var h='<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><h2 style="flex:1">Actions</h2></div>';
 if(!it.length)return h+'<div class="moment" style="padding-top:60px">'+tg(rep(9,{c:'var(--calm)'}),3,22,6,{center:1})+'<p class="big">Nothing needs you.</p><p class="muted">New things land here, one at a time.</p><button class="btn sec" data-a="tab" data-x="home">Back to Home</button></div>';
 h+='<p class="muted">'+(it.length===1?'One small thing.':'A few small things. Each one is a tap.')+'</p><div class="inbox">';
 it.forEach(function(k){h+=AITEM[k]();});return h+'</div><button class="btn sec" data-a="logspend">'+ic('cash')+'Log a cash spend</button>';}
var AITEM={
 split:function(){var o=IOUS.filter(function(i){return !i.settledTs;}),sp=txById(o[0].spendId);return '<section class="card" data-item="split"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('users')+'<b>'+esc(sp?sp.merchant:'Split')+' split</b></span>'+tg(rep(o.length,{c:catColor('Food')}),o.length,12,3,{attr:'data-a="reveal" data-v="'+fmt(owedOpen())+' owed"'})+'</div><p class="muted">'+o.map(function(i){return i.person;}).join(', ').replace(/, ([^,]*)$/,' and $1')+' still owe you their share.</p><button class="btn sm" data-a="settle" style="width:100%">Someone paid back</button><div class="more"><button class="link" data-a="remind">Remind share</button></div></section>';},
 cat:function(){var t=TX.filter(function(t){return t.type==='spend'&&t.cat==='Unsorted';})[0];var sug=t.auto||'Food';return '<section class="card" data-item="cat"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('sort')+'<b>'+esc(t.merchant)+'</b></span><span class="faint" style="font-size:12.5px">'+relDay(t.ts)+'</span></div><p class="muted">Looks like '+sug+'. We’ll remember this payee.</p><button class="btn sm" data-a="catset" data-x="'+t.id+':'+sug+'" style="width:100%">Yes, '+sug+'</button><div class="more">'+CATS.filter(function(c){return c!==sug;}).map(function(c){return '<button class="chip" data-a="catset" data-x="'+t.id+':'+c+'"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'</button>';}).join('')+'</div></section>';},
 sub:function(){var ns=nextSub();return '<section class="card" data-item="sub"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('music')+'<b>'+ns.s.name+' renews '+ns.when+'</b></span></div><p class="muted">It comes out of '+ns.s.cat+'. Fun still has room for it.</p><button class="btn sm" data-a="subkeep" data-x="'+ns.s.id+'" style="width:100%">Keep it</button><div class="more"><button class="link" data-a="subdrop" data-x="'+ns.s.id+'">I’ll cancel it</button></div></section>';},
 checkin:function(){return '<section class="card" data-item="checkin"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('cal')+'<b>Your Monday check-in</b></span>'+tg([{c:'var(--food)'},{c:'var(--save)'},{c:'var(--calm)'}],3,12,3)+'</div><p class="muted">Three cards about last week. Under a minute.</p><button class="btn sm" data-a="checkin" style="width:100%">Open check-in</button></section>';},
 left:function(){var a=S.pendingLeft;return '<section class="card" data-item="left"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('jar')+'<b>Leftover from '+a.name+'</b></span>'+tg(rep(Math.max(1,Math.round(a.amt/TILE)),{c:'var(--save)'}),8,10,3)+'</div><p class="muted">It’s sitting as new money.</p><button class="btn sm" data-a="leftsave" style="width:100%">Save it to '+esc(topGoal().name)+'</button><div class="more"><button class="link" data-a="leftkeep">Keep for spending</button></div></section>';}};
A.catset=function(x){var p=x.split(':'),t=txById(p[0]);t.cat=p[1];S.rules[t.merchant]=p[1];toast(esc(t.merchant)+' is now '+p[1]+'. Next time it’s automatic.');render();};
A.subkeep=function(id){S.done['sub'+id+new Date(NOW).getMonth()]=1;toast('Kept. It comes out of '+SUBS.filter(function(s){return s.id===id;})[0].cat+' as usual.');render();};
A.subdrop=function(id){var s=SUBS.filter(function(x){return x.id===id;})[0];SUBS=SUBS.filter(function(x){return x.id!==id;});S.done['sub'+id+new Date(NOW).getMonth()]=1;toast(s.name+' removed from your subscriptions. Cancel it in the app too.');render();};
A.leftsave=function(){var a=S.pendingLeft,g=topGoal();xfer(NOW,[{ref:'new_money',amt:a.amt}],saveDst(a.amt),'sweep',{period:a.name});S.pendingLeft=null;toast(fmt(a.amt)+' went to '+esc(g.name));render();};
A.leftkeep=function(){S.pendingLeft=null;toast('Kept as new money. Sort it any time in Money.');render();};
A.subs=function(){sheet('subs');};
