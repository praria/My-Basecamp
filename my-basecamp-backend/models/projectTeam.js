const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectTeam = sequelize.define('ProjectTeam', {
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Projects', // Referencing the table name directly to avoid circular dependency
      key: 'id',
    },
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Referencing the table name directly to avoid circular dependency
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  timestamps: true,
  tableName: 'ProjectTeams',
});

module.exports = ProjectTeam;
