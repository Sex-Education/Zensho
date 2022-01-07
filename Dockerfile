FROM golang:alpine as BackendBuilder
COPY ./app /app
WORKDIR /app
RUN go mod download
RUN go build main.go

FROM node:16-alpine as FrontendBuilder
COPY ./frontend /frontend
WORKDIR /frontend
RUN apk add --no-cache git openssh
    yarn install && \
    yarn run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=backendBuilder /app /app
COPY --from=frontendBuilder /frontend/build /var/www

COPY init.sh init.sh
RUN chmod 777 init.sh
CMD ["/bin/sh","init.sh"]