const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project');
const User = require('./user');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: 'id',
    },
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

User.hasMany(Task, { foreignKey: 'assignedTo' });
Task.belongsTo(User, { foreignKey: 'assignedTo' });

module.exports = Task;
