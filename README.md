## The example of simple user auth API [![build status](https://github.com/4-life/backend-ts/actions/workflows/main.yml/badge.svg)](https://github.com/4-life/backend-ts/actions/workflows/main.yml)

The codebase consists of a basic NodeJS project with simple `Sequelize` models, `Express.js` routes, and integration tests.

A db connection to a local SQLite storage is already setup and all required tables (`Users` and `Contacts`), mapping the `sequelize` models, are in place.

The list of [API routes](https://github.com/4-life/backend-ts/blob/master/src/routes.ts)
 
### Tests

The `Auth` tests check endpoints for user sign-up and login, including verifying that protected routes are not accessible without authentication.
The `CRUD` tests are independent from the `Auth` tests. They verify CRUD operations on the `Contacts` table.

Test [results](https://github.com/4-life/backend-ts/actions/workflows/main.yml)

### Pre-requisites

- Node
- Yarn

### Setup
Install the dependencies.
```$sh
yarn
```

### Run
Run the NodeJs backend locally.
```$sh
yarn dev
```

### Test
Execute the tests
```$sh
yarn test
yarn unit-test
```

