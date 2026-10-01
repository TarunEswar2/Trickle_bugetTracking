/* ===== Trickle v10 — shape money: glyph library, breakdown, keys ===== */
var LAD=[{v:5000,k:'star',n:'Star'},{v:1000,k:'coin',n:'Coin'},{v:500,k:'dia',n:'Diamond'},{v:100,k:'tri',n:'Triangle'},{v:50,k:'sq',n:'Square'},{v:10,k:'dot',n:'Dot'}];
var SH={10:'dot',50:'sq',100:'tri',500:'dia',1000:'coin',5000:'star'},SHV={dot:10,sq:50,tri:100,dia:500,coin:1000,star:5000};
var GMIN=14;
var STARP=(function(){var p=[];for(var i=0;i<10;i++){var r=i%2?4.7:10,a=-Math.PI/2+i*Math.PI/5;p.push((12+r*Math.cos(a)).toFixed(2)+','+(12.6+r*Math.sin(a)).toFixed(2));}return p.join(' ');})();
function ginner(k,c,hollow){var f=hollow?'none':c,s='stroke="'+c+'" stroke-width="2" stroke-linejoin="round" fill="'+f+'"';
 switch(k){case 'dot':return '<circle cx="12" cy="12" r="'+(hollow?4:4.6)+'" '+s+'/>';
 case 'sq':return '<rect x="5" y="5" width="14" height="14" rx="2.2" '+s+'/>';
 case 'tri':return '<polygon points="12,4.5 20.5,19.5 3.5,19.5" '+s+'/>';
 case 'dia':return '<polygon points="12,2.8 21.2,12 12,21.2 2.8,12" '+s+'/>';
 case 'coin':return hollow?'<circle cx="12" cy="12" r="9" '+s+'/>':'<circle cx="12" cy="12" r="8.6" fill="none" stroke="'+c+'" stroke-width="2.8"/><circle cx="12" cy="12" r="4" fill="'+c+'"/>';
 case 'star':return '<polygon points="'+STARP+'" '+s+'/>';
 default:return '<circle cx="12" cy="12" r="5" fill="'+c+'"/>';}}
function G(k,c,sz,hollow,cls){return '<svg class="gl'+(cls?' '+cls:'')+'" width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" aria-hidden="true">'+ginner(k,c||'currentColor',hollow)+'</svg>';}
function gAt(k,c,x,y,s,hollow){return '<g transform="translate('+x+','+y+') scale('+(s/24)+')">'+ginner(k,c,hollow)+'</g>';}
function round10(v){return Math.round(v/10)*10;}
/* greedy mixed breakdown, big → small, rounded to ₹10 */
function breakdown(v){var r=round10(v),o=[];if(v>0&&r===0)return [{k:'dot',v:10,hollow:1}];LAD.forEach(function(l){while(r>=l.v){o.push(l);r-=l.v;}});return o;}
function pileSpecs(v,spec){spec=spec||{};return breakdown(v).map(function(l){var s=Object.assign({},spec,{sh:l.k});if(l.hollow){s.hollow=1;}return s;});}
function almostEmpty(v){return v>0&&v<5;}
/* pile key: the glyphs used, each with its ₹ value */
function pkey(v){var used={};breakdown(v).forEach(function(l){used[l.k]=l.v;});return '<span class="tkey pk">'+LAD.filter(function(l){return used[l.k];}).map(function(l){return '<span class="kg">'+G(l.k,'currentColor',14)+fmt(l.v)+'</span>';}).join('')+'<span class="kt">tap for exact ₹</span></span>';}
function pileKeyFor(vals){var used={};vals.forEach(function(v){breakdown(v).forEach(function(l){used[l.k]=1;});});return '<span class="tkey pk">'+LAD.filter(function(l){return used[l.k];}).map(function(l){return '<span class="kg">'+G(l.k,'currentColor',14)+fmt(l.v)+'</span>';}).join('')+'</span>';}
/* goal pile: saved filled, remainder outlined */
function goalPile(g,size,extra){var p=POOLS(),s=Math.max(0,p.g[g.id]||0),rem=Math.max(0,g.target-s);
 var a=pileSpecs(s,{c:'var(--save)'});if(s<5)a=[];if(extra&&extra.highlight){a.slice(0,extra.highlight).forEach(function(x){x.cls='pop';});}
 a=a.concat(breakdown(rem).filter(function(l){return !l.hollow;}).map(function(l){return {sh:l.k};}));
 return tg(a,0,size,null,{cls:'goalp',attr:(extra&&extra.noReveal?'':'data-a="reveal" ')+' data-v="'+fmt(s)+' of '+fmt(g.target)+'" role="img" aria-label="'+esc(g.name)+' '+fmt(s)+' saved of '+fmt(g.target)+'"'});}
