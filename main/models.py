from django.db import models

from tinymce.models import HTMLField

class Job(models.Model):
	title = models.CharField(max_length=200)
	looking_for = HTMLField()
	responsibilities = HTMLField()

	def __str__(self):
	    return 'title: ' + str(self.title) 