S='/tmp/claude-0/-home-claude/860f62eb-517e-5d8f-84c5-65604e6e2975/scratchpad/'
A=S+'v11/audit_shots/';I=S+'shots7/insights_'
C={
'v9tx':(A+'v9_home.png',(0,300,412,760),'v9 recent spends rows'),
'v6cat':(A+'v6_cats.png',(0,0,412,620),'v6 category detail & share'),
'v7home':(A+'v7_home.png',(0,0,412,560),'v7 safe-to-spend hero'),
'v7four':(I+'0.png',(0,160,412,600),'v7 "4 things changed"'),
'v7runway':(I+'0.png',(206,470,412,640),'v7 budget runway'),
'v7pace':(I+'0.png',(0,600,412,820),'v7 period pace + projection'),
'v7streak':(I+'0.png',(0,1420,412,1620),'v7 streak dots'),
'v7dumb':(I+'1.png',(0,190,412,470),'v7 this vs last (same days)'),
'v7months':(I+'1.png',(0,740,412,1060),'v7 6 months × category'),
'v7big':(I+'1.png',(0,1060,412,1250),'v7 biggest single buy'),
'v7top':(I+'1.png',(0,1400,412,1640),'v7 top places'),
'v7owed':(I+'2.png',(0,230,412,470),'v7 owed to you'),
'v7payday':(I+'2.png',(0,660,412,850),'v7 next money in (paydays)'),
'v7inout':(I+'2.png',(0,850,412,1130),'v7 in vs out'),
'v7forecast':(I+'3.png',(0,0,412,230),'v7 end-of-month forecast'),
'v7rate':(I+'3.png',(0,780,206,950),'v7 savings rate'),
'v7eta':(I+'3.png',(0,1150,412,1380),'v7 goal ETA'),
'v7goal':(S+'shots7/goalDetail.png',(0,0,412,640),'v7 goal detail'),
's6sub':(S+'shots6/subDetail_SselSubspotify.png',(0,0,412,640),'v6 subscription yearly cost'),
'v3ins':(A+'v3_ins.png',(0,0,412,600),'early pace + weekday heatmap'),
'redesign':(A+'redesign_home.png',(0,0,412,600),'redesign metaphors'),
'onb_sms':(A+'onb_sms.png',(0,0,412,600),'lo-fi SMS screen (never)'),
}
for i,t in enumerate(['Money flow (Sankey)','Where it went','Repeat buys added up','Repeat buys per place','Spend range','This vs last month','When you spend','Savings growing']):
    C[f'v9w{i}']=('/home/claude/v12/shots/v9_w%d.png'%i,None,'v9 '+t)
