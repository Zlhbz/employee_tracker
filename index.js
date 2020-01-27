const inquirer = require("inquirer");
const alldb = require("./db/db_api");





runAll();


function runAll() {
    inquirer.prompt(alldb.main_questions).then(function (answer) {

        switch (answer.main) {

            case "View All Employees":
                alldb.display_all_employees();
                break;

            case "View All Employees by Department":
                alldb.display_all_employees_by_department();
                break;

            case "View All Employees by Manager":

                break;

            case "Add Employee":
                alldb.add_an_employee();
                break;

            case "Update Employee Role":
                alldb.update_employee_role()

                break;

        }
    });
}


