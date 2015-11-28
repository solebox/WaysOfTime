from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from viewer.models import Maps, MyMaps


def index(request):
    '''This is the index views.'''
    return render(request, 'index.html')


def privacyAndTerms(request):
    '''privacy and terms page'''
    return render(request, 'privacyAndTerms.html')

def getImage(request, img_id):
    ''' get an image url to place on the page when thumbnail is clicked '''
    my_map = MyMaps.objects.filter(map_id__contains=img_id)
    url = "http://localhost:3000/maps/tile/{id}/{xyz}.png"

    response = JsonResponse([{
        'id': my_map[0].id,
        'url': url.format(id=my_map.id, xyz='{z}/{x}/{y}')
    }], safe=False)

    return response
