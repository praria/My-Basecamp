const express = require('express');
const { uploadFile, getAllFiles, downloadFile, deleteFile } = require('../controllers/fileController');
const { authenticate, authorize } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const router = express.Router();

// route is protected with authentication and authorization middleware
router.post('/:projectId/upload', authenticate, authorize(['admin', 'project_manager', 'regular_user']), upload.single('file'), uploadFile);
router.get('/', getAllFiles);
router.get('/:fileId/download', authenticate, downloadFile);
router.delete('/:fileId', authenticate, authorize(['admin', 'project_manager']), deleteFile);

module.exports = router;
