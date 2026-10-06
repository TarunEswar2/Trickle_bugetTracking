#!/usr/bin/env python3
"""Builds /RESEARCH.md from the hand-written body (main_new.md), hand-written parts (parts/), generated tables (gen/) and verbatim project docs.
Run:  python3 compose.py   (from this folder).  Regenerate gen/ first with: python3 gen_tables.py"""
import re,json,os
ROOT=os.path.abspath('../../..')
def read(p): return open(p,encoding='utf-8').read()
def demote(text,by=3):
    out=[];fence=False
    for line in text.split('\n'):
        if line.strip().startswith('```'): fence=not fence
        m=re.match(r'^(#{1,6})\s+(.*)$',line)
        if m and not fence:
            n=min(6,len(m.group(1))+by);out.append('#'*n+' '+m.group(2))
        else: out.append(line)
    return '\n'.join(out)
def embed(rel,label):
    t=read(os.path.join(ROOT,rel)).strip('\n')
    lines=t.split('\n')
    title=lines[0].lstrip('# ').strip() if lines and lines[0].startswith('#') else label
    body='\n'.join(lines[1:]) if lines and lines[0].startswith('#') else t
    body=body.replace('in **two tabs, Budget | Savings**','in **two tabs, Budget / Savings**')
    return f"### {label}\n*Verbatim from `{rel}`: {title}. Headings demoted; nothing else changed.*\n\n{demote(body,3)}\n"
