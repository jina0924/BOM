from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Ward, Nurse, Doctor, Patient, PatientStatus, Alert
from .serializers import WardSerializer, PatientSerializer


@api_view(['GET'])
def test(request):
    wards = get_list_or_404(Ward)
    serializer = WardSerializer(wards, many=True)
    return Response(serializer.data)    
