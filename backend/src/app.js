const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
console.log(authRoutes);
app.use(cors());
app.use(express.json());

const habitRoutes = require("./routes/habitRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MindGuard Backend Running 🚀",
  });
});

module.exports = app;