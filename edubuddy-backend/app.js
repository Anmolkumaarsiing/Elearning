// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session'); // Import express-session for session handling
const userRoutes = require('./routes/userRoutes'); // Import user routes
require('dotenv').config(); // Load environment variables from .env

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies

// Set up express-session middleware before your routes
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',  // Use a strong secret key here
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set secure to true in production with HTTPS
}));

// Use user routes
app.use('/api/users', userRoutes); // Prefix all user routes with /api/users

// Root route for health check
app.get('/', (req, res) => {
  res.status(200).send('Server is running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
