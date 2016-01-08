from django.shortcuts import render
from django.http import JsonResponse
from viewer.models import Maps
import os


def getLayer(request, img_id):
    '''
    get an image url to place on the page when thumbnail is clicked
    '''
    map = Maps.objects.filter(id__contains=img_id)[0]

    url = "http://localhost:3000/uploads/{id}/thumb/{thumb_name_ext_stripped}.png"
    path = "/uploads/thumb/{thumb_name_ext_stripped}.png"
    val_dict = {}

    thumb_file_name, ext = os.path.splitext(map.upload_file_name)

    val_dict['id'] = map.id
    val_dict['title'] = map.title

    val_dict['thumb_url'] = url.format(id=map.id,thumb_name_ext_stripped=thumb_file_name)
    val_dict['thumb_path'] = path.format(id=map.id, thumb_name_ext_stripped=thumb_file_name)

    return render(request, 'layouts/layer_item.html',val_dict)


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
    val_dict = {}
    val_dict['map_name'] = 'mappy'
    val_dict['map_info'] = 'this map is very mapppy indeed , we love mappy map map.\
        it has been a long time since we have seen info about a map.\
        and what concrete and amazing info it is!'
    return render(request, 'partials/map_info.html', val_dict)

