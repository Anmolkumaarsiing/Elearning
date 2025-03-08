// services/authService.js
const userModel = require('../models/userModel'); // Import userModel for Firestore operations

// Signup function
async function signup(email, password) {
  try {
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await userModel.createUser(email, password);
    return { success: true, message: 'User created successfully', user: newUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Login function
async function login(email, password) {
  try {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      throw new Error('User does not exist');
    }

    if (user.password !== password) {  // In production, use password hashing
      throw new Error('Invalid credentials');
    }

    return { success: true, message: 'Login successful' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = { signup, login };
