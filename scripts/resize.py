from __future__ import print_function
import os, sys
from PIL import Image
DEST = "/home/efrat/Documents/images"
TUMB = "/home/efrat/Documents/thumbs"

size = (800, 600)


def resize(file,outfile):
	outfile = os.path.splitext(file)[0] + ".png"
	if file != outfile:
	  try:
	  	im = Image.open(file)
	  	#im.thumbnail(size)
	  	im.convert("RGB")
	  	im.resize((600, 950), Image.ANTIALIAS)
	  	im.save(outfile,"PNG", icc_profile=im.info.get('icc_profile'))

	  except IOError:
	  	print ("Canot resize file "+file)



for f in os.listdir(DEST):
	resize(os.path.join(DEST,f),os.path.join(TUMB,f))




