const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getUserProjects,
  getUserTasks,
  updateUserTask,
  uploadFile,
  downloadFile,
  deleteFile
} = require('../controllers/regularUserController');  // Corrected controller import
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authenticate, authorize(['regular_user', 'admin']), getUserProfile);
router.put('/profile', authenticate, authorize(['regular_user', 'admin']), updateUserProfile);

router.get('/projects', authenticate, authorize(['regular_user', 'admin']), getUserProjects);
router.get('/tasks', authenticate, authorize(['regular_user', 'admin']), getUserTasks);
router.put('/tasks/:taskId', authenticate, authorize(['regular_user', 'admin']), updateUserTask);

router.post('/files', authenticate, authorize(['regular_user', 'admin']), uploadFile);
router.get('/files/:fileId', authenticate, authorize(['regular_user', 'admin']), downloadFile);
router.delete('/files/:fileId', authenticate, authorize(['regular_user', 'admin']), deleteFile);

module.exports = router;
