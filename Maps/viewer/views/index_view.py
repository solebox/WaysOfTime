from django.shortcuts import render


def index(request):
    '''This is the index views.'''
    return render(request, 'index.html')


def privacyAndTerms(request):
    '''privacy and terms page'''
    return render(request, 'privacyAndTerms.html')

def getAllMaps2(request):
    my_maps = MyMaps.objects.all()
    url = "http://localhost:3000/maps/tile/{id}/{xyz}.png"

    return JsonResponse([{
        'id': map.id,
        'url': url.format(id=map.id, xyz='{z}/{x}/{y}')
    } for map in my_maps], safe=False)
