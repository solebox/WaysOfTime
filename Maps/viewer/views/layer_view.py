from viewer.models import Maps
from django.http import HttpResponse
from django.views.generic.detail import DetailView
from django.views.decorators.csrf import ensure_csrf_cookie
import re


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
    for map in maps:
        my_map = [float(x.encode('UTF8')) for x in map.bbox.split(',')]
        for point in my_map:
            if left_down[0] <= point <= left_down[1] or left_up[0] <= point <= left_up[1] or right_up[0] <= point <= right_up[1] or right_down[0] <= point <= right_down[1]:
                print(map.title)

    # random: things = Things.object.all().orderby('?')

    return HttpResponse('Success')


class MapInfoView(DetailView):
    model = Maps
    template_name = 'partials/map_info.html'
