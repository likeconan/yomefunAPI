'use strict';
module.exports = function (sequelize, DataTypes) {
    var activities = sequelize.define('activities', {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        textContent: {
            type: DataTypes.STRING
        },
        userUUID: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'uuid'
            }
        },
        startedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        cost: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2)
        },
        activityTypeUUID: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'activityTypes',
                key: 'uuid'
            }
        },
        costType: {
            allowNull: false,
            type: DataTypes.STRING,
            // 1 for AA; 2 for myTreat; 3 for free
        },
        status: {
            type: DataTypes.STRING
            //1 for created; 2 for inprogress; 3 for success; 4 for failed
        },
        isAuthorize: {
            type: DataTypes.BOOLEAN
        },
    },
        {
            associate: function (models) {
                // associations can be defined here
                models.activities.belongsTo(models.users, {
                    foreignKey: 'userUUID'
                });
                models.activities.belongsTo(models.activityTypes, {
                    foreignKey: 'activityTypeUUID'
                });

                models.activities.hasMany(models.images, {
                    foreignKey: 'relatedId',
                    constraints: false
                });

            }

        });
    return activities;
};