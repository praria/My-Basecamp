const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes'); 
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

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

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes); 

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });