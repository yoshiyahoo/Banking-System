const express = require("express");
const app = express();
const mysql = require("mysql2");

// Database stuff here
// this is metadata for the connection to the database
const dbConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "082102",
    port: "3306",
    database: "blank", // you can connect to a simple database if you want
});
/*
dbConnection.execute(`create table data (
number integer
);`);

dbConnection.execute(`insert into data values
(5),
(15),
(12),
(4);`);
*/
dbConnection.connect((err) => {
    if (err) {
        console.error("The database failed to connect"); 
    }
    console.log("Here is a successful connection");
});

// Serve the static files from the public directory.
// Pretty much just use the CSS and other public images
app.use(express.static(__dirname + "/public"));

app.get("/", (_req, res) => {
    content = __dirname + "/public/index.html"; // __dirname is how you get the current working directory.
    res.sendFile(content);
});

app.get("/data", (_req, res) => {
    dbConnection.execute("select * from thing", (error, results) => {
        if (error) {
            console.log("The database thing didn't work");
        }

        res.send(results);
    });
})

app.listen(3000, () => {
    console.log("Server has started");
});

