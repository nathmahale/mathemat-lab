FROM node:12-alpine AS BUILD_IMAGE

RUN apk add curl && \
    curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | sh -s -- -b /usr/local/bin

WORKDIR /usr/src/app
COPY . .

COPY package*.json ./
RUN npm install --package-lock && \
    npm run-script build && \
    npm test && \
    npm prune --production && \
    /usr/local/bin/node-prune

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

EXPOSE 3000
LABEL name="calc-app"

CMD ["node", "./dist/main.js"]
