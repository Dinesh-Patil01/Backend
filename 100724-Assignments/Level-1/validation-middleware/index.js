const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Custom validation middleware
const validateTodo = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;
  let errorMessage = 'bad request. some data is incorrect.';

  // Validate each field
  if (typeof ID !== 'number') {
    return res.status(400).json({ message: errorMessage, error: "ID must be a number" });
  }
  if (typeof Name !== 'string') {
    return res.status(400).json({ message: errorMessage, error: "Name must be a string" });
  }
  if (typeof Rating !== 'number') {
    return res.status(400).json({ message: errorMessage, error: "Rating must be a number" });
  }
  if (typeof Description !== 'string') {
    return res.status(400).json({ message: errorMessage, error: "Description must be a string" });
  }
  if (typeof Genre !== 'string') {
    return res.status(400).json({ message: errorMessage, error: "Genre must be a string" });
  }
  if (!Array.isArray(Cast) || !Cast.every(c => typeof c === 'string')) {
    return res.status(400).json({ message: errorMessage, error: "Cast must be an array of strings" });
  }

  // If all validations pass, proceed to the next middleware/route handler
  next();
};

// POST route with validation middleware
app.post('/', validateTodo, (req, res) => {
  res.status(200).send('data received');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
