FROM node:lts-alpine as build

RUN mkdir app
WORKDIR /app
COPY . .
RUN npm i --force
RUN npm run build
RUN npm i --omit=dev --force --freeze

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000

CMD npm start