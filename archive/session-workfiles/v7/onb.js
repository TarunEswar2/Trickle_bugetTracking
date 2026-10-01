/* ===== onboarding: 8 visual steps ===== */
function stepArc(n){var of=7,S=40,r=16,c=20;return '<div class="stepbar"><svg width="'+S+'" height="'+S+'" viewBox="0 0 40 40"><path d="'+arc(c,c,r,-135,135)+'" stroke="var(--surface3)" stroke-width="4" fill="none" stroke-linecap="round"/><path d="'+arc(c,c,r,-135,-135+270*n/of)+'" stroke="var(--accent)" stroke-width="4" fill="none" stroke-linecap="round"/><text x="20" y="24.5" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">'+n+'</text></svg><span class="kick">Step '+n+' of '+of+'</span></div>';}
function bankOf(h){var sfx=(h.split('@')[1]||'').toLowerCase();var map={oksbi:['S','SBI'],sbi:['S','SBI'],ybl:['Y','Yes Bank'],okhdfcbank:['H','HDFC'],okicici:['I','ICICI'],okaxis:['A','Axis'],axl:['A','Axis'],paytm:['P','Paytm'],ibl:['I','ICICI']};return map[sfx]||[(sfx[0]||'?').toUpperCase(),sfx||'bank'];}
/* node diagram: phone -> each UPI ID -> Trickle */
function linkDiagram(accs,o){o=o||{};var W=o.w||348,n=Math.max(1,accs.length),rowH=40,H=Math.max(84,n*rowH+24),cy=H/2,px=26,tx=W-26,mx=W/2,s=svgOpen(W,H);
 accs.forEach(function(a,i){var y=cy+(i-(n-1)/2)*rowH,g=gid();
  s+='<path d="M'+(px+20)+' '+cy+'C'+(px+60)+' '+cy+','+(mx-110)+' '+y+','+(mx-72)+' '+y+'" stroke="var(--text3)" fill="none" stroke-width="1.5" class="grow"/>';
  s+='<path d="M'+(mx+72)+' '+y+'C'+(mx+110)+' '+y+','+(tx-60)+' '+cy+','+(tx-20)+' '+cy+'" stroke="var(--accent)" fill="none" stroke-width="1.5" class="grow"/>';
  var b=bankOf(a.handle);
  s+='<g data-g="'+g+'"'+(o.tap?' onclick="'+o.tap+'('+i+')" style="cursor:pointer"':'')+'><rect x="'+(mx-72)+'" y="'+(y-15)+'" width="144" height="30" rx="15" fill="var(--surface2)" stroke="var(--border2)"/>';
  s+='<circle cx="'+(mx-57)+'" cy="'+y+'" r="10" fill="var(--surface3)"/><text x="'+(mx-57)+'" y="'+(y+4)+'" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">'+b[0]+'</text>';
  s+='<text x="'+(mx-42)+'" y="'+(y+4)+'" font-size="11" fill="var(--text)">'+esc(trunc(a.handle,16))+'</text><circle cx="'+(mx+62)+'" cy="'+y+'" r="3.5" fill="var(--accent)"/></g>';
  s+='<rect x="'+(mx-72)+'" y="'+(y-17)+'" width="144" height="34" fill="transparent" data-g="'+g+'"'+T(a.handle+' \u00b7 '+b[1]+' \u00b7 linked'+(o.extra?' \u00b7 '+o.extra(a):'')+(o.tap?' \u00b7 tap again to remove':''))+(o.tap?' onclick="'+o.tap+'('+i+')"':'')+'/>';});
 if(!accs.length)s+='<rect x="'+(mx-72)+'" y="'+(cy-15)+'" width="144" height="30" rx="15" fill="none" stroke="var(--border2)" stroke-dasharray="4 3"/><text x="'+mx+'" y="'+(cy+4)+'" text-anchor="middle" font-size="11" fill="var(--text3)">add a UPI ID</text>';
 s+='<circle cx="'+px+'" cy="'+cy+'" r="20" fill="var(--surface2)" stroke="var(--border2)"/>'+iconG('phone',px,cy,18,'var(--text)');
 s+='<circle cx="'+tx+'" cy="'+cy+'" r="20" fill="var(--accent)"/>'+iconG('drop',tx,cy,18,'var(--on-accent)');
 s+='<text x="'+px+'" y="'+(H-2)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">Your UPI apps</text><text x="'+tx+'" y="'+(H-2)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">Trickle</text>';
 return '<div class="chart">'+s+'</svg></div>';}
