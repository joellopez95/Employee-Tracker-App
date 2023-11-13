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
        ])
        .then((answers) => {
            // You can handle the user's choice here
            switch (answers.action) {
                case 'View all departments':
                    // Call a function to handle viewing all departments
                    break;
                case 'View all roles':
                    // Call a function to handle viewing all roles
                    break;
                case 'View all employees':
                    // Call a function to handle viewing all employees
                    break;
                case 'Add a department':
                    // Call a function to handle adding a department
                    break;
                case 'Add a role':
                    // Call a function to handle adding a role
                    break;
                case 'Add an employee':
                    // Call a function to handle adding an employee
                    break;
                case 'Update an employee role':
                    // Call a function to handle updating an employee role
                    break;
                case 'Exit':
                    // Exit the application or perform any necessary cleanup
                    console.log('Exiting application...');
                    break;
                default:
                    console.log('Invalid choice. Please try again.');
            }
        });
}

// Call the startApp function to initiate the prompt
startApp();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});