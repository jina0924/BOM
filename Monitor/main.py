from PySide6.QtWidgets import *
from PySide6.QtCore import *
from PySide6.QtGui import *

from time import sleep

from loginUI import Ui_Form as loginUi
from mainUI import Ui_Form as mainUi
from deviceInfoUI import Ui_Dialog as infoUi
from firstUI import Ui_Form as  firstUi
from bmsUI import Ui_Form as bmsUi


class DevicePage(QDialog,infoUi):
    def __init__(self):
        super().__init__()
        #self.setWindowFlag(Qt.FramelessWindowHint)
        self.setupUi(self)

class LoginPage(QDialog,QWidget,loginUi):
    def __init__(self):
        super().__init__()
        self.movie = QMovie("./img/ex1.gif",QByteArray(),self)
        self.movie.setCacheMode(QMovie.CacheAll)
        self.movie.setSpeed(100)

        self.setupUi(self)
        #self.setWindowFlag(Qt.FramelessWindowHint)
        self.label.setMovie(self.movie)
        self.movie.start()

    def goMain(self):
        widgets.setCurrentIndex(1)
        main_page.main()
        print("go Main!")

    def checkDevice(self):
        global device_page
        device_page.exec_()

class MainPage(QDialog,QWidget,mainUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.clock_timer = QTimer(self)
        self.clock_timer.setInterval(1000)  # 1초 => 나중에 5초에 한번으로 바꿀거임
        self.clock_timer.timeout.connect(self.test_timer)
        self.cnt = 0
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
        pass

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
#login_page = LoginPage()
first_page = FirstPage()
main_page = MainPage()
device_page = DevicePage()
bms_page = BmsPage()



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