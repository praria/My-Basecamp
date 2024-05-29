// define routes for projects and protect them with auth.js
// project routes integrated with authentication middleware . Only authenticated users can access the project-related endpoints.
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, projectController.createProject);
router.put('/:projectId', authMiddleware, projectController.updateProject);
router.get('/', authMiddleware, projectController.getAllProjects);
router.get('/:projectId', authMiddleware, projectController.getProjectById);
router.delete('/:projectId', authMiddleware, projectController.deleteProject);

module.exports = router;