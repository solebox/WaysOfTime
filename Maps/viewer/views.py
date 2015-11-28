from django.shortcuts import render

links = {'Home':'/home', 'Contact':'/contact',
         'About':'/about', 'Help':'/help',}

def index(request):
    '''This is the index views.'''
    return render(request, 'index.html', {'links': links})


def privacyAndTerms(request):
    '''privacy and terms page'''
    return render(request, 'privacyAndTerms.html', {'links': links})

