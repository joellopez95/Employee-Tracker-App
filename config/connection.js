// config/connection.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Striker@1995',
  database: 'employee_management_db', 
});

module.exports = connection;
