from django.contrib import admin

from viewer.models import Maps
class AdminMaps(admin.ModelAdmin):
    model = Maps

admin.site.register(Maps, AdminMaps)


from viewer.models import MyMaps,Maps
class AdminMyMaps(admin.ModelAdmin):
    model = MyMaps

class AdminMaps(admin.ModelAdmin):
    model = Maps

admin.site.register(MyMaps, AdminMyMaps)


