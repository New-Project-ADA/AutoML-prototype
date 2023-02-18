from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MainSerializer, DataSerializer
from .models import Task, DataInput, get_data
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.conf import settings
from django.http import JsonResponse
from django.core.files.storage import default_storage

from rest_framework.decorators import api_view, schema
from rest_framework.schemas import AutoSchema
import os
import pandas as pd
import json
from .plotting import *

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

    def create(self, request):
        c1 = pd.read_csv(request.FILES[u'input_c1']).drop('Unnamed: 0',1)
        b1 = pd.read_csv(request.FILES[u'input_b1']).drop('Unnamed: 0',1)
        m1 = pd.read_csv(request.FILES[u'input_m1']).drop('Unnamed: 0',1)
        df_series = data_for_plot(c1, m1, b1)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['featured_df'] = df_series.to_json()
        self.perform_create(serializer)
        #  Saving POST'ed file to storage
        # df_series.to_csv(settings.MEDIA_ROOT + '/dataseries/{name}'.format(name=name))
        return Response(serializer.data)

@api_view(['GET'])
@schema(DataInput())
def monitor(request, id):
    datas = get_data(int(id))
    return Response(datas.head(15))

@api_view(['GET'])
@schema(DataInput())
def statistic(request, id):
    datas = get_data(int(id))
    return Response(datas.head())