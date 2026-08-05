const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const focusRoutes = require("./routes/focusRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 MindGuard API is running...");
});

module.exports = app;