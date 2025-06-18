FROM node:20-alpine

COPY . .

WORKDIR /app

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]