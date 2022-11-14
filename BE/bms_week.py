import pymysql
import redis
import datetime
from dateutil.relativedelta import relativedelta
from my_settings import DATABASES


conn = pymysql.connect(host=DATABASES['default']['HOST'], port=3306, user=DATABASES['default']['USER'], password=DATABASES['default']['PASSWORD'], db=DATABASES['default']['NAME'], charset='utf8')
cur = conn.cursor()

now = datetime.datetime.now()
now = now + relativedelta(seconds=-(now.second % 5))

start = 604800  # 60 * 60 * 24 * 7
delta = 43200  # 60 * 60 * 12
data_count = 14
if now.hour >= 12:
    period_now = datetime.datetime(now.year, now.month, now.day, 12, 0, 0)
elif now.hour < 12:
    period_now = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)

sql = "select id, number from patient"
cur.execute(sql)
result = cur.fetchall()

for data in result:
    patient_id = data[0]
    patient_number = data[1]

    # 해당 환자에 속하는 bms 찾기
    sql = 'select id from bms where patient_id=%s'
    vals = (patient_id)
    cur.execute(sql, vals)
    bms_id = cur.fetchall()

    # 해당 환자에게 속하는 bms가 있으면
    if len(bms_id) >= 1:

        bms_id = bms_id[0][0]

        # bms에 속하는 battery 찾기
        sql = 'select id from battery where bms_id=%s'
        vals = (bms_id)
        cur.execute(sql, vals)
        batteries = cur.fetchall()
        battery1_id = batteries[0][0]
        battery2_id = batteries[1][0]

        period_temperature = []
        period_voltage = []

        period_start = period_now + relativedelta(seconds=-start)
        
        while period_start < period_now:

            period_end = period_start + relativedelta(seconds=delta)

            sql = 'select max(temperature) from bms_status where bms_id=%s and now > %s and now <= %s and temperature > 0'
            vals = (bms_id, period_start, period_end)
            cur.execute(sql, vals)
            period_bms = cur.fetchall()

            sql = 'select max(voltage) from battery_status where battery_id=%s and now > %s and now <= %s and voltage > 0'
            vals = (battery1_id, period_start, period_end)
            cur.execute(sql, vals)
            period_battery1 = cur.fetchall()
            
            sql = 'select max(voltage) from battery_status where battery_id=%s and now > %s and now <= %s and voltage > 0'
            vals = (battery2_id, period_start, period_end)
            cur.execute(sql, vals)
            period_battery2 = cur.fetchall()

            max_temperature = period_bms[0][0]
            max_voltage1 = period_battery1[0][0]
            max_voltage2 = period_battery2[0][0]

            if max_temperature:

                period_value = period_start.strftime('%Y-%m-%d %H')

                temperature = {
                    '시간': period_value,
                    '최고': max_temperature
                }
                period_temperature.append(temperature)

                voltage = {
                    '시간': period_value,
                    '전압1': max_voltage1,
                    '전압2': max_voltage2
                }
                period_voltage.append(voltage)
            
            period_start = period_end

        tmp_temperature = []
        tmp_voltage = []

        if len(period_temperature) < data_count:
            
            for i in range(1, data_count - len(period_temperature) + 1):
                now_datetime = period_now + relativedelta(seconds=-start) + relativedelta(seconds=(i * delta))

                tmp_now = (now_datetime + relativedelta(seconds=-delta)).strftime('%Y-%m-%d %H')

                temperature = {
                    '시간': tmp_now,
                    '최고': 0
                }
                tmp_temperature.append(temperature)

                voltage = {
                    '시간': tmp_now,
                    '전압1': 0.0,
                    '전압2': 0.0
                }
                tmp_voltage.append(voltage)

        result_temperature = tmp_temperature + period_temperature
        result_voltage = tmp_voltage + period_voltage

    # 해당 환자에게 속하는 bms가 없으면
    else:
        result_temperature = []
        result_voltage = []

        for i in range(1, data_count + 1):
            now_datetime = period_now + relativedelta(seconds=-start) + relativedelta(seconds=(i * delta))

            tmp_now = (now_datetime + relativedelta(seconds=-delta)).strftime('%Y-%m-%d %H')

            temperature = {
                '시간': tmp_now,
                '최고': 0
            }
            result_temperature.append(temperature)

            voltage = {
                '시간': tmp_now,
                '전압1': 0.0,
                '전압2': 0.0
            } 
            result_voltage.append(voltage)

    print(result_temperature)

    connect = redis.StrictRedis(host=DATABASES['default']['HOST'], port=6379, db=5, charset='utf-8', decode_responses=True, password=DATABASES['default']['PASSWORD'])
    
    time = period_now.strftime('%Y-%m-%d %H')
    
    for i in range(data_count):

        connect.hmset(f'{time}_{patient_number}_temperature_week_{i+1}', result_temperature[i])
        connect.hmset(f'{time}_{patient_number}_voltage_week_{i+1}', result_voltage[i])

        connect.expire(f'{time}_{patient_number}_temperature_week_{i+1}', 86400)
        connect.expire(f'{time}_{patient_number}_voltage_week_{i+1}', 86400)

conn.close()