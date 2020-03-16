const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const colors = require("colors");
colors.enable();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employeeTrackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startApp();
});

// Start Application
const startApp = () => {
    inquirer.prompt([
        {
        message: "What would you like to do?",
        type: "list",
        choices: ["View All Employees", 
        "View All Employees By Department",
        "Add Employee", 
        "Update Employee Role"],
        name: "startApp"
        }
    ]).then(({ startApp }) => {
        console.log(startApp)
        switch (startApp) {
            case "View All Employees":
                viewAll();
                break;
            case "View All Employees By Department":
                viewAllByDepartment();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
        };
    });
};

const viewAll = () => {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary, manager.full_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id INNER JOIN manager ON employee.manager_id = manager.id ORDER BY employee.id ASC;";
    
    connection.query(query, function (err, res) {
        let table = [];
        for (var i = 0; i < res.length; i++) {
            table.push({ id: res[i].id, name: res[i].first_name + " " + res[i].last_name, title: res[i].title, salary: res[i].salary, department: res[i].department, manager: res[i].full_name});
        };

        let empTable = consoleTable.getTable(table);
        console.log(empTable.white);

        startApp();
    });
};

const viewAllByDepartment = () => {
    inquirer.prompt([
        {
        message: "Which department would you like to view the employees from?",
        choices: ["Sales", "Production", "Development", "Corporate"],
        name: "department",
        type: "list"
        }
    ]).then((response) => {
        let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary, manager.full_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id INNER JOIN manager ON employee.manager_id = manager.id WHERE department.name = ?";
        
        connection.query(query, [response.department], function (err, res) {
            let table = [];
            for (var i = 0; i < res.length; i++) {
                table.push({ name: res[i].first_name + " " + res[i].last_name, title: res[i].title, salary: res[i].salary });
            };

            let depTable = consoleTable.getTable(table);
            console.log(depTable.white);

            startApp();
        });
    });
};

const addEmployee = () => {
    let query = "SELECT * FROM role";

    connection.query(query, function (err, res) {
        let roles = [];
        
        for (i = 0; i < res.length; i++) {
            roles.push(Object.values(res[i].title).join(""));
        };

        inquirer.prompt([
            {
            message: "Enter first name of employee:",
            name: "first_name",
            type: "input"
            },
            {
            message: "Enter last name of employee:",
            name: "last_name",
            type: "input"
            },
            {
            message: "Enter employee's role:",
            name: "role",
            choices: roles,
            type: "list"
            }
        ]).then((response) => {
            let query = "SELECT id FROM role WHERE title = ?";
            connection.query(query, [response.role], function (err, res) {
                console.log(res[0].id)
                let roleId = res[0].id;
                // console.log(roleId);
                const query = "INSERT INTO employee SET ?, ?, ?, ?"
                connection.query( query,

                    [{ first_name: response.first_name }, 
                    { last_name: response.last_name }, 
                    { role_id: roleId },
                    { manager_id: null }],

                    function(err, r) {
                        if (err) throw err;
                        startApp();
                    }
                );            
            });
        });
    });
}


const updateRole = () => {
    let query = "SELECT id, first_name, last_name, CONCAT_WS(' ', first_name, last_name) AS full_name FROM employee;";
    connection.query(query, function (err, res) {
        
        const employeeRes = res;

        let listOfEmployees = [];
        for (i = 0; i < res.length; i++) {
            listOfEmployees.push(Object.values(res[i].full_name).join(""));
        };
        console.log(res[0])
        

        let query = "SELECT * FROM role";
        connection.query(query, function (err, res) {
            let listOfRoles = [];
            for (i = 0; i < res.length; i++) {
                listOfRoles.push(Object.values(res[i].title).join(""));
            };
        
            inquirer.prompt([
                {
                message: "Which employee would you like to update?",
                name: "employee",
                type: "list",
                choices: listOfEmployees
                },
                {
                message: "Which role will they be updated to?",
                name: "title",
                type: "list",
                choices: listOfRoles
                }
            ]).then((response) => {
                let roleId;
                let employeeId;

                for (i = 0; i < employeeRes.length; i++) {
                    if (employeeRes[i].full_name === response.employee) {
                        employeeId = employeeRes[i].id;
                    };
                };

                for (i = 0; i < res.length; i++) {
                    if (res[i].title === response.title) {
                        roleId = res[i].id;
                    };
                };

                let query = ("UPDATE employee SET ? WHERE ?");

                connection.query(query, [{ role_id: roleId }, { id: employeeId }], function (err, res) {
                    if (err) throw err;
                    startApp();
                });
            });
        });
    });
};