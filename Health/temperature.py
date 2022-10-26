#temperature test code
import RPi.GPIO as GPIO
import spidev
from time import sleep

spi = spidev.SpiDev()
spi.open(0,0)
spi.max_speed_hz=500000


def sensor_init():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(16,GPIO.IN)


def read_spi_adc(adcChannel):
    adcValue=0
    try:
        buff=spi.xfer2([1,(8+adcChannel)<<4,0])
        adcValue = ((buff[1]&3)<<8)+buff[2]
        print("buff: ",buff)       
        print("adcValue: ",adcValue)
        return adcValue
        # hum_max ==> max value
        #d_value = int(map(adcValue,hum_max,1023,0,100))
    except:
        print("can\'t read spi_adc")
        return

#sensor_init()
while True:
    read_spi_adc(0)
    #print("aa: ",GPIO.input(16))
    sleep(0.5)




