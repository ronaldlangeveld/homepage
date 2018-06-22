from flask import Flask
from flask import render_template
from jinja2 import Template
import requests
import json
from flask import jsonify, json
from flask import Response
from datetime import datetime

app = Flask(__name__)

# @app.route('/')
# def main():
    # try:
    #     r = requests.get('https://nomadlist.com/@ronald.json')
    #     raw = r.json()
    #     data = json.dumps(raw['location']['now'])
    #     loaded = json.loads(data)
    #     currentlocation = loaded['country']
    # except requests.exceptions.ConnectionError as e:
    #     print(e)
    #     currentlocation = "South Africa"

        # return render_template('index.html', now=currentlocation)


@app.route('/')
def main():
    
    currentlocation = "South Africa"
    
    return render_template('index.html', now=currentlocation)


@app.route('/lab')
def lab():
    
    return render_template('lab.html')


@app.route('/lab/travel')
def travel():
    
    return render_template('travel.html')

@app.route('/api/travel')
def traveldata():
    r = requests.get('https://nomadlist.com/@ronald.json')
    raw = r.json()
    data = json.dumps(raw['trips'])
    loaded = json.loads(data)
    date_format = "%Y-%m-%d"



    travelData = []
    for a in loaded:
        country = a['country']
        countrycode = a['country_code']
        start = a['date_start']
        end = a['date_end']
        a = datetime.strptime(start, date_format)
        b = datetime.strptime(end, date_format)
        delta = b-a
        tripdays = delta.days
        # print(delta.days)


        newjson =  {
            "country":country,
            "countrycode": countrycode,
            "days": tripdays
        }
        

        travelData.append(newjson)
        jsonStr = json.dumps(travelData)
        qwe = json.loads(jsonStr)

    return jsonify(Travels=qwe)


    

if __name__ == "__main__":
    app.run(host='0.0.0.0')


#     export FLASK_APP=server.py
# export FLASK_DEBUG=1
# flask run
