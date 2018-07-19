import datetime
import time
import os
import ipfsapi
import requests
import json

file_name =time.strftime("%H_%M_%S")
print file_name
path = str(file_name) + ".jpg"
print path
os.system('fswebcam -r 320x240 -S 3 --jpeg 50 --save' +  file_name)
api = ipfsapi.connect('54.197.112.106',5001)
print api.id()
result = api.add(path)
filehash = result["Hash"]
print filehash
print api.cat(filehash)


request = requests.post("https://damp-savannah-40143.herokuapp.com/api/scans",)

params = {
           "serial":"11223",
           "sku": "32434",
           "latlon": "12232,24343",
           "imagehash": "http://54.197.112.106:8080/ipfs/QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"
}
# print data
request = requests.post(url="https://damp-savannah-40143.herokuapp.com/api/scans", data=params)
print request.text
print request.status_code
