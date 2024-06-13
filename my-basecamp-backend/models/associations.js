const Project = require('./project');
const User = require('./allUser');
const ProjectTeam = require('./projectTeam');
const File = require('./file');

// Define associations
Project.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Project.belongsToMany(User, { through: ProjectTeam, as: 'members', foreignKey: 'projectId' });

User.belongsToMany(Project, { through: ProjectTeam, as: 'projects', foreignKey: 'userId' });

Project.hasMany(File, { foreignKey: 'projectId', as: 'files' });
File.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
