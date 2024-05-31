const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project');

const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  }
}, {
  timestamps: true,
});

Project.hasMany(File, { foreignKey: 'projectId' });
File.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = File;
