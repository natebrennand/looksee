
from twilio.rest import TwilioRestClient
from os import environ
import simplejson

from sys import path
path.append('../')
from config import mongo_config as MONGO
from config import errors as ERR

TWILIO_TOKEN = environ['TWILIO_TOKEN']
TWILIO_ACCOUNT = environ['TWILIO_ACCOUNT']
TWILIO_NUMBER = environ['TWILIO_NUMBER']
client = TwilioRestClient(TWILIO_ACCOUNT, TWILIO_TOKEN)


def check_for_prev_message(mongo, number, content):
    prev = mongo.db[MONGO.TEXTS].find_one({
        'receiver': number,
        'body': content
    })

    if prev:    # the message already occured
        return False
    else:
        return True


def send_text(mongo=None, data=None):
    number = data['number']
    content = data['message']

    if not check_for_prev_message(mongo, number, content):
        print data
        return ERR.TWILIO_RATE_LIMIT()

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
        'body'      : content,
        'twilio_obj': str(message)
    })

    return 'Sucessfully sent'

