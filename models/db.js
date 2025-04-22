const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: '127.0.0.1', // Your database host
    user: 'root', // Your MySQL username
    password: '082102', // Your MySQL password
    port: '3306', // Your MySQL port, normally "3306"
    database: 'test', // DO NOT EDIT (You need to create a "test" database from your "MySQL Workbench")
})

module.exports = connection
