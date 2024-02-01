## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Build the app

```bash
$ npm run build
```

## Run migrations

```bash
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Users

After running migrations, the system will automatically create two users and a default Parking Spot.

**Admin User**

- Permissions: Admin
- API Token: Check the "token" column in the users table (not encrypted for simplicity).

**Standard User**

- Permissions: Standard
- API Token: Check the "token" column in the users table (not encrypted for simplicity).

## Authentication

- Each request should be done sending the following headers:
  `api_token {token}`

## Parking Spot

A default Parking Spot with ID 1 will be created.

## Accessing API

- The Swagger Documentation and API endpoints can be accessed through the `/api` route.
- API requests can be made through the following link to [Postman](https://api.postman.com/collections/23196460-e431cacf-ed7f-4f85-ac26-248d8099c17e?access_key=PMAT-01HNJJ3FHFNSVC12TE5HQM7X5F) to test and visualize responses.

## Environment file

For optimal setup, ensure you have an environment file at the root level.

1. Create an environment file named .env at the root of your project.
2. Add any necessary environment variables in this file, such as API keys, database connection strings, etc.

### Environment file example

There is an _.env.example_ file that can be used as a reference.

## Node Version

This project is developed using Node.js. It is recommended to use Node.js version 18.12.1 or later.

## Technologies Used

- Framework [NestJS](https://nestjs.com/). Version 9.1.8
- ExpressJS
- Postgres
- Typeorm. Version ^0.3.20
- Typescript. Version "^4.7.4"

## Stay in touch

- Author - Juan Ignacio Benito
- [Linkedin](https://www.linkedin.com/in/juan-ignacio-benito-861127163)
- Email - benitojuanignacio@gmail.com
