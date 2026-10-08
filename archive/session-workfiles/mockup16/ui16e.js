/* ===== v16.5: subscriptions with an end (cancel-by, free trial, fixed term, cancelled) and a home-screen widget preview ===== */

/* ---------- subscriptions: when does it end? ---------- */
const ENDKINDS=[['none','Keeps going'],['cancel','I plan to cancel'],['trial','Free trial'],['term','Fixed term']];
function endDefault(kind,sf){const t=day0();if(kind==='trial')return t+7*DAY;if(kind==='term')return t+180*DAY;if(kind==='cancel')return Math.max(t,(sf.due||t+7*DAY)-DAY);return t}
function calEnd(sf){const t0=day0(),cm=sf.cm2||0,m0=new Date(new Date(t0).getFullYear(),new Date(t0).getMonth()+cm,1),first=(m0.getDay()+6)%7,dim=new Date(m0.getFullYear(),m0.getMonth()+1,0).getDate();let cells='';for(let i=0;i<first;i++)cells+='<i></i>';
 for(let n=1;n<=dim;n++){const ts=new Date(m0.getFullYear(),m0.getMonth(),n).getTime(),dis=ts<t0||ts>t0+900*DAY,sel=ts===sf.endDate,today=ts===t0;
  const st=`height:36px;border:0;border-radius:12px;font:inherit;font-size:14px;font-weight:${sel||today?700:500};color:${dis?'#3b4350':sel?'#04251D':'var(--ink)'};background:${sel?'linear-gradient(135deg,#A9F4DF,#4FC9A8)':'transparent'};${today&&!sel?'box-shadow:inset 0 0 0 1.5px #5FE3B8;':''}`;
  cells+=dis?`<span style="${st};display:flex;align-items:center;justify-content:center">${n}</span>`:`<button style="${st}" data-a="sfday2|${ts}">${n}</button>`}
 return `<div class="card" style="padding:10px 8px"><div class="row sp" style="margin:0 4px 6px"><button class="chip" style="${cm<=0?'opacity:.3;pointer-events:none':''}" data-a="sfmon2|-1">‹</button><b>${m0.toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</b><button class="chip" data-a="sfmon2|1">›</button></div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;font-size:12px;color:var(--ink3);margin-bottom:4px">${DOW.map(d=>`<span>${d[0]}</span>`).join('')}</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">${cells}</div></div>`}
function endForm(sf){const k=sf.endKind||'none',lab={cancel:'Cancel by',trial:'Trial ends on',term:'Valid until'}[k],note={cancel:'Trickle reminds you a few days before. Cancel it yourself in the app or in UPI autopay.',trial:`Nothing is set aside until it ends. Then ${money(amtOf(sf.amt))} each time.`,term:'Payments stop after this date.'}[k];
 return `<div class="row wrap" style="gap:8px;margin:16px 0 8px">${ENDKINDS.map(e=>`<button class="chip ${k===e[0]?'on':''}" data-a="sfkind|${e[0]}">${e[1]}</button>`).join('')}</div>${k!=='none'?`<div class="cap" style="margin:14px 0 8px">${lab}: <b style="color:var(--ink);text-transform:none;letter-spacing:0">${fmtDate(sf.endDate)}</b></div>${calEnd(sf)}<div class="sm" style="margin-top:10px">${note}</div>`:`<div class="sm" style="margin-top:10px">Most subscriptions keep going until you cancel.</div>`}`}
H.sfday2=a=>{SFT().endDate=+a[0]};H.sfmon2=a=>{const sf=SFT();sf.cm2=Math.max(0,(sf.cm2||0)+(+a[0]))};
H.sfkind=a=>{const sf=SFT();sf.endKind=a[0];if(a[0]!=='none'){sf.endDate=endDefault(a[0],sf);sf.cm2=Math.max(0,monOff(sf.endDate))}};
H.sfnext2=()=>{const F=UI.flow;F.d.sf.endKind=F.d.sf.endKind||'none';F.step=3};
const _sub16=FLOWS.subadd;
FLOWS.subadd=F=>{const sf=F.d.sf;
 if(F.step===3)return `<div class="mbody" style="padding-top:60px"><button class="back" data-a="sfback">‹ Back</button><div class="cap">${esc(sf.name)}</div><div class="title" style="margin-top:4px">Does it end?</div>${endForm(sf)}<div style="height:110px"></div></div><div class="mfoot"><button class="btn" data-a="sfsave">Add ${esc(sf.name)}</button></div>`;
 let h=_sub16(F);if(F.step===2&&!sf.editId)h=h.replace(/data-a="sfsave">Add [^<]*/,'data-a="sfnext2">Next');return h};
