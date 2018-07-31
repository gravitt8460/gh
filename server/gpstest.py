import serial 

gps = serial.Serial("/dev/ttyACM0", baudrate=9600)

def convert(val,direction):
	dd = int(float(val)/100)
	ss = float(val) - (dd * 100)
	final = dd + ss/60
	if(direction == "S" or direction == "W"):
		final = -1 * final
		return final
		

while True:
	line = gps.readline()
	data = line.split(",")
	if data[0]=="$GPRMC":
		if data[2]=="A":
			print("Latitude:" + convert(data[3],data[4]))
			print("Longiitude:" + convert(data[5],data[6]))
			
			
			


	