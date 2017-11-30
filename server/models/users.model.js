'use strict';
module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('users',
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            mobile: {
                type: DataTypes.STRING,
                unique: {
                    msg: 'mobile_unique',
                },
                validate: {
                    notEmpty: {
                        msg: 'mobile_required'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: {
                    msg: 'password_not_null'
                },
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            registrationId: DataTypes.STRING,
            lastLoginAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            isLocked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        },
        {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                    models.users.hasOne(models.userInfos, {
                        foreignKey: 'userUUID'
                    })
                }
            }
        });

    return users;
};