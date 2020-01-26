const inquirer = require("Inquirer");
const alldb = require("./db/db_api");


var main_questions = [{

    type: "list",
    message: "What would you like to do?",
    name: "main",
    choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Add Employee Manager",
    ]
}]


var add_employee = [{
    type: "input",
    message: "What is the first name of the employee?",
    name: "firstname",
},
{
    type: "input",
    message: "What is the last name of the employee?",
    name: "lastname"
},
{
    type: "input",
    message: "What is the role of employee?",
    name: "role"
},
{
    type: "input",
    message: "Who is the manager of employee?",
    name: "manager"
}]


// var update_employee = [{
//     type: "list",
//     message: "Who do you want to update?",
//     name: "listEmployee",
//     choices: [
//         "View All Employees",
//         "View All Employees by Department",
//         "View All Employees by Manager",
//         "Add Employee",
//         "Remove Employee",
//         "Update Employee Role",
//         "Add Employee Manager",
//     ]
// }]

runAll();

function runAll() {
    inquirer.prompt(main_questions).then(function (answer) {
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


