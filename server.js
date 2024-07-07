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

        case 'View All Roles'

        case 'View All Employees'
        
        case 'Add a Department'

        case 'Add a Role'

        case 'Add an Employee'

        case 'Update an Employee Role'

        default

    };

}