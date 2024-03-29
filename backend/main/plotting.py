import matplotlib.pyplot as plt
import base64
from io import BytesIO

import glob
import numpy as np
import pandas as pd
import matplotlib.cm as cm
from shapely.geometry import Point, Polygon
import itertools

from .models import DataInput
from .views import *
from django.conf import settings
from sklearn.metrics import confusion_matrix, f1_score
from django.conf.urls.static import static


def load_data(df,df_m,df_b,AREA,date_start=None,date_end=None):
    path = settings.MEDIA_ROOT
    '''df = pd.read_csv(path + '/data/{filename}'.format(filename=filename)).drop('Unnamed: 0',1)
    df_m = pd.read_csv(f'./katalog/{FOLDER}m{CAVE}.csv').drop('Unnamed: 0',1)
    df_b = pd.read_csv(f'./katalog/{FOLDER}b{CAVE}.csv').drop('Unnamed: 0',1)'''
    df = df[df['bound']!='0']
    df = df[df['v3']>=0]
    minmag = min(df['v5'].min(), -3)
    df = df[df['v5']>=minmag]
    minmag = df['v5'].min()
    maxmag = df['v5'].max()
    Xmax = df['k0'].max()
    Xmin = df['k0'].min()
    Ymax = df['k1'].max()
    Ymin = df['k1'].min()
    Zmax = df['k2'].max()
    Zmin = df['k2'].min()
    area_var = ['D','A','B','C'] 
    if AREA in area_var:
        df = df[df['bound']==AREA]
        df_m = df_m[df_m['bound']==AREA]
        df_b = df_b[df_b['bound']==AREA]
    df['datetime'] = pd.to_datetime(df['datetime'])
    df_m['datetime'] = pd.to_datetime(df_m['datetime'])
    df_b['datetime'] = pd.to_datetime(df_b['datetime'])
    if date_start!=None and date_end!=None:
        df = df[df['datetime']>=date_start][df['datetime']<=date_end]
        df_m = df_m[df_m['datetime']>=date_start][df_m['datetime']<=date_end]
        df_b = df_b[df_b['datetime']>=date_start][df_b['datetime']<=date_end]
    return df.sort_values('datetime').reset_index(drop=True), df_m.sort_values('datetime').reset_index(drop=True), df_b.sort_values('datetime').reset_index(drop=True), minmag, maxmag, Xmax, Xmin, Ymax, Ymin, Zmax, Zmin

def generate_features(c,m,b,AREA,Zmax=None,Zmin=None,c_true=True,b_true=True,m_true=True):
    df, df_m, df_b, minmag, maxmag, Xmax, Xmin, Ymax, Ymin, Zmax, Zmin = load_data(c,m,b,AREA)
    df['date'] = df['datetime'].apply(lambda x: x.date())
    df_m['date'] = df_m['datetime'].apply(lambda x: x.date())
    df_b['date'] = df_b['datetime'].apply(lambda x: x.date())
    dateindex = df.date.tolist()
    dt0,dt1 = dateindex[0],dateindex[-1]
    dfs = []
    for df_,C in zip([df,df_m,df_b],['',' M',' B']):
        df_count = df_.iloc[:][['date','k0']].copy()
        df_count.columns = ['date',C.lower()+'count']
        df__agg = df_.drop(['bound','datetime'],1).groupby('date').agg(['sum','max','min','mean','median','std','skew']).fillna(0)
        df__agg.columns = ['%s%s' % (a, C+'|%s' % b if b else '') for a, b in df__agg.columns]
        dfs += [pd.concat([df__agg, df_count.groupby('date').agg('count')], 1)]

    from tqdm import tqdm
    slopes = {k+'|slope':[] for k in df.drop(['bound','datetime','date'],1).columns}
    valleys = {k+'|downcount':[] for k in df.drop(['bound','datetime','date'],1).columns}
    peaks = {k+'|upcount':[] for k in df.drop(['bound','datetime','date'],1).columns}
    upsums = {k+'|upsum':[] for k in df.drop(['bound','datetime','date'],1).columns}
    downsums = {k+'|downsum':[] for k in df.drop(['bound','datetime','date'],1).columns}
    for idxs in tqdm(df.reset_index().groupby(['date']).agg({'index':list})['index']):
        columns = df.drop(['bound','datetime','date'],1).columns
        for col in columns:
          try:
            slopes[col+'|slope'] += [df[[col]].loc[idxs].apply(lambda x: np.polyfit(range(len(idxs)), x, 1)[0])[0]]
            valleys[col+'|downcount'] += [df[[col]].loc[idxs].diff().fillna(0).apply(lambda x: x<0).sum()[0]]
            peaks[col+'|upcount'] += [df[[col]].loc[idxs].diff().fillna(0).apply(lambda x: x>0).sum()[0]]
            upsums[col+'|upsum'] += [df[col].loc[idxs].diff().fillna(0).apply(lambda x: x if x>0 else 0 ).sum()]
            downsums[col+'|downsum'] += [df[col].loc[idxs].diff().fillna(0).apply(lambda x: x if x<0 else 0 ).sum()]
          except:
            slopes[col+'|slope'] += [0]
            valleys[col+'|downcount'] += [0]
            peaks[col+'|upcount'] += [0]
            upsums[col+'|upsum'] += [0]
            downsums[col+'|downsum'] += [0]

    df_stat = pd.concat(dfs + [pd.DataFrame(slopes, index=dfs[0].index).fillna(0), 
                        pd.DataFrame(valleys, index=dfs[0].index).fillna(0), pd.DataFrame(peaks, index=dfs[0].index).fillna(0), 
                        pd.DataFrame(upsums, index=dfs[0].index).fillna(0), pd.DataFrame(downsums, index=dfs[0].index).fillna(0)], 1)
    df_series = pd.DataFrame(index=pd.date_range(dt0,dt1)).join(df_stat, how='left').fillna(0)
    return df_series

