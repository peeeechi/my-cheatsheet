#!/bin/bash

usermod -u $UID -g $GID node
chown -R node:node /home/node
gosu node:node "$@"


