FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json* package-lock.json* ./
RUN npm install && npm i -g @angular/cli
COPY . .
EXPOSE 4200
ENTRYPOINT [ "npm", "run", "start" ]
