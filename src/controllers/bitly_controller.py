
import requests
import simplejson
from os import environ

from sys import path
path.append('../')
from config import mongo_config as MONGO
from config import errors as ERR


BITLY_TOKEN = environ['BITLY_TOKEN']
BITLY_URL = 'https://api-ssl.bitly.com'


def check_for_link(mongo, link):
    exisisting = mongo.db[MONGO.LINKS].find_one({
        'long_url': link
    })
    if exisisting:
        return exisisting
    if not exisisting:
        return False


def shorten_link(mongo=None, data=None):
    url = data['url']
    # hacky as fuck
    if 'http://' not in url:
        url = 'http://{}'.format(url)
    if 'localhost:5000' in url:
        url = 'http://looksee.pagekite.me/'+'/'.join(url.split('/')[1::])

    exisisting = check_for_link(mongo, url)

    if exisisting:
        return exisisting['short_url']

    payload = {
        'longUrl'       : url,
        'access_token'  : BITLY_TOKEN
    }
    json_response = requests.get(
        BITLY_URL + '/v3/shorten',
        params = payload
    )

    response = simplejson.loads(json_response.text)
    if response['status_code'] is not 200:
        print 'ERROR CREATING BITLY LINK: ', response['status_txt']
        return ERR.BITLY_ERR(response['status_txt'])

    response = response['data']
    short_url, bitly_hash = response['url'], response['hash']

    mongo.db[MONGO.LINKS].insert({
        'long_url'  : url,
        'short_url' : short_url,
        'bitly_hash': bitly_hash
    })
    return short_url

