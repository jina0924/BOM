from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Bms, BmsStatus, Battery, BatteryStatus, BmsStatusExcel, BatteryStatusExcel, BmsStatusNow, BatteryStatusNow
from wards.models import Ward, Patient
from .serializers import BmsStatusSerializer, BatteryStatusSerializer
import jwt
from thundervolt.settings import SECRET_KEY
import datetime
from dateutil.relativedelta import relativedelta
from django.db.models import Max, OuterRef, Subquery, FloatField, IntegerField
from django.db.models.functions import Coalesce
import redis
from my_settings import DATABASES


# 병동: 실시간 bms 상태, 배터리 상태 조회
@api_view(['GET'])
def bms(request, patient_number):

    token = request.META.get('HTTP_AUTHORIZATION')[7:]

    user_id = jwt.decode(token, SECRET_KEY, 'HS256').get('user_id')

    if Ward.objects.filter(user_id=user_id):
        ward = Ward.objects.get(user_id=user_id)
        
    else:
        return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)

    patient = Patient.objects.filter(number=patient_number)

    if len(patient) == True:
        patient = patient[0]
        if patient.ward_id != ward.id:
            return Response({'result': '잘못된 접근입니다.'}, status=status.HTTP_403_FORBIDDEN)
    else:  # 환자번호에 해당하는 환자가 없으면
        return Response({'result': '환자의 정보가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

    now = datetime.datetime.now()
    now = now + relativedelta(seconds=-(now.second % 5))

    bms = Bms.objects.filter(patient=patient)

    if len(bms) == True:
        bms = Bms.objects.get(patient=patient)

        now_bms = BmsStatus.objects.filter(bms=bms, now__lte=now).last()  # 실시간
        now_serializer = BmsStatusSerializer(now_bms)

        batteries = Battery.objects.filter(bms=bms)
        battery1 = batteries[0].id
        battery2 = batteries[1].id

        battery1_now_voltage = BatteryStatus.objects.filter(battery_id=battery1, now__lte=now).last()
        battery2_now_voltage = BatteryStatus.objects.filter(battery_id=battery2, now__lte=now).last()

        result_now = dict()
        result_now.update(now_serializer.data)
        result_now['전압1'] = battery1_now_voltage.voltage
        result_now['전압2'] = battery2_now_voltage.voltage
        result_now['잔량1'] = battery1_now_voltage.amount
        result_now['잔량2'] = battery2_now_voltage.amount
    
    else:
        
        result_now = {
            '온도': 0,
            '시간': now.strftime('%Y-%m-%d %H:%M:%S'),
            '전압1': 0.0,
            '전압2': 0.0,
            '잔량1': 0,
            '잔량2': 0
        }

    period = request.GET.get('period')

    result_temperature = []
    result_voltage = []

    connect = redis.StrictRedis(host=DATABASES['default']['HOST'], port=6379, db=5, charset='utf-8', decode_responses=True, password=DATABASES['default']['PASSWORD'])

    # delta 단위 = 초
    if period == 'month':
        data_count = 30

        time = now.strftime('%Y-%m-%d')

        for i in range(data_count):
            temperature = connect.hgetall(f'{time}_{patient_number}_temperature_month_{i+1}')
            voltage = connect.hgetall(f'{time}_{patient_number}_voltage_month_{i+1}')

            result_temperature.append(temperature)
            result_voltage.append(voltage)

    elif period == 'week':

        data_count = 14
        if now.hour >= 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 12, 0, 0)
        elif now.hour < 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)

        time = period_now.strftime('%Y-%m-%d %H')

        for i in range(data_count):
            temperature = connect.hgetall(f'{time}_{patient_number}_temperature_week_{i+1}')
            voltage = connect.hgetall(f'{time}_{patient_number}_voltage_week_{i+1}')

            result_temperature.append(temperature)
            result_voltage.append(voltage)

    elif period == 'day':

        data_count = 24
        period_now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)

        time = period_now.strftime('%Y-%m-%d %H')

        for i in range(data_count):
            temperature = connect.hgetall(f'{time}_{patient_number}_temperature_day_{i+1}')
            voltage = connect.hgetall(f'{time}_{patient_number}_voltage_day_{i+1}')

            result_temperature.append(temperature)
            result_voltage.append(voltage)

    elif period == None or period == 'now':

        connect = redis.StrictRedis(host=DATABASES['default']['HOST'], port=6379, db=4, charset='utf-8', decode_responses=True, password=DATABASES['default']['PASSWORD'])

        for i in range(12):
            temperature = connect.hgetall(f'{patient_number}_temperature_now_{i+1}')
            voltage = connect.hgetall(f'{patient_number}_voltage_now_{i+1}')

            result_temperature.append(temperature)
            result_voltage.append(voltage)

        return Response({'실시간': result_now, '온도': result_temperature, '전압': result_voltage}, status=status.HTTP_200_OK)

    else:
        return Response({'result': '올바르지 않은 요청입니다.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'실시간': result_now, '온도': result_temperature, '전압': result_voltage}, status=status.HTTP_200_OK)


# 엑셀 다운로드
from rest_framework.viewsets import ReadOnlyModelViewSet
from drf_excel.mixins import XLSXFileMixin
from drf_excel.renderers import XLSXRenderer

class BmsExcelViewSet(XLSXFileMixin, ReadOnlyModelViewSet):

    serializer_class = BatteryStatusSerializer
    renderer_classes = (XLSXRenderer,)
    filename = 'bms_excel_download.xlsx'

    def get_queryset(self):

        now = datetime.datetime(2022, 11, 15, 17, 58, 2)
        # now = datetime.datetime.now()
        now = now + relativedelta(seconds=-(now.second % 5))

        period = self.request.GET.get('period')
        if period == 'month' or period == 'week' or period == 'day':
            now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)

        if period == 'month':
            start = now + relativedelta(days=-30)

        elif period == 'week':
            start = now + relativedelta(days=-7)

        elif period == 'day':
            start = now + relativedelta(days=-1)

        elif period == 'now' or period == None:
            start = now + relativedelta(seconds=-60)

        number = self.request.GET.get('number')

        queryset = []

        bms = Bms.objects.filter(patient__number=number)
        # bms = BmsStatus.objects.filter(patient__number=number, now__gt=start, now__lte=now)
        if len(bms) == True:
            bms_id = bms[0].id

            batteries = Battery.objects.filter(bms_id=bms_id)
            battery1_id = batteries[0].id
            battery2_id = batteries[1].id

            if period == 'month' or period == 'week' or period == 'day':
                temperature = BmsStatusExcel.objects.filter(bms_id=bms_id, now__gt=start, now__lte=now)
                battery1 = BatteryStatusExcel.objects.filter(battery_id=battery1_id, now__gt=start, now__lte=now)
                battery2 = BatteryStatusExcel.objects.filter(battery_id=battery2_id, now__gt=start, now__lte=now)

            elif period == 'now' or period == None:
                temperature = BmsStatusNow.objects.filter(bms_id=bms_id, now__gt=start, now__lte=now)
                battery1 = BatteryStatusNow.objects.filter(battery_id=battery1_id, now__gt=start, now__lte=now)
                battery2 = BatteryStatusNow.objects.filter(battery_id=battery2_id, now__gt=start, now__lte=now)

            for i in range(len(temperature)):
                data = dict()
                data['시간'] = temperature[i].now
                data['온도'] = temperature[i].temperature
                data['전압1'] = battery1[i].voltage
                data['전압2'] = battery2[i].voltage
                queryset.append(data)

        return queryset

    def get_header(self):

        number = self.request.GET.get('number')

        patient = Patient.objects.filter(number=number)
        
        if len(patient) == True:
            patient_name = patient[0].name

            return {
            'tab_title': '디바이스정보', # title of tab/workbook
            'use_header': True,  # show the header_title 
            'header_title': f'{patient_name}님의 디바이스정보입니다.',
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
            'tab_title': '디바이스정보', # title of tab/workbook
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
            'font': {
                # 'name': 'Arial',
                'size': 11,
                'bold': False,
                'color': '333333',
            }
        },
        'height': 19,
    }