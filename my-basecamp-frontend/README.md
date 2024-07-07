Frontend application development using React and Material-UI
********************************************************

1. Create React App
*********************
Note: we might need to run the command "sudo chown -R $(whoami) ~/.npm" to change the ownership of the .npm directory and all its contents to the current user (from root user) 
-verify the change in ownership by using the command "ls -l ~/.npm"
-update npm to the latest version to avoid potential issues: sudo npm install -g npm@latest

We use "Create-react-app" to set up a new React project. It creates a project structure with everything that is need to start developing a React application
npx create-react-app my-basecamp-frontend

Navigate to the project directory. Start the development server and open the application in default web browser: http://localhost:3000 or http://192.168.1.136:3000
cd my-basecamp-frontend
- Run Frontend application
********* npm start

2. Install Dependencies in root directory of frontend project to enhance our application
npm install @mui/material @emotion/react @emotion/styled axios react-router-dom notistack
npm install cors
npm install @mui/icons-material


3. Create Folder Structure for better modularity and maintainability: 

- src/components    // contains reusable UI components
    ProjectList.js  // displays a list of projects fetched from the backend
    ProjectForm.js  // provides a form to create a new project
    UserList.js     // displays a list of users fetched from the backend
    UserForm.js     // provides a form to creates a new user
    ProjectTeam.js  // provides a form to add a team member to a project

- scr/pages/    // contains page components mapped to routes
    Home.js     // displays a welcome message
    Projects.js // combines ProjctForm.js and ProjectList.js to handle creation and listing
    Users.js    // combines UserForm and UserList to handle user creation and listing
    NotFound.js // displays 404 message for unknown routes

- src/services/ // Contains a service file to handle API interactions with the backend
    api.js

- App.js  // main structure of the application with routing
- index.js  // entry point of the application




