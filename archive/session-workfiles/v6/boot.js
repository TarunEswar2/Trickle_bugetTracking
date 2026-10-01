/* ===== boot ===== */
(function(){var vp=$('viewport');Object.keys(FR).forEach(function(k){var s=document.createElement('section');s.className='frame';s.setAttribute('data-frame',k);vp.appendChild(s);});
 $('scrim').addEventListener('click',function(e){if(e.target.id==='scrim')closeSheet();});
 document.querySelectorAll('.frame').forEach(function(f){f.addEventListener('scroll',hideTip,{passive:true});});
 S=freshState();
 var q=location.hash.slice(1);
 if(q==='demo'||q.indexOf('demo:')===0){S.tracking='upi';ACCOUNTS=ACC_SEED.slice();initAlloc();enterApp();var f=q.split(':')[1];if(f&&FR[f])go(f);}
 else go('splash');})();
