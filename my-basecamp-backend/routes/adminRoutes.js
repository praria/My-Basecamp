const express = require('express');
const {
  readAllUsers,
  getTeamMembersByProject,
  createUser,
  deleteUser,
  updateUserRole,
  readUser,
  assignAdmin,
  revokeAdmin,
  register,
  login
} = require('../controllers/adminController');

const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', authenticate, authorize(['admin']), register);
router.post('/login', login);

// Admin routes
router.post('/', authenticate, authorize(['admin']), createUser);
router.get('/users', authenticate, authorize(['admin']), readAllUsers);
router.delete('/:userId', authenticate, authorize(['admin']), deleteUser);
router.put('/:userId/role', authenticate, authorize(['admin']), updateUserRole);
router.put('/:userId/assignAdmin', authenticate, authorize(['admin']), assignAdmin);
router.put('/:userId/revokeAdmin', authenticate, authorize(['admin']), revokeAdmin);

router.get('/projects/:projectId/team', authenticate, authorize(['admin']), getTeamMembersByProject);

router.get('/:userId', authenticate, authorize(['admin']), readUser);

module.exports = router;
