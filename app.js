const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const colors = require("colors");
colors.enable();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "AshleIgH1!~",
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
    });
};