from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MainSerializer, DataSerializer
from .models import Task, DataInput
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = MainSerializer
    queryset = Task.objects.all()
    
class DataInput(viewsets.ModelViewSet):
    queryset = DataInput.objects.order_by('-id')
    serializer_class = DataSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        serializer.save()
        
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)