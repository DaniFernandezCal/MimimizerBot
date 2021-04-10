FROM node:14-alpine as node

WORKDIR /mimimizer
COPY . .
RUN npm i
RUN npm run prepare
CMD ["node", "dist/src/index.js"]