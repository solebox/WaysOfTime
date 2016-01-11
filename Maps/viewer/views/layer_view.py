from django.shortcuts import render
from django.http import JsonResponse
from viewer.models import Maps
import os

def getGeoThumbs(request):
    '''
    get all images inside lat lngs area
    '''
    pass
    # params = request.POST.getlist('lng_lat[]')
    # maps = Maps.objects.all()
    # img_id = 1
    # map = Maps.objects.filter(id__contains=img_id)
    #
    # url = "http://localhost:3000/uploads/{id}/thumb/{thumb_name_ext_stripped}.png"
    # path = "/uploads/thumb/{thumb_name_ext_stripped}.png"
    # val_dict = {}
    #
    # thumb_file_name, ext = os.path.splitext(map.upload_file_name)
    #
    # val_dict['id'] = map.id
    # val_dict['title'] = map.title
    #
    # val_dict['thumb_url'] = url.format(id=map.id,thumb_name_ext_stripped=thumb_file_name)
    # val_dict['thumb_path'] = path.format(id=map.id, thumb_name_ext_stripped=thumb_file_name)
    # return render(request, 'layouts/layer_item.html', val_dict)

def get_map_info(request, map_id):
    map = Maps.objects.filter(id__contains=map_id)[0]

    val_dict = {}
    for att in map.__dict__:
        val_dict["map_{0}".format(att)]=map.__dict__[att]

    data = {}
    data['data'] = val_dict

    return render(request, 'partials/map_info.html', data)

