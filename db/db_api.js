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
        "Add Employee",
        "Update Employee Role",
    ]
}]

function add_an_employee() {
    var array_titles = [];
    var array_names = [];
    var titles_id = [];
    var manager_id = [];

    connection.query("SELECT title, id FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            array_titles.push(res[i].title);
            titles_id.push(res[i]);
        }

        connection.query("SELECT id, concat(employee.first_name,' ', employee.last_name) as manager_name FROM employee", function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                array_names.push(res[i].manager_name);
                manager_id.push(res[i]);
            }

            inquirer.prompt([{

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
                choices: array_titles
            },
            {
                type: "list",
                message: "Who is the manager of employee?",
                name: "manager",
                choices: array_names
            }]).then(function (response) {
                console.log(response);
                let id1;
                let id2;
                for (let i = 0; i < titles_id.length; i++) {
                    if (response.role === titles_id[i].title) {
                        id1 = titles_id[i].id;
                    }
                }

                for (let i = 0; i < manager_id.length; i++) {
                    if (response.manager === manager_id[i].manager_name) {
                        id2 = manager_id[i].id;
                    }
                }
                console.log(id1);
                console.log(id2);

                var query_last = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES('${response.firstname}', '${response.lastname}', '${id1}', '${id2}');`
                connection.query(query_last, function (err, res) {
                    if (err) throw err;
                    console.log("done");

                })

            })
        })

    })
}

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


function update_employee_role() {
    var query = "SELECT id, concat(employee.first_name,' ', employee.last_name) as employees from employee"
    connection.query(query, function (err, res) {
        // console.log(res);
        let people = [];
        let people_id = [];
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            people.push(res[i].employees);
            people_id.push(res[i]);
        }
        // console.log(people_id);
        var query2 = "SELECT title,id FROM role"
        connection.query(query2, function (err, res) {
            let roles = [];
            let role_id = [];
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                roles.push(res[i].title);
                role_id.push(res[i]);
            }
            inquirer.prompt([{
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "person",
                choices: people
            },
            {
                type: "list",
                message: "Which role do you want to add to the employee?",
                name: "role",
                choices: roles
            }
            ]).then(function (answer) {
                // console.log(answer);
                let id1;
                let id2;
                for (let i = 0; i < role_id.length; i++) {
                    if (answer.role === role_id[i].title) {
                        id1 = role_id[i].id;
                    }
                }

                for (let i = 0; i < people_id.length; i++) {
                    if (answer.person === people_id[i].employees) {
                        id2 = people_id[i].id;
                    }
                }

                var query3 = `UPDATE employee
                SET role_id = '${id1}'
                WHERE employee.id = '${id2}';`

                connection.query(query3, function (err, res) {
                    if (err) throw err;
                    // console.log("done");

                })

            })

        })
    })
}


module.exports.display_all_employees = display_all_employees;
module.exports.display_all_employees_by_department = display_all_employees_by_department;
module.exports.main_questions = main_questions;
module.exports.add_an_employee = add_an_employee;
module.exports.update_employee_role = update_employee_role;