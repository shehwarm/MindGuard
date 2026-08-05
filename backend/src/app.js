const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const focusRoutes = require("./routes/focusRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const streakRoutes = require("./routes/streakRoutes");
const goalRoutes = require("./routes/goalRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/notes", noteRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 MindGuard API is running...");
});

module.exports = app;