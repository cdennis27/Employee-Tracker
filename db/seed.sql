use employees;

INSERT INTO department
    (name)
VALUES
    ('Cashier'),
    ('Kitchen'),
    ('Bar'),
    ('Management'),
    ('Tables'),
    ('Others');
    

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Manager', 160000, 4),
    ('Cook', 120000, 2),
    ('Host', 60000, 1),
    ('Dishwasher', 75000, 2),
    ('Prepper', 75000, 2),
    ('Bartender', 92000, 3),
    ('Server', 25000, 5),
    ('Cleaner', 50000, 6),
    ('Accountant', 20000, 6);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Carlos', 'Mendonca', 1, NULL),
    ('Rob', 'Stark', 2, 1),
    ('Chris', 'Lloyd', 3, 1),
    ('Niki', 'Russman', 4, 2),
    ('George', 'Patsakos', 5, 2),
    ('Jenny', 'lee', 6, 1),
    ('Robert', 'Down', 7, 1),
    ('Lily', 'Roberts', 8, 1),
    ('Janet', 'Charles', 9, NULL);