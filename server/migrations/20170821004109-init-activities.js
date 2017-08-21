'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('activities', {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      textContent: {
        type: Sequelize.STRING
      },
      userUUID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      startedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cost: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      activityTypeUUID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'activityTypes',
          key: 'uuid'
        }
      },
      costType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING
      },
      isAuthorize: {
        type: Sequelize.BOOLEAN
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
    queryInterface.dropTable('activities');
  }
};
