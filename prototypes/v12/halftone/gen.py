import numpy as np, json, sys
from PIL import Image
G={"Original":["#FCDC45","#00A54F","#14A866","#86B4EA","#F2F4F6"],
"Trickle Original":["#FFF23A","#00A54F","#0E9A86","#4F7A93","#141414"],
"Savings Grove":["#F6FC5A","#2FA27A","#0E9A86","#2E5E6E","#141414"],
"On Pace":["#3CEFA3","#00A55F","#0E9A86","#2B6F8A","#141414"],
"Payday":["#FCDC45","#F6FC5A","#3CEFA3","#00A55F","#17201A"],
"Food Jar":["#FFDB45","#F68E4F","#C9A922","#8A5A2B","#161412"],
"Travel Jar":["#42F5E1","#4694FF","#5D8BC8","#0052C3","#10141C"],
"Fun Jar":["#FF8FB8","#B64C8E","#8B58A5","#5B3A7A","#141218"],
"Study Jar":["#CFE3FF","#5D8BC8","#6C6FD1","#3E4B8A","#121420"],
"Night Glow":["#4F7A93","#2E4756","#222224","#4F5A66","#0E0E10"],
"Month Story":["#FFDB45","#FF457E","#8721FF","#4694FF","#121218"],
"Goal Reached":["#F6FC5A","#3CEFA3","#42F5E1","#00A55F","#10201A"],
"Fresh Start":["#F9FAFB","#CFF6E6","#9FE7D8","#8FB5D6","#2A3138"],
"Income Ink":["#F9FAFB","#B7B8B8","#848585","#4A4B4D","#141414"],
"Light · Savings Grove":["#FFF9B0","#A8E6C0","#B8E4DC","#C9D9E3","#FFFFFF"],
"Light · Travel":["#D6F7F3","#BFD8FF","#C9D6EC","#A9C1E8","#FFFFFF"],
"Light · Fun":["#FFD6E5","#E3BFD8","#D9C9E6","#C8BCDD","#FFFFFF"],
"B&W":["#F2F2F2","#A0A0A0","#848585","#5A5A5A","#141414"]}
h=lambda s:np.array([int(s[i:i+2],16) for i in (1,3,5)],float)/255
def render(name,pitch=14,S=1200,ss=1,clip=True):
    st=[h(c) for c in G[name]]; N=S*ss
    y,x=(np.mgrid[0:N,0:N]/N).astype(np.float32)
    # mesh field: weighted blobs (TL,TR,R,BR) + base at bottom
    P=[(0,0,.55),(.85,.05,.6),(.95,.5,.45),(.75,.72,.5),(.35,1.25,.4)]
    W=[np.exp(-((x-a)**2+(y-b)**2)/(2*r*r*.35)) for a,b,r in P]
    W=np.stack(W)+1e-6; W/=W.sum(0)
    col=sum(W[i][...,None]*st[i] for i in range(5))
    lum=col@[.299,.587,.114]
    # dot coverage: strong where saturated/dense, fade at bottom
    fade=np.clip((1.0-y)/0.16,0,1)**1.5
    sat=col.max(-1)-col.min(-1)
    cov=np.clip(.35+.6*sat+.25*(1-lum),0,1)*(.12+.88*fade)
    paper=1-(1-col)*0.18*fade[...,None]  # faint tint between dots
    p=pitch*ss
    def screen(ang):
        c,s=np.cos(ang),np.sin(ang); X=(x*N)*c+(y*N)*s; Y=-(x*N)*s+(y*N)*c
        dx=(X/p-np.round(X/p))*p; dy=(Y/p-np.round(Y/p))*p
        d=np.hypot(dx,dy); R=np.sqrt(cov/np.pi)*p*1.05
        return np.clip((R-d)/ss+.5,0,1)
    m=np.maximum(screen(np.deg2rad(45)), .55*screen(np.deg2rad(60)))
    dotc=col*(1-.35*np.clip(lum-.55,0,None))[...,None] + (1-fade[...,None])*0.0
    dotc=np.where(fade[...,None]<1, dotc*fade[...,None]+np.array([.42,.43,.45])*(1-fade[...,None]),dotc)
    img=paper*(1-m[...,None])+dotc*m[...,None]
    u=np.abs(x*2-1); v=np.abs(y*2-1); sq=(u**4+v**4)**.25
    a=np.clip((1-sq)*N/2/ss+.5,0,1)
    out=np.dstack([img,a if clip else np.ones_like(a)])
    im=Image.fromarray((np.clip(out,0,1)*255).astype(np.uint8),"RGBA").resize((S,S),Image.LANCZOS)
    return im
if __name__=="__main__":
    var={"Original":[9,20],"Savings Grove":[9,20],"Month Story":[9,20]}
    for n in G:
        f=n.replace(" · ","-").replace(" ","-").replace("&","n").lower()
        render(n).save(f"{f}.png")
        for pt in var.get(n,[]): render(n,pt).save(f"{f}_{'fine' if pt<14 else 'coarse'}.png")
