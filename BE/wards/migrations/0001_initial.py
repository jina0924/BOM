# Generated by Django 3.2.16 on 2022-10-31 22:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=17)),
                ('image', models.ImageField(default='default.jpg', upload_to='doctor')),
                ('phonenumber', models.CharField(max_length=11)),
                ('email', models.EmailField(max_length=191)),
                ('department', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'doctor',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=17)),
                ('number', models.CharField(max_length=9)),
                ('hospitalized_date', models.DateField()),
                ('discharged_date', models.DateField(null=True)),
                ('birth', models.DateField()),
                ('sex', models.CharField(default='M', max_length=1)),
                ('nok_name', models.CharField(max_length=17)),
                ('nok_phonenumber', models.CharField(max_length=11)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='wards.doctor')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'patient',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Ward',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=3)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'ward',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='PatientStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temperature', models.IntegerField()),
                ('bpm', models.IntegerField()),
                ('oxygen_saturation', models.IntegerField()),
                ('slope', models.IntegerField(null=True)),
                ('now', models.DateTimeField()),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='wards.patient')),
            ],
            options={
                'db_table': 'patient_status',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='patient',
            name='ward',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='wards.ward'),
        ),
        migrations.CreateModel(
            name='Nurse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=17)),
                ('image', models.ImageField(default='default.jpg', upload_to='nurse')),
                ('phonenumber', models.CharField(max_length=11)),
                ('email', models.EmailField(max_length=191)),
                ('position', models.CharField(max_length=20)),
                ('ward', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='wards.ward')),
            ],
            options={
                'db_table': 'nurse',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Alert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=191)),
                ('status', models.CharField(max_length=191)),
                ('status_detail', models.CharField(max_length=191)),
                ('is_well', models.BooleanField(default=False)),
                ('is_read', models.BooleanField(default=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='wards.patient')),
                ('ward', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='wards.ward')),
            ],
            options={
                'db_table': 'alert',
                'managed': True,
            },
        ),
    ]
