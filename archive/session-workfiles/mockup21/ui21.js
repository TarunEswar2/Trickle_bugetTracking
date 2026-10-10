/* ===== v21 (10 Oct): from the second test round. Plan and research: docs/claude/v21_plan.md =====
   P1 picture first; P2 one answer per card; P3 speak like a friend; P4 personal; P5 colour = day tone / tappable / data shapes;
   P6 few tips that point at the real thing; P7 say where you are in a flow. */

/* ---------- small symbols ---------- */
const QR21=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2.5v2.5M20.5 14.5v6h-6M17 20.5v-1"/></svg>`;
const PLUS21=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`;

/* ---------- Home hero: the week as 7 dots, each coloured by how that day went (F2, F4) ---------- */
const DAYC21={g:'#6FD3AE',y:'#E3CF5E',a:'#F09A52'};
const DAYW21={g:'An easy day',y:'About an even day',a:'A heavy day'};
function daySpend21(k){const f=wk0()+k*DAY;return txIn(f,f+DAY).filter(isSp).reduce((a,t)=>a+t.amt,0)}
const tone21=(v,even)=>{const r=v/Math.max(1,even);return r<=.8?'g':r<=1.2?'y':'a'};
const before21=k=>{const fd=S.firstDay?+new Date(S.firstDay):0;if(!fd)return false;const d=new Date(fd);d.setHours(0,0,0,0);return wk0()+(k+1)*DAY<=d.getTime()};
function week21(W){const td=dowIdx(S.now.getTime()),even=W/7;
 return `<div class="wk21" role="group" aria-label="This week, day by day">${['M','T','W','T','F','S','S'].map((l,k)=>{const fut=k>td||before21(k),v=fut?0:daySpend21(k),t=fut?'':tone21(v,even);
  return `<button class="d21${fut?' fut':''}${k===td?' td':''}${UI.dsel===k?' sel':''}" data-a="${fut?'x':'dsel21|'+k}" aria-label="${FULLDAY[k]}${fut?'':', '+money(v)+' spent'}"><i style="${fut?'':'background:'+DAYC21[t]}"></i><small>${k===td?'Today':l}</small></button>`}).join('')}</div>`}
H.dsel21=a=>{const k=+a[0];UI.dsel=UI.dsel===k?null:k};
function dayLine21(W,L){const td=dowIdx(S.now.getTime()),dl=Math.max(1,7-td);
 if(UI.dsel!=null&&UI.dsel<=td){const k=UI.dsel,v=daySpend21(k),t=tone21(v,W/7);return `<span class="dl21"><i style="background:${DAYC21[t]}"></i>${k===td?'Today':FULLDAY[k]} · ${money(v)} spent · ${DAYW21[t].toLowerCase()}</span>`}
 return L>0?`<span class="dl21 mut">${money(L/dl)} a day to last the week</span>`:`<span class="dl21 mut">New money on Monday</span>`}
heroHome17=function(){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hs=hsNow20(),s=ST20[hs];
 return `<div class="hero17 h20 h21" style="--st:${s.c}"><div class="row sp" style="align-items:center">${chip20(hs)}<button class="chip q20" data-a="gridhow" aria-label="How this works">?</button></div>
 <div class="hero" style="font-size:66px;line-height:1;margin-top:16px">${money(L)}</div>
 <div style="font-size:17px;color:var(--ink2);margin-top:6px">of ${money(W)} left this week</div>
 <div data-a="gridhow" style="margin-top:18px">${bar20(L,W,{col:s.c})}</div>
 <div style="margin-top:20px">${week21(W)}</div><div style="margin-top:12px;min-height:20px">${dayLine21(W,L)}</div></div>`};

/* Home greets the person by name (P4) */
{const _h=SCREENS.home;SCREENS.home=p=>_h(p).replace(/<span class="cap" style="margin:0;color:var\(--ink2\)">[^<]*<\/span>/,`<span class="hi21"><b>Hi ${esc(((S.p&&S.p.name)||'there').split(' ')[0])}</b><small>${fmtDay(S.now)}</small></span>`)}

/* ---------- Insights: the insight is the big words, the chart is small (F3, P1) ---------- */
function tiles21(){const aw=new Set(awareList17().map(x=>x.k)),h=statsHour(),d=statsDay(),m=statsMonth(),rep=shopList()[0],cmp=cmpNow(),out=[];
 if(h.n>=8)out.push({k:'hour',big:bandLabel(h.pk),sm:'is when you spend most',viz:mini17(h.vals,h.pk),a:'insgo|hour'});
 if(d.n>=8)out.push({k:'day',big:FULLDAY[d.pk]+'s',sm:`your biggest day, about ${money(d.vals[d.pk])}`,viz:mini17(d.vals,d.pk),a:'insgo|day'});
 if(m.ok)out.push({k:'month',big:PHASE[m.pk],sm:'is when you spend most',viz:mini17(m.vals,m.pk),a:'insgo|month'});
 if(rep&&rep.n>=3)out.push({k:'rep',big:rep.payee,sm:`${rep.n} visits in 30 days`,viz:`<span class="vis21">${Array.from({length:Math.min(rep.n,14)},()=>'<i></i>').join('')}</span>`,a:'push|prep'});
 if(cmp)out.push({k:'cmp',big:cmp==='About the same'?'Same as':cmp,sm:cmp==='About the same'?'last week, so far':'than last week, so far',viz:'',a:'push|ptrend'});
 out.forEach(x=>x.now=aw.has(x.k));out.sort((a,b)=>b.now-a.now);
 if(!out.length)out.push({k:'soon',big:'Soon',sm:'Your patterns show up after a week of spends',viz:'',a:'x'});return out}
carousel17=function(){const c=tiles21();
 return sec20('Insights',`<button class="lnk" data-a="push|insall">See all ›</button>`)+`<div class="car17" id="car17">${c.map(x=>`<button class="in20 in21" data-a="${x.a}">${x.now?'<span class="now21">Now</span>':''}${x.viz?`<span class="mn">${x.viz}</span>`:''}<b class="bg21">${esc(x.big)}</b><span class="sb">${esc(x.sm)}</span></button>`).join('')}</div>${c.length>1?`<div class="dots17" id="dots17">${c.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}`};

