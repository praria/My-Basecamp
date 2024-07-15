const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows access to projectId
const taskController = require('../controllers/taskController');

const {authenticate, authorize} = require('../middleware/auth');


router.post('/', authenticate, authorize(['admin', 'project_manager', 'regular_user']), taskController.createTask);
router.get('/', authenticate, authorize(['admin', 'project_manager', 'regular_user']), taskController.getAllTasks);
router.get('/:taskId', authenticate, authorize(['admin', 'project_manager', 'regular_user']), taskController.getTaskById);
router.put('/:taskId', authenticate, authorize(['admin', 'project_manager', 'regular_user']), taskController.updateTask);
router.delete('/:taskId', authenticate, authorize(['admin', 'project_manager', 'regular_user']), taskController.deleteTask);

module.exports = router;

