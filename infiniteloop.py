import requests
import time
import os

while True:
    uri="https://damp-savannah-40143.herokuapp.com/api/balance"
    request = requests.get(uri)
    print request.json()
    balance = request.json()
    print balance[0]
    path = "oled-exp -i write Balance:" + balance[0]
    os.system(path)
    time.sleep(3)