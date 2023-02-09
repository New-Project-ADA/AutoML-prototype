
# import serializers from the REST framework
from rest_framework import serializers
 
# import the todo data model
from .models import Task, DataInput
 
# create a serializer class
class MainSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Task
        fields = ('id', 'title','description','completed')
        
class DataSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    data = serializers.FileField(required=False)
    
    class Meta:
        model = DataInput
        fields = ['id', 'data']