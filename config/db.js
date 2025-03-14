// eslint-disable-next-line no-undef
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hostelmania',
  port: 3306, 
});



db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
