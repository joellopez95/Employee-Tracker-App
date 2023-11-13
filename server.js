//handle on all libraries needed
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

//setting port for server
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connection to mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Striker@1995",
  database: "employee_management_db",
});

//db connection (boiler plate code)
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database as id " + db.threadId);
});

// Function to fetch and display all departments from the database
const viewAllDepartments = () => {
  const query = "SELECT * FROM departments";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    runApp();
  });
};

// Function to fetch and display all roles from the database
const viewAllRoles = () => {
  const query = "SELECT * FROM roles";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    runApp();
  });
};

// Function to fetch and display all employees from the database
const viewAllEmployees = () => {
  const query = "SELECT * FROM employees";
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
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO departments SET ?";
      db.query(query, { name: answer.name }, (err, results) => {
        if (err) throw err;
        console.log("Department added!");
        runApp();
      });
    });
};

// Function to add a role to the database
//copied/pasted code from department, edited
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the role:",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID for the role:",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO roles SET ?";
      db.query(
        query,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err, results) => {
          if (err) throw err;
          console.log("Role added!");
          runApp();
        }
      );
    });
};

// Function to add an employee to the database
//copied/pasted code from department, edited
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role ID for the employee:",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the manager ID for the employee:",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO employees SET ?";
      db.query(
        query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err, results) => {
          if (err) throw err;
          console.log("Employee added!");
          runApp();
        }
      );
    });
};

// Function to update an employee role to the database
//copied/pasted code from department, edited
const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Enter the ID of the employee you want to update:",
      },
      {
        type: "input",
        name: "new_role_id",
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then((answer) => {
      const query = "UPDATE employees SET role_id = ? WHERE id = ?";
      db.query(
        query,
        [answer.new_role_id, answer.employee_id],
        (err, results) => {
          if (err) throw err;
          console.log("Employee role updated!");
          runApp();
        }
      );
    });
};

//object mapping actions to corresponding functions
//source : sentry.io
const actions = {
  "View all departments": viewAllDepartments,
  "View all roles": viewAllRoles,
  "View all employees": viewAllEmployees,
  "Add a department": addDepartment,
  "Add a role": addRole,
  "Add an employee": addEmployee,
  "Update an employee role": updateEmployeeRole,
  Exit: () => {
    console.log("Exiting...");
    db.end();
    process.exit();
  },
};

// Function to start the application and prompt the user for actions
const runApp = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: Object.keys(actions),
      },
    ])
    .then((answer) => {
      const selectedAction = actions[answer.action];
      if (selectedAction) {
        selectedAction();
      } else {
        console.log("Invalid option. Please try again.");
        runApp();
      }
    });
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  runApp();
});