function applyEnd(b,kind,end){delete b.endPlan;delete b.trialUntil;delete b.validUntil;
 if(kind==='cancel')b.endPlan=end;if(kind==='term')b.validUntil=end;if(kind==='trial'){b.trialUntil=end;b.nextDue=new Date(end);b.dueDay=new Date(end).getDate();b.reserve=0}}
{const _sfs=H.sfsave;H.sfsave=()=>{if(UI.flow&&UI.flow.id==='onb')return _sfs();const sf=SFT(),before=S.bills.length,kind=sf.endKind||'none',end=sf.endDate;const r=_sfs();
  const b=sf.editId?S.bills.find(x=>x.id===sf.editId):(S.bills.length>before?S.bills[S.bills.length-1]:null);if(b&&kind!=='none'&&!sf.editId){applyEnd(b,kind,end);applyBills();if(kind==='trial')say(`${b.name} added. Nothing is set aside until the trial ends.`)}return r}}
FLOWS.subend=F=>{const sf=F.d.sf;return `<div class="mbody" style="padding-top:60px"><button class="back" data-a="pclose">‹ Close</button><div class="cap">${esc(sf.name)}</div><div class="title" style="margin-top:4px">Does it end?</div>${endForm(sf)}<div style="height:110px"></div></div><div class="mfoot"><button class="btn" data-a="subendsave">Save</button></div>`};
H.subplan=a=>{const b=S.bills.find(x=>x.id===a[0]);UI.sheet=null;const sf={name:b.name,amt:String(b.amt),due:new Date(b.nextDue).setHours(0,0,0,0),bid:b.id,endKind:b.trialUntil?'trial':b.validUntil?'term':'cancel'};sf.endDate=b.endPlan||b.trialUntil||b.validUntil||endDefault(sf.endKind,sf);sf.cm2=Math.max(0,monOff(sf.endDate));UI.flow={id:'subend',step:0,d:{sf}};return true};
H.subendsave=()=>{const sf=UI.flow.d.sf,b=S.bills.find(x=>x.id===sf.bid);if(b){applyEnd(b,sf.endKind,sf.endDate);applyBills()}closeFlow();say(sf.endKind==='none'?'No end date.':sf.endKind==='cancel'?'Reminder set before '+fmtDate(sf.endDate)+'.':'Saved.');return false};
H.subended=a=>{const b=S.bills.find(x=>x.id===a[0]);if(!b)return false;const mo=b.amt*(b.every==='week'?weeksPer:b.every==='month'?1:b.every==='3 months'?1/3:1/12);b.ended=S.now.getTime();delete b.endPlan;applyBills();UI.sheet=null;say(`${b.name} cancelled. About ${money(mo)} a month back.`);return false};
SHEETS.bill=({id})=>{const b=S.bills.find(x=>x.id===id);if(!b)return '';const now=S.now.getTime(),d=Math.ceil((b.nextDue-S.now)/DAY),trial=b.trialUntil&&now<b.trialUntil;
 const rows=[['Amount',money(b.amt)],['How often',EVLBL[b.every]||b.every],[trial?'First payment':'Next payment',b.ended?'none':fmtDay(b.nextDue)+(d>=0?' · in '+d+' days':'')]];
 if(trial)rows.push(['Free trial ends',fmtDate(b.trialUntil)]);if(b.validUntil)rows.push(['Valid until',fmtDate(b.validUntil)]);if(b.endPlan&&!b.ended)rows.push(['Cancel by',fmtDate(b.endPlan)]);
 rows.push(['Set aside each week',b.ended?'nothing':b.paused?'nothing (paused)':billWeekly(b)===0?'nothing yet':'about '+money(Math.round(billWeekly(b)))]);
 return `<div class="cap">Subscription${b.ended?' · cancelled':b.paused?' · paused':''}</div><div class="title" style="font-size:28px;margin-top:2px">${esc(b.name)}</div>
 ${b.endPlan&&!b.ended?`<div class="banner" style="margin-top:12px"><b style="color:var(--amber)">You plan to cancel by ${fmtDate(b.endPlan)}.</b><div class="sm" style="margin-top:4px">Trickle only reminds you. Cancel it in the app or in UPI autopay yourself.</div></div>`:''}
 <div class="card" style="margin:14px 0;display:grid;gap:10px">${rows.map(r=>`<div class="row sp"><span class="mut">${r[0]}</span><b style="text-align:right">${r[1]}</b></div>`).join('')}</div>
 <div class="col" style="gap:8px">${b.ended?'':`<button class="btn q" data-a="subplan|${b.id}">${b.endPlan||b.trialUntil||b.validUntil?'Change when it ends':'Plan to cancel or set an end date'}</button><button class="btn q" data-a="subended|${b.id}">I have cancelled it</button><button class="btn q" data-a="editsub|${b.id}">Edit</button><button class="btn q" data-a="subpause|${b.id}">${b.paused?'Resume':'Pause'}</button>`}<button class="btn q" data-a="subremove|${b.id}">Remove</button></div>`};
