from django.urls import path
from . import views


urlpatterns = [
    path('ward', views.ward),
    path('patient', views.patient),
    path('patient/health', views.patient_health),
    path('patients', views.PatientListAPIView.as_view()),
    path('patients/excel', views.HealthExcelViewSet.as_view({'get': 'list'})),
    path('patients/<str:patient_number>', views.patient_detail),
    path('patients/<str:patient_number>/temperature', views.temperature),
    path('patients/<str:patient_number>/bpm', views.bpm),
    path('patients/<str:patient_number>/oxygen-saturation', views.oxygen_saturation),
    path('patients/<str:patient_number>/health', views.health),
    path('nurse', views.NurseAPIView.as_view()),
    path('doctor', views.DoctorAPIView.as_view()),
]