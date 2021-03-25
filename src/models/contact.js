'use strict';
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
            identify: {type: DataTypes.STRING, unique: true},
            name: DataTypes.STRING
        },
        {
            timestamps: false,
        });
    Contact.associate = function (models) {
        // associations can be defined here
    };
    return Contact;
};