#!/bin/sh
set -e

echo "* * * * * node /commands/hello.js" | crontab - && crond -f -L /dev/stdout