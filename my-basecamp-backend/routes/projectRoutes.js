// define routes for projects and protect them with auth.js
// project routes integrated with authentication middleware . Only authenticated users can access the project-related endpoints.
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
// const authMiddleware = require('../middleware/auth');
const {authenticate, authorize} = require('../middleware/auth');
const taskRoutes = require('./taskRoutes');

router.post('/', authenticate, authorize(['admin', 'project_manager']), projectController.createProject);
router.put('/:projectId', authenticate, authorize(['admin', 'project_manager']), projectController.updateProject);
router.get('/', authenticate, authorize(['admin', 'project_manager', 'regular_user']), projectController.getAllProjects);
router.get('/:projectId', authenticate, authorize(['admin', 'project_manager', 'regular_user']), projectController.getProjectById);
router.delete('/:projectId', authenticate, authorize(['admin', 'project_manager']), projectController.deleteProject);

// Nest task routes under project routes
router.use('/:projectId/tasks', taskRoutes);

module.exports = router;