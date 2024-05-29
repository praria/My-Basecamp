const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_STORAGE || 'database.sqlite',
  logging: console.log, // Enable logging for debugging
});

module.exports = sequelize;
