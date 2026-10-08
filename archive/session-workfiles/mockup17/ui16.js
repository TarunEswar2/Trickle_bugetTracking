/* ===== v16: one weekly allowance, categories as tags, limits only where they are needed =====
   Money in -> some is kept, the rest becomes a weekly allowance. Every spend is tagged with a category.
   Weekly statistics say which category took the most. After a week or two a limit can be set on one
   category or one shop (an amount or a number of times). A limit is a nudge: nothing is moved or taken.
   Charts: gauge (state), stacked bar (where it went), weekday bars (rhythm), shop ticks (repeats),
   cumulative lines (this week against last), 8-week bars (one category). */

/* ---------- data helpers ---------- */
const isSp=t=>t.kind==='cat'||t.kind==='unsorted';
function inWin(sc){const ws=startOfWeek(S.now).getTime();if(sc==='last')return [ws-7*DAY,ws];if(sc==='month')return [S.now.getTime()-30*DAY,S.now.getTime()+1];return [ws,S.now.getTime()+1]}
function txIn(f,t){return S.txns.filter(x=>isSp(x)&&x.t>=f&&x.t<t)}
function catTotals(f,t){const m={};txIn(f,t).forEach(x=>{const k=x.kind==='cat'?x.ref:'_u';const r=(m[k]=m[k]||{id:k,amt:0,n:0});r.amt+=x.amt;r.n++});
 const rows=Object.values(m),tot=rows.reduce((a,r)=>a+r.amt,0);
 rows.forEach(r=>{const c=S.cats.find(x=>x.id===r.id);r.name=c?c.name:'Unsorted';r.col=c?catCol(catIdx(c.id)):'#8A94A6';r.share=tot?r.amt/tot:0});
 return rows.sort((a,b)=>b.amt-a.amt)}
const sumAmt=a=>a.reduce((x,r)=>x+r.amt,0);
const pct0=x=>Math.round(x*100);
const catName=id=>(S.cats.find(c=>c.id===id)||{}).name||'Category';
const daysTracked=()=>{const ts=S.txns.filter(isSp);return ts.length?(S.now.getTime()-Math.min(...ts.map(t=>t.t)))/DAY:0};
const FULLDAY=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const dowIdx=ts=>(new Date(ts).getDay()+6)%7;

/* ---------- limits ---------- */
function limUse(l,w){const [f,t]=w||inWin('week');const list=txIn(f,t).filter(x=>l.scope==='cat'?x.kind==='cat'&&x.ref===l.ref:x.payee===l.ref);return l.kind==='amt'?list.reduce((a,x)=>a+x.amt,0):list.length}
const limName=l=>l.scope==='cat'?catName(l.ref):l.ref;
const limText=l=>l.kind==='amt'?`${money(limUse(l))} of ${money(l.cap)}`:`${limUse(l)} of ${l.cap} time${l.cap===1?'':'s'}`;
function limState(l){const u=limUse(l);if(u>l.cap)return 'over';if(u>=l.cap)return 'at';return u>=l.cap*.8&&u>0?'near':'ok'}
const limCol=(l,col)=>{const s=limState(l);return s==='ok'?col:AMBER};
function limDefault(scope,ref,kind){const now=S.now.getTime();const list=txIn(now-14*DAY,now+1).filter(t=>scope==='cat'?t.kind==='cat'&&t.ref===ref:t.payee===ref);
 if(kind==='amt'){const w=list.reduce((a,t)=>a+t.amt,0)/2;return Math.max(10,r5b(w*.85)||50)}return Math.max(1,Math.round(list.length/2)||1)}
function limWarn(catId,payee,amt){const out=[];(S.limits||[]).forEach(l=>{
  if(l.scope==='cat'&&l.ref!==catId)return;if(l.scope==='shop'&&l.ref!==payee)return;const u=limUse(l);
  if(l.kind==='amt'&&u+amt>l.cap)out.push(`${limName(l)} would be ${money(u+amt-l.cap)} over its limit.`);
  if(l.kind==='times'&&u+1>l.cap)out.push(`That is time ${u+1} at ${limName(l)}. Your limit is ${l.cap}.`)});return out[0]||''}
function suggestions(){const out=[];if(daysTracked()<7)return out;const now=S.now.getTime();
 const rows=catTotals(now-7*DAY,now+1),T=sumAmt(rows);
 if(T>0)rows.forEach(r=>{if(r.id==='_u')return;if(r.share>=.35&&r.amt>=Math.max(100,(S.W||0)*.2)&&!S.limits.some(l=>l.scope==='cat'&&l.ref===r.id)&&!S.limNo['c'+r.id])out.push({key:'c'+r.id,scope:'cat',ref:r.id,kind:'amt',short:`Limit for ${r.name}?`,text:`${r.name} took ${pct0(r.share)}% of your week.`})});
 const m={};txIn(now-14*DAY,now+1).forEach(t=>{if(t.kind==='cat')(m[t.payee]=m[t.payee]||[]).push(t)});
 Object.keys(m).sort((a,b)=>m[b].length-m[a].length).forEach(p=>{const n=m[p].length;if(n>=4&&!S.limits.some(l=>l.scope==='shop'&&l.ref===p)&&!S.limNo['s'+p])out.push({key:'s'+p,scope:'shop',ref:p,kind:'times',short:`Limit for ${p}?`,text:`${p}: ${n} times in 2 weeks.`})});
 return out}
SHEETS.limit=p=>{const ex=p.edit?S.limits.find(l=>l.id===p.edit):null;const scope=ex?ex.scope:p.scope,ref=ex?ex.ref:p.ref;const name=scope==='cat'?catName(ref):ref;const kind=p.kind||(ex&&ex.kind)||'amt';
 const v=p.lv!=null?p.lv:'';const shown=kind==='amt'?'₹'+(v||'0'):(v||'0')+(v==='1'?' time':' times');
 return `<div class="cap">${ex?'Your limit':p.reason?'Suggested limit':'New limit'}</div><div class="title" style="font-size:26px;margin:2px 0 4px">${esc(name)}</div>${p.reason?`<div class="sub">${esc(p.reason)}</div>`:''}
 <div class="row" style="gap:8px;margin:14px 0 4px"><button class="chip ${kind==='amt'?'on':''}" data-a="limkind|amt">₹ a week</button><button class="chip ${kind==='times'?'on':''}" data-a="limkind|times">Times a week</button></div>
 <div style="margin:8px 0;display:flex;justify-content:center">${amtDots(shown)}</div>${keypad('lv')}<div class="sub" style="text-align:center;margin:2px 0 12px;font-size:13px">A limit is a nudge. Nothing is taken away.</div>
 <div class="col" style="gap:8px"><button class="btn ${amtOf(v)?'':'d'}" data-a="${amtOf(v)?'limsave':'x'}">Save limit</button>${ex?`<button class="btn q" data-a="limrm|${ex.id}">Remove limit</button>`:p.key?`<button class="btn q" data-a="limno|${esc(p.key)}">Not now</button>`:''}</div>`};
