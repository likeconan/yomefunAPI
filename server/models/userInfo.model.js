'use strict';
module.exports = function (sequelize, DataTypes) {
    var userInfos = sequelize.define('userInfos',
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
                },
            },
            nickName: DataTypes.STRING,
            goingOn: DataTypes.STRING,
            school: DataTypes.STRING,
            work: DataTypes.STRING,
            backPic: DataTypes.STRING,
            headPic: DataTypes.STRING,
            birthday: DataTypes.DATE,
            wechat: {
                type: DataTypes.STRING,
                unique: {
                    msg: 'wechat_unique'
                }
            },
        },
        {
            associate: function (models) {
                models.userInfos.belongsTo(models.users, {
                    foreignKey: 'userUUID'
                })
            }
        }
    );

    return userInfos;
};