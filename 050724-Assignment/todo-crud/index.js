const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Read data from db.json
const readTodos = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
};

// Write data to db.json
const writeTodos = (todos) => {
  fs.writeFileSync('db.json', JSON.stringify(todos, null, 2));
};

// Get all todos
app.get('/todos', (req, res) => {
  const data = readTodos();
  res.json(data.todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const data = readTodos();
  const newTodo = req.body;
  data.todos.push(newTodo);
  writeTodos(data);
  res.status(201).json(newTodo);
});

// Update status of todos with even ID
app.put('/todos/update-even-ids', (req, res) => {
  const data = readTodos();
  data.todos = data.todos.map(todo => {
    if (todo.id % 2 === 0 && !todo.status) {
      todo.status = true;
    }
    return todo;
  });
  writeTodos(data);
  res.json(data.todos);
});

// Delete todos with status true
app.delete('/todos/delete-true-status', (req, res) => {
  let data = readTodos();
  data.todos = data.todos.filter(todo => !todo.status);
  writeTodos(data);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
