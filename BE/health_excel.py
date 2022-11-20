import pymysql
import datetime
from dateutil.relativedelta import relativedelta
from my_settings import DATABASES


conn = pymysql.connect(host=DATABASES['default']['HOST'], port=3306, user=DATABASES['default']['USER'], password=DATABASES['default']['PASSWORD'], db=DATABASES['default']['NAME'], charset='utf8')
cur = conn.cursor()

now = datetime.datetime.now()
now = datetime.datetime(now.year, now.month, now.day, now.hour, 0, 0)

# 모든 환자들의 정보
sql = 'select name, number, birth, sex, nok_name, nok_phonenumber, doctor_id from patient'
cur.execute(sql)
result = cur.fetchall()

for i in range(len(result)):
    name = result[i][0]
    number = result[i][1]
    birth = result[i][2]
    sex = result[i][3]
    nok_name = result[i][4]
    nok_phonenumber = result[i][5]
    doctor_id = result[i][6]
    
    sql = 'select name from doctor where id=%s'
    vals = (doctor_id)
    cur.execute(sql, vals)
    doctor = cur.fetchall()[0][0]

    

    

print(result)