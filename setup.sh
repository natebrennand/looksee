#!/bin/bash

# python dependencies
echo 'CREATING VIRTUAL ENVIRONMENT'
virtualenv --no-site-packages .
source bin/activate
echo 'INSTALLING PYTHON DEPENDENCIES'
pip install -r requirements.txt

# grunt dependencies
echo 'INSTALLING GRUNT DEPENDENCIES'
npm install

echo 'CREATING SYMBOLIC PATH TO LINK STATIC FILES'
ln -s static src/static

echo 'Your environment is now set up.'
echo 'Set up your configurations and then try starting the server with the run script'
