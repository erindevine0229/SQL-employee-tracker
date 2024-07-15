-- drop any existing db with this name and set up new database
ROP DATABASE IF EXISTS employees;
CREATE DATABASE employees_db;

--  Connect to the db in order to manipulate it
USE employees_db;

-- error handling to delete any existing table of same name prior to proceeding
DROP TABLE IF EXISTS departments;
-- Create a new table to store department info
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL

);

DROP TABLE IF EXISTS roles;
-- Create a new table to store role info
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    -- tie this foreign key to reference the id information from the departments table
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL

);

DROP TABLE IF EXISTS employees;
-- Create a new table to store employee info
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    -- tie this foreign key to reference the id information from the roles table
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    -- tie this foreign key to another employee in the table in order to assign a manager
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL;

);