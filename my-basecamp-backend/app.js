const express = require('express');
const sequelize = require('./config/database');

const allUserRoutes = require('./routes/allUserRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectManagerRoutes = require('./routes/projectManagerRoutes');
const regularUserRoutes = require('./routes/regularUserRoutes');

const projectRoutes = require('./routes/projectRoutes'); 
const taskRoutes = require('./routes/taskRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { authenticate, authorize } = require('./middleware/auth');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json()); // Use built-in express.json() instead of body-parser

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// public routes
app.use('/api/users', allUserRoutes);


// app.use('/api/admin', adminRoutes);
// app.use('/api/projectManager', projectManagerRoutes);
// app.use('/api/regularUser', regularUserRoutes);
// app.use('/api/projects', projectRoutes); 
// app.use('/api/projects/:projectId/tasks', taskRoutes);
// app.use('/api/files', fileRoutes);

// Protected routes
app.use('/api/admin', authenticate, authorize(['admin']), adminRoutes);
app.use('/api/project-manager', authenticate, authorize(['project_manager']), projectManagerRoutes);
app.use('/api/regular-user', authenticate, authorize(['regular_user']), regularUserRoutes);
app.use('/api/projects', authenticate, projectRoutes);
app.use('/api/tasks', authenticate, taskRoutes);
app.use('/api/files', authenticate, fileRoutes);

// Root route handler
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>My Basecamp Project</title>
      <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: #333; }
        p { font-size: 1.2em; }
        ul { list-style: none; padding: 0; }
        li { margin: 10px 0; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>Welcome to My Basecamp Project</h1>
      <p>This is the backend server for the My Basecamp project management application.</p>
      <ul>
        <li><a href="/api/projects">View Basecamp Projects</a></li>
        <li><a href="/api/users">View Basecamp Users</a></li>
      </ul>
    </body>
    </html>
  `);
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
