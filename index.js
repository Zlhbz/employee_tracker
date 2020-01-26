const inquirer = require("Inquirer");
const alldb = require("./db/db_api");
// const consoleTable = require('console.table');


// const table = consoleTable.getTable([
//     {
//         name: 'zeliha',
//         age: 35
//     }, {
//         name: 'ayse',
//         age: 60
//     }
// ]);

// console.log(table);

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

                break;

            case "View All Employees by Manager":

                break;

            case "Add Employee":

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


