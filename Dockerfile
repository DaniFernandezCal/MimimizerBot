FROM node:14-alpine as node

WORKDIR /mimimizer
COPY . .
RUN npm i
CMD ["node", "dist/src/index.js"]