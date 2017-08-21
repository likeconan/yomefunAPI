'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('recommended', {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      activityTypeUUID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'activityTypes',
          key: 'uuid'
        }
      },
      isAvailable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    queryInterface.dropTable('recommended');
  }
};
