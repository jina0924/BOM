import pymysql
import redis
import datetime
from dateutil.relativedelta import relativedelta
from my_settings import DATABASES


conn = pymysql.connect(host=DATABASES['default']['HOST'], port=3306, user=DATABASES['default']['USER'], password=DATABASES['default']['PASSWORD'], db=DATABASES['default']['NAME'], charset='utf8')
cur = conn.cursor()

now = datetime.datetime.now()
now = now + relativedelta(seconds=-(now.second % 5))

start = 60

sql = 'select id, number from patient'
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

    if len(bms_id) >= 1:
        bms_id = bms_id[0][0]

        sql = 'select temperature, now from bms_status where bms_id=%s and now > %s and now <= %s'
        vals = (bms_id, now + relativedelta(seconds=-start), now)
        cur.execute(sql, vals) 
        period_bms = cur.fetchall()
        """
        ((26, datetime.datetime(2022, 11, 10, 4, 51, 5)), (26, datetime.datetime(2022, 11, 10, 4, 51, 10)), (26, datetime.datetime(2022, 11, 10, 4, 51, 15)), (26, datetime.datetime(2022, 11, 10, 4, 51, 20)), (26, datetime.datetime(2022, 11, 10, 4, 51, 25)), (26, datetime.datetime(2022, 11, 10, 4, 51, 30)), (26, datetime.datetime(2022, 11, 10, 4, 51, 35)), (26, datetime.datetime(2022, 11, 10, 4, 51, 40)), (26, datetime.datetime(2022, 11, 10, 4, 51, 45)), (26, datetime.datetime(2022, 11, 10, 4, 51, 50)), (26, datetime.datetime(2022, 11, 10, 4, 51, 55)), (26, datetime.datetime(2022, 11, 10, 4, 52)))
    
        """

        # bms에 속하는 battery 찾기
        sql = 'select id from battery where bms_id=%s'
        vals = (bms_id)
        cur.execute(sql, vals)
        batteries = cur.fetchall()
        battery1_id = batteries[0][0]
        battery2_id = batteries[1][0]

        sql = 'select voltage, now from battery_status where battery_id=%s and now > %s and now <= %s'
        vals = (battery1_id, now + relativedelta(seconds=-start), now)
        cur.execute(sql, vals)
        period_battery1 = cur.fetchall()

        sql = 'select voltage, now from battery_status where battery_id=%s and now > %s and now <= %s'
        vals = (battery2_id, now + relativedelta(seconds=-start), now)
        cur.execute(sql, vals)
        period_battery2 = cur.fetchall()

        period_temperature = []
        period_voltage = []

        for i in range(len(period_bms)):

            temperature = {
                '시간': period_bms[i][1].strftime('%Y-%m-%d %H:%M:%S'),
                '온도': period_bms[i][0]
            }
            period_temperature.append(temperature)

            voltage = {
                '시간': period_battery1[i][1].strftime('%Y-%m-%d %H:%M:%S'),
                '전압1': period_battery1[i][0],
                '전압2': period_battery2[i][0]
            }
            period_voltage.append(voltage)

        tmp_temperature = []
        tmp_voltage = []

        if len(period_bms) < 12:
            
            for i in range(1, 12 - len(period_bms) + 1):
                now_datetime = (now + relativedelta(seconds=-start) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
                
                temperature = {
                    '시간': now_datetime,
                    '온도': 0
                }        
                tmp_temperature.append(temperature)

                voltage = {
                    '시간': now_datetime,
                    '전압1': 0.0,
                    '전압2': 0.0
                }        
                tmp_voltage.append(voltage)
                
        result_temperature = tmp_temperature + period_temperature
        result_voltage = tmp_voltage + period_voltage

    # 해당 환자에 속하는 bms가 없는 경우
    else:
        
        result_temperature = []
        result_voltage = []

        for i in range(1, 13):
            now_datetime = (now + relativedelta(seconds=-start) + relativedelta(seconds=(i * 5))).strftime('%Y-%m-%d %H:%M:%S')
                
            temperature = {
                '시간': now_datetime,
                '온도': 0
            }        
            result_temperature.append(temperature)

            voltage = {
                '시간': now_datetime,
                '전압1': 0.0,
                '전압2': 0.0
            }        
            result_voltage.append(voltage)

    connect = redis.StrictRedis(host=DATABASES['default']['HOST'], port=6379, db=4, charset='utf-8', decode_responses=True, password=DATABASES['default']['PASSWORD'])
    
    for i in range(12):

        connect.hmset(f'{patient_number}_temperature_now_{i+1}', result_temperature[i])
        connect.hmset(f'{patient_number}_voltage_now_{i+1}', result_voltage[i])

        connect.expire(f'{patient_number}_temperature_now_{i+1}', 86400)
        connect.expire(f'{patient_number}_voltage_now_{i+1}', 86400)

conn.close()