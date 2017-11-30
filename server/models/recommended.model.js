'use strict';
module.exports = function (sequelize, DataTypes) {
    var recommended = sequelize.define('recommended',
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING
            },
            activityTypeUUID: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            isAvailable: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        },
        {
            associate: function (models) {
                // associations can be defined here
                models.recommended.belongsTo(models.activityTypes, {
                    foreignKey: 'activityTypeUUID'
                })
            }
        });
    return recommended;
};