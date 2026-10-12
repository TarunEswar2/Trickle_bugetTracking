/* ===== v23 (11 Oct): v21's look with what v22 learned. Plan and the take/leave table: docs/claude/v23_plan.md ===== */

/* ---------- toast with Undo (from v22) ---------- */
function toast23(text,undo){UI.t23={text,undo};clearTimeout(toast23._t);toast23._t=setTimeout(()=>{UI.t23=null;render()},4500)}
H.undo23=()=>{const t=UI.t23;if(t&&t.undo)t.undo();UI.t23=null;clearTimeout(toast23._t);say('Undone.')};

/* ---------- balance (from v22): a starting number, plus money added, minus spends since ---------- */
function bal23(){if(S.b23==null){S.b23=S.p&&S.p.bal!=null?S.p.bal:null;S.b23ids=new Set(S.txns.map(t=>t.id));S.b23add=0}if(S.b23==null)return null;
 const out=S.txns.filter(t=>!S.b23ids.has(t.id)&&(isSp(t)||t.kind==='fixed')).reduce((a,t)=>a+t.amt,0);return Math.max(0,S.b23+(S.b23add||0)-out)}
function balAdd23(a){if(bal23()==null){S.b23=a;S.b23ids=new Set(S.txns.map(t=>t.id));S.b23add=0}else S.b23add=(S.b23add||0)+a}
incomeRow17=function(){if(!planned()&&bal23()==null)return '';const b=bal23();
 return `<div class="bal23"><button class="l" data-a="push|incomes"><span class="sm">Balance</span><b>${b==null?'Not added yet':money(b)}</b></button><button class="add" data-a="addmoney17">${PLUS21}<span>Add</span></button></div>`};
/* greeting by time of day */
{const _h=SCREENS.home;SCREENS.home=p=>_h(p).replace(/<b>Hi ([^<]*)<\/b>/,(m,n)=>{const h=S.now.getHours();return `<b>Good ${h<12?'morning':h<17?'afternoon':'evening'}, ${n}</b>`})}

/* ---------- Add to balance and onboarding: one question per screen (from v22) ---------- */
function weekRows23(n){let w=weeks20(n).map(x=>Object.assign({},x));if(w.length>1&&w[0].d<=2){w=[{s:w[0].s,d:w[0].d+w[1].d,amt:w[0].amt+w[1].amt,fold:1}].concat(w.slice(2))}
 const lab=r=>{const e=r.s+(r.d-1)*DAY,a=new Date(r.s),b=new Date(e);return r.fold?'Today to next Sunday':`${a.getDate()}${a.getMonth()===b.getMonth()?'':' '+a.toLocaleDateString('en-IN',{month:'short'})}–${b.getDate()} ${b.toLocaleDateString('en-IN',{month:'short'})}`};
 const show=w.slice(0,6);return `<div class="wr23">${show.map(r=>`<div class="r"><span>${lab(r)}<small>${r.d>=7&&!r.fold?'a week':r.d+' days'}</small></span><i style="flex:0 0 ${Math.round(Math.min(1,r.d/7)*96)}px"></i><b>${money(r.amt)}</b></div>`).join('')}${w.length>6?`<div class="sm" style="margin-top:6px">and ${w.length-6} more week${w.length-6>1?'s':''} like this</div>`:''}</div>`}
