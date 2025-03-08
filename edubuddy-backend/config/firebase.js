// firebase.js
import admin from "firebase-admin";
import fs from "fs";

// Read and parse the service account key from JSON file
const serviceAccount = JSON.parse(
  fs.readFileSync("./config/firebaseServiceAccountKey.json", "utf-8")
);

// Fix the private key formatting by replacing \\n with \n
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
} else {
  admin.app();
}

export default admin;
