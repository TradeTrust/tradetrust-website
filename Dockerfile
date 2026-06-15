# https://github.com/drptbl/synpress-setup-example/blob/1d980157ef343de54f786e1115e1da590f1ba1d1/Dockerfile#L1-L12
# Node 20 required: package.json engines specifies node>=20.x and npm>=11.0.0;
# npm@11 requires Node>=20.17.0 so the old 18.16-ubuntu base caused "npm install -g npm@11" to fail.
FROM synthetixio/docker-e2e:20-ubuntu as base

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