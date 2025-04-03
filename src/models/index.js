const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); 

const Car = require('./Car'); 
const CarItems = require('./CarItems');

const db = {
  sequelize,
  Sequelize,
  Car,
  CarItems,
};

module.exports = db;