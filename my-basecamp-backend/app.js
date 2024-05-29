const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes'); 
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

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