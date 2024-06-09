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

// Admin-specific functions
const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.destroy({ where: { id: userId } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    await User.update({ role }, { where: { id: userId } });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

const readUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read user' });
  }
};

const assignAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.update({ role: 'admin' }, { where: { id: userId } });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign admin role' });
  }
};

const revokeAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.update({ role: 'regular_user' }, { where: { id: userId } });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to revoke admin role' });
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUserRole,
  readUser,
  assignAdmin,
  revokeAdmin,
  register,
  login
};
