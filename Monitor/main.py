from PySide2.QtWidgets import *
from PySide2.QtCore import *
from PySide2.QtGui import *
import pyqtgraph as pg

from mainUI import Ui_Form as mainUi
from bmsUI import Ui_Form as bmsUi
#from logoUI import Ui_Dialog as logoUi

from time import sleep
import threading
from datetime import datetime
import mysql.connector
from collections import deque
import numpy as np

import max30102
import hrcalc
from mlx90614 import MLX90614 
import Adafruit_DHT
import gyro

import RPi.GPIO as GPIO
import spidev
import time
import subprocess

from conf import config

before = [-1,-1]
minV = [4.1, 4.1]
maxV = [2.5, 2.5]
SOC = [0, 0]
voltage = [0,0]

#var
battery_amount_val = 100
is_charge = True
temp_battery = 10
temp_human =36.5
heart_rate = 0
spo2 = 0
be_spo2 = 0
is_fall = False
heart_rate_list = []

exit_flag = 0



idx=deque(['no-time' for _ in range(60)],maxlen=60)
idx_h=deque(['no-time' for _ in range(60)],maxlen=60)
temps = deque([0 for _ in range(60)],maxlen=60)
hearts=deque([0 for _ in range(60)],maxlen=60)
sps=deque([0 for _ in range(60)],maxlen=60)
xitem = list(range(60))


#for DB
bms_id = 1
patient_id = -1
connect_db = False
bt_id=[]

charge = 16
cell1 = 0 
cell2 = 1


def sensor_init():
    global spi
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(charge, GPIO.IN)

    spi = spidev.SpiDev()
    spi.open(0,0)
    spi.max_speed_hz=500000

sensor_init()

def read_spi_adc(adcChannel):
    buff = spi.xfer2([1, (8 + adcChannel) << 4, 0])
    adcValue = ((buff[1] & 3) << 8) + buff[2]
    
    return adcValue
    


def read_voltage(adcChannel):
    global maxV,minV,SOC,voltage
    
    V = round(read_spi_adc(adcChannel) * 3.3 / 1024 / 0.2, 2)
    if(before[adcChannel] == -1):
        before[adcChannel] = V
    
    V = round(before[adcChannel] * 0.8 + V * 0.2, 2)
    
    before[adcChannel] = V
    
    if(is_charge == False):
        maxV[adcChannel] = 2.5
        
        if(minV[adcChannel] > V):
            minV[adcChannel] = V
        
        if (minV[adcChannel] > 4.1):
            SOC[adcChannel] = 100
        elif (minV[adcChannel] >= 2.5):
            SOC[adcChannel] = round((minV[adcChannel]-2.5)/1.6 * 100)
        else:
            SOC[adcChannel] = 0
        
        voltage[adcChannel] = minV[adcChannel]
        
            
    else:
        minV[adcChannel] = 4.1
        
        if(maxV[adcChannel] < V):
            maxV[adcChannel] = V
            
        if (maxV[adcChannel] > 4.1):
            SOC[adcChannel] = 100
        elif (maxV[adcChannel] >= 2.5):
            SOC[adcChannel] = round((maxV[adcChannel]-2.5)/1.6 * 100)
        else:
            SOC[adcChannel] = 0
            
        voltage[adcChannel] = maxV[adcChannel]
    

def getSensor():
    global battery_amount_val,temp_battery, temp_human,is_charge
    global db,temps,idx,is_warn,is_fall,c
    #t=0

    s = Adafruit_DHT.DHT11
    #cursor = db.cursor()
    #g=gyro.Gyro()

    while True:

        if(exit_flag == 1):
            break
        #battery
        if(GPIO.input(charge)==1):
            is_charge = True
        else:
            is_charge = False
        
        read_voltage(cell1)
        read_voltage(cell2)
        battery_amount_val = round((SOC[0] + SOC[1])/2)
        
        
        #temp_battery
        _,tb = Adafruit_DHT.read_retry(s,23)
        temp_battery = int(tb)

        # temp_human
        if(is_Finger == True):
            human_sensor = MLX90614()
            temp_human = round(human_sensor.get_object_1(),1)
            
            temp_fix = round((temp_human-36.5)*0.1,1)
            temp_human = 36.5 + temp_fix
        else:
            temp_human = 0
        #heart
       # heart_rate += 1
        #spo += 1
        
        #gyro

        temps.append(temp_human)

        now = datetime.strftime(datetime.now(),"%M:%S")
        idx.append(str(now))
        #sleep(1)
        
       # t+=1

        if (is_Finger == True):
            if(is_warn == False):
                if(temp_human >= 38 or spo2 <= 90 or heart_rate <=30 or heart_rate >= 180):
                    is_warn = True
                    db_pub(0)
            else:
                if(temp_human < 37 and spo2 > 90 and heart_rate > 40 and heart_rate <175 and is_fall == False):
                    is_warn=False
                    print("Turn off warn")
        else:
            is_warn = False
        
        ns =datetime.now().second

        if(ns %5==0 ):
            #db_human
            #db_battery
            if(is_Finger==True):
                db_pub(1)
            else:
                db_pub(2)
            

        sleep(1)
    c.close()


