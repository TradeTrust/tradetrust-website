# https://github.com/drptbl/synpress-setup-example/blob/1d980157ef343de54f786e1115e1da590f1ba1d1/Dockerfile#L1-L12
# FROM synthetixio/docker-e2e:18.16-ubuntu as base
FROM synthetixio/docker-e2e@sha256:d46dd0c38a4a6cf44355dbf583f3bb83c60e445c5508c10d7680c5a30dc81d8a as base

# Download and install Google Chrome
# Test and replace chrome version, value can be found in the link below
# https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable
# ENV CHROME_VERSION=130.0.6723.91-1
# RUN wget -q https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb
# RUN apt-get install -y ./google-chrome-stable_${CHROME_VERSION}_amd64.deb

RUN mkdir /app
WORKDIR /app

COPY package.json ./

FROM base as test
COPY . .