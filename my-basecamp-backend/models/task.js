const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project');
const User = require('./user');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
});

Task.belongsTo(Project);
Task.belongsTo(User, { as: 'assignee' });

module.exports = Task;

