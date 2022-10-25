from PySide6.QtWidgets import *
from PySide6.QtCore import *
from PySide6.QtGui import *

from time import sleep


from mainUI import Ui_Form as mainUi
from firstUI import Ui_Form as  firstUi
from bmsUI import Ui_Form as bmsUi
from warningUI import Ui_Dialog as warningUi



#var
battery_amount_val = 100
is_balance = 0
can_balance = 0


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
        battery_amount_val -= 1
        if(battery_amount_val <0):
            battery_amount_val = 100
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

