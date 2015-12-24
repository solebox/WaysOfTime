from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from viewer.models import Maps, MyMaps
from rest_framework import viewsets
from viewer.serializers import MapsSerializer, MyMapsSerializer


class MapsViewSet(viewsets.ModelViewSet):
    """
    API view  of maps O.O
    """
    queryset = Maps.objects.all().order_by('-created_at')
    serializer_class = MapsSerializer


class MyMapsViewSet(viewsets.ModelViewSet):
    """
    API view of MyMaps O.O
    """
    queryset = MyMaps.objects.all().order_by()
    serializer_class = MyMapsSerializer
