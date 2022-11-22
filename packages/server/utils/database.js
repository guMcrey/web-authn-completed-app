const mysql = require('mysql');
const { promisify } = require('util');

// mysql -h127.0.0.1 -uroot -pPassword123#@!
const config = {
    host: 'localhost',
    user: 'root',
    password: 'Password123#@!',
    database: 'web_authn_demo',
    charset: 'utf8mb4',
    connectionLimit: 10,
};

const connection = mysql.createPool(config);
const query = promisify(connection.query).bind(connection);
const closePool = promisify(connection.end).bind(connection)

console.log('connected!');

module.exports = {
    query,
    connection,
    closePool,
};