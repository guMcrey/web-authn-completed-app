const mysql = require('mysql');
const { promisify } = require('util');

// mysql -h127.0.0.1 -uroot -pPassword123#@!
const config = {
    host: 'mysql',   // docker
    // host: 'localhost',  // dev
    user: 'root',
    password: 'Password123#@!',
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