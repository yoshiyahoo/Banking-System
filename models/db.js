const mysql = require('mysql2');
const Promise = require('bluebird');
require("dotenv").config(); // load the secrets from the .env file
class Database {
	static instance;

	constructor() {
		if (Database.instance) {
			return Database.instance
		}

		Database.instance = this;
		console.log("swag", process.env.DB_NAME, process.env.DB_HOST)
		// Set up the database connection for a one time connection
		this.connection = mysql.createConnection({
			host: process.env.DB_HOST, // Your database host
			user: process.env.DB_USERNAME, // Your MySQL username
			password: process.env.DB_PASSWORD, // Your MySQL password
			port: process.env.DB_PORT, // Your MySQL port, normally "3306"
			database: process.env.DB_NAME, // DO NOT EDIT (You need to create a "test" database from your "MySQL Workbench")
		});

		// Connect to the database
		this.connection.connect((err) => {
			if (err) {
				console.error('Error connecting to the database:', err.message);
				return;
			}
			console.log('Connected to the MySQL database');
		});
	}

	run(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, params, (err, results, fields) => {
				if (err) {
					console.error('Error executing query:', err.message);
					reject(err);
					return;
				}
				console.log('Query results:', results);
				resolve(results);
			});
		});
	}

	close() {
		// Close the connection when you're done
		this.connection.end((err) => {
			if (err) {
				console.error('Error closing the connection:', err.message);
				return;
			}
			console.log('Connection closed');
		});
	}
}

module.exports = {
	Database
};