is_Finger = False
o2Warn = False
warnchange = False
is_warn = False

def getHeart():
    global heart_rate,spo2, be_spo2, heart_rate_list
    global hearts, sps,idx_h
    global is_Finger,o2Warn,warnchange

    m = max30102.MAX30102()
    
    while (exit_flag == 0):
        red, ir = m.read_sequential()

        if(exit_flag == 1):
            break

        if(np.mean(ir)<50000 and np.mean(red)<50000):
            is_Finger = False
            heart_rate = 0
            spo2 = 0
            hearts.append(0)
            sps.append(0)
        else:
            is_Finger = True
         
            hr,hrb,sp,spb = hrcalc.calc_hr_and_spo2(ir,red)            
            
            print(f'hr detect : {hrb}, sp detect : {spb}')
            #print("hr detect : ",hrb)
            #print("sp detect : ",spb)

            if(hrb == True and hr != -999):
                heart_rate = int(hr)
                while(len(heart_rate_list) < 10) :
                    heart_rate_list.append(heart_rate)
                
                heart_rate_list.pop(0)
                heart_rate_list.append(heart_rate)

                heart_rate = round(sum(heart_rate_list) / len(heart_rate_list))

                hearts.append(heart_rate)
                #heart_rate = int(sum(list(hearts)[50:])/10)
                #hearts.pop()
                #hearts.append(heart_rate)
            else:
                hearts.append(hearts[59])

                
            if(spb == True and sp != -999):
                spo2 = int(sp)
                if(sps[59] != 0 ):
                    if(abs(sps[59]-spo2)>20):
                        spo2 = sps[59]
                sps.append(spo2)
                if(0<spo2 and spo2 <= 90 and o2Warn == False):
                    o2Warn = True
                    warnchange = True
                elif(spo2>90 and o2Warn == True):
                    o2Warn = False
                    warnchange = True
            else:
                sps.append(sps[59])
            


        now = datetime.strftime(datetime.now(),"%M:%S")
        idx_h.append(str(now))


def db_pub(mode):
    global db,c

    #warning mode
    if(mode == 0):
        c.execute(f'update patient set is_warning = 1 where id = {patient_id};')
        db.commit()
        print("Turn on warn")


    #5sec mode
    elif(mode == 1):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        c.execute(f'insert into patient_status(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp_human},{heart_rate},{spo2},0,"{str(now)}",{patient_id});')
        c.execute(f'update bms set temperature={temp_battery},is_charge ={is_charge} where id = {bms_id};')
        c.execute(f'insert into bms_status(temperature,now,bms_id) value ({temp_battery},"{str(now)}",{bms_id});')
        c.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({voltage[0]},{SOC[0]},"{str(now)}",{bt_id[0]});')
        c.execute(f'insert into battery_status(voltage,amount,now,battery_id) value({voltage[1]},{SOC[1]},"{str(now)}",{bt_id[1]});')
        #for now
        c.execute(f'insert into patient_status_now(temperature,bpm,oxygen_saturation,slope,now,patient_id) value ({temp_human},{heart_rate},{spo2},0,"{str(now)}",{patient_id});')
        c.execute(f'insert into bms_status_now(temperature,now,bms_id) value ({temp_battery},"{str(now)}",{bms_id});')
        c.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value({voltage[0]},{SOC[0]},"{str(now)}",{bt_id[0]});')
        c.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value({voltage[1]},{SOC[1]},"{str(now)}",{bt_id[1]});')


        db.commit()
    
    else:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        c.execute(f'insert into patient_status(temperature,bpm,oxygen_saturation,slope,now,patient_id) value (0,0,0,0,"{str(now)}",{patient_id});')
        c.execute(f'insert into bms_status(temperature,now,bms_id) value (0,"{str(now)}",{bms_id});')
        c.execute(f'insert into battery_status(voltage,amount,now,battery_id) value(0,0,"{str(now)}",{bt_id[0]});')
        c.execute(f'insert into battery_status(voltage,amount,now,battery_id) value(0,0,"{str(now)}",{bt_id[1]});')
        
        #for now
        c.execute(f'insert into patient_status_now(temperature,bpm,oxygen_saturation,slope,now,patient_id) value (0,0,0,0,"{str(now)}",{patient_id});')
        c.execute(f'insert into bms_status_now(temperature,now,bms_id) value (0,"{str(now)}",{bms_id});')
        c.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value(0,0,"{str(now)}",{bt_id[0]});')
        c.execute(f'insert into battery_status_now(voltage,amount,now,battery_id) value(0,0,"{str(now)}",{bt_id[1]});')

        db.commit()

    print("db update")

