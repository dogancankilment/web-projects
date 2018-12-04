from django.shortcuts import render_to_response, render, HttpResponse
from django.core.context_processors import csrf
from django.contrib.auth.decorators import login_required
from authentico.models import User
from .forms import GorevEkle, MusteriEkle, ProjeEkle
from .models import Gorev, Musteri, Proje


def blank(request):
    return render_to_response("blank.html")


def home(request):
    tum_gorevler = Gorev.objects.all()
    tum_projeler = Proje.objects.all()
    tum_musteriler = Musteri.objects.all()
    tum_kullanicilar = User.objects.all()

    c = {"request": request,
         "tum_gorevler": tum_gorevler,
         "tum_kullanicilar": tum_kullanicilar,
         "tum_musteriler": tum_musteriler,
         "tum_projeler": tum_projeler}

    c.update(csrf(request))

    return render_to_response("home/home.html", c)


def duzenle_kullanici(request, username):
    getirilen_kullanici = User.objects.get(username=username)

    return HttpResponse(getirilen_kullanici.email)


def musteri_duzenle(request, id):
    duzenlenecek_musteri = Musteri.objects.get(username=id)

    c = {"request": request,
         "duzenlenecek_musteri": duzenlenecek_musteri}

    c.update(csrf(request))

    return render_to_response("add/musteri-ekle.html", c)


def musteriekle(request):
    if request.POST:
        yeni_musteri = MusteriEkle()

        # yeni_musteri.title = request.POST["title"]
        # yeni_musteri.content = request.POST["content"]
        # yeni_musteri.active = request.POST["aktif-select"]

        yeni_musteri.save()

        c = {"request": request}
        c.update(csrf(request))

        return render_to_response("home/home.html", c)

    form = MusteriEkle()

    c = {"form": form,
         "request": request}

    c.update(csrf(request))

    return render(request, "add/musteri-ekle.html", c)


def gorevekle(request):
    if request.POST:
        user = request.POST["user-select"]
        proje = request.POST["proje-select"]
        musteri = request.POST["musteri-select"]

        current_user = User.objects.filter(username=user)
        current_proje = Proje.objects.filter(title=proje)
        current_musteri = Musteri.objects.filter(title=musteri)

        yeni_gorev = Gorev()

        yeni_gorev.title = request.POST["title"]
        yeni_gorev.which_musteri = current_musteri[0]
        yeni_gorev.which_user = current_user[0]
        yeni_gorev.which_proje = current_proje[0]

        yeni_gorev.save()

        c = {"request":request}
        c.update(csrf(request))

        return render_to_response("home/home.html", c)

    form = GorevEkle()
    tum_kullanicilar = User.objects.all()
    tum_projeler = Proje.objects.all()
    tum_musteriler = Musteri.objects.all()

    c = {"form": form,
         "tum_kullanicilar": tum_kullanicilar,
         "tum_projeler": tum_projeler,
         "tum_musteriler": tum_musteriler,
         "request": request}

    c.update(csrf(request))

    return render(request, "add/gorev-ekle.html", c)


def projeekle(request):
    if request.POST:
        yeni_proje = Proje()

        yeni_proje.title = request.POST["title"]
        yeni_proje.content = request.POST["content"]
        yeni_proje.active = request.POST["aktif-select"]
        yeni_proje.deadline = request.POST["deadline"]

        yeni_proje.save()

        c = {"request": request}
        c.update(csrf(request))

        return render_to_response("home/home.html", c)

    form = ProjeEkle()

    c = {"form": form,
         "request": request}

    c.update(csrf(request))

    return render(request, "add/proje-ekle.html", c)


def musteriduzenle(request):
    return HttpResponse("musteri duzenle")


def gorevduzenle(request):
    return HttpResponse("musteri duzenle")


def projeduzenle(request):
    return HttpResponse("proje duzenle")