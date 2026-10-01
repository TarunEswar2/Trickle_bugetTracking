#!/usr/bin/env python3
import re, sys

SRC = "/tmp/claude-0/-home-claude/860f62eb-517e-5d8f-84c5-65604e6e2975/scratchpad/trickle-v2.html"

with open(SRC, encoding="utf-8") as f:
    raw = f.read()

# raw is a fragment: <style>...</style>\n\n<div class="stage-head">...<script>...</script>
style_m = re.search(r"<style>(.*?)</style>", raw, re.S)
style_body = style_m.group(1)
rest = raw[style_m.end():]

VARIANTS = {
    "a": dict(
        title="Trickle — Dark Calm",
        bg="#0e0f0e", panel="#171816", panel2="#1e201d", panel3="#23251f",
        ink="#f4f4f1", ink2="#8f9089", ink3="#5c5d58", line="#2a2b28",
        dark="#a8e6a1", mid="#3a4a37", stage="#08090a",
        accent="#a8e6a1", accent2="#3a4a37",
        hero_font='Georgia, "Times New Roman", serif',
        body_font='"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        solid_ink="#0e0f0e",  # ink color to use as text on solid/accent buttons (light accent -> dark text)
    ),
    "b": dict(
        title="Trickle — Dark Narrative",
        bg="#161320", panel="#1f1b2e", panel2="#272038", panel3="#2d2440",
        ink="#f1eef8", ink2="#a79fc4", ink3="#6f6790", line="#332c48",
        dark="#c9a8ff", mid="#4a3f66", stage="#0f0c18",
        accent="#c9a8ff", accent2="#ffb997",
        hero_font='"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        body_font='"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        solid_ink="#161320",
    ),
    "c": dict(
        title="Trickle — Dark Editorial",
        bg="#0a0a0a", panel="#161616", panel2="#1e1e1e", panel3="#232323",
        ink="#ffffff", ink2="#8a8a8a", ink3="#555555", line="#292929",
        dark="#ff7a45", mid="#3a2418", stage="#000000",
        accent="#ff7a45", accent2="#ffd23f",
        hero_font='"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        body_font='"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        solid_ink="#0a0a0a",
    ),
}

