from django.contrib.sitemaps import Sitemap
from viewer.models import Maps, MyMaps

class MapSitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return Maps.objects.all()

    def lastmod(self, obj):
        return obj.updated_at

    def location(self, obj):
        return "/%s" % obj.upload_file_name  # fixme: change to actual location