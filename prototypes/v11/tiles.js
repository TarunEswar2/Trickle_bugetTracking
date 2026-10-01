// Shared tile renderer for Trickle v11 pages. Renders SVG strings.
// mode: 'F' rows of 10 split 5|5 (tile ₹100), 'D' ten-frame 2x5 blocks (tile ₹100),
// 'B' one tile = one day of budget (₹200 at ₹6,000/month), plain rows of 10, 'A' flat ₹100 no grouping, etc.
window.TILE = (function(){
  const UNIT = {F:100, D:100, B:200, A:100, C:60, E:200, G:50, H:10, I:100};
  function svg(mode, amount, opt){
    opt = opt||{};
    const s = opt.size||12, g = Math.max(2, Math.round(s*0.2)), gap5 = Math.round(s*0.55);
    const unit = UNIT[mode]; let n = amount/unit;
    const full = Math.floor(n+1e-9), part = n-full;
    const maxTiles = opt.max||120; const clipped = full > maxTiles;
    const shown = Math.min(full, maxTiles);
    const cells = []; // [x,y,fraction]
    const perRow = 10;
    if (mode==='D'){
      // ten-frames: blocks of 2 rows x 5, laid out 2 blocks per line
      const bw = 5*(s+g)-g, bh = 2*(s+g)-g, bgap = Math.round(s*0.9);
      const total = shown + (part>0.01?1:0);
      for (let i=0;i<total;i++){
        const b = Math.floor(i/10), k=i%10, bx=(b%2)*(bw+bgap), by=Math.floor(b/2)*(bh+bgap);
        cells.push([bx+(k%5)*(s+g), by+Math.floor(k/5)*(s+g), i<shown?1:part]);
      }
    } else {
      const total = shown + (part>0.01?1:0);
      for (let i=0;i<total;i++){
        const r=Math.floor(i/perRow), c=i%perRow;
        const extra = (mode==='F'||mode==='B') && c>=5 ? gap5 : 0;
        const rgap = (mode==='F') ? Math.round(s*0.35) : 0;
        cells.push([c*(s+g)+extra, r*(s+g+rgap), i<shown?1:part]);
      }
    }
    let w=0,h=0; cells.forEach(([x,y])=>{w=Math.max(w,x+s);h=Math.max(h,y+s);});
    if(!cells.length){w=s;h=s;}
    const fill = opt.fill||'var(--tile)', empty = opt.empty||'var(--tile-empty)';
    const spent = opt.spent||0; // number of tiles (from end) drawn hollow
    let out = `<svg class="tiles" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${opt.label||''}">`;
    cells.forEach(([x,y,f],i)=>{
      const hollow = i >= cells.length - spent;
      if (f>=0.999){
        out += hollow ? `<rect x="${x+0.75}" y="${y+0.75}" width="${s-1.5}" height="${s-1.5}" rx="2" fill="none" stroke="${empty}" stroke-width="1.5"/>`
                      : `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="2" fill="${fill}"/>`;
      } else {
        const fh = Math.max(1.5, s*f);
        out += `<rect x="${x+0.75}" y="${y+0.75}" width="${s-1.5}" height="${s-1.5}" rx="2" fill="none" stroke="${fill}" stroke-width="1.5" opacity=".55"/><rect x="${x}" y="${y+s-fh}" width="${s}" height="${fh}" rx="1.5" fill="${fill}"/>`;
      }
    });
    out += '</svg>';
    return {html: out, count: n, clipped};
  }
  return {svg, UNIT};
})();
