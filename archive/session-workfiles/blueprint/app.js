const $=s=>document.querySelector(s),esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const TABS=[["overview","Overview"],["model","Money model"],["screens","Screens"],["flows","Flows"],["rules","Rules"],["decisions","Decisions"],["gaps","Gaps closed"],["next","Next"]];
const st={tab:"overview",id:null,group:"All",q:"",dstat:"All",dpre:"All",dq:"",flow:"ONB"};
const decStatus=d=>d.s==='delegated'?'delegated':'Tarun';
const tagFor=id=>`<a class="tag ${id.startsWith('D-')?'del':''}" data-go="decisions/${id}">${id}</a>`;
const flowTag=id=>{const f=FLOWS.find(x=>x.id===id);return f?`<a class="tag" data-go="flows/${id}">${esc(f.n)}</a>`:''};
const boardTags=b=>(b||[]).map(k=>BOARDS[k]?`<a class="tag" href="${BOARDS[k][1]}" target="_blank" rel="noopener">${esc(BOARDS[k][0])} ↗</a>`:'').join('');
function nav(){ $('#tabs').innerHTML=TABS.map(t=>`<button class="tab" role="tab" aria-selected="${st.tab===t[0]}" data-tab="${t[0]}">${t[1]}</button>`).join('') }
function overview(){
  const nT=DECISIONS.filter(d=>decStatus(d)==='Tarun').length,nD=DECISIONS.length-nT;
  const byG=GROUPS.map(g=>[g,SCREENS.filter(s=>s.g===g)]);
  return `<h2>Overview</h2><p class="lead">Trickle is a UPI-based budgeting app for students. Two facts hold it up: income splits into spending and savings, and if you do not spend, you save more. Tracking is a UPI account link or manual entry (and an Excel/CSV import placeholder). There is no SMS anywhere.</p>
  <div class="kpi"><div><b>${SCREENS.length}</b>screens</div><div><b>${FLOWS.length}</b>flows</div><div><b>${nT}</b>your decisions</div><div><b>${nD}</b>delegated decisions</div><div><b>${GAPS.length}</b>gaps closed</div></div>
  <h3 style="margin-top:28px">The screen map</h3><p class="small" style="margin-bottom:10px">Five tabs, a Pay button, and a gear for Settings. Click any screen.</p>
  <div class="map">${byG.map(([g,l])=>`<div class="col"><h4>${g}</h4>${l.map(s=>`<a data-go="screens/${s.id}">${s.id} · ${esc(s.n)}</a>`).join('')}</div>`).join('')}</div>
  <div class="grid g2" style="margin-top:28px">
   <div class="card"><h3>The seven principles</h3><ol style="margin:6px 0 0;padding-left:1.2em;color:var(--ink2)"><li>Awareness, not restriction.</li><li>Show money at the moment it matters.</li><li>Gentle on open: Home never leads with a big or bad number.</li><li>Zero-effort tracking: UPI link or quick manual entry.</li><li>Mental limits over rigid budgets.</li><li>Savings is what unspent money becomes.</li><li>Patterns over raw history.</li></ol></div>
   <div class="card"><h3>The students every screen is tested against</h3><p class="small">Vaishak (₹3k, 2 categories, a month in), Gautham (₹4k, week 1), Tarun (₹6k), Yash (₹9k, 7 categories), Harsh (₹12k, 18), Nishad (₹25k, 12). Month 1 and month 6.</p><h3 style="margin-top:12px">Hard rules</h3><p class="small">No SMS. Tarun decides (and delegated this phase). One visualisation per screen. Progressive disclosure. No red. No coins or dots as a money unit.</p></div>
   <div class="card"><h3>How the money moves</h3><p class="small">Income splits into <b>budget</b> and <b>savings</b>. Budget = fixed reserve + categories + buffer. Savings = goals + free savings. A payment crumbles out of a category (or a goal); if it is over, the buffer pays first, then the other categories, then savings. At week end what is unspent goes to goals or to next week.</p></div>
   <div class="card"><h3>How to read this file</h3><p class="small"><span class="tag">Tarun</span> is a decision you made. <span class="tag del">delegated</span> is one I made when you asked me to fill gaps. Every screen and flow lists the decisions behind it, and the boards you already have are linked.</p></div>
  </div>`}
function model(){
  return `<h2>Money model</h2><p class="lead">What the app stores, and the rules that keep every rupee in exactly one place.</p>
  <h3 style="margin-top:20px">Data</h3><div class="tw"><table><thead><tr><th>Entity</th><th>Fields</th><th>Notes</th></tr></thead><tbody>${ENTITIES.map(e=>`<tr><td><b>${e.n}</b></td><td class="mono">${esc(e.f)}</td><td>${esc(e.note)}</td></tr>`).join('')}</tbody></table></div>
  <h3 style="margin-top:28px">Rules</h3><div class="grid g2">${MODEL_RULES.map(r=>`<div class="card"><h3>${esc(r.t)}</h3><p class="small" style="color:var(--ink2)">${esc(r.b)}</p></div>`).join('')}</div>`}
