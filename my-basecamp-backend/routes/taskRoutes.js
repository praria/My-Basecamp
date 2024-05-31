const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams allows access to projectId
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:taskId', authMiddleware, taskController.getTaskById);
router.put('/:taskId', authMiddleware, taskController.updateTask);
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;
