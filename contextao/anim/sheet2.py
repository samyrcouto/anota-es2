import sys,glob
from PIL import Image
d=sys.argv[4] if len(sys.argv)>4 else 'keys2'
fs=sorted(glob.glob(d+'/*.jpg'))[int(sys.argv[1]):int(sys.argv[2])]
cols=4;w,h=480,270;rows=(len(fs)+cols-1)//cols
sh=Image.new('RGB',(cols*w,rows*h),'white')
for i,f in enumerate(fs): sh.paste(Image.open(f).resize((w,h)),((i%4)*w,(i//4)*h))
sh.save(sys.argv[3],quality=85)
