# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'warningUI.ui'
##
## Created by: Qt User Interface Compiler version 6.4.0
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide2.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide2.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide2.QtWidgets import (QApplication, QDialog, QLabel, QPushButton,
    QSizePolicy, QWidget)

class Ui_Dialog(object):
    def setupUi(self, Dialog):
        if not Dialog.objectName():
            Dialog.setObjectName(u"Dialog")
        Dialog.resize(600, 380)
        Dialog.setStyleSheet(u"background-color: rgb(246, 247, 248);")
        self.pushButton_2 = QPushButton(Dialog)
        self.pushButton_2.setObjectName(u"pushButton_2")
        self.pushButton_2.setGeometry(QRect(340, 270, 131, 41))
        font = QFont()
        font.setFamilies([u"Noto Sans KR"])
        font.setPointSize(12)
        font.setBold(True)
        self.pushButton_2.setFont(font)
        self.pushButton_2.setContextMenuPolicy(Qt.DefaultContextMenu)
        self.pushButton_2.setLayoutDirection(Qt.LeftToRight)
        self.pushButton_2.setAutoFillBackground(False)
        self.pushButton_2.setStyleSheet(u"background-color: rgb(255,255,255);\n"
"border-radius : 10px;\n"
"color : rgb(64, 67, 131);")
        self.pushButton_2.setAutoDefault(False)
        self.pushButton_2.setFlat(False)
        self.pushButton_3 = QPushButton(Dialog)
        self.pushButton_3.setObjectName(u"pushButton_3")
        self.pushButton_3.setGeometry(QRect(129, 270, 131, 41))
        font1 = QFont()
        font1.setFamilies([u"Noto Sans KR"])
        font1.setPointSize(11)
        font1.setBold(True)
        self.pushButton_3.setFont(font1)
        self.pushButton_3.setContextMenuPolicy(Qt.DefaultContextMenu)
        self.pushButton_3.setLayoutDirection(Qt.LeftToRight)
        self.pushButton_3.setAutoFillBackground(False)
        self.pushButton_3.setStyleSheet(u"background-color: rgb(255, 255,255);\n"
"border-radius : 10px;\n"
"color : rgb(64, 67, 131);")
        self.pushButton_3.setAutoDefault(False)
        self.pushButton_3.setFlat(False)
        self.label = QLabel(Dialog)
        self.label.setObjectName(u"label")
        self.label.setGeometry(QRect(110, 60, 441, 161))
        font2 = QFont()
        font2.setFamilies([u"Noto Sans KR"])
        font2.setPointSize(16)
        font2.setBold(True)
        self.label.setFont(font2)
        self.label.setStyleSheet(u"background-color:rgba(255,255,255,0);\n"
"color : rgb(255,255,255);")
        self.label_2 = QLabel(Dialog)
        self.label_2.setObjectName(u"label_2")
        self.label_2.setGeometry(QRect(0, 0, 601, 381))
        self.label_2.setStyleSheet(u"border-radius:20px;\n"
"background-color: qlineargradient(spread:pad, x1:0, y1:1, x2:1, y2:0, stop:0 rgba(26,50,99,255), stop:1 rgba(92,120,177,255));")
        self.label_2.raise_()
        self.pushButton_2.raise_()
        self.pushButton_3.raise_()
        self.label.raise_()

        self.retranslateUi(Dialog)
        self.pushButton_2.clicked.connect(Dialog.click_no)
        self.pushButton_3.clicked.connect(Dialog.click_yes)

        QMetaObject.connectSlotsByName(Dialog)
    # setupUi

    def retranslateUi(self, Dialog):
        Dialog.setWindowTitle(QCoreApplication.translate("Dialog", u"Dialog", None))
        self.pushButton_2.setText(QCoreApplication.translate("Dialog", u"\uc544\ub2c8\uc694", None))
        self.pushButton_3.setText(QCoreApplication.translate("Dialog", u"\uc608", None))
        self.label.setText(QCoreApplication.translate("Dialog", u"\uc140 \ubc38\ub7f0\uc2f1\uc774 \ud544\uc694\ud558\uc9c0 \uc54a\uc740 \uc0c1\ud0dc\uc785\ub2c8\ub2e4.\n"
"\ubc30\ud130\ub9ac \uc218\uba85\uc774 \uae09\uaca9\ud788 \uac10\uc18c\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n"
"\uc9c4\ud589\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?", None))
        self.label_2.setText("")
    # retranslateUi

