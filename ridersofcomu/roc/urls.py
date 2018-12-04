from django.conf.urls import patterns, include, url
from django.conf import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
                       # url(r'^test$',
                       #     'website.views.test',
                       #     name='test'),
                       #
                       # url(r'^home$',
                       #     'website.views.mainhome',
                       #     name='mainhome'),

                       url(r'^$',
                           'website.views.home',
                           name='home'),

                       url(r'^honda-safety-turkiye-guvenli-surus-egitimi$',
                           'website.views.egitim',
                           name='egitim'),

                       url(r'^honda-safety-turkiye$',
                           'website.views.egitim',
                           name='egitim'),

                       url(r'^guvenli-surus-semineri$',
                           'website.views.egitim',
                           name='egitim'),

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

handler404 = 'website.views.roc_404_page'
handler500 = 'website.views.roc_500_page'