## Reustle.co coding challenge

The codebase consists of a basic NodeJS project with simple `sequelize` models, 2 mock Express.js routes, and integration tests.

A db connection to a local SQLite storage is already setup and all required tables (`Users` and `Contacts`), mapping the `sequelize` models, are in place.

The challenge is structured in two parts:
 
### Part 1 
Implement the missing API endpoints so that tests in `src/tests/` folder will pass. 

The `Auth` tests check endpoints for user sign-up and login, including verifying that protected routes are not accessible without authentication.
The `CRUD` tests are independent from the `Auth` tests. They verify CRUD operations on the `Contacts` table.

You should use `sequelize` and `express.js` libraries but you're free to add any other library needed to finalize the test.

### Part 2
Write 2 **unit tests**, testing code of your choice in this project. You can pick between already existing code or code that you wrote for part 1.  

### Guidelines
Problems are not designed to be hard or tricky. You should not waste time looking for hidden patterns.

Please don't post problems and solutions publicly (on github or similar).

If there's something we should clarify or help with, please don't hesitate to ask.

Please use inline comments wherever you see fit to explain why you made certain coding decisions.

The codebase is a Git repo, so please commit your changes locally before delivering the coding challenge as a compressed archive.

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

