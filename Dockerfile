FROM node:16
RUN apt-get update && apt-get install -y \
    php-cli \
    php-curl
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
CMD [ "npm", "start" ]