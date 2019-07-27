FROM node:11-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN apk --no-cache add --virtual builds-deps build-base gcc g++ python
RUN npm install --no-cache --no-package-lock

COPY . .

EXPOSE 3000