from flask import Flask
from flask import render_template
from jinja2 import Template
import requests
import json
app = Flask(__name__)

@app.route('/')
def main():
    r = requests.get('https://nomadlist.com/@ronald.json')
    raw = r.json()
    data = json.dumps(raw['location']['now'])
    loaded = json.loads(data)
    currentlocation = loaded['country']
    

    return render_template('index.html', now=currentlocation)




if __name__ == "__main__":
    app.run(host='0.0.0.0')