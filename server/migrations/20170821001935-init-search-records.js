'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('searchRecords', {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      userUUID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      activityTypeUUID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'activityTypes',
          key: 'uuid'
        }
      },
      text: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('searchRecords');
  }
};
