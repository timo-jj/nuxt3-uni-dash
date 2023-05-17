FROM node:14-alpine

WORKDIR /uni-dash

RUN apk update && apk upgrade
RUN apk add git

COPY ./package*.json /uni-dash/

RUN npm install && npm cache clean --force

COPY . .

ENV PATH ./node_modules/.bin/:$PATH