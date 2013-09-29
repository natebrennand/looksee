
import reqests
import simplejson
from os import environ

BITLY_TOKEN = environ['BITLY_TOKEN']
BITLY_URL = 'https://api-ssl.bitly.com'


def get_link(url):
    payload = {
        'longUrl'       : url,
        'access_token'  : BITLY_TOKEN
    }
    json_response = reqests.get(
        BITLY_URL + '/v3/shorten',
        params = payload
    )
    response = simplejson.loads(json_response)['data']
    return (response['url'], response['hash'])

