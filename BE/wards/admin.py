from django.contrib import admin
from .models import User, Ward, Nurse, Doctor, Patient, PatientStatus, Alert


admin.site.register(User)
admin.site.register(Ward)
admin.site.register(Nurse)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(PatientStatus)
admin.site.register(Alert)