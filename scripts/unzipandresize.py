import tarfile  
import os
import resize

ROOT = "/home/efrat/Documents/19.11.15"
DEST = "/home/efrat/Documents/images"
TUMB = "/home/efrat/Documents/thumbs"


def untar(f):
	zip = tarfile.open(f)  
	zip.extractall(DEST)  

for root, subFolders, files in os.walk(ROOT):

	for f in files:

		filename, file_extension = os.path.splitext(f)
		if file_extension == '.tar':
			try:
				untar(os.path.join(root,f))
			except:
				print("could not untar "+f)
