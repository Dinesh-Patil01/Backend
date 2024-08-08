const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Replace with your User model

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/home', (req, res) => {
  res.send('Welcome to the homepage');
});

app.get('/products', authenticateToken, (req, res) => {
  res.json({ message: 'Protected Products Route' });
});

app.post('/products', authenticateToken, (req, res) => {
  res.json({ message: 'Product created' });
});

app.listen(3000, () => console.log('Server started on port 3000'));
