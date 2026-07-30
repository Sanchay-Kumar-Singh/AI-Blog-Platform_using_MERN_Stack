const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


// Middleware
app.use(
  cors({
    origin: "https://ai-blog-platform-using-mern-stack.vercel.app",
    credentials: true,
  })
);

app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("Server is live!");
});


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});