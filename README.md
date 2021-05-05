# NodeJs Application for PMS backend
Node.js Backend application for Project Management System (PMS). This application after completion will be complete suite with all the functinalities required to manage projects and it's task.

## Authentication system
This application uses JWT token authentication system to provide seemless authentication. 
### Application also uses thorough authorization all over the project
Application have different authorization for different operations based on their roles.
Roles include-
Admin, Project Manager, Developers, Testers


## Setup .env

PORT=PORT_NUMBER_FOR_APPLICATION_SERVER  
DATABASE_URI= DATABASE_URI_MONGO_DB  
AUTHPORT= PORT_NUMBER_AUTH_SERVER  
AUTH_SECRET_KEY = JWT_Secret_Key  


## Scripts

### npm install
To install all the required dependencies present in the package.json file

### npm start
To start application server

### npm run start:auth
To start authentication server 

### npm run startDev
To start application server in development mode


### npm run startDev:auth
To start authentication server in development mode