const perMonth=b=>b.amt*(b.every==='week'?weeksPer:b.every==='month'?1:b.every==='3 months'?1/3:1/12);
SHEETS.billsum=()=>{const now=S.now.getTime(),act=S.bills.filter(b=>!b.ended).sort((a,b)=>a.nextDue-b.nextDue),end=S.bills.filter(b=>b.ended),mo=act.filter(b=>!b.paused&&!(b.trialUntil&&now<b.trialUntil)).reduce((a,b)=>a+perMonth(b),0);
 const st=b=>b.endPlan?`<span style="color:var(--amber)">Cancel by ${shortD(b.endPlan)}</span>`:b.trialUntil&&now<b.trialUntil?`Trial ends ${shortD(b.trialUntil)}`:b.validUntil?`Until ${shortD(b.validUntil)}`:b.paused?'Paused':`Next ${shortD(b.nextDue)} · ${EVLBL[b.every]||b.every}`;
 const row=(b,x)=>`<button class="li" data-a="sheet|bill|${J({id:b.id})}"><span class="d" style="background:${b.ended?'#59626F':FIXC}"></span><span class="n" style="line-height:1.25">${esc(b.name)}<span class="mut" style="display:block;font-weight:500;font-size:12.5px">${x}</span></span><span class="a">${money(b.amt)}</span></button>`;
 return `<div class="h2">Subscriptions</div><div class="sub" style="margin:4px 0 12px">${money(mo)} a month · ${money(mo*12)} a year</div><div class="col" style="gap:8px">${act.map(b=>row(b,st(b))).join('')||'<div class="card sub">None yet.</div>'}</div>
 ${end.length?`<div class="cap" style="margin:16px 0 8px">Cancelled</div><div class="col" style="gap:8px;opacity:.7">${end.map(b=>row(b,'Saved about '+money(perMonth(b))+' a month')).join('')}</div>`:''}<div style="margin-top:12px"><button class="btn o" data-a="addsub">+ Add a subscription</button></div>`};
/* Home reminds about a cancel-by date, a trial ending or a term ending, within 3 days */
function subAlert(){const now=S.now.getTime();let best=null;S.bills.forEach(b=>{if(b.ended)return;const t=[];if(b.endPlan)t.push([b.endPlan,`Cancel ${b.name} by ${shortD(b.endPlan)}`]);if(b.trialUntil&&now<b.trialUntil)t.push([b.trialUntil,`${b.name} trial ends ${shortD(b.trialUntil)}`]);if(b.validUntil)t.push([b.validUntil,`${b.name} ends ${shortD(b.validUntil)}`]);
  t.forEach(x=>{const d=Math.ceil((x[0]-now)/DAY);if(d<=3&&d>=-2&&(!best||d<best.d))best={d,t:d<0?'Past the date: '+x[1]:x[1],id:b.id}})});return best?{t:best.t,a:'sheet|bill|'+J({id:best.id}),c:'amber'}:null}
{const _na2=nextAct;nextAct=function(){const n=_na2();if(!n||n.low){const s=subAlert();if(s)return s}return n}}

