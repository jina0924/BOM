import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(26, GPIO.OUT)
GPIO.output(16,True)
GPIO.output(26,True)

import spidev
import time
import threading

spi = spidev.SpiDev()
spi.open(0,0)
spi.max_speed_hz=500000

before = [-1,-1]
charge = False
minV = 4.25
minSOC = 100
maxV = 2.5
maxSOC = 0

def read_spi_adc(adcChannel):
    global minV
    global minSOC
    global maxV
    global maxSOC
    adcValue=0
    buff=spi.xfer2([1,(8+adcChannel)<<4,0])
    adcValue = ((buff[1]&3)<<8)+buff[2]
    V = round(adcValue * 3.3 / 1024 / 0.2, 2)
    if(before[adcChannel] == -1):
        before[adcChannel] = V
    print("before : ", before[adcChannel])
    print("curV : ", V)
    
    V = round(before[adcChannel] * 0.8 + V * 0.2, 2)
    SOC = round((V-2.5)/1.75 * 100)
    if (V > 4.25):
        SOC = 100
    elif (V >= 2.5):
        SOC = round((V-2.5)/1.75 * 100)
    else:
        SOC = 0
    
    before[adcChannel] = V
    
    if(charge == False):
        maxV = 2.5
        maxSOC = 0
        
        if(minV > V):
            minV = V
        if(minSOC > SOC):
            minSOC = SOC
        
        print(adcChannel, "V : ", minV)
        print("SOC : ", minSOC, "%")
    else:
        minV = 4.25
        minSOC = 100
        
        if(maxV < V):
            maxV = V
        if(maxSOC < SOC):
            maxSOC = SOC
            
        print(adcChannel, "V : ", maxV)
        print("SOC : ", maxSOC, "%")
    
    
    return adcValue

def getV():
    while True:
        read_spi_adc(0)
        time.sleep(1)

t = threading.Thread(target=getV)
t.start()
