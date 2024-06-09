const express = require('express');
const {
  addTeamMember,
  removeTeamMember
} = require('../controllers/projectManagerController');

const { authenticate, authorize } = require('../middleware/auth'); 

const router = express.Router();

// Team member routes
router.post('/:projectId/team', authenticate, authorize(['admin', 'project_manager']), addTeamMember);
router.delete('/:projectId/team/:userId', authenticate, authorize(['admin', 'project_manager']), removeTeamMember);

module.exports = router;
