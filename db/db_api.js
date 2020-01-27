const connection = require("./connection")
const consoleTable = require('console.table');
const inquirer = require("Inquirer");


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
    type: "list",
    message: "What is the role of employee?",
    name: "role",
    choices: ""
},
{
    type: "list",
    message: "Who is the manager of employee?",
    name: "manager",
    choices: ""
}]


function display_all_employees() {
    // console.log("display_all was called");
    var query = `SELECT employee.id as id,
        employee.first_name as first_name, 
        employee.last_name as last_name,
        role.title as title, 
        department.name as departmant,
        role.salary as salary,
        employee.manager_id as manager_id
    FROM employee, department,role 
    WHERE role.department_id = department.id
    AND employee.role_id = role.id`;

    var query2 = `SELECT
            employee_info.id as id,
            employee_info.first_name as first_name,
            employee_info.last_name as last_name,
            employee_info.title as title,
            employee_info.departmant as department,
            employee_info.salary as salary,
            concat(employee.first_name," ", employee.last_name) as manager_name
            FROM (` + query + ` ) as employee_info
            LEFT JOIN employee
            ON employee_info.manager_id = employee.id
        `
    connection.query(query2, function (err, res) {
        if (err) throw err;
        let table_all = consoleTable.getTable(res)
        console.log(table_all);
    });

}


function display_all_employees_by_department() {
    query = "SELECT * FROM department"
    connection.query(query, function (err, res) {
        let departments = [];
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            departments.push(res[i].name);
        }
        inquirer.prompt({
            type: "list",
            message: "Which department's employees do you want to display?",
            name: "dep",
            choices: departments
        }).then(function (answer) {
            // console.log(answer.dep);
            var query = `SELECT
            employee.first_name, 
            employee.last_name  
        FROM employee, department,role 
        WHERE role.department_id = department.id
        AND employee.role_id = role.id
        and department.name = "${answer.dep}";`

            connection.query(query, function (err, res) {
                let people = [];
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    people.push(res[i]);
                }
                console.log(people);
            })
        })

    })
}









module.exports.display_all_employees = display_all_employees;
module.exports.display_all_employees_by_department = display_all_employees_by_department;
module.exports.main_questions = main_questions;
module.exports.add_employee = add_employee;
// module.exports.department_questions = department_questions;
// module.exports.departments_all = departments_all;
// module.exports.add_employee_f = add_employee_f;