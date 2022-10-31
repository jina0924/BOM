from PySide2.QtWidgets import *
from PySide2.QtCore import *
from PySide2.QtGui import *


from mainUI import Ui_Form as mainUi
from firstUI import Ui_Form as  firstUi
from bmsUI import Ui_Form as bmsUi
from warningUI import Ui_Dialog as warningUi


from time import sleep
import threading
from datetime import datetime
import mysql.connector

import max30102
import hrcalc

before = [-1,-1]
minV = [4.25, 4.25]
maxV = [2.5, 2.5]
SOC = [0, 0]
voltage = [0,0]

#var
battery_amount_val = 100
is_balance = 0
can_balance = 0
is_charge = True
temp_battery = 10
temp_human =36.5
heart_rate = 120
spo2 = 80

exit_flag = 0



#for DB
bms_id = 333
patient_id = 777
connect_db = False


import RPi.GPIO as GPIO
import spidev
import time


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
        
        if (minV[adcChannel] > 4.25):
            SOC[adcChannel] = 100
        elif (minV[adcChannel] >= 2.5):
            SOC[adcChannel] = round((minV[adcChannel]-2.5)/1.75 * 100)
        else:
            SOC[adcChannel] = 0
        
        voltage[adcChannel] = minV[adcChannel]
        
            
    else:
        minV[adcChannel] = 4.25
        
        if(maxV[adcChannel] < V):
            maxV[adcChannel] = V
            
        if (maxV[adcChannel] > 4.25):
            SOC[adcChannel] = 100
        elif (maxV[adcChannel] >= 2.5):
            SOC[adcChannel] = round((maxV[adcChannel]-2.5)/1.75 * 100)
        else:
            SOC[adcChannel] = 0
            
        voltage[adcChannel] = maxV[adcChannel]
    

def getSensor():
    global battery_amount_val,temp_battery, temp_human
    global db
    t=0
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
        temp_battery += 1

        # temp_human
        temp_human += 1

        #heart
       # heart_rate += 1
        #spo += 1


        sleep(1)
        
        t+=1





        if(t == 5 ):
            #db_human
            #db_battery
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            # c= db.cursor()
            # c.execute(f'insert into bmstest(bms_id,patient_id,temp,time) value ({bms_id},{patient_id},{temp_human},\'{now}\');')
            # c.close()
            # db.commit()
            t =0





def getHeart():
    global heart_rate,spo2
    
    m = max30102.MAX30102()

    while (exit_flag == 0):
        red, ir = m.read_sequential()

        if(exit_flag == 1):
            break
        hr,hrb,sp,spb = hrcalc.calc_hr_and_spo2(ir,red)
        
        print(f'hr detect : {hrb}, sp detect : {spb}')

        if(hrb == True and hr != -999):
            heart_rate = int(hr)
        if(spb == True and sp != -999):
            spo2 = int(sp)

t1 = threading.Thread(target=getSensor)
t2 = threading.Thread(target=getHeart)
#t1.start()
#t2.start()






class WarningPage(QDialog,warningUi):
    def __init__(self):
        super().__init__()
        self.setWindowFlag(Qt.FramelessWindowHint)
        self.setupUi(self)

    def click_yes(self):
        global is_balance
        #print("Yes!")
        is_balance = 1
        self.close()

    def click_no(self):
        #print("No!")
        self.close()



class MainPage(QDialog,QWidget,mainUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.battery_amount.setText(str(battery_amount_val))
        self.battery_amount_bar.setGeometry(442, 235, 2 * battery_amount_val, 93)
        self.balance_btn_on.hide()
        self.balance_btn_off.hide()
        if(is_charge == True):
            self.balance_btn_off.show()
        self.label_5.hide()
        self.clock_timer = QTimer(self)
        self.clock_timer.setInterval(1000)  # 1000ms = 1sec , 화면 렌더링 주기
        self.clock_timer.timeout.connect(self.rendering)

        
        self.main()


    def main(self):
        global first_page

        first_page.main()

        self.clock_timer.start()

    def goBms(self):
        widgets.setCurrentIndex(1)

    def rendering(self):
        global battery_amount_val

        self.battery_amount.setText(str(battery_amount_val))
        self.battery_amount_bar.setGeometry(472, 233, 2 * battery_amount_val, 95)

        self.temp_label.setText(str(temp_human))
        self.heart_label.setText(str(heart_rate))
        self.o2_label.setText(str(spo2))

    def cell_balance_on(self):
        global warningpage, is_balance

        if (can_balance == 0):
            #Dialog
            warningpage.exec_()
            if(is_balance == 1):
                print("off -> on")
                self.balance_btn_on.show()
            else:
                #print("nonoono")
                pass
        else:
            is_balance=1;

    def cell_balance_off(self):
        global is_balance
        print("on -> off")
        self.balance_btn_on.hide()
        if(is_charge == True):
            self.balance_btn_off.show()
        is_balance = 0

    def exit(self):
        global exit_flag
        exit_flag = 1
        t1.join()
        t2.join()
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



class FirstPage(QDialog,QWidget,firstUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)

    def main(self):
        global t1,t2

        print("first page")
        t1.start()
        t2.start()
        self.show()
        sleep(1)
        self.close()

app = QApplication()
first_page = FirstPage()
main_page = MainPage()
bms_page = BmsPage()
warningpage=WarningPage()

warningpage.setGeometry(372,135,600,380)

widgets = QStackedWidget()
#widgets.addWidget(login_page)
widgets.addWidget(main_page)
widgets.addWidget(bms_page)
widgets.addWidget(first_page)
widgets.setGeometry(0,0,1280,720)

#
# while (connect_db == False):
#     try:
#         db = mysql.connector.connect(host="localhost",user='user', password='pw', database='db_name',buffered=True)
#         connect_db = True
#     except Exception as e:
#         print(e)

widgets.show()
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

