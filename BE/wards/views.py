from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
import requests
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Ward, Nurse, Doctor, Patient, PatientStatus, Alert
from .serializers import WardSerializer, PatientSerializer, PatientDetailSerializer, WardDetailSerializer, TemperatureSerializer, BpmSerializer, OxygenSaturationSerializer, NurseSerializer, DoctorSerializer, HealthSerializer, PatientListSerializer, PatientStatusSerializer
import datetime
import jwt
from thundervolt.settings import SECRET_KEY
import datetime
from dateutil.relativedelta import relativedelta
from rest_framework.pagination import PageNumberPagination
from pagination import PaginationHandlerMixin
from rest_framework.views import APIView
from django.db.models import Max, Min, OuterRef, Subquery, FloatField, IntegerField
from django.db.models.functions import Coalesce


User = get_user_model()


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

        now = datetime.datetime(2022, 10, 2, 22, 31, 25)
        # now = datetime.datetime.now()
        now_year = now.year
        now_month = now.month
        
        period_now = datetime.datetime(now_year, now_month, 1, 0, 0, 0)
        period_start = period_now + relativedelta(months=-6)

        tendency = []
        
        while period_start < period_now:
            period_end = period_start + relativedelta(months=1)

            # patients_new = Patient.objects.filter(ward=ward, hospitalized_date__gte=period_start, hospitalized_date__lt=period_end).count()
            patients = Patient.objects.filter(ward=ward, hospitalized_date__lt=period_end, discharged_date__gte=period_start).count()

            # patients = patients_new + patients_old

            data = {
                'month': period_start.strftime('%Y-%m'),
                '환자 수': patients
            }

            tendency.append(data)

            period_start = period_end

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
            cnt = Patient.objects.filter(number__startswith=(this_year + ward_number)).count()
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
        
    else:
        return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

    patient = get_object_or_404(Patient, number=patient_number, ward=ward)

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

        temperature = Subquery(PatientStatus.objects.filter(patient=OuterRef('pk')).order_by('-pk').values('temperature')[:1], output_field=FloatField())
        bpm = Subquery(PatientStatus.objects.filter(patient=OuterRef('pk')).order_by('-pk').values('bpm')[:1], output_field=IntegerField())
        oxygen_saturation = Subquery(PatientStatus.objects.filter(patient=OuterRef('pk')).order_by('-pk').values('oxygen_saturation')[:1], output_field=IntegerField())

        patient = request.GET.get('patient', None)

        if patient is not None:
            if patient.isdecimal():
                patients = Patient.objects.filter(ward=ward, discharged_date=None, number__contains=patient).annotate(temperature=Coalesce(temperature,0.0), bpm=Coalesce(bpm,0), oxygenSaturation=Coalesce(oxygen_saturation,0)).order_by('-is_warning', '-pk')
            else:
                patients = Patient.objects.filter(ward=ward, discharged_date=None, name__contains=patient).annotate(temperature=Coalesce(temperature,0.0), bpm=Coalesce(bpm,0), oxygenSaturation=Coalesce(oxygen_saturation,0)).order_by('-is_warning', '-pk')
        else:
            patients = Patient.objects.filter(ward=ward, discharged_date=None).annotate(temperature=Coalesce(temperature,0.0), bpm=Coalesce(bpm,0), oxygenSaturation=Coalesce(oxygen_saturation,0)).order_by('-is_warning', '-pk')

        page = self.paginate_queryset(patients)

        if page is not None:
            serializer = self.get_paginated_response(self.serializer_class(page, many=True).data)
        else:
            serializer = self.serializer_class(patients, many=True)

        previous = serializer.data.get('previous')
        if previous != None:
            if 'page=' in previous:
                previous = int(previous.split('page=')[1])
                if '&' in previous:
                    previous = int(previous.split('&')[0])
            else:
                serializer.data['now'] = 2
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer.data['now'] = 1
            return Response(serializer.data, status=status.HTTP_200_OK)

        next = serializer.data.get('next')
        if next != None:
            next = int(next.split('page=')[1])
            if '&' in next:
                    next = int(next.split('&')[0])
        else:
            next = int(previous) + 2

        now = (previous + next) // 2

        serializer.data['now'] = now

        return Response(serializer.data, status=status.HTTP_200_OK)