/* two-lane flow diagram */
function laneSvg(nodes,W){W=W||300;var H=66,s=svgOpen(W,H),n=nodes.length,step=(W-40)/(n-1);
 nodes.forEach(function(nd,i){var x=20+i*step;if(i<n-1)s+='<path d="M'+(x+18)+' 22H'+(x+step-22)+'" stroke="var(--text3)" stroke-width="1.5"/><path d="M'+(x+step-26)+' 18l4 4-4 4" stroke="var(--text3)" fill="none" stroke-width="1.5"/>';
  s+='<circle cx="'+x+'" cy="22" r="16" fill="'+(i===n-1?'var(--accent)':'var(--surface3)')+'"/>'+iconG(nd.i,x,22,15,i===n-1?'var(--on-accent)':'var(--text)');
  s+='<text x="'+x+'" y="52" text-anchor="'+(i===0?'start':i===n-1?'end':'middle')+'" font-size="9.5" fill="var(--text2)" '+(i===0?'dx="-18"':i===n-1?'dx="18"':'')+'>'+esc(nd.l)+'</text>';
  if(nd.l2)s+='<text x="'+x+'" y="63" text-anchor="'+(i===0?'start':i===n-1?'end':'middle')+'" font-size="9.5" fill="var(--text3)" '+(i===0?'dx="-18"':i===n-1?'dx="18"':'')+'>'+esc(nd.l2)+'</text>';});
 return '<div class="chart">'+s+'</svg></div>';}
function homeThumb(kind){var s='<svg width="64" height="86" viewBox="0 0 64 86"><rect x="1" y="1" width="62" height="84" rx="9" fill="var(--ink)" stroke="var(--border2)"/><rect x="8" y="8" width="48" height="14" rx="3" fill="var(--surface3)"/>';
 if(kind==='upi'){[8,25,42].forEach(function(x){s+='<rect x="'+x+'" y="27" width="14" height="14" rx="3" fill="var(--surface2)" stroke="var(--text3)" stroke-width=".8"/>';});}
 else s+='<rect x="8" y="27" width="48" height="14" rx="4" fill="var(--accent)"/><text x="32" y="37" text-anchor="middle" font-size="6.5" font-weight="700" fill="var(--on-accent)">+ Enter</text>';
 [48,57,66,75].forEach(function(y,i){s+='<circle cx="11" cy="'+(y+2)+'" r="2" fill="'+SLOT[SLOTS[i]]+'"/><rect x="16" y="'+y+'" width="'+(26+i%2*8)+'" height="4" rx="2" fill="var(--surface3)"/><text x="56" y="'+(y+4)+'" text-anchor="end" font-size="5" fill="var(--text3)">'+(kind==='upi'?'UPI':'')+'</text>';});
 return s+'</svg>';}
var LANES={upi:[{i:'phone',l:'Your UPI apps'},{i:'qr',l:'Linked UPI ID(s)'},{i:'drop',l:'Logged',l2:'automatically'}],
 manual:[{i:'user',l:'You pay',l2:'any mode'},{i:'edit',l:'Actions ›',l2:'Log spend'},{i:'drop',l:'Logged'}]};
function lanes(sel,fn,compact){var h='';['upi','manual'].forEach(function(k){h+='<button class="lane '+(sel===k?'sel':sel?'dimmed':'')+'" onclick="'+fn+'(\''+k+'\')" style="margin-bottom:10px">'
 +'<div class="between" style="margin-bottom:6px"><span class="h2">'+(k==='upi'?'Link UPI':'Manual entry')+'</span><span class="badge">'+(sel===k?'\u2713 Selected':k==='upi'?'Auto-log':'You log')+'</span></div>'
 +'<div style="display:flex;gap:10px;align-items:center"><div style="flex:1;min-width:0">'+laneSvg(LANES[k],compact?240:250)+'</div>'+(compact?'':'<div style="text-align:center;flex:none">'+homeThumb(k)+'<div class="foot" style="margin-top:2px">Home</div></div>')+'</div></button>';});return h;}

