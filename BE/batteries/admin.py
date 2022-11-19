from django.contrib import admin
from .models import Bms, BmsStatus, Battery, BatteryStatus

admin.site.register(Bms)
admin.site.register(BmsStatus)
admin.site.register(Battery)
admin.site.register(BatteryStatus)