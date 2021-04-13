
FROM node:12-alpine as build

WORKDIR /app

RUN apk add git python3 build-base

COPY . /app

RUN if [ -e /app/package-lock.json ]; \
  then \
    echo 'Running npm ci...' && npm ci; \
  else \
    echo 'Running npm install' && npm install; \
fi

RUN npm run build

EXPOSE 3000

# start the app
CMD [ "npm", "start" ]
