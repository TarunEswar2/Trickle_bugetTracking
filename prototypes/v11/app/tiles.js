/* ===== tiles.js v2 — mode F only: ■ = ₹100, rows of 10 split 5|5, row = ₹1,000, partial tile fills from the bottom.
   States: fill (available) · out (spent, outlined) · hatch (set aside for subscriptions) · dash (friends owe you).
   Above 100 tiles: 10×10 squares side by side (never a bigger glyph). ===== */
var UNIT=100;
function tileCount(amt){return amt/UNIT;}
function tilesSVG(segs,opt){opt=opt||{};var s=opt.size||14,g=Math.max(2,Math.round(s*.22)),g5=Math.round(s*.6),rg=Math.round(s*.3);
 var cells=[];segs.forEach(function(sg,si){if(!sg.amt||sg.amt<=0)return;var n=sg.amt/UNIT,full=Math.floor(n+1e-9),part=+(n-full).toFixed(3);
  for(var i=0;i<full;i++)cells.push({f:1,sg:sg,si:si});if(part>0.004)cells.push({f:Math.max(part,.08),sg:sg,si:si});});
 var total=cells.length,big=total>100,rowW=10*(s+g)-g+g5,blockH=10*(s+g+rg)-g-rg,bgap=Math.round(s*1.2);
 var per=opt.perRow||2;
 cells.forEach(function(c,i){var b=Math.floor(i/100),k=i%100,r=Math.floor(k/10),col=k%10;
  c.x=col*(s+g)+(col>=5?g5:0)+(big?(b%per)*(rowW+bgap):0);c.y=r*(s+g+rg)+(big?Math.floor(b/per)*(blockH+bgap):0);});
 var w=s,h=s;cells.forEach(function(c){w=Math.max(w,c.x+s);h=Math.max(h,c.y+s);});
 if(opt.fullRow)w=Math.max(w,rowW);
 var o='<svg class="tiles'+(opt.cls?' '+opt.cls:'')+'" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+(opt.label||'')+'">';
 var leaveFrom=opt.leaveFrom==null?-1:opt.leaveFrom,dropFrom=opt.dropFrom==null?-1:opt.dropFrom,st=Math.min(18,600/Math.max(1,total));
 cells.forEach(function(c,i){var sg=c.sg,k=sg.kind||'fill',fill=sg.fill||'var(--tile)',x=c.x,y=c.y,cls='t',sty='';
  if(sg.leave){cls+=' leave';sty=' style="animation-delay:'+Math.round(Math.min(700,(i-leaveFrom)*45))+'ms"';}
  else if(opt.drop||sg.drop){cls+=' drop';sty=' style="animation-delay:'+Math.round(Math.min(600,i*st))+'ms"';}
  o+='<g class="'+cls+'"'+sty+'>';
  if(k==='fill'){if(c.f>=.999)o+='<rect x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" rx="2.5" fill="'+fill+'"/>';
   else{var fh=Math.max(1.6,s*c.f);o+='<rect x="'+(x+.75)+'" y="'+(y+.75)+'" width="'+(s-1.5)+'" height="'+(s-1.5)+'" rx="2.5" fill="none" stroke="'+fill+'" stroke-width="1.5" opacity=".6"/><rect x="'+x+'" y="'+(y+s-fh)+'" width="'+s+'" height="'+fh+'" rx="1.5" fill="'+fill+'"/>';}}
  else if(k==='out'){o+='<rect x="'+(x+.75)+'" y="'+(y+.75)+'" width="'+(s-1.5)+'" height="'+(s-1.5)+'" rx="2.5" fill="none" stroke="var(--tile-empty)" stroke-width="1.5"'+(c.f<.999?' stroke-dasharray="1.5 2"':'')+'/>';}
  else if(k==='hatch'){var hh=c.f>=.999?s:Math.max(2,s*c.f);o+='<rect x="'+(x+.75)+'" y="'+(y+.75)+'" width="'+(s-1.5)+'" height="'+(s-1.5)+'" rx="2.5" fill="none" stroke="var(--hatch)" stroke-width="1.5"/><rect x="'+x+'" y="'+(y+s-hh)+'" width="'+s+'" height="'+hh+'" rx="2.5" fill="url(#p-hatch)"/>';}
  else if(k==='dash'){var dh=Math.max(2,s*c.f);o+='<rect x="'+(x+.75)+'" y="'+(y+.75)+'" width="'+(s-1.5)+'" height="'+(s-1.5)+'" rx="2.5" fill="none" stroke="'+fill+'" stroke-width="1.5" stroke-dasharray="3 2"/>'+(c.f<.999?'<rect x="'+(x+3)+'" y="'+(y+s-dh+2)+'" width="'+(s-6)+'" height="'+Math.max(1,dh-5)+'" rx="1" fill="'+fill+'" opacity=".5"/>':'');}
  o+='</g>';});
 return o+'</svg>';}
/* one tile as a legend swatch */
function swatch(fill,kind){return tilesSVG([{amt:100,fill:fill,kind:kind||'fill'}],{size:12,cls:'sw'});}
/* shared pattern defs: subscriptions hatch + B&W category textures */
var DEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+
 '<pattern id="p-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" fill="var(--card)"/><rect width="1.6" height="4" fill="var(--hatch)"/></pattern>'+
 '<pattern id="bw-Food" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="var(--bw)"/></pattern>'+
 '<pattern id="bw-Travel" width="3.5" height="3.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3.5" height="3.5" fill="var(--bw)"/><rect width="1.2" height="3.5" fill="var(--card)"/></pattern>'+
 '<pattern id="bw-Fun" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="var(--bw)"/><circle cx="2" cy="2" r="1" fill="var(--card)"/></pattern>'+
 '<pattern id="bw-Study" width="3.5" height="3.5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="3.5" height="3.5" fill="var(--bw)"/><rect width="1.2" height="3.5" fill="var(--card)"/></pattern>'+
 '<pattern id="bw-Other" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="var(--bw)"/><rect width="4" height="1" fill="var(--card)"/><rect width="1" height="4" fill="var(--card)"/></pattern>'+
 '</defs></svg>';
