# My-Basecamp
***************
My Basecamp is a project management application designed to help teams efficiently organize and manage their projects, tasks, and files. It provides a user-friendly interface for users to create, update, and track projects and tasks, as well as upload and manage project-related files.

# Key Features
****************

# 1 User Authentication and Authorization
- Users can register and log in to the application securely.
- Authentication middleware ensures that only authenticated users can access protected routes.
- Authorization middleware restricts access to certain routes based on user role based access control (admin, project manager, regular user).

# 2 Admin role
- The admin has the highest level of access and control over the application. Admins can manage users, projects, tasks, and files.
# Permissions:
- Create, read, update, and delete users
- Assign and revoke admin permissions
- Add and remove team members from projects
- Create, read, update, and delete projects
- Create, read, update, and delete tasks
- Upload, download, and delete files

# 3 Project Manager role
- Project Managers oversee one or more projects. They can manage tasks and files within their projects and add/remove team members.
# Permissions:
- Create, read, update, and delete projects (only their own)
- Add and remove team members from their projects
- Create, read, update, and delete tasks within their projects
- Upload, download, and delete files within their projects

# 4 Regular User role
- Regular users have limited access to the application. They can view and update their profiles and interact with the tasks and files assigned to them.
# Permissions:
- Read projects they are assigned to
- Create, Read and update tasks assigned to them
- download files assigned to them
- Update their own profile information

# 5 Project Management
- Create new projects with a name and description.
- Update existing projects with new information.
- View a list of all projects or retrieve details of a specific project by ID.
- Delete projects when they are no longer needed.

# 6 Task Management
- Create tasks within a project, specifying title, description, status, due date, and assigned user.
- Update task details, including title, description, status, due date, and assigned user.
- View a list of all tasks within a project or retrieve details of a specific task by ID.
- Delete tasks when they are completed or no longer needed.

# 7 File Management
- Upload files and associate them with specific projects.
- Download files that are uploaded to the application.
- Delete files when they are no longer needed.

# Architecture
***************

The application follows a Model-View-Controller (MVC) architecture for structured development and maintenance. Here's an overview of each component:
# Models: 
Represent the data structures used in the application. These include models for users, projects, tasks, and files.
# Controllers: 
Handle the application's logic and business rules. Each controller corresponds to a specific resource (user, project, task, file) and implements CRUD operations (Create, Read, Update, Delete) for that resource.
# Routes: 
Define the endpoints and route handlers for handling HTTP requests. Routes are organized based on the resource they operate on (e.g., user routes, project routes, task routes, file routes).
# Middleware: 
Provides reusable functions to intercept and process incoming requests. Middleware is used for authentication and authorization to secure routes and restrict access based on user 
roles.

# Technologies Used:
**********************

- Node.js: JavaScript runtime for server-side development.
- Express.js: Web application framework for building APIs.
- JWT (JSON Web Tokens): Used for user authentication and authorization.
- Multer: Middleware for handling file uploads.
- bcrypt: Library for hashing passwords securely.
- Sequelize: ORM (Object-Relational Mapping) for interacting with the database.
- SQLite: Lightweight relational database management system for data storage.

# Usage
***********

- To use My Basecamp, follow these steps:
# User Registration and Authentication:
-Register an account using the /register endpoint with appropriate credentials.
-Log in using the /login endpoint to obtain an authentication token.
# Project Management:
- Create a new project using the /projects endpoint with a name and description.
- Update project details using the /projects/:projectId endpoint with the project ID.
- View all projects using the /projects endpoint or retrieve a specific project by ID using /projects/:projectId.
- Delete projects using the /projects/:projectId endpoint with the project ID.
# Task Management:
- Create tasks within a project using the /projects/:projectId/tasks endpoint with task details.
- Update task details using the /projects/:projectId/tasks/:taskId endpoint with the task ID.
- View all tasks within a project using the /projects/:projectId/tasks endpoint or retrieve a specific task by ID using /projects/:projectId/tasks/:taskId.
- Delete tasks using the /projects/:projectId/tasks/:taskId endpoint with the task ID.
# File Management:
- Upload files to a project using the /projects/:projectId/files/upload endpoint.
- Download files using the /files/:fileId/download endpoint with the file ID.
- Delete files using the /files/:fileId endpoint with the file ID.

