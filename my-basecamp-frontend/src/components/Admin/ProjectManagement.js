import React, { useState, useEffect } from 'react';
import { createProject, getProjects, updateProject, deleteProject } from '../../services/api';
import { Container, Typography, Button, TextField, List, ListItem, Box, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects', error);
    }
  };

  const handleCreateProject = async () => {
    try {
      await createProject(newProject.name, newProject.description);
      loadProjects();
      setNewProject({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating project', error);
    }
  };

  const handleUpdateProject = async () => {
    try {
      await updateProject(editProject.id, editProject.name, editProject.description );
      loadProjects();
      setEditProject(null);
    } catch (error) {
      console.error('Error updating project', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      loadProjects();
    } catch (error) {
      console.error('Error deleting project', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Project Management</Typography>
      <div>
        <TextField
          label="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Project Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleCreateProject} fullWidth>
          Create Project
        </Button>
      </div>
      {editProject && (
        <div>
          <TextField
            label="Edit Project Name"
            value={editProject.name}
            onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Edit Project Description"
            value={editProject.description}
            onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleUpdateProject} fullWidth>
            Update Project
          </Button>
        </div>
      )}
      <List>
        {projects.map((project) => (
          <ListItem key={project.id}>
            <ListItemText
              primary={
                <Box display="flex" flexDirection="column">
                  <Typography variant="body1"><strong>Project ID:</strong> {project.id}</Typography>
                  <Typography variant="body1"><strong>Project Name:</strong> {project.name}</Typography>
                </Box>
              }
              secondary={
                <Typography variant="body2"><strong>Project Description:</strong> {project.description}</Typography>
              }
            />
            <Box display="flex" justifyContent="flex-end">
              <IconButton edge="end" aria-label="edit" onClick={() => setEditProject(project)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProject(project.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProjectManagement;
