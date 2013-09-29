
import requests
import simplejson
from os import environ

from sys import path
path.append('../')
from config import mongo_config as MONGO
from config import errors as ERR


BITLY_TOKEN = environ['BITLY_TOKEN']
BITLY_URL = 'https://api-ssl.bitly.com'


def shorten_link(url=None, mongo=None):
    print 'URL: ', url

    payload = {
        'longUrl'       : url,
        'access_token'  : BITLY_TOKEN
    }
    json_response = requests.get(
        BITLY_URL + '/v3/shorten',
        params = payload
    )

    if json_response.status_code is not 200:
        return ERR.ERROR()

    response = simplejson.loads(json_response.text)['data']
    short_url, bitly_hash = response['url'], response['hash']

    mongo.db[MONGO.LINKS].insert({
        'long_url'  : url,
        'short_url' : short_url,
        'bitly_hash': bitly_hash
    })

    return short_url



