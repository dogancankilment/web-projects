from django.db import models

# Create your models here
class Musteri(models.Model):
	m_adi = models.CharField(max_length=100)
	m_soyadi = models.CharField(max_length=100)
	m_email = models.EmailField()	
	adres = models.TextField()

class Firma(models.Model):
	f_adi = models.CharField(max_length=100)
	urun_ismi = models.TextField()
	urun_fiyati = models.FloatField()

class Siparis(models.Model):
	siparis_eden = models.ForeignKey(Musteri)
	siparis_urunu = models.ForeignKey(Firma, related_name='siparis_urunu')
	siparis_fiyati = models.ForeignKey(Firma, related_name='siparis_fiyati')
	
