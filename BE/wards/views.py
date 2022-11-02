from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
import requests
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Ward, Nurse, Doctor, Patient, PatientStatus, Alert
from .serializers import WardSerializer, PatientSerializer, WardDetailSerializer, TemperatureSerializer
import datetime
import jwt
from thundervolt.settings import SECRET_KEY
import datetime
from dateutil.relativedelta import relativedelta


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
        serializer.save(user=user, )

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


# 환자 체온 조회
# 실시간 - 가장 최근 데이터
# 기본 - 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)
@api_view(['GET'])
def temperature(request, patient_number):

    now = datetime.datetime(2022, 11, 2, 22, 30, 10).strftime('%Y-%m-%d %H:%M:%S')
    # now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # 2022-11-02 23:29:58

    one_minute_ago = (datetime.datetime(2022, 11, 2, 22, 30, 10) + relativedelta(minutes=-1)).strftime('%Y-%m-%d %H:%M:%S')
    # one_minute_ago = (datetime.datetime.now() + relativedelta(minutes=-1)).strftime('%Y-%m-%d %H:%M:%S')

    now_temperature = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now).last()
    period_temperature = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now, now__gte=one_minute_ago)
    
    now_serializer = TemperatureSerializer(now_temperature)
    period_serializer = TemperatureSerializer(period_temperature, many=True)

    return Response({'now': now_serializer.data, 'period': period_serializer.data}, status=status.HTTP_200_OK)
    # return Response({'result': 1}, status=status.HTTP_200_OK)