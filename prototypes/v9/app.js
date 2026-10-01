/* ===== Trickle v8 — app ===== */
var DEF_ORDER=['flow','where','rbsum','rbrep','range','vs','tod','saved','goal','month','rbfreq','rbtrend','sizes','mbm','rate','week','top','subs','owed','eta'];
var S={onb:1,od:{track:null,period:'month',budget:6000,cats:['Food','Travel','Fun','Essentials'],goal:'Goa trip'},tab:'home',open:'savings',sheet:null,drawer:false,reduced:false,look:'color',
 order:DEF_ORDER.slice(),pins:['goal','month','rbsum'],hidden:DEF_ORDER.slice(8),done:{},checkinDone:false,rules:{},fresh:false,lastIncome:null,anim:true};
try{var sv=JSON.parse(localStorage.getItem('trickle9')||'null');if(sv&&sv.order&&sv.order.length===DEF_ORDER.length){S.order=sv.order;S.pins=sv.pins;S.hidden=sv.hidden;}if(sv&&sv.look)S.look=sv.look;if(sv&&sv.rn)REPEAT_N=sv.rn;}catch(e){}
function persist(){try{localStorage.setItem('trickle9',JSON.stringify({order:S.order,pins:S.pins,hidden:S.hidden,look:S.look,rn:REPEAT_N}));}catch(e){}}
var $=function(s){return document.querySelector(s);};

function render(){
 var app=$('#app');document.documentElement.setAttribute('data-look',S.look);app.classList.toggle('rm',S.reduced);app.classList.toggle('noanim',!S.anim);var k=(S.sheet?S.sheet.k:'')+'|'+S.drawer;app.classList.toggle('still',k===S._lastOv);S._lastOv=k;
 if(S.onb){app.innerHTML='<div class="viewport" id="vp">'+onbScreen()+'</div>'+ovHTML();afterRender();return;}
 var body={home:homeScr,money:moneyScr,actions:actionsScr,insights:insightsScr}[S.tab]();
 var nAct=actionItems().length;
 app.innerHTML='<div class="viewport" id="vp"><div class="scr" data-screen="'+S.tab+'">'+body+'</div></div>'+
  '<nav class="tabs" aria-label="Main">'+[['home','Home','home'],['money','Money','money'],['actions','Actions','inbox'],['insights','Insights','grid']].map(function(t){return '<button data-a="tab" data-x="'+t[0]+'"'+(S.tab===t[0]?' aria-current="page"':'')+'>'+ic(t[2])+t[1]+(t[0]==='actions'&&nAct?'<span class="dot" aria-label="has items"></span>':'')+'</button>';}).join('')+'</nav>'+ovHTML();
 afterRender();}
