from django.urls import path
from . import views


urlpatterns = [
    path('ward', views.ward),
    path('patient', views.patient),
    path('<str:ward_number>', views.wards),
    path('patients/<str:patient_number>', views.patient_detail),
    path('patients/<str:patient_number>/health', views.health),
    
]