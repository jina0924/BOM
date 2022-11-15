from django.urls import path
from . import views


urlpatterns = [
    path('<str:patient_number>/bms', views.bms),
    path('excel', views.BmsExcelViewSet.as_view({'get': 'list'})),
]