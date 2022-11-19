import mysql.connector
from conf import config
import datetime
import random
from time import sleep




db= mysql.connector.connect(host=config["host"],user=config["user"], password=config["pw"], database=config["db"],buffered=True)

cursor = db.cursor()


#1st end : 2022-10-22 08:03:45

#now =datetime.datetime(2022,10,9,20,22,5)
now = datetime.datetime(2022,11,21, 9,0,0)
cnt = 0


# 7min ->84
'''

# 실시간으로 넣을 때 - 5초 단위
while(cnt<24):
    now_time = datetime.datetime.now()


    if(now_time.second % 5 == 0):
        now = now_time.strftime("%Y-%m-%d %H:%M:%S")
        temp = round((36.5+random.uniform(-1,1)),1)
        heart = int(80 + random.randint(-5,5))
        spo2 = int( 98 + random.randint(-1,1))
        cell = round(random.uniform(2.5,4),2)
        soc = round(cell - 2.5)/1.6 *100

        cursor.execute(f'insert into patient_status(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp},{heart},{spo2},0,"{str(now)}",1);')
        cursor.execute(f'insert into bms_status(temperature,now,bms_id) value (26,"{str(now)}",1);')
        cursor.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",1);')
        cursor.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",2);')

        cursor.execute(
            f'insert into patient_status_now(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp},{heart},{spo2},0,"{str(now)}",1);')
        cursor.execute(f'insert into bms_status_now(temperature,now,bms_id) value (26,"{str(now)}",1);')
        cursor.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",1);')
        cursor.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",2);')
        db.commit()
        #now += datetime.timedelta(seconds=5)
        cnt +=1
        sleep(1)
        print("insert db : ",cnt)
'''

'''
    temp = round((36.5+random.uniform(-1,1)),1)
    heart = int(80 + random.randint(-5,5))
    spo2 = int( 98 + random.randint(-1,1))
    cell = round(random.uniform(2.5,4),2)
    soc = round(cell - 2.5)/1.6 *100

    cursor.execute(f'insert into patient_status(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp},{heart},{spo2},0,"{str(now)}",1);')
    cursor.execute(f'insert into bms_status(temperature,now,bms_id) value (26,"{str(now)}",1);')
    cursor.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",1);')
    cursor.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",2);')

    cursor.execute(
        f'insert into patient_status_now(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp},{heart},{spo2},0,"{str(now)}",1);')
    cursor.execute(f'insert into bms_status_now(temperature,now,bms_id) value (26,"{str(now)}",1);')
    cursor.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",1);')
    cursor.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",2);')
    db.commit()
    now += datetime.timedelta(seconds=5)
    cnt +=1
    print("insert db : ",cnt)
    
'''


# 특정 시간 사이의 데이터 삽입
now = datetime.datetime(2022,11,17, 18,5,0)
d = datetime.datetime(2022,11,17,18,10,10)

while(1):

    if(now == d):
        break
    temp = round((38.1 + random.uniform(0, 0.9)), 1)
    heart = int(80 + random.randint(-4, 4))
    spo2 = int(98 + random.randint(-1, 1))
    cell = round(random.uniform(2.7, 3.8), 2)
    soc = round(cell - 2.5) / 1.6 * 100

    cursor.execute(f'insert into patient_status(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp},{heart},{spo2},0,"{str(now)}",28);')
    cursor.execute(f'insert into bms_status(temperature,now,bms_id) value (26,"{str(now)}",2);')
    cursor.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",3);')
    cursor.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",4);')

    cursor.execute(f'insert into patient_status_now(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp},{heart},{spo2},0,"{str(now)}",28);')
    cursor.execute(f'insert into bms_status_now(temperature,now,bms_id) value (26,"{str(now)}",2);')
    cursor.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",3);')
    cursor.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",4);')

    db.commit()

    now += datetime.timedelta(seconds=5)



'''
#하나만 넣을 때
now = datetime.datetime(2022,10,19, 22,0,0)
temp = round((36.5 + random.uniform(-0.9, 0.9)), 1)
heart = int(80 + random.randint(-4, 4))
spo2 = int(98 + random.randint(-1, 1))
cell = round(random.uniform(2.7, 3.8), 2)
soc = round(cell - 2.5) / 1.6 * 100

cursor.execute(f'insert into patient_status_excel(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp},{heart},{spo2},0,"{str(now)}",1);')
cursor.execute(f'insert into bms_status_excel(temperature,now,bms_id) value (26,"{str(now)}",1);')
cursor.execute(f'insert into battery_status_excel(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",1);')
cursor.execute(f'insert into battery_status_excel(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",2);')

db.commit()
'''


cursor.close()
db.close()
print(" ============= Finish Insert ============")