/* ---------- Suggestions: plain words for savings (F12) ---------- */
{const _c=cards17;cards17=function(){return _c().map(x=>{if(x.tag!=='Savings')return x;const free=Math.floor(S.free);
  return free>=1?Object.assign({},x,{t:`${money(free)} isn't in a goal yet`,sub:'Give it a job: emergencies, or something you want.',cta:'Pick a goal'}):Object.assign({},x,{t:'Keep some money for emergencies',sub:'Like a phone repair or a trip home.',cta:'Start'})})}}
{const _ag=SHEETS.addgoal;SHEETS.addgoal=p=>_ag(p).replace(/It just grows\. A common target is about 3 months of spending, [^<]*\./,'It just grows. Add to it when you can.').replace('>Emergency fund</button>','>Emergencies</button>')}

/* ---------- Bottom buttons: Scan & pay, Add to balance (F6, F7) ---------- */
{const _a=window.afterRender;window.afterRender=()=>{if(_a)_a();const el=document.getElementById('cta17');
 if(el&&!el.querySelector('.cta21'))el.innerHTML=`<div class="row cta21" style="gap:10px"><button class="btn" data-a="${scanOn()?'payscan':'pay'}">${QR21}<span>Scan &amp; pay</span></button><button class="btn q" data-a="addmoney17">${PLUS21}<span>Add to balance</span></button></div>`;
 /* same words everywhere else */
 document.querySelectorAll('#phone button').forEach(b=>{if(b.children.length)return;const t=b.textContent.trim();if(t==='Add money'||t==='+ Add money')b.textContent='Add to balance';else if(t==='Log expense')b.textContent='Scan & pay'})}}

/* scan screen: "Enter manually" is a full button; the confirm button says Pay ₹ */
{const _p=FLOWS.pay;FLOWS.pay=F=>{let h=_p(F);const d=F.d;
 if(d.scan&&!d.scanned)h=h.replace('No QR? Add by hand','Enter manually').replace('Trickle only helps you pay. It never sees your bank.','Point your camera at the shop’s QR. No QR? Enter it yourself.');
 h=h.replace('>Log expense<','>Enter manually<');
 if(d.scan&&d.scanned&&F.step===1)h=h.replace('>Open UPI app<',`>Pay ${money(amtOf(d.kp))}<`);
 return h}}

/* ---------- Add to balance (F7) ---------- */
{const _i=FLOWS.inc;FLOWS.inc=F=>{let h=_i(F);if(F.step===0)h=h.replace('How much money came in?','How much are you adding?').replace(/(<div class="title"[^>]*>How much are you adding\?)/,'<div class="sm" style="margin-top:14px">Add to balance</div>$1').replace('Pocket money, salary, anything. Next, you choose what to keep aside.','Pocket money, salary, a gift. Then you choose what to keep aside.');return h}}

