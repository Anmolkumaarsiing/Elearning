// models/userModel.js
const db = require('../config/firebase'); // Import Firestore reference from firebase.js

// Define a model-like structure for user data
const userModel = {
  // Find a user by email
  findUserByEmail: async (email) => {
    const userRef = db.collection('users').doc(email); // Use email as document ID
    const doc = await userRef.get();
    return doc.exists ? doc.data() : null; // Return user data if exists, otherwise null
  },

  // Create a new user
  createUser: async (email, password) => {
    const userRef = db.collection('users').doc(email);
    await userRef.set({
      email: email,
      password: password, // In production, passwords should be hashed
    });
    return { email, message: 'User created successfully' };
  },
};

module.exports = userModel;
