require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'compasscar',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql', 
  logging: console.log, // Displays queries in the terminal
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Tables synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing tables:', error);
  }
};

testConnection();

module.exports = sequelize;

//importing the routes
const express = require('express');
const cors = require('cors');
const carRoutes = require('./src/routes/carRoutes');

require('dotenv').config();
require('./index');

const app = express();
app.use(cors());
app.use(express.json());
app.use(carRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));