def data_for_plot(df,df_m,df_b):
    df_series = generate_features(df,df_m,df_b,'',c_true=True,b_true=True,m_true=True)
    return df_series

#------------------------------------------------
#get data untuk plot
#------------------------------------------------

def df_corr_plot(series):
    df_features = series.reset_index(drop=True) 
    window = 30
    ## Get Original Label
    label_series = df_features['v5|max'].iloc[window:]
    ## Get all shifted
    cols = [col+'|'+str(i).zfill(2) for i in range(1,31) for col in df_features.columns]
    df_features = pd.concat([df_features.shift(window-i).iloc[window:] for i in range(window)], 1)
    df_features.columns = cols
    df_features['label'] = label_series
    df_corr = df_features.corr()
    print('CORRPLOT')
    top10corr = df_corr['label'].dropna().sort_values()[:10][::-1]
    bot10corr = df_corr['label'].dropna().sort_values()[-11:-1][::-1]
    return top10corr, bot10corr

def area_plotting(c, m, b, AREA, date_start=None,date_end=None,Zmax=None,Zmin=None,c_true=True,b_true=True,m_true=True):
    df, df_m, df_b, minmag, maxmag, Xmax, Xmin, Ymax, Ymin, Zmax, Zmin = load_data(c, m, b,AREA,date_start,date_end)
    df['series'] = 20
    df_m['series'] = 40
    df_b['series'] = 60

    data = [
        {
            "x": list(df['k0']) + list(df_m['k0']) + list(df_b['k0']),
            "y": list(df['k1']) + list(df_m['k1']) + list(df_b['k1']),
            "z": list(df['k2']) + list(df_m['k2']) + list(df_b['k2']),
            "series": list(df['series']) + list(df_m['series']) + list(df_b['series']),
        }
    ]
    
    return data
    

def statistic_features(c, m, b, AREA,date_start=None,date_end=None,Zmax=None,Zmin=None,c_true=True,b_true=True,m_true=True):
    df, df_m, df_b, minmag, maxmag, Xmax, Xmin, Ymax, Ymin, Zmax, Zmin = load_data(c, m, b,AREA,date_start,date_end)
    
    # transpose df describe and rename the indexes #
    stats_c = df.describe().transpose()
    index_c = help_func_index('c', stats_c.index.values.tolist())
    stats_m = df_m.describe().transpose()
    index_m = help_func_index('m', stats_m.index.values.tolist())
    stats_b = df_b.describe().transpose()
    index_b = help_func_index('b', stats_b.index.values.tolist())
    # -------------------------------------------- #
    
    index = index_c
    if m_true:
        stats = [[index, index_m], stats_c, stats_m]
    if b_true:
        try:
            stats[0] += [index_b]
            stats += [stats_b]
        except:
            stats = [[index,index_b], index_c, index_b]
            
    data = []
    for i in range(len(stats[1])):
        dat = {
            "index": stats[0][0][i],
            "count": stats[1]['count'][i],
            "mean": stats[1]['mean'][i],
            "std": stats[1]['std'][i],
            "min": stats[1]['min'][i],
            "dualima": stats[1]['25%'][i],
            "limapuluh": stats[1]['50%'][i],
            "tujuhlima": stats[1]['75%'][i],
            "max": stats[1]['max'][i],
        }
        data.append(dat)
        
    for i in range(len(stats[2])):
        dat = {
            "index": stats[0][1][i],
            "count": stats[2]['count'][i],
            "mean": stats[2]['mean'][i],
            "std": stats[2]['std'][i],
            "min": stats[2]['min'][i],
            "dualima": stats[2]['25%'][i],
            "limapuluh": stats[2]['50%'][i],
            "tujuhlima": stats[2]['75%'][i],
            "max": stats[2]['max'][i],
        }
        data.append(dat)
        
    for i in range(len(stats[3])):
        dat = {
            "index": stats[0][2][i],
            "count": stats[3]['count'][i],
            "mean": stats[3]['mean'][i],
            "std": stats[3]['std'][i],
            "min": stats[3]['min'][i],
            "dualima": stats[3]['25%'][i],
            "limapuluh": stats[3]['50%'][i],
            "tujuhlima": stats[3]['75%'][i],
            "max": stats[3]['max'][i],
        }
        data.append(dat)
    return data

