import serial 

gps = serial.Serial("/dev/ttyACM0", baudrate=9600)

while True:
	line = gps.readline()
	data = line.split(",")
	if data[0]=="$GPRMC":
		if data[2]=="A":
			print("Latitude:" + data[3])
			print("Longiitude:" + data[5])