import datetime
import time
import os
import ipfsapi
file_name =time.strftime("%H_%M_%S")
print file_name
path = "/home/pi/to_transmit/" + file_name + ".jpg/"
print path
os.system('fswebcam -r 320x240 -S 3 --jpeg 50 --save' +  file_name)
api = ipfsapi.connect('54.197.112.106',5001)
print api.id()
result = api.add('test.txt')
filehash = result["Hash"]
print filehash
print api.cat(filehash)


# log_file = open('hashes.txt',"w")
# log_file.write(filehash)
# log_file.close()
