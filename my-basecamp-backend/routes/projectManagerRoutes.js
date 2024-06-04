const express = require('express');
const {
  createProject,
  deleteProject,
  updateProject,
  addTeamMember,
  removeTeamMember,
  uploadFile,
  downloadFile,
  deleteFile
} = require('../controllers/projectManagerController'); // Corrected controller file
const { authenticate, authorize } = require('../middleware/auth'); // Corrected middleware path

const router = express.Router();

// Project routes
router.post('/', authenticate, authorize(['admin', 'project_manager']), createProject);
router.delete('/:projectId', authenticate, authorize(['admin', 'project_manager']), deleteProject);
router.put('/:projectId', authenticate, authorize(['admin', 'project_manager']), updateProject);

// Team member routes
router.post('/:projectId/team', authenticate, authorize(['admin', 'project_manager']), addTeamMember);
router.delete('/:projectId/team/:userId', authenticate, authorize(['admin', 'project_manager']), removeTeamMember);

// File routes
router.post('/:projectId/files', authenticate, authorize(['admin', 'project_manager']), uploadFile);
router.get('/files/:fileId', authenticate, authorize(['admin', 'project_manager']), downloadFile);
router.delete('/files/:fileId', authenticate, authorize(['admin', 'project_manager']), deleteFile);

module.exports = router;
