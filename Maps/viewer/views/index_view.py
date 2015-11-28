from django.shortcuts import render


def index(request):
    '''This is the index views.'''
    return render(request, 'index.html')


def privacyAndTerms(request):
    '''privacy and terms page'''
    return render(request, 'privacyAndTerms.html')

