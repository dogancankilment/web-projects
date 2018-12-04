from django.shortcuts import render_to_response
from django.http import HttpResponse


def home(request):
    return render_to_response("index.html")


def secondhome(request):
    return render_to_response("index-2.html")


def aboutus(request):
    return render_to_response("aboutus.html")


def contactus(request):
    return render_to_response("contactus.html")


def firstgallery(request):
    return render_to_response("gallery3column.html")


def secondgallery(request):
    return render_to_response("gallery4column.html")