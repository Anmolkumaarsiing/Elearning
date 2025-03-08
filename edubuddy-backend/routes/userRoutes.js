// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// POST route for signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.signup(email, password);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error occurred during signup.' });
  }
});

// POST route for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await authService.login(email, password);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error occurred during login.' });
  }
});

// POST route for logout (For Sessions)
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out.' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