/* ---- logo B: filled lime jar with shape cutouts ---- */
function logoB(sz){return '<svg class="logoB" width="'+sz+'" height="'+sz+'" viewBox="0 0 120 120" role="img" aria-label="Trickle"><path d="'+jarD(24,40,72,72)+'" fill="#C6F432" stroke="#C6F432" stroke-width="4" stroke-linejoin="round"/>'+gAt('star','#0B0B0C',34,70,20)+gAt('dia','#0B0B0C',58,74,16)+gAt('tri','#0B0B0C',46,50,16)+gAt('dot','#C6F432',52,8,14)+gAt('dot','#C6F432',54,24,10)+'</svg>';}
function jarD(x,y,w,h){var r=Math.min(18,w/4);return 'M'+x+' '+(y+8)+' Q'+x+' '+y+' '+(x+8)+' '+y+' H'+(x+w-8)+' Q'+(x+w)+' '+y+' '+(x+w)+' '+(y+8)+' V'+(y+h-r)+' Q'+(x+w)+' '+(y+h)+' '+(x+w-r)+' '+(y+h)+' H'+(x+r)+' Q'+x+' '+(y+h)+' '+x+' '+(y+h-r)+' Z';}
/* ---- splash: logo A's falling trail — six shapes fall into the jar, biggest first ---- */
var SPLC=['var(--save)','var(--travel)','var(--fun)','var(--ess)','var(--food)','var(--bone)'];
function splashHTML(){var slots=[[118,256],[166,256],[214,256],[118,194],[166,194],[214,194]],s='<svg viewBox="0 0 360 340" aria-hidden="true"><path d="'+jarD(100,168,160,156)+'" fill="var(--surface2)" stroke="var(--bone)" stroke-width="4" stroke-linejoin="round"/>';
 LAD.forEach(function(l,i){var x=slots[i][0],y=slots[i][1],d=i*480;
  s+='<g transform="translate('+x+','+y+')"><g class="spf" style="--dx:'+(40+i*14-x+150)+'px;--dy:'+(-y+10+i*6)+'px;animation-delay:'+d+'ms">'+gAt(l.k,SPLC[i],0,0,30)+'</g><text class="spl" style="animation-delay:'+(d+600)+'ms" x="15" y="44" text-anchor="middle" font-size="12" fill="var(--text2)" font-family="DM Sans,sans-serif" font-weight="700">'+fmt(l.v)+'</text></g>';});
 return '<div class="splash" data-a="splashgo" role="dialog" aria-label="Trickle. Each shape is an amount. Tap to continue.">'+'<button class="skip" data-a="splashgo">Skip</button><div class="logo-mk">'+logoB(34)+'Trickle</div>'+s+'</svg><p class="cap">Each shape is an amount.</p><p class="faint" style="font-size:13px">Tap to continue</p></div>';}
function splashRun(){if(isReduced())return;shapeNotes(LAD.map(function(l){return l.k;}),520,480);clearTimeout(S._spt);S._spt=setTimeout(function(){if(S.splash)A.splashgo();},4600);}
A.splashgo=function(){clearTimeout(S._spt);S.splash=0;render();};
/* onboarding step 1: the ladder */
function ladderHTML(){return '<div class="ladder">'+LAD.slice().reverse().map(function(l,i){return '<div class="rung" style="animation-delay:'+(i*120)+'ms">'+G(l.k,SPLC[5-i],32)+'<b>'+fmt(l.v)+'</b><small>'+l.n+'</small></div>';}).join('')+'</div>';}
