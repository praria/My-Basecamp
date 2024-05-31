const File = require('../models/file');
const Project = require('../models/project');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

exports.uploadFile = [
  upload.single('file'),
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findByPk(projectId);

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const file = await File.create({
        filename: req.file.originalname,
        path: req.file.path,
        projectId: projectId
      });

      res.status(201).json(file);
    } catch (error) {
      console.error('Failed to upload file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  }
];

exports.downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(file.path, file.filename);
  } catch (error) {
    console.error('Failed to download file:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(file.path);
    await file.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete file:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
};

exports.getFilesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const files = await File.findAll({ where: { projectId: projectId } });

    if (!files.length) {
      return res.status(404).json({ error: 'No files found for this project' });
    }

    res.status(200).json(files);
  } catch (error) {
    console.error('Failed to retrieve files:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
};
