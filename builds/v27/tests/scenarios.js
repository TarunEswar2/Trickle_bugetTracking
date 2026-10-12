// One scenario per logic gap from the review of "Trickle money model: system plan" (11 Oct). Each prints PASS or FAIL with the numbers.
const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/../mockup27.html');await p.waitForTimeout(1500);
const out=await p.evaluate(()=>{window.TIPS=false;const R=[];const ok=(name,c,info)=>R.push((c?'PASS ':'FAIL ')+name+' | '+info);
 const fresh=(amt,pct,wks)=>{startOnb();H.obgo(['link']);UI.flow.d.kp=String(amt);H.obm(['go']);H.incnext();H.pct23([String(pct)]);H.inc23next();setWeeks20(UI.flow.d,wks);H.incfinish();UI.sheet=null;UI.popup=null;render()};
 // gap 1: a subscription due in 3 days is held back, and paying it does not touch this week
 fresh(4000,0,4);S.bills=[{id:'bx',name:'Spotify',amt:199,every:'month',dueDay:1,reserve:0,nextDue:new Date(S.now.getTime()+3*DAY),paid:[]}];S.m25.reset=S.now.getTime();render();
 let m=M25();const left0=m.left,held0=m.held;S.txns.unshift({id:'t'+(S.idc++),t:S.now.getTime(),payee:'Spotify',amt:199,kind:'fixed',ref:'bx',via:'manual',src:{}});S.bills[0].nextDue=nextDueAfter(S.bills[0]);render();m=M25();
 ok('gap 1 subscriptions',held0>=199&&m.left===left0&&check25().length===0,`held ${held0}→${m.held}, this week ${left0}→${m.left}, balance ${m.B}`);
 // gap 2: buying a goal does not touch this week or Insights
 fresh(9000,30,4);const g=addGoal(S,{name:'Phone',target:2000});g.saved=2000;S.free=Math.max(0,S.free-2000);render();m=M25();const l2=m.left,b2=m.B,sv2=m.Sv;H.goalbought([g.id]);render();m=M25();
 ok('gap 2 goal purchase',m.left===l2&&m.B===b2-2000&&m.Sv===sv2-2000&&txIn(0,9e15).every(t=>!t.bought),`week ${l2}→${m.left}, balance ${b2}→${m.B}, savings ${sv2}→${m.Sv}`);
 // gap 3: spending past everything goes below zero; the next money in pays it back first
 fresh(1000,0,2);doPay(S,{amt:1500,target:{type:'cat',id:S.cats[0].id},payee:'x'});render();m=M25();const neg=m.B;addIncome({kp:'2000',pct:0,end:S.now.getTime()+13*DAY},true);render();const m3=M25();
 ok('gap 3 below zero',neg===-500&&m.left===0&&m3.B===1500&&m3.inWeeks===1500,`after overspend ${neg}, after +₹2,000 balance ${m3.B}, in weeks ${m3.inWeeks}`);
 // gap 4: money in mid-week restarts the week from that moment with a full share
 fresh(2800,0,4);doPay(S,{amt:300,target:{type:'cat',id:S.cats[0].id},payee:'x'});render();S.now=new Date(S.now.getTime()+60000);addIncome({kp:'1400',pct:0,end:S.now.getTime()+20*DAY},true);render();m=M25();
 ok('gap 4 mid-week money',m.spent===0&&m.budget>0&&m.left===m.budget,`this week ${m.left} of ${m.budget}, spent since ${m.spent}`);
 // gap 5: a shortfall at a check comes from money not in a goal, then every goal in proportion
 fresh(10000,40,4);const ga=addGoal(S,{name:'A',target:9000}),gb=addGoal(S,{name:'B',target:9000});ga.saved=3000;gb.saved=1000;S.free=0;render();
 UI.flow={id:'sync24',step:1,d:{kp:'2000'}};H.sync24go();m=M25();
 ok('gap 5 which goal shrinks',ga.saved===1500&&gb.saved===500&&m.B===2000&&m.Sp===0,`A ${ga.saved}, B ${gb.saved}, balance ${m.B}`);
 // untracked week: no entries means no sweep into savings
 fresh(2800,0,4);const sv0=savedTotal(S);advanceDays(S,7);render();const pd=S.pending.shift();if(pd)applyPending(S,pd,{to:'savings'});render();
 ok('untracked week',savedTotal(S)===sv0&&check25().length===0,`savings ${sv0}→${savedTotal(S)}`);
 // v27 start again with a new split: savings stay if the split has room for them, otherwise they go down (not in a goal first)
 const setup=()=>{fresh(5000,20,4);const g=addGoal(S,{name:'Phone',target:5000});g.saved=600;S.free=400;render();return g};
 const again=(X,keep)=>{UI.flow={id:'sync24',step:2,d:{kp:String(X),keep}};setWeeks20(UI.flow.d,4);const n=syncNums24(UI.flow.d);H.sync24go();UI.popup=null;return n};
 let gs=setup();let n=again(3000,null);m=M25();
 ok('restart, savings as now',m.B===3000&&gs.saved===600&&S.free===400&&m.Sp===2000&&m.budget===n.wk&&check25().length===0,`goal ${gs.saved}, not in a goal ${S.free}, to spend ${m.Sp}, week ${m.budget} (preview ${n.wk})`);
 gs=setup();n=again(3000,1500);m=M25();
 ok('restart, keep more',gs.saved===600&&S.free===900&&m.Sv===1500&&m.Sp===1500&&check25().length===0,`goal ${gs.saved}, not in a goal ${S.free}, to spend ${m.Sp}`);
 gs=setup();again(3000,700);m=M25();const a1=[gs.saved,S.free];gs=setup();again(3000,200);m=M25();
 ok('restart, keep less: same share each',a1[0]===420&&a1[1]===280&&gs.saved===120&&S.free===80&&m.Sp===2800&&check25().length===0,`keep 700: goal ${a1[0]}, not in a goal ${a1[1]}; keep 200: goal ${gs.saved}, not in a goal ${S.free}`);
 gs=setup();doPay(S,{amt:150,target:{type:'cat',id:S.cats[0].id},payee:'x'});const tx0=S.txns.length;again(3000,null);
 ok('restart keeps past spends',S.txns.length===tx0,`entries ${tx0}→${S.txns.length}`);
 // v27.1 subscriptions: adding one takes it out of the money to spend now and the week is worked out again; cancelling gives it back
 fresh(4000,0,4);m=M25();const w0=m.budget,end=Math.max(...m.active.map(p=>p.end));
 UI.flow={id:'subform',d:{}};S.bills.push({id:'bq',name:'Netflix',amt:200,every:'month',dueDay:1,reserve:0,nextDue:new Date(S.now.getTime()+5*DAY),paid:[]});subRecalc27('Netflix','added');UI.flow=null;
 m=M25();const due=reserve26(S.now.getTime(),end),wl=wksLeft25(S.now.getTime(),end);
 ok('subscription added',m.held===due&&m.budget===Math.round((m.Sp-due)/wl)&&check25().length===0,`week ${w0}→${m.budget} (= (${m.Sp} − ${due}) ÷ ${wl})`);
 H.subended(['bq']);m=M25();
 ok('subscription cancelled',m.held===0&&m.budget===Math.round(m.Sp/wl)&&check25().length===0,`week now ${m.budget}, held ${m.held}`);
 return R});
console.log(out.join('\n'));console.log(errs);await b.close()})()
