const Blog = require("../models/Blog");

// GET /api/blogs  - get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const { category, page = 1, limit = 6 } = req.query;
    const filter = category ? { category } : {};
    const blogs = await Blog.find(filter)
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Blog.countDocuments(filter);
    res.json({ blogs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/blogs/:id
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/blogs  (protected)
const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, coverImage, isAIGenerated } = req.body;
    const blog = await Blog.create({
      title,
      content,
      excerpt,
      category,
      tags,
      coverImage,
      isAIGenerated: isAIGenerated || false,
      author: req.user.id,
    });
    await blog.populate("author", "name email");
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /api/blogs/:id  (protected, only author)
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/blogs/:id  (protected, only author)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/blogs/my  (protected) - user's own blogs
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, getMyBlogs };