function pickTrack(k){S.tracking=k;rerender();}
FR.method=function(el){
 el.innerHTML='<div class="onb">'+stepArc(1)+'<div class="h1">How should Trickle track?</div><p class="body2" style="margin:6px 0 14px">Pick a lane. You can switch later in Settings.</p>'
 +lanes(S.tracking,'pickTrack')
 +'<div class="card" style="display:flex;gap:10px;align-items:center;padding:12px">'+icon('lock',18,'var(--text2)')+'<span class="body2" style="font-size:13px">Trickle never reads your messages.</span></div>'
 +'<button class="btn" '+(S.tracking?'':'disabled')+' onclick="go(S.tracking===\'upi\'?\'upiSetup\':\'period\')">Continue</button></div>';};

function addUpi(inputId,errId){var v=$(inputId).value.trim();if(!/^[\w.\-]{2,}@[a-z]{2,}$/i.test(v)){$(errId).classList.add('show');return false;}
 if(ACCOUNTS.some(function(a){return a.handle===v;})){toast('Already linked');return false;}ACCOUNTS.push({handle:v,bank:bankOf(v)[1]});toast('Linked '+v);return true;}
function rmUpi(i){ if(!rmUpi.arm||rmUpi.arm!==i+'_'+ACCOUNTS[i].handle){rmUpi.arm=i+'_'+ACCOUNTS[i].handle;return;}rmUpi.arm=null;var h=ACCOUNTS[i].handle;ACCOUNTS.splice(i,1);hideTip();toast('Removed '+h);if(curSheet)refreshSheet();else rerender();}
FR.upiSetup=function(el){
 el.innerHTML='<div class="onb"><div class="between"><button class="back" onclick="go(\'method\')">\u276e</button><span></span></div>'+stepArc(1)+'<div class="h1">Link your UPI IDs</div><p class="body2" style="margin:6px 0 12px">Each linked ID becomes a lane into Trickle. Payments from it are logged automatically.</p>'
 +'<div class="card">'+linkDiagram(ACCOUNTS,{tap:'rmUpi'})+foot(ACCOUNTS.length+' linked \u00b7 tap an ID twice to remove it')+'</div>'
 +'<div class="frow"><input class="field" id="upi-in" placeholder="name@bank, e.g. nishad@ybl" onkeydown="if(event.key===\'Enter\')upiAdd()"><button class="btn sm" style="height:48px" onclick="upiAdd()">Add</button></div><p class="err" id="upi-err">Enter a UPI ID like name@oksbi</p>'
 +'<div class="chips" style="margin-top:10px">'+ACC_SEED.filter(function(x){return !ACCOUNTS.some(function(a){return a.handle===x.handle;});}).map(function(x){return '<button class="pill" onclick="$(\'upi-in\').value=\''+x.handle+'\';upiAdd()">+ '+x.handle+'</button>';}).join('')+'</div><div class="foot">Suggested: UPI IDs found in apps on this phone</div>'
 +'<button class="btn" style="margin-top:18px" '+(ACCOUNTS.length?'':'disabled')+' onclick="go(\'period\')">Continue</button></div>';};
function upiAdd(){if(addUpi('upi-in','upi-err'))rerender();}

/* category picker with live ghost rings */
var WEIGHT={Food:28,'Snacks':12,Groceries:16,Transport:12,Necessities:14,Stationery:6,Buffer:12};
function catDef(n){for(var i=0;i<DEFAULT_CATS.length;i++)if(DEFAULT_CATS[i].name===n)return DEFAULT_CATS[i];return null;}
function slotPlan(){var used={},out={};S.chosen.forEach(function(n){var d=catDef(n);if(d){out[n]=d.slot;used[d.slot]=1;}});
 S.chosen.forEach(function(n){if(out[n])return;var f=SLOTS.filter(function(s){return !used[s];})[0];out[n]=f||'other';if(f)used[f]=1;});return out;}
