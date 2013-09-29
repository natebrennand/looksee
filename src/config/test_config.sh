#!/bin/bash

# This is where you should declare all of your configurations and API keys.

# Flask config
export FLASK_DEBUG='TRUE'

# mongo config
export MONGO_HOST="localhost"
export MONGO_PORT="27017"
export MONGO_DBNAME="looksee"

# secrets
source src/config/secrets.sh