def build(v):
    d = VARIANTS[v]
    css = style_body

    # 1. Replace :root var block
    root_block = re.search(r":root\{(.*?)\}", css, re.S).group(0)
    new_root = (
        ":root{\n"
        f"    --bg:{d['bg']};\n"
        f"    --panel:{d['panel']};\n"
        f"    --panel2:{d['panel2']};\n"
        f"    --panel3:{d['panel3']};\n"
        f"    --ink:{d['ink']};\n"
        f"    --ink2:{d['ink2']};\n"
        f"    --ink3:{d['ink3']};\n"
        f"    --line:{d['line']};\n"
        f"    --dark:{d['dark']};\n"
        f"    --mid:{d['mid']};\n"
        f"    --stage:{d['stage']};\n"
        f"    --accent:{d['accent']};\n"
        f"    --accent2:{d['accent2']};\n"
        f"    --solid-ink:{d['solid_ink']};\n"
        "}"
    )
    css = css.replace(root_block, new_root, 1)

    # 2. Swap body font-family to serif for A (whole app uses body_font by default already Inter);
    css = css.replace(
        'font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
        f'font-family:{d["body_font"]};'
    )

    # 3. literal hex color replacements (icon strokes / misc chrome) -> theme vars
    css = css.replace("background:#fff", "background:var(--panel3)")
    css = css.replace("color:#fff", "color:var(--solid-ink)")
    css = css.replace("border:1px solid #bdbdbd", "border:1px solid var(--line)")
    css = css.replace("background:#cfcfcf", "background:var(--panel3)")
    css = css.replace("background:#1f1f1f", f"background:{d['accent']}")
    css = css.replace("background:#d2d2d2", "background:var(--panel3)")
    css = css.replace("background:#e3e3e3", "background:var(--panel3)")
    css = css.replace("color:#a01c1c", "color:#ff6b6b")

    # 4. .btn.solid should use accent bg + solid-ink text (money CTA)
    css = css.replace(
        ".btn.solid{background:var(--dark);color:var(--solid-ink)}",
        ".btn.solid{background:var(--dark);color:var(--solid-ink)}"
    )
    # pill.on already uses var(--dark) bg; give it solid-ink text
    css = css.replace(
        ".pill.on{background:var(--dark);color:var(--solid-ink);border-color:var(--dark)}",
        ".pill.on{background:var(--dark);color:var(--solid-ink);border-color:var(--dark)}"
    )

    # 5. hero-number styling per exploration
    hero_css = f"""
  /* ---- exploration hero styling ---- */
  .amt, #home-weekly, #home-daily, #accd-total, #accd-avg, #td-amt, #cd-spent,
  #gd-saved, #sd-amt, .mega {{
    font-family:{d['hero_font']};
  }}
  .tab.on{{color:var(--accent)}}
  .btn.solid{{background:var(--accent);color:var(--solid-ink)}}
  .btn.solid:hover{{filter:brightness(1.08)}}
  .pill.on{{background:var(--accent);color:var(--solid-ink);border-color:var(--accent)}}
"""
    css += hero_css

    new_style = f"<style>{css}</style>"

    body = rest
    # replace SVG stroke/fill literal colors so icons are visible on dark bg
    body = body.replace('stroke="#111"', 'stroke="var(--ink)"')
    body = body.replace('stroke="#5a5a5a"', 'stroke="var(--ink2)"')
    body = body.replace('background:#fff;padding:0 10px', 'background:var(--panel3);padding:0 10px')
    body = body.replace('background:#fff"', 'background:var(--panel3)"')

    # JS-side hardcoded hex used inside generated SVG strings
    body = body.replace("stroke=\\\"#111\\\"", "stroke=\\\"" + d['ink'] + "\\\"")  # not expected but safe
    body = body.replace("fill=\"#e4e4e4\"", "fill=\"" + d['line'] + "\"")
    body = body.replace("fill=\"#8e8e8e\"", "fill=\"" + d['ink3'] + "\"")
    body = body.replace("fill=\"#111\"", "fill=\"" + d['ink'] + "\"")
    body = body.replace("i===maxIdx?'#333':'#b6b6b6'", f"i===maxIdx?'{d['accent']}':'{d['line']}'")
    body = body.replace("i===maxIdx?'#111':'#8e8e8e'", f"i===maxIdx?'{d['ink']}':'{d['ink3']}'")
    body = body.replace("stroke=\"#111\"", "stroke=\"" + d['ink'] + "\"")

    # donut shade() function -> use accent-tinted palette instead of plain greys (search for function body)
    m = re.search(r"function shade\(i,n\)\{.*?\n\}", body, re.S)
    if m:
        old = m.group(0)
        if v == "c":
            # category-color-coded: cycle through a fixed palette for editorial
            new = (
                "function shade(i,n){\n"
                "  var palette=['#ff7a45','#ffd23f','#8ab4ff','#7ee787','#ff8fb1','#c792ea','#5fd0d0','#f4a261'];\n"
                "  return palette[i % palette.length];\n"
                "}"
            )
        else:
            new = (
                "function shade(i,n){\n"
                f"  var base=[{d['accent']!r},{d['accent2']!r}];\n"
                "  var c=base[i%base.length];\n"
                "  var fade=1-(Math.floor(i/base.length)*0.22);\n"
                "  if(fade<0.35)fade=0.35;\n"
                "  var hex=c.replace('#','');\n"
                "  var r=parseInt(hex.substring(0,2),16),g=parseInt(hex.substring(2,4),16),b=parseInt(hex.substring(4,6),16);\n"
                "  return 'rgba('+r+','+g+','+b+','+fade.toFixed(2)+')';\n"
                "}"
            )
        body = body.replace(old, new)

    # friction bar segment colors set inline via style in JS (search pattern)
    body = re.sub(r"background:#[0-9a-fA-F]{3,6}", "background:var(--panel3)", body)

    doc = f"""<title>{d['title']}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
{new_style}
<style>:root{{color-scheme:dark}} body{{background:var(--stage)}}</style>
{body}
"""
    out = f"/tmp/claude-0/-home-claude/860f62eb-517e-5d8f-84c5-65604e6e2975/scratchpad/trickle-dark-{v}.html"
    with open(out, "w", encoding="utf-8") as f:
        f.write(doc)
    print("wrote", out)

for v in ["a","b","c"]:
    build(v)