function ovHTML(){var h='';if(S.sheet)h+=SHEETS[S.sheet.k]();if(S.drawer)h+='<div class="scrim" data-a="drawer" data-x="0"></div>'+drawerHTML();if(S.toast)h+='<div class="toast" role="status"><span class="t">'+S.toast.t+'</span>'+(S.toast.undo?'<button class="link" data-a="'+S.toast.undo+'">Undo</button>':'')+'</div>';return h;}
function afterRender(){var app=$('#app');if(S.anim){var n=app.querySelectorAll('.viewport .tg i.f, .sheet .tg i.f, .story .tg i.f').length;if(n&&!S.onb)tileTicks(Math.ceil(n/10));countUps(app);if(app.querySelector('.sk')&&(!S.sheet||S._flow))skSound();if(S._pour)play('pour',450);if(S._chime)play('save',500);}S._pour=S._chime=S._flow=0;S.anim=true;glowShift();if(S.after){var f=S.after;S.after=null;requestAnimationFrame(function(){requestAnimationFrame(f);});}checkInvariant(S.tab+(S.sheet?':'+S.sheet.k:''));}
function toast(t,undo,ms){S.toast={t:t,undo:undo};clearTimeout(S._tt);S._tt=setTimeout(function(){S.toast=null;render();},ms||4200);}
var STILL=['reveal','wpin','wmove','whide','wshow','wset','wlib','look','snd','rm','sweep','fp','period','bud','rn','txf','catset2','sppick','key','quick','skn','open','remind','obb','obc'];
document.addEventListener('click',function(e){var el=e.target.closest('[data-a]');if(!el)return;var k=el.getAttribute('data-a'),f=A[k];if(f){e.preventDefault();if(STILL.indexOf(k)>=0)S.anim=false;if(el.classList.contains('btn')||el.classList.contains('opt'))play('tap');else if(el.classList.contains('chip')||el.closest('.seg'))play('toggle');f(el.getAttribute('data-x'),el);}});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button][data-a]')){e.preventDefault();e.target.click();}});
function glowShift(){var g=$('#glow');if(!g)return;var nc=g.style.getPropertyValue('--gc');if(S._gc&&S._gc!==nc&&!isReduced()){g.style.setProperty('--gc',S._gc);requestAnimationFrame(function(){requestAnimationFrame(function(){g.style.setProperty('--gc',nc);});});}S._gc=nc;}
var _skT;function skSound(){clearTimeout(_skT);play('flow',300);_skT=setTimeout(function(){play('save');},isReduced()?0:1200);}
A.tab=function(x){S.tab=x;S.sheet=null;S.edit=false;render();$('#vp').scrollTop=0;};
A.drawer=function(x){S.drawer=x==='1';render();};
A.close=function(){S.sheet=null;render();};
A.reveal=function(x,el){var v=el.getAttribute('data-v');if(!v)return;play('tap');var wc=el.closest('.wc,.skcard'),tip=wc&&wc.querySelector('.wtip');if(tip){tip.innerHTML='<span class="tagv">'+esc(v)+'</span>';clearTimeout(tip._t);tip._t=setTimeout(function(){tip.innerHTML='';},3000);return;}var old=el.parentNode.querySelector('.tagv');if(old){old.remove();return;}var t=document.createElement('span');t.className='tagv';t.textContent=v;el.insertAdjacentElement('afterend',t);setTimeout(function(){t.remove();},3000);};
A.open=function(x){S.open=S.open===x?null:x;var accs=document.querySelectorAll('.acc');accs.forEach(function(a){a.setAttribute('data-open',a.getAttribute('data-id')===S.open?'1':'0');a.querySelector('button').setAttribute('aria-expanded',a.getAttribute('data-id')===S.open);});};
function sheet(k,d){S.sheet=Object.assign({k:k},d||{});render();}

/* ================= HOME ================= */
function homeScr(){
 var pc=pace(),recent=TX.filter(function(t){return t.type==='spend'&&t.ts<=NOW;}).slice(-3).reverse();
 var h=glowHTML()+
 '<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><div style="flex:1"><div class="hello">'+greet()+', Tarun</div></div>'+paceChip()+'</div>'+
 '<div style="padding:34px 0 6px"><h1>'+(pc.state==='ok'?'You’re moving at a calm pace this '+periodWord()+'.':'This '+periodWord()+' is moving a little fast.')+'</h1><p class="muted" style="margin-top:8px">'+(pc.state==='ok'?'Nothing needs you right now.':'Small spends slow it down fastest.')+'</p></div>'+
 (TRACK==='manual'?'<div class="row2"><button class="btn" data-a="pay" data-x="log">'+ic('plus')+'Add a spend</button><button class="btn sec" data-a="pay" data-x="upi">'+ic('scan')+'Pay</button></div>':'<div class="row2"><button class="btn" data-a="pay" data-x="upi">'+ic('scan')+'Pay</button><button class="btn sec" data-a="pay" data-x="log">'+ic('cash')+'Log cash</button></div>')+
 '<section class="card" aria-label="Recent spends"><div class="hd"><span class="lbl">Recent</span><span class="tkey sz">'+sizeDots(3)+' more dots, bigger spend</span><button class="link" data-a="txlist">All spends</button></div><div>'+recent.map(txRowTiles).join('')+'</div></section>'+
 subsCard()+
 '<div class="board" aria-label="Pinned">'+S.pins.map(function(w){return widget(w,'home');}).join('')+addTile()+'</div>';
 return h;}
