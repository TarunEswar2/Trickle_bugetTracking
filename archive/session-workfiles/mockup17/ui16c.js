/* ===== v16.2: calmer visuals. Savings as a story (it grows), goals with milestones, gentle motion ===== */
const GOALCOLS=['#7CC8FF','#B79CFF','#5FE3B8','#FFD27A','#FF9EC4'];
const goalCol=g=>GOALCOLS[Math.max(0,S.goals.indexOf(g))%GOALCOLS.length];

/* ---------- savings over the last 12 months ---------- */
function savingsSeries(){const M=Array(12).fill(0);S.goals.forEach(g=>(g.hist||[]).forEach((v,k)=>{M[k]+=v}));const T=savedTotal(S),ser=Array(12);ser[11]=T;for(let k=10;k>=0;k--)ser[k]=Math.max(0,ser[k+1]-M[k+1]);return {ser,M,T}}
function areaSvg(vals,col){const W=346,H=176,pl=10,pr=16,pt=20,pb=30,n=vals.length;const mx=Math.max(...vals),mn=Math.min(...vals),span=Math.max(1,mx-mn);const lo=mn-span*.15,hi=mx+span*.12;
 const x=i=>pl+i*(W-pl-pr)/(n-1),y=v=>pt+(H-pt-pb)*(1-(v-lo)/Math.max(1,hi-lo));const pts=vals.map((v,i)=>[x(i),y(v)]);const ml=i=>new Date(S.now.getFullYear(),S.now.getMonth()-(n-1-i),1).toLocaleDateString('en-IN',{month:'short'})[0];
 const grid=[0,1,2].map(k=>`<line x1="${pl}" x2="${W-pr}" y1="${(pt+(H-pt-pb)*k/2).toFixed(1)}" y2="${(pt+(H-pt-pb)*k/2).toFixed(1)}" stroke="rgba(255,255,255,.06)"/>`).join('');const e=pts[n-1];
 return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Savings over 12 months"><defs><linearGradient id="sa1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".34"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient><filter id="sag"><feGaussianBlur stdDeviation="4"/></filter></defs>${grid}
 <path d="${smooth(pts)} L${e[0].toFixed(1)},${H-pb} L${pts[0][0].toFixed(1)},${H-pb} Z" fill="url(#sa1)"/><path d="${smooth(pts)}" fill="none" stroke="${col}" stroke-width="7" opacity=".35" filter="url(#sag)"/><path d="${smooth(pts)}" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round"/>
 <circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="10" fill="${col}" opacity=".22"/><circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="5" fill="${col}" stroke="#070A12" stroke-width="2.5"/>
 ${vals.map((_,i)=>`<text x="${x(i).toFixed(1)}" y="${H-9}" text-anchor="middle" fill="${i===n-1?'#F4F6FA':'#8F9AAB'}" font-size="12.5" font-weight="${i===n-1?700:500}">${ml(i)}</text>`).join('')}</svg>`}

function mnSav(){const act=S.goals.filter(g=>g.state!=='done');
 if(!act.length&&S.free<=0)return `<div class="title" style="margin-top:6px">Saving for something?</div><div class="sub" style="margin:8px 0 22px">Open a piggy bank. Name it, then put money in.</div><button class="btn" data-a="v15goal">Add a piggy bank</button>`;
 const {ser,M,T}=savingsSeries(),grew=ser.filter((v,i)=>i&&v!==ser[i-1]).length>=2,inGoals=act.reduce((a,g)=>a+(g.target>0?Math.min(g.saved,g.target):g.saved),0),free=Math.max(0,S.free),thisM=M[11];
 return `<div><span class="hero" style="font-size:46px">${money(T)}</span><div class="sub" style="margin-top:6px;font-size:16px">saved${thisM>0?` · up ${money(thisM)} this month`:''}</div></div>
 ${piggyPanel17()}
 <div class="sm" style="margin:${grew?'4px':'14px'} 2px 26px">${money(inGoals)} in piggy banks${free>0?` · ${money(free)} not in one yet`:''}</div>
 <div class="col" style="gap:10px">${act.map(g=>{const col=goalCol(g),p=g.target>0?Math.min(1,g.saved/g.target):0;if(!(g.target>0))return `<button class="li" style="display:block;padding:14px 16px" data-a="push|goal|${J({id:g.id})}"><span class="row sp"><span class="n" style="flex:none;font-size:16px">${piggySvg(Math.min(1,g.saved/Math.max(1,efTarget())),col,34)}<span style="display:inline-block;width:8px"></span>${esc(g.name)}</span><span class="hero" style="font-size:20px">${money(g.saved)}</span></span><span class="sm" style="display:block;margin-top:6px">No set amount</span></button>`;return `<button class="li gc" style="--glow:${col}66" data-a="push|goal|${J({id:g.id})}"><span class="row sp" style="margin-bottom:12px"><span class="n" style="flex:none;font-size:16px">${piggySvg(p,col,34)}<span style="display:inline-block;width:8px"></span>${esc(g.name)}</span><span class="pct" style="color:${col}">${Math.round(p*100)}%</span></span>${battery(g.saved,g.target,{col,sm:true,ms:true})}<span class="row sp sm" style="margin-top:10px"><span>${money(g.saved)} of ${money(g.target)}</span><span>${g.state==='reached'?'Reached':'Ready '+goalEta(g)}</span></span></button>`}).join('')}
 <button class="btn q" data-a="v15goal">+ Add a piggy bank</button></div>`}

/* ---------- a goal ---------- */
SCREENS.goal=({id})=>{const g=S.goals.find(x=>x.id===id);if(!g)return '';const col=goalCol(g),p=Math.min(1,g.saved/g.target),need=goalNeeded(g),togo=Math.max(0,g.target-g.saved);
 return `<button class="back" data-a="back">‹ Money</button><div class="row" style="gap:10px;align-items:center"><i style="width:14px;height:14px;border-radius:50%;background:${col};box-shadow:0 0 14px ${col}99"></i><div class="title" style="font-size:30px">${esc(g.name)}</div></div>
 <div class="sub" style="margin-top:6px">${g.state==='reached'?'You saved it all.':'Ready '+goalEta(g)+'.'}</div>
 <div style="margin-top:20px"><span class="hero" style="font-size:42px">${money(g.saved)}</span><span class="sub" style="margin-left:8px">of ${money(g.target)} · ${Math.round(p*100)}%</span></div>
 <div style="margin:18px 2px 8px;--glow:${col}66">${battery(Math.min(g.saved,g.target),g.target,{col,ms:true})}</div>
 <div class="sm" style="margin:2px 2px 22px">${togo>0?money(togo)+' to go'+(need?' · about '+money(need)+' a month keeps you on track':''):'Nothing left to save.'}</div>
 <div class="cap" style="margin-bottom:8px">Added each month</div>${weeksBars((g.hist||[]).map(v=>Math.max(0,v)),col)}<div class="row sp sm" style="margin:8px 0 22px"><span>A year ago</span><span>This month</span></div>
 <div class="col" style="gap:10px">${g.state==='reached'?`<button class="btn g" data-a="gdone|${g.id}">Mark done</button>`:`<button class="btn" data-a="movefrom|${g.id}">Add money</button>`}<button class="btn q" data-a="sheet|goaledit|${J({id:g.id})}">Edit</button></div>`};

/* ---------- welcome ---------- */
{const _o=FLOWS.onb;FLOWS.onb=F=>{const h=_o(F);return F.d.s==='title'?h.replace('Spend calm.</div>','Spend calm.</div><div style="font-size:16px;color:var(--ink2);margin-top:12px;font-weight:500">A calmer way to see your money.</div>'):h}}
