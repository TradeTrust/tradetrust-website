# https://github.com/drptbl/synpress-setup-example/blob/1d980157ef343de54f786e1115e1da590f1ba1d1/Dockerfile#L1-L12
# 18.16-ubuntu carries all synpress browser/display tooling; we overlay Node 20 LTS
# via NodeSource so that npm@11 (which requires Node>=20.17.0) can be installed to
# match the lockfile generated locally (npm@9 in the base rejects it with
# "Missing: typescript@6.0.3").
FROM --platform=linux/amd64 synthetixio/docker-e2e:18.16-ubuntu as base

# The base image has an expired Google Chrome GPG key; refresh it so that
# apt-get update (called inside the NodeSource setup script) succeeds.
RUN curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub \
      | gpg --dearmor -o /etc/apt/trusted.gpg.d/google-chrome.gpg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g npm@11

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