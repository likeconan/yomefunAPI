'use strict';

const uuidv4 = require('uuid/v4')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        uuid: uuidv4(),
        mobile: '15123456789',
        password: 'yomeAdmin@123',
        role: 'superAdmin',
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