def get_data_plot_fitur(series,target_date,fitur,window=30):
    X = series.loc[:target_date].iloc[-30:]
    index = X.index
    print(X[fitur])
    return X[fitur], index

def get_data_plot_risk(series,target_date,tnoutput=7, get_score=True):
    X = series.loc[target_date:].iloc[:tnoutput]
    index = X.index
    randomvalues = np.random.uniform(0,1,[3,tnoutput])
    data = {
        'actual': [min(max((_)//1,0),3) for _ in X['v5|max'].values],
        'predicted': [min(max((_)//1,0),3) for _ in X['v5|max'].values+randomvalues.mean(0)],
    }
    return index, data

def get_data_confusion_matrix(series,target_date,tnoutput=55, get_score=True):
    X = series.loc[target_date:].iloc[:tnoutput]
    index = X.index
    randomvalues = np.random.uniform(0,1,[3,tnoutput])
    data = {
        'actual': [min(max((_)//1,0),3) for _ in X['v5|max'].values],
        'predicted': [min(max((_)//1,0),3) for _ in X['v5|max'].values+randomvalues.mean(0)],
    }
    next7day = int(np.random.uniform(0,5)//1)
    cm = confusion_matrix(data['actual'],data['predicted'], labels = [0,1,2,3])
    accuracy = np.trace(cm) / np.sum(cm).astype('float')

    return cm, accuracy, next7day

def plot_confusion_matrix(cm,
                          target_names,
                          title='Confusion matrix',
                          cmap=None,
                          normalize=False):
    
  
    accuracy = np.trace(cm) / np.sum(cm).astype('float')
    misclass = 1 - accuracy

    if cmap is None:
        cmap = plt.get_cmap('Blues')

    plt.rc('font', size=24)
    plt.figure(figsize=(6*int(np.sqrt(len(target_names))), 4*int(np.sqrt(len(target_names)))))
    plt.rc('font', size=24)
    plt.imshow(cm, cmap=cmap)
    plt.title(title)
    plt.colorbar()

    if target_names is not None:
        tick_marks = np.arange(len(target_names))
        plt.xticks(tick_marks, target_names, rotation=-90)
        plt.yticks(tick_marks, target_names)

    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]


    thresh = cm.max() / 1.5 if normalize else cm.max() / 2
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        if normalize:
            plt.text(j, i, "{:0.4f}".format(cm[i, j]),
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")
        else:
            plt.text(j, i, "{:,}".format(cm[i, j]),
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label (ACC={:0.4f})'.format(accuracy))
    name = "confusion_matrix.png"
    plt.savefig('images/'+name)
    plt.close()
    return name


def plot_uncertainty(series,target_date,tnoutput=7):
    X = series.loc[target_date:].iloc[:tnoutput]
    index = X.index
    randomvalues = np.random.uniform(-1,1,[3,tnoutput])
    data = []
    for i in range(tnoutput):
      data.append({
          'index': str(index[i])[:10],
          'actual': X['v5|max'].values[i],
          'median': (X['v5|max'].values+randomvalues.mean(0))[i],
          "lowerupper":[
              (X['v5|max'].values+randomvalues.min(0))[i],
              (X['v5|max'].values+randomvalues.max(0))[i]
          ]
      })
    return data

def help_func_index(type, lst):
    res = []
    for i in range(len(lst)):
        if type == 'c':
            res.append("c_"+lst[i])
        elif type == 'b':
            res.append("b_"+lst[i])
        elif type == 'm':
            res.append("m_"+lst[i])
            
    return res