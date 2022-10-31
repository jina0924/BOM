from django.urls import path
from . import views


urlpatterns = [
    path('ward', views.ward),
    path('patient', views.patient),
]