/* ===== v17.2 (9 Oct): UPI account linking and payment detection are retired (Tarun, 9 Oct).
   Trickle learns about spends only from what the user does: scan a shop QR and hand off, or add by hand.
   Nothing "comes in" by itself, so there is no "came in from Rahul". Money in is added by the user. ===== */
{const _ns=newState;newState=function(k){const s=_ns(k);s.p=Object.assign({},s.p,{mode:'manual'});s.credits=[];s.pending=[];s.flags=Object.assign({},s.flags,{linkLost:false});return s}}
addCredit=function(){return null};
/* onboarding: title -> pin (optional) -> how much money do you get -> done. No "link UPI" step. */
{const _o=FLOWS.onb;FLOWS.onb=F=>{const d=F.d;if(['link','bank','verify','bal'].includes(d.s)){d.mode='manual';d.s='cats'}
 let h=_o(F);if(d.s==='money'){h=h.replace('data-a="obgo|link">‹ Back','data-a="obgo|title">‹ Back').replace('<div class="cap">Step 2 of 2</div>','').replace(/<div class="sdots">[\s\S]*?<\/div>/,'')}
 return h}}
/* settings: no account linking */
{const _s=SHEETS.settings;SHEETS.settings=p=>{if(p&&p.sub==='acct')return `<button class="back" data-a="settings">‹ Settings</button><div class="h2">How spends are added</div><div class="card" style="margin:12px 0"><div style="font-weight:650">You add them.</div><div class="sub" style="margin-top:6px">Scan a shop QR and pay in your own UPI app, or add a spend by hand.</div></div><div class="sm">Trickle never reads your bank, your UPI app or your messages. Your data stays on this phone.</div>`;
 return _s(p).replace('Account &amp; linking','How spends are added').replace('Account & linking','How spends are added').replace(/(UPI link|By hand)( ›)/,'Scan or by hand$2')}}
