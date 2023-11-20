FROM node:18-alpine 

WORKDIR /var/www/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build 

# RUN rm -r /var/www/app/*

# RUN cp -a dist/. /var/www/app