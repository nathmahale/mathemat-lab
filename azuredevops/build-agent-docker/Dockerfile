FROM --platform=${BUILDPLATFORM} ubuntu:22.04
ENV TARGETARCH="linux-arm64"

# Passed from Github Actions
ARG GIT_VERSION_TAG=unspecified
ARG GIT_COMMIT_MESSAGE=unspecified
ARG GIT_VERSION_HASH=unspecified

RUN \
    echo $GIT_VERSION_TAG > GIT_VERSION_TAG.txt && \
    echo $GIT_COMMIT_MESSAGE > GIT_COMMIT_MESSAGE.txt && \
    echo $GIT_VERSION_HASH > GIT_VERSION_HASH.txt

RUN apt update && \
  apt upgrade -y && \
  apt install -y curl git jq libicu70

# Install Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

WORKDIR /azp/

COPY ./start.sh /azp/start.sh
RUN chmod +x /azp/start.sh

# Create agent user and set up home directory
RUN useradd -m -d /home/agent agent
RUN chown -R agent:agent /azp /home/agent

USER agent

ENTRYPOINT [ "/azp/start.sh" ]