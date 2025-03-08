// config/firebase.js
const admin = require('firebase-admin');
require('dotenv').config(); // Make sure dotenv is configured to read from .env

// Initialize Firebase Admin SDK with service account credentials from .env file
admin.initializeApp({
  credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
});

const db = admin.firestore(); // Firestore reference

module.exports = db; // Export Firestore reference to use in other files
