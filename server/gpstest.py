import serial 


from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="EOS")
gps = serial.Serial("/dev/ttyACM0", baudrate=9600)

def convert(val,direction):
	dd = int(float(val)/100)
	ss = float(val) - (dd * 100)
	final = dd + ss/60
	if(direction == "S" or direction == "W"):
		final = -1 * final
		return final
	return final
		

while True:
	line = gps.readline()
	data = line.split(",")
	if data[0]=="$GPRMC":
		if data[2]=="A":
			latitude = str(convert(data[3],data[4]))
			longitude = str(convert(data[5],data[6]))
			print("Latitude:" + latitude)
			print("Longiitude:" + longitude)
			location = geolocator.reverse(latitude, longitude)
			print(location.address)
			print((location.latitude, location.longitude))
			print(location.raw)
			break
			
			


	