const connection = require("./connection");

class DB {

    constructor(connection) {
        this.connection = connection;
    }

    //Find all departments

    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.name AS Department, department.id FROM department;"
        );
    }

    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.title AS 'Job Title', role.id, department.name AS Department, role.salary AS Salaries FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS department, role.salary AS Salaries, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    //Create a new department
    createDepartment(newDepartment) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?",
            newDepartment
        );
    }

    //Create a new role
    createRole(newRole) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?",
            newRole
        );
    }

    //Create a new employee
    createEmployee(newEmployee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?",
            newEmployee
        );
    }

    //Update an employee's role
    updateEmployeeRole(employee_Id, role_Id) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [role_Id, employee_Id]
        );
    }

    //show budget by department
    viewBudgetDepartment() {
        return this.connection.promise().query(
            "SELECT department.name AS Department, SUM(role.salary) AS 'Total Budget' FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.name;"

        );
    }

    // remove department

    removeDepartment(department_id) {

        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?",
            department_id
        );
    }

    // remove role

    removeRole(role_id) {

        return this.connection.promise().query(
            "DELETE FROM role WHERE id = ?",
            role_id
        );
    }

    // remove employee

    removeEmployee(employee_id) {
        
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?",
            employee_id
        );

    }


}



module.exports = new DB(connection);