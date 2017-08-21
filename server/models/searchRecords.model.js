'use strict';
module.exports = function (sequelize, DataTypes) {
    var searchRecords = sequelize.define('searchRecords',
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            userUUID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'uuid'
                }
            },
            activityTypeUUID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'activityTypes',
                    key: 'uuid'
                }
            },
            text: {
                type: DataTypes.STRING
            },
        },
        {
            associate: function (models) {
                // associations can be defined here
                models.searchRecords.belongsTo(models.users, {
                    foreignKey: 'userUUID'
                })
                models.searchRecords.belongsTo(models.activityTypes, {
                    foreignKey: 'activityTypeUUID'
                })
            }
        });
    return searchRecords;
};