/* ---------- Onboarding: a picture of the idea first, then the balance (F8, F9) ---------- */
function idea21(){const B=10000,sv=2000,sp=8000,wk=1860;
 return `<div class="idea21">
  <div class="ir21 a1"><span class="lb">Your balance</span><span class="blk" style="flex:1;background:#3A3F47"><b>${money(B)}</b></span></div>
  <div class="ir21 a2"><span class="lb">Splits into</span><span class="blk" style="flex:${sv};background:${SAVE}"><b>${money(sv)}</b><small>savings</small></span><span class="blk" style="flex:${sp};background:${SPEND}"><b>${money(sp)}</b><small>to spend</small></span></div>
  <div class="ir21 a3"><span class="lb">Spending, by week</span>${[1,2,3,4].map(()=>`<span class="blk wk" style="flex:1;background:color-mix(in srgb,${SPEND} 72%,#1C1E22)"></span>`).join('')}<span class="blk wk" style="flex:.3;background:color-mix(in srgb,${SPEND} 72%,#1C1E22)"></span></div>
  <div class="ir21 a4 res"><span class="lb">So each week you get</span><span class="big">${money(wk)}</span></div></div>`}
{const _o=FLOWS.onb;FLOWS.onb=F=>{const s=F.d.s;
 if(s==='title')return `<div class="mbody" style="padding-top:70px"><div style="font-family:var(--display);font-weight:800;font-size:30px;color:var(--accent);letter-spacing:-.02em">Trickle</div><div class="title" style="margin-top:6px;font-size:30px;line-height:1.15">Make your money last till the end of the month.</div>${idea21()}</div>`+obFoot(obBtn('Get started','obgo|link')+obBtn('Just start tracking','obquick','q'));
 return _o(F).replace('How much money do you have now?','What’s your bank balance?').replace('>Pocket money, salary, anything. Rough is fine.<','>Type it in. Trickle never sees your bank.<')}}

/* ---------- Pagination: "Step 1 of 2" with dots (F11) ---------- */
{const _a=window.afterRender;window.afterRender=()=>{if(_a)_a();document.querySelectorAll('#phone .steps').forEach(s=>{if(s.dataset.p21)return;s.dataset.p21=1;const i=[...s.querySelectorAll('i')],on=i.filter(x=>x.classList.contains('on')).length;i.forEach((x,k)=>x.classList.toggle('cur',k===on-1));const lab=document.createElement('span');lab.className='pg21';lab.textContent=`Step ${on} of ${i.length}`;s.appendChild(lab)})}}

