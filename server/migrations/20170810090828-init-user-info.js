'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('userInfos', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userUUID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      nickName: {
        type: Sequelize.STRING(20)
      },
      goingOn: {
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.STRING
      },
      work: {
        type: Sequelize.STRING
      },
      backPic: {
        type: Sequelize.STRING
      },
      headPic: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      wechat: {
        type: Sequelize.STRING,
        unique: true
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
    queryInterface.dropTable('userInfos');
  }
};
