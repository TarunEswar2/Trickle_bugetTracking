// pack(tree) -> {w,h,F:[fills],S:[shadows],T:[tstyles],N:[names],n:[nodes]} with indices
module.exports=function pack(r){const F=[],S=[],T=[],N=[];const ix=(t,v)=>{if(v===null||v===undefined)return -1;const k=JSON.stringify(v);let i=t.findIndex(x=>JSON.stringify(x)===k);if(i<0){i=t.length;t.push(v)}return i};
function walk(n){const k=n[0];
 if(k==='F'){return ['F',n[1],n[2],n[3],n[4],ix(F,n[5]),n[6],n[7]?ix(F,n[7]):-1,n[8],n[9],ix(S,n[10]),n[11],n[12],ix(N,n[13]),n[14].map(walk)]}
 if(k==='T'){const ts=n[6];return ['T',n[1],n[2],n[3],n[4],n[5],ix(T,[ts.fam,ts.w,ts.sz,ts.col,ts.ls,ts.lh,ts.al,ts.it?1:0]),n[7]]}
 if(k==='G'){const tab=n[8].map(c=>[ix(F,c[0]),c[1]?ix(F,c[1]):-1,c[2],c[3],ix(S,c[4]),c[5]]);return ['G',n[1],n[2],n[3],n[4],n[5],n[6],n[7],tab]}
 if(k==='S'){return ['S',n[1],n[2],n[3],n[4],n[5],ix(N,n[6])]}
 return n}
const nodes=r.nodes.map(walk);return {w:r.w,h:r.h,F,S,T,N,n:nodes}};
