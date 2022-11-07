from django.urls import path
from . import views


urlpatterns = [
    path('<str:patient_number>/bms', views.bms),
]