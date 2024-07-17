// src/index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Create a write stream for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Morgan middleware to log HTTP requests
app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] :http-version :url', { stream: accessLogStream }));

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Home Page');
});

app.get('/get-users', (req, res) => {
  res.status(200).json({ message: 'List of users' });
});

app.post('/add-user', (req, res) => {
  res.status(201).json({ message: 'User added successfully' });
});

app.put('/user/:id', (req, res) => {
  res.status(201).json({ message: `User with ID ${req.params.id} updated successfully` });
});

app.delete('/user/:id', (req, res) => {
  res.status(200).json({ message: `User with ID ${req.params.id} deleted successfully` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
