const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();


function init() {
    const logoText = logo({ name: "Employee Tracker Table." }).render();//asciiart-logo
    console.log(logoText);
    loadMainMenu();
}

//main menu function
function loadMainMenu() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "Choose action and department",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "view All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update an Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                }

            ]
        }
    ]).then(res => {
        let choice = res.choice;
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "EXIT":
                exit();
                break;
        }
    })
}

//view all departments function
function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);

        })
        .then(() => loadMainMenu());
}

// view all roles function
function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            //console.log(rows);
            console.log("\n");
            console.table(roles);

        })
        .then(() => loadMainMenu());
}
// view all employees function

function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainMenu());
}

// add a department function

function addDepartment() {
    prompt([
        {
            name: "name",
            message: "What is the name of the new department?"
        }
    ])
        .then(res => {
            let name = res;
            db.createDepartment(name)
                .then(() => console.log(`Added ${name.name} to the database`))
                .then(() => loadMainMenu());
        })
}

// add a role function

function addRole() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            //console.log(departments);
            const departmentChoices = departments.map(({ id, "Department":name }) => ({
                name: name,
                value: id
            }));
            //console.log(departmentChoices);
            prompt([
                {
                    name: "title",
                    message: "What is the name of the new role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the new role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the new role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.createRole(role)
                        //.then(() => console.log(`${role.department_id}`))
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => loadMainMenu());
                })

        })
}

// add an employee function

function addEmployee() {
    prompt([
        {
            name: "firstName",
            message: "What is the first name of the new employee?"
        },
        {
            name: "lastName",
            message: "What is the last name of the new employee?"
        }

    ])
        .then(res => {
            let first_name = res.firstName;
            let last_name = res.lastName;

            db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    //console.log(roles);
                    const roleChoices = roles.map(({ id, "Job Title": title }) => ({
                        name: title,
                        value: id
                    }));
                    //console.log(roleChoices);
                    prompt({
                        type: "list",
                        name: "role_id",
                        message: "What is the role of the new employee?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let role_id = res.role_id;
                            db.findAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    //console.log(employees);
                                    const managerChoices = employees.map(({ id, "First Name": first_name, "Last Name": last_name, "Job Title": title }) => ({
                                        name: `${first_name} ${last_name} - ${title}`,
                                        value: id
                                    }));

                                    managerChoices.push({ name: "None", value: null });

                                    prompt({
                                        type: "list",
                                        name: "manager_id",
                                        message: "Who is the manager of the new employee?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                first_name: first_name,
                                                last_name: last_name,
                                                role_id: role_id,
                                                manager_id: res.manager_id
                                            };

                                            db.createEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `Added ${first_name} ${last_name} to the database`
                                        ))
                                        .then(() => loadMainMenu());
                                })
                        })
                })
        })





}

// update an employee role function

function updateEmployeeRole() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, "First Name": first_name, "Last Name": last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Choose what employee to have his role updated.",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employee_id = res.employee_id;
                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            //console.log(roles);
                            const roleChoices = roles.map(({ id, "Job Title": title }) => ({
                                name: title,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "role_id",
                                    message: "Choose the new role for the employee.",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.updateEmployeeRole(employee_id, res.role_id))
                                .then(() => console.log("Updated employee's role"))
                                .then(() => loadMainMenu());
                        })
                })
        })

}





function exit() {
    console.log("Thank you! Bye!");
    process.exit();
}







