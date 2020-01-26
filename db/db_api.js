const connection = require("./connection")



function display_all_employees() {
    console.log("display_all was called");
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}




module.exports.display_all_employees = display_all_employees;