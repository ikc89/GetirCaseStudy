FROM node:14.17.5-slim

COPY . /app

WORKDIR /app

RUN npm install

COPY . .

CMD ["node", "./dist/app.js"]