from django.db import models
from django.core.validators import validate_email

class Blog(models.Model):
	baslik = models.CharField(max_length = 100)
	icerik = models.CharField(max_length = 100)
	olusturulma_tarihi = models.DateTimeField()

class Kullanici(models.Model):
	email = models.EmailField()
	password = models.CharField(max_length=100)
	name = models.CharField(max_length=100)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

