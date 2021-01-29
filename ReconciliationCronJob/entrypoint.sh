#!/bin/sh
set -e

echo "* * * * * echo hello" | crontab - && crond -f -L /dev/stdout