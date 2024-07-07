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
    
}