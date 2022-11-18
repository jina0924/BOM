from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Bms, BmsStatus, Battery, BatteryStatus, BmsStatusExcel, BatteryStatusExcel, BmsStatusNow, BatteryStatusNow, BmsBatteryDefault
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

    period = request.GET.get('period')

    if period == 'month':
        data_count = 30
        period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)
        start = period_now + relativedelta(days=-30)

    elif period == 'week':
        data_count = 14
        if now.hour >= 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 12, 0, 0)
        elif now.hour < 12:
            period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)
        start = period_now + relativedelta(days=-7)

        
    elif period == 'day':
        data_count = 24
        period_now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)
        start = period_now + relativedelta(days=-1)

    elif period == 'now' or period == None:
        data_count = 12
        period_now = datetime.datetime(now.year, now.month, now.day, now.hour, now.minute, now.second)
        start = period_now + relativedelta(seconds=-60)

    result_temperature = []
    result_voltage = []

    if bms.exists():  # 연결된 bms가 있는 경우
        bms = Bms.objects.get(patient=patient)

        now_bms = BmsStatusNow.objects.filter(bms=bms, now=now.strftime('%Y-%m-%d %H:%M:%S'))  # 실시간

        if now_bms.exists():  # 실시간 데이터가 있는 경우
            now_bms = now_bms[0]
            now_serializer = BmsStatusSerializer(now_bms)

            batteries = Battery.objects.filter(bms=bms)
            battery1 = batteries[0].id
            battery2 = batteries[1].id

            battery1_now_voltage = BatteryStatusNow.objects.filter(battery_id=battery1, now=now.strftime('%Y-%m-%d %H:%M:%S'))[0]
            battery2_now_voltage = BatteryStatusNow.objects.filter(battery_id=battery2, now=now.strftime('%Y-%m-%d %H:%M:%S'))[0]

            result_now = dict()
            result_now.update(now_serializer.data)
            result_now['전압1'] = battery1_now_voltage.voltage
            result_now['전압2'] = battery2_now_voltage.voltage
            result_now['잔량1'] = battery1_now_voltage.amount
            result_now['잔량2'] = battery2_now_voltage.amount

        else:  # 실시간 데이터가 없는 경우
            result_now = {
            '온도': 26,
            '시간': now.strftime('%Y-%m-%d %H:%M:%S'),
            '전압1': 3.8,
            '전압2': 3.8,
            '잔량1': 100,
            '잔량2': 100
        }

        if period == 'month':
            pass

        elif period == 'week':
            pass

        elif period == 'day':
            pass

        elif period == None or period == 'now':

            check = BmsStatusNow.objects.filter(bms=bms, now__gt=start, now__lte=now)

            if check.exists():  # 기간에 해당하는 데이터가 한 개 이상이면

                for i in range(12):

                    end = (start + relativedelta(seconds=5)).strftime('%Y-%m-%d %H:%M:%S')

                    bms_data = check.filter(now=end)

                    if bms_data.exists():  # 해당 시간에 bms정보가 있으면

                        temperature_data = {
                            '시간': end,
                            '온도': bms_data[0].temperature
                        }
                        result_temperature.append(temperature_data)
                        
                        batteries = Battery.objects.filter(bms=bms)
                        battery1 = batteries[0]
                        battery2 = batteries[1]

                        voltage_data = {
                            '시간': end,
                            '전압1': BatteryStatusNow.objects.filter(battery=battery1)[0].voltage,
                            '전압2': BatteryStatusNow.objects.filter(battery=battery2)[0].voltage
                        }
                        result_voltage.append(voltage_data)

                    else:  # 해당 시간에 bms 정보가 없으면
                        
                        temperature_data = {
                            '시간': end,
                            '온도': 0
                        }
                        result_temperature.append(temperature_data)

                        voltage_data = {
                            '시간': end,
                            '전압1': 0.0,
                            '전압2': 0.0
                        }
                        result_voltage.append(voltage_data)

                    start = start + relativedelta(seconds=5)
                
                if result_temperature[-1]['온도'] == 0 and result_voltage[-1]['전압1'] == 0.0 and result_voltage[-1]['전압2'] == 0.0:
                    result_temperature[-1]['온도'] = 26
                    result_voltage[-1]['전압1'] = 3.8
                    result_voltage[-1]['전압2'] = 3.8

            else:  # 기간 동안 해당하는 데이터가 한 개도 없다면
                
                bms_data = BmsBatteryDefault.objects.all()
                
                for i in range(12):
                    end = (start + relativedelta(seconds=5)).strftime('%Y-%m-%d %H:%M:%S')

                    temperature_data = {
                        '시간': end,
                        '온도': bms_data[i].temperature
                        }
                    result_temperature.append(temperature_data)

                    voltage_data = {
                        '시간': end,
                        '전압1': bms_data[i].voltage1,
                        '전압2': bms_data[i].voltage2
                        }
                    result_voltage.append(voltage_data)
                    
                    start = start + relativedelta(seconds=5)

            return Response({'실시간': result_now, '온도': result_temperature, '전압': result_voltage}, status=status.HTTP_200_OK)

    else:  # 연결된 bms가 없는 경우
        
        result_now = {
            '온도': 26,
            '시간': now.strftime('%Y-%m-%d %H:%M:%S'),
            '전압1': 3.8,
            '전압2': 3.8,
            '잔량1': 100,
            '잔량2': 100
        }

        all_data = BmsBatteryDefault.objects.all()

        for i in range(data_count):

            bms_battery = all_data[i % 12]

            if period == 'month':
                end = start + relativedelta(days=1)
                
            elif period == 'week':
                end = start + relativedelta(hours=12)
            
            elif period == 'day':
                end = start + relativedelta(hours=1)

            elif period == 'now' or period == None:
                end = start + relativedelta(seconds=5)

            if period == 'month' or period == 'week' or period == 'day':

                temperature_data = {
                    '시간': end,
                    '최고': bms_battery.temperature
                }
                result_temperature.append(temperature_data)

                voltage_data = {
                    '시간': end,
                    '전압1': bms_battery.voltage1,
                    '전압2': bms_battery.voltage2
                }
                result_voltage.append(voltage_data)
            
            elif period == 'now' or period == None:
                temperature_data = {
                    '시간': end,
                    '온도': bms_battery.temperature
                }
                result_temperature.append(temperature_data)

                voltage_data = {
                    '시간': end,
                    '전압1': bms_battery.voltage1,
                    '전압2': bms_battery.voltage2
                }
                result_voltage.append(voltage_data)

            start = end
        
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

        # now = datetime.datetime(2022, 11, 15, 17, 58, 2)
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

        queryset = []

        bms = Bms.objects.filter(patient__number=number)
        # bms = BmsStatus.objects.filter(patient__number=number, now__gt=start, now__lte=now)
        if bms.exists():  # 연결된 bms가 존재할 때
            bms_id = bms[0].id

            batteries = Battery.objects.filter(bms_id=bms_id)
            battery1_id = batteries[0].id
            battery2_id = batteries[1].id

            if period == 'month' or period == 'week' or period == 'day':

                temperature = BmsStatusExcel.objects.filter(bms_id=bms_id, now__gt=start, now__lte=now)
                battery1 = BatteryStatusExcel.objects.filter(battery_id=battery1_id, now__gt=start, now__lte=now)
                battery2 = BatteryStatusExcel.objects.filter(battery_id=battery2_id, now__gt=start, now__lte=now)

                if temperature.exists():  # 기간 동안 해당하는 데이터가 한 개 이상이면

                    for i in range(data_count):
                        
                        end = start + relativedelta(hours=1)
                        check_temperature = temperature.filter(now=end)
                        check_battery1 = battery1.filter(now=end)
                        check_battery2 = battery2.filter(now=end)

                        if check_temperature.exists():

                            data = dict()
                            data['시간'] = check_temperature[0].now
                            data['온도'] = check_temperature[0].temperature
                            data['전압1'] = check_battery1[0].voltage
                            data['전압2'] = check_battery2[0].voltage
                            queryset.append(data)
                        
                        start = end

                else:  # 기간 동안 해당하는 데이터가 한 개도 없으면
                    all_data = BmsBatteryDefault.objects.all()

                    for i in range(data_count):
                        end = start + relativedelta(hours=1)
                        bms_battery = all_data[i % 12]

                        data = {
                            '시간': end,
                            '온도': bms_battery.temperature,
                            '전압1': bms_battery.voltage1,
                            '전압2': bms_battery.voltage2
                        }

                        queryset.append(data)

                        start = end

            elif period == 'now' or period == None:
                temperature = BmsStatusNow.objects.filter(bms_id=bms_id, now__gt=start, now__lte=now)
                battery1 = BatteryStatusNow.objects.filter(battery_id=battery1_id, now__gt=start, now__lte=now)
                battery2 = BatteryStatusNow.objects.filter(battery_id=battery2_id, now__gt=start, now__lte=now)

                if temperature.exists():  # 실시간 데이터가 한 개 이상 존재하면

                    for i in range(data_count):

                        end = start + relativedelta(seconds=5)
                        check_temperature = temperature.filter(now=end)
                        check_battery1 = battery1.filter(now=end)
                        check_battery2 = battery2.filter(now=end)
                        
                        if check_temperature.exists():

                            data = dict()
                            data['시간'] = check_temperature[0].now
                            data['온도'] = check_temperature[0].temperature
                            data['전압1'] = check_battery1[0].voltage
                            data['전압2'] = check_battery2[0].voltage
                            queryset.append(data)

                        start = end

                else:  # 실시간 데이터가 한 개도 없으면
                    all_data = BmsBatteryDefault.objects.all()

                    for i in range(data_count):
                        end = (start + relativedelta(seconds=5)).strftime('%Y-%m-%d %H:%M:%S')
                        bms_battery = all_data[i]

                        data = {
                            '시간': end,
                            '온도': bms_battery.temperature,
                            '전압1': bms_battery.voltage1,
                            '전압2': bms_battery.voltage2
                        }

                        queryset.append(data)

                        start = start + relativedelta(seconds=5)

        else:  # 연결된 bms가 없을 때
            
            all_data = BmsBatteryDefault.objects.all()

            for i in range(data_count):

                if period == 'month' or period == 'week' or period == 'day':
                    end = start + relativedelta(hours=1)
                    bms_battery = all_data[i % 12]

                elif period == 'now' or period == None:
                    end = start + relativedelta(seconds=5)
                    bms_battery = all_data[i]

                data = {
                        '시간': end,
                        '온도': bms_battery.temperature,
                        '전압1': bms_battery.voltage1,
                        '전압2': bms_battery.voltage2
                    }

                queryset.append(data)

                start = end

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