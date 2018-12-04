from django.conf.urls import patterns, include, url
from django.contrib import admin
#admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    #url(r'^siparis/test_view$', 'siparis.views.test_view', name='home'),
    # url(r'^yemekci/', include('yemekci.foo.urls')),
    #url(r'^siparis/new_order$', 'siparis.views.new_order'),
    #url(r'^siparis/firma$', 'siparis.views.firma'),
    url(r'^blog/blog_index$', 'blog.views.list_blogs'),
    url(r'^blog/test_view$', 'blog.views.test_view'),
    url(r'^siparis/index$', 'siparis.views.index'),
    url(r'^admin/', include(admin.site.urls)),
)
