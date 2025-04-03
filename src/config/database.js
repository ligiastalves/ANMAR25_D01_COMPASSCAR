require ('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'compasscar',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: console.log,
  });
  
  module.exports = sequelize;