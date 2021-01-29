# FROM node:8-alpine
# RUN apk update && apk add tzdata &&\ 
#     cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime &&\ 
#     echo "America/Sao_Paulo" > /etc/timezone &&\ 
#     apk del tzdata && rm -rf /var/cache/apk/*
    
# CMD chown root:root /etc/crontabs/root && /usr/sbin/crond -f

FROM alpine

COPY        entrypoint.sh /
RUN         chmod +x /entrypoint.sh

ENTRYPOINT  ["/entrypoint.sh"]