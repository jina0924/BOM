from django.db import models
from wards.models import Patient


class Bms(models.Model):
    temperature = models.IntegerField()
    is_charge = models.BooleanField(default=False)
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'bms'


class BmsStatus(models.Model):
    temperature = models.IntegerField()
    now = models.DateTimeField()
    bms = models.ForeignKey(Bms, on_delete=models.PROTECT)
    
    class Meta:
        managed = True
        db_table = 'bms_status'


class BmsStatusExcel(models.Model):
    temperature = models.IntegerField()
    now = models.DateTimeField()
    bms = models.ForeignKey(Bms, on_delete=models.PROTECT)
    
    class Meta:
        managed = True
        db_table = 'bms_status_excel'


class BmsStatusNow(models.Model):
    temperature = models.IntegerField()
    now = models.DateTimeField()
    bms = models.ForeignKey(Bms, on_delete=models.PROTECT)
    
    class Meta:
        managed = True
        db_table = 'bms_status_now'


class BmsDay(models.Model):
    min_t = models.IntegerField()
    max_t = models.IntegerField()
    now = models.DateTimeField()
    bms = models.ForeignKey(Bms, on_delete=models.PROTECT)
    
    class Meta:
        managed = True
        db_table = 'bms_day'


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


class BatteryStatusExcel(models.Model):
    voltage = models.FloatField()
    amount = models.IntegerField()
    now = models.DateTimeField()
    battery = models.ForeignKey(Battery, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'battery_status_excel'


class BatteryStatusNow(models.Model):
    voltage = models.FloatField()
    amount = models.IntegerField()
    now = models.DateTimeField()
    battery = models.ForeignKey(Battery, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'battery_status_now'


class BatteryDay(models.Model):
    min_v = models.FloatField()
    max_v = models.FloatField()
    now = models.DateTimeField()
    battery = models.ForeignKey(Battery, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'battery_day'


class BmsBatteryDefault(models.Model):
    temperature = models.IntegerField()
    voltage1 = models.FloatField()
    voltage2 = models.FloatField()
    
    class Meta:
        managed = True
        db_table = 'bms_battery_default'