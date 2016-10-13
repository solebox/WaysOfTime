from viewer.models import Maps
from django.http import HttpResponse
from django.views.generic.detail import DetailView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render
import os, re


@ensure_csrf_cookie
def getGeoThumbs(request):
    '''
    get all images inside lat lngs area
    '''
    lenlat = request.POST.getlist('lenlat[]')
    # Get all the sides of the searched area the user choose.
    left_down = [float(x.encode('UTF8')) for x in re.findall('\d+.\d+', lenlat[0])]
    left_up = [float(x.encode('UTF8')) for x in re.findall('\d+.\d+', lenlat[1])]
    right_up = [float(x.encode('UTF8')) for x in re.findall('\d+.\d+', lenlat[2])]
    right_down = [float(x.encode('UTF8')) for x in re.findall('\d+.\d+', lenlat[3])]

    # query the db for all the maps.
    maps = Maps.objects.all()

    # Check if any point of the bbox map is in the area the user choose.
    maps_found = []
    for map in maps:
        my_map = [float(x.encode('UTF8')) for x in map.bbox.split(',')]
        for point in my_map:
            if left_down[0] <= point <= left_down[1] or left_up[0] <= point <= left_up[1] or right_up[0] <= point <= right_up[1] or right_down[0] <= point <= right_down[1]:
                maps_found.append(map)
                break

    # random: things = Things.object.all().orderby('?')

    maps_with_urls = [generate_url_for_map2(map) for map in maps_found]
    val_dict = {'maps_with': maps_with_urls}

    thambs = render(request, 'layouts/map_thumbnail.html', val_dict)

    return HttpResponse(thambs)


class MapInfoView(DetailView):
    model = Maps
    template_name = 'partials/map_info.html'


def generate_url_for_map2(map):
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