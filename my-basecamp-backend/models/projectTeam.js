const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectTeam = sequelize.define('ProjectTeam', {
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Projects',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  timestamps: true,
  tableName: 'ProjectTeams',
  uniqueKeys: {
    unique_project_user: {
      fields: ['projectId', 'userId']
    }
  },
});

module.exports = ProjectTeam;
