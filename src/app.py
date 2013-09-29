# lib imports
from flask import Flask
from flask import make_response
from flask import request
from flask.ext.pymongo import PyMongo
import simplejson

# controllers
from controllers import twilio_controller, bitly_controller

app = Flask(__name__)
app.config.from_object('config.flask_config')
mongo = PyMongo(app)


@app.route('/short_url', methods=['POST'])
def short_url():
    url_arg = request.form['url']
    return bitly_controller.shorten_link(
        url = url_arg,
        mongo = mongo)


@app.route('/text/<int:phone_number>/<string:message>', methods=['POST'])
def text(phone_number, message):
    twilio_controller.send_text(number=phone_number, content=message)


@app.route('/', methods=['GET'])
def home():
    return make_response(open('src/static/base.html').read())


if __name__ == '__main__':
    app.run()

