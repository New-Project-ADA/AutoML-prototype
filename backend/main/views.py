from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MainSerializer, DataSerializer, AreaSerializer
from .models import Task, DataInput, Area, get_data, get_input
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

import datetime
from rest_framework.decorators import api_view, schema
from rest_framework.schemas import AutoSchema
import os
import pandas as pd
import json
from .plotting import *

class DFSeries():
    def __init__(self, data):
        self.data = data

class TaskView(viewsets.ModelViewSet):
    serializer_class = MainSerializer
    queryset = Task.objects.all()
    
class Areas(viewsets.ModelViewSet):
    serializer_class = AreaSerializer
    queryset = Area.objects.all()
    
    def retrieve(self, request, id, target_date):
        data = get_data(id)
        target_name = ['Low Risk','Normal','Risk','High Risk']
        conf_m, accuracy, next7day = get_data_confusion_matrix(data, target_date)
        png_name = plot_confusion_matrix(conf_m, target_name)
        url = request.build_absolute_uri(f'/media/data/{png_name}')
        data_req = {
            "area": url
        }
        
        file_path = os.path.join(settings.BASE_DIR, 'images/'+png_name)
        
        Area.objects.create(area_pict=file_path)
        
        url = request.build_absolute_uri(f'/media/data/{png_name}')
        data_req = {
            "area": url
        }
        return Response(data_req)

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
        print(list(df_series.columns))
        # df_series.reset_index(inplace=True)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['featured_df'] = df_series.to_json()
        self.perform_create(serializer)
        #  Saving POST'ed file to storage
        # df_series.to_csv(settings.MEDIA_ROOT + '/dataseries/{name}'.format(name=name))
        return Response(serializer.data)

@api_view(['GET'])
@schema(DataInput())
def corr_plot(request, id):
    data = get_data(id)
    topTen, botTen = df_corr_plot(data)
    datas = []
    for i in range(len(topTen)): 
        dat = {
            "index": topTen.index.tolist()[i],
            "topTen": topTen.iloc[i]
        }
        datas.append(dat)
    
    for i in range(len(botTen)):
        dat = {
            "index": botTen.index.tolist()[i],
            "botTen": botTen.iloc[i]
        }
        datas.append(dat)
    
    # corr_formatted = correlation_helper(datas)
    return Response(datas)

@api_view(['GET'])
@schema(DataInput())
def get_all_features(request, id):
    data = get_data(id)
    return Response(list(data.columns))

@api_view(['GET'])
@schema(DataInput())
def get_all_dates(request, id):
    data = get_data(id)
    lst = list(data.index)
    lst_str = [str(x)[:10] for x in lst]
    return Response(lst_str)

@api_view(['GET'])
@schema(DataInput())
def statistic(request, id, area, start_date, end_date):
    c, m, b = get_input(id)
    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d')
    data = []
    stats = statistic_features(c, m, b, area, start_date, end_date, c_true=True,b_true=True,m_true=True)
    for i in range(len(stats[0])):
        dat = {
            "index": stats[0][i],
            "c_k0": stats[1]['k0'][i],
            "c_k1": stats[1]['k1'][i],
            "c_k2": stats[1]['k2'][i],
            "c_v1": stats[1]['v1'][i],
            "c_v2": stats[1]['v2'][i],
            "c_v3": stats[1]['v3'][i],
            "c_v4": stats[1]['v4'][i],
            "c_v5": stats[1]['v5'][i],
            "m_k0": stats[2]['k0'][i],
            "m_k1": stats[2]['k1'][i],
            "m_k2": stats[2]['k2'][i],
            "m_weight": stats[2]['weight'][i],
            "b_k0": stats[3]['k0'][i],
            "b_k1": stats[3]['k1'][i],
            "b_k2": stats[3]['k2'][i],
        }
        data.append(dat)
        
    return Response(data)

@api_view(['GET'])
@schema(DataInput())
def plot_fitur(request, id, target_date, fitur):
    data = get_data(id)
    feature, index = get_data_plot_fitur(data, target_date, [fitur])
    datas = []
    for i in range(len(index)):
        dat = {
            "data": feature[fitur][i],
            "index": str(index[i])[:10]
        }
        datas.append(dat)
    return Response(datas)

@api_view(['GET'])
@schema(DataInput())
def plot_risk(request, id, target_date):
    data = get_data(id)
    index, datas = get_data_plot_risk(data, target_date)
    index = index.strftime("%Y-%m-%d").tolist()
    data_plot_risk = {
        "index": index,
        "data": datas
    }
    data_formatted = plot_risk_helper(data_plot_risk)
    return Response(data_formatted)

@api_view(['GET'])
@schema(DataInput())
def confusion_matrix(request, id, target_date):
    data = get_data(id)
    target_name = ['Low Risk','Normal','Risk','High Risk']
    conf_m, accuracy, next7day = get_data_confusion_matrix(data, target_date)
    data_cm = {
        "cm": conf_m,
        "accuracy": accuracy,
        "next7day": next7day
    }
    
    # plt = plot_confusion_matrix(conf_m, target_name)
    
    return Response(data_cm)

@api_view(['GET'])
@schema(DataInput())
def uncertainty(request, id, target_date):
    data = get_data(id)
    datas = plot_uncertainty(data, target_date)
    return Response(datas)

@api_view(['GET'])
@schema(DataInput())
def plot_area(request, id, area, date_start, date_end):
    data = get_data(id)
    return Response(data.head())


#-------------------------------------------
#-------------Helper Functions--------------
#-------------------------------------------
def plot_risk_helper(data):
    datas = []
    for i in range(len(data["index"])):
        dat = {
            "index": data["index"][i],
            "actual": data["data"]["actual"][i],
            "predicted": data["data"]["predicted"][i]
        }
        datas.append(dat)
    return datas

def risk_helper(data):
    if int(data) == 0:
        data = "low risk"
    elif int(data) == 1:
        data = "normal"
    elif int(data) == 2:
        data = "risk"
    elif int(data) == 3:
        data = "high risk"
        
    return data