/* Connecting to database(Mysql2) */

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Godisgreat@123',
//     database: 'node-complete'
// });

// module.exports = pool.promise();

/* Connecting to database(Sequelize) */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Godisgreat@123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;