from django.conf.urls import patterns, include, url
from django.conf import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$',
                           'home.views.home',
                           name='home'),

                       url(r'^blank$',
                           'home.views.blank',
                           name='blank'),

                       url(r'^login$',
                           'authentico.views.login',
                           name='login'),

                       url(r'^register$',
                           'authentico.views.register',
                           name='register'),

                       url(r'^logout$',
                           'authentico.views.logout',
                           name='logout'),

                       url(r'^proje/ekle$',
                           'home.views.projeekle',
                           name='projeekle'),

                       url(r'^musteri/ekle$',
                           'home.views.musteriekle',
                           name='musteriekle'),

                       url(r'^gorev/ekle$',
                           'home.views.gorevekle',
                           name='gorevekle'),

                       url(r'^duzenle/(?P<username>\w+)',
                           'home.views.duzenle_kullanici',
                            name='duzenle_kullanici'),

                       )

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
                            (r'^media/(?P<path>.*)$',
                             'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}))

if settings.DEBUG:   # if DEBUG is True it will be served automatically
    urlpatterns += patterns('',
                            url(r'^static/(?P<path>.*)$',
                                'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                            )