from django.shortcuts import render, render_to_response, redirect
from django.core.context_processors import csrf
from models import Musteri, Firma, Siparis
#from forms import *
from django.core.mail import send_mail

def index(request):
	menu = Firma.objects.all()
	c = {"menu":menu}
	c.update(csrf(request))
	return render_to_response("index.html",c)

def test_view(request):
	return render_to_response("index.html",c)

def new_order(request):
	m = Musteri.objects.filter(email=request.POST['m_adi'])	
	if request.method == 'POST':	
		form = Siparis_Formu(request.POST)
		if form.is_valid():
			siparis = Siparis(f_adi=form.cleaned_data.get('f_adi'),
					  email=form.cleaned_data.get('email'),
					  urun_ismi=form.cleaned_data.get('urun_ismi'),
					  urun_fiyati=form.cleaned_data.get('urun_fiyati'),
					  adres=form.cleaned_data.get('adres'))
			siparis.save()
			request.session['m_email'] = m.m_email
			m_email = request.session['m_email']
			send_mail('Yemekci Siparis Onayi', 'Siparisiniz Alinimistir', 'dogancankilment@gmail.com',
    				 [m_email], fail_silently=False)
			return redirect('/siparis/index')
	else:
		c = {}
		c.update(csrf(request))
		return render_to_response("index.html",c)

def firma(request):
	c = {}
	c.update(csrf(request))
	return render_to_response("firma.html",c)
