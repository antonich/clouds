from django.shortcuts import render
from django.views.generic import View

from main.models import Job

class HomePageView(View):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        jobs = Job.objects.all()
        jobs_list = [[]]
        num = 1
        for count, job in enumerate(jobs, start=1):
            if(count <= (num * 5)):
                jobs_list[num-1].append(job)
            if(count == (num*5)):
                jobs_list.append([])
                num += 1
        return render(request, self.template_name, {'jobs_list': jobs_list, 'jobs':jobs})