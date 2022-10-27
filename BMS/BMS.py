import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(26, GPIO.OUT)
GPIO.output(16,False)
GPIO.output(26,True)

import spidev
import time
import threading

spi = spidev.SpiDev()
spi.open(0,0)
spi.max_speed_hz=500000

def read_spi_adc(adcChannel):
    adcValue=0
    buff=spi.xfer2([1,(8+adcChannel)<<4,0])
    adcValue = ((buff[1]&3)<<8)+buff[2]
    V = adcValue * 3.3 / 1024 / 0.2
    print(adcChannel, "V : ", V)
    return adcValue

def getV():
    while True:
        read_spi_adc(0)
        read_spi_adc(1)
        time.sleep(1)

t = threading.Thread(target=getV)
t.start()


