
# flask settings

from os import environ as env
import sys

try:
    # mongo settings
    MONGO_HOST = env['MONGO_HOST']
    MONGO_PORT = env['MONGO_PORT']
    MONGO_DBNAME = env['MONGO_DBNAME']

    # flask settings
    if env['FLASK_DEBUG'] == 'TRUE':
        DEBUG = True
    else:
        DEBUG = False

except KeyError:
    print ("Some of your settings aren't in the environment.\n" +
        "You probably need to source your config file.\n" + 
        "`source config/<your settings file>.prod`")
    sys.exit(1)
