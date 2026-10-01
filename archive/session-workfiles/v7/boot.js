/* ===== boot ===== */
(function(){var vp=$('viewport');Object.keys(FR).forEach(function(k){var s=document.createElement('section');s.className='frame';s.setAttribute('data-frame',k);vp.appendChild(s);});
 $('scrim').addEventListener('click',function(e){if(e.target.id==='scrim')closeSheet();});
 $('dscrim').addEventListener('click',closeDrawer);
 document.querySelectorAll('.frame').forEach(function(f){f.addEventListener('scroll',hideTip,{passive:true});});
 S=freshState();
 var q2=location.hash.slice(1);
 if(q2==='demo'||q2.indexOf('demo')===0){S.tracking=q2.indexOf('manual')>=0?'manual':'upi';ACCOUNTS=S.tracking==='upi'?ACC_SEED.slice():[];S.pin='1234';enterApp();var f=q2.split(/[-:]/)[1];if(f&&FR[f])go(f);}
 else go('splash');})();
