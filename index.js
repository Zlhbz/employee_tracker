const inquirer = require("Inquirer");
const alldb = require("./db/db_api");


runAll();

function runAll() {
    inquirer.prompt(alldb.main_questions).then(function (answer) {
        // console.log(answer);
        // console.log("--> action " + answer.main);
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
                // alldb.test();
                alldb.add_an_employee();
                break;

            case "Remove Employee":

                break;

            case "Update Employee Role":

                break;

            case "Add Employee Manager":

                break;
        }
    });
}


