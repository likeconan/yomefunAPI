'use strict';
module.exports = function (sequelize, DataTypes) {
    var activityTypes = sequelize.define('activityTypes',
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            imageUrl: {
                allowNull: false,
                type: DataTypes.STRING
            },
            isAvaliable: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        },
        {
           
        });
    return activityTypes;
};