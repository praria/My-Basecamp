import React, { useState, useEffect } from 'react';
import { createTask, getTasks, updateTask, deleteTask } from '../../services/api';
import { Container, Typography, Button, TextField, List, ListItem, Box, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ projectId: '', title: '', description: '', status: '', dueDate: '', assignedTo: '' });
  const [editTask, setEditTask] = useState(null);
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    if (projectId) {
      loadTasks(projectId);
    }
  }, [projectId]);

  const loadTasks = async (projectId) => {
    try {
      const response = await getTasks(projectId);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks', error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await createTask(newTask.projectId, newTask.title, newTask.description, newTask.status, newTask.dueDate, newTask.assignedTo);
      loadTasks(newTask.projectId);
      setNewTask({ projectId: '', title: '', description: '', status: '', dueDate: '', assignedTo: '' });
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(editTask.id, editTask.projectId, { title: editTask.title, description: editTask.description, status: editTask.status, dueDate: editTask.dueDate, assignedTo: editTask.assignedTo });
      loadTasks(editTask.projectId);
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDeleteTask = async (projectId, taskId) => {
    try {
      await deleteTask(projectId, taskId);
      loadTasks(projectId);
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Task Management</Typography>
      <TextField
        label="Project ID for Loading Tasks"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}        
      />
      <div>
        <TextField
          label="Project ID"
          value={newTask.projectId}
          onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}         
        />
        <TextField
          label="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          label="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <TextField
          label="Task Status"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        />
        <TextField
          label="Due Date"
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Assigned To"
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleCreateTask} fullWidth>
          Create Task
        </Button>
      </div>
      {editTask && (
        <div>
          <TextField
            label="Edit Project ID"
            value={editTask.projectId}
            onChange={(e) => setEditTask({ ...editTask, projectId: e.target.value })}
          />
          <TextField
            label="Edit Task Title"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
          />
          <TextField
            label="Edit Task Description"
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
          />
          <TextField
            label="Edit Task Status"
            value={editTask.status}
            onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
          />
          <TextField
            label="Edit Due Date"
            type="date"
            value={editTask.dueDate}
            onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Edit Assigned To"
            value={editTask.assignedTo}
            onChange={(e) => setEditTask({ ...editTask, assignedTo: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateTask} fullWidth>
            Update Task
          </Button>
        </div>
      )}
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Box display="flex" flexDirection="column" width="100%" justifyContent="space-between">
              <ListItemText
                primary={task.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary" sx={{ marginRight: 2, marginBottom: 1 }}>
                      {`Description: ${task.description}`}
                    </Typography>
                    <Typography component="span" variant="body2" color="textPrimary" sx={{ marginRight: 2, marginBottom: 1 }}>
                      {`Status: ${task.status}`}
                    </Typography>                    
                    <Typography component="span" variant="body2" color="textPrimary" sx={{ marginRight: 2, marginBottom: 1 }}>
                      {`Assigned To: ${task.assignedTo}`}
                    </Typography>
                    <Typography component="span" variant="body2" color="textPrimary" sx={{ marginRight: 2, marginBottom: 1 }}>
                      {`Project ID: ${task.projectId}`}
                      </Typography>
                    <Typography component="span" variant="body2" color="textPrimary" sx={{ marginRight: 2, marginBottom: 1 }}>
                      {`Due Date: ${task.dueDate}`}
                    </Typography>
                  </>
                }
              />
              <Box display="flex" justifyContent="flex-end">
                <IconButton edge="end" aria-label="edit" onClick={() => setEditTask(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.projectId, task.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskManagement;