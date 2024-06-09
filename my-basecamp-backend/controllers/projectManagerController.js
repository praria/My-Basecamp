const User = require('../models/allUser');
const Project = require('../models/project');
const Task = require('../models/task');
const File = require('../models/file');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// import functions from other controllers 
const { register, login } = require('./allUserController');
const { createProject, deleteProject, updateProject } = require('./projectController');
const { createTask, deleteTask, updateTask } = require('./taskController');
const { uploadFile, downloadFile, deleteFile } = require('./fileController');

exports.addTeamMember = async (req, res) => {
  const { projectId, userId } = req.params;
  try {
    const project = await Project.findByPk(projectId);
    const user = await User.findByPk(userId);
    if (!project || !user) {
      return res.status(404).json({ error: 'Project or user not found' });
    }
    await project.addUser(user); // Assuming a many-to-many relationship between projects and users
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to add team member' });
  }
};

exports.removeTeamMember = async (req, res) => {
  const { projectId, userId } = req.params;
  try {
    const project = await Project.findByPk(projectId);
    const user = await User.findByPk(userId);
    if (!project || !user) {
      return res.status(404).json({ error: 'Project or user not found' });
    }
    await project.removeUser(user); // Assuming a many-to-many relationship between projects and users
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove team member' });
  }
};