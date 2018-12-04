from django.db import models
from django.contrib.auth.models import User


class Proje(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    active = models.BooleanField(null=False, default=True)


class Musteri(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    active = models.BooleanField(null=False, default=True)
    which_user = models.ForeignKey(User)


class Gorev(models.Model):
    which_user = models.ForeignKey(User)
    title = models.CharField(max_length=200, null=True)
    status = models.BooleanField(default=False)
    which_proje = models.ForeignKey(Proje)
    which_musteri = models.ForeignKey(Musteri)
    deadline = models.DateTimeField(null=True)