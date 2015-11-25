from django.contrib import admin

from viewer.models import Maps
class AdminMaps(admin.ModelAdmin):
    model = Maps

admin.site.register(Maps, AdminMaps)


from viewer.models import MyMaps
class AdminMyMaps(admin.ModelAdmin):
    model = MyMaps

admin.site.register(MyMaps, AdminMyMaps)

