from django.db import models


class Ward(models.Model):
    ward_id = models.BigAutoField(primary_key=True)
    ward_number = models.CharField(max_length=255)
    ward_password = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'ward'


class Nurse(models.Model):
    nurse_id = models.BigAutoField(primary_key=True)
    nurse_number = models.CharField(max_length=255)
    nurse_name = models.CharField(max_length=255)
    nurse_image = models.CharField(max_length=255)
    nurse_phonenumber = models.CharField(max_length=11)
    nurse_email = models.CharField(max_length=255)
    nurse_position = models.CharField(max_length=255)
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'nurse'


class Doctor(models.Model):
    doctor_id = models.BigAutoField(primary_key=True)
    doctor_number = models.CharField(max_length=255)
    doctor_name = models.CharField(max_length=255)
    doctor_image = models.CharField(max_length=255)
    doctor_phonenumber = models.CharField(max_length=11)
    doctor_email = models.CharField(max_length=255)
    doctor_department = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'doctor'


class Patient(models.Model):
    patient_id = models.BigAutoField(primary_key=True)
    patient_number = models.CharField(max_length=255)
    patient_password = models.CharField(max_length=255)
    patient_register = models.DateTimeField()
    patient_discharge = models.DateTimeField()
    patient_name = models.CharField(max_length=255)
    patient_birth = models.DateTimeField()
    patient_sex = models.BooleanField()
    nok_name = models.CharField(max_length=255)
    nok_phonenumber = models.CharField(max_length=11)
    patient_recent_login = models.DateTimeField()
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT)
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'patient'


class PatientStatus(models.Model):
    patient_status_id = models.BigAutoField(primary_key=True)
    patient_status_temperature = models.IntegerField()
    patient_status_bpm = models.IntegerField()
    patient_oxygen_saturation = models.IntegerField()
    patient_status_slope = models.IntegerField()
    patient_status_now = models.DateTimeField()
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'patient_status'


class Alert(models.Model):
    alert_id = models.BigAutoField(primary_key=True)
    alert_category = models.CharField(max_length=255)
    alert_status = models.CharField(max_length=255)
    alert_status_detail = models.CharField(max_length=255)
    alert_is_well = models.BooleanField()
    alert_is_read = models.BooleanField()
    alert_date = models.DateTimeField(auto_now_add=True)
    ward = models.ForeignKey(Ward, on_delete=models.PROTECT)
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'alert'