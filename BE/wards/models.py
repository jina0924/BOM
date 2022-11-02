from django.db import models
from django.conf import settings


class Ward(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    number = models.CharField(max_length=3)
    user_type = models.CharField(max_length=4, default='ward')

    class Meta:
        managed = True
        db_table = 'ward'


class Nurse(models.Model):
    name = models.CharField(max_length=17)
    image = models.ImageField(upload_to='nurse/', default='nurse/default.jpg')
    phonenumber = models.CharField(max_length=11)
    email = models.EmailField(max_length=191)
    position = models.CharField(max_length=20)
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'nurse'


class Doctor(models.Model):
    name = models.CharField(max_length=17)
    image = models.ImageField(upload_to='doctor/', default='doctor/default.jpg')
    phonenumber = models.CharField(max_length=11)
    email = models.EmailField(max_length=191)
    department = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'doctor'


class Patient(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    name = models.CharField(max_length=17)
    number = models.CharField(max_length=9)
    hospitalized_date = models.DateField()
    discharged_date = models.DateField(null=True)
    birth = models.DateField()
    sex = models.CharField(max_length=1, default='M')
    nok_name = models.CharField(max_length=17)
    nok_phonenumber = models.CharField(max_length=11)
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT)
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    user_type = models.CharField(max_length=7, default='patient')

    class Meta:
        managed = True
        db_table = 'patient'


class PatientStatus(models.Model):
    temperature = models.IntegerField()
    bpm = models.IntegerField()
    oxygen_saturation = models.IntegerField()
    slope = models.IntegerField(null=True)
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