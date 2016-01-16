#!/usr/bin/python
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Maps.settings")
import lxml.etree as ET
from viewer import models

from glob import glob
import re

import xmltodict
import pprint
import json
import requests
class NLLIntegration:

    def __init__(self):

        self.xml_dir = "/home/sole/map_xmls"
        self.filename_to_xml_data_map = {}
        self.maps_dict = {}

    def make_filename_to_xml_data_map(self):
        self.filename_to_xml_data_map = {}
        xml_files = glob(self.xml_dir+"/NNL*.xml")

        for xfile in xml_files:
            filename = "NNL0100" + os.path.basename(xfile).lstrip("NNL_MAPS00").rstrip("xml") + "tif"
            self.filename_to_xml_data_map[filename] = xfile

        # print(self.filename_to_xml_data_map)

    def create_maps_dict(self):
        self.make_filename_to_xml_data_map()
        for key, value in self.filename_to_xml_data_map.items():
            self.maps_dict[key] = self.extract_info_from_xml(value)
            my_json = json.dumps(self.maps_dict, sort_keys=True, indent=4, separators=(',', ': '))
            with open("output.json","w+") as json_file:
                json_file.write(my_json)


    def extract_info_from_xml(self, xml_location):
        tree = ET.parse(xml_location)
        # root = ET.fromstring("<ul><li><a>s</a></li><li><a>b</a></li></ul>")
        root = tree.getroot()

        xml_data = root.xpath('//JAGROOT')

        with open(xml_location) as fd:
            obj = xmltodict.parse(fd.read())
            pp = pprint.PrettyPrinter(depth=11)
            record = obj['SEGMENTS']['JAGROOT']['RESULT']['DOCSET']['DOC']['PrimoNMBib']['record']

            return record

    def fetch_xml_for_map_from_nnl(self, map_number):
        map_number = map_number.lstrip("NNL0100")  # just in case someone forgot to remove the redundant prefix
        # (f#$%ing exlibris)
        url = ""
        response = requests.get()

    def update_db_from_json_file(self, json_file):
        """
        data is loaded for maps from a json lines file , if its a single map it will be a single json object
        if its more than itll be an object per line
        :param json_file: the json lines file that will be used to update the database
        :return:
        """

        with open(json_file) as json_input:
            for line in json_input:
                parsed_line = json.loads(line)
                filename = parsed_line.get("cms_number", None) + ".tif"

                title = parsed_line.get('title',None)
                description = parsed_line.get('description',None)
                published_date = parsed_line.get('published_date', '')
                subject_area = parsed_line.get('subject_area', None)
                publisher = parsed_line.get('publisher', None)
                authors = parsed_line.get('authors', None)

                self.update_map_info(filename, title=title, description=description,
                                     subject_area=subject_area, publisher=publisher, authors=authors)

    def update_map_info(self, file_name, **kwargs):
        maps_to_update = models.Maps.objects.filter(filename__endswith=file_name)

        title = kwargs.get('title', None)
        description = kwargs.get('description', None)
        published_date = kwargs.get('published_date', '')
        subject_area = kwargs.get('subject_area', None)
        publisher = kwargs.get('publisher', None)
        authors = kwargs.get('authors', None)
        maps_to_update.update(title=title, description=description,
                             subject_area=subject_area, publisher=publisher, authors=authors)
        # print(map.filename)
        # map.save()


if __name__ == "__main__":
    nnl_integration = NLLIntegration()
    json_file = "/vagrant/Maps/lib/json_lines_sample.json"
    nnl_integration.update_db_from_json_file(json_file)

