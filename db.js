const mysql = require("mysql");

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'PSI'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("successfully connected with database")
});

module.exports = connection;