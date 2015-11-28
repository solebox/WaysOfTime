import os
from django.http import JsonResponse
from viewer.models import Maps, MyMaps


def getAllThumbs(request):
    """
    :param request: http get request (no params ofc)
    :return: reutrns all the available thumbnails fof the uploaded maps
    """
    maps = Maps.objects.all()
    url = "http://localhost:3000/uploads/{id}/thumb/{thumb_name_ext_stripped}.png"
    path = "/uploads/thumb/{thumb_name_ext_stripped}.png"
    results = []
    for map in maps:
        thumb_file_name, ext = os.path.splitext(map.upload_file_name)
        results.append({'id': map.id,
                       'url': url.format(id=map.id,
                                         thumb_name_ext_stripped=thumb_file_name),
                        'path': path.format(id=map.id,
                                            thumb_name_ext_stripped=thumb_file_name)})

    return JsonResponse(results, safe=False)


def getAllMaps(request): # fixme - this function will be deprecated as soon as we finish, until then , it returns
                         # fixme - an array with only one map in it , the last one.
    my_map = MyMaps.objects.last()
    url = "http://localhost:3000/maps/tile/{id}/{xyz}.png"

    response = JsonResponse([{
        'id': my_map.id,
        'url': url.format(id=my_map.id, xyz='{z}/{x}/{y}')
    }], safe=False)

    return response

