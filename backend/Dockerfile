FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package-lock.json package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]
