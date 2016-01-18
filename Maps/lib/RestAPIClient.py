import requests

class RestAPIClient:

    def __init__(self, api_token=None):
        """

        :param api_token: the api key we want to use, if no key is passed only get requests will work
        :return:
        """
        self.token = api_token
        self.api_version = "v1"
        self.maps_uri = "http://mapabazman.com/api/{api_version}/maps/".format(api_version="v1")
        self.my_maps_uri = "http://mapabazman.com/api/{api_version}/my_maps/".format(api_version="v1")
        self.format = "json"


    def update_map_info(self,map_id, title, description, publisher, authors, scale, public):
        """
        those are the parametes and their types
        :param map_id: integer - the id of the map we want to edit
        :param title: string - the new title we want to give the mapo
        :param description: string - the new description we want to give the map
        :param publisher: string - the name of the published
        :param authors: string the names of the authors
        :param scale: string the scale of the map
        :param public: - boolean if the map is public or not
        :return: the response of the rest request or false if there is no auth-token
        """
        if not self.token:
            return False
        url = self.maps_uri + str(map_id) + "/"
        data = {
            "title" : title,
            "description" : description,
            "published" : publisher,
            "authors" : authors,
            "scale" : scale,
            "public": public,
            "format": self.format
        }
        return requests.put(url, data)

    def get_map_info(self, map_id):
        url = self.maps_uri + str(map_id) + "/"
        params = {
            "format": self.format
        }
        return requests.get(url, params)

    def get_all_maps(self):
        url = self.maps_uri
        params = {
            "format": self.format
        }
        return requests.get(url, params)


if __name__ == "__main__":
    token = "your token"
    rest_api_client = RestAPIClient(token)