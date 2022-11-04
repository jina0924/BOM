from django.db import models
from wards.models import Patient


class Bms(models.Model):
    temperature = models.IntegerField()
    is_charge = models.BooleanField()
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'bms'


class BmsStatus(models.Model):
    temperature = models.FloatField()
    now = models.DateTimeField()
    bms = models.ForeignKey(Bms, on_delete=models.PROTECT)
    
    class Meta:
        managed = True
        db_table = 'bms_status'


class Battery(models.Model):
    register_date = models.DateTimeField()
    max_voltage = models.FloatField()
    bms = models.ForeignKey(Bms, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'battery'


class BatteryStatus(models.Model):
    voltage = models.FloatField()
    amount = models.IntegerField()
    now = models.DateTimeField()
    battery = models.ForeignKey(Battery, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'battery_status'