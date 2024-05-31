const Task = require('../models/task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, assignedTo } = req.body;
    const { projectId } = req.params;
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      projectId,
      assignedTo,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Failed to create task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.findAll({ where: { projectId } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Failed to retrieve tasks:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const task = await Task.findOne({ where: { id: taskId, projectId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Failed to retrieve task:', error);
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, assignedTo } = req.body;
    const { projectId, taskId } = req.params;

    const task = await Task.findOne({ where: { id: taskId, projectId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    task.assignedTo = assignedTo || task.assignedTo;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error('Failed to update task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const result = await Task.destroy({ where: { id: taskId, projectId } });
    if (!result) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
