import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const registerUser = (username, password, role) => {
  return api.post('/users/register', { username, password, role });
};

const loginUser = (username, password) => {
  return api.post('/users/login', { username, password });
};

const getUserById = async (id) => {
  try {
    const response = await api.get(`/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

const getCurrentUser = async () => {
  try {
    const response = await api.get(`users/me`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const assignAdminPermission = (userId) => {
  return api.put(`/admin/${userId}/assignAdmin`);
};

const revokeAdminPermission = (userId) => {
  return api.put(`/admin/${userId}/revokeAdmin`);
};

const createUser = (username, password, role) => {
  return api.post('/admin', { username, password, role });
};

const updateUser = (id, role) => {
  return api.put(`/admin/${id}/role`, role);
};

const deleteUser = (id) => {
  return api.delete(`/admin/${id}`);
};

const addTeamMember = (projectId, userId) => {
  return api.post(`/projects/${projectId}/team/${userId}`);
};

const removeTeamMember = (projectId, userId) => {
  return api.delete(`/projects/${projectId}/team/${userId}`);
};

const getTeamMembersByProject = (projectId) => {
  return api.get(`/admin/projects/${projectId}/team`);
};

const getProjects = () => {
  return api.get('/projects');
};

const createProject = (name, description) => {
  return api.post('/projects', { name, description });
};

const updateProject = (id, name, description) => {
  return api.put(`/projects/${id}`, { name, description });
};

const getProjectById = (id) => {
  return api.get(`/projects/${id}`);
};

const deleteProject = (id) => {
  return api.delete(`/projects/${id}`);
};

const createTask = (projectId, title, description, status, dueDate, assignedTo) => {
  return api.post(`/projects/${projectId}/tasks`, { title, description, status, dueDate, assignedTo });
};

const getTasks = (projectId) => {
  return api.get(`/projects/${projectId}/tasks`);
};

const getTasksById = (projectId, taskId) => {
  return api.get(`/projects/${projectId}/tasks/${taskId}`);
};

const updateTask = (taskId, projectId, { title, description, status, dueDate, assignedTo }) => {
  return api.put(`/projects/${projectId}/tasks/${taskId}`, { title, description, status, dueDate, projectId, assignedTo });
};

const deleteTask = (projectId, taskId) => {
  return api.delete(`/projects/${projectId}/tasks/${taskId}`);
};

const getFiles = async () => {
  const response = await api.get('/files/');
  return response.data;
};

const uploadFile = async (projectId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(`/files/${projectId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

const downloadFile = async (fileId) => {
  const response = await api.get(`/files/${fileId}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

const deleteFile = async (fileId) => {
  const response = await api.delete(`/files/${fileId}`);
  return response.data;
};

export {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  getCurrentUser,
  assignAdminPermission,
  revokeAdminPermission,
  createUser,
  updateUser,
  deleteUser,
  addTeamMember,
  removeTeamMember,
  getTeamMembersByProject,
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile
};
