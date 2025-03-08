import express from 'express';
import admin from '../config/firebase.js';

const router = express.Router();

// ✅ Signup Route with Firebase Admin SDK
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await admin.auth().getUserByEmail(email).catch(() => null);
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // Create a new user in Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// 🚫⚠️ Login Route - Server-side password validation is not possible with Firebase Admin SDK
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // With Firebase Admin, you cannot verify email and password directly.
    // This should be handled on the client-side using the Firebase Authentication SDK.
    return res.status(400).json({ message: 'Server-side email/password login is not supported. Please use client-side Firebase Authentication.' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

export default router;
