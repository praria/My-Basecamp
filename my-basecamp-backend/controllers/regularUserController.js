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

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { username, password } = req.body;
  try {
    const updates = { username };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }
    await User.update(updates, { where: { id: req.user.id } });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Get projects assigned to the user
exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: User,
        as: 'members',
        where: { id: req.user.id }
      }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get projects' });
  }
};

// Get tasks assigned to the user
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { assignedTo: req.user.id }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tasks' });
  }
};

// Update task assigned to the user
exports.updateUserTask = async (req, res) => {
  const { taskId } = req.params;
  const { status, description } = req.body;
  try {
    const task = await Task.findOne({ where: { id: taskId, assignedTo: req.user.id } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.status = status || task.status;
    task.description = description || task.description;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Upload file
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const { originalname, filename, path: filePath, size } = req.file;
    const file = await File.create({ originalname, filename, path: filePath, size, userId: req.user.id });
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

// Download file
exports.downloadFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await File.findOne({ where: { id: fileId, userId: req.user.id } });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.download(file.path, file.originalname);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
};

// Delete file
exports.deleteFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await File.findOne({ where: { id: fileId, userId: req.user.id } });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    await fs.promises.unlink(file.path);
    await file.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
};