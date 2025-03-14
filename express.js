const express = require('express');
const db = require('./config/db'); // Ensure db.js is placed in 'config' folder
 // Import the database connection
const app = express();

app.get('/menu', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
