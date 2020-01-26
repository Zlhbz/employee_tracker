USE employee_tracker;

INSERT INTO department
    (name)
VALUES("Engineering"),
    ("Marketing"),
    ("HR"),
    ("Finance");



INSERT INTO role
    (title,salary,department_id)
VALUES("Software Engineer", 120000, 1),
    ("Hardware Engineer", 110000, 1),
    ("Account Manager", 150000, 4),
    ("Accountant", 100000, 4),
    ("Marketing Coordinator", 90000, 2),
    ("Marketing Assistant", 80000, 2),
    ("HR Specialist", 95000, 3),
    ("HR Assistant", 80000, 3);



INSERT INTO employee
    (first_name,last_name,role_id,manager_id)
VALUES("Jack", "Brown", 1, null),
    ("Will", "Smith", 2, 1),
    ("Jackie", "Jones", 3, null),
    ("Serena", "Jackson", 4, 3),
    ("Ayse", "Koc", 5, null),
    ("Indra", "Joshi", 6, 5),
    ("Mustafa", "Genc", 7, null),
    ("Sujin", "Lee", 8, 7);
