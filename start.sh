#!/bin/bash

export DJANGO_SETTINGS_MODULE=clouds.settings

# Start Gunicorn processes
echo Starting Gunicorn.
exec gunicorn clouds.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 3

