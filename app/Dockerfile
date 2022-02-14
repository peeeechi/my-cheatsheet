FROM node:16

ENV UID 1000
ENV GID 1000
ARG PASS='node'

COPY ./init.sh /tmp/init.sh

RUN apt-get update && apt-get install -y \
    sudo \
    gosu \
    && rm -rf /var/lib/apt/lists/*

RUN usermod -G sudo node \
    && echo "node:${PASS}" | chpasswd \
    && mkdir /home/node/src

WORKDIR /home/node/src

ENTRYPOINT [ "/tmp/init.sh" ]