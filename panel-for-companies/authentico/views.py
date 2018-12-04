from django.shortcuts import redirect, render, render_to_response
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from .forms import UserCreateForm, LoginForm
from django.utils.translation import ugettext as _
from django.core.context_processors import csrf


@login_required()
def logout(request):
    auth.logout(request)
    return redirect(reverse('home'))


def register(request, template_name="authentico/register.html"):
    form = UserCreateForm(request.POST or None)

    if request.POST:
        if form.is_valid():
            form.save()

            return HttpResponseRedirect(reverse(login))

    c = {"form": form,
         "request": request}

    c.update(csrf(request))

    return render_to_response(template_name, c)


def login(request):
    form = LoginForm(request.POST or None)

    if form.is_valid():
        user = authenticate(username=form.cleaned_data['username'],
                            password=form.cleaned_data['password'])

        if user:
                auth.login(request, user)

                return HttpResponseRedirect(reverse('home'))

        else:
            messages.error(request,
                           (_('Boyle bir kullanici sistemde kayitli degil')))

    c = {"request": request,
         "login_form": form}

    c.update(csrf(request))

    return render_to_response('authentico/login.html', c)