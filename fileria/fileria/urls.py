from django.conf.urls import patterns, include, url
from django.conf import settings


urlpatterns = patterns('',
                       url(r'^$', 'fileria.views.home', name='home'),
                       url(r'^post/(?P<post_id>\w+)$', 'fileria.views.post', name='post'),

                       url(r'^admin-panel$', 'adminpanel.views.home', name='adminhome'),
                       url(r'^create-post$', 'adminpanel.views.createpost', name='createpost'),
                       url(r'^edit-post/(?P<post_id>\w+)$', 'adminpanel.views.editpost', name='editpost'),
                       url(r'^show-post/(?P<post_id>\w+)$', 'adminpanel.views.single_post', name='show_post'),

                       url(r'^login', 'authentication.views.login', name='login'),
                       url(r'^register', 'authentication.views.register', name='register'),
                       url(r'^logout$', 'authentication.views.logout', name='logout'),
                       url(r'^activation/(?P<token_id>.*)', 'authentication.views.activation', name='activation'),

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