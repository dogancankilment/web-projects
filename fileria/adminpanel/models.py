from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    category = models.CharField(max_length=100)
    tags = models.TextField()
    which_user = models.ForeignKey(User)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='blog_posts/',
                              default='blog_posts/default.jpg')
    is_verified = models.BooleanField(default=False)


    class Meta:
        ordering = ['-updated_at']