var XICON={Travel:'bus',Entertainment:'music',Rent:'home',Health:'plus',Laundry:'drop',Gifts:'box','Mobile recharge':'phone',Books:'book',Fitness:'gym',Printouts:'pen',Chai:'cup'};
function iconFor(n){var d=catDef(n);return d?d.icon:(XICON[n]||'tag');}
function chosenItems(valFn){var sp=slotPlan();return S.chosen.map(function(n){return {name:n,val:valFn(n),color:SLOT[sp[n]],icon:iconFor(n)};});}
function toggleCat(n){var i=S.chosen.indexOf(n);if(i>=0){if(S.chosen.length<=1){toast('Keep at least one');return;}S.chosen.splice(i,1);}else S.chosen.push(n);rerender();}
function addTypedCat(){var v=$('cat-in').value.trim();if(!v){$('cat-err').classList.add('show');return;}v=v.charAt(0).toUpperCase()+v.slice(1);if(S.chosen.indexOf(v)<0)S.chosen.push(v);rerender();}
FR.onbCategories=function(el){
 var tot=S.chosen.reduce(function(a,n){return a+(WEIGHT[n]||6);},0),q=(S.recQ||'').toLowerCase(),sp=slotPlan();
 var items=chosenItems(function(n){return WEIGHT[n]||6;}).map(function(it){it.tip=it.name+' \u00b7 starter share '+Math.round(it.val/tot*100)+'%';return it;});
 el.innerHTML='<div class="onb"><button class="back" onclick="go(\'income\')">\u276e</button>'+stepArc(4)+'<div class="h1">Choose your categories</div><p class="body2" style="margin:6px 0 4px">Each one becomes a ring. Shares are a typical student starter budget; you set the rupees next.</p>'
 +'<div style="width:280px;margin:0 auto">'+radialArcs(items,{w:280,r:130,sw:9,gap:4,ghost:true,center:S.chosen.length+'',cfs:24,center2:'categories',fmt:function(it){return Math.round(it.val/tot*100)+'% starter';}})+'</div>'
 +'<div class="kick" style="margin:6px 0 8px">Your categories \u00b7 tap to remove</div><div class="chips">'+S.chosen.map(function(n){return '<button class="pill" onclick="toggleCat(\''+esc(n).replace(/'/g,"\\'")+'\')"><span class="sw" style="background:'+SLOT[sp[n]]+'"></span>'+esc(n)+' \u00d7</button>';}).join('')+'</div>'
 +'<div class="kick" style="margin:16px 0 8px">Recommended</div><input class="field sm" id="rec-q" placeholder="Search categories" value="'+esc(S.recQ||'')+'" oninput="S.recQ=this.value;rerender();var i=$(\'rec-q\');i.focus();i.setSelectionRange(i.value.length,i.value.length)" style="margin-bottom:8px">'
 +'<div class="chips">'+RECOMMENDED.concat(DEFAULT_CATS.map(function(c){return c.name;})).filter(function(n){return S.chosen.indexOf(n)<0&&n.toLowerCase().indexOf(q)>=0;}).map(function(n){return '<button class="pill" onclick="toggleCat(\''+n+'\')">+ '+esc(n)+'</button>';}).join('')+'</div>'
 +'<div class="frow" style="margin-top:12px"><input class="field" id="cat-in" placeholder="Or type your own" onkeydown="if(event.key===\'Enter\')addTypedCat()"><button class="btn sm" style="height:48px" onclick="addTypedCat()">Add</button></div><p class="err" id="cat-err">Type a category name</p>'
 +'<button class="btn" style="margin-top:16px" onclick="initAlloc();go(\'onbAllocate\')">Continue</button></div>';};

/* visual PIN */
function pinRows(a,b,state){var r=function(v,cls){var h='<div class="pinrow '+cls+'">';for(var i=0;i<4;i++)h+='<i class="'+(i<v.length?'f':'')+'"></i>';return h+'</div>';};
 return '<div class="card" style="padding:22px 16px"><div class="kick" style="text-align:center;margin-bottom:10px">'+(a.length<4?'Choose a 4-digit PIN':'Enter it again')+'</div>'+r(a,state==='match'?'match':'')+'<div style="height:16px"></div>'+r(b,(state==='match'?'match ':'')+(state==='shake'?'shake':''))+'</div>';}
function keypad(fn){var k=['1','2','3','4','5','6','7','8','9','\u232b','0',''];return '<div class="keypad">'+k.map(function(x){return x===''?'<span></span>':'<button onclick="'+fn+'(\''+x+'\')">'+x+'</button>';}).join('')+'</div>';}
function pinKey(k,ctx){ctx=ctx||'pin';var done=ctx==='pin'?function(){S.pin=S.pinA;go('permissions');}:function(){S.pin=S.pinA;toast('PIN changed');tabGo('home');};
 if(S.pinState==='match')return;
 if(k==='\u232b'){if(S.pinB.length)S.pinB=S.pinB.slice(0,-1);else S.pinA=S.pinA.slice(0,-1);}
 else if(S.pinA.length<4)S.pinA+=k;else if(S.pinB.length<4)S.pinB+=k;
 S.pinState='';if(S.pinB.length===4){if(S.pinB===S.pinA){S.pinState='match';setTimeout(function(){S.pinState='';S.pinA='';S.pinB='';done();},700);}else{S.pinState='shake';setTimeout(function(){S.pinB='';S.pinState='';$('pinbox').innerHTML=pinRows(S.pinA,S.pinB,'');},450);}}
 $('pinbox').innerHTML=pinRows(S.pinA,S.pinB,S.pinState);}
FR.pin=function(el){S.pinA='';S.pinB='';S.pinState='';el.innerHTML='<div class="onb"><button class="back" onclick="go(\'sweepSplit\')">\u276e</button>'+stepArc(7)+'<div class="h1">Set your security PIN</div><p class="body2" style="margin:6px 0 14px">Top row fills as you type; the bottom row must match it.</p><div id="pinbox">'+pinRows('','','')+'</div>'+keypad('pinKey')+'</div>';};

/* permission -> feature diagram */
var PERMS=[{k:'notif',n:'Notifications',d:'Budget nudges',i:'bell',f:'Nudge banner'},{k:'contacts',n:'Contacts',d:'Pay people by name',i:'user',f:'Pay Anyone'},{k:'camera',n:'Camera',d:'Scan UPI QR codes',i:'cam',f:'Scan QR'}];
function togglePerm(k){S.perms[k]=!S.perms[k];rerender();}
function permDiagram(){var rowH=66,H=rowH*3,h='<div style="position:relative;display:grid;grid-template-columns:1fr 34px 116px;height:'+H+'px">';
 h+='<div>'+PERMS.map(function(p){return '<div style="height:'+rowH+'px;display:flex;align-items:center;gap:10px"><button class="toggle '+(S.perms[p.k]?'on':'')+'" role="switch" aria-checked="'+S.perms[p.k]+'" aria-label="'+p.n+'" onclick="togglePerm(\''+p.k+'\')"><i></i></button><div style="min-width:0"><div style="font-size:14px">'+p.n+'</div><div class="foot" style="margin:0">'+p.d+'</div></div></div>';}).join('')+'</div>';
 h+='<svg width="34" height="'+H+'" viewBox="0 0 34 '+H+'">'+PERMS.map(function(p,i){var y=i*rowH+rowH/2;return '<path d="M0 '+y+'H34" stroke="'+(S.perms[p.k]?'var(--accent)':'var(--surface3)')+'" stroke-width="2" '+(S.perms[p.k]?'':'stroke-dasharray="3 3"')+'/><circle cx="31" cy="'+y+'" r="3" fill="'+(S.perms[p.k]?'var(--accent)':'var(--surface3)')+'"/>';}).join('')+'</svg>';
 h+='<div style="border:1px solid var(--border2);border-radius:14px;background:var(--ink);padding:6px">'+PERMS.map(function(p){return '<button onclick="togglePerm(\''+p.k+'\')" style="height:'+(rowH-4)+'px;margin:0 0 2px;width:100%;border-radius:10px;border:1px solid var(--border);background:var(--surface2);color:var(--text);font:inherit;font-size:11px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;opacity:'+(S.perms[p.k]?1:.3)+'">'+icon(p.i,18)+p.f+'</button>';}).join('')+'</div></div>';
 return h+'<div class="foot" style="text-align:right">Miniature Home \u00b7 greys out what a permission turns off</div>';}
FR.permissions=function(el){el.innerHTML='<div class="onb"><button class="back" onclick="go(\'pin\')">\u276e</button><div class="kick" style="margin:10px 0">Step 8 · last one</div><div class="h1">What each permission unlocks</div><p class="body2" style="margin:6px 0 14px">Only three. Trickle never asks for message access.</p><div class="card">'+permDiagram()+'</div><button class="btn" onclick="go(\'allSet\')">Continue</button></div>';};

