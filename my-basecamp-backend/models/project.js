const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
});

Project.belongsTo(User, { as: 'owner' });
Project.belongsToMany(User, { through: 'ProjectMembers', as: 'members' });

module.exports = Project;