function greet(){var h=new Date(NOW).getHours();return h<12?'Good morning':h<17?'Good afternoon':'Good evening';}
function sizeN(a){return a<=50?1:a<=100?2:a<=250?3:a<=500?4:5;}
function sizeDots(n,c){var h='<span class="szd">';for(var i=0;i<5;i++)h+='<i'+(i<n?' style="background:'+(c||'var(--text2)')+'"':'')+'></i>';return h+'</span>';}
function txRowTiles(t){var n=sizeN(t.amt),c=catColor(t.cat);
 return '<button class="tx" data-a="txd" data-x="'+t.id+'"><span class="ico" style="color:'+c+'">'+ic(catIc(t.cat),20)+'</span><span class="m"><b>'+esc(t.merchant)+'</b><small>'+(t.cat==='Unsorted'?'Needs a category':t.cat)+' · '+relWord(t.ts)+'</small></span>'+sizeDots(n,c)+'</button>';}
function subsCard(){var nx=nextSub();if(!nx)return '';var n=SUBS.length;
 return '<button class="card tap" data-a="subs" style="flex-direction:row;align-items:center;gap:12px">'+subRing(36,14,1.6)+'<span style="flex:1"><b>'+nx.s.name+'</b> renews '+nx.when+'</span>'+ic('bell',18)+'</button>';}
function nextSub(){var best=null;SUBS.forEach(function(s){var d=new Date(NOW),due=new Date(d.getFullYear(),d.getMonth(),s.day,9).getTime();if(due<NOW-DAY/2)due=new Date(d.getFullYear(),d.getMonth()+1,s.day,9).getTime();if(!best||due<best.due)best={s:s,due:due};});if(!best)return null;var days=Math.round((best.due-new Date(NOW).setHours(0,0,0,0))/DAY);best.when=days<=0?'today':days===1?'tomorrow':days<7?'on '+DOWS[new Date(best.due).getDay()]:'later this month';return best;}

function legend(cs){return '<div class="lgd">'+cs.map(function(c){return '<span><span class="cdot '+catK(c)+'" style="background:'+catColor(c)+'"></span>'+c+'</span>';}).join('')+'</div>';}
function savedIn(m){var s=0;TX.forEach(function(t){if(t.type==='transfer'&&new Date(t.ts).getMonth()===m&&(t.reason==='save'||t.reason==='sweep'))s+=t.amt;});return s;}
A.wpin=function(w){var i=S.pins.indexOf(w);if(i>=0)S.pins.splice(i,1);else S.pins.push(w);persist();S.sheet=null;toast(i>=0?WIDGETS[w]+' removed from Home':WIDGETS[w]+' pinned to Home');render();};
A.whide=function(w){if(S.hidden.indexOf(w)<0)S.hidden.push(w);persist();S.sheet=null;render();};
A.wshow=function(w){S.hidden.splice(S.hidden.indexOf(w),1);var i=S.order.indexOf(w);S.order.splice(i,1);var firstHidden=S.order.filter(function(x){return S.hidden.indexOf(x)<0;}).length;S.order.splice(firstHidden,0,w);persist();S.sheet=null;toast(WIDGETS[w]+' added to Insights');render();};
A.wmove=function(x){var p=x.split(':'),vis=S.order.filter(function(w){return S.hidden.indexOf(w)<0;}),i=vis.indexOf(p[0]),j=i+(+p[1]);if(i<0||j<0||j>=vis.length)return;var a=S.order.indexOf(vis[i]),b=S.order.indexOf(vis[j]);S.order[a]=vis[j];S.order[b]=vis[i];persist();render();};
A.wset=function(w){sheet('wset',{w:w});};
A.wlib=function(){sheet('wlib',{});};
SHEETS.wset=function(){var w=S.sheet.w,pinned=S.pins.indexOf(w)>=0,onBoard=S.hidden.indexOf(w)<0;
 return sheetWrap(shHead(WIDGETS[w]),'<div class="wprev">'+widget(w,'board')+'</div>'+
 '<button class="opt" data-a="wpin" data-x="'+w+'">'+ic('pin')+'<span class="t"><b>'+(pinned?'Unpin from Home':'Pin to Home')+'</b></span></button>'+
 (onBoard?'<div class="row2" style="grid-template-columns:1fr 1fr"><button class="btn sec" data-a="wmove" data-x="'+w+':-1">'+ic('up',18)+'Move earlier</button><button class="btn sec" data-a="wmove" data-x="'+w+':1">'+ic('down',18)+'Move later</button></div><button class="opt" data-a="whide" data-x="'+w+'">'+ic('eye')+'<span class="t"><b>Hide from Insights</b><small>It stays in Add widget</small></span></button>':'<button class="opt" data-a="wshow" data-x="'+w+'">'+ic('plus')+'<span class="t"><b>Add to Insights</b></span></button>')+
 '<div class="set" style="cursor:default"><span class="t">Look<small>Colour or black and white, for every card</small></span><div class="seg"><button data-a="look" data-x="color" aria-pressed="'+(S.look==='color')+'">Colour</button><button data-a="look" data-x="bw" aria-pressed="'+(S.look==='bw')+'">B&amp;W</button></div></div>','<button class="btn" data-a="close">Done</button>','data-sheet="wset"');};
