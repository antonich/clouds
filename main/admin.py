from django.contrib import admin

from main.models import Job
from main.forms import JobForm

class JobAdmin(admin.ModelAdmin):
	fields = ('title', 'looking_for', 'responsibilities',)
	form = JobForm

admin.site.register(Job, JobAdmin)
