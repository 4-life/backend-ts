'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Contacts', [{
      name: 'Jack',
      identify: '123'
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Contacts', null, {});
  }
};
