const Pool = require('pg').Pool;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')})

console.log( 'DBPORT', path.resolve(__dirname, '../'))

const connection = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
};

const pool = new Pool( connection );

module.exports = pool;