FROM node:lts-alpine

RUN mkdir app
WORKDIR /app
COPY . .
RUN npm ci --force
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]