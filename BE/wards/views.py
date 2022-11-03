from django.shortcuts import get_object_or_404
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


# 병동: 환자 정보 상세 조회
@api_view(['GET'])
def patient_detail(request, patient_number):

    patient = get_object_or_404(Patient, number=patient_number)
    serializer = PatientSerializer(patient)

    return Response(serializer.data, status=status.HTTP_200_OK)


# 병동: 병동 정보 조회
@api_view(['GET'])
def wards(request, ward_number):
    # user = get_object_or_404(User, username=request.user)
    # ward = get_object_or_404(Ward, user=user)
    
    # serializer = WardDetailSerializer(ward)
    
    # return Response({'result': serializer.data}, status=status.HTTP_200_OK)
    return Response({'result': '일단 답변이 가네요! access token이 유효합니다!'}, status=status.HTTP_200_OK)


# 병동: 환자 체온 조회
# 실시간 - 가장 최근 데이터
# 기본 - 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)
@api_view(['GET'])
def temperature(request, patient_number):

    now = datetime.datetime(2022, 11, 2, 22, 29, 23)
    # now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    now_cleansing = now.strftime('%Y-%m-%d %H:%M:%S')
    now_temperature = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now_cleansing).last()  # 실시간
    now_serializer = TemperatureSerializer(now_temperature)
    period = request.GET.get('period')

    # delta 단위 = 초
    if period == 'month':
        start = 2592000  # 60 * 60 * 24 * 30
        delta = 86400  # 60 * 60 * 24
        period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)

    elif period == 'week':
        start = 604800  # 60 * 60 * 24 * 7
        delta = 43200  # 60 * 60 * 12
        if now.hour >= 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 12, 0, 0)
        elif now.hour < 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)

    elif period == 'day':
        start = 86400  # 60 * 60 * 24
        delta = 3600  # 60 * 60
        period_now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)

    elif period == None or period == 'now':
        start = 60
        delta = 5
        period_now = datetime.datetime(now.year, now.month, now.day, now.hour, now.minute, now.second - (now.second) % 5)

    else:
        return Response({'result': '올바르지 않은 요청입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    period_start = period_now + relativedelta(seconds=-start)

    period_data = []

    while period_start < period_now:

        period_end = period_start + relativedelta(seconds=delta)
        
        if period == 'month':
            period_temperature = PatientStatus.objects.filter(patient__number=patient_number, now__lt=period_end, now__gte=period_start)

        elif period == 'week' or period == 'day' or period == None or period == 'now':
            period_temperature = PatientStatus.objects.filter(patient__number=patient_number, now__lte=period_end, now__gt=period_start).values('temperature', 'now')

        if period == 'month' or period == 'week' or period == 'day':
            max_temperature = period_temperature.order_by('temperature').last()
            min_temperature = period_temperature.order_by('temperature').first()

            if max_temperature and min_temperature:
                max_temperature = max_temperature['temperature']
                min_temperature = min_temperature['temperature']

            else:
                max_temperature = 0
                min_temperature = 0

            data = {
                'maxTemperature': max_temperature,
                'minTemperature': min_temperature,
                'time': period_start
            }

        # elif period == None or period == 'now':

        #     data = {
        #         'time': now
        #     }
        
        period_data.append(data)
        period_start = period_end

    return Response({'1': period_data})

    tmp = []

    if len(period_temperature) == 13:
        period_temperature = period_temperature[1:]
    
    elif len(period_temperature) < 12:
        
        for i in range(12 - len(period_temperature)):
            now_datetime = (now + relativedelta(minutes=-1) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
            
            data = {
            'temperature': 0.0,
            'now': now_datetime
            }        
            tmp.append(data)

    period_serializer = TemperatureSerializer(period_temperature, many=True)

    period = tmp + period_serializer.data

    return Response({'now': now_serializer.data, 'period': period}, status=status.HTTP_200_OK)