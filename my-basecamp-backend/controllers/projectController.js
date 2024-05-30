// Implement project-related logic
const Project = require('../models/project');

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const ownerId = req.user.id; // Assuming req.user contains the authenticated user's info
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const project = await Project.create({ name, description, ownerId });
    res.status(201).json(project);
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { projectId } = req.params;

    const [updated] = await Project.update(
      { name, description },
      { where: { id: projectId } }
    );

    if (updated) {
      const updatedProject = await Project.findByPk(projectId);
      return res.status(200).json(updatedProject);
    }

    throw new Error('Project not found');
  } catch (error) {
    console.error('Failed to update project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Failed to retrieve projects:', error); // Log the error details
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Failed to retrieve project:', error); // Log the error details
    res.status(500).json({ error: 'Failed to retrieve project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await Project.destroy({ where: { id: projectId } });
    if (!result) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};