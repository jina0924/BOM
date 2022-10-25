from django.db import models
from wards.models import Patient


class Bms(models.Model):
    bms_id = models.BigAutoField(primary_key=True)
    bms_temperature = models.IntegerField()
    bms_control = models.IntegerField()
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'bms'


class BmsStatus(models.Model):
    bms_status_id = models.BigAutoField(primary_key=True)
    bms_status_temperature = models.IntegerField()
    bms_status_now = models.DateTimeField()
    bms = models.ForeignKey(Bms, on_delete=models.PROTECT)
    
    class Meta:
        managed = True
        db_table = 'bms_status'


class Battery(models.Model):
    battery_id = models.BigAutoField(primary_key=True)
    battery_register_date = models.DateTimeField()
    battery_max_voltage = models.IntegerField()
    bms = models.ForeignKey(Bms, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'battery'


class BatteryStatus(models.Model):
    battery_status_id = models.BigAutoField(primary_key=True)
    battery_status_voltage = models.IntegerField()
    battery_status_amount = models.IntegerField()
    battery_status_now = models.DateTimeField()
    battery = models.ForeignKey(Battery, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'battery_status'