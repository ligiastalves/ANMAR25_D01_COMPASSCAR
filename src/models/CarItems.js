const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Car = require('./Car');

const CarItems = sequelize.define(
    'CarItems',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: { type: DataTypes.STRING, allowNull: false },
        car_id: { type: DataTypes.INTEGER, allowNull: false, references: {model: Car, key: 'id'}},
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    },
    {
        tableName: 'cars_items', timestamps: false
    },
);

//Relation
Car.hasMany(CarItems, { foreignKey: 'car_id'});
CarItems.belongsTo(Car, { foreignKey: 'car_id'});

module.exports = CarItems;