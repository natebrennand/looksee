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


@app.route('/send_link', methods=['POST'])
def send_link():
    """
    @param request_data: {'url': 'url of the site',
                          'number': 'phone number',
                          'message': 'message string'}
    """
    data = simplejson.loads(request.data)
    
    link = bitly_controller.shorten_link(mongo=mongo, data=data)
    if isinstance(link, tuple): # if an error
        return link

    data['message'] = data['message'].format(link)
    output = twilio_controller.send_text(mongo  = mongo,
                                         data   = data)
    if isinstance(output, tuple): # if an error
        return output

    return simplejson.dumps({'message': output})


@app.route('/short_url', methods=['POST'])
def short_url():
    """
    @param request_data: {'url': 'url of the site'}
    """
    link = bitly_controller.shorten_link(
        mongo   = mongo,
        data    = simplejson.loads(request.data))
    return simplejson.dumps({'url': link}), 200


@app.route('/text', methods=['POST'])
def text():
    """
    @param request_data: {'number': 'phone number',
                          'message': 'message string'}
    """
    output = twilio_controller.send_text(
        mongo = mongo,
        data = simplejson.loads(request.data))
    return simplejson.dumps({'message': output}), 200

@app.route('/', methods=['GET'])
def home():
    return make_response(open('src/static/base.html').read())


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

