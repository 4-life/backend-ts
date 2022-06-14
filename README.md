## The example of simple user auth API

The codebase consists of a basic NodeJS project with `express.js` and simple `sequelize` models, 2 mock Express.js routes, and integration tests.

A db connection to a local SQLite storage is already setup and all required tables (`Users` and `Contacts`), mapping the `sequelize` models, are in place.
 
### Tests

The `Auth` tests check endpoints for user sign-up and login, including verifying that protected routes are not accessible without authentication.
The `CRUD` tests are independent from the `Auth` tests. They verify CRUD operations on the `Contacts` table.

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
```

