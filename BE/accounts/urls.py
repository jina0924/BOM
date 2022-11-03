from django.urls import path, include
from . import views


urlpatterns = [
    path('user/usertype', views.usertype),
    path('user/', include('dj_rest_auth.urls')),
    path('user/new', include('dj_rest_auth.registration.urls')),
]