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
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
});

Project.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Project.belongsToMany(User, { through: 'ProjectMembers', as: 'members' });

const File = require('./file');
Project.hasMany(File, { foreignKey: 'projectId', as: 'files' });
File.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });


module.exports = Project;