parts=[]
parts.append(read('main_new.md').rstrip()+"\n")
parts.append("\n---\n\n"+read('parts/appF_feedback.md'))
# G
parts.append("\n---\n\n## Appendix G. Screen inventory with density measurements\n"
"Measured by `archive/session-workfiles/audit/density.js` in a browser at phone size, with first-time tips off. *Words* are all visible words on the screen (grid cell labels and day numbers count), *₹ values* is the number of rupee amounts shown, *Taps* is the number of visible tappable elements (including the tab bar and keypad keys), *Phone-heights* is how many phone screens tall the content is. Targets set in v15 (V15-1): at most 25 words, 3 ₹ values, 4 taps outside the keypad and tab bar, 1 phone-height.\n\n"
"### G.1 v15 core states (55)\n"+read('gen/screens15.md')+
"\n### G.2 v14 states (116)\n"+read('gen/screens14.md'))
# H
parts.append("\n---\n\n## Appendix H. Copy inventory\n"
"Every visible text string, extracted from the rendered screens (`copy.js`). Bare numbers, currency amounts and symbols are left out. *Jargon terms* are the words from the project's own vocabulary that appear in the string (Appendix T.1).\n\n"
"### H.1 Summary\n"+read('gen/copy_stats.md')+"\n### H.2 Terms the user must understand\n"+read('gen/jargon.md')+
"\n### H.3 v15: every string, by screen\n"+read('gen/copy15_table.md')+
"\n### H.4 v14: every title and question, by screen\n"+read('gen/titles14.md'))
# I build notes
notes=[('docs/claude/mockup_v2_build_notes.md','v2 (22 Sep)'),('docs/claude/mockup_v3_build_notes.md','v3 (23 Sep)'),('docs/claude/mockup_v4_build_notes.md','v4 (23 Sep)'),('docs/claude/mockup_v5_build_notes.md','v5 (23 Sep)'),('docs/claude/mockup_v6_build_notes.md','v6 (23 Sep)'),('docs/claude/mockup_v7_build_notes.md','v7 (23 to 24 Sep)'),('docs/claude/mockup_v8_build_notes.md','v8 (30 Sep)'),('docs/claude/mockup_v9_build_notes.md','v9 (30 Sep)'),('docs/claude/mockup_v10_build_notes.md','v10 (30 Sep)'),('docs/claude/mockup_v11_build_notes.md','v11 (30 Sep to 1 Oct)'),('docs/claude/mockup_v12_build_notes.md','v12 (1 Oct)'),('docs/claude/mockup_v13_build_notes.md','v13 (1 to 2 Oct)')]
parts.append("\n---\n\n## Appendix I. Build notes for v2 to v13\nThe notes written when each version was built, in order. v14 and v15 are covered by the decision logs (Appendix N), `v15_audit.md` and `v15_spec.md`.\n")
for p,l in notes: parts.append(embed(p,l))
parts.append("\n---\n\n## Appendix J. The interview coding in full\nThe only primary data in the repo (Part 2).\n"+embed('docs/research/brymans_analysis_interviews.md','Bryman four-step coding, six interviews'))
parts.append("\n---\n\n## Appendix K. The v12 recovery audit\nThe inventory of 152 items built across v2 to v11, with what v11 dropped and what was brought back (Part 4).\n"+embed('docs/claude/v12_phase1_recovery.md','Recovery audit'))
parts.append("\n---\n\n## Appendix L. Money representation: the research and the scoring behind the grid\n"+embed('docs/claude/v14_stage2_representation.md','Stage 2: fifteen ways to represent money, scored')+"\n"+embed('docs/claude/v14_viz1_budget_gauge.md','Viz 1: the budget gauge, how it was reasoned')+"\n"+embed('docs/claude/v12_phase2c_money_viz_research.md','v12 phase 2c: money visualisation research (39 sources)'))
parts.append("\n---\n\n## Appendix M. Secondary research report\n"+embed('docs/claude/secondary_research_report.md','Secondary research report (Sept 2026)'))
parts.append("\n---\n\n## Appendix N. Decision logs in full\nThe three logs as written, so every decision can be read in one place. Counts and a domain view are in Part 5.\n"+embed('docs/claude/v12_decisions.md','v12 decision log')+"\n"+embed('docs/claude/v13_decisions.md','v13 decision log')+"\n"+embed('docs/claude/v14_decisions.md','v14 and v15 decision log'))
parts.append("\n---\n\n## Appendix O. Project master synthesis\nThe digest of the first 70 docs (10 Sep to 2 Oct), with evidence tags. Verbatim.\n"+embed('docs/claude/project_master_synthesis.md','Project master synthesis'))
parts.append("\n---\n\n"+read('parts/appP_protocols.md'))
parts.append("\n---\n\n"+read('parts/appQ_engine.md'))
# R inventory
inv=json.load(open('inv.json'))
R=["\n---\n\n## Appendix R. Inventory of the build\nGenerated from the running v14 mockup and the v15 mockup (`inv.js`). Names are the identifiers used in the code.\n"]
R.append("### R.1 Counts\n| | v14 | v15 |\n|---|---|---|\n")
for k in ['screens','sheets','flows','popups','asks','tips']:
    R.append(f"| {k} | {len(inv['v14'][k])} | {len(inv['v15'][k])} |\n")
R.append(f"| action handlers | {inv['v14']['handlers']} | {inv['v15']['handlers']} |\n| input handlers | {inv['v14']['inputHandlers']} | {inv['v15']['inputHandlers']} |\n")
for k,t in [('screens','Screens'),('sheets','Sheets (bottom cards)'),('flows','Flows (full-screen)'),('popups','Pop-ups'),('asks','Ask cards (one question each)'),('tips','First-time tips')]:
    R.append(f"\n### R.2 {t}\nv15: "+', '.join(f'`{x}`' for x in inv['v15'][k])+f"\n\nv14: "+', '.join(f'`{x}`' for x in inv['v14'][k])+"\n")
R.append("\n### R.3 Demo profiles (the student pool, M-2)\n"+'\n'.join(f"- `{x}`" for x in inv['v15']['profiles'])+"\n")
parts.append(''.join(R))
parts.append("\n---\n\n## Appendix S. Git timeline\nEvery commit in the repository (UTC). Work before 1 Oct is in the imported project docs.\n\n"+read('gen/git_timeline.md'))
parts.append("\n---\n\n"+read('parts/appT_ledgers.md'))
out='\n'.join(parts)
open(os.path.join(ROOT,'RESEARCH.md'),'w',encoding='utf-8').write(out)
print(len(out.split('\n')),'lines',len(out.split()),'words')
