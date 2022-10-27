from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    
    class Meta:
        managed = True
        db_table = 'user'


class Ward(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    number = models.CharField(max_length=3)

    class Meta:
        managed = True
        db_table = 'ward'


class Nurse(models.Model):
    name = models.CharField(max_length=17)
    image = models.ImageField(upload_to='nurse', default='default.jpg')
    phonenumber = models.CharField(max_length=11)
    email = models.EmailField(max_length=191)
    position = models.CharField(max_length=20)
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'nurse'


class Doctor(models.Model):
    name = models.CharField(max_length=17)
    image = models.ImageField(upload_to='doctor', default='default.jpg')
    phonenumber = models.CharField(max_length=11)
    email = models.EmailField(max_length=191)
    department = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'doctor'


class Patient(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    number = models.CharField(max_length=191)
    hospitalized_date = models.DateTimeField()
    discharged_date = models.DateTimeField(null=True)
    birth = models.DateTimeField()
    sex = models.CharField(max_length=1, default='M')
    nok_name = models.CharField(max_length=17)
    nok_phonenumber = models.CharField(max_length=11)
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT)
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'patient'


class PatientStatus(models.Model):
    temperature = models.IntegerField()
    bpm = models.IntegerField()
    oxygen_saturation = models.IntegerField()
    slope = models.IntegerField()
    now = models.DateTimeField()
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'patient_status'


class Alert(models.Model):
    category = models.CharField(max_length=191)
    status = models.CharField(max_length=191)
    status_detail = models.CharField(max_length=191)
    is_well = models.BooleanField(default=False)
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT)
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'alert'