import sys,glob,os
from PIL import Image,ImageDraw
d=sys.argv[1];names=sys.argv[2].split(',');out=sys.argv[3]
ims=[Image.open(f'{d}/{n}.png') for n in names]
w,h=ims[0].size;sc=0.5;cols=len(ims)
W=int(w*sc);H=int(h*sc)
M=Image.new('RGB',(W*cols+8*(cols-1),H+20),'white')
for i,(n,im) in enumerate(zip(names,ims)):
  M.paste(im.resize((W,H)),(i*(W+8),20));ImageDraw.Draw(M).text((i*(W+8)+4,4),n,fill='black')
M.save(out)
