INSERT INTO department (name) VALUES 
("Sales"), 
("Production"),  
("Development"),
("Corporate");

INSERT INTO role (title, salary,department_id) VALUES
("Accounts", 57000.00, 1),
("Manager", 60000.00, 1),
("Coordinator", 48000.00, 2),
("Engineer", 60000.00, 3),
("CEO", 100000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Selena", "Kyle", 1, 2),
("Bruce", "Wayne", 2, 3),
("Dick", "Greyson", 3, 1),
("Alfred", "Pennyworth", 2, 3),
("Barbara", "Gordon", 4, 3),
("Thomas", "Wayne", 5, 3);

INSERT INTO manager (full_name) VALUES
("Bruce Wayne"),
("Alfred Pennyworth"),
("Thomas Wayne"),
("None");
