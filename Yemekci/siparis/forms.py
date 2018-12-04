from django import forms

class Siparis_Formu(forms.Form):
	f_adi = forms.CharField(max_length=100)
	email = forms.EmailField()
	urun_ismi = forms.TextField()
	urun_fiyati = forms.FloatField()
	adres = forms.TextField()

