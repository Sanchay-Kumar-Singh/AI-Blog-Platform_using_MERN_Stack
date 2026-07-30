const express = require("express");
const router = express.Router();
const { generateBlog, improveBlog } = require("../controllers/aiController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/generate", verifyToken, generateBlog);
router.post("/improve", verifyToken, improveBlog);

module.exports = router;