/* ---------- home-screen widget (a simulated Android home screen) ---------- */
function quickChips(){const lim=S.now.getTime()-60*DAY,by={};S.txns.filter(t=>t.kind==='cat'&&t.t>=lim).forEach(t=>{const r=(by[t.payee]=by[t.payee]||{payee:t.payee,ref:t.ref,n:0,amts:{}});r.n++;r.amts[t.amt]=(r.amts[t.amt]||0)+1});
 const L=Object.values(by).filter(x=>x.n>=2).sort((a,b)=>b.n-a.n).slice(0,3).map(x=>({payee:x.payee,ref:x.ref,n:x.n,amt:+Object.keys(x.amts).sort((a,b)=>x.amts[b]-x.amts[a])[0]}));
 if(L.length<3){const used=new Set(L.map(x=>x.ref));S.cats.forEach(c=>{if(L.length<3&&!used.has(c.id)){const l=S.txns.filter(t=>t.kind==='cat'&&t.ref===c.id);if(l.length){L.push({payee:c.name,amt:Math.max(5,r5(l.reduce((a,t)=>a+t.amt,0)/l.length)),ref:c.id,n:0});used.add(c.id)}}})}return L}
const shortN=p=>{const w=p.split(' ')[0];return w.length>8?w.slice(0,7)+'…':w};
function topCats(){const lim=S.now.getTime()-60*DAY,m={};S.txns.filter(t=>t.kind==='cat'&&t.t>=lim).forEach(t=>{m[t.ref]=(m[t.ref]||0)+1});return S.cats.map(c=>c.id).sort((a,b)=>(m[b]||0)-(m[a]||0)).slice(0,5)}
POPUPS.homescreen=P=>{const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hide=UI.hsHide,am=v=>hide?'₹•••':money(v),col=(typeof paceHex==='function')?paceHex():'#5FE3B8',add=UI.hsAdd,dl=UI.hsDelta;
 const eye=`<button class="hs-eye" data-a="hseye">${hide?'Show amounts':'Hide amounts'}</button>`;
 let wid;
 if(add){const amt=amtOf(add.kp),after=Math.max(0,L-amt),cats=topCats(),sel=add.cat,warn=sel&&amt?limWarn(sel,'Quick add',amt):'';
  wid=`<div class="hs-wid"><div class="row sp"><span class="cap">Add a spend</span>${eye}</div>
  <div class="row sp" style="align-items:baseline;margin-top:4px"><span class="hero" style="font-size:44px">${hide?'₹•••':'₹'+(add.kp||'0')}</span><span class="sm" style="text-align:right">${amt?`<span style="color:var(--ink3)">${am(L)}</span> → <b style="color:var(--ink)">${am(after)}</b> left`:`${am(L)} left`}</span></div>
  <div class="hs-chips">${[10,20,50,100].map(v=>`<button class="hs-c ${amt===v?'on':''}" data-a="hsamt|${v}">₹${v}</button>`).join('')}</div>
  <div class="hs-kp">${['1','2','3','4','5','6','7','8','9','','0','⌫'].map(k=>k?`<button data-a="hsk|${k}">${k}</button>`:'<span></span>').join('')}</div>
  <div class="hs-chips" style="margin-top:10px">${cats.map(id=>{const c=S.cats.find(x=>x.id===id),i=catIdx(id);return `<button class="hs-c ${sel===id?'on':''}" data-a="hscat|${id}"><i style="background:${catCol(i)}"></i>${esc(c.name)}</button>`}).join('')}</div>
  ${warn?`<div class="sm" style="color:var(--amber);margin-top:8px">${esc(warn)}</div>`:''}
  <div class="hs-row"><button class="hs-btn" style="flex:.6;height:46px" data-a="hscancel">Cancel</button><button class="hs-btn pri ${amt&&sel?'':'dis'}" style="height:46px" data-a="${amt&&sel?'hslog':'x'}">Log ${amt?money(amt):''}</button></div></div>`}
 else{const chips=quickChips();
  wid=`<div class="hs-wid"><div class="row sp"><span class="cap">Trickle</span>${eye}</div>
  <div class="hs-amt"><span class="hero" style="font-size:40px">${am(L)}</span><span class="sub" style="margin-left:8px">left of ${am(W)}</span>${dl&&!hide?`<span class="hs-delta">−${money(dl)}</span>`:''}</div>
  ${hide?'<div style="height:12px"></div>':`<div style="margin:12px 0 4px">${battery(L,W,{col,sm:true,prev:dl?Math.min(1,(L+dl)/W):undefined})}</div>`}
  ${UI.hsLast?`<div class="hs-note"><span>Added ${hide?'':money(S.txns.find(t=>t.id===UI.hsLast)?S.txns.find(t=>t.id===UI.hsLast).amt:0)+' · '}${esc((S.txns.find(t=>t.id===UI.hsLast)||{}).payee||'')}</span><button data-a="hsundo">Undo</button></div>`:''}
  <div class="hs-row">${chips.map((c,i)=>`<button class="hs-btn" data-a="hschip|${i}"><b>${esc(shortN(c.payee))}</b><i>${hide?'':money(c.amt)}</i></button>`).join('')}<button class="hs-btn pri" style="flex:.8" data-a="hsadd">+ Add</button></div></div>`}
 return `<div class="hs"><div class="hs-top"><span>${fmtTime(S.now)}</span><span>5G ▮</span></div>
 ${add?'':`<div class="hs-clock"><b>${fmtTime(S.now)}</b><span>${fmtDay(S.now)}</span></div>`}${wid}
 ${add?'':`<div class="hs-small"><span class="hero" style="font-size:26px">${am(L)}</span><span class="sub"> left</span></div><div class="hs-apps">${['Phone','Messages','Camera','Photos'].map((n,i)=>`<span><i style="background:hsl(${i*43+210},35%,38%)"></i>${n}</span>`).join('')}</div>`}
 <button class="hs-close" data-a="hsclose">Leave the home screen</button><div class="sm" style="text-align:center;margin-top:6px">Simulated Android home screen. The widget never opens Trickle.</div></div>`};
