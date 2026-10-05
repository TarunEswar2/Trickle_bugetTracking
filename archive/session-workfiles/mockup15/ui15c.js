/* ===== v15.2: first-time tips. Each one appears once, the first time the thing happens, and is easy to dismiss ===== */
window.TIPS=true;const TS={};
const ACC={g:'#62DCB4',a:'#F08A3C',v:'#B48CFF',b:'#5AA9FF'};
const TIPDEF={
 paid:{cap:'Your first spend',t:'That is one spend.',b:'The boxes it took are gone from your week. What is left is on Home.',c:ACC.g},
 unsorted:{cap:'A payment needs a place',t:'Pick its category once.',b:'Trickle remembers it, so next time it sorts itself.',c:ACC.a},
 credit:{cap:'Money came in',t:'Say what it is.',b:'Income, one-off money, or not yours. Your UPI link spotted it.',c:ACC.g},
 plan:{cap:'Your plan',t:'Your plan is set.',b:()=>`${money(S.W)} a week, shared across your categories. Change any limit in Spending.`,c:ACC.g},
 income:{cap:'Income',t:'Income is split.',b:'Part is saved, the rest is for spending. You can change the split any time.',c:ACC.b},
 oneoff:{cap:'One-off',t:'One-offs stay outside your week.',b:'They show in History but never change what is left.',c:ACC.v},
 bill:{cap:'Subscription',t:'A little is set aside each week.',b:'So the bill never surprises you.',c:ACC.a},
 goal:{cap:'Goal',t:'Goals fill as you save.',b:'Money you move into one grows its ring. Free savings stay unassigned.',c:ACC.g},
 ahead:{cap:'Pace',t:'Amber means ahead of pace.',b:'Nothing is wrong. At this speed the week runs out early.',c:ACC.a},
 over:{cap:'Pace',t:'You went over.',b:'Savings covered the rest. It is a signal, not a failure.',c:ACC.a},
 spending:{cap:'Spending',t:'Where it went.',b:'Each bar is a category this week. Tap one to see its boxes.',c:ACC.a},
 money:{cap:'Money',t:'Money in, and what you keep.',b:'Income is split into spending and saving. Goals live under Savings.',c:ACC.b},
 insights:{cap:'Insights',t:'Patterns, not a list.',b:'See when your money goes and what repeats. Tap a spot for the amount.',c:ACC.v},
 cat:{cap:'A category',t:'One category, one gauge.',b:'Its 100 boxes are its weekly limit. Boxes go as you spend.',c:ACC.g}
};
SHEETS.tip=({k})=>{const d=TIPDEF[k];const b=typeof d.b==='function'?d.b():d.b;
 return `<div style="width:44px;height:5px;border-radius:3px;background:${d.c};box-shadow:0 0 14px ${d.c}88;margin-bottom:14px"></div><div class="cap">${d.cap}</div><div class="title" style="font-size:27px;margin:4px 0 10px">${d.t}</div><p class="sub" style="margin:0 0 20px;font-size:16px">${b}</p><button class="btn" data-a="closesheet">Got it</button>`};
let TQ=[],TSNAP=null,TS_S=null;
const tipQ=k=>{if(!TS[k]&&!TQ.includes(k))TQ.push(k)};
function tipSnap(){return {tx:S.txns.length,top:S.txns[0]&&S.txns[0].id,un:S.unsorted.length,cr:(S.credits||[]).length,bills:S.bills.length,goals:S.goals.length,inc:(S.incomes||[]).length,plan:!!planned(),one:S.txns.filter(t=>t.kind==='oneoff').length}}
const _ar3=window.afterRender;
window.afterRender=()=>{if(_ar3)_ar3();if(!window.TIPS||!S||!UI)return;
 const cur=tipSnap();if(!TSNAP||TS_S!==S){const was=TSNAP&&TSNAP.plan,prevKey=TS_S&&TS_S.p&&TS_S.p.key;TSNAP=cur;TS_S=S;TQ=[];if(was===false&&cur.plan&&S.p.key==='O'&&prevKey==='O')tipQ('plan');}
 const p=TSNAP;
 if(cur.plan&&!p.plan)tipQ('plan');
 else if(cur.inc>p.inc)tipQ('income');
 if(cur.one>p.one)tipQ('oneoff');
 else if(cur.tx>p.tx&&S.txns[0]&&['cat','goal','fixed'].includes(S.txns[0].kind)&&S.txns[0].via!=='detected'&&S.txns[0].id!==p.top)tipQ('paid');
 if(cur.un>p.un)tipQ('unsorted');
 if(cur.cr>p.cr)tipQ('credit');
 if(cur.bills>p.bills)tipQ('bill');
 if(cur.goals>p.goals)tipQ('goal');
 TSNAP=cur;
 if(UI.flow||UI.popup||UI.sheet)return;
 if(TQ.length){const k=TQ.shift();if(!TS[k]){TS[k]=1;openSheet('tip',{k});return}}
 const top=UI.stack.length?UI.stack[UI.stack.length-1].id:null;let k=null;
 if(top==='cat'||top==='tcat')k='cat';
 else if(!top){if(UI.tab==='spending')k='spending';else if(UI.tab==='money')k='money';else if(UI.tab==='insights')k='insights';
  else if(UI.tab==='home'){if(planned()&&flexL()<=0)k='over';else if(planned()&&typeof paceInfo==='function'&&paceInfo()&&paceInfo().over)k='ahead';else if(!TS.grid&&(planned()||S.txns.length>=1)){TS.grid=1;openSheet('gridhow',{tour:1});return}}}
 if(k&&!TS[k]){TS[k]=1;openSheet('tip',{k})}};

const _ru=resetUI;resetUI=function(){_ru();UI.hot.mode='rupees'};
