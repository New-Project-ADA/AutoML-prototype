from django.db import models

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

class DataInput(models.Model):
    id = models.AutoField(primary_key=True)
    data = models.FileField(upload_to=upload_to, null=True, blank=True)