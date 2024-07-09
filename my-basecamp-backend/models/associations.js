const User = require('./allUser');
const Project = require('./project');
const File = require('./file');
const ProjectTeam = require('./projectTeam');
const Task = require('./task');

// Define associations
Project.belongsTo(User, { foreignKey: 'ownerId' });
Project.hasMany(File, { foreignKey: 'projectId' });
File.belongsTo(Project, { foreignKey: 'projectId' });

Project.belongsToMany(User, { through: ProjectTeam, as: 'teamMembers', foreignKey: 'projectId' });
User.belongsToMany(Project, { through: ProjectTeam, as: 'projects', foreignKey: 'userId' });

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = {
  User,
  Project,
  File,
  ProjectTeam,
  Task
};
