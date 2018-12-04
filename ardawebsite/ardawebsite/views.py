from django.shortcuts import render_to_response


def home(request):
    return render_to_response('home/home.html')


def about(request):
    return render_to_response('home/about.html')


def contact(request):
    return render_to_response('home/contact.html')


def team(request):
    return render_to_response('home/doctors.html')