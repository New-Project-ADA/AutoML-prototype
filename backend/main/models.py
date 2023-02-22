from django.db import models
import pandas as pd
# Create your models here.
 
class Task(models.Model):
    title=models.CharField(max_length=150)
    description=models.CharField(max_length=500)
    completed=models.BooleanField(default=False)
 
    # string representation of the class
    def __str__(self):
 
        #it will return the title
        return self.title

def upload_to(instance, filename):
    return 'data/{filename}'.format(filename=filename)

class Area(models.Model):
    area_pict = models.ImageField(upload_to=upload_to)

class DataInput(models.Model):
    id = models.AutoField(primary_key=True)
    input_c1 = models.FileField(upload_to=upload_to, null=True, blank=True)
    input_b1 = models.FileField(upload_to=upload_to, null=True, blank=True)
    input_m1 = models.FileField(upload_to=upload_to, null=True, blank=True)
    featured_df = models.JSONField(null=True, blank=True)
    
def get_data(id):
    for i in DataInput.objects.all():
        if i.id == id:
            data = i
    return pd.read_json(data.featured_df)

def get_input(id):
    for i in DataInput.objects.all():
        if i.id == id:
            data = i
    print(data)
    return pd.read_csv(data.input_c1).drop('Unnamed: 0',1), pd.read_csv(data.input_m1).drop('Unnamed: 0',1), pd.read_csv(data.input_b1).drop('Unnamed: 0',1)