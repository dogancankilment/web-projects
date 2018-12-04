from django.shortcuts import render_to_response, render
from django.core.context_processors import csrf
from adminpanel.models import Post
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse


def post(request, post_id):
    root_post = Post.objects.get(id=post_id)

    return render(request, "home/blog-post.html",
                  {'post': root_post,
                   'request': request})


def home(request):
    blog_list = Post.objects.all() # get(is_verified="False")

    # page = request.GET.get('page')

    # try:
    #     post_count = paginator.page(page)
    #
    # except PageNotAnInteger:
    #     # If page is not an integer, deliver first page.
    #     post_count = paginator.page(1)
    #
    # except EmptyPage:
    #     # If page is out of range (e.g. 9999), deliver last page of results.
    #     post_count = paginator.page(paginator.num_pages)

    return render(request, "home/home.html",
                              {"blogs": blog_list,
                               "request": request,
                               "read_more": 1})
