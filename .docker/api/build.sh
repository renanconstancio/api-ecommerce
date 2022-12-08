#!/usr/bin/env bash

# Stop Image
echo "Stop container api_ecommerce"
docker stop api_ecommerce

# Remove Old Image
echo "Remove old iamge api_ecommerce"
docker image rm -f api_ecommerce

# No Cache Build
echo "Build no cache api_ecommerce"
docker build --no-cache -t api_ecommerce -f ./.docker/api/Dockerfile .
