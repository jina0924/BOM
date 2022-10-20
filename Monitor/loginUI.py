# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'loginUI.ui'
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
from PySide6.QtWidgets import (QApplication, QLabel, QPushButton, QSizePolicy,
    QWidget)

class Ui_Form(object):
    def setupUi(self, Form):
        if not Form.objectName():
            Form.setObjectName(u"Form")
        Form.resize(1366, 768)
        Form.setContextMenuPolicy(Qt.DefaultContextMenu)
        self.label = QLabel(Form)
        self.label.setObjectName(u"label")
        self.label.setGeometry(QRect(558, 170, 250, 141))
        self.pushButton = QPushButton(Form)
        self.pushButton.setObjectName(u"pushButton")
        self.pushButton.setGeometry(QRect(623, 470, 120, 71))
        self.pushButton.setStyleSheet(u"background-color: rgb(85, 170, 0);\n"
"border-color : rgb(85, 170, 0);\n"
"border-radius : 3px;\n"
"color: rgb(255, 255, 255);")
        self.pushButton_2 = QPushButton(Form)
        self.pushButton_2.setObjectName(u"pushButton_2")
        self.pushButton_2.setGeometry(QRect(1070, 110, 131, 61))
        self.pushButton_2.setContextMenuPolicy(Qt.DefaultContextMenu)
        self.pushButton_2.setLayoutDirection(Qt.LeftToRight)
        self.pushButton_2.setAutoFillBackground(False)
        self.pushButton_2.setStyleSheet(u"background-color: rgb(255, 203, 206);\n"
"border-color : rgb(255, 203, 206);\n"
"border-radius : 3px;\n"
"color : rgb(64, 67, 131);")
        self.pushButton_2.setAutoDefault(False)
        self.pushButton_2.setFlat(False)

        self.retranslateUi(Form)
        self.pushButton.clicked.connect(Form.goMain)
        self.pushButton_2.clicked.connect(Form.checkDevice)

        QMetaObject.connectSlotsByName(Form)
    # setupUi

    def retranslateUi(self, Form):
        Form.setWindowTitle(QCoreApplication.translate("Form", u"Form", None))
        self.label.setText("")
        self.pushButton.setText(QCoreApplication.translate("Form", u"Go main btn", None))
        self.pushButton_2.setText(QCoreApplication.translate("Form", u"Dialog btn", None))
    # retranslateUi

