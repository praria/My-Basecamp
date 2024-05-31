const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Upload a file
router.post('/projects/:projectId/files', fileController.uploadFile);

// Download a file
router.get('/files/:fileId/download', fileController.downloadFile);

// Delete a file
router.delete('/files/:fileId', fileController.deleteFile);

// Get files by project
router.get('/projects/:projectId/files', fileController.getFilesByProject);

module.exports = router;
