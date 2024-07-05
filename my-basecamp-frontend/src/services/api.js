import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const registerUser = (username, password, role) => {
  return axios.post(`${API_URL}/users/register`, { username, password, role });
};

const loginUser = (username, password) => {
  return axios.post(`${API_URL}/users/login`, { username, password });
};

axios.interceptors.request.use(
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

const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};

const createUser = (username, password, role) => {
  return axios.post(`${API_URL}/users`, { username, password, role });
};

const updateUser = (id, data) => {
  return axios.put(`${API_URL}/users/${id}`, data);
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};

const getProjects = () => {
  return axios.get(`${API_URL}/projects`);
};

const createProject = (data) => {
  return axios.post(`${API_URL}/projects`, data);
};

const updateProject = (id, data) => {
  return axios.put(`${API_URL}/projects/${id}`, data);
};

const deleteProject = (id) => {
  return axios.delete(`${API_URL}/projects/${id}`);
};

const getTasks = (projectId) => {
  return axios.get(`${API_URL}/projects/${projectId}/tasks`);
};

const createTask = (projectId, data) => {
  return axios.post(`${API_URL}/projects/${projectId}/tasks`, data);
};

const updateTask = (projectId, taskId, data) => {
  return axios.put(`${API_URL}/projects/${projectId}/tasks/${taskId}`, data);
};

const deleteTask = (projectId, taskId) => {
  return axios.delete(`${API_URL}/projects/${projectId}/tasks/${taskId}`);
};

const uploadFile = (projectId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_URL}/projects/${projectId}/files`, formData);
};

const downloadFile = (projectId, fileId) => {
  return axios.get(`${API_URL}/projects/${projectId}/files/${fileId}`, { responseType: 'blob' });
};

const deleteFile = (projectId, fileId) => {
  return axios.delete(`${API_URL}/projects/${projectId}/files/${fileId}`);
};

export {
  registerUser,
  loginUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  uploadFile,
  downloadFile,
  deleteFile
};
