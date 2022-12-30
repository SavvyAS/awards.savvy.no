FROM node:18-alpine AS dependencies
ARG font_awesome_token
ENV FONT_AWESOME_TOKEN=$font_awesome_token
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY .npmrc ./
RUN yarn install

FROM node:18-alpine as build
ARG font_awesome_token
ENV FONT_AWESOME_TOKEN=$font_awesome_token
WORKDIR /usr/src/app
COPY ./ ./
COPY --from=dependencies /usr/src/app/ ./
RUN yarn build:static

FROM nginx:latest as runtime
COPY --from=build /usr/src/app/out/ /usr/share/nginx/html
