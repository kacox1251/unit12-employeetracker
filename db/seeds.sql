INSERT INTO department (name) VALUES 
("Sales"), 
("Production"),  
("Logistics"), 
("Development");

INSERT INTO role (title, salary,department_id) VALUES
("Accounts", 57000.00, 1),
("Sales Manager", 60000.00, 1),
("Coordinator", 48000.00, 2),
("Shipping and Receiving", 45000.00, 3),
("Engineer", 60000.00, 4),
("Customer Service Rep", 55000.00, 1);

INSERT INTO employee (first_name, last_name, role_id) VALUES
("Selena", "Kyle", 1),
("Bruce", "Wayne", 2),
("Dick", "Greyson", 3),
("Damian", "Wayne", 4),
("Barbara", "Gordan", 5),
("Alfred", "Pennyworth", 6);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;