const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const focusRoutes = require("./routes/focusRoutes");

const app = express();
console.log(authRoutes);
app.use(cors());
app.use(express.json());
app.use("/api/focus", focusRoutes);

const habitRoutes = require("./routes/habitRoutes");
const focusRoutes = require("./routes/focusRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/focus", focusRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MindGuard Backend Running 🚀",
  });
});

module.exports = app;