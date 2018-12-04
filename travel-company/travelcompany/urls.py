from django.conf.urls import patterns, include, url
from django.conf import settings

urlpatterns = patterns('',
                       url(r'^$',
                           'travelcompany.views.home',
                           name='home'),

                       url(r'^anasayfa-1$',
                           'travelcompany.views.home',
                           name='secondhome'),

                       url(r'^anasayfa-2$',
                           'travelcompany.views.secondhome',
                           name='secondhome'),

                       url(r'^hakkimizda$',
                           'travelcompany.views.aboutus',
                           name='aboutus'),

                       url(r'^iletisim$',
                           'travelcompany.views.contactus',
                           name='contactus'),

                       url(r'^galeri-1$',
                           'travelcompany.views.firstgallery',
                           name='firstgallery'),

                       url(r'^galeri-2$',
                           'travelcompany.views.secondgallery',
                           name='secondgallery'),
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
