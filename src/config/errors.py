
# file used to consolidate various error messages

import simplejson


def ERROR():
    return response()


def BITLY_ERR(status):
    return response(
        message = 'BITLY ERROR: '+status,
        code = 400
    )


def TWILIO_RATE_LIMIT():
    return response(
        message = 'ERROR: The message was already sent to that number.'
    )


def NO_DATA():
    return response(
        message = 'ERROR: No data was found',
        code = 400
    )


########################################
#   Utilities
########################################

def response(message="ERROR: Server side error", code=500):
    code = int(code)
    return simplejson.dumps({
        'message': message
    }), code
