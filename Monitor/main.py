from PySide2.QtWidgets import *
from PySide2.QtCore import *
from PySide2.QtGui import *

from time import sleep


from mainUI import Ui_Form as mainUi
from firstUI import Ui_Form as  firstUi
from bmsUI import Ui_Form as bmsUi
from warningUI import Ui_Dialog as warningUi

import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(26, GPIO.OUT)
GPIO.output(16,True)
GPIO.output(26,True)

import spidev
import time
import threading

spi = spidev.SpiDev()
spi.open(0,0)
spi.max_speed_hz=500000

before = [-1,-1]
charge = False
minV = 4.25
maxV = 2.5

def read_spi_adc(adcChannel):
    global minV
    global maxV
    global SOC
    adcValue=0
    buff=spi.xfer2([1,(8+adcChannel)<<4,0])
    adcValue = ((buff[1]&3)<<8)+buff[2]
    V = round(adcValue * 3.3 / 1024 / 0.2, 2)
    if(before[adcChannel] == -1):
        before[adcChannel] = V
    print("before : ", before[adcChannel])
    print("curV : ", V)
    
    V = round(before[adcChannel] * 0.8 + V * 0.2, 2)
    
    before[adcChannel] = V
    
    if(charge == False):
        maxV = 2.5
        
        if(minV > V):
            minV = V
        
        if (minV > 4.25):
            SOC = 100
        elif (minV >= 2.5):
            SOC = round((minV-2.5)/1.75 * 100)
        else:
            SOC = 0
    else:
        minV = 4.25
        
        if(maxV < V):
            maxV = V
            
        if (maxV > 4.25):
            SOC = 100
        elif (maxV >= 2.5):
            SOC = round((maxV-2.5)/1.75 * 100)
        else:
            SOC = 0
    
    return adcValue

def getV():
    while True:
        read_spi_adc(0)
        time.sleep(1)

t = threading.Thread(target=getV)
t.start()

#var
battery_amount_val = 100
is_balance = 0
can_balance = 0
is_charge = False


class WarningPage(QDialog,warningUi):
    def __init__(self):
        super().__init__()
        self.setWindowFlag(Qt.FramelessWindowHint)
        self.setupUi(self)

    def click_yes(self):
        global is_balance
        #print("Yes!")
        is_balance = 1;
        self.close()

    def click_no(self):
        #print("No!")
        self.close()



class MainPage(QDialog,QWidget,mainUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.battery_amount.setText(str(battery_amount_val))
        self.battery_amount_bar.setGeometry(490, 245, 2 * battery_amount_val, 75)
        self.balance_btn_on.hide()

        self.clock_timer = QTimer(self)
        self.clock_timer.setInterval(300)  # 1000ms = 1sec , 화면 렌더링 주기
        self.clock_timer.timeout.connect(self.test_timer)

        self.first_page = FirstPage()
        self.main()


    def main(self):
        self.first_page.show()
        sleep(1)
        self.first_page.close()

        self.clock_timer.start()

    def goBms(self):
        widgets.setCurrentIndex(1)

    def test_timer(self):
        global battery_amount_val
        battery_amount_val = SOC
        self.battery_amount.setText(str(battery_amount_val))
        self.battery_amount_bar.setGeometry(490, 245, 2 * battery_amount_val, 75)

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
        is_balance = 0;

class BmsPage(QDialog,QWidget,bmsUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)

    def goMain(self):
        widgets.setCurrentIndex(0)



class FirstPage(QDialog,QWidget,firstUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)


app = QApplication()
first_page = FirstPage()
main_page = MainPage()
bms_page = BmsPage()
warningpage=WarningPage()

warningpage.setGeometry(458,200,540,300)

widgets = QStackedWidget()
#widgets.addWidget(login_page)
widgets.addWidget(main_page)
widgets.addWidget(bms_page)
widgets.setGeometry(0,0,1366,768)


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

#self.shadow3 = QGraphicsDropShadowEffect()
#self.shadow3.setColor(QColor(212, 212, 212))
#self.shadow3.setBlurRadius(15)
#self.shadow3.setOffset(4)

#self.shadow4 = QGraphicsDropShadowEffect()
#self.shadow4.setColor(QColor(212, 212, 212))
#self.shadow4.setBlurRadius(15)
#self.shadow4.setOffset(4)

#self.shadow5 = QGraphicsDropShadowEffect()
#self.shadow5.setColor(QColor(212, 212, 212))
#self.shadow5.setBlurRadius(15)
#self.shadow5.setOffset(4)


#self.label_goBms.setGraphicsEffect(self.shadow1)
#self.box1.setGraphicsEffect(self.shadow2)
#self.box2.setGraphicsEffect(self.shadow3)
#self.box3.setGraphicsEffect(self.shadow4)
#self.box3_2.setGraphicsEffect(self.shadow5)


# self.shadow1 = QGraphicsDropShadowEffect()
# self.shadow1.setColor(QColor(212, 212, 212))
# self.shadow1.setBlurRadius(15)
# self.shadow1.setOffset(4)

