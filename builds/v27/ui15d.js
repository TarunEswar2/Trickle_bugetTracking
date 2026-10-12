/* ===== Test harness: the same Home state drawn four ways, for 5-second comprehension tests (not part of the product) ===== */
window.HOMEVIS='grid';
const _homeScr=SCREENS.home;
SCREENS.home=()=>{let h=_homeScr();if(!planned()||window.HOMEVIS==='grid')return h;
 const L=Math.max(0,flexL()),W=Math.max(1,flexW()),r=Math.max(0,Math.min(1,L/W)),col=paceHex();
 const a=h.indexOf('<div style="margin:20px 8px 12px" data-a="gridhow">'),b=h.indexOf('<div style="margin:0 10px 16px">');if(a<0||b<0)return h;
 let vis='';
 if(HOMEVIS==='bar')vis=`<div style="margin:56px 8px 8px"><div style="height:40px;border-radius:20px;background:#171C25;overflow:hidden;box-shadow:inset 0 1px 3px rgba(0,0,0,.5)"><div style="height:100%;width:${(r*100).toFixed(1)}%;background:${boxBg(col)};border-radius:20px;box-shadow:0 0 18px ${col}66"></div></div><div class="row sp sm" style="margin-top:10px"><span>Spent</span><span>Left</span></div></div>`;
 else if(HOMEVIS==='days'){const dow=(S.now.getDay()+6)%7;const perDay=W/7;const cover=perDay>0?L/perDay:0;const names=['M','T','W','T','F','S','S'];
  const tiles=names.map((n,i)=>{const past=i<dow,today=i===dow;const covered=i>=dow&&(i-dow)<cover;const st=past?'background:#171C25;opacity:.5':covered?`background:${boxBg(col)};box-shadow:0 0 14px ${col}55`:`border:1.6px dashed ${AMBER};background:none`;
   return `<div style="flex:1;text-align:center"><div style="height:84px;border-radius:14px;${st};${today?'outline:2px solid #F5F7FA;outline-offset:2px;':''}"></div><div class="cap" style="margin-top:8px;font-size:12px;${today?'color:var(--ink)':''}">${n}</div></div>`}).join('');
  const lastIdx=Math.min(6,dow+Math.max(0,Math.ceil(cover)-1));const lasts=cover<=0?'Not past today':cover>=7-dow?'Lasts all week':'Lasts until '+['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][lastIdx];
  vis=`<div style="margin:36px 8px 6px"><div class="title" style="font-size:24px;margin-bottom:18px">${lasts}.</div><div style="display:flex;gap:8px">${tiles}</div></div>`}
 else if(HOMEVIS==='words'){const t=r>.6?'Plenty left for the days ahead.':r>.3?'About half the week is left.':r>0?'Not much left. Go gently.':'The week is used up.';vis=`<div style="margin:70px 8px 40px"><div class="title" style="font-size:34px;line-height:1.1;color:${col}">${t}</div></div>`}
 h=h.slice(0,a)+vis+h.slice(b);h=h.replace(/<button class="chip" data-a="gridhow">[^<]*<\/button>/,'');return h};
