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

/* ===== v17.3: no logo cells, a plain title; Privacy and Terms in Settings ===== */
{const _o2=FLOWS.onb;FLOWS.onb=F=>{if(F.d.s==='title')return `<div class="mbody" style="padding-top:0"><div style="position:absolute;left:24px;right:24px;top:300px"><div style="font-size:44px;font-weight:700;letter-spacing:-.01em;line-height:1.05">Trickle</div><div class="sub" style="font-size:18px;margin-top:10px">Know where your money goes.</div></div></div>`+obFoot(obBtn('Get started','obgo|link')+obBtn('Just start tracking','obquick','q'));return _o2(F)}}
{const _s2=SHEETS.settings;SHEETS.settings=p=>{
 if(p&&p.sub==='priv')return `<button class="back" data-a="settings">‹ Settings</button><div class="h2">Privacy</div><div class="col" style="gap:10px;margin-top:12px"><div class="sub">Your data stays on this phone. There is no account, no analytics and no server.</div><div class="sub">Trickle does not read your bank, your UPI app, your messages or your contacts.</div><div class="sub">When you scan a shop QR, the payment link goes straight to the UPI app you choose.</div><div class="sub">Deleting the app deletes your data. Backup is not built yet.</div></div>`;
 if(p&&p.sub==='terms')return `<button class="back" data-a="settings">‹ Settings</button><div class="h2">Terms</div><div class="col" style="gap:10px;margin-top:12px"><div class="sub">Trickle helps you see your spending. It does not move money. Payments happen in your UPI app.</div><div class="sub">Numbers are what you log. They can be wrong if a log is missing.</div><div class="sub">Trickle is not financial advice.</div><div class="sm">Draft for the prototype. Final terms need review before release.</div></div>`;
 const h=_s2(p);if(p&&p.sub)return h;
 return h.replace('</div><div class="sm" style="margin-top:14px">','<button class="li" data-a="settings|priv"><span class="n">Privacy</span><span class="t">What stays on this phone ›</span></button><button class="li" data-a="settings|terms"><span class="n">Terms</span><span class="t">Draft ›</span></button></div><div class="sm" style="margin-top:14px">')}}
