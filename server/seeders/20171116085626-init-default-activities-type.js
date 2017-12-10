'use strict';

const uuidv4 = require('uuid/v4')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('activityTypes', [
      {
        uuid: uuidv4(),
        name: 'movie',
        imageUrl: 'default/movie.jpg',
        isAvaliable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        name: 'food',
        imageUrl: 'default/movie.jpg',
        isAvaliable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        name: 'entertainment',
        imageUrl: 'default/entertainment.jpg',
        isAvaliable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        name: 'study',
        imageUrl: 'default/study.jpg',
        isAvaliable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('activityTypes', null, {});
  }
};
