//handle on all libraries needed
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

//setting port for server
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connection to mysql
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Striker@1995',
  database: 'employee_management_db'
});

//db connection (boiler plate code)
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

// Function to fetch and display all departments from the database
const viewAllDepartments = () => {
  const query = 'SELECT * FROM departments';
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    runApp();
  });
};

// Function to fetch and display all roles from the database
const viewAllRoles = () => {
  const query = 'SELECT * FROM roles';
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    runApp();
  });
};

// Function to fetch and display all employees from the database
const viewAllEmployees = () => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    runApp();
  });
};

// Function to add a department to the database
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
      }
    ])
    .then(answer => {
      const query = 'INSERT INTO departments SET ?';
      db.query(query, { name: answer.name }, (err, results) => {
        if (err) throw err;
        console.log('Department added!');
        runApp();
      });
    });
};

const addRole = () => {
  // Similar logic as addDepartment
};

const addEmployee = () => {
  // Similar logic as addDepartment
};

const updateEmployeeRole = () => {
  // Similar logic as addDepartment
};

//object mapping actions to corresponding functions
//source : sentry.io
const actions = {
  'View all departments': viewAllDepartments,
  'View all roles': viewAllRoles,
  'View all employees': viewAllEmployees,
  'Add a department': addDepartment,
  'Add a role': addRole,
  'Add an employee': addEmployee,
  'Update an employee role': updateEmployeeRole,
  'Exit': () => {
    console.log('Exiting...');
    db.end();
    process.exit();
  }
};

// Function to start the application and prompt the user for actions
const runApp = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: Object.keys(actions)
      }
    ])
    .then(answer => {
      const selectedAction = actions[answer.action];
      if (selectedAction) {
        selectedAction();
      } else {
        console.log('Invalid option. Please try again.');
        runApp();
      }
    });
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  runApp();
});
