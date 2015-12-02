import os
from django.http import JsonResponse
from viewer.models import Maps, MyMaps


def getAllThumbs(request):
    """
    :param request: http get request (no params ofc)
    :return: reutrns all the available thumbnails fof the uploaded maps
    """

    searchString = 'null'
    if searchString != 'null':
        maps = Maps.objects.filter(title__contains=searchString)
    else:
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


