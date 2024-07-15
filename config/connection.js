// Import the postgres package
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

// Export for use in the server.js
module.exports = pool;