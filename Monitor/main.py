from PySide6.QtWidgets import *
from PySide6.QtCore import *
from PySide6.QtGui import *


from loginUI import Ui_Form as loginUi
from mainUI import Ui_Form as mainUi


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
        print("go Main!")

class MainPage(QDialog,QWidget,mainUi):
    def __init__(self):
        super().__init__()
        self.setupUi(self)


    def backLogin(self):
        widgets.setCurrentIndex(0)


app = QApplication()
login_page = LoginPage()
main_page = MainPage()

widgets = QStackedWidget()
widgets.addWidget(login_page)
widgets.addWidget(main_page)
widgets.setGeometry(0,0,1366,768)

widgets.show()
app.exec_()

# app = QApplication()
# label = QLabel("Hello World")
# label.show()
# app.exec_()