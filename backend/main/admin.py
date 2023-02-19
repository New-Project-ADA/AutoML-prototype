from django.contrib import admin
 
# import the model Todo
from .models import Task, DataInput
 
# create a class for the admin-model integration
class TaskAdmin(admin.ModelAdmin):
 
    # add the fields of the model here
    list_display = ("title","description","completed")
 
# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Task,TaskAdmin)

class DataInputAdmin(admin.ModelAdmin):
    list_display = ("id", "input_c1", "input_b1", "input_m1", "featured_df")
    
admin.site.register(DataInput, DataInputAdmin)