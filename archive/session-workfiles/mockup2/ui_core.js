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
const boxBg=h=>`radial-gradient(circle at 35% 28%,rgba(255,255,255,.5),rgba(255,255,255,0) 42%),${h}`;
/* ---- 5x7 dot-matrix font ---- */
const GL={'0':'01110,10001,10011,10101,11001,10001,01110','1':'00100,01100,00100,00100,00100,00100,01110','2':'01110,10001,00001,00010,00100,01000,11111','3':'11110,00001,00001,01110,00001,00001,11110','4':'00010,00110,01010,10010,11111,00010,00010','5':'11111,10000,11110,00001,00001,10001,01110','6':'00110,01000,10000,11110,10001,10001,01110','7':'11111,00001,00010,00100,01000,01000,01000','8':'01110,10001,10001,01110,10001,10001,01110','9':'01110,10001,10001,01111,00001,00010,01100',
'A':'01110,10001,10001,11111,10001,10001,10001','B':'11110,10001,10001,11110,10001,10001,11110','C':'01110,10001,10000,10000,10000,10001,01110','D':'11110,10001,10001,10001,10001,10001,11110','E':'11111,10000,10000,11110,10000,10000,11111','F':'11111,10000,10000,11110,10000,10000,10000','G':'01110,10001,10000,10111,10001,10001,01111','H':'10001,10001,10001,11111,10001,10001,10001','I':'01110,00100,00100,00100,00100,00100,01110','J':'00111,00010,00010,00010,00010,10010,01100','K':'10001,10010,10100,11000,10100,10010,10001','L':'10000,10000,10000,10000,10000,10000,11111','M':'10001,11011,10101,10101,10001,10001,10001','N':'10001,11001,10101,10011,10001,10001,10001','O':'01110,10001,10001,10001,10001,10001,01110','P':'11110,10001,10001,11110,10000,10000,10000','Q':'01110,10001,10001,10001,10101,10010,01101','R':'11110,10001,10001,11110,10100,10010,10001','S':'01111,10000,10000,01110,00001,00001,11110','T':'11111,00100,00100,00100,00100,00100,00100','U':'10001,10001,10001,10001,10001,10001,01110','V':'10001,10001,10001,10001,10001,01010,00100','W':'10001,10001,10001,10101,10101,11011,10001','X':'10001,10001,01010,00100,01010,10001,10001','Y':'10001,10001,01010,00100,00100,00100,00100','Z':'11111,00001,00010,00100,01000,10000,11111',
'.':'00000,00000,00000,00000,00000,01100,01100',':':'00000,01100,01100,00000,01100,01100,00000','-':'00000,00000,00000,11111,00000,00000,00000','%':'11001,11010,00010,00100,01000,01011,10011','₹':'11111,00010,11111,00010,00100,01000,10000','/':'00001,00010,00010,00100,01000,01000,10000',',':'00000,00000,00000,00000,01100,00100,01000','+':'00000,00100,00100,11111,00100,00100,00000','×':'00000,10001,01010,00100,01010,10001,00000','!':'00100,00100,00100,00100,00100,00000,00100',' ':'00000,00000,00000,00000,00000,00000,00000'};
let _dt=0;
function dotText(str,o){o=o||{};const d=o.dot||5,g=o.gap||1.6,on=o.color||'#FF6A1A',off=o.off===undefined?'#1a1b1d':o.off,glow=o.glow!==false;const cell=d+g;const chars=String(str).toUpperCase().split('');const W=chars.length*6*cell,Hh=7*cell;
 let s=`<svg width="${W-cell}" height="${Hh-g}" viewBox="0 0 ${W-cell} ${Hh-g}" role="img" aria-label="${esc(str)}" style="display:block;background:none;box-shadow:none;border-radius:0">`;if(glow)s+=`<defs><filter id="dg${++_dt}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${d*.35}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
 chars.forEach((ch,ci)=>{const rows=(GL[ch]||GL[' ']).split(',');rows.forEach((r,ri)=>{r.split('').forEach((b,bi)=>{const cx=(ci*6+bi)*cell+d/2,cy=ri*cell+d/2;if(b==='1')s+=`<circle cx="${cx}" cy="${cy}" r="${d/2}" fill="${on}" ${glow?`filter="url(#dg${_dt})"`:''}/>`;else if(off)s+=`<circle cx="${cx}" cy="${cy}" r="${d/2}" fill="${off}"/>`})})});
 return s+'</svg>'}
function grille(sz,lit,color){const cx=sz/2;let s=`<svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" role="img" aria-label="Speaker grille of dots" style="background:none;box-shadow:none">`;const n=15,step=sz/(n+1);for(let y=0;y<n;y++)for(let x=0;x<n;x++){const px=(x+1)*step,py=(y+1)*step;if(Math.hypot(px-cx,py-cx)>sz/2-step*.8)continue;const on=lit===undefined?true:(Math.hypot(px-cx,py-cx)/(sz/2))<=lit;s+=`<circle cx="${px}" cy="${py}" r="${step*.3}" fill="${on?color||'#0E0E10':'rgba(0,0,0,.18)'}"/>`}return s+'</svg>'}
const fitDots=(str,col,W,max)=>{const n=String(str).length;const d=Math.min(max||10,W/(n*6*1.24));return dotText(str,{dot:d,gap:d*.24,color:col||'#FF8A3D'})};
const amtDots=(str,col)=>fitDots(str,col,330,10);
const _old=(str,col)=>{const n=String(str).length;const d=n<=5?10:n<=7?7.4:5.6;return dotText(str,{dot:d,gap:d*.24,color:col||'#FF8A3D'})};
const groundCss='#0E0E10';
const meshCss=s=>"#2F9D5A";
const MESH_GOAL=['#F6FC5A','#3CEFA3','#42F5E1','#00A55F','#0E1C17'],MESH_PAYDAY=['#FCDC45','#F6FC5A','#3CEFA3','#00A55F','#10201A'],MESH_DUSK=['#B48CFF','#5AA9FF','#6C6FD1','#3E4B8A','#101322'];
function gridHtml(level,hex,ghost,gcol,o){o=o||{};let s='<div class="lg" '+(o.w?`style="width:${o.w}px;margin:0 auto"`:'')+'>';level=Math.max(0,Math.min(100,Math.round(level)));ghost=Math.max(0,Math.min(100-level,Math.round(ghost||0)));
 for(let i=0;i<100;i++){const row=Math.floor(i/10),c=i%10,k=(9-row)*10+c;
  if(k<level){const top=k>=level-10;s+=`<i style="background:${boxBg(hex)};box-shadow:0 0 ${top?10:5}px ${hex}88"></i>`}
  else if(k<level+ghost)s+=`<i style="border:1.6px dashed ${gcol||hex};opacity:${o.fade||.9}"></i>`;
  else s+=`<i style="background:#17181a;box-shadow:inset 0 1px 2px rgba(0,0,0,.9)${o.dim?';opacity:.6':''}"></i>`}
 return s+'</div>'}
function multiGrid(parts,total,o){ // parts [{amt,color}] stacked from bottom
 o=o||{};const bounds=[];let cum=0;parts.forEach(p=>{cum+=p.amt;bounds.push(Math.round(cum/total*100))});let s='<div class="lg" '+(o.w?`style="width:${o.w}px;margin:0 auto"`:'')+'>';
 for(let i=0;i<100;i++){const row=Math.floor(i/10),c=i%10,k=(9-row)*10+c;const pi=bounds.findIndex(b=>k<b);s+=pi<0?'<i style="background:#17181a"></i>':`<i style="background:${boxBg(parts[pi].color)};box-shadow:inset 0 1px 0 rgba(255,255,255,.3)"></i>`}
 return s+'</div>'}
function ringSvg(r,w,pct,c1,c2,id,sz){const C=2*Math.PI*r,n=Math.max(16,Math.round(C/(w*.5))),sg=C/n,d=`${(sg*.64).toFixed(2)} ${(sg*.36).toFixed(2)}`,a=Math.max(.001,pct)*C,m=sz/2;
 return `<defs><mask id="m${id}"><circle cx="${m}" cy="${m}" r="${r}" fill="none" stroke="#fff" stroke-width="${w+4}" stroke-dasharray="${a} ${C}"/></mask></defs><g transform="rotate(-90 ${m} ${m})"><circle cx="${m}" cy="${m}" r="${r}" fill="none" stroke="#26272a" stroke-width="${w}" stroke-dasharray="${d}"/><g mask="url(#m${id})"><circle cx="${m}" cy="${m}" r="${r}" fill="none" stroke="${c1}" stroke-width="${w}" stroke-dasharray="${d}"/></g></g>`}
function nestedRings(items,sz,tag){let o=`<svg viewBox="0 0 ${sz} ${sz}" width="${sz}" height="${sz}" role="img" aria-label="Spending rings">`;const n=Math.max(1,items.length),step=(sz/2-30)/Math.max(4.2,n-.2),w=Math.min(16,step*.66);items.forEach((it,i)=>{o+=ringSvg(sz/2-w/2-8-i*step,w,it.pct,it.color,it.color,tag+i,sz)});return o+'</svg>'}
function segRing(goals,sz,center){const act=goals.filter(g=>g.state!=='done');const tot=act.reduce((a,g)=>a+g.target,0)||1;const cx=sz/2,r=sz/2-16,ticks=Math.max(24,Math.min(84,act.length*14+24));let o=`<svg viewBox="0 0 ${sz} ${sz}" width="${sz}" height="${sz}" role="img" aria-label="Savings dial">`,idx=0;
 act.forEach((g,i)=>{const share=g.target/tot,n=Math.max(2,Math.round(share*ticks))-1,frac=Math.min(1,g.saved/g.target),col=GG[i%3];for(let k=0;k<n;k++){const ang=(-90+((idx+k)/ticks)*360)*Math.PI/180,lit=(k+1)/n<=frac+1e-6;o+=`<line x1="${cx+r*Math.cos(ang)}" y1="${cx+r*Math.sin(ang)}" x2="${cx+(r-20)*Math.cos(ang)}" y2="${cx+(r-20)*Math.sin(ang)}" stroke="${lit?col:'#2b2c2f'}" stroke-width="3.6" stroke-linecap="round"/>`}idx+=n+1});
 return o+(center?`<text x="${cx}" y="${cx+12}" text-anchor="middle" fill="#E9E5DC" style="font-family:var(--display);font-weight:800;font-size:44px">${center}</text>`:'')+'</svg>'}
const wordLeft=(l,a)=>a<=0?'—':l<=0?'empty':l/a>.6?'plenty':l/a>.3?'some':'low';
const fmtDay=d=>d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
const fmtTime=d=>d.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit',hour12:true}).replace(' ','').toLowerCase().replace('am',' am').replace('pm',' pm');
const DOW=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
/* ===== state & router ===== */
let S=null,UI=null;const H={},HI={};const SCREENS={},SHEETS={},FLOWS={},POPUPS={};
function resetUI(){UI={tab:'home',stack:[],sheet:null,flow:null,popup:null,toast:null,inc:1,filter:{cat:'all',range:30},hot:{scale:'day',mode:'times'},viz:{}}}
function cur(){return UI.stack.length?UI.stack[UI.stack.length-1]:{id:UI.tab}}
function push(id,p){UI.stack.push({id,p:p||{}});render()}
function pop(){UI.stack.pop();render()}
function go(tab){UI.tab=tab;UI.stack=[];render();$('#view').scrollTop=0}
function say(t){UI.toast=t;render();clearTimeout(say._t);say._t=setTimeout(()=>{UI.toast=null;render()},2800)}
function openSheet(id,p){UI.sheet={id,p:p||{}};render()}
function closeSheet(){UI.sheet=null;render()}
function openFlow(id,p){UI.flow={id,step:(p&&p.step)||0,d:Object.assign({kp:'',tab:'b'},p||{})};render()}
function closeFlow(){UI.flow=null;render()}
function fitPhone(){const s=Math.min(1,(innerHeight-24)/844);const f=$('#frame');f.style.transform=`scale(${s})`;f.style.marginBottom=(-844*(1-s))+'px';f.style.width='390px';f.parentElement.style.minWidth=(390*s)+'px'}
function render(){
 if(!S)return;$('#clk').textContent=S.now.toLocaleDateString('en-IN',{weekday:'short'})+' '+fmtTime(S.now);
 const c=cur();const fn=SCREENS[c.id];$('#view').innerHTML=fn?fn(c.p||{}):'';
 $('#phone').dataset.f=UI.tab;$('#view').classList.toggle('snap',!!(c.id==='spending'||c.id==='insights'));
 $('#tabbar').style.display=(UI.flow||UI.popup)?'none':'flex';
 const tabs=[['home','Home'],['income','Income'],['spending','Spending'],['savings','Savings'],['insights','Insights']];
 $('#tabbar').innerHTML=tabs.map(t=>`<button class="${UI.tab===t[0]?'on':''}" data-a="tab|${t[0]}">${t[1]}${t[0]==='home'&&(S.unsorted.length||S.pending.length)?'<span class="dot"></span>':''}${t[0]==='income'&&S.credits.length?'<span class="dot"></span>':''}</button>`).join('');
 let L='';
 if(UI.sheet&&SHEETS[UI.sheet.id])L+=`<div class="scrim" data-a="closesheet"></div><div class="sheet">${SHEETS[UI.sheet.id](UI.sheet.p)}</div>`;
 if(UI.flow&&FLOWS[UI.flow.id])L+=`<div class="modal" style="background:${UI.flow.bg||groundCss}">${FLOWS[UI.flow.id](UI.flow)}</div>`;
 if(UI.popup&&POPUPS[UI.popup.id])L+=`<div class="modal" style="background:${UI.popup.bg||groundCss}">${POPUPS[UI.popup.id](UI.popup)}</div>`;
 if(UI.toast)L+=`<div class="toast">${esc(UI.toast)}</div>`;
 $('#layer').innerHTML=L;
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