SHEETS.wlib=function(){var h=S.hidden.filter(function(w){return true;});return sheetWrap(shHead('Add widget'),'<p class="muted">Tap one to add it to Insights. Pin it to Home from its settings.</p>'+(h.length?h.map(function(w){return '<button class="opt" data-a="wshow" data-x="'+w+'"><span class="wsz">'+WSIZE[w]+'</span><span class="t"><b>'+WIDGETS[w]+'</b></span>'+ic('plus',18)+'</button>';}).join(''):'<p class="muted">Every widget is already on your board.</p>'),'','data-sheet="wlib"');};
A.look=function(x){S.look=x;persist();render();};
/* ================= INSIGHTS ================= */
function insightsScr(){var vis=S.order.filter(function(w){return S.hidden.indexOf(w)<0;});
 return '<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><h2 style="flex:1">Insights</h2><button class="iconbtn" data-a="wlib" aria-label="Add widget">'+ic('addw',20)+'</button></div><p class="muted">Tap tiles for the amount. Settings on each card pin it to Home.</p>'+
  '<div class="board">'+vis.map(function(w){return widget(w,'board');}).join('')+addTile()+'</div>'+
  '<button class="btn sec" data-a="story">'+ic('cal')+'See '+thisPeriodName()+'’s story</button>';}

/* ================= MONEY ================= */
function moneyScr(){var p=POOLS(),g=topGoal();
 var inc=TX.filter(function(t){return t.type==='income';}),last=inc[inc.length-1];
 var h='<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><h2 style="flex:1">Money</h2></div>'+
 '<section class="card"><span class="lbl">In your account</span><div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><span style="font-family:var(--display);font-size:34px" data-testid="balance">'+fmt(p.balance)+'</span></div><p class="muted" style="font-size:13px">Budget, jars and any new money together. Money friends owe you joins once they pay.</p></section>';
 if(p.nm>0.5){var nu=unitFor([p.nm],12);h+='<section class="card" style="border-color:var(--accent)"><div class="hd"><span><b>New money</b> is waiting</span>'+tg(tiles(p.nm,nu,{c:'var(--bone)'}),6,12,3)+'</div>'+tkey(ukey(nu))+'<button class="btn sm" data-a="sortnew">Sort it: budget first, rest to '+esc(g.name)+'</button></section>';}
 h+=acc('income','Income',last?esc(last.merchant)+' landed '+(relDay(last.ts)==='Today'?'today':'this '+periodWord()):'Nothing yet',tg(rep(3,{c:'var(--bone)'}),3,10,3),incomeBody(last))+
  acc('budget','Budget',paceWordLong(),tg(CATS.map(function(c){return {c:catColor(c)};}),4,10,3),budgetBody(p))+
  acc('savings','Savings',esc(g.name)+' is '+goalWords(g),tg(rep(3,{c:'var(--save)'}),3,10,3),savingsBody(p));
 return h;}
