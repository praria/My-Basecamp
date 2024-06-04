const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows access to projectId
const task = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');


router.post('/', authMiddleware, task.createTask);
router.get('/', authMiddleware, task.getAllTasks);
router.get('/:taskId', authMiddleware, task.getTaskById);
router.put('/:taskId', authMiddleware, task.updateTask);
router.delete('/:taskId', authMiddleware, task.deleteTask);

module.exports = router;

