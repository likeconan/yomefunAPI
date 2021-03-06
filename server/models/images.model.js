'use strict';
module.exports = function (sequelize, DataTypes) {
    var images = sequelize.define('images',
        {
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            url: {
                allowNull: false,
                type: DataTypes.STRING
            },
            path: {
                allowNull: false,
                type: DataTypes.STRING
            },
            imageType: {
                allowNull: false,
                type: DataTypes.STRING
            },
            from: {
                allowNull: false,
                type: DataTypes.STRING
            },
            relatedId: {
                allowNull: false,
                type: DataTypes.UUID,
            }
        },
        {
            associate: function (models) {
                // associations can be defined here
            }
        });
    return images;
};