const fs=require('fs');const d=__dirname+'/v7/';
eval(fs.readFileSync(d+'data.js','utf8')+fs.readFileSync(d+'ledger.js','utf8')+`
var r=calibrate();console.log('cal',JSON.stringify(CAL),'minTa',r.minTa,'covers',r.covers);
var p=POOLS();console.log(JSON.stringify({ta:p.ta,budget:p.budget,sav:p.savings,bal:p.balance,b:p.b,g:p.g,flow:flowBalance(),owed:owedOpen()}));
console.log(TX.length,TX.filter(t=>t.type==='transfer'&&t.reason==='cover').map(t=>new Date(t.ts).toDateString()+' '+JSON.stringify(t.src)+'->'+t.dst[0].ref).join('\\n'));
console.log(TX.filter(t=>t.type==='carry').map(t=>t.cat+t.amt+t.fromPeriod));
console.log(JSON.stringify(checkInvariant('seed')));
[3,4,5,6,7].forEach(m=>{var q=poolsAt(monthEnd(m)-6*60e3);console.log(MON[m],JSON.stringify(q.b),q.ta)});
`);
