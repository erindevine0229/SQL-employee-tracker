const connect = require('./config/connection.js');
const inquirer = require('inquirer');


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
    db.query()
};

function viewAllRoles () {
    db.query()
};

function viewAllEmployees () {
    db.query()
};

function addDept () {};

function addRole () {};

function addEmployee () {};

function updateEmployeeRole () {};
