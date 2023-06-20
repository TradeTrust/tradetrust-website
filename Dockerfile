# https://github.com/drptbl/synpress-setup-example/blob/1d980157ef343de54f786e1115e1da590f1ba1d1/Dockerfile#L1-L12
FROM synthetixio/docker-e2e:16.20-ubuntu as base

RUN mkdir /app
WORKDIR /app

COPY package.json ./

FROM base as test
COPY . .