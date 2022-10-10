#!/usr/bin/env bash

# Install NPM dependencies
echo "********************************"
echo "Installing API dependencies..."
echo "********************************"
yarn

# Build Docker images
echo "********************************"
echo "Building Docker Images..."
echo "********************************"
./.docker/dev-build.sh

echo "********************************"
echo "Starting up Docker Containers..."
echo "********************************"
./.docker/dev-up.sh
