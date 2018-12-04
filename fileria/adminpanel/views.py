from django.shortcuts import render, render_to_response, redirect
from django.core.context_processors import csrf
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.core.context_processors import csrf
from django.contrib import messages
from django.utils.translation import ugettext as _
from .forms import New_Post
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Post, User


@login_required()
def home(request):
    blog_list = Post.objects.filter(which_user=request.user)
    paginator = Paginator(blog_list, 3)
    page = request.GET.get('page')

    try:
        post_count = paginator.page(page)

    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        post_count = paginator.page(1)

    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        post_count = paginator.page(paginator.num_pages)

    return render_to_response("admin-panel/all-blogs.html",
                              {"blogs": blog_list,
                               "request": request,
                               "post_count": post_count,
                               "read_more": 1})


@login_required()
def single_post(request, post_id):
    root_post = Post.objects.get(id=post_id)

    return render(request, "admin-panel/single-blog-post.html",
                              {'post': root_post,
                               'request': request})


@login_required()
def createpost(request):
    if request.POST:
        post = Post()

        post.title = request.POST['title']
        post.content = request.POST['content']
        post.which_user = request.user
        post.tags = request.POST['tags']
        post.category = request.POST['example-select']

        if request.FILES:
            post.image = request.FILES['image']

        post.save()

        return redirect(reverse(home))

    c = {"request": request}
    c.update(csrf(request))

    return render_to_response("admin-panel/create-post.html",c)


@login_required()
def editpost(request, post_id):
    post = Post.objects.get(id=post_id)

    if request.POST:
        post.title = request.POST['title']
        post.content = request.POST['content']
        post.which_user = request.user
        post.category = request.POST['category']

        post.save()

        return redirect(reverse(home))

    else:
        c = {"id": post.id, "request": request,
             'title': post.title,
             'content': post.content,
             'which_user': post.which_user,
             'category': post.category}

        c.update(csrf(request))

    return render(request, 'admin-panel/edit-post.html', c)