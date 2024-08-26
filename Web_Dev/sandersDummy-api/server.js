// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Online = require('./models/online'); // Import the Online model
const User = require('./models/User'); // Import the User model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sandersDummy')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Sample route for the "online" collection
app.get('/api/online', async (req, res) => {
  try {
    const onlineData = await Online.find(); // Fetch data from the "online" collection
    res.json(onlineData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Authentication route (login)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Return the token to the client
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
      process.exit(1); // Exit the process if the port is in use
    } else {
      console.error(err);
    }
  });