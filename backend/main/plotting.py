import matplotlib.pyplot as plt
import base64
from io import BytesIO

import glob
import numpy as np
import pandas as pd
import matplotlib.cm as cm
from shapely.geometry import Point, Polygon

from .models import DataInput
import views

def get_graph():
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph

def preprocess():
    return

def get_plot():

    return 