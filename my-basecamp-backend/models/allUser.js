const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'project_manager', 'regular_user'),
    defaultValue: 'regular_user',
  },
}, {
  timestamps: true,
  tableName: 'Users',
});

module.exports = User;
