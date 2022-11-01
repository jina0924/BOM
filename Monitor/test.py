from PySide2.QtWidgets import *
from PySide2.QtCore import *
from PySide2.QtGui import *

from firstUI import Ui_Form

class FirstPage(QDialog,QWidget,Ui_Form):
    def __init__(self):
        super().__init__()
        self.setupUi(self)



app = QApplication()
first_page = FirstPage()

first_page.show()
app.exec_()
