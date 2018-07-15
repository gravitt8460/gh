import requests
import json

# request = requests.post("https://damp-savannah-40143.herokuapp.com/api/scans",)

params = {
            "serial":"11223",
            "sku": "32434",
            "latlon": "12232,24343",
            "imagehash": "http://34.193.139.251:8080/ipfs/QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH"
}
# print data
request = requests.post(url="https://damp-savannah-40143.herokuapp.com/api/scans", data=params)
print request.text
print request.status_code