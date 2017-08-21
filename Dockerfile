FROM mhart/alpine-node:8

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

#revisar redis-server
RUN apk update && apk add redis

EXPOSE 3000 6379

CMD [ "npm", "run","dev" ]