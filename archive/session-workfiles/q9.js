global.document={getElementById:()=>null};
eval(require('fs').readFileSync('/home/claude/v9/ledger.js','utf8')+';seedLedger();global.TX=TX;global.NOW=NOW;global.POOLS=POOLS;');
var c={};TX.filter(t=>t.type==='spend'&&t.ts>NOW-30*DAY).forEach(t=>{c[t.merchant]=c[t.merchant]||[0,0];c[t.merchant][0]++;c[t.merchant][1]+=t.amt});console.log(c);
var w={};TX.filter(t=>t.type==='spend'&&t.ts>NOW-7*DAY).forEach(t=>{w[t.merchant]=(w[t.merchant]||0)+1});console.log(w, POOLS());
console.log(TX.filter(t=>t.type==='income'||t.type==='settle'||t.type==='transfer').filter(t=>t.ts>=new Date(2026,8,1)).map(t=>[t.type,t.reason,t.amt,JSON.stringify(t.dst||t.returns)]));
