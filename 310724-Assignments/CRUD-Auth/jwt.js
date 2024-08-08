const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secret key for JWT
const JWT_SECRET = 'your_secret_key'; // Use a strong secret key in production

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // If no token, return Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, return Forbidden

    req.user = user; // Save the user details in the request
    next(); // Proceed to the next middleware/route
  });
}
