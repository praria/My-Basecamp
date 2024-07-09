import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, IconButton, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getAllUsers, getTeamMembersByProject, assignAdminPermission, revokeAdminPermission, createUser, updateUser, deleteUser, addTeamMember, removeTeamMember } from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });
  const [editUser, setEditUser] = useState(null);
  const [projectId, setProjectId] = useState('');
  const [userId, setUserId] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  const loadUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadTeamMembersByProject = async (projectId) => {
    try {
      const response = await getTeamMembersByProject(projectId);
      console.log('Team Members Data:', response.data); // Log the actual data
      setTeamMembers(response.data); // Update the state with the data
    } catch (error) {
      console.error('Error loading team members:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (projectId) {
      loadTeamMembersByProject(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    console.log('Updated teamMembers:', teamMembers);
  }, [teamMembers]);

  const handleCreateUser = async () => {
    try {
      await createUser(newUser.username, newUser.password, newUser.role);
      loadUsers();
      setNewUser({ username: '', password: '', role: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(editUser.id, { role: editUser.role });
      loadUsers();
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAssignAdmin = async (userId) => {
    try {
      await assignAdminPermission(userId);
      loadUsers();
    } catch (error) {
      console.error('Error assigning admin permission:', error);
    }
  };

  const handleRevokeAdmin = async (userId) => {
    try {
      await revokeAdminPermission(userId);
      loadUsers();
    } catch (error) {
      console.error('Error revoking admin permission:', error);
    }
  };

  const handleAddTeamMember = async () => {
    try {
      await addTeamMember(projectId, userId);
      setProjectId('');
      setUserId('');
      loadTeamMembersByProject(projectId); // Reload team members after adding a new member
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const handleRemoveTeamMember = async () => {
    try {
      await removeTeamMember(projectId, userId);
      setProjectId('');
      setUserId('');
      loadTeamMembersByProject(projectId); // Reload team members after removing a member
    } catch (error) {
      console.error('Error removing team member:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Box my={2}>
        <TextField
          label="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="project_manager">Project Manager</MenuItem>
            <MenuItem value="regular_user">Regular User</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleCreateUser} fullWidth>
          Create User
        </Button>
      </Box>

      {editUser && (
        <Box my={2}>
          <Typography variant="h6">Edit User</Typography>
          <TextField
            label="Role"
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleUpdateUser} fullWidth>
            Update User
          </Button>
        </Box>
      )}

      <Typography variant="h6" gutterBottom>Users List</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={`${user.username} (Role: ${user.role})`}
              secondary={`ID: ${user.id}`}
            />
            <IconButton edge="end" aria-label="edit" onClick={() => setEditUser(user)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
              <DeleteIcon />
            </IconButton>
            <Button onClick={() => handleAssignAdmin(user.id)} disabled={user.role === 'admin'}>
              Assign Admin
            </Button>
            <Button onClick={() => handleRevokeAdmin(user.id)} disabled={user.role !== 'admin'}>
              Revoke Admin
            </Button>
          </ListItem>
        ))}
      </List>

      <Box my={2}>
        <Typography variant="h6">Manage Team Members</Typography>
        <TextField
          label="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddTeamMember} fullWidth>
          Add Team Member
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRemoveTeamMember} fullWidth>
          Remove Team Member
        </Button>
      </Box>

      <Box my={2}>
        <Typography variant="h6">Team Members by Project</Typography>
        {teamMembers.length > 0 ? (
          <List>
            {teamMembers.map((member) => (
              <ListItem key={member.id}>
                <ListItemText primary={member.username} secondary={`Role: ${member.role}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No team members found for selected project.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default UserManagement;