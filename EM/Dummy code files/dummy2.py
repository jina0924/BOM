# import mysql.connector
# from conf import config
# import datetime
# import random
#
#
# db= mysql.connector.connect(host=config["host"],user=config["user"], password=config["pw"], database=config["db"],buffered=True)
# cursor = db.cursor()
#cursor.close()
#db.close()


#name,number,hostpitalized_date,discharged_date,birth,sex,nok_name,nok_phonenumber,user_type,is_warngin,doctor_id,user_id,ward_id

import requests
import random
from random import randint
from datetime import date
from datetime import timedelta

# 환자

p_name = ['문광일','신승우','권영빈','전성호','정창현','유용태','성미숙','표문희','배시영','정채원','한서현',
          '홍인하','하혜성','유승빈','양경하','김재섭','권덕수','한가영','봉미선','김가희','오연화','강혜원']
n_name=['서예숙','유중혁','안용신','허정환','이미영','정용태','표수진','정유현','장인하','소명숙','이세연','성명옥',
        '나영애','강경완','서은채','김남호','윤승헌','장여진','김현아','오지혜','남현민','홍주하','권승훈']
ward_num = []
for i in range(1,6):
    for j in range(1,11):
        dd = str(j).zfill(2)
        num = int(str(i) + dd)
        ward_num.append(num)

sex=['M','F']
p_cnt = 0
username = 'patient'+str(p_cnt)
pw = 'xptmxmdlqslek'
number = 507
doctor = randint(1,20)
h_day = date(2022,5,3) + timedelta(days=randint(0,200))
b_day = date(randint(1950,2008),randint(1,12),randint(1,28))
n_phone = '010'+str(randint(0,9999)).zfill(4) +str(randint(0,9999)).zfill(4)

body = {
    "username": username,
    "password1": pw,
    "password2": pw,
    "name": random.choice(p_name),
    "number": random.choice(ward_num),
    "doctor": doctor,
    "hospitalizedDate": str(h_day),
    "birth": str(b_day),
    "sex": random.choice(sex),
    "nokName": random.choice(n_name),
    "nokPhonenumber": n_phone
}
print(body)
# https://thundervolt.co.kr/api/wards/patient


#
cnt = 1
while(cnt < 11):
    body["username"]='patient'+str(p_cnt).zfill(3)
    body["name"] = random.choice(p_name)
    body["number"] = random.choice(ward_num)
    body["doctor"] = randint(1,20)
    body["hospitalizedDate"] = str(date(2022,5,3) + timedelta(days=randint(0,200)))
    body["birth"] = str(date(randint(1950,2008),randint(1,12),randint(1,28)))
    body["sex"] = random.choice(sex)
    body["nokName"] = random.choice(n_name)
    body["nokPhonenumber"] = '010'+str(randint(0,9999)).zfill(4) +str(randint(0,9999)).zfill(4)

    print(body)


    res = requests.post('https://thundervolt.co.kr/api/wards/patient', data=body)

    print(res)

    cnt +=1
    p_cnt +=1





