FROM node:current-alpine3.20 AS buildimage

# Passed from Github Actions
ARG GIT_VERSION_TAG=unspecified
ARG GIT_COMMIT_MESSAGE=unspecified
ARG GIT_VERSION_HASH=unspecified

RUN apk add curl && \
    apk update && \
    apk upgrade && \
    npm install -g node-prune

WORKDIR /usr/src/app

RUN echo $GIT_VERSION_TAG > GIT_VERSION_TAG.txt
RUN echo $GIT_COMMIT_MESSAGE > GIT_COMMIT_MESSAGE.txt
RUN echo $GIT_VERSION_HASH > GIT_VERSION_HASH.txt

COPY . .

COPY package*.json ./
RUN npm install --package-lock && \
    npm run-script build && \
    npm test && \
    npm prune --production

FROM node:current-alpine3.20

WORKDIR /usr/src/app

COPY --from=buildimage /usr/src/app/dist ./dist
COPY --from=buildimage /usr/src/app/node_modules ./node_modules

EXPOSE 3000
LABEL name="calc-app"

CMD ["node", "./dist/main.js"]
