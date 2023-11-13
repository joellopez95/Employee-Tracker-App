-- Use created database
USE employee_management_db;

-- Insert sample departments
INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Teaching'),
  ('Engineering');

-- Insert sample roles
INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Representative', 50000.00, 1),
  ('Teacher', 60000.00, 2),
  ('Mechanical-Engineer', 100000.00, 3);

-- Insert sample employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('Joel', 'Lopez', 1, NULL),
  ('Jayme', 'Esparza', 2, 1),
  ('Anthony', 'Strickland', 3, NULL),
  ('Emmanuel', 'Lopez', 1, 2);
