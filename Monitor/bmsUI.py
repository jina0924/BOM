# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'bmsUI.ui'
##
## Created by: Qt User Interface Compiler version 6.4.0
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide6.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide6.QtWidgets import (QApplication, QFrame, QLabel, QPushButton,
    QSizePolicy, QWidget,QGraphicsDropShadowEffect)
import myres_rc

class Ui_Form(object):
    def setupUi(self, Form):
        if not Form.objectName():
            Form.setObjectName(u"Form")
        Form.resize(1366, 768)
        Form.setStyleSheet(u"background-color: rgb(246, 247, 248);")
        self.label = QLabel(Form)
        self.label.setObjectName(u"label")
        self.label.setGeometry(QRect(130, 80, 151, 51))
        self.label.setStyleSheet(u"border-image: url(:/logo/img/logo_little.png);")
        self.label.setFrameShape(QFrame.StyledPanel)
        self.label.setFrameShadow(QFrame.Raised)
        self.label.setLineWidth(1)
        self.pushButton = QPushButton(Form)
        self.pushButton.setObjectName(u"pushButton")
        self.pushButton.setGeometry(QRect(1200, 80, 75, 61))
        self.pushButton.setStyleSheet(u"border-image: url(:/icons/img/back_icon.png);")
        self.box1 = QLabel(Form)
        self.box1.setObjectName(u"box1")
        self.box1.setGeometry(QRect(180, 268, 623, 169))
        self.box1.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius : 20px;")
        self.box2 = QLabel(Form)
        self.box2.setObjectName(u"box2")
        self.box2.setGeometry(QRect(180, 455, 623, 169))
        self.box2.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius : 20px;")
        self.label_4 = QLabel(Form)
        self.label_4.setObjectName(u"label_4")
        self.label_4.setGeometry(QRect(225, 303, 190, 99))
        self.label_4.setStyleSheet(u"background-color : rgba(255,255,255,0);\n"
"border-image: url(:/icons/img/battery.png);")
        self.label_5 = QLabel(Form)
        self.label_5.setObjectName(u"label_5")
        self.label_5.setGeometry(QRect(249, 320, 131, 61))
        font = QFont()
        font.setPointSize(28)
        font.setBold(True)
        self.label_5.setFont(font)
        self.label_5.setStyleSheet(u"background-color: rgba(255,255,255,0);\n"
"color: rgb(26, 50, 99);")
        self.label_5.setAlignment(Qt.AlignCenter)
        self.label_6 = QLabel(Form)
        self.label_6.setObjectName(u"label_6")
        self.label_6.setGeometry(QRect(249, 507, 131, 61))
        self.label_6.setFont(font)
        self.label_6.setStyleSheet(u"background-color: rgba(255,255,255,0);\n"
"color: rgb(26, 50, 99);")
        self.label_6.setAlignment(Qt.AlignCenter)
        self.label_7 = QLabel(Form)
        self.label_7.setObjectName(u"label_7")
        self.label_7.setGeometry(QRect(225, 490, 190, 99))
        self.label_7.setStyleSheet(u"background-color : rgba(255,255,255,0);\n"
"border-image: url(:/icons/img/battery.png);")
        self.label_8 = QLabel(Form)
        self.label_8.setObjectName(u"label_8")
        self.label_8.setGeometry(QRect(484, 319, 52, 65))
        self.label_8.setStyleSheet(u"background-color:rgba(255,255,255,0);\n"
"border-image: url(:/icons/img/volt_icon.png);\n"
"")
        self.label_9 = QLabel(Form)
        self.label_9.setObjectName(u"label_9")
        self.label_9.setGeometry(QRect(484, 503, 52, 65))
        self.label_9.setStyleSheet(u"background-color:rgba(255,255,255,0);\n"
"border-image: url(:/icons/img/volt_icon.png);\n"
"")
        self.label_10 = QLabel(Form)
        self.label_10.setObjectName(u"label_10")
        self.label_10.setGeometry(QRect(690, 293, 51, 99))
        font1 = QFont()
        font1.setPointSize(60)
        font1.setBold(True)
        self.label_10.setFont(font1)
        self.label_10.setStyleSheet(u"background-color:rgb(255,255,255);\n"
"color: rgb(26, 50, 99);")
        self.label_10.setAlignment(Qt.AlignCenter)
        self.label_11 = QLabel(Form)
        self.label_11.setObjectName(u"label_11")
        self.label_11.setGeometry(QRect(690, 477, 51, 99))
        self.label_11.setFont(font1)
        self.label_11.setStyleSheet(u"background-color:rgb(255,255,255);\n"
"color: rgb(26, 50, 99);")
        self.label_11.setAlignment(Qt.AlignCenter)
        self.cell1_v = QLabel(Form)
        self.cell1_v.setObjectName(u"cell1_v")
        self.cell1_v.setGeometry(QRect(560, 302, 121, 99))
        font2 = QFont()
        font2.setPointSize(42)
        font2.setBold(True)
        self.cell1_v.setFont(font2)
        self.cell1_v.setStyleSheet(u"background-color:rgb(255,255,255);\n"
"color: rgb(26, 50, 99);")
        self.cell1_v.setAlignment(Qt.AlignCenter)
        self.cell2_v = QLabel(Form)
        self.cell2_v.setObjectName(u"cell2_v")
        self.cell2_v.setGeometry(QRect(560, 486, 121, 99))
        self.cell2_v.setFont(font2)
        self.cell2_v.setStyleSheet(u"background-color:rgb(255,255,255);\n"
"color: rgb(26, 50, 99);")
        self.cell2_v.setAlignment(Qt.AlignCenter)
        self.box3 = QLabel(Form)
        self.box3.setObjectName(u"box3")
        self.box3.setGeometry(QRect(847, 268, 356, 356))
        self.box3.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius : 20px;")
        self.label_12 = QLabel(Form)
        self.label_12.setObjectName(u"label_12")
        self.label_12.setGeometry(QRect(967, 338, 115, 105))
        self.label_12.setStyleSheet(u"background-color : rgba(255,255,255,0);\n"
"border-image:url(:/icons/img/temp_icon_big.png);")
        self.label_13 = QLabel(Form)
        self.label_13.setObjectName(u"label_13")
        self.label_13.setGeometry(QRect(1046, 476, 57, 55))
        self.label_13.setStyleSheet(u"background-color:rgb(255,255,255);\n"
"border-image: url(:/icons/img/degree.png);\n"
"")
        self.temp = QLabel(Form)
        self.temp.setObjectName(u"temp")
        self.temp.setGeometry(QRect(936, 472, 101, 60))
        font3 = QFont()
        font3.setPointSize(48)
        font3.setBold(True)
        self.temp.setFont(font3)
        self.temp.setStyleSheet(u"background-color:rgb(255,255,255);\n"
"color: rgb(234, 84, 85);")
        self.temp.setAlignment(Qt.AlignCenter)

        self.shadow1 = QGraphicsDropShadowEffect()
        self.shadow1.setColor(QColor(212, 212, 212))
        self.shadow1.setBlurRadius(15)
        self.shadow1.setOffset(4)

        self.shadow2 = QGraphicsDropShadowEffect()
        self.shadow2.setColor(QColor(212, 212, 212))
        self.shadow2.setBlurRadius(15)
        self.shadow2.setOffset(4)

        self.shadow3 = QGraphicsDropShadowEffect()
        self.shadow3.setColor(QColor(212, 212, 212))
        self.shadow3.setBlurRadius(15)
        self.shadow3.setOffset(4)

        self.box1.setGraphicsEffect(self.shadow1)
        self.box2.setGraphicsEffect(self.shadow2)
        self.box3.setGraphicsEffect(self.shadow3)

        self.label.raise_()
        self.pushButton.raise_()
        self.box1.raise_()
        self.box2.raise_()
        self.label_4.raise_()
        self.label_5.raise_()
        self.label_7.raise_()
        self.label_6.raise_()
        self.label_8.raise_()
        self.label_9.raise_()
        self.label_10.raise_()
        self.label_11.raise_()
        self.cell1_v.raise_()
        self.cell2_v.raise_()
        self.box3.raise_()
        self.label_12.raise_()
        self.label_13.raise_()
        self.temp.raise_()

        self.retranslateUi(Form)
        self.pushButton.clicked.connect(Form.goMain)

        QMetaObject.connectSlotsByName(Form)
    # setupUi

    def retranslateUi(self, Form):
        Form.setWindowTitle(QCoreApplication.translate("Form", u"Form", None))
        self.label.setText("")
        self.pushButton.setText("")
        self.box1.setText("")
        self.box2.setText("")
        self.label_4.setText("")
        self.label_5.setText(QCoreApplication.translate("Form", u"cell 1", None))
        self.label_6.setText(QCoreApplication.translate("Form", u"cell 2", None))
        self.label_7.setText("")
        self.label_8.setText("")
        self.label_9.setText("")
        self.label_10.setText(QCoreApplication.translate("Form", u"v", None))
        self.label_11.setText(QCoreApplication.translate("Form", u"v", None))
        self.cell1_v.setText(QCoreApplication.translate("Form", u"3.3", None))
        self.cell2_v.setText(QCoreApplication.translate("Form", u"3.3", None))
        self.box3.setText("")
        self.label_12.setText("")
        self.label_13.setText("")
        self.temp.setText(QCoreApplication.translate("Form", u"15", None))
    # retranslateUi