# 병동: 환자 건강 정보 조회
# 실시간 - 가장 최근 데이터
# 기본 - 최근 1분 동안의 정보 (5초마다 데이터가 저장되므로 총 12개의 데이터)
@api_view(['GET'])
def health(request, patient_number):

    now = datetime.datetime(2022, 10, 2, 22, 31, 25)
    # now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    now_health = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now).last()  # 실시간
    now_serializer = HealthSerializer(now_health)

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

        period_health = PatientStatus.objects.filter(patient__number=patient_number, now__lte=now, now__gt=(now + relativedelta(seconds=-start)))
        
        period_temperature = []
        period_bpm = []
        period_oxygen_saturation = []

        for i in range(len(period_health)):
            temperature = {
                '시간': period_health.values('now')[i]['now'].strftime('%Y-%m-%d %H:%M:%S'),
                '체온': period_health.values('temperature')[i]['temperature']
            }

            bpm = {
                '시간': period_health.values('now')[i]['now'].strftime('%Y-%m-%d %H:%M:%S'),
                '심박수': period_health.values('bpm')[i]['bpm']
            }

            oxygen_saturation = {
                '시간': period_health.values('now')[i]['now'].strftime('%Y-%m-%d %H:%M:%S'),
                '산소포화도': period_health.values('oxygen_saturation')[i]['oxygen_saturation']
            }

            period_temperature.append(temperature)
            period_bpm.append(bpm)
            period_oxygen_saturation.append(oxygen_saturation)

        tmp_temperature = []
        tmp_bpm = []
        tmp_oxygen_saturation = []
        
        if len(period_health) < 12:
            
            for i in range(1, 12 - len(period_health) + 1):
                now_datetime = (now + relativedelta(seconds=-start) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
                
                temperature = {
                    '시간': now_datetime,
                    '체온': 0.0
                }        
                tmp_temperature.append(temperature)

                bpm = {
                    '시간': now_datetime,
                    '심박수': 0
                }
                tmp_bpm.append(bpm)

                oxygen_saturation = {
                    '시간': now_datetime,
                    '산소포화도': 0
                }
                tmp_oxygen_saturation.append(oxygen_saturation)

        result_temperature = tmp_temperature + period_temperature
        result_bpm = tmp_bpm + period_bpm
        result_oxygen_saturation = tmp_oxygen_saturation + period_oxygen_saturation

        return Response({'실시간': now_serializer.data, '체온': result_temperature, '심박수': result_bpm, '산소포화도': result_oxygen_saturation}, status=status.HTTP_200_OK)

    else:
        return Response({'result': '올바르지 않은 요청입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    period_start = period_now + relativedelta(seconds=-start)
   
    period_temperature = []
    period_bpm = []
    period_oxygen_saturation = []

    while period_start < period_now:

        period_end = period_start + relativedelta(seconds=delta)

        period_health = PatientStatus.objects.filter(patient__number=patient_number, now__lte=period_end, now__gt=period_start)

        max_temperature = period_health.aggregate(최고=Max('temperature'))['최고']
        min_temperature = period_health.aggregate(최저=Min('temperature'))['최저']

        max_bpm = period_health.aggregate(최대=Max('bpm'))['최대']
        min_bpm = period_health.aggregate(최소=Min('bpm'))['최소']

        max_oxygen_saturation = period_health.aggregate(최고=Max('oxygen_saturation'))['최고']
        min_oxygen_saturation = period_health.aggregate(최저=Min('oxygen_saturation'))['최저']

        if max_temperature:
            
            if period == 'month':
                period_value = period_end.strftime('%Y-%m-%d')
            else:
                period_value = period_end.strftime('%Y-%m-%d %H:%M:%S')

            temperature = {
                '시간': period_value,
                '최고': max_temperature,
                '최저': min_temperature
            }
            period_temperature.append(temperature)

            bpm = {
                '시간': period_value,
                '최대': max_bpm,
                '최소': min_bpm
            }

            period_bpm.append(bpm)
            
            oxygen_saturation = {
                '시간': period_value,
                '최고': max_oxygen_saturation,
                '최저': min_oxygen_saturation
            }

            period_oxygen_saturation.append(oxygen_saturation)
        
        period_start = period_end

    tmp_temperature = []
    tmp_bpm = []
    tmp_oxygen_saturation = []
    
    if len(period_temperature) < data_count:
        
        for i in range(1, data_count - len(period_temperature) + 1):
            now_datetime = period_now + relativedelta(seconds=-start) + relativedelta(seconds=(i * delta))
            if period == 'month':
                now = now_datetime.strftime('%Y-%m-%d')

            elif period == 'week':
                now = now_datetime.strftime('%Y-%m-%d %H:%M:%S')

            elif period == 'day':
                now = (now_datetime + relativedelta(seconds=-delta)).strftime('%Y-%m-%d %H:%M:%S')

            temperature = {
                '시간': now,
                '최고': 0.0,
                '최저': 0.0
            }
            tmp_temperature.append(temperature)

            bpm = {
                '시간': now,
                '최대': 0,
                '최소': 0
            }
            tmp_bpm.append(bpm)

            oxygen_saturation = {
                '시간': now,
                '최고': 0,
                '최저': 0
            }
            tmp_oxygen_saturation.append(oxygen_saturation)

    result_temperature = tmp_temperature + period_temperature
    result_bpm = tmp_bpm + period_bpm
    result_oxygen_saturation = tmp_oxygen_saturation + period_oxygen_saturation

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

    now = datetime.datetime(2022, 10, 2, 22, 31, 25)
    # now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    health = PatientStatus.objects.filter(patient=patient, now__lte=now).last()
    serializer = HealthSerializer(health)

    start = 60

    period_health = PatientStatus.objects.filter(patient=patient, now__lte=now, now__gt=(now + relativedelta(seconds=-start)))
    
    period_temperature = []
    period_bpm = []
    period_oxygen_saturation = []

    for i in range(len(period_health)):
        temperature = {
            '시간': period_health.values('now')[i]['now'].strftime('%Y-%m-%d %H:%M:%S'),
            '체온': period_health.values('temperature')[i]['temperature']
        }

        bpm = {
            '시간': period_health.values('now')[i]['now'].strftime('%Y-%m-%d %H:%M:%S'),
            '심박수': period_health.values('bpm')[i]['bpm']
        }

        oxygen_saturation = {
            '시간': period_health.values('now')[i]['now'].strftime('%Y-%m-%d %H:%M:%S'),
            '산소포화도': period_health.values('oxygen_saturation')[i]['oxygen_saturation']
        }

        period_temperature.append(temperature)
        period_bpm.append(bpm)
        period_oxygen_saturation.append(oxygen_saturation)

    tmp_temperature = []
    tmp_bpm = []
    tmp_oxygen_saturation = []

    if len(period_health) < 12:
        
        for i in range(1, 12 - len(period_health) + 1):
            now_datetime = (now + relativedelta(seconds=-start) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
            
            temperature = {
                '시간': now_datetime,
                '체온': 0.0
            }        
            tmp_temperature.append(temperature)

            bpm = {
                '시간': now_datetime,
                '심박수': 0
            }
            tmp_bpm.append(bpm)

            oxygen_saturation = {
                '시간': now_datetime,
                '산소포화도': 0
            }
            tmp_oxygen_saturation.append(oxygen_saturation)

    result_temperature = tmp_temperature + period_temperature
    result_bpm = tmp_bpm + period_bpm
    result_oxygen_saturation = tmp_oxygen_saturation + period_oxygen_saturation

    return Response({'실시간': serializer.data, '체온': result_temperature, '심박수': result_bpm , '산소포화도': result_oxygen_saturation}, status=status.HTTP_200_OK)