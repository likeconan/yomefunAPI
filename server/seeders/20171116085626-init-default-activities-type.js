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
        name: 'party',
        imageUrl: 'default/in-out-activity.jpg',
        isAvaliable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        name: 'travel',
        imageUrl: 'default/trip.jpg',
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
