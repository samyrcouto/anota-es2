import sys,glob
from PIL import Image
fs=sorted(glob.glob('keys/*.jpg'))[int(sys.argv[1]):int(sys.argv[2])]
cols=4;w,h=480,270;rows=(len(fs)+cols-1)//cols
sh=Image.new('RGB',(cols*w,rows*h),'white')
for i,f in enumerate(fs): sh.paste(Image.open(f).resize((w,h)),((i%cols)*w,(i//cols)*h))
sh.save(sys.argv[3],quality=85)
