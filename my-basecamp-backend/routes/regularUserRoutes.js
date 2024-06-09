const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getUserProjects,
  getUserTasks
} = require('../controllers/regularUserController');  
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authenticate, authorize(['regular_user', 'admin']), getUserProfile);
router.put('/profile', authenticate, authorize(['regular_user', 'admin']), updateUserProfile);

router.get('/tasks', authenticate, authorize(['regular_user', 'admin']), getUserTasks);


module.exports = router;
