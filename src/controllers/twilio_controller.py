
from twilio.rest import TwilioRestClient
from os import environ
import simplejson

TWILIO_TOKEN = environ['TWILIO_TOKEN']
TWILIO_ACCOUNT = environ['TWILIO_ACCOUNT']
TWILIO_NUMBER = environ['TWILIO_NUMBER']
client = TwilioRestClient(TWILIO_ACCOUNT, TWILIO_TOKEN)


def send_text(params):
    number, content = params['number'], params['message']

    message = client.messages.create(
        to      = number,
        from_   = TWILIO_NUMBER,
        body    = content
    )
    return simplejson.dumps({
        'message': 'Sucessfully sent'
    }), 200

