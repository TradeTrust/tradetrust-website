FROM node:alpine

WORKDIR /website

RUN apk update && apk add git bash make gcc g++ python

COPY ./package* ./

RUN npm install

COPY ./ ./

ENTRYPOINT ["/website/docker/entrypoint.sh"]