function paceWordLong(){return pace().state==='ok'?'On pace for '+thisPeriodName():'A bit fast this '+periodWord();}
function acc(id,t,sub,glyph,body){var o=S.open===id;return '<section class="acc" data-id="'+id+'" data-open="'+(o?1:0)+'"><button data-a="open" data-x="'+id+'" aria-expanded="'+o+'">'+glyph+'<span class="t"><b>'+t+'</b><small>'+sub+'</small></span><span class="chev">'+ic('chev')+'</span></button><div class="body"><div><div class="inner">'+body+'</div></div></div></section>';}
function incomeBody(last){var h='';if(last&&!TX.some(function(t){return t.incomeId===last.id;}))h+='<p class="muted">'+esc(last.merchant)+' is not sorted yet. It waits as new money above.</p>';
 var sk=sankeyData();h+='<div class="skcard"><span class="lbl">Where '+MONL[curM()]+'’s money went</span>'+sankeySVG(sk,{h:260})+'<div class="wf">'+tkey(ukey(sk.u)+' · band width = ₹','g2')+'<span class="wtip" aria-live="polite"></span></div></div>';
 h+='<div>'+TX.filter(function(t){return t.type==='income'||t.type==='settle';}).slice(-3).reverse().map(function(t){return '<button class="tx" data-a="txd" data-x="'+t.id+'"><span class="ico" style="color:var(--save)">'+ic('plus',18)+'</span><span class="m"><b>'+esc(t.merchant)+'</b><small>'+relDay(t.ts)+'</small></span><span class="amt in">+'+fmt(t.amt)+'</span></button>';}).join('')+'</div><button class="btn sec" data-a="addincome">'+ic('plus')+'Add income</button>';return h;}
function budgetBody(p){var h='',u=budgetUnit(p);CATS.forEach(function(c){var cs=catSpecs(c,p,u),st=cs.left<0?'<span class="pill warm">'+ic('spark',14)+'Over, '+nextPeriodWord()+' starts lighter</span>':'';
  h+='<div><div class="hd"><span style="display:flex;align-items:center;gap:8px"><span class="cdot '+catK(c)+'" style="background:'+catColor(c)+'"></span><b>'+c+'</b></span>'+st+'</div>'+tg(cs.specs.concat(rep(cs.over,{cls:'ov'})),12,15,4,{attr:'data-a="reveal" data-v="'+(cs.left>=0?fmt(cs.left)+' left':fmt(-cs.left)+' over')+'"'})+'</div>';});
 if((p.b.Unsorted||0)<-.5)h+='<p class="muted" style="font-size:13px">One spend still needs a category. It’s in Actions.</p>';
 return h+'<div class="wf">'+tkey(ukey(u))+'<span class="faint" style="font-size:12px">Tap a row for what’s left</span></div><button class="btn sec" data-a="move">'+ic('move')+'Move between categories</button>';}
