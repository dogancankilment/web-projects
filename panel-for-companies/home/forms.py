from django.forms import ModelForm, forms
from .models import Gorev, Musteri, Proje


class GorevEkle(ModelForm):
    class Meta:
        model = Gorev
        exclude = ['which_user', 'status', 'which_proje', 'which_musteri']


class MusteriEkle(ModelForm):
    class Meta:
        model = Musteri
        exclude = ['active']


class ProjeEkle(ModelForm):
    class Meta:
        model = Proje
        exclude = ['active']