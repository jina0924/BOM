from django.urls import path
from . import views


urlpatterns = [
    path('ward', views.ward),
    path('patient', views.patient),
    path('patients/<str:patient_number>', views.patient_detail),
    path('', views.wards),
]