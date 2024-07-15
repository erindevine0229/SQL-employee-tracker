// Access environment variables from .env file
require('dotenv').config();

// Require inquirer and postgres packages as well as connect to the connections.js file
const connect = require('./config/connection.js');
const inquirer = require('inquirer');
const { Pool } = require('pg');

// Access environment variables from .env file
require('dotenv').config();

// Utilize process.env to pull in this information
const pool = new Pool({
user: process.env.DB_USER,
host: 'localhost',
database: process.env.DB_NAME,
password: process.env.DB_PASSWORD,
// Typical Postgres port
port: 5432,
});

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



function viewAllDepts () {
    pool.query(
        'SELECT * FROM departments', (err, results) => {
            if (err) {
                console.error("There was an error loading data", err);
                return;
            }
            console.log(results);
})
};

function viewAllRoles () {
    pool.query(
        'SELECT * FROM roles', (err, results) => {
            if (err) {
                console.error("There was an error loading data", err);
                return;
            }
            console.log(results);
})  
};

function viewAllEmployees () {
    pool.query(
        'SELECT * FROM employees',
        (err, results) => {
            if(err) {
                console.error("There was an error loading the data", err);
                return;
            }
            console.log(results);
        }
    )
};

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
