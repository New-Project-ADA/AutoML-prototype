
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
    input_c1 = serializers.FileField(required=False)
    input_b1 = serializers.FileField(required=False)
    input_m1 = serializers.FileField(required=False)
    featured_df = serializers.JSONField(required=False)
    
    class Meta:
        model = DataInput
        fields = ['id', 'input_c1', 'input_b1', 'input_m1', 'featured_df']