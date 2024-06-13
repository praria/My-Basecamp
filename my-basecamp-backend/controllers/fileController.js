const File = require('../models/file');
const Project = require('../models/project');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

exports.upload = upload;

exports.uploadFile = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { filename, mimetype, size, path: filePath } = req.file;
    const file = await File.create({
      filename,
      path: filePath,
      mimetype,
      size,
      projectId
    });

    res.status(201).json(file);
  } catch (error) {
    console.error('Failed to upload file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

exports.downloadFile = async (req, res) => {
    try {
      const { fileId } = req.params;
      const file = await File.findByPk(fileId);
  
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      const filePath = path.resolve(file.path);
      res.download(filePath, file.filename, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).json({ error: 'Failed to download file' });
        }
      });
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
  
      const filePath = path.resolve(file.path);
  
      // Delete the file from the filesystem
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error('Failed to delete file from filesystem:', err);
          return res.status(500).json({ error: 'Failed to delete file from filesystem' });
        }
  
        // Delete the file record from the database
        await file.destroy();
        res.status(204).send();
      });
    } catch (error) {
      console.error('Failed to delete file:', error);
      res.status(500).json({ error: 'Failed to delete file' });
    }
  };