# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2018-03-26 09:50
from __future__ import unicode_literals

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='responsibilities',
            field=tinymce.models.HTMLField(),
        ),
    ]