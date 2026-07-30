# https://github.com/drptbl/synpress-setup-example/blob/1d980157ef343de54f786e1115e1da590f1ba1d1/Dockerfile#L1-L12
# FROM synthetixio/docker-e2e:18.16-ubuntu as base
FROM synthetixio/docker-e2e@sha256:d46dd0c38a4a6cf44355dbf583f3bb83c60e445c5508c10d7680c5a30dc81d8a as base

# Download and install Google Chrome
# Test and replace chrome version, value can be found in the link below
# https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable
# ENV CHROME_VERSION=130.0.6723.91-1
# RUN wget -q https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb
# RUN apt-get install -y ./google-chrome-stable_${CHROME_VERSION}_amd64.deb

# The base image bakes in a specific Chrome version at build time, but Google
# Chrome's official .deb also registers its own apt repo + self-update mechanism.
# If that fires when a container boots (it has network access), Chrome silently
# drifts to whatever is currently "stable" - which is how this pinned, digest-locked
# base image ended up running a Chrome new enough to refuse to install the
# Manifest V2 MetaMask build this e2e suite is pinned to, despite the image itself
# never changing. Hold the package and remove the repo so it can't self-update.
RUN apt-mark hold google-chrome-stable && \
    rm -f /etc/apt/sources.list.d/google-chrome.list

# Force-enable Manifest V2 as a second line of defense, in case Chrome's own MV2
# enforcement is (or becomes) tied to a server-pushed policy component rather than
# purely the installed binary version. https://support.google.com/chrome/a/answer/7517525
RUN mkdir -p /etc/opt/chrome/policies/managed && \
    echo '{"ExtensionManifestV2Availability": 2}' > /etc/opt/chrome/policies/managed/enable-manifestv2.json

RUN mkdir /app
WORKDIR /app

COPY package.json ./

FROM base as test
COPY . .