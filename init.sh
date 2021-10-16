#!/bin/sh
if [[ -z "${PORT}" ]]; then
  LISTENING_PORT="80"
else
  LISTENING_PORT="${PORT}"
fi

sed -i -e 's/$PORT/'"$LISTENING_PORT"'/g' /etc/nginx/nginx.conf
/app/main & 
nginx -g 'daemon off;'