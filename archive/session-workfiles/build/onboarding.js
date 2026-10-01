// ===================== SHARED ONBOARDING + SHELL =====================
function phoneShell(mk,label,framesHTML,tabsHTML,sheetsHTML,withNav){
  return '<div class="mockup" data-mockup="'+mk+'">'+
    '<div class="stage-head"><b>'+esc(label)+'</b><button class="stage-btn" onclick="exitMockup()">← Explorations</button></div>'+
    '<div class="phone">'+
      '<div class="statusbar"><span>9:41</span><span class="sb-right">●●●</span></div>'+
      '<div class="viewport">'+framesHTML+'</div>'+
      (withNav?'<div class="tabbar">'+tabsHTML+'</div>':'')+
    '</div>'+
  sheetsHTML+
  '</div>';
}
function frame(name,inner,cls){return '<div class="frame'+(cls?(' '+cls):'')+'" data-frame="'+name+'">'+inner+'</div>';}

function onboardingFrames(mk,homeFrame){
  var F='';
  F+=frame('splash','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">'+
    '<div style="width:72px;height:72px;border-radius:20px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800">T</div>'+
    '<div style="font-size:26px;font-weight:800;letter-spacing:-.4px">Trickle</div>'+
    '<p class="hint" style="text-align:center;max-width:220px">Money sense for students, without the spreadsheet.</p>'+
    '<button class="btn solid" style="width:200px;margin-top:18px" onclick="go(\''+mk+'\',\'method\')">Get started</button>'+
    '</div>');
  F+=frame('method','<h1 class="screen-title">How do you want to track spending?</h1><p class="step-label">Step 1 of 5</p>'+
    '<div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
      '<button class="panel" style="text-align:left;border:2px solid var(--accent)" onclick="go(\''+mk+'\',\'upi\')"><b>Link my UPI apps</b><p class="hint">Auto-detect payments from GPay, PhonePe, Paytm.</p></button>'+
      '<button class="panel" style="text-align:left" onclick="go(\''+mk+'\',\'cats\')"><b>Enter transactions manually</b><p class="hint">Log spends yourself, no linking needed.</p></button>'+
    '</div>');
  F+=frame('upi','<h1 class="screen-title">Link your UPI</h1><p class="step-label">Step 2 of 5</p>'+
    '<div class="pad" style="display:flex;flex-direction:column;gap:12px">'+
      '<div class="panel" style="display:flex;align-items:center;gap:12px"><div class="cat-icon">🏦</div><div><b>HDFC Bank</b><div class="rl-sub" style="font-size:11px;color:var(--ink2)">•••• 4821 &mdash; detected</div></div></div>'+
      '<button class="btn solid" onclick="go(\''+mk+'\',\'cats\')">Connect &amp; continue</button>'+
      '<p class="micro" style="text-align:center">Read-only access. We never move your money.</p>'+
    '</div>');
  F+=frame('cats','<h1 class="screen-title">Pick your categories</h1><p class="step-label">Step 3 of 5</p>'+
    '<div class="pad chip-wrap">'+CAT_DEFS.map(c=>'<span class="pill on">'+c.icon+' '+esc(c.name)+'</span>').join('')+'</div>'+
    '<div class="pad" style="margin-top:20px"><button class="btn solid" onclick="go(\''+mk+'\',\'pin\')">Continue</button></div>');
  F+=frame('pin','<h1 class="screen-title">Set a 4-digit PIN</h1><p class="step-label">Step 4 of 5</p>'+
    '<div class="pad" style="display:flex;justify-content:center;gap:10px;margin:20px 0">'+
      [0,1,2,3].map(()=>'<div style="width:44px;height:54px;border-radius:12px;background:var(--panel);display:flex;align-items:center;justify-content:center;font-size:20px">●</div>').join('')+
    '</div><div class="pad"><button class="btn solid" onclick="go(\''+mk+'\',\'perm\')">Confirm PIN</button></div>');
  F+=frame('perm','<h1 class="screen-title">One last thing</h1><p class="step-label">Step 5 of 5</p>'+
    '<div class="pad"><div class="panel-lite"><b>Notification access</b><p class="hint">Lets Trickle read UPI payment alerts to auto-log spends.</p></div>'+
    '<div style="height:14px"></div><button class="btn solid" onclick="go(\''+mk+'\',\'allset\')">Allow &amp; continue</button>'+
    '<button class="btn ghost" style="margin-top:10px" onclick="go(\''+mk+'\',\'allset\')">Not now</button></div>');
  F+=frame('allset','<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">'+
    '<div style="width:64px;height:64px;border-radius:50%;background:var(--good);color:#fff;display:flex;align-items:center;justify-content:center;font-size:30px">✓</div>'+
    '<div style="font-size:22px;font-weight:800">You\'re all set</div>'+
    '<p class="hint" style="text-align:center;max-width:220px">Your dashboard is ready.</p>'+
    '<button class="btn solid" style="width:200px;margin-top:16px" onclick="enter'+mk.toUpperCase()+'()">Enter Trickle</button>'+
    '</div>');
  return F;
}

var MOCKUPS=[]; // populated by each exploration file: MOCKUPS.push({k:'d',init:function(){...}})
function donePill(mk,dest){return '<button class="exit-pill" style="position:static;background:none;border:none;padding:0" onclick="go(\''+mk+'\',\''+dest+'\')">←</button>';}
