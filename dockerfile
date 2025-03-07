FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

EXPOSE 8080

CMD ["node", "./src/server.js"]