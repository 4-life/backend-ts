'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'username',
      password: '123',
      email: 'user@email.com'
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