function savingsBody(p){var h='';GOALS.filter(function(g){return !g.general&&!g.reachedTs;}).forEach(function(g){h+='<button class="card tap" data-a="goal" data-x="'+g.id+'" style="flex-direction:row;align-items:center;gap:14px">'+waffle(g,7,{noReveal:1})+'<span style="flex:1"><b>'+esc(g.name)+'</b><br><span class="muted" style="font-size:13px">'+goalWords(g)+'</span><br>'+tkey('1 tile = 1%','sv')+'</span></button>';});
 var gen=goalById('general'),gv=p.g.general||0,gu=unitFor([gv],30);h+='<div><div class="hd"><b>Rainy-day jar</b>'+tkey(ukey(gu),'sv')+'</div>'+tg(tiles(gv,gu,{c:'var(--save)'}),10,12,3,{attr:'data-a="reveal" data-v="'+fmt(gv)+'"'})+'</div>';
 h+='<div class="board">'+widget('rate','board')+widget('saved','board').replace('wc W','wc W')+'</div>';
 h+='<div class="board">'+widget('owed','board')+'</div>';
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
 split:function(){var o=IOUS.filter(function(i){return !i.settledTs;}),sp=txById(o[0].spendId);return '<section class="card" data-item="split"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('users')+'<b>'+esc(sp?sp.merchant:'Split')+' split</b></span>'+tg(rep(o.length,{cls:'ol'}),o.length,12,3,{attr:'data-a="reveal" data-v="'+fmt(owedOpen())+' owed"'})+'</div>'+tkey('1 tile = 1 friend','ol')+'<p class="muted">'+o.map(function(i){return i.person;}).join(', ').replace(/, ([^,]*)$/,' and $1')+' still owe you their share.</p><button class="btn sm" data-a="settle" style="width:100%">Someone paid back</button><div class="more"><button class="link" data-a="remind">Remind share</button></div></section>';},
 cat:function(){var t=TX.filter(function(t){return t.type==='spend'&&t.cat==='Unsorted';})[0];var sug=t.auto||'Food';return '<section class="card" data-item="cat"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('sort')+'<b>'+esc(t.merchant)+'</b></span><span class="faint" style="font-size:12.5px">'+relDay(t.ts)+'</span></div><p class="muted">Looks like '+sug+'. We’ll remember this payee.</p><button class="btn sm" data-a="catset" data-x="'+t.id+':'+sug+'" style="width:100%">Yes, '+sug+'</button><div class="more">'+CATS.filter(function(c){return c!==sug;}).map(function(c){return '<button class="chip" data-a="catset" data-x="'+t.id+':'+c+'"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'</button>';}).join('')+'</div></section>';},
 sub:function(){var ns=nextSub();return '<section class="card" data-item="sub"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('music')+'<b>'+ns.s.name+' renews '+ns.when+'</b></span></div><p class="muted">It comes out of '+ns.s.cat+'. Fun still has room for it.</p><button class="btn sm" data-a="subkeep" data-x="'+ns.s.id+'" style="width:100%">Keep it</button><div class="more"><button class="link" data-a="subdrop" data-x="'+ns.s.id+'">I’ll cancel it</button></div></section>';},
 checkin:function(){return '<section class="card" data-item="checkin"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('cal')+'<b>Your Monday check-in</b></span>'+'</div><p class="muted">Four cards about last week, repeat buys included. Under a minute.</p><button class="btn sm" data-a="checkin" style="width:100%">Open check-in</button></section>';},
 left:function(){var a=S.pendingLeft;return '<section class="card" data-item="left"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('jar')+'<b>Leftover from '+a.name+'</b></span>'+tg(tiles(a.amt,unitFor([a.amt],20),{c:'var(--save)'}),8,10,3)+'</div>'+tkey(ukey(unitFor([a.amt],20)),'sv')+'<p class="muted">It’s sitting as new money.</p><button class="btn sm" data-a="leftsave" style="width:100%">Save it to '+esc(topGoal().name)+'</button><div class="more"><button class="link" data-a="leftkeep">Keep for spending</button></div></section>';}};
A.catset=function(x){var p=x.split(':'),t=txById(p[0]);t.cat=p[1];S.rules[t.merchant]=p[1];toast(esc(t.merchant)+' is now '+p[1]+'. Next time it’s automatic.');render();};
A.subkeep=function(id){S.done['sub'+id+new Date(NOW).getMonth()]=1;toast('Kept. It comes out of '+SUBS.filter(function(s){return s.id===id;})[0].cat+' as usual.');render();};
A.subdrop=function(id){var s=SUBS.filter(function(x){return x.id===id;})[0];SUBS=SUBS.filter(function(x){return x.id!==id;});S.done['sub'+id+new Date(NOW).getMonth()]=1;toast(s.name+' removed from your subscriptions. Cancel it in the app too.');render();};
A.leftsave=function(){var a=S.pendingLeft,g=topGoal();xfer(NOW,[{ref:'new_money',amt:a.amt}],saveDst(a.amt),'sweep',{period:a.name});S.pendingLeft=null;toast(fmt(a.amt)+' went to '+esc(g.name));render();};
A.leftkeep=function(){S.pendingLeft=null;toast('Kept as new money. Sort it any time in Money.');render();};
A.subs=function(){sheet('subs');};
