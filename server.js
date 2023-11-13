//handle on all routes, libs
const express = require('express');
const inquirer = require('inquirer');
const connection = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const viewRoutes = require('./routes/viewRoutes');
const addRoutes = require('./routes/addRoutes');
const updateRoutes = require('./routes/updateRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
  startApp();
});

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'  
                ],
            },
        ])}


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});