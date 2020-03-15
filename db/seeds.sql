INSERT INTO department (name) VALUES 
("Sales"), 
("Production"),  
("Development");

INSERT INTO role (title, salary,department_id) VALUES
("Accounts", 57000.00, 1),
("Manager", 60000.00, 1),
("Coordinator", 48000.00, 2),
("Engineer", 60000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Selena", "Kyle", 1, NULL),
("Bruce", "Wayne", 2, NULL),
("Dick", "Greyson", 3, NULL),
("Barbara", "Gordon", 4, NULL);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