const hsReset=()=>{UI.hsAdd=null;UI.hsLast=null;UI.hsDelta=0};
H.hseye=()=>{UI.hsHide=!UI.hsHide};
H.hsclose=()=>{UI.popup=null;hsReset();go('home');return true};
H.hsadd=()=>{const c=topCats();UI.hsAdd={kp:'',cat:c[0]||null}};
H.hscancel=()=>{UI.hsAdd=null};
H.hsk=a=>{const k=a[0];let v=UI.hsAdd.kp||'';if(k==='⌫')v=v.slice(0,-1);else if(v.length<5)v=(v==='0'?'':v)+k;UI.hsAdd.kp=v};
H.hsamt=a=>{UI.hsAdd.kp=String(a[0])};
H.hscat=a=>{UI.hsAdd.cat=a[0]};
function hsFlash(t,amt){UI.hsLast=t.id;UI.hsDelta=amt;clearTimeout(H._hsT);H._hsT=setTimeout(()=>{UI.hsLast=null;UI.hsDelta=0;if(UI.popup&&UI.popup.id==='homescreen')render()},6000)}
H.hslog=()=>{const a=UI.hsAdd,amt=amtOf(a.kp);if(!amt||!a.cat)return false;const before=Math.max(0,flexL()),r=doPay(S,{amt,target:{type:'cat',id:a.cat},payee:(S.cats.find(c=>c.id===a.cat)||{}).name||'Quick add',paid:true});r.txn.via='widget';UI.hsAdd=null;hsFlash(r.txn,Math.min(amt,before))};
H.hschip=a=>{const c=quickChips()[+a[0]];if(!c)return false;const before=Math.max(0,flexL()),r=doPay(S,{amt:c.amt,target:{type:'cat',id:c.ref},payee:c.payee,paid:true});r.txn.via='widget';hsFlash(r.txn,Math.min(c.amt,before))};
H.hsundo=()=>{if(UI.hsLast){removeTxn(S,UI.hsLast);UI.hsLast=null;UI.hsDelta=0}};
