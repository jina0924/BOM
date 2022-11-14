import pymysql
import redis
import datetime
from dateutil.relativedelta import relativedelta
from my_settings import DATABASES

conn = pymysql.connect(host=DATABASES['default']['HOST'], port=3306, user=DATABASES['default']['USER'], password=DATABASES['default']['PASSWORD'], db=DATABASES['default']['NAME'], charset='utf8')
cur = conn.cursor()

# now = now = datetime.datetime(2022, 10, 9, 22, 31, 25)
now = datetime.datetime.now()
now = now + relativedelta(seconds=-(now.second % 5))

start = 60

sql = "select id, number from patient"
cur.execute(sql)
result = cur.fetchall()

for data in result:
    patient_id = data[0]
    patient_number = data[1]
    
    sql = "select temperature, bpm, oxygen_saturation, now from patient_status where patient_id=%s and now > %s and now <= %s"
    vals = (patient_id, now + relativedelta(seconds=-start), now)
    cur.execute(sql, vals) 
    period_health = cur.fetchall()

    period_temperature = []
    period_bpm = []
    period_oxygen_saturation = []

    for i in range(len(period_health)):
        temperature = {
            '시간': period_health[i][3].strftime('%Y-%m-%d %H:%M:%S'),
            '체온': period_health[i][0]
        }

        bpm = {
            '시간': period_health[i][3].strftime('%Y-%m-%d %H:%M:%S'),
            '심박수': period_health[i][1]
        }

        oxygen_saturation = {
            '시간': period_health[i][3].strftime('%Y-%m-%d %H:%M:%S'),
            '산소포화도': period_health[i][2]
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

    connect = redis.StrictRedis(host=DATABASES['default']['HOST'], port=6379, db=3, charset='utf-8', decode_responses=True, password=DATABASES['default']['PASSWORD'])
    
    for i in range(12):

        connect.hmset(f'{patient_number}_temperature_now_{i+1}', result_temperature[i])
        connect.hmset(f'{patient_number}_bpm_now_{i+1}', result_bpm[i])
        connect.hmset(f'{patient_number}_oxygen_saturation_now_{i+1}', result_oxygen_saturation[i])

        connect.expire(f'{patient_number}_temperature_now_{i+1}', 86400)
        connect.expire(f'{patient_number}_bpm_now_{i+1}', 86400)
        connect.expire(f'{patient_number}_oxygen_saturation_now_{i+1}', 86400)

conn.close()