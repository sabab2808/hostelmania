import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hostelmania',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// Example API Endpoint
app.get('/menu', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
