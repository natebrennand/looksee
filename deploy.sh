#!/bin/bash

grunt
source bin/activate
source src/config/test_config.sh
gunicorn --pythonpath src app:app

