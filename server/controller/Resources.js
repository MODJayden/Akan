const Resources = require("../Model/Resources");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Lesson = require("../Model/Lesson");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateLesson(topic) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Generate an Akan (Twi) language resource about ${topic} in this exact JSON format:
  {
    "title": "string (in Twi)",
    "type": "printable/document",
    "content": "string (markdown formatted with Twi characters)",
  }

  Guidelines:
  1. Use proper Twi orthography (ɛ, ɔ, ñ, etc.)
  2. Structure content with markdown headings, lists, and examples
  3. Include practical vocabulary and phrases
  4. Ensure all special characters are Unicode encoded`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Enhanced cleaning with Unicode preservation
    const cleanText = text
      .replace(/```json|```/g, "")
      .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width chars
      .trim();

    const data = JSON.parse(cleanText);

    // Validate Twi characters
    if (!/[\u025B\u0254\u014B]/.test(data.content)) {
      console.warn("Generated content may lack proper Twi characters");
    }

    return data;
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("AI failed to generate valid lesson");
  }
}

const generateResources = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const aiLesson = await generateLesson(topic);

    // Validate AI response
    if (!aiLesson?.title || !aiLesson?.content) {
      throw new Error("AI returned incomplete lesson data");
    }

    const resources = await Resources.create(aiLesson);

    res.status(201).json({
      success: true,
      data: resources,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resources.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: resources });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch resources" });
  }
};

module.exports = {
  generateResources,
  getResources,
};
