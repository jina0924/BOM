from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
import requests
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Ward, Nurse, Doctor, Patient, PatientStatus, Alert
from .serializers import WardSerializer, PatientSerializer, WardDetailSerializer
import datetime


User = get_user_model()


# 병동 등록
@api_view(['POST'])
@permission_classes([AllowAny])
def ward(request):

    requests.post('http://127.0.0.1:8000/api/accounts/user/new', data=request.data)

    username = request.data['username']
    user = User.objects.get(username=username)

    serializer = WardSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=user)

    # if request.data['isStaff'] == True:
    #     user.update(is_staff=True)

    return Response({'result': serializer.data}, status=status.HTTP_201_CREATED)


# 환자 등록
@api_view(['POST'])
@permission_classes([AllowAny])
def patient(request):
    
    requests.post('http://127.0.0.1:8000/api/accounts/user/new', data=request.data)

    username = request.data['username']
    user = User.objects.get(username=username)

    ward = Ward.objects.get(number=request.data['number'])
    doctor = Doctor.objects.get(pk=request.data['doctor'])

    serializer = PatientSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        this_year = str(datetime.datetime.today().year)[2:]
        ward_number = request.data['number']
        cnt = Patient.objects.filter(number__startswith=(this_year + ward_number)).count()
        patient_number = this_year + str(ward_number) + '0'*(4-len(str(cnt+1))) + str(cnt+1)

        user.username = patient_number
        user.save()

        serializer.save(user=user, ward=ward, doctor=doctor, number=patient_number)

    return Response({'result': serializer.data}, status=status.HTTP_201_CREATED)


# 환자 정보 상세 조회
@api_view(['GET'])
def patient_detail(request, patient_number):

    patient = get_object_or_404(Patient, number=patient_number)
    serializer = PatientSerializer(patient)

    return Response(serializer.data, status=status.HTTP_200_OK)


# 병동 정보 조회
@api_view(['GET'])
def wards(request, ward_number):
    # user = get_object_or_404(User, username=request.user)
    # ward = get_object_or_404(Ward, user=user)
    
    # serializer = WardDetailSerializer(ward)
    
    # return Response({'result': serializer.data}, status=status.HTTP_200_OK)
    return Response({'result': '일단 답변이 가네요! access token이 유효합니다!'}, status=status.HTTP_200_OK)


# 환자 건강 정보 조회
@api_view(['GET'])
def health(request):

    

    return Response({'result': 1}, status=status.HTTP_200_OK)