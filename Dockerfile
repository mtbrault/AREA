# base image
FROM node:9.6.1

RUN mkdir /usr/src/api
WORKDIR /usr/src/api

ENV PATH /usr/src/api/node_modules/.bin:$PATH

COPY package.json /usr/src/api/package.json

EXPOSE 8080

RUN npm install

CMD npm run dev
