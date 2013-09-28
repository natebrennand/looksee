# lib imports
from flask import Flask
from flask import make_response
from flask import request
import simplejson

# controllers
from controllers import twilio


app = Flask(__name__)
app.config.from_object('config.flask_config')


@app.route('/', methods=['GET'])
def home():
    return make_response(open('static/base.html').read())


if __name__ == '__main__':
    app.run(debug=True)

