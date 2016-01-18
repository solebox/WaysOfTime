import urllib
import urllib.request
import os
from lxml import etree

ROOT_DIR = '/home/efrat/Documents/19.11.15'
NEW_DIR = '/home/efrat/Documents/shata'
def traverse_dir(rootDir):

	ns = {'mets':'http://www.loc.gov/METS/',
				'dc':"http://purl.org/dc/elements/1.1/",
				'dcterms':"http://purl.org/dc/terms/",
				'xsi':"http://www.w3.org/2001/XMLSchema-instance"}
	for dirName in os.listdir(ROOT_DIR):
		fs = os.listdir(os.path.join(ROOT_DIR,dirName))

		root = etree.parse(os.path.join(ROOT_DIR,dirName,[x for x in fs if "xml" in x][0]))

		el = root.xpath("//*[local-name()='section' and @id='CMS']//*[local-name()='key' and @id='recordId']", namespaces=ns)
		yield([x for x in fs if "xml" not in x][0],el[0].text)




def get_primo(idNum):
	url = 'http://primo.nli.org.il/PrimoWebServices/xservice/search/brief?'
	params = urllib.parse.urlencode({
	  'institution': 'NNL',
	  'loc': 'local,scope:(NNL_MAPS)',
	  'query': 'any,contains,'+str(idNum),
	  'indx': '1',
	  'bulkSize': '50'
	})
	req = urllib.request.Request(url, params.encode('utf-8'))

	response = urllib.request.urlopen(url+params)
	return response.read().decode('utf-8')

it = traverse_dir(ROOT_DIR)

for fname,idNum in it:

	os.mkdir(os.path.join(NEW_DIR,fname) )
	with open(os.path.join(NEW_DIR,fname,idNum+".xml"), 'w') as f2write:
		f2write.write(get_primo(idNum))	