/* ---------- Savings: this month is the hero; goals are personal cards with a picture (F5) ---------- */
const GPIC21=[[/concert|music|gig|show/,'<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'],[/emergenc|surprise|safety/,'<path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"/><path d="M12 12v6a2 2 0 0 0 4 0"/>'],[/trip|travel|goa|holiday|home/,'<path d="M2.5 13.5l19-8-6 16-3.5-6.5z"/><path d="M12 15l9.5-9.5"/>'],[/laptop|computer|mac/,'<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>'],[/phone|mobile/,'<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>'],[/bike|cycle|scooty/,'<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-7h5l3 7M10 9l2.5 7"/>'],[/course|study|book|exam/,'<path d="M4 4.5h6a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4zM20 4.5h-6a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2h6z"/>'],[/gift|birthday/,'<rect x="3.5" y="9" width="17" height="11.5" rx="1.5"/><path d="M12 9v11.5M3.5 13h17M12 9c-2-4-6-4-6-1.5S10 9 12 9c2 0 6-.5 6-1.5S14 5 12 9"/>']];
const GSTAR21='<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>';
const GCOL21=['#8E9CF2','#F2A6C8','#7FD1C7','#F2C46D','#B6A4F2','#9CC9F2'];
const gpic21=(g,sz)=>{const n=(g.name||'').toLowerCase(),p=(GPIC21.find(x=>x[0].test(n))||[0,GSTAR21])[1];return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`};
const gcol21=g=>GCOL21[Math.max(0,S.goals.indexOf(g))%GCOL21.length];
function goalCard21(g){const c=gcol21(g),p=g.target>0?Math.min(1,g.saved/g.target):null;
 return `<button class="gc21" data-a="push|goal|${J({id:g.id})}" style="--gc:${c}"><span class="pic">${gpic21(g,34)}</span><span class="bd"><b>${esc(g.name==='Emergency fund'?'Emergencies':g.name)}</b>
  <span class="am">${p!=null?`${money(g.saved)} <em>of ${money(g.target)}</em>`:`${money(g.saved)} <em>so far</em>`}</span>
  ${p!=null?`<span class="gb"><i style="width:${Math.max(3,p*100).toFixed(1)}%"></i></span><span class="eta">${g.state==='reached'?'You did it':'Ready '+goalEta(g)}</span>`:`<span class="eta">It just grows</span>`}</span></button>`}
SCREENS.savings=()=>{const act=activeGoals(),free=Math.floor(S.free),T=savedTotal(S),M=savingsSeries().M.slice(-6),thisM=M[M.length-1]||0,mx=Math.max(1,...M);
 const ml=i=>new Date(S.now.getFullYear(),S.now.getMonth()-(5-i),1).toLocaleDateString('en-IN',{month:'short'});
 const hero=`<div class="sv21"><div class="sm">Saved this month</div><div class="hero" style="font-size:52px;line-height:1.05;margin-top:4px">${money(thisM)}</div>
  <div class="mb21">${M.map((v,i)=>`<span><i style="height:${Math.max(4,Math.round(v/mx*54))}px" class="${i===5?'on':''}"></i><small>${ml(i)}</small></span>`).join('')}</div>
  <div class="sm" style="margin-top:12px">${money(T)} saved in total</div></div>`;
 const nudge=free>=1?`<div class="nd21"><b>${money(free)} isn’t in a goal yet</b><div class="row" style="gap:8px;margin-top:12px"><button class="btn s q" data-a="efund">Emergencies</button><button class="btn s q" data-a="${act.length?'choosegoal':'v15goal'}">${act.length?'Pick a goal':'Something I want'}</button></div></div>`:'';
 return `<div class="row sp" style="align-items:center;margin-bottom:14px"><div class="title">Savings</div><button class="icon18" data-a="settings" aria-label="Settings">${window.GEAR18}</button></div>${hero}${nudge}
 ${sec20('Your goals')}<div class="col" style="gap:12px">${act.map(goalCard21).join('')}<button class="gadd21" data-a="v15goal">${PLUS21}<span>New goal</span></button></div>`};

/* ---------- Tips point at the real thing, in a speech bubble (F10, P6) ---------- */
const TIPAT21={paid:'.hero17 .bar20w',plan:'.hero17',income:'.hero17 .hero',spending:'.dn19',insights:'#car17',cat:'.viz17',unsorted:'.panelC'};
{const _t=SHEETS.tip;SHEETS.tip=p=>`<div class="tip21-src" data-k="${p.k}">${_t(p)}</div>`}
H.tipsoff21=()=>{window.TIPS=false;UI.sheet=null};
{const _a=window.afterRender;window.afterRender=()=>{if(_a)_a();const old=document.getElementById('coach21');if(old)old.remove();
 const src=document.querySelector('#layer .tip21-src');if(!src)return;const ph=document.getElementById('phone'),sh=src.closest('.sheet');if(sh){sh.style.visibility='hidden';const sc=sh.previousElementSibling;if(sc&&sc.classList.contains('scrim'))sc.style.display='none'}
 const k=src.dataset.k,d=TIPDEF[k]||{},b=typeof d.b==='function'?d.b():d.b,tg=TIPAT21[k]?document.querySelector('#view '+TIPAT21[k]):null,pr=ph.getBoundingClientRect(),z=pr.width/ph.offsetWidth||1;
 const done=Object.keys(TS).length,all=Math.max(done,Math.min(3,done+TQ.length));
 const c=document.createElement('div');c.id='coach21';let hole='',pos='top:50%;transform:translateY(-50%)',arrow='';
 if(tg){const r=tg.getBoundingClientRect(),x=(r.left-pr.left)/z-8,y=(r.top-pr.top)/z-8,w=r.width/z+16,h=r.height/z+16;hole=`<div class="hole21" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"></div>`;
  const below=y+h+170<ph.offsetHeight;pos=below?`top:${y+h+14}px`:`top:${Math.max(60,y-14-150)}px`;arrow=`<i class="ar21 ${below?'up':'dn'}" style="left:${Math.min(ph.offsetWidth-60,Math.max(40,x+w/2))-22}px"></i>`}
 c.innerHTML=`${hole||'<div class="dim21"></div>'}<div class="bub21" style="${pos}">${arrow}<b>${esc(d.t||'')}</b>${b?`<div class="sm" style="margin-top:4px">${esc(b)}</div>`:''}<div class="row sp" style="margin-top:12px;align-items:center"><button class="lnk" data-a="tipsoff21">Skip tips</button><span class="row" style="gap:10px;align-items:center"><span class="sm">${Math.min(all,done)} of ${all}</span><button class="btn s" style="width:auto;padding:0 18px" data-a="closesheet">Got it</button></span></div></div>`;
 ph.appendChild(c)}}
/* plain tips (P3) */
TIPDEF.income={cap:'',t:'This is what’s left this week',b:'Every spend comes off it.',c:ACC.b};
TIPDEF.plan={cap:'',t:'Your week is set',b:()=>`${money(S.W)} to spend each week. Each dot is a day.`,c:ACC.g};
TIPDEF.paid={cap:'',t:'Logged. The bar got shorter',b:'Today’s dot shows how heavy today is.',c:ACC.g};
TIPDEF.spending={cap:'',t:'Where your money went',b:'Tap a colour to see that category.',c:ACC.a};
