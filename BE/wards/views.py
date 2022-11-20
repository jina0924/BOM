from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
import requests
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Ward, Nurse, Doctor, Patient, PatientStatus, Alert, PatientStatusExcel, PatientStatusNow, PatientDay, PatientStatusDefault
from .serializers import WardSerializer, PatientSerializer, PatientDetailSerializer, WardDetailSerializer, TemperatureSerializer, BpmSerializer, OxygenSaturationSerializer, NurseSerializer, DoctorSerializer, HealthSerializer, PatientListSerializer
import jwt
from thundervolt.settings import SECRET_KEY
import datetime
from dateutil.relativedelta import relativedelta
from rest_framework.pagination import PageNumberPagination
from pagination import PaginationHandlerMixin
from rest_framework.views import APIView
from django.db.models import Max, Min, OuterRef, Subquery, FloatField, IntegerField
from django.db.models.functions import Coalesce
import redis
from my_settings import DATABASES


User = get_user_model()


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def ward_register(request):

#     requests.post('http://127.0.0.1:8000/api/accounts/user/new', data=request.data)

#     username = request.data['username']
#     user = User.objects.get(username=username)

#     serializer = WardSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save(user=user, )

#     return Response({'result': serializer.data}, status=status.HTTP_201_CREATED)


# 병동 등록 (POST)
# 병동: 병동 정보 조회 (GET)
# 병동 번호, 입원환자 수, 의사 수, 간호사 수, 입원환자 추이, 병상 가동률 (GET)
@api_view(['GET', 'POST'])
def ward(request):

    def get():

        token = request.META.get('HTTP_AUTHORIZATION')[7:]

        user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

        if Ward.objects.filter(user_id=user_id):
            ward = Ward.objects.get(user_id=user_id)
            
        else:
            return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

        patient_count = Patient.objects.filter(ward=ward, discharged_date=None).count()
        doctor_count = Doctor.objects.filter(patient__ward=ward).distinct().count()
        utilization = Patient.objects.filter(ward=ward, discharged_date=None).count()

        ward = Ward.objects.filter(user_id=user_id).annotate(patientCount=Coalesce(patient_count,0), doctorCount=Coalesce(doctor_count,0), utilization=Coalesce(utilization,0))[0]

        serializer = WardDetailSerializer(ward)

        # now = datetime.datetime(2022, 10, 2, 22, 31, 25)
        now = datetime.datetime.now()
        now_year = now.year
        now_month = now.month
        
        period_now = datetime.datetime(now_year, now_month, 1, 0, 0, 0)
        period_start = period_now + relativedelta(months=-6)

        tendency = []
        
        while period_start < period_now:
            period_end = period_start + relativedelta(months=1)

            patients = Patient.objects.filter(ward=ward, hospitalized_date__lt=period_end, discharged_date__gte=period_start).count()
            patients_ing = Patient.objects.filter(ward=ward, hospitalized_date__lt=period_end, discharged_date=None).count()

            data = {
                'month': period_start.strftime('%Y-%m'),
                '환자 수': patients + patients_ing
            }

            tendency.append(data)
            print(data)

            period_start = period_end
        print(tendency)
        result = dict()
        result.update(serializer.data)
        result['tendency'] = tendency

        return Response(result, status=status.HTTP_200_OK)

    def post():
        requests.post('http://127.0.0.1:8000/api/accounts/user/new', data=request.data)

        username = request.data['username']
        user = User.objects.get(username=username)

        serializer = WardSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user, )

        return Response({'result': serializer.data}, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        return get()
    
    elif request.method == 'POST':
        return post()


# 환자 등록 (POST)
# 환자: 상세 정보 조회 (GET)
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def patient(request):

    def get():
        token = request.META.get('HTTP_AUTHORIZATION')[7:]

        user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

        if Patient.objects.filter(user_id=user_id):
            patient = Patient.objects.get(user_id=user_id)
            
        else:
            return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = PatientDetailSerializer(patient)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post():
        requests.post('http://127.0.0.1:8000/api/accounts/user/new', data=request.data)

        username = request.data['username']
        user = User.objects.get(username=username)

        ward = Ward.objects.get(number=request.data['number'])
        doctor = Doctor.objects.get(pk=request.data['doctor'])

        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            this_year = str(datetime.datetime.today().year)[2:]
            ward_number = request.data['number']
            ward_id = ward.id
            cnt = Patient.objects.filter(ward_id=ward_id).count()
            # cnt = Patient.objects.filter(number__startswith=(this_year + ward_number)).count()
            patient_number = this_year + str(ward_number) + '0'*(4-len(str(cnt+1))) + str(cnt+1)

            user.username = patient_number
            user.save()

            serializer.save(user=user, ward=ward, doctor=doctor, number=patient_number)

        return Response({'result': serializer.data}, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        return get()
    
    elif request.method == 'POST':
        return post()

# 병동: 환자 정보 상세 조회
@api_view(['GET'])
def patient_detail(request, patient_number):

    token = request.META.get('HTTP_AUTHORIZATION')[7:]

    user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

    if Ward.objects.filter(user_id=user_id):
        ward = Ward.objects.get(user_id=user_id)
        
    else:  # 요청자가 환자라면
        return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

    patient = Patient.objects.filter(number=patient_number)

    if len(patient) == True:
        patient = patient[0]
        if patient.ward_id != ward.id:
            return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)
    else:  # 환자번호에 해당하는 환자가 없으면
        return Response({'result': '환자의 정보가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PatientDetailSerializer(patient)

    return Response(serializer.data, status=status.HTTP_200_OK)


# 병동: 환자 체온 조회 (사용안함)
# 실시간 - 가장 최근 데이터
# 기본 - 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)
@api_view(['GET'])
def temperature(request, patient_number):

    now = datetime.datetime(2022, 10, 2, 22, 31, 25)
    # now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    now_temperature = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now).last()  # 실시간
    now_serializer = TemperatureSerializer(now_temperature)

    period = request.GET.get('period')

    # delta 단위 = 초
    if period == 'month':
        start = 2592000  # 60 * 60 * 24 * 30
        delta = 86400  # 60 * 60 * 24
        data_count = 30
        period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0) + relativedelta(seconds=-1)

    elif period == 'week':
        start = 604800  # 60 * 60 * 24 * 7
        delta = 43200  # 60 * 60 * 12
        data_count = 14
        if now.hour >= 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 12, 0, 0)
        elif now.hour < 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)

    elif period == 'day':
        start = 86400  # 60 * 60 * 24
        delta = 3600  # 60 * 60
        data_count = 24
        period_now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)

    elif period == None or period == 'now':
        start = 60

        period_temperature = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now, now__gt=(now + relativedelta(seconds=-start)))
        period_serializer = TemperatureSerializer(period_temperature, many=True)

        tmp = []
    
        if len(period_temperature) < 12:
            
            for i in range(1, 12 - len(period_temperature) + 1):
                now_datetime = (now + relativedelta(seconds=-start) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
                
                data = {
                'temperature': 0.0,
                'now': now_datetime
                }        
                tmp.append(data)

        period = tmp + period_serializer.data

        return Response({'now': now_serializer.data, 'period': period}, status=status.HTTP_200_OK)

    else:
        return Response({'result': '올바르지 않은 요청입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    period_start = period_now + relativedelta(seconds=-start)

    period_data = []

    while period_start < period_now:

        period_end = period_start + relativedelta(seconds=delta)
        
        period_temperature = PatientStatus.objects.filter(patient__number=patient_number, now__lte=period_end, now__gt=period_start).values('temperature', 'now')

        max_temperature = period_temperature.order_by('temperature').last()
        min_temperature = period_temperature.order_by('temperature').first()

        if max_temperature and min_temperature:
            max_temperature = max_temperature['temperature']
            min_temperature = min_temperature['temperature']

            data = {
                'maxTemperature': max_temperature,
                'minTemperature': min_temperature,
                'now': period_end
            }

            period_data.append(data)
        
        period_start = period_end

    tmp = []
    
    if len(period_data) < data_count:
        
        for i in range(1, data_count - len(period_data) + 1):
            now_datetime = period_now + relativedelta(seconds=-start) + relativedelta(seconds=(i * delta))
            if period == 'month':
                now = now_datetime.strftime('%Y-%m-%d')

            elif period == 'week':
                now = now_datetime.strftime('%Y-%m-%d %H:%M:%S')

            elif period == 'day':
                now = (now_datetime + relativedelta(seconds=-delta)).strftime('%Y-%m-%d %H:%M:%S')

            data = {
            'maxTemperature': 0.0,
            'minTemperature': 0.0,
            'now': now
            }        
            tmp.append(data)

    period = tmp + period_data

    return Response({'now': now_serializer.data, 'period': period}, status=status.HTTP_200_OK)


# 병동: 환자 심박수 조회 (사용안함)
# 실시간 - 가장 최근 데이터
# 기본 - 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)
@api_view(['GET'])
def bpm(request, patient_number):

    now = datetime.datetime(2022, 10, 2, 22, 31, 25)
    # now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    now_bpm = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now).last()  # 실시간
    now_serializer = BpmSerializer(now_bpm)

    period = request.GET.get('period')

    # delta 단위 = 초
    if period == 'month':
        start = 2592000  # 60 * 60 * 24 * 30
        delta = 86400  # 60 * 60 * 24
        data_count = 30
        period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0) + relativedelta(seconds=-1)

    elif period == 'week':
        start = 604800  # 60 * 60 * 24 * 7
        delta = 43200  # 60 * 60 * 12
        data_count = 14
        if now.hour >= 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 12, 0, 0)
        elif now.hour < 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)

    elif period == 'day':
        start = 86400  # 60 * 60 * 24
        delta = 3600  # 60 * 60
        data_count = 24
        period_now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)

    elif period == None or period == 'now':
        start = 60

        period_bpm = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now, now__gt=(now + relativedelta(seconds=-start)))
        period_serializer = BpmSerializer(period_bpm, many=True)

        tmp = []
    
        if len(period_bpm) < 12:
            
            for i in range(1, 12 - len(period_bpm) + 1):
                now_datetime = (now + relativedelta(seconds=-start) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
                
                data = {
                'bpm': 0,
                'now': now_datetime
                }        
                tmp.append(data)

        period = tmp + period_serializer.data

        return Response({'now': now_serializer.data, 'period': period}, status=status.HTTP_200_OK)

    else:
        return Response({'result': '올바르지 않은 요청입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    period_start = period_now + relativedelta(seconds=-start)

    period_data = []

    while period_start < period_now:

        period_end = period_start + relativedelta(seconds=delta)
        
        period_bpm = PatientStatus.objects.filter(patient__number=patient_number, now__lte=period_end, now__gt=period_start).values('bpm', 'now')

        max_bpm = period_bpm.order_by('bpm').last()
        min_bpm = period_bpm.order_by('bpm').first()

        if max_bpm and min_bpm:
            max_bpm = max_bpm['bpm']
            min_bpm = min_bpm['bpm']

            data = {
                'maxBpm': max_bpm,
                'minBpm': min_bpm,
                'now': period_end
            }

            period_data.append(data)
        
        period_start = period_end

    tmp = []
    
    if len(period_data) < data_count:
        
        for i in range(1, data_count - len(period_data) + 1):
            now_datetime = period_now + relativedelta(seconds=-start) + relativedelta(seconds=(i * delta))
            if period == 'month':
                now = now_datetime.strftime('%Y-%m-%d')

            elif period == 'week':
                now = now_datetime.strftime('%Y-%m-%d %H:%M:%S')

            elif period == 'day':
                now = (now_datetime + relativedelta(seconds=-delta)).strftime('%Y-%m-%d %H:%M:%S')

            data = {
            'maxBpm': 0,
            'minBpm': 0,
            'now': now
            }        
            tmp.append(data)

    period = tmp + period_data

    return Response({'now': now_serializer.data, 'period': period}, status=status.HTTP_200_OK)


# 병동: 환자 산소포화도 조회 (사용안함)
# 실시간 - 가장 최근 데이터
# 기본 - 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)
@api_view(['GET'])
def oxygen_saturation(request, patient_number):

    now = datetime.datetime(2022, 10, 2, 22, 31, 25)
    # now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    now_oxygen_saturation = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now).last()  # 실시간
    now_serializer = OxygenSaturationSerializer(now_oxygen_saturation)

    period = request.GET.get('period')

    # delta 단위 = 초
    if period == 'month':
        start = 2592000  # 60 * 60 * 24 * 30
        delta = 86400  # 60 * 60 * 24
        data_count = 30
        period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0) + relativedelta(seconds=-1)

    elif period == 'week':
        start = 604800  # 60 * 60 * 24 * 7
        delta = 43200  # 60 * 60 * 12
        data_count = 14
        if now.hour >= 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 12, 0, 0)
        elif now.hour < 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)

    elif period == 'day':
        start = 86400  # 60 * 60 * 24
        delta = 3600  # 60 * 60
        data_count = 24
        period_now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)

    elif period == None or period == 'now':
        start = 60

        period_oxygen_saturation = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now, now__gt=(now + relativedelta(seconds=-start)))
        period_serializer = OxygenSaturationSerializer(period_oxygen_saturation, many=True)

        tmp = []
    
        if len(period_oxygen_saturation) < 12:
            
            for i in range(1, 12 - len(period_oxygen_saturation) + 1):
                now_datetime = (now + relativedelta(seconds=-start) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
                
                data = {
                'oxygen_saturation': 0,
                'now': now_datetime
                }        
                tmp.append(data)

        period = tmp + period_serializer.data

        return Response({'now': now_serializer.data, 'period': period}, status=status.HTTP_200_OK)

    else:
        return Response({'result': '올바르지 않은 요청입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    period_start = period_now + relativedelta(seconds=-start)

    period_data = []

    while period_start < period_now:

        period_end = period_start + relativedelta(seconds=delta)
        
        period_bpm = PatientStatus.objects.filter(patient__number=patient_number, now__lte=period_end, now__gt=period_start).values('oxygen_saturation', 'now')

        max_oxygen_saturation = period_oxygen_saturation.order_by('oxygen_saturation').last()
        min_oxygen_saturation = period_oxygen_saturation.order_by('oxygen_saturation').first()

        if max_oxygen_saturation and min_oxygen_saturation:
            max_oxygen_saturation = max_oxygen_saturation['oxygen_saturation']
            min_oxygen_saturation = min_oxygen_saturation['oxygen_saturation']

            data = {
                'maxOxygenSaturation': max_oxygen_saturation,
                'minOxygenSaturation': min_oxygen_saturation,
                'now': period_end
            }

            period_data.append(data)
        
        period_start = period_end

    tmp = []
    
    if len(period_data) < data_count:
        
        for i in range(1, data_count - len(period_data) + 1):
            now_datetime = period_now + relativedelta(seconds=-start) + relativedelta(seconds=(i * delta))
            if period == 'month':
                now = now_datetime.strftime('%Y-%m-%d')

            elif period == 'week':
                now = now_datetime.strftime('%Y-%m-%d %H:%M:%S')

            elif period == 'day':
                now = (now_datetime + relativedelta(seconds=-delta)).strftime('%Y-%m-%d %H:%M:%S')

            data = {
            'maxOxygenSaturation': 0,
            'minOxygenSaturation': 0,
            'now': now
            }        
            tmp.append(data)

    period = tmp + period_data

    return Response({'now': now_serializer.data, 'period': period}, status=status.HTTP_200_OK)


# 의사, 간호사 pagination limit
class NurseDoctorPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    page_size = 10


# 병동: 간호사 목록 조회
class NurseAPIView(APIView, PaginationHandlerMixin):
    pagination_class = NurseDoctorPagination
    serializer_class = NurseSerializer

    def get(self, request, format=None, *args, **kwargs):

        token = request.META.get('HTTP_AUTHORIZATION')[7:]

        user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

        if Ward.objects.filter(user_id=user_id):
            ward = Ward.objects.get(user_id=user_id)
        
        else:
            return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

        nurses = Nurse.objects.filter(ward=ward).order_by('-pk')

        page = self.paginate_queryset(nurses)

        if page is not None:
            serializer = self.get_paginated_response(self.serializer_class(page, many=True).data)
        else:
            serializer = self.serializer_class(nurses, many=True)

        previous = serializer.data.get('previous')
        if previous != None:
            if 'page=' in previous:
                previous = int(previous.split('page=')[1])
            else:
                previous = 1
        else:
            previous = 0
            next = 2

        next = serializer.data.get('next')
        if next != None:
            next = int(next.split('page=')[1])
        else:
            next = int(previous) + 2

        now = (previous + next) // 2

        serializer.data['now'] = now

        return Response(serializer.data, status=status.HTTP_200_OK)


# 병동: 의사 목록 조회
class DoctorAPIView(APIView, PaginationHandlerMixin):
    pagination_class = NurseDoctorPagination
    serializer_class =DoctorSerializer

    def get(self, request, format=None, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')[7:]

        user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

        if Ward.objects.filter(user_id=user_id):
            ward = Ward.objects.get(user_id=user_id)

        else:
            return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)
    
        doctors = Doctor.objects.filter(patient__ward=ward).order_by('-pk').distinct()

        page = self.paginate_queryset(doctors)

        if page is not None:
            serializer = self.get_paginated_response(self.serializer_class(page, many=True).data)
        else:
            serializer = self.serializer_class(doctors, many=True)

        previous = serializer.data.get('previous')
        if previous != None:
            if 'page=' in previous:
                previous = int(previous.split('page=')[1])
            else:
                previous = 1
        else:
            previous = 0
            next = 2

        next = serializer.data.get('next')
        if next != None:
            next = int(next.split('page=')[1])
        else:
            next = int(previous) + 2

        now = (previous + next) // 2

        serializer.data['now'] = now

        return Response(serializer.data, status=status.HTTP_200_OK)


# 환자 리스트 pagination limit
class PatientListPagination(PageNumberPagination):
    page_size_query_param = 'limit'
    page_size = 8


# 병동: 환자 목록 조회
class PatientListAPIView(APIView, PaginationHandlerMixin):
    pagination_class = PatientListPagination
    serializer_class = PatientListSerializer

    def get(self, request, format=None, *args, **kwargs):

        token = request.META.get('HTTP_AUTHORIZATION')[7:]

        user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

        if Ward.objects.filter(user_id=user_id):
            ward = Ward.objects.get(user_id=user_id)
        
        else:
            return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

        # temperature = Subquery(PatientStatus.objects.filter(patient=OuterRef('pk')).order_by('-pk').values('temperature')[:1], output_field=FloatField())
        # bpm = Subquery(PatientStatus.objects.filter(patient=OuterRef('pk')).order_by('-pk').values('bpm')[:1], output_field=IntegerField())
        # oxygen_saturation = Subquery(PatientStatus.objects.filter(patient=OuterRef('pk')).order_by('-pk').values('oxygen_saturation')[:1], output_field=IntegerField())

        patient_name_number = request.GET.get('patient', None)

        # if patient_name_number is not None:
        #     if patient_name_number.isdecimal():
        #         patients = Patient.objects.filter(ward=ward, discharged_date=None, number__contains=patient_name_number).annotate(temperature=Coalesce(temperature,0.0), bpm=Coalesce(bpm,0), oxygenSaturation=Coalesce(oxygen_saturation,0)).order_by('-is_warning', '-pk')
        #     else:
        #         patients = Patient.objects.filter(ward=ward, discharged_date=None, name__contains=patient_name_number).annotate(temperature=Coalesce(temperature,0.0), bpm=Coalesce(bpm,0), oxygenSaturation=Coalesce(oxygen_saturation,0)).order_by('-is_warning', '-pk')
        # else:
        #     patients = Patient.objects.filter(ward=ward, discharged_date=None).annotate(temperature=Coalesce(temperature,0.0), bpm=Coalesce(bpm,0), oxygenSaturation=Coalesce(oxygen_saturation,0)).order_by('-is_warning', '-pk')
        
        patitent_not_warning_lst = []
        patient_warning_lst = []

        now = datetime.datetime.now()
        now = (now + relativedelta(seconds=-(now.second % 5))).strftime('%Y-%m-%d %H:%M:%S')

        if patient_name_number is not None:
            if patient_name_number.isdecimal():
                patients = Patient.objects.filter(ward=ward, discharged_date=None, number__contains=patient_name_number)  # 입원한 해당 병동의 filter 번호를 포함하는 환자
            else:
                patients = Patient.objects.filter(ward=ward, discharged_date=None, name__contains=patient_name_number)  # 입원한 해당 병동의 filter 이름을 포함하는 환자
        else:
            patients = Patient.objects.filter(ward=ward, discharged_date=None)  # 입원한 해당 병동의 모든 환자
        for i in range(len(patients)):

            patient = patients[i]
            health = PatientStatusNow.objects.filter(patient=patient, now=now)

            patient_data = {
                'id': patient.id,
                'number': patient.number,
                'name': patient.name,
                'sex': patient.sex,
                'nok_name': patient.nok_name,
                'nok_phonenumber': patient.nok_phonenumber,
                'doctor': patient.doctor,
                'is_warning': patient.is_warning
            }

            if len(health) >= 1:
                patient_data['temperature'] = health[0].temperature
                patient_data['bpm'] = health[0].bpm
                patient_data['oxygenSaturation'] = health[0].oxygen_saturation
                
            else:
                patient_data['temperature'] = 36.5
                patient_data['bpm'] = 80
                patient_data['oxygenSaturation'] = 98

            if patient.is_warning == True:
                patient_warning_lst.append(patient_data)

            else:
                patitent_not_warning_lst.append(patient_data)

        patient_lst = patient_warning_lst + patitent_not_warning_lst

        page = self.paginate_queryset(patient_lst)

        if page is not None:
            serializer = self.get_paginated_response(self.serializer_class(page, many=True).data)
        else:
            serializer = self.serializer_class(patients, many=True)

        previous = serializer.data.get('previous')

        if previous != None:  # 이전 페이지가 있을 때 = 현재 2페이지 이상
            if 'page=' in previous:  # 이전 페이지가 있는데 page= 이 있을 때 = 현재 3페이지 이상
                previous = previous.split('page=')[1]
                if '&' in previous:
                    previous = previous.split('&')[0]
                previous = int(previous)
            else:  # 이전 페이지가 있는데 page= 이 없을 때 = 현재 페이지가 2페이지
                serializer.data['now'] = 2
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:  # 이전 페이지가 없을 때 = 현재 페이지가 1일 때
            serializer.data['now'] = 1
            return Response(serializer.data, status=status.HTTP_200_OK)

        next = serializer.data.get('next')
        print(next)
        if next != None:  # 다음 페이지가 있을 때
            next = next.split('page=')[1]
            if '&' in next:
                    next = next.split('&')[0]
            next = int(next)
        else:  # 다음 페이지가 없을 때 = 현재 페이지가 마지막 페이지
            next = previous + 2

        now = (previous + next) // 2
        serializer.data['now'] = now

        return Response(serializer.data, status=status.HTTP_200_OK)


# 병동: 환자 건강 정보 조회
# 실시간 - 가장 최근 데이터
# 기본 - 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)
@api_view(['GET'])
def health(request, patient_number):

    token = request.META.get('HTTP_AUTHORIZATION')[7:]

    user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

    if Ward.objects.filter(user_id=user_id):
        ward = Ward.objects.get(user_id=user_id)
        
    else:
        return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

    patient = Patient.objects.filter(number=patient_number)

    if patient.exists():
        patient = patient[0]
        if patient.ward_id != ward.id:
            return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)
    else:  # 환자번호에 해당하는 환자가 없으면
        return Response({'result': '환자의 정보가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

    # now = datetime.datetime(2022, 11, 2, 22, 38, 25)
    now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    now_health = PatientStatusNow.objects.filter(patient__number=patient_number, now=now.strftime('%Y-%m-%d %H:%M:%S'))  # 실시간

    if now_health.exists():
        now_serializer = HealthSerializer(now_health[0])

    else:
        temperature = 36.5
        bpm = 80
        oxygen_saturation = 98

        now_health_data = {
            'temperature': temperature,
            'bpm': bpm,
            'oxygen_saturation': oxygen_saturation,
            'now': now.strftime('%Y-%m-%d %H:%M:%S')
        }
        now_serializer = HealthSerializer(now_health_data)

    period = request.GET.get('period')

    result_temperature = []
    result_bpm = []
    result_oxygen_saturation = []

    if period == 'month':

        time = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)
        start = time + relativedelta(days=-30)

        check = PatientDay.objects.filter(patient__number=patient_number, now__gte=start, now__lt=time)

        if check.exists():  # 하나라도 체크된 값이 있으면

            for i in range(30):
                end = start + relativedelta(days=1)

                health = PatientDay.objects.filter(patient__number=patient_number, now__gte=start, now__lt=end)
                
                if health.exists():
                    temperature_data = {
                            '시간': start.strftime('%Y-%m-%d'),
                            '최대': health.aggregate(최대=Max('max_t'))['최대'],
                            '최소': health.aggregate(최소=Min('min_t'))['최소']
                        }
                    result_temperature.append(temperature_data)
                    
                    bpm_data = {
                        '시간': start.strftime('%Y-%m-%d'),
                        '최대': health.aggregate(최대=Max('max_b'))['최대'],
                        '최소': health.aggregate(최소=Min('min_b'))['최소']
                    }
                    result_bpm.append(bpm_data)
                
                    oxygen_saturation_data = {
                        '시간': start.strftime('%Y-%m-%d'),
                        '최대': health.aggregate(최대=Max('max_o'))['최대'],
                        '최소': health.aggregate(최소=Min('min_o'))['최소']
                    }
                    result_oxygen_saturation.append(oxygen_saturation_data)

                else:
                    temperature_data = {
                            '시간': start.strftime('%Y-%m-%d'),
                            '최대': 0.0,
                            '최소': 0.0
                        }
                    result_temperature.append(temperature_data)
                    
                    bpm_data = {
                        '시간': start.strftime('%Y-%m-%d'),
                        '최대': 0,
                        '최소': 0
                    }
                    result_bpm.append(bpm_data)
                
                    oxygen_saturation_data = {
                        '시간': start.strftime('%Y-%m-%d'),
                        '최대': 0,
                        '최소': 0
                    }
                    result_oxygen_saturation.append(oxygen_saturation_data)

                start = end

        else:  # 최대/최소값 데이터가 단 한 개도 없다면
            
            health = PatientStatusDefault.objects.all()

            for i in range(30):

                end = start + relativedelta(days=1)

                temperature_data = {
                        '시간': start.strftime('%Y-%m-%d'),
                        '최대': round(health[i].temperature + 5, 1),
                        '최소': round(health[i].temperature - 5, 1)
                    }
                result_temperature.append(temperature_data)
                
                bpm_data = {
                    '시간': start.strftime('%Y-%m-%d'),
                    '최대': health[i].bpm + 5,
                    '최소': health[i].bpm - 5
                }
                result_bpm.append(bpm_data)
            
                oxygen_saturation_data = {
                    '시간': start.strftime('%Y-%m-%d'),
                    '최대': health[i].oxygen_saturation + 5,
                    '최소': health[i].oxygen_saturation - 5
                }
                result_oxygen_saturation.append(oxygen_saturation_data)

                start = end

    elif period == 'week':

        if now.hour >= 12:
            time = datetime.datetime(now.year, now.month, now.day, 12, 0, 0)
        elif now.hour < 12:
            time = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)

        start = time + relativedelta(days=-7)

        check = PatientDay.objects.filter(patient__number=patient_number, now__gte=start, now__lt=time)

        if check.exists():  # 하나라도 체크된 값이 있으면

            for i in range(14):
                end = start + relativedelta(hours=12)

                health = PatientDay.objects.filter(patient__number=patient_number, now__gte=start, now__lt=end)
                
                if health.exists():
                    temperature_data = {
                            '시간': start.strftime('%Y-%m-%d %H'),
                            '최대': health.aggregate(최대=Max('max_t'))['최대'],
                            '최소': health.aggregate(최소=Min('min_t'))['최소']
                        }
                    result_temperature.append(temperature_data)
                    
                    bpm_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': health.aggregate(최대=Max('max_b'))['최대'],
                        '최소': health.aggregate(최소=Min('min_b'))['최소']
                    }
                    result_bpm.append(bpm_data)
                
                    oxygen_saturation_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': health.aggregate(최대=Max('max_o'))['최대'],
                        '최소': health.aggregate(최소=Min('min_o'))['최소']
                    }
                    result_oxygen_saturation.append(oxygen_saturation_data)

                else:
                    temperature_data = {
                            '시간': start.strftime('%Y-%m-%d %H'),
                            '최대': 0.0,
                            '최소': 0.0
                        }
                    result_temperature.append(temperature_data)
                    
                    bpm_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': 0,
                        '최소': 0
                    }
                    result_bpm.append(bpm_data)
                
                    oxygen_saturation_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': 0,
                        '최소': 0
                    }
                    result_oxygen_saturation.append(oxygen_saturation_data)

                start = end

        else:  # 최대/최소값 데이터가 단 한 개도 없다면
            
            health = PatientStatusDefault.objects.all()

            for i in range(14):

                end = start + relativedelta(hours=12)

                temperature_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': round(health[i].temperature + 5, 1), 
                        '최소': round(health[i].temperature - 5, 1)
                    }
                result_temperature.append(temperature_data)
                
                bpm_data = {
                    '시간': start.strftime('%Y-%m-%d %H'),
                    '최대': health[i].bpm + 5,
                    '최소': health[i].bpm - 5
                }
                result_bpm.append(bpm_data)
            
                oxygen_saturation_data = {
                    '시간': start.strftime('%Y-%m-%d %H'),
                    '최대': health[i].oxygen_saturation + 5,
                    '최소': health[i].oxygen_saturation - 5
                }
                result_oxygen_saturation.append(oxygen_saturation_data)

                start = end

    elif period == 'day':

        time = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)

        start = time + relativedelta(days=-1)

        check = PatientDay.objects.filter(patient__number=patient_number, now__gte=start, now__lt=time)

        if check.exists():  # 하나라도 체크된 값이 있으면

            for i in range(24):
                end = start + relativedelta(hours=1)

                health = PatientDay.objects.filter(patient__number=patient_number, now__gte=start, now__lt=end)
                
                if health.exists():
                    temperature_data = {
                            '시간': start.strftime('%Y-%m-%d %H'),
                            '최대': health.aggregate(최대=Max('max_t'))['최대'],
                            '최소': health.aggregate(최소=Min('min_t'))['최소']
                        }
                    result_temperature.append(temperature_data)
                    
                    bpm_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': health.aggregate(최대=Max('max_b'))['최대'],
                        '최소': health.aggregate(최소=Min('min_b'))['최소']
                    }
                    result_bpm.append(bpm_data)
                
                    oxygen_saturation_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': health.aggregate(최대=Max('max_o'))['최대'],
                        '최소': health.aggregate(최소=Min('min_o'))['최소']
                    }
                    result_oxygen_saturation.append(oxygen_saturation_data)

                else:
                    temperature_data = {
                            '시간': start.strftime('%Y-%m-%d %H'),
                            '최대': 0.0,
                            '최소': 0.0
                        }
                    result_temperature.append(temperature_data)
                    
                    bpm_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': 0,
                        '최소': 0
                    }
                    result_bpm.append(bpm_data)
                
                    oxygen_saturation_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': 0,
                        '최소': 0
                    }
                    result_oxygen_saturation.append(oxygen_saturation_data)

                start = end

        else:  # 최대/최소값 데이터가 단 한 개도 없다면
            
            health = PatientStatusDefault.objects.all()

            for i in range(24):

                end = start + relativedelta(hours=1)

                temperature_data = {
                        '시간': start.strftime('%Y-%m-%d %H'),
                        '최대': round(health[i].temperature + 5, 1),
                        '최소': round(health[i].temperature - 5, 1)
                    }
                result_temperature.append(temperature_data)
                
                bpm_data = {
                    '시간': start.strftime('%Y-%m-%d %H'),
                    '최대': health[i].bpm + 5,
                    '최소': health[i].bpm - 5
                }
                result_bpm.append(bpm_data)
            
                oxygen_saturation_data = {
                    '시간': start.strftime('%Y-%m-%d %H'),
                    '최대': health[i].oxygen_saturation + 5,
                    '최소': health[i].oxygen_saturation - 5
                }
                result_oxygen_saturation.append(oxygen_saturation_data)

                start = end

    elif period == None or period == 'now':
        
        start = now + relativedelta(seconds=-60)
        
        check = PatientStatusNow.objects.filter(patient__number=patient_number, now__gt=start, now__lte=now)

        if check.exists():

            for i in range(12):
                end = (start + relativedelta(seconds=5)).strftime('%Y-%m-%d %H:%M:%S')

                health = check.filter(now=end)
                # print(health)
                if health.exists():
                
                    temperature_data = {
                        '시간': end,
                        '체온': health[0].temperature
                    }
                    result_temperature.append(temperature_data)
                    
                    bpm_data = {
                        '시간': end,
                        '심박수': health[0].bpm
                    }
                    result_bpm.append(bpm_data)
                
                    oxygen_saturation_data = {
                        '시간': end,
                        '산소포화도': health[0].oxygen_saturation
                    }
                    result_oxygen_saturation.append(oxygen_saturation_data)

                else:

                    temperature_data = {
                        '시간': end,
                        '체온': 0.0
                    }
                    result_temperature.append(temperature_data)

                    bpm_data = {
                        '시간': end,
                        '심박수': 0
                    }
                    result_bpm.append(bpm_data)

                    oxygen_saturation_data = {
                        '시간': end,
                        '산소포화도': 0
                    }
                    result_oxygen_saturation.append(oxygen_saturation_data)
        
                start = start + relativedelta(seconds=5)

            if result_temperature[-1]['체온'] == 0.0 and result_bpm[-1]['심박수'] == 0 and result_oxygen_saturation[-1]['산소포화도'] == 0:
                result_temperature[-1]['체온'] = 36.5
                result_bpm[-1]['심박수'] = 80
                result_oxygen_saturation[-1]['산소포화도'] = 98

        else:

            health = PatientStatusDefault.objects.all()

            for i in range(12):

                tmp_time = (start + relativedelta(seconds=5*(i+1))).strftime('%Y-%m-%d %H:%M:%S')

                temperature_data = {
                    '시간': tmp_time,
                    '체온': health[i].temperature
                }
                result_temperature.append(temperature_data)
                
                bpm_data = {
                    '시간': tmp_time,
                    '심박수': health[i].bpm
                }
                result_bpm.append(bpm_data)
            
                oxygen_saturation_data = {
                    '시간': tmp_time,
                    '산소포화도': health[i].oxygen_saturation
                }
                result_oxygen_saturation.append(oxygen_saturation_data)

        return Response({'실시간': now_serializer.data, '체온': result_temperature, '심박수': result_bpm, '산소포화도': result_oxygen_saturation}, status=status.HTTP_200_OK)

    else:
        return Response({'result': '올바르지 않은 요청입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'실시간': now_serializer.data, '체온': result_temperature, '심박수': result_bpm, '산소포화도': result_oxygen_saturation}, status=status.HTTP_200_OK)


# 환자: 건강 정보 조회
# 실시간 + 최근 1분
@api_view(['GET'])
def patient_health(request):
    
    token = request.META.get('HTTP_AUTHORIZATION')[7:]

    user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

    if Patient.objects.filter(user_id=user_id):
        patient = Patient.objects.get(user_id=user_id)
        
    else:
        return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

    # now = datetime.datetime(2022, 11, 2, 22, 38, 25)
    now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    now_health = PatientStatusNow.objects.filter(patient__number=patient.number, now=now.strftime('%Y-%m-%d %H:%M:%S'))  # 실시간

    if now_health.exists():
        serializer = HealthSerializer(now_health[0])

    else:

        temperature = 36.5
        bpm = 80
        oxygen_saturation = 98

        now_health_data = {
            'temperature': temperature,
            'bpm': bpm,
            'oxygen_saturation': oxygen_saturation,
            'now': now
        }
        serializer = HealthSerializer(now_health_data)

    patient_number = patient.number

    result_temperature = []
    result_bpm = []
    result_oxygen_saturation = []

    start = now + relativedelta(seconds=-60)
        
    check = PatientStatusNow.objects.filter(patient__number=patient_number, now__gt=start, now__lte=now)

    if check.exists():

        for i in range(12):
            end = (start + relativedelta(seconds=5)).strftime('%Y-%m-%d %H:%M:%S')

            health = PatientStatusNow.objects.filter(patient__number=patient_number, now__gt=start, now__lte=end)

            if health.exists():
            
                temperature_data = {
                    '시간': end,
                    '체온': health[0].temperature
                }
                result_temperature.append(temperature_data)
                
                bpm_data = {
                    '시간': end,
                    '심박수': health[0].bpm
                }
                result_bpm.append(bpm_data)
            
                oxygen_saturation_data = {
                    '시간': end,
                    '산소포화도': health[0].oxygen_saturation
                }
                result_oxygen_saturation.append(oxygen_saturation_data)

            else:

                temperature_data = {
                    '시간': end,
                    '체온': 0.0
                }
                result_temperature.append(temperature_data)

                bpm_data = {
                    '시간': end,
                    '심박수': 0
                }
                result_bpm.append(bpm_data)

                oxygen_saturation_data = {
                    '시간': end,
                    '산소포화도': 0
                }
                result_oxygen_saturation.append(oxygen_saturation_data)
    
            start = start + relativedelta(seconds=5)

        if result_temperature[-1]['체온'] == 0.0 and result_bpm[-1]['심박수'] == 0 and result_oxygen_saturation[-1]['산소포화도'] == 0:
            result_temperature[-1]['체온'] = 36.5
            result_bpm[-1]['심박수'] = 80
            result_oxygen_saturation[-1]['산소포화도'] = 98

    else:

        health = PatientStatusDefault.objects.all()

        for i in range(12):

            tmp_time = (start + relativedelta(seconds=5*(i+1))).strftime('%Y-%m-%d %H:%M:%S')

            temperature_data = {
                '시간': tmp_time,
                '체온': health[i].temperature
            }
            result_temperature.append(temperature_data)
            
            bpm_data = {
                '시간': tmp_time,
                '심박수': health[i].bpm
            }
            result_bpm.append(bpm_data)
        
            oxygen_saturation_data = {
                '시간': tmp_time,
                '산소포화도': health[i].oxygen_saturation
            }
            result_oxygen_saturation.append(oxygen_saturation_data)

    return Response({'실시간': serializer.data, '체온': result_temperature, '심박수': result_bpm , '산소포화도': result_oxygen_saturation}, status=status.HTTP_200_OK)


# 엑셀 다운로드
from rest_framework.viewsets import ReadOnlyModelViewSet
from drf_excel.mixins import XLSXFileMixin
from drf_excel.renderers import XLSXRenderer

class HealthExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):

    serializer_class = HealthSerializer
    renderer_classes = (XLSXRenderer,)
    filename = 'health_excel_download.xlsx'

    def get_queryset(self):

        # now = datetime.datetime(2022, 11, 17, 18, 9, 30)
        now = datetime.datetime.now()
        now = now + relativedelta(seconds=-(now.second % 5))

        period = self.request.GET.get('period')
        if period == 'month' or period == 'week' or period == 'day':
            now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)
        
        elif period == 'now' or period == None:
            now = datetime.datetime(now.year, now.month, now.day, now.hour, now.minute, now.second)

        if period == 'month':
            start = now + relativedelta(days=-30)
            data_count = 720

        elif period == 'week':
            start = now + relativedelta(days=-7)
            data_count = 168

        elif period == 'day':
            start = now + relativedelta(days=-1)
            data_count = 24

        elif period == 'now' or period == None:
            start = now + relativedelta(seconds=-60)
            data_count = 12

        number = self.request.GET.get('number')

        if period == 'month' or period == 'week' or period == 'day':
            check = PatientStatusExcel.objects.filter(patient__number=number, now__gt=start, now__lte=now)
           
            if check.exists():

                queryset = []
                
                for i in range(data_count):
                    
                    end = start + relativedelta(hours=1)
                    health = check.filter(now=end)

                    if health.exists():
                        queryset.append(health[0])

                    start = end

            else:  # 데이터가 한 개도 존재하지 않으면
                
                queryset = []

                health = PatientStatusDefault.objects.all()

                for i in range(data_count):
                    tmp_time = (start + relativedelta(hours=1*(i+1))).strftime('%Y-%m-%d %H:%M:%S')
                    tmp_data = health[i % 30]
                    
                    data = {
                        'now': tmp_time,
                        'temperature': tmp_data.temperature,
                        'bpm': tmp_data.bpm,
                        'oxygen_saturation': tmp_data.oxygen_saturation
                    }

                    queryset.append(data)

        elif period == 'now' or period == None:

            check = PatientStatusNow.objects.filter(patient__number=number, now__gt=start, now__lte=now)
            if check.exists():

                queryset = []

                for i in range(12):
                    
                    end = start + relativedelta(seconds=5)

                    health = check.filter(now=end)

                    if len(health) >= 1:
                        
                        queryset.append(health[0])

                    start = end

            else:  # 데이터가 한 개도 없으면

                queryset = []
                health = PatientStatusDefault.objects.all()

                for i in range(12):

                    tmp_time = (now + relativedelta(seconds=-60) + relativedelta(seconds=5*(i+1))).strftime('%Y-%m-%d %H:%M:%S')

                    data = {
                        'now': tmp_time,
                        'temperature': health[i].temperature,
                        'bpm': health[i].bpm,
                        'oxygen_saturation': health[i].oxygen_saturation
                    }
                    
                    queryset.append(data)

        return queryset

    def get_header(self):

        number = self.request.GET.get('number')

        patient = Patient.objects.filter(number=number)
        
        if len(patient) == True:
            patient_name = patient[0].name

            return {
            'tab_title': '건강정보', # title of tab/workbook
            'use_header': True,  # show the header_title 
            'header_title': f'{patient_name}님의 건강정보입니다.',
            'height': 30,
            'style': {
            'fill': {
                'fill_type': 'solid',
                'start_color': '1A3263',
            },
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center',
            },
            'font': {
                'size': 15,
                'bold': True,
                'color': 'FFFFFF',
            }
            }
            }

        else:
            return {
            'tab_title': '건강정보', # title of tab/workbook
            'use_header': True,  # show the header_title 
            'header_title': f'환자의 정보가 존재하지 않습니다.',
            'height': 30,
            'style': {
            'fill': {
                'fill_type': 'solid',
                'start_color': '1A3263',
            },
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center',
            },
            'font': {
                'size': 15,
                'bold': True,
                'color': 'FFFFFF',
            }
            }
            }

    column_header = {
        'column_width': [19, 19, 19, 19],
        'height': 19,
        'style': {
            'fill': {
                'fill_type': 'solid',
                'start_color': 'F6F7FB',
            },
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center',
                # 'wrapText': True,
                # 'shrink_to_fit': True,
            },
            'border_side': {
                'border_style': 'thin',
                'color': '333333',
            },
            'font': {
                # 'name': 'Arial',
                'size': 12,
                'bold': True,
                'color': '1A3263',
            },
        },
    }

    body = {
        'style': {
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center',
                # 'wrapText': True,
                # 'shrink_to_fit': True,
            },
            # 'border_side': {
            #     'border_style': 'thin',
            #     'color': 'FF000000',
            # },
            'font': {
                # 'name': 'Arial',
                'size': 11,
                'bold': False,
                'color': '333333',
            }
        },
        'height': 19,
    }