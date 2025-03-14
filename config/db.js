const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',    // XAMPP runs MySQL on localhost
  user: 'root',         // Default XAMPP user
  password: '',         // Default is empty, change if you've set one
  database: 'your_database_name',  // Replace with your actual DB name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
