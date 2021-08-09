FROM node:lts-alpine3.14

RUN mkdir app
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]