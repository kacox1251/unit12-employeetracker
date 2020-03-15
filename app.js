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
        };
    });
};

const viewAll = () => {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employee.id ASC";
    
    connection.query(query, function (err, res) {
        let table = [];
        for (var i = 0; i < res.length; i++) {
            table.push({ id: res[i].id, name: res[i].first_name + " " + res[i].last_name, title: res[i].title, salary: res[i].salary, department: res[i].department});
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
        choices: ["Sales", "Production", "Development"],
        name: "department",
        type: "list"
        }
    ]).then((response) => {
        let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = ?";
        connection.query(query, [response.department], function (err, res) {
            let table = [];
            for (var i = 0; i < res.length; i++) {
                table.push({ name: res[i].first_name + " " + res[i].last_name, title: res[i].title, department: res[i].name });
            };

            let depTable = consoleTable.getTable(table);
            console.log(depTable.white);

            startApp();
        });
    });
};