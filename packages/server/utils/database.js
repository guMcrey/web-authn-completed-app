const mysql = require('mysql');
const path = require('path');
const { promisify } = require('util');
require('dotenv').config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'web_authn_demo',
    charset: 'utf8mb4',
    connectionLimit: 10,
};

const connection = mysql.createPool(config);
const closePool = promisify(connection.end).bind(connection);
const query = promisify(connection.query).bind(connection);

console.log('connected!');

module.exports = {
    query,
    connection,
    closePool,
};