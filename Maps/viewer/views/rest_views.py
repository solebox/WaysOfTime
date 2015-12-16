from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from viewer.models import Maps, MyMaps
from viewer.serializers import MapsSerializer, MyMapsSerializer


class MapsViewSet(mixins.CreateModelMixin, viewsets.ReadOnlyModelViewSet):
    """
    API view  of maps O.O
    """
    queryset = Maps.objects.all().order_by('-created_at')
    serializer_class = MapsSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class MyMapsViewSet(viewsets.ModelViewSet):
    """
    API view of MyMaps O.o
    073185ff7ee023876f323e34ad6a0aee4eca7cb3
    """
    queryset = MyMaps.objects.all().order_by()
    serializer_class = MyMapsSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)