const steps23=i=>`<div class="steps">${[0,1,2].map(k=>`<i class="${k<=i?'on':''}"></i>`).join('')}</div>`;
{const _inc=FLOWS.inc;FLOWS.inc=F=>{if(F.step===0)return _inc(F).replace(/<div class="steps">[\s\S]*?<\/div>/,steps23(0));
 const d=F.d;if(!d.end)setWeeks20(d,5);const n=planNums18(d),k=wkCount20(n.end),fin=planned()?'Update my week':'Start my week';
 if(F.step===1)return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button>${steps23(1)}
  <div class="title" style="margin-top:14px">Keep some aside?</div><div class="sub" style="margin-top:6px">Out of ${money(n.a)}. It goes to Savings.</div>
  <div class="row wrap" style="gap:8px;margin-top:20px">${[[0,'None'],[10,'10%'],[20,'20%'],[30,'30%']].map(([v,l])=>`<button class="chip ${n.pct===v&&d.savX==null?'on':''}" data-a="pct23|${v}">${l}</button>`).join('')}</div>
  <div class="blk20" style="margin-top:18px"><input type="range" class="split18" min="0" max="100" step="1" value="${n.pct}" data-i="incpct23" style="--p:${n.pct}%" aria-label="How much to keep aside">
  <div class="row sp"><button class="tapamt18" data-a="incedit|sav"><span class="k20"><i style="background:${SAVE}"></i>Keep aside</span><b id="inc-sav">${money(n.sav)}</b></button><button class="tapamt18 r" data-a="incedit|sp"><span class="k20"><i style="background:${SPEND}"></i>To spend</span><b id="inc-sp">${money(n.sp)}</b></button></div></div></div>
  <div class="mfoot"><div class="col" style="gap:8px"><button class="btn" data-a="inc23next">Next</button><button class="btn q" data-a="incdone">Just add it, no plan</button></div></div>`;
 return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button>${steps23(2)}
  <div class="title" style="margin-top:14px">How long should ${money(n.sp)} last?</div>
  ${d.cal?`<div class="sm" style="margin:14px 0 8px">Until Sunday ${fmtDate(n.end)}</div>${calHtml(d,n.t0,n.end)}`:`<div class="stp20" style="margin-top:18px"><button data-a="incwk|-1" aria-label="One week less" ${k<=1?'disabled':''}>−</button><div><b>${k} week${k>1?'s':''}</b><small>until Sun ${shortD(n.end)}</small></div><button data-a="incwk|1" aria-label="One more week">+</button></div>`}
  <button class="lnk" style="font-size:14px" data-a="inccal20">${d.cal?'Count in weeks instead':'Pick a date on a calendar'}</button>
  <div class="res20" style="margin-top:18px">${res20(n)}</div>${weekRows23(n)}<div style="height:150px"></div></div>
  <div class="mfoot"><button class="btn" data-a="incfinish">${fin}</button></div>`}}
H.pct23=a=>{const d=UI.flow.d;d.pct=+a[0];d.savX=null};
H.inc23next=()=>{UI.flow.step=2;const m=document.querySelector('#layer .mbody');if(m)m.scrollTop=0};
HI.incpct23=(a,el)=>{const d=UI.flow.d;d.pct=+el.value;d.savX=null;const n=planNums18(d);el.style.setProperty('--p',n.pct+'%');$('#inc-sav').textContent=money(n.sav);$('#inc-sp').textContent=money(n.sp);document.querySelectorAll('[data-a^="pct23|"]').forEach(b=>b.classList.toggle('on',+b.dataset.a.split('|')[1]===n.pct));return false};
/* the money added counts toward the balance */
{const _f=H.incfinish;H.incfinish=a=>{const v=amtOf(UI.flow.d.kp);const r=_f(a);if(v>0)balAdd23(v);return r}}
{const _d=H.incdone;H.incdone=a=>{const v=amtOf(UI.flow.d.kp);const r=_d(a);if(v>0)balAdd23(v);return r}}
/* onboarding: the balance question sets the starting balance */
{const _o=H.obm;H.obm=a=>{const d=UI.flow&&UI.flow.d;const v=d?amtOf(d.kp):0;const r=_o(a);if(a[0]==='go'&&v>0){S.b23=null;S.p.bal=0;bal23();balAdd23(v)}return r}}

