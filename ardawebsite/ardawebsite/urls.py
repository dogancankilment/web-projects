from django.conf.urls import patterns, include, url
from django.conf import settings

urlpatterns = patterns('',
                       url(r'^$',
                           'ardawebsite.views.home',
                           name='home'),

                       url(r'^hakkimizda$',
                           'ardawebsite.views.about',
                           name='about'),

                       url(r'^iletisim$',
                           'ardawebsite.views.contact',
                           name='contact'),

                       url(r'^team$',
                           'ardawebsite.views.team',
                           name='team'),
                       )

if settings.DEBUG:
    urlpatterns += patterns('',
                            (r'^media/(?P<path>.*)$',
                             'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}))

if settings.DEBUG:   # if DEBUG is True it will be served automatically
    urlpatterns += patterns('',
                            url(r'^static/(?P<path>.*)$',
                                'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
                            )