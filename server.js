
// Connect to the connections.js file to avail the pool.query functionality from postgres
const pool = require('./config/connection.js');
//  Require inquirer package via npm
const inquirer = require('inquirer');



// Create array to store options for inquirer prompting in order to determine what the user wants to do with the database (serve as main menu options)
const selectArray = [
    {
        type: 'list',
        name: 'selections',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role'
        ]
    },
];



// Create a main function to house the available options for actions
const mainFunction = () => {

    inquirer.prompt(selectArray)
    .then((answers) => {
        // Switch case to organize which function will be called based on the initial menu selection from the user. All functions detailed below.
        switch (answers.selections) {
            case 'View All Departments':
            viewAllDepts();
            break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add a Department':
                addDept();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            default:
                return;

            }
        });
    };

    console.log('Welcome to Employee Manager. What would you like to do?')
    mainFunction();


// This function will display the id and name information for all departments within the database
function viewAllDepts () {
    pool.query(
        'SELECT departments.id, departments.name, roles.title AS role_title FROM departments INNER JOIN roles ON departments.id = roles.department_id', (err, results) => {
            if (err) {
                console.error("There was an error loading data", err);
                return;
            }
            console.log(results);
})
};

// This function will display the id, title, department name  and salary information for all roles in the database
function viewAllRoles () {
    pool.query(
        'SELECT roles.id, roles.title, roles.salary, departments.name AS departments_name FROM roles INNER JOIN departments ON roles.department_id = departments.id', (err, results) => {
            if (err) {
                console.error("There was an error loading data", err);
                return;
            }
            console.log(results);
})  
};

// This function will display the id, first name, last name, job title, department, salary and manager for each employee
function viewAllEmployees () {
    pool.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role_tite FROM employees INNER JOIN roles ON employees.role_id = roles.id`,
        (err, results) => {
            if(err) {
                console.error("There was an error loading the data", err);
                return;
            }
            console.log(results);
        }
    )
};

// This function will take user input (via inquirer prompt) for a new department title and will add this new info to the departments table as a new entry
function addDept () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'Please enter new department you wish to add.'
        }
    ])
    .then((response) => {
        db.query(`INSERT INTO departments (name) VALUES ($1)`, [response.name], (err,result) => {
            if (err) {
                console.log("There was an error attempting to add new department", err)
            } else {
                console.log("New department was added successfully.", result)
            }
            
        });
    });
};

// This function will take the user input (via inquirer prompt) for a new role's title, salary and department and will add this infor into the roles table as a new entry
function addRole () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title for this new role:'
        },

        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for new role:'

        },

        {
            type: 'input',
            name: 'dept',
            message: 'Enter the corresponding department id for new role:'

        },
    ])
    .then((response) => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`,
        [response.title, response.salary, response.dept], (err, result) => {
            if (err) {
                console.log('There was an error when attempting to add new role', err) 
            } else {
                console.log("New role was added successfully.", result)
            }
        });

    });
};

// This function will take user input (via inquirer prompt) regarding the first and last names, the role ID and manager ID for a new employee and create a new entry within the employees table
function addEmployee () {


    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'Enter new employee first name:'
        },

        {
            type: 'input',
            name: 'last',
            message: 'Enter new employee last name:'
        },

        {
            type: 'input',
            name: 'role',
            message: 'Enter the role ID for new employee role:'
        },

        {
            type: 'input',
            name: 'manager',
            message: 'Enter the manager ID for the new employee manager'
        },

    ])
    .then((response) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, 
        [response.first, response.last, response.role, response.manager], (err,result) => {
            if (err) {
                console.log('There was an error when attempting to add new employee', err) 
            } else {
                console.log('New employee successfully added.', result)
            }
        });

    });
};

// This function will select an existing employee based on their id and will then update their role information based on a new role id. This will update the employee's entry in the database
function updateEmployeeRole () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select which employee you want to update',
            choices: employeeChoiceList,

        },

        {
            type: 'list',
            name: 'role_id',
            message: 'Select which updated role you would like to assign to this employee',
            choices: roleChoiceList,
        },

    ]).then((response) => {
        db.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, 
    [response.role_id, response.employee_id], (err, result) => {
        if (err) {
            console.log('Error attempting to update employee role', err)
        } else {
            console.log('Info for selected employee successfully updated to reflect new role', result)
        }
        });
    });
};
