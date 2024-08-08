// Public route
app.get('/home', (req, res) => {
    res.send('Welcome to the homepage');
  });
  
  // Protected routes
  app.get('/products', authenticateToken, (req, res) => {
    // Fetch products from database (replace with your logic)
    res.json({ message: 'Protected Products Route' });
  });
  
  app.post('/products', authenticateToken, (req, res) => {
    // Create new product (replace with your logic)
    res.json({ message: 'Product created' });
  });
  