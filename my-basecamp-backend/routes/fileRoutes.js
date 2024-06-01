const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');


router.post('/projects/:projectId/files/upload', fileController.uploadFile);
router.get('/files/:fileId/download', fileController.downloadFile);
router.delete('/files/:fileId', fileController.deleteFile);


module.exports = router;
