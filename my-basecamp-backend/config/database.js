const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_STORAGE || 'database.sqlite',
  retry: {
    match: [/SQLITE_BUSY/],
    name: 'query',
    max: 5 // Retry up to 5 times
  },
  logging: console.log, // Enable logging for debugging
});

module.exports = sequelize;
