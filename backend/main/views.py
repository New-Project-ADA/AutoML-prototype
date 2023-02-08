from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MainSerializer
from .models import Task

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = MainSerializer
    queryset = Task.objects.all()