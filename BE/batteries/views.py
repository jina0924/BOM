from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Bms, BmsStatus, Battery, BatteryStatus
from wards.models import Ward, Patient
from .serializers import BmsStatusSerializer
import jwt
from thundervolt.settings import SECRET_KEY
import datetime
from dateutil.relativedelta import relativedelta
from django.db.models import Max, OuterRef, Subquery, FloatField, IntegerField
from django.db.models.functions import Coalesce


# 병동: 실시간 bms 상태, 배터리 상태 조회
@api_view(['GET'])
def bms(request, patient_number):

    token = request.META.get('HTTP_AUTHORIZATION')[7:]

    user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

    if Ward.objects.filter(user_id=user_id):
        ward = Ward.objects.get(user_id=user_id)
        
    else:
        return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

    if ward.number != patient_number[2:5]:
        return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

    if Patient.objects.filter(number=patient_number):
        patient = Patient.objects.get(number=patient_number)

    else:
        return Response({'result': '존재하지 않는 환자입니다.'}, status=status.HTTP_404_NOT_FOUND)

    bms = Bms.objects.filter(patient=patient)

    if bms != None:
        bms = Bms.objects.get(patient=patient)
    
    else:
        return Response({'result': '해당 환자의 bms 정보가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

    now = datetime.datetime(2022, 11, 3, 19, 5, 0)
    # now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))
    now_bms = BmsStatus.objects.filter(bms=bms, now__lte=now).last()  # 실시간
    now_serializer = BmsStatusSerializer(now_bms)

    batteries = Battery.objects.filter(bms=bms)

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

        period_bms = BmsStatus.objects.filter(bms=bms, now__lte=now, now__gt=(now + relativedelta(seconds=-start)))
        
        period_temperature = []

        for i in range(len(period_bms)):
            temperature = {
                '시간': period_bms.values('now')[i]['now'].strftime('%Y-%m-%d %H:%M:%S'),
                '온도': period_bms.values('temperature')[i]['temperature']
            }

            period_temperature.append(temperature)

        tmp_temperature = []
        
        if len(period_temperature) < 12:
            
            for i in range(1, 12 - len(period_temperature) + 1):
                now_datetime = (now + relativedelta(seconds=-start) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
                
                temperature = {
                    '시간': now_datetime,
                    '온도': 0
                }        
                tmp_temperature.append(temperature)

        result_temperature = tmp_temperature + period_temperature

        return Response({'실시간': now_serializer.data, '온도': result_temperature}, status=status.HTTP_200_OK)

    else:
        return Response({'result': '올바르지 않은 요청입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    period_start = period_now + relativedelta(seconds=-start)
   
    period_temperature = []

    while period_start < period_now:

        period_end = period_start + relativedelta(seconds=delta)

        period_bms = BmsStatus.objects.filter(bms=bms, now__lte=period_end, now__gt=period_start)

        max_temperature = period_bms.aggregate(최고=Max('temperature'))['최고']

        if max_temperature:
            
            if period == 'month':
                period_value = period_end.strftime('%Y-%m-%d')
            else:
                period_value = period_end.strftime('%Y-%m-%d %H:%M:%S')

            temperature = {
                '시간': period_value,
                '온도': max_temperature,
            }
            period_temperature.append(temperature)
        
        period_start = period_end

    tmp_temperature = []
    
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

    result_temperature = tmp_temperature + period_temperature

    return Response({'실시간': now_serializer.data, '체온': result_temperature}, status=status.HTTP_200_OK)

    
    return Response({'result': 1}, status=status.HTTP_200_OK)

