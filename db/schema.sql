CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (30) UNIQUE NOT NULL,
    PRIMARY KEY
    (id)
);



    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
    title VARCHAR
        (30) UNIQUE NOT NULL,
    salary DECIMAL
        (7,2) NOT NULL,
    department_id INT
        (10) NOT NULL,
    PRIMARY KEY
        (id)
);


        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
    first_name VARCHAR
            (30) NOT NULL,
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT
            (10) NOT NULL,
    INDEX role_ind
            (role_id),
    manager_id INT
            (10) NULL,
     INDEX man_ind
            (manager_id),
    PRIMARY KEY
            (id)
);
