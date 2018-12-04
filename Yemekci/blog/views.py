from django.shortcuts import render, redirect
from django.http import HttpResponse
from models import Blog
from datetime import datetime

def test_view(request):
	return HttpResponse("Hello world")

def list_blogs(request):
	blog_list = Blog.objects.all()
	c={"blogs":blog_list}
	return render(request, "blog_index.html" ,c)

