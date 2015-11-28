import os
from django.http import JsonResponse
from viewer import models
#from Maps.viewer.models import Maps, MyMaps


def getAllThumbs(request):
    maps = Maps.objects.all()
    url = "http://localhost:3000/uploads/{id}/thumb/{thumb_name_ext_stripped}.png"

    results = []
    for map in maps:
        thumb_file_name, ext = os.path.splitext(map.upload_file_name)
        results.append({'id': map.id,
                       'url': url.format(id=map.id,
                                                thumb_name_ext_stripped=thumb_file_name)}),
    return JsonResponse(results,safe=False)


def getAllMaps(request):
    my_maps = MyMaps.objects.all()
    url = "http://localhost:3000/maps/tile/{id}/{xyz}.png"

    return JsonResponse([{
        'id': map.id,
        'url': url.format(id=map.id, xyz='{z}/{x}/{y}')
    } for map in my_maps], safe=False)