function screens(){
  const list=SCREENS.filter(s=>(st.group==='All'||s.g===st.group)&&(!st.q||JSON.stringify(s).toLowerCase().includes(st.q.toLowerCase())));
  return `<h2>Screens</h2><p class="lead">${SCREENS.length} screens and states. Each says what it is for, what it shows, the visual form, what a tap does, its amounts policy, its states, and the decisions and flows behind it.</p>
  <div class="row" style="margin:14px 0"><input type="search" id="sq" placeholder="Search screens" value="${esc(st.q)}" aria-label="Search screens">${['All',...GROUPS].map(g=>`<button class="chip" data-grp="${g}" aria-pressed="${st.group===g}">${g}</button>`).join('')}</div>
  <div class="grid g2">${list.map(s=>`<div class="card screen" id="${s.id}"><div class="top"><span class="tag id">${s.id}</span><h3>${esc(s.n)}</h3><span class="small">${s.g}</span></div><p>${esc(s.p)}</p>
  <dl class="dl"><dt>Shows</dt><dd>${esc(s.s)}</dd><dt>Form</dt><dd>${esc(s.v)}</dd><dt>Taps</dt><dd>${esc(s.t)}</dd><dt>Amounts</dt><dd>${esc(s.a)}</dd><dt>States</dt><dd>${esc(s.st)}</dd></dl>
  <div style="margin-top:6px">${(s.r||[]).map(tagFor).join('')}${(s.f||[]).map(flowTag).join('')}${boardTags(s.b)}</div></div>`).join('')||'<p class="muted">Nothing matches.</p>'}</div>`}
