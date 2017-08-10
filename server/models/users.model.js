'use strict';
module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define('users',
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            nickName: DataTypes.STRING,
            password: {
                allowNull: false,
                type: DataTypes.STRING
            },
            goingOn: DataTypes.STRING,
            school: DataTypes.STRING,
            work: DataTypes.STRING,
            backPic: DataTypes.STRING,
            headPic: DataTypes.STRING,
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
            birthday: DataTypes.DATE,
            wechat: {
                type: DataTypes.STRING,
                unique: {
                    msg: 'wechat_unique'
                },
                validate: {
                    notEmpty: {
                        msg: 'wechat_required'
                    }
                }
            },
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

                }
            }
        });

    return Users;
};