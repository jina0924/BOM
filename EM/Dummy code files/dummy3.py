import mysql.connector
from conf import config
import random
from random import randint


# 간호사,의사


db = mysql.connector.connect(host=config["host"],user=config["user"], password=config["pw"], database=config["db"],buffered=True)

c= db.cursor()
n_name = ['임희윤','문해진','허연우','이유진','정한결','윤혜린','김이경','서재인','강인혜','장하진']
n_mail = ['heeyoon','haejin','yeonwoo','yujin','hangyeol','hyelin','ekyung','jaein','inhye','hajin']
n_dep=["수간호사","간호과장","평간호사","책임간호사","주임간호사"]
d_name = ['박태희','조미연','양동건','안정원','이익준','채송화','장겨울','양석형','김준완','윤성한']
d_mail = ['taehee','miyeon','donggun','garden','ikjun','songhwa','winter','seokhyung','junwan','sunghan']
d_dep=['소아청소년과','신경외과','성형외과','응급의학과','안과','내과','순환기내과','신경과','재활의학과','호흡기내과']


for _ in range(10):
    n=randint(0,9)
    d=randint(0,9)
    n_phone = '010'+str(randint(0,9999)).zfill(4) +str(randint(0,9999)).zfill(4)
    d_phone = '010'+str(randint(0,9999)).zfill(4) +str(randint(0,9999)).zfill(4)

    sql_n = f'insert into nurse(name,image,phonenumber,email,position,ward_id) value("{n_name[n]}","{"nurse/nurse" + str(randint(1,9))+".jpg"}","{n_phone}","{n_mail[n]+"@bom.com"}","{random.choice(n_dep)}",{random.randint(1, 50)})'
    sql_d = f'insert into doctor(name,image,phonenumber,email,department) value("{d_name[d]}","{"doctor/doctor" + str(randint(1,9))+".jpg"}","{d_phone}","{d_mail[d]+"@bom.com"}","{random.choice(d_dep)}")'

    c.execute(sql_n)
    c.execute(sql_d)
    db.commit()

    print("nurse : ",sql_n)
    print("doctor : ",sql_d)


c.close()
db.close()