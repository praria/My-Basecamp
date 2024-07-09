import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Paper,
  Grid,
  CircularProgress,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFiles, uploadFile, downloadFile, deleteFile } from '../../services/api.js';
import { useParams } from 'react-router-dom';

const FileManagement = () => {
  const { projectId: urlProjectId } = useParams();
  const [projectId, setProjectId] = useState(urlProjectId || '');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    try {
      const allFiles = await getFiles();
      const projectFiles = allFiles.filter(file => file.projectId === parseInt(projectId, 10));
      setFiles(projectFiles);
    } catch (error) {
      console.error('Error loading files:', error);
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      loadFiles();
    }
  }, [loadFiles, projectId]);

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const newFile = await uploadFile(projectId, selectedFile);
      setFiles([...files, newFile]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setLoading(false);
  };

  const handleFileDownload = async (fileId, filename) => {
    try {
      const file = await downloadFile(fileId);
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
    setLoading(true);
    try {
      await deleteFile(fileId);
      setFiles(files.filter(file => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>File Management</Typography>
      {!projectId && (
        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h6">Enter Project ID</Typography>
          <TextField
            label="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Paper>
      )}
      {projectId && (
        <>
          <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="h6">Upload New File</Typography>
            <Box my={2}>
              <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleFileUpload}
                disabled={!selectedFile || loading}
                style={{ marginLeft: '8px' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Upload File'}
              </Button>
            </Box>
          </Paper>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">Project Files</Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <List>
                {files.map((file) => (
                  <ListItem key={file.id} divider>
                    <Grid container alignItems="center">
                      <Grid item xs={6}>
                        <ListItemText primary={file.filename} />
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleFileDownload(file.id, file.filename)}
                        >
                          Download
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleFileDelete(file.id)}
                          disabled={loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default FileManagement;

