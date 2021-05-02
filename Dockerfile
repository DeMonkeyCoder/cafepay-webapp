
FROM node:12-alpine as build

WORKDIR /app

RUN apk add bash git python3 build-base

RUN npm install pm2 -g

COPY package.json /app
RUN npm install --production
COPY . /app

EXPOSE 3000

RUN npm run build

# start the app
CMD [ "rm", "-rf", "~/.pm2"]
CMD [ "pm2-runtime", "pm2.config.js"]