/* states for the Trickle mockup; run: PLAYWRIGHT_MODULE=/opt/node-tools/node_modules/playwright node ../../../.claude/skills/human-interfaces/scripts/audit.js mockup17.html --states tests/antiai_states.js */
module.exports=async(page,snap)=>{
 const ev=(f,a)=>page.evaluate(f,a);const calm=()=>ev(()=>{UI.sheet=null;UI.popup=null;UI.toast=null;render()});
 const profile=async k=>{await ev(k=>{loadProfile(k);UI.flow=null;UI.popup=null},k);await page.waitForTimeout(300);await calm()};
 await ev(()=>startOnb());await snap('onb_title');
 await page.click('[data-a="obgo|link"]');await snap('onb_money');
 await ev(()=>{UI.flow.d.kp='6000';render()});await page.click('[data-a="obm|go"]');await snap('onb_add_money_step1');
 for(const [i,n] of [['N','nishad'],['H','harsh'],['T','tarun']]){await profile(i);
  await snap('home_'+n);
  await ev(()=>{S.bufLeft=Math.round(S.bufAmt*.2);render()});await snap('home_fast_'+n);
  await ev(()=>{S.bufLeft=0;S.cats.forEach(c=>c.left=0);S.touched=true;render()});await snap('home_out_'+n);
  await profile(i);
  await ev(()=>{go('spending')});await calm();await snap('spending_'+n);
  await ev(()=>{push('history',{})});await calm();await snap('history_'+n);
  await ev(()=>{go('savings')});await calm();await snap('savings_'+n);
  for(const m of ['hour','day','month']){await ev(m=>{go('home');UI.rh=m;UI.mcOff=0;push('pwhen',{})},m);await calm();await snap('insight_'+m+'_'+n)}
  await ev(()=>{go('home');push('prep',{})});await calm();await snap('repeats_'+n);
  await ev(()=>{go('home');push('ptrend',{})});await calm();await snap('trend_'+n);
  await ev(()=>{go('spending');push('cat',{id:S.cats[0].id})});await calm();await snap('category_'+n);
  await ev(()=>{go('home');openSheet('settings',{})});await snap('settings_'+n);
  await ev(()=>{UI.sheet=null;openSheet('gridhow',{})});await snap('gridhow_'+n);
  await ev(()=>{UI.sheet=null;openSheet('why',{k:'hour'})});await snap('why_'+n);
  await ev(()=>{UI.sheet=null;openSheet('limit',{scope:'cat',ref:S.cats[0].id,kind:'amt',lv:'200'})});await snap('limit_'+n);
  await ev(()=>{UI.sheet=null;UI.popup={id:'homescreen'};render()});await snap('widget_'+n);
  await ev(()=>{H.hsmoney();render()});await snap('widget_money_'+n);
  await ev(()=>{UI.popup=null;UI.hsMoney=null;go('home');openFlow('pay');render()});await snap('pay_'+n);
  await ev(()=>{UI.flow=null;go('home');openFlow('payscan');render()}).catch(()=>{});await snap('payscan_'+n);
  await ev(()=>{UI.flow=null;go('home');H.addmoney17();render()});await snap('addmoney_'+n);
  await ev(()=>{UI.flow=null;render()});
 }
};
