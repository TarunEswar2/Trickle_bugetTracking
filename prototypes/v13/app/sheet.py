import sys,os
from PIL import Image,ImageDraw
d=sys.argv[1];ids=sys.argv[2].split(',');cols=int(sys.argv[4]) if len(sys.argv)>4 else 5
ims=[Image.open(f'{d}/{i}.png') for i in ids];w,h=412//2,860//2
S=Image.new('RGB',(cols*(w+8),((len(ims)+cols-1)//cols)*(h+22)),'#777')
dr=ImageDraw.Draw(S)
for k,(i,im) in enumerate(zip(ids,ims)):
  x=(k%cols)*(w+8);y=(k//cols)*(h+22);S.paste(im.resize((w,h)),(x,y+20));dr.text((x+4,y+4),i,fill='white')
S.save(sys.argv[3])
