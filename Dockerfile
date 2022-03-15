# This image makes use of a Node image running on Linux Alpine
  FROM node:14

  # A work directory is required to be used by npm install
  RUN mkdir /home/node/app
  WORKDIR /home/node/app

  # Copy all project files to the container
  # Files in the location of this file are copied to WORKDIR in the container
  COPY . .
  
  # Makes sure npm is up to date otherwise install dependencies attempts will fail
  RUN npm install -g npm

  # Install dependencies
  RUN npm install
  EXPOSE 3000
  # The process this container should run
  CMD ["npm", "start"]