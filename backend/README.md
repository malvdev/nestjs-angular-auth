# Backend

NestJS JWT authentication service.

## Configuration

Environment configuration in `.env`file

## Installation

```bash
$ npm install
```

## Running the api

```bash
$ docker-compose up --build
```

```bash
# you can stop the Docker container with
$ docker-compose down
```

After completing the above steps, the API should be running.

- Browse `Swagger Open API` Doc at [http://localhost:3000/docs](http://localhost:3000/docs)
- Browse (for Docker only) DB `Adminer` at [http://localhost:8080](http://localhost:8080)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