/* ---------- Enter manually: one screen, "Add ₹X spend", toast with Undo (from v22) ---------- */
function recentCats23(){const seen=[];S.txns.forEach(t=>{if(t.kind==='cat'&&!seen.includes(t.ref)&&S.cats.some(c=>c.id===t.ref))seen.push(t.ref)});S.cats.forEach(c=>{if(!seen.includes(c.id))seen.push(c.id)});return seen}
FLOWS.man23=F=>{const d=F.d,amt=amtOf(d.kp);if(!d.cid)d.cid=recentCats23()[0];const ok=amt>0&&d.cid,ids=recentCats23(),show=d.more?ids:ids.slice(0,6);
 const W=Math.max(1,flexW()),L=Math.max(0,flexL());
 return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="sm" style="margin-top:6px">Enter manually</div><div class="title" style="margin-top:2px">How much?</div>
 <div class="hero" style="font-size:46px;margin:8px 0 2px;${amt?'':'color:var(--ink3)'}">${amt?money(amt):'₹0'}</div>${keypad('kp')}
 <input class="inp23" placeholder="Where? (optional)" value="${esc(d.where||'')}" data-i="where23" aria-label="Where">
 <div class="lab20" style="margin-top:16px">For what?</div><div class="row wrap" style="gap:8px">${show.map(id=>`<button class="chip ${d.cid===id?'on':''}" data-a="cid23|${id}"><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${catCol(catIdx(id))};margin-right:7px"></i>${esc(catName(id))}</button>`).join('')}${ids.length>6?`<button class="chip" data-a="more23">${d.more?'Fewer':'More'}</button>`:''}</div>
 ${planned()&&amt?`<div style="margin-top:18px">${left20(L,W,Math.min(amt,L),ST20[hsNow20()].c,1)}</div>`:''}<div style="height:140px"></div></div>
 <div class="mfoot"><button class="btn ${ok?'':'d'}" data-a="${ok?'mango23':'x'}">${amt?`Add ${money(amt)} spend`:'Type the amount'}</button><div class="sm" style="text-align:center;margin-top:8px">For cash, or a payment already made.</div></div>`};
H.cid23=a=>{UI.flow.d.cid=a[0]};H.more23=()=>{UI.flow.d.more=!UI.flow.d.more};HI.where23=(a,el)=>{UI.flow.d.where=el.value;return false};
H.paybyhand=()=>{openFlow('man23',{kp:'',where:''});return false};
H.mango23=()=>{const d=UI.flow.d,amt=amtOf(d.kp);const r=doPay(S,{amt,target:{type:'cat',id:d.cid},payee:d.where||catName(d.cid),paid:true});const t=r&&r.txn;if(t)t.via='manual';
 if(typeof tipQ==='function'&&window.TIPS!==false)tipQ('paid');closeFlow();UI.tab='home';UI.stack=[];toast23(`${money(amt)} spent on ${catName(d.cid)}.`,()=>{if(!t)return;const sd=(t.src&&t.src.savingsDetail)||{};Object.keys(sd).forEach(k=>{if(k==='free')S.free+=sd[k];else{const g=S.goals.find(x=>x.id===k);if(g)g.saved+=sd[k]}});removeTxn(S,t.id)});render();return false};

/* ---------- Savings: "New goal" takes the bottom bar; goal icon from a savings category (Tarun) ---------- */
const GCAT23=[['phone','Phone'],['laptop','Laptop'],['trip','Trip'],['emergenc','Emergency'],['bike','Bike'],['course','Course'],['gift','Gift'],['concert','Concert'],['other','Other']];
{const _gp=gpic21;gpic21=(g,sz)=>{if(g.cat23&&g.cat23!=='other')return _gp({name:g.cat23},sz);if(g.cat23==='other')return _gp({name:'zz'},sz);return _gp(g,sz)}}
SHEETS.addgoal=p=>{if(p.name==null)p.name='';if(p.amt==null)p.amt='';const pv={name:p.name,cat23:p.cat};
 return `<div class="h2">New goal</div>
 <div class="lab20" style="margin-top:16px">What kind?</div><div class="gcat23">${GCAT23.map(([k,l])=>`<button class="${p.cat===k?'on':''}" data-a="gcat23|${k}"><span>${gpic21({name:k==='other'?'zz':k},22)}</span><small>${l}</small></button>`).join('')}</div>
 <div class="lab20" style="margin-top:16px">Name it</div><input class="inp23" placeholder="e.g. New phone" value="${esc(p.name)}" data-i="gname23" maxlength="40" aria-label="Goal name">
 <div class="lab20" style="margin-top:16px;margin-bottom:2px">How much is it?</div><div class="sm" style="margin-bottom:8px">Skip if you’re not sure.</div>
 <input class="inp23" inputmode="numeric" placeholder="₹ 5,000" value="${esc(p.amt)}" data-i="gamt23" aria-label="Goal amount">
 <button class="btn ${p.name.trim()?'':'d'}" id="gsave23" style="margin-top:18px" data-a="${p.name.trim()?'gsave23':'x'}">Save goal</button>`};
H.gcat23=a=>{const p=UI.sheet.p;p.cat=a[0]};
HI.gname23=(a,el)=>{const p=UI.sheet.p;p.name=el.value;const b=document.getElementById('gsave23');if(b){const on=!!p.name.trim();b.classList.toggle('d',!on);b.dataset.a=on?'gsave23':'x'}return false};
HI.gamt23=(a,el)=>{UI.sheet.p.amt=el.value.replace(/[^0-9]/g,'');return false};
H.gsave23=()=>{const p=UI.sheet.p,name=p.name.trim();if(!name)return false;addGoal(S,{name,target:amtOf(p.amt)||0,byMonths:0});const g=S.goals[S.goals.length-1];if(g&&p.cat)g.cat23=p.cat;UI.sheet=null;say(`${name} added.`);if(S.free>=1&&g)openSheet('fundgoal',{id:g.id});return false};
H.v15goal=()=>{openSheet('addgoal',{});return false};
H.efund=()=>{openSheet('addgoal',{cat:'emergenc',name:''});return false};
{const _s=SCREENS.savings;SCREENS.savings=()=>{let h=_s().replace(/<button class="gadd21"[\s\S]*?<\/button>/,'');
 /* like-for-like with last month, only from day 15 and only when better (from v22) */
 const M=savingsSeries().M,thisM=M[11]||0,prev=M[10]||0,now=S.now,dim=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(),td=now.getDate(),same=Math.round(prev*td/dim/10)*10,df=thisM-same;
 if(td>=15&&prev>0&&df>=10)h=h.replace('saved in total</div>',`saved in total</div><div class="up23">↑ ${money(df)} more than ${new Date(now.getFullYear(),now.getMonth()-1,1).toLocaleDateString('en-IN',{month:'long'})} by this date</div>`);
 return h}}
{const _a=window.afterRender;window.afterRender=()=>{if(_a)_a();const el=document.getElementById('cta17');
 if(el&&UI.tab==='savings'&&!(UI.stack&&UI.stack.length))el.innerHTML=`<div class="row cta21"><button class="btn" data-a="v15goal">${PLUS21}<span>New goal</span></button></div>`;
 /* toast with Undo */
 const old=document.getElementById('toast23');if(old)old.remove();if(UI.t23){const t=document.createElement('div');t.id='toast23';t.innerHTML=`<span>${esc(UI.t23.text)}</span>${UI.t23.undo?'<button data-a="undo23">Undo</button>':''}`;document.getElementById('phone').appendChild(t)}
 }}

/* ---------- keep blocks whole above the bottom buttons (from v22) ---------- */
function keep23(){const v=document.getElementById('view'),cta=document.getElementById('cta17');if(!v||!cta||UI.flow||(UI.stack&&UI.stack.length))return;
 const ph=document.getElementById('phone'),z=ph.getBoundingClientRect().width/ph.offsetWidth||1,vt=v.getBoundingClientRect().top,st=v.scrollTop;if(st>0)return;
 const fold=(cta.getBoundingClientRect().top-vt)/z-8,below=(cta.getBoundingClientRect().bottom-vt)/z+18;
 const root=v.firstElementChild&&v.children.length===1?v.firstElementChild:v;
 for(const el of root.children){const r=el.getBoundingClientRect(),t0=(r.top-vt)/z,b0=(r.bottom-vt)/z;if(b0-t0>40&&t0<fold&&b0>fold&&t0>fold-260){let tg=el;const pv=el.previousElementSibling;if(pv&&pv.classList.contains('sec20'))tg=pv;tg.style.marginTop=(parseFloat(getComputedStyle(tg).marginTop)+(below-(tg.getBoundingClientRect().top-vt)/z))+'px';break}}}

/* ---------- tips: one plain sentence; tapping the highlighted thing ends the tip (from v22) ---------- */
TIPDEF.income={cap:'',t:'This is what you can spend this week.',b:'',c:ACC.b};
TIPDEF.plan={cap:'',t:'Each dot is a day. Today is the big one.',b:'',c:ACC.g};
TIPDEF.paid={cap:'',t:'Logged. The bar got shorter.',b:'',c:ACC.g};
TIPDEF.spending={cap:'',t:'Tap a colour to see that category.',b:'',c:ACC.a};
TIPAT21.plan='.hero17 .wk21';
document.addEventListener('click',e=>{const c=document.getElementById('coach21');if(!c||!UI.sheet||UI.sheet.id!=='tip')return;const k=UI.sheet.p.k,sel=TIPAT21[k];if(!sel)return;const tg=document.querySelector('#view '+sel);if(!tg)return;const r=tg.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom&&!e.target.closest('.bub21')){UI.sheet=null;render()}},true);

/* scan path: the amount screen says who you are paying, not "Enter manually" */
{const _p=FLOWS.pay;FLOWS.pay=F=>{const d=F.d;let h=_p(F);if(d.scan&&d.scanned&&F.step===0)h=h.replace('>Enter manually<',`>Paying ${esc(d.payee||'the shop')}<`);return h}}
