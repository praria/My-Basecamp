import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { uploadFile, downloadFile, deleteFile } from '../../services/api';

const FileManagement = ({ projectId }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const loadFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${projectId}/files`);
      setFiles(response.data);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    try {
      const newFile = await uploadFile(projectId, selectedFile);
      setFiles([...files, newFile]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDownload = async (fileId, filename) => {
    try {
      const file = await downloadFile(projectId, fileId);
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFileDelete = async (fileId) => {
    try {
      await deleteFile(projectId, fileId);
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6">File Management</Typography>
      <Box my={2}>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <Button variant="contained" color="primary" onClick={handleFileUpload}>
          Upload File
        </Button>
      </Box>
      <Typography variant="h6">Project Files</Typography>
      <List>
        {files.map((file) => (
          <ListItem key={file.id}>
            <ListItemText primary={file.filename} />
            <Button onClick={() => handleFileDownload(file.id, file.filename)}>Download</Button>
            <IconButton edge="end" aria-label="delete" onClick={() => handleFileDelete(file.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FileManagement;