# Conclusion
My Basecamp provides a robust platform for managing projects, tasks, and files, offering essential features for team collaboration and productivity. With its intuitive interface and secure authentication mechanisms, it serves as an effective tool for organizations of all sizes to streamline their project management processes.


*******************************
# Development and Testing
*******************************

# Stage 1: Initial setup for building the Backend 

# Initialize a new Node.js project in directory my-backcamp-backend
npm init -y
# Install the necessary dependencies
npm install express sqlite3 sequelize bcryptjs jsonwebtoken body-parser dotenv

# Install file handling Packages in Node.js application using Express framework
npm install multer --save 

# create the project structure
mkdir config controllers models routes middleware
touch app.js .gitignore .env

# running the backend application
- create the database file: 
touch database.sqlite
- run the application:
******* node app.js
OR
- run the application in the development server (In development server, nodemon restarts the server automatically whenever it detects a file change in the directory):
******* npm run dev 

****************************************
# API Contract for testing endpoints with Postman 
****************************************

# 1. User Authentication
**************************

# 1.1 register a new user (admin or project_manager or regular_user)
request type - POST
URL: http://localhost:5000/api/users/register 
Headers -> Content-Type: application/json
JSON Body: 
{
  "username": "admin1",
  "password": "password1",
  "role": "admin"
}
Response: Should return the user details without the password
{
    "userWithoutPassword": {
        "id": 9,
        "username": "admin1",
        "role": "admin",
        "updatedAt": "2024-06-05T16:45:15.612Z",
        "createdAt": "2024-06-05T16:45:15.612Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE3NjA1OTE1LCJleHAiOjE3MTc2MDk1MTV9.0ZXDWddVypnusMtUHqxlEqlilMO-R8Zdoi3zjO4hq4A"
}

# Log in with a new user
request type - POST
URL: http://localhost:5000/api/users/login 
Headers -> Content-Type: application/json
JSON Body: 
{
  "username": "admin1",
  "password": "password1"
}
Response: Should return a JWT token
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE3NjA2ODEwLCJleHAiOjE3MTc2MTA0MTB9.3zguVRQQv02J8zm0elP2jjIAz453tqgPriOOWRpvlIw"
}

# 2 Project Management
**************************

# 2.1 Create a Project 
request type - POST
URL: http://localhost:5000/api/projects
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
JSON Body: 
{
  "name": "Project mybasecamp-1",
  "description": "This is a mybasecamp-1 project"
}
Response: Should return the project details

# 2.2 Get all Projects
request type - GET
URL: http://localhost:5000/api/projects
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should return the list of projects

# 2.3 Get a Specified project
request type - GET
URL: http://localhost:5000/api/projects/:projectId (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should return the specified project details

# 2.4 Update a project
request type - PUT
URL: http://localhost:5000/api/projects/:projectId (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
JSON Body:
{
  "name": "Project mybasecamp-1 Updated",
  "description": "This is an updated mybasecamp-1 project"
}
Response: Should return the updated project details

# 2.5 Delete a project
request type - Delete
URL: http://localhost:5000/api/projects/:projectId (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should confirm the deletion

# 3 Task Management
**********************

# 3.1 Create a Task
request type - POST
URL: http://localhost:5000/api/projects/:projectId/tasks (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
JSON Body:
{
  "title": "Sample Task in Project 10",
  "description": "This is a Project 10 sample task",
  "status": "pending",
  "dueDate": "2024-06-12",
  "projectId": 10,
  "assignedTo": 1
}
Response: Should return the task details

# 3.2 Get all Tasks in a Project
request type - GET
URL: http://localhost:5000/api/projects/:projectId/tasks 
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should return a list of tasks for the specified project

# 3.3 Get a single Task by Id
request type - GET
URL: http://localhost:5000/api/projects/:projectId/tasks/:taskId 
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should return a specified task for the specified project

# 3.4 Update a Task
request type - PUT
URL: http://localhost:5000/api/projects/:projectId/tasks/:taskId
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
JSON Body:
{
  "title": "Sample Task in Project 10",
  "description": "This is a Project 10 sample task",
  "status": "Completed",
  "dueDate": "2024-06-12",
  "projectId": 10,
  "assignedTo": 1
}
Response: Should return the updated task details

