from rest_framework import serializers
import viewer.models as models


class MapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Maps
        fields = (
            'title',
            'description',
            'filename',
            'status',
            'upload_file_name',
            'publisher',
            'owner_id',
            'source_uri',
            'created_at',
            'authors',
            'scale',
            'public',
        )

class MyMapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MyMaps
        fields = (
            'map_id',
            'user_id',
            'create_at',
            'updated_at'
        )