def getGyro():
    global is_fall,is_warn
    
    g= gyro.Gyro()
    while(1):
        if(exit_flag == 1):
            break

        _,_,_,is_fall = g.read_gyro()
        #print(is_fall)
        
        if(is_Finger==True):
            if(is_warn==False and is_fall==True):
                is_warn = True
                db_pub(0)
        else:
            is_fall = False

        sleep(0.1)
#t1 = threading.Thread(target=getSensor)
#t2 = threading.Thread(target=getHeart)
#t1.start()
#t2.start()





class MainPage(QDialog,QWidget,mainUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.battery_amount.setText(str(battery_amount_val))
        self.battery_amount_bar.setGeometry(93, 65, 0.8 * battery_amount_val, 44)
        if(is_charge == True):
            self.label_8.show()
        else:
            self.label_8.hide()
        #self.battery_amount.setText("충전중")
        self.clock_timer = QTimer(self)
        self.clock_timer.setInterval(1000)  # 1000ms = 1sec , 화면 렌더링 주기
        self.clock_timer.timeout.connect(self.rendering)
        self.clock_timer.start()
        
        pg.setConfigOptions(antialias=True)
        self.tick=[]

        self.temps_graph.setMouseEnabled(False,False)
        self.temps_graph.setBackground('w')
        self.temps_graph.showGrid(x=True,y=True)
        self.temps_plot = self.temps_graph.plot(symbol='o',symbolSize = 3,symbolPen = 'r',pen=pg.mkPen('r', width=2))

        self.hearts_graph.setMouseEnabled(False, False)
        self.hearts_graph.setBackground('w')
        self.hearts_graph.showGrid(x=True, y=True)
        self.hearts_plot = self.hearts_graph.plot(symbol='o', symbolSize= 3, symbolPen='r',pen=pg.mkPen('r', width=2))


        self.sps_graph.setMouseEnabled(False, False)
        self.sps_graph.setBackground('w')
        self.sps_graph.showGrid(x=True, y=True)
        self.sps_plot = self.sps_graph.plot(symbol='o', symbolSize=3, symbolPen='r',pen=pg.mkPen('r', width=2))

        if(is_Finger == True):
            self.finger_img.hide()
            self.finger_img_2.hide()
            self.finger_img_3.hide()

        self.plot()
        self.is_bms_page = False
        
     
    def goBms(self):
        if(self.is_bms_page == False):
            self.is_bms_page = True
            widgets.addWidget(bms_page)
        widgets.setCurrentIndex(1)
    
    def plot(self):
        self.tick = [list(zip(range(0,60,10),list(idx)[::10]))]
        self.temps_plot.setData(xitem,temps)
        tax = self.temps_graph.getAxis('bottom')
        tax.setTicks(self.tick)

        
        self.tick2 = [list(zip(range(0,60,10),list(idx_h)[::10]))]
        self.hearts_plot.setData(xitem, hearts)
        hax = self.hearts_graph.getAxis('bottom')
        hax.setTicks(self.tick2)

        self.sps_plot.setData(xitem, sps)
        spax = self.sps_graph.getAxis('bottom')
        spax.setTicks(self.tick2)
   
    def hideLogo(self):
        self.first_back.hide()
        self.first_logo.hide()

    def rendering(self):
        global battery_amount_val

        if (is_charge == True):
            self.label_8.show()
        else:
            self.label_8.hide()
        
        self.battery_amount.setText(str(battery_amount_val)+"%")

        self.battery_amount_bar.setGeometry(93, 65, 0.8 * battery_amount_val, 44)
        
        if(is_Finger == True):
            self.finger_img.hide()
            self.finger_img_2.hide()
            self.finger_img_3.hide()
        else:
            self.finger_img.show()
            self.finger_img_2.show()
            self.finger_img_3.show()

        self.temp_label.setText(str(temp_human))
        self.heart_label.setText(str(heart_rate))
        self.o2_label.setText(str(spo2))
        if(warnchange == True):
            if(o2Warn == True):
                self.o2_label.setStyleSheet(u"color: rgb(234,84,85); background-color: rgb(255, 255, 255);")
            else:
                self.o2_label.setStyleSheet(u"color: rgb(26, 50, 98);background-color: rgb(255, 255, 255);")


        self.plot()


    def exit(self):
        global exit_flag
        exit_flag = 1
        #t.join()
        t1.join()
        t2.join()
        t3.join()
        db.close()
        #subprocess.run("sudo reboot",shell = True)
        quit()

class BmsPage(QDialog,QWidget,bmsUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.clock_timer = QTimer(self)
        self.clock_timer.setInterval(1000)  # 1000ms = 1sec , 화면 렌더링 주기
        self.clock_timer.timeout.connect(self.rendering)
        self.clock_timer.start()

    def goMain(self):
        widgets.setCurrentIndex(0)

    def rendering(self):
        self.cell1_v.setText(str(voltage[0]))
        self.cell2_v.setText(str(voltage[1]))
        self.temp.setText(str(temp_battery))



def hidelogo():
    global main_page
    main_page.hidelogo()

app = QApplication()

main_page = MainPage()
bms_page = BmsPage()



widgets = QStackedWidget()
widgets.addWidget(main_page)
widgets.setGeometry(0,0,1280,720)

#db = mysql.connector.connect(host=config["host"],user=config["user"], password=config["pw"], database=config["database"],buffered=True)

while (connect_db == False):
     try:
         db = mysql.connector.connect(host=config["host"],user=config["user"], password=config["pw"], database=config["database"],buffered=True)
         connect_db = True

     except Exception as e:
         print(e)

c= db.cursor()
c.execute(f'select patient_id from bms where id = {bms_id}')
db.commit()
for (res) in c :
    patient_id = res[0]

c.execute(f'select A.number, A.name, A.birth, A.sex, A.nok_name, A.nok_phonenumber, B.name from patient A join doctor B on A.doctor_id=B.id where A.id = {patient_id}')
db.commit()
for(res) in c:
    main_page.p_num.setText(str(res[0]))
    main_page.p_name.setText(str(res[1]))
    main_page.p_age.setText(str(res[2]))
    main_page.p_gender.setText(str(res[3]))
    main_page.p_gard.setText(str(res[4]))
    main_page.p_gard_2.setText(str(res[5]))
    main_page.doctor_name.setText(str(res[6]))

c.execute(f'select id from battery where bms_id={bms_id}')
db.commit()

for (res) in c:
    bt_id.append(res[0])
#c.close()

t1 = threading.Thread(target=getSensor)
t2 = threading.Thread(target=getHeart)
t3 = threading.Thread(target=getGyro)
t1.start()
t2.start()
t3.start()

print("show widget")
widgets.show()
threading.Timer(3,main_page.hideLogo).start()
app.exec_()

# app = QApplication()
# label = QLabel("Hello World")
# label.show()
# app.exec_()
#


# self.shadow1 = QGraphicsDropShadowEffect()
# self.shadow1.setColor(QColor(212, 212, 212))
# self.shadow1.setBlurRadius(15)
# self.shadow1.setOffset(4)
#
# self.shadow2 = QGraphicsDropShadowEffect()
# self.shadow2.setColor(QColor(212, 212, 212))
# self.shadow2.setBlurRadius(15)
# self.shadow2.setOffset(4)
#
# self.shadow3 = QGraphicsDropShadowEffect()
# self.shadow3.setColor(QColor(212, 212, 212))
# self.shadow3.setBlurRadius(15)
# self.shadow3.setOffset(4)
#
# self.shadow4 = QGraphicsDropShadowEffect()
# self.shadow4.setColor(QColor(212, 212, 212))
# self.shadow4.setBlurRadius(15)
# self.shadow4.setOffset(4)
#
# self.shadow5 = QGraphicsDropShadowEffect()
# self.shadow5.setColor(QColor(212, 212, 212))
# self.shadow5.setBlurRadius(15)
# self.shadow5.setOffset(4)
#
# self.shadow6 = QGraphicsDropShadowEffect()
# self.shadow6.setColor(QColor(212, 212, 212))
# self.shadow6.setBlurRadius(15)
# self.shadow6.setOffset(4)
#
# self.box1.setGraphicsEffect(self.shadow1)
# self.box2.setGraphicsEffect(self.shadow2)
# self.box3.setGraphicsEffect(self.shadow3)
# self.box4.setGraphicsEffect(self.shadow4)
# self.box5.setGraphicsEffect(self.shadow5)
# self.box6.setGraphicsEffect(self.shadow6)

#
# opacity_effect = QGraphicsOpacityEffect(self.pushButton_bms)
# opacity_effect.setOpacity(0)
# self.pushButton_bms.setGraphicsEffect(opacity_effect)

