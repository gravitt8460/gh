import serial 

gps = serial.Serial("/dev/ttyACM0", baudrate=9600)

while True:
	line = gps.readLine()
	data = line.split(",")
	if data[0]=="$GPMRC":
		if data[2]=="A":
			print "Latitude: %s" %> (data[3])
			print "Longiitude: %s" %> (data[5])