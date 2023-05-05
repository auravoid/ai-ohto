FROM node:latest

RUN apt-get update && apt-get install -y

WORKDIR /usr/src/app

RUN git clone https://github.com/auravoid/ai-ohto .
RUN yarn install

COPY .env ./

CMD ["yarn", "start"]
