# Generated by Django 3.2.16 on 2022-11-03 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wards', '0002_auto_20221102_1535'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientstatus',
            name='temperature',
            field=models.FloatField(),
        ),
    ]
