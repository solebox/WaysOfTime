import os

from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render

from viewer.models import Maps, MyMaps
from django.db.models import Q

def get_thumbs(request, stringToSearch):
    """
    :param request: http get request (no params ofc)
    :return: reutrns all the available thumbnails fof the uploaded maps
    """

    if stringToSearch != 'null':
        maps = Maps.objects.filter(Q(title__contains=stringToSearch)|Q(description__contains=stringToSearch)|Q(subject_area__contains=stringToSearch)|Q(cached_tag_list__contains=stringToSearch))
    else:
        maps = Maps.objects.all()
    maps_with_urls = [generate_url_for_map(map) for map in maps]
    val_dict = {'maps_with': maps_with_urls}
    return render(request, 'layouts/map_thumbnail.html', val_dict)


def generate_url_for_map(map):
    """
    this is doc
    """
    map_with_url = {'id': map.id, 'title': map.title}
    url = "http://localhost:3000/uploads/{id}/thumb/{thumb_name_ext_stripped}.png"
    path = "/uploads/thumb/{thumb_name_ext_stripped}.png"

    thumb_file_name, ext = os.path.splitext(map.upload_file_name)
    map_with_url['url'] = url.format(id=map.id, thumb_name_ext_stripped=thumb_file_name)
    map_with_url['upload_file_name'] = map.upload_file_name
    return map_with_url


