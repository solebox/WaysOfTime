import urllib
import urllib.request
import os
from lxml import etree
import json

NEW_DIR = '/home/efrat/Documents/data'
JS_DIR = '/home/efrat/Documents/js'
def traverse_dir():

	ns = {'sear':"http://www.exlibrisgroup.com/xsd/jaguar/search"
	}

	

	for fileName in os.listdir(NEW_DIR):

		root = etree.parse(os.path.join(NEW_DIR,fileName))
		print(fileName)
		js = {}
		#adding fields:

		
		val = root.xpath("//*[local-name() = 'record']/*[local-name() = 'display']/*[local-name() = 'title']/text()",namespaces=ns)
		js['title'] = val[0] if val != [] else ""
		"\n".join(root.xpath("//*[local-name() = 'record']/*[local-name() = 'search']/*[local-name() = 'general']/text()",namespaces=ns)[:3])
		js['description'] = val[0] if val != [] else "" 
		val = root.xpath("//*[local-name() = 'record']/*[local-name() = 'display']/*[local-name() = 'publisher']/text()",namespaces=ns)
		js['publisher'] =  val[0] if val != [] else ""
		val = root.xpath("//*[local-name() = 'record']/*[local-name() = 'display']/*[local-name() = 'creator']/text()",namespaces=ns)
		js['authors'] =  val[0] if val != [] else ""
		val = root.xpath("//*[local-name() = 'record']/*[local-name() = 'display']/*[local-name() = 'lds01']/text()",namespaces=ns)
		js['scale'] = val[0] if val != [] else "" 
		val = root.xpath("//*[local-name() = 'record']/*[local-name() = 'display']/*[local-name() = 'creationdate']/text()",namespaces=ns)
		js['published_date'] = val[0] if val != [] else "" 
		val = root.xpath("//*[local-name() = 'record']/*[local-name() = 'display']/*[local-name() = 'subject']/text()",namespaces=ns)
		js['subject_area'] = val[0] if val != [] else "" 
		val = root.xpath("//*[local-name() = 'record']/*[local-name() = 'control']/*[local-name() = 'sourcerecordid']/text()",namespaces=ns)
		js['cms_number'] = val[0] if val != [] else ""


		with open(os.path.join(JS_DIR,fileName[:-4]+".js"),"w") as f:
			json.dump(js,f)



traverse_dir()