"""Maps URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from viewer import views
from django.contrib.sitemaps.views import sitemap

from viewer import sitemaps

router = routers.DefaultRouter()
router.register(r'maps', views.MapsViewSet)
router.register(r'my_maps', views.MyMapsViewSet)

sitemaps = {'map': sitemaps.MapSitemap}

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name='home'),
    url(r'^get_map_by_id/(?P<map_id>\d+)/$', views.get_map_by_id),
    url(r'^getThumbs/(?P<stringToSearch>[-\w.]+)/$', views.get_thumbs),
    url(r'get_map_info/(?P<map_id>\d+)/$', views.get_map_info),
    url(r'^getGeoThumbs/$', views.getGeoThumbs),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^getLayer/(?P<img_id>[-\w]+)/$',views.getLayer),
    url(r'^api/v1/', include(router.urls)),

    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps},
    name='django.contrib.sitemaps.views.sitemap')
]
