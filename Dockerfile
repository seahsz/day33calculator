FROM node:23 AS builder

WORKDIR /compiledDir

# Installing angular
RUN npm install -g @angular/cli

# Copying over necessary files
COPY src src
COPY public public
COPY angular.json .
COPY package-lock.json .
COPY package.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .

# Install node_modules (with ci - clean install)
RUN npm ci

RUN ng build

FROM caddy:2.9.1 

WORKDIR /myapp

# # Copy browser dir
COPY --from=builder /compiledDir/dist/day33calculator/browser browser

# # Copy Caddyfile
COPY Caddyfile .

EXPOSE 8080

SHELL [ "/bin/sh", "-c" ]
ENTRYPOINT caddy run --config ./Caddyfile
