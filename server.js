const connect = require('./config/connection.js');
const inquirer = require('inquirer');
const { Pool } = require('pg');


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

inquirer.prompt(selectArray);
.then(answers) => {
    switch (answers.selections) {
        case 'View All Departments'
           viewAllDepts();
           break;
        case 'View All Roles'
            viewAllRoles();
            break;
        case 'View All Employees'
            viewAllEmployees();
            break;
        case 'Add a Department'
            addDept();
            break;
        case 'Add a Role'
            addRole();
            break;
        case 'Add an Employee'
            addEmployee();
            break;
        case 'Update an Employee Role'
            updateEmployeeRole();
            break;
        default
            return;

    };

}



function viewAllDepts () {
    db.query(
        `SELECT * FROM departments`,
        (err, results) => {
            if (err) {
                console.error("There was an error loading data", err);
                return;
            }
            console.log(results);
})
};

function viewAllRoles () {
    db.query(
        `SELECT * FROM roles`,
        (err, results) => {
            if (err) {
                console.error("There was an error loading data", err);
                return;
            }
            console.log(results);
})  
};

function viewAllEmployees () {
    db.query()
};

function addDept () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'Please enter new department you wish to add.'
        }
    ])
    .then(response) => {
        `INSERT INTO departments (name) VALUES`
    }
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

    }
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
        
    }
};

function updateEmployeeRole () {};
