# Generated by Django 4.0.5 on 2022-08-14 15:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_route_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='location_routes', to='api.location'),
        ),
        migrations.AlterField(
            model_name='route',
            name='wall',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='wall_routes', to='api.wall'),
        ),
    ]
