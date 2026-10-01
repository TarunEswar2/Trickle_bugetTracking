import math,json
S=[("Chai",25),("Auto ride",60),("Food order",350),("Subscription (Spotify+)",499),("Week's spending",1200),("Food category budget",2400),("Savings so far",3000),("Goal ₹8,000 at 52%",4160),("Monthly budget",6000),("Monthly income",9000)]
B=6000
C={
"A ₹100 flat":lambda v:(v/100,None),
"B 1 day of budget":lambda v:(v/(B/30),None),
"C 1% of budget":lambda v:(v/(B/100),None),
"D Ten-frame ₹100 (2×5)":lambda v:(v/100,5),
"E Personal unit (₹200)":lambda v:(v/200,None),
"F ₹100, rows of 10 split 5|5":lambda v:(v/100,5),
"G ₹50 flat":lambda v:(v/50,None),
"H ₹10 flat":lambda v:(v/10,None),
"I ₹100 tile + ₹1,000 bar":lambda v:(v/100,'bar'),
}
def readtime(n,g):
    # subitize <=4 ~0.4s; grouped: count groups of 5 (0.35s/group)+ remainder subitized; ungrouped >4: 0.3s/item counting
    full=int(n); part=n-full
    if g=='bar': groups=full//10; rem=full%10; t=0.5+groups*0.35+ (0.4 if rem<=4 else 0.4+0.3*(rem-4)) + 0.3  # decode 2 glyph types
    elif g==5: groups=full//5; rem=full%5; t=0.5+groups*0.3+0.4
    else: t=0.5+(0.4 if full<=4 else 0.4+0.3*(full-4))
    if part>0.01: t+=0.4
    return round(t,1)
out={}
for k,f in C.items():
    rows=[]
    for name,v in S:
        n,g=f(v); rows.append((name,v,round(n,2),readtime(n,g)))
    out[k]=rows
for k,r in out.items():
    print(k, [(x[0][:8],x[2],x[3]) for x in r], 'avg',round(sum(x[3] for x in r)/len(r),1),'max',max(x[2] for x in r))
json.dump(out,open('/home/claude/v11/sim.json','w'),ensure_ascii=False)
