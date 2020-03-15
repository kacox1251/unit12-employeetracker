DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR (30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR (30),
    salary DECIMAL (10, 2),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- add employees, add departments, add roles
-- update employee roles

-- View all employees
SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    department.name AS department, 
    role.title, 
    role.salary 
FROM 
    employee
INNER JOIN 
    role ON employee.role_id = role.id 
INNER JOIN 
    department ON role.department_id = department.id 
ORDER BY 
    employee.id ASC;

-- View employees by department
SELECT 
	employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name,
    role.salary
FROM
    employee
INNER JOIN
    role ON employee.role_id = role.id
INNER JOIN
    department ON role.department_id = department.id
WHERE
	department.name = "Production";

-- View employees
SELECT 
	id, 
    first_name, 
    last_name, 
    role_id, 
    manager_id 
FROM 
    employee 
ORDER BY 
    id ASC;