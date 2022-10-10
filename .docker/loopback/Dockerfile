# our base image
FROM node:16

# specify the port number the container should expose
EXPOSE 8001

# User user as root
USER root

# Create App
RUN mkdir /app

# Run update and Strongloop install

# RUN apt-get update
# RUN apt-get install -y openssl
RUN npm install -g npm
RUN npm install -g pm2
RUN pm2 install pm2-logrotate
