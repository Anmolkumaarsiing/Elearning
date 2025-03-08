import admin from 'firebase-admin';

// Login Handler
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Authenticate with Firebase using Admin SDK
    const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);

    // If needed, create a JWT or session to send back to the frontend
    const token = await userCredential.user.getIdToken();

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

// Signup Handler
export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new Firebase user
    const userCredential = await admin.auth().createUser({
      email,
      password,
    });

    // If needed, create a JWT or session to send back to the frontend
    const token = await userCredential.user.getIdToken();

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Signup Error:', error);
    if (error.code === 'auth/email-already-in-use') {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }
    res.status(500).json({ message: 'An error occurred during signup.' });
  }
};
