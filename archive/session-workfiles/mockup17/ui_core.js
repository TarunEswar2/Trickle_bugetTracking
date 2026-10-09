/* ===== helpers, visuals, router ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const J=o=>JSON.stringify(o).replace(/"/g,'&quot;');
const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const h2r=h=>{h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const r2h=a=>'#'+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('').toUpperCase();
const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)};const unlin=v=>255*(v<=.0031308?12.92*v:1.055*Math.pow(v,1/2.4)-.055);
function toOk(h){const [r,g,b]=h2r(h).map(lin);const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);return [.2104542553*l+.793617785*m-.0040720468*s,1.9779984951*l-2.428592205*m+.4505937099*s,.0259040371*l+.7827717662*m-.808675766*s]}
function fromOk([L,a,b]){const l=Math.pow(L+.3963377774*a+.2158037573*b,3),m=Math.pow(L-.1055613458*a-.0638541728*b,3),s=Math.pow(L-.0894841775*a-1.291485548*b,3);return r2h([unlin(4.0767416621*l-3.3077115913*m+.2309699292*s),unlin(-1.2684380046*l+2.6097574011*m-.3413193965*s),unlin(-.0041960863*l-.7034186147*m+1.707614701*s)])}
function shiftL(h,dl,dc=0){const [L,a,b]=toOk(h);const C=Math.hypot(a,b),H=Math.atan2(b,a);const C2=Math.max(0,C+dc);return fromOk([Math.min(1,Math.max(0,L+dl)),C2*Math.cos(H),C2*Math.sin(H)])}
const _dc={};const depth=h=>_dc[h]||(_dc[h]=[shiftL(h,.10,-.015),shiftL(h,-.11,0)]);
const boxBg=h=>h;
const BLOB={blue:{b:['#1d2b6e','#2c5c9a','#1f6f6a'],t:['#2c5c9a','#1f6f6a','#1d2b6e']},green:{b:['#0b4d3a','#6E9E87','#86B9A0'],t:['#0b4d3a','#6E9E87','#86B9A0']},amber:{b:['#5a3a12','#b0742a','#D3AB62'],t:['#5a3a12','#b0742a','#D3AB62']},violet:{b:['#262a78','#5a46a8','#8FA3B8'],t:['#262a78','#5a46a8','#8FA3B8']},teal:{b:['#0b4047','#1a8585','#86B9A0'],t:['#0b4047','#1a8585','#86B9A0']},rose:{b:['#4a2040','#9a4570','#D2A98A'],t:['#4a2040','#9a4570','#D2A98A']}};
const TABGLOW={income:'blue',spending:'rose',savings:'teal',insights:'violet'};
const FLOWGLOW={pay:'blue',inc:'blue',oneoff:'blue',money:'blue',move:'teal',subadd:'violet',incend:'blue'};
function blobs(kind,pos,op){return "";const c=(BLOB[kind]||BLOB.blue)[pos==='top'?'t':'b'];const o=op==null?.9:op;const y=pos==='top';
 return `<div class="blobs" style="opacity:${o}"><i style="width:550px;height:460px;left:-270px;${y?'top':'bottom'}:-120px;background:${c[0]}"></i><i style="width:520px;height:400px;left:-30px;${y?'top':'bottom'}:-180px;background:${c[1]}"></i><i style="width:380px;height:380px;right:-190px;${y?'top':'bottom'}:-60px;background:${c[2]}"></i></div>`}
function setGlow(kind){const g=document.getElementById('glow');if(!g)return;const k=kind||'';if(g.dataset.k!==k){g.dataset.k=k;g.innerHTML=k?blobs(k,'bottom',.55):''}}
const groundCss="#0F1215";
const meshCss=s=>{const [tl,tr,r,br,base]=s;return `radial-gradient(60% 60% at 18% 24%,rgba(255,255,255,.16),transparent 62%),linear-gradient(180deg,transparent 46%,${base} 100%),radial-gradient(55% 55% at 100% 56%,${r},transparent 72%),radial-gradient(60% 60% at 100% 0%,${tr},transparent 72%),radial-gradient(60% 60% at 0% 0%,${tl},transparent 72%),radial-gradient(60% 60% at 88% 100%,${br},transparent 72%),linear-gradient(90deg,${tl},${tr})`};
const MESH_GOAL=['#F6FC5A','#86B9A0','#42F5E1','#86B9A0','#0E1C17'],MESH_PAYDAY=['#FCDC45','#F6FC5A','#86B9A0','#86B9A0','#10201A'],MESH_DUSK=['#8FA3B8','#8FA3B8','#6C6FD1','#3E4B8A','#101322'];
function gridHtml(level,hex,ghost,gcol,o){o=o||{};let s='<div class="lg" '+(o.w?`style="width:${o.w}px;margin:0 auto"`:'')+'>';level=Math.max(0,Math.min(100,Math.round(level)));ghost=Math.max(0,Math.min(100-level,Math.round(ghost||0)));
 for(let i=0;i<100;i++){const row=Math.floor(i/10),c=i%10,k=(9-row)*10+c;
  if(k<level){const top=k>=level-10;s+=`<i style="background:${boxBg(hex)};box-shadow:${top?'0 0 14px '+hex+'66,':''}inset 0 1px 0 rgba(255,255,255,.35)"></i>`}
  else if(k<level+ghost)s+=`<i style="border:1.6px dashed ${gcol||hex};opacity:${o.fade||.9}"></i>`;
  else s+=`<i style="background:#171C25${o.dim?';opacity:.6':''}"></i>`}
 return s+'</div>'}
function multiGrid(parts,total,o){ // parts [{amt,color}] stacked from bottom
 o=o||{};const bounds=[];let cum=0;parts.forEach(p=>{cum+=p.amt;bounds.push(Math.round(cum/total*100))});let s='<div class="lg" '+(o.w?`style="width:${o.w}px;margin:0 auto"`:'')+'>';
 for(let i=0;i<100;i++){const row=Math.floor(i/10),c=i%10,k=(9-row)*10+c;const pi=bounds.findIndex(b=>k<b);s+=pi<0?'<i style="background:#171C25"></i>':`<i style="background:${boxBg(parts[pi].color)};box-shadow:inset 0 1px 0 rgba(255,255,255,.3)"></i>`}
 return s+'</div>'}
function ringSvg(r,w,pct,c1,c2,id,sz){const C=2*Math.PI*r,a=Math.max(.001,pct)*C;const ang=pct*360-90,x=sz/2+r*Math.cos(ang*Math.PI/180),y=sz/2+r*Math.sin(ang*Math.PI/180);
 return `<defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><filter id="b${id}"><feGaussianBlur stdDeviation="5"/></filter></defs><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="${w}"/>${pct>.02?`<circle cx="${x}" cy="${y}" r="${w*.9}" fill="${c1}" opacity=".7" filter="url(#b${id})"/>`:''}<circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="url(#g${id})" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${a} ${C}" transform="rotate(-90 ${sz/2} ${sz/2})"/>`}
function nestedRings(items,sz,tag){let o=`<svg viewBox="0 0 ${sz} ${sz}" width="${sz}" height="${sz}" role="img" aria-label="Spending rings">`;const n=Math.max(1,items.length),step=(sz/2-30)/Math.max(4.2,n-.2),w=Math.min(16,step*.66);items.forEach((it,i)=>{const [a,b]=depth(it.color);o+=ringSvg(sz/2-w/2-8-i*step,w,it.pct,a,b,tag+i,sz)});return o+'</svg>'}
function segRing(goals,sz,center){const act=goals.filter(g=>g.state!=='done');const tot=act.reduce((a,g)=>a+g.target,0)||1;const r=sz/2-22,C=2*Math.PI*r;let o=`<svg viewBox="0 0 ${sz} ${sz}" width="${sz}" height="${sz}" role="img" aria-label="Savings ring">`,start=0;
 act.forEach((g,i)=>{const share=g.target/tot,gap=act.length>1?.014:0,len=Math.max(.001,share-gap),frac=Math.min(1,g.saved/g.target);const col=GG[i%3],[a,b]=depth(col);
  o+=`<defs><linearGradient id="sg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="22" stroke-dasharray="${len*C} ${C}" stroke-dashoffset="${-start*C}" transform="rotate(-90 ${sz/2} ${sz/2})"/><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="url(#sg${i})" stroke-width="22" stroke-dasharray="${Math.max(0,len*frac*C)} ${C}" stroke-dashoffset="${-start*C}" transform="rotate(-90 ${sz/2} ${sz/2})"/>`;start+=share});
 return o+(center?`<text x="${sz/2}" y="${sz/2+10}" text-anchor="middle" fill="#F5F7FA" style="font-family:var(--display);font-weight:800;font-size:40px">${center}</text>`:'')+'</svg>'}
const wordLeft=(l,a)=>a<=0?'-':l<=0?'empty':l/a>.6?'plenty':l/a>.3?'some':'low';
const fmtDay=d=>d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
const fmtTime=d=>d.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true}).replace(' ','').toLowerCase().replace('am',' am').replace('pm',' pm');
const DOW=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
/* ===== state & router ===== */
let S=null,UI=null;const H={},HI={};const SCREENS={},SHEETS={},FLOWS={},POPUPS={};
function resetUI(){UI={tab:'home',stack:[],sheet:null,flow:null,popup:null,toast:null,inc:1,filter:{cat:'all',range:30},hot:{scale:'day',mode:'rupees'},viz:{}}}
function cur(){return UI.stack.length?UI.stack[UI.stack.length-1]:{id:UI.tab}}
function push(id,p){UI.stack.push({id,p:p||{}});render()}
function pop(){UI.stack.pop();render()}
function go(tab){const al=window.TABALIAS&&TABALIAS[tab];if(al){if(al[0]==='money')UI.mn=al[1];else UI.sp=al[1];tab=al[0]}UI.tab=tab;UI.stack=[];render();$('#view').scrollTop=0}
function say(t){UI.toast=t;render();clearTimeout(say._t);say._t=setTimeout(()=>{UI.toast=null;render()},2800)}
function openSheet(id,p){UI.sheet={id,p:p||{}};render()}
function closeSheet(){UI.sheet=null;render()}
function openFlow(id,p){UI.flow={id,step:(p&&p.step)||0,d:Object.assign({kp:'',tab:'b'},p||{})};render()}
function closeFlow(){UI.flow=null;render()}
function fitPhone(){const s=Math.min(1,(innerHeight-24)/844);const f=$('#frame');f.style.transform=`scale(${s})`;f.style.marginBottom=(-844*(1-s))+'px';f.style.width='390px';f.parentElement.style.minWidth=(390*s)+'px'}
function render(){
 if(!S)return;$('#clk').textContent=S.now.toLocaleDateString('en-IN',{weekday:'short'})+' '+fmtTime(S.now);
 const c=cur();const fn=SCREENS[c.id];$('#view').innerHTML=fn?fn(c.p||{}):'';
 setGlow(UI.tab==='home'?(typeof homeGlow==='function'?homeGlow():''):(TABGLOW[UI.tab]||''));
 $('#view').classList.toggle('snap',false);
 $('#tabbar').style.display=(UI.flow||UI.popup)?'none':'flex';
 const tabs=window.TABS||[['home','Home'],['income','Income'],['spending','Spending'],['savings','Savings'],['insights','Insights']];
 $('#tabbar').innerHTML=tabs.map(t=>`<button class="${UI.tab===t[0]?'on':''}" data-a="tab|${t[0]}">${t[1]}${t[0]==='home'&&(S.unsorted.length||S.pending.length)?'<span class="dot"></span>':''}${(t[0]==='income'||t[0]==='money')&&S.credits.length?'<span class="dot"></span>':''}</button>`).join('');
 let L='';
 if(UI.flow&&FLOWS[UI.flow.id]){let fh=FLOWS[UI.flow.id](UI.flow);if(fh.indexOf('class="blobs"')<0)fh=blobs(FLOWGLOW[UI.flow.id]||'blue','bottom',.6)+fh;L+=`<div class="modal" style="background:${UI.flow.bg||groundCss}">${fh}</div>`}
 if(UI.popup&&POPUPS[UI.popup.id]){let ph=POPUPS[UI.popup.id](UI.popup);if(UI.popup.id==='weekend'&&ph.indexOf('class="blobs"')<0)ph=blobs('blue','bottom',.6)+ph;L+=`<div class="modal" style="background:${UI.popup.bg||groundCss}">${ph}</div>`}
 if(UI.sheet&&SHEETS[UI.sheet.id])L+=`<div class="scrim" data-a="closesheet"></div><div class="sheet">${SHEETS[UI.sheet.id](UI.sheet.p)}</div>`;
 if(UI.toast)L+=`<div class="toast">${esc(UI.toast)}</div>`;
 const lk=(UI.sheet?'s'+UI.sheet.id:'')+(UI.flow?'f'+UI.flow.id:'')+(UI.popup?'p'+UI.popup.id:'');const same=lk===UI._lk;UI._lk=lk;
 const sc=[...document.querySelectorAll('#layer .mbody,#layer .sheet,#layer [data-sc]')].map(e=>e.scrollTop);
 $('#layer').className=same?'still':'';$('#layer').innerHTML=L;
 if(same)[...document.querySelectorAll('#layer .mbody,#layer .sheet,#layer [data-sc]')].forEach((e,i)=>{if(sc[i])e.scrollTop=sc[i]});
 if(window.afterRender)window.afterRender();
 if(window.renderPanel)renderPanel()}
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el)return;const [n,...a]=el.dataset.a.split('|');if(H[n]){e.preventDefault();const r=H[n](a,el,e);if(r!==false)render()}});
document.addEventListener('input',e=>{const el=e.target.closest('[data-i]');if(!el)return;const [n,...a]=el.dataset.i.split('|');if(HI[n]){const r=HI[n](a,el,e);if(r!==false)render()}});
H.tab=a=>{go(a[0]);return false};H.back=()=>{pop();return false};H.closesheet=()=>{UI.sheet=null};
addEventListener('resize',fitPhone);
/* keypad */
function keypad(key){const ks=['1','2','3','4','5','6','7','8','9','','0','⌫'];return `<div class="kp">${ks.map(k=>k?`<button data-a="k|${key}|${k}">${k}</button>`:'<span></span>').join('')}</div>`}
H.k=(a)=>{const [key,k]=a;const o=UI.flow?UI.flow.d:UI.sheet.p;let v=o[key]||'';if(k==='⌫')v=v.slice(0,-1);else if(v.length<7)v=(v==='0'?'':v)+k;o[key]=v};
const amtOf=v=>parseInt(v||'0',10)||0;
