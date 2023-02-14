import matplotlib.pyplot as plt
import base64
from io import BytesIO

import glob
import numpy as np
import pandas as pd
import matplotlib.cm as cm
from shapely.geometry import Point, Polygon

from .models import DataInput
from .views import *
from django.conf import settings

def get_graph():
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph

def load_data(filename,AREA,date_start=None,date_end=None):
    path = settings.MEDIA_ROOT
    df = pd.read_csv(path + '/data/{filename}'.format(filename=filename)).drop('Unnamed: 0',1)
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
    df['datetime'] = pd.to_datetime(df['datetime'])
    if date_start!=None and date_end!=None:
        df = df[df['datetime']>=date_start][df['datetime']<=date_end]
        '''df_m = df_m[df_m['datetime']>=date_start][df_m['datetime']<=date_end]
        df_b = df_b[df_b['datetime']>=date_start][df_b['datetime']<=date_end]'''
    return df.sort_values('datetime').reset_index(drop=True), minmag, maxmag, Xmax, Xmin, Ymax, Ymin, Zmax, Zmin

def generate_features(CAVE,AREA,Zmax=None,Zmin=None,c_true=True,b_true=True,m_true=True):
    df, minmag, maxmag, Xmax, Xmin, Ymax, Ymin, Zmax, Zmin = load_data(CAVE,AREA)
    df['date'] = df['datetime'].apply(lambda x: x.date())
    
    dateindex = df.date.tolist()
    dt0,dt1 = dateindex[0],dateindex[-1]
    dfs = []
    for df_,C in zip([df],['']):
        df_count = df_.iloc[:][['date','k0']].copy()
        df_count.columns = ['date','mcount']
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

def data_for_plot(filename):
    df_series = generate_features(filename,'',c_true=True,b_true=True,m_true=True)
    return df_series

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


def get_corr_plot(series):
    plt.figure(figsize=(12,6))
    top10corr, bot10corr = df_corr_plot(series)
    ppsbot = plt.bar(bot10corr.index, bot10corr.values, alpha=0.75, color='green')
    ppstop = plt.bar(top10corr.index, top10corr.values, alpha=0.75, color='red')
    for pp in list(ppsbot)+list(ppstop):
        height = pp.get_height()
        if height<0:
            plt.text(x=pp.get_x() + pp.get_width() / 2, y=height+(height/10)-0.05, s="{}%".format(round(height*100,1)), ha='center', fontsize=8)
        else:
            plt.text(x=pp.get_x() + pp.get_width() / 2, y=height+(height/10), s="{}%".format(round(height*100,1)), ha='center', fontsize=8)
    plt.axhline(0, color='k')
    plt.xticks(rotation=45, ha='right', fontsize=18)
    plt.yticks(fontsize=18)
    plt.ylim([-1,1])
    plt.title('Correlation to Label (Top 10 and Bottom 10)', fontsize=20)
    graph = get_graph()
    return graph

def statistic_features(CAVE,AREA,date_start=None,date_end=None,Zmax=None,Zmin=None,c_true=True,b_true=True,m_true=True):
    df, df_m, df_b, minmag, maxmag, Xmax, Xmin, Ymax, Ymin, Zmax, Zmin = load_data(CAVE,AREA,date_start,date_end)
    stats = df.describe()
    if m_true:
        stats = [df.describe(), df_m.describe()]
    if b_true:
        try:
            stats += [df_b.describe()]
        except:
            stats = [df.describe(), df_b.describe()]
    print(len(stats))
    return stats