# 3.5 Delete a Task
request type - POST
URL: http://localhost:5000/api/projects/:projectId/tasks/:taskId
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should confirm the deletion

# 4 File Sharing
*******************

# 4.1 Upload a File
*********************
request type - POST
URL: http://localhost:5000/api/files/:projectId/upload
Headers:  
    . Content-type: multipart/form-data
Body:
    . In the 'Body' tab, select 'form-data'
    . Add a key named 'file' of type 'file' and choose a file from local system
Response: Should return a file details and its URL or path
for example: {"id":6,"filename":"1717727536733.png","path":"uploads/1717727536733.png","mimetype":"image/png","size":22958,"projectId":"15","updatedAt":"2024-06-07T02:32:16.744Z","createdAt":"2024-06-07T02:32:16.744Z"}

# 4.2 Download a File
*********************
request type - GET
URL: http://localhost:5000/api/files/:fileId/download
Response: Should start the file download with 200 Ok status

# 4.3 Delete a File
*********************
request type - DELETE
URL: http://localhost:5000/api/files/:fileId
Response: Should confirm the deletion with 404 No Content status

# 5 User Management
***********************

# 5.1 Create User
    Endpoint: POST http://localhost:5000/api/admin
    Description: Create a new user.
    Headers:
        Authorization: Bearer <admin_token>
        Content-Type: application/json
    Body: 
        {
    "username": "emp1",
    "password": "password123",
    "role": "regular_user"
    }
    Response: 201 Created
        {
    "id": 16,
    "username": "emp1",
    "role": "regular_user",
    "updatedAt": "2024-06-09T22:28:13.404Z",
    "createdAt": "2024-06-09T22:28:13.404Z"
    }

# 5.2 Read User

    Endpoint: GET http://localhost:5000/api/admin/:userId
    Description: Retrieve user details.
    Headers:
        Authorization: Bearer <admin_token>
    Response:
        200 OK:
    {
    "id": 17,
    "username": "emp2",
    "role": "regular_user",
    "createdAt": "2024-06-09T23:01:28.676Z",
    "updatedAt": "2024-06-09T23:01:28.676Z"
    }

# 5.3 Update User

    Endpoint: PUT http://localhost:5000/api/admin/:userId/role
    Description: Update user details.
    Headers:
        Authorization: Bearer <admin_token>
        Content-Type: application/json
    Body:
    {
    "role": "project_manager"
    }
    Response: 200 OK

# 5.4. Delete User

    Endpoint: DELETE http://localhost:5000/api/admin/:userId
    Description: Delete a user.
    Headers:
        Authorization: Bearer <admin_token>
    Response:
        204 No Content

# 5.5. Assign Admin Permissions

    Endpoint: PUT http://localhost:5000/api/admin/:userId/assignAdmin
    Description: Assign admin role to a user.
    Headers:
        Authorization: Bearer <admin_token>
    Response:
        200 OK:
    {
    "message": "User assigned admin role"
    }

# 5.6. Revoke Admin Permissions

    Endpoint: PUT http://localhost:5000/api/admin/:userId/revokeAdmin
    Description: Revoke admin role from a user.
    Headers:
        Authorization: Bearer <admin_token>
    Response:
        200 OK:
    {
    "message": "User revoked admin role"
    }

# 5.7. Add Team Member to Project

    Endpoint: POST http://localhost:5000/api/projects/:projectId/team/:userId
    Description: Add a team member to a project.
    Headers:
        Authorization: Bearer <admin or project-manager_token>
        Content-Type: application/json
    Body: 
    {
    "userId": 1
    }
    Response: 200 OK
    {
    "message": "Team member added to project"
    }

# 5.8. Remove Team Member from Project

    Endpoint: DELETE http://localhost:5000/api/projects/:projectId/team/:userId
    Description: Remove a team member from a project.
    Headers:
        Authorization: Bearer <admin or project-manager_token>
    Response:
        200 OK:
        {
         "message": "Team member removed from project"
         }


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

2. Install Dependencies to enhance our application
npm install @mui/material @emotion/react @emotion/styled axios react-router-dom notistack

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






















