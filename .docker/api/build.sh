#!/usr/bin/env bash

# Remove Old Image
docker image rm -f api_ecommerce

# No Cache Build
docker build --no-cache -t api_ecommerce -f ./.docker/api/Dockerfile .
