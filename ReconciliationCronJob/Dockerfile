FROM node:8-alpine

RUN apk update && apk add tzdata &&\ 
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime &&\ 
    echo "America/Sao_Paulo" > /etc/timezone &&\ 
    apk del tzdata && rm -rf /var/cache/apk/*

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

CMD /entrypoint.sh