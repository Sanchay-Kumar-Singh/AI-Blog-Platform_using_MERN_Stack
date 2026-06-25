const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ======================================================
// GENERATE BLOG
// POST /api/ai/generate
// ======================================================

const generateBlog = async (req, res) => {
  try {
    const { topic, category } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const prompt = `
Write a detailed and engaging blog post about "${topic}".

Category: ${category || "Technology"}

Return ONLY a valid JSON object in this exact format:

{
  "title": "Catchy blog title",
  "excerpt": "2 sentence summary",
  "content": "Complete blog content with paragraphs separated by \\n\\n",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}

Requirements:
- 500 to 700 words
- Professional and informative tone
- SEO friendly
- No markdown
- No code blocks
- Return only JSON
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text || "";

    // Remove markdown if Gemini returns it
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    const parsed = JSON.parse(text);

    res.status(200).json({
      success: true,
      ...parsed,
    });
  } catch (error) {
    console.log("Generate Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "AI generation failed",
      error: error.message,
    });
  }
};

// ======================================================
// IMPROVE BLOG
// POST /api/ai/improve
// ======================================================

const improveBlog = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const prompt = `
Improve and enhance the following blog post.

Requirements:
- Improve grammar.
- Improve readability.
- Make it engaging.
- Keep original meaning.
- Return only improved text.

Blog:

${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const improvedContent =
      response.text || "No response from AI";

    res.status(200).json({
      success: true,
      content: improvedContent,
    });
  } catch (error) {
    console.log("Improve Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "AI improvement failed",
      error: error.message,
    });
  }
};

module.exports = {
  generateBlog,
  improveBlog,
};

