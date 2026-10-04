/* ===== ASK POP-UPS (B-9, B-10): short, plain, always skippable ===== */
/* Each ask: one question, one hint at most, one big yes, one equally easy "Not now". */
const ASKS={
 link:()=>({cap:'Spends',q:'See your spends automatically?',hint:'Link UPI. Trickle only reads payments.',yes:'Link UPI',no:'Not now',ok:()=>{S.p.mode='upi';say('UPI linked.')}}),
 add:()=>({cap:'Spends',q:'Add a spend you made?',hint:'Takes five seconds.',yes:'Add one',no:'Not now',ok:()=>{UI.popup=null;openFlow('pay');return 1}}),
 pin:()=>({cap:'Safety',q:'Lock Trickle with a PIN?',hint:'You can add it any time.',yes:'Add PIN',no:'No thanks',ok:()=>{S.pinOn=true;say('PIN on.')}}),
 notif:()=>({cap:'Reminders',q:'Remind you about bills?',hint:'One nudge, the day before.',yes:'Yes',no:'No thanks',ok:()=>{S.notifOn=true;say('Reminders on.')}}),
 sort:()=>{const n=S.unsorted.length||2;return {cap:'Spends',q:n+(n===1?' payment needs':' payments need')+' a place.',hint:'One tap each. Trickle remembers.',yes:'Sort now',no:'Later',ok:()=>{UI.popup=null;UI.tab='spending';push('sort');return 1}}},
 limit:()=>{const c=S.cats.find(x=>!x.amt)||S.cats[0];const w=Math.max(1,Math.round(weekSpentBy(S,c.id,1)||S.flexW/Math.max(1,S.cats.length)));const sug=Math.max(5,Math.round(w/5)*5);return {cap:c.name,q:'A weekly limit for '+c.name+'?',hint:'You usually spend about '+money(sug)+'.',yes:'Set '+money(sug),no:'Not now',ok:()=>{c.amt=sug;c.left=Math.max(0,sug-weekSpentBy(S,c.id,0));say('Limit set for '+c.name+'.')}}},
 bal:(P)=>{const v=P.v||2000;return {cap:'Money',q:'How much is in your account?',hint:'Only to show how long it lasts.',chips:[500,1000,2000,5000],val:v,yes:'Save '+money(v),no:'Not now',ok:()=>{S.p.bal=v;S.balSet=true;say('Balance saved.')}}},
 plan:()=>({cap:'Plan',q:'Want a full plan?',hint:'Add what you get each month. Trickle splits it.',yes:'Yes, let\'s do it',no:'Not now',ok:()=>{S.mode='plan';say('Plan on. Add money to start.')}}),
 goal:()=>({cap:'Goals',q:'Saving for something?',hint:'Name it. Pick an amount.',yes:'Add a goal',no:'Not now',ok:()=>{UI.popup=null;UI.tab='savings';return 1}}),
 recap:()=>{const tot=Math.round(weekSpentAll(S,1,1))||0;const top=S.cats.map(c=>[c,weekSpentBy(S,c.id,1)]).sort((a,b)=>b[1]-a[1])[0];return {cap:'Last week',q:'You spent '+money(tot)+'.',hint:top&&top[1]?'Most on '+top[0].name+' ('+money(top[1])+').':'',yes:'OK',no:null,ok:()=>{}}},
 import:()=>({cap:'History',q:'Bring in older spends?',hint:'From an Excel or CSV file.',yes:'Choose file',no:'Not now',ok:()=>{say('Import is a placeholder in this mockup.')}})
};
POPUPS.ask=(P)=>{const A=ASKS[P.k](P);const chips=A.chips?`<div class="row wrap" style="gap:8px;margin:16px 0 4px">${A.chips.map(v=>`<button class="btn s ${v===A.val?'g':'q'}" data-a="askv|${v}">${money(v)}</button>`).join('')}</div>`:'';
 return `<div style="position:absolute;left:0;right:0;bottom:0;padding:26px 22px 30px;border-radius:28px 28px 0 0;background:#121720;box-shadow:0 -20px 60px rgba(0,0,0,.5);border-top:1px solid #2a313d"><div class="cap">${esc(A.cap)}</div><div class="title" style="font-size:28px;margin:6px 0 12px">${esc(A.q)}</div>${A.hint?`<div class="sub">${esc(A.hint)}</div>`:''}${chips}<div class="col" style="gap:10px;margin-top:22px"><button class="btn" data-a="askyes">${esc(A.yes)}</button>${A.no?`<button class="btn q" data-a="askno">${esc(A.no)}</button>`:''}</div></div>`};
function openAsk(k){UI.popup={id:'ask',k,bg:'rgba(5,7,11,.74)'};UI.flow=null;UI.sheet=null;render()}
H.askv=a=>{UI.popup.v=+a[0]};
H.askyes=()=>{const P=UI.popup,A=ASKS[P.k](P);const keep=A.ok();if(!keep)UI.popup=null;(S.asked=S.asked||{})[P.k]='yes';return true};
H.askno=()=>{const P=UI.popup;(S.asked=S.asked||{})[P.k]='no';UI.popup=null;say('No problem.');return true};
