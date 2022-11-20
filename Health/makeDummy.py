import mysql.connector
from conf import config
import datetime
import random


db= mysql.connector.connect(host=config["host"],user=config["user"], password=config["pw"], database=config["db"],buffered=True)

cursor = db.cursor()

#1st end : 2022-10-22 08:03:45

#now =datetime.datetime(2022,10,9,20,22,5)
now = datetime.datetime(2022,10,22,8,3,50)
while(1):

    temp = round((36.5+random.uniform(-1,1)),1)
    heart = int(80 + random.randint(-5,5))
    spo2 = int( 98 + random.randint(-1,1))
    cell = round(random.uniform(2.5,4),2)
    soc = round(cell - 2.5)/1.6 *100

    cursor.execute(f'insert into patient_status(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp},{heart},{spo2},0,"{str(now)}",1);')
    cursor.execute(f'insert into bms_status(temperature,now,bms_id) value (26,"{str(now)}",1);')
    cursor.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",1);')
    cursor.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({cell},{soc},"{str(now)}",2);')
    db.commit()
    now += datetime.timedelta(seconds=5)

cursor.close()
db.close()

