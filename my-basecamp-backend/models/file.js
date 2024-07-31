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
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id', // Reference the 'id' field in the Projects table
    },
  },
}, {
  timestamps: true,
  tableName: 'Files',
});

module.exports = File;
