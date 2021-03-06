from flask import Flask
from flask import render_template
from jinja2 import Template
import requests
import json
from flask import jsonify, json, request
from flask import Response
from datetime import datetime
from datetime import date
import arrow

app = Flask(__name__)

@app.route('/')
def main():
    try:
        r = requests.get('https://nomadlist.com/@ronald.json')
        raw = r.json()
        data = json.dumps(raw['location']['now'])
        loaded = json.loads(data)
        print(loaded)
        currentcity = loaded['city']
        currentcountry = loaded['country']
        nextdata = json.dumps(raw['location']['next'])
        nextloaded = json.loads(nextdata)
        nextcity = nextloaded['city']
        nextcountry = nextloaded['country']
        nextdate = nextloaded['date_start']
        today = str(date.today())
        a = arrow.get(nextdate)
        b = arrow.get(today)
        delta = (a-b).days
        print(delta)
        




    except requests.exceptions.ConnectionError as e:

        currentcountry = "South Africa"

    return render_template('index.html', city=currentcity, country=currentcountry, nextcity=nextcity, nextcountry=nextcountry, nextdays=delta)


# @app.route('/')
# def main():

#     currentlocation = "South Africa"

#     return render_template('index.html', now=currentlocation)



@app.route('/feedback', methods=['POST', 'GET'])
def feedback():
    user =  request.form['name']
    email =  request.form['email']
    message =  request.form['message']

    userid = "430856496"
    msg = "Feedback Alert: \n"+"from: " + user + "\nEmail: " + email + "\nMessage: " + message
    telapi = "https://api.telegram.org/bot549063485:AAE3EwprRm6UWNt9BTWc7aIft2zUVoHm2Ss/sendMessage?chat_id=" + userid + "&text=" + msg
    print(telapi)
    r = requests.post(telapi)
    raw = r.json()
    data = json.dumps(raw["ok"])
    print(data)

    if data == "true":
        return jsonify({'ok':'ok'})

    else:
        return jsonify({'ok':'no'})





@app.route('/fibre')
def fibre():

    return render_template('fibre.html')


@app.route('/hire')
def help():

    return render_template('help.html')


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
