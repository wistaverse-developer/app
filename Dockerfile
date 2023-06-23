FROM node:16
RUN apt-get update && apt-get install -y \
    php-cli \
    php-curl
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]
