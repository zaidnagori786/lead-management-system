const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./server/config/db");
const authRoutes = require("./server/routes/authRoutes");
const leadRoutes = require("./server/routes/leadRoutes");


dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lead Management API Running",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Handle 404 Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});