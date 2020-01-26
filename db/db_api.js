const connection = require("./connection")
const consoleTable = require('console.table');


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



function display_all_employees() {
    // console.log("display_all was called");

    var query = `SELECT employee.id, employee.first_name,employee.last_name,role.title, department.name,role.salary
    FROM employee, department,role 
    WHERE role.department_id = department.id
    AND employee.role_id = role.id`
    connection.query(query, function (err, res) {
        if (err) throw err;

        let table_all = consoleTable.getTable(res)
        console.log(table_all);

        // for (let i = 0; i < res.length; i++) {
        //     console.log(`At ${i} : ${res[i].first_name} ${res[i].last_name}`)
        // }
    });

}


function display_all_employees_by_department() {
    var query = "SELECT * FROM department";

}

module.exports.display_all_employees = display_all_employees;
module.exports.display_all_employees_by_department = display_all_employees_by_department;
module.exports.main_questions = main_questions;
module.exports.add_employee = add_employee;