H.limset=a=>{const [scope,ref,kind]=a;const k=kind||'amt';openSheet('limit',{scope,ref,kind:k,lv:String(limDefault(scope,ref,k))});return false};
H.limsug=a=>{const s=suggestions().find(x=>x.key===a[0]);if(!s)return false;openSheet('limit',{scope:s.scope,ref:s.ref,kind:s.kind,key:s.key,reason:s.text,lv:String(limDefault(s.scope,s.ref,s.kind))});return false};
H.limedit=a=>{const l=S.limits.find(x=>x.id===a[0]);if(!l)return false;openSheet('limit',{edit:l.id,kind:l.kind,lv:String(l.cap)});return false};
H.limkind=a=>{const p=UI.sheet.p,ex=p.edit?S.limits.find(l=>l.id===p.edit):null;p.kind=a[0];p.lv=String(limDefault(ex?ex.scope:p.scope,ex?ex.ref:p.ref,a[0]))};
H.limsave=()=>{const p=UI.sheet.p,cap=amtOf(p.lv);if(!cap)return false;
 if(p.edit){const l=S.limits.find(x=>x.id===p.edit);if(l){l.kind=p.kind||l.kind;l.cap=cap}}
 else{S.limits=S.limits.filter(l=>!(l.scope===p.scope&&l.ref===p.ref));S.limits.push({id:'l'+(S.idc++),scope:p.scope,ref:p.ref,kind:p.kind||'amt',cap})}
 UI.sheet=null;say('Limit set.');return false};
H.limrm=a=>{S.limits=S.limits.filter(l=>l.id!==a[0]);UI.sheet=null;say('Limit removed.');return false};
H.limno=a=>{S.limNo[a[0]]=true;UI.sheet=null};
H.limsno=a=>{S.limNo[a[0]]=true};
SHEETS.limits=()=>`<div class="h2" style="margin-bottom:12px">Your limits</div><div class="col" style="gap:8px">${S.limits.map(l=>{const col=l.scope==='cat'?catCol(catIdx(l.ref)):'#B48CFF';return `<button class="li" style="display:block;padding:12px 14px" data-a="limedit|${l.id}"><span class="row sp"><span class="n" style="flex:none"><i style="width:10px;height:10px;border-radius:50%;background:${col};display:inline-block;margin-right:10px"></i>${esc(limName(l))}</span><span class="t" style="${limState(l)==='ok'?'':'color:'+AMBER}">${limText(l)}</span></span>${limBar(l,col)}</button>`}).join('')}</div>`;
H.v16limits=()=>{openSheet('limits');return false};
function limBar(l,col){const u=limUse(l),r=Math.min(1,u/Math.max(1,l.cap));const c=limCol(l,col);
 if(l.kind==='times'&&l.cap<=8){return `<span class="ticks">${Array.from({length:l.cap},(_,i)=>`<i style="${i<u?`background:${boxBg(c)}`:''}"></i>`).join('')}</span>`}
 return `<span class="mbar"><i style="width:${Math.max(u>0?4:0,r*100)}%;background:${boxBg(c)}"></i></span>`}

/* ---------- charts ---------- */
function stackBar(rows,h){const top=rows.slice(0,6),rest=rows.slice(6),parts=top.map(r=>({amt:r.amt,col:r.col}));if(rest.length)parts.push({amt:sumAmt(rest),col:'#59626F'});const tot=sumAmt(parts)||1;
 return `<div class="sbar" style="height:${h||26}px">${parts.map(p=>`<i style="flex:${Math.max(p.amt/tot*100,2)} 1 0;background:${boxBg(p.col)};box-shadow:0 0 16px ${p.col}33"></i>`).join('')}</div>`}
