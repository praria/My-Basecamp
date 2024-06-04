const Project = require('../models/project');
const File = require('../models/file');
const User = require('../models/allUser'); // Assuming you have a User model
const fs = require('fs');
const path = require('path');

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = await Project.create({ name, description });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    await Project.destroy({ where: { id: projectId } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;
  try {
    await Project.update({ name, description }, { where: { id: projectId } });
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

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

exports.uploadFile = async (req, res) => {
  const { projectId } = req.params;
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const file = await File.create({
      projectId,
      filename: req.file.filename,
      path: req.file.path,
    });
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

exports.downloadFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.download(file.path, file.filename);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
};

exports.deleteFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    fs.unlinkSync(file.path);
    await file.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
};
