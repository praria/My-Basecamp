const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows access to projectId
const task = require('../controllers/taskController');

const {authenticate, authorize} = require('../middleware/auth');


router.post('/', authenticate, authorize(['admin', 'program_manager', 'regular_user']), task.createTask);
router.get('/', authenticate, authorize(['admin', 'program_manager', 'regular_user']), task.getAllTasks);
router.get('/:taskId', authenticate, authorize(['admin', 'program_manager', 'regular_user']), task.getTaskById);
router.put('/:taskId', authenticate, authorize(['admin', 'program_manager', 'regular_user']), task.updateTask);
router.delete('/:taskId', authenticate, authorize(['admin', 'program_manager', 'regular_user']), task.deleteTask);

module.exports = router;

