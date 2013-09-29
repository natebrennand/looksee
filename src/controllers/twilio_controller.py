
from twilio.rest import TwilioRestClient
from os import environ
import simplejson

from sys import path
path.append('../')
from config import mongo_config as MONGO

TWILIO_TOKEN = environ['TWILIO_TOKEN']
TWILIO_ACCOUNT = environ['TWILIO_ACCOUNT']
TWILIO_NUMBER = environ['TWILIO_NUMBER']
client = TwilioRestClient(TWILIO_ACCOUNT, TWILIO_TOKEN)


def send_text(mongo=None, data=None):
    number = data['number']
    content = data['message']

    # send it
    message = client.messages.create(
        to      = number,
        from_   = TWILIO_NUMBER,
        body    = content
    )
    # log it
    mongo.db[MONGO.TEXTS].insert({
        'receiver'  : number,
        'sender'    : TWILIO_NUMBER,
        'body'      : content
    })

    return 'Sucessfully sent'

