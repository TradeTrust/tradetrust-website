# https://github.com/drptbl/synpress-setup-example/blob/1d980157ef343de54f786e1115e1da590f1ba1d1/Dockerfile#L1-L12
# FROM synthetixio/docker-e2e:18.16-ubuntu as base
FROM synthetixio/docker-e2e@sha256:d46dd0c38a4a6cf44355dbf583f3bb83c60e445c5508c10d7680c5a30dc81d8a as base

RUN mkdir /app
WORKDIR /app

COPY package.json ./

FROM base as test
COPY . .