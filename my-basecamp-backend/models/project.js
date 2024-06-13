const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Referencing the table name directly to avoid circular dependency
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'Projects',
});

module.exports = Project;