function flows(){
  const f=FLOWS.find(x=>x.id===st.flow)||FLOWS[0];
  return `<h2>Flows</h2><p class="lead">${FLOWS.length} flows, from first launch to deleting your data. Screen chips jump to the screen.</p>
  <div class="flows" style="margin-top:14px"><div class="flist">${FLOWS.map(x=>`<button class="chip" data-flow="${x.id}" aria-pressed="${x.id===f.id}">${esc(x.n)}</button>`).join('')}</div>
  <div class="card" id="flow-${f.id}"><div class="row"><h3>${esc(f.n)}</h3><span class="tag">${esc(f.who)}</span></div><p class="small" style="margin-top:4px"><b>Starts when:</b> ${esc(f.trig)}</p>
  <div class="steps">${f.steps.map((x,i)=>`<div class="step"><div class="n">${i+1}</div><div class="t">${x[0]?`<a class="tag id" data-go="screens/${x[0]}">${x[0]}</a> `:''}${esc(x[1])}</div></div>`).join('')}</div>
  ${f.br.length?`<h4 style="margin-top:6px">Branches and edge cases</h4><ul style="margin:6px 0 0;padding-left:1.2em;color:var(--ink2)">${f.br.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>`:''}
  <p class="note"><b>Outcome:</b> ${esc(f.out)}</p><div>${(f.r||[]).map(tagFor).join('')}</div></div></div>`}
function rules(){
  const sw=(c,n)=>`<div class="row"><span class="sw" style="background:${c}"></span>${n} <span class="small mono">${c}</span></div>`;
  return `<h2>Rules</h2><p class="lead">The rules every screen follows.</p>
  <h3 style="margin-top:18px">What each screen shows up front, on tap, and never</h3><div class="tw"><table><thead><tr><th>Screen</th><th>At a glance</th><th>One tap</th><th>Never up front</th><th>Why</th></tr></thead><tbody>${AMOUNT_RULES.map(r=>`<tr>${r.map((c,i)=>`<td>${i===0?'<b>'+esc(c)+'</b>':esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <h3 style="margin-top:28px">The visual forms</h3><div class="tw"><table><thead><tr><th>Form</th><th>Used for</th><th>From</th></tr></thead><tbody>${FORMS.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <div class="grid g2" style="margin-top:28px">
   <div class="card"><h3>Colour</h3>${sw('#f08a3c','Spending orange')}${sw('#62dcb4','Savings green (shades #3fae8c, #9be8cf)')}${sw('#e3a43f','Amber: over, unspent, taken out')}${sw('#5aa9ff','Category 1')}${sw('#b48cff','Category 2')}${sw('#ff7eb6','Category 3')}${sw('#f2d65b','Category 4')}${sw('#4fd1e6','Category 5')}${sw('#f6b27c','All other categories')}${sw('#9aa4b0','Buffer (grey)')}${sw('#8d7a66','Fixed bills (taupe)')}<p class="small" style="margin-top:6px">No red. Ground #0b0d10, tiles #1b2026.</p></div>
   <div class="card"><h3>Words</h3><p class="small">Calm, short, never a scold. 'Plenty / some / low / empty', not percentages. 'Gone over', not 'overspent'. No 'late' in setup. Notifications carry no amounts. A failure says nothing was taken from your budget.</p><h3 style="margin-top:12px">Motion</h3><p class="small">Crumble before you pay; amber boxes turn green at week end; liquid level slides; a celebration once per goal. Reduced motion shows the finished state.</p><h3 style="margin-top:12px">Access</h3><p class="small">Names accompany every colour; boxes have labels; 44-point targets; amounts readable in words (D-33).</p></div>
  </div>`}
function decisions(){
  const pre=['All','V','O','F','D','X','C'];
  const l=DECISIONS.filter(d=>(st.dstat==='All'||decStatus(d)===st.dstat)&&(st.dpre==='All'||d.i.startsWith(st.dpre+'-')||(st.dpre==='C'&&d.i.startsWith('C-')))&&(!st.dq||(d.i+' '+d.t).toLowerCase().includes(st.dq.toLowerCase())));
  return `<h2>Decisions</h2><p class="lead">${DECISIONS.length} decisions in order of the log. Filter by who made them.</p>
  <div class="row" style="margin:14px 0"><input type="search" id="dq" placeholder="Search decisions" value="${esc(st.dq)}" aria-label="Search decisions">${['All','Tarun','delegated'].map(x=>`<button class="chip" data-dstat="${x}" aria-pressed="${st.dstat===x}">${x}</button>`).join('')}${pre.map(x=>`<button class="chip" data-dpre="${x}" aria-pressed="${st.dpre===x}">${x==='All'?'All kinds':x+'-'}</button>`).join('')}</div>
  <div class="tw"><table><thead><tr><th style="width:90px">ID</th><th>Decision</th><th style="width:100px">Status</th></tr></thead><tbody>${l.map(d=>`<tr id="${d.i}"><td><b>${d.i}</b></td><td>${esc(d.t)}</td><td><span class="tag ${decStatus(d)==='delegated'?'del':''}">${decStatus(d)}</span></td></tr>`).join('')}</tbody></table></div>`}
function gaps(){return `<h2>Gaps closed</h2><p class="lead">${GAPS.length} logic gaps and conflicts I found, and how each was closed. The last column says what only real students can answer.</p><div class="tw"><table><thead><tr><th>Area</th><th>The gap</th><th>How it is closed</th><th>Test with users</th></tr></thead><tbody>${GAPS.map(g=>`<tr>${g.map((c,i)=>`<td>${i===0?'<b>'+esc(c)+'</b>':esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function next(){return `<h2>Next</h2><div class="grid g2" style="margin-top:12px"><div class="card"><h3>Stages</h3>${NEXT.stages.map(x=>`<p style="margin:8px 0"><b>${esc(x[0])}</b><br><span class="small" style="color:var(--ink2)">${esc(x[1])}</span></p>`).join('')}</div><div class="card"><h3>What the visualisation stage designs</h3><ul style="margin:6px 0 0;padding-left:1.2em;color:var(--ink2)">${NEXT.viz.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="card"><h3>What only real students can answer</h3><ul style="margin:6px 0 0;padding-left:1.2em;color:var(--ink2)">${NEXT.tests.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>`}
function render(){nav();const m={overview,model,screens,flows,rules,decisions,gaps,next};$('#main').innerHTML=`<section class="panel on">${m[st.tab]()}</section>`;
  if(st.id){const el=document.getElementById(st.id)||document.getElementById('flow-'+st.id);if(el){el.scrollIntoView({block:'center'});el.style.outline='2px solid var(--accent)';setTimeout(()=>el.style.outline='',1800)}st.id=null}
  const sq=$('#sq');if(sq)sq.oninput=e=>{st.q=e.target.value;const p=e.target.selectionStart;render();const n=$('#sq');n.focus();n.setSelectionRange(p,p)};
  const dq=$('#dq');if(dq)dq.oninput=e=>{st.dq=e.target.value;const p=e.target.selectionStart;render();const n=$('#dq');n.focus();n.setSelectionRange(p,p)}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-tab],[data-go],[data-grp],[data-flow],[data-dstat],[data-dpre]');if(!t)return;
  if(t.dataset.tab){st.tab=t.dataset.tab;history.replaceState(null,'','#'+st.tab);window.scrollTo(0,0)}
  else if(t.dataset.go){const [tab,id]=t.dataset.go.split('/');st.tab=tab;st.id=id;if(tab==='flows')st.flow=id;if(tab==='screens'){st.group='All';st.q=''}if(tab==='decisions'){st.dstat='All';st.dpre='All';st.dq=''}history.replaceState(null,'','#'+t.dataset.go)}
  else if(t.dataset.grp)st.group=t.dataset.grp;else if(t.dataset.flow){st.flow=t.dataset.flow;history.replaceState(null,'','#flows/'+st.flow)}
  else if(t.dataset.dstat)st.dstat=t.dataset.dstat;else if(t.dataset.dpre)st.dpre=t.dataset.dpre;
  render()});
(function(){const h=location.hash.slice(1).split('/');if(h[0]&&TABS.some(t=>t[0]===h[0])){st.tab=h[0];if(h[1]){st.id=h[1];if(h[0]==='flows')st.flow=h[1]}}render()})();
