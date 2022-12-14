# Generated by Django 4.0.5 on 2022-08-06 12:50

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_route_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='route_author', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='wall',
            name='image',
            field=models.ImageField(blank=True, height_field='height', null=True, upload_to=api.models.rename_image, width_field='width'),
        ),
    ]
