#!/usr/bin/env bash

# Remove Old Image
docker image rm -f ecommerce_api_1.0

# No Cache Build
docker build --no-cache -t ecommerce_api_1.0 -f ./.docker/loopback/Dockerfile .