function smooth(p){if(p.length<2)return '';let d=`M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;for(let i=0;i<p.length-1;i++){const p0=p[i-1]||p[i],p1=p[i],p2=p[i+1],p3=p[i+2]||p2;const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`}return d}
function trendSvg(cur,last,today,allow){const W=346,H=230,pl=6,pr=6,pt=14,pb=30;const nz=[...cur.slice(0,today+1),...last];let mx=Math.max(1,...nz);if(allow&&allow<=mx*1.35)mx=Math.max(mx,allow);mx*=1.12;
 const x=i=>pl+i*(W-pl-pr)/6,y=v=>pt+(H-pt-pb)*(1-v/mx);const cp=cur.slice(0,today+1).map((v,i)=>[x(i),y(v)]),lp=last.map((v,i)=>[x(i),y(v)]);
 const grid=[.25,.5,.75,1].map(f=>`<line x1="${pl}" x2="${W-pr}" y1="${y(mx*f/1.12).toFixed(1)}" y2="${y(mx*f/1.12).toFixed(1)}" stroke="rgba(255,255,255,.05)"/>`).join('');
 const area=cp.length>1?`<path d="${smooth(cp)} L${cp[cp.length-1][0].toFixed(1)},${H-pb} L${cp[0][0].toFixed(1)},${H-pb} Z" fill="url(#tg1)"/>`:'';
 const al=allow&&allow<=mx?`<line x1="${pl}" x2="${W-pr}" y1="${y(allow).toFixed(1)}" y2="${y(allow).toFixed(1)}" stroke="${AMBER}" stroke-width="1.5" stroke-dasharray="2 5" opacity=".8"/><text x="${W-pr}" y="${(y(allow)-6).toFixed(1)}" text-anchor="end" fill="${AMBER}" font-size="11" font-weight="700">your week ${money(allow)}</text>`:'';
 const dot=cp.length?`<circle cx="${cp[cp.length-1][0]}" cy="${cp[cp.length-1][1]}" r="9" fill="#5FE3B8" opacity=".25"/><circle cx="${cp[cp.length-1][0]}" cy="${cp[cp.length-1][1]}" r="4.5" fill="#5FE3B8" stroke="#06100A" stroke-width="2"/>`:'';
 return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Spending this week against last week"><defs><linearGradient id="tg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FE3B8" stop-opacity=".32"/><stop offset="1" stop-color="#5FE3B8" stop-opacity="0"/></linearGradient><filter id="tgl"><feGaussianBlur stdDeviation="3.5"/></filter></defs>${grid}${al}
 <path d="${smooth(lp)}" fill="none" stroke="#9AA4B2" stroke-width="2.5" stroke-dasharray="1 6.5" stroke-linecap="round"/>${area}
 ${cp.length>1?`<path d="${smooth(cp)}" fill="none" stroke="#5FE3B8" stroke-width="6" opacity=".35" filter="url(#tgl)"/><path d="${smooth(cp)}" fill="none" stroke="#5FE3B8" stroke-width="3" stroke-linecap="round"/>`:''}${dot}
 ${DOW.map((d,i)=>`<text x="${x(i).toFixed(1)}" y="${H-8}" text-anchor="middle" fill="${i===today?'#F5F7FA':'#8F9AAB'}" font-size="12" font-weight="${i===today?700:500}">${d[0]}</text>`).join('')}</svg>`}
function dayBars(vals,sel,today,fut){const mx=Math.max(1,...vals);return `<div class="dbars">${vals.map((v,i)=>{const h=Math.max(v>0?8:3,Math.round(v/mx*150));const on=i===sel;
 return `<button class="db ${on?'on':''} ${fut&&fut[i]?'fut':''}" data-a="insday|${i}"><span class="bar" style="height:${h}px;${v>0&&!(fut&&fut[i])?`background:${boxBg(on?'#5FE3B8':SPEND)}`:''}"></span><span class="lab ${i===today?'td':''}">${DOW[i][0]}</span></button>`}).join('')}</div>`}
function weeksBars(vals,col){const mx=Math.max(1,...vals),avg=vals.slice(0,-1).reduce((a,v)=>a+v,0)/Math.max(1,vals.length-1);
 return `<div class="wbars" style="--avg:${Math.round(avg/mx*100)}%">${vals.map((v,i)=>`<span class="wb ${i===vals.length-1?'cur':''}"><i style="height:${Math.max(v>0?5:2,Math.round(v/mx*100))}%;${v>0?`background:${boxBg(i===vals.length-1?col:'#4a5361')}`:''}"></i></span>`).join('')}</div>`}

/* ---------- gauge and Home ---------- */
function gauge16(lvl,col,prev){let s='<div class="lg blk g16" style="width:300px;margin:0 auto">';
 for(let i=0;i<100;i++){const row=Math.floor(i/10),c=i%10,k=(9-row)*10+c;
  if(k<lvl)s+=`<i style="background:${boxBg(col)};box-shadow:${k>=lvl-10?`0 0 14px ${col}66,`:''}inset 0 1px 0 rgba(255,255,255,.35)"></i>`;
  else if(prev>k)s+=`<i class="fx" style="--c:${col};animation-delay:${(prev-1-k)*22}ms"></i>`;
  else s+='<i class="gh"></i>'}
 return s+'</div>'}
const daysToGo=()=>7-dowIdx(S.now.getTime());
function nextAct(){
 if(S.flags&&S.flags.linkLost)return {t:'Refresh your UPI link',a:'settings|acct',c:'amber'};
 if(S.pending.length)return {t:'Last week is ready',a:'openweek',c:'amber'};
 if(S.credits&&S.credits.length){const c=S.credits[0];return {t:money(c.amt)+' came in from '+c.from,a:'assign|'+c.id,c:'green'}}
 if(S.unsorted.length)return {t:S.unsorted.length+(S.unsorted.length>1?' payments need':' payment needs')+' a category',a:'push|sort',c:'amber'};
 const b=billSoon()[0];if(b)return {t:b,a:'goto|spending',c:'amber'};
 const ov=(S.limits||[]).find(l=>limState(l)==='over'||limState(l)==='at');if(ov)return {t:`${limName(ov)}: ${limText(ov)}`,a:'limedit|'+ov.id,c:'amber'};
 if(!planned())return {t:'Add your money',a:'startplan',c:'plan'};
 const pl=planLines()[0];if(pl)return {html:pl};
 const sg=suggestions()[0];if(sg)return {t:sg.short,a:'limsug|'+sg.key,c:'violet'};
 return null}
SCREENS.home=()=>{const nt=nextAct(),pl=planned();let title,grid,cap='';
 if(pl){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),lvl=marksLeft(L,W),empty=L<=0;const sig=S.key+'|'+wk0();const prev=(UI._g16&&UI._g16.sig===sig)?UI._g16.lvl:lvl;UI._g16={sig,lvl};
  let st='';if(typeof paceInfo==='function'){const p=paceInfo();if(S.touched||empty)st="This week's amount is used up.";else if(p&&p.over)st='Spending fast this week.'}
  title=`<span class="hero cu" data-v="${Math.round(L)}" style="font-size:54px">${money(L)}</span><div class="sub" style="margin-top:6px;font-size:16px">left · ${daysToGo()===1?'last day':daysToGo()+' days to go'}</div>${st?`<div class="sub" style="margin-top:6px;color:${AMBER}">${st}</div>`:''}`;
  grid=gauge16(lvl,(typeof paceHex==='function')?paceHex():SPEND,Math.min(100,prev))+(empty?`<div style="height:3px;background:${AMBER};margin:8px 4px 0;border-radius:2px;box-shadow:0 0 14px ${AMBER}"></div>`:'');
  cap=`<span class="row sp" style="align-items:center"><span></span><button class="chip" data-a="gridhow">1 mark = 1% ≈ ${money(boxVal(W))} ⓘ</button></span>`}
 else{const tot=wkTot(0);
  title=tot?`<span class="hero" style="font-size:54px">${money(tot)}</span><div class="sub" style="margin-top:6px;font-size:16px">spent this week</div>`:`<span class="title" style="font-size:30px">Nothing logged yet.</span>`;
  grid=gauge16(0,SPEND,0).replace('class="lg blk g16"','class="lg blk g16 idle"')}
 const row=!nt?'':nt.html?nt.html:nt.c==='plan'?`<button class="li cta" data-a="${nt.a}"><span class="n"><b>${nt.t}</b></span><span class="t">›</span></button>`
  :`<button class="li" data-a="${nt.a}"><span class="d" style="background:${nt.c==='green'?SAVE:nt.c==='violet'?'#B48CFF':'var(--amber)'}"></span><span class="n">${esc(nt.t)}</span><span class="t">›</span></button>`;
 return `<div class="row sp" style="margin-top:2px"><span></span><button class="chip" data-a="settings">⚙</button></div>
 <div style="margin-top:14px">${title}</div>
 <div style="margin:20px 8px 12px" data-a="gridhow">${grid}</div><div style="margin:0 10px 16px">${cap}</div>
 ${row}
 <div style="position:sticky;bottom:0;margin-top:22px;padding-top:10px;background:transparent"><button class="btn" data-a="${window.HOMEBTN==='scan'?'payscan':'pay'}">${payLabel()}</button></div>`};

/* ---------- Spending: where did it go? (a statistic first, one picture, then the list) ---------- */
H.spscope=a=>{UI.sc=a[0]};
const SCOPES=[['week','This week'],['last','Last week'],['month','30 days']];
function spCats(){const sc=UI.sc||'week',[f,t]=inWin(sc);const rows=catTotals(f,t),T=sumAmt(rows);
 const chips=`<div class="row" style="gap:8px;margin:14px 0 14px">${SCOPES.map(s=>`<button class="chip ${sc===s[0]?'on':''}" data-a="spscope|${s[0]}">${s[1]}</button>`).join('')}</div>`;
 if(!rows.length)return `<div class="title" style="font-size:26px">Nothing logged ${sc==='week'?'yet':'then'}.</div><div class="sub" style="margin-top:8px">Your spends show here, by category.</div>${chips}`;
 const top=rows[0],sg=sc==='week'?suggestions()[0]:null;
 const show=UI.spAll?rows:rows.slice(0,5);
 const li=show.map(r=>{const l=(S.limits||[]).find(x=>x.scope==='cat'&&x.ref===r.id);const go=r.id==='_u'?'push|sort':`push|cat|${J({id:r.id})}`;
  return `<button class="li" style="display:block;padding:12px 14px" data-a="${go}"><span class="row sp"><span class="n" style="flex:none"><i style="width:10px;height:10px;border-radius:50%;background:${r.col};display:inline-block;margin-right:10px"></i>${esc(r.name)}</span><span class="t" style="max-width:none"><b style="color:var(--ink)">${money(r.amt)}</b></span></span>${l&&sc==='week'?`<span class="row sp" style="margin-top:8px;gap:10px"><span style="flex:1">${limBar(l,r.col)}</span><span class="sm" style="${limState(l)==='ok'?'':'color:'+AMBER}">${limText(l)}</span></span>`:''}</button>`}).join('');
 return `<div class="title" style="font-size:28px;line-height:1.1">${rows.length>1?esc(top.name)+' took the most.':'All of it went on '+esc(top.name)+'.'}</div><div class="sub" style="margin-top:6px">${money(top.amt)} · ${pct0(top.share)}% of ${money(T)}</div>
 <div style="margin:18px 0 0">${stackBar(rows)}</div>${chips}
 ${sg?`<button class="li" style="margin-bottom:10px" data-a="limsug|${sg.key}"><span class="d" style="background:#8D97A3"></span><span class="n">${esc(sg.short)}</span><span class="t">›</span></button>`:''}
 <div class="col" style="gap:8px">${li}${rows.length>5&&!UI.spAll?`<button class="li" data-a="spall"><span class="n mut">Show all ${rows.length}</span><span class="t">›</span></button>`:''}
 
 </div>`}

/* ---------- one category: how it moves, which shops, its limit ---------- */
SCREENS.cat=SCREENS.tcat=({id})=>{const c=S.cats.find(x=>x.id===id);if(!c)return '';const col=catCol(catIdx(id));const ws=wk0();
 const vals=Array.from({length:8},(_,k)=>{const f=ws-(7-k)*7*DAY,t=k===7?S.now.getTime()+1:f+7*DAY;return txIn(f,t).filter(x=>x.kind==='cat'&&x.ref===id).reduce((a,x)=>a+x.amt,0)});
 const [f,t]=inWin('week'),all=sumAmt(catTotals(f,t)),mine=vals[7],share=all?mine/all:0;
 const shops={};txIn(S.now.getTime()-30*DAY,S.now.getTime()+1).filter(x=>x.kind==='cat'&&x.ref===id).forEach(x=>{const r=(shops[x.payee]=shops[x.payee]||{n:0,amt:0});r.n++;r.amt+=x.amt});
 const sl=Object.keys(shops).sort((a,b)=>shops[b].amt-shops[a].amt).slice(0,3);const lim=(S.limits||[]).find(l=>l.scope==='cat'&&l.ref===id);
 return `<button class="back" data-a="back">‹ Spending</button><div class="row" style="gap:10px;align-items:center"><i style="width:14px;height:14px;border-radius:50%;background:${boxBg(col)};box-shadow:0 0 12px ${col}88"></i><div class="title" style="font-size:30px">${esc(c.name)}</div></div>
 <div style="margin-top:14px"><span class="hero" style="font-size:42px">${money(mine)}</span><span class="sub" style="margin-left:8px">this week${all&&mine?` · ${pct0(share)}% of spending`:''}</span></div>
 <div style="margin:18px 0 6px">${weeksBars(vals,col)}</div><div class="row sp sm" style="margin-bottom:16px"><span>8 weeks ago</span><span>This week</span></div>
 ${lim?`<button class="li" style="display:block;padding:12px 14px" data-a="limedit|${lim.id}"><span class="row sp"><span class="n">Limit</span><span class="t" style="${limState(lim)==='ok'?'':'color:'+AMBER}">${limText(lim)}</span></span>${limBar(lim,col)}</button>`:`<button class="li" data-a="limset|cat|${id}|amt"><span class="d" style="background:#B48CFF"></span><span class="n">Set a limit</span><span class="t">optional ›</span></button>`}
 ${sl.length?`<div class="cap" style="margin:18px 0 8px">Where</div><div class="col" style="gap:8px">${sl.map(p=>`<button class="li" data-a="limset|shop|${esc(p)}|times"><span class="n">${esc(p)}</span><span class="t">${shops[p].n}× · ${money(shops[p].amt)}</span></button>`).join('')}</div>`:''}
 <div style="position:sticky;bottom:0;margin-top:18px;padding-top:10px"><button class="btn" data-a="pay|${id}">${payLabel()}</button></div>`};

/* ---------- Insights: rhythm, repeats, trend. Rupees only. ---------- */
H.insday=a=>{UI.rhSel=+a[0]};H.rhscope=a=>{UI.rh=a[0];UI.rhSel=null};
function insWhen(){const sc=UI.rh||'avg',now=S.now.getTime();let vals=Array(7).fill(0),fut=null,note='';
 const list=sc==='week'?txIn(wk0(),now+1):txIn(now-28*DAY,now+1);
 list.forEach(x=>{vals[dowIdx(x.t)]+=x.amt});if(sc==='avg')vals=vals.map(v=>Math.round(v/4));else{const td=dowIdx(now);fut=vals.map((_,i)=>i>td)}
 const tot=vals.reduce((a,v)=>a+v,0);if(!tot)return `<div class="title" style="font-size:24px">Not enough yet.</div><div class="sub" style="margin-top:8px">Rhythm shows after a few days of spending.</div>`;
 const mx=Math.max(...vals),top=vals.indexOf(mx),sel=UI.rhSel!=null?UI.rhSel:top;
 const B=[['morning',5,12],['afternoon',12,17],['evening',17,21],['night',21,29]];const bs=B.map(b=>list.filter(x=>{let h=new Date(x.t).getHours();if(h<5)h+=24;return h>=b[1]&&h<b[2]}).reduce((a,x)=>a+x.amt,0));const tb=B[bs.indexOf(Math.max(...bs))][0];
 return `<div class="title" style="font-size:26px;line-height:1.15">${FULLDAY[top]}s are your biggest day.</div><div class="sub" style="margin-top:6px">Mostly in the ${tb}.</div>
 <div class="row" style="gap:8px;margin:14px 0 4px"><button class="chip ${sc==='avg'?'on':''}" data-a="rhscope|avg">4 weeks</button><button class="chip ${sc==='week'?'on':''}" data-a="rhscope|week">This week</button></div>
 <div style="margin:6px 0 0"><span class="hero" style="font-size:34px">${money(vals[sel])}</span><span class="sub" style="margin-left:8px">${FULLDAY[sel]}${sc==='avg'?' on average':''}</span></div>${dayBars(vals,sel,dowIdx(now),fut)}`}
function shopList(){const now=S.now.getTime(),m={};txIn(now-30*DAY,now+1).filter(x=>x.kind==='cat').forEach(x=>{(m[x.payee]=m[x.payee]||[]).push(x)});
 return Object.keys(m).filter(k=>m[k].length>=2).map(k=>({payee:k,list:m[k],n:m[k].length,amt:m[k].reduce((a,x)=>a+x.amt,0)})).sort((a,b)=>b.n-a.n||b.amt-a.amt)}
function insRep(){const L=shopList();if(!L.length)return `<div class="title" style="font-size:24px">Nothing repeats yet.</div><div class="sub" style="margin-top:8px">Places you visit again and again show up here.</div>`;const top=L[0],mx=Math.max(...L.map(l=>l.n));
 return `<div class="title" style="font-size:26px;line-height:1.15">${esc(top.payee)} is where you go most.</div><div class="sub" style="margin-top:6px">${top.n} visits in 30 days, ${money(top.amt)} in all.</div>
 <div class="col" style="gap:8px;margin-top:18px">${L.slice(0,5).map(l=>{const lim=(S.limits||[]).find(x=>x.scope==='shop'&&x.ref===l.payee);
  return `<button class="li" style="display:block;padding:12px 14px" data-a="${lim?'limedit|'+lim.id:'limset|shop|'+esc(l.payee)+'|times'}"><span class="row sp"><span class="n" style="flex:none">${esc(l.payee)}</span><span class="t" style="max-width:none"><b style="color:var(--ink)">${l.n} visits</b> · ${money(l.amt)}</span></span><span class="mbar" style="margin-top:9px"><i style="width:${Math.max(8,l.n/mx*100)}%;background:${boxBg(SPEND)}"></i></span>${lim?`<span class="sm" style="display:block;margin-top:8px;${limState(lim)!=='ok'?'color:'+AMBER:''}">Limit ${lim.kind==='times'?lim.cap+(lim.cap===1?' visit':' visits'):money(lim.cap)} a week. This week: ${lim.kind==='times'?limUse(lim):money(limUse(lim))}.</span>`:''}</button>`}).join('')}</div><div class="sub" style="margin-top:12px;font-size:13px">Tap a place to set a limit.</div>`}
function insCmp(){const now=S.now.getTime(),ws=wk0(),td=dowIdx(now);const day=(f,k)=>txIn(f+k*DAY,f+(k+1)*DAY).reduce((a,x)=>a+x.amt,0);
 const cur=[],last=[];let c=0,l=0;for(let k=0;k<7;k++){c+=day(ws,k);cur.push(c);l+=day(ws-7*DAY,k);last.push(l)}
 if(!last[6]||!cur[td])return `<div class="title" style="font-size:24px">Not enough yet.</div><div class="sub" style="margin-top:8px">Needs a spend this week and last week.</div>`;
 const diff=cur[td]-last[td],same=Math.abs(diff)<Math.max(20,last[td]*.08);
 return `<div class="title" style="font-size:26px;line-height:1.15">${same?'About the same as last week.':diff>0?money(diff)+' more than last week.':money(-diff)+' less than last week.'}</div><div class="sub" style="margin-top:6px">Same days, running total.</div>
 <div style="margin:14px 0 4px">${trendSvg(cur,last,td,planned()?S.W:0)}</div><div class="row" style="gap:18px;margin-top:2px"><span class="sm"><i class="lgd" style="background:#5FE3B8"></i>This week</span><span class="sm"><i class="lgd dot"></i>Last week</span></div>`}
SCREENS.insights=()=>{const v=UI.ins||'when';return `${SEG([['when','Rhythm'],['rep','Repeats'],['cmp','Trend']],v,'insseg')}${v==='when'?insWhen():v==='rep'?insRep():insCmp()}`};

/* ---------- Week review: one screen, the statistic first ---------- */
POPUPS.weekreview=P=>{const f=P.week,t=f+7*DAY,rows=catTotals(f,t),T=sumAmt(rows),allow=(P.bufAmt||0)+P.snap.reduce((a,s)=>a+s[2],0)||S.W||1,over=T>allow*1.02,top=rows[0];
 return `${blobs('blue','bottom',.7)}<div class="mbody" style="padding-top:64px"><div class="cap">Last week</div><div class="title" style="font-size:32px;margin-top:4px">${!T?'A quiet week.':over?'A bit over your week.':'You stayed within your week.'}</div>
 <div class="sub" style="margin-top:6px">${money(T)} of ${money(allow)}${P.moved>0?' · '+money(P.moved)+' moved to savings':over?' · savings covered the rest':''}</div>
 ${(()=>{const o=(S.limits||[]).map(l=>({l,u:limUse(l,[f,t])})).find(x=>x.u>x.l.cap);return o?`<div class="banner" style="margin-top:16px"><span style="color:var(--amber);font-weight:700">${esc(limName(o.l))}: ${o.l.kind==='amt'?money(o.u)+' of '+money(o.l.cap):o.u+' of '+o.l.cap+' times'}</span></div>`:''})()}${top?`<div style="margin:26px 0 8px">${stackBar(rows,30)}</div><div class="title" style="font-size:22px;margin:16px 0 4px">${rows.length>1?esc(top.name)+' took the most.':'All on '+esc(top.name)+'.'}</div><div class="sub">${money(top.amt)} · ${pct0(top.share)}%</div>`:''}</div><div class="mfoot"><button class="btn" data-a="wrdone">Done</button></div>`};

/* ---------- Money: money in, split, weekly allowance ---------- */
function mnInc(){const l=S.incomes||[],now=S.now.getTime(),run=l.filter(i=>!i.end||i.end+DAY>now);
 const one=`<button class="li" data-a="oneoff"><span class="n mut">One-off money</span><span class="t">›</span></button>`;
 if(!l.length&&!planned())return `<div class="title">Add your money.</div><div class="sub" style="margin:8px 0 22px">Trickle keeps some aside and works out what you can spend each week.</div><button class="btn" data-a="v15addinc">Add money</button><div style="margin-top:12px">${one}</div>`;
 if(!l.length&&planned())return `<div><span class="hero" style="font-size:44px">${money(S.W)}</span><div class="sub" style="margin-top:6px;font-size:16px">a week to spend</div></div><div class="sub" style="margin:18px 0 22px">Add the money you get. Trickle works out your week.</div><button class="btn" data-a="v15addinc">Add money</button><div style="margin-top:12px">${one}</div>`;
 if(!run.length)return `<div class="title">${planned()?'Your money ran out of dates.':'Add your money.'}</div><div class="sub" style="margin:8px 0 22px">Add more to keep your weekly allowance going.</div><button class="btn" data-a="v15addinc">Add money</button><div class="col" style="gap:8px;margin-top:12px">${l.length?`<button class="li" data-a="v15incs"><span class="n">Your money in</span><span class="t">${l.length} ›</span></button>`:''}${one}</div>`;
 const wk=planned()?S.W:Math.round(planRate()),sav=run.reduce((a,i)=>a+i.sav,0),sp=run.reduce((a,i)=>a+i.sp,0),tot=Math.max(1,sav+sp),p=Math.round(sav/tot*100);const pl=planned()?planLines()[0]:null;
 return `<div><span class="hero" style="font-size:44px">${money(wk)}</span><div class="sub" style="margin-top:6px;font-size:16px">a week to spend</div></div>
 <div style="margin:22px 0 8px"><div class="sbar" style="height:30px"><i style="flex:${Math.max(sav,0.001)} 1 0;min-width:0;background:${boxBg(SAVE)};box-shadow:0 0 16px ${SAVE}33"></i><i style="flex:${Math.max(sp,1)} 1 0;background:${boxBg(SPEND)};box-shadow:0 0 16px ${SPEND}33"></i></div></div>
 <div class="row sp sm" style="margin:10px 2px 20px"><span><i class="lgd" style="background:${SAVE}"></i>Save ${p}% · ${money(sav)}</span><span><i class="lgd" style="background:${SPEND}"></i>Spend ${100-p}% · ${money(sp)}</span></div>
 ${pl?`<div class="card" style="margin-bottom:12px">${pl}</div>`:''}<button class="btn" data-a="v15addinc">Add money</button><div class="col" style="gap:8px;margin-top:12px"><button class="li" data-a="v15incs"><span class="n">Your money in</span><span class="t">${l.length} ›</span></button>${one}</div>`}

/* ---------- Adding money: three short steps, the weekly allowance shown as it forms ---------- */
const INCPRE=[3000,6000,10000,15000];
H.incamt=a=>{UI.flow.d.kp=String(a[0])};
const steps16=n=>`<div class="steps">${[0,1,2].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</div>`;
FLOWS.inc=F=>{const d=F.d,a=amtOf(d.kp),pct=d.pct===undefined?20:d.pct,sav=Math.round(a*pct/100/10)*10,sp=a-sav;
 if(F.step===0)return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button>${steps16(0)}<div class="title" style="margin-top:14px">How much money do you get?</div><div class="sub" style="margin-top:6px">Rough is fine.</div>
  <div class="row wrap" style="gap:8px;margin:14px 0 4px">${INCPRE.map(v=>`<button class="chip ${a===v?'on':''}" data-a="incamt|${v}">${money(v)}</button>`).join('')}</div><div style="margin:8px 0;display:flex;justify-content:center">${amtDots('₹'+(d.kp||'0'))}</div>${keypad('kp')}</div><div class="mfoot"><div class="col" style="gap:10px"><button class="btn ${a>0?'':'d'}" data-a="${a>0?'incnext':'x'}">Next</button><button class="btn q" data-a="pclose">Not now</button></div></div>`;
 if(F.step===2){const t0=day0(),end=snapEnd(d.end||presetEnd(PRESETS[1])),days=daysIn(t0,end),wk=Math.max(5,r5b(sp/days*7)),left=daysIn(t0,wk0()+6*DAY),share=r5b(sp/days*left);
  return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button>${steps16(2)}<div class="title" style="margin-top:14px">How many days should this money last?</div>
  <div class="row wrap" style="gap:8px;margin:16px 0 10px">${PRESETS.map((p,i)=>`<button class="chip ${!d.cal&&end===presetEnd(p)?'on':''}" data-a="incpre|${i}">${p[0]}</button>`).join('')}<button class="chip ${d.cal?'on':''}" data-a="v15cal">Pick a date</button></div>
  <div class="card allow"><div class="cap">Your weekly allowance</div><div style="display:flex;align-items:baseline;gap:8px;margin-top:6px"><span class="hero" style="font-size:44px">${money(wk)}</span><span class="sub">a week</span></div><div class="sm" style="margin-top:6px">${money(sp)} over ${days} days.</div>${left<7?`<div class="sm" style="margin-top:6px;color:var(--amber)">This week gets ${money(share)} for the ${left} day${left>1?'s':''} left.</div>`:''}</div>
  ${d.cal?calHtml(d,t0,end):''}</div><div class="mfoot"><button class="btn" data-a="incfinish">${planned()?'Update my week':'Start my week'}</button></div>`}
 return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button>${steps16(1)}<div class="title" style="margin-top:14px">How much will you save?</div><div class="sub" style="margin-top:6px">Of ${money(a)}. The rest is for spending.</div>
  <div style="margin:22px 0 10px"><div class="sbar" style="height:34px"><i id="inc-bsav" style="flex:${Math.max(pct,.001)} 1 0;min-width:0;background:${boxBg(SAVE)};box-shadow:0 0 16px ${SAVE}33"></i><i id="inc-bsp" style="flex:${Math.max(100-pct,.001)} 1 0;min-width:0;background:${boxBg(SPEND)};box-shadow:0 0 16px ${SPEND}33"></i></div></div>
  <div class="row sp"><span><span class="cap" style="color:${SAVE}">Save · <span id="inc-pct">${pct}%</span></span><div id="inc-sav" class="h2">${money(sav)}</div></span><span style="text-align:right"><span class="cap" style="color:${SPEND}">Spend</span><div id="inc-sp" class="h2">${money(sp)}</div></span></div>
  <input type="range" min="0" max="100" step="5" value="${pct}" data-i="incpct" style="margin:22px 0 6px"><div class="row sp sm"><span>Nothing</span><span>All of it</span></div></div>
  <div class="mfoot"><div class="col" style="gap:10px">${sp>0?`<button class="btn" data-a="incnext2">Next</button>`:`<button class="btn" data-a="incdone">Add ${money(a)}</button>`}</div></div>`};
HI.incpct=(a,el)=>{const d=UI.flow.d;d.pct=+el.value;const t=amtOf(d.kp),sav=Math.round(t*d.pct/100/10)*10,sp=t-sav;$('#inc-pct').textContent=d.pct+'%';$('#inc-sav').textContent=money(sav);$('#inc-sp').textContent=money(sp);$('#inc-bsav').style.flex=Math.max(d.pct,.001)+' 1 0';$('#inc-bsp').style.flex=Math.max(100-d.pct,.001)+' 1 0';return false};

/* ---------- Onboarding: how do we see spends? How much money do you get? Categories are not asked. ---------- */
const _onb16=FLOWS.onb;
FLOWS.onb=F=>{const d=F.d;if(d.s==='cats'&&!d.upgrade)d.s='money';
 if(d.s==='money'&&!d.upgrade){const a=amtOf(d.kp);
  return blobs('blue','bottom',.9)+`<div class="mbody" style="padding-top:64px"><button class="back" data-a="obgo|link">‹ Back</button><div class="cap">Step 2 of 2</div><div class="title" style="margin-top:4px">How much money do you get?</div><div class="sub" style="margin-top:6px">Rough is fine.</div>
  <div class="row wrap" style="gap:8px;margin:14px 0 4px">${INCPRE.map(v=>`<button class="chip ${a===v?'on':''}" data-a="incamt|${v}">${money(v)}</button>`).join('')}</div><div style="margin:8px 0;display:flex;justify-content:center">${amtDots('₹'+(d.kp||'0'))}</div>${keypad('kp')}</div>
  <div class="mfoot" style="padding-bottom:46px"><button class="btn ${a?'':'d'}" data-a="${a?'obm|go':'x'}">Next</button><button class="btn q" data-a="obm|skip">Skip</button></div><div class="sdots">${[1,2].map(i=>`<i class="${i===2?'on':''}"></i>`).join('')}</div>`}
 return _onb16(F)};
H.obm=a=>{const d=obD(),kp=d.kp;if(!d.cats.length)d.cats=[...BASIC6];d.limits=false;toEnd(d);UI.toast=null;if(a[0]==='go'&&amtOf(kp))openFlow('inc',{step:1,kp});return false};

/* ---------- Pay: optional shop chips (so repeats and shop limits have data), limit note on the confirm ---------- */
const _pay16=FLOWS.pay;
FLOWS.pay=F=>{let h=_pay16(F);const d=F.d;
 if(F.step===0&&d.ask&&!d.oneoff){const ch=recentPayees().slice(0,3);if(ch.length)h=h.replace('<div style="height:90px"></div>',`<div class="cap" style="margin:16px 0 8px">Where?</div><div class="row wrap" style="gap:6px">${ch.map(p=>`<button class="chip ${d.payee===p?'on':''}" data-a="v16shop|${esc(p)}">${esc(p)}</button>`).join('')}</div><div style="height:90px"></div>`)}
 return h};
H.v16shop=a=>{const d=UI.flow.d;d.payee=d.payee===a[0]?null:a[0];if(d.payee){const m=S.memory[d.payee];if(m&&S.cats.some(c=>c.id===m)){d.oneoff=false;if(planned()){d.toK=m;d.target={type:'cat',id:m}}else d.cid=m}}};
function walletConfirm(F){const d=F.d,amt=amtOf(d.kp),W=Math.max(1,flexW()),L=Math.max(0,flexL()),over=Math.max(0,amt-L);
 const now=marksLeft(L,W),after=marksLeft(Math.max(0,L-amt),W),goes=now-after,col=(typeof paceHex==='function')?paceHex():SPEND,lowbal=S.flags.lowBalance&&S.p.mode==='upi';
 const warn=limWarn(d.target&&d.target.id,d.payee,amt);
 return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">${esc(tgtName(d.target))} · ${esc(d.payee||'Someone')}</div><div style="margin-top:6px"><span class="hero" style="font-size:44px">${money(amt)}</span></div>
 <div id="pgrid" style="margin:20px 8px 0">${over>0?gauge16(0,col,100):gauge16(after,col,now)}</div>
 <div style="margin:14px 0 4px;text-align:center"><span class="chipscale">${over>0?'All 100 marks go':goes<1?'Under 1 mark. Saved up quietly.':goes+(goes===1?' mark goes':' marks go')}</span></div>
 ${over>0?`<div class="title" style="font-size:30px;color:var(--amber);margin-top:12px;text-align:center">${money(over)} over.</div><div class="sub" style="text-align:center;margin-top:4px">More than you have left. Savings cover it.</div>`:`<div class="sub" style="text-align:center;margin-top:8px">${money(L-amt)} left after this.</div>`}
 ${warn?`<div class="banner" style="margin-top:14px"><span style="color:var(--amber);font-weight:700">${esc(warn)}</span></div>`:''}
 ${lowbal?`<div class="banner" style="margin-top:12px"><b style="color:var(--amber)">Your account shows ${money(40)}.</b> <span class="sub">This may not go through.</span></div>`:''}</div>
 <div class="mfoot"><div class="row" style="gap:10px"><button class="btn o" style="flex:1" data-a="pback">Back</button><button class="btn" style="flex:1.3" data-a="pgo">${S.p.mode==='manual'||d.paid?'Add':'Pay'} ${money(amt)}</button></div></div>`}

/* ---------- words ---------- */
ASKS.plan=()=>({cap:'Money',q:'Add your money?',hint:'Trickle works out what you can spend each week.',yes:'Add money',no:'Not now',ok:()=>{UI.popup=null;openFlow('inc',{step:0,kp:''});return 1}});
{const _po=ASKS.planoffer;ASKS.planoffer=()=>{const a=_po();a.hint='Want a weekly allowance?';a.yes='Add my money';return a}}
TIPDEF.plan={cap:'Your week',t:'Your week is set.',b:()=>`${money(S.W)} a week. Everything you log comes out of it.`,c:ACC.g};
TIPDEF.spending={cap:'Spending',t:'Where it went.',b:'Every spend has a category. Tap one to see more.',c:ACC.a};
TIPDEF.cat={cap:'A category',t:'Eight weeks of one category.',b:'The last bar is this week. A limit is optional.',c:ACC.g};

/* ---------- linked UPI: same two questions as adding money, then straight in ---------- */
function ubScreen(d,s){const {a,pct,sav,sp}=ubSplit(d);
 if(s==='ubal')return `<div class="mbody" style="padding-top:64px"><div class="cap">${money(a)} in your account</div><div class="title" style="margin-top:4px">How much will you save?</div>
  <div style="margin:22px 0 10px"><div class="sbar" style="height:34px"><i id="ub-bsav" style="flex:${Math.max(pct,.001)} 1 0;min-width:0;background:${boxBg(SAVE)};box-shadow:0 0 16px ${SAVE}33"></i><i id="ub-bsp" style="flex:${Math.max(100-pct,.001)} 1 0;min-width:0;background:${boxBg(SPEND)};box-shadow:0 0 16px ${SPEND}33"></i></div></div>
  <div class="row sp"><span><span class="cap" style="color:${SAVE}">Save · <span id="ub-pct">${pct}%</span></span><div id="ub-sav" class="h2">${money(sav)}</div></span><span style="text-align:right"><span class="cap" style="color:${SPEND}">Spend</span><div id="ub-sp" class="h2">${money(sp)}</div></span></div>
  <input type="range" min="0" max="100" step="5" value="${pct}" data-i="ubpct" style="margin:22px 0 6px"></div>`+obFoot(obBtn('Next','obgo|uend')+obBtn('Skip','ubskip','q'));
 const t0=day0(),end=snapEnd(d.end||presetEnd(PRESETS[1])),days=daysIn(t0,end),wk=Math.max(5,r5b(sp/days*7));d.end=end;
 return `<div class="mbody" style="padding-top:64px"><button class="back" data-a="obgo|ubal">‹ Back</button><div class="title" style="margin-top:8px">How many days should this money last?</div>
  <div class="row wrap" style="gap:8px;margin:18px 0 10px">${PRESETS.map((p,i)=>`<button class="chip ${!d.cal&&end===presetEnd(p)?'on':''}" data-a="incpre|${i}">${p[0]}</button>`).join('')}<button class="chip ${d.cal?'on':''}" data-a="ubcal">Pick a date</button></div>
  <div class="card allow"><div class="cap">Your weekly allowance</div><div style="display:flex;align-items:baseline;gap:8px;margin-top:6px"><span class="hero" style="font-size:44px">${money(wk)}</span><span class="sub">a week</span></div><div class="sm" style="margin-top:6px">${money(sp)} over ${days} days.</div></div>${d.cal?calHtml(d,t0,end):''}</div>`+obFoot(obBtn('Start my week','ubdone')+obBtn('Skip','ubskip','q'))}
HI.ubpct=(a,el)=>{const d=UI.flow.d;d.pct=+el.value;const {pct,sav,sp}=ubSplit(d);$('#ub-pct').textContent=pct+'%';$('#ub-sav').textContent=money(sav);$('#ub-sp').textContent=money(sp);$('#ub-bsav').style.flex=Math.max(pct,.001)+' 1 0';$('#ub-bsp').style.flex=Math.max(100-pct,.001)+' 1 0';return false};
{const _ubd=H.ubdone;H.ubdone=()=>{_ubd();const d=obD();if(!d.cats.length)d.cats=[...BASIC6];toEnd(d);return false}}

/* ---------- History: every spend shows its category ---------- */
spHist=function(){const full=UI.spAll,list=S.txns.slice(0,full?80:8);if(!list.length)return `<div class="title" style="font-size:22px">Nothing yet.</div>`;const groups={};list.forEach(t=>{const k=new Date(t.t).toDateString();(groups[k]=groups[k]||[]).push(t)});
 return Object.keys(groups).map(k=>{const d=new Date(k),dl=Math.floor((new Date(S.now.toDateString())-d)/DAY),name=dl===0?'Today':dl===1?'Yesterday':fmtDay(d),tot=groups[k].filter(isSp).reduce((a,t)=>a+t.amt,0);
  return `<div class="row sp" style="margin:16px 0 6px"><span class="cap">${name}</span>${tot?`<span class="cap">${money(tot)}</span>`:''}</div><div class="col" style="gap:6px">${groups[k].map(t=>{const cn=t.kind==='cat'?catName(t.ref):t.kind==='unsorted'?'Needs a category':t.kind==='fixed'?'Subscription':t.kind==='oneoff'?'One-off':'Goal';
   return `<button class="li" data-a="push|txn|${J({id:t.id}).replace(/\|/g,'')}"><span class="d" style="${t.kind==='unsorted'?`border:1.5px dashed ${AMBER};background:none`:`background:${t.kind==='fixed'?FIXC:t.kind==='goal'?SAVE:t.kind==='oneoff'?'#B48CFF':catColor2(t.ref)}`}"></span><span class="n" style="line-height:1.25">${esc(t.payee)}<span class="mut" style="display:block;font-weight:500;font-size:12px">${cn}</span></span><span class="a">${money(t.amt)}</span></button>`}).join('')}</div>`}).join('')+(!full&&S.txns.length>8?`<button class="li" style="margin-top:12px" data-a="spall"><span class="n mut">Show all</span><span class="t">›</span></button>`:'')};
