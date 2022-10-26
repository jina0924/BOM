import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(16, GPIO.OUT)
GPIO.output(16,True)

import spidev
import time

spi = spidev.SpiDev()
spi.open(0,0)
spi.max_speed_hz=500000

def read_spi_adc(adcChannel):
    adcValue=0
    buff=spi.xfer2([1,(8+adcChannel)<<4,0])
    adcValue = ((buff[1]&3)<<8)+buff[2]
    V = adcValue * 5 / 1024
    print("V : ", V)
    return adcValue

while True:
    read_spi_adc(0)
    time.sleep(1)
    
