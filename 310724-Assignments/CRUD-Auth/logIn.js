app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Fetch user from database (replace with your logic)
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });
  
    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });
  
    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
    // Send token to client
    res.json({ token });
  });
  