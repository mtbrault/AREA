FROM node:9.6.1

WORKDIR /usr/src/native

COPY package*.json ./

RUN npm install
RUN wget "https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40mtbrault/mobile-a0f0bafeb5db42b89a1b42794ff83eac-signed.apk"

COPY . .

CMD ["npm", "start"]