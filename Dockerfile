FROM node:12-alpine

LABEL com.benoitvidis.vendor="Benoît Vidis"

WORKDIR /opt

RUN  set -x \
  \
  && echo http://dl-cdn.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories \
  && apk add oath-toolkit-oathtool --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
  && apk add --no-cache git --virtual deps \
  \
  && git clone https://github.com/benoitvidis/otpauth2oath.git ./otp \
  && cd otp \
  && npm ci \
  \
  && apk del deps

CMD [ "node", "/opt/otp/index.js" ]
