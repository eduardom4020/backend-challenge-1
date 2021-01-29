#!/bin/sh
set -e

echo "* * * * * node /app/dist/$1.js" | crontab - && crond -f -L /dev/stdout