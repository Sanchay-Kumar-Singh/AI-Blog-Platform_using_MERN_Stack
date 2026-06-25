const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    category: {
      type: String,
      enum: ["Technology", "AI", "Science", "Business", "Health", "Lifestyle"],
      default: "Technology",
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isAIGenerated: { type: Boolean, default: false },
    coverImage: { type: String, default: "" },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
