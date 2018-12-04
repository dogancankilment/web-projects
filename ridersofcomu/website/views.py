from django.shortcuts import render_to_response, render, redirect
from django.core.context_processors import csrf
from django.template import RequestContext


def home(request):
    if request.POST:
        c = {"request": request}
        c.update(csrf(request))

        return render_to_response("home.html",
                              c)

    c = {"request": request}
    c.update(csrf(request))

    return render_to_response("home.html",
                              c)


def egitim(request):
    if request.POST:
        c = {"request": request}
        c.update(csrf(request))

        return render_to_response("comingsoon/coming-soon.html",
                              c)
    c = {"request": request}
    c.update(csrf(request))

    return render_to_response("comingsoon/coming-soon.html",
                              c)


def roc_404_page(request, template_name='404.html'):
    # 404 error handler. Templates: `404.html' Context: None
    return render_to_response(template_name,
                              context_instance=RequestContext(request))


def roc_500_page(request, template_name='500.html'):
    # 500 error handler. Templates: `500.html' Context: None
    return render_to_response(template_name,
                              context_instance=RequestContext(request))

# def test(request):
#     c = {"request": request}
#     c.update(csrf(request))
#
#     return render(request,
#                   "index.html",
#                   c)
#
#
# def mainhome(request):
#     c = {"request": request}
#     c.update(csrf(request))
#
#     return render_to_response("home.html",
#                               c)