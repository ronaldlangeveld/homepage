from flask import Flask
from flask import render_template
from jinja2 import Template
import requests
import json
app = Flask(__name__)

# @app.route('/')
# def main():
#     try:
#         r = requests.get('https://nomadlist.com/@ronald.json')
#         raw = r.json()
#         data = json.dumps(raw['location']['now'])
#         loaded = json.loads(data)
#         currentlocation = loaded['country']
#     except requests.exceptions.ConnectionError as e:
#         print(e)
#         currentlocation = "South Africa"

        # return render_template('index.html', now=currentlocation)


@app.route('/')
def main():
    
    currentlocation = "South Africa"
    
    return render_template('index.html', now=currentlocation)



if __name__ == "__main__":
    app.run(host='0.0.0.0')


#     export FLASK_APP=server.py
# export FLASK_DEBUG=1
# flask run
