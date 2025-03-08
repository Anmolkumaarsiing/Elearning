// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Enable CORS with specific frontend origin
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));

// Use the user routes
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("EduBuddy Backend is Running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
