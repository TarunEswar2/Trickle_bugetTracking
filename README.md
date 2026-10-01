# Trickle — student budget tracking

A UPI-based budgeting app for students. This repo holds the design record and the
clickable HTML prototypes (v2–v13), plus the v14 facts-first restart.

## Start here
- **Current decisions:** [`docs/claude/v14_decisions.md`](docs/claude/v14_decisions.md)
- **Facts and principles:** [`docs/claude/v14_stage0_facts.md`](docs/claude/v14_stage0_facts.md)
- **Primary research:** [`docs/research/brymans_analysis_interviews.md`](docs/research/brymans_analysis_interviews.md)
- **Whole-project synthesis:** [`docs/claude/project_master_synthesis.md`](docs/claude/project_master_synthesis.md)

## Layout
| Folder | What is in it |
|---|---|
| `docs/` | All 77 project docs: research, phase plans, audits, specs, decision logs, build notes |
| `prototypes/v8`–`v13` | Prototype sources (modular JS + `build*.py` + validators); `prototypes/v7` holds the v7 spec |
| `archive/session-workfiles/` | Built single-file prototypes `trickle-final-v3…v12.html`, early explorations, research boards, v14 stage boards (`s2/`) |
| `archive/working-notes/` | Earlier drafts of v6–v8 planning docs |
| `references/inspiration/` | Visual reference images |

## Running a prototype
Open a built file in a browser, e.g. `prototypes/v13/app/trickle-final-v13.html#demo`
(`#demo` skips onboarding). To rebuild: `python3 build13.py` inside `prototypes/v13/app`.

## Status
v14 in progress: visualisations 1 (budget gauge) and 2 (pay/friction) decided; visualisation 3 (income split) next.
