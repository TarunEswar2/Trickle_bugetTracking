// One scenario per logic gap from the review of "Trickle money model: system plan" (11 Oct). Each prints PASS or FAIL with the numbers.
const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/../mockup26.html');await p.waitForTimeout(1500);
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
 // the check with the bank is recorded, not lost
 fresh(5000,20,4);doPay(S,{amt:400,target:{type:'cat',id:S.cats[0].id},payee:'x'});render();UI.flow={id:'sync24',step:1,d:{kp:'4000'}};H.sync24go();const cp=(S.cp26||[]).slice(-1)[0];
 ok('bank check recorded',cp&&cp.expected===4600&&cp.diff===-600&&M25().B===4000,`expected ${cp&&cp.expected}, stated ${cp&&cp.stated}, untracked ${cp&&cp.diff}`);
 return R});
console.log(out.join('\n'));console.log(errs);await b.close()})()
