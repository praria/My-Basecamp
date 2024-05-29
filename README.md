# My-Basecamp

# Stage 1: Initial setup for building the Backend 

# Initialize a new Node.js project in directory my-backcamp-backend
npm init -y
# Install the necessary dependencies
npm install express sqlite3 sequelize bcryptjs jsonwebtoken body-parser dotenv

# create the project structure
mkdir config controllers models routes middleware
touch app.js .gitignore .env

# running the application
- create the database file
touch database.sqlite
- run the application
node app.js

****************************************
# Testing API endpoints with Postman 
****************************************

# 1. User Authentication
**************************

# 1.1 register a new user
request type - POST
URL: http://localhost:3000/api/users/register 
Headers -> Content-Type: application/json
JSON Body: 
{
  "username": "testuser",
  "password": "password123",
  "role": "admin"
}
Response: Should return the user details without the password

# Log in with a new user
request type - POST
URL: http://localhost:3000/api/users/login 
Headers -> Content-Type: application/json
JSON Body: 
{
  "username": "testuser",
  "password": "password123"
}
Response: Should return a JWT token

# 2 Project Management
**************************

# 2.1 Create a Project 
request type - POST
URL: http://localhost:3000/api/projects
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
URL: http://localhost:3000/api/projects
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should return the list of projects

# 2.3 Get a Specified project
request type - GET
URL: http://localhost:3000/api/projects/:projectId (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should return the specified project details

# 2.4 Update a project
request type - PUT
URL: http://localhost:3000/api/projects/:projectId (Note: replace projectId)
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
URL: http://localhost:3000/api/projects/:projectId (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should confirm the deletion

# 3 Task Management
**********************

# 3.1 Create a Task
request type - POST
URL: http://localhost:3000/api/projects/:projectId/tasks (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
JSON Body:
{
  "title": "Task 1",
  "description": "This is a sample task",
  "status": "pending",
  "assigneeId": 1
}
Response: Should return the task details

# 3.2 Get all Tasks in a Project
request type - GET
URL: http://localhost:3000/api/projects/:projectId/tasks (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should return a list of tasks for the specified project

# 3.3 Update a Task
request type - PUT
URL: http://localhost:3000/api/tasks/:taskId (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
JSON Body:
{
  "title": "Task 1 Updated",
  "description": "This is an updated sample task",
  "status": "completed",
  "assigneeId": 2
}
Response: Should return the updated task details

# 3.4 Delete a Task
request type - POST
URL: http://localhost:3000/api/tasks/:taskId (Note: replace projectId)
Headers: 
    . Content-type: application/json
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should confirm the deletion

# 4 File Sharing
*******************

# 4.1 Upload a File
*********************
request type - POST
URL: http://localhost:3000/api/projects/:projectId/files (Note: replace projectId)
Headers:    
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
    . Content-type: multipart/form-data
Body:
    . In the 'Body' tab, select 'form-data'
    . Add a key named 'file' of type 'file' and choose a file from local system
Response: Should return a file details and its URL or path

# 4.2 Download a File
*********************
request type - GET
URL: http://localhost:3000/api/projects/:projectId/files/:fileId (Note: replace projectId and fileId)
Headers:    
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should start the file download

# 4.3 Delete a File
*********************
request type - DELETE
URL: http://localhost:3000/api/projects/:projectId/files/:fileId (Note: replace projectId and fileId)
Headers:    
    . Authorization: Bearer <JWT_TOKEN> Note: replace <JWT_TOKEN> with the token received from login response
Response: Should confirm the deletion











