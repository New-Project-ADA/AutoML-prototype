"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from main import views
from django.conf import settings
from django.conf.urls.static import static

# import routers from the REST framework
# it is necessary for routing
from rest_framework import routers
 
# create a router object
router = routers.DefaultRouter()

# register the router
router.register(r'tasks',views.TaskView, 'task')

router.register(r'datainput', views.DataInput, 'datainput')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/features/<int:id>', views.get_all_features, name='all_features'),
    path('api/monitor/corr/<int:id>', views.corr_plot, name='corr_plot'),
    path('api/monitor/plot_fitur/<int:id>/<str:target_date>/<str:fitur>', views.plot_fitur, name='plot_fitur'),
    path('api/monitor/plot_risk/<int:id>/<str:target_date>', views.plot_risk, name='plot_risk'),
    path('api/monitor/confusion_matrix/<int:id>', views.confusion_matrix, name='confusion_matrix'),
    path('api/monitor/uncertainty/<int:id>/<str:target_date>', views.uncertainty, name='uncertainty'),
    path('api/monitor/stats/<int:id>/<str:area>/<str:start_date>/<str:end_date>', views.statistic, name='statistic'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
