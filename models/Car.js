const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Car = sequelize.define(
    'Car',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        brand: { type: DataTypes.STRING, allowNull: false},
        model: { type: DataTypes.STRING, allowNull: false},
        plate: {type: DataTypes.STRING, allowNull: false},
        year: {type: DataTypes.INTEGER, allowNull: false},
        created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    },

    {tableName: 'cars', timestamps: false}
);

module.exports = Car;