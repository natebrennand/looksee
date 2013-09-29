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
    """
    @param request_data: {'url': 'url of the site'}
    """
    return bitly_controller.shorten_link(
        mongo = mongo,
        simplejson.loads(request.data))


@app.route('/text', methods=['POST'])
def text():
    """
    @param request_data: {'number': 'phone number',
                          'message': 'message string'}
    """
    return twilio_controller.send_text(
        mongo = mongo,
        data = simplejson.loads(request.data))

@app.route('/', methods=['GET'])
def home():
    return make_response(open('src/static/base.html').read())


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
