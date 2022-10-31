const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Track = sequelize.define('track', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trackId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true
    });

    return Track;
};