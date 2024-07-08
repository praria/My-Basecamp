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

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const assignAdminPermission = (userId) => {
  return axios.put(`${API_URL}/admin/${userId}/assignAdmin`);
}

const revokeAdminPermission = (userId) => {
  return axios.put(`${API_URL}/admin/${userId}/revokeAdmin`);
}

const createUser = (username, password, role) => {
  return axios.post(`${API_URL}/admin`, { username, password, role });
};

const updateUser = (id, role) => {
  return axios.put(`${API_URL}/admin/${id}/role`, role);
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/admin/${id}`);
};

const addTeamMember = (projectId, userId) => {
  return axios.post(`${API_URL}/projects/${projectId}/team/${userId}`);
}

const removeTeamMember = (projectId, userId) => {
  return axios.delete(`${API_URL}/projects/${projectId}/team/${userId}`);
}

const getTeamMembersByProject = (projectId) => {
  return axios.get(`${API_URL}/admin/projects/${projectId}/team`);
}

const getProjects = () => {
  return axios.get(`${API_URL}/projects`);
};

const createProject = (name, description) => {
  return axios.post(`${API_URL}/projects`, {name, description});
};

const updateProject = (id, name, description) => {
  return axios.put(`${API_URL}/projects/${id}`, {name, description});
};

const getProjectById = (id) => {
  return axios.get(`${API_URL}/projects/${id}`);
}

const deleteProject = (id) => {
  return axios.delete(`${API_URL}/projects/${id}`);
};

const createTask = (projectId, title, description, status, dueDate, assignedTo) => {
  return axios.post(`${API_URL}/projects/${projectId}/tasks`, {title, description, status, dueDate, assignedTo});
};

const getTasks = (projectId) => {
  return axios.get(`${API_URL}/projects/${projectId}/tasks`);
};

const getTasksById = (projectId, taskId) => {
  return axios.get(`${API_URL}/projects/${projectId}/tasks/${taskId}`);
};

const updateTask = (taskId, projectId, {title, description, status, dueDate, assignedTo}) => {
  return axios.put(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {title, description, status, dueDate, projectId, assignedTo});
};

const deleteTask = (projectId, taskId) => {
  return axios.delete(`${API_URL}/projects/${projectId}/tasks/${taskId}`);
};

const uploadFile = (projectId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_URL}/files/${projectId}/upload`, formData);
};

const downloadFile = (fileId) => {
  return axios.get(`${API_URL}/files/${fileId}/download`, { responseType: 'blob' });
};

const deleteFile = (fileId) => {
  return axios.delete(`${API_URL}/files/${fileId}`);
};

export {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
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
  downloadFile,
  deleteFile
};
