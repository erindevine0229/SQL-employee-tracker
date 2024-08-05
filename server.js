// Connect to the connections.js file to avail the pool.query functionality from postgres
const pool = require("./config/connection");
//  Require inquirer package via npm
const inquirer = require("inquirer");


// Create array to store options for inquirer prompting in order to determine what the user wants to do with the database (serve as main menu options)
const selectArray = [
  {
    type: "list",
    name: "selections",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
    ],
  },
];

// Create a main function to house the available options for actions
const mainFunction = () => {
  inquirer.prompt(selectArray).then((answers) => {
    // Switch case to organize which function will be called based on the initial menu selection from the user. All functions detailed below.
    switch (answers.selections) {
      case "View All Departments":
        viewAllDepts();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add a Department":
        addDept();
        break;
      case "Add a Role":
        addRole();
        break;
      case "Add an Employee":
        addEmployee();
        break;
      case "Update an Employee Role":
        updateEmployeeRole();
        break;
      default:
        return;
    }
  });
};

console.log("Welcome to Employee Manager. What would you like to do?");
mainFunction();

// This function will display the id and name information for all departments within the database
function viewAllDepts() {
    pool.query('SELECT id, name FROM departments', (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result.rows);
        }
        mainFunction();
    });
}

// This function will display the id, title, department name  and salary information for all roles in the database
function viewAllRoles() {
    pool.query(`
        SELECT roles.id, roles.title, departments.name AS department_name, roles.salary
        FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id
    `, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result.rows);
        }
        mainFunction();
    });
}

// This function will display the id, first name, last name, job title, department, salary and manager for each employee
function viewAllEmployees() {
    pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    `, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.table(result.rows, ['id', 'first_name', 'last_name', 'role', 'department', 'salary', 'manager']);
        }
        mainFunction();
    });
}

// This function will take user input (via inquirer prompt) for a new department title and will add this new info to the departments table as a new entry
function addDept() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name", 
                message: "Please enter the new department you wish to add.",
            },
        ])
        .then((response) => {
            pool.query(
                `INSERT INTO departments (name) VALUES ($1)`,
                [response.name],
                (err, result) => {
                    if (err) {
                        console.log("There was an error attempting to add a new department", err);
                    } else {
                        console.log("New department was added successfully.");
                        mainFunction();
                    }
                }
            );
        });
}

// This function will take the user input (via inquirer prompt) for a new role's title, salary and department and will add this infor into the roles table as a new entry
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the title for this new role:",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary for the new role:",
            },
            {
                type: "input",
                name: "department_id",
                message: "Enter the corresponding department ID for the new role:",
            },
        ])
        .then((response) => {
            pool.query(
                `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`,
                [response.title, response.salary, response.department_id],
                (err, result) => {
                    if (err) {
                        console.log("There was an error when attempting to add a new role", err);
                    } else {
                        console.log("New role was added successfully.");
                    }
                }
            );
            mainFunction();
        });
}

// This function will take user input (via inquirer prompt) regarding the first and last names, the role ID and manager ID for a new employee and create a new entry within the employees table
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter the new employee's first name:",
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter the new employee's last name:",
            },
            {
                type: "input",
                name: "role_id",
                message: "Enter the role ID for the new employee's role:",
            },
            {
                type: "input",
                name: "manager_id",
                message: "Enter the manager ID for the new employee's manager:",
            },
        ])
        .then((response) => {
            pool.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
                [response.first_name, response.last_name, response.role_id, response.manager_id],
                (err, result) => {
                    if (err) {
                        console.log("There was an error when attempting to add a new employee", err);
                    } else {
                        console.log("New employee was added successfully.");
                        mainFunction();
                    }
                }
            );
        });
}

// This function will select an existing employee based on their id and will then update their role information based on a new role id. This will update the employee's entry in the database
function updateEmployeeRole() {
    pool.query("SELECT * FROM employees", (err, employeesResult) => {
        if (err) {
            console.error(err);
            return;
        }

        const employeesChoiceList = employeesResult.rows.map((employee) => ({
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`,
        }));

        pool.query('SELECT * FROM roles', (err, rolesResult) => {
            if (err) {
                console.error(err);
                return;
            }

            const rolesChoiceList = rolesResult.rows.map((role) => ({
                value: role.id,
                name: role.title,
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select which employee you want to update',
                    choices: employeesChoiceList,
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select which updated role you would like to assign to this employee',
                    choices: rolesChoiceList,
                },
            ]).then((response) => {
                pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', 
                    [response.role_id, response.employee_id], (updateErr, result) => {
                        if (updateErr) {
                            console.log('Error updating employee role', updateErr);
                        } else {
                            console.log('Employee role updated successfully');
                            mainFunction();
                        }
                    });
            });